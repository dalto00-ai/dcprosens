import type { Metadata } from "next";
import Link from "next/link";
import NotifyMeForm from "@/components/NotifyMeForm";

import JsonLd, { graph, breadcrumb, webPage } from "@/components/JsonLd";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';
export const metadata: Metadata = {
    title: "GTA VI Sensitivity Converter — Coming Soon",
    description: "GTA VI has no verified yaw value yet, so no converter can be accurate. Sign up and we'll email you the moment the real constant is confirmed.",
    keywords: [
        'gta vi sensitivity', 'gta 6 sensitivity converter', 'gta vi mouse sensitivity',
        'gta 6 aim settings', 'gta vi sens converter',
    ],
    alternates: {
        canonical: "https://dcprosens.com/gta-vi-sensitivity/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "GTA VI Sensitivity Converter — Coming Soon",
        description: "Sign up to get notified the moment our GTA VI sensitivity converter goes live, with real verified data.",
        type: "website",
        url: "https://dcprosens.com/gta-vi-sensitivity/",
    },
    robots: {
        index: true,
        follow: true,
    },
};


const jsonLd = graph(
    webPage("GTA VI Sensitivity Converter", "What is known about GTA VI mouse sensitivity and how DCPROSENS will convert it once the real yaw value is confirmed.", "/gta-vi-sensitivity/"),
    breadcrumb([{ name: "GTA VI Sensitivity", path: "/gta-vi-sensitivity/" }]),
);


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "Why we are not guessing",
            body: [
                <>A wrong yaw constant is worse than no converter. It produces a number that looks authoritative, and players build muscle memory on it for weeks before discovering the mismatch.</>,
                <>Every game on this site ships only once its constant traces to an engine confirmation, a published technical value, or a measurement anyone can reproduce. Where the best available figure is community-measured, it ships marked unverified rather than presented as settled.</>,
                <>GTA VI does not currently meet either bar on PC, so it is not in the converter.</>,
            ],
        },
        {
            heading: "What we can say now",
            body: [
                <>Rockstar&apos;s recent titles have exposed separate sensitivity settings for on-foot, aiming, and vehicles, and those have historically used different scales from each other. Expect to set three values rather than one.</>,
                <>Aim assist will almost certainly be present and should be turned off for mouse input. It is designed to compensate for a controller stick&apos;s lower precision, and applied to a mouse it fights the movement you are already making.</>,
                <>Windows pointer speed at 6/11 with Enhance Pointer Precision off, plus raw input where the game offers it, will matter here exactly as much as they do everywhere else.</>,
            ],
        },
        {
            heading: "What happens when it launches",
            body: [
                <>The yaw value gets measured, sourced and added to the converter, and every per-game page and dataset updates from the same underlying data at once.</>,
                <>If the launch value turns out to be unstable across patches, the entry will say so rather than quietly changing underneath people who already set their sensitivity from it.</>,
                <>Sign up above and you will get one email when it is live. No other use is made of the address.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Is there a GTA VI sensitivity converter?", a: "Not yet. A converter needs the game's yaw constant, and until the PC version ships and that value can be measured or sourced, publishing one would mean guessing. Sign up and you will be emailed when it is live." },
        { q: "What settings will matter in GTA VI on PC?", a: "Expect separate on-foot, aiming and vehicle sensitivities, as in Rockstar's recent titles. Turn aim assist off for mouse input, set Windows pointer speed to 6/11, and enable raw input if the game offers it." },
        { q: "Why not publish an estimated value now?", a: "Because a wrong constant looks exactly as authoritative as a right one, and players build weeks of muscle memory on it before the mismatch shows up. No converter is better than a confidently wrong one." },
];

export default function GtaViSensitivityPage() {
    return (
        <div className="container" style={{ padding: '5rem 0 7rem', maxWidth: '650px', textAlign: 'center' }}>
            <JsonLd data={jsonLd} />
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
                marginBottom: '1.5rem',
            }}>
                🚧 Coming Soon
            </span>
            <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                GTA VI <span className="text-gradient">Sensitivity Converter</span>
            </h1>
            <p className="hero-subtitle" style={{ marginBottom: '2.5rem' }}>
                GTA VI hasn&apos;t launched yet, so nobody — including us — has verified sensitivity/yaw data for it.
                We won&apos;t publish guessed numbers and call them accurate. The moment the game is out and we&apos;ve
                confirmed real conversion data, this page becomes a full converter.
            </p>

            <NotifyMeForm topic="gta-vi" />

            <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.85rem', marginTop: '3rem' }}>
                In the meantime, check out our <Link href="/" style={{ color: 'var(--primary, #00ff9d)' }}>universal sensitivity converter</Link> for
                18+ already-supported games, or explore <Link href="/pros/" style={{ color: 'var(--primary, #00ff9d)' }}>pro player settings</Link>.
            </p>

            <div style={{ marginTop: '4rem', textAlign: 'left', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
                    GTA VI Mouse Settings: What We Actually Know So Far
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    Until GTA VI is out on PC and we can measure its real yaw constant, here&apos;s what&apos;s worth planning around based on Rockstar&apos;s own track record rather than leaks or guesswork:
                </p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <li><strong>GTA V shipped with mouse acceleration on by default</strong> and no native raw input toggle for years — third-party fixes were the only workaround. If GTA VI repeats that pattern, disabling acceleration in Windows first (Control Panel → Mouse → uncheck &quot;Enhance Pointer Precision&quot;) will matter before any sensitivity number does.</li>
                    <li><strong>First-person and third-person modes use different sensitivity scaling in GTA V</strong> on the same slider — expect the same split in VI. Whichever mode you plan to play in is the one worth calibrating for; the two won&apos;t share a single converted number.</li>
                    <li><strong>FOV sliders change effective sensitivity</strong> even at a fixed cm/360, since a wider FOV means more world passes under the same physical mouse movement. If VI ships an adjustable FOV slider (GTA V&apos;s was limited), that&apos;s one more variable to lock in before comparing your settings to anyone else&apos;s.</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                    Sign up above and we&apos;ll email you the moment the converter goes live — with a yaw value we&apos;ve actually measured, not one copied from a leak.
                </p>
            </div>
            <ToolExplainer
                intro={<>There is no GTA VI sensitivity converter here yet, and that is deliberate. A converter needs the game&apos;s yaw constant — the degrees the camera rotates per mouse count — and until the PC version ships and that value can be measured, anything published would be a guess presented as maths.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
