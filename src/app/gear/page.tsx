import type { Metadata } from 'next';
import Link from 'next/link';
import { keyboards, headsets, monitors, mousepads } from '@/lib/gearDatabase';

export const metadata: Metadata = {
    title: "Pro Gaming Gear Database 2025 — Best Keyboards, Headsets, Monitors, Mousepads | DCPROSENS",
    description: "Complete pro gaming gear database. Best gaming keyboards, headsets, monitors and mousepads used by TenZ, s1mple, ZywOo, NiKo, Aspas and more pro players. Filter by type, brand and budget.",
    keywords: [
        // Keyboards
        "best gaming keyboard 2025", "wooting 60he review", "logitech g pro x keyboard",
        "steelseries apex pro tkl", "gaming keyboard for fps", "mechanical keyboard valorant",
        "rapid trigger keyboard", "hall effect keyboard gaming", "cs2 pro keyboard", "60 percent keyboard gaming",
        // Headsets
        "best gaming headset 2025", "logitech g pro x 2 lightspeed", "sennheiser hd 560s gaming",
        "hyperx cloud alpha review", "best headset for fps gaming", "gaming headset valorant",
        "cs2 pro headset", "wireless gaming headset", "best wired gaming headset",
        // Monitors
        "best gaming monitor 2025", "benq zowie xl2546k review", "240hz monitor gaming",
        "360hz monitor gaming", "best monitor for cs2", "best monitor for valorant",
        "1080p 240hz monitor", "asus rog swift pg259qn", "gaming monitor under 400",
        // Mousepads
        "best gaming mousepad 2025", "artisan zero fx review", "logitech g640 review",
        "xl mousepad gaming", "best mousepad for low sensitivity", "cloth vs hard mousepad",
        "steelseries qck heavy review", "logitech g840 xl review", "mousepad for valorant",
        // General
        "pro gaming gear", "esports equipment", "what gear do pro players use",
        "gaming setup 2025", "tenz setup", "s1mple setup", "best gaming peripherals",
    ],
    alternates: {
        canonical: "https://dcprosens.com/gear",
    },
    openGraph: {
        title: "Pro Gaming Gear Database 2025 — Keyboards, Headsets, Monitors, Mousepads | DCPROSENS",
        description: "Every piece of gear used by top FPS pros. Filter keyboards, headsets, monitors and mousepads by specs and budget.",
        type: "website",
        url: "https://dcprosens.com/gear",
    },
};

const sectionStyle: React.CSSProperties = {
    marginBottom: '5rem',
};

const headingStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
};

const subheadingStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    fontSize: '0.95rem',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.25rem',
};

const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
};

const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: '#000',
    fontSize: '0.7rem',
    fontWeight: 800,
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    marginBottom: '0.25rem',
};

const proTagStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'rgba(0,255,157,0.1)',
    color: 'var(--primary)',
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '0.15rem 0.5rem',
    borderRadius: '9999px',
    border: '1px solid rgba(0,255,157,0.25)',
    margin: '0.1rem',
};

const buyBtnStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    background: 'var(--primary)',
    color: '#000',
    fontWeight: 700,
    fontSize: '0.85rem',
    padding: '0.6rem 1rem',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    marginTop: 'auto',
};

const starsStyle = (rating: number) => '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

