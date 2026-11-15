# Handoff Prompt — DCPROSENS: Missing Image + SEO/GEO/AEO/Sitemap/Robots/LLMs Tasks

Paste this whole file to the AI doing this work. It covers two separate jobs: (1) generate one missing hero image, and (2) bring the site's SEO/GEO/AEO/sitemap/robots/llms files up to date with the 50 new "Discover batch" articles that were just added. Read the whole file before starting either part — the two jobs share context.

---

## 0. Context you need before touching anything

Today, DCPROSENS (`dcprosens.com`, Next.js 16, static export) went from 200 to **250 blog posts**. The newest 50 (in `src/lib/posts-data/chunk-19.ts` through `chunk-23.ts`) are a deliberately different kind of content from the other 200: instead of evergreen guides, they're timely, dated news/reaction pieces (patch notes, tournament results, hardware launches — see `CONTENT_BRIEF_50_ARTICLES_DISCOVER.md` for the full list and sourcing) written specifically to perform in **Google Discover**, which favors timely content over evergreen reference pages. All 50 already build and deploy cleanly — `npm run build` passes with zero errors as of this handoff. Your job is everything *around* those 50 articles that hasn't caught up yet: one missing image, and several SEO/GEO/AEO files that still only reflect the old 200-post site.

---

## PART 1 — Generate the one missing image

49 of the 50 hero images for the new batch already exist in `public/blog/` as `.webp` files. **One is missing**: `public/blog/cs2-movement-patch-wall-collision-guide.webp`, for article #1 ("CS2's August 2026 Movement Patch Changed Wall Collisions — Here's What It Means for Your Strafes", slug `cs2-movement-patch-wall-collision-guide`).

### The exact prompt (from `IMAGE_PROMPTS_50_ARTICLES_DISCOVER.md`, entry #1)

> Wide shot: a player silhouette mid-strafe against a concrete wall, a glowing green motion-trail arc showing corrected movement path, faint "before/after" split via a thin vertical light divider. Purple ambient glow. Text overlay: "MOVEMENT PATCHED".

Style baseline (same as every other image in this batch and the rest of the blog): dark cyberpunk/tech background, neon green (`#00FF9D`) and purple (`#7000FF`) accent lighting, bold neon green text overlay (2–5 words) in a bottom corner, photorealistic 3D render / product-shot style, dramatic rim lighting, shallow depth of field.

### Format — match what the rest of this batch already used
The other 49 images in this batch were generated at **1376×768px** (16:9-ish, above Google Discover's 1200px-width minimum) — that's the de facto standard for this batch now, and what you should match for visual consistency. If your tool can't hit that exact size, anything **16:9 and at least 1200px wide** is acceptable (Discover's hard requirement is ≥1200px width — see `CONTENT_BRIEF_50_ARTICLES_DISCOVER.md` Section 2.4 for why this matters). Do **not** generate a square image — that was the mistake made on an earlier batch (`IMAGE_PROMPTS_81_ARTICLES.md`) and it's the reason this whole image-sizing requirement was documented in the first place.

