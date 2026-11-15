<?php
// Minimal Firestore REST client using a Google service account — no SDK
// dependency (this hosting has no Composer setup). Only implements what the
// Stripe webhook needs: get an OAuth2 access token, and patch specific
// fields on a /users/{uid} document.

/**
 * Base64url-encode (RFC 4648 §5) — JWTs use this instead of plain base64.
 */
function firestore_base64url_encode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Exchange a Google service account key for a short-lived OAuth2 access
 * token scoped to Firestore, using the JWT bearer flow (no Google SDK).
 *
 * @throws RuntimeException on any failure — callers should treat this as fatal.
 */
function firestore_get_access_token(string $clientEmail, string $privateKeyPem): string
{
    $now = time();
    $header = firestore_base64url_encode(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
    $claims = firestore_base64url_encode(json_encode([
        'iss' => $clientEmail,
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ]));

    $signingInput = $header . '.' . $claims;
    $signature = '';
    $privateKey = openssl_pkey_get_private($privateKeyPem);
    if ($privateKey === false) {
        throw new RuntimeException('Invalid Firebase service account private key.');
    }
    $signed = openssl_sign($signingInput, $signature, $privateKey, OPENSSL_ALGO_SHA256);
    if (!$signed) {
        throw new RuntimeException('Failed to sign Google service account JWT.');
    }

    $jwt = $signingInput . '.' . firestore_base64url_encode($signature);

    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt,
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = json_decode((string)$response, true);
    if ($httpCode !== 200 || !isset($data['access_token'])) {
        throw new RuntimeException('Failed to obtain Google access token: ' . $response);
    }

    return $data['access_token'];
}

/**
 * Convert a flat PHP assoc array into Firestore's typed value format.
 * Only supports the scalar types this webhook actually needs.
 */
function firestore_encode_fields(array $fields): array
{
    $encoded = [];
    foreach ($fields as $key => $value) {
        if ($value === null) {
            $encoded[$key] = ['nullValue' => null];
        } elseif (is_bool($value)) {
            $encoded[$key] = ['booleanValue' => $value];
        } elseif (is_int($value)) {
            $encoded[$key] = ['integerValue' => (string)$value];
        } else {
            $encoded[$key] = ['stringValue' => (string)$value];
        }
    }
    return $encoded;
}

/**
 * PATCH specific fields on /users/{uid}, creating the document if it
 * doesn't exist yet. Uses updateMask so untouched fields (displayName,
 * savedSettings, createdAt, etc.) are preserved — a Firestore PATCH without
 * updateMask would otherwise silently replace the whole document.
 *
 * @throws RuntimeException on failure.
 */
function firestore_update_user(string $projectId, string $accessToken, string $uid, array $fields): void
{
    $maskParams = '';
    foreach (array_keys($fields) as $field) {
        $maskParams .= '&updateMask.fieldPaths=' . urlencode($field);
    }

    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/users/{$uid}"
        . '?' . ltrim($maskParams, '&');

    $body = json_encode(['fields' => firestore_encode_fields($fields)]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode < 200 || $httpCode >= 300) {
        throw new RuntimeException("Firestore update failed for user {$uid}: HTTP {$httpCode} — {$response}");
    }
}

/**
 * Create a new auto-ID document in the given top-level collection. Used for
 * anything that isn't keyed by Firebase Auth uid — waitlist signups, review
 * submissions, etc.
 *
 * @throws RuntimeException on failure.
 */
function firestore_add_document(string $projectId, string $accessToken, string $collection, array $fields): void
{
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/{$collection}";
    $body = json_encode(['fields' => firestore_encode_fields($fields)]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode < 200 || $httpCode >= 300) {
        throw new RuntimeException("Firestore add-document failed for collection {$collection}: HTTP {$httpCode} — {$response}");
    }
}

/**
 * Reverse of firestore_encode_fields() — flattens a Firestore typed `fields`
 * object back into a plain assoc array of scalars.
 */
function firestore_decode_fields(array $fields): array
{
    $decoded = [];
    foreach ($fields as $key => $typedValue) {
        if (array_key_exists('stringValue', $typedValue)) {
            $decoded[$key] = $typedValue['stringValue'];
        } elseif (array_key_exists('integerValue', $typedValue)) {
            $decoded[$key] = (int)$typedValue['integerValue'];
        } elseif (array_key_exists('booleanValue', $typedValue)) {
            $decoded[$key] = $typedValue['booleanValue'];
        } else {
            $decoded[$key] = null;
        }
    }
    return $decoded;
}

/**
 * Fetch a single document by id. Returns null if it doesn't exist (404),
 * instead of throwing — callers use this for existence checks, where "not
 * found" is an expected, valid outcome rather than an error.
 *
 * @return array<string, mixed>|null decoded fields (includes '_id'), or null if not found
 * @throws RuntimeException on any failure other than 404.
 */
function firestore_get_document(string $projectId, string $accessToken, string $collection, string $docId): ?array
{
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/{$collection}/{$docId}";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 404) {
        return null;
    }
    if ($httpCode < 200 || $httpCode >= 300) {
        throw new RuntimeException("Firestore get failed for {$collection}/{$docId}: HTTP {$httpCode} — {$response}");
    }

    $doc = json_decode($response, true);
    $decoded = firestore_decode_fields($doc['fields'] ?? []);
    $decoded['_id'] = $docId;
    return $decoded;
}

