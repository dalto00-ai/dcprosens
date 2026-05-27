import type { Metadata } from 'next';
import EbookForm from './EbookForm';

export const metadata: Metadata = {
    title: "Ebook Grátis: The Architect of Precision | DCPROSENS",
    description: "Baixe gratuitamente o guia definitivo de calibração de mira para jogos FPS competitivos. Aprenda a física da sensibilidade 1:1, Yaws de motor e memória muscular.",
    alternates: {
        canonical: "https://dcprosens.com/ebook",
    },
    openGraph: {
        title: "Ebook Grátis: The Architect of Precision | DCPROSENS",
        description: "Baixe gratuitamente o guia definitivo de calibração de mira para FPS competitivos.",
        url: "https://dcprosens.com/ebook",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function EbookPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '1100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ 
                    background: 'rgba(0, 255, 157, 0.1)', 
                    color: 'var(--primary)', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    padding: '0.4rem 1rem', 
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: '1px solid rgba(0, 255, 157, 0.2)'
                }}>
                    Material Grátis de Elite
                </span>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, margin: '1rem 0 0.5rem 0', lineHeight: 1.1 }}>
                    Torne-se o <span className="text-gradient">Arquiteto da Mira Perfeita</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    Inscreva-se abaixo para baixar o ebook e receber o guia prático passo a passo de calibração de Yaws, DPIs e coeficientes de escopo 1:1.
                </p>
            </div>

            <EbookForm />

            {/* CURRICULUM SECTION */}
            <div style={{ marginTop: '6rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', color: 'var(--text-primary)' }}>
                    O Que Você Vai Dominar Com Este Guia:
                </h2>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '2rem' 
                }}>
                    {/* Chapter 1 */}
                    <div style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-lg)', 
                        padding: '2rem',
                        transition: 'border-color var(--transition-fast)'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📐</div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            Capítulo 1: A Física da Mira
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Entenda a fundo a normalização angular matemática por trás do cálculo do cm/360 e como os DPIs influenciam a leitura física de pixels no seu sensor.
                        </p>
                    </div>

                    {/* Chapter 2 */}
                    <div style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-lg)', 
                        padding: '2rem',
                        transition: 'border-color var(--transition-fast)'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            Capítulo 2: Escopos e ADS 1:1
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Aprenda as equações matemáticas para garantir que os escopos telescópicos (AWP em CS2, Operator em Valorant) tenham a exata mesma resposta muscular da mira livre.
                        </p>
                    </div>

                    {/* Chapter 3 */}
                    <div style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-lg)', 
                        padding: '2rem',
                        transition: 'border-color var(--transition-fast)'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            Capítulo 3: Cognição & Músculos
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Modelos científicos de treinamento motor que forçam o cérebro a assimilar novas sensibilidades 2x mais rápido, blindando a memória de mira contra a inconsistência.
                        </p>
                    </div>

                    {/* Chapter 4 */}
                    <div style={{ 
                        background: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-lg)', 
                        padding: '2rem',
                        transition: 'border-color var(--transition-fast)'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🖱️</div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            Capítulo 4: Hardware Dinâmico
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                            Como o peso do mouse, a fricção dinâmica do mousepad e o controle de postura aceleram ou degradam sua mira e o que escolher para o cenário competitivo de alto nível.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
