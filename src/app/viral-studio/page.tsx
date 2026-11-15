import type { Metadata } from "next";
import ViralVideoStudio from "@/components/ViralVideoStudio";
import JsonLd, { graph, breadcrumb } from "@/components/JsonLd";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from "@/components/ToolExplainer";
import styles from "@/components/HardwareTools.module.css";

export const metadata: Metadata = {
    title: "Viral Gaming Video Studio — TikTok & Shorts 9:16 Generator",
    description:
        "Create 9:16 vertical gaming comparison reels and HUD sensitivity overlays for GTA VI, Valorant, CS2, and Warzone right in your browser.",
    keywords: [
        "gaming tiktok video generator",
        "gta 6 shorts video maker",
        "sensitivity comparison reel generator",
        "streamer overlay video maker",
        "9:16 gaming clip editor",
    ],
    alternates: {
        canonical: "https://dcprosens.com/viral-studio/",
    },
    openGraph: {
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS Viral Gaming Video Studio" }],
        title: "Viral Gaming Video Studio — TikTok & Shorts 9:16 Generator",
        description:
            "Build 9:16 sensitivity comparison reels and live HUD gameplay overlays for TikTok, Shorts, and Reels directly in your browser.",
        type: "website",
        url: "https://dcprosens.com/viral-studio/",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const jsonLd = graph(
    {
        "@type": "WebApplication",
        "@id": "https://dcprosens.com/viral-studio/#app",
        name: "DCPROSENS Viral Gaming Video Studio",
        url: "https://dcprosens.com/viral-studio/",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (Web Browser)",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description:
            "Browser-based 9:16 vertical video and HUD overlay generator for GTA VI, Valorant, CS2, and Warzone creators.",
    },
    breadcrumb([{ name: "Viral Video Studio", path: "/viral-studio/" }])
);

const explainerSections: ToolExplainerSection[] = [
    {
        heading: "Zero-Upload Client-Side 9:16 Rendering",
        body: [
            <>Every frame is rendered locally inside your browser using HTML5 Canvas and MediaRecorder hardware acceleration. Your gameplay clips never leave your device, so exports start instantly with zero upload queues.</>,
        ],
    },
    {
        heading: "Built for Live Streamers, TikTok Creators & Shorts Channels",
        body: [
            <>Use 1-click VS Comparison templates for GTA VI deadzones, Warzone conversions, and pro player eDPI duels, or overlay your live sensitivity HUD directly onto gameplay clips and copy a ready-made Nightbot <code>!gta6sens</code> chat command.</>,
        ],
    },
];

const explainerFaqs: ToolExplainerFaq[] = [
    {
        q: "How do free exports vs. the 100-video Creator Pack work?",
        a: "Every visitor gets 2 free 9:16 video exports with the DCPROSENS promotional watermark. Upgrading to the 100-Video Creator Pack ($14.99 — 50% OFF) or an active VIP membership removes the watermark and unlocks Pro templates.",
    },
    {
        q: "Are my gameplay clips uploaded to a server?",
        a: "No. Clip HUD Overlay mode composites your video 100% locally in your browser memory, keeping your raw footage private and rendering immediately.",
    },
];

export default function ViralStudioPage() {
    return (
        <div className={styles.pageContainer}>
            <JsonLd data={jsonLd} />

            <div className={styles.heroHeader}>
                <span className={styles.badge}>🎬 9:16 Creator Studio — Zero Server Wait</span>
                <h1 className={styles.heroTitle}>
                    Viral Gaming <span className="text-gradient">Video &amp; Live HUD Studio</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Generate high-retention 9:16 comparison reels and live HUD sensitivity overlays for TikTok, YouTube Shorts, and Twitch
                    in seconds. Start with 2 free exports or grab 100 watermark-free videos at 50% OFF.
                </p>
            </div>

            <ViralVideoStudio />

            <ToolExplainer
                intro={
                    <>
                        DCPROSENS Viral Video Studio turns sensitivity, deadzone, and pro-setup telemetry into ready-to-post 9:16 vertical
                        videos and stream overlay cards without heavyweight desktop editing suites.
                    </>
                }
                sections={explainerSections}
                faqs={explainerFaqs}
            />
        </div>
    );
}
