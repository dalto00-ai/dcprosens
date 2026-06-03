"use client";

import { useState, useMemo } from 'react';
import { games } from '@/lib/games';
import { pros } from '@/lib/pros';
import { calculateCmPer360 } from '@/lib/converter';
import styles from './ProComparator.module.css';

// Helper to map pro player game string to internal game id
const mapProGameToId = (proGame: string): string => {
    const gameLower = proGame.toLowerCase();
    if (gameLower.includes('valorant')) return 'valorant';
    if (gameLower.includes('cs2') || gameLower.includes('csgo') || gameLower.includes('counter-strike')) return 'csgo';
    if (gameLower.includes('apex')) return 'apex';
    if (gameLower.includes('overwatch')) return 'overwatch';
    if (gameLower.includes('warzone') || gameLower.includes('cod') || gameLower.includes('duty')) return 'cod';
    if (gameLower.includes('rainbow') || gameLower.includes('r6')) return 'rainbow6';
    if (gameLower.includes('fortnite')) return 'fortnite';
    if (gameLower.includes('pubg')) return 'pubg';
    if (gameLower.includes('destiny')) return 'destiny2';
    if (gameLower.includes('battlefield') || gameLower.includes('bf')) return 'bf2042';
    if (gameLower.includes('roblox')) return 'roblox';
    if (gameLower.includes('minecraft')) return 'minecraft';
    return '';
};

