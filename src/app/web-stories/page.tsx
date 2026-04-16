import { stories } from '@/lib/stories';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Web Stories — Gaming Sensitivity Tips | DCPROSENS',
    description: 'Quick visual guides on gaming sensitivity, pro settings, and FPS optimization. Tap through our Web Stories for bite-sized gaming knowledge.',
    alternates: { canonical: 'https://dcprosens.com/web-stories' },
    openGraph: {
        title: 'DCPROSENS Web Stories — Gaming Sensitivity Guides',
        description: 'Swipe through quick visual guides on DPI, eDPI, pro sensitivity settings and more.',
        type: 'website',
        url: 'https://dcprosens.com/web-stories',
        siteName: 'DCPROSENS',
        images: [{ url: 'https://dcprosens.com/og-image.webp', width: 1200, height: 630, alt: 'DCPROSENS Web Stories' }],
    },
};

export default function WebStoriesIndex() {
    // ✅ ItemList JSON-LD — helps Google index the stories collection
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'DCPROSENS Web Stories — Gaming Sensitivity',
        description: 'Visual guides for FPS sensitivity, pro settings and gameplay optimization.',
        url: 'https://dcprosens.com/web-stories',
        numberOfItems: stories.length,
        itemListElement: stories.map((story, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://dcprosens.com/web-stories/${story.slug}`,
            name: story.title,
            image: `https://dcprosens.com${story.coverImage}`,
        })),
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg, #0a0a0f)', color: '#fff', fontFamily: 'var(--font-outfit, sans-serif)' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <div style={{
                padding: 'clamp(3rem, 8vw, 6rem) 2rem 3rem',
                textAlign: 'center',
                background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,255,157,0.08), transparent)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(0,255,157,0.1)',
                    border: '1px solid rgba(0,255,157,0.25)',
                    color: '#00ff9d',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                }}>
                    ▶ Web Stories
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #fff 40%, rgba(0,255,157,0.8))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Gaming Insights, One Slide at a Time
                </h1>
                <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    color: '#888',
                    maxWidth: '520px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                }}>
                    Quick visual guides on sensitivity, pro settings, and FPS optimization from DCPROSENS experts.
                </p>
            </div>

            {/* Stories Grid */}
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {stories.map((story) => (
                        <Link
                            key={story.slug}
                            href={`/web-stories/${story.slug}`}
                            style={{ textDecoration: 'none', display: 'block' }}
                            aria-label={`Watch Web Story: ${story.title}`}
                        >
                            <article
                                style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    aspectRatio: '9/16',
                                    background: '#111',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(0,255,157,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                {/* Cover Image */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${story.coverImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'brightness(0.5)',
                                }} />

                                {/* Gradient */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
                                }} />

                                {/* Play Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,255,157,0.15)',
                                    border: '1px solid rgba(0,255,157,0.35)',
                                    color: '#00ff9d',
                                    padding: '0.25rem 0.65rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                }}>
                                    ▶ {story.pages.length} slides
                                </div>

                                {/* Category */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    background: 'rgba(0,0,0,0.6)',
                                    color: '#aaa',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                }}>
                                    {story.category}
                                </div>

                                {/* Text Content */}
                                <div style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    padding: '1.25rem',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                }}>
                                    <h2 style={{
                                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                        fontWeight: 800,
                                        lineHeight: 1.3,
                                        marginBottom: '0.4rem',
                                        color: '#fff',
                                    }}>
                                        {story.title}
                                    </h2>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: '#999',
                                        lineHeight: 1.4,
                                    }}>
                                        {story.publishDate}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'linear-gradient(to top, rgba(0,255,157,0.03), transparent)',
            }}>
                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Want deeper insights?</p>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                    Read Our Full Articles
                </h3>
                <Link href="/blog" style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #00ff9d, #00d4ff)',
                    color: '#000',
                    padding: '0.9rem 2.5rem',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textDecoration: 'none',
                }}>
                    Browse 75 Articles →
                </Link>
            </div>
        </div>
    );
}
