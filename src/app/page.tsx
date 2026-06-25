import Converter from '@/components/Converter';
import ProSettings from '@/components/ProSettings';
import HomeWiki from '@/components/HomeWiki';
import VoiceSearch from '@/components/VoiceSearch';
import ProComparator from '@/components/ProComparator';
import EbookPopup from '@/components/EbookPopup';
import AdsterraBanner from '@/components/AdsterraBanner';
import AdsterraNative from '@/components/AdsterraNative';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sensitivity Converter — Valorant to CS2, Apex, Overwatch | DCPROSENS",
    description: "Free gaming sensitivity converter. Convert mouse sensitivity between Valorant, CS2, Apex Legends, Overwatch 2 and 10+ games. Calculate eDPI and cm/360 instantly.",
    keywords: [
        // Tool keywords
        'sensitivity converter', 'mouse sensitivity converter', 'gaming sensitivity calculator',
        'valorant to cs2 sensitivity', 'cs2 sensitivity converter', 'apex legends sensitivity converter',
        'overwatch 2 sensitivity converter', 'fortnite sensitivity converter', 'cod warzone sensitivity',
        'rainbow six siege sensitivity', 'pubg sensitivity converter', 'battlefield sensitivity',
        // Feature keywords
        'edpi calculator', 'cm360 calculator', 'cm per 360 calculator', 'dpi calculator gaming',
        'mouse dpi calculator', 'true sensitivity calculator', 'game sensitivity calculator free',
        'online sensitivity converter', 'sensitivity converter tool 2025',
        // Pro keywords
        'pro player sensitivity settings', 'tenz sensitivity', 's1mple dpi settings',
        'zywoo cs2 settings', 'aspas valorant sens', 'what sensitivity do pros use',
        'copy pro player sensitivity', 'pro gamer mouse settings',
        // Long tail
        'how to convert valorant sensitivity to cs2', 'valorant sensitivity same feel cs2',
        'apex legends to valorant sensitivity', 'best sensitivity for fps games',
        'low sensitivity vs high sensitivity fps', 'ideal sensitivity gaming',
        '400 dpi vs 800 dpi gaming', 'what dpi should i use for fps',
    ],
    alternates: {
        canonical: "https://dcprosens.com",
    },
    openGraph: {
        title: "Sensitivity Converter — Valorant to CS2, Apex, Overwatch | DCPROSENS",
        description: "Free gaming sensitivity converter. Convert between Valorant, CS2, Apex, Overwatch 2 and 10+ games.",
        url: "https://dcprosens.com",
        type: "website",
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
                "description": "Free gaming sensitivity converter for Valorant, CS2, Apex Legends, Overwatch 2 and 10+ FPS games.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://dcprosens.com/blog?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "Organization",
                "@id": "https://dcprosens.com#organization",
                "name": "DCPROSENS",
                "url": "https://dcprosens.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://dcprosens.com/og-image.png",
                    "width": 1024,
                    "height": 1024,
                },
                "sameAs": [
                    "https://dcprosens.com",
                ],
            },
            {
                "@type": "HowTo",
                "name": "How to Convert Sensitivity Between FPS Games",
                "description": "Step-by-step guide to convert mouse sensitivity between Valorant, CS2, Apex Legends, and other FPS games using DCPROSENS.",
                "totalTime": "PT1M",
                "tool": [{ "@type": "HowToTool", "name": "DCPROSENS Sensitivity Converter" }],
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Select Source Game",
                        "text": "Choose the game you are currently playing (e.g., Valorant) from the 'From Game' dropdown.",
                        "url": "https://dcprosens.com#converter",
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Enter Your Sensitivity",
                        "text": "Type your current in-game sensitivity value (e.g., 0.35 for Valorant) in the sensitivity field.",
                        "url": "https://dcprosens.com#converter",
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Select Target Game",
                        "text": "Choose the game you want to convert to (e.g., CS2) from the 'To Game' dropdown.",
                        "url": "https://dcprosens.com#converter",
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Get Your Converted Sensitivity",
                        "text": "The converter instantly shows your equivalent sensitivity, eDPI, and cm/360 for the target game.",
                        "url": "https://dcprosens.com#converter",
                    },
                ],
            },
            {
                "@type": "FAQPage",
                "@id": "https://dcprosens.com#faq-extended",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I convert Overwatch 2 sensitivity to CS2?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Multiply your Overwatch 2 sensitivity by approximately 0.2876 to get CS2 sensitivity. Example: OW2 sens 4.00 × 0.2876 = 1.15 CS2. This preserves your cm/360 value between both games.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I convert Fortnite sensitivity to CS2?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Fortnite uses a percentage-based sensitivity scale (0.0–1.0) while CS2 uses an absolute value. Calculate your cm/360 in Fortnite first, then find the CS2 sensitivity that produces the same cm/360 using the DCPROSENS converter.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What DPI do most pro CS2 players use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most professional CS2 players use 400 DPI with a sensitivity around 1.0–2.5, resulting in 600–1000 eDPI. s1mple uses 400 DPI at 3.09, ZywOo uses 400 DPI at 2.0, and NiKo uses 400 DPI at 1.4.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "Is higher DPI better for FPS gaming?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Not necessarily. DPI and in-game sensitivity are interchangeable when adjusted together. Most pros prefer 400–800 DPI for cleaner sensor tracking. What matters is your eDPI (DPI × sensitivity) — not the DPI alone. Use our eDPI calculator to compare settings.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "How do I convert Rainbow Six Siege sensitivity to Valorant?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Rainbow Six Siege uses a yaw of 0.00572 and Valorant uses 0.07. Multiply your R6 sensitivity by (0.00572 / 0.07) = 0.0817 to get Valorant sensitivity. Use the DCPROSENS converter for instant and accurate results.",
                        },
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best sensitivity for Valorant beginners?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Beginners should start at 800 DPI with 0.35–0.50 in-game sensitivity (280–400 eDPI). This matches the median competitive player. Avoid changing sensitivity frequently — commit to the same settings for at least 30 days to build muscle memory.",
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="container page-container">
            <EbookPopup />
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

                {/* Leaderboard 728x90 desktop / 320x50 mobile — acima do converter */}
                <div className="ad-desktop-only">
                    <AdsterraBanner size="728x90" margin={16} />
                </div>
                <div className="ad-mobile-only">
                    <AdsterraBanner size="320x50" margin={12} />
                </div>

                <Converter />

                {/* Native Banner (alto RPM) — entre converter e pro settings */}
                <AdsterraNative />

                <ProSettings />

                {/* 300x250 entre ProSettings e ProComparator */}
                <AdsterraBanner size="300x250" margin={24} />

                <ProComparator />

                {/* 728x90 desktop / 468x60 tablet — abaixo do comparador */}
                <div className="ad-desktop-only">
                    <AdsterraBanner size="728x90" margin={24} />
                </div>
                <div className="ad-tablet-only">
                    <AdsterraBanner size="468x60" margin={24} />
                </div>
                <div className="ad-mobile-only">
                    <AdsterraBanner size="320x50" margin={16} />
                </div>

                <HomeWiki />

                {/* 300x250 final — antes do footer (alta visibilidade, funciona em todos os devices) */}
                <AdsterraBanner size="300x250" margin={24} />
            </div>
        </div>
    );
}
