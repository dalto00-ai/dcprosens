import type { Metadata } from 'next';
import Link from 'next/link';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
    title: "Pro Gaming Setup Deals 2026 — Verified Gear",
    description: "Curated competitive FPS gear used by TenZ, Aspas, s1mple and Demon1. Verified mice, rapid-trigger keyboards, precision pads and 360Hz monitors on Amazon.",
    alternates: {
        canonical: "https://dcprosens.com/deals/",
    },
    openGraph: {
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Setup Deals" }],
        title: "Pro Gaming Setup Deals 2026 — Verified Esports Hardware | DCPROSENS",
        description: "The exact gaming mice, keyboards and mousepads used by champions, with direct Amazon verified links.",
        url: "https://dcprosens.com/deals/",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

interface GearDeal {
    id: string;
    category: 'Mice' | 'Keyboards' | 'Mousepads' | 'Monitors';
    name: string;
    brand: string;
    badge: string;
    specs: string;
    proUsage: string;
    priceEstimate: string;
    amazonUrl: string;
    accentColor: string;
}

const FEATURED_DEALS: GearDeal[] = [
    {
        id: 'superlight-2',
        category: 'Mice',
        name: 'Logitech G PRO X Superlight 2',
        brand: 'Logitech G',
        badge: '👑 #1 Pro Choice',
        specs: '60g • Hero 2 32k DPI • 4000Hz Polling • Hybrid Optical Switches',
        proUsage: 'Used by TenZ, s1mple, Aspas, Demon1',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=Logitech+G+PRO+X+Superlight+2&tag=dcoutlier-20',
        accentColor: '#00ff9d',
    },
    {
        id: 'viper-v3-pro',
        category: 'Mice',
        name: 'Razer Viper V3 Pro',
        brand: 'Razer',
        badge: '⚡ 8000Hz Ultra-Fast',
        specs: '54g • Focus Pro 35K • True 8000Hz Wireless • Gen-3 Optical',
        proUsage: 'Used by Zellsis, cryocells, Victor',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=Razer+Viper+V3+Pro&tag=dcoutlier-20',
        accentColor: '#00e5ff',
    },
    {
        id: 'wooting-60he',
        category: 'Keyboards',
        name: 'Wooting 60HE+ (Hall Effect)',
        brand: 'Wooting',
        badge: '🎯 Rapid Trigger Meta',
        specs: 'Analog Hall Effect • 0.1mm Rapid Trigger • 0 Debounce Delay',
        proUsage: 'Used by 70%+ of VCT Valorant Champions',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=Wooting+60HE+keyboard&tag=dcoutlier-20',
        accentColor: '#ff0055',
    },
    {
        id: 'apex-pro-tkl',
        category: 'Keyboards',
        name: 'SteelSeries Apex Pro TKL (2026)',
        brand: 'SteelSeries',
        badge: '⚡ OmniPoint 3.0',
        specs: 'HyperMagnetic Switches • OLED Smart Display • Rapid Tap',
        proUsage: 'Used by FaZe Clan, karrigan, rain',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=SteelSeries+Apex+Pro+TKL&tag=dcoutlier-20',
        accentColor: '#ff7700',
    },
    {
        id: 'artisan-zero',
        category: 'Mousepads',
        name: 'Artisan Ninja FX Zero (Soft/XSoft)',
        brand: 'Artisan Japan',
        badge: '🏆 Golden Standard',
        specs: 'Micro-weave cloth • Perfect stopping power • Zero humidity slowdown',
        proUsage: 'Used by TenZ, Boaster, aspas',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=Artisan+Zero+FX+mousepad&tag=dcoutlier-20',
        accentColor: '#a855f7',
    },
    {
        id: 'zowie-xl2546k',
        category: 'Monitors',
        name: 'BenQ ZOWIE XL2546K (240Hz DyAc⁺)',
        brand: 'Zowie',
        badge: '👁️ DyAc⁺ Motion Clarity',
        specs: '24.5" 1080p • 240Hz Fast-TN • 0.5ms • Shield & S-Switch',
        proUsage: 'Official tournament monitor of CS2 Majors',
        priceEstimate: 'Check Amazon Deal',
        amazonUrl: 'https://www.amazon.com/s?k=BenQ+ZOWIE+XL2546K&tag=dcoutlier-20',
        accentColor: '#ef4444',
    },
];

export default function DealsPage() {
    return (
        <div className="container" style={{ padding: '3.5rem 1rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #ff9900, #ff5500)',
                        color: '#000',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.35rem 1.25rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}
                >
                    🛒 Amazon Verified Deals
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
                    Upgrade Your <span style={{ background: 'linear-gradient(135deg, #ff9900, #ff5500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Setup</span>
                </h1>
                <p style={{ color: 'var(--text-secondary, #a0aec0)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    Every mouse, keyboard, pad, and monitor recommended on DCPROSENS has been verified with pro player telemetry. Click any item below to shop with real-time stock and discounts on Amazon.
                </p>
            </div>

            {/* Deals Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
                {FEATURED_DEALS.map((deal) => (
                    <div
                        key={deal.id}
                        style={{
                            background: 'var(--bg-card, rgba(20, 24, 33, 0.7))',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '1.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'transform 0.2s ease, border-color 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: deal.accentColor }} />
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: deal.accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {deal.category} • {deal.brand}
                                </span>
                                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#fff', fontWeight: 600 }}>
                                    {deal.badge}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                                {deal.name}
                            </h3>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #a0aec0)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                                {deal.specs}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffb703', marginBottom: '1.5rem', fontWeight: 500 }}>
                                <span>🎯</span>
                                <span>{deal.proUsage}</span>
                            </div>
                        </div>

                        <div>
                            <a
                                href={deal.amazonUrl}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    padding: '0.85rem 1.25rem',
                                    background: 'linear-gradient(135deg, #ff9900 0%, #ff6600 100%)',
                                    color: '#000',
                                    fontWeight: 800,
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    boxShadow: '0 4px 14px rgba(255, 120, 0, 0.25)',
                                }}
                            >
                                <span>Shop on Amazon</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Direct Link to Complete Gear Database */}
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.04) 0%, rgba(0, 229, 255, 0.04) 100%)',
                    border: '1px solid rgba(0, 255, 157, 0.2)',
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    marginBottom: '3rem',
                }}
            >
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>
                    Looking for detailed sensor benchmarks & specs?
                </h2>
                <p style={{ color: 'var(--text-secondary, #a0aec0)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.98rem' }}>
                    Explore our full catalog of 200+ keyboards, headsets, monitors, and mousepads with verified weight, polling rates, and pro usage.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/gear/"
                        style={{
                            padding: '0.85rem 2rem',
                            background: 'var(--primary, #00ff9d)',
                            color: '#000',
                            fontWeight: 800,
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                        }}
                    >
                        Browse Full Gear Database ⚡
                    </Link>
                    <Link
                        href="/mouse-finder/"
                        style={{
                            padding: '0.85rem 2rem',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#fff',
                            fontWeight: 700,
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                    >
                        Mouse Finder Quiz 🖱️
                    </Link>
                </div>
            </div>

            {/* Editorial Buyer's Guide (E-E-A-T & AdSense Compliance) */}
            <section
                style={{
                    background: 'var(--bg-card, rgba(20, 24, 33, 0.7))',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '2.25rem 2rem',
                    marginBottom: '2.5rem',
                    lineHeight: 1.7,
                }}
            >
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
                    How to Choose Tournament-Grade FPS Hardware (Engineering Checklist)
                </h2>
                <p style={{ color: 'var(--text-secondary, #a0aec0)', marginBottom: '1.25rem', fontSize: '0.96rem' }}>
                    Hardware does not replace crosshair placement or aim discipline, but eliminating physical bottlenecks—sensor jitter, high static pad friction, switch debounce delay, and motion blur—ensures your muscle memory translates 1:1 on screen. Before upgrading, match each peripheral to your actual <Link href="/sens-finder/" style={{ color: 'var(--primary, #00ff9d)' }}>cm/360 sensitivity</Link> and grip style.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>1. Mouse Weight, Shape &amp; Sensor Polling</h3>
                        <p style={{ color: 'var(--text-secondary, #a0aec0)', fontSize: '0.9rem', margin: 0 }}>
                            Shape and hand-size fit dictate comfort and micro-correction stability more than raw DPI numbers. Ultralight wireless mice between 45g and 60g with flagship sensors (HERO 2, Focus Pro 35K, PAW3950) reduce starting inertia on rapid flicks. If you run 4000Hz or 8000Hz polling, pair it with 1600 DPI to saturate USB packets without stutter. Use our <Link href="/mouse-finder/" style={{ color: 'var(--primary, #00ff9d)' }}>Ergonomic Mouse Finder</Link> to match dimensions to your hand.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>2. Rapid Trigger Hall Effect Keyboards</h3>
                        <p style={{ color: 'var(--text-secondary, #a0aec0)', fontSize: '0.9rem', margin: 0 }}>
                            In tactical shooters like Counter-Strike 2 and Valorant, firing accuracy depends on stopping your movement velocity immediately. Hall Effect magnetic switches reset the actuation point the instant your finger lifts by 0.1mm, making counter-strafes sharper than fixed mechanical leaf switches. Verify your keyboard&apos;s rollover and chatter in our <Link href="/keyboard-test/" style={{ color: 'var(--primary, #00ff9d)' }}>Keyboard &amp; NKRO Tester</Link>.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>3. Mousepad Friction &amp; 240Hz+ Motion Clarity</h3>
                        <p style={{ color: 'var(--text-secondary, #a0aec0)', fontSize: '0.9rem', margin: 0 }}>
                            Low-sensitivity arm aimers (&gt;45 cm/360) need XL 490×420mm surfaces with controlled stopping power such as Poron-backed cloth pads, while high-tracking players often prefer lower-friction speed weaves or glass. Pair your pad with a true 240Hz–480Hz display tested in our <Link href="/monitor-simulator/" style={{ color: 'var(--primary, #00ff9d)' }}>Monitor Ghosting Simulator</Link> and compare glide coefficients in the <Link href="/mousepad-chart/" style={{ color: 'var(--primary, #00ff9d)' }}>Mousepad Friction Chart</Link>.
                        </p>
                    </div>
                </div>
            </section>

            <AffiliateDisclosure />
        </div>
    );
}
