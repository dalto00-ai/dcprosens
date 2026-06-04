import type { Metadata } from "next";
import DPIAnalyzer from '@/components/DPIAnalyzer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Mouse DPI Analyzer — Test Real Mouse DPI & Sensor Deviation | DCPROSENS",
    description: "Check if your gaming mouse has sensor deviation. Measure a physical distance, move your mouse, and calculate your real DPI vs declared DPI online.",
    keywords: [
        'mouse dpi analyzer', 'dpi deviation calculator', 'test mouse dpi online', 'real mouse dpi test',
        'sensor deviation test', 'mouse sensor accuracy', 'calculate real dpi', 'gaming mouse deviation',
        'measure mouse dpi', 'mouse accuracy test', 'mouse calibration', 'dpi test ruler',
        'mouse dpi checker', 'dpi drift', 'how to test real dpi', 'mouse tracking accuracy',
        'mouse movement counts', 'pointer lock dpi test', 'mouse sensor test tool'
    ],
    alternates: {
        canonical: "https://dcprosens.com/dpi-analyzer",
    },
    openGraph: {
        title: "Mouse DPI Analyzer — Test Real Mouse DPI & Sensor Deviation | DCPROSENS",
        description: "Verify your gaming mouse sensor accuracy. Calculate your real DPI and correct sensor deviation easily.",
        type: "website",
        url: "https://dcprosens.com/dpi-analyzer",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mouse DPI Analyzer — Test Real Mouse DPI & Sensor Deviation",
        description: "Check if your gaming mouse has sensor deviation and calculate your real DPI online.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DpiAnalyzerPage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com" },
            { "@type": "ListItem", "position": 2, "name": "DPI Analyzer", "item": "https://dcprosens.com/dpi-analyzer" },
        ],
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What is mouse DPI deviation?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "DPI deviation is the difference between a mouse's advertised (nominal) DPI and its actual (real) DPI. For example, if you set your mouse to 800 DPI, but it tracks at 835 DPI, your mouse has a +4.37% positive deviation.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Why does mouse DPI deviation happen?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Several factors cause deviation: sensor manufacturing tolerances, the distance between the sensor lens and your mousepad (LOD), the type or texture of mousepad you use, and mouse firmware adjustments.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How do I fix mouse DPI deviation?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "You can compensate for DPI deviation by adjusting your in-game sensitivity. Multiply your current sensitivity by (Nominal DPI / Real DPI). For example, if your nominal DPI is 800, real is 840, and sens is 1.0, your adjusted sensitivity is 1.0 * (800/840) = 0.952.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How does this online DPI analyzer work?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "This analyzer locks your pointer and tracks raw movement signals (counts) sent by your mouse sensor. By dividing the counts by the physical distance you moved your mouse on your mousepad, it calculates the real DPI.",
                        },
                    },
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "DCPROSENS Mouse DPI Analyzer",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://dcprosens.com/dpi-analyzer",
                description: "Measure real mouse DPI and calculate sensor deviation using pointer-lock measurements.",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '900px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                Mouse DPI <span className="text-gradient">Analyzer</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Measure your actual mouse DPI, check for sensor deviation, and optimize your gaming precision.
            </p>

            <DPIAnalyzer />

            <article style={{ marginTop: '5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    Understanding Mouse DPI Deviation: What You Need to Know
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                    When you buy a gaming mouse and set it to 800 DPI, you expect it to move exactly 800 pixels on screen for every inch moved on your mousepad. However, in reality, almost all gaming mice suffer from some amount of <strong style={{ color: 'var(--text-primary)' }}>DPI deviation</strong>. 
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    DPI deviation is the discrepancy between your mouse's nominal (configured) DPI and its real, physical DPI. A positive deviation means your mouse moves faster than expected, while a negative deviation means it moves slower. In competitive gaming (like CS2, Valorant, or Apex Legends), even a minor deviation can throw off your muscle memory if you change mice or mousepads.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    What Causes Mouse Sensor Deviation?
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    Sensor deviation isn't necessarily a sign of a defective mouse. It is caused by physical and environmental variables, including:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Mousepad Surface and Texture:</strong> Rough control pads reflect light differently than smooth speed pads, changing how the optical sensor reads coordinates.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Sensor Lens Height:</strong> The distance between the sensor lens and the pad (affected by the thickness of your mouse skates or feet) changes the focal length, which alters tracking ratios.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Manufacturing Tolerances:</strong> Small variations in sensor mounting, lens alignment, or casing thickness can cause deviations of 1% to 5% across individual units.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Firmware Implementation:</strong> Mouse manufacturers write custom firmware algorithms that compile raw tracking signals, occasionally introducing slight speed scaling.
                    </li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    How to Accurately Run the DPI Deviation Test
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                    To get the most accurate results, please follow these steps:
                </p>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Place a physical ruler horizontally on your mousepad right below your mouse.</li>
                    <li>Align the edge of your mouse (e.g. the left edge) with the <strong style={{ color: 'var(--text-primary)' }}>0 mark</strong> on the ruler.</li>
                    <li>Input your target distance (e.g., 10 cm or 5 inches) and nominal DPI into the analyzer above.</li>
                    <li>Click <strong style={{ color: 'var(--primary)' }}>Start Analyzer Test</strong>. Your pointer will lock to allow raw signal tracking.</li>
                    <li>Slowly slide your mouse horizontally along the ruler until it reaches your target mark (e.g. exactly 10 cm). Keep the mouse as straight as possible.</li>
                    <li>Once you reach the target mark, <strong style={{ color: 'var(--text-primary)' }}>Left-Click</strong> or press <strong style={{ color: 'var(--text-primary)' }}>Esc</strong> to stop the test.</li>
                    <li>Review your real DPI, deviation, and sensitivity adjustment multiplier!</li>
                </ol>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    How to Compensate for DPI Deviation
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    If your mouse has a high deviation (over 3%), you should adjust your in-game sensitivity to maintain your target eDPI. 
                </p>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Adjustment Formula:</strong>
                    <code>New Sensitivity = Current Sensitivity &times; (Nominal DPI &divide; Real DPI)</code>
                </div>
                <p style={{ marginBottom: '1.5rem' }}>
                    For example, if you play Valorant at <strong style={{ color: 'var(--text-primary)' }}>0.4 sensitivity</strong> on a mouse set to <strong style={{ color: 'var(--text-primary)' }}>800 DPI</strong>, but the analyzer measures your real DPI as <strong style={{ color: 'var(--text-primary)' }}>840 DPI</strong> (+5% deviation):
                    <br />
                    <code>New Sensitivity = 0.4 &times; (800 / 840) = 0.381</code>
                    <br />
                    By reducing your sensitivity to 0.381, you compensate for the sensor deviation, making your true physical sensitivity match your intended 800 DPI / 0.4 settings.
                </p>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Want to convert your settings between different games?</p>
                    <Link href="/" style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: '1rem',
                    }}>
                        Go to Sensitivity Converter →
                    </Link>
                </div>
            </article>
        </div>
    );
}
