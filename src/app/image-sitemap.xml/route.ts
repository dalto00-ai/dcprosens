import { posts } from '@/lib/posts';
import { stories } from '@/lib/stories';

const BASE_URL = 'https://dcprosens.com';

export async function GET() {
  const postImages = posts
    .filter((p) => p.image)
    .map(
      (p) => `
    <url>
      <loc>${BASE_URL}/blog/${p.slug}</loc>
      <image:image>
        <image:loc>${BASE_URL}${p.image}</image:loc>
        <image:title>${escapeXml(p.title)}</image:title>
        <image:caption>${escapeXml(p.excerpt)}</image:caption>
      </image:image>
    </url>`
    )
    .join('');

  const storyImages = stories
    .map((s) =>
      s.pages
        .filter((pg) => pg.image)
        .map(
          (pg) => `
    <url>
      <loc>${BASE_URL}/web-stories/${s.slug}</loc>
      <image:image>
        <image:loc>${BASE_URL}${pg.image}</image:loc>
        <image:title>${escapeXml(pg.title)}</image:title>
        <image:caption>${escapeXml(pg.description ?? pg.title)}</image:caption>
      </image:image>
    </url>`
        )
        .join('')
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Static Images -->
  <url>
    <loc>${BASE_URL}</loc>
    <image:image>
      <image:loc>${BASE_URL}/og-image.webp</image:loc>
      <image:title>DCPROSENS — Pro Gaming Sensitivity Converter</image:title>
      <image:caption>Convert your gaming sensitivity between Valorant, CS2, Apex Legends and 20+ FPS games.</image:caption>
    </image:image>
  </url>
  <!-- Blog Post Images -->
  ${postImages}
  <!-- Web Story Images -->
  ${storyImages}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
