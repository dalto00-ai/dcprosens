// @ts-nocheck
import { stories } from '@/lib/stories';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Web Stories',
};

export async function generateStaticParams() {
    return stories.map((story) => ({
        slug: story.slug,
    }));
}

// Start of AMP HTML Document
export default async function WebStoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const story = stories.find(s => s.slug === slug);

    if (!story) return notFound();

    return (
        <>
            <head>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
                <style dangerouslySetInnerHTML={{
                    __html: `
          amp-story { font-family: 'Outfit', sans-serif; }
          amp-story-page { background: #000; }
          h1 { font-weight: 800; font-size: 2.5em; line-height: 1.1; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
          p { font-size: 1.2em; color: #eee; line-height: 1.5; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
          .layer-text { padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
        `}} />
            </head>
            <body>
                <amp-story
                    standalone=""
                    title={story.title}
                    publisher="DCPROSENS"
                    publisher-logo-src="https://dcprosens.com/logo.png"
                    poster-portrait-src={story.coverImage}
                >
                    {story.pages.map(page => (
                        <amp-story-page key={page.id} id={page.id}>
                            <amp-story-grid-layer template="fill">
                                {/* Placeholder Image (should be replaced with amp-img in production) */}
                                <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={page.image} style={{ width: '100px', opacity: 0.5 }} alt="" />
                                </div>
                            </amp-story-grid-layer>
                            <amp-story-grid-layer template="vertical" className="layer-text">
                                <div style={{ marginTop: 'auto' }}>
                                    <h1 animate-in="fly-in-bottom">{page.title}</h1>
                                    {page.description && <p animate-in="fade-in" animate-in-delay="0.3s">{page.description}</p>}
                                </div>
                            </amp-story-grid-layer>
                        </amp-story-page>
                    ))}
                </amp-story>
            </body>
        </>
    );
}
