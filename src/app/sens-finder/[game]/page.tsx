import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games } from '@/lib/games';
import { sensFinderContent, getSensFinderContent } from '@/lib/sensFinderContent';
import { getProsByGame } from '@/lib/pros';
import Converter from '@/components/Converter';
import PartnerBanner from '@/components/PartnerBanner';
import { seoDescription } from '@/utils/seoText';

interface Props {
    params: Promise<{ game: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return sensFinderContent.map((g) => ({ game: g.gameId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { game: gameId } = await params;
    const content = getSensFinderContent(gameId);
    const game = games.find((g) => g.id === gameId);
    if (!content || !game) return { title: 'Game Not Found' };

    // Title budget is ~47 chars before " | DCPROSENS" is appended (keeps the
    // full <title> under Google/Bing's ~60-char cutoff) — game display names
    // range from 4 to 38 chars, so the suffix tier has to flex to fit.
    const titleTiers = [
        `${content.displayName} Sensitivity Converter`,
        `${content.displayName} Sens Converter`,
        content.displayName,
    ];
    const title = titleTiers.find((t) => t.length <= 47) ?? titleTiers[titleTiers.length - 1];
    // Trimmed centrally: the engine string runs long for a few games, which
    // pushed the description past what a search result shows.
    const description = seoDescription(
        `Convert ${content.displayName} sensitivity to or from any other game with an exact cm/360 match. Yaw ${game.yaw}, ${content.engine}.`
    );

    return {
        title,
        description,
        keywords: [
            `${content.displayName.toLowerCase()} sensitivity converter`,
            `${content.displayName.toLowerCase()} sens calculator`,
            `${content.displayName.toLowerCase()} cm/360`,
            `${content.displayName.toLowerCase()} edpi`,
            `convert ${content.displayName.toLowerCase()} sensitivity`,
        ],
        alternates: {
            canonical: `https://dcprosens.com/sens-finder/${gameId}/`,
        },
        openGraph: {
            // Inherited from the root layout only when this page omits openGraph
            // entirely — declaring the object here replaces the parent's, so the
            // image has to be restated or the page ships with no og:image at all.
            images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
            title,
            description,
            url: `https://dcprosens.com/sens-finder/${gameId}/`,
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

export default async function SensFinderGamePage({ params }: Props) {
    const { game: gameId } = await params;
    const content = getSensFinderContent(gameId);
    const game = games.find((g) => g.id === gameId);
    if (!content || !game) notFound();

    const canonicalUrl = `https://dcprosens.com/sens-finder/${gameId}/`;
    const relatedPros = getProsByGame(gameId).slice(0, 2);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonicalUrl}#webpage`,
                url: canonicalUrl,
                name: `${content.displayName} Sensitivity Converter — DCPROSENS`,
                description: content.blurb,
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
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Sens Finder', item: 'https://dcprosens.com/sens-finder/' },
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
                    🎯 {content.category}
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    {content.displayName} <span className="text-gradient">Sensitivity Converter</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                    {content.blurb}
                </p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
            }}>
                <span>⚙️ Engine: <strong style={{ color: 'var(--text-primary)' }}>{content.engine}</strong></span>
                <span>📐 Yaw: <code style={{ color: 'var(--primary)' }}>{game.yaw}</code></span>
            </div>

            <Converter initialFromGame={gameId} />

            <PartnerBanner slot="inContent" />

            {relatedPros.length > 0 && (
                <div style={{ maxWidth: '800px', margin: '3rem auto 0', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        See what the pros use:{' '}
                        {relatedPros.map((p, i) => (
                            <span key={p.slug}>
                                <Link href={`/pros/${p.slug}/`} style={{ color: 'var(--primary)' }}>{p.name}</Link>
                                {i < relatedPros.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                        {' '}— {content.displayName} settings and gear.
                    </p>
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
                    Frequently Asked Questions About {content.displayName} Sensitivity
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
                    <Link href="/sens-finder/" style={{ color: 'var(--primary)' }}>← Back to all games</Link>
                </div>
            </div>
        </div>
    );
}
