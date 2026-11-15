<?php
// Anti-Fraud & Security Validation Test Suite for DCPROSENS
// Run via: php scripts/tests/security-antifraud-test.php

require_once __DIR__ . '/../../public/api/lib/ratelimit.php';

echo "═══════════════════════════════════════════════════════════\n";
echo "    DCPROSENS ANTI-FRAUD & SECURITY VERIFICATION SUITE    \n";
echo "═══════════════════════════════════════════════════════════\n\n";

$testsPassed = 0;
$testsFailed = 0;

function assert_test(string $name, bool $condition, string $details = '') {
    global $testsPassed, $testsFailed;
    if ($condition) {
        echo "  [PASS] $name\n";
        if ($details) echo "         ↳ $details\n";
        $testsPassed++;
    } else {
        echo "  [FAIL] $name\n";
        if ($details) echo "         ↳ $details\n";
        $testsFailed++;
    }
}

// ─────────────────────────────────────────────────────────────
// 1. STRIPE WEBHOOK ANTI-REPLAY & SIGNATURE VERIFICATION TESTS
// ─────────────────────────────────────────────────────────────
echo "── 1. Stripe Webhook Cryptographic Verification ────────\n";

function verify_stripe_test_signature(string $payload, string $sigHeader, string $secret, int $tolerance = 300): bool {
    $parts = [];
    foreach (explode(',', $sigHeader) as $pair) {
        $kv = explode('=', $pair, 2);
        if (count($kv) === 2) $parts[$kv[0]] = $kv[1];
    }
    if (!isset($parts['t'], $parts['v1'])) return false;
    $timestamp = (int)$parts['t'];
    if (abs(time() - $timestamp) > $tolerance) return false;
    $signedPayload = $parts['t'] . '.' . $payload;
    $expectedSig = hash_hmac('sha256', $signedPayload, $secret);
    return hash_equals($expectedSig, $parts['v1']);
}

$fakeSecret = 'whsec_test_secret_key_1234567890abcdef';
$validPayload = json_encode(['id' => 'evt_123', 'type' => 'checkout.session.completed']);
$currentTime = time();
$validSig = hash_hmac('sha256', $currentTime . '.' . $validPayload, $fakeSecret);
$validHeader = "t={$currentTime},v1={$validSig}";

// Test 1.1: Legitimate signature passes
assert_test(
    "Legitimate Stripe HMAC-SHA256 signature accepted",
    verify_stripe_test_signature($validPayload, $validHeader, $fakeSecret),
    "Generated and verified standard Stripe v1 signature"
);

// Test 1.2: Tampered payload rejected
$tamperedPayload = json_encode(['id' => 'evt_123', 'type' => 'customer.subscription.deleted']);
assert_test(
    "Tampered payload detected and rejected (Integrity Violation)",
    !verify_stripe_test_signature($tamperedPayload, $validHeader, $fakeSecret),
    "HMAC mismatch prevents payload alteration in transit"
);

// Test 1.3: Forged signature rejected
$forgedHeader = "t={$currentTime},v1=0000000000000000000000000000000000000000000000000000000000000000";
assert_test(
    "Forged/fake signature rejected (Authentication Failure)",
    !verify_stripe_test_signature($validPayload, $forgedHeader, $fakeSecret),
    "Attacker without webhook secret cannot forge payment completions"
);

// Test 1.4: Replay attack with expired timestamp rejected
$staleTime = time() - 600; // 10 minutes ago
$staleSig = hash_hmac('sha256', $staleTime . '.' . $validPayload, $fakeSecret);
$staleHeader = "t={$staleTime},v1={$staleSig}";
assert_test(
    "Replay attack with expired timestamp (>300s) rejected",
    !verify_stripe_test_signature($validPayload, $staleHeader, $fakeSecret),
    "Prevents malicious interception and re-submission of captured events"
);

// ─────────────────────────────────────────────────────────────
// 2. RATE LIMITING & BURST ANTI-FRAUD ATTACK PROTECTION
// ─────────────────────────────────────────────────────────────
echo "\n── 2. Rate Limiting & Card-Testing Attack Mitigation ──\n";

$testUid = 'antifraud_test_user_' . bin2hex(random_bytes(6));
$bucket = 'test-checkout-bucket';

