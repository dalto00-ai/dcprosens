import type { Metadata } from "next";
import PremiumGuard from "@/components/PremiumGuard";
import AimLab from "@/components/AimLab";

export const metadata: Metadata = {
    title: "Aim Lab — Premium Precision Training | DCPROSENS",
    description:
        "Four premium aim-training modes: Micro-Flick precision, Dynamic Click Timing, Strafe Peek reflex, and Ghost vs Pro — play using a real pro player's exact sensitivity.",
    keywords: [
        "premium aim trainer",
        "micro flick training",
        "strafe peek trainer",
        "csgo valorant flick training",
        "aim training pro sensitivity",
        "dynamic click timing",
    ],
    alternates: {
        canonical: "https://dcprosens.com/aim-lab",
    },
    robots: { index: true, follow: true },
};

export default function AimLabPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "DCPROSENS Aim Lab",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        url: "https://dcprosens.com/aim-lab",
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

            <PremiumGuard
                previewTitle="Aim Lab"
                altAccessField="aimLabAccess"
                altAccessPrice="$1"
                altAccessLabel="Aim Lab"
            >
                <AimLab />
            </PremiumGuard>
        </div>
    );
}
