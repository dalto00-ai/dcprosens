import type { Metadata } from "next";
import WidgetGenerator from "@/components/WidgetGenerator";

export const metadata: Metadata = {
    title: "Sensitivity Widget for Streamers — Free",
    description:
        "Generate a free embeddable sensitivity widget for your Twitch panel, stream overlay, or bio link. Viewers see your settings and instantly convert them to their own game.",
    keywords: [
        "streamer sensitivity widget",
        "embed sensitivity converter",
        "twitch panel sensitivity",
        "stream overlay sensitivity",
        "sensitivity widget generator",
        "share my sensitivity",
    ],
    alternates: {
        canonical: "https://dcprosens.com/widget",
    },
    robots: { index: true, follow: true },
};

export default function WidgetPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "DCPROSENS Sensitivity Widget Generator",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        url: "https://dcprosens.com/widget",
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
        </div>
    );
}
