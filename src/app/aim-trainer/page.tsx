import type { Metadata } from 'next';
import AimTrainer from '@/components/AimTrainer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Online Aim Trainer 3D — Test Reaction Time & Click Precision | DCPROSENS',
    description: 'Improve your FPS clicking accuracy with our free browser-based aim trainer. Practice flicking, micro-adjustments, and tracking with simulated game sensitivity.',
    keywords: [
        'aim trainer online',
        'free 3d aim trainer',
        'fps aim trainer',
        'reaction time test',
        'precision clicker game',
        'gridshot online free',
        'valorant aim trainer',
        'cs2 aim trainer',
        'mouse accuracy test',
        'flick shots practice',
        'tracking target simulator',
        'aim booster browser',
        'apex legends aim practice',
        'reflex trainer game',
        'aim laboratory online',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/aim-trainer',
    },
    openGraph: {
        title: 'Online Aim Trainer 3D — Test Reaction & Click Precision | DCPROSENS',
        description: 'Improve your FPS clicking accuracy with our free browser-based aim trainer. Custom game sensitivity support for Valorant, CS2, and Apex.',
        type: 'website',
        url: 'https://dcprosens.com/aim-trainer',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Online Aim Trainer 3D — Test FPS Reaction | DCPROSENS',
        description: 'Train your reaction time, clicking precision, and tracking with custom game sensitivity.',
    },
    robots: { index: true, follow: true },
};

export default function AimTrainerPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Aim Trainer 3D',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/aim-trainer',
                description: 'Free online browser-based 3D aim trainer. Practice flicking (Gridshot), tracking, and reflexes with exact in-game sensitivity simulation.',
                featureList: [
                    'Gridshot (Flicking Mode) with random target respawn',
                    'Tracking Mode with smooth motion target',
                    'Reflex Mode with rapid target appearance/disappearance',
                    'Exact in-game sensitivity simulation (Valorant, CS2, Apex)',
                    'Live stats including accuracy, reaction time, KPS, and rank classification',
                ],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Can a browser aim trainer improve my in-game aim?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes! Consistent practice in an aim trainer improves muscle memory, hand-eye coordination, and reaction time. By using our sensitivity customizer, your browser clicks translate directly to your in-game physical movement.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I use my Valorant or CS2 sensitivity in the aim trainer?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Enter your mouse DPI, choose your game, and input your in-game sensitivity. The trainer utilizes the Pointer Lock API to capture raw mouse movement and applies the exact same angular multiplier to simulate 1:1 rotation on a 2D plane.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the best aim training routine?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'We recommend warming up for 10-15 minutes daily. Play 5 rounds of Gridshot for flicks, 5 rounds of Tracking for smooth target acquisition, and 5 rounds of Reflex to boost raw motor processing speed.',
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
                        background: 'rgba(168, 85, 247, 0.1)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: 'var(--secondary)',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        FPS Skill Tool
                    </p>
                    <h1 className="hero-title">
                        Online Aim <span className="text-gradient">Trainer 3D</span>
                    </h1>
                    <p className="hero-subtitle">
                        Test your reaction speed, track moving targets, and optimize flick accuracy. Input your exact DPI and game sensitivity for 1-to-1 muscle memory replication.
                    </p>
                </div>
            </section>

            {/* Trainer Component Container */}
            <div className="container" style={{ maxWidth: 1000 }}>
                <AimTrainer />
            </div>

            {/* SEO Article */}
            <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        How the Aim Trainer Builds Perfect Muscle Memory
                    </h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        Developing muscle memory is not about teaching your hands how to move; it is about teaching your brain how far a specific hand motion translates to on-screen displacement. By employing the <strong style={{ color: 'var(--text-primary)' }}>Pointer Lock API</strong>, our aim trainer locks your cursor and captures raw hardware ticks directly from your operating system.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        When you configure your DPI and game sensitivity, we scale that movement using the exact same multipliers as <strong style={{ color: 'var(--text-primary)' }}>Valorant, Counter-Strike 2, and Apex Legends</strong>. This means a 10cm flick in the aim trainer requires the exact same physical hand movement as a 10cm flick inside your favorite FPS.
                    </p>

                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2.5rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Understanding the Modes:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>
                                <strong style={{ color: 'var(--primary)' }}>Gridshot (Flicking):</strong> Develops speed and broad hand-eye coordination. Great for target acquisition.
                            </li>
                            <li>
                                <strong style={{ color: 'var(--primary)' }}>Tracking:</strong> Reinforces smooth tracking velocity. Trains your hand to move continuously at a controlled speed.
                            </li>
                            <li>
                                <strong style={{ color: 'var(--primary)' }}>Reflex:</strong> Sharpens reactions to sudden stimuli. Trains you to react and micro-adjust quickly before targets vanish.
                            </li>
                        </ul>
                    </div>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Sensitivity Equivalents &amp; DPI Multipliers
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Different game engines translate physical mouse movement using different yaw values. For instance, CS2 and Apex Legends share the same Source engine base multiplier of <code style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>0.022</code> degrees per count, while Valorant utilizes <code style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>0.07</code>.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Our aim trainer does the heavy lifting: when you move your mouse, we apply the correct game conversion factors so that your training is always relevant.
                    </p>

                    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    {['Game', 'Sens Yaw Factor', 'Example Sens', 'Effective DPI (eDPI)'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { game: 'Valorant', yaw: '0.07', sens: '0.35 (at 800 DPI)', edpi: '280' },
                                    { game: 'CS2 (Source)', yaw: '0.022', sens: '1.10 (at 800 DPI)', edpi: '880' },
                                    { game: 'Apex Legends', yaw: '0.022', sens: '1.10 (at 800 DPI)', edpi: '880' },
                                ].map(row => (
                                    <tr key={row.game} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{row.game}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.yaw}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--primary)' }}>{row.sens}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.edpi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Tips for Achieving &ldquo;Aim God&rdquo; Status
                    </h2>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
                        <li>
                            <strong>Don&apos;t rush:</strong> In Gridshot, focus on landing 100% of your shots. Speed comes naturally once your hand has mastered the pathing.
                        </li>
                        <li>
                            <strong>Be smooth in Tracking:</strong> Minimize tense wrist movements. Try to make a single, continuous sweep rather than nervous micro-flicks.
                        </li>
                        <li>
                            <strong>Sit correctly:</strong> Ensure your arm and forearm are positioned at a 90-degree angle to keep movements consistent.
                        </li>
                        <li>
                            <strong>Calibrate your physical setup:</strong> Keep your mousepad clean and ensure you have enough space on your desk to prevent hitting obstacles.
                        </li>
                    </ol>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Need to check your DPI configuration?</p>
                        <Link href="/dpi" style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#000',
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                        }}>
                            Use DPI Calculator →
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
