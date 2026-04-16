import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow all legitimate crawlers
            {
                userAgent: [
                    '*',
                    'Googlebot',
                    'Googlebot-News',         // ✅ Google News crawler
                    'Googlebot-Image',        // ✅ Google Images crawler
                    'Googlebot-Video',        // ✅ Google Video / Stories crawler
                    'Storybot',               // ✅ Web Stories indexer
                    'Bingbot',
                    'Slurp',
                    'DuckDuckBot',
                    'YandexBot',
                    'Baiduspider',
                    'Applebot',
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'anthropic-ai',
                    'Claude-Web',
                    'CCBot',
                    'Omgilibot',
                    'PerplexityBot',
                ],
                allow: '/',
                disallow: [
                    '/api/',          // Don't index API routes
                    '/_next/',        // Don't index Next.js internals
                    '/static/',       // Don't index static build assets
                ],
            },
            // Block known aggressive/scraper bots
            {
                userAgent: [
                    'AhrefsBot',
                    'SemrushBot',
                    'DotBot',
                    'MJ12bot',
                    'PetalBot',
                    'DataForSeoBot',
                ],
                disallow: '/',
            },
        ],
        // ✅ Multiple sitemaps declared for Google to discover all specialized feeds
        sitemap: [
            'https://dcprosens.com/sitemap.xml',
            'https://dcprosens.com/image-sitemap.xml',
            'https://dcprosens.com/news-sitemap.xml',
        ],
        host: 'https://dcprosens.com',
    };
}
