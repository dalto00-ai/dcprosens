"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CpsTest.module.css';

const DURATIONS = [5, 10, 30, 60];
const BEST_KEY_PREFIX = 'dcprosens_cps_best_';

type TestState = 'idle' | 'running' | 'finished';

export default function CpsTest() {
    const [duration, setDuration] = useState(5);
    const [state, setState] = useState<TestState>('idle');
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [finalCps, setFinalCps] = useState(0);
    const [best, setBest] = useState<number | null>(null);

    const startTimeRef = useRef<number>(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const stored = localStorage.getItem(`${BEST_KEY_PREFIX}${duration}`);
        setBest(stored ? parseFloat(stored) : null);
    }, [duration]);

    const tick = useCallback(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, duration - elapsed);
        setTimeLeft(remaining);

        if (remaining <= 0) {
            setState((prevState) => {
                if (prevState !== 'running') return prevState;
                return 'finished';
            });
            return;
        }
        rafRef.current = requestAnimationFrame(tick);
    }, [duration]);

    useEffect(() => {
        if (state !== 'finished') return;

        const cps = clicks / duration;
        setFinalCps(cps);

        const key = `${BEST_KEY_PREFIX}${duration}`;
        const stored = localStorage.getItem(key);
        const prevBest = stored ? parseFloat(stored) : 0;
        if (cps > prevBest) {
            localStorage.setItem(key, cps.toFixed(2));
            setBest(cps);
        }
        cancelAnimationFrame(rafRef.current);
        // Only re-run when the test actually finishes, not on every click.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handlePadClick = () => {
        if (state === 'finished') return;

        if (state === 'idle') {
            startTimeRef.current = Date.now();
            setClicks(1);
            setTimeLeft(duration);
            setState('running');
            rafRef.current = requestAnimationFrame(tick);
            return;
        }

        setClicks((c) => c + 1);
    };

    const handleReset = () => {
        cancelAnimationFrame(rafRef.current);
        setState('idle');
        setClicks(0);
        setTimeLeft(duration);
        setFinalCps(0);
    };

    const handleDurationChange = (d: number) => {
        if (state === 'running') return;
        setDuration(d);
        setTimeLeft(d);
        setState('idle');
        setClicks(0);
        setFinalCps(0);
    };

    useEffect(() => {
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.durationRow}>
                {DURATIONS.map((d) => (
                    <button
                        key={d}
                        type="button"
                        className={`${styles.durationBtn} ${duration === d ? styles.durationActive : ''}`}
                        onClick={() => handleDurationChange(d)}
                        disabled={state === 'running'}
                    >
                        {d}s
                    </button>
                ))}
            </div>

            {state !== 'finished' ? (
                <div
                    className={`${styles.clickPad} ${state === 'idle' ? styles.clickPadIdle : ''}`}
                    onClick={handlePadClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePadClick();
                    }}
                >
                    {state === 'idle' ? (
                        <>
                            <div className={styles.padLabel}>Click to start</div>
                            <div className={styles.timeLeft}>{duration}s</div>
                        </>
                    ) : (
                        <>
                            <div className={styles.bigNumber}>{clicks}</div>
                            <div className={styles.timeLeft}>{timeLeft.toFixed(1)}s remaining</div>
                        </>
                    )}
                </div>
            ) : (
                <div className={styles.resultBox}>
                    <div className={styles.resultValue}>{finalCps.toFixed(2)} CPS</div>
                    <div className={styles.resultSub}>{clicks} clicks in {duration}s</div>

                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Clicks</div>
                            <div className={styles.statValue}>{clicks}</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Average CPS</div>
                            <div className={styles.statValue}>{finalCps.toFixed(2)}</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.statLabel}>Best ({duration}s)</div>
                            <div className={styles.statValue}>{best ? best.toFixed(2) : finalCps.toFixed(2)}</div>
                        </div>
                    </div>

                    <button type="button" className={styles.primaryBtn} onClick={handleReset}>
                        Try Again 🔄
                    </button>
                </div>
            )}

            {best !== null && state === 'idle' && (
                <p style={{ marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    🏆 Your record in {duration}s: <strong style={{ color: 'var(--primary)' }}>{best.toFixed(2)} CPS</strong>
                </p>
            )}
        </div>
    );
}
