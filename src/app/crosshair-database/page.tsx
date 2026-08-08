import type { Metadata } from 'next';
import Link from 'next/link';
import { pros } from '@/lib/pros';
import CopyButton from '@/components/CopyButton';

export const metadata: Metadata = {
    title: 'Pro Valorant Crosshair Codes — Copy TenZ, Aspas, yay & More | DCPROSENS',
    description:
        'Real, ready-to-import Valorant crosshair codes from pro players: TenZ, Aspas, Demon1, Boaster, yay. Copy the code and import it directly in-game.',
    keywords: [
        'valorant crosshair codes', 'pro crosshair codes', 'tenz crosshair code',
        'aspas crosshair', 'yay crosshair code', 'demon1 crosshair', 'boaster crosshair',
        'valorant crosshair database', 'copy pro crosshair valorant',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/crosshair-database',
    },
    openGraph: {
        title: 'Pro Valorant Crosshair Codes | DCPROSENS',
        description: 'Real, ready-to-import Valorant crosshair codes from pro players.',
        url: 'https://dcprosens.com/crosshair-database',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Valorant Crosshair Codes | DCPROSENS',
        description: 'Copy real Valorant crosshair codes from TenZ, Aspas, yay and more.',
        creator: '@dcprosens',
    },
};

export default function CrosshairDatabasePage() {
    const prosWithCrosshair = pros.filter((p) => p.crosshairCode);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                name: 'Pro Valorant Crosshair Codes',
                url: 'https://dcprosens.com/crosshair-database',
                description: 'A collection of real, verified Valorant crosshair codes from professional players.',
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'Crosshair Database', item: 'https://dcprosens.com/crosshair-database' },
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

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                    ➕ Valorant Crosshair Codes
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Pro Crosshair <span className="text-gradient">Database</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Real, verified crosshair codes used by pro Valorant players. Copy and import directly in-game.
                </p>
            </div>

            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.5rem',
                maxWidth: '700px',
                margin: '0 auto 3rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
            }}>
                ℹ️ This database currently covers <strong style={{ color: 'var(--text-primary)' }}>Valorant only</strong> — every
                code here comes directly from our verified <Link href="/pros" style={{ color: 'var(--primary)' }}>pro player database</Link>.
                CS2, Apex Legends and Overwatch 2 crosshair settings are being verified and will be added once confirmed. Also try our{' '}
                <Link href="/crosshair" style={{ color: 'var(--primary)' }}>Crosshair Generator</Link> to build your own.
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
            }}>
                {prosWithCrosshair.map((pro) => (
                    <div key={pro.slug} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(255,70,85,0.08), rgba(112,0,255,0.05))',
                            borderBottom: '1px solid var(--border-color)',
                            padding: '1rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <Link href={`/pros/${pro.slug}`} style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>
                                    {pro.name}
                                </Link>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{pro.team} · {pro.role}</div>
                            </div>
                            <span style={{ fontSize: '1.3rem' }}>{pro.countryFlag}</span>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            flexWrap: 'wrap',
                        }}>
                            <code style={{
                                flex: 1,
                                minWidth: '180px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '0.75rem 1rem',
                                fontSize: '0.85rem',
                                color: 'var(--primary)',
                                fontFamily: 'monospace',
                                wordBreak: 'break-all',
                                lineHeight: 1.5,
                            }}>
                                {pro.crosshairCode}
                            </code>
                            <CopyButton code={pro.crosshairCode as string} />
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: '5rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                    How to Import a Crosshair Code in Valorant
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    Open Valorant, go to <strong>Settings → Crosshair</strong>, scroll to the bottom of the panel and click{' '}
                    <strong>Import Profile Code</strong>. Paste the copied code and confirm — your crosshair will update instantly.
                </p>
            </div>
        </div>
    );
}
