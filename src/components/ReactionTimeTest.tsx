"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './ReactionTimeTest.module.css';

const TOTAL_ATTEMPTS = 5;
const MIN_DELAY_MS = 1200;
const MAX_DELAY_MS = 3500;

type Phase = 'idle' | 'armed' | 'go' | 'tooSoon' | 'result' | 'done';

export default function ReactionTimeTest() {
    const [phase, setPhase] = useState<Phase>('idle');
    const [attempts, setAttempts] = useState<number[]>([]);
    const [lastMs, setLastMs] = useState(0);

    const goTimeRef = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const startRound = () => {
        setPhase('armed');
        const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
        timeoutRef.current = setTimeout(() => {
            goTimeRef.current = Date.now();
            setPhase('go');
        }, delay);
    };

    const handlePadClick = () => {
        if (phase === 'idle') {
            startRound();
            return;
        }

        if (phase === 'armed') {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setPhase('tooSoon');
            return;
        }

        if (phase === 'go') {
            const ms = Date.now() - goTimeRef.current;
            setLastMs(ms);
            const next = [...attempts, ms];
            setAttempts(next);
            setPhase(next.length >= TOTAL_ATTEMPTS ? 'done' : 'result');
            return;
        }

        if (phase === 'tooSoon' || phase === 'result') {
            startRound();
            return;
        }

        if (phase === 'done') {
            setAttempts([]);
            setPhase('idle');
        }
    };

    const average = attempts.length > 0
        ? attempts.reduce((a, b) => a + b, 0) / attempts.length
        : 0;
    const best = attempts.length > 0 ? Math.min(...attempts) : 0;

    const padClassName = () => {
        switch (phase) {
            case 'armed': return `${styles.pad} ${styles.padArmed}`;
            case 'go': return `${styles.pad} ${styles.padGo}`;
            case 'tooSoon': return `${styles.pad} ${styles.padTooSoon}`;
            case 'result': return `${styles.pad} ${styles.padResult}`;
            default: return `${styles.pad} ${styles.padWaiting}`;
        }
    };

    const padContent = () => {
        switch (phase) {
            case 'idle':
                return <span>Clique para começar</span>;
            case 'armed':
                return <span>Espere pelo verde...</span>;
            case 'go':
                return <span>CLIQUE AGORA!</span>;
            case 'tooSoon':
                return <span>Cedo demais! Clique para tentar de novo</span>;
            case 'result':
                return (
                    <>
                        <div className={styles.msValue}>{lastMs} ms</div>
                        <span>Clique para a próxima tentativa</span>
                    </>
                );
            case 'done':
                return <span>Clique para reiniciar</span>;
        }
    };

    return (
        <div className={styles.card}>
            {phase !== 'done' && (
                <p className={styles.attemptsInfo}>
                    Tentativa {Math.min(attempts.length + 1, TOTAL_ATTEMPTS)} de {TOTAL_ATTEMPTS}
                </p>
            )}

            {phase !== 'done' ? (
                <div
                    className={padClassName()}
                    onClick={handlePadClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePadClick();
                    }}
                >
                    {padContent()}
                </div>
            ) : (
                <div className={styles.resultBox}>
                    <div className={styles.resultValue}>{Math.round(average)} ms</div>
                    <div className={styles.resultSub}>Tempo de reação médio em {TOTAL_ATTEMPTS} tentativas</div>

                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Melhor</div>
                            <div className={styles.statValue}>{best} ms</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Média</div>
                            <div className={styles.statValue}>{Math.round(average)} ms</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Tentativas</div>
                            <div className={styles.statValue}>{attempts.length}</div>
                        </div>
                    </div>

                    <div className={styles.attemptsRow}>
                        {attempts.map((a, i) => (
                            <span key={i} className={styles.attemptPill}>{a} ms</span>
                        ))}
                    </div>

                    <button type="button" className={styles.primaryBtn} onClick={handlePadClick}>
                        Tentar Novamente 🔄
                    </button>
                </div>
            )}
        </div>
    );
}
