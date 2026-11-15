<?php
// Verifies a completed Stripe Checkout session for eBook / Bundle downloads
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/ratelimit.php';

header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = ['https://dcprosens.com', 'https://app.dcprosens.com'];
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($requestOrigin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
} else {
    header('Access-Control-Allow-Origin: https://dcprosens.com');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

rate_limit_gc();
rate_limit('verify_ebook', 30, 600);

$sessionId = '';
if (isset($_GET['session_id'])) {
    $sessionId = trim((string)$_GET['session_id']);
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    if (is_array($input) && isset($input['session_id'])) {
        $sessionId = trim((string)$input['session_id']);
    }
}

if ($sessionId === '' || !preg_match('/^cs_(live|test)_[a-zA-Z0-9]+$/', $sessionId)) {
    http_response_code(400);
    echo json_encode([
        'verified' => false,
        'error' => 'Invalid or missing Stripe checkout session ID.'
    ]);
    exit();
}

$secretKey = getenv('STRIPE_SECRET_KEY');
if (!$secretKey) {
    http_response_code(500);
    echo json_encode([
        'verified' => false,
        'error' => 'Payment verification service is not configured.'
    ]);
    exit();
}

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions/' . urlencode($sessionId));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $secretKey,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    http_response_code(404);
    echo json_encode([
        'verified' => false,
        'error' => 'Checkout session could not be found.'
    ]);
    exit();
}

$session = json_decode($response, true);
$paymentStatus = $session['payment_status'] ?? '';
$status = $session['status'] ?? '';
$plan = strtolower((string)($session['metadata']['plan'] ?? 'master-omnibus-18vol'));

if ($paymentStatus !== 'paid' && $status !== 'complete') {
    http_response_code(402);
    echo json_encode([
        'verified' => false,
        'error' => 'Payment for this session has not been completed yet.'
    ]);
    exit();
}

echo json_encode([
    'verified' => true,
    'plan' => $plan,
    'customerEmail' => $session['customer_details']['email'] ?? ($session['customer_email'] ?? ''),
]);
