#!/usr/bin/env node
// Generates every sitemap by reading the actual static export in out/.
//
// This replaces scripts/generate_all_sitemaps_exact.py, which built the
// sitemap from a hand-maintained URLS_PARA_INDEXACAO.txt. That list drifted
// away from reality: it was missing 17 pages that genuinely existed (15
// sens-finder game landing pages plus two pro pages), it submitted 3 URLs
// that 404, and it listed /dashboard and /login, which are noindex AND
// disallowed in robots.txt. It also emitted <loc> without a trailing slash
// while every canonical tag has one, so each entry was a redirect.
//
// Reading out/ makes the sitemap a pure function of what was actually built,
// so none of that can drift again:
//   - <loc> is copied verbatim from each page's own canonical tag
//   - any page whose robots meta says noindex is skipped
//   - lastmod comes from the page's own JSON-LD dateModified, else file mtime
//   - image entries are the real images each page references
//   - news entries carry the page's real <title> and real publication date
//
// Run: node scripts/generate-sitemaps.mjs [--news-days=2]
// Wired into `npm run build:full` (build + sitemaps) — must run AFTER next build.

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const publicDir = join(root, "public");
const ORIGIN = "https://dcprosens.com";

const newsDays = Number(
  (process.argv.find((a) => a.startsWith("--news-days=")) ?? "--news-days=2").split("=")[1]
);

if (!existsSync(outDir)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const xmlEscape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const iso = (d) => new Date(d).toISOString().slice(0, 10);

// ── Collect every built page ────────────────────────────────────────────
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next" || entry.name === "api") continue;
      walk(full, acc);
    } else if (entry.name === "index.html") {
      acc.push(full);
    }
  }
  return acc;
}

const pages = [];
for (const file of walk(outDir)) {
  const html = readFileSync(file, "utf8");

  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  if (/noindex/i.test(robots)) continue;

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical) continue; // no canonical = not a real indexable page

  const route = "/" + relative(outDir, dirname(file)).replace(/\\/g, "/").replace(/^\.$/, "");
  if (route.startsWith("/_") || route === "/404") continue;

  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s*\|\s*DCPROSENS\s*$/, "")
    .trim();

  const published = html.match(/"datePublished":"([^"]+)"/)?.[1];
  const modified = html.match(/"dateModified":"([^"]+)"/)?.[1];

  // Every locally-hosted image the page actually renders or declares.
  const images = new Set();
  const og = html.match(/property="og:image" content="([^"]+)"/i)?.[1];
  if (og && og.startsWith(ORIGIN)) images.add(og);
  for (const m of html.matchAll(/<img[^>]+src="(\/[^"]+\.(?:webp|png|jpe?g))"/gi)) {
    images.add(ORIGIN + m[1]);
  }

  pages.push({
    route,
    loc: canonical,
    title,
    published,
    lastmod: iso(modified ?? published ?? statSync(file).mtime),
    images: [...images],
    isBlogPost: route.startsWith("/blog/") && route !== "/blog",
    isStory: route.startsWith("/web-stories/") && route !== "/web-stories",
  });
}

pages.sort((a, b) => a.loc.localeCompare(b.loc, "en"));
if (pages.length === 0) {
  console.error("No indexable pages found in out/ — refusing to write empty sitemaps.");
  process.exit(1);
}

const write = (name, body) => {
  writeFileSync(join(publicDir, name), body);
  writeFileSync(join(outDir, name), body);
};

const today = iso(new Date());

// ── sitemap.xml ─────────────────────────────────────────────────────────
const priorityFor = (r) =>
  r === "/" ? "1.0" : /^\/(convert|psa-calculator|sens-finder|dpi|ebooks?|community)/.test(r) ? "0.9" : "0.8";
const changefreqFor = (p) => (p.isBlogPost ? "monthly" : p.route === "/" ? "daily" : "weekly");

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages
      .map(
        (p) =>
          `  <url>\n    <loc>${xmlEscape(p.loc)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n` +
          `    <changefreq>${changefreqFor(p)}</changefreq>\n    <priority>${priorityFor(p.route)}</priority>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);

// ── image-sitemap.xml ───────────────────────────────────────────────────
// Previously every blog entry pointed at the same Play Store marketing PNG.
// Each page now lists the images it genuinely renders.
const withImages = pages.filter((p) => p.images.length > 0);
write(
  "image-sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    withImages
      .map(
        (p) =>
          `  <url>\n    <loc>${xmlEscape(p.loc)}</loc>\n` +
          p.images
            .slice(0, 1000)
            .map(
              (img) =>
                `    <image:image>\n      <image:loc>${xmlEscape(img)}</image:loc>\n` +
                `      <image:title>${xmlEscape(p.title)}</image:title>\n    </image:image>`
            )
            .join("\n") +
          `\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);

// ── news-sitemap.xml ────────────────────────────────────────────────────
// Google News guidelines strictly require articles to be published within the
// last 48 hours (newsDays). Articles older than 48 hours must NEVER be included
// in news-sitemap.xml as doing so triggers validation failures in Search Console.
const cutoff = Date.now() - newsDays * 86400000;
const news = pages.filter((p) => p.isBlogPost && p.published && new Date(p.published).getTime() >= cutoff);

write(
  "news-sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n` +
    news
      .map(
        (p) =>
          `  <url>\n    <loc>${xmlEscape(p.loc)}</loc>\n    <news:news>\n      <news:publication>\n` +
          `        <news:name>DCPROSENS</news:name>\n        <news:language>en</news:language>\n      </news:publication>\n` +
          `      <news:publication_date>${p.published.includes("T") ? p.published : `${p.published}T00:00:00Z`}</news:publication_date>\n` +
          `      <news:title>${xmlEscape(p.title)}</news:title>\n    </news:news>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);

// ── sitemap-webstories.xml ──────────────────────────────────────────────
const stories = pages.filter((p) => p.isStory || p.route === "/web-stories");
write(
  "sitemap-webstories.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    stories
      .map(
        (p) =>
          `  <url>\n    <loc>${xmlEscape(p.loc)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);

// ── sitemap-index.xml ───────────────────────────────────────────────────
// Only include news-sitemap.xml in index when there are articles within 48h
const children = ["sitemap.xml", "image-sitemap.xml", "sitemap-webstories.xml"];
if (news.length > 0) {
  children.push("news-sitemap.xml");
}
write(
  "sitemap-index.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    children
      .map((c) => `  <sitemap>\n    <loc>${ORIGIN}/${c}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`)
      .join("\n") +
    `\n</sitemapindex>\n`
);

// ── Report ──────────────────────────────────────────────────────────────
const totalImages = withImages.reduce((n, p) => n + p.images.length, 0);
console.log(`sitemap.xml             ${pages.length} URLs (canonical-verbatim, noindex excluded)`);
console.log(`image-sitemap.xml       ${withImages.length} pages / ${totalImages} images`);
console.log(`news-sitemap.xml        ${news.length} articles within ${newsDays}d`);
console.log(`sitemap-webstories.xml  ${stories.length} URLs`);
console.log(`sitemap-index.xml       ${children.length} children`);

if (news.length === 0) {
  console.log(
    `\nNote: no article published in the last ${newsDays} days, so news-sitemap.xml is empty\n` +
      `and was left out of sitemap-index.xml. That is correct per Google News' 2-day rule —\n` +
      `it repopulates by itself the next time you publish. Widen with --news-days=N if needed.`
  );
}
