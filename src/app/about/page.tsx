import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
    title: "About DCPROSENS | Mouse Sens Converter",
    description: "Learn about DCPROSENS, the ultimate sens converter and sensitivity calculator built for competitive gamers by gamers.",
};

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>About <span className="text-gradient">DCPROSENS</span></h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    DCPROSENS is the ultimate tool for competitive gamers. Our mission is to provide the most accurate and easy-to-use <strong><Link href="/" style={{ color: 'var(--brand-primary)' }}>sens converter</Link></strong> and <Link href="/dpi" style={{ color: 'var(--brand-primary)' }}>DPI sens converter tools</Link> to help you perform at your best.
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    Founded by gamers for gamers, we understand the struggle of switching between FPS titles and trying to maintain consistent muscle memory. Our <strong>sensitivity calculator</strong> ensures that your 360° distance remains constant, preserving your aim when you need to <strong>convert sens</strong> across every game you play.
                </p>

                <p>
                    We are constantly updating our database with the latest titles and refining our calculations (e.g., eDPI, cm/360) to stay ahead of the curve.
                </p>
            </div>
        </div>
    );
}
