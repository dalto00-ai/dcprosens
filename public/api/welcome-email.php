<?php
// Hostinger PHP Webhook & Mail Handler for Agentic Mail & Welcome Emails
header('Content-Type: application/json; charset=utf-8');

// Configurações
// No hardcoded fallback: a live API token must never live in a file served
// from a public web root. Fail loudly instead of silently using a real token.
$hostingerMcpToken = getenv('HOSTINGER_MCP_TOKEN');
$fromEmail = 'support@dcprosens.com';
$fromName = 'DCPROSENS Support';

// Função para enviar e-mail de boas-vindas via Hostinger Agentic Mail API
function sendWelcomeEmail($toEmail, $userName = 'Gamer', $mcpToken = '') {
    $subject = "Welcome to DCPROSENS Pro — Boost Your Aim & Sensitivity!";
    
    $htmlBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; background-color: #050507; color: #ffffff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #0f1014; border: 1px solid #2a2a2a; border-radius: 12px; padding: 30px; }
            .header { text-align: center; border-bottom: 1px solid #2a2a2a; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #00ff9d; }
            .content { padding: 20px 0; line-height: 1.6; color: #b0b0b8; }
            .button { display: inline-block; padding: 12px 24px; background: #00ff9d; color: #000000; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px; }
            .footer { border-top: 1px solid #2a2a2a; padding-top: 20px; font-size: 12px; color: #888894; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">DCPROSENS</div>
            </div>
            <div class="content">
                <h2 style="color: #ffffff;">Welcome to the Elite Calibration Platform!</h2>
                <p>Hi ' . htmlspecialchars($userName) . ',</p>
                <p>Thank you for joining <strong>DCPROSENS</strong>. You now have full access to the ultimate sensitivity converter, pro player setups, PSA calculator, crosshair database, and 24+ gaming tools.</p>
                <p><strong>Here is how to get started:</strong></p>
                <ul>
                    <li><strong>Convert Sensitivity:</strong> Match your cm/360 perfectly across 15+ games.</li>
                    <li><strong>PSA Method:</strong> Find your scientifically perfect sensitivity in 7 steps.</li>
                    <li><strong>Pro Database:</strong> Study and compare settings used by TenZ, s1mple, Aspas, and more.</li>
                </ul>
                <p style="text-align: center;">
                    <a href="https://app.dcprosens.com/dashboard" class="button">Access Your Dashboard</a>
                </p>
                <p>If you have any questions or need support, simply reply to this email at <a href="mailto:support@dcprosens.com" style="color: #00ff9d;">support@dcprosens.com</a>.</p>
            </div>
            <div class="footer">
                &copy; ' . date('Y') . ' DCPROSENS. All rights reserved.<br>
                Powered by DCOUTLIER
            </div>
        </div>
    </body>
    </html>';

    // Dispara via Hostinger Mail API usando o token MCP
    $ch = curl_init('https://mcp.mail.hostinger.com/api/v1/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'from' => ['email' => 'support@dcprosens.com', 'name' => 'DCPROSENS Team'],
        'to' => [['email' => $toEmail]],
        'subject' => $subject,
        'html' => $htmlBody
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $mcpToken,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

// Recebe requisição de webhook ou cadastro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $name = $input['name'] ?? 'Gamer';

    if (!$hostingerMcpToken) {
        http_response_code(500);
        echo json_encode(['error' => 'Mail service is not configured.']);
        exit();
    }

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = sendWelcomeEmail($email, $name, $hostingerMcpToken);
        echo json_encode(['success' => true, 'message' => 'Welcome email queued successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
    }
} else {
    echo json_encode(['status' => 'Agentic Mail Webhook Handler Active', 'email' => 'support@dcprosens.com']);
}
