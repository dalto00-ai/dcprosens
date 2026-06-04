import type { Metadata } from 'next';
import MousepadCalculator from '@/components/MousepadCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Mousepad Size Calculator — Find the Perfect Gaming Mousepad | DCPROSENS',
    description: 'Find the ideal gaming mousepad size for your sensitivity. Enter your cm/360 and DPI to get personalized recommendations. Best large, XL and extended mousepads for low sensitivity gamers.',
    keywords: [
        'mousepad size calculator',
        'gaming mousepad size guide',
        'best mousepad low sensitivity',
        'xl mousepad recommendation',
        'artisan mousepad review',
        'logitech g840 review',
        'what size mousepad do i need',
        'mousepad for 400 dpi',
        'extended mousepad gaming',
        'large mousepad fps',
        'best mousepad valorant',
        'best mousepad cs2 2025',
        'steelseries qck heavy review',
        'mousepad thickness guide',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/mousepad-calculator',
    },
    openGraph: {
        title: 'Mousepad Size Calculator — Find Your Perfect Gaming Pad | DCPROSENS',
        description: 'Enter your cm/360 sensitivity and DPI to get personalized mousepad size recommendations. Includes pro player data and top product picks.',
        type: 'website',
        url: 'https://dcprosens.com/mousepad-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mousepad Size Calculator | DCPROSENS',
        description: 'Find the perfect mousepad size for your gaming sensitivity. Free tool.',
    },
    robots: { index: true, follow: true },
};

export default function MousepadCalculatorPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Mousepad Size Calculator',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/mousepad-calculator',
                description: 'Free online tool to find the ideal mousepad size based on your cm/360 gaming sensitivity.',
                featureList: [
                    'cm/360 sensitivity input',
                    'DPI selector',
                    'Mousepad size recommendation',
                    'Visual desk diagram',
                    'Pro player sensitivity reference',
                    'Top mousepad product recommendations',
                ],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What size mousepad do I need for low sensitivity?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'For sensitivities under 30 cm/360, you need an XL mousepad (450mm+ wide, ideally 900×400mm). At this sensitivity range, a single 180° flick can sweep 15cm of mousepad, so you need maximum surface area to avoid running off the edge.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Is a larger mousepad always better for gaming?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'A larger mousepad is better only if your sensitivity requires it. If you use 60+ cm/360, a medium 320×270mm pad is completely sufficient. However, even high-sensitivity players benefit from XL pads for mouse positioning comfort.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What mousepad does s1mple use?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: "s1mple uses a large mousepad with 400 DPI at ~42 cm/360. He's known to have used SteelSeries QcK+ and Artisan pads throughout his career. With his sensitivity, a 400×300mm+ pad is recommended.",
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="page-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <p style={{
                        display: 'inline-block',
                        background: 'rgba(0,255,157,0.1)',
                        border: '1px solid rgba(0,255,157,0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Peripherals Guide
                    </p>
                    <h1 className="hero-title">
                        Mousepad Size <span className="text-gradient">Calculator</span>
                    </h1>
                    <p className="hero-subtitle">
                        Enter your cm/360 sensitivity and DPI to instantly find the perfect mousepad size. Based on real pro player data — never run off your pad again.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <div className="container" style={{ maxWidth: 1000 }}>
                <MousepadCalculator />
            </div>

            {/* SEO Article */}
            <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        How to Choose the Right Mousepad Size for Gaming
                    </h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        Your mousepad size directly impacts how comfortable and effective your gaming sensitivity feels.
                        A pad that&apos;s too small forces you to lift and reposition your mouse constantly — breaking aim
                        rhythm and costing you kills. Choosing the right size based on your{' '}
                        <strong style={{ color: 'var(--text-primary)' }}>cm/360 sensitivity</strong> is as important
                        as choosing the right mouse.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Mousepad Size Guide by Sensitivity
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {[
                            { range: 'Under 30 cm/360', size: 'XL (500×400mm+)', note: 'Required for arm aimers. Desk mats recommended.', color: '#a95fff' },
                            { range: '30–45 cm/360', size: 'Large (450×400mm)', note: 'Sweet spot for most FPS pros. Max comfort.', color: 'var(--primary)' },
                            { range: '45–65 cm/360', size: 'Medium (350×280mm)', note: 'Works great. Wrist or hybrid aim style.', color: '#ffc800' },
                            { range: 'Over 65 cm/360', size: 'Any size fine', note: 'Small movements. Even compact pads work.', color: 'var(--text-secondary)' },
                        ].map(row => (
                            <div key={row.range} style={{ display: 'grid', gridTemplateColumns: '140px 160px 1fr', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', alignItems: 'center' }}>
                                <div style={{ fontFamily: 'monospace', fontWeight: 700, color: row.color, fontSize: '0.85rem' }}>{row.range}</div>
                                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{row.size}</div>
                                <div style={{ fontSize: '0.85rem' }}>{row.note}</div>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Cloth vs Hard Mousepad — Which is Better?
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Cloth pads</strong> offer more friction and are preferred by most FPS pros for consistent stopping power.
                        <strong style={{ color: 'var(--text-primary)' }}> Hard pads</strong> offer lower friction and faster glide — preferred by high-sensitivity players who need quick wrist flicks.
                        Hybrid surfaces (like Artisan) offer a middle ground.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Mousepad Thickness: 2mm vs 4mm vs 6mm
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Thickness affects feel and wrist comfort:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                        {[
                            { thick: '2mm', desc: 'Thin and firm. Better for precise, controlled aim. Most common in gaming mousepads.' },
                            { thick: '4mm', desc: 'Comfortable for long sessions. Slight cushion under wrist. Artisan pads are known for this.' },
                            { thick: '6mm', desc: 'Maximum comfort. Reduces wrist fatigue. Best for all-day gaming setups.' },
                        ].map(t => (
                            <div key={t.thick} style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)', minWidth: 40 }}>{t.thick}</span>
                                <span style={{ fontSize: '0.9rem' }}>{t.desc}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Need your exact sensitivity in cm/360?</p>
                        <Link href="/sens-finder" style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#000',
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                        }}>
                            Find Your cm/360 →
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
