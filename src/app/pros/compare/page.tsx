import type { Metadata } from 'next';
import ProCompare from '@/components/ProCompare';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'Pro Settings Compare Tool — Valorant & CS2',
    description:
        'Put pro settings side by side: eDPI, cm/360, mouse, keyboard, headset and monitor for TenZ, s1mple, aspas, ZywOo and more.',
    keywords: [
        'compare pro player settings', 'pro gaming gear comparison', 'tenz vs s1mple sensitivity',
        'aspas vs demon1 dpi', 'cs2 pro gear compared', 'valorant sensitivity compare',
        'eDPI compare tool', 'cm/360 compare pros', 'esports peripherals comparison 2026',
        'best gaming mouse comparison', 'compare valorant settings', 'compare cs2 settings',
        'tenz vs aspas', 's1mple vs zywoo', 'gaming gear specs compare'
    ],
    alternates: {
        canonical: 'https://dcprosens.com/pros/compare/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Pro Player Settings Compare Tool 2026 — Valorant & CS2 | DCPROSENS',
        description:
            'Compare mouse sensitivity settings, eDPI, cm/360, mouse, keyboard, headset, and monitor specs of top pro players side-by-side.',
        url: 'https://dcprosens.com/pros/compare/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Player Settings Compare Tool 2026 | DCPROSENS',
        description:
            'Compare mouse sensitivity, eDPI, cm/360, and gear setups of top professional FPS players side-by-side.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};


// Written copy for this page, kept beside the component that renders it.
// These tool pages shipped with a widget and almost no text, which is what
// Google's "crawled, not indexed" bucket and AdSense's thin-content rejection
// were both pointing at.
const explainerSections: ToolExplainerSection[] = [
        {
            heading: "Which numbers are actually comparable",
            body: [
                <>eDPI, which is DPI multiplied by in-game sensitivity, is the only figure that compares directly between players. 400 DPI at 2.0 and 800 DPI at 1.0 are both 800 eDPI and feel identical.</>,
                <>cm/360 is the same information expressed as physical distance, and it is the more intuitive of the two — it tells you how far the hand actually moves.</>,
                <>The raw in-game sensitivity number compares nothing at all between different games, because each game applies it to a different yaw constant. A Valorant 0.3 and an Overwatch 5.0 can describe the same speed.</>,
            ],
        },
        {
            heading: "What the spread tells you",
            body: [
                <>Professional players in the same game, at the same level, routinely differ by a factor of two in cm/360. That is not noise — it reflects genuinely different grips, desk depths and playstyles.</>,
                <>If a setting were simply optimal, the top of every game would converge on it. It has not, in any shooter, in fifteen years.</>,
                <>The useful takeaway is the range rather than any single value. Land inside it, on a number your desk and pad can support, and then stop changing it.</>,
            ],
        },
        {
            heading: "Copying a pro setup without wasting the effort",
            body: [
                <>Copy the cm/360, not the sensitivity number, and only if your pad can contain the resulting 180-degree swipe. A professional running 55 cm/360 on an XXL pad is not a setting a small pad can reproduce.</>,
                <>Peripherals matter far less than the sensitivity. A mouse that fits your hand beats a mouse that fits theirs, and hand size varies more between players than mouse quality does.</>,
                <>Give any copied setup at least two weeks before judging it. The first three days after any change feel wrong regardless of whether the change was good.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "What is eDPI and why compare it?", a: "eDPI is DPI multiplied by in-game sensitivity, and it is the only number that compares directly between players. Two players with different DPI can have identical eDPI and identical feel." },
        { q: "Should I copy a pro's exact settings?", a: "Copy the cm/360 rather than the raw number, and only if your mousepad can contain the resulting swipe. Their grip, desk depth and pad size are part of why their setting works for them." },
        { q: "Why do pros use such different sensitivities?", a: "Because grip, desk depth and playstyle vary more than skill does at that level. Players at the top of the same game routinely differ by a factor of two in cm/360, which is the clearest evidence that no single value is correct." },
];

export default function ProComparePage() {
    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dcprosens.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Pro Players',
                item: 'https://dcprosens.com/pros/',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Compare',
                item: 'https://dcprosens.com/pros/compare/',
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />

            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: '#000',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.35rem 1.25rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1.25rem',
                    }}
                >
                    ⚖️ Peripherals & Settings Compare
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Pro Player <span className="text-gradient">Compare</span> Tool
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Compare mouse sensitivity settings, eDPI, cm/360, and hardware setups of elite FPS athletes side-by-side. Highlight specs differences instantly.
                </p>
            </div>

            {/* Interactive component */}
            <ProCompare />

            {/* Technical SEO Copy */}
            <div
                style={{
                    marginTop: '4rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                    Why Compare Pro Player Sensitivity & Hardware Setups?
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    Aiming in tactical shooters like Valorant and Counter-Strike 2 requires extreme consistency.
                    At the elite level, differences in hardware (like mouse weight or monitor refresh rate) and settings (like eDPI and DPI) can impact muscle memory and raw performance.
                    Comparing top players side-by-side allows you to identify trends and optimize your own configurations based on mathematical reference points.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    Physical Sensitivity vs. In-Game Values
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    When comparing players across different games, in-game sensitivities are not directly comparable due to varying game engines and yaw factors (0.07 in Valorant vs 0.022 in CS2/Apex).
                    This is why comparing their <strong style={{ color: 'var(--primary)' }}>cm/360°</strong> is the most objective metric.
                    A higher cm/360 value means lower sensitivity (more physical space required to turn), which is highly favored by precise anchor/site-holders, whereas a lower cm/360 indicates higher speed, suited for fast entry-fragging or tracking-heavy environments.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    The Impact of Mouse Weight
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    Esports athletes heavily prioritize weight in competitive mice.
                    Mice under 65 grams (like the Logitech G Pro X Superlight 2 or Razer Viper V3 Pro) decrease initial friction, making sudden target changes (flicks) faster and reducing physical strain during long gaming sessions.
                    If you use high sensitivity, a slightly heavier mouse can provide stabilization, while low-sensitivity players almost always benefit from ultra-lightweight designs.
                </p>
            </div>
            <ToolExplainer
                intro={<>Put any two professional players&apos; setups side by side — DPI, in-game sensitivity, eDPI, cm/360, and their full peripheral chain. The value is not in copying a winner but in seeing how wide the spread is between players at the very top, which is the fastest cure for believing there is one correct sensitivity.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
