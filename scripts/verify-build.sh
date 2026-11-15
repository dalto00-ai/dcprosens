#!/usr/bin/env bash
# Post-build audit: SEO, sitemaps, images, accessibility, headers, robots.
# Run after `npm run build && node scripts/generate-sitemaps.mjs`.
#   bash scripts/verify-build.sh
set -u
cd "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS"
P=0; F=0
chk(){ if [ "$2" = "$3" ]; then echo "  PASS  $1  ($2)"; P=$((P+1)); else echo "  FAIL  $1  esperado=$3 obtido=$2"; F=$((F+1)); fi; }
chkmin(){ if [ "$2" -ge "$3" ]; then echo "  PASS  $1  ($2 >= $3)"; P=$((P+1)); else echo "  FAIL  $1  $2 < $3"; F=$((F+1)); fi; }

echo "── SEO / metadados ──────────────────────────────"
TOT=$(find out -name index.html | wc -l)
chk "paginas sem <title>"        "$(for f in $(find out -name index.html); do grep -q '<title>' $f || echo x; done | wc -l)" 0
chk "paginas sem canonical"      "$(for f in $(find out -name index.html); do grep -q 'rel=\"canonical\"' $f || echo x; done | wc -l)" 0
chk "paginas sem description"    "$(for f in $(find out -name index.html); do grep -q 'name=\"description\"' $f || echo x; done | wc -l)" 0
chk "paginas sem og:image"       "$(for f in $(find out -name index.html); do grep -q 'og:image' $f || echo x; done | wc -l)" 0
chk "paginas sem twitter:image"  "$(for f in $(find out -name index.html); do grep -q 'twitter:image' $f || echo x; done | wc -l)" 0
chk "JSON-LD com MIME invalido"  "$(grep -rl 'ld+json;' out --include=index.html 2>/dev/null | wc -l)" 0
chkmin "paginas com JSON-LD"     "$(grep -rl 'application/ld+json' out --include=index.html | wc -l)" 425

echo "── Sitemaps ─────────────────────────────────────"
for f in sitemap.xml sitemap-index.xml image-sitemap.xml news-sitemap.xml sitemap-webstories.xml; do
  python3 -c "import xml.dom.minidom;xml.dom.minidom.parse('out/$f')" 2>/dev/null && { echo "  PASS  XML valido: $f"; P=$((P+1)); } || { echo "  FAIL  XML invalido: $f"; F=$((F+1)); }
done
mkdir -p /tmp/claude-1001
grep -o '<loc>[^<]*</loc>' out/sitemap.xml | sed 's|<loc>https://dcprosens.com||;s|</loc>||;s|^/||;s|/$||' | sort > /tmp/claude-1001/v_sm.txt
find out -name index.html | sed 's|^out/||;s|/index.html$||;s|^index.html$||' | sort > /tmp/claude-1001/v_built.txt
chk "URLs no sitemap que dao 404" "$(comm -23 /tmp/claude-1001/v_sm.txt /tmp/claude-1001/v_built.txt | wc -l)" 0
chk "URLs sem barra final no sitemap" "$(grep -c '<loc>https://dcprosens.com/[^<]*[^/]</loc>' out/sitemap.xml)" 0
chk "paginas noindex dentro do sitemap" "$(grep -cE '<loc>[^<]*/(dashboard|login|embed)/</loc>' out/sitemap.xml)" 0
chk "img-sitemap apontando p/ marketing generico" "$(grep -c 'marketing/play_store' out/image-sitemap.xml)" 0
chkmin "imagens no image-sitemap" "$(grep -c 'image:loc' out/image-sitemap.xml)" 1000

echo "── Imagens ──────────────────────────────────────"
BROKEN=0
for src in $(grep -rhoE 'src="/(blog|gear|web-stories|marketing)/[^"]+"' out --include=index.html | sed 's/src="//;s/"$//' | sort -u); do
  [ -f "out$src" ] || { echo "    quebrada: $src"; BROKEN=$((BROKEN+1)); }
done
chk "imagens locais quebradas (404)" "$BROKEN" 0
chk "img sem alt" "$(grep -rhoE '<img [^>]*>' out --include=index.html | grep -vc 'alt=')" 0
chk "posts usando imagem generica compartilhada" "$(node scripts/check-blog-images.mjs | grep 'sharing an image' | grep -oE '^[a-z ]*: *[0-9]+' | grep -oE '[0-9]+$')" 0

echo "── Acessibilidade ───────────────────────────────"
chkmin "paginas com skip link" "$(grep -rl 'skip-to-content' out --include=index.html | wc -l)" 400
chkmin "focus-visible no CSS gerado" "$(grep -rl 'focus-visible' out/_next/static/chunks/*.css | wc -l)" 1
chkmin "prefers-reduced-motion no CSS" "$(grep -rl 'prefers-reduced-motion' out/_next/static/chunks/*.css | wc -l)" 1

echo "── Seguranca / headers ──────────────────────────"
chk "CSP com frame-ancestors" "$(grep -c "frame-ancestors ." out/.htaccess)" 1
chk "excecao de framing p/ /embed" "$(grep -c 'frame-ancestors \*' out/embed/.htaccess 2>/dev/null)" 1
chk "embed remove X-Frame-Options" "$(grep -c 'unset X-Frame-Options' out/embed/.htaccess 2>/dev/null)" 1
chk "raiz sem diretivas ignoradas pelo LiteSpeed" "$(grep -cE '^\s*(SetEnvIf|Header always edit)' out/.htaccess)" 0
chk "api/lib bloqueado" "$(grep -c 'RewriteRule \^api/lib/' out/.htaccess)" 1
chk "redirects legados em cadeia (sem barra)" "$(grep 'R=301' out/.htaccess | grep -v 'https://' | grep -vc '/ \[L,R=301\]')" 0
chk "segredo hardcoded em PHP" "$(grep -rlE 'sk_live|rk_live|-----BEGIN' out/api/ 2>/dev/null | wc -l)" 0

echo "── robots / llms ────────────────────────────────"
chk "robots nao bloqueia paginas noindex" "$(grep -cE '^Disallow: /(dashboard|login)' out/robots.txt)" 0
chkmin "bots de IA declarados" "$(grep -cE '^User-agent: (GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|Applebot|CCBot)' out/robots.txt)" 6
chk "llms.txt com data" "$(grep -c 'Last updated:' out/llms.txt)" 1
chk "llms-full.txt com data" "$(grep -c 'Last updated:' out/llms-full.txt)" 1

echo
echo "═══ RESULTADO: $P passaram, $F falharam ═══"
