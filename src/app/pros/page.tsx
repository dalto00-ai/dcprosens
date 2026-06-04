import type { Metadata } from 'next';
import Link from 'next/link';
import { pros, getProGames } from '@/lib/pros';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: 'Pro Player Sensitivity Settings 2025 — TenZ, s1mple, ZywOo, NiKo | DCPROSENS',
    description:
        'Find exact sensitivity settings for 20+ pro players. TenZ uses 0.3 @ 800 DPI (240 eDPI). s1mple uses 3.09 @ 400 DPI. ZywOo, NiKo, Aspas, Demon1, ropz, dev1ce, m0NESY settings and more.',
    keywords: [
        'tenz sensitivity',
        's1mple sensitivity',
        'zywoo settings',
        'niko cs2 sens',
        'aspas valorant sensitivity',
        'demon1 settings',
        'pro player dpi',
        'cs2 pro sensitivity',
        'valorant pro settings',
        'apex legends pro sensitivity',
        'professional gamer mouse settings',
        'pro player edpi',
        'best sensitivity fps 2025',
        'how to find your sensitivity',
        'gaming pro settings database',
        'ropz sensitivity',
        'karrigan settings',
        'm0nesy cs2 sens',
        'bugha fortnite sensitivity',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/pros',
    },
    openGraph: {
        title: 'Pro Player Sensitivity Settings 2025 — TenZ, s1mple, ZywOo & More | DCPROSENS',
        description:
            'Exact DPI, sensitivity, eDPI and cm/360 for 20+ world-class FPS pros. TenZ, s1mple, ZywOo, NiKo, Aspas, Demon1, ropz and more.',
        url: 'https://dcprosens.com/pros',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Player Sensitivity Settings 2025 | DCPROSENS',
        description: 'TenZ, s1mple, ZywOo, NiKo — exact DPI, sensitivity and eDPI for 20+ world-class FPS pros.',
        creator: '@dcprosens',
    },
};

// ─── Game Badge Colors ─────────────────────────────────────────────────────────
const GAME_COLORS: Record<string, { bg: string; color: string }> = {
    Valorant:     { bg: 'rgba(255,70,85,0.15)',  color: '#ff4655' },
    CS2:          { bg: 'rgba(201,185,109,0.15)', color: '#c9b96d' },
    'Apex Legends': { bg: 'rgba(205,51,19,0.15)', color: '#cd3313' },
    'Overwatch 2':  { bg: 'rgba(0,184,212,0.15)', color: '#00b8d4' },
    Fortnite:     { bg: 'rgba(86,148,216,0.15)',  color: '#5694d8' },
};

const ALL_GAMES = ['All', 'Valorant', 'CS2', 'Apex Legends', 'Overwatch 2', 'Fortnite'];

interface PageProps {
    searchParams: Promise<{ game?: string }>;
}

