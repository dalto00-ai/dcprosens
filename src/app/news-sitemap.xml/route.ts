import { posts } from '@/lib/posts';

const BASE_URL = 'https://dcprosens.com';
const PUBLICATION_NAME = 'DCPROSENS';
const PUBLICATION_LANGUAGE = 'en';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Sort by date descending — most recent first
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Include all posts (News sitemap can include older evergreen content)
  const newsEntries = sortedPosts
    .map((post) => {
      const pubDate = new Date(post.date);
      // Format: YYYY-MM-DD for Google News
      const isoDate = pubDate.toISOString().split('T')[0];

      return `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${isoDate}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
      <news:keywords>${escapeXml(getKeywords(post.slug, post.title))}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${BASE_URL}${post.image}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${newsEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
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

function getKeywords(slug: string, title: string): string {
  const base = ['gaming', 'esports', 'fps', 'sensitivity', 'pro settings'];
  const slugWords = slug.split('-').filter((w) => w.length > 3);
  const titleWords = title
    .toLowerCase()
    .split(' ')
    .filter((w) => w.length > 4);
  const combined = [...new Set([...base, ...slugWords, ...titleWords])].slice(0, 10);
  return combined.join(', ');
}