export default function GearPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Pro Gaming Gear Database — DCPROSENS",
        "description": "Complete database of keyboards, headsets, monitors, and mousepads used by professional FPS gamers.",
        "url": "https://dcprosens.com/gear",
    };

    return (
        <div className="container" style={{ padding: '4rem 0 6rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#000', fontSize: '0.75rem', fontWeight: 800,
                    padding: '0.3rem 1rem', borderRadius: '9999px',
                    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem',
                }}>⚙️ Gaming Gear Database</span>

                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Pro Player <span className="text-gradient">Gear</span> Database
                </h1>
                <p className="hero-subtitle">
                    Every keyboard, headset, monitor and mousepad used by the world&apos;s best FPS pros — with specs, ratings and buy links.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                    {[
                        { label: '⌨️ Keyboards', href: '#keyboards' },
                        { label: '🎧 Headsets', href: '#headsets' },
                        { label: '🖥️ Monitors', href: '#monitors' },
                        { label: '🖱️ Mousepads', href: '#mousepads' },
                        { label: '🖱️ Mice', href: '/mouse-database' },
                    ].map(l => (
                        <a key={l.label} href={l.href} style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)', padding: '0.5rem 1.25rem',
                            borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600,
                            textDecoration: 'none',
                        }}>{l.label}</a>
                    ))}
                </div>
            </div>

            {/* KEYBOARDS */}
            <section id="keyboards" style={sectionStyle}>
                <h2 style={headingStyle}>⌨️ Best Gaming Keyboards for FPS</h2>
                <p style={subheadingStyle}>Keyboards used by top pros in Valorant, CS2, Apex Legends and more. Sorted by pro usage.</p>
                <div style={gridStyle}>
                    {keyboards.map(kb => (
                        <div key={kb.id} style={cardStyle}>
                            {kb.badge && <span style={badgeStyle}>{kb.badge}</span>}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{kb.brand}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>{kb.name}</h3>
                                <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{'★'.repeat(Math.floor(kb.rating))}{'☆'.repeat(5 - Math.floor(kb.rating))} {kb.rating}</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>Switch: <strong style={{ color: 'var(--text-primary)' }}>{kb.switch}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Form: <strong style={{ color: 'var(--text-primary)' }}>{kb.form}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Connect: <strong style={{ color: 'var(--text-primary)' }}>{kb.connectivity}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Price: <strong style={{ color: 'var(--primary)' }}>{kb.price}</strong></div>
                            </div>
                            {kb.proUsage.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Used by pros:</div>
                                    <div>{kb.proUsage.map(p => <span key={p} style={proTagStyle}>{p}</span>)}</div>
                                </div>
                            )}
                            <a href={kb.affiliateLink} target="_blank" rel="noopener noreferrer sponsored" style={buyBtnStyle}>
                                View on Amazon →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* HEADSETS */}
            <section id="headsets" style={sectionStyle}>
                <h2 style={headingStyle}>🎧 Best Gaming Headsets for FPS</h2>
                <p style={subheadingStyle}>Wired and wireless headsets trusted by pro players for footstep audio and clear comms.</p>
                <div style={gridStyle}>
                    {headsets.map(h => (
                        <div key={h.id} style={cardStyle}>
                            {h.badge && <span style={badgeStyle}>{h.badge}</span>}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.brand}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>{h.name}</h3>
                                <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{starsStyle(h.rating)} {h.rating}</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>Type: <strong style={{ color: h.type === 'Wireless' ? 'var(--primary)' : 'var(--text-primary)' }}>{h.type}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Driver: <strong style={{ color: 'var(--text-primary)' }}>{h.driver}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Weight: <strong style={{ color: 'var(--text-primary)' }}>{h.weight}g</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Price: <strong style={{ color: 'var(--primary)' }}>{h.price}</strong></div>
                            </div>
                            {h.proUsage.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Used by pros:</div>
                                    <div>{h.proUsage.map(p => <span key={p} style={proTagStyle}>{p}</span>)}</div>
                                </div>
                            )}
                            <a href={h.affiliateLink} target="_blank" rel="noopener noreferrer sponsored" style={buyBtnStyle}>
                                View on Amazon →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* MONITORS */}
            <section id="monitors" style={sectionStyle}>
                <h2 style={headingStyle}>🖥️ Best Gaming Monitors for FPS</h2>
                <p style={subheadingStyle}>240Hz and 360Hz monitors preferred by CS2, Valorant and Apex Legends professionals.</p>
                <div style={gridStyle}>
                    {monitors.map(m => (
                        <div key={m.id} style={cardStyle}>
                            {m.badge && <span style={badgeStyle}>{m.badge}</span>}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.brand}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>{m.name}</h3>
                                <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{starsStyle(m.rating)} {m.rating}</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>Size: <strong style={{ color: 'var(--text-primary)' }}>{m.size}&quot;</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Panel: <strong style={{ color: 'var(--text-primary)' }}>{m.panelType}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Refresh: <strong style={{ color: 'var(--primary)' }}>{m.refreshRate}Hz</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Response: <strong style={{ color: 'var(--text-primary)' }}>{m.responseTime}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Res: <strong style={{ color: 'var(--text-primary)' }}>{m.resolution}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Price: <strong style={{ color: 'var(--primary)' }}>{m.price}</strong></div>
                            </div>
                            {m.proUsage.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Used by pros:</div>
                                    <div>{m.proUsage.slice(0, 5).map(p => <span key={p} style={proTagStyle}>{p}</span>)}</div>
                                </div>
                            )}
                            <a href={m.affiliateLink} target="_blank" rel="noopener noreferrer sponsored" style={buyBtnStyle}>
                                View on Amazon →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* MOUSEPADS */}
            <section id="mousepads" style={sectionStyle}>
                <h2 style={headingStyle}>🖱️ Best Gaming Mousepads for FPS</h2>
                <p style={subheadingStyle}>Cloth and hard mousepads in every size — from compact L pads to extended XL formats for low sensitivity players.</p>
                <div style={gridStyle}>
                    {mousepads.map(mp => (
                        <div key={mp.id} style={cardStyle}>
                            {mp.badge && <span style={badgeStyle}>{mp.badge}</span>}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{mp.brand}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.25rem 0' }}>{mp.name}</h3>
                                <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{starsStyle(mp.rating)} {mp.rating}</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                                <div style={{ color: 'var(--text-secondary)' }}>Size: <strong style={{ color: 'var(--text-primary)' }}>{mp.size}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Surface: <strong style={{ color: 'var(--text-primary)' }}>{mp.surface}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Dims: <strong style={{ color: 'var(--text-primary)' }}>{mp.dimensions}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Thick: <strong style={{ color: 'var(--text-primary)' }}>{mp.thickness}</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Best for: <strong style={{ color: 'var(--primary)' }}>{mp.bestFor} sens</strong></div>
                                <div style={{ color: 'var(--text-secondary)' }}>Price: <strong style={{ color: 'var(--primary)' }}>{mp.price}</strong></div>
                            </div>
                            {mp.proUsage.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Used by pros:</div>
                                    <div>{mp.proUsage.map(p => <span key={p} style={proTagStyle}>{p}</span>)}</div>
                                </div>
                            )}
                            <a href={mp.affiliateLink} target="_blank" rel="noopener noreferrer sponsored" style={buyBtnStyle}>
                                View on Amazon →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* INTERNAL LINKS */}
            <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center',
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Also Check Out</h2>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/mouse-database" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>🖱️ Mouse Database →</Link>
                    <Link href="/pros" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>👤 Pro Player Settings →</Link>
                    <Link href="/setups" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>🏆 Full Pro Setups →</Link>
                    <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>🎮 Sensitivity Converter →</Link>
                </div>
            </div>
        </div>
    );
}
