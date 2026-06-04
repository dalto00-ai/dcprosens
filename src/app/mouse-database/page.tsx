import type { Metadata } from 'next';
import MouseDatabaseClient from '@/components/MouseDatabaseClient';
import { mouseDatabase } from '@/lib/mouseDatabase';

export const metadata: Metadata = {
    title: "Best Gaming Mice 2025 — Pro Player Mouse Database | DCPROSENS",
    description: "Browse the ultimate database of pro gaming mice. Filter by weight, sensor, shape and connectivity. Find the perfect mouse used by top FPS professionals.",
    keywords: [
        // Core gaming mouse
        'best gaming mouse 2025', 'pro gaming mouse', 'gaming mouse database', 'gaming mouse comparison',
        'best fps gaming mouse', 'competitive gaming mouse', 'pro player mouse', 'esports mouse',
        'gaming mouse filter', 'gaming mouse weight', 'lightweight gaming mouse', 'ultralight gaming mouse',
        // Specific models
        'logitech g pro x superlight 2', 'razer deathadder v3', 'pulsar xlite v3',
        'zowie ec2', 'zowie fk2', 'finalmouse starlight', 'lamzu atlantis',
        'g-wolves hts', 'vaxee np-01s', 'endgame gear xm2we',
        'best logitech gaming mouse', 'best razer gaming mouse', 'best zowie mouse',
        // What mouse do pros use
        'what mouse does tenz use', 'what mouse does s1mple use 2025', 'what mouse does zywoo use',
        'what mouse does aspas use', 'imperialhal mouse', 'niko cs2 mouse',
        'valorant pro mouse', 'cs2 pro mouse', 'apex legends pro mouse setup',
        // Specs & features
        'gaming mouse sensor', 'PixArt 3395 gaming mouse', 'hero sensor mouse', 'focus pro sensor',
        'gaming mouse polling rate', '4000hz gaming mouse', '8000hz gaming mouse',
        'wired vs wireless gaming mouse', 'best wireless gaming mouse 2025',
        'gaming mouse shape symmetrical', 'ergonomic gaming mouse', 'claw grip mouse', 'fingertip grip mouse',
        // Long tail
        'best mouse for valorant 2025', 'best mouse for cs2 2025', 'best mouse for apex legends',
        'gaming mouse under 50 grams', 'gaming mouse under 60 grams',
        'gaming mouse buying guide', 'how to choose gaming mouse', 'mouse for fps games',
    ],
    alternates: {
        canonical: "https://dcprosens.com/mouse-database",
    },
    openGraph: {
        title: "Best Gaming Mice for Pro FPS Players — Mouse Database | DCPROSENS",
        description: "Filter and compare top gaming mice by weight, sensor, shape, and what pro players use. Affiliate links to Amazon included.",
        type: "website",
        url: "https://dcprosens.com/mouse-database",
    },
    twitter: {
        card: "summary_large_image",
        title: "Best Gaming Mice 2025 — Pro Player Database | DCPROSENS",
        description: "Find the perfect gaming mouse used by pro players. Filter by specs, shape and budget.",
    },
};

export default function MouseDatabasePage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com" },
            { "@type": "ListItem", "position": 2, "name": "Gaming Mouse Database", "item": "https://dcprosens.com/mouse-database" },
        ],
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best Pro Gaming Mice 2025 — DCPROSENS Database",
        "description": "Comprehensive database of professional gaming mice with specs, pro player usage and affiliate links.",
        "url": "https://dcprosens.com/mouse-database",
        "numberOfItems": mouseDatabase.length,
        "itemListElement": mouseDatabase.slice(0, 10).map((mouse, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": mouse.name,
            "url": mouse.affiliateLink,
        })),
    };

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
                    🖱️ Pro Player Gear
                </span>

                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Gaming Mouse <span className="text-gradient">Database</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Every top-tier gaming mouse in one place. Filter by <strong>weight</strong>, <strong>sensor</strong>, <strong>shape</strong> and what <strong>pro players</strong> actually use.
                </p>
            </div>

            {/* QUICK STATS */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem',
            }}>
                {[
                    { icon: '🖱️', title: `${mouseDatabase.length} Mice`, desc: 'Top pro gaming mice reviewed and catalogued' },
                    { icon: '⚡', title: 'Live Specs', desc: 'Weight, sensor, DPI, polling rate, dimensions' },
                    { icon: '🏆', title: 'Pro Usage', desc: 'Real data on what pro players actually use' },
                    { icon: '🛒', title: 'Best Prices', desc: 'Direct Amazon links — up-to-date pricing' },
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

            <MouseDatabaseClient />

            {/* SEO CONTENT */}
            <div style={{
                marginTop: '5rem',
                maxWidth: '750px',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
            }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                    What makes a gaming mouse "pro-grade"?
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    Pro players prioritize three factors above all else: <strong style={{ color: 'var(--text-primary)' }}>weight</strong> (lighter = faster flicks),
                    <strong style={{ color: 'var(--text-primary)' }}> sensor accuracy</strong> (zero acceleration, 1:1 tracking), and
                    <strong style={{ color: 'var(--text-primary)' }}> shape consistency</strong> (symmetrical for grip flexibility, ergonomic for claw/palm).
                    Most top FPS pros use mice between 50–80g. Anything under 60g is considered ultra-light.
                </p>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>
                    Wired vs Wireless for competitive play
                </h2>
                <p>
                    Modern wireless mice like the Logitech G Pro X Superlight 2 and Razer DeathAdder V3 HyperSpeed have eliminated
                    latency concerns entirely. Both use sub-1ms wireless polling. The choice now comes down to <strong style={{ color: 'var(--primary)' }}>preference and budget</strong> — not performance.
                    Wired mice remain slightly cheaper and require zero battery management.
                </p>
            </div>
        </div>
    );
}
