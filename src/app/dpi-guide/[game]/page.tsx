import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dpiGuideContent, getDpiGuideContent } from '@/lib/dpiGuideContent';
import { seoDescription } from '@/utils/seoText';

interface Props {
    params: Promise<{ game: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return dpiGuideContent.map((g) => ({ game: g.gameId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { game: gameId } = await params;
    const content = getDpiGuideContent(gameId);
    if (!content) return { title: 'Game Not Found' };

    // Title budget is ~47 chars before " | DCPROSENS" is appended.
    const titleTiers = [
        `Best DPI & Mouse Settings for ${content.displayName}`,
        `Best DPI Settings for ${content.displayName}`,
        `${content.displayName} DPI Guide`,
    ];
    const title = titleTiers.find((t) => t.length <= 47) ?? titleTiers[titleTiers.length - 1];
    // Template output length varies with the game name and the DPI range, so
    // it is trimmed to what a search result renders rather than assumed to fit.
    const description = seoDescription(
        `What DPI do ${content.displayName} pros actually use? ${content.dpiRange}`
    );

    return {
        title,
        description,
        keywords: [
            `${content.displayName.toLowerCase()} dpi`,
            `${content.displayName.toLowerCase()} mouse sensitivity`,
            `best dpi for ${content.displayName.toLowerCase()}`,
            `${content.displayName.toLowerCase()} pro settings`,
            `${content.displayName.toLowerCase()} mouse settings`,
        ],
        alternates: {
            canonical: `https://dcprosens.com/dpi-guide/${gameId}/`,
        },
        openGraph: {
            // Inherited from the root layout only when this page omits openGraph
            // entirely — declaring the object here replaces the parent's, so the
            // image has to be restated or the page ships with no og:image at all.
            images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
            title,
            description,
            url: `https://dcprosens.com/dpi-guide/${gameId}`,
            type: 'website',
            siteName: 'DCPROSENS',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: '@dcprosens',
            images: ["/og-image.png"],
        },
    };
}

export default async function DpiGuidePage({ params }: Props) {
    const { game: gameId } = await params;
    const content = getDpiGuideContent(gameId);
    if (!content) notFound();

    const canonicalUrl = `https://dcprosens.com/dpi-guide/${gameId}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonicalUrl}#webpage`,
                url: canonicalUrl,
                name: `Best DPI & Mouse Settings for ${content.displayName}`,
                description: content.whyNoConverter,
                inLanguage: 'en-US',
            },
            {
                '@type': 'FAQPage',
                mainEntity: content.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'DPI Guides', item: 'https://dcprosens.com/dpi-guide/' },
                    { '@type': 'ListItem', position: 3, name: content.displayName, item: canonicalUrl },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: '#000',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.35rem 1.25rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1.25rem',
                    }}
                >
                    🖱️ {content.genre}
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Best DPI for <span className="text-gradient">{content.displayName}</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                    {content.dpiRange}
                </p>
            </div>

            <div style={{
                maxWidth: '700px',
                margin: '0 auto 2.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem 1.75rem',
            }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Why isn&apos;t there a sensitivity converter for {content.displayName}?</strong>{' '}
                    {content.whyNoConverter}
                </p>
            </div>

            {content.proExamples.length > 0 && (
                <div style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                        What Pros Use
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {content.proExamples.map((p) => (
                            <div key={p.name} style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem 1.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>{p.dpi}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Tips
                </h2>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                    {content.tips.map((tip, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                    ))}
                </ul>
            </div>

            {content.deepDive && content.deepDive.length > 0 && (
                <div style={{ marginTop: '3rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                    {content.deepDive.map((section) => (
                        <div key={section.heading} style={{ marginBottom: '2.25rem' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.85rem' }}>
                                {section.heading}
                            </h2>
                            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {section.paragraphs.map((paragraph, i) => (
                                    <p key={i} style={{ margin: 0 }}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div
                style={{
                    marginTop: '4rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {content.faqs.map((item) => (
                        <details key={item.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                            <summary style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>{item.q}</summary>
                            <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>{item.a}</p>
                        </details>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <Link href="/" style={{ color: 'var(--primary)' }}>← Back to DCPROSENS</Link>
                </div>
            </div>
        </div>
    );
}
