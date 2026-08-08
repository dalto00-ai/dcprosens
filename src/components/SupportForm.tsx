'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import styles from '@/app/dashboard/Dashboard.module.css';

export default function SupportForm() {
    const { user, userData } = useAuth();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.email) return;

        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('https://dcprosens.com/api/send-support-message.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    name: userData?.displayName || user.email.split('@')[0],
                    subject,
                    message,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message.');
            }

            setStatus('success');
            setSubject('');
            setMessage('');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.');
        }
    };

    return (
        <div className={styles.panel}>
            <h2 className={styles.panelTitle}>🎧 Support</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                Found a bug or need help? Send us a message and we&apos;ll reply to <strong>{user?.email}</strong>.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    maxLength={150}
                    required
                />
                <textarea
                    className={styles.input}
                    placeholder="How can we help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={5000}
                    rows={4}
                    required
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
                <button type="submit" disabled={status === 'sending'} className={styles.saveBtn}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                    <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                        ✓ Message sent! We&apos;ll get back to you soon.
                    </p>
                )}
                {status === 'error' && (
                    <p style={{ color: '#ff7582', fontSize: '0.85rem', fontWeight: 600 }}>
                        ⚠️ {errorMessage}
                    </p>
                )}
            </form>
        </div>
    );
}
