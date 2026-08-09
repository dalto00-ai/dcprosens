import type { Metadata } from "next";
import Link from "next/link";
import { dpiGuideContent } from "@/lib/dpiGuideContent";

export const metadata: Metadata = {
    title: "DPI & Mouse Settings Guides — Games Without a Sensitivity Converter",
    description: "Best DPI and mouse settings for games that don't use a rotating first-person camera (MOBAs, mobile battle royales) — League of Legends, Dota 2, Free Fire and more.",
    alternates: {
        canonical: "https://dcprosens.com/dpi-guide",
    },
    robots: { index: true, follow: true },
};

export default function DpiGuideIndexPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem', maxWidth: '700px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    DPI & Mouse <span className="text-gradient">Settings Guides</span>
                </h1>
                <p className="hero-subtitle">
                    These games don&apos;t use a rotating first-person camera, so there&apos;s no cm/360 sensitivity to convert —
                    what matters instead is DPI and click precision. See our{' '}
                    <Link href="/" style={{ color: 'var(--primary)' }}>full sensitivity converter</Link> for FPS and third-person games.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {dpiGuideContent.map((g) => (
                    <Link
                        key={g.gameId}
                        href={`/dpi-guide/${g.gameId}`}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem 1.5rem',
                            textDecoration: 'none',
                        }}
                    >
                        <div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{g.displayName}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{g.genre}</div>
                        </div>
                        <span style={{ color: 'var(--primary)' }}>→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
