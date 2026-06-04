import type { Metadata } from 'next';
import Link from 'next/link';
import { pros } from '@/lib/pros';

export const metadata: Metadata = {
    title: 'Pro Gaming Setups 2025 — What Gear Do Pros Use? | DCPROSENS',
    description:
        'Complete pro player gaming setups: mouse, keyboard, headset, monitor, and mousepad. Find out exactly what TenZ, s1mple, ZywOo, Aspas, ImperialHal and more use in 2025.',
    keywords: [
        // Core
        'pro gaming setup', 'pro player gear', 'esports setup 2025', 'gaming setup pro players',
        'pro gamer equipment', 'complete pro gaming setup', 'esports gear list',
        // Valorant specific
        'tenz gaming setup', 'what mouse does tenz use', 'tenz keyboard', 'tenz headset', 'tenz monitor',
        'aspas gaming gear', 'aspas mouse setup', 'demon1 gaming setup',
        'valorant pro setup', 'valorant pro gear 2025', 'valorant pro peripherals',
        'yay gaming setup', 'boaster setup', 'chronicle gaming gear',
        // CS2 specific
        's1mple gaming setup 2025', 's1mple mouse 2025', 's1mple keyboard headset',
        'zywoo cs2 setup', 'zywoo gaming gear', 'niko gaming setup', 'niko g2 gear',
        'device astralis setup', 'ropz gaming gear', 'karrigan gaming setup',
        'cs2 pro setup', 'cs2 pro gear 2025', 'cs2 pro peripherals',
        // Apex specific
        'imperialhal gaming setup', 'imperialhal mouse keyboard', 'imperialhal gear',
        'apex legends pro setup', 'apex legends pro gear',
        // Products
        'best gaming mouse pro', 'best gaming keyboard pro', 'best gaming headset pro',
        'best gaming monitor pro', 'best gaming mousepad pro', 'logitech g pro x superlight 2 review',
        'razer blackshark v2 pro review', 'benq zowie xl2546k review', 'artisan mousepad review',
        // Long tail
        'what gaming gear does tenz use', 'what gaming gear does s1mple use',
        'copy pro player setup', 'best fps gaming peripherals 2025',
        'gaming setup for valorant', 'gaming setup for cs2', 'gaming setup for apex legends',
        'pro player amazon setup links', 'best gaming gear amazon 2025',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/setups',
    },
    openGraph: {
        title: 'Pro Gaming Setups 2025 — Mouse, Keyboard, Headset & More | DCPROSENS',
        description:
            'Discover the full gaming setups of top FPS pros: TenZ, s1mple, ZywOo, Aspas and more. Shop their exact gear on Amazon.',
        url: 'https://dcprosens.com/setups',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Gaming Setups 2025 | DCPROSENS',
        description:
            'What mouse, keyboard, headset and monitor do pro players use? Full gear list for TenZ, s1mple, ZywOo and more.',
    },
    robots: { index: true, follow: true },
};

