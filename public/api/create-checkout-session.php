<?php
// Hostinger PHP Endpoint for Stripe Embedded Checkout Session
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firebase-auth.php';
require_once __DIR__ . '/lib/ratelimit.php';
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
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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
// Verified uid, not a client-supplied string. The webhook grants premium to
// whatever uid the session carries, so letting the browser choose it meant a
// completed payment could be attributed to any account.
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';
$userId = firebase_uid_or_null($firebaseProjectId) ?? '';
$userEmail = isset($input['email']) ? trim((string)$input['email']) : '';
$wantsTrial = !empty($input['trial']);

// Validate origin against allowed list
if (!in_array($origin, $allowedOrigins, true)) {
    $origin = 'https://dcprosens.com';
}

// One-time products do not require a prior login session:
// Stripe collects the buyer's email directly during checkout.
$oneTimePlans = [
    'ebook', 'ebook-vol1', 'ebook-vol2', 'ebook-vol3', 'ebook-vol4', 'ebook-vol5', 'ebook-vol6',
    'ebook-vol7', 'ebook-vol8', 'ebook-vol9', 'ebook-vol10', 'ebook-vol11', 'ebook-vol12',
    'ebook-vol13', 'ebook-vol14', 'ebook-vol15', 'ebook-vol16', 'ebook-vol17', 'ebook-vol18',
    'ebook-bundle', 'master-bundle', 'master-omnibus-18vol', 'consultoria', 'vip-overhaul', 'aimlab', 'lifetime',
    'gta6-promo', 'winback-lifetime', 'creator-25', 'creator-100', 'sponsor-weekly'
];
$isPaymentOneTime = in_array($plan, $oneTimePlans, true);

// Note: Guest visitors are allowed to open Stripe Embedded Checkout directly
// (Stripe collects customer email at checkout); if logged in, their verified
// Firebase UID is attached to client_reference_id & metadata[userId].

rate_limit_gc();
rate_limit('checkout', 15, 600, $userId !== '' ? $userId : null);

