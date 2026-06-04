import type { Metadata } from 'next';
import StretchedResCalc from '@/components/StretchedResCalc';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Stretched Resolution Sensitivity Calculator — 4:3 FOV & m_yaw | DCPROSENS",
    description: "Calculate how stretching your resolution (e.g., 4:3 in CS2 or R6 Siege) affects your mouse sensitivity. Adjust FOV and calculate m_yaw corrections for a perfect 1:1 feel.",
    keywords: [
        'stretched resolution sensitivity',
        'cs2 m_yaw calculator',
        'csgo m_yaw 4 3',
        'r6 stretched resolution sensitivity',
        'm_yaw 16 9 to 4 3',
        'how to calculate m_yaw cs2',
        'stretched res mouse speed',
        'apex legends stretched sensitivity',
        '1280x960 sensitivity calculator',
        'how to fix stretched res sensitivity',
        'mouse sensitivity stretched resolution',
        'stretched res calculator',
        'stretched resolution converter',
        'm_yaw calculator',
        'stretch factor gaming',
        'valorant stretched resolution sensitivity',
        'rainbow six siege stretched res sensitivity',
        'stretched aspect ratio mouse feeling',
        '1024x768 stretching speed',
        'horizontal mouse sensitivity stretched'
    ],
    alternates: {
        canonical: "https://dcprosens.com/stretched-resolution",
    },
    openGraph: {
        title: "Stretched Resolution Sensitivity Calculator — 4:3 FOV & m_yaw | DCPROSENS",
        description: "Calculate how stretching your resolution (e.g., 4:3 in CS2 or R6 Siege) affects your mouse sensitivity. Adjust FOV and calculate m_yaw corrections for a perfect 1:1 feel.",
        type: "website",
        url: "https://dcprosens.com/stretched-resolution",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stretched Resolution Sensitivity Calculator — 4:3 & m_yaw | DCPROSENS",
        description: "Calculate stretch factor, perceived horizontal sensitivity speedup, and m_yaw adjustments for stretched resolution gaming.",
    },
    robots: { index: true, follow: true },
};

