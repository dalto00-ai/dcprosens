<?php
// A small fixed-window rate limiter for the public endpoints.
//
// Four endpoints accept anonymous POSTs that either write to Firestore or send
// mail: submit-review, submit-score, notify-me and send-support-message. None
// had any limit, so a single script could flood the reviews collection or push
// enough outbound mail through the support form to damage the sending domain's
// reputation — which is slow and expensive to repair.
//
// There is no Redis or Memcached on this shared host, so state lives in files
// under the system temp directory. That is per-server, which is fine here:
// this is one classic PHP host, not a load-balanced fleet.
//
// Usage:
//   require_once __DIR__ . '/ratelimit.php';
//   rate_limit('submit-review', 5, 600);   // 5 requests per 10 minutes per IP

/**
 * The caller's IP. Hostinger fronts this with Cloudflare, so the connecting
 * address is the proxy — CF-Connecting-IP is the real client. Only headers set
 * by the proxy itself are trusted; X-Forwarded-For is client-spoofable and is
 * deliberately not used as the primary source.
 */
function rate_limit_client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_TRUE_CLIENT_IP'] as $header) {
        if (!empty($_SERVER[$header]) && filter_var($_SERVER[$header], FILTER_VALIDATE_IP)) {
            return $_SERVER[$header];
        }
    }
    $remote = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    return filter_var($remote, FILTER_VALIDATE_IP) ? $remote : '0.0.0.0';
}

/**
 * Allows $limit requests per $windowSeconds for this bucket + caller. Responds
 * 429 and exits when the budget is spent.
 *
 * @param string      $bucket        Endpoint name, so limits do not bleed across endpoints.
 * @param int         $limit         Requests allowed inside the window.
 * @param int         $windowSeconds Window length.
 * @param string|null $identity      Overrides the IP — pass a verified uid to
 *                                   limit per account instead, which is fairer
 *                                   behind shared IPs (schools, mobile CGNAT).
 */
function rate_limit(string $bucket, int $limit, int $windowSeconds, ?string $identity = null): void
{
    $who = $identity !== null && $identity !== '' ? 'u:' . $identity : 'ip:' . rate_limit_client_ip();
    $key = hash('sha256', $bucket . '|' . $who);
    $file = sys_get_temp_dir() . '/dcprosens_rl_' . $key;

    $now = time();
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        // A limiter that cannot write must not become an outage. Log and allow.
        error_log("ratelimit: could not open counter for {$bucket}");
        return;
    }

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return;
    }

    $raw = stream_get_contents($handle);
    $state = json_decode((string)$raw, true);
    if (!is_array($state) || ($state['start'] ?? 0) + $windowSeconds < $now) {
        $state = ['start' => $now, 'count' => 0];
    }
    $state['count']++;

    $exceeded = $state['count'] > $limit;

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($state));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    if ($exceeded) {
        $retryAfter = max(1, ($state['start'] + $windowSeconds) - $now);
        header('Retry-After: ' . $retryAfter);
        http_response_code(429);
        echo json_encode([
            'error' => 'Too many requests. Please wait a moment and try again.',
            'retryAfter' => $retryAfter,
        ]);
        exit();
    }
}

/**
 * Deletes counter files older than a day. Called opportunistically (1 in 50
 * requests) so the temp directory does not accumulate one file per visitor
 * indefinitely on a host with no cron for this.
 */
function rate_limit_gc(): void
{
    if (random_int(1, 50) !== 1) {
        return;
    }
    $cutoff = time() - 86400;
    foreach (glob(sys_get_temp_dir() . '/dcprosens_rl_*') ?: [] as $file) {
        if (@filemtime($file) < $cutoff) {
            @unlink($file);
        }
    }
}
