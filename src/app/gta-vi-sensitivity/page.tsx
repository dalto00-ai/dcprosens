import type { Metadata } from "next";
import Link from "next/link";
import GtaViCommandCenter from "@/components/GtaViCommandCenter";
import NotifyMeForm from "@/components/NotifyMeForm";
import JsonLd, { graph, breadcrumb } from "@/components/JsonLd";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from "@/components/ToolExplainer";
import styles from "@/components/HardwareTools.module.css";

export const metadata: Metadata = {
    title: "GTA VI Sensitivity Converter, Deadzone & Meta Loadout Calculator",
    description:
        "Calibrate your GTA VI 3-scale sensitivity (Third-Person, First-Person ADS, and 120 MPH Drive-By), PS5/Xbox stick deadzone, and Vice City meta weapon recoil.",
    keywords: [
        "gta vi sensitivity converter",
        "gta 6 controller settings",
        "gta 6 best deadzone settings",
        "gta 6 free aim sensitivity",
        "gta vi mouse sensitivity calculator",
        "warzone to gta 6 sensitivity",
        "fortnite to gta 6 sensitivity",
        "gta 6 meta weapons loadout",
        "gta 6 drive by aiming settings",
    ],
    alternates: {
        canonical: "https://dcprosens.com/gta-vi-sensitivity/",
    },
    openGraph: {
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — GTA VI Vice City Command Center" }],
        title: "GTA VI Sensitivity Converter, Deadzone & Meta Loadout Calculator",
        description:
            "Convert Warzone, Fortnite, Apex & GTA V sensitivity into GTA VI's 3-scale camera system, calibrate PS5/Xbox stick deadzones, and compare weapon recoil.",
        type: "website",
        url: "https://dcprosens.com/gta-vi-sensitivity/",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const jsonLd = graph(
    {
        "@type": "WebApplication",
        "@id": "https://dcprosens.com/gta-vi-sensitivity/#app",
        name: "GTA VI Vice City Command Center & Sensitivity Calculator",
        url: "https://dcprosens.com/gta-vi-sensitivity/",
        applicationCategory: "GameApplication",
        operatingSystem: "Any (Web Browser, PS5, Xbox Series X|S, PC)",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description:
            "Interactive 3-scale GTA VI sensitivity converter, live PS5 DualSense & Xbox controller deadzone calibrator, Vice City weapon TTK/recoil matrix, and 120Hz launch checklist.",
    },
    breadcrumb([{ name: "GTA VI Command Center", path: "/gta-vi-sensitivity/" }])
);

const explainerSections: ToolExplainerSection[] = [
    {
        heading: "How the Rockstar RAGE 3-Scale Camera Architecture Works",
        body: [
            <>Unlike single-slider tactical shooters, Rockstar&apos;s RAGE engine splits camera rotation across three independent scales: <strong>Third-Person Look/Aiming</strong>, <strong>First-Person On-Foot (FOV-dependent)</strong>, and <strong>Vehicle / Drive-By Camera Sensitivity</strong>. Copying a single number across all three leaves your first-person iron sights overly twitchy and your high-speed vehicle camera dangerously slow.</>,
            <>Our Command Center maps your existing muscle memory from Call of Duty: Warzone, Fortnite, Apex Legends, Valorant, CS2, or GTA V into all three scales simultaneously while compensating for your horizontal Field of View (FOV) and Free-Aim vs. Assisted-Aim combat profile.</>,
        ],
    },
    {
        heading: "Eliminating RAGE Stick Deadzone Delay on PS5 DualSense & Xbox",
        body: [
            <>Default Rockstar controller profiles apply a conservative center deadzone (often 12%–15%) combined with a slow exponential acceleration ramp. In Free-Aim lobbies or long-range gunfights past 35 meters, that deadzone creates a noticeable dead band where small right-stick micro-corrections produce zero crosshair movement.</>,
            <>Using Tab 2 of the Command Center (or our dedicated <Link href="/gamepad-tester/" style={{ color: "var(--primary, #00ff9d)" }}>Gamepad Stick Drift Tester</Link>), measure your controller&apos;s true resting deflection and set your in-game deadzone to exactly <strong>+1.5% above resting drift</strong> (typically 3%–6% on healthy ALPS sticks, or 1%–2% on Hall Effect / TMR modules) with <strong>85%–100% Aim Acceleration</strong>.</>,
        ],
    },
    {
        heading: "120 MPH Drive-By Tracking & Vice City Weapon Recoil Control",
        body: [
            <>High-speed vehicle chases across Leonida require decoupling steering from firing. Always switch <strong>Drive-By Control</strong> from single-button firing to <strong>Aim + Fire (L2+R2 / LT+RT)</strong>, set <strong>Vehicle Camera Height to High</strong>, and disable <strong>First-Person Auto-Center</strong> so the camera never fights your thumbstick during a corner drift.</>,
            <>When transitioning from submachine guns inside vehicles to tactical rifles at mid-range, use the Weapon &amp; Recoil Matrix in Tab 3 to match your ADS sensitivity multiplier to your optic zoom and barrel/grip combination.</>,
        ],
    },
];

const explainerFaqs: ToolExplainerFaq[] = [
    {
        q: "How do I convert my Warzone, Fortnite, or Apex sensitivity to GTA VI?",
        a: "Select your primary game in Tab 1 of the GTA VI Command Center, choose Controller (PS5/Xbox) or Mouse & Keyboard, and enter your current sensitivity. The calculator outputs your exact Third-Person, First-Person ADS, Vehicle Drive-By, and Sniper Scope slider percentages.",
    },
    {
        q: "What is the best controller deadzone and acceleration setting for GTA VI?",
        a: "For healthy PS5 DualSense and Xbox Series controllers, set your Right Stick Deadzone between 3% and 6% (or 1%–2% on Hall Effect/TMR controllers) and increase Aim Acceleration to 85%–100%. This removes the sluggish center delay while preventing phantom camera drift.",
    },
    {
        q: "Should I use Free-Aim or Assisted Aim in GTA VI?",
        a: "Assisted Aim - Full snaps onto close targets on foot but loses lock against fast-moving vehicles and targets beyond 35 meters. Competitive players use Free-Aim or Assisted Aim - Partial paired with a 35–42 cm/360° equivalent turn rate for consistent headshot tracking.",
    },
    {
        q: "What are the best vehicle camera settings for shooting while driving in Vice City?",
        a: "Set Vehicle Camera Height to High, First-Person Vehicle Auto-Center to Off, Drive-By Aiming Control to Aim + Fire (L2+R2 / LT+RT), and Third-Person Vehicle Sensitivity to 80%–90% so you can track targets smoothly during 120 MPH pursuits.",
    },
];

export default function GtaViSensitivityPage() {
    return (
        <div className={styles.pageContainer}>
            <JsonLd data={jsonLd} />

            <div className={styles.heroHeader}>
                <span className={styles.badge}>🌴 Vice City Launch Command Center — RAGE Engine Suite</span>
                <h1 className={styles.heroTitle}>
                    GTA VI <span className="text-gradient">Sensitivity, Deadzone &amp; Meta Hub</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Convert your sensitivity from Warzone, Fortnite, Apex, CS2, Valorant, or GTA V into GTA VI&apos;s 3-scale camera system,
                    calibrate your PS5 DualSense or Xbox controller deadzone in real time, and optimize your Vice City weapon recoil.
                </p>
            </div>

            {/* INTERACTIVE 4-TAB COMMAND CENTER */}
            <GtaViCommandCenter />

            {/* PRO EBOOK & DEEP-DIVE GUIDES BANNER */}
            <section className={styles.seoSection} style={{ marginTop: "2.5rem" }}>
                <h2>Master the RAGE Engine: Pro Field Guide &amp; Tactical Deep-Dives</h2>
                <p>
                    Want the complete 180-DPI telemetry charts, DualSense Edge &amp; Xbox Elite paddle layouts, and printable calibration
                    worksheets for Leonida? Explore our verified GTA VI engineering resources:
                </p>
                <div className={styles.linkGrid} style={{ marginTop: "1.25rem" }}>
                    <Link href="/ebooks/gta-6-pro-aim-controller-guide/" className={styles.linkCard} prefetch={false}>
                        <strong>📘 Vol 02: GTA VI Pro Aim &amp; Controller Field Guide</strong>
                        <span>RAGE Engine Deadzones, 0% MDM Scope Math &amp; DualSense/Xbox Pro Curves ($14.99 Instant PDF)</span>
                    </Link>
                    <Link href="/gamepad-tester/" className={styles.linkCard} prefetch={false}>
                        <strong>🎮 Live Gamepad &amp; Stick Drift Tester</strong>
                        <span>Test your PS5 or Xbox controller circularity error and resting drift before launch</span>
                    </Link>
                    <Link href="/blog/gta-6-drive-by-shooting-vehicle-camera-sensitivity/" className={styles.linkCard} prefetch={false}>
                        <strong>🏎️ GTA 6 120 MPH Drive-By Aiming Guide</strong>
                        <span>Vehicle camera height, L2+R2 separation, and high-speed tracking math</span>
                    </Link>
                    <Link href="/blog/how-to-practice-controller-free-aim-before-gta-6-launch/" className={styles.linkCard} prefetch={false}>
                        <strong>🎯 How to Practice Controller Free-Aim for GTA 6</strong>
                        <span>15-minute daily strafe-tracking protocol and Free-Aim vs. Assisted Aim telemetry</span>
                    </Link>
                </div>
            </section>

            {/* PATCH & PC RAW YAW ALERT FORM */}
            <div style={{ maxWidth: "650px", margin: "2.5rem auto 0", textAlign: "center" }}>
                <NotifyMeForm topic="gta-vi" />
            </div>

            <ToolExplainer
                intro={
                    <>
                        Calibrating for GTA VI requires balancing three distinct camera scales (On-Foot Third-Person, First-Person ADS,
                        and High-Speed Vehicle Tracking) alongside your controller&apos;s physical stick deadzone and 120Hz VRR display
                        pipeline. Use the reference breakdown below to lock in a zero-latency setup from Day 1.
                    </>
                }
                sections={explainerSections}
                faqs={explainerFaqs}
            />
        </div>
    );
}
