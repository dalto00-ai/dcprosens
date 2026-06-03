import { games } from '@/lib/games';
import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Games Supported — Sensitivity Converter for 13+ FPS Games",
    description: "Complete list of games supported by DCPROSENS sensitivity converter: Valorant, CS2, Apex Legends, Overwatch 2, Fortnite, CoD Warzone, Rainbow Six Siege and more.",
    alternates: {
        canonical: "https://dcprosens.com/games",
    },
    openGraph: {
        title: "Games Supported — Sensitivity Converter for 13+ FPS Games",
        description: "Valorant, CS2, Apex Legends, Overwatch 2, Fortnite, Warzone and 7 more games. Free sensitivity converter.",
        type: "website",
        url: "https://dcprosens.com/games",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function GamesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Games Supported by DCPROSENS Sensitivity Converter",
        "url": "https://dcprosens.com/games",
        "numberOfItems": games.length,
        "itemListElement": games.map((game, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": game.name,
        })),
    };

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                Supported <span className="text-gradient">Games</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                DCPROSENS supports <strong style={{ color: 'var(--text-primary)' }}>{games.length} games</strong> for precision sensitivity conversion.
                All conversions use the exact yaw values for each game engine.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '4rem',
            }}>
                {games.map(game => (
                    <div key={game.id} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        transition: 'transform 0.2s, border-color 0.2s',
                        cursor: 'default',
                    }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{game.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            Yaw: <code style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>{game.yaw.toFixed(6)}</code>
                        </p>
                    </div>
                ))}
            </div>

            {/* SEO content block */}
            <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    How Does the Sensitivity Converter Work?
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    Every game uses a different <strong style={{ color: 'var(--text-primary)' }}>yaw value</strong> — a technical constant that
                    determines how many degrees your camera rotates per unit of mouse movement. Our converter uses these exact
                    values to calculate a mathematically precise sensitivity conversion that preserves your{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>cm/360</strong> (physical centimeters per full 360° rotation).
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    For example, <strong style={{ color: 'var(--text-primary)' }}>Valorant</strong> uses a yaw of 0.07 while{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>CS2</strong> uses 0.022. If you play Valorant at sensitivity 0.3,
                    the equivalent CS2 sensitivity is: <code style={{ color: 'var(--primary)', background: 'rgba(0,255,157,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>0.3 × (0.07 / 0.022) = 0.954</code>.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                    Most Popular Conversions
                </h2>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li style={{ marginBottom: '0.75rem' }}>
                        <Link href="/blog/valorant-to-cs2-sensitivity" style={{ color: 'var(--primary)' }}>Valorant to CS2 sensitivity</Link>
                        {' '}— Multiply by 3.18
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        <Link href="/blog/overwatch-2-to-apex-legends-aim" style={{ color: 'var(--primary)' }}>Overwatch 2 to Apex Legends</Link>
                        {' '}— Different yaw values require exact conversion
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        <Link href="/blog/fortnite-to-valorant-sensitivity-2026" style={{ color: 'var(--primary)' }}>Fortnite to Valorant</Link>
                        {' '}— FOV difference requires special math (our tool handles it)
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        CS2 to Apex Legends — Same yaw (0.022), so sensitivity is 1:1
                    </li>
                </ul>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/" style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: '1rem',
                    }}>
                        Open Sensitivity Converter →
                    </Link>
                </div>
            </article>
        </div>
    );
}
