import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Main crawlers — allow everything except internals
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/static/',
                ],
            },
            // AI crawlers — allow full access for GEO/AEO
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'anthropic-ai',
                    'Claude-Web',
                    'CCBot',
                    'PerplexityBot',
                    'Omgilibot',
                ],
                allow: '/',
            },
            // Block aggressive scrapers
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
        sitemap: [
            'https://dcprosens.com/sitemap.xml',
            'https://dcprosens.com/image-sitemap.xml',
            'https://dcprosens.com/news-sitemap.xml',
            'https://dcprosens.com/sitemap-index.xml',
        ],
        host: 'https://dcprosens.com',
    };
}
