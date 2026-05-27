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
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, game }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
            } else {
                setErrorMessage(data.error || 'Algo deu errado. Tente novamente.');
                setStatus('error');
            }
        } catch (err) {
            setErrorMessage('Falha de conexão com o servidor. Verifique sua internet.');
            setStatus('error');
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
                            alt="Capa do Ebook The Architect of Precision por DCPROSENS"
                            width={320}
                            height={420}
                            className={styles.coverImg}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.floatingStats}>
                    <span>📖 80+ Páginas</span>
                    <span>⚡ 100% Grátis</span>
                    <span>📈 Aim Coach Calibrated</span>
                </div>
            </div>

            {/* SIGNUP FORM (RIGHT) */}
            <div className={styles.formCard}>
                {status === 'success' ? (
                    <div className={styles.successPanel}>
                        <div className={styles.successIcon}>🏆</div>
                        <h3 className={styles.successTitle}>Inscrição Confirmada!</h3>
                        <p className={styles.successDesc}>
                            Olá <strong>{name}</strong>! Seu ebook <strong>The Architect of Precision</strong> foi registrado com sucesso.
                        </p>
                        
                        <div className={styles.downloadBox}>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Clique abaixo para baixar seu Guia Prático de Calibração de Mira de imediato:
                            </p>
                            <a 
                                href="/Aim_Calibration_Checklist.txt" 
                                download="Aim_Calibration_Checklist.txt"
                                className={styles.downloadBtn}
                            >
                                Baixar Guia Prático (.TXT) ⬇️
                            </a>
                        </div>
                        
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem', textAlign: 'center' }}>
                            Um link de download alternativo em formato PDF de alta resolução também foi enviado para: <strong>{email}</strong>
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h3 className={styles.formTitle}>Baixe o Ebook Agora</h3>
                        <p className={styles.formSubtitle}>Preencha os dados e receba o link para download instantâneo.</p>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Qual seu nome?</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ex: Lucas Ferreira"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={status === 'submitting'}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Seu E-mail principal</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Ex: lucas@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'submitting'}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Qual seu Jogo Principal?</label>
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
                            {status === 'submitting' ? 'Cadastrando...' : 'Quero A Mira Perfeita ⚡'}
                        </button>

                        <p className={styles.spamNotice}>
                            🛡️ Prometemos zero spam. Seus dados estão protegidos sob nossa Política de Privacidade.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
