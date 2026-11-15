# Handoff Prompt — DCPROSENS: 81 New Blog Articles

Paste this whole file to the AI that will continue and finish the 81 new articles. It also needs `CONTENT_BRIEF_81_ARTICLES.md` (the article-by-article brief: keywords, outlines, FAQs) and `IMAGE_PROMPTS_81_ARTICLES.md` (hero image prompts) from the same folder. All three are meant to be used together — **read all three fully before writing anything, including this status section.**

---

## 0. STATUS — read this first

**All 81 articles are written AND all 81 hero images are in place. Content work is done.** What's left is the final QC pass (Section 3) and deployment (Section 4) — that's your job now.

### What's already done
- `src/lib/posts-data/chunk-11.ts` through `chunk-18.ts` — all 81 new articles (#1–81), across two AI sessions. `src/lib/posts.ts` imports and spreads all of them (`postsChunk01` through `postsChunk18`).
- **All 81 images are converted, correctly matched to their articles, and placed in `public/blog/`** as `.webp` files. This was done by cross-referencing every `image:` field in `chunk-11.ts`–`chunk-18.ts` against `IMAGE_PROMPTS_81_ARTICLES.md` and verifying zero missing/orphaned files — confirmed with a direct diff, not just visually. Two of the 81 (articles #14 "Best Crosshair Color for Visibility" and #42 "Delta Force Sensitivity Converter") are using **best-effort leftover images from an earlier prompt revision** — thematically close (both still crosshair/tactical-HUD imagery) but not a perfect content match. If you want to improve on those two specifically at some point, that's optional polish, not a blocker.
- `npm run build` and `npx tsc --noEmit` both passed clean as of the last check — 371 static pages generated, no TypeScript/ESLint errors.
- Root folder is clean — no stray images or work-in-progress files left over from this project. (One unrelated 37MB zip file from an earlier task is intentionally left alone — not part of this project, don't touch it.)

### Corrections made along the way — for your own understanding, not action items
Three duplicate-content conflicts were found and fixed against the site's existing 119 original posts (all already reflected in `CONTENT_BRIEF_81_ARTICLES.md` and already implemented in the chunk files — nothing to redo here):
1. Article #2 (eDPI) — retitled and shortened to avoid overlapping an existing "What is eDPI?" post; both now cross-link instead of competing for the same search intent.
2. Articles #14–15 (Crosshair) — the original "copy pro codes" topics were dropped (near-duplicates of existing posts) and replaced with "Best Crosshair Color for Visibility" and "How to Import & Export Crosshair Codes."
3. Article #42 — "Rainbow Six Siege Sensitivity Converter" was dropped (R6 already had a post and was already in `games.ts`) and replaced with **Delta Force**, which required adding a new `{ id: 'deltaforce', name: 'Delta Force', yaw: 0.005555 }` entry to `src/lib/games.ts` — already done.

### Your first move
Before touching anything, verify the state above is actually true on disk — don't just trust this document:
```
git status
npm run build
ls public/blog/*.webp | wc -l          # should include the 81 new ones alongside the ~66 original
grep -c "postsChunk" src/lib/posts.ts  # should show 18 imports + 18 in the array
```
If anything looks off from what this section claims, stop and investigate before proceeding to the QC pass — don't paper over a discrepancy.

---

## 1. Project context

DCPROSENS (`dcprosens.com`) is a Next.js 16 (App Router) site — a mouse sensitivity converter for competitive FPS games (Valorant, CS2, Apex, etc.), with a pro-player database, DPI/eDPI/cm360 calculators, a crosshair generator, a mouse database, and a line of aim-training "games" (free Aim Trainer + paid Aim Lab). It now has 200 blog articles (119 original + 81 from this project).

**Stack and technical details that matter:**

- `next.config.ts` sets `output: "export"` — this is a **pure static export**, there is no Node.js server in production. Nothing server-side (`process.env` at runtime) works; only what's inlined at build time (`NEXT_PUBLIC_*`). This matters directly for deploy — see Section 4.
- Blog posts live as **TypeScript data, not markdown files or a CMS** — in `src/lib/posts-data/chunk-01.ts` through `chunk-18.ts`, typed by `src/lib/posts-data/types.ts`:

  ```ts
  export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: 'Guide' | 'Gear' | 'News' | 'Esports';
    image: string;
    content: string;   // HTML string, not markdown
    summary?: string;  // TL;DR box shown before the auto-generated table of contents
    faqs?: { q: string; a: string }[];  // renders as FAQ accordion + FAQPage JSON-LD
  }
  ```

  - The TOC is generated automatically from `<h2>`/`<h3>` tags inside `content` — no separate field for it.
  - `faqs` renders as the FAQ accordion + FAQPage JSON-LD schema.
  - `image` points to files in `public/blog/` — all 81 are already there as `.webp`.

## 2. Guardrails — read before touching anything

- **Never commit or upload `.env.local`.** It holds real secrets (Stripe, Firebase).
- **Don't touch the paywall.** `PremiumGuard`, `StripeCheckoutModal`, or anything Firebase-auth-related is out of scope.
- **Always run `git status` before assuming anything is safely saved**, and before any destructive operation.
- **Don't make sweeping, unrelated changes.** Your job now is QC (Section 3) and deploy (Section 4) — not rewriting content, not refactoring components, not "cleaning up" things you notice along the way. Flag anything you find instead of fixing it unilaterally, unless it's a small, clearly-scoped fix the QC pass itself calls for (e.g. a broken internal link).
- **Do not delete or modify `dcprosens_adfix_20260817_134006.zip`** in the project root — it predates this project and the site owner asked for it to be left alone.

## 3. Final QC pass — do this before deploying

Run a full audit of the site, the same scope as a comprehensive pre-launch review, before touching deploy. This is the step the site owner specifically asked to be included — don't skip it.

1. **Code** — does `npm run build` pass cleanly across all 18 posts-data chunk files? Any post missing a required field (`faqs`, `summary`, valid `image` path)? Any duplicate slugs across the full 200-post site?
2. **Security** — confirm nothing in this project touched API endpoints, auth, secrets, or `.env.local` (`git status`, `git diff --stat`).
3. **SEO** — every new post has a working canonical, title, and meta description within length limits; no duplicate/near-duplicate slugs or titles; no broken internal links.
4. **GEO/AEO** — every one of the 81 has the direct-answer opening paragraph, FAQPage JSON-LD, and HowTo JSON-LD where marked. Spot-check the JSON-LD actually validates.
5. **Sitemap / robots.txt / llms.txt** — confirm all 81 new URLs are present in `sitemap.xml` with a real `lastmod` (not a falsely-regenerated "today" on every URL — this was flagged as an existing bug in the site's sitemap generator during an earlier audit; don't make it worse). Regenerate the sitemap if the generator script (`scripts/generate_all_sitemaps_exact.py`) needs to be re-run to pick up the 81 new URLs — check whether it reads from `src/app`/posts data directly or from `URLS_PARA_INDEXACAO.txt` (a manually maintained list that may need the new slugs added). Consider whether `llms.txt`/`llms-full.txt` should mention the new content clusters.
6. **Images** — every `image` path resolves to an actual file in `public/blog/` (already verified once — re-verify after your own QC pass in case anything changed), reasonably sized, no JPEG-disguised-as-PNG issues.

Report the results plainly — what's fixed vs. what's flagged for the site owner to decide on — **before** moving to deploy. If the QC pass finds something broken, fix it and re-run `npm run build` before deploying; don't deploy a build you know has an issue.

## 4. Deploy — do this only after Section 3 passes clean

Deploy is **manual, not git/CI-based** — committing to git does not put anything live. The site is a static export uploaded directly to Hostinger.

1. **Build**: `npm run build`. This generates the `out/` folder.
2. **Package**: zip the *contents* of `out/` (not the `out/` folder itself — `cd out && zip -r ../deploy.zip .` or equivalent, so the zip root is the site root, not a wrapping `out/` directory).
3. **Upload**: use the Hostinger MCP tool `mcp__hostinger__hosting_deployStaticWebsite` with `domain: "dcprosens.com"` and the zip file. If that MCP tool isn't available in your environment, stop here and tell the site owner the build is ready in `out/` but needs to be deployed manually — don't attempt a different deploy method (there's no git-push-to-deploy or similar set up for this site).
4. **If you get a 429 (rate limit)** on upload, wait ~60 seconds and retry — this is a known, expected occasional hiccup with the Hostinger API, not a sign of a real failure.
5. **Verify after deploy**: the Hostinger deploy API has no reliable status/log endpoint for static exports (a known limitation, not a bug on your end) — confirm the deploy actually worked by fetching a few of the new pages directly: `curl -s -L "https://dcprosens.com/blog/[a-new-slug]/" | grep -i "<title>"` for 3–4 of the 81 new articles, and spot-check that a hero image loads (`curl -sI "https://dcprosens.com/blog/[image-filename].webp"` should return `200`).
6. **Report back**: which URL(s) you verified live, confirmation the images resolve, and the final article/image counts (should be 200 total blog posts, 81 of them new).

Do not deploy if Section 3's QC pass found unresolved issues — fix first, verify with a clean local build, then deploy.
