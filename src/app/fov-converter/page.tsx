import type { Metadata } from 'next';
import FovConverter from '@/components/FovConverter';

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
        canonical: 'https://dcprosens.com/fov-converter',
    },
    openGraph: {
        title: 'FOV Converter — Convert Field of View Between Aspect Ratios | DCPROSENS',
        description:
            'Convert your horizontal field of view (FOV) between aspect ratios using the Hor+ scaling formula used by most modern game engines.',
        url: 'https://dcprosens.com/fov-converter',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FOV Converter | DCPROSENS',
        description: 'Convert your field of view between aspect ratios instantly.',
        creator: '@dcprosens',
    },
};

export default function FovConverterPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS FOV Converter',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/fov-converter',
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
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dcprosens.com' },
                    { '@type': 'ListItem', position: 2, name: 'FOV Converter', item: 'https://dcprosens.com/fov-converter' },
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
        </div>
    );
}
