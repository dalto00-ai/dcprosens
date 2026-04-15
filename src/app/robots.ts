import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow all legitimate crawlers
            {
                userAgent: [
                    '*',
                    'Googlebot',
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
        sitemap: 'https://dcprosens.com/sitemap.xml',
        host: 'https://dcprosens.com',
    };
}
