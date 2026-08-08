<?php
// Submits a review — always lands as `status: pending`. Reviews only ever
// become visible on the site after a human approves them in the Firestore
// console (see secrets/README.md-adjacent docs / project notes for how).
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

$name = isset($input['name']) ? trim((string)$input['name']) : '';
$rating = isset($input['rating']) ? (int)$input['rating'] : 0;
$comment = isset($input['comment']) ? trim((string)$input['comment']) : '';
$page = isset($input['page']) ? trim((string)$input['page']) : 'general';

if ($name === '' || mb_strlen($name) > 60) {
    http_response_code(400);
    echo json_encode(['error' => 'Name is required (max 60 characters).']);
    exit();
}
if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(['error' => 'Rating must be between 1 and 5.']);
    exit();
}
if ($comment === '' || mb_strlen($comment) > 1000) {
    http_response_code(400);
    echo json_encode(['error' => 'Comment is required (max 1000 characters).']);
    exit();
}
if (mb_strlen($page) > 60) {
    $page = substr($page, 0, 60);
}

try {
    $privateKey = base64_decode($firebasePrivateKeyB64);
    $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

    firestore_add_document($firebaseProjectId, $accessToken, 'reviews', [
        'name' => $name,
        'rating' => $rating,
        'comment' => $comment,
        'page' => $page,
        'status' => 'pending',
        'createdAt' => gmdate('c'),
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('submit-review.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Something went wrong. Please try again.']);
    exit();
}

echo json_encode(['success' => true, 'message' => 'Thanks! Your review will appear after a quick review.']);
