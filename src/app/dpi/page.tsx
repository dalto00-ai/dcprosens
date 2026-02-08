import type { Metadata } from "next";
import DpiCalculator from '@/components/DpiCalculator';

export const metadata: Metadata = {
    title: "DPI & eDPI Calculator | DCPROSENS",
    description: "Calculate your True eDPI and convert mouse sensitivity instantly.",
};

export default function DpiPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
                DPI & eDPI <span className="text-gradient">Calculator</span>
            </h1>
            <DpiCalculator />
        </div>
    );
}
