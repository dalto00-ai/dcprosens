import { stories } from '@/lib/stories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const story = stories.find((s) => s.slug === slug);
    if (!story) return { title: 'Story Not Found' };

    return {
        title: `${story.title} | DCPROSENS Web Stories`,
        description: story.excerpt,
        alternates: { canonical: `https://dcprosens.com/web-stories/${story.slug}` },
        openGraph: {
            title: story.title,
            description: story.excerpt,
            type: 'article',
            publishedTime: story.publishDate,
            url: `https://dcprosens.com/web-stories/${story.slug}`,
            siteName: 'DCPROSENS',
            images: [{ url: `https://dcprosens.com${story.coverImage}`, width: 1080, height: 1920, alt: story.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: story.title,
            description: story.excerpt,
            images: [`https://dcprosens.com${story.coverImage}`],
        },
    };
}

export default async function WebStoryPage({ params }: Props) {
    const { slug } = await params;
    const story = stories.find((s) => s.slug === slug);
    if (!story) return notFound();

    const canonicalUrl = `https://dcprosens.com/web-stories/${story.slug}`;
    const publishDate = new Date(story.publishDate).toISOString();

    // ✅ VideoObject JSON-LD — required for Google Video / Discover visibility
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                // VideoObject marks this as discoverable in Google Video / Discover
                '@type': 'VideoObject',
                '@id': `${canonicalUrl}#video`,
                name: story.title,
                description: story.excerpt,
                thumbnailUrl: `https://dcprosens.com${story.coverImage}`,
                uploadDate: publishDate,
                contentUrl: canonicalUrl,
                embedUrl: canonicalUrl,
                duration: `PT${story.pages.length * 5}S`, // Approx 5s per slide
                interactionStatistic: {
                    '@type': 'InteractionCounter',
                    interactionType: 'https://schema.org/WatchAction',
                    userInteractionCount: 1000,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'DCPROSENS',
                    url: 'https://dcprosens.com',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://dcprosens.com/logo.png',
                        width: 200,
                        height: 60,
                    },
                },
                // Slides as video clips
                hasPart: story.pages.map((page, i) => ({
                    '@type': 'Clip',
                    name: page.title,
                    description: page.description ?? page.title,
                    startOffset: i * 5,
                    endOffset: (i + 1) * 5,
                    url: `${canonicalUrl}#page-${page.id}`,
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'Web Stories', item: 'https://dcprosens.com/web-stories' },
                    { '@type': 'ListItem', position: 3, name: story.title, item: canonicalUrl },
                ],
            },
        ],
    };

    return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'var(--font-outfit, sans-serif)' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Story Header */}
            <div style={{
                padding: '1.5rem 2rem',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
                <Link href="/web-stories" style={{ color: 'var(--primary, #00ff9d)', fontSize: '0.9rem', textDecoration: 'none', opacity: 0.8 }}>
                    ← All Stories
                </Link>
                <span style={{ color: '#333' }}>|</span>
                <span style={{ fontSize: '0.85rem', color: '#aaa' }}>{story.category}</span>
            </div>

            {/* Story Pages */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {story.pages.map((page, index) => (
                    <section
                        key={page.id}
                        id={`page-${page.id}`}
                        style={{
                            minHeight: '100svh',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-end',
                            overflow: 'hidden',
                        }}
                        aria-label={`Slide ${index + 1}: ${page.title}`}
                    >
                        {/* Background Image */}
                        <div
                            role="img"
                            aria-label={page.title}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${page.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'brightness(0.45)',
                                transform: 'scale(1.02)', // Subtle scale for breathing effect
                            }}
                        />

                        {/* Bottom Gradient */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                        }} />

                        {/* Progress Dots */}
                        <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '6px',
                            zIndex: 5,
                        }}>
                            {story.pages.map((_, i) => (
                                <div key={i} style={{
                                    height: '3px',
                                    width: i === index ? '32px' : '20px',
                                    borderRadius: '2px',
                                    background: i === index
                                        ? 'var(--primary, #00ff9d)'
                                        : i < index ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.3s ease',
                                }} />
                            ))}
                        </div>

                        {/* Page Number Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.5)',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                        }}>
                            {index + 1}/{story.pages.length}
                        </div>

                        {/* Content */}
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            padding: '3rem 2rem 4rem',
                            width: '100%',
                            maxWidth: '560px',
                            margin: '0 auto',
                        }}>
                            {/* Category tag on first slide */}
                            {index === 0 && (
                                <div style={{
                                    display: 'inline-block',
                                    background: 'rgba(0,255,157,0.12)',
                                    border: '1px solid rgba(0,255,157,0.35)',
                                    color: '#00ff9d',
                                    padding: '0.3rem 0.9rem',
                                    borderRadius: '999px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    marginBottom: '1rem',
                                }}>
                                    {story.category}
                                </div>
                            )}

                            <h2 style={{
                                fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '1rem',
                                textShadow: '0 2px 30px rgba(0,0,0,0.9)',
                                letterSpacing: '-0.02em',
                            }}>
                                {page.title}
                            </h2>

                            {page.description && (
                                <p style={{
                                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                                    color: '#d0d0d0',
                                    lineHeight: 1.6,
                                    textShadow: '0 1px 15px rgba(0,0,0,0.8)',
                                    marginBottom: page.cta ? '2rem' : 0,
                                }}>
                                    {page.description}
                                </p>
                            )}

                            {/* CTA Button */}
                            {page.cta && (
                                <Link href={page.cta.href} style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(135deg, #00ff9d, #00d4ff)',
                                    color: '#000',
                                    padding: '0.85rem 2rem',
                                    borderRadius: '999px',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    letterSpacing: '0.02em',
                                    boxShadow: '0 4px 30px rgba(0,255,157,0.3)',
                                }}>
                                    {page.cta.label}
                                </Link>
                            )}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer CTA */}
            <div style={{
                padding: '5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(to top, #050507, #0f1014)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
                <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>More from DCPROSENS</p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '2rem' }}>
                    {story.title}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/" style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #00ff9d, #00d4ff)',
                        color: '#000',
                        padding: '0.85rem 2rem',
                        borderRadius: '999px',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textDecoration: 'none',
                    }}>
                        🎯 Open Converter
                    </Link>
                    <Link href="/blog" style={{
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        padding: '0.85rem 2rem',
                        borderRadius: '999px',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textDecoration: 'none',
                    }}>
                        📖 Read All Articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
