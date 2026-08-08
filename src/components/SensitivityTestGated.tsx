'use client';

import { useAuth } from '@/components/AuthProvider';
import SensitivityTestGame from '@/components/SensitivityTestGame';

// Free for anyone with an account — unlimited plays, no payment involved.
// This is a lighter gate than PremiumGuard: it only requires being signed
// in (to build an audience/email list), not a paid subscription.
export default function SensitivityTestGated() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: '#94a3b8' }}>
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: '#0b0b0f',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
            }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎮</div>
                <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>Sign up free to play</h2>
                <p style={{ color: '#94a3b8', maxWidth: '420px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                    Create a free DCPROSENS account to play unlimited rounds — no payment required.
                </p>
                <a
                    href="/login"
                    style={{
                        display: 'inline-block',
                        background: '#00ff9d',
                        color: '#000',
                        fontWeight: 700,
                        padding: '0.85rem 2rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                    }}
                >
                    Sign Up Free
                </a>
            </div>
        );
    }

    return <SensitivityTestGame />;
}