// Price configuration (Live Stripe setup) — matches frontend pricing & Ebook catalog
switch ($plan) {
    case 'gta6-promo':
        $amount = 799;   // $7.99 USD (50% OFF Launch Promo)
        $planName = 'GTA VI Day-One Pro Calibration Pack + Vol 02 Field Guide (Launch 50% OFF)';
        $isPaymentOneTime = true;
        break;
    case 'gta6-vip-monthly':
        $amount = 499;   // $4.99/month
        $interval = 'month';
        $planName = 'DCPROSENS Pro + GTA VI Leonida Syndicate VIP (Monthly Pass)';
        break;
    case 'winback-50':
        $amount = 399;   // $3.99/month (50% OFF Retention Offer)
        $interval = 'month';
        $planName = 'DCPROSENS VIP Community & Pro Tools (50% OFF Member Win-Back)';
        break;
    case 'winback-lifetime':
        $amount = 2499;  // $24.99 USD one-time (50% OFF Retention Lifetime)
        $planName = 'DCPROSENS Founder Lifetime VIP Pass (50% OFF Member Win-Back)';
        $isPaymentOneTime = true;
        break;
    case 'creator-25':
        $amount = 999;   // $9.99 USD one-time (25 HD Video Credits)
        $planName = 'DCPROSENS Viral Video Studio — 25 HD 60fps Video Exports (No Watermark)';
        $isPaymentOneTime = true;
        break;
    case 'creator-100':
        $amount = 1499;  // $14.99 USD one-time (100 HD Video Credits — 50% OFF)
        $planName = 'DCPROSENS Viral Video Studio — 100 HD 60fps Video Credits Pack (50% OFF)';
        $isPaymentOneTime = true;
        break;
    case 'sponsor-weekly':
        $amount = 4900;  // $49.00 USD one-time (7-Day Sponsored Slot)
        $planName = 'DCPROSENS Featured Partner Slot (7-Day Sponsored Placement)';
        $isPaymentOneTime = true;
        break;
    case 'master-omnibus-18vol':
    case 'ebook-bundle':
    case 'master-bundle':
        $amount = 3999;  // $39.99 USD
        $planName = 'The Complete 18-Volume Master Omnibus + Lifetime Founder Pro Pass';
        $isPaymentOneTime = true;
        break;
    case 'consultoria':
    case 'vip-overhaul':
        $amount = 9700;  // $97.00 USD
        $planName = 'DCPROSENS 360° VIP Overhaul Consultation + Optimizer Engine';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol1':
        $amount = 1499;
        $planName = 'Vol 01: The Precision Aim System Manifesto (eBook & Calibration Guide)';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol2':
        $amount = 1499;
        $planName = 'Vol 02: GTA VI Pro Aim & Controller Field Guide (eBook & Telemetry Guide)';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol3':
        $amount = 1499;
        $planName = 'Vol 03: CS2 Sub-Tick Aim & Autoexec Field Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol4':
        $amount = 1499;
        $planName = 'Vol 04: Valorant Radiant Aim & eDPI Field Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol5':
        $amount = 1499;
        $planName = 'Vol 05: Warzone, BO6 & Apex Tracking Field Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol6':
        $amount = 1499;
        $planName = 'Vol 06: Zero-Latency PC & Sensor Hardware Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol7':
        $amount = 1499;
        $planName = 'Vol 07: The Architect of Precision: 1:1 Engine Yaw Blueprint';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol8':
        $amount = 1499;
        $planName = 'Vol 08: Apex Legends Competitive ALC & Recoil Smoothing';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol9':
        $amount = 1499;
        $planName = 'Vol 09: Overwatch 2 Hitscan, Projectile & Relative Zoom';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol10':
        $amount = 1499;
        $planName = 'Vol 10: Deadlock Eternus Aim & Soul Orb Flick Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol11':
        $amount = 1499;
        $planName = 'Vol 11: Marvel Rivals Competitive Hero Crosshair & Aim';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol12':
        $amount = 1499;
        $planName = 'Vol 12: Rainbow Six Siege Ranked 3.0 Multiplier & ACOG';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol13':
        $amount = 1499;
        $planName = 'Vol 13: Fortnite Competitive Targeting Scope & Pad Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol14':
        $amount = 1499;
        $planName = 'Vol 14: Escape From Tarkov 1.0 & Gray Zone Ballistics';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol15':
        $amount = 1499;
        $planName = 'Vol 15: Delta Force, FragPunk & Arc Raiders Tactical Guide';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol16':
        $amount = 1499;
        $planName = 'Vol 16: Rapid Trigger, Hall Effect & Snap Tap Movement Bible';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol17':
        $amount = 1499;
        $planName = 'Vol 17: The Pro Controller Bible: TMR Sticks, ALC & Aim Assist';
        $isPaymentOneTime = true;
        break;
    case 'ebook-vol18':
        $amount = 1499;
        $planName = 'Vol 18: The 2026 Esports Peripherals Buyers Matrix & Setup';
        $isPaymentOneTime = true;
        break;
    case 'ebook':
        $amount = 1499;   // $14.99 USD
        $planName = isset($input['title']) && trim($input['title']) !== '' ? trim($input['title']) : 'DCPROSENS Esports Field Guide (Instant PDF Download)';
        $isPaymentOneTime = true;
        break;
    case 'aimlab':
        $amount = 100;   // $1.00 USD, one-time, standalone
        $planName = 'DCPROSENS Aim Lab (Standalone Access)';
        $isPaymentOneTime = true;
        break;
    case 'lifetime':
        $amount = 12900; // $129.00 one-time Founder VIP Pass
        $planName = 'DCPROSENS Pro Membership & Community (Lifetime Founder VIP)';
        $isPaymentOneTime = true;
        break;
    case 'annual':
        $amount = 4900;  // $49.00/year ($4.08/mo)
        $interval = 'year';
        $planName = 'DCPROSENS Pro Membership & Community (Annual VIP Pass)';
        break;
    default: // monthly
        $amount = 799;   // $7.99/month
        $interval = 'month';
        $planName = 'DCPROSENS Pro Membership & Community (Monthly Pass)';
        break;
}

// Read Stripe secret key from environment variable (set in Hostinger hPanel).
$secretKey = getenv('STRIPE_SECRET_KEY');
if (!$secretKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Payment service is not configured. Please contact support.']);
    exit();
}

