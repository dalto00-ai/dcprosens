"use client";

import { useState, useMemo } from 'react';
import { games } from '@/lib/games';
import styles from './SensFinder.module.css';

const COMMON_CM360 = [
    { label: '20 cm/360 — High Sens (Wrist)', value: 20 },
    { label: '30 cm/360 — Medium-High', value: 30 },
    { label: '40 cm/360 — Pro Sweet Spot', value: 40 },
    { label: '45 cm/360 — Most Popular (Pro Avg)', value: 45 },
    { label: '50 cm/360 — Medium-Low', value: 50 },
    { label: '60 cm/360 — Low Sens (Arm Aim)', value: 60 },
    { label: '80 cm/360 — Ultra Low', value: 80 },
];

// Filter to main FPS games only
const FPS_GAMES = ['valorant', 'csgo', 'apex', 'overwatch', 'cod', 'rainbow6', 'fortnite', 'pubg'];

export default function SensFinderClient() {
    const [targetCm, setTargetCm] = useState<number | string>(45);
    const [dpi, setDpi] = useState<number | string>(800);
    const [copied, setCopied] = useState<string | null>(null);

    const numTargetCm = Number(targetCm) || 0;
    const numDpi = Number(dpi) || 800;

    const results = useMemo(() => {
        if (numTargetCm <= 0 || numDpi <= 0) return [];

        return games
            .filter(g => FPS_GAMES.includes(g.id))
            .map(game => {
                // Formula: cm/360 = (360 / (sens * yaw * dpi)) * 2.54
                // Solving for sens: sens = (360 * 2.54) / (cm360 * yaw * dpi)
                const sens = (360 * 2.54) / (numTargetCm * game.yaw * numDpi);
                return {
                    game,
                    sens: sens,
                    sensFormatted: sens < 0.01
                        ? sens.toFixed(5)
                        : sens < 0.1
                        ? sens.toFixed(4)
                        : sens < 10
                        ? sens.toFixed(3)
                        : sens.toFixed(2),
                    edpi: (numDpi * sens).toFixed(0),
                };
            });
    }, [numTargetCm, numDpi]);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <div className={styles.wrapper}>
            {/* INPUT PANEL */}
            <div className={styles.inputPanel}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        🎯 Target cm/360
                        <span className={styles.labelHint}>How much mousepad distance for a full 360°</span>
                    </label>
                    <div className={styles.inputRow}>
                        <input
                            id="target-cm360"
                            type="number"
                            className={styles.input}
                            value={targetCm}
                            onChange={(e) => setTargetCm(e.target.value)}
                            step="0.5"
                            min="5"
                            max="200"
                            placeholder="45"
                        />
                        <span className={styles.unit}>cm</span>
                    </div>

                    {/* Quick preset buttons */}
                    <div className={styles.presets}>
                        {COMMON_CM360.map(p => (
                            <button
                                key={p.value}
                                className={`${styles.presetBtn} ${numTargetCm === p.value ? styles.presetActive : ''}`}
                                onClick={() => setTargetCm(p.value)}
                                type="button"
                            >
                                {p.value} cm
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="dpi-input">
                        🖱️ Mouse DPI
                        <span className={styles.labelHint}>Your physical mouse hardware DPI setting</span>
                    </label>
                    <div className={styles.inputRow}>
                        <input
                            id="dpi-input"
                            type="number"
                            className={styles.input}
                            value={dpi}
                            onChange={(e) => setDpi(e.target.value)}
                            step="50"
                            min="100"
                            max="32000"
                            placeholder="800"
                        />
                        <span className={styles.unit}>DPI</span>
                    </div>
                    <div className={styles.presets}>
                        {[400, 800, 1000, 1600, 3200].map(d => (
                            <button
                                key={d}
                                className={`${styles.presetBtn} ${numDpi === d ? styles.presetActive : ''}`}
                                onClick={() => setDpi(d)}
                                type="button"
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary pill */}
                {numTargetCm > 0 && (
                    <div className={styles.summaryPill}>
                        <span>📐 {numTargetCm} cm/360 at {numDpi} DPI</span>
                        <span className={styles.pillEdpi}>
                            eDPI ≈ {((360 * 2.54) / (numTargetCm * 0.07)).toFixed(0)} (Val)
                        </span>
                    </div>
                )}
            </div>

            {/* RESULTS TABLE */}
            {results.length > 0 && (
                <div className={styles.resultsPanel}>
                    <h2 className={styles.resultsTitle}>
                        Your settings across <span className="text-gradient">all games</span>
                    </h2>
                    <p className={styles.resultsSubtitle}>
                        All values below give you exactly <strong>{numTargetCm} cm/360°</strong> at <strong>{numDpi} DPI</strong>.
                        Click any value to copy it.
                    </p>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Game</th>
                                    <th>Sensitivity</th>
                                    <th>eDPI</th>
                                    <th>Copy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(r => (
                                    <tr key={r.game.id} className={styles.tableRow}>
                                        <td className={styles.gameName}>{r.game.name}</td>
                                        <td className={styles.sensValue}>
                                            <code>{r.sensFormatted}</code>
                                        </td>
                                        <td className={styles.edpiValue}>{r.edpi}</td>
                                        <td>
                                            <button
                                                className={`${styles.copyBtn} ${copied === r.game.id ? styles.copied : ''}`}
                                                onClick={() => copyToClipboard(r.sensFormatted, r.game.id)}
                                                title={`Copy ${r.game.name} sensitivity`}
                                            >
                                                {copied === r.game.id ? '✓ Copied!' : 'Copy'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.infoBox}>
                        <span className={styles.infoIcon}>ℹ️</span>
                        <p>
                            These values preserve your exact <strong>{numTargetCm} cm/360°</strong> physical feel across every game.
                            No re-training required — your muscle memory transfers directly.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
