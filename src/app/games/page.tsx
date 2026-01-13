import { games } from '@/lib/games';
import styles from '@/components/Converter.module.css';

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