export default async function ProsPage({ searchParams }: PageProps) {
    const { game: gameFilter } = await searchParams;
    const activeGame = gameFilter || 'All';

    const filteredPros =
        activeGame === 'All' ? pros : pros.filter((p) => p.game === activeGame);

    const allGames = getProGames();

    // ─── JSON-LD ───────────────────────────────────────────────────────────────
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://dcprosens.com/pros',
                url: 'https://dcprosens.com/pros',
                name: 'Pro Player Sensitivity Settings 2025 — DCPROSENS',
                description:
                    'Database of exact sensitivity, DPI, eDPI and cm/360 settings for 20+ professional FPS players in Valorant, CS2, Apex Legends, Overwatch 2 and Fortnite.',
                inLanguage: 'en-US',
                isPartOf: { '@id': 'https://dcprosens.com#website' },
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                        { '@type': 'ListItem', position: 2, name: 'Pro Players', item: 'https://dcprosens.com/pros' },
                    ],
                },
            },
            {
                '@type': 'ItemList',
                name: 'Pro Player Sensitivity Settings Database 2025',
                description: 'Complete list of pro player sensitivity, DPI, eDPI and gear settings for top FPS professionals.',
                url: 'https://dcprosens.com/pros',
                numberOfItems: pros.length,
                itemListElement: pros.map((pro, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: `${pro.name} — ${pro.game} Sensitivity Settings`,
                    url: `https://dcprosens.com/pros/${pro.slug}`,
                    description: `${pro.name} uses ${pro.dpi} DPI and ${pro.sens} sensitivity in ${pro.game} (${pro.edpi} eDPI, ${pro.cm360} cm/360). Mouse: ${pro.mouse}.`,
                })),
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.3rem 1.1rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                }}>
                    🏆 Live Pro Settings Database
                </span>

                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Pro Player <span className="text-gradient">Sensitivity</span> Hub
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Exact DPI, sensitivity, eDPI and cm/360 for {pros.length}+ world-class FPS professionals.
                    TenZ, s1mple, ZywOo, NiKo, Aspas, Demon1 and more — all in one place.
                </p>
            </div>

            {/* ── QUICK STATS ──────────────────────────────────────────────── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem',
            }}>
                {[
                    { icon: '🎮', title: `${pros.length} Pro Players`, desc: 'Verified settings from official sources' },
                    { icon: '🖱️', title: `${allGames.length} Games`, desc: 'Valorant, CS2, Apex, OW2, Fortnite' },
                    { icon: '📐', title: 'eDPI & cm/360', desc: 'Universal comparison metrics included' },
                    { icon: '⚙️', title: 'Full Gear', desc: 'Mouse, keyboard, headset, monitor & pad' },
                ].map(item => (
                    <div key={item.title} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.title}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── GAME FILTER TABS ─────────────────────────────────────────── */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '2.5rem',
                padding: '0.5rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
            }}>
                {ALL_GAMES.map(game => {
                    const isActive = activeGame === game;
                    return (
                        <Link
                            key={game}
                            href={game === 'All' ? '/pros' : `/pros?game=${encodeURIComponent(game)}`}
                            style={{
                                padding: '0.45rem 1.1rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                background: isActive
                                    ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                                    : 'transparent',
                                color: isActive ? '#000' : 'var(--text-secondary)',
                                border: isActive ? 'none' : '1px solid transparent',
                            }}
                        >
                            {game}
                        </Link>
                    );
                })}
            </div>

            {/* ── PRO CARDS GRID ───────────────────────────────────────────── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.25rem',
                marginBottom: '5rem',
            }}>
                {filteredPros.map(pro => {
                    const gameColor = GAME_COLORS[pro.game] ?? { bg: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' };
                    return (
                        <Link
                            key={pro.slug}
                            href={`/pros/${pro.slug}`}
                            style={{ textDecoration: 'none', display: 'block' }}
                        >
                            <article className="pro-card">
                                {/* Card Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <span style={{ fontSize: '1.6rem' }}>{pro.countryFlag}</span>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                                                {pro.name}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {pro.realName} · {pro.team}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{
                                        background: gameColor.bg,
                                        color: gameColor.color,
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        padding: '0.2rem 0.65rem',
                                        borderRadius: '9999px',
                                        letterSpacing: '0.04em',
                                        flexShrink: 0,
                                    }}>
                                        {pro.game}
                                    </span>
                                </div>

                                {/* Settings Grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '0.5rem',
                                    flex: 1,
                                }}>
                                    {[
                                        { label: 'DPI',    value: pro.dpi.toString() },
                                        { label: 'SENS',   value: pro.sens.toString() },
                                        { label: 'eDPI',   value: pro.edpi.toString() },
                                        { label: 'cm/360', value: `${pro.cm360} cm` },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '0.6rem 0.75rem',
                                        }}>
                                            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                                                {label}
                                            </div>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary)' }}>
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mouse */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid var(--border-color)',
                                    fontSize: '0.82rem',
                                    color: 'var(--text-secondary)',
                                }}>
                                    <span>🖱️</span>
                                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {pro.mouse}
                                    </span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0, fontSize: '0.78rem' }}>
                                        View →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>

            {/* ── SEO TEXT SECTION ─────────────────────────────────────────── */}
            <div style={{
                maxWidth: '780px',
                margin: '0 auto',
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
            }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Why Pro Player Sensitivity Settings Matter
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    Professional FPS players spend thousands of hours dialing in their sensitivity.
                    Understanding their settings — <strong style={{ color: 'var(--text-primary)' }}>DPI, in-game sensitivity, eDPI and cm/360</strong> — gives
                    you a scientifically grounded starting point instead of randomly guessing.
                    Most elite pros converge on 200–400 eDPI for Valorant and 400–900 eDPI for CS2.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    What is eDPI and why use it?
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    eDPI (Effective DPI) = <strong style={{ color: 'var(--primary)' }}>DPI × In-Game Sensitivity</strong>.
                    It is the universal metric for comparing any two players regardless of hardware.
                    TenZ&apos;s 800 DPI × 0.3 = <strong style={{ color: 'var(--text-primary)' }}>240 eDPI</strong>.
                    s1mple&apos;s 400 DPI × 3.09 = <strong style={{ color: 'var(--text-primary)' }}>1236 eDPI</strong>.
                    Both values produce specific cm/360 distances you can replicate exactly on any hardware.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    Valorant Pro Sensitivity Breakdown
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    The average professional Valorant player uses between <strong style={{ color: 'var(--primary)' }}>200–350 eDPI</strong>.
                    TenZ (Sentinels) uses 240 eDPI, Aspas (Leviatán) uses 320 eDPI, and Demon1 (NRG) uses just 160 eDPI.
                    The low eDPI trend in Valorant reflects the game&apos;s precise aiming mechanics — slower = more control on tighter crosshair placement.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    CS2 Pro Sensitivity Breakdown
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    CS2 pros tend to run higher eDPI than Valorant players due to the game&apos;s yaw multiplier (0.022 vs 0.07).
                    s1mple uses 1236 eDPI, ZywOo uses 800 eDPI, and NiKo uses 560 eDPI.
                    AWPers like dev1ce and ZywOo use moderate sensitivities — fast enough for eco rifling, slow enough for precise one-taps.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    Should You Copy a Pro&apos;s Sensitivity?
                </h2>
                <p>
                    Not blindly — but using a pro&apos;s cm/360 as a <strong style={{ color: 'var(--text-primary)' }}>reference point</strong> is smart.
                    Use our{' '}
                    <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                        sensitivity converter
                    </Link>{' '}
                    to match their cm/360 to your DPI.
                    Commit to the same settings for 30 days — muscle memory is the real variable that separates
                    players, not the number itself.
                </p>

                {/* CTA */}
                <div style={{
                    marginTop: '3rem',
                    background: 'linear-gradient(135deg, rgba(0,255,157,0.06), rgba(112,0,255,0.06))',
                    border: '1px solid var(--primary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(0,255,157,0.08)',
                }}>
                    <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        🎯 Get the Complete Pro Aim System
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Learn the exact method pros use to calibrate and maintain perfect sensitivity consistency.
                        4-Part Technical Manifesto — only $9.
                    </p>
                    <Link href="/ebook" style={{
                        display: 'inline-block',
                        padding: '0.8rem 2rem',
                        background: 'var(--primary)',
                        color: '#000',
                        fontWeight: 800,
                        borderRadius: '9999px',
                        fontSize: '0.9rem',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 14px rgba(0,255,157,0.3)',
                    }}>
                        Unlock Elite Precision ⚡
                    </Link>
                </div>
            </div>
        </div>
    );
}