/**
 * Run a simple structured query: WHERE field == value, capped at $limit.
 * Used to read approved reviews server-side — going through the service
 * account here means this doesn't depend on Firestore security rules
 * allowing public client reads.
 *
 * Deliberately does NOT use Firestore's `orderBy` — combining an equality
 * filter with ordering on a different field requires a composite index to
 * be created in the Firebase console first, which isn't something this code
 * can provision. Results are sorted by $orderByField in PHP instead, after
 * fetching, which needs no index at all.
 *
 * @return array<int, array<string, mixed>> decoded documents (each includes '_id'), sorted by $orderByField descending
 * @throws RuntimeException on failure.
 */
function firestore_query_where(
    string $projectId,
    string $accessToken,
    string $collection,
    string $whereField,
    string $whereValue,
    string $orderByField,
    int $limit = 20
): array {
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents:runQuery";
    $body = json_encode([
        'structuredQuery' => [
            'from' => [['collectionId' => $collection]],
            'where' => [
                'fieldFilter' => [
                    'field' => ['fieldPath' => $whereField],
                    'op' => 'EQUAL',
                    'value' => ['stringValue' => $whereValue],
                ],
            ],
            // Fetch a bit more than $limit since sorting happens after fetch.
            'limit' => $limit * 3,
        ],
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode < 200 || $httpCode >= 300) {
        throw new RuntimeException("Firestore query failed for collection {$collection}: HTTP {$httpCode} — {$response}");
    }

    $rows = json_decode($response, true) ?: [];
    $results = [];
    foreach ($rows as $row) {
        if (!isset($row['document'])) continue; // runQuery can include empty progress entries
        $doc = $row['document'];
        $nameParts = explode('/', $doc['name']);
        $decoded = firestore_decode_fields($doc['fields'] ?? []);
        $decoded['_id'] = end($nameParts);
        $results[] = $decoded;
    }

    usort($results, function ($a, $b) use ($orderByField) {
        $valA = $a[$orderByField] ?? '';
        $valB = $b[$orderByField] ?? '';
        // Numeric fields (e.g. a score) must sort numerically, not lexically —
        // strcmp() on "45" vs "5" would otherwise rank "45" below "5".
        if (is_numeric($valA) && is_numeric($valB)) {
            return $valB <=> $valA;
        }
        return strcmp((string)$valB, (string)$valA);
    });

    return array_slice($results, 0, $limit);
}
