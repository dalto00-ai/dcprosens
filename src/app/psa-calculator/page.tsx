import type { Metadata } from 'next';
import PSACalculator from '@/components/PSACalculator';

export const metadata: Metadata = {
    title: 'PSA Method Calculator — Find Your Perfect Mouse Sensitivity | DCPROSENS',
    description:
        'Use the Perfect Sensitivity Approximation (PSA) method to mathematically calculate your ideal FPS gaming sensitivity. Guide your aiming sweet spot for Valorant, CS2, and Apex Legends.',
    keywords: [
        'psa method calculator', 'perfect sensitivity approximation', 'find perfect sensitivity',
        'fps sensitivity calculator', 'valorant perfect sensitivity', 'cs2 perfect sensitivity',
        'aim calibration tool', 'mouse sensitivity calculator', 'perfect sensitivity math',
        'calculate gaming sens', 'aim training sensitivity', 'apex legends perfect sens',
        'sens finder tool', 'optimize aim mouse sensitivity'
    ],
    alternates: {
        canonical: 'https://dcprosens.com/psa-calculator',
    },
    openGraph: {
        title: 'PSA Method Calculator — Find Your Perfect Mouse Sensitivity | DCPROSENS',
        description:
            'Use the Perfect Sensitivity Approximation (PSA) method to mathematically calculate your ideal FPS gaming sensitivity.',
        url: 'https://dcprosens.com/psa-calculator',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PSA Method Calculator | DCPROSENS',
        description:
            'Calculate your perfect FPS gaming sensitivity mathematically using the Perfect Sensitivity Approximation (PSA) method.',
        creator: '@dcprosens',
    },
};

export default function PSACalculatorPage() {
    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dcprosens.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'PSA Calculator',
                item: 'https://dcprosens.com/psa-calculator',
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />

            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: '#000',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.35rem 1.25rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1.25rem',
                    }}
                >
                    📐 Mathematical Aim Calibration
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    PSA Method <span className="text-gradient">Calculator</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Use the Perfect Sensitivity Approximation (PSA) method to narrow down your optimal in-game sensitivity bounds step-by-step.
                </p>
            </div>

            {/* Interactive component */}
            <PSACalculator />

            {/* Explanatory Copy & FAQs */}
            <div
                style={{
                    marginTop: '5rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                    What is the PSA Method (Perfect Sensitivity Approximation)?
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    The <strong>Perfect Sensitivity Approximation (PSA)</strong> method is a systematic, mathematical process designed to discover the specific sensitivity that aligns with your unique anatomy, muscle fibers, and mousepad friction.
                    Rather than copying pro settings or guessing numbers, the PSA method isolates your physical preferences by presenting side-by-side choices of low and high multipliers.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    How the PSA Math Works
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    The procedure starts with a base sensitivity you find comfortable.
                    From there, the calculator generates two extreme values to test:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong>Low Sensitivity Option:</strong> Calculated as <code style={{ color: 'var(--primary)' }}>Base - (Base × Factor)</code>
                    </li>
                    <li>
                        <strong>High Sensitivity Option:</strong> Calculated as <code style={{ color: 'var(--primary)' }}>Base + (Base × Factor)</code>
                    </li>
                </ul>
                <p style={{ marginBottom: '1.25rem' }}>
                    With each iteration, the multiplier factor shrinks (from 0.5 down to 0.025) while updating the Base value based on your preference.
                    Over 7 iterations, this process halves the search space continuously, zeroing in on the precise numerical value representing your neuromuscular aiming sweet spot.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    Tips for Accurate Calibration
                </h3>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                    <p style={{ marginBottom: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Ensure these factors are kept identical throughout testing:
                    </p>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>Keep your mouse hardware DPI constant (e.g. 800 or 1600 DPI).</li>
                        <li>Maintain your physical posture, grip style, and seating height.</li>
                        <li>Do not alter your game resolution or graphics quality between steps.</li>
                        <li>Test on moving targets that require a combination of micro-adjustments and tracking.</li>
                    </ul>
                </div>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            How often should I recalculate my sensitivity?
                        </h4>
                        <p>
                            We recommend running the PSA calculator only when changing your physical desk layout (like getting a new mousepad, a lighter mouse, or changing desk height).
                            Once calculated, stick with the value for at least 3 weeks to allow your brain to build reliable muscle memory.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            What game does this work best for?
                        </h4>
                        <p>
                            The PSA method is universally applicable to any first-person or third-person tactical shooter, including Valorant, CS2, Apex Legends, Overwatch 2, and Call of Duty: Warzone.
                            Just make sure to enter the starting values corresponding to the selected game's engine scale.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
