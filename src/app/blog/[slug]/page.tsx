import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

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

    return (
        <article className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
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
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>
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
