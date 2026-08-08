import type { Metadata } from "next";
import SensitivityTestGated from "@/components/SensitivityTestGated";

export const metadata: Metadata = {
    title: "Sensitivity Test Game — Find Your Speed & Precision | DCPROSENS",
    description: "Free browser mini-game that measures your flick speed and precision, then tells you whether your mouse sensitivity is too high, too low, or balanced. Works on desktop and mobile.",
    keywords: [
        'sensitivity test game', 'mouse sensitivity test', 'aim precision test',
        'flick test game', 'gaming sensitivity quiz', 'test my sensitivity',
        'valorant sensitivity test', 'cs2 sensitivity test', 'free aim test',
    ],
    alternates: {
        canonical: "https://dcprosens.com/sensitivity-test",
    },
    openGraph: {
        title: "Sensitivity Test Game — Find Your Speed & Precision",
        description: "Free mini-game that measures your flick speed and precision to help you dial in your mouse sensitivity.",
        type: "website",
        url: "https://dcprosens.com/sensitivity-test",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sensitivity Test Game | DCPROSENS",
        description: "Free mini-game that measures your flick speed and precision.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function SensitivityTestPage() {
    return (
        <div className="container" style={{ padding: '4rem 0 6rem', maxWidth: '700px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                    marginBottom: '1.25rem',
                }}>
                    🎮 Free Mini-Game
                </span>
                <h1 className="hero-title" style={{ marginBottom: '1.25rem' }}>
                    Sensitivity <span className="text-gradient">Test</span>
                </h1>
                <p className="hero-subtitle">
                    Hit the targets as fast and precisely as you can. We&apos;ll tell you whether your sensitivity looks too high, too low, or balanced.
                </p>
            </div>

            <SensitivityTestGated />
        </div>
    );
}
