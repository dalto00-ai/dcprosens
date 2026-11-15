import type { Metadata } from "next";
import WidgetGenerator from "@/components/WidgetGenerator";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: "Sensitivity Widget for Streamers — Free",
    description:
        "Free embeddable widget for your Twitch panel or bio link. Viewers see your settings and convert them to their own game without leaving your page.",
    keywords: [
        "streamer sensitivity widget",
        "embed sensitivity converter",
        "twitch panel sensitivity",
        "stream overlay sensitivity",
        "sensitivity widget generator",
        "share my sensitivity",
    ],
    alternates: {
        canonical: "https://dcprosens.com/widget/",
    },
    robots: { index: true, follow: true },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What your viewers see",
            body: [
                <>Your name, your game, your DPI and in-game sensitivity, and your cm/360 — the number that actually transfers between games.</>,
                <>Below that, a compact converter. A viewer picks their own game and DPI and gets the sensitivity that reproduces your exact turn distance in their game, computed from each game&apos;s real yaw constant rather than an approximation.</>,
                <>It is read-only for them and requires no account on either side. Nothing is stored about who used it.</>,
            ],
        },
        {
            heading: "Where to put it",
            body: [
                <>Twitch panels accept iframe embeds in the panel description on most layouts, which is where the majority of &quot;what&apos;s your sens&quot; questions get answered.</>,
                <>A link-in-bio page works equally well and is often easier, since the widget is a standard iframe with no special requirements.</>,
                <>It also drops into a personal site or a Carrd page. The embed is a single line of HTML with no script tag and no dependencies.</>,
            ],
        },
        {
            heading: "Keeping it accurate",
            body: [
                <>The widget renders from the settings encoded in its URL, so it does not go stale on its own — but it also does not update itself when you change your sensitivity.</>,
                <>If you change your settings, regenerate the embed and replace the old code. A widget showing last season&apos;s sensitivity is worse than no widget, because viewers will train on it.</>,
                <>The generator is free and needs no account. There is no limit on how many you create or where you put them.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Is the streamer widget free?", a: "Yes, entirely, with no account required. Generate the embed code and paste it wherever you want it." },
        { q: "Does the widget update when I change my sensitivity?", a: "No. Your settings are encoded in the embed URL, so changing your sensitivity means regenerating the code and replacing it. That is deliberate — the widget keeps working even if nobody is signed in." },
        { q: "Where can I embed it?", a: "Anywhere that accepts an iframe: a Twitch panel, a link-in-bio page, a personal site or a stream overlay. It is one line of HTML with no script tag and no dependencies." },
];

export default function WidgetPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "DCPROSENS Sensitivity Widget Generator",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        url: "https://dcprosens.com/widget/",
        description:
            "Free embeddable widget generator that lets streamers share their gaming sensitivity, with a built-in converter so viewers can find their own equivalent.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    return (
        <div className="container" style={{ padding: "4rem 0 6rem", maxWidth: "780px" }}>
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
                    For Streamers & Creators
                </span>
                <h1 className="hero-title" style={{ marginBottom: "1.25rem" }}>
                    Your <span className="text-gradient">Sensitivity Widget</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: 0, maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
                    A small embeddable widget for your Twitch panel, bio link, or website. Viewers see
                    your sensitivity at a glance — and can instantly convert it to whatever game they play.
                    Free, no account needed.
                </p>
            </div>

            <WidgetGenerator />

            <div
                style={{
                    marginTop: "3.5rem",
                    maxWidth: "700px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                }}
            >
                <h2 style={{ color: "var(--text-primary)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Where to use it
                </h2>
                <ul style={{ paddingLeft: "1.25rem" }}>
                    <li>
                        <strong style={{ color: "var(--text-primary)" }}>Twitch panel:</strong> add it as a
                        custom panel image/link below your stream, or embed it directly on a Twitch panel
                        that supports HTML.
                    </li>
                    <li>
                        <strong style={{ color: "var(--text-primary)" }}>Your website or Linktree:</strong>{" "}
                        drop the iframe code anywhere HTML embeds are supported.
                    </li>
                    <li>
                        <strong style={{ color: "var(--text-primary)" }}>Discord bio / server info:</strong>{" "}
                        share the direct widget link — it works as a standalone page too, not just inside an
                        iframe.
                    </li>
                </ul>
                <p>
                    The widget always reflects the settings you enter below — if your sensitivity changes,
                    just generate a new link and swap it in wherever you embedded the old one.
                </p>
            </div>
            <ToolExplainer
                intro={<>The widget generator produces an iframe you can paste into a Twitch panel, a stream overlay or a bio link. It shows your current sensitivity and DPI, and gives your viewers a converter so they can translate your settings into whatever game they play — without leaving your page or asking you in chat for the hundredth time.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
