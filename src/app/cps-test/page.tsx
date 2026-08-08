import type { Metadata } from 'next';
import CpsTest from '@/components/CpsTest';

export const metadata: Metadata = {
    title: 'CPS Test — Click Speed Test (Clicks Per Second) | DCPROSENS',
    description:
        'Test your clicks per second (CPS) with a free online click speed test. Choose 5s, 10s, 30s, or 60s and see if you can beat your record.',
    keywords: [
        'cps test', 'click speed test', 'clicks per second test', 'cps checker',
        'mouse click test', 'cps test 5 seconds', 'cps test 10 seconds',
        'how many clicks per second', 'click speed calculator', 'jitter clicking test',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/cps-test',
    },
    openGraph: {
        title: 'CPS Test — Click Speed Test | DCPROSENS',
        description: 'Test your clicks per second (CPS) with a free online click speed test.',
        url: 'https://dcprosens.com/cps-test',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CPS Test | DCPROSENS',
        description: 'Test your clicks per second with a free online click speed test.',
        creator: '@dcprosens',
    },
};

export default function CpsTestPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS CPS Test',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/cps-test',
                description: 'Free online clicks-per-second (CPS) test with 5s, 10s, 30s, and 60s modes.',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'CPS Test', item: 'https://dcprosens.com/cps-test' },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is a good CPS (clicks per second)?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Average players click around 4-6 CPS. Competitive players and jitter-clickers can reach 8-12+ CPS. Butterfly clicking or drag clicking techniques can push scores even higher, though many competitive games disable or penalize those techniques.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Does mouse hardware affect CPS?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. Lighter switches, higher debounce-friendly microswitches, and a comfortable click angle all help sustain a faster click rate without fatigue or double-click errors.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                    🖱️ Click Speed Test
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    CPS <span className="text-gradient">Test</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Choose a duration and click as fast as you can. Your best score is saved locally so you can track your progress.
                </p>
            </div>

            <CpsTest />

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
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            What is a good CPS (clicks per second)?
                        </h4>
                        <p>
                            Average players click around 4-6 CPS. Competitive players and jitter-clickers can reach
                            8-12+ CPS, and specialized techniques like butterfly or drag clicking can push scores even higher.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Does mouse hardware affect CPS?
                        </h4>
                        <p>
                            Yes — lighter switches, a comfortable click angle, and a mouse that handles rapid clicks
                            without double-click errors all help sustain a faster rate without fatigue.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
