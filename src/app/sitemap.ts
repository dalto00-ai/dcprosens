import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { stories } from '@/lib/stories';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dcprosens.com';

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const webStories = stories.map((story) => ({
        url: `${baseUrl}/web-stories/${story.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const staticRoutes = [
        '',
        '/blog',
        '/dpi',
        '/games',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.6,
    }));

    return [
        ...staticRoutes,
        ...blogPosts,
        ...webStories,
    ];
}
