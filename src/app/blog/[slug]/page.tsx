import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SEOImage from '@/components/SEOImage';
import '../prose.css';

interface Props {
    params: Promise<{ slug: string }>;
}

// Prevent dynamic rendering for unknown slugs — return 404 immediately
export const dynamicParams = false;

// 1. Generate Static Params for SSG/Export
export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// 2. Generate Metadata (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `https://dcprosens.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            url: `https://dcprosens.com/blog/${post.slug}`,
            siteName: 'DCPROSENS',
            images: [
                {
                    url: `https://dcprosens.com${post.image}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [`https://dcprosens.com${post.image}`],
        },
    };
}

// 3. Page Component
export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data — NewsArticle + ImageObject + BreadcrumbList
    const canonicalUrl = `https://dcprosens.com/blog/${post.slug}`;
    const imageUrl = `https://dcprosens.com${post.image}`;
    const publishDate = new Date(post.date).toISOString();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                // ✅ NewsArticle — required for Google News indexing
                '@type': 'NewsArticle',
                '@id': `${canonicalUrl}#article`,
                headline: post.title,
                description: post.excerpt,
                articleBody: post.excerpt,
                url: canonicalUrl,
                datePublished: publishDate,
                dateModified: publishDate,
                inLanguage: 'en-US',
                isAccessibleForFree: true,
                author: {
                    '@type': 'Organization',
                    '@id': 'https://dcprosens.com#organization',
                    name: 'DCPROSENS',
                    url: 'https://dcprosens.com',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://dcprosens.com/logo.png',
                        width: 200,
                        height: 60,
                    },
                },
                publisher: {
                    '@type': 'Organization',
                    '@id': 'https://dcprosens.com#organization',
                    name: 'DCPROSENS',
                    url: 'https://dcprosens.com',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://dcprosens.com/logo.png',
                        width: 200,
                        height: 60,
                    },
                },
                // ✅ ImageObject — required for Google Images rich results
                image: {
                    '@type': 'ImageObject',
                    '@id': `${canonicalUrl}#primaryimage`,
                    url: imageUrl,
                    contentUrl: imageUrl,
                    width: 1200,
                    height: 630,
                    caption: post.title,
                    name: post.title,
                    description: post.excerpt,
                    inLanguage: 'en-US',
                    representativeOfPage: true,
                    license: 'https://dcprosens.com/terms',
                    acquireLicensePage: 'https://dcprosens.com/contact',
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': canonicalUrl,
                },
                articleSection: post.category ?? 'Gaming',
                keywords: [
                    'gaming sensitivity',
                    'fps settings',
                    'pro player settings',
                    post.category ?? 'gaming',
                    ...post.slug.split('-').filter((w) => w.length > 4),
                ].join(', '),
            },
            {
                // ✅ BreadcrumbList — navigational schema
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dcprosens.com/blog' },
                    { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
                ],
            },
        ],
    };

    return (
        <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/blog" style={{
                display: 'inline-block',
                marginBottom: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                ← Back to Blog
            </Link>

            <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                    fontWeight: 800
                }}>
                    {post.title}
                </h1>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <SEOImage
                    src={post.image}
                    alt={post.title}
                    priority={true}
                    caption="Featured Image"
                />
            </header>

            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                }}
            />
        </article>
    );
}
