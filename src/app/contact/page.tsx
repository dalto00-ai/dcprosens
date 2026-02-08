import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | DCPROSENS",
    description: "Get in touch with the DCPROSENS team for support, bug reports, or feature suggestions.",
};

export default function ContactPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Contact Us</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '2rem' }}>
                    Have a suggestion, found a bug, or just want to verify a game calculation? We'd love to hear from you.
                </p>

                <div style={{
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                }}>
                    <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email us at:</p>
                    <a href="mailto:support@dcprosens.com" style={{
                        color: 'var(--primary)',
                        fontSize: '1.2rem',
                        fontWeight: 500
                    }}>
                        support@dcprosens.com
                    </a>
                </div>
            </div>
        </div>
    );
}
