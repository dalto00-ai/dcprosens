import type { Metadata } from 'next';
import MousepadChart from '@/components/MousepadChart';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Mousepad Friction & Speed Chart 2025 — Control vs Speed | DCPROSENS',
    description: 'Compare mousepad static friction, dynamic friction, and stopping power. View the ultimate interactive mousepad database with Artisan, SteelSeries, Logitech, and Zowie.',
    keywords: [
        'mousepad friction chart',
        'mousepad speed chart',
        'artisan zero friction',
        'steelseries qck heavy review',
        'zowie gsr ii stopping power',
        'mousepad comparison database',
        'control vs speed mousepad',
        'gaming mousepad glide test',
        'skypad glass 3.0 friction',
        'best control mousepad',
        'best speed mousepad',
        'mousepad database 2025',
        'low friction gaming pad',
        'artisan hien speed level',
        'stopping power mousepad',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/mousepad-chart',
    },
    openGraph: {
        title: 'Mousepad Friction & Speed Chart 2025 — Control vs Speed | DCPROSENS',
        description: 'Compare static friction, dynamic friction, and stopping power of Artisan, SteelSeries, Logitech, and Zowie mousepads. Find the perfect balance.',
        type: 'website',
        url: 'https://dcprosens.com/mousepad-chart',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mousepad Friction & Speed Chart | DCPROSENS',
        description: 'Compare mousepad friction and stopping power. Artisan, Logitech, Zowie, SteelSeries, and more.',
    },
    robots: { index: true, follow: true },
};

export default function MousepadChartPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://dcprosens.com',
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Mousepad Friction & Speed Chart',
                'item': 'https://dcprosens.com/mousepad-chart',
            },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': 'What is the difference between static and dynamic friction on a mousepad?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Static friction is the resistance you must overcome to start moving the mouse from a complete stop. Dynamic friction is the resistance felt while maintaining mouse movement. Low static friction enables easier micro-adjustments, whereas high dynamic friction offers more slowing resistance during long sweeps.',
                },
            },
            {
                '@type': 'Question',
                'name': 'Which mousepad has the highest speed?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Glass mousepads like the SkyPAD Glass 3.0 offer the absolute lowest friction and highest speed. In the cloth/hybrid category, the Artisan Shidenkai V2 and Artisan Hien are renowned for having the fastest glide speeds.',
                },
            },
            {
                '@type': 'Question',
                'name': 'What is stopping power on a gaming mousepad?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Stopping power refers to the mousepad\'s ability to help you stop your mouse cursor precisely at a target. High stopping power (typically found on control pads like Zowie G-SR II or SteelSeries QcK Heavy) prevents overshooting, which is critical for tactical shooters like CS2 and Valorant.',
                },
            },
        ],
    };

    return (
        <div className="page-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <p style={{
                        display: 'inline-block',
                        background: 'rgba(112, 0, 255, 0.1)',
                        border: '1px solid rgba(112, 0, 255, 0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: '#a95fff',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Gear Database
                    </p>
                    <h1 className="hero-title">
                        Mousepad Friction & <span className="text-gradient">Speed Chart</span>
                    </h1>
                    <p className="hero-subtitle">
                        Compare static friction, dynamic glide speed, stopping power, and durability across 12+ industry-leading mousepads. Use the slider to filter by speed profile.
                    </p>
                </div>
            </section>

            {/* Main Interactive Database Tool */}
            <div className="container" style={{ maxWidth: 1200 }}>
                <MousepadChart />
            </div>

            {/* SEO Article */}
            <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Understanding Mousepad Friction: Control vs. Speed
                    </h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        Selecting the correct mousepad is one of the most underrated hardware choices in competitive gaming.
                        While mouse sensors and refresh rates get all the marketing hype, your mousepad determines the physical
                        resistance profile of your hand movements. The right pad can solve overshooting, shaky micro-adjustments, and tracking inconsistencies.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Static Friction (Initial Stickiness)
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Static friction determines how much force is required to break the mouse from a stationary state.
                        A pad with <strong style={{ color: 'var(--text-primary)' }}>high static friction</strong> will feel sticky when making minor adjustments. This is often desired by low-sensitivity players in games like Valorant or CS2, as it locks the crosshair in place.
                        A pad with <strong style={{ color: 'var(--text-primary)' }}>low static friction</strong> (like a glass pad or high-speed hybrid) lets you start moving the mouse with virtually zero initial effort, preventing wrist stutters during fine aim corrections.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Dynamic Friction (Gliding Smoothness)
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Dynamic friction is the resistance felt when the mouse is continuously moving.
                        Pads with high dynamic speed (low friction) allow you to glide effortlessly and track high-speed targets without muscle fatigue. This is why tracking-heavy games like Apex Legends, Quake, and Overwatch 2 favor speed pads.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Stopping Power (The Brake Coefficient)
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Stopping power measures how easily you can bring the mouse to a sudden halt after a fast swipe.
                        Cloth pads with textured weave generate a high level of compression resistance, allowing you to sink your mouse feet into the fabric to brake. Hard glass surfaces provide almost zero stopping power, forcing your arm and wrist muscles to do all the braking, which requires substantial muscle control.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3.5rem', marginBottom: '1.5rem' }}>
                        Mousepad Categories Explained
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                        {[
                          { category: 'Pure Control', description: 'Maximum stopping power and high static friction. Ideal for tactical shooters where crosshair placement is everything.', examples: 'Zowie G-SR II, Endgame Gear EMC, SteelSeries QcK Heavy', color: '#ff4a4a' },
                          { category: 'Control / Medium', description: 'The sweet spot for the majority of competitive players. Offers enough glide for tracking while retaining solid stopping power.', examples: 'Artisan Zero, LGG Saturn Pro, Logitech G640', color: '#a95fff' },
                          { category: 'Balanced', description: 'Perfect hybrid surface. Equal ratios of glide speed and stopping power. Great for multi-genre FPS players.', examples: 'Artisan Hayate Otsu, Pulsar ES2', color: '#ffc800' },
                          { category: 'Speed / Hybrid', description: 'Rough textured surfaces with very fast glide. Excellent for tracking games and micro-adjustments.', examples: 'Artisan Hien, Fnatic Dash', color: '#00ff9d' },
                          { category: 'Pure Speed', description: 'Hard polymer or glass surfaces. Zero friction, zero stopping power, maximum durability.', examples: 'SkyPAD Glass 3.0, Artisan Shidenkai V2', color: '#00e0ff' }
                        ].map((row) => (
                          <div key={row.category} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                            <h4 style={{ color: row.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{row.category}</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{row.description}</p>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <strong>Top Models:</strong> {row.examples}
                            </div>
                          </div>
                        ))}
                    </div>

                    <div style={{ background: 'rgba(0, 255, 157, 0.03)', border: '1px solid rgba(0, 255, 157, 0.1)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Not sure what size mousepad fits your sensitivity?</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                            Our Mousepad Size Calculator estimates the minimum physical surface width and height you need based on your exact DPI and sensitivity.
                        </p>
                        <Link href="/mousepad-calculator" style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#000',
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                            transition: 'opacity 0.2s',
                        }}>
                            Open Mousepad Size Calculator →
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
