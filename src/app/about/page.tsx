import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { graph, breadcrumb, webPage } from "@/components/JsonLd";
import { games } from "@/lib/games";
import { posts } from "@/lib/posts";
import { pros } from "@/lib/pros";

const gameCount = games.length;
const postCount = posts.length;
const proCount = pros.length;

export const metadata: Metadata = {
    title: "About DCPROSENS — Founder Dalto Cardoso & How We Source Our Data",
    description:
        "Meet Dalto Cardoso (Dalto Outlier), founder of DCPROSENS & DCOUTLIER. Learn how every game's yaw value is sourced and verified, our correction policy, and how the platform is built.",
    alternates: { canonical: "https://dcprosens.com/about/" },
    openGraph: {
        title: "About DCPROSENS — Founder Dalto Cardoso & How We Source Our Data",
        description:
            "Meet Dalto Cardoso (Dalto Outlier), founder of DCPROSENS. How every game's yaw value is sourced and verified, our correction policy, and how the site is funded.",
        url: "https://dcprosens.com/about/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About DCPROSENS — Founder Dalto Cardoso",
        description: "How every game's yaw value is sourced and verified, and how the site is funded.",
        images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
};

const jsonLd = graph(
    webPage(
        "About DCPROSENS — Founder Dalto Cardoso",
        "Who builds DCPROSENS, how the yaw values are sourced and verified, and how the site is funded.",
        "/about/"
    ),
    breadcrumb([{ name: "About", path: "/about/" }]),
    {
        "@type": "Person",
        "@id": "https://dcprosens.com/about/#author",
        name: "Dalto Cardoso",
        alternateName: ["Dalto Outlier", "Dalto Cardoso dos Santos"],
        jobTitle: "Founder & Lead Developer, DCPROSENS (DCOUTLIER)",
        url: "https://dcprosens.com/about/",
        worksFor: {
            "@type": "Organization",
            "@id": "https://dcprosens.com#organization",
            name: "DCPROSENS",
            url: "https://dcprosens.com/",
        },
        sameAs: [
            "https://www.linkedin.com/in/dalto-cardoso-2a47ab122/",
            "https://www.instagram.com/dcprosensofficial/",
            "https://www.tiktok.com/@dcprosens",
            "https://x.com/dcprosens",
            "https://dcoutlier.com",
        ],
        knowsAbout: [
            "Mouse sensitivity conversion",
            "FPS game engine yaw constants",
            "eDPI and cm/360 calculation",
            "Competitive FPS peripherals",
            "Web application engineering",
        ],
    },
    {
        "@type": "Organization",
        "@id": "https://dcprosens.com#organization",
        name: "DCPROSENS",
        url: "https://dcprosens.com/",
        founder: { "@id": "https://dcprosens.com/about/#author" },
        logo: {
            "@type": "ImageObject",
            url: "https://dcprosens.com/logo.webp",
            width: 512,
            height: 512,
        },
        sameAs: [
            "https://www.linkedin.com/in/dalto-cardoso-2a47ab122/",
            "https://www.instagram.com/dcprosensofficial/",
            "https://www.tiktok.com/@dcprosens",
            "https://x.com/dcprosens",
            "https://chromewebstore.google.com/detail/dcprosens-sensitivity-con/hamlcadjopefnhcebjafcllomlphapbc",
            "https://play.google.com/store/apps/details?id=com.dcprosens.app",
        ],
    }
);

const sectionStyle: React.CSSProperties = { marginBottom: "2.75rem" };
const h2Style: React.CSSProperties = {
    fontSize: "1.3rem",
    fontWeight: 800,
    color: "var(--text-primary)",
    margin: "0 0 0.9rem",
};
const pStyle: React.CSSProperties = { margin: "0 0 1.1rem" };

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: "4rem 0", maxWidth: "820px" }}>
            <JsonLd data={jsonLd} />
            <h1 style={{ marginBottom: "0.75rem" }}>
                About <span className="text-gradient">DCPROSENS</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Founded, engineered, and maintained by <strong>Dalto Cardoso (Dalto Outlier)</strong> · Updated November 2026
            </p>

            {/* FOUNDER IDENTITY CARD (E-E-A-T VERIFIED PROFILE) */}
            <div
                style={{
                    background: "linear-gradient(135deg, rgba(0, 255, 157, 0.06) 0%, rgba(15, 23, 42, 0.85) 100%)",
                    border: "1px solid rgba(0, 255, 157, 0.28)",
                    borderRadius: "16px",
                    padding: "2rem",
                    marginBottom: "3rem",
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
                }}
            >
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.9rem",
                            fontWeight: 900,
                            color: "#05070d",
                            flexShrink: 0,
                            boxShadow: "0 0 24px rgba(0, 255, 157, 0.35)",
                        }}
                    >
                        DC
                    </div>

                    <div style={{ flex: "1", minWidth: "260px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                            <h2 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 800, color: "#ffffff" }}>
                                Dalto Cardoso <span style={{ color: "var(--text-muted)", fontWeight: 500, fontSize: "1.05rem" }}>(Dalto Outlier)</span>
                            </h2>
                            <span
                                style={{
                                    background: "rgba(0, 255, 157, 0.14)",
                                    color: "#00ff9d",
                                    fontSize: "0.72rem",
                                    fontWeight: 800,
                                    padding: "0.2rem 0.65rem",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(0, 255, 157, 0.35)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em",
                                }}
                            >
                                ✓ Verified Founder &amp; Lead Engineer
                            </span>
                        </div>

                        <p style={{ margin: "0 0 1rem 0", color: "var(--text-secondary)", fontSize: "0.96rem", lineHeight: 1.65 }}>
                            Software Developer, Digital Product Architect at <strong>DCOUTLIER</strong>, and Creator of{" "}
                            <strong>DCPROSENS</strong>. Specializing in high-precision web utilities, browser extensions,
                            and mathematical calibration tools for competitive FPS athletes worldwide.
                        </p>

                        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                            <a
                                href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/"
                                target="_blank"
                                rel="me noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.45rem 0.9rem",
                                    background: "rgba(10, 102, 194, 0.2)",
                                    border: "1px solid rgba(10, 102, 194, 0.55)",
                                    borderRadius: "8px",
                                    color: "#70b5f9",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                💼 LinkedIn (Dalto Cardoso) ↗
                            </a>
                            <a
                                href="https://www.instagram.com/dcprosensofficial/"
                                target="_blank"
                                rel="me noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.45rem 0.9rem",
                                    background: "rgba(225, 48, 108, 0.16)",
                                    border: "1px solid rgba(225, 48, 108, 0.45)",
                                    borderRadius: "8px",
                                    color: "#ff85b3",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                📸 Instagram (@dcprosensofficial) ↗
                            </a>
                            <a
                                href="https://www.tiktok.com/@dcprosens"
                                target="_blank"
                                rel="me noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.45rem 0.9rem",
                                    background: "rgba(0, 242, 234, 0.12)",
                                    border: "1px solid rgba(0, 242, 234, 0.4)",
                                    borderRadius: "8px",
                                    color: "#5ce1e6",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                🎵 TikTok (@dcprosens) ↗
                            </a>
                            <a
                                href="https://x.com/dcprosens"
                                target="_blank"
                                rel="me noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.45rem 0.9rem",
                                    background: "rgba(255, 255, 255, 0.06)",
                                    border: "1px solid rgba(255, 255, 255, 0.18)",
                                    borderRadius: "8px",
                                    color: "#e2e8f0",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                𝕏 @dcprosens ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ color: "var(--text-secondary)", lineHeight: 1.85 }}>
                <p style={{ ...pStyle, fontSize: "1.12rem", color: "var(--text-primary)" }}>
                    DCPROSENS converts mouse sensitivity between {gameCount} competitive games so that the physical
                    distance your hand travels for a full 360° turn stays identical from one game to the next. That
                    single number — cm/360 — is what your muscle memory is actually trained on, not the sensitivity
                    slider.
                </p>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>Who runs this site</h2>
                    <p style={pStyle}>
                        DCPROSENS is built and maintained by{" "}
                        <a
                            href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{ color: "var(--primary)", fontWeight: 600 }}
                        >
                            Dalto Cardoso
                        </a>{" "}
                        (known in the gaming and developer community as <strong>Dalto Outlier</strong>, founder of{" "}
                        <a
                            href="https://dcoutlier.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--primary)" }}
                        >
                            DCOUTLIER
                        </a>
                        ). Every calculator, every yaw value in the database, the Chrome Web Store extension, the
                        Android companion app, and every technical guide on this site was engineered or verified
                        directly by me — and my real name and LinkedIn profile are on the byline of each one so there
                        is a real person to hold accountable when something needs a correction.
                    </p>
                    <p style={pStyle}>
                        The project started because I kept switching between CS2, Valorant, and Apex Legends and could
                        not find a converter that transparently explained where its numbers came from. Most tools ask
                        you to trust a black box or lock basic conversion behind a paywall. That is a reasonable thing
                        to refuse, so DCPROSENS shows the exact engine constant, the mathematical formula, and the
                        sourcing notes for every conversion it performs.
                    </p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>How the numbers are produced</h2>
                    <p style={pStyle}>
                        Every conversion runs on one formula, and it is not a secret:
                    </p>
                    <p
                        style={{
                            ...pStyle,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "var(--radius-md)",
                            padding: "1rem 1.2rem",
                            fontFamily: "monospace",
                            fontSize: "0.92rem",
                            color: "var(--text-primary)",
                            overflowX: "auto",
                        }}
                    >
                        cm/360 = (360 × 2.54) ÷ (yaw × sensitivity × DPI)
                    </p>
                    <p style={pStyle}>
                        <strong style={{ color: "var(--text-primary)" }}>Yaw</strong> is the number of degrees the camera
                        rotates per single mouse count at sensitivity 1.0. It is a property of the game engine, not an
                        opinion. Valorant&apos;s is 0.07; CS2 and Apex Legends both use 0.022 because both run on Source
                        derivatives; Overwatch 2, Call of Duty and Destiny 2 share 0.0066. Games that share a yaw convert
                        1:1 at the same DPI, which is why a CS2 player moving to Apex can keep the same number.
                    </p>
                    <p style={pStyle}>
                        A game is only added once its yaw can be traced to a real source: an engine confirmation, a
                        published technical constant, or a developer statement. Where the best available figure is
                        community-measured rather than confirmed, it ships marked{" "}
                        <strong style={{ color: "var(--text-primary)" }}>unverified</strong> — in the game list, in the
                        conversion result, and in the machine-readable dataset at{" "}
                        <Link href="/llms.txt" style={{ color: "var(--primary)" }}>
                            llms.txt
                        </Link>
                        . Battlefield 2042 is currently one of those. Marking uncertainty is more useful than hiding it;
                        a converter that silently guesses is worse than no converter.
                    </p>
                    <p style={pStyle}>
                        Pro player settings ({proCount} players tracked) come from published team configs, official
                        settings pages and verified streams. Peripheral specs in the mouse and gear databases are
                        cross-checked against the manufacturer&apos;s own spec sheet and the live retail listing before
                        publication, because review-site aggregations drift.
                    </p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>What is on the site</h2>
                    <p style={pStyle}>
                        {gameCount} supported games, {proCount} pro player profiles, {postCount} written guides, and a set
                        of calculators that mostly exist because I wanted them and they did not exist elsewhere: the{" "}
                        <Link href="/psa-calculator/" style={{ color: "var(--primary)" }}>
                            PSA Method calculator
                        </Link>{" "}
                        for finding a sensitivity from scratch in seven steps, a{" "}
                        <Link href="/dpi-analyzer/" style={{ color: "var(--primary)" }}>
                            DPI analyzer
                        </Link>{" "}
                        that measures what your mouse actually reports versus what the box claims, a{" "}
                        <Link href="/mousepad-calculator/" style={{ color: "var(--primary)" }}>
                            mousepad size calculator
                        </Link>{" "}
                        that tells you whether your pad can physically contain your own 180° swipe, and a{" "}
                        <Link href="/desk-space-calculator/" style={{ color: "var(--primary)" }}>
                            desk space calculator
                        </Link>{" "}
                        for the same question one level up.
                    </p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>Corrections &amp; Editorial Accountability</h2>
                    <p style={pStyle}>
                        Games get patched and yaw values occasionally change with them. If a number here is wrong, tell
                        me on the{" "}
                        <Link href="/contact/" style={{ color: "var(--primary)" }}>
                            contact page
                        </Link>{" "}
                        with whatever evidence you have — a config file, a measured cm/360, a patch note — and I will
                        either fix it or explain why the current value stands. Corrections are made to the underlying
                        data, so every page that depends on the value updates at once.
                    </p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>How this is funded</h2>
                    <p style={pStyle}>
                        The converters, the pro database, the guides and the sensitivity test are free and always will
                        be. The site is funded by display advertising, an optional{" "}
                        <Link href="/pricing/" style={{ color: "var(--primary)" }}>
                            Pro subscription
                        </Link>{" "}
                        that unlocks the Aim Lab training modes and cloud profiles, our 18-volume{" "}
                        <Link href="/ebooks/" style={{ color: "var(--primary)" }}>
                            Esports Technical Field Guides
                        </Link>
                        , and affiliate links on some hardware pages.
                    </p>
                    <p style={pStyle}>
                        Where a hardware link earns a commission, that changes nothing about what gets recommended: the
                        mouse database lists weight, sensor, dimensions and switches so you can disagree with me from the
                        same data I used. No manufacturer has paid for placement, and no review on this site has been
                        supplied or approved by a brand.
                    </p>
                </section>

                <section style={{ marginBottom: 0 }}>
                    <h2 style={h2Style}>Official Channels &amp; Direct Contact</h2>
                    <p style={{ margin: 0, lineHeight: 2 }}>
                        <Link href="/contact/" style={{ color: "var(--primary)" }}>
                            Contact &amp; Coaching Form
                        </Link>{" "}
                        · <a href="mailto:support@dcprosens.com" style={{ color: "var(--primary)" }}>support@dcprosens.com</a> ·{" "}
                        <a
                            href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{ color: "var(--primary)" }}
                        >
                            LinkedIn (Dalto Cardoso)
                        </a>{" "}
                        ·{" "}
                        <a
                            href="https://www.instagram.com/dcprosensofficial/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{ color: "var(--primary)" }}
                        >
                            @dcprosensofficial on Instagram
                        </a>{" "}
                        ·{" "}
                        <a
                            href="https://www.tiktok.com/@dcprosens"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{ color: "var(--primary)" }}
                        >
                            @dcprosens on TikTok
                        </a>{" "}
                        ·{" "}
                        <a
                            href="https://x.com/dcprosens"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{ color: "var(--primary)" }}
                        >
                            @dcprosens on X
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
