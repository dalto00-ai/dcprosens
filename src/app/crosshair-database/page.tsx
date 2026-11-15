import type { Metadata } from 'next';
import Link from 'next/link';
import { pros } from '@/lib/pros';
import CopyButton from '@/components/CopyButton';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'Pro Valorant Crosshair Codes',
    description:
        'Real, ready-to-import Valorant crosshair codes from pro players: TenZ, Aspas, Demon1, Boaster, yay. Copy the code and import it directly in-game.',
    keywords: [
        'valorant crosshair codes', 'pro crosshair codes', 'tenz crosshair code',
        'aspas crosshair', 'yay crosshair code', 'demon1 crosshair', 'boaster crosshair',
        'valorant crosshair database', 'copy pro crosshair valorant',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/crosshair-database/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Pro Valorant Crosshair Codes | DCPROSENS',
        description: 'Real, ready-to-import Valorant crosshair codes from pro players.',
        url: 'https://dcprosens.com/crosshair-database/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Valorant Crosshair Codes | DCPROSENS',
        description: 'Copy real Valorant crosshair codes from TenZ, Aspas, yay and more.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What actually differs between pro crosshairs",
            body: [
                <>Size and gap, mostly. A larger gap keeps the centre of the screen clear so a distant head is not hidden behind your own crosshair; a tighter one gives a more precise reference point at close range.</>,
                <>Static versus dynamic. Almost every professional uses static, because a dynamic crosshair animates on movement — adding visual noise at exactly the moment you need to read the screen clearly.</>,
                <>Colour, which matters more than players expect. Cyan and magenta test best because neither appears often in game environments; green collides with foliage and red collides with ability effects and damage indicators.</>,
            ],
        },
        {
            heading: "How to use a pro crosshair properly",
            body: [
                <>Treat it as a starting point. Crosshair preference depends on your resolution and monitor size, and a code tuned on a 24-inch 1080p panel renders differently on a 27-inch 1440p one.</>,
                <>Change one property at a time and give each a few days. Changing four at once means you cannot tell which one you liked.</>,
                <>Most players end up smaller than they started, once crosshair placement improves and they need less help finding the centre of the screen.</>,
            ],
        },
        {
            heading: "Where the codes come from",
            body: [
                <>Published team configs, official settings pages and verified streams. Where a player has changed crosshair recently and the change is not confirmed, the entry stays on the last verified code rather than on a guess.</>,
                <>Valorant codes import directly in the crosshair settings menu; CS2 codes paste into the crosshair share field.</>,
                <>If you want to build rather than copy, the crosshair generator lets you tune every property live and export the code.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "How do I import a pro crosshair code?", a: "In Valorant, paste the code into Settings, Crosshair, Import Profile Code. In CS2, paste it into the crosshair share code field in the game settings. Both apply immediately." },
        { q: "Does the crosshair I use affect my accuracy?", a: "Only through visibility. The shot lands where the centre points regardless of size or colour. A crosshair too large hides the head you are aiming at; too small and you lose track of it during fast movement." },
        { q: "What is the most visible crosshair colour?", a: "Cyan and magenta test best across the widest range of maps, because neither appears often in game environments. Green collides with foliage and red collides with common ability effects." },
];

export default function CrosshairDatabasePage() {
    const prosWithCrosshair = pros.filter((p) => p.crosshairCode);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                name: 'Pro Valorant Crosshair Codes',
                url: 'https://dcprosens.com/crosshair-database/',
                description: 'A collection of real, verified Valorant crosshair codes from professional players.',
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Crosshair Database', item: 'https://dcprosens.com/crosshair-database/' },
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
                code here comes directly from our verified <Link href="/pros/" style={{ color: 'var(--primary)' }}>pro player database</Link>.
                CS2, Apex Legends and Overwatch 2 crosshair settings are being verified and will be added once confirmed. Also try our{' '}
                <Link href="/crosshair/" style={{ color: 'var(--primary)' }}>Crosshair Generator</Link> to build your own.
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
                                <Link href={`/pros/${pro.slug}/`} style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>
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
            <ToolExplainer
                intro={<>A searchable collection of crosshair codes used by professional Valorant and CS2 players, copyable in one click. What is worth understanding before you copy one is that a crosshair is a visibility tool, not an accuracy tool — the shot lands where the centre points regardless of what surrounds it.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