export default function ProComparator() {
    // User states
    const [userGame, setUserGame] = useState('valorant');
    const [userSens, setUserSens] = useState<number | string>(0.4);
    const [userDpi, setUserDpi] = useState<number | string>(800);

    // Selected Pro state
    // Filter pros to only those who play supported FPS games
    const validPros = useMemo(() => {
        return pros.filter(pro => mapProGameToId(pro.game) !== '');
    }, []);

    const [selectedProName, setSelectedProName] = useState(validPros[0]?.name || 'TenZ');
    const [rotationAngle, setRotationAngle] = useState<number>(180); // 0° to 360°

    const selectedPro = useMemo(() => {
        return validPros.find(p => p.name === selectedProName) || validPros[0];
    }, [selectedProName, validPros]);

    // Parse user inputs safely
    const numSens = Number(userSens) || 0;
    const numDpi = Number(userDpi) || 800;

    // Calculate user cm/360
    const userCm360 = useMemo(() => {
        return calculateCmPer360(numSens, numDpi, userGame);
    }, [numSens, numDpi, userGame]);

    // Calculate pro cm/360
    const proCm360 = useMemo(() => {
        if (!selectedPro) return 0;
        const proGameId = mapProGameToId(selectedPro.game);
        return calculateCmPer360(selectedPro.sens, selectedPro.dpi, proGameId);
    }, [selectedPro]);

    // Dynamic track scale: The virtual mousepad represents this many cm total
    const trackMaxCm = useMemo(() => {
        const largest = Math.max(userCm360, proCm360);
        return Math.max(largest * 1.15, 30); // 15% padding, min 30cm
    }, [userCm360, proCm360]);

    // Displacement calculations in cm for current rotation angle
    const userDisplacement = useMemo(() => {
        return (rotationAngle / 360) * userCm360;
    }, [rotationAngle, userCm360]);

    const proDisplacement = useMemo(() => {
        return (rotationAngle / 360) * proCm360;
    }, [rotationAngle, proCm360]);

    // Conversion percentage for positioning relative to trackMaxCm
    const userLeftPercent = useMemo(() => {
        if (trackMaxCm === 0) return 0;
        return Math.min((userDisplacement / trackMaxCm) * 100, 100);
    }, [userDisplacement, trackMaxCm]);

    const proLeftPercent = useMemo(() => {
        if (trackMaxCm === 0) return 0;
        return Math.min((proDisplacement / trackMaxCm) * 100, 100);
    }, [proDisplacement, trackMaxCm]);

    // Esports verdict and analysis
    const verdict = useMemo(() => {
        if (userCm360 === 0) return { category: 'Invalid', text: 'Insira valores válidos para calcular.', class: styles.verdictMuted };
        
        // Ranges of cm/360
        // Under 20cm: High/Wrist aiming (uncommon for pros)
        // 20cm - 30cm: Medium-High
        // 30cm - 50cm: Medium-Low (Optimal / Pro Golden Zone)
        // 50cm+: Ultra-Low / Arm aiming
        if (userCm360 < 20) {
            return {
                category: 'Sensibilidade Alta (Wrist Aim)',
                text: `Sua sensibilidade é extremamente rápida. Você precisa de apenas ${userCm360.toFixed(1)} cm de mousepad para dar um 360°. A maioria dos pro players (como ${selectedPro?.name}) prefere sensibilidades mais baixas (maior cm/360) para garantir estabilidade e precisão em combates de longa distância. Se você sente que sua mira "treme" muito, considere reduzir sua sensibilidade aos poucos.`,
                class: styles.verdictHigh
            };
        } else if (userCm360 >= 20 && userCm360 <= 55) {
            return {
                category: 'Zona de Ouro (Arm/Wrist Hybrid)',
                text: `Excelente! Sua sensibilidade está na faixa de mira mais usada pelos atletas de ponta (${userCm360.toFixed(1)} cm/360°). Este balanço permite que você faça movimentos amplos e rápidos usando o antebraço, enquanto preserva o pulso para micro-ajustes precisos na cabeça do oponente. Suas configurações estão alinhadas com padrões de altíssima performance esportiva!`,
                class: styles.verdictOptimal
            };
        } else {
            return {
                category: 'Sensibilidade Ultra-Baixa (Arm Aim)',
                text: `Sua sensibilidade é extremamente lenta (${userCm360.toFixed(1)} cm/360°). Isso garante uma precisão absurda em pixels de longa distância, mas exige um mousepad gigantesco e muito esforço físico do braço e ombro para girar ou reagir a flancos rápidos. Certifique-se de ter espaço suficiente na mesa para não bater o mouse nas bordas!`,
                class: styles.verdictLow
            };
        }
    }, [userCm360, selectedPro]);

    return (
        <section className={styles.comparatorSection} id="pro-comparator">
            <h2 className={styles.title}>
                Comparador <span className="text-gradient">Visual Pro</span>
            </h2>
            <p className={styles.subtitle}>
                Veja fisicamente quanta distância seu mouse percorre no mousepad para girar a câmera em comparação com os melhores atletas do mundo.
            </p>

            <div className={styles.cardGrid}>
                {/* SETTINGS CARD */}
                <div className={styles.panelCard}>
                    <h3 className={styles.panelTitle}>Sua Configuração</h3>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Jogo</label>
                        <select 
                            className={styles.select}
                            value={userGame}
                            onChange={(e) => setUserGame(e.target.value)}
                        >
                            {games.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Sensibilidade In-game</label>
                        <input 
                            type="number"
                            className={styles.input}
                            value={userSens}
                            onChange={(e) => setUserSens(e.target.value)}
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>DPI do Mouse</label>
                        <input 
                            type="number"
                            className={styles.input}
                            value={userDpi}
                            onChange={(e) => setUserDpi(e.target.value)}
                            step="50"
                            min="100"
                        />
                    </div>

                    <div className={styles.statsSummary}>
                        <div className={styles.statMini}>
                            <span>Seu cm/360°</span>
                            <strong>{userCm360.toFixed(1)} cm</strong>
                        </div>
                    </div>
                </div>

                {/* PRO SELECT CARD */}
                <div className={styles.panelCard}>
                    <h3 className={styles.panelTitle}>Selecionar Pro Player</h3>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Jogador Profissional</label>
                        <select 
                            className={styles.select}
                            value={selectedProName}
                            onChange={(e) => setSelectedProName(e.target.value)}
                        >
                            {validPros.map(p => (
                                <option key={p.name} value={p.name}>{p.name} ({p.game})</option>
                            ))}
                        </select>
                    </div>

                    {selectedPro && (
                        <div className={styles.proBio}>
                            <div className={styles.proBioRow}>
                                <span>Time:</span>
                                <strong>{selectedPro.team}</strong>
                            </div>
                            <div className={styles.proBioRow}>
                                <span>Jogo:</span>
                                <strong>{selectedPro.game}</strong>
                            </div>
                            <div className={styles.proBioRow}>
                                <span>Sensibilidade:</span>
                                <strong>{selectedPro.sens}</strong>
                            </div>
                            <div className={styles.proBioRow}>
                                <span>DPI do Mouse:</span>
                                <strong>{selectedPro.dpi} DPI</strong>
                            </div>
                            <div className={styles.proBioRow}>
                                <span>Mouse:</span>
                                <strong>{selectedPro.mouse}</strong>
                            </div>
                        </div>
                    )}

                    <div className={styles.statsSummary}>
                        <div className={styles.statMini}>
                            <span>Pro cm/360°</span>
                            <strong>{proCm360.toFixed(1)} cm</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIRTUAL MOUSEPAD ARENA */}
            <div className={styles.arenaCard}>
                <h3 className={styles.arenaTitle}>Virtual Mousepad Arena</h3>
                <p className={styles.arenaSubtitle}>
                    Arraste o slider de ângulo de rotação abaixo para ver a distância física de deslize no mousepad para cada ângulo de rotação da câmera.
                </p>

                {/* ROTATION SLIDER */}
                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabelRow}>
                        <span>Ângulo de Rotação:</span>
                        <strong className={styles.sliderValue}>{rotationAngle}°</strong>
                    </div>
                    <input 
                        type="range"
                        min="0"
                        max="360"
                        value={rotationAngle}
                        onChange={(e) => setRotationAngle(Number(e.target.value))}
                        className={styles.rangeSlider}
                    />
                    <div className={styles.sliderTicks}>
                        <span>0°</span>
                        <span>90°</span>
                        <span>180° (Metade)</span>
                        <span>270°</span>
                        <span>360° (Giro Completo)</span>
                    </div>
                </div>

                {/* TRACKS */}
                <div className={styles.tracksWrapper}>
                    {/* USER TRACK */}
                    <div className={styles.trackContainer}>
                        <div className={styles.trackHeader}>
                            <span>Seu Mousepad (cm/360°: {userCm360.toFixed(1)}cm)</span>
                            <strong>Deslocamento: {userDisplacement.toFixed(1)} cm</strong>
                        </div>
                        <div className={styles.mousepadTrack}>
                            {/* Ruler ticks */}
                            <div className={styles.rulerTicks}>
                                <span>0cm</span>
                                <span>{(trackMaxCm * 0.25).toFixed(0)}cm</span>
                                <span>{(trackMaxCm * 0.5).toFixed(0)}cm</span>
                                <span>{(trackMaxCm * 0.75).toFixed(0)}cm</span>
                                <span>{trackMaxCm.toFixed(0)}cm</span>
                            </div>
                            {/* Sliding Mouse representation */}
                            <div 
                                className={styles.virtualMouse}
                                style={{ left: `${userLeftPercent}%` }}
                                title={`Deslocamento do seu mouse: ${userDisplacement.toFixed(1)}cm`}
                            >
                                <span className={styles.mouseIcon}>🖱️</span>
                                <span className={styles.mouseLabel}>Você</span>
                            </div>
                            {/* Slide line path */}
                            <div 
                                className={styles.slidePath}
                                style={{ width: `${userLeftPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* PRO TRACK */}
                    <div className={styles.trackContainer}>
                        <div className={styles.trackHeader}>
                            <span>Mousepad de {selectedPro?.name} ({selectedPro?.game})</span>
                            <strong>Deslocamento: {proDisplacement.toFixed(1)} cm</strong>
                        </div>
                        <div className={styles.mousepadTrack}>
                            {/* Ruler ticks */}
                            <div className={styles.rulerTicks}>
                                <span>0cm</span>
                                <span>{(trackMaxCm * 0.25).toFixed(0)}cm</span>
                                <span>{(trackMaxCm * 0.5).toFixed(0)}cm</span>
                                <span>{(trackMaxCm * 0.75).toFixed(0)}cm</span>
                                <span>{trackMaxCm.toFixed(0)}cm</span>
                            </div>
                            {/* Sliding Mouse representation */}
                            <div 
                                className={`${styles.virtualMouse} ${styles.proMouse}`}
                                style={{ left: `${proLeftPercent}%` }}
                                title={`Deslocamento do mouse do Pro: ${proDisplacement.toFixed(1)}cm`}
                            >
                                <span className={styles.mouseIcon}>🎯</span>
                                <span className={styles.mouseLabel}>{selectedPro?.name}</span>
                            </div>
                            {/* Slide line path */}
                            <div 
                                className={`${styles.slidePath} ${styles.proSlidePath}`}
                                style={{ width: `${proLeftPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* EEAT VERDICT BOARD */}
            <div className={`${styles.verdictCard} ${verdict.class}`}>
                <div className={styles.verdictHeader}>
                    <span className={styles.verdictIcon}>📋</span>
                    <div>
                        <h4 className={styles.verdictTitle}>Veredito Técnico do Treinador</h4>
                        <span className={styles.verdictCategory}>{verdict.category}</span>
                    </div>
                </div>
                <p className={styles.verdictText}>
                    {verdict.text}
                </p>
                <div className={styles.verdictAuthorBio}>
                    <strong>Dalto Outlier</strong> • <em>Lead Aim Coach & Esports Specialist</em>
                </div>
            </div>
        </section>
    );
}
