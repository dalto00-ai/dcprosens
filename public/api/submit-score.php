<?php
// Submits a leaderboard score for Aim Trainer / Aim Lab. Requires a logged-in
// user (client_reference is the Firebase uid) — anonymous scores are never
// stored, since there'd be nothing to rank them under and no way to prevent
// the same person from flooding the board under a new name every submit.
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firestore.php';
require_once __DIR__ . '/lib/firebase-auth.php';
require_once __DIR__ . '/lib/ratelimit.php';

header('Content-Type: application/json; charset=utf-8');

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

// The uid comes from a verified Firebase ID token, never from the body. Any
// client used to be able to post scores under somebody else's uid; the later
// "does this user exist?" lookup only proved the account was real, not that the
// caller owned it.
$userId = firebase_require_uid($firebaseProjectId);
rate_limit_gc();
rate_limit('submit-score', 30, 600, $userId);
$displayName = isset($input['displayName']) ? trim((string)$input['displayName']) : '';
$game = isset($input['game']) ? trim((string)$input['game']) : '';
$mode = isset($input['mode']) ? trim((string)$input['mode']) : '';
$score = isset($input['score']) ? (int)$input['score'] : -1;
$dpi = isset($input['dpi']) ? (int)$input['dpi'] : 0;

$ALLOWED_GAMES = ['aim-trainer', 'aim-lab'];
$ALLOWED_MODES = ['gridshot', 'tracking', 'reflex', 'microflick', 'dynamicclick', 'strafepeek', 'ghostvspro'];

if ($displayName === '') {
    $displayName = 'Anonymous';
}
if (mb_strlen($displayName) > 40) {
    $displayName = mb_substr($displayName, 0, 40);
}
if (!in_array($game, $ALLOWED_GAMES, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid game.']);
    exit();
}
if (!in_array($mode, $ALLOWED_MODES, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid mode.']);
    exit();
}
if ($score < 0 || $score > 1000000) {
    http_response_code(400);
    echo json_encode(['error' => 'Score out of range.']);
    exit();
}
if ($dpi < 0 || $dpi > 100000) {
    $dpi = 0;
}

// Buckets the raw DPI into a coarse range so the leaderboard can filter by
// "playstyle" without needing an exact-match query on a noisy numeric field.
function dcprosens_dpi_bucket(int $dpi): string {
    if ($dpi <= 0) return 'unknown';
    if ($dpi < 400) return 'lt400';
    if ($dpi < 800) return '400to800';
    if ($dpi < 1600) return '800to1600';
    return 'gte1600';
}
$dpiBucket = dcprosens_dpi_bucket($dpi);

try {
    $privateKey = base64_decode($firebasePrivateKeyB64);
    $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

    // Require a real registered account behind this userId — without this,
    // anyone can script arbitrary submissions under made-up ids and flood
    // the board (the per-user best-score collapse in get-leaderboard.php
    // only limits a *known* user to one entry, it doesn't stop fake ones).
    $user = firestore_get_document($firebaseProjectId, $accessToken, 'users', $userId);
    if ($user === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid user.']);
        exit();
    }

    firestore_add_document($firebaseProjectId, $accessToken, 'leaderboard', [
        'userId' => $userId,
        'displayName' => $displayName,
        'game' => $game,
        'mode' => $mode,
        'boardId' => $game . ':' . $mode,
        'score' => $score,
        'dpi' => $dpi,
        'dpiBucket' => $dpiBucket,
        'createdAt' => gmdate('c'),
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    error_log('submit-score.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Something went wrong. Please try again.']);
    exit();
}

echo json_encode(['success' => true]);
