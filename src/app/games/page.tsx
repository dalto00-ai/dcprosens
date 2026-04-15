import { games } from '@/lib/games';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Supported Games",
    description: "List of all supported games for sensitivity conversion including Valorant, CS2, Overwatch 2, Apex Legends and more. Full yaw values for precision conversion.",
    alternates: {
        canonical: "https://dcprosens.com/games",
    },
    openGraph: {
        title: "Supported Games | DCPROSENS",
        description: "All games supported by our sensitivity converter: Valorant, CS2, Overwatch 2, Apex Legends and more.",
        type: "website",
        url: "https://dcprosens.com/games",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function GamesPage() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
                Supported <span className="text-gradient">Games</span>
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
            }}>
                {games.map(game => (
                    <div key={game.id} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        transition: 'transform 0.2s',
                        cursor: 'default'
                    }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{game.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Yaw: {game.yaw.toFixed(6)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
