"use client";

import { useMemo, useState } from 'react';
import styles from './FovConverter.module.css';

interface AspectPreset {
    label: string;
    ratio: number; // width / height
}

const ASPECT_PRESETS: AspectPreset[] = [
    { label: '16:9', ratio: 16 / 9 },
    { label: '16:10', ratio: 16 / 10 },
    { label: '21:9', ratio: 21 / 9 },
    { label: '32:9', ratio: 32 / 9 },
    { label: '4:3', ratio: 4 / 3 },
];

// Hor+ scaling: vertical FOV stays constant when aspect ratio changes,
// horizontal FOV scales with it. This is how most modern engines (Source,
// Unreal, Frostbite, id Tech) handle widescreen FOV.
function convertHorizontalFov(fovDeg: number, fromRatio: number, toRatio: number): number {
    const fovRad = (fovDeg * Math.PI) / 180;
    const newFovRad = 2 * Math.atan(Math.tan(fovRad / 2) * (toRatio / fromRatio));
    return (newFovRad * 180) / Math.PI;
}

function verticalFov(fovDeg: number, ratio: number): number {
    const fovRad = (fovDeg * Math.PI) / 180;
    const vFovRad = 2 * Math.atan(Math.tan(fovRad / 2) / ratio);
    return (vFovRad * 180) / Math.PI;
}

export default function FovConverter() {
    const [fov, setFov] = useState<number | string>(90);
    const [fromRatio, setFromRatio] = useState(ASPECT_PRESETS[0].ratio);
    const [toRatio, setToRatio] = useState(ASPECT_PRESETS[2].ratio);

    const numericFov = Number(fov) || 0;

    const convertedFov = useMemo(() => {
        if (numericFov <= 0 || numericFov >= 180) return 0;
        return convertHorizontalFov(numericFov, fromRatio, toRatio);
    }, [numericFov, fromRatio, toRatio]);

    const vFov = useMemo(() => {
        if (numericFov <= 0 || numericFov >= 180) return 0;
        return verticalFov(numericFov, fromRatio);
    }, [numericFov, fromRatio]);

    return (
        <div className={styles.card}>
            <div className={styles.grid}>
                <div>
                    <div className={styles.sectionTitle}>Origem (From)</div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="fov-input">Horizontal FOV atual</label>
                        <input
                            id="fov-input"
                            type="number"
                            className={styles.input}
                            value={fov}
                            onChange={(e) => setFov(e.target.value)}
                            step="1"
                            min="1"
                            max="179"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Aspect Ratio Atual</label>
                        <div className={styles.presetRow}>
                            {ASPECT_PRESETS.map(p => (
                                <button
                                    key={`from-${p.label}`}
                                    type="button"
                                    className={`${styles.presetBtn} ${fromRatio === p.ratio ? styles.presetActive : ''}`}
                                    onClick={() => setFromRatio(p.ratio)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.sectionTitle}>Destino (To)</div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Aspect Ratio Alvo</label>
                        <div className={styles.presetRow}>
                            {ASPECT_PRESETS.map(p => (
                                <button
                                    key={`to-${p.label}`}
                                    type="button"
                                    className={`${styles.presetBtn} ${toRatio === p.ratio ? styles.presetActive : ''}`}
                                    onClick={() => setToRatio(p.ratio)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.resultBox}>
                        <div className={styles.resultLabel}>Horizontal FOV Convertido</div>
                        <div className={styles.resultValue}>{convertedFov.toFixed(1)}°</div>
                    </div>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Vertical FOV (constante)</div>
                    <div className={styles.statValue}>{vFov.toFixed(1)}°</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Diferença</div>
                    <div className={styles.statValue}>
                        {(convertedFov - numericFov >= 0 ? '+' : '')}{(convertedFov - numericFov).toFixed(1)}°
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Método</div>
                    <div className={styles.statValue}>Hor+ Scaling</div>
                </div>
            </div>
        </div>
    );
}
