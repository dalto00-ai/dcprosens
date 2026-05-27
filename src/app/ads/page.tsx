import type { Metadata } from 'next';
import AdsCalculator from './AdsCalculator';

export const metadata: Metadata = {
    title: "1:1 ADS Scope Sensitivity Calculator — Valorant, CS2, Apex | DCPROSENS",
    description: "Free gaming ADS and scope sensitivity converter. Calculate the perfect 1:1 zoom sensitivity for Valorant Operator, CS2 AWP, Apex Legends, and CoD Warzone to preserve muscle memory.",
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
    return (
        <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1000px' }}>
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
