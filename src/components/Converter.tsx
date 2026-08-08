"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';
import { games } from '@/lib/games';
import { calculateCmPer360, convertSensitivity } from '@/lib/converter';
import styles from './Converter.module.css';

const QUICK_GAMES = [
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'csgo', name: 'CS2', icon: '🔫' },
    { id: 'apex', name: 'Apex', icon: '🪂' },
    { id: 'overwatch', name: 'OW2', icon: '🛡️' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏰' },
];

const POLLING_RATES = [125, 500, 1000, 2000, 4000, 8000];

interface SavedProfile {
    name: string;
    game: string;
    sens: number;
    dpi: number;
}

function getSensCategory(cm360: number): { label: string; icon: string; color: string; desc: string } {
    if (cm360 <= 0) return { label: 'N/A', icon: '❓', color: '#64748b', desc: '' };
    if (cm360 >= 60) return { label: 'Very Low', icon: '🐢', color: '#3b82f6', desc: 'Full arm-aimer — large sweeps, high precision tracking' };
    if (cm360 >= 40) return { label: 'Low', icon: '💪', color: '#00ff9d', desc: 'Arm/wrist hybrid — Pro Average Zone (most elite players)' };
    if (cm360 >= 25) return { label: 'Medium', icon: '🤚', color: '#f59e0b', desc: 'Wrist-dominant — good for reactive playstyles' };
    return { label: 'High', icon: '⚡', color: '#ef4444', desc: 'Fingertip/twitch — fast turns but harder micro-adjustments' };
}

interface ConverterProps {
    initialFromGame?: string;
}

