"use client";

import { useState, useMemo } from 'react';
import { games } from '@/lib/games';
import { calculateCmPer360, convertSensitivity } from '@/lib/converter';
import styles from './Converter.module.css';

export default function Converter() {
    const [fromGame, setFromGame] = useState('valorant');
    const [toGame, setToGame] = useState('csgo');
    const [sens, setSens] = useState<number | string>(0.5); // String to handle empty inputs gracefully
    const [dpi, setDpi] = useState<number | string>(800);

    const numericSens = Number(sens) || 0;
    const numericDpi = Number(dpi) || 800;

    const resultSens = useMemo(() => {
        return convertSensitivity(fromGame, toGame, numericSens, numericDpi).toFixed(3);
    }, [fromGame, toGame, numericSens, numericDpi]);

    const fromCm360 = useMemo(() => {
        return calculateCmPer360(numericSens, numericDpi, fromGame).toFixed(1);
    }, [numericSens, numericDpi, fromGame]);

    // To verify consistency, output cm/360 should be same
    // const toCm360 = calculateCmPer360(Number(resultSens), numericDpi, toGame).toFixed(2);

    return (
        <div className={styles.converterCard}>
            <div className={styles.grid}>
                {/* INPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Input (From)</div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Game</label>
                        <select
                            className={styles.select}
                            value={fromGame}
                            onChange={(e) => setFromGame(e.target.value)}
                        >
                            {games.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Sensitivity</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={sens}
                            onChange={(e) => setSens(e.target.value)}
                            step="0.001"
                            min="0"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>DPI (Mouse)</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={dpi}
                            onChange={(e) => setDpi(e.target.value)}
                            step="10"
                            min="100"
                        />
                    </div>
                </div>

                {/* OUTPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Output (To)</div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Game</label>
                        <select
                            className={styles.select}
                            value={toGame}
                            onChange={(e) => setToGame(e.target.value)}
                        >
                            {games.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.resultBox}>
                        <div className={styles.resultLabel}>Converted Sensitivity</div>
                        <div className={styles.resultValue}>{resultSens}</div>
                    </div>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>CM / 360°</div>
                    <div className={styles.statValue}>{fromCm360} cm</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Inches / 360°</div>
                    <div className={styles.statValue}>{(Number(fromCm360) / 2.54).toFixed(1)}"</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>eDPI (Universal)</div>
                    {/* Universal eDPI is often considered sens * dpi, but technically varies by engine. 
              We can display effective dpi relative to CSGO/Source as a standard reference if needed.
              For now let's just show sens * dpi if appropriate, or maybe just skip it if confusing.
              Let's show the Raw Yaw * Dpi * Sens (Degrees/Inch approx).
           */}
                    <div className={styles.statValue}>
                        {(numericSens * numericDpi).toFixed(0)}
                    </div>
                </div>
            </div>
        </div>
    );
}
