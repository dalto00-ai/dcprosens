import type { Metadata } from "next";
import SensitivityTestGated from "@/components/SensitivityTestGated";

import JsonLd, { graph, breadcrumb, webPage } from "@/components/JsonLd";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';
export const metadata: Metadata = {
    title: "Sensitivity Test Game — Free Aim Test",
    description: "Free browser mini-game that measures your flick speed and precision, then tells you whether your sensitivity is too high, too low or balanced.",
    keywords: [
        'sensitivity test game', 'mouse sensitivity test', 'aim precision test',
        'flick test game', 'gaming sensitivity quiz', 'test my sensitivity',
        'valorant sensitivity test', 'cs2 sensitivity test', 'free aim test',
    ],
    alternates: {
        canonical: "https://dcprosens.com/sensitivity-test/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "Sensitivity Test Game — Find Your Speed & Precision",
        description: "Free mini-game that measures your flick speed and precision to help you dial in your mouse sensitivity.",
        type: "website",
        url: "https://dcprosens.com/sensitivity-test",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sensitivity Test Game | DCPROSENS",
        description: "Free mini-game that measures your flick speed and precision.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};


const jsonLd = graph(
    webPage("Free Sensitivity Test Mini-Game", "A free browser aim test that measures your tracking speed and precision using Pointer Lock, with no account required.", "/sensitivity-test/"),
    breadcrumb([{ name: "Sensitivity Test", path: "/sensitivity-test/" }]),
);


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What the test actually measures",
            body: [
                <>Each round spawns a target at a random position and records two numbers: the time from spawn to your first click, and how far your crosshair travelled beyond the target before settling. The first is acquisition speed, the second is overshoot.</>,
                <>A player whose sensitivity is too high shows fast acquisition with high overshoot — they get there quickly and then fight to stop. A player whose sensitivity is too low shows the reverse: clean stops, but too much time spent travelling. The balanced result is a moderate time with overshoot close to zero, and that is what the test looks for.</>,
                <>It uses the Pointer Lock API, so the browser hands your raw mouse movement straight to the canvas with no cursor acceleration in between. The movement it measures is the movement your hand made.</>,
            ],
        },
        {
            heading: "How to get a reading you can trust",
            body: [
                <>Warm up first. A cold hand overshoots on almost every attempt, and testing cold will tell you your sensitivity is too high when the real answer is that you had not played yet.</>,
                <>Run the test three times across different days rather than three times in a row. A single session measures how you felt in that session; three sessions measure your sensitivity.</>,
                <>Do not change anything between attempts. If you adjust your DPI or in-game sensitivity partway through, you are averaging two different setups and the result describes neither.</>,
            ],
        },
        {
            heading: "What to do with the result",
            body: [
                <>If the test says your sensitivity is too high, lower it by about 10% and play for a week before retesting. Steps larger than that are not adjustments — they are new sensitivities, and they reset the muscle memory you were trying to evaluate.</>,
                <>If it says balanced, the useful conclusion is to stop changing it. Most players who plateau are cycling through sensitivities that were all fine, and the cycling itself is what prevents improvement.</>,
                <>The test measures your hand against your current setup. It cannot tell you whether your mousepad is large enough for that setup — the mousepad calculator answers that, and a sensitivity that does not fit your pad will keep testing badly no matter what the number says.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Is the sensitivity test free?", a: "Yes. The test runs entirely in your browser with no account and no payment, and there is no limit on how many times you can take it." },
        { q: "Does the test work on a laptop trackpad?", a: "It will run, but the result will not be meaningful. The test measures mouse acquisition and overshoot, and a trackpad has completely different movement characteristics. Use a mouse on a real surface." },
        { q: "Why did I score worse than last time at the same sensitivity?", a: "Score varies with warm-up, fatigue and sleep more than most players expect. That is why the test is worth running across several days: one bad reading is normal variance, three in a row is a signal." },
];

export default function SensitivityTestPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem', maxWidth: '700px' }}>
            <JsonLd data={jsonLd} />
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{
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
                }}>
                    🎮 Free Mini-Game
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Sensitivity <span className="text-gradient">Test</span>
                </h1>
                <p className="hero-subtitle">
                    Hit the targets as fast and precisely as you can. We&apos;ll tell you whether your sensitivity looks too high, too low, or balanced.
                </p>
            </div>

            <SensitivityTestGated />
            <ToolExplainer
                intro={<>This test measures two separate things that a sensitivity number cannot tell you on its own: how quickly you can move your crosshair onto a target that appears somewhere unexpected, and how precisely you can stop on it once you get there. Those two abilities pull in opposite directions, and where you sit between them is what decides whether your current sensitivity is helping or fighting you.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
