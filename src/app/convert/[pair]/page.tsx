import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games } from '@/lib/games';
import { convertPairs, getConvertPair } from '@/lib/convertPairs';
import { getProsByGame } from '@/lib/pros';
import Converter from '@/components/Converter';
import AdsterraInContent from '@/components/AdsterraInContent';
import { seoTitle } from '@/utils/seoText';

interface Props {
    params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return convertPairs.map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { pair: slug } = await params;
    const pair = getConvertPair(slug);
    if (!pair) return { title: 'Conversion Not Found' };

    // Pair labels vary in length; the longest ones overflow what a search
    // result renders once " | DCPROSENS" is appended.
    const title = seoTitle(`${pair.fromLabel} to ${pair.toLabel} Sensitivity Converter`);
    const description = `Convert your ${pair.fromLabel} sensitivity to ${pair.toLabel} with an exact cm/360 match. Free calculator, conversion table, and the real yaw-based formula — no signup.`;
    const url = `https://dcprosens.com/convert/${slug}/`;

    return {
        title,
        description,
        keywords: [
            `${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} sensitivity`,
            `${pair.fromLabel.toLowerCase()} to ${pair.toLabel.toLowerCase()} sens converter`,
            `${pair.fromLabel.toLowerCase()} ${pair.toLabel.toLowerCase()} sensitivity calculator`,
            `convert ${pair.fromLabel.toLowerCase()} sens to ${pair.toLabel.toLowerCase()}`,
        ],
        alternates: { canonical: url },
        // Declaring openGraph here replaces the root layout's object rather than
        // merging into it, so the image has to be restated or the page ships with
        // no og:image at all.
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            siteName: 'DCPROSENS',
            images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        },
        twitter: { card: 'summary_large_image', title, description, creator: '@dcprosens', images: ["/og-image.png"] },
    };
}

