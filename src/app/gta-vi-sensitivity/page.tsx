import type { Metadata } from "next";
import Link from "next/link";
import NotifyMeForm from "@/components/NotifyMeForm";

export const metadata: Metadata = {
    title: "GTA VI Sensitivity Converter — Coming Soon",
    description: "GTA VI hasn't launched yet, so there's no verified sensitivity/yaw data to convert accurately. Sign up and we'll email you the moment our GTA VI sensitivity converter goes live.",
    keywords: [
        'gta vi sensitivity', 'gta 6 sensitivity converter', 'gta vi mouse sensitivity',
        'gta 6 aim settings', 'gta vi sens converter',
    ],
    alternates: {
        canonical: "https://dcprosens.com/gta-vi-sensitivity",
    },
    openGraph: {
        title: "GTA VI Sensitivity Converter — Coming Soon",
        description: "Sign up to get notified the moment our GTA VI sensitivity converter goes live, with real verified data.",
        type: "website",
        url: "https://dcprosens.com/gta-vi-sensitivity",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function GtaViSensitivityPage() {
    return (
        <div className="container" style={{ padding: '5rem 0 7rem', maxWidth: '650px', textAlign: 'center' }}>
            <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: '#000',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.35rem 1.25rem',
                borderRadius: '9999px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
            }}>
                🚧 Coming Soon
            </span>
            <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                GTA VI <span className="text-gradient">Sensitivity Converter</span>
            </h1>
            <p className="hero-subtitle" style={{ marginBottom: '2.5rem' }}>
                GTA VI hasn&apos;t launched yet, so nobody — including us — has verified sensitivity/yaw data for it.
                We won&apos;t publish guessed numbers and call them accurate. The moment the game is out and we&apos;ve
                confirmed real conversion data, this page becomes a full converter.
            </p>

            <NotifyMeForm topic="gta-vi" />

            <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.85rem', marginTop: '3rem' }}>
                In the meantime, check out our <Link href="/" style={{ color: 'var(--primary, #00ff9d)' }}>universal sensitivity converter</Link> for
                18+ already-supported games, or explore <Link href="/pros" style={{ color: 'var(--primary, #00ff9d)' }}>pro player settings</Link>.
            </p>
        </div>
    );
}