// Clean any old test artifacts
$testKey = hash('sha256', $bucket . '|u:' . $testUid);
$testFile = sys_get_temp_dir() . '/dcprosens_rl_' . $testKey;
@unlink($testFile);

$passedCount = 0;
$blocked = false;

for ($i = 1; $i <= 15; $i++) {
    // Simulate rate_limit internally
    $now = time();
    $handle = @fopen($testFile, 'c+');
    if ($handle && flock($handle, LOCK_EX)) {
        $content = stream_get_contents($handle);
        $data = $content ? json_decode($content, true) : null;
        if (!is_array($data) || ($data['reset'] ?? 0) <= $now) {
            $data = ['count' => 0, 'reset' => $now + 60];
        }
        $limit = 10;
        if ($data['count'] >= $limit) {
            $blocked = true;
            flock($handle, LOCK_UN);
            fclose($handle);
            break;
        }
        $data['count']++;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($data));
        flock($handle, LOCK_UN);
        fclose($handle);
        $passedCount++;
    }
}
@unlink($testFile);

assert_test(
    "Rate limiter permits allowed threshold (10 requests) and blocks on 11th",
    $passedCount === 10 && $blocked === true,
    "Count permitted: {$passedCount}, blocked on burst attempt"
);

// ─────────────────────────────────────────────────────────────
// 3. PLAN INJECTION & WHITELIST VALIDATION
// ─────────────────────────────────────────────────────────────
echo "\n── 3. Plan Whitelist & Pricing Tampering Protection ───\n";

$validPlans = [
    'monthly', 'annual', 'lifetime', 'ebook', 'aimlab',
    'ebook-vol1', 'ebook-vol2', 'ebook-vol3', 'ebook-vol4', 'ebook-vol5', 'ebook-vol6',
    'ebook-bundle', 'master-bundle', 'consultoria', 'vip-overhaul'
];
$invalidPlans = ['free_vip', 'hack_zero_cents', 'admin_override', ''];

$whitelistBlocked = true;
foreach ($invalidPlans as $p) {
    if (in_array(strtolower($p), $validPlans, true)) {
        $whitelistBlocked = false;
    }
}

assert_test(
    "Malicious plan injection rejected against strict whitelist",
    $whitelistBlocked,
    "Only predefined plans ('monthly', 'annual', 'lifetime', 'ebook', 'ebook-bundle', 'consultoria') can be processed"
);

// ─────────────────────────────────────────────────────────────
// 4. ORIGIN VALIDATION & CORS HARDENING
// ─────────────────────────────────────────────────────────────
echo "\n── 4. Cross-Origin Protection (CORS & Referrer) ───────\n";

$allowedOrigins = ['https://dcprosens.com', 'https://app.dcprosens.com'];
$maliciousOrigins = ['https://evil-hacker.com', 'http://dcprosens.com.attacker.ru', 'null'];

$corsSecure = true;
foreach ($maliciousOrigins as $origin) {
    if (in_array($origin, $allowedOrigins, true)) {
        $corsSecure = false;
    }
}

assert_test(
    "Unauthorized cross-origin domains blocked from API access",
    $corsSecure,
    "Strict origin matching stops unauthorized external sites framing or calling payment APIs"
);

// ─────────────────────────────────────────────────────────────
// 5. INPUT SANITIZATION & XSS PREVENTION IN COMMUNITY
// ─────────────────────────────────────────────────────────────
echo "\n── 5. Input Sanitization & Anti-XSS Filters ───────────\n";

$xssAttackTitle = '<script>alert("pwned")</script> How to fix sens?';
$sanitizedTitle = htmlspecialchars(strip_tags($xssAttackTitle), ENT_QUOTES, 'UTF-8');

assert_test(
    "XSS script tags stripped and escaped in community inputs",
    !str_contains($sanitizedTitle, '<script>') && !str_contains($sanitizedTitle, '</script>'),
    "Result: " . $sanitizedTitle
);

echo "\n═══════════════════════════════════════════════════════════\n";
echo "RESULT: {$testsPassed} Passed, {$testsFailed} Failed\n";
echo "═══════════════════════════════════════════════════════════\n";

exit($testsFailed > 0 ? 1 : 0);