### Delivery
Save the file as `public/blog/cs2-movement-patch-wall-collision-guide.webp` (convert to `.webp` if your tool outputs `.png`/`.jpg`). Confirm it resolves by checking the `image:` field of the `cs2-movement-patch-wall-collision-guide` post in `src/lib/posts-data/chunk-19.ts` matches this exact path (it already does — you're just filling in the file). No code changes needed for this part.

---

## PART 2 — SEO / GEO / AEO / Sitemap / robots.txt / llms.txt / llms-full.txt

This part was investigated directly before writing this handoff — every item below reflects the actual current state of the files, not a guess.

### 2.1 SEO — sitemap.xml is missing all 50 new URLs

`public/sitemap.xml` currently has 368 URLs. **Zero of the 50 new article URLs are in it.** The generator script, `scripts/generate_all_sitemaps_exact.py`, doesn't read from the blog posts directly — it reads from `URLS_PARA_INDEXACAO.txt` (a manually maintained flat list of every URL on the site), which also doesn't have the 50 new URLs yet.

**Steps:**
1. Get the 50 new URLs. You can derive them directly from the slugs in `src/lib/posts-data/chunk-19.ts` through `chunk-23.ts` (`grep -h "slug:" src/lib/posts-data/chunk-19.ts src/lib/posts-data/chunk-20.ts src/lib/posts-data/chunk-21.ts src/lib/posts-data/chunk-22.ts src/lib/posts-data/chunk-23.ts` and prefix each with `https://dcprosens.com/blog/`).
2. Append those 50 URLs to `URLS_PARA_INDEXACAO.txt` (currently 368 lines; should become 418).
3. Re-run `python3 scripts/generate_all_sitemaps_exact.py` from the project root to regenerate `public/sitemap.xml`, `public/sitemap-index.xml`, and `public/news-sitemap.xml` from the updated list.
4. **Known pre-existing bug in that script, not yours to fix but worth knowing about**: it writes today's date as `lastmod` for every single URL on every run, regardless of whether that URL actually changed. This has been flagged in prior audits and is still unfixed — don't make it worse, but fixing the script's date logic generally is out of scope for this task unless you have time and the site owner wants it.

### 2.2 The news-sitemap.xml situation is different for this batch — read carefully

A prior audit flagged `news-sitemap.xml` as **misusing the Google News sitemap protocol** — it lists all evergreen blog posts with a `news:publication_date` of "today" on every regeneration, which is wrong for evergreen content (Google News sitemaps are meant for content published in roughly the last 48 hours).

**This batch of 50 is the one exception where that protocol actually fits.** These are genuinely timely, dated articles — patch reactions, tournament results, product launches — published today (August 25, 2026). If you're regenerating `news-sitemap.xml` as part of step 2.1 above, consider whether it should be scoped to **only these 50 timely articles** (with their real publish date, not a recalculated "today" on every future run) rather than continuing to include all 250 evergreen posts. This is a judgment call worth surfacing to the site owner rather than silently deciding — the underlying script change (filtering which posts go into the news sitemap vs. the regular sitemap) is more than a one-line fix, so flag it clearly in your delivery report even if you don't implement it.

### 2.3 GEO — llms.txt needs a new section describing this content type

`public/llms.txt` is the file AI assistants read to understand what DCPROSENS offers (see the file itself for the existing format). It currently says "Blog / Guides (200 in-depth articles)" and describes the blog as covering "sensitivity conversion, DPI, crosshair settings, hardware... and per-game guides" — accurate for the original 200, but it doesn't mention that the site now also publishes timely news/reaction content.

**Add a short new section** (a few sentences, matching the existing file's tone and format) describing this new content type — something like: DCPROSENS also publishes timely articles reacting to real patch notes, tournament results, and hardware launches across CS2, Valorant, Apex Legends, Overwatch 2, Marvel Rivals, Rainbow Six Siege, Call of Duty, and other competitive FPS titles, each tying the news event to concrete settings guidance. Update the "200 in-depth articles" count to 250. Don't rewrite the rest of the file — this is an addition, not a restructure.

### 2.4 llms-full.txt — check, don't assume

`public/llms-full.txt` is a separate, longer reference file focused entirely on the game/yaw dataset (72+ games, each with id/yaw/engine/category/source). It's a different kind of document from `llms.txt` and likely doesn't need changes for this batch of 50 articles specifically — but **check it against `src/lib/games.ts`** to confirm every game currently in `games.ts` (including any added earlier today, like Delta Force and the other emerging titles) is actually reflected in `llms-full.txt`'s dataset. If any are missing, add them following the file's existing per-game format exactly (id, yaw, engine, category, page URL, sourced notes) — never invent a yaw value; every entry in this file is supposed to be individually sourced.

### 2.5 AEO — FAQ schema should already be 100% on these 50, verify it

Every one of the 50 new articles was required (per `CONTENT_BRIEF_50_ARTICLES_DISCOVER.md` Section 2.2) to have `faqs` populated with real FAQPage-schema-eligible questions. Spot-check this is actually true: `grep -c "slug:" src/lib/posts-data/chunk-19.ts` and `grep -c "faqs:" src/lib/posts-data/chunk-19.ts` should return the same number, for each of the 5 new chunk files. If any are missing `faqs`, that's a real gap to fix, not just a reporting item — go add the missing FAQ entries using the exact questions specified for that article in `CONTENT_BRIEF_50_ARTICLES_DISCOVER.md` Section 4.

### 2.6 robots.txt — no known issue, just confirm no regression

`public/robots.txt` was checked as part of this handoff and looks correct — it allows `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, and general crawling, with only `/dashboard` and `/login` disallowed. No changes are expected here; just confirm nothing in your sitemap regeneration work accidentally touches this file.

### 2.7 Schema — confirm `Article`, not `NewsArticle`, on the new posts

Earlier today, the site's blog template (`src/app/blog/[slug]/page.tsx`) was fixed to emit `Article` schema instead of `NewsArticle` for every post, site-wide — that fix already covers the 50 new articles automatically since they use the same shared template. You don't need to do anything here, but if you're auditing JSON-LD output for any other reason, confirm this is still true (`curl -s "https://dcprosens.com/blog/[any-new-slug]/" | grep -o '"@type":"Article"'` once deployed) rather than assuming.

---

## 3. Delivery checklist

- [ ] `public/blog/cs2-movement-patch-wall-collision-guide.webp` exists, ≥1200px wide, 16:9
- [ ] `URLS_PARA_INDEXACAO.txt` includes all 50 new URLs (418 total lines)
- [ ] `public/sitemap.xml` / `sitemap-index.xml` regenerated and includes the 50 new URLs
- [ ] `news-sitemap.xml` situation reviewed and flagged to the site owner (implemented if you have time and a clear approach, otherwise clearly documented as a decision point)
- [ ] `public/llms.txt` updated with the new content-type section and corrected article count (250)
- [ ] `public/llms-full.txt` checked against `src/lib/games.ts` for any missing game entries
- [ ] All 50 new posts confirmed to have `faqs` populated (fix any gaps found)
- [ ] `npm run build` passes clean after all changes
- [ ] Report back: what you changed, what you flagged as a judgment call rather than implementing, and confirmation of a clean build

Do not deploy without checking with the site owner first — this handoff doesn't include deploy authorization.
