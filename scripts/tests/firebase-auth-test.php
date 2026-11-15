<?php
// Unit test for public/api/lib/firebase-auth.php.
//
// Signs tokens with a key pair generated here and substitutes the resulting
// certificate for Google's in the cert cache, so the real verification path
// runs end to end without needing a live Firebase session. Covers the accept
// case and every rejection the endpoint depends on — expiry, wrong project,
// forged issuer, unknown signing key, and a tampered signature.
//
// Run: php scripts/tests/firebase-auth-test.php
//
// NOTE: it overwrites the cert cache in the system temp directory, so run it
// locally rather than on the production host.
require_once __DIR__ . '/../../public/api/lib/firebase-auth.php';

$projectId = 'dcprosens-saas';

// Generate a key pair and a self-signed cert, as Google publishes.
$key = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
$csr = openssl_csr_new(['commonName' => 'test'], $key);
$x509 = openssl_csr_sign($csr, null, $key, 1);
openssl_x509_export($x509, $certPem);

$kid = 'testkid';
file_put_contents(sys_get_temp_dir() . '/dcprosens_firebase_certs.json', json_encode([
    'expires' => time() + 3600,
    'certs' => [$kid => $certPem],
]));

function b64u($d) { return rtrim(strtr(base64_encode($d), '+/', '-_'), '='); }

function make_token($key, $kid, $claims) {
    $h = b64u(json_encode(['alg' => 'RS256', 'typ' => 'JWT', 'kid' => $kid]));
    $p = b64u(json_encode($claims));
    openssl_sign("$h.$p", $sig, $key, OPENSSL_ALGO_SHA256);
    return "$h.$p." . b64u($sig);
}

$now = time();
$good = [
    'aud' => $projectId,
    'iss' => "https://securetoken.google.com/$projectId",
    'sub' => 'uid-abc-123',
    'exp' => $now + 3600,
    'iat' => $now - 5,
    'auth_time' => $now - 60,
];

$cases = [
    'valid token'            => [make_token($key, $kid, $good), true],
    'expired'                => [make_token($key, $kid, ['exp' => $now - 3600] + $good), false],
    'wrong project (aud)'    => [make_token($key, $kid, ['aud' => 'outro'] + $good), false],
    'forged issuer'              => [make_token($key, $kid, ['iss' => 'https://evil.example'] + $good), false],
    'unknown signing key'        => [make_token($key, 'kid-inexistente', $good), false],
    'tampered signature'   => [substr(make_token($key, $kid, $good), 0, -4) . 'AAAA', false],
];

$fails = 0;
foreach ($cases as $name => [$tok, $expected]) {
    $claims = firebase_verify_id_token($tok, $projectId);
    $got = $claims !== null;
    $ok = $got === $expected;
    if (!$ok) $fails++;
    printf("  %-24s expected=%-6s got=%-6s %s
", $name,
        $expected ? 'accept' : 'reject', $got ? 'accept' : 'reject', $ok ? 'PASS' : 'FAIL');
    if ($name === 'valid token' && $claims) {
        printf("     -> uid extracted: %s\n", $claims['sub']);
    }
}
echo $fails === 0 ? "\nAll cases passed\n" : "\n$fails failed\n";
exit($fails === 0 ? 0 : 1);
