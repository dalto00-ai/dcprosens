<?php
// Verifies a Firebase ID token, so an endpoint can trust *who* is calling it.
//
// Until now every endpoint took `userId` straight from the request body and
// believed it. That meant anyone could POST a leaderboard score under another
// person's uid, or open a checkout session tagged with somebody else's account.
// Firestore's security rules already stop the worst case (nobody can promote
// themselves to premium — subscriptionStatus is writable only by the service
// account), but identity itself was still unauthenticated.
//
// There is no Composer on this host, so this implements the check directly:
// an ID token is an RS256 JWT signed by Google. Verifying it means checking the
// signature against Google's rotating public certificates plus the standard
// claims. This is the same validation the Admin SDK performs.
//
// Usage:
//   require_once __DIR__ . '/firebase-auth.php';
//   $uid = firebase_require_uid($firebaseProjectId);   // exits 401 on failure
// or, when the caller may legitimately be anonymous:
//   $uid = firebase_uid_or_null($firebaseProjectId);

/** Where Google publishes the certificates that sign ID tokens. */
const FIREBASE_CERT_URL =
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

function firebase_b64url_decode(string $data): string
{
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $data .= str_repeat('=', 4 - $remainder);
    }
    return base64_decode(strtr($data, '-_', '+/')) ?: '';
}

/**
 * Google's signing certificates, cached on disk until the Cache-Control max-age
 * they ship with expires. Without caching, every authenticated request would
 * add an outbound HTTPS round trip before doing any work.
 */
function firebase_signing_certs(): array
{
    $cacheFile = sys_get_temp_dir() . '/dcprosens_firebase_certs.json';

    if (is_file($cacheFile)) {
        $cached = json_decode((string)file_get_contents($cacheFile), true);
        if (is_array($cached) && ($cached['expires'] ?? 0) > time() && !empty($cached['certs'])) {
            return $cached['certs'];
        }
    }

    $ch = curl_init(FIREBASE_CERT_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200 || $response === false) {
        // Fall back to a stale cache rather than locking every user out because
        // Google was briefly unreachable.
        if (is_file($cacheFile)) {
            $cached = json_decode((string)file_get_contents($cacheFile), true);
            if (!empty($cached['certs'])) {
                return $cached['certs'];
            }
        }
        throw new RuntimeException('Could not fetch Google signing certificates.');
    }

    $rawHeaders = substr((string)$response, 0, $headerSize);
    $certs = json_decode(substr((string)$response, $headerSize), true);
    if (!is_array($certs) || !$certs) {
        throw new RuntimeException('Malformed certificate response from Google.');
    }

    $maxAge = 3600;
    if (preg_match('/max-age\s*=\s*(\d+)/i', $rawHeaders, $m)) {
        $maxAge = max(300, (int)$m[1]);
    }

    @file_put_contents(
        $cacheFile,
        json_encode(['expires' => time() + $maxAge, 'certs' => $certs]),
        LOCK_EX
    );

    return $certs;
}

/**
 * Returns the token's claims when it is a genuine, unexpired ID token for this
 * project, or null otherwise. Never throws for an invalid token — only for an
 * infrastructure failure it cannot work around.
 */
function firebase_verify_id_token(string $idToken, string $projectId): ?array
{
    $parts = explode('.', $idToken);
    if (count($parts) !== 3) {
        return null;
    }
    [$rawHeader, $rawPayload, $rawSignature] = $parts;

    $header = json_decode(firebase_b64url_decode($rawHeader), true);
    $claims = json_decode(firebase_b64url_decode($rawPayload), true);
    if (!is_array($header) || !is_array($claims)) {
        return null;
    }

    // Firebase always signs ID tokens with RS256. Accepting anything else —
    // "none" in particular — is the classic JWT bypass.
    if (($header['alg'] ?? '') !== 'RS256' || empty($header['kid'])) {
        return null;
    }

    $now = time();
    $leeway = 60; // tolerate small clock skew between this host and Google

    if (($claims['aud'] ?? null) !== $projectId) return null;
    if (($claims['iss'] ?? null) !== "https://securetoken.google.com/{$projectId}") return null;
    if (empty($claims['sub']) || !is_string($claims['sub'])) return null;
    if (($claims['exp'] ?? 0) < $now - $leeway) return null;
    if (($claims['iat'] ?? 0) > $now + $leeway) return null;
    // auth_time in the future means the token was minted for a session that has
    // not started yet — not something a real client produces.
    if (isset($claims['auth_time']) && $claims['auth_time'] > $now + $leeway) return null;

    $certs = firebase_signing_certs();
    if (!isset($certs[$header['kid']])) {
        return null; // signed with a key Google no longer publishes
    }

    $publicKey = openssl_pkey_get_public($certs[$header['kid']]);
    if ($publicKey === false) {
        return null;
    }

    $verified = openssl_verify(
        $rawHeader . '.' . $rawPayload,
        firebase_b64url_decode($rawSignature),
        $publicKey,
        OPENSSL_ALGO_SHA256
    );

    return $verified === 1 ? $claims : null;
}

/**
 * The caller's ID token.
 *
 * Deliberately checks four places. PHP behind FastCGI — which is how LiteSpeed
 * serves this host — routinely drops the Authorization header before the script
 * runs, so a header-only lookup silently returned null for every signed-in user
 * and the checkout answered 401 to people who were plainly logged in.
 *
 * The JSON body is an accepted source as a result. That is not a weakening:
 * the token is verified against Google's signature either way, so a token
 * arriving in the body is exactly as trustworthy as one arriving in a header.
 */
function firebase_bearer_token(): ?string
{
    $candidates = [
        $_SERVER['HTTP_AUTHORIZATION'] ?? '',
        $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '',
    ];

    // getallheaders() is present on more SAPIs than apache_request_headers().
    foreach (['getallheaders', 'apache_request_headers'] as $fn) {
        if (function_exists($fn)) {
            foreach ((array)$fn() as $name => $value) {
                if (strcasecmp((string)$name, 'Authorization') === 0) {
                    $candidates[] = $value;
                }
            }
            break;
        }
    }

    foreach ($candidates as $header) {
        if (preg_match('/^Bearer\s+(\S+)$/i', trim((string)$header), $m)) {
            return $m[1];
        }
    }

    // Fallback: `idToken` in the JSON body, for hosts that strip the header.
    static $bodyToken = null;
    if ($bodyToken === null) {
        $bodyToken = false;
        $raw = file_get_contents('php://input');
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded) && !empty($decoded['idToken']) && is_string($decoded['idToken'])) {
                $bodyToken = $decoded['idToken'];
            }
        }
    }

    return $bodyToken !== false ? $bodyToken : null;
}

/** The caller's verified uid, or null when there is no valid token. */
function firebase_uid_or_null(string $projectId): ?string
{
    $token = firebase_bearer_token();
    if ($token === null) {
        return null;
    }
    try {
        $claims = firebase_verify_id_token($token, $projectId);
    } catch (Throwable $e) {
        error_log('firebase-auth: ' . $e->getMessage());
        return null;
    }
    return $claims['sub'] ?? null;
}

/**
 * The caller's verified uid, or a 401 and exit. Use on endpoints where acting
 * as a specific account is the whole point.
 */
function firebase_require_uid(string $projectId): string
{
    $uid = firebase_uid_or_null($projectId);
    if ($uid === null) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Your session could not be verified. Refresh the page and sign in again.',
        ]);
        exit();
    }
    return $uid;
}
