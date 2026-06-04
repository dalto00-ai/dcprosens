import type { Metadata } from 'next';
import MouseFinder from '@/components/MouseFinder';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Mouse Finder Quiz 2025 — Find the Best Gaming Mouse | DCPROSENS",
    description: "Take our 4-step ergonomic quiz to find the perfect gaming mouse. Input your hand size and grip style to match with top mice used by FPS professionals.",
    keywords: [
        'mouse finder',
        'gaming mouse quiz',
        'best gaming mouse for hand size',
        'gaming mouse size chart',
        'palm grip gaming mouse',
        'claw grip gaming mouse',
        'fingertip grip mouse',
        'lightweight mouse finder',
        'wireless gaming mouse selector',
        'gaming mouse recommendations',
        'esports mouse quiz',
        'gaming mouse shape guide',
        'hand measurement mouse',
        'logitech mouse finder',
        'razer mouse finder',
        'mouse size calculator',
        'fps mouse selector 2025',
        'pro gaming mouse matches'
    ],
    alternates: {
        canonical: "https://dcprosens.com/mouse-finder",
    },
    openGraph: {
        title: "Mouse Finder Quiz 2025 — Find the Best Gaming Mouse for Your Hand | DCPROSENS",
        description: "Take our 4-step ergonomic quiz to find the perfect gaming mouse. Input your hand size and grip style to match with top mice used by FPS professionals.",
        type: "website",
        url: "https://dcprosens.com/mouse-finder",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mouse Finder Quiz 2025 — Find the Best Gaming Mouse | DCPROSENS",
        description: "Take our 4-step ergonomic quiz to find the perfect gaming mouse. Input your hand size and grip style to match with top mice used by FPS professionals.",
    },
    robots: { index: true, follow: true },
};

export default function MouseFinderPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Mouse Finder Quiz',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/mouse-finder',
                description: 'Interactive 4-step quiz that matches your hand measurements, grip style, weight preferences, and budget to the best professional gaming mice on the market.',
                featureList: [
                    'Hand length and width measurement sliders',
                    'Interactive grip style selector with diagrams',
                    'Wired vs wireless and weight preferences',
                    'Dynamic budget filter',
                    'Smart scoring algorithm with pro player recommendations'
                ],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How do I measure my hand for a gaming mouse?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'To find the right gaming mouse, measure your hand length (from the crease at the base of your palm to the tip of your middle finger) and hand width (across your knuckles, excluding your thumb). Compare these with mouse specifications to find a comfortable fit.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What gaming mouse size is best for small hands?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Small hands (under 17cm in length) generally prefer smaller, shorter mice that are less than 118mm long. This allows for better grip control, especially for claw or fingertip grips.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between Palm, Claw, and Fingertip grips?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Palm grip involves resting your entire hand flat on the mouse. Claw grip arches your fingers into a claw shape, with only fingertips and the back of your palm touching the mouse. Fingertip grip touches the mouse only with your fingertips, keeping your palm completely off the mouse for maximum agility.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Why does mouse weight matter in FPS games?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Lighter mice (under 65g) require less force to start and stop moving, which reduces fatigue and helps you make faster, more precise micro-adjustments and flicks in competitive games like Valorant, CS2, or Apex Legends.'
                        }
                    }
                ]
            }
        ]
    };

    return (
        <div className="page-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <p style={{
                        display: 'inline-block',
                        background: 'rgba(112,0,255,0.1)',
                        border: '1px solid rgba(112,0,255,0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: '#b070ff',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Ergonomics &amp; Gear Tool
                    </p>
                    <h1 className="hero-title">
                        Mouse Finder <span className="text-gradient" style={{ background: 'linear-gradient(135deg, #b070ff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Quiz</span>
                    </h1>
                    <p className="hero-subtitle">
                        Find the perfect gaming mouse tailored specifically to your hand dimensions, grip type, and feature preferences. Powered by professional FPS player gear data.
                    </p>
                </div>
            </section>

            {/* Quiz Component */}
            <div className="container" style={{ maxWidth: 900 }}>
                <MouseFinder />
            </div>

            {/* Scientific Aim Article Section */}
            <section className="container" style={{ maxWidth: 850, marginTop: '5rem', marginBottom: '4rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                        How to Choose the Perfect Gaming Mouse
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Choosing a gaming mouse is not just about specs, brand marketing, or picking what your favorite pro player uses. The most important factor in mouse aiming is <strong>ergonomics</strong> — specifically, how the shape and dimensions of the mouse match your hand size and how you physically grip it.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        A mouse that is too large will restrict your range of motion and prevent micro-adjustments with your fingers. A mouse that is too small can lead to hand cramps, fatigue, and inconsistent tracking.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem' }}>
                        How Grip Styles Impact Shape Selection
                    </h2>
                    
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Palm Grip (Comfort and Tracking Stability)
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        In a palm grip, your entire hand lies flat on the mouse shell, maximizing contact area. This grip is great for smooth, broad arm tracking in games like Apex Legends. Palm grip users prefer larger, ergonomic right-handed shapes (like the Razer DeathAdder V3 Pro) which offer full support for the thumb, index, and pinky fingers.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Claw Grip (Micro-Adjustment and Control)
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Claw grip rests the base of your palm on the back of the mouse, while your fingers are arched up to click the buttons. This combines the tracking stability of palm contact with the agility of finger clicks. Claw grip works best with medium-sized symmetrical mice that have a pronounced back hump (like the Lamzu Atlantis OG V2) which anchors the palm.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Fingertip Grip (Maximum Agility and Speed)
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Fingertip grip means your palm never touches the mouse. Only the tips of your fingers hold the sides and click the buttons. This enables incredibly fast micro-adjustments using just your fingers, which is ideal for vertical recoil control and fast flicks. Fingertip grip requires small, ultra-lightweight symmetrical mice (like the Pulsar X2V2 Mini) with low hump profiles.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem' }}>
                        Weight and Connectivity Considerations
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        In modern esports, the trend has shifted heavily toward <strong>ultra-lightweight wireless mice</strong> (under 65 grams). Lower weight reduces inertia, meaning you can start and stop flicks with less mechanical resistance, resulting in faster and more accurate aim. Modern wireless connections operate at 1000Hz up to 8000Hz polling rates, rendering wired delays completely obsolete.
                    </p>

                    <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>Want to browse the complete hardware database?</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/mouse-database" style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #b070ff, var(--primary))',
                                color: '#000',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}>
                                View Mouse Database
                            </Link>
                            <Link href="/sens-finder" style={{
                                display: 'inline-block',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}>
                                Find Your Sensitivity
                            </Link>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
