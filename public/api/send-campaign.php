<?php
// DCPROSENS Campaign Dispatcher via Hostinger Mail API
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/welcome-email.php';

// Only allow execution via authorized API key (from secrets.php) or local CLI
$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$providedKey = $_GET['key'] ?? ($input['key'] ?? ($_POST['key'] ?? ($_SERVER['HTTP_X_ADMIN_KEY'] ?? '')));

if (php_sapi_name() !== 'cli' && (!isset($adminSecret) || $adminSecret === '' || $providedKey !== $adminSecret)) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized access.']);
    exit();
}

$hostingerMcpToken = getenv('HOSTINGER_MCP_TOKEN') ?: '';
$campaignType = $input['campaign'] ?? ($_GET['campaign'] ?? 'welcome');

// No default recipient list — callers must explicitly pass `recipients`.
// (A hardcoded list of real registered users' emails used to live here; that
// leaked real PII into source control and echoed it back in the JSON response
// to anyone who knew the key. Removed 2026-08-23.)
$recipients = $input['recipients'] ?? [];
if (empty($recipients)) {
    http_response_code(400);
    echo json_encode(['error' => 'No recipients provided. Pass `recipients` explicitly.']);
    exit();
}
$results = [];

foreach ($recipients as $recipient) {
    $email = is_array($recipient) ? ($recipient['email'] ?? '') : (string)$recipient;
    $name = is_array($recipient) ? ($recipient['name'] ?? 'Player') : 'Player';

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $res = sendHostingerEmail($email, $name, $campaignType, $hostingerMcpToken);
        $results[] = [
            'email' => $email,
            'success' => $res['success'],
            'httpCode' => $res['httpCode'],
        ];
        // Polite delay to avoid rate limiting on Hostinger Mail API
        usleep(300000); // 300ms
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'campaign' => $campaignType,
    'total' => count($results),
    'successful' => count(array_filter($results, fn($r) => $r['success'])),
    'results' => $results
]);
