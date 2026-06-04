import type { Metadata } from 'next';
import MonitorSimulator from '@/components/MonitorSimulator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Monitor Refresh Rate Hz Simulator — 60Hz vs 144Hz vs 240Hz vs 360Hz | DCPROSENS',
    description: 'See the visual difference between 60Hz, 144Hz, 240Hz, and 360Hz refresh rates. Simulate monitor ghosting, motion blur, and response times in real time.',
    keywords: [
        'monitor refresh rate simulator',
        'hz simulator',
        '60hz vs 144hz vs 240hz',
        '360hz monitor test',
        'monitor ghosting test',
        'motion blur simulator',
        'panel response time comparison',
        'oled vs ips ghosting',
        'input lag simulator',
        'benq zowie xl2566k review',
        'asus pg27aqdm motion clarity',
        'gaming refresh rate test',
        'fps motion simulator',
        'test ufo clone simulator',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/monitor-simulator',
    },
    openGraph: {
        title: 'Monitor Refresh Rate Hz Simulator — 60Hz vs 144Hz vs 240Hz vs 360Hz | DCPROSENS',
        description: 'Test the real-time visual difference of high refresh rates. Compare 60Hz, 144Hz, and 240Hz/360Hz side-by-side with response time ghosting simulation.',
        type: 'website',
        url: 'https://dcprosens.com/monitor-simulator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Monitor Refresh Rate Hz Simulator | DCPROSENS',
        description: 'Compare 60Hz, 144Hz, 240Hz, and 360Hz refresh rates. Simulate monitor ghosting in real-time.',
    },
    robots: { index: true, follow: true },
};