export default function StretchedResolutionPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Stretched Resolution Calculator',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/stretched-resolution',
                description: 'Free online stretched resolution sensitivity and m_yaw calculator for CS2, CS:GO, R6 Siege, Valorant and Apex Legends.',
                featureList: [
                    'Physical stretch factor calculation',
                    'Perceived horizontal speedup analysis',
                    'CS2/CS:GO m_yaw calculation and console commands',
                    'Game-by-game stretched resolution guide',
                    'Warning on vertical-horizontal muscle memory'
                ],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is stretched resolution in gaming?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Stretched resolution is when a player uses an aspect ratio (like 4:3 or 16:10) that is narrower than their native screen aspect ratio (usually 16:9) and expands it horizontally to fill the display. This stretches the visual models horizontally, making targets look wider and easier to hit.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Does stretching your resolution affect mouse sensitivity?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes and no. Physically, the angular rotation (degrees turned per inch of mouse movement) remains exactly the same. However, because the horizontal image is stretched across a wider space, the horizontal movement appears faster. This creates a perceived mismatch between vertical and horizontal speed.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is m_yaw and why change it?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'm_yaw is the console command in games like Counter-Strike (CS2/CS:GO) that controls horizontal mouse speed. By adjusting m_yaw from its default value (0.022) to a lower value (like 0.0165 for 4:3 on a 16:9 monitor), you can make the horizontal movement speed match the vertical movement speed on your screen.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Should I change m_yaw for stretched resolution?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Generally, most pros and aim coaches recommend NOT changing m_yaw. Keeping m_yaw at 0.022 preserves your physical muscle memory for angular rotation, which is identical between native and stretched. Adjusting m_yaw breaks vertical-to-horizontal uniformity (your mouse moves slower horizontally than vertically for the same physical movement).'
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
                        Display &amp; Sensitivity Tool
                    </p>
                    <h1 className="hero-title">
                        Stretched Resolution <span className="text-gradient">Calculator</span>
                    </h1>
                    <p className="hero-subtitle">
                        Find the perfect sensitivity settings and console commands when playing on stretched aspect ratios (like 4:3 or 16:10). Calculate stretch factors and correct your horizontal speed.
                    </p>
                </div>
            </section>

            {/* Calculator Component */}
            <div className="container" style={{ maxWidth: 1000 }}>
                <StretchedResCalc />
            </div>

            {/* In-depth Article Section */}
            <section className="container" style={{ maxWidth: 850, marginTop: '5rem', marginBottom: '4rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                        How Stretched Resolutions Affect Mouse Aim
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        When you select a non-native aspect ratio like 4:3 (e.g. 1280x960) or 5:4 (e.g. 1280x1024) and set your monitor or GPU to stretch the display to fill the screen, the image is stretched horizontally. Because of this, elements on your screen move faster horizontally than they do vertically.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Physically, your 3D sensitivity is <strong>exactly the same</strong>. Your mouse will still turn the exact same number of degrees in the game engine per centimeter or inch of physical movement. However, because your field of view (FOV) is compressed and stretched, the target moves <em>faster on screen</em>, making your mouse movement feel faster horizontally.
                    </p>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem' }}>
                        The Muscle Memory Dilemma: To Change or Not to Change?
                    </h2>
                    <p style={{ marginBottom: '1.25rem' }}>
                        There are two schools of thought on how to handle sensitivity on stretched resolution:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li>
                            <strong style={{ color: 'var(--text-primary)' }}>1. Keep Settings Default (Recommended):</strong>
                            <br />
                            Most esports professionals and aim theory experts recommend leaving your settings alone. If you do not change your sensitivity or <code>m_yaw</code>, your physical muscle memory for turning and aiming remains 100% consistent with native resolution. Yes, horizontal targets look faster, but your hands already know the physical distance to move to cover that angular distance.
                        </li>
                        <li>
                            <strong style={{ color: 'var(--text-primary)' }}>2. Adjust Horizontal Sensitivity (m_yaw):</strong>
                            <br />
                            If the visual mismatch is highly distracting and you want horizontal mouse movements to cover the same screen pixels as vertical ones, you can adjust your horizontal multiplier (or <code>m_yaw</code> in Source engine games). This fixes the screen-space speedup but introduces a physical mismatch: you will now need to move your mouse physically further horizontally than vertically to turn the same number of degrees in-game.
                        </li>
                    </ul>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem' }}>
                        Stretched Resolution Settings by Game
                    </h2>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Counter-Strike 2 &amp; CS:GO
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        CS2 is the most popular game for stretched resolution. The console command <code>m_yaw</code> defaults to <code>0.022</code>. When you play 4:3 stretched on a 16:9 monitor, the horizontal image is stretched by 1.333x. By setting <code>m_yaw 0.0165</code> (which is 0.022 / 1.333), your horizontal and vertical screen speeds will feel identical.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Valorant
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Valorant uses a strict lock on horizontal FOV. If you run a 4:3 resolution in Valorant, the game stretches the UI/HUD elements, but the 3D world remains rendered at a standard 16:9 aspect ratio. This means models are <strong>not</strong> physically wider on screen, and your actual 3D aim speed is identical. Valorant does not support <code>m_yaw</code> adjustments.
                    </p>

                    <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Apex Legends &amp; Call of Duty
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>
                        Apex Legends stretches both the 3D environment and HUD elements. There is no built-in config command to change horizontal sensitivity independently. If you want a 1:1 screen feel, you would need to adjust the X-axis DPI of your mouse (using software like Razer Synapse or Logitech G HUB) which is generally not recommended.
                    </p>

                    <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>Looking to compare your gear or sensitivity with the pros?</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="/" style={{
                                display: 'inline-block',
                                background: 'var(--primary)',
                                color: '#000',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}>
                                Sensitivity Converter
                            </Link>
                            <Link href="/mouse-database" style={{
                                display: 'inline-block',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.75rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}>
                                Browse Pro Mice
                            </Link>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
