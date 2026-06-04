import type { Metadata } from 'next';
import SensFinderClient from '@/components/SensFinderClient';

export const metadata: Metadata = {
    title: "Find My Sensitivity — cm/360 to All Games Calculator | DCPROSENS",
    description: "Enter your ideal cm/360 and instantly get your exact in-game sensitivity for Valorant, CS2, Apex Legends, Overwatch 2 and more. One cm/360, all games.",
    alternates: {
        canonical: "https://dcprosens.com/sens-finder",
    },
    openGraph: {
        title: "Find My Sensitivity — cm/360 Reverse Calculator | DCPROSENS",
        description: "Convert your cm/360 to perfect in-game sensitivity settings across all major FPS games instantly.",
        type: "website",
        url: "https://dcprosens.com/sens-finder",
    },
    twitter: {
        card: "summary_large_image",
        title: "Find My Sensitivity — cm/360 to All Games | DCPROSENS",
        description: "Enter cm/360, get sensitivities for every game instantly.",
    },
};

export default function SensFinderPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "DCPROSENS Find My Sensitivity — Reverse cm/360 Calculator",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "url": "https://dcprosens.com/sens-finder",
        "description": "Enter your desired cm/360 sensitivity and instantly get precise in-game sensitivity values for Valorant, CS2, Apex Legends, Overwatch 2 and more.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
        },
        "featureList": [
            "Reverse cm/360 sensitivity calculator",
            "Converts to 8+ major FPS games simultaneously",
            "One-click copy for each game",
            "DPI presets: 400, 800, 1000, 1600, 3200",
            "Pro average cm/360 reference presets",
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{
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
                }}>
                    🎯 Reverse Sensitivity Calculator
                </span>

                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Find My <span className="text-gradient">Sensitivity</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Know your ideal <strong>cm/360</strong>? Get the exact in-game sensitivity for every major FPS game instantly — no math required.
                </p>
            </div>

            {/* INFO STRIP */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem',
            }}>
                {[
                    { icon: '📐', title: 'Pro Average', desc: '40–55 cm/360 is where most Valorant & CS2 pros play' },
                    { icon: '🖱️', title: 'Any DPI', desc: 'Works for 400, 800, 1600, 3200 DPI — your choice' },
                    { icon: '🎮', title: '8 Games', desc: 'Valorant, CS2, Apex, OW2, Fortnite, CoD and more' },
                    { icon: '⚡', title: 'One Click', desc: 'Copy any sensitivity with a single tap' },
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

            <SensFinderClient />

            {/* SEO CONTENT SECTION */}
            <div style={{
                marginTop: '5rem',
                maxWidth: '750px',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
            }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                    What is cm/360 and why does it matter?
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>cm/360</strong> (centimeters per 360 degrees) measures how far you physically move your mouse to rotate your in-game camera a full 360°.
                    Unlike raw DPI or in-game sensitivity — which mean different things across different games — cm/360 is a universal, hardware-independent standard.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    A player with 45 cm/360 in Valorant who switches to CS2 simply enters the sensitivity our calculator provides,
                    and their physical muscle memory transfers instantly — no re-training, no adjustment period.
                </p>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    What cm/360 do pro players use?
                </h2>
                <p>
                    Most professional Valorant players cluster between <strong style={{ color: 'var(--primary)' }}>40–55 cm/360</strong>,
                    while CS2 pros tend to use similar ranges. Apex Legends and Overwatch pros often prefer slightly higher
                    sensitivities (25–35 cm/360) due to the faster movement and tracking requirements.
                    The sweet spot for most players is 40–50 cm/360 — fast enough for flicks, slow enough for precision.
                </p>
            </div>
        </div>
    );
}
