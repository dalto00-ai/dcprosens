import type { Metadata } from "next";
import DpiCalculator from '@/components/DpiCalculator';

export const metadata: Metadata = {
    title: "DPI & eDPI Calculator",
    description: "Calculate your True eDPI and convert mouse sensitivity instantly. Find the perfect DPI and sensitivity combination for competitive gaming.",
    alternates: {
        canonical: "https://dcprosens.com/dpi",
    },
    openGraph: {
        title: "DPI & eDPI Calculator | DCPROSENS",
        description: "Calculate your True eDPI and convert mouse sensitivity instantly.",
        type: "website",
        url: "https://dcprosens.com/dpi",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DpiPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
                DPI &amp; eDPI <span className="text-gradient">Calculator</span>
            </h1>
            <DpiCalculator />
        </div>
    );
}