export default function MonitorSimulatorPage() {
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
                'name': 'Monitor Hz Simulator',
                'item': 'https://dcprosens.com/monitor-simulator',
            },
        ],
    };

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'Best Gaming Monitors Recommended by DCPROSENS',
        'description': 'Recommended gaming monitors for competitive gaming sorted by speed and refresh rates.',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'item': {
                    '@type': 'Product',
                    'name': 'ASUS ROG Swift PG27AQDM OLED',
                    'image': 'https://dcprosens.com/monitors/asus-pg27aqdm.jpg',
                    'description': '27-inch 1440p 240Hz gaming monitor featuring a premium OLED panel with near-instantaneous 0.03ms pixel response time.',
                    'brand': {
                        '@type': 'Brand',
                        'name': 'ASUS',
                    },
                    'offers': {
                        '@type': 'Offer',
                        'price': '799.00',
                        'priceCurrency': 'USD',
                        'availability': 'https://schema.org/InStock',
                        'url': 'https://www.amazon.com/dp/B0BZR9T1M5',
                    },
                },
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'item': {
                    '@type': 'Product',
                    'name': 'BenQ ZOWIE XL2566K',
                    'image': 'https://dcprosens.com/monitors/zowie-xl2566k.jpg',
                    'description': '24.5-inch 1080p 360Hz esports monitor with DyAc⁺ technology for maximum motion clarity in FPS games.',
                    'brand': {
                        '@type': 'Brand',
                        'name': 'BenQ ZOWIE',
                    },
                    'offers': {
                        '@type': 'Offer',
                        'price': '599.00',
                        'priceCurrency': 'USD',
                        'availability': 'https://schema.org/InStock',
                        'url': 'https://www.amazon.com/dp/B0BGLV299V',
                    },
                },
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'item': {
                    '@type': 'Product',
                    'name': 'LG UltraGear 27GR83Q-B',
                    'image': 'https://dcprosens.com/monitors/lg-27gr83q.jpg',
                    'description': '27-inch 1440p 240Hz gaming monitor with Fast IPS panel technology and 1ms G2G response time.',
                    'brand': {
                        '@type': 'Brand',
                        'name': 'LG',
                    },
                    'offers': {
                        '@type': 'Offer',
                        'price': '349.00',
                        'priceCurrency': 'USD',
                        'availability': 'https://schema.org/InStock',
                        'url': 'https://www.amazon.com/dp/B0C63HD5V8',
                    },
                },
            },
            {
                '@type': 'ListItem',
                'position': 4,
                'item': {
                    '@type': 'Product',
                    'name': 'Gigabyte G24F 2',
                    'image': 'https://dcprosens.com/monitors/gigabyte-g24f2.jpg',
                    'description': '23.8-inch 1080p 165Hz/170Hz budget IPS gaming monitor with 1ms response time.',
                    'brand': {
                        '@type': 'Brand',
                        'name': 'Gigabyte',
                    },
                    'offers': {
                        '@type': 'Offer',
                        'price': '149.00',
                        'priceCurrency': 'USD',
                        'availability': 'https://schema.org/InStock',
                        'url': 'https://www.amazon.com/dp/B0B586K79X',
                    },
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            {/* Hero */}
            <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <p style={{
                        display: 'inline-block',
                        background: 'rgba(0, 255, 157, 0.1)',
                        border: '1px solid rgba(0, 255, 157, 0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Display Performance
                    </p>
                    <h1 className="hero-title">
                        Monitor Refresh Rate <span className="text-gradient">Hz Simulator</span>
                    </h1>
                    <p className="hero-subtitle">
                        Compare 60Hz, 144Hz, and 240Hz/360Hz side-by-side. Simulate pixel ghosting and response time smears across OLED, IPS, TN, and VA panels.
                    </p>
                </div>
            </section>

            {/* Simulator Interactive Panel */}
            <div className="container" style={{ maxWidth: 1200 }}>
                <MonitorSimulator />
            </div>

            {/* SEO Article */}
            <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        How Refresh Rate and Response Time Affect Gaming Aim
                    </h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        When it comes to first-person shooters like CS2, Valorant, Overwatch, or Apex Legends, information delay
                        can mean the difference between landing a headshot or losing the round. Your monitor is the final link in the chain
                        of latency. Understanding how refresh rates (measured in Hertz) and panel speeds interact is essential.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Hz: How Frequently the Display Updates
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Refresh rate represents the number of times your monitor updates the on-screen image per second.
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><strong style={{ color: 'var(--text-primary)' }}>60 Hz</strong> updates the screen every <strong style={{ color: 'var(--text-primary)' }}>16.67 milliseconds</strong>. Slow tracking targets look staggered and jumpy, making micro-adjustments highly difficult.</li>
                        <li><strong style={{ color: 'var(--text-primary)' }}>144 Hz</strong> updates every <strong style={{ color: 'var(--text-primary)' }}>6.94 milliseconds</strong>. A massive jump that reduces eye fatigue and cuts perceived motion blur in half.</li>
                        <li><strong style={{ color: 'var(--text-primary)' }}>240 Hz</strong> updates every <strong style={{ color: 'var(--text-primary)' }}>4.17 milliseconds</strong>. Highly fluid tracking. Greatly reduces tracking errors.</li>
                        <li><strong style={{ color: 'var(--text-primary)' }}>360 Hz</strong> updates every <strong style={{ color: 'var(--text-primary)' }}>2.78 milliseconds</strong>. The absolute pinnacle for tactical FPS players, giving players the most immediate physical feedback.</li>
                    </ul>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                        Response Time (Gray-to-Gray) & Ghosting
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        While Hz dictates how many times a frame is sent to the display, pixel response time (measured in G2G ms) determines how fast the screen&apos;s liquid crystals can transition from one color to another. If a pixel cannot change colors fast enough to match the refresh rate, you get <strong style={{ color: 'var(--text-primary)' }}>ghosting</strong> (semi-transparent trails behind moving objects).
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        As shown in the simulator, slow VA panels (8ms response time) leave wide ghosting trails behind the UFO. Under 60Hz, this smearing is widely dispersed, creating visual clutter. High-end OLED displays (0.03ms response) update color states instantaneously, eliminating trails completely, even when tracking at rapid speeds.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3.5rem', marginBottom: '1.5rem' }}>
                        What is Input Lag and Display Lag?
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Display lag is the sum of pixel response times, internal scaler processing delay, and frame delivery time. High refresh rates reduce input lag by delivering frames closer to the moment they are generated by the GPU. On a 360Hz monitor, the minimum frame-time latency is just 2.8ms, allowing for near-instant physical hand-to-eye feedback.
                    </p>

                    <div style={{ background: 'rgba(112, 0, 255, 0.03)', border: '1px solid var(--secondary-glow)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Want to find your ideal DPI and in-game sensitivity?</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                            Adjusting your monitor refresh rate is just half the battle. Use our multi-game Sensitivity Finder to align your game sensitivities across Valorant, Apex, CS2 and more.
                        </p>
                        <Link href="/sens-finder" style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#000',
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                            transition: 'opacity 0.2s',
                        }}>
                            Open Sensitivity Finder →
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
