import { NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stories, type WebStory, type StoryPage } from '@/lib/stories';

export const dynamic = 'force-static';

export function generateStaticParams() {
    return stories.filter((story) => !story.isCustomAmp).map((story) => ({ slug: story.slug }));
}

const BASE = 'https://dcprosens.com';

function imageDims(src: string): { w: number; h: number } {
    // /web-stories/*.webp assets are portrait 768x1376; legacy /blog/*.webp covers are square 1024x1024.
    return src.startsWith('/web-stories/') ? { w: 768, h: 1376 } : { w: 1024, h: 1024 };
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderPage(story: WebStory, page: StoryPage, index: number, total: number): string {
    const { w, h } = imageDims(page.image);
    const imgUrl = `${BASE}${page.image}`;
    const isLast = index === total - 1;
    const isCover = index === 0;
    const headingTag = isCover ? 'h1' : 'h2';

    const body = isLast && page.cta
        ? `<div class="content cta-content">
        <${headingTag}>${escapeHtml(page.title)}</${headingTag}>
        ${page.description ? `<p class="desc">${escapeHtml(page.description)}</p>` : ''}
        <a class="cta-btn" href="${BASE}${page.cta.href}">${escapeHtml(page.cta.label)}</a>
      </div>`
        : `<div class="content">
        ${isCover ? `<p class="brand">⚡ DCPROSENS</p><p class="tag">${escapeHtml(story.category)}</p>` : ''}
        <${headingTag}>${escapeHtml(page.title)}</${headingTag}>
        ${page.description ? `<p class="desc">${escapeHtml(page.description)}</p>` : ''}
      </div>`;

    const autoAdvance = isLast ? '' : ' auto-advance-after="5s"';

    return `  <amp-story-page id="${page.id}"${autoAdvance}>
    <amp-story-grid-layer template="fill">
      <amp-img src="${imgUrl}" width="${w}" height="${h}" layout="fill" object-fit="cover" alt="${escapeHtml(page.title)}"></amp-img>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="fill" class="gradient-layer"></amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" class="text-layer">
      ${body}
    </amp-story-grid-layer>
  </amp-story-page>`;
}

function generateStoryHtml(story: WebStory): string {
    const url = `${BASE}/web-stories/${story.slug}/`;
    const coverImg = `${BASE}${story.coverImage}`;
    const pagesHtml = story.pages.map((p, i) => renderPage(story, p, i, story.pages.length)).join('\n');

    // Web Stories carried no structured data at all, which is what Google uses
    // to decide whether a story is eligible for the Discover / Search story
    // carousels. The amp-story attributes below cover the AMP validator; this
    // covers the crawler. Article (not NewsArticle) to match the rest of the
    // site — these are evergreen visual guides, not news-cycle content.
    const storyJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: story.title,
        description: story.excerpt,
        url,
        datePublished: new Date(story.publishDate).toISOString(),
        dateModified: new Date(story.publishDate).toISOString(),
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        articleSection: story.category,
        author: {
            '@type': 'Person',
            name: 'Dalto Outlier',
            url: `${BASE}/about/`,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${BASE}#organization`,
            name: 'DCPROSENS',
            url: BASE,
            logo: { '@type': 'ImageObject', url: `${BASE}/logo.webp` },
        },
        image: {
            '@type': 'ImageObject',
            url: coverImg,
            contentUrl: coverImg,
            caption: story.title,
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    });

    return `<!DOCTYPE html>
<html amp lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(story.title)}</title>
<meta name="description" content="${escapeHtml(story.excerpt)}">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="canonical" href="${url}">
<link rel="amphtml" href="${url}">
<meta property="og:title" content="${escapeHtml(story.title)}">
<meta property="og:description" content="${escapeHtml(story.excerpt)}">
<meta property="og:image" content="${coverImg}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(story.title)}">
<meta name="twitter:description" content="${escapeHtml(story.excerpt)}">
<meta name="twitter:image" content="${coverImg}">
<script type="application/ld+json">${storyJsonLd}</script>
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
<style amp-custom>
*{box-sizing:border-box}
amp-story{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
amp-story-page{background:#0a0a0f}
.gradient-layer{background:linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.35) 55%,transparent 100%)}
.text-layer{justify-content:flex-end;padding:0 28px 64px}
.content{width:100%}
.brand{color:#00ff9d;font-weight:800;font-size:14px;letter-spacing:0.1em;margin:0 0 12px}
.tag{display:inline-block;background:rgba(0,255,157,0.12);border:1px solid rgba(0,255,157,0.35);color:#00ff9d;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 14px}
h1,h2{color:#fff;font-size:32px;font-weight:800;line-height:1.15;margin:0 0 12px;text-shadow:0 2px 20px rgba(0,0,0,0.9);letter-spacing:-0.02em}
.desc{color:#e5e5e5;font-size:17px;line-height:1.5;margin:0;text-shadow:0 2px 12px rgba(0,0,0,0.9)}
.cta-content{text-align:center}
.cta-btn{display:inline-block;margin-top:20px;background:#00ff9d;color:#05140d;font-weight:800;font-size:17px;padding:14px 32px;border-radius:999px;text-decoration:none}
</style>
</head>
<body>
<amp-story standalone
  title="${escapeHtml(story.title)}"
  publisher="DCPROSENS"
  publisher-logo-src="${BASE}/icons/icon-192x192.png"
  poster-portrait-src="${coverImg}"
  poster-landscape-src="${coverImg}"
  poster-square-src="${coverImg}">
${pagesHtml}
</amp-story>
</body>
</html>`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const story = stories.find((s) => s.slug === slug);
    if (!story) return new NextResponse('Not Found', { status: 404 });

    if (story.isCustomAmp) {
        const staticPath = join(process.cwd(), 'public', 'web-stories', slug, 'index.html');
        if (existsSync(staticPath)) {
            const staticHtml = readFileSync(staticPath, 'utf8');
            return new NextResponse(staticHtml, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                },
            });
        }
    }

    const html = generateStoryHtml(story);
    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}
