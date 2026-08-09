import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProsList from './ProsList';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: 'Pro Player Sensitivity Settings 2026',
    description:
        'Find exact sensitivity settings for 20+ pro players. TenZ uses 0.3 @ 800 DPI (240 eDPI). s1mple uses 3.09 @ 400 DPI. ZywOo, NiKo, Aspas, Demon1, ropz, dev1ce, m0NESY settings and more.',
    keywords: [
        'tenz sensitivity',
        's1mple sensitivity',
        'zywoo settings',
        'niko cs2 sens',
        'aspas valorant sensitivity',
        'demon1 settings',
        'pro player dpi',
        'cs2 pro sensitivity',
        'valorant pro settings',
        'apex legends pro sensitivity',
        'professional gamer mouse settings',
        'pro player edpi',
        'best sensitivity fps 2025',
        'how to find your sensitivity',
        'gaming pro settings database',
        'ropz sensitivity',
        'karrigan settings',
        'm0nesy cs2 sens',
        'bugha fortnite sensitivity',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/pros',
    },
    openGraph: {
        title: 'Pro Player Sensitivity Settings 2025 — TenZ, s1mple, ZywOo & More | DCPROSENS',
        description:
            'Exact DPI, sensitivity, eDPI and cm/360 for 20+ world-class FPS pros. TenZ, s1mple, ZywOo, NiKo, Aspas, Demon1, ropz and more.',
        url: 'https://dcprosens.com/pros',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Player Sensitivity Settings 2025 | DCPROSENS',
        description: 'TenZ, s1mple, ZywOo, NiKo — exact DPI, sensitivity and eDPI for 20+ world-class FPS pros.',
        creator: '@dcprosens',
    },
};

export default function ProsPage() {
    return (
        <Suspense fallback={
            <div className="container" style={{ padding: '4rem 0 6rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Pro Player <span className="text-gradient">Sensitivity</span> Hub
                </h1>
                <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>
                    Exact DPI, sensitivity, eDPI and cm/360 for 20+ world-class FPS professionals.
                </p>
                <div className="spinner" style={{ margin: '0 auto' }}></div>
            </div>
        }>
            <ProsList />
        </Suspense>
    );
}
