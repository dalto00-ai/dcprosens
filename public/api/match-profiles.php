<?php
// Public Gamer Match (Duo & Squad LFG) profiles backed by Firestore via Service Account.
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firestore.php';
require_once __DIR__ . '/lib/ratelimit.php';

header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = ['https://dcprosens.com', 'https://app.dcprosens.com'];
$requestOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
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

$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';

if (!$firebaseClientEmail || !$firebasePrivateKeyB64) {
    http_response_code(500);
    echo json_encode(['error' => 'Service is not configured.']);
    exit();
}

function clean_match_str(string $val, int $maxLen): string
{
    $val = strip_tags(trim($val));
    $val = preg_replace('/[\r\n\t]+/', ' ', $val) ?? '';
    if (mb_strlen($val) > $maxLen) {
        $val = mb_substr($val, 0, $maxLen);
    }
    return $val;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $privateKey = base64_decode($firebasePrivateKeyB64);
        $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);
        $rows = firestore_query_where($firebaseProjectId, $accessToken, 'match_profiles', 'status', 'active', 'createdAt', 40);

        $profiles = [];
        foreach ($rows as $r) {
            $profiles[] = [
                'id' => $r['_id'] ?? uniqid('mp_', true),
                'handle' => $r['handle'] ?? 'Player',
                'game' => $r['game'] ?? 'Valorant',
                'rank' => $r['rank'] ?? 'Unranked',
                'role' => $r['role'] ?? 'Flex',
                'platform' => $r['platform'] ?? 'PC',
                'region' => $r['region'] ?? 'NA',
                'cm360' => isset($r['cm360']) ? (int)$r['cm360'] : 42,
                'sensNote' => $r['sensNote'] ?? 'Calibrated',
                'mic' => !empty($r['mic']),
                'bio' => $r['bio'] ?? '',
                'contactTag' => $r['contactTag'] ?? '',
                'createdAt' => $r['createdAt'] ?? '',
            ];
        }
        echo json_encode(['profiles' => $profiles]);
    } catch (Throwable $e) {
        error_log('match-profiles.php GET: ' . $e->getMessage());
        echo json_encode(['profiles' => []]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    rate_limit_gc();
    rate_limit('match_profiles', 8, 600);

    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON payload.']);
        exit();
    }

    $action = clean_match_str((string)($input['action'] ?? 'create'), 20);

    try {
        $privateKey = base64_decode($firebasePrivateKeyB64);
        $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

        if ($action === 'report') {
            $targetId = clean_match_str((string)($input['targetId'] ?? ''), 80);
            $reason = clean_match_str((string)($input['reason'] ?? 'Inappropriate profile'), 200);
            if ($targetId === '') {
                http_response_code(400);
                echo json_encode(['error' => 'Missing targetId.']);
                exit();
            }
            firestore_add_document($firebaseProjectId, $accessToken, 'match_reports', [
                'targetId' => $targetId,
                'reason' => $reason,
                'createdAt' => gmdate('c'),
            ]);
            echo json_encode(['success' => true]);
            exit();
        }

        $handle = clean_match_str((string)($input['handle'] ?? ''), 32);
        $game = clean_match_str((string)($input['game'] ?? ''), 40);
        $rank = clean_match_str((string)($input['rank'] ?? ''), 32);
        $role = clean_match_str((string)($input['role'] ?? ''), 32);
        $platform = clean_match_str((string)($input['platform'] ?? 'PC'), 20);
        $region = clean_match_str((string)($input['region'] ?? 'NA'), 16);
        $sensNote = clean_match_str((string)($input['sensNote'] ?? ''), 48);
        $bio = clean_match_str((string)($input['bio'] ?? ''), 200);
        $contactTag = clean_match_str((string)($input['contactTag'] ?? ''), 48);
        $cm360 = max(10, min(120, (int)($input['cm360'] ?? 42)));
        $mic = !empty($input['mic']);

        $allowedGames = ['Valorant', 'CS2', 'GTA VI', 'Warzone / BO6', 'Apex Legends', 'Fortnite'];
        $allowedPlatforms = ['PC', 'PS5', 'Xbox'];
        $allowedRegions = ['NA', 'EU', 'BR/LATAM', 'APAC'];

        if ($handle === '' || $contactTag === '' || $bio === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Handle, Discord/PSN tag, and bio are required.']);
            exit();
        }
        if (!in_array($game, $allowedGames, true)) $game = 'Valorant';
        if (!in_array($platform, $allowedPlatforms, true)) $platform = 'PC';
        if (!in_array($region, $allowedRegions, true)) $region = 'NA';

        firestore_add_document($firebaseProjectId, $accessToken, 'match_profiles', [
            'handle' => $handle,
            'game' => $game,
            'rank' => $rank ?: 'Competitive',
            'role' => $role ?: 'Flex',
            'platform' => $platform,
            'region' => $region,
            'cm360' => $cm360,
            'sensNote' => $sensNote ?: ($cm360 . ' cm/360°'),
            'mic' => $mic,
            'bio' => $bio,
            'contactTag' => $contactTag,
            'status' => 'active',
            'createdAt' => gmdate('c'),
        ]);

        echo json_encode(['success' => true]);
    } catch (Throwable $e) {
        error_log('match-profiles.php POST: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Could not save player card right now.']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
