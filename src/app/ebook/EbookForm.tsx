"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './EbookForm.module.css';

export default function EbookForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [game, setGame] = useState('valorant');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email || !game) {
            setErrorMessage('Please fill in all required fields.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/lead.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, game }),
            }).catch(() => null);

            // If the server responded with a validation error (e.g. invalid email)
            if (res && !res.ok) {
                const data = await res.json().catch(() => ({}));
                if (data.error) {
                    setErrorMessage(data.error);
                    setStatus('error');
                    return;
                }
            }

            // Successfully captured or gracefully unlocked
            setStatus('success');
        } catch {
            // Graceful unlock for user
            setStatus('success');
        }
    };

    return (
        <div className={styles.splitGrid}>
            {/* BOOK VISUAL (LEFT) */}
            <div className={styles.coverWrapper}>
                <div className={styles.bookContainer}>
                    <div className={styles.book3D}>
                        <Image
                            src="/ebook-cover.png"
                            alt="The Architect of Precision eBook Cover by DCPROSENS"
                            width={320}
                            height={420}
                            className={styles.coverImg}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.floatingStats}>
                    <span>📖 80+ Pages</span>
                    <span>⚡ 100% Free</span>
                    <span>📈 Aim Coach Calibrated</span>
                </div>
            </div>

            {/* SIGNUP FORM (RIGHT) */}
            <div className={styles.formCard}>
                {status === 'success' ? (
                    <div className={styles.successPanel}>
                        <div className={styles.successIcon}>🏆</div>
                        <h3 className={styles.successTitle}>Registration Confirmed!</h3>
                        <p className={styles.successDesc}>
                            Hello <strong>{name}</strong>! Your guide <strong>The Architect of Precision</strong> has been unlocked.
                        </p>
                        
                        <div className={styles.downloadBox}>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Click below to download your Aim Calibration Checklist immediately:
                            </p>
                            <a 
                                href="/Aim_Calibration_Checklist.txt" 
                                download="Aim_Calibration_Checklist.txt"
                                className={styles.downloadBtn}
                            >
                                Download Free Checklist (.TXT) ⬇️
                            </a>
                        </div>
                        
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem', textAlign: 'center' }}>
                            Your checklist was generated for <strong>{email}</strong>. Click the download button above to get your file instantly — no email wait required.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h3 className={styles.formTitle}>Download Free Guide</h3>
                        <p className={styles.formSubtitle}>Enter your details below to unlock instant access.</p>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Your Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={status === 'submitting'}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Your Email Address</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="e.g. john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'submitting'}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Primary Competitive Game</label>
                            <select
                                className={styles.select}
                                value={game}
                                onChange={(e) => setGame(e.target.value)}
                                disabled={status === 'submitting'}
                            >
                                <option value="valorant">Valorant</option>
                                <option value="cs2">Counter-Strike 2 (CS2)</option>
                                <option value="apex">Apex Legends</option>
                                <option value="r6">Rainbow Six Siege</option>
                                <option value="fortnite">Fortnite</option>
                            </select>
                        </div>

                        {status === 'error' && (
                            <div className={styles.errorBox}>
                                ⚠️ {errorMessage}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={styles.submitBtn}
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Unlocking Access...' : 'Unlock Precision Aim Checklist ⚡'}
                        </button>

                        <p className={styles.spamNotice}>
                            🛡️ Zero spam guaranteed. Your data is protected under our Privacy Policy.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
