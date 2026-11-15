import Link from 'next/link';
import type { Metadata } from "next";

import JsonLd, { graph, breadcrumb, webPage } from "@/components/JsonLd";
export const metadata: Metadata = {
    title: "Contact DCPROSENS — Support & Feedback",
    description: "Get in touch with the DCPROSENS team for support, bug reports, game yaw corrections, or feature suggestions for our sensitivity converter.",
    alternates: {
        canonical: "https://dcprosens.com/contact/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "Contact DCPROSENS — Support & Feedback",
        description: "Get in touch with the DCPROSENS team for support, bug reports or feature suggestions.",
        url: "https://dcprosens.com/contact",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};


import { AskCoachForm } from '@/components/AskCoachForm';

const jsonLd = graph(
    webPage("Contact DCPROSENS", "Get in touch with the DCPROSENS team about support, corrections, partnerships or press.", "/contact/"),
    breadcrumb([{ name: "Contact", path: "/contact/" }]),
);

export default function ContactPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <JsonLd data={jsonLd} />
            <h1 style={{ marginBottom: '1rem' }}>Contact &amp; Coaching Support</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.2rem', fontSize: '1.08rem', color: 'var(--text-primary)' }}>
                    DCPROSENS is run with direct developer and coach support. Have a technical question about your sensitivity,
                    sub-tick latency, or hardware bottlenecks? Use the audit form below or reach our direct channels.
                </p>

                {/* Form de Dúvida e Auditoria Técnica */}
                <AskCoachForm />

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2rem 0 0.75rem' }}>
                    Reporting a wrong conversion
                </h2>
                <p style={{ marginBottom: '1.2rem' }}>
                    This is the message I most want to receive. Games get patched and a yaw constant can change with
                    them. To make a correction fast to verify, include the game, your DPI and in-game sensitivity, and
                    the cm/360 you measured in-game. A config line or a patch note is even better. Corrections are made
                    to the shared game data, so a single fix propagates to the converter, the per-game pages, the pro
                    profiles and the public dataset at once.
                </p>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2rem 0 0.75rem' }}>
                    Asking for a game to be added
                </h2>
                <p style={{ marginBottom: '1.2rem' }}>
                    A game only ships once its yaw can be traced to a real source — an engine confirmation, a published
                    constant, or a measurement anyone can reproduce. If you can point at one, the game usually goes live
                    the same week. If the only figure available is community-measured, it can still be added, but it
                    ships marked <strong style={{ color: 'var(--text-primary)' }}>unverified</strong> so nobody builds
                    muscle memory on a number I cannot stand behind.
                </p>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2rem 0 0.75rem' }}>
                    Press, partnerships and advertising
                </h2>
                <p style={{ marginBottom: '1.2rem' }}>
                    Media kit and ad placements are on the{' '}
                    <Link href="/advertise/" style={{ color: 'var(--primary)' }}>advertise page</Link>. Paid placement
                    never buys a recommendation in the mouse or gear databases — those are ranked on published specs,
                    and the specs are shown so you can disagree with the ranking.
                </p>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2rem 0 0.75rem' }}>
                    Reporting a bug in a tool
                </h2>
                <p style={{ marginBottom: '1.2rem' }}>
                    Everything here runs in your browser, so the two details that make a bug reproducible are which
                    browser you were using and what you did immediately before it broke. Screenshots help; a screen
                    recording helps more. The tools that use Pointer Lock — the sensitivity test, the aim trainer and
                    Aim Lab — behave differently across browsers and occasionally fight with browser extensions, so
                    mention any extension that overlays the page.
                </p>

                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2rem 0 0.75rem' }}>
                    Account, billing and privacy
                </h2>
                <p style={{ marginBottom: '2rem' }}>
                    For subscription or refund questions, write from the email address on the account so it can be
                    matched without extra back-and-forth. Data requests — export or deletion — are handled through the
                    same address; see the{' '}
                    <Link href="/privacy/" style={{ color: 'var(--primary)' }}>privacy policy</Link> for what is stored
                    and for how long.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    margin: '2rem 0',
                }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                    }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🎯</div>
                        <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Support &amp; Coach Inquiry:</p>
                        <a href="mailto:support@dcprosens.com" style={{
                            color: '#00ff9d',
                            fontSize: '1rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}>
                            support@dcprosens.com
                        </a>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                    }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🤝</div>
                        <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Partnerships &amp; Media:</p>
                        <a href="mailto:partnerships@dcprosens.com" style={{
                            color: '#00e5ff',
                            fontSize: '1rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}>
                            partnerships@dcprosens.com
                        </a>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                    }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>💳</div>
                        <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Billing &amp; Subscriptions:</p>
                        <a href="mailto:billing@dcprosens.com" style={{
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}>
                            billing@dcprosens.com
                        </a>
                    </div>
                </div>

                {/* Direct Social & Founder Identity Verification */}
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    marginTop: '1.5rem',
                }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Verified Official Channels &amp; Founder Contact
                    </h3>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Connect directly with founder <strong>Dalto Cardoso (Dalto Outlier)</strong> or follow official DCPROSENS updates:
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <a
                            href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.9rem',
                                background: 'rgba(10, 102, 194, 0.2)',
                                border: '1px solid rgba(10, 102, 194, 0.5)',
                                borderRadius: '8px',
                                color: '#70b5f9',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            💼 LinkedIn (Dalto Cardoso) ↗
                        </a>
                        <a
                            href="https://www.instagram.com/dcprosensofficial/"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.9rem',
                                background: 'rgba(225, 48, 108, 0.16)',
                                border: '1px solid rgba(225, 48, 108, 0.45)',
                                borderRadius: '8px',
                                color: '#ff85b3',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            📸 Instagram (@dcprosensofficial) ↗
                        </a>
                        <a
                            href="https://www.tiktok.com/@dcprosens"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.9rem',
                                background: 'rgba(0, 242, 234, 0.12)',
                                border: '1px solid rgba(0, 242, 234, 0.4)',
                                borderRadius: '8px',
                                color: '#5ce1e6',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            🎵 TikTok (@dcprosens) ↗
                        </a>
                        <a
                            href="https://x.com/dcprosens"
                            target="_blank"
                            rel="me noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.9rem',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                borderRadius: '8px',
                                color: '#e2e8f0',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            𝕏 @dcprosens ↗
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
