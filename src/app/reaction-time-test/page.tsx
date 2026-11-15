import type { Metadata } from 'next';
import ReactionTimeTest from '@/components/ReactionTimeTest';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'Reaction Time Test — Visual Speed Test',
    description:
        'Test your visual reaction time in milliseconds with a free online reaction test. 5 attempts, average and best time, no download required.',
    keywords: [
        'reaction time test', 'reaction test', 'visual reaction time',
        'human benchmark reaction test', 'ms reaction time', 'gamer reaction test',
        'click reaction time test', 'reflex test online', 'average reaction time gaming',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/reaction-time-test/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Reaction Time Test — Measure Your Visual Reaction Speed | DCPROSENS',
        description: 'Test your visual reaction time in milliseconds with a free online reaction test.',
        url: 'https://dcprosens.com/reaction-time-test/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reaction Time Test | DCPROSENS',
        description: 'Test your visual reaction time in milliseconds, free and online.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What a normal result looks like",
            body: [
                <>Average adult visual reaction sits around 250 ms. Regular FPS players usually land between 180 and 220 ms, and competitive players sometimes below 170 ms. Anything under 100 ms is a guess that happened to land, not a reaction.</>,
                <>Your first two attempts in a session are almost always slower than the rest. Discard them and take the median of the next five rather than the best of ten — the best single attempt measures luck.</>,
                <>The number includes display latency. The same hand tested on a 60 Hz laptop and a 240 Hz desktop can differ by 20 to 30 ms with no change in the person.</>,
            ],
        },
        {
            heading: "What actually improves it",
            body: [
                <>Sleep, by a wide margin. A tired player loses more reaction speed than any peripheral upgrade can return, and the loss is invisible from the inside.</>,
                <>Reducing input and display latency: a higher refresh monitor, a wired or 2.4 GHz mouse, and closing background applications typically buy more milliseconds than months of practice on the reaction itself.</>,
                <>Practice does help, but mostly by shortening the gap between recognising something and acting on it, not by making the recognition faster. Raw reaction is largely fixed; the decision that follows it is not.</>,
            ],
        },
        {
            heading: "Why reaction time matters less than players think",
            body: [
                <>Most fights in a tactical shooter are not decided by reaction — they are decided by who knew where to look. A player with a 220 ms reaction and correct crosshair placement beats a 160 ms player looking the wrong way, every time.</>,
                <>This is why professional players do not test dramatically faster than good amateurs. What separates them is anticipation built from game knowledge, which reads as speed but is not.</>,
                <>Treat a poor result as a reason to check your hardware and your sleep, not as a ceiling on how good you can get.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "What is a good reaction time for gaming?", a: "Between 180 and 220 ms is typical for regular FPS players. Below 170 ms is competitive. The average adult sits around 250 ms, and results under 100 ms are anticipation rather than reaction." },
        { q: "Does my monitor affect the result?", a: "Substantially. A 60 Hz panel adds roughly 8 ms of average display latency over a 240 Hz one before your hand is involved at all, so the same person can test 20 to 30 ms apart on different screens." },
        { q: "Can I train my reaction time?", a: "Modestly. Raw reaction is largely fixed, but the delay between recognising a stimulus and acting on it shortens with practice. Fixing sleep and reducing input latency usually buys more than training does." },
];

export default function ReactionTimeTestPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Reaction Time Test',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/reaction-time-test/',
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
                    { '@type': 'ListItem', position: 2, name: 'Reaction Time Test', item: 'https://dcprosens.com/reaction-time-test/' },
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
            <ToolExplainer
                intro={<>This test measures the time between a visual signal appearing and your click registering. That number includes your nervous system, your mouse, your monitor and the browser — which is why the result is more useful for spotting changes in your own setup than for comparing yourself against someone else&apos;s screenshot.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
