import type { Metadata } from "next";
import Link from "next/link";
import { dpiGuideContent } from "@/lib/dpiGuideContent";

import JsonLd, { graph, breadcrumb, collectionPage } from "@/components/JsonLd";
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';
export const metadata: Metadata = {
    title: "DPI & Mouse Settings Guides",
    description: "Best DPI and mouse settings for games that don't use a rotating first-person camera (MOBAs, mobile battle royales) — League of Legends, Dota 2, Free Fire and more.",
    alternates: {
        canonical: "https://dcprosens.com/dpi-guide/",
    },
    robots: { index: true, follow: true },
};


const jsonLd = graph(
    collectionPage("DPI Guides for Non-FPS-Camera Games", "Mouse and DPI guidance for games without a rotating first-person camera, where a yaw-based converter does not apply.", "/dpi-guide/"),
    breadcrumb([{ name: "DPI Guides", path: "/dpi-guide/" }]),
);


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "Why a converter does not apply here",
            body: [
                <>A sensitivity converter works by matching the degrees a camera rotates per mouse count. A game with a fixed overhead camera has no such value — moving the mouse moves a pointer across a plane, not a viewpoint through an angle.</>,
                <>That means there is no correct multiplier between League of Legends and Valorant, and any tool offering one is inventing it. What transfers between them is DPI, because that is a property of your hardware rather than of either game.</>,
                <>These guides therefore answer a different question: what DPI and cursor settings do players of these games actually use, and why.</>,
            ],
        },
        {
            heading: "What matters instead",
            body: [
                <>DPI, which decides how far the cursor travels per centimetre of hand movement. Most MOBA players sit between 800 and 1600, higher than the FPS norm because the useful movement is across a screen rather than through a rotation.</>,
                <>Windows pointer speed at 6/11 with Enhance Pointer Precision off, for the same reason it matters in a shooter: any other setting makes the operating system scale your input before the game receives it.</>,
                <>Screen resolution, which does matter here in a way it does not for FPS aim. A higher resolution genuinely requires more cursor travel to cross the same fraction of the screen.</>,
            ],
        },
        {
            heading: "Getting a consistent feel across both kinds of game",
            body: [
                <>Keep one DPI everywhere and adjust each game&apos;s own sensitivity or cursor setting around it. That way your hardware behaves identically no matter what you launch.</>,
                <>If you play both a shooter and a MOBA seriously, expect the two to feel different regardless of settings — one is a rotation task and the other is a positioning task, and no configuration merges them.</>,
                <>What you can carry across is the discipline: one DPI, pointer speed at 6/11, acceleration off, and no changes made on a day you played badly.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Why can't I convert my sensitivity to League of Legends?", a: "Because League has no rotating first-person camera, so it has no yaw constant. Moving the mouse moves a cursor across a plane rather than rotating a viewpoint, and there is no equivalent quantity to match." },
        { q: "What DPI should I use for MOBAs?", a: "Most players sit between 800 and 1600, higher than the FPS norm, because the useful movement is travel across the screen rather than a camera rotation. Screen resolution genuinely matters here in a way it does not for FPS aim." },
        { q: "Do these games have mouse acceleration?", a: "They inherit whatever Windows applies. Set pointer speed to 6/11 and turn off Enhance Pointer Precision, and the games will receive your raw movement unchanged." },
];

export default function DpiGuideIndexPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem', maxWidth: '700px' }}>
            <JsonLd data={jsonLd} />
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    DPI & Mouse <span className="text-gradient">Settings Guides</span>
                </h1>
                <p className="hero-subtitle">
                    These games don&apos;t use a rotating first-person camera, so there&apos;s no cm/360 sensitivity to convert —
                    what matters instead is DPI and click precision. See our{' '}
                    <Link href="/" style={{ color: 'var(--primary)' }}>full sensitivity converter</Link> for FPS and third-person games.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {dpiGuideContent.map((g) => (
                    <Link
                        key={g.gameId}
                        href={`/dpi-guide/${g.gameId}/`}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem 1.5rem',
                            textDecoration: 'none',
                        }}
                    >
                        <div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{g.displayName}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{g.genre}</div>
                        </div>
                        <span style={{ color: 'var(--primary)' }}>→</span>
                    </Link>
                ))}
            </div>
            <ToolExplainer
                intro={<>Some games have no rotating first-person camera, so there is no yaw constant and no cm/360 to convert. League of Legends, Dota 2 and Free Fire on emulator all move a cursor rather than a camera, and for those the useful settings are DPI, Windows pointer speed and the game&apos;s own cursor options.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
