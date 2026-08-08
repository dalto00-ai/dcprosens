'use client';

import { useState } from 'react';

export default function NotifyMeForm({ topic }: { topic: string }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const response = await fetch('https://dcprosens.com/api/notify-me.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, topic }),
            });
            if (!response.ok) throw new Error();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <p style={{ color: 'var(--primary, #00ff9d)', fontWeight: 600, textAlign: 'center' }}>
                ✓ You&apos;re on the list — we&apos;ll email you the moment it&apos;s ready.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#0b0b0f',
                    color: '#fff',
                    minWidth: '240px',
                    fontSize: '0.95rem',
                }}
            />
            <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                    padding: '0.85rem 1.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--primary, #00ff9d)',
                    color: '#000',
                    fontWeight: 700,
                    cursor: 'pointer',
                }}
            >
                {status === 'sending' ? 'Submitting...' : 'Notify Me'}
            </button>
            {status === 'error' && (
                <p style={{ color: '#ff7582', width: '100%', textAlign: 'center', fontSize: '0.85rem' }}>
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}