export default function Converter({ initialFromGame }: ConverterProps = {}) {
    const [fromGame, setFromGame] = useState(initialFromGame ?? 'valorant');
    const [toGame, setToGame] = useState(initialFromGame === 'csgo' ? 'valorant' : 'csgo');
    const [sens, setSens] = useState<number | string>(0.5);
    const [dpi, setDpi] = useState<number | string>(800);
    const [showAllEquivalents, setShowAllEquivalents] = useState(false);
    const [pollingRate, setPollingRate] = useState(1000);
    const [copied, setCopied] = useState(false);
    const [showWinTip, setShowWinTip] = useState(false);
    const [profiles, setProfiles] = useState<SavedProfile[]>([]);
    const [profileName, setProfileName] = useState('');
    const [showProfileSave, setShowProfileSave] = useState(false);

    const EQUIVALENCE_PREVIEW_COUNT = 6;
    const MAX_PROFILES = 5;

    const numericSens = Number(sens) || 0;
    const numericDpi = Number(dpi) || 800;

    // Load saved profiles from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('dcprosens_profiles');
            // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a browser-only store, unavailable during static-export build/SSR
            if (saved) setProfiles(JSON.parse(saved));
        } catch { /* ignore */ }
    }, []);

    const resultSens = useMemo(() => {
        return convertSensitivity(fromGame, toGame, numericSens, numericDpi).toFixed(3);
    }, [fromGame, toGame, numericSens, numericDpi]);

    const fromCm360 = useMemo(() => {
        return calculateCmPer360(numericSens, numericDpi, fromGame).toFixed(1);
    }, [numericSens, numericDpi, fromGame]);

    const sensCategory = useMemo(() => {
        return getSensCategory(Number(fromCm360));
    }, [fromCm360]);

    // Polling rate calculations
    const pollingStats = useMemo(() => {
        const delayMs = (1000 / pollingRate).toFixed(2);
        const fromGameObj = games.find(g => g.id === fromGame);
        const yaw = fromGameObj?.yaw || 0.022;
        // Degrees moved per poll cycle = sens * yaw * (dpi * (1/pollingRate))
        // This is how much the crosshair moves per single poll
        const degreesPerPoll = (numericSens * yaw * numericDpi / pollingRate).toFixed(3);
        return { delayMs, degreesPerPoll };
    }, [pollingRate, numericSens, numericDpi, fromGame]);

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

    // Copy to clipboard handler
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(resultSens);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = resultSens;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [resultSens]);

    // Profile save/load handlers
    const handleSaveProfile = useCallback(() => {
        if (!profileName.trim()) return;
        const newProfile: SavedProfile = {
            name: profileName.trim(),
            game: fromGame,
            sens: numericSens,
            dpi: numericDpi,
        };
        const updated = [...profiles.slice(-(MAX_PROFILES - 1)), newProfile];
        setProfiles(updated);
        localStorage.setItem('dcprosens_profiles', JSON.stringify(updated));
        setProfileName('');
        setShowProfileSave(false);
    }, [profileName, fromGame, numericSens, numericDpi, profiles]);

    const handleLoadProfile = useCallback((profile: SavedProfile) => {
        setFromGame(profile.game);
        setSens(profile.sens);
        setDpi(profile.dpi);
    }, []);

    const handleDeleteProfile = useCallback((index: number) => {
        const updated = profiles.filter((_, i) => i !== index);
        setProfiles(updated);
        localStorage.setItem('dcprosens_profiles', JSON.stringify(updated));
    }, [profiles]);

    return (
        <div className={styles.converterCard}>
            {/* ══════ PROFILE BAR ══════ */}
            <div className={styles.profileBar}>
                <div className={styles.profileLeft}>
                    {profiles.length > 0 && (
                        <div className={styles.profileChips}>
                            {profiles.map((p, i) => (
                                <button key={i} className={styles.profileChip} onClick={() => handleLoadProfile(p)} title={`Load: ${p.name}`}>
                                    {p.name}
                                    <span className={styles.profileChipDelete} onClick={(e) => { e.stopPropagation(); handleDeleteProfile(i); }}>×</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.profileActions}>
                    {showProfileSave ? (
                        <div className={styles.profileSaveForm}>
                            <input
                                type="text"
                                className={styles.profileInput}
                                placeholder="Profile name..."
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
                                maxLength={20}
                            />
                            <button className={styles.profileSaveBtn} onClick={handleSaveProfile}>Save</button>
                            <button className={styles.profileCancelBtn} onClick={() => setShowProfileSave(false)}>✕</button>
                        </div>
                    ) : (
                        <button
                            className={styles.profileSaveToggle}
                            onClick={() => setShowProfileSave(true)}
                            disabled={profiles.length >= MAX_PROFILES}
                            title={profiles.length >= MAX_PROFILES ? `Max ${MAX_PROFILES} profiles` : 'Save current settings'}
                        >
                            💾 {profiles.length > 0 ? `${profiles.length}/${MAX_PROFILES}` : 'Save Profile'}
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.grid}>
                {/* INPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Input (From)</div>

                    <div className={styles.quickGamesRow}>
                        {QUICK_GAMES.map(g => (
                            <button
                                key={`from-${g.id}`}
                                type="button"
                                className={`${styles.quickGameBtn} ${fromGame === g.id ? styles.quickGameBtnActive : ''}`}
                                onClick={() => setFromGame(g.id)}
                            >
                                <span className={styles.quickGameIcon}>{g.icon}</span> {g.name}
                            </button>
                        ))}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="from-game-select">Source Game</label>
                        <select
                            id="from-game-select"
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
                            <label className={styles.label} htmlFor="input-sensibility">Sensitivity</label>
                            <input
                                id="input-sensibility"
                                type="number"
                                className={styles.input}
                                value={sens}
                                onChange={(e) => setSens(e.target.value)}
                                step="0.001"
                                min="0"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="input-dpi">Mouse DPI</label>
                            <input
                                id="input-dpi"
                                type="number"
                                className={styles.input}
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                                step="10"
                                min="100"
                            />
                        </div>
                    </div>

                    {/* WINDOWS SENSITIVITY WARNING */}
                    <div className={styles.winTipToggle} onClick={() => setShowWinTip(!showWinTip)}>
                        <span>⚠️ Important: Windows Mouse Settings</span>
                        <span className={styles.winTipArrow}>{showWinTip ? '▲' : '▼'}</span>
                    </div>
                    {showWinTip && (
                        <div className={styles.winTipBox}>
                            <p><strong>For accurate results:</strong></p>
                            <ul>
                                <li>Set Windows Pointer Speed to <strong>6/11</strong> (the default notch)</li>
                                <li>Turn <strong>OFF</strong> &ldquo;Enhance Pointer Precision&rdquo; (mouse acceleration)</li>
                                <li>Most competitive games use <strong>raw input</strong>, bypassing Windows settings entirely</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* OUTPUT SECTION */}
                <div>
                    <div className={styles.sectionTitle}>Output (To)</div>

                    <div className={styles.quickGamesRow}>
                        {QUICK_GAMES.map(g => (
                            <button
                                key={`to-${g.id}`}
                                type="button"
                                className={`${styles.quickGameBtn} ${toGame === g.id ? styles.quickGameBtnActive : ''}`}
                                onClick={() => setToGame(g.id)}
                            >
                                <span className={styles.quickGameIcon}>{g.icon}</span> {g.name}
                            </button>
                        ))}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="to-game-select">Target Game</label>
                        <select
                            id="to-game-select"
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
                        <div className={styles.resultValueRow}>
                            <div className={styles.resultValue}>{resultSens}</div>
                            <button
                                className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
                                onClick={handleCopy}
                                title="Copy to clipboard"
                            >
                                {copied ? '✓ Copied' : '📋 Copy'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK STATS + SENSITIVITY CATEGORY */}
            <div className={styles.statsGrid}>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>CM / 360°</div>
                    <div className={styles.statValue}>{fromCm360} cm</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>Inches / 360°</div>
                    <div className={styles.statValue}>{(Number(fromCm360) / 2.54).toFixed(1)}&rdquo;</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>eDPI (Universal)</div>
                    <div className={styles.statValue}>
                        {(numericSens * numericDpi).toFixed(0)}
                    </div>
                </div>
            </div>

            {/* SENSITIVITY CATEGORY BADGE */}
            <div className={styles.sensCategoryRow}>
                <div className={styles.sensCategoryBadge} style={{ borderColor: sensCategory.color }}>
                    <span className={styles.sensCategoryIcon}>{sensCategory.icon}</span>
                    <div>
                        <span className={styles.sensCategoryLabel} style={{ color: sensCategory.color }}>{sensCategory.label} Sensitivity</span>
                        <span className={styles.sensCategoryDesc}>{sensCategory.desc}</span>
                    </div>
                </div>
                <div className={styles.sensProAvg}>
                    <span className={styles.sensProAvgLabel}>Pro Average</span>
                    <span className={styles.sensProAvgValue}>42 cm/360°</span>
                </div>
            </div>

            {/* POLLING RATE CALCULATOR */}
            <div className={styles.pollingSection}>
                <div className={styles.pollingSectionHeader}>
                    <span className={styles.pollingSectionTitle}>📡 Polling Rate Impact</span>
                    <select
                        className={styles.pollingSelect}
                        value={pollingRate}
                        onChange={(e) => setPollingRate(Number(e.target.value))}
                    >
                        {POLLING_RATES.map(rate => (
                            <option key={rate} value={rate}>{rate} Hz</option>
                        ))}
                    </select>
                </div>
                <div className={styles.pollingStatsRow}>
                    <div className={styles.pollingStat}>
                        <span className={styles.pollingStatLabel}>Input Delay</span>
                        <span className={styles.pollingStatValue}>{pollingStats.delayMs} ms</span>
                    </div>
                    <div className={styles.pollingStat}>
                        <span className={styles.pollingStatLabel}>°/poll cycle</span>
                        <span className={styles.pollingStatValue}>{pollingStats.degreesPerPoll}°</span>
                    </div>
                    <div className={styles.pollingStat}>
                        <span className={styles.pollingStatLabel}>Reports/sec</span>
                        <span className={styles.pollingStatValue}>{pollingRate.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* DYNAMIC MULTI-GAME EQUIVALENCE SECTION */}
            <div className={styles.equivalenceSection}>
                <h2 className={styles.equivalenceTitle}>Your Equivalent Sensitivity in Other Games</h2>
                <p className={styles.equivalenceSubtitle}>
                    See instantly which sensitivity to configure across other games based on your DPI.
                </p>
                <div className={styles.equivalenceGrid}>
                    {(showAllEquivalents ? equivalenceList : equivalenceList.slice(0, EQUIVALENCE_PREVIEW_COUNT)).map(eq => (
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
                {equivalenceList.length > EQUIVALENCE_PREVIEW_COUNT && (
                    <button
                        type="button"
                        className={styles.showAllBtn}
                        onClick={() => setShowAllEquivalents(v => !v)}
                    >
                        {showAllEquivalents ? 'Show less' : `View all ${equivalenceList.length} games`}
                    </button>
                )}
            </div>
        </div>
    );
}
