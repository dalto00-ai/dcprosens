import type { Metadata } from 'next';
import CpsTest from '@/components/CpsTest';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'CPS Test — Click Speed Test (Clicks Per Second)',
    description:
        'Test your clicks per second (CPS) with a free online click speed test. Choose 5s, 10s, 30s, or 60s and see if you can beat your record.',
    keywords: [
        'cps test', 'click speed test', 'clicks per second test', 'cps checker',
        'mouse click test', 'cps test 5 seconds', 'cps test 10 seconds',
        'how many clicks per second', 'click speed calculator', 'jitter clicking test',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/cps-test/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'CPS Test — Click Speed Test | DCPROSENS',
        description: 'Test your clicks per second (CPS) with a free online click speed test.',
        url: 'https://dcprosens.com/cps-test/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CPS Test | DCPROSENS',
        description: 'Test your clicks per second with a free online click speed test.',
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
            heading: "The three techniques",
            body: [
                <>Normal clicking is one finger, one press per click. Most people land between 6 and 9 CPS, and it is the only mode that reflects what you actually do in a shooter.</>,
                <>Jitter clicking tenses the forearm to produce a tremor that the mouse reads as rapid clicks. It can reach 10 to 14 CPS and carries a genuine risk of strain injury with sustained use.</>,
                <>Drag clicking drags a finger across the mouse button so surface friction produces multiple registrations from one motion. Scores can exceed 20 CPS, and it depends heavily on the button coating rather than on the player.</>,
            ],
        },
        {
            heading: "What CPS is and is not good for",
            body: [
                <>It matters in Minecraft PvP, where hit rate is tied to click rate, and in a small number of other games with click-driven combat.</>,
                <>It matters almost not at all in tactical shooters. CS2 and Valorant reward the timing and accuracy of a single click, and spamming faster does not improve either.</>,
                <>If your goal is FPS aim, the sensitivity test and the aim trainer measure something that will actually change your results. CPS is a fun benchmark, not a competitive one.</>,
            ],
        },
        {
            heading: "A word on strain",
            body: [
                <>Jitter clicking works by deliberately tensing the forearm to induce a tremor, which is close to the opposite of what you want your arm doing for hours a day.</>,
                <>If you feel any tingling, aching or numbness in the forearm or wrist, stop. Repetitive strain injuries from clicking techniques are well documented and are far harder to reverse than to avoid.</>,
                <>No leaderboard position is worth a hand that hurts when you use it.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "What is a good CPS score?", a: "For normal clicking, 6 to 9 clicks per second is typical and above 10 is high. Jitter clicking reaches 10 to 14, and drag clicking can exceed 20 — but those are different techniques and are not comparable to normal clicking." },
        { q: "Does CPS matter in CS2 or Valorant?", a: "Very little. Both reward the timing and accuracy of one click, not how many you can produce. CPS matters in Minecraft PvP and a small number of click-driven games." },
        { q: "Is drag clicking bad for my mouse?", a: "It wears the button coating and shortens switch life noticeably, and some mice cannot register it at all. It also puts unusual strain on your hand, which is the more important cost." },
];

export default function CpsTestPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS CPS Test',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/cps-test/',
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
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'CPS Test', item: 'https://dcprosens.com/cps-test/' },
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
            <ToolExplainer
                intro={<>This test counts clicks per second across a fixed window, in normal, jitter and drag modes. The three modes measure genuinely different techniques, and the numbers they produce are not comparable to each other — a strong drag score and a strong normal-click score come from different mechanics.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
