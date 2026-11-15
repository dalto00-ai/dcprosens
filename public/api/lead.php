<?php
// Ebook Lead Capture Endpoint — writes to Firestore `leads` collection.
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/ratelimit.php';
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

rate_limit_gc();
rate_limit('lead', 10, 3600);

$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim((string)$input['name']) : '';
$email = isset($input['email']) ? trim((string)$input['email']) : '';
$game = isset($input['game']) ? trim((string)$input['game']) : 'valorant';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'A valid email is required.']);
    exit();
}

if ($firebaseClientEmail && $firebasePrivateKeyB64) {
    try {
        $privateKey = base64_decode($firebasePrivateKeyB64);
        $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

        firestore_add_document($firebaseProjectId, $accessToken, 'leads', [
            'name' => mb_substr($name, 0, 80),
            'email' => $email,
            'game' => mb_substr($game, 0, 40),
            'source' => 'ebook_checklist',
            'createdAt' => gmdate('c'),
        ]);
    } catch (Throwable $e) {
        error_log('lead.php: ' . $e->getMessage());
    }
}

echo json_encode(['success' => true]);

