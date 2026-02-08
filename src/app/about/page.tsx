import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | DCPROSENS",
    description: "Learn about DCPROSENS, the ultimate sensitivity converter and DPI calculator for competitive gamers built by gamers.",
};

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | DCPROSENS",
    description: "Learn about DCPROSENS, the ultimate sensitivity converter and DPI calculator for competitive gamers built by gamers.",
};

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>About <span className="text-gradient">DCPROSENS</span></h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    DCPROSENS is the ultimate tool for competitive gamers. Our mission is to provide the most accurate and easy-to-use sensitivity converters and DPI tools to help you perform at your best.
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    Founded by gamers for gamers, we understand the struggle of switching between FPS titles and trying to maintain consistent muscle memory. Our algorithms ensure that your 360° distance remains constant, preserving your aim across every game you play.
                </p>

                <p>
                    We are constantly updating our database with the latest titles and refining our calculations (e.g., eDPI, cm/360) to stay ahead of the curve.
                </p>
            </div>
        </div>
    );
}
