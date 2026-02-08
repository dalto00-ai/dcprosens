import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: [
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
                '*',
            ],
            allow: '/',
        },
        sitemap: 'https://dcprosens.com/sitemap.xml',
    };
}
