import type { Metadata } from "next";
import DpiCalculator from '@/components/DpiCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "DPI Sens Converter & eDPI Calculator | DCPROSENS",
    description: "Calculate your True eDPI and use our dpi sens converter to adjust your mouse sensitivity across games instantly.",
};

export default function DpiPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
                DPI Sens Converter & eDPI <span className="text-gradient">Calculator</span>
            </h1>

            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Understanding your effective DPI (eDPI) is critical for consistent aim. Use our <strong>dpi sens converter</strong> below.
                Want to convert your sens to another game instead? Head over to our <Link href="/" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>Sens Converter</Link>.
            </p>

            <DpiCalculator />
        </div>
    );
}
