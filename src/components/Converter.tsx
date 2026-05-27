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

    // Calculate dynamic equivalence list for all other games
    const equivalenceList = useMemo(() => {
        return games
            .filter(g => g.id !== fromGame)
            .map(g => {
                const eqSens = convertSensitivity(fromGame, g.id, numericSens, numericDpi);
                return {
                    id: g.id,
                    name: g.name,
                    sens: eqSens.toFixed(3),
                    edpi: (eqSens * numericDpi).toFixed(0)
                };
            });
    }, [fromGame, numericSens, numericDpi]);

    return (
        <div className={styles.converterCard}>
            <div className={styles.grid}>
                {/* INPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Entrada (From)</div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Jogo de Origem</label>
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

                    <div className={styles.inlineGrid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Sensibilidade</label>
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
                </div>

                {/* OUTPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Saída (To)</div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Jogo de Destino</label>
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
                        <div className={styles.resultLabel}>Sensibilidade Convertida</div>
                        <div className={styles.resultValue}>{resultSens}</div>
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
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
                    <div className={styles.statValue}>
                        {(numericSens * numericDpi).toFixed(0)}
                    </div>
                </div>
            </div>

            {/* DYNAMIC MULTI-GAME EQUIVALENCE SECTION */}
            <div className={styles.equivalenceSection}>
                <h3 className={styles.equivalenceTitle}>Sua Equivalência em Outros Jogos</h3>
                <p className={styles.equivalenceSubtitle}>
                    Veja instantaneamente qual sensibilidade configurar em todos os outros motores de jogo com base no seu DPI.
                </p>
                <div className={styles.equivalenceGrid}>
                    {equivalenceList.map(eq => (
                        <div key={eq.id} className={styles.equivalenceCard}>
                            <div className={styles.equivalenceHeader}>
                                <span className={styles.gameIndicator}>🎮</span>
                                <span className={styles.gameName}>{eq.name}</span>
                            </div>
                            <div className={styles.equivalenceValueRow}>
                                <span className={styles.equivalenceLabel}>Sens:</span>
                                <strong className={styles.equivalenceVal}>{eq.sens}</strong>
                            </div>
                            <div className={styles.equivalenceValueRow}>
                                <span className={styles.equivalenceLabel}>eDPI:</span>
                                <span className={styles.equivalenceEdpi}>{eq.edpi}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
