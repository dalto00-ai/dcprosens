<?php
// Generic "notify me" waitlist signup — writes to a Firestore `waitlist`
// collection. Used today by the GTA VI sensitivity converter pre-launch page.
require_once __DIR__ . '/lib/firestore.php';

header('Content-Type: application/json; charset=utf-8');

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

$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';
if (!$firebaseClientEmail || !$firebasePrivateKeyB64) {
    http_response_code(500);
    echo json_encode(['error' => 'Service is not configured.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = isset($input['email']) ? trim((string)$input['email']) : '';
$topic = isset($input['topic']) ? trim((string)$input['topic']) : 'general';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'A valid email is required.']);
    exit();
}
if (mb_strlen($topic) > 60) {
    $topic = substr($topic, 0, 60);
}

try {
    $privateKey = base64_decode($firebasePrivateKeyB64);
    $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

    firestore_add_document($firebaseProjectId, $accessToken, 'waitlist', [
        'email' => $email,
        'topic' => $topic,
        'createdAt' => gmdate('c'),
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('notify-me.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Something went wrong. Please try again.']);
    exit();
}

echo json_encode(['success' => true]);