// Affiliate links for common gear items
const affiliateLinks: Record<string, string> = {
    'Logitech G Pro X Superlight 2':
        'https://www.amazon.com/Logitech-Superlight-Lightspeed-Wireless-Gaming/dp/B09NBHGDLM?tag=dcprosens-20',
    'Logitech G Pro X Superlight':
        'https://www.amazon.com/Logitech-Superlight-Wireless-Gaming-Mouse/dp/B087LXCTFJ?tag=dcprosens-20',
    'Logitech G PRO X':
        'https://www.amazon.com/Logitech-Mechanical-Gaming-Keyboard-Switches/dp/B07Y1YC8GG?tag=dcprosens-20',
    'Logitech G PRO X 2':
        'https://www.amazon.com/Logitech-Gaming-Headset-Microphone-Drivers/dp/B09Z7C66HN?tag=dcprosens-20',
    'BenQ ZOWIE XL2546K':
        'https://www.amazon.com/BenQ-ZOWIE-XL2546K-Esports-Monitor/dp/B08ZHDRKDX?tag=dcprosens-20',
    'ASUS ROG Swift PG259QN':
        'https://www.amazon.com/ASUS-ROG-PG259QN-1ms-Monitor/dp/B08PY82FMY?tag=dcprosens-20',
    'Razer BlackShark V2 Pro':
        'https://www.amazon.com/Razer-BlackShark-V2-Pro-Wireless/dp/B08KFQZZ8R?tag=dcprosens-20',
    'Razer BlackWidow V4 Pro':
        'https://www.amazon.com/Razer-BlackWidow-Mechanical-Gaming-Keyboard/dp/B0BY2BQ1DV?tag=dcprosens-20',
    'Zowie EC2-GW':
        'https://www.amazon.com/BenQ-ZOWIE-EC2-GW-Professional-Gaming/dp/B09Y13TMJL?tag=dcprosens-20',
    'Artisan Zero FX M':
        'https://www.amazon.com/Artisan-Japan-Gaming-Mousepad-FX-ZERO/dp/B07WFQTC27?tag=dcprosens-20',
    'Artisan Zero FX L':
        'https://www.amazon.com/Artisan-Japan-Gaming-Mousepad-FX-ZERO/dp/B07WFQTC28?tag=dcprosens-20',
    'Logitech G640':
        'https://www.amazon.com/Logitech-G640-Cloth-Gaming-Mousepad/dp/B0794TLLX9?tag=dcprosens-20',
    'Logitech G840':
        'https://www.amazon.com/Logitech-Ultra-Thin-Gaming-Mouse-Pad/dp/B01LDTB5XY?tag=dcprosens-20',
    'Wooting 60HE':
        'https://www.amazon.com/Wooting-60HE-Keyboard/dp/B0CJQFJK2F?tag=dcprosens-20',
    'HyperX Cloud Alpha':
        'https://www.amazon.com/HyperX-Cloud-Alpha-Pro-Gaming/dp/B076955561?tag=dcprosens-20',
    'SteelSeries Arctis Pro':
        'https://www.amazon.com/SteelSeries-Arctis-Pro-Gaming-Headset/dp/B079YBMS4M?tag=dcprosens-20',
    'Pulsar Xlite V3':
        'https://www.amazon.com/Pulsar-Gaming-Gears-Lightweight-Wireless/dp/B0C7Q7NZ3X?tag=dcprosens-20',
    'Alienware AW2521H':
        'https://www.amazon.com/Alienware-AW2521H-360Hz-IPS-Gaming-Monitor/dp/B08LXPJ5LP?tag=dcprosens-20',
};

function getAffiliateLink(item: string): string {
    // Exact match first
    if (affiliateLinks[item]) return affiliateLinks[item];
    // Partial match
    for (const key of Object.keys(affiliateLinks)) {
        if (item.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(item.toLowerCase())) {
            return affiliateLinks[key];
        }
    }
    // Fallback: Amazon search
    return `https://www.amazon.com/s?k=${encodeURIComponent(item)}&tag=dcprosens-20`;
}

function GearItem({ label, value }: { label: string; value: string }) {
    const link = getAffiliateLink(value);
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px solid var(--border-color)',
                gap: '0.5rem',
                flexWrap: 'wrap',
            }}
        >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '80px' }}>
                {label}
            </span>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="gear-item-link"
            >
                {value} ↗
            </a>
        </div>
    );
}

