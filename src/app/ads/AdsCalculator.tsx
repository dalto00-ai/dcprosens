"use client";

import { useState, useMemo } from 'react';
import styles from './AdsCalculator.module.css';

export default function AdsCalculator() {
    const [game, setGame] = useState('valorant');
    const [sens, setSens] = useState<number | string>(0.4);
    const [dpi, setDpi] = useState<number | string>(800);

    const numSens = Number(sens) || 0;
    const numDpi = Number(dpi) || 800;

    // eDPI calculation
    const edpi = useMemo(() => {
        return (numSens * numDpi).toFixed(0);
    }, [numSens, numDpi]);

    return (
        <div className={styles.container}>
            <div className={styles.cardGrid}>
                {/* INPUT PANEL */}
                <div className={styles.panelCard}>
                    <h2 className={styles.panelTitle}>Main Parameters</h2>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Source Game</label>
                        <select
                            className={styles.select}
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                        >
                            <option value="valorant">Valorant</option>
                            <option value="cs2">Counter-Strike 2 (CS2)</option>
                            <option value="apex">Apex Legends</option>
                            <option value="warzone">Call of Duty: Warzone</option>
                        </select>
                    </div>

                    <div className={styles.inlineGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Sensitivity (Hipfire)</label>
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
                            <label className={styles.label}>Mouse DPI</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                                step="50"
                                min="100"
                            />
                        </div>
                    </div>

                    <div className={styles.quickStat}>
                        <span>Your Current eDPI:</span>
                        <strong>{edpi}</strong>
                    </div>
                </div>

                {/* RESULTS PANEL */}
                <div className={styles.panelCard}>
                    <h2 className={styles.panelTitle}>Recommended 1:1 ADS Results</h2>

                    {game === 'valorant' && (
                        <div className={styles.resultsWrapper}>
                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span className={styles.scopeIcon}>🔍</span>
                                    <div>
                                        <h4 className={styles.scopeTitle}>1x Zoom Scope (Marshal / Outlaw / Operator Zoom 1)</h4>
                                        <p className={styles.scopeDesc}>Perfect consistency for micro-flicks</p>
                                    </div>
                                </div>
                                <div className={styles.resultValueBlock}>
                                    <span className={styles.resultLabel}>In-Game Multiplier:</span>
                                    <strong className={styles.resultVal}>0.847</strong>
                                </div>
                                <div className={styles.calculatedSens}>
                                    Actual Scoped Sensitivity: <strong>{(numSens * 0.847).toFixed(3)}</strong>
                                </div>
                            </div>

                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span className={styles.scopeIcon}>🔭</span>
                                    <div>
                                        <h4 className={styles.scopeTitle}>2.5x Zoom Scope (Operator Zoom 2)</h4>
                                        <p className={styles.scopeDesc}>Perfect consistency for maximum zoom targets</p>
                                    </div>
                                </div>
                                <div className={styles.resultValueBlock}>
                                    <span className={styles.resultLabel}>In-Game Multiplier:</span>
                                    <strong className={styles.resultVal}>1.150</strong>
                                </div>
                                <div className={styles.calculatedSens}>
                                    Actual Scoped Sensitivity: <strong>{(numSens * 1.15).toFixed(3)}</strong>
                                </div>
                            </div>
                        </div>
                    )}

                    {game === 'cs2' && (
                        <div className={styles.resultsWrapper}>
                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span className={styles.scopeIcon}>🎯</span>
                                    <div>
                                        <h4 className={styles.scopeTitle}>Precision Zoom (AWP / Scout / SSG 08)</h4>
                                        <p className={styles.scopeDesc}>0% Monitor Distance Match consistency (AWPer Standard)</p>
                                    </div>
                                </div>
                                <div className={styles.resultValueBlock}>
                                    <span className={styles.resultLabel}>zoom_sensitivity_ratio:</span>
                                    <strong className={styles.resultVal}>0.818933</strong>
                                </div>
                                <div className={styles.consoleCommand}>
                                    Console Command: <code className={styles.code}>zoom_sensitivity_ratio 0.818933</code>
                                </div>
                            </div>
                        </div>
                    )}

                    {game === 'apex' && (
                        <div className={styles.resultsWrapper}>
                            <p className={styles.infoText}>Configure your per-optic sensitivity (Optic Sensitivity) inside Apex Legends:</p>
                            
                            <div className={styles.scrollContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Optic Zoom</th>
                                            <th>Recom. Multiplier</th>
                                            <th>Resulting Sens</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>1x Scopes / Holo</strong></td>
                                            <td className={styles.valAccent}>1.0</td>
                                            <td>{numSens.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>2x Scopes</strong></td>
                                            <td className={styles.valAccent}>1.2</td>
                                            <td>{(numSens * 1.2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>3x Scopes</strong></td>
                                            <td className={styles.valAccent}>1.3</td>
                                            <td>{(numSens * 1.3).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>4x Scopes</strong></td>
                                            <td className={styles.valAccent}>1.4</td>
                                            <td>{(numSens * 1.4).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>6x Sniper Scope</strong></td>
                                            <td className={styles.valAccent}>1.5</td>
                                            <td>{(numSens * 1.5).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>8x Sniper Scope</strong></td>
                                            <td className={styles.valAccent}>1.6</td>
                                            <td>{(numSens * 1.6).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>10x Sniper Scope</strong></td>
                                            <td className={styles.valAccent}>1.7</td>
                                            <td>{(numSens * 1.7).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {game === 'warzone' && (
                        <div className={styles.resultsWrapper}>
                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span className={styles.scopeIcon}>🎮</span>
                                    <div>
                                        <h4 className={styles.scopeTitle}>Monitor Distance Coefficient</h4>
                                        <p className={styles.scopeDesc}>Screen-proportional sensitivity scaling</p>
                                    </div>
                                </div>
                                
                                <div className={styles.infoBox}>
                                    <p style={{ marginBottom: '0.75rem' }}>In Call of Duty, set your <strong>ADS Sensitivity Type</strong> to <strong>Relative</strong>.</p>
                                    <div className={styles.resultValueBlock} style={{ marginBottom: '0.75rem' }}>
                                        <span className={styles.resultLabel}>16:9 Widescreen Coefficient:</span>
                                        <strong className={styles.resultVal}>1.78</strong>
                                    </div>
                                    <div className={styles.resultValueBlock}>
                                        <span className={styles.resultLabel}>4:3 Legacy Coefficient:</span>
                                        <strong className={styles.resultVal}>1.33</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
