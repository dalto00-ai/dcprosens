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
                    'PerplexityBot',
                    'Omgilibot',
                    'Amazonbot',
                    'Meta-ExternalAgent',
                    'cohere-ai',
                    'YouBot',
                ],
                allow: '/',
            },
            // Block aggressive scrapers & SEO competitors
            {
                userAgent: [
                    'AhrefsBot',
                    'SemrushBot',
                    'DotBot',
                    'MJ12bot',
                    'PetalBot',
                    'DataForSeoBot',
                    'ByteSpider',
                    'CCBot',
                    'YandexBot',
                    'Baiduspider',
                    'Sogou web spider',
                    'exabot',
                    'Rogerbot',
                    'Lipperhey',
                    'LinkpadBot',
                ],
                disallow: '/',
            },
        ],
        sitemap: 'https://dcprosens.com/sitemap-index.xml',
        host: 'https://dcprosens.com',
    };
}
