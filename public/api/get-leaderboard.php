<?php
// Publicly readable top scores for a given game+mode. Read-only, no CORS
// restriction (same reasoning as get-reviews.php — nothing private exposed).
// Every user's own multiple runs are collapsed down to their single best
// score before ranking, so one player spamming attempts can't fill the
// entire board with their own name.
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

$game = isset($_GET['game']) ? trim((string)$_GET['game']) : 'aim-trainer';
$mode = isset($_GET['mode']) ? trim((string)$_GET['mode']) : 'gridshot';
$limit = isset($_GET['limit']) ? min(50, max(1, (int)$_GET['limit'])) : 10;
$boardId = $game . ':' . $mode;

$ALLOWED_BUCKETS = ['lt400', '400to800', '800to1600', 'gte1600'];
$dpiBucket = isset($_GET['dpiBucket']) ? trim((string)$_GET['dpiBucket']) : '';
if (!in_array($dpiBucket, $ALLOWED_BUCKETS, true)) {
    $dpiBucket = '';
}

try {
    $privateKey = base64_decode($firebasePrivateKeyB64);
    $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

    // Fetch a generous batch (well beyond $limit) since many rows collapse
    // down to one best-score-per-user entry before the final ranking.
    $rows = firestore_query_where($firebaseProjectId, $accessToken, 'leaderboard', 'boardId', $boardId, 'score', 200);

    $bestByUser = [];
    foreach ($rows as $row) {
        $uid = $row['userId'] ?? '';
        if ($uid === '') continue;
        if ($dpiBucket !== '' && ($row['dpiBucket'] ?? '') !== $dpiBucket) continue;
        if (!isset($bestByUser[$uid]) || ($row['score'] ?? 0) > $bestByUser[$uid]['score']) {
            $bestByUser[$uid] = [
                'displayName' => $row['displayName'] ?? 'Anonymous',
                'score' => (int)($row['score'] ?? 0),
                'createdAt' => $row['createdAt'] ?? '',
            ];
        }
    }

    $ranked = array_values($bestByUser);
    usort($ranked, fn($a, $b) => $b['score'] <=> $a['score']);
    $ranked = array_slice($ranked, 0, $limit);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('get-leaderboard.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Something went wrong.']);
    exit();
}

echo json_encode(['scores' => $ranked]);
