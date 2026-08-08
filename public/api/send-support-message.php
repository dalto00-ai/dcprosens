<?php
// Hostinger PHP Endpoint — sends a dashboard support request to support@dcprosens.com
header('Content-Type: application/json; charset=utf-8');

// CORS: Only allow requests from our own domains
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

$hostingerMcpToken = getenv('HOSTINGER_MCP_TOKEN');
if (!$hostingerMcpToken) {
    http_response_code(500);
    echo json_encode(['error' => 'Mail service is not configured.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$fromEmail = isset($input['email']) ? trim((string)$input['email']) : '';
$fromName = isset($input['name']) && trim((string)$input['name']) !== '' ? trim((string)$input['name']) : 'DCPROSENS User';
$subject = isset($input['subject']) ? trim((string)$input['subject']) : '';
$message = isset($input['message']) ? trim((string)$input['message']) : '';

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'A valid email is required.']);
    exit();
}
if ($subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Subject and message are required.']);
    exit();
}
// Basic abuse guardrails — this is a public-facing endpoint
if (mb_strlen($subject) > 150 || mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Subject or message is too long.']);
    exit();
}

$safeName = htmlspecialchars($fromName, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($fromEmail, ENT_QUOTES, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$htmlBody = '
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background:#050507; color:#fff; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#0f1014; border:1px solid #2a2a2a; border-radius:12px; padding:30px;">
        <h2 style="color:#00ff9d; margin-top:0;">New Support Request</h2>
        <p><strong>From:</strong> ' . $safeName . ' (' . $safeEmail . ')</p>
        <p><strong>Subject:</strong> ' . $safeSubject . '</p>
        <div style="border-top:1px solid #2a2a2a; margin-top:16px; padding-top:16px; line-height:1.6; color:#cbd5e1;">' . $safeMessage . '</div>
    </div>
</body>
</html>';

$ch = curl_init('https://mcp.mail.hostinger.com/api/v1/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => ['email' => 'support@dcprosens.com', 'name' => 'DCPROSENS Support Form'],
    'to' => [['email' => 'support@dcprosens.com']],
    'reply_to' => ['email' => $fromEmail, 'name' => $fromName],
    'subject' => '[Support] ' . $subject,
    'html' => $htmlBody,
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $hostingerMcpToken,
    'Content-Type: application/json',
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to send message. Please try again or email support@dcprosens.com directly.']);
    exit();
}

echo json_encode(['success' => true, 'message' => 'Message sent! We will reply to your email soon.']);
