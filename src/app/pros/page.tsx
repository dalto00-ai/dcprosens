import type { Metadata } from 'next';
import ProsList from './ProsList';

import JsonLd, { graph, breadcrumb, collectionPage } from '@/components/JsonLd';
// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: 'Pro Player Sensitivity Settings 2026',
    description:
        'Exact DPI, sensitivity, eDPI and cm/360 for 20+ pros. TenZ: 0.3 @ 800 DPI (240 eDPI). s1mple: 3.09 @ 400 DPI. Plus ZywOo, NiKo, Aspas and more.',
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
        'best sensitivity fps 2026',
        'how to find your sensitivity',
        'gaming pro settings database',
        'ropz sensitivity',
        'karrigan settings',
        'm0nesy cs2 sens',
        'bugha fortnite sensitivity',
    ],
    alternates: {
        canonical: 'https://dcprosens.com/pros/',
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: 'Pro Player Sensitivity Settings 2026 — TenZ, s1mple, ZywOo & More | DCPROSENS',
        description:
            'Exact DPI, sensitivity, eDPI and cm/360 for 20+ world-class FPS pros. TenZ, s1mple, ZywOo, NiKo, Aspas, Demon1, ropz and more.',
        url: 'https://dcprosens.com/pros/',
        type: 'website',
        siteName: 'DCPROSENS',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pro Player Sensitivity Settings 2026 | DCPROSENS',
        description: 'TenZ, s1mple, ZywOo, NiKo — exact DPI, sensitivity and eDPI for 20+ world-class FPS pros.',
        creator: '@dcprosens',
        images: ["/og-image.png"],
    },
};


const jsonLd = graph(
    collectionPage('Pro Player Settings Database', 'DPI, sensitivity, eDPI, cm/360 and full peripheral setups for professional FPS players.', '/pros/'),
    breadcrumb([{ name: 'Pro Settings', path: '/pros/' }]),
);

export default function ProsPage() {
    return (
        <>
        <JsonLd data={jsonLd} />
        {/* No Suspense boundary: it existed only because ProsList read
            useSearchParams, which opted this route out of prerendering and left
            the static HTML containing the fallback spinner instead of all 24
            players. With filtering moved to local state, the list prerenders. */}
        <ProsList />
        </>
    );
}
