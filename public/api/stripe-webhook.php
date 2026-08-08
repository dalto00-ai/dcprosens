<?php
// Stripe webhook receiver — this is the ONLY thing that grants/revokes
// premium access. It listens for payment/subscription events, verifies they
// really came from Stripe, and writes the result to the paying user's
// Firestore document.
//
// This endpoint is called by Stripe's servers directly, never by the
// browser — there is no CORS handling here on purpose.

require_once __DIR__ . '/lib/firestore.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$webhookSecret = getenv('STRIPE_WEBHOOK_SECRET');
$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
// Stored as base64 (not a raw multi-line PEM string) because passing a
// value containing real/escaped newlines through Apache's SetEnv proved
// unreliable — base64 has no special characters to mangle in transit.
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebasePrivateKey = $firebasePrivateKeyB64 ? base64_decode($firebasePrivateKeyB64) : false;
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';

if (!$webhookSecret || !$firebaseClientEmail || !$firebasePrivateKey) {
    http_response_code(500);
    error_log('stripe-webhook.php: missing STRIPE_WEBHOOK_SECRET or Firebase service account env vars');
    echo json_encode(['error' => 'Webhook is not configured.']);
    exit();
}

// --- Verify this request actually came from Stripe ---------------------
$rawBody = file_get_contents('php://input');
$sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

function verify_stripe_signature(string $payload, string $sigHeader, string $secret, int $toleranceSeconds = 300): bool
{
    $parts = [];
    foreach (explode(',', $sigHeader) as $pair) {
        $kv = explode('=', $pair, 2);
        if (count($kv) === 2) {
            $parts[$kv[0]] = $kv[1];
        }
    }
    if (!isset($parts['t'], $parts['v1'])) {
        return false;
    }

    $timestamp = (int)$parts['t'];
    if (abs(time() - $timestamp) > $toleranceSeconds) {
        return false; // stale/replayed event
    }

    $signedPayload = $parts['t'] . '.' . $payload;
    $expectedSig = hash_hmac('sha256', $signedPayload, $secret);

    return hash_equals($expectedSig, $parts['v1']);
}

if (!verify_stripe_signature($rawBody, $sigHeader, $webhookSecret)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid signature']);
    exit();
}

$event = json_decode($rawBody, true);
if (!$event || !isset($event['type'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Malformed event']);
    exit();
}

// --- Get a Firestore access token once, reused for this request --------
try {
    $accessToken = firestore_get_access_token($firebaseClientEmail, $firebasePrivateKey);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('stripe-webhook.php: failed to get Firestore access token — ' . $e->getMessage());
    echo json_encode(['error' => 'Internal error']);
    exit();
}

/**
 * Maps a Stripe plan string (as set in create-checkout-session.php's
 * `metadata[plan]`) to what we store in Firestore.
 */
function plan_grants_access(string $plan): bool
{
    return in_array($plan, ['monthly', 'annual', 'lifetime'], true);
}

try {
    switch ($event['type']) {
        case 'checkout.session.completed': {
            $session = $event['data']['object'];
            $userId = $session['client_reference_id'] ?? ($session['metadata']['userId'] ?? null);
            $plan = $session['metadata']['plan'] ?? null;

            if (!$userId || !$plan) {
                break; // no linked account, nothing to grant
            }

            // Aim Lab standalone purchase ($1, one-time) grants a narrow
            // feature flag, not full subscriptionStatus — it must NOT unlock
            // the rest of the Pro tools.
            if ($plan === 'aimlab') {
                firestore_update_user($firebaseProjectId, $accessToken, $userId, [
                    'aimLabAccess' => true,
                    'aimLabPurchasedAt' => gmdate('c'),
                ]);
                break;
            }

            if (!plan_grants_access($plan)) {
                break; // e.g. the ebook purchase — not a premium plan, nothing to grant
            }

            $fields = [
                'subscriptionStatus' => 'active',
                'subscriptionPlan' => $plan,
                'stripeCustomerId' => $session['customer'] ?? '',
                'stripeSubscriptionId' => $session['subscription'] ?? '',
            ];
            if (($session['metadata']['trial'] ?? null) === 'true') {
                // Records that this account has already used its one free
                // trial, so the frontend can hide the trial option next time.
                $fields['trialUsedAt'] = gmdate('c');
            }

            firestore_update_user($firebaseProjectId, $accessToken, $userId, $fields);
            break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
            $subscription = $event['data']['object'];
            $userId = $subscription['metadata']['userId'] ?? null;
            if (!$userId) {
                break; // subscription created outside our checkout flow — nothing we can link
            }

            $activeStatuses = ['active', 'trialing'];
            $isActive = in_array($subscription['status'] ?? '', $activeStatuses, true)
                && $event['type'] !== 'customer.subscription.deleted';

            firestore_update_user($firebaseProjectId, $accessToken, $userId, [
                'subscriptionStatus' => $isActive ? 'active' : 'free',
                'stripeSubscriptionId' => $subscription['id'] ?? '',
            ]);
            break;
        }

        default:
            // Event we don't act on — acknowledge it so Stripe stops retrying.
            break;
    }
} catch (Throwable $e) {
    http_response_code(500);
    error_log('stripe-webhook.php: failed processing ' . $event['type'] . ' — ' . $e->getMessage());
    echo json_encode(['error' => 'Internal error']);
    exit();
}

echo json_encode(['received' => true]);
