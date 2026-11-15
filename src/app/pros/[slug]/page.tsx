// Server Component — SEO metadata via generateMetadata, CopyButton is a client island
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pros, getProBySlug } from '@/lib/pros';
import CopyButton from '@/components/CopyButton';
import { buildProAnalysis } from '@/lib/proAnalysis';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

// ─── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams() {
    return pros.map((p) => ({ slug: p.slug }));
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pro = getProBySlug(slug);
    if (!pro) return { title: 'Player Not Found' };

    // Title budget is ~47 chars before " | DCPROSENS" is appended (keeps the
    // full <title> under Google/Bing's ~60-char cutoff) — name+game combos
    // range up to 23 chars, so the tier below covers the worst case safely.
    const titleTiers = [
        `${pro.name} — ${pro.game} Sensitivity Settings`,
        `${pro.name} — ${pro.game} Settings`,
        `${pro.name} Settings`,
    ];
    const title = titleTiers.find((t) => t.length <= 47) ?? titleTiers[titleTiers.length - 1];

    return {
        title,
        // Trimmed to what a search result actually renders — the tail listing
        // every peripheral was always cut off, taking the cm/360 with it.
        description: `${pro.name} plays ${pro.game} at ${pro.dpi} DPI and ${pro.sens} sens — ${pro.edpi} eDPI, ${pro.cm360} cm/360. Full config, gear and crosshair.`,
        keywords: [
            `${pro.name} sensitivity`,
            `${pro.name} dpi`,
            `${pro.name} settings`,
            `${pro.name} config`,
            `${pro.name} mouse`,
            `${pro.name} crosshair`,
            `${pro.game} pro settings`,
            `${pro.game} sensitivity`,
            `${pro.team} settings`,
            'pro player dpi 2026',
            `${pro.name} ${pro.game} setup`,
            `${pro.name} gear`,
            `${pro.name} keyboard`,
            `${pro.name} monitor`,
            `${pro.name} edpi`,
            `${pro.name} cm360`,
            `professional ${pro.game} settings`,
            'pro gamer sensitivity 2026',
        ],
        alternates: {
            canonical: `https://dcprosens.com/pros/${pro.slug}/`,
        },
        openGraph: {
            // Inherited from the root layout only when this page omits openGraph
            // entirely — declaring the object here replaces the parent's, so the
            // image has to be restated or the page ships with no og:image at all.
            images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
            title: `${pro.name} Sensitivity Settings 2026 — ${pro.game} | DCPROSENS`,
            description: `${pro.name} uses ${pro.dpi} DPI and ${pro.sens} sensitivity in ${pro.game}. Mouse: ${pro.mouse}. eDPI: ${pro.edpi}. cm/360: ${pro.cm360}.`,
            url: `https://dcprosens.com/pros/${pro.slug}/`,
            type: 'profile',
            siteName: 'DCPROSENS',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${pro.name} Sensitivity & Settings 2026 | DCPROSENS`,
            description: `${pro.name} — ${pro.dpi} DPI, ${pro.sens} sens, ${pro.edpi} eDPI in ${pro.game}. Mouse: ${pro.mouse}.`,
            creator: '@dcprosens',
            images: ["/og-image.png"],
        },
    };
}

// ─── Game Badge Colors ────────────────────────────────────────────────────────
const GAME_COLORS: Record<string, { bg: string; color: string }> = {
    Valorant:       { bg: 'rgba(255,70,85,0.15)',  color: '#ff4655' },
    CS2:            { bg: 'rgba(201,185,109,0.15)', color: '#c9b96d' },
    'Apex Legends': { bg: 'rgba(205,51,19,0.15)',  color: '#cd3313' },
    'Overwatch 2':  { bg: 'rgba(0,184,212,0.15)',  color: '#00b8d4' },
    Fortnite:       { bg: 'rgba(86,148,216,0.15)', color: '#5694d8' },
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function ProPlayerPage({ params }: Props) {
    const { slug } = await params;
    const pro = getProBySlug(slug);
    if (!pro) notFound();

    const analysis = buildProAnalysis(pro);

    const gameColor = GAME_COLORS[pro.game] ?? { bg: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' };
    const canonicalUrl = `https://dcprosens.com/pros/${pro.slug}/`;

    // ─── Game ID mapping for sensitivity converter link ───────────────────────
    const GAME_CONVERTER_MAP: Record<string, string> = {
        valorant: 'valorant',
        csgo:     'cs2',
        apex:     'apex',
        overwatch:'overwatch',
        fortnite: 'fortnite',
    };
    const converterGame = GAME_CONVERTER_MAP[pro.gameId] ?? pro.gameId;

    // ─── JSON-LD Structured Data ──────────────────────────────────────────────
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': canonicalUrl,
                name: pro.name,
                alternateName: pro.realName,
                description: pro.bio,
                url: canonicalUrl,
                nationality: { '@type': 'Country', name: pro.country },
                memberOf: { '@type': 'SportsTeam', name: pro.team },
                sameAs: [
                    pro.social.twitter ? `https://twitter.com/${pro.social.twitter}` : null,
                    pro.social.twitch  ? `https://twitch.tv/${pro.social.twitch}`   : null,
                    pro.social.youtube ? `https://youtube.com/@${pro.social.youtube}` : null,
                ].filter(Boolean),
                knowsAbout: [pro.game, 'Esports', 'FPS Gaming', 'Competitive Gaming'],
            },
            {
                '@type': 'WebPage',
                '@id': canonicalUrl + '#webpage',
                url: canonicalUrl,
                name: `${pro.name} Sensitivity Settings 2026 — DCPROSENS`,
                description: `Complete sensitivity, DPI, eDPI, gear and crosshair settings for ${pro.name} (${pro.game}).`,
                inLanguage: 'en-US',
                about: { '@id': canonicalUrl },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://dcprosens.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Pro Players', item: 'https://dcprosens.com/pros/' },
                    { '@type': 'ListItem', position: 3, name: pro.name,      item: canonicalUrl },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '3rem 0 6rem', maxWidth: '900px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '2.5rem',
            }}>
                <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
                <span>›</span>
                <Link href="/pros/" style={{ color: 'var(--text-muted)' }}>Pro Players</Link>
                <span>›</span>
                <span style={{ color: 'var(--text-primary)' }}>{pro.name}</span>
            </nav>

            {/* ── HERO SECTION ──────────────────────────────────────────────── */}
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative glow */}
                <div style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {/* Avatar Circle */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        flexShrink: 0,
                        boxShadow: '0 0 0 3px rgba(0,255,157,0.2)',
                    }}>
                        {pro.countryFlag}
                    </div>

                    <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                            <h1 style={{
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                                margin: 0,
                            }}>
                                {pro.name}
                            </h1>
                            <span style={{
                                background: gameColor.bg,
                                color: gameColor.color,
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                            }}>
                                {pro.game}
                            </span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>{pro.realName}</strong>
                            {' · '}
                            {pro.team}
                            {' · '}
                            {pro.role}
                            {' · '}
                            {pro.country}
                        </div>
                        {pro.active && (
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: 'var(--primary)',
                                background: 'rgba(0,255,157,0.08)',
                                padding: '0.2rem 0.65rem',
                                borderRadius: '9999px',
                                border: '1px solid rgba(0,255,157,0.2)',
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
                                Active Pro
                            </span>
                        )}
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap' }}>
                        {pro.social.twitter && (
                            <a href={`https://twitter.com/${pro.social.twitter}`} target="_blank" rel="noopener noreferrer" style={{
                                background: 'rgba(29,155,240,0.1)',
                                border: '1px solid rgba(29,155,240,0.3)',
                                color: '#1d9bf0',
                                padding: '0.4rem 0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}>
                                𝕏 Twitter
                            </a>
                        )}
                        {pro.social.twitch && (
                            <a href={`https://twitch.tv/${pro.social.twitch}`} target="_blank" rel="noopener noreferrer" style={{
                                background: 'rgba(145,70,255,0.1)',
                                border: '1px solid rgba(145,70,255,0.3)',
                                color: '#9146ff',
                                padding: '0.4rem 0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}>
                                📺 Twitch
                            </a>
                        )}
                        {pro.social.youtube && (
                            <a href={`https://youtube.com/@${pro.social.youtube}`} target="_blank" rel="noopener noreferrer" style={{
                                background: 'rgba(255,0,0,0.1)',
                                border: '1px solid rgba(255,0,0,0.3)',
                                color: '#ff0000',
                                padding: '0.4rem 0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}>
                                ▶️ YouTube
                            </a>
                        )}
                    </div>
                </div>

                {/* Bio */}
                <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                    marginTop: '1.5rem',
                    marginBottom: 0,
                    maxWidth: '700px',
                }}>
                    {pro.bio}
                </p>
            </div>

            {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
            }}>
                {/* ── SENSITIVITY SETTINGS CARD ─────────────────────────────── */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0,255,157,0.08), rgba(112,0,255,0.05))',
                        borderBottom: '1px solid var(--border-color)',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>🎯</span>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Sensitivity Settings
                        </h2>
                    </div>

                    <div style={{ padding: '1.25rem 1.5rem' }}>
                        {[
                            { label: 'DPI',          value: pro.dpi.toString(),            highlight: true },
                            { label: 'Sensitivity',  value: pro.sens.toString(),            highlight: true },
                            { label: 'eDPI',         value: pro.edpi.toString(),            highlight: true },
                            { label: 'cm/360',       value: `${pro.cm360} cm`,             highlight: true },
                            { label: 'Polling Rate', value: `${pro.pollingRate} Hz`,        highlight: false },
                            { label: 'Windows Sens', value: pro.windowsSens.toString(),     highlight: false },
                            { label: 'Raw Input',    value: pro.rawInput ? 'On' : 'Off',   highlight: false },
                            ...(pro.zoomSens !== undefined ? [{ label: 'Zoom Sens', value: pro.zoomSens.toString(), highlight: false }] : []),
                        ].map(({ label, value, highlight }) => (
                            <div key={label} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.7rem 0',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}>
                                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{label}</span>
                                <span style={{
                                    fontSize: highlight ? '1rem' : '0.88rem',
                                    fontWeight: highlight ? 800 : 600,
                                    color: highlight ? 'var(--primary)' : 'var(--text-primary)',
                                }}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── GEAR CARD ─────────────────────────────────────────────── */}
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(112,0,255,0.08), rgba(0,255,157,0.05))',
                        borderBottom: '1px solid var(--border-color)',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>⚙️</span>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Gear Setup
                        </h2>
                    </div>

                    <div style={{ padding: '1.25rem 1.5rem' }}>
                        {[
                            { icon: '🖱️', label: 'Mouse',     value: pro.mouse },
                            { icon: '⌨️', label: 'Keyboard',  value: pro.keyboard },
                            { icon: '🎧', label: 'Headset',   value: pro.headset },
                            { icon: '🖥️', label: 'Monitor',   value: `${pro.monitor} (${pro.monitorHz}Hz)` },
                            { icon: '📦', label: 'Mousepad',  value: pro.mousepad },
                        ].map(({ icon, label, value }) => (
                            <div key={label} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.7rem 0',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}>
                                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
                                <div>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '0.15rem', textTransform: 'uppercase' }}>
                                        {label}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                                        {value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CROSSHAIR SECTION ─────────────────────────────────────────── */}
            {pro.crosshairCode && (
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255,70,85,0.08), rgba(112,0,255,0.05))',
                        borderBottom: '1px solid var(--border-color)',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>➕</span>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Valorant Crosshair Code
                        </h2>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                    }}>
                        <code style={{
                            flex: 1,
                            minWidth: '200px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem',
                            color: 'var(--primary)',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                            lineHeight: 1.5,
                        }}>
                            {pro.crosshairCode}
                        </code>
                        <CopyButton code={pro.crosshairCode} />
                    </div>

                    <p style={{
                        margin: '0 1.5rem 1.25rem',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                    }}>
                        In Valorant: Settings → Crosshair → Import Profile Code → Paste code above.
                    </p>
                </div>
            )}

            {/* ── TRY THIS SENSITIVITY CTA ──────────────────────────────────── */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(0,255,157,0.06), rgba(112,0,255,0.06))',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.25rem',
                boxShadow: '0 4px 24px rgba(0,255,157,0.08)',
            }}>
                <div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>
                        🎯 Try {pro.name}&apos;s Sensitivity
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '480px' }}>
                        Use our free converter to match {pro.name}&apos;s cm/360 ({pro.cm360} cm) to your own DPI
                        and see how it feels in {pro.game}. No login required.
                    </p>
                </div>
                <Link href={`/?game=${converterGame}`} style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.75rem',
                    background: 'var(--primary)',
                    color: '#000',
                    fontWeight: 800,
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    boxShadow: '0 4px 12px rgba(0,255,157,0.25)',
                    flexShrink: 0,
                }}>
                    Open Converter ⚡
                </Link>
            </div>

            {/* ── ACHIEVEMENTS ──────────────────────────────────────────────── */}
            {pro.achievements.length > 0 && (
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(201,185,109,0.08), rgba(0,0,0,0))',
                        borderBottom: '1px solid var(--border-color)',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>🏆</span>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Career Achievements
                        </h2>
                    </div>
                    <ul style={{ padding: '1.25rem 1.5rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {pro.achievements.map((a, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                            }}>
                                <span style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: 'rgba(201,185,109,0.12)',
                                    color: '#c9b96d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    flexShrink: 0,
                                }}>
                                    {i + 1}
                                </span>
                                {a}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ── SETTINGS ANALYSIS ─────────────────────────────────────────── */}
            {/* Derived entirely from this player's own numbers (see
                lib/proAnalysis.ts) — the profiles used to be spec tables with a
                two-line bio, which Google filed as "crawled, not indexed". */}
            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    What {pro.name}&apos;s Settings Actually Mean
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '0 0 1.25rem' }}>
                    Calculated from {pro.name}&apos;s DPI, in-game sensitivity and gear against every other {pro.game} pro in our database.
                </p>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '75ch' }}>
                    {analysis.paragraphs.map((para, i) => (
                        <p key={i} style={{ margin: 0 }}>{para}</p>
                    ))}
                </div>

                {analysis.conversions.length > 0 && (
                    <>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2rem 0 0.75rem', color: 'var(--text-primary)' }}>
                            {pro.name}&apos;s Sensitivity in Other Games
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem', maxWidth: '75ch', lineHeight: 1.8 }}>
                            Each value below produces the same {pro.cm360} cm/360 as {pro.name}&apos;s {pro.game} setup, using each
                            game&apos;s real yaw constant rather than a shared approximation.
                        </p>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <th style={{ textAlign: 'left', padding: '0.6rem 0.6rem 0.6rem 0' }}>Game</th>
                                        <th style={{ textAlign: 'left', padding: '0.6rem' }}>Sensitivity</th>
                                        <th style={{ textAlign: 'left', padding: '0.6rem' }}>Matches</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analysis.conversions.map((c) => (
                                        <tr key={c.game} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '0.6rem 0.6rem 0.6rem 0', color: 'var(--text-primary)', fontWeight: 600 }}>{c.game}</td>
                                            <td style={{ padding: '0.6rem', fontVariantNumeric: 'tabular-nums' }}>{c.sens}</td>
                                            <td style={{ padding: '0.6rem', color: 'var(--text-muted)' }}>{c.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {analysis.peers.length > 0 && (
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem', lineHeight: 1.8, maxWidth: '75ch' }}>
                        Compare against other {pro.game} pros:{' '}
                        {analysis.peers.map((peer, i) => (
                            <span key={peer.slug}>
                                {i > 0 && ', '}
                                <Link href={`/pros/${peer.slug}/`} style={{ color: 'var(--primary)' }}>
                                    {peer.name} ({peer.edpi} eDPI)
                                </Link>
                            </span>
                        ))}
                        {' — or put them side by side in the '}
                        <Link href="/pros/compare/" style={{ color: 'var(--primary)' }}>Pro Compare tool</Link>.
                    </p>
                )}
            </section>

            {/* ── BOTTOM CTAs ───────────────────────────────────────────────── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem',
            }}>
                <Link href="/ebook/" style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📖</div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Precision Aim System
                    </h3>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        4-Part Technical Manifesto — learn to calibrate and lock in your perfect sensitivity like the pros.
                    </p>
                    <span style={{ color: 'var(--primary)', fontSize: '0.83rem', fontWeight: 700 }}>
                        Get Ebook for $9 →
                    </span>
                </Link>

                <Link href="/mouse-database/" style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🖱️</div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Mouse Database
                    </h3>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Browse every top pro gaming mouse. Filter by weight, sensor, shape — find your perfect match.
                    </p>
                    <span style={{ color: 'var(--primary)', fontSize: '0.83rem', fontWeight: 700 }}>
                        Browse Mice →
                    </span>
                </Link>

                <Link href="/pros/" style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        All Pro Players
                    </h3>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Compare {pro.name}&apos;s settings against every other pro in the database.
                    </p>
                    <span style={{ color: 'var(--primary)', fontSize: '0.83rem', fontWeight: 700 }}>
                        View All Pros →
                    </span>
                </Link>
            </div>

            {/* ── BACK LINK ─────────────────────────────────────────────────── */}
            <Link href="/pros/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
            }}>
                ← Back to Pro Players Hub
            </Link>
        </div>
    );
}
