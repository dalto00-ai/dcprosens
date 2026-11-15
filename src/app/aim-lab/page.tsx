import type { Metadata } from "next";
import AimLabGated from "@/components/AimLabGated";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: "Aim Lab — Premium Precision Training",
    description:
        "Four aim-training modes — Micro-Flick, Dynamic Click Timing, Strafe Peek and Ghost vs Pro — played at a real pro player's exact sensitivity.",
    keywords: [
        "premium aim trainer",
        "micro flick training",
        "strafe peek trainer",
        "csgo valorant flick training",
        "aim training pro sensitivity",
        "dynamic click timing",
    ],
    alternates: {
        canonical: "https://dcprosens.com/aim-lab/",
    },
    robots: { index: true, follow: true },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "The four modes and what each one trains",
            body: [
                <>Micro-Flick isolates short-distance target acquisition: the movement between a crosshair already near a target and the target itself. This is the motion that decides most duels, and it is the one that degrades fastest when you change sensitivity.</>,
                <>Dynamic Click Timing separates aim from trigger discipline by making the valid window move. Players who are mechanically accurate but keep losing fights often find their problem here rather than in their aim.</>,
                <>Strafe Peek trains stopping. Targets appear as you move, and the score rewards coming to a genuine halt before clicking — the same skill counter-strafing depends on in CS2 and Valorant.</>,
                <>Ghost vs Pro runs your attempt against a recorded professional&apos;s sensitivity and pace, so the comparison is against a real standard rather than an arbitrary score threshold.</>,
            ],
        },
        {
            heading: "How to use it without wasting the time",
            body: [
                <>Twenty to thirty focused minutes beats two distracted hours. Mechanical learning depends on attention, and attention on a repetitive task drops sharply past half an hour.</>,
                <>Train the mode you are worst at, not the one you enjoy. The scoreboard you want to move is your rank, and rank moves when the weakest link improves.</>,
                <>Finish on a difficulty you can hit consistently. The last pattern of a session is the one that consolidates, so ending on repeated failure trains the failure.</>,
            ],
        },
        {
            heading: "Why sensitivity matters here more than anywhere else",
            body: [
                <>Every score in Aim Lab is anchored to the sensitivity you used. Training at one cm/360 and playing at another does not transfer — it builds a second, competing calibration.</>,
                <>Set your real sensitivity before your first session, and treat any change to it as a reason to discard your history rather than compare against it.</>,
                <>If you do not have a settled sensitivity yet, the free sensitivity test and the PSA calculator are the right places to start. Training on a number you are still changing is the most common way players spend months without improving.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Do I need a subscription for Aim Lab?", a: "Aim Lab is a premium feature, unlockable with the full Pro subscription or as a standalone one-time purchase. The sensitivity test and the browser aim trainer are free and unlimited." },
        { q: "Does Aim Lab use my real in-game sensitivity?", a: "Yes. It reads your saved DPI and sensitivity and applies the same cm/360 through Pointer Lock, so the hand movement you practise is the hand movement the game asks for." },
        { q: "How often should I train?", a: "Four or five days a week with genuine rest days. Motor learning consolidates during rest rather than during practice, and daily training with no recovery progresses more slowly than a schedule with breaks." },
];

export default function AimLabPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "DCPROSENS Aim Lab",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        url: "https://dcprosens.com/aim-lab/",
        description:
            "Premium browser-based aim training with four distinct modes: Micro-Flick, Dynamic Click Timing, Strafe Peek, and Ghost vs Pro.",
        offers: { "@type": "Offer", price: "4.99", priceCurrency: "USD" },
    };

    return (
        <div className="container" style={{ padding: "4rem 0 6rem" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <span
                    style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                        color: "#000",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "0.35rem 1.25rem",
                        borderRadius: "9999px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: "1.25rem",
                    }}
                >
                    🔒 Premium Training
                </span>
                <h1 className="hero-title" style={{ marginBottom: "1.25rem" }}>
                    <span className="text-gradient">Aim Lab</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: 0, maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
                    Four training modes that go beyond the free aim trainer — including one that lets you
                    physically feel a pro player&apos;s exact real sensitivity. Every session is saved to
                    your history automatically.
                </p>
            </div>

            <AimLabGated />
            <ToolExplainer
                intro={<>Aim Lab is four training modes built around the specific failure patterns that show up in competitive FPS play, each rendered on an HTML5 canvas using the Pointer Lock API so your real sensitivity applies exactly as it does in game. Nothing here scales your input — the cm/360 you train at is the cm/360 you play at.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
