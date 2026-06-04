import type { Metadata } from 'next';
import AdsCalculator from './AdsCalculator';

export const metadata: Metadata = {
    title: "1:1 ADS Scope Sensitivity Calculator — Valorant, CS2, Apex | DCPROSENS",
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
                Mirar com <span className="text-gradient">Consistência 1:1</span>
            </h1>
            <p className="hero-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-secondary)' }}>
                Calcule o multiplicador de mira (ADS) perfeito para scopes (AWP, Operator, miras ópticas) e mantenha sua memória muscular idêntica ao disparo livre.
            </p>

            <AdsCalculator />

            {/* HIGH-INTENT EEAT WIKI SECTION */}
            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Como Funciona a Sensibilidade de Mira 1:1?</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>
                        Quando você olha pela mira de uma arma (ADS - Aim Down Sights) ou por uma lente de precisão (Scope), o seu Campo de Visão (FOV) diminui drasticamente. Essa aproximação faz com que a mesma velocidade de movimento físico do mouse pareça muito mais rápida na tela.
                    </p>
                    <p>
                        Para resolver isso e manter a sensibilidade física consistente com a sua sensibilidade padrão (Hipfire), os motores de jogos utilizam multiplicadores de mira. Para obter a consistência perfeita em pequenos movimentos (micro-flicks na cabeça), nós calculamos a correspondência de **Distância do Monitor (0% Monitor Distance Match)** ou correspondência de distância focal.
                    </p>
                    
                    <h3 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Multiplicadores Recomendados pelos Pro-players:</h3>
                    <ul>
                        <li><strong>Valorant (Operator & Marshal)</strong>: Configurar o <em>Zoom Sensitivity Multiplier</em> em <strong>0.847</strong> garante correspondência 1:1 perfeita em 0% de distância do monitor para a mira básica de 1x zoom. Para a mira secundária de 2.5x, o valor ótimo físico é de <strong>1.150</strong>.</li>
                        <li><strong>CS2 / CS:GO (AWP & Scout)</strong>: O comando do console <code>zoom_sensitivity_ratio 0.818933</code> (ou aproximado para <code>0.82</code>) é a correspondência focal perfeita de 1:1 para micro-ajustes rápidos na tela.</li>
                        <li><strong>Apex Legends</strong>: Apex permite definir a sensibilidade por nível de zoom. Ajustes como <strong>1.0</strong> para miras 1x, <strong>1.2</strong> para 2x e <strong>1.3</strong> para 3x ajudam a nivelar a velocidade de transição física do mousepad.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
