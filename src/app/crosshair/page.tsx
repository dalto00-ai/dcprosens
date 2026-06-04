import type { Metadata } from 'next';
import CrosshairGenerator from '@/components/CrosshairGenerator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Crosshair Generator 2025 — Valorant & CS2 Custom Crosshair | DCPROSENS',
    description: 'Create your perfect gaming crosshair for Valorant and CS2. Customize color, size, gap, thickness and dot. Generate crosshair code instantly. Pro crosshair presets: TenZ, aspas, yay, s1mple.',
    keywords: [
        'valorant crosshair generator',
        'cs2 crosshair generator',
        'custom crosshair maker',
        'valorant crosshair code',
        'best crosshair valorant 2025',
        'tenz crosshair code',
        'aspas crosshair',
        'pro crosshair settings',
        'crosshair creator online',
        'gaming crosshair tool',
        'no recoil crosshair',
        'small dot crosshair valorant',
        'cs2 crosshair commands',
        'crosshair color valorant',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/crosshair',
    },
    openGraph: {
        title: 'Crosshair Generator 2025 — Valorant & CS2 | DCPROSENS',
        description: 'Build and copy your perfect crosshair for Valorant and CS2. Pro presets from TenZ, aspas, yay, s1mple. Instant code generation.',
        type: 'website',
        url: 'https://dcprosens.com/crosshair',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Crosshair Generator — Valorant & CS2 | DCPROSENS',
        description: 'Create & copy pro-level crosshairs for Valorant and CS2. Free online tool.',
    },
    robots: { index: true, follow: true },
};

export default function CrosshairPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: 'DCPROSENS Crosshair Generator',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Web',
                url: 'https://dcprosens.com/crosshair',
                description: 'Free online crosshair generator for Valorant and CS2. Customize and copy crosshair codes instantly.',
                featureList: [
                    'Real-time crosshair preview',
                    'Valorant crosshair code generator',
                    'CS2 crosshair console commands',
                    'Pro player crosshair presets',
                    'Export crosshair as PNG',
                ],
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How do I import a crosshair code in Valorant?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Go to Settings → Crosshair → Import Profile Code. Paste the generated code and press Import. Your crosshair will update instantly.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: "What is TenZ's crosshair code in Valorant?",
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: "TenZ uses a small green crosshair with no dot: 0;P;c;1;o;1;0l;4;0o;3;0a;1;0f;0;1b;0. Load it instantly using the TenZ preset in our crosshair generator.",
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What crosshair do most Valorant pros use?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Most Valorant pros use a small static crosshair with 4-6 length inner lines, 2-4px gap, no outer lines, and no center dot. Green or white are the most popular colors.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="page-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <p style={{
                        display: 'inline-block',
                        background: 'rgba(0,255,157,0.1)',
                        border: '1px solid rgba(0,255,157,0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Valorant &amp; CS2 Tool
                    </p>
                    <h1 className="hero-title">
                        Crosshair <span className="text-gradient">Generator</span>
                    </h1>
                    <p className="hero-subtitle">
                        Design your perfect gaming crosshair in real-time. Copy the code directly into Valorant or CS2. Load pro presets from TenZ, aspas, yay, s1mple and more.
                    </p>
                </div>
            </section>

            {/* Tool */}
            <div className="container" style={{ maxWidth: 1100 }}>
                <CrosshairGenerator />
            </div>

            {/* SEO Article */}
            <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
                <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Why Your Crosshair Matters in Competitive FPS
                    </h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        Your crosshair is the most important visual reference in any FPS game. A well-designed crosshair
                        reduces cognitive load, improves target acquisition speed, and gives you instant visual feedback
                        on your aim. In <strong style={{ color: 'var(--text-primary)' }}>Valorant</strong> and{' '}
                        <strong style={{ color: 'var(--text-primary)' }}>CS2</strong>, milliseconds decide rounds —
                        and your crosshair is always at the center of every engagement.
                    </p>

                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Pro Tip:</strong> Most top Valorant pros use
                        a <em>small static crosshair</em> — 4–6 length inner lines, 2–4px gap, no outer lines.
                        This prevents the crosshair from expanding on movement, giving a more accurate aim reference.
                    </div>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        How to Import a Crosshair Code in Valorant
                    </h2>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            'Open Valorant and go to Settings',
                            'Click the Crosshair tab',
                            'Click "Import Profile Code" at the top',
                            'Paste your copied code and press Import',
                            'The crosshair updates instantly — no restart needed',
                        ].map((step, i) => (
                            <li key={i} style={{ color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--primary)' }}>Step {i + 1}:</strong> {step}
                            </li>
                        ))}
                    </ol>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        Pro Crosshair Settings — Valorant 2025
                    </h2>
                    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    {['Pro', 'Team', 'Color', 'Length', 'Gap', 'Thickness', 'Dot'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { pro: 'TenZ', team: 'Sentinels', color: 'Green', length: 4, gap: 3, thickness: 2, dot: 'No' },
                                    { pro: 'aspas', team: 'LOUD', color: 'White', length: 4, gap: 2, thickness: 2, dot: 'Yes' },
                                    { pro: 'yay', team: 'OpTic', color: 'Cyan', length: 6, gap: 4, thickness: 2, dot: 'No' },
                                    { pro: 'Demon1', team: 'EG', color: 'White', length: 5, gap: 3, thickness: 2, dot: 'No' },
                                    { pro: 'cNed', team: 'FUT', color: 'Yellow', length: 5, gap: 2, thickness: 2, dot: 'No' },
                                ].map(row => (
                                    <tr key={row.pro} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{row.pro}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.team}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.color}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{row.length}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{row.gap}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{row.thickness}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{row.dot}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 700, marginTop: '3rem', marginBottom: '1.5rem' }}>
                        CS2 Crosshair Console Commands
                    </h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        In CS2, crosshairs are configured via console commands. Key commands include:
                    </p>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '2rem' }}>
                        {[
                            'cl_crosshairsize 5 — Line length',
                            'cl_crosshairgap 0 — Gap between lines',
                            'cl_crosshairthickness 1 — Line thickness',
                            'cl_crosshaircolor 1 — Color (1=Green, 2=Yellow, 3=Blue, 4=Cyan, 5=Custom)',
                            'cl_crosshairdot 0 — Center dot (0=off, 1=on)',
                            'cl_crosshair_drawoutline 0 — Outline',
                        ].map(cmd => (
                            <div key={cmd} style={{ color: 'var(--primary)', padding: '0.25rem 0' }}>{cmd}</div>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Need sensitivity settings for your game?</p>
                        <Link href="/" style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#000',
                            padding: '0.75rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                        }}>
                            Convert Your Sensitivity →
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
