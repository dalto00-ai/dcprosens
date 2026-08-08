import type { Metadata } from 'next';
import ReactionTimeTest from '@/components/ReactionTimeTest';

export const metadata: Metadata = {
    title: 'Reaction Time Test — Measure Your Visual Reaction Speed | DCPROSENS',
    description:
        'Test your visual reaction time in milliseconds with a free online reaction test. 5 attempts, average and best time, no download required.',
    keywords: [
        'reaction time test', 'reaction test', 'visual reaction time',
        'human benchmark reaction test', 'ms reaction time', 'gamer reaction test',
        'click reaction time test', 'reflex test online', 'average reaction time gaming',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/reaction-time-test',
    },
    openGraph: {
        title: 'Reaction Time Test — Measure Your Visual Reaction Speed | DCPROSENS',
        description: 'Test your visual reaction time in milliseconds with a free online reaction test.',
        url: 'https://dcprosens.com/reaction-time-test',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reaction Time Test | DCPROSENS',
        description: 'Test your visual reaction time in milliseconds, free and online.',
        creator: '@dcprosens',
    },
};

export default function ReactionTimeTestPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Reaction Time Test',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/reaction-time-test',
                description: 'Free online visual reaction time test with 5 attempts and average/best time.',
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
                    { '@type': 'ListItem', position: 2, name: 'Reaction Time Test', item: 'https://dcprosens.com/reaction-time-test' },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is a good reaction time for gaming?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The average human visual reaction time is around 250ms. Competitive FPS players often average 150-200ms. Times below 150ms are exceptional and can be influenced by monitor refresh rate, input lag, and practice.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Why does my reaction time vary between attempts?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Reaction time naturally fluctuates with fatigue, focus, and even the specific moment of anticipation. This is why the test averages multiple attempts instead of relying on a single try — it gives a more representative measurement.',
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
                    ⚡ Reflex Benchmark
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Reaction Time <span className="text-gradient">Test</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Wait for the box to turn green, then click as fast as you can. 5 attempts, averaged.
                </p>
            </div>

            <ReactionTimeTest />

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
                            What is a good reaction time for gaming?
                        </h4>
                        <p>
                            The average human visual reaction time is around 250ms. Competitive FPS players often average
                            150-200ms, and times below 150ms are exceptional.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Why does my reaction time vary between attempts?
                        </h4>
                        <p>
                            Reaction time naturally fluctuates with fatigue, focus, and anticipation — that&apos;s why this
                            test averages multiple attempts instead of relying on a single try.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
