<?php
// Hostinger PHP Endpoint for Stripe Embedded Checkout Session
header('Content-Type: application/json; charset=utf-8');

// CORS: Only allow requests from our own domains
$allowedOrigins = ['https://dcprosens.com', 'https://app.dcprosens.com'];
$requestOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($requestOrigin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
} else {
    header('Access-Control-Allow-Origin: https://dcprosens.com');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$plan = isset($input['plan']) ? strtolower($input['plan']) : 'monthly';
$origin = isset($input['origin']) ? $input['origin'] : 'https://dcprosens.com';
$userId = isset($input['userId']) ? trim((string)$input['userId']) : '';
$userEmail = isset($input['email']) ? trim((string)$input['email']) : '';
$wantsTrial = !empty($input['trial']);

// Validate origin against allowed list
if (!in_array($origin, $allowedOrigins, true)) {
    $origin = 'https://dcprosens.com';
}

// A logged-in user is required so the webhook can later tell which Firestore
// account to grant access to — without this, a completed payment has no way
// to be linked back to anyone.
if ($plan !== 'ebook' && $userId === '') {
    http_response_code(401);
    echo json_encode(['error' => 'You must be logged in to subscribe.']);
    exit();
}

$isPaymentOneTime = false;

// Price configuration (Live Stripe setup) — matches frontend pricing page & Ebook pricing
switch ($plan) {
    case 'ebook':
        $amount = 900;   // $9.00 USD
        $planName = 'The Precision Aim System (4-Part Ebook & Training System)';
        $isPaymentOneTime = true;
        break;
    case 'aimlab':
        $amount = 100;   // $1.00 USD, one-time, standalone (not the full subscription)
        $planName = 'DCPROSENS Aim Lab (Standalone Access)';
        $isPaymentOneTime = true;
        break;
    case 'lifetime':
        $amount = 14900; // $149.00 one-time
        $planName = 'DCPROSENS Pro Membership (Lifetime)';
        $isPaymentOneTime = true;
        break;
    case 'annual':
        $amount = 3999;  // $39.99/year ($3.33/mo)
        $interval = 'year';
        $planName = 'DCPROSENS Pro Membership (Annual — $3.33/mo)';
        break;
    default: // monthly
        $amount = 499;   // $4.99/month
        $interval = 'month';
        $planName = 'DCPROSENS Pro Membership (Monthly)';
        break;
}

// Read Stripe secret key from environment variable (set in Hostinger hPanel).
// No hardcoded fallback: a live secret key must never live in a file served
// from a public web root. Fail loudly instead of silently using a real key.
$secretKey = getenv('STRIPE_SECRET_KEY');
if (!$secretKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Payment service is not configured. Please contact support.']);
    exit();
}

$returnUrl = ($plan === 'ebook')
    ? $origin . '/Ebooks/EBOOKS%20DCPROSENS.pdf?purchase=success'
    : $origin . '/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}';

$descriptions = [
    'ebook' => 'Complete 4-Part Precision Aim System Ebook (Instant PDF Download)',
    'lifetime' => 'One-time payment. Unlimited access to all pro tools, forever.',
    'aimlab' => 'One-time payment. Permanent access to Aim Lab only (does not include other Pro tools).',
];
$description = $descriptions[$plan] ?? 'Unlimited access to all pro tools, PSA method calculator, crosshair database & gear specs';

$postFields = [
    'ui_mode' => 'embedded_page',
    'mode' => $isPaymentOneTime ? 'payment' : 'subscription',
    'return_url' => $returnUrl,
    'line_items[0][price_data][currency]' => 'usd',
    'line_items[0][price_data][product_data][name]' => $planName,
    'line_items[0][price_data][product_data][description]' => $description,
    'line_items[0][price_data][unit_amount]' => $amount,
    'line_items[0][quantity]' => 1
];

// Add recurring data if not a one-time purchase
$isTrial = false;
if (!$isPaymentOneTime) {
    $postFields['line_items[0][price_data][recurring][interval]'] = $interval;
    if (isset($intervalCount)) {
        $postFields['line_items[0][price_data][recurring][interval_count]'] = $intervalCount;
    }

    // 3-day free trial — Stripe still collects a card up front (standard,
    // secure behavior) but doesn't charge it until the trial ends.
    if ($wantsTrial) {
        $isTrial = true;
        $postFields['subscription_data[trial_period_days]'] = 3;
    }
}

// Tag the session with the logged-in user so the webhook knows whose
// Firestore record to update once payment completes. Session-level metadata
// is what the webhook reads from `checkout.session.completed` — it's present
// for both one-time and subscription mode. The subscription/payment-intent
// metadata is a second copy, useful for later events (e.g. renewals) that
// reference the subscription/payment-intent but not the original session.
if ($userId !== '') {
    $postFields['client_reference_id'] = $userId;
    $postFields['metadata[userId]'] = $userId;
    $postFields['metadata[plan]'] = $plan;
    if ($isTrial) {
        $postFields['metadata[trial]'] = 'true';
    }
    if ($isPaymentOneTime) {
        $postFields['payment_intent_data[metadata][userId]'] = $userId;
        $postFields['payment_intent_data[metadata][plan]'] = $plan;
    } else {
        $postFields['subscription_data[metadata][userId]'] = $userId;
        $postFields['subscription_data[metadata][plan]'] = $plan;
    }
}
if ($userEmail !== '' && filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    $postFields['customer_email'] = $userEmail;
}

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $secretKey,
    'Content-Type: application/x-www-form-urlencoded'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response;
    exit();
}

$responseData = json_decode($response, true);
echo json_encode([
    'clientSecret' => $responseData['client_secret'] ?? '',
    'sessionId' => $responseData['id'] ?? '',
    'url' => $responseData['url'] ?? ''
]);
