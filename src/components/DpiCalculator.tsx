"use client";

import React, { useState } from 'react';
import styles from '@/components/Converter.module.css'; // Reuse styles

export default function DpiCalculator() {
    const [dpi, setDpi] = useState<number | string>(800);
    const [sens, setSens] = useState<number | string>(1);

    // Simple eDPI calc (removed unused setEdpi state if not used elsewhere, or kept logic simple)
    const calculatedEdpi = Number(dpi) * Number(sens);

    return (
        <div className={styles.converterCard}>
            <div className={styles.grid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Mouse DPI</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={dpi}
                        onChange={(e) => setDpi(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>In-Game Sensitivity</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={sens}
                        onChange={(e) => setSens(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.resultBox}>
                <div className={styles.resultLabel}>Effective DPI (eDPI)</div>
                <div className={styles.resultValue}>{calculatedEdpi.toFixed(0)}</div>
            </div>

            <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                * eDPI (Effective Dots Per Inch) allows you to compare true sensitivity across different mouse DPI settings
                within the same game.
            </p>
        </div>
    );
}
