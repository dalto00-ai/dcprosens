<?php
// Central secrets loader for all DCPROSENS API endpoints.
//
// Every static-export deploy replaces the *entire* contents of public_html
// (see hosting_deployStaticWebsite), which means any secret placed inside
// public_html — including a .htaccess SetEnv value — gets wiped on the next
// deploy. Real Hostinger "Environment Variables" panels only exist for
// Node.js app hosting, not the classic PHP addon-domain hosting this site
// runs on, so getenv() alone has nowhere reliable to read from here.
//
// The fix: a plain PHP file living ONE LEVEL ABOVE public_html (outside the
// web root, so it's never served over HTTP and never touched by a deploy),
// which simply sets values into $_ENV. This file loads it once, then reads
// everything through getenv() as before — so nothing downstream changes.
//
// Expected location: <document root>/../dcprosens-secrets.php
// (e.g. /home/u525458323/domains/dcprosens.com/dcprosens-secrets.php,
// one level above /home/u525458323/domains/dcprosens.com/public_html)

function dcprosens_load_secrets(): void
{
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;

    $documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
    if ($documentRoot === '') {
        return;
    }

    $secretsFile = dirname($documentRoot) . '/dcprosens-secrets.php';
    if (is_file($secretsFile)) {
        require $secretsFile;
    }
}

dcprosens_load_secrets();
