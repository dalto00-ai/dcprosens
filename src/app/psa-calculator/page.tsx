import type { Metadata } from 'next';
import PSACalculator from '@/components/PSACalculator';
import JsonLd, { breadcrumb, howTo, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'PSA Method Calculator — Valorant & CS2 Sens',
    description:
        'Free PSA Method Calculator (Perfect Sensitivity Approximation). Find your exact natural mouse sensitivity, eDPI, and cm/360 in 7 steps for Valorant, CS2, Apex Legends, Overwatch 2, Warzone & Minecraft.',
    keywords: [
        'psa method calculator',
        'psa method',
        'psa calculator',
        'psa sensitivity calculator',
        'psa method calculator valorant',
        'psa calculator valorant',
        'psa method calculator cs2',
        'psa sens calculator',
        'perfect sensitivity approximation',
        'psa calculator overwatch',
        'psa calculator minecraft',
        'psa calculator warzone',
        'find perfect sensitivity',
        'mouse sensitivity calculator'
    ],
    alternates: {
        canonical: 'https://dcprosens.com/psa-calculator/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — PSA Method Calculator" }],
        title: 'PSA Method Calculator (Free) | DCPROSENS',
        description:
            'Find your natural mouse sensitivity in 7 binary steps using the PSA Method Calculator for Valorant, CS2, Apex Legends, Overwatch 2 & more.',
        url: 'https://dcprosens.com/psa-calculator/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PSA Method Calculator (Free) | DCPROSENS',
        description:
            'Find your natural mouse sensitivity in 7 binary steps using the PSA Method Calculator.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};

const jsonLd = graph(
    breadcrumb([{ name: 'PSA Calculator', path: '/psa-calculator/' }]),
    howTo(
        'How to Calibrate Your Sensitivity Using the PSA Method',
        'A 7-step mathematical calibration process that binary-searches your neuromuscular sweet spot for gaming mouse sensitivity.',
        '/psa-calculator/',
        [
            {
                name: 'Enter Starting Base Sensitivity',
                text: 'Perform a comfortable swipe across your mousepad and enter your current baseline sensitivity into the calculator.'
            },
            {
                name: 'Test Higher vs Lower Options',
                text: 'The calculator generates a High sensitivity (Base x 1.5) and Low sensitivity (Base x 0.5) option. Test both in a shooting range against moving targets.'
            },
            {
                name: 'Select the Preferred Sensitivity',
                text: 'Click High or Low based on which value gives you smoother crosshair placement and target tracking.'
            },
            {
                name: 'Narrow Down the Multiplier (Iterations 2 through 6)',
                text: 'Repeat the tracking comparison as the multiplier interval gradually shrinks from 0.5 to 0.025.'
            },
            {
                name: 'Lock in Your Perfect Sensitivity (Iteration 7)',
                text: 'Complete iteration 7 to arrive at your definitive sweet spot sensitivity value.'
            },
            {
                name: 'Apply and Practice',
                text: 'Input the final calculated sensitivity into your game settings and commit to it for at least 3 weeks to establish muscle memory.'
            }
        ]
    ),
    {
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': 'Does the PSA method work for Valorant, CS2, and Apex Legends?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Yes. While the PSA (Perfect Sensitivity Approximation) method originated in Counter-Strike, it calibrates your physical arm and wrist biomechanics (cm/360). Select Valorant, CS2, Apex Legends, Overwatch 2, or Warzone in the calculator above to get exact sensitivity and eDPI values.'
                }
            },
            {
                '@type': 'Question',
                'name': 'How long should I spend on each PSA step?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Spend 2 to 3 minutes per sensitivity value (4 to 6 minutes per step) tracking stationary targets and micro-flicking between bots. The full 7-step PSA calibration takes 20 to 30 minutes.'
                }
            },
            {
                '@type': 'Question',
                'name': 'What starting sensitivity should I put into the PSA Method Calculator?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Enter a sensitivity where a full horizontal swipe from the left edge to the right edge of your mousepad performs roughly a 360-degree turn in-game (typically around 0.35 in Valorant or 1.10 in CS2 at 800 DPI).'
                }
            },
            {
                '@type': 'Question',
                'name': 'Should I change my DPI during the PSA method?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'No. Keep your mouse DPI fixed at 800 or 1600 DPI throughout all 7 iterations so your eDPI and cm/360 converge accurately.'
                }
            }
        ]
    }
);

export default function PSACalculatorPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <JsonLd data={jsonLd} />

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
                    📐 Free Scientific Calibration Tool — Unlimited Access
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    PSA Method <span className="text-gradient">Calculator</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Find your mathematically optimal mouse sensitivity through 7 guided binary choices. Works for Valorant, CS2, Apex Legends, Overwatch 2, Warzone &amp; Minecraft.
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
                            Just make sure to enter the starting values corresponding to the selected game&apos;s engine scale.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
