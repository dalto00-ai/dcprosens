import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {

    const baseUrl = 'https://dcprosens.com';

    // Static routes
    const routes = [
        '',
        '/dpi',
        '/games',
        '/blog',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...blogRoutes];
}
