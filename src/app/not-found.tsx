'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
            }}
        >
            {/* Animated 404 */}
            <div
                style={{
                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s ease-in-out infinite',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.04em',
                }}
            >
                404
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>

            {/* Heading */}
            <h1
                style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}
            >
                Sensitivity Not Found
            </h1>

            {/* Subtext */}
            <p
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    maxWidth: '480px',
                    marginBottom: '3rem',
                    lineHeight: 1.6,
                }}
            >
                Looks like this page got deleted — just like your opponents.
                <br />
                Pick your next destination:
            </p>

            {/* Quick-nav grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '640px',
                    marginBottom: '2.5rem',
                }}
            >
                {[
                    {
                        href: '/',
                        icon: '🎯',
                        title: 'Converter',
                        desc: 'Valorant → CS2 and more',
                    },
                    {
                        href: '/sens-finder',
                        icon: '📐',
                        title: 'Sens Finder',
                        desc: 'cm/360 → every game',
                    },
                    {
                        href: '/mouse-database',
                        icon: '🖱️',
                        title: 'Mouse Database',
                        desc: 'Find your perfect mouse',
                    },
                    {
                        href: '/pros',
                        icon: '🏆',
                        title: 'Pro Players',
                        desc: 'Copy pro settings',
                    },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        style={{ display: 'block', textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.25rem',
                                transition: 'border-color 0.2s, transform 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)';
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{link.icon}</div>
                            <div
                                style={{
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.25rem',
                                    fontSize: '0.95rem',
                                }}
                            >
                                {link.title}
                            </div>
                            <div
                                style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.4,
                                }}
                            >
                                {link.desc}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Back button */}
            <button
                onClick={() => window.history.back()}
                style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-color)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                }}
            >
                ← Go Back
            </button>
        </div>
    );
}
