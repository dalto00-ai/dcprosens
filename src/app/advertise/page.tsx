import type { Metadata } from "next";
import Link from "next/link";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: "Advertise With DCPROSENS",
    description:
        "Reach a highly engaged, gear-buying audience of competitive FPS players. Advertise on DCPROSENS's sensitivity converter, blog, and training tools.",
    alternates: {
        canonical: "https://dcprosens.com/advertise/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "Advertise With DCPROSENS",
        description:
            "Reach a highly engaged, gear-buying audience of competitive FPS players.",
        url: "https://dcprosens.com/advertise/",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const AUDIENCE_POINTS = [
    {
        title: "High purchase intent",
        desc: "Visitors come here specifically to dial in sensitivity, DPI, and gear — the exact moment they're most likely to research or buy a new mouse, monitor, keyboard, or mousepad.",
    },
    {
        title: "Core FPS audience",
        desc: "Valorant, CS2, Apex Legends, Overwatch, and other competitive shooter players — not a general gaming audience diluted across genres.",
    },
    {
        title: "Tool-driven, repeat visits",
        desc: "Our converter, DPI calculator, and aim trainers are utilities players come back to every time they tweak a setting or switch games — not a one-and-done article read.",
    },
    {
        title: "Global reach",
        desc: "Traffic spans North America, Europe, and Asia, reflecting the global footprint of Valorant, CS2, and Apex competitive scenes.",
    },
];

const PLACEMENT_OPTIONS = [
    {
        name: "Blog & Guide Sponsorships",
        desc: "Native placements inside our gear comparison articles and guides — the highest-intent content on the site, read by people actively deciding what to buy.",
    },
    {
        name: "Display Banners",
        desc: "Standard IAB banner sizes across the blog and article pages — leaderboard, medium rectangle, skyscraper, and mobile formats.",
    },
    {
        name: "Newsletter & Email",
        desc: "Reach our subscriber list directly with a dedicated or co-branded send.",
    },
    {
        name: "Custom Integrations",
        desc: "Product mentions in gear guides, database listings, or a dedicated review — talk to us about what fits your brand.",
    },
];


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "Who reads this site",
            body: [
                <>Players actively tuning their settings, arriving mostly from searches for sensitivity conversion, DPI guidance and pro player configurations. The traffic is overwhelmingly desktop, which is unusual and reflects that people arrive while sitting at the machine they are configuring.</>,
                <>The audience skews toward Valorant, CS2, Apex Legends, Overwatch 2 and Call of Duty, with a long tail across 87 supported games.</>,
                <>Geographic distribution is broad, with the United States, Europe and Southeast Asia as the largest clusters.</>,
            ],
        },
        {
            heading: "What placements are available",
            body: [
                <>Display placements on the tool and guide pages, sold through standard networks.</>,
                <>Direct sponsorship of a specific tool or guide, where relevance is high and the placement can be genuinely useful rather than interruptive.</>,
                <>Hardware listings in the mouse and gear databases. Inclusion is based on published specifications, and a paid placement does not change how a product is ranked or described — the specs are shown so readers can disagree with any ranking.</>,
            ],
        },
        {
            heading: "What is not for sale",
            body: [
                <>Editorial recommendations. No manufacturer has paid for placement in a guide, and no review on this site has been supplied or approved by a brand.</>,
                <>Removal of a negative specification. If a mouse is heavy or a pad is inconsistent, that stays on the page.</>,
                <>This matters commercially as well as ethically: an audience that trusts the hardware pages is worth more to an advertiser than one that has learned not to.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "What advertising formats are available?", a: "Display placements on tool and guide pages, direct sponsorship of a specific tool or guide, and listings in the mouse and gear databases. Contact us for current rates and the media kit." },
        { q: "Can I pay for a positive review?", a: "No. Hardware entries are ranked on published specifications, and those specifications are shown so readers can disagree with the ranking. No review here has been supplied or approved by a brand." },
        { q: "Who is the audience?", a: "Competitive FPS players actively configuring their setup — mostly desktop traffic arriving from sensitivity, DPI and pro-settings searches, concentrated in Valorant, CS2, Apex Legends, Overwatch 2 and Call of Duty." },
];

export default function AdvertisePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Advertise With DCPROSENS",
        description:
            "Reach a highly engaged, gear-buying audience of competitive FPS players on DCPROSENS.",
        url: "https://dcprosens.com/advertise/",
    };

    return (
        <div className="container" style={{ padding: "4rem 0 6rem" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
                    📢 Partner With Us
                </span>
                <h1 className="hero-title" style={{ marginBottom: "1.25rem" }}>
                    Advertise with <span className="text-gradient">DCPROSENS</span>
                </h1>
                <p
                    className="hero-subtitle"
                    style={{ maxWidth: "680px", margin: "0 auto" }}
                >
                    Put your brand in front of competitive FPS players at the exact moment
                    they&apos;re researching gear, sensitivity, and setup decisions.
                </p>
            </div>

            {/* Why advertise with us */}
            <section style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1.75rem", textAlign: "center" }}>
                    Why advertise with us
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {AUDIENCE_POINTS.map((point) => (
                        <div
                            key={point.title}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-lg, 12px)",
                                padding: "1.75rem",
                            }}
                        >
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.6rem", color: "var(--text-primary)" }}>
                                {point.title}
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, fontSize: "0.95rem" }}>
                                {point.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Placement options */}
            <section style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1.75rem", textAlign: "center" }}>
                    Placement options
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {PLACEMENT_OPTIONS.map((opt) => (
                        <div
                            key={opt.name}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-md, 8px)",
                                padding: "1.5rem 1.75rem",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem 1.5rem",
                                alignItems: "baseline",
                            }}
                        >
                            <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: "220px" }}>
                                {opt.name}
                            </span>
                            <span style={{ color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, minWidth: "240px" }}>
                                {opt.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section
                style={{
                    textAlign: "center",
                    background: "linear-gradient(135deg, rgba(0, 255, 157, 0.06) 0%, rgba(112, 0, 255, 0.04) 100%)",
                    border: "1px solid var(--primary)",
                    borderRadius: "var(--radius-lg, 12px)",
                    padding: "3rem 2rem",
                }}
            >
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.75rem" }}>
                    Let&apos;s talk
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
                    Tell us about your brand and goals, and we&apos;ll send current traffic
                    numbers, audience breakdown, and rates.
                </p>
                <a
                    href="mailto:support@dcprosens.com?subject=Advertising%20Inquiry"
                    style={{
                        display: "inline-block",
                        padding: "0.9rem 2.5rem",
                        background: "var(--primary)",
                        color: "#000",
                        fontWeight: 800,
                        borderRadius: "9999px",
                        textDecoration: "none",
                        fontSize: "1rem",
                    }}
                >
                    support@dcprosens.com →
                </a>
                <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Or see our <Link href="/media-kit.pdf" style={{ color: "var(--primary)" }}>media kit (PDF)</Link> for rates and placements.
                </p>
            </section>
            <ToolExplainer
                intro={<>DCPROSENS reaches competitive FPS players at the moment they are configuring their setup — choosing a mouse, sizing a mousepad, deciding on a monitor. That is a narrow audience with unusually high purchase intent for peripherals, and it is the only audience this site has.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
