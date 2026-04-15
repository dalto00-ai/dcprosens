import Converter from '@/components/Converter';
import ProSettings from '@/components/ProSettings';
import HomeWiki from '@/components/HomeWiki';
import VoiceSearch from '@/components/VoiceSearch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sensitivity Converter — Valorant to CS2, Apex, Overwatch | DCPROSENS",
    description: "Free gaming sensitivity converter. Convert mouse sensitivity between Valorant, CS2, Apex Legends, Overwatch 2 and 10+ games. Calculate eDPI and cm/360 instantly.",
    alternates: {
        canonical: "https://dcprosens.com",
    },
};

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "DCPROSENS Sensitivity Converter",
                "applicationCategory": "GameApplication",
                "operatingSystem": "Web",
                "url": "https://dcprosens.com",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "1250",
                    "bestRating": "5",
                    "worstRating": "1",
                },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                },
                "description": "The ultimate gaming sensitivity converter for Valorant, CS2, Overwatch 2, Apex Legends and more. Calculate cm/360 and eDPI instantly.",
                "featureList": [
                    "Sensitivity conversion between 13+ games",
                    "Real-time cm/360 calculation",
                    "eDPI calculator",
                    "Pro player settings database",
                    "Voice search support",
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        "name": "How to convert Valorant sensitivity to CS2?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Multiply your Valorant sensitivity by 3.18 to get your CS2 sensitivity. For example, Valorant 0.3 × 3.18 = 0.954 in CS2. This formula preserves your cm/360 (physical mouse distance per 360° turn) across both games.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What is eDPI and how do I calculate it?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "eDPI (Effective Dots Per Inch) = Mouse DPI × In-Game Sensitivity. For example, 800 DPI × 0.3 = 240 eDPI. It's the universal standard for comparing sensitivity across different hardware and games.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What is cm/360 in gaming?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "cm/360 is the physical centimeters you must move your mouse to rotate 360° in a game. It's the most accurate way to standardize sensitivity across different games. Most competitive FPS players use 25–55cm/360.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I convert sensitivity from Apex Legends to Valorant?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Apex Legends uses a yaw of 0.022 while Valorant uses 0.07. The formula is: Valorant Sensitivity = Apex Sensitivity × (0.022 / 0.07) = Apex Sensitivity × 0.3143. Use our free converter tool above for instant results.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What sensitivity do pro Valorant players use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most pro Valorant players use between 200–400 eDPI. TenZ uses 800 DPI × 0.3 = 240 eDPI. Aspas uses 800 DPI × 0.4 = 320 eDPI. Demon1 uses 1600 DPI × 0.1 = 160 eDPI. Check our Pro Settings database for the full list.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "Is the sensitivity converter free?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, DCPROSENS sensitivity converter is 100% free with no registration required. All calculations are performed in your browser — your data is never sent to our servers.",
                        },
                    },
                ],
            },
            {
                "@type": "WebSite",
                "name": "DCPROSENS",
                "url": "https://dcprosens.com",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://dcprosens.com/blog?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                },
            },
        ],
    };

    return (
        <div className="container page-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="hero-section">
                <h1 className="hero-title">
                    Gaming <span className="text-gradient">Sensitivity</span><br />
                    Converter Tool
                </h1>

                <p className="hero-subtitle">
                    Convert sensitivity between Valorant, CS2, Apex Legends, Overwatch 2 and 10+ games.
                    Calculate eDPI and cm/360 instantly — free, no login required.
                </p>

                <VoiceSearch />

                <Converter />

                <ProSettings />

                <HomeWiki />
            </div>
        </div>
    );
}
