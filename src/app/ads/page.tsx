import type { Metadata } from 'next';
import AdsCalculator from './AdsCalculator';
import PremiumGuard from '@/components/PremiumGuard';

export const metadata: Metadata = {
    title: "1:1 ADS Sensitivity Calculator",
    description: "Free gaming ADS and scope sensitivity converter. Calculate the perfect 1:1 zoom sensitivity for Valorant Operator, CS2 AWP, Apex Legends, and CoD Warzone to preserve muscle memory.",
    keywords: [
        // ADS / Scope core
        'ads sensitivity calculator', 'scope sensitivity calculator', 'zoom sensitivity calculator',
        'ads sensitivity converter', '1:1 ads sensitivity', 'scope multiplier calculator',
        'aim down sights sensitivity', 'scope sensitivity multiplier', 'zoom sensitivity multiplier',
        'monitor distance match', 'focal length match sensitivity', 'ads sensitivity guide',
        // Game-specific ADS
        'valorant zoom sensitivity multiplier', 'valorant operator sensitivity', 'valorant marshal scope sens',
        'cs2 zoom sensitivity ratio', 'cs2 awp sensitivity', 'cs2 scope sensitivity command',
        'zoom_sensitivity_ratio cs2', 'zoom_sensitivity_ratio_mouse_pitch',
        'apex legends per zoom sensitivity', 'apex scope sensitivity', 'apex ads multiplier',
        'cod warzone ads sensitivity', 'warzone multiplier sensitivity', 'fortnite scope sensitivity',
        'rainbow six siege ads sensitivity', 'overwatch 2 scope sensitivity',
        // Concepts
        'hipfire vs ads sensitivity', 'hipfire sensitivity', 'ads vs hipfire feel',
        '1:1 scope sensitivity formula', 'what is 1:1 scope sensitivity', 'monitor distance sensitivity',
        '0% monitor distance match', '100% monitor distance match', 'relative aim sensitivity',
        'scope sensitivity pro settings', 'best ads multiplier valorant', 'best awp sens cs2',
        // Long tail
        'how to set scope sensitivity to 1:1', 'keep same sensitivity while scoping',
        'same feel hipfire and ads', 'ads sensitivity no change aim feel',
        'calculate zoom sensitivity valorant', 'calculate scope multiplier gaming',
    ],
    alternates: {
        canonical: "https://dcprosens.com/ads",
    },
    openGraph: {
        title: "1:1 ADS Scope Sensitivity Calculator — Valorant, CS2, Apex | DCPROSENS",
        description: "Calculate the perfect 1:1 zoom sensitivity for Valorant, CS2, Apex Legends, and CoD Warzone.",
        url: "https://dcprosens.com/ads",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AdsPage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com" },
            { "@type": "ListItem", "position": 2, "name": "ADS Sensitivity Calculator", "item": "https://dcprosens.com/ads" },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is 1:1 ADS sensitivity?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "1:1 ADS sensitivity means your mouse movement produces the same physical rotation speed while aiming down sights as it does while hip-firing. This is achieved by applying a zoom multiplier that compensates for the FOV change when scoping in. Most pro players prefer 1:1 for consistent muscle memory.",
                },
            },
            {
                "@type": "Question",
                "name": "What is the best zoom sensitivity multiplier for Valorant?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For 1:1 scope sensitivity in Valorant (0% Monitor Distance Match), set your Zoom Sensitivity Multiplier to 1.0. For the Operator's 2.5x scope at 0% MDM, use approximately 1.150. For a true focal length match, use 0.847. Most pro Operator players use 1.0 as a starting point.",
                },
            },
            {
                "@type": "Question",
                "name": "What is zoom_sensitivity_ratio in CS2?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "zoom_sensitivity_ratio is a CS2/CS:GO console command that adjusts your scoped sensitivity. A value of 0.818933 gives a perfect 1:1 focal length match for the AWP and Scout. Most CS2 pros use values between 0.80 and 1.0 depending on preference. Set it via the developer console: zoom_sensitivity_ratio 0.818933.",
                },
            },
            {
                "@type": "Question",
                "name": "Should I use the same sensitivity for ADS and hipfire?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most competitive players prefer a 1:1 match so muscle memory stays consistent between hipfire and scoped shots. However, some players prefer a slightly higher scoped multiplier (above 1.0) to allow faster scanning and micro-corrections while zoomed. Try 1:1 first, then adjust if you feel the scoped movement is too slow.",
                },
            },
            {
                "@type": "Question",
                "name": "What ADS sensitivity do pro players use in Apex Legends?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most Apex Legends pro players configure per-zoom sensitivity to achieve near 1:1 feel. Common settings are: 1x scope at 1.0, 2x scope at 1.2, 3x scope at 1.3, 4x-10x scopes at 1.4–1.5. ImperialHal and other ALGS pros adjust these individually to maintain tracking consistency at each zoom level.",
                },
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1000px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <h1 className="hero-title" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
                1:1 ADS Scope <span className="text-gradient">Sensitivity</span>
            </h1>
            <p className="hero-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
                Calculate the perfect Aim Down Sights (ADS) multiplier for scopes (AWP, Operator, optical sights) and match your hipfire muscle memory.
            </p>

            <PremiumGuard previewTitle="ADS Sensitivity Calculator">
                <AdsCalculator />
            </PremiumGuard>

            {/* HIGH-INTENT EEAT WIKI SECTION */}
            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>How Does 1:1 Scoped Sensitivity Work?</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>
                        When you aim down sights (ADS) or zoom in through a precision scope, your Field of View (FOV) decreases significantly. This change makes your physical mouse movement feel much faster on screen unless scaled properly.
                    </p>
                    <p>
                        To maintain a consistent physical aim feel between hipfire and zoomed scopes, games use a zoom sensitivity multiplier. For perfect micro-flick muscle memory, we employ a 0% Monitor Distance Match (MDM) formula, matching the raw focal length transition.
                    </p>
                    
                    <h3 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Standard Pro-Player Scoped Multipliers:</h3>
                    <ul>
                        <li><strong>Valorant (Operator & Marshal)</strong>: Setting your <em>Zoom Sensitivity Multiplier</em> to <strong>0.847</strong> gives a perfect 1:1 focal length match for 1x zoom. For the 2.5x double-zoom Operator scope, the physical equivalent is <strong>1.150</strong>.</li>
                        <li><strong>CS2 / CS:GO (AWP & Scout)</strong>: The console command <code>zoom_sensitivity_ratio 0.818933</code> (or rounded to <code>0.82</code>) provides the mathematically perfect 1:1 focal length ratio for rapid scoped adjustments.</li>
                        <li><strong>Apex Legends</strong>: Apex allows per-zoom level sensitivity. Set <strong>1.0</strong> for 1x optics, <strong>1.2</strong> for 2x optics, and <strong>1.3</strong> for 3x optics to maintain a steady physical tracking speed.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
