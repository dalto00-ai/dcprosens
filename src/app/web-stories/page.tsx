import { stories } from '@/lib/stories';
import Link from 'next/link';
import type { Metadata } from 'next';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'Web Stories — Gaming Sensitivity Tips',
    description: 'Quick visual guides on gaming sensitivity, pro settings, and FPS optimization. Tap through our Web Stories for bite-sized gaming knowledge.',
    alternates: { canonical: 'https://dcprosens.com/web-stories/' },
    openGraph: {
        title: 'DCPROSENS Web Stories — Gaming Sensitivity Guides',
        description: 'Swipe through quick visual guides on DPI, eDPI, pro sensitivity settings and more.',
        type: 'website',
        url: 'https://dcprosens.com/web-stories/',
        siteName: 'DCPROSENS',
        images: [{ url: 'https://dcprosens.com/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Web Stories' }],
    },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What these are for",
            body: [
                <>A Web Story is a mobile-first format made of tappable full-screen panels. It suits a concept that has three or four steps and benefits from an image at each one.</>,
                <>They are not a replacement for the written guides. A story explains what cm/360 is in thirty seconds; the guide explains how to choose yours and why the choice matters.</>,
                <>Every story links to its full article, so the format is a way in rather than a destination.</>,
            ],
        },
        {
            heading: "What is covered",
            body: [
                <>Fundamentals: what eDPI is, what cm/360 measures, how a mouse sensor actually reads movement.</>,
                <>Gear: mouse skates and glide, wireless setup, choosing between pads, building a desk that supports the sensitivity you want to use.</>,
                <>Play: crosshair placement, training your aim like a professional, reading ranked progress honestly.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "What is a Web Story?", a: "A mobile-first format made of tappable full-screen panels, designed to be read in under a minute. Each story here links back to the full written guide on the same topic." },
        { q: "Do I need an app to view them?", a: "No. They open in any browser on any device, though they are designed for a phone screen." },
        { q: "Are the stories the same as the blog posts?", a: "No. A story covers the core idea in a handful of panels; the article covers the detail, the maths and the edge cases. The story links to the article it summarises." },
];

export default function WebStoriesIndex() {
    // ✅ ItemList JSON-LD — helps Google index the stories collection
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'DCPROSENS Web Stories — Gaming Sensitivity',
        description: 'Visual guides for FPS sensitivity, pro settings and gameplay optimization.',
        url: 'https://dcprosens.com/web-stories/',
        numberOfItems: stories.length,
        itemListElement: stories.map((story, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://dcprosens.com/web-stories/${story.slug}/`,
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
            {/* CSS hover — avoids client component requirement */}
            <style>{`
                .story-card { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
                .story-card:hover { transform: scale(1.03); box-shadow: 0 16px 50px rgba(0,255,157,0.15); }
            `}</style>

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
                        // Plain <a>, not next/link: these routes are standalone
                        // AMP HTML files (route.ts), not Next.js pages — the
                        // client-side router has no RSC data for them, so a
                        // <Link> soft-navigation fails. A full browser
                        // navigation is required.
                        <a
                            key={story.slug}
                            href={`/web-stories/${story.slug}/`}
                            style={{ textDecoration: 'none', display: 'block' }}
                            aria-label={`Watch Web Story: ${story.title}`}
                        >
                            <article
                                className="story-card"
                                style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    aspectRatio: '9/16',
                                    background: '#111',
                                    border: '1px solid rgba(255,255,255,0.08)',
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
                                    position: 'absolute',
                                    zIndex: 1,
                                    padding: '1.25rem',
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
                        </a>
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
                <Link href="/blog/" style={{
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
            <ToolExplainer
                intro={<>Short, visual walkthroughs of the topics that are quicker to show than to read: how a mouse sensor works, what eDPI means, how crosshair placement changes a fight. Each is a handful of full-screen panels built for a phone, and each links back to the full written guide if you want the detail.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
