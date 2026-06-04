import type { Metadata } from 'next';
import Link from 'next/link';
import ProCompare from '@/components/ProCompare';

export const metadata: Metadata = {
    title: 'Pro Player Settings Compare Tool 2025 — Valorant & CS2 | DCPROSENS',
    description:
        'Compare mouse sensitivity settings, eDPI, cm/360, mouse, keyboard, headset, and monitor specs of top pro players like TenZ, s1mple, aspas, ZywOo, and more side-by-side.',
    keywords: [
        'compare pro player settings', 'pro gaming gear comparison', 'tenz vs s1mple sensitivity',
        'aspas vs demon1 dpi', 'cs2 pro gear compared', 'valorant sensitivity compare',
        'eDPI compare tool', 'cm/360 compare pros', 'esports peripherals comparison 2025',
        'best gaming mouse comparison', 'compare valorant settings', 'compare cs2 settings',
        'tenz vs aspas', 's1mple vs zywoo', 'gaming gear specs compare'
    ],
    alternates: {
        canonical: 'https://dcprosens.com/pros/compare',
    },
    openGraph: {
        title: 'Pro Player Settings Compare Tool 2025 — Valorant & CS2 | DCPROSENS',
        description:
            'Compare mouse sensitivity settings, eDPI, cm/360, mouse, keyboard, headset, and monitor specs of top pro players side-by-side.',
        url: 'https://dcprosens.com/pros/compare',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Player Settings Compare Tool 2025 | DCPROSENS',
        description:
            'Compare mouse sensitivity, eDPI, cm/360, and gear setups of top professional FPS players side-by-side.',
        creator: '@dcprosens',
    },
};

export default function ProComparePage() {
    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dcprosens.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Pro Players',
                item: 'https://dcprosens.com/pros',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Compare',
                item: 'https://dcprosens.com/pros/compare',
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />

            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
                    ⚖️ Peripherals & Settings Compare
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Pro Player <span className="text-gradient">Compare</span> Tool
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Compare mouse sensitivity settings, eDPI, cm/360, and hardware setups of elite FPS athletes side-by-side. Highlight specs differences instantly.
                </p>
            </div>

            {/* Interactive component */}
            <ProCompare />

            {/* Technical SEO Copy */}
            <div
                style={{
                    marginTop: '4rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                    Why Compare Pro Player Sensitivity & Hardware Setups?
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    Aiming in tactical shooters like Valorant and Counter-Strike 2 requires extreme consistency.
                    At the elite level, differences in hardware (like mouse weight or monitor refresh rate) and settings (like eDPI and DPI) can impact muscle memory and raw performance.
                    Comparing top players side-by-side allows you to identify trends and optimize your own configurations based on mathematical reference points.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    Physical Sensitivity vs. In-Game Values
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    When comparing players across different games, in-game sensitivities are not directly comparable due to varying game engines and yaw factors (0.07 in Valorant vs 0.022 in CS2/Apex).
                    This is why comparing their <strong style={{ color: 'var(--primary)' }}>cm/360°</strong> is the most objective metric.
                    A higher cm/360 value means lower sensitivity (more physical space required to turn), which is highly favored by precise anchor/site-holders, whereas a lower cm/360 indicates higher speed, suited for fast entry-fragging or tracking-heavy environments.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    The Impact of Mouse Weight
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    Esports athletes heavily prioritize weight in competitive mice.
                    Mice under 65 grams (like the Logitech G Pro X Superlight 2 or Razer Viper V3 Pro) decrease initial friction, making sudden target changes (flicks) faster and reducing physical strain during long gaming sessions.
                    If you use high sensitivity, a slightly heavier mouse can provide stabilization, while low-sensitivity players almost always benefit from ultra-lightweight designs.
                </p>
            </div>
        </div>
    );
}
