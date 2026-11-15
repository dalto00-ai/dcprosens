<?php
// Hostinger PHP Webhook & Mail Handler for Agentic Mail & Welcome Emails
require_once __DIR__ . '/lib/secrets.php';
require_once __DIR__ . '/lib/firestore.php';
header('Content-Type: application/json; charset=utf-8');

// Configuration
$hostingerMcpToken = getenv('HOSTINGER_MCP_TOKEN');
$fromEmail = 'support@dcprosens.com';
$fromName = 'DCPROSENS Team';

// Firebase service account — used only when this file is hit directly (see
// the "Direct Request Handler" below), to verify the caller is a real,
// just-registered account before sending anything. send-campaign.php's own
// admin-key check already gates the getEmailTemplate()/sendHostingerEmail()
// functions when *they* call in, so this doesn't affect that path.
$firebaseClientEmail = getenv('FIREBASE_CLIENT_EMAIL');
$firebasePrivateKeyB64 = getenv('FIREBASE_PRIVATE_KEY_B64');
$firebaseProjectId = getenv('FIREBASE_PROJECT_ID') ?: 'dcprosens-saas';

// CORS: allow requests from our official app & marketing domains
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

/**
 * Generates the responsive HTML template for DCPROSENS emails.
 */
function getEmailTemplate(string $type, string $userName = 'Player'): array {
    $cleanName = htmlspecialchars($userName !== '' ? $userName : 'Player');
    
    switch ($type) {
        case 'campaign_muscle_memory':
            $subject = "Why changing your sensitivity randomly ruins your aim (and the pro solution)";
            $bodyContent = '
                <h2 style="color: #ffffff; font-size: 22px; margin-top: 0; font-weight: 700;">The Sensitivity Placebo Trap</h2>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">Hey ' . $cleanName . ',</p>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">Have you ever tweaked your in-game sensitivity after a bad match, suddenly hit crisp shots for two days, and then started missing everything again?</p>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">This is known as the <strong>Sensitivity Placebo Trap</strong>. Changing your sensitivity forces your brain\'s cerebellum into temporary hyper-focus, but constantly switching breaks neural myelination and resets your motor muscle memory.</p>
                
                <div style="background: #15171e; border: 1px solid #232733; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #00ff9d; margin: 0 0 10px 0; font-size: 16px;">How Tier-1 Pros Build Untouchable Consistency:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #d0d0d8; line-height: 1.8; font-size: 14px;">
                        <li><strong>Lock in one cm/360 distance:</strong> Keep your physical 360° swipe identical across CS2, Valorant, Apex, and Call of Duty.</li>
                        <li><strong>Calibrate with the PSA Method:</strong> Mathematically discover your physiological sweet spot without guessing.</li>
                        <li><strong>Audit your hardware sensor:</strong> Measure real DPI deviation to prevent micro-stutters.</li>
                    </ul>
                </div>

                <p style="text-align: center; margin: 30px 0;">
                    <a href="https://dcprosens.com/psa-calculator/" style="display: inline-block; padding: 14px 28px; background: #00ff9d; color: #050507; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px;">Calibrate with PSA Calculator &rarr;</a>
                </p>
                <p style="font-size: 13px; color: #70707a; text-align: center;">Stop guessing. Lock in your muscle memory for good.</p>
            ';
            break;

        case 'campaign_vip_offer':
            $subject = "[VIP Invite] Unlock Aim Lab Pro & Custom Daily Aim Routines ⚡";
            $bodyContent = '
                <div style="display: inline-block; background: rgba(0, 255, 157, 0.1); border: 1px solid rgba(0, 255, 157, 0.3); border-radius: 20px; padding: 4px 12px; color: #00ff9d; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px;">Exclusive Member Invitation</div>
                <h2 style="color: #ffffff; font-size: 22px; margin-top: 0; font-weight: 700;">Ready to take your mechanics to Radiant & Faceit Level 10?</h2>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">Hey ' . $cleanName . ',</p>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">You already have an account on <strong>DCPROSENS</strong>, but you are only scratching the surface of what your aim is capable of.</p>
                
                <div style="background: #15171e; border: 1px solid #232733; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 16px;">What DCPROSENS Pro & Aim Lab Unlocks:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #d0d0d8; line-height: 1.8; font-size: 14px;">
                        <li><strong>Sub-Tick Reaction & Flick Telemetry:</strong> Detect whether you micro-overshoot or undershoot on diagonal targets.</li>
                        <li><strong>AI-Generated Daily Aim Routines:</strong> Custom 15-minute warmup playlists tailored to fix your mechanical weaknesses.</li>
                        <li><strong>Instant Cloud Settings Sync:</strong> Access all your calibrated profiles across any PC.</li>
                        <li><strong>100% Ad-Free VIP Experience:</strong> Zero distractions during training.</li>
                    </ul>
                </div>

                <div style="background: #090a0d; border: 1px dashed #00ff9d; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0;">
                    <p style="margin: 0; font-size: 15px; color: #ffffff;">Get started for just <strong>$4.08/month</strong> ($49/year Annual VIP Pass — Save 49%) or activate your <strong>3-Day Free Trial</strong> today.</p>
                </div>

                <p style="text-align: center; margin: 30px 0;">
                    <a href="https://app.dcprosens.com/dashboard/" style="display: inline-block; padding: 14px 32px; background: #00ff9d; color: #050507; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px;">Unlock DCPROSENS Pro Now &rarr;</a>
                </p>
                <p style="font-size: 12px; color: #70707a; text-align: center;">100% risk-free. Cancel anytime with a single click in your dashboard.</p>
            ';
            break;

        case 'welcome':
        default:
            $subject = "Welcome to DCPROSENS — Calibrate Your Aim in 15 Minutes 🎯";
            $bodyContent = '
                <h2 style="color: #ffffff; font-size: 22px; margin-top: 0; font-weight: 700;">Welcome to the Elite Aim Calibration Suite!</h2>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">Hi ' . $cleanName . ',</p>
                <p style="font-size: 15px; line-height: 1.7; color: #b0b0b8;">Thank you for joining <strong>DCPROSENS</strong>. You now have access to the world\'s most precise mouse sensitivity converter, pro player setups, and esports calibration utilities.</p>
                
                <div style="background: #15171e; border: 1px solid #232733; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #00ff9d; margin: 0 0 12px 0; font-size: 16px;">Your 3-Step Quick Start:</h3>
                    <ol style="margin: 0; padding-left: 20px; color: #d0d0d8; line-height: 1.8; font-size: 14px;">
                        <li><strong>Universal Sensitivity Converter:</strong> Convert your exact cm/360 across 70+ games with zero muscle memory loss.</li>
                        <li><strong>PSA Method Calculator:</strong> Scientifically calibrate your perfect natural sensitivity in 7 iterations.</li>
                        <li><strong>Pro Crosshair Generator:</strong> Copy pixel-perfect crosshair codes used by TenZ, s1mple, and Aspas.</li>
                    </ol>
                </div>

                <p style="text-align: center; margin: 30px 0;">
                    <a href="https://app.dcprosens.com/dashboard/" style="display: inline-block; padding: 14px 28px; background: #00ff9d; color: #050507; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px;">Access Your Pro Dashboard &rarr;</a>
                </p>
                <p style="font-size: 13px; color: #70707a; text-align: center;">Need help or have questions? Simply reply to this email.</p>
            ';
            break;
    }

    $fullHtml = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #050507; color: #ffffff; margin: 0; padding: 20px; }
            .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background: #0c0d12; border: 1px solid #1f222d; border-radius: 12px; overflow: hidden; }
            .header { background: #090a0d; padding: 24px; text-align: center; border-bottom: 1px solid #1f222d; }
            .logo { font-size: 22px; font-weight: 900; letter-spacing: 1px; color: #ffffff; }
            .logo span { color: #00ff9d; }
            .content { padding: 30px 25px; }
            .footer { background: #090a0d; border-top: 1px solid #1f222d; padding: 20px; font-size: 12px; color: #626470; text-align: center; line-height: 1.6; }
            .footer a { color: #8a8d9a; text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="header">
                <div class="logo">DC<span>PROSENS</span></div>
            </div>
            <div class="content">
                ' . $bodyContent . '
            </div>
            <div class="footer">
                &copy; ' . date('Y') . ' DCPROSENS. All rights reserved.<br>
                Empowering competitive gamers with mathematical precision.<br>
                <a href="https://dcprosens.com/privacy/">Privacy Policy</a> &bull; <a href="https://dcprosens.com/terms/">Terms of Service</a>
            </div>
        </div>
    </body>
    </html>';

    return ['subject' => $subject, 'html' => $fullHtml];
}

/**
 * Dispatches an email using Hostinger native PHP mail with full HTML MIME headers.
 */
function sendHostingerEmail(string $toEmail, string $userName, string $campaignType, string $mcpToken): array {
    $mailData = getEmailTemplate($campaignType, $userName);

    $subject = $mailData['subject'];
    $htmlContent = $mailData['html'];

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: DCPROSENS Team <support@dcprosens.com>\r\n";
    $headers .= "Reply-To: support@dcprosens.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    // Attempt PHP native mail dispatch (Hostinger Postfix/Sendmail)
    $mailSent = @mail($toEmail, $subject, $htmlContent, $headers);

    return [
        'success' => $mailSent,
        'httpCode' => $mailSent ? 200 : 500,
        'response' => $mailSent ? 'Mail sent via Hostinger server' : 'Mail failed to send',
        'error' => $mailSent ? null : 'Failed to dispatch via mail()',
    ];
}

// Direct Request Handler (called by the frontend right after a real Firebase
// signup — see src/app/login/page.tsx). There's no Firebase ID token here to
// verify the caller, so anyone could otherwise POST an arbitrary `email` and
// use this as a free, unlimited spam relay through our own mail server. The
// guard below closes that: only send if a Firestore /users doc with this
// exact email exists, was created in the last 30 minutes (i.e. this really
// is a fresh signup, not an older account being re-targeted), and hasn't
// already received its welcome email — which also makes each account only
// ever get one, instead of relying on the frontend to call this just once.
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'welcome-email.php') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        $email = trim((string)($input['email'] ?? ''));
        $name = trim((string)($input['name'] ?? 'Player'));
        $type = trim((string)($input['type'] ?? 'welcome'));

        if (!$hostingerMcpToken) {
            http_response_code(500);
            echo json_encode(['error' => 'Hostinger mail service is not configured.']);
            exit();
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address provided.']);
            exit();
        }

        if (!$firebaseClientEmail || !$firebasePrivateKeyB64) {
            http_response_code(500);
            echo json_encode(['error' => 'Service is not configured.']);
            exit();
        }

        try {
            $privateKey = base64_decode($firebasePrivateKeyB64);
            $accessToken = firestore_get_access_token($firebaseClientEmail, $privateKey);

            $matches = firestore_query_where($firebaseProjectId, $accessToken, 'users', 'email', $email, 'createdAt', 5);
            $account = $matches[0] ?? null;

            $createdAtOk = false;
            if ($account && !empty($account['createdAt'])) {
                $createdAtOk = (time() - strtotime((string)$account['createdAt'])) < 1800; // 30 minutes
            }

            if (!$account || !$createdAtOk || !empty($account['welcomeEmailSentAt'])) {
                // Not a fresh, verifiable signup — say nothing useful to the
                // caller (the frontend ignores this response either way).
                http_response_code(403);
                echo json_encode(['success' => false, 'error' => 'Not eligible for a welcome email.']);
                exit();
            }

            $result = sendHostingerEmail($email, $name, $type, $hostingerMcpToken);
            if ($result['success']) {
                firestore_update_user($firebaseProjectId, $accessToken, $account['_id'], [
                    'welcomeEmailSentAt' => gmdate('c'),
                ]);
            }

            echo json_encode([
                'success' => $result['success'],
                'message' => $result['success'] ? 'Email sent successfully' : 'Email failed to send',
                'details' => $result
            ]);
        } catch (Throwable $e) {
            http_response_code(500);
            error_log('welcome-email.php: ' . $e->getMessage());
            echo json_encode(['error' => 'Something went wrong.']);
            exit();
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed. Use POST.']);
    }
}
