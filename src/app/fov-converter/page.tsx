import type { Metadata } from 'next';
import FovConverter from '@/components/FovConverter';
import PartnerBanner from '@/components/PartnerBanner';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
    title: 'FOV Converter — Field of View Calculator',
    description:
        'Convert your horizontal field of view (FOV) between aspect ratios (16:9, 21:9, 32:9, 4:3) using the Hor+ scaling formula used by most modern game engines.',
    keywords: [
        'fov converter', 'field of view converter', 'fov calculator',
        'convert fov ultrawide', 'hor+ scaling fov', '16:9 to 21:9 fov',
        '21:9 to 32:9 fov converter', 'fov converter gaming', 'vertical fov calculator',
        'aspect ratio fov calculator', 'fov degrees converter',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/fov-converter/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'FOV Converter — Convert Field of View Between Aspect Ratios | DCPROSENS',
        description:
            'Convert your horizontal field of view (FOV) between aspect ratios using the Hor+ scaling formula used by most modern game engines.',
        url: 'https://dcprosens.com/fov-converter/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FOV Converter | DCPROSENS',
        description: 'Convert your field of view between aspect ratios instantly.',
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
            heading: "Why the same FOV number looks different",
            body: [
                <>Games measure FOV along different axes. Source games including CS2 quote horizontal FOV; Unreal Engine titles often quote horizontal at a fixed 16:9 and scale from there; several console-first shooters quote vertical.</>,
                <>That means 90 in one game and 90 in another can produce visibly different amounts of visible world, which is why copying a number between games so often feels wrong.</>,
                <>Aspect ratio compounds it. A horizontal FOV at 4:3 shows less to the sides than the same figure at 16:9, which is why stretched-resolution players have to think about FOV and sensitivity together.</>,
            ],
        },
        {
            heading: "How FOV interacts with sensitivity",
            body: [
                <>Changing FOV does not change your cm/360 — the camera still rotates the same degrees per mouse count. What changes is how much of your screen a given rotation covers, so the same sensitivity feels slower at a wider FOV.</>,
                <>This is the most common reason a correctly converted sensitivity feels wrong. The conversion preserved turn distance; the FOV changed how that distance reads.</>,
                <>If you change FOV, expect roughly a week of recalibration and resist adjusting your sensitivity during it. Changing both at once means you will not know which one to blame.</>,
            ],
        },
        {
            heading: "Choosing a value",
            body: [
                <>Higher FOV shows more of the map and renders every target smaller; lower FOV does the reverse. Players who rely on reacting to flanks tend to prefer higher, players who hold long angles prefer lower.</>,
                <>Very high FOV introduces noticeable edge distortion, which makes tracking at the screen edges harder rather than easier.</>,
                <>CS2 fixes FOV for competitive integrity. What you can adjust there is the viewmodel, which changes how much screen your weapon occupies — a real visibility gain often mistaken for an FOV setting.</>,
            ],
        },
];

const explainerFaqs: ToolExplainerFaq[] = [
        { q: "Does changing FOV change my sensitivity?", a: "Not the number — your cm/360 is identical. But a wider FOV means each degree of rotation covers less of your screen, so the same sensitivity feels slower. Expect about a week of recalibration." },
        { q: "Why does the same FOV number look different in two games?", a: "Because games measure it along different axes. Some quote horizontal FOV, some vertical, some diagonal, and aspect ratio changes all three. Converting between them is what this tool does." },
        { q: "What FOV should I use?", a: "Higher shows more of the map with smaller targets; lower does the reverse. Most competitive players sit in the middle of the available range and then leave it alone, because changing it resets how your sensitivity feels." },
];

export default function FovConverterPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS FOV Converter',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/fov-converter/',
                description: 'Convert horizontal field of view between aspect ratios using Hor+ scaling.',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'FOV Converter', item: 'https://dcprosens.com/fov-converter/' },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Why does FOV change when I switch aspect ratios?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Most modern engines use "Hor+" scaling: your vertical FOV stays fixed and the horizontal FOV expands or shrinks with your screen\'s aspect ratio. Moving from 16:9 to an ultrawide 21:9 monitor at the same horizontal FOV setting would show noticeably less on the sides than intended, so the value needs to be converted to keep the same field of view feel.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Is this formula accurate for every game?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'This calculator uses the standard Hor+ scaling formula, which covers most modern engines (Source, Unreal, Frostbite, id Tech). A minority of older titles use Vert- or fixed-FOV scaling instead, where the conversion works differently — check your specific game\'s FOV behavior if the converted value looks off in-game.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                    🖥️ Field of View Calculator
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    FOV <span className="text-gradient">Converter</span>
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '0' }}>
                    Convert your horizontal field of view between aspect ratios so your monitor upgrade doesn&apos;t change how much you can see.
                </p>
            </div>

            <FovConverter />

            <PartnerBanner slot="inContent" />

            <div
                style={{
                    marginTop: '5rem',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                }}
            >
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                    What Is Hor+ FOV Scaling?
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                    Most modern game engines use <strong>Hor+ (horizontal plus) scaling</strong>: your vertical field of view
                    is fixed, and the horizontal field of view expands or contracts based on your screen&apos;s aspect ratio.
                    That means the same numeric FOV setting looks and feels different on a 16:9 monitor than on an ultrawide 21:9 or 32:9 one.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                    This tool converts your horizontal FOV between aspect ratios while keeping the vertical FOV constant,
                    using the formula: <code style={{ color: 'var(--primary)', background: 'rgba(0,255,157,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        newFOV = 2 × atan(tan(oldFOV / 2) × (newRatio / oldRatio))
                    </code>.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '2rem' }}>
                    Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Why does FOV change when I switch aspect ratios?
                        </h4>
                        <p>
                            With Hor+ scaling, keeping the same horizontal FOV number after switching to a wider monitor would
                            actually show less on the sides relative to what you had before — the value needs to be converted upward
                            to preserve the same peripheral vision.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            Is this formula accurate for every game?
                        </h4>
                        <p>
                            It covers most modern engines (Source, Unreal, Frostbite, id Tech). A minority of older titles use
                            Vert- or fixed-FOV scaling instead, where the conversion works differently.
                        </p>
                    </div>
                </div>
            </div>
            <ToolExplainer
                intro={<>Field of view is quoted three different ways by three different games, and the same number can describe genuinely different images. This converter translates between horizontal, vertical and diagonal FOV at any aspect ratio, so you can carry the same view from one game to another instead of guessing at a slider.</>}
                sections={explainerSections}
                faqs={explainerFaqs}
            />

        </div>
    );
}
