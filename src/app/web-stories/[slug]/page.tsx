import { stories } from '@/lib/stories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return stories.map((story) => ({
        slug: story.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const story = stories.find(s => s.slug === slug);
    if (!story) return { title: 'Story Not Found' };
    return {
        title: `${story.title} | DCPROSENS Web Stories`,
        description: `${story.title} — Interactive web story from DCPROSENS, the ultimate gaming sensitivity hub.`,
        openGraph: {
            title: story.title,
            images: [{ url: story.coverImage, width: 1080, height: 1920, alt: story.title }],
        },
    };
}

export default async function WebStoryPage({ params }: Props) {
    const { slug } = await params;
    const story = stories.find(s => s.slug === slug);
    if (!story) return notFound();

    return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'var(--font-outfit, sans-serif)' }}>
            {/* Story Header */}
            <div style={{
                padding: '2rem',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <a href="/blog" style={{ color: 'var(--primary, #00ff9d)', fontSize: '0.9rem', textDecoration: 'none' }}>
                    ← Back to Blog
                </a>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem' }}>{story.title}</h1>
                <p style={{ color: '#aaa', fontSize: '0.85rem' }}>Web Story by DCPROSENS • {story.pages.length} slides</p>
            </div>

            {/* Story Pages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {story.pages.map((page, index) => (
                    <div
                        key={page.id}
                        style={{
                            minHeight: '100vh',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-end',
                            overflow: 'hidden',
                            borderBottom: '2px solid #111',
                        }}
                    >
                        {/* Background Image */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${page.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.5)',
                        }} />

                        {/* Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                        }} />

                        {/* Slide Number */}
                        <div style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            background: 'rgba(0,255,157,0.15)',
                            border: '1px solid rgba(0,255,157,0.3)',
                            color: '#00ff9d',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                        }}>
                            {index + 1} / {story.pages.length}
                        </div>

                        {/* Content */}
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            padding: '3rem 2rem 4rem',
                            width: '100%',
                            maxWidth: '640px',
                            margin: '0 auto',
                        }}>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '1rem',
                                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                            }}>
                                {page.title}
                            </h2>
                            {page.description && (
                                <p style={{
                                    fontSize: '1.2rem',
                                    color: '#e0e0e0',
                                    lineHeight: 1.6,
                                    textShadow: '0 1px 10px rgba(0,0,0,0.8)',
                                }}>
                                    {page.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer CTA */}
            <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(to top, #050507, #0f1014)',
            }}>
                <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Want more gaming insights?</p>
                <a href="/blog" style={{
                    display: 'inline-block',
                    background: 'var(--primary, #00ff9d)',
                    color: '#000',
                    padding: '0.9rem 2rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                }}>
                    Read All Articles →
                </a>
            </div>
        </div>
    );
}
