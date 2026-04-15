import type { Metadata } from "next";
import DpiCalculator from '@/components/DpiCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "DPI Calculator — What is DPI & eDPI? Mouse Sensitivity Explained",
    description: "Free DPI & eDPI calculator for gamers. Learn what DPI means, what eDPI is, and find your perfect mouse sensitivity for Valorant, CS2, Apex Legends and more.",
    alternates: {
        canonical: "https://dcprosens.com/dpi",
    },
    openGraph: {
        title: "DPI Calculator — What is DPI & eDPI? Mouse Sensitivity Explained",
        description: "Free DPI & eDPI calculator. Understand what DPI is and find your perfect mouse sensitivity for competitive gaming.",
        type: "website",
        url: "https://dcprosens.com/dpi",
    },
    twitter: {
        card: "summary_large_image",
        title: "DPI Calculator — What is DPI & eDPI?",
        description: "Free DPI & eDPI calculator for Valorant, CS2, Apex Legends.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DpiPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What is DPI?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "DPI stands for Dots Per Inch. It measures how many pixels your mouse cursor moves on screen for every inch you physically move the mouse. A higher DPI means faster cursor movement. Common gaming DPI settings are 400, 800, and 1600 DPI.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What is eDPI?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "eDPI (Effective DPI) is your mouse DPI multiplied by your in-game sensitivity. For example, 800 DPI × 0.3 sensitivity = 240 eDPI. It allows you to compare your actual sensitivity across different hardware and game settings.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What DPI should I use for gaming?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Most competitive FPS players use 400–800 DPI. Professional players like TenZ (800 DPI) and s1mple (400 DPI) demonstrate both work at the highest level. The key is maintaining a consistent eDPI between 200–800 for FPS games.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What is a good eDPI for Valorant?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "A good eDPI for Valorant is between 200 and 400. Professional players typically use 240 eDPI (like TenZ: 800 DPI × 0.3) to 320 eDPI (like Aspas: 800 DPI × 0.4). This range allows precise micro-adjustments for headshots.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Is 400 DPI or 800 DPI better for FPS?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Both 400 DPI and 800 DPI work equally well for FPS gaming when paired with the correct in-game sensitivity. 400 DPI × 2.0 sensitivity feels identical to 800 DPI × 1.0 sensitivity. Most modern players prefer 800 DPI for slightly smoother micro-movement.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What does DPI mean in gaming?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "In gaming, DPI (Dots Per Inch) determines how sensitive your mouse hardware is. A 400 DPI mouse sends 400 movement signals per inch moved. A 800 DPI mouse sends 800 signals. Higher DPI gives more cursor precision but feels faster, which is why in-game sensitivity must be adjusted accordingly.",
                        },
                    },
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "DCPROSENS DPI & eDPI Calculator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://dcprosens.com/dpi",
                description: "Free online DPI and eDPI calculator for competitive gamers.",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                DPI &amp; eDPI <span className="text-gradient">Calculator</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Enter your mouse DPI and in-game sensitivity to calculate your eDPI instantly.
            </p>

            <DpiCalculator />

            {/* --- SEO Content Section: What is DPI? --- */}
            <article style={{ marginTop: '5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    What is DPI? A Complete Gaming Guide
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>DPI stands for Dots Per Inch</strong> — a hardware measurement that determines how many pixels
                    your cursor moves on screen for every inch you physically move your mouse. In gaming, DPI is one of
                    the most critical settings for aim accuracy, especially in competitive FPS titles like <strong style={{ color: 'var(--text-primary)' }}>Valorant</strong>, <strong style={{ color: 'var(--text-primary)' }}>CS2</strong>, and <strong style={{ color: 'var(--text-primary)' }}>Apex Legends</strong>.
                </p>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Example:</strong> At 800 DPI, moving your mouse 1 inch moves the cursor 800 pixels.
                    At 400 DPI, the same 1 inch moves only 400 pixels — so it feels slower.
                </div>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                    What is eDPI? (Effective DPI)
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>eDPI (Effective Dots Per Inch)</strong> is the universal standard for comparing mouse
                    sensitivity across different hardware setups. The formula is simple:
                </p>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--primary)' }}>
                    eDPI = Mouse DPI × In-Game Sensitivity
                </div>
                <p style={{ marginBottom: '1.5rem' }}>
                    Two players with different hardware can have the <em>exact same</em> aim feel if their eDPI matches.
                    800 DPI × 0.5 sensitivity = <strong style={{ color: 'var(--text-primary)' }}>400 eDPI</strong>, which is identical to 400 DPI × 1.0 sensitivity = <strong style={{ color: 'var(--text-primary)' }}>400 eDPI</strong>.
                </p>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                    What DPI Should You Use? (Pro Player Data)
                </h2>
                <p style={{ marginBottom: '1.5rem' }}>Most competitive FPS pros use <strong style={{ color: 'var(--text-primary)' }}>400–800 DPI</strong> with a low in-game sensitivity:</p>

                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)' }}>Pro Player</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)' }}>Game</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)' }}>DPI</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)' }}>Sensitivity</th>
                                <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--primary)' }}>eDPI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'TenZ', game: 'Valorant', dpi: 800, sens: 0.3 },
                                { name: 'Aspas', game: 'Valorant', dpi: 800, sens: 0.4 },
                                { name: 's1mple', game: 'CS2', dpi: 400, sens: 3.09 },
                                { name: 'NiKo', game: 'CS2', dpi: 400, sens: 1.4 },
                                { name: 'ZywOo', game: 'CS2', dpi: 400, sens: 2.0 },
                            ].map((p) => (
                                <tr key={p.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{p.name}</td>
                                    <td style={{ padding: '0.75rem' }}>{p.game}</td>
                                    <td style={{ padding: '0.75rem' }}>{p.dpi}</td>
                                    <td style={{ padding: '0.75rem' }}>{p.sens}</td>
                                    <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{(p.dpi * p.sens).toFixed(0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                    Frequently Asked Questions About DPI
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        {
                            q: 'What does DPI mean in gaming?',
                            a: 'DPI (Dots Per Inch) measures how sensitive your mouse hardware is. A 400 DPI mouse sends 400 movement signals per inch. Higher DPI = faster cursor. Most FPS pros use 400–800 DPI with a low in-game sensitivity for maximum precision.'
                        },
                        {
                            q: 'Is higher DPI better for gaming?',
                            a: 'Not necessarily. Higher DPI isn\'t automatically better. What matters is your eDPI (DPI × sensitivity). Most competitive players prefer 400–800 DPI because lower DPI reduces rounding errors in older game engines. Modern games handle any DPI well.'
                        },
                        {
                            q: 'What is a good DPI for FPS games?',
                            a: '400–800 DPI is ideal for FPS games like Valorant and CS2. This allows precise control with a low in-game sensitivity. For MOBA games like League of Legends, higher DPI (1600–3200) works better for rapid camera movement.'
                        },
                        {
                            q: 'Can I change DPI without affecting aim?',
                            a: 'Yes — if you adjust your in-game sensitivity proportionally. If you double your DPI from 400 to 800, halve your in-game sensitivity. Your eDPI stays the same, and your aim feel is preserved. Use our sensitivity converter to recalculate instantly.'
                        },
                    ].map((item) => (
                        <details key={item.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                            <summary style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>{item.q}</summary>
                            <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>{item.a}</p>
                        </details>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Need to transfer your DPI settings to a new game?</p>
                    <Link href="/" style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: '1rem',
                    }}>
                        Use the Sensitivity Converter →
                    </Link>
                </div>
            </article>
        </div>
    );
}