export default function SetupsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Pro Gaming Setups 2025 — DCPROSENS',
        description:
            'Complete gaming setups for top professional FPS players including mouse, keyboard, headset, monitor and mousepad.',
        url: 'https://dcprosens.com/setups',
        numberOfItems: pros.length,
        itemListElement: pros.map((pro, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${pro.name} Gaming Setup — ${pro.game}`,
            url: `https://dcprosens.com/pros/${pro.slug}`,
            description: `${pro.name} uses ${pro.mouse}, ${pro.keyboard}, ${pro.headset} at ${pro.dpi} DPI.`,
        })),
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
            { '@type': 'ListItem', position: 2, name: 'Pro Setups', item: 'https://dcprosens.com/setups' },
        ],
    };

    // Group pros by game
    const games = [...new Set(pros.map((p) => p.game))];

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: '#000',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.3rem 1rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1.25rem',
                    }}
                >
                    🏆 Pro Gaming Gear
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Pro Player <span className="text-gradient">Setups</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    The complete gear lists for the world&apos;s top FPS professionals —{' '}
                    <strong>mouse, keyboard, headset, monitor & mousepad</strong>.
                    All links go directly to Amazon.
                </p>
            </div>

            {/* STATS STRIP */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem',
                }}
            >
                {[
                    { icon: '🎮', title: `${pros.length} Pros`, desc: 'Valorant, CS2, Apex & more' },
                    { icon: '🖱️', title: '5 Categories', desc: 'Mouse · KB · Headset · Monitor · Pad' },
                    { icon: '🛒', title: 'Amazon Links', desc: 'Direct purchase links for every item' },
                    { icon: '🔄', title: 'Updated 2025', desc: 'Verified current season settings' },
                ].map((item) => (
                    <div
                        key={item.title}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem',
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'flex-start',
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                {item.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {item.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AFFILIATE DISCLAIMER */}
            <div
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderLeft: '3px solid var(--secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1.25rem',
                    marginBottom: '3rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                }}
            >
                <strong style={{ color: 'var(--text-primary)' }}>Disclosure:</strong> Links marked with ↗ are Amazon
                affiliate links. DCPROSENS may earn a small commission at no extra cost to you. This helps us keep
                the site free.
            </div>

            {/* PROS BY GAME */}
            {games.map((game) => {
                const gamePros = pros.filter((p) => p.game === game);
                return (
                    <section key={game} style={{ marginBottom: '4rem' }}>
                        <h2
                            style={{
                                fontSize: '1.6rem',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '1.5rem',
                                paddingBottom: '0.75rem',
                                borderBottom: '2px solid var(--primary)',
                                display: 'inline-block',
                            }}
                        >
                            {game} <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '1rem' }}>({gamePros.length} pros)</span>
                        </h2>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '1.5rem',
                            }}
                        >
                            {gamePros.map((pro) => (
                                <article
                                    key={pro.slug}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0',
                                    }}
                                >
                                    {/* Pro header */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    marginBottom: '0.25rem',
                                                }}
                                            >
                                                <span style={{ fontSize: '1.25rem' }}>{pro.countryFlag}</span>
                                                <Link
                                                    href={`/pros/${pro.slug}`}
                                                    style={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 800,
                                                        color: 'var(--text-primary)',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {pro.name}
                                                </Link>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {pro.team} · {pro.role}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                textAlign: 'right',
                                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                                borderRadius: 'var(--radius-md)',
                                                padding: '0.4rem 0.75rem',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '0.7rem',
                                                    fontWeight: 700,
                                                    color: '#000',
                                                    letterSpacing: '0.05em',
                                                }}
                                            >
                                                eDPI
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: 900,
                                                    color: '#000',
                                                }}
                                            >
                                                {pro.edpi}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sensitivity info */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            marginBottom: '1rem',
                                            padding: '0.75rem',
                                            background: 'rgba(0,0,0,0.2)',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.82rem',
                                        }}
                                    >
                                        {[
                                            { label: 'DPI', value: pro.dpi.toString() },
                                            { label: 'Sens', value: pro.sens.toString() },
                                            { label: 'cm/360', value: pro.cm360.toString() },
                                        ].map((stat) => (
                                            <div key={stat.label} style={{ flex: 1, textAlign: 'center' }}>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginBottom: '0.15rem' }}>
                                                    {stat.label}
                                                </div>
                                                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                                                    {stat.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gear list */}
                                    <div>
                                        <GearItem label="🖱️ Mouse" value={pro.mouse} />
                                        <GearItem label="⌨️ Keyboard" value={pro.keyboard} />
                                        <GearItem label="🎧 Headset" value={pro.headset} />
                                        <GearItem label="🖥️ Monitor" value={`${pro.monitor} (${pro.monitorHz}Hz)`} />
                                        <GearItem label="🎮 Mousepad" value={pro.mousepad} />
                                    </div>

                                    {/* View full profile */}
                                    <Link
                                        href={`/pros/${pro.slug}`}
                                        className="setup-profile-link"
                                    >
                                        Full Profile & Crosshair →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* SEO CONTENT */}
            <div
                style={{
                    marginTop: '4rem',
                    maxWidth: '750px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Why Do Pro Players Choose These Products?
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    Professional FPS players select their gear based on three non-negotiable factors:{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>reliability</strong> (no hardware failures
                    during matches), <strong style={{ color: 'var(--text-primary)' }}>1:1 sensor accuracy</strong>{' '}
                    (zero acceleration or prediction), and{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>weight</strong> (lighter mice allow faster
                    flick shots and reduce fatigue over long sessions).
                </p>
                <h2
                    style={{
                        color: 'var(--text-primary)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        marginTop: '2rem',
                    }}
                >
                    The Most Popular Pro Gaming Gear in 2025
                </h2>
                <p>
                    The <strong style={{ color: 'var(--primary)' }}>Logitech G Pro X Superlight 2</strong> remains
                    the most used mouse across professional Valorant and CS2. The{' '}
                    <strong style={{ color: 'var(--primary)' }}>BenQ ZOWIE XL2546K</strong> 240Hz monitor is used
                    by the majority of CS2 pros. For headsets, the{' '}
                    <strong style={{ color: 'var(--primary)' }}>Logitech G PRO X 2</strong> and{' '}
                    <strong style={{ color: 'var(--primary)' }}>Razer BlackShark V2 Pro</strong> dominate. The{' '}
                    <strong style={{ color: 'var(--primary)' }}>Logitech G640</strong> and{' '}
                    <strong style={{ color: 'var(--primary)' }}>Artisan</strong> mousepads are the most common
                    among elite players.
                </p>
            </div>
        </div>
    );
}
