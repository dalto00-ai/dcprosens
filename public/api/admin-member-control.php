<?php
// Owner Admin Control API for DCPROSENS Community & Viral Studio
// Verifies Firebase ID token, confirms owner/admin email in Firestore,
// and updates target user access (Grant Lifetime, Grant Credits, Revoke Access).

require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firebase-auth.php';
require_once __DIR__ . '/lib/firestore.php';
require_once __DIR__ . '/lib/ratelimit.php';

header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = ['https://dcprosens.com', 'https://app.dcprosens.com', 'https://community.dcprosens.com'];
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
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

$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';
$callerUid = firebase_require_uid($firebaseProjectId);

rate_limit_gc();
rate_limit('admin_control', 40, 600, $callerUid);

$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebasePrivateKey = $firebasePrivateKeyB64 ? base64_decode($firebasePrivateKeyB64) : false;

if (!$firebaseClientEmail || !$firebasePrivateKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Server service account is not configured.']);
    exit();
}

try {
    $accessToken = firestore_get_access_token($firebaseClientEmail, $firebasePrivateKey);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not authenticate Firestore service account.']);
    exit();
}

// Verify caller is the site owner / admin in Firestore /users/{callerUid}
$callerUrl = "https://firestore.googleapis.com/v1/projects/{$firebaseProjectId}/databases/(default)/documents/users/{$callerUid}";
$ch = curl_init($callerUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);
$callerResp = curl_exec($ch);
$callerCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$callerDoc = $callerCode === 200 ? json_decode((string)$callerResp, true) : null;
$callerEmail = strtolower((string)($callerDoc['fields']['email']['stringValue'] ?? ''));
$callerRole = strtolower((string)($callerDoc['fields']['role']['stringValue'] ?? ''));

$adminAllowList = ['dalto00@gmail.com'];
if (!in_array($callerEmail, $adminAllowList, true) && $callerRole !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Admin privileges required.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit();
}

$targetUid = trim((string)($input['targetUid'] ?? ''));
$action = trim((string)($input['action'] ?? ''));

if ($targetUid === '' || !preg_match('/^[a-zA-Z0-9_-]{6,128}$/', $targetUid)) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid targetUid is required.']);
    exit();
}

$patchFields = [];
switch ($action) {
    case 'grant_lifetime':
        $patchFields = [
            'subscriptionStatus' => 'active',
            'subscriptionPlan' => 'lifetime',
            'adminGrantedAt' => gmdate('c'),
        ];
        break;
    case 'grant_vip_monthly':
        $patchFields = [
            'subscriptionStatus' => 'active',
            'subscriptionPlan' => 'gta6-vip-monthly',
            'adminGrantedAt' => gmdate('c'),
        ];
        break;
    case 'grant_video_100':
        $patchFields = [
            'videoCreditsPack' => 'creator-100',
            'videoCreditsGranted' => 100,
            'videoCreditsPurchasedAt' => gmdate('c'),
        ];
        break;
    case 'revoke_access':
        $patchFields = [
            'subscriptionStatus' => 'free',
            'subscriptionPlan' => 'free',
            'adminRevokedAt' => gmdate('c'),
        ];
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unsupported admin action.']);
        exit();
}

try {
    firestore_update_user($firebaseProjectId, $accessToken, $targetUid, $patchFields);
    echo json_encode([
        'ok' => true,
        'targetUid' => $targetUid,
        'action' => $action,
        'updatedFields' => $patchFields,
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update target user record.']);
}
