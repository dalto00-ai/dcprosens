import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import SEOImage from '@/components/SEOImage';

interface Props {
    params: Promise<{ slug: string }>;
}

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
        title: `${post.title} | DCPROSENS`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
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

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: `https://dcprosens.com${post.image}`,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: 'DCPROSENS'
        }
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

            <style>{`
        .prose h2 {
          color: var(--text-primary);
          font-size: 2rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        .prose h3 {
          color: var(--text-primary);
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .prose p {
          margin-bottom: 1.5rem;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: var(--white);
          font-weight: 600;
        }
        .prose code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          color: var(--primary);
        }
      `}</style>
        </article>
    );
}
