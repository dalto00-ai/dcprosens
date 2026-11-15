import type { Metadata } from 'next';
import Link from 'next/link';
import { convertPairs } from '@/lib/convertPairs';

import JsonLd, { graph, breadcrumb, collectionPage } from '@/components/JsonLd';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';
export const metadata: Metadata = {
    title: 'Sensitivity Converter — All Game Pairs',
    description:
        'Direct sensitivity converters for the most-requested game pairs — Valorant, CS2, Apex, Fortnite, Overwatch 2 and more. Exact cm/360 match, no signup.',
    alternates: { canonical: 'https://dcprosens.com/convert/' },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Sensitivity Converter — All Game Pairs | DCPROSENS',
        description: 'Convert your mouse sensitivity between any two supported FPS games with an exact cm/360 match.',
        url: 'https://dcprosens.com/convert/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
};


const jsonLd = graph(
    collectionPage('Sensitivity Converters by Game Pair', 'Direct sensitivity converters for the most-requested game pairs, each with a conversion table and the real yaw-based formula.', '/convert/'),
    breadcrumb([{ name: 'Converters', path: '/convert/' }]),
);


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "What a conversion actually preserves",
            body: [
                <>One thing: cm/360, the physical distance your mouse travels for a full turn. That is what your hands are trained on, and it is the only quantity that means the same thing in every game.</>,
                <>It does not preserve how the game feels. Field of view, movement speed, weapon handling and ADS behaviour all differ, and none of them are a converter&apos;s job. A correct conversion that feels unfamiliar is still correct.</>,
                <>It does not preserve your ADS or scope sensitivity either, because most games express those as a separate multiplier. Convert hipfire first, then set each scope for a focal-length match.</>,
            ],
        },
        {
            heading: "Where the multipliers come from",
            body: [
                <>Each game has a yaw constant — the degrees the camera rotates per single mouse count at sensitivity 1.0. The multiplier between two games is simply the ratio of their constants.</>,
                <>Valorant is 0.07, CS2 and Apex are both 0.022, Overwatch 2 and Call of Duty are 0.0066, Rainbow Six Siege is 0.00572, Fortnite is 0.005555. Games sharing a constant convert 1:1 at the same DPI, which is why CS2 and Apex need no calculation at all.</>,
                <>Every constant is traced to an engine confirmation or a published technical source before a game ships here. Where the best available figure is community-measured, it is marked unverified rather than presented as settled.</>,
            ],
        },
        {
            heading: "Getting the setup right around the conversion",
            body: [
                <>Set Windows pointer speed to 6/11 and turn off Enhance Pointer Precision before converting anything. Any other value makes the operating system scale your input before the game sees it, so the number you calculate is applied to something that has already been altered.</>,
                <>Enable raw input in every game that offers it, which bypasses the Windows pointer pipeline entirely.</>,
                <>Keep your DPI the same across games and let the in-game sensitivity carry the conversion. Changing DPI means recalculating every game instead of one.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "How accurate are these conversions?", a: "Exact, within the precision of each game's sensitivity slider. The multiplier is a ratio of two engine constants, not an estimate — the only imprecision is the number of decimal places a game lets you enter." },
        { q: "Why does the converted sensitivity feel wrong?", a: "Because a conversion preserves turn distance and nothing else. Field of view, movement speed and ADS multipliers all change between games. Check Windows pointer speed is on 6/11 first, then give it a week." },
        { q: "Do I need to convert my DPI too?", a: "No. Keep DPI the same and let the in-game sensitivity carry the conversion. DPI is a hardware setting shared across every game; changing it means recalculating all of them." },
];

export default function ConvertIndexPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <JsonLd data={jsonLd} />
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Sensitivity <span className="text-gradient">Converter</span>
                </h1>
                <p className="hero-subtitle">
                    Pick a game pair to convert your exact cm/360 with the real yaw-based formula — no signup required.
                </p>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}
            >
                {convertPairs.map((pair) => (
                    <Link
                        key={pair.slug}
                        href={`/convert/${pair.slug}/`}
                        className="card"
                        style={{ padding: '1.5rem', textAlign: 'center', textDecoration: 'none' }}
                    >
                        <strong>{pair.fromLabel}</strong> → <strong>{pair.toLabel}</strong>
                    </Link>
                ))}
            </div>
            <ToolExplainer
                intro={<>These pages handle the specific game-to-game conversions people ask for most, each with the exact multiplier, a conversion table at common DPI values, and the yaw constants the maths comes from. If your pair is not listed, the universal converter on the home page covers all 87 supported games.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
