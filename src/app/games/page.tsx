import { games } from '@/lib/games';
import styles from '@/components/Converter.module.css';
import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Games Sensitivity Converter | DCPROSENS",
    description: "List of all supported games for our mouse sens converter. Easily convert sens across Valorant, CS2, Overwatch, and more.",
};

export default function GamesPage() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
                Games <span className="text-gradient">Sens Converter</span> List
            </h1>

            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                Our <strong>sensitivity calculator</strong> supports all major competitive titles. Check the list below to find the specific yaw rates used for accurate cm/360 calculations.
                Ready to find your perfect aim? <Link href="/" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>Convert Sens Now</Link>.
            </p>

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