export default async function ConvertPairPage({ params }: Props) {
    const { pair: slug } = await params;
    const pair = getConvertPair(slug);
    if (!pair) notFound();

    const fromGame = games.find((g) => g.id === pair.fromId);
    const toGame = games.find((g) => g.id === pair.toId);
    if (!fromGame || !toGame) notFound();

    const canonicalUrl = `https://dcprosens.com/convert/${slug}`;
    const ratio = fromGame.yaw / toGame.yaw;
    const isIdenticalYaw = fromGame.yaw === toGame.yaw;

    const commonSensValues = [0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.8];
    const dpiTiers = [400, 800, 1600];

    const fromPros = getProsByGame(pair.fromId).slice(0, 2);
    const toPros = getProsByGame(pair.toId).slice(0, 2);
    const reversePair = convertPairs.find((p) => p.fromId === pair.toId && p.toId === pair.fromId);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: `${pair.fromLabel} to ${pair.toLabel} Sensitivity Converter`,
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Any',
                url: canonicalUrl,
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: pair.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: `${pair.fromLabel} to ${pair.toLabel}`, item: canonicalUrl },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    {pair.fromLabel} to <span className="text-gradient">{pair.toLabel}</span> Sensitivity Converter
                </h1>
                <p className="hero-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    {pair.intro}
                </p>
            </div>

            <Converter
                initialFromGame={pair.fromId}
                initialToGame={pair.toId}
                initialSens={pair.defaultSens}
                initialDpi={pair.defaultDpi}
            />

            <AdsterraInContent />

            <div style={{ maxWidth: '800px', margin: '4rem auto 0', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>
                    The {pair.fromLabel} to {pair.toLabel} Formula
                </h2>
                {isIdenticalYaw ? (
                    <p>
                        {pair.fromLabel} and {pair.toLabel} share the exact same yaw constant — <code>{fromGame.yaw}°</code> of camera rotation per mouse count in both games. There is no multiplier to apply: the same sensitivity number at the same DPI produces an identical cm/360 in both titles.
                    </p>
                ) : (
                    <p>
                        {pair.fromLabel}&apos;s yaw constant is <code>{fromGame.yaw}°</code> per count; {pair.toLabel}&apos;s is <code>{toGame.yaw}°</code> per count. The conversion ratio is fixed: <strong>{ratio.toFixed(4)}</strong>. Formula: <code>{pair.toLabel} sensitivity = {pair.fromLabel} sensitivity × ({fromGame.yaw} / {toGame.yaw})</code>. This preserves your cm/360 — the physical distance you move the mouse for a full 360° turn — across both games.
                    </p>
                )}
            </div>

            <div style={{ maxWidth: '800px', margin: '3rem auto 0', color: 'var(--text-secondary)' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>
                    {pair.fromLabel} to {pair.toLabel} Conversion Table
                </h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '0.6rem' }}>{pair.fromLabel} Sens</th>
                                {dpiTiers.map((dpi) => (
                                    <th key={dpi} style={{ textAlign: 'left', padding: '0.6rem' }}>{pair.toLabel} @ {dpi} DPI</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {commonSensValues.map((sens) => (
                                <tr key={sens} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>{sens}</td>
                                    {dpiTiers.map((dpi) => (
                                        <td key={dpi} style={{ padding: '0.6rem' }}>
                                            {isIdenticalYaw ? sens.toFixed(3) : (sens * ratio).toFixed(3)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>
                    DPI doesn&apos;t change the conversion ratio — it&apos;s shown across tiers here only because your eDPI (sens × DPI) is what most pro settings pages report. Use whichever DPI column matches your mouse.
                </p>
            </div>

            {pair.sections.map((section) => (
                <div key={section.heading} style={{ maxWidth: '800px', margin: '3rem auto 0', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>
                        {section.heading}
                    </h2>
                    <p>{section.body}</p>
                </div>
            ))}

            <div style={{
                maxWidth: '800px', margin: '3rem auto 0', padding: '2rem',
                background: 'rgba(0, 242, 254, 0.04)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-lg, 12px)',
            }}>
                <h2 style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                    Free: Convert Your Scope and ADS Sensitivity Too
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    Most sensitivity converters lock scope/ADS conversion behind a paid subscription. DCPROSENS doesn&apos;t — the same 1:1 focal-matching calculator that handles {pair.fromLabel}, {pair.toLabel}, Apex, and Warzone scope sensitivity is free for everyone.
                </p>
                <Link href="/ads/" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    Open the free ADS / scope sensitivity calculator →
                </Link>
            </div>

            {(fromPros.length > 0 || toPros.length > 0) && (
                <div style={{ maxWidth: '800px', margin: '3rem auto 0', color: 'var(--text-secondary)' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>
                        Pro Players Who Play Both Games
                    </h2>
                    <p>
                        {[...fromPros, ...toPros].map((p, i, arr) => (
                            <span key={p.slug}>
                                <Link href={`/pros/${p.slug}/`} style={{ color: 'var(--primary)' }}>{p.name}</Link>
                                {i < arr.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                        {' '}have public {pair.fromLabel} and {pair.toLabel} settings in our{' '}
                        <Link href="/pros/" style={{ color: 'var(--primary)' }}>pro player database</Link>.
                    </p>
                </div>
            )}

            <div style={{ maxWidth: '800px', margin: '3rem auto 0', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pair.faqs.map((item) => (
                        <details key={item.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                            <summary style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>{item.q}</summary>
                            <p style={{ marginTop: '0.75rem' }}>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '3rem auto 0', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem' }}>
                {reversePair && (
                    <Link href={`/convert/${reversePair.slug}/`} style={{ color: 'var(--primary)' }}>
                        ↔ Reverse conversion: {pair.toLabel} to {pair.fromLabel}
                    </Link>
                )}
                {pair.relatedBlogSlug && (
                    <Link href={`/blog/${pair.relatedBlogSlug}/`} style={{ color: 'var(--primary)' }}>
                        📖 Full guide to the conversion
                    </Link>
                )}
                <Link href="/aim-trainer/" style={{ color: 'var(--primary)' }}>
                    🎯 Test this sensitivity in Aim Trainer
                </Link>
                <Link href="/dpi/" style={{ color: 'var(--primary)' }}>
                    eDPI calculator
                </Link>
            </div>
        </div>
    );
}
