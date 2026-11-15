<?php
// Publicly readable — returns only status=approved reviews. Read-only, no
// CORS restriction needed on the origin since this exposes nothing private.
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firestore.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

$page = isset($_GET['page']) ? trim((string)$_GET['page']) : 'general';
$limit = isset($_GET['limit']) ? min(50, max(1, (int)$_GET['limit'])) : 20;

try {
    $privateKey = base64_decode($firebasePrivateKeyB64);
    $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

    $reviews = firestore_query_where($firebaseProjectId, $accessToken, 'reviews', 'status', 'approved', 'createdAt', $limit * 5);
    $reviews = array_values(array_filter($reviews, fn($r) => ($r['page'] ?? '') === $page));
    $reviews = array_slice($reviews, 0, $limit);

    // Don't leak internal doc IDs or the moderation field to the client.
    $reviews = array_map(fn($r) => [
        'name' => $r['name'] ?? '',
        'rating' => $r['rating'] ?? 0,
        'comment' => $r['comment'] ?? '',
        'createdAt' => $r['createdAt'] ?? '',
    ], $reviews);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('get-reviews.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Something went wrong.']);
    exit();
}

echo json_encode(['reviews' => $reviews]);
