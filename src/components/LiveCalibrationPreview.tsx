'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LiveCalibrationPreview.module.css';

interface StatRow {
    label: string;
    min: number;
    max: number;
    decimals: number;
    suffix?: string;
}

const STAT_ROWS: StatRow[] = [
    { label: 'cm / 360°', min: 28, max: 42, decimals: 1, suffix: ' cm' },
    { label: 'eDPI', min: 280, max: 460, decimals: 0 },
    { label: 'Precision Match', min: 88, max: 99, decimals: 0, suffix: '%' },
];

/**
 * A lightweight, fully generic "the tool is alive" animation shown on the
 * paywall instead of a flat blur — numbers drift continuously toward new
 * random targets. This intentionally doesn't try to pixel-match any real
 * tool's UI (that would mean building/maintaining a bespoke mock per locked
 * page); a single reusable animation is lighter to ship and to keep in sync
 * with design changes than a recorded video/GIF would be.
 */
export default function LiveCalibrationPreview({ title = 'Live Calibration' }: { title?: string }) {
    // Values are only generated client-side, after mount — see
    // HomeAnimations.tsx's FloatingParticles for why (avoids a hydration
    // mismatch between the static-export build and the first client render).
    const [values, setValues] = useState<number[] | null>(null);
    const currentRef = useRef<number[]>([]);
    const targetRef = useRef<number[]>([]);
    const requestRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const randomTarget = (row: StatRow) => row.min + Math.random() * (row.max - row.min);

        currentRef.current = STAT_ROWS.map(randomTarget);
        targetRef.current = STAT_ROWS.map(randomTarget);
        setValues([...currentRef.current]);

        let lastPick = performance.now();

        const tick = (now: number) => {
            // Every ~2.5s, pick new drift targets for each stat
            if (now - lastPick > 2500) {
                targetRef.current = STAT_ROWS.map(randomTarget);
                lastPick = now;
            }

            currentRef.current = currentRef.current.map((v, i) => v + (targetRef.current[i] - v) * 0.02);
            setValues([...currentRef.current]);

            requestRef.current = requestAnimationFrame(tick);
        };
        requestRef.current = requestAnimationFrame(tick);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className={styles.card} aria-hidden="true">
            <div className={styles.chrome}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.chromeTitle}>{title}</span>
                <span className={styles.liveBadge}>● LIVE</span>
            </div>
            <div className={styles.body}>
                {STAT_ROWS.map((row, i) => (
                    <div key={row.label} className={styles.row}>
                        <span className={styles.rowLabel}>{row.label}</span>
                        <span className={styles.rowValue}>
                            {values ? values[i].toFixed(row.decimals) : '--'}{row.suffix ?? ''}
                        </span>
                        <span className={styles.rowBarTrack}>
                            <span
                                className={styles.rowBarFill}
                                style={{
                                    width: values
                                        ? `${Math.min(100, ((values[i] - row.min) / (row.max - row.min)) * 100)}%`
                                        : '0%',
                                }}
                            />
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.scanline} />
        </div>
    );
}