// Define return URLs based on product
if (strpos($plan, 'ebook') !== false || strpos($plan, 'bundle') !== false || strpos($plan, 'omnibus') !== false || $plan === 'gta6-promo') {
    $returnUrl = $origin . '/ebooks/download/?payment=success&session_id={CHECKOUT_SESSION_ID}';
} elseif ($plan === 'consultoria' || $plan === 'vip-overhaul') {
    $returnUrl = $origin . '/vip-overhaul/?payment=success&session_id={CHECKOUT_SESSION_ID}';
} elseif ($plan === 'aimlab') {
    $returnUrl = $origin . '/aim-lab/?payment=success&session_id={CHECKOUT_SESSION_ID}';
} elseif ($plan === 'creator-25' || $plan === 'creator-100') {
    $returnUrl = $origin . '/viral-studio/?payment=success&plan=' . urlencode($plan) . '&session_id={CHECKOUT_SESSION_ID}';
} elseif ($plan === 'winback-50' || $plan === 'winback-lifetime') {
    $returnUrl = $origin . '/community/?payment=success&plan=' . urlencode($plan) . '&session_id={CHECKOUT_SESSION_ID}';
} elseif ($plan === 'sponsor-weekly') {
    $returnUrl = $origin . '/advertise/?payment=success&session_id={CHECKOUT_SESSION_ID}';
} else {
    $returnUrl = $origin . '/dashboard/?payment=success&session_id={CHECKOUT_SESSION_ID}';
}

$descriptions = [
    'gta6-promo' => 'GTA VI Complete Launch Bible & Pro Aim Companion PDF (11 Pages): 61 Cheat Codes & Unlocks, 55-Trophy Platinum Roadmap, PS5 Pro/Xbox Settings & Deadzone Curves',
    'gta6-vip-monthly' => 'Full access to GTA VI Command Center Pro Presets, Leonida Syndicate VIP Community, Aim Lab & Cloud Sync',
    'winback-50' => '50% OFF Ex-Member Retention Offer: Full VIP Community Channels, Pro Calibration Tools & Weekly Meta Updates',
    'winback-lifetime' => '50% OFF Lifetime Founder Pass: Permanent access to all VIP Community channels and Pro tools forever',
    'creator-25' => '25 High-Bitrate 1080x1920 60fps Viral Short Video Exports without watermark + Pro Streamer HUD templates',
    'creator-100' => '100 High-Bitrate 1080x1920 60fps Viral Short Video Exports without watermark (50% OFF Creator Bundle)',
    'sponsor-weekly' => '7-Day Featured Partner Placement on GTA VI Command Center & Hardware Diagnostic Suite (Includes Logo, CTA & Link)',
    'master-omnibus-18vol' => 'Lifetime Founder VIP Access + Complete 18-Volume Esports Technical Field Guides Master Omnibus (Instant PDF + Pro Pass)',
    'ebook-bundle' => 'All Master Field Guides: Sensitivity, Crosshair, Warm-Up, Friction, Input Lag & Controller (Instant PDF Access)',
    'master-bundle' => 'All Master Field Guides: Sensitivity, Crosshair, Warm-Up, Friction, Input Lag & Controller (Instant PDF Access)',
    'ebook-vol1' => 'Vol 01: The Precision Aim System Manifesto — Neuromuscular Calibration, 7-Step PSA & 0% MDM Math',
    'ebook-vol2' => 'Vol 02: GTA VI Complete Launch Bible & Pro Aim Guide — Cheats, 55 Trophies, PS5/Xbox Settings & RAGE Deadzone Calibration',
    'consultoria' => '45-Minute 1:1 VIP Session, DCPROSENS Optimizer Engine v1.0, Biomechanical Aim Calibration & All eBooks',
    'vip-overhaul' => '45-Minute 1:1 VIP Session, DCPROSENS Optimizer Engine v1.0, Biomechanical Aim Calibration & All eBooks',
    'ebook' => 'Tactical FPS Field Guide & Printable Worksheets (Instant PDF Download)',
    'lifetime' => 'One-time payment. Permanent access to all pro tools & VIP lounge forever.',
    'aimlab' => 'Permanent standalone access to Aim Lab.',
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

    if ($wantsTrial) {
        $isTrial = true;
        $postFields['subscription_data[trial_period_days]'] = 3;
    }
}

// Tag the session with product and user metadata so the webhook knows whose
// Firestore record to update once payment completes.
$postFields['metadata[plan]'] = $plan;
if ($userId !== '') {
    $postFields['client_reference_id'] = $userId;
    $postFields['metadata[userId]'] = $userId;
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
} elseif ($isPaymentOneTime) {
    $postFields['payment_intent_data[metadata][plan]'] = $plan;
}
$clientIp = rate_limit_client_ip();
$postFields['billing_address_collection'] = 'auto';
$postFields['metadata[clientIp]'] = $clientIp;

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
