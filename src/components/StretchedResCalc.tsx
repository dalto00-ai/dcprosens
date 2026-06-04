"use client";

import { useState, useMemo } from 'react';
import styles from './StretchedResCalc.module.css';

const NATIVE_RATIOS = [
    { label: '16:9 (Standard Widescreen)', width: 16, height: 9, display: '16:9' },
    { label: '16:10 (Widescreen)', width: 16, height: 10, display: '16:10' },
    { label: '21:9 (Ultrawide)', width: 21, height: 9, display: '21:9' },
];

const TARGET_RATIOS = [
    { label: '4:3 (Traditional Stretched)', width: 4, height: 3, display: '4:3' },
    { label: '5:4 (Ultra-Stretched)', width: 5, height: 4, display: '5:4' },
    { label: '16:10 (Slight Stretch)', width: 16, height: 10, display: '16:10' },
    { label: '16:9 (Native/No Stretch)', width: 16, height: 9, display: '16:9' },
];

const GAMES = [
    { id: 'cs2', name: 'CS2 / CS:GO' },
    { id: 'r6', name: 'Rainbow Six Siege' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'apex', name: 'Apex Legends' },
    { id: 'other', name: 'Other (Apex, CoD, Battlefield, etc.)' },
];

export default function StretchedResCalc() {
    const [nativeSel, setNativeSel] = useState('16:9');
    const [targetSel, setTargetSel] = useState('4:3');
    const [gameSel, setGameSel] = useState('cs2');
    const [copied, setCopied] = useState(false);

    // Parse aspect ratios
    const native = useMemo(() => {
        const item = NATIVE_RATIOS.find(r => r.display === nativeSel);
        return item ? { w: item.width, h: item.height, ratio: item.width / item.height } : { w: 16, h: 9, ratio: 16/9 };
    }, [nativeSel]);

    const target = useMemo(() => {
        const item = TARGET_RATIOS.find(r => r.display === targetSel);
        return item ? { w: item.width, h: item.height, ratio: item.width / item.height } : { w: 4, h: 3, ratio: 4/3 };
    }, [targetSel]);

    // Calculate stretch factor
    const stretchFactor = useMemo(() => {
        if (target.ratio >= native.ratio) return 1.0; // No stretch or compressed (usually not done)
        return native.ratio / target.ratio;
    }, [native, target]);

    const perceivedSpeedup = useMemo(() => {
        return stretchFactor;
    }, [stretchFactor]);

    // CS2/CSGO m_yaw calculation (default is 0.022)
    const cs2Yaw = useMemo(() => {
        return 0.022 / stretchFactor;
    }, [stretchFactor]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.calculatorGrid}>
                {/* INPUT PANEL */}
                <div className={styles.inputPanel}>
                    <h2 className={styles.panelTitle}>⚙️ Settings</h2>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="native-aspect">Native Monitor Aspect Ratio</label>
                        <select
                            id="native-aspect"
                            className={styles.select}
                            value={nativeSel}
                            onChange={(e) => setNativeSel(e.target.value)}
                        >
                            {NATIVE_RATIOS.map(r => (
                                <option key={r.display} value={r.display}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="target-aspect">Target Resolution Aspect Ratio</label>
                        <select
                            id="target-aspect"
                            className={styles.select}
                            value={targetSel}
                            onChange={(e) => setTargetSel(e.target.value)}
                        >
                            {TARGET_RATIOS.map(r => (
                                <option key={r.display} value={r.display}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="game-select">Game</label>
                        <select
                            id="game-select"
                            className={styles.select}
                            value={gameSel}
                            onChange={(e) => setGameSel(e.target.value)}
                        >
                            {GAMES.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* DYNAMIC ILLUSTRATION */}
                    <div className={styles.vizWrapper}>
                        <div className={styles.vizLabel}>Visual Stretch Representation</div>
                        <div className={styles.vizContainer}>
                            <div className={styles.vizBox}>
                                <div className={styles.vizTitle}>Native ({nativeSel})</div>
                                <div className={styles.screenRatio} style={{ aspectRatio: `${native.w}/${native.h}` }}>
                                    <div className={styles.circle} />
                                    <span className={styles.screenText}>Round Target</span>
                                </div>
                            </div>
                            <div className={styles.vizBox}>
                                <div className={styles.vizTitle}>Stretched ({targetSel})</div>
                                <div className={styles.screenRatio} style={{ aspectRatio: `${native.w}/${native.h}` }}>
                                    <div 
                                        className={styles.circle} 
                                        style={{ transform: `scaleX(${stretchFactor.toFixed(3)})` }} 
                                    />
                                    <span className={styles.screenText}>Wider/Stretched Target</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* OUTPUT RESULTS PANEL */}
                <div className={styles.outputPanel}>
                    <h2 className={styles.panelTitle}>📊 Results</h2>

                    {stretchFactor <= 1.0 ? (
                        <div className={styles.noStretchMsg}>
                            <span style={{ fontSize: '2.5rem' }}>🖥️</span>
                            <p>No horizontal stretching is applied. Your sensitivity is perfectly 1:1 on both horizontal and vertical axes.</p>
                        </div>
                    ) : (
                        <div className={styles.resultsWrapper}>
                            {/* STATS ROW */}
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Stretch Factor</span>
                                    <strong className={styles.statVal}>{stretchFactor.toFixed(3)}x</strong>
                                    <span className={styles.statDesc}>Horizontal pixels expanded</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statLabel}>Horizontal Feel</span>
                                    <strong className={styles.statVal} style={{ color: 'var(--secondary)' }}>
                                        +{((perceivedSpeedup - 1) * 100).toFixed(1)}%
                                    </strong>
                                    <span className={styles.statDesc}>Faster perceived speed</span>
                                </div>
                            </div>

                            {/* DETAILS BY GAME */}
                            <div className={styles.gameResultDetails}>
                                {gameSel === 'cs2' && (
                                    <div className={styles.gameOutputBox}>
                                        <div className={styles.gameTitleRow}>
                                            <span className={styles.gameBadge}>CS2 / CS:GO</span>
                                            <h3>m_yaw Adjustment</h3>
                                        </div>
                                        <p className={styles.gameDesc}>
                                            To make your horizontal sensitivity match your vertical sensitivity on screen, set your console command <code>m_yaw</code> to the adjusted value below.
                                        </p>
                                        
                                        <div className={styles.cmdCard}>
                                            <div className={styles.cmdLabel}>Adjusted Console Command:</div>
                                            <div className={styles.cmdBox}>
                                                <code>m_yaw {cs2Yaw.toFixed(6)}</code>
                                                <button 
                                                    className={styles.copyBtn} 
                                                    onClick={() => handleCopy(`m_yaw ${cs2Yaw.toFixed(6)}`)}
                                                >
                                                    {copied ? '✅ Copied' : '📋 Copy'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className={styles.cmdCard}>
                                            <div className={styles.cmdLabel}>Reset to Default (16:9 / Normal):</div>
                                            <div className={styles.cmdBox}>
                                                <code>m_yaw 0.022</code>
                                                <button 
                                                    className={styles.copyBtn} 
                                                    onClick={() => handleCopy('m_yaw 0.022')}
                                                >
                                                    Copy Default
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {gameSel === 'r6' && (
                                    <div className={styles.gameOutputBox}>
                                        <div className={styles.gameTitleRow}>
                                            <span className={styles.gameBadge} style={{ background: '#0a3b6b', color: '#fff' }}>R6 Siege</span>
                                            <h3>Aspect Ratio Settings</h3>
                                        </div>
                                        <p className={styles.gameDesc}>
                                            In Rainbow Six Siege, you have two ways to configure stretched resolutions:
                                        </p>
                                        <div className={styles.infoCard}>
                                            <strong style={{ color: 'var(--text-primary)' }}>Method A: In-Game Display Aspect Ratio (Recommended)</strong>
                                            <p style={{ fontSize: '0.82rem', margin: '0.25rem 0' }}>
                                                Set the Aspect Ratio to <strong>{targetSel}</strong> directly in the game Display options while using native resolution. The game will automatically adjust your horizontal and vertical field of view to keep your sensitivity perfectly <strong>1:1</strong>. No sensitivity changes are needed.
                                            </p>
                                        </div>
                                        <div className={styles.infoCard} style={{ marginTop: '0.75rem' }}>
                                            <strong style={{ color: 'var(--secondary)' }}>Method B: GPU Display Scaling</strong>
                                            <p style={{ fontSize: '0.82rem', margin: '0.25rem 0' }}>
                                                If you force {targetSel} resolution via Windows/NVIDIA Control Panel and scale it, your horizontal movement will feel <strong>{perceivedSpeedup.toFixed(2)}x</strong> faster. Adjusting this requires modifying <code>MouseSensitivityMultiplierUnit</code> in your GameSettings.ini file, which is highly complex and not recommended.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {gameSel === 'valorant' && (
                                    <div className={styles.gameOutputBox}>
                                        <div className={styles.gameTitleRow}>
                                            <span className={styles.gameBadge} style={{ background: '#ff4655', color: '#fff' }}>Valorant</span>
                                            <h3>Stretched Res Limitation</h3>
                                        </div>
                                        <p className={styles.gameDesc}>
                                            <strong>Valorant does not support true stretched resolution.</strong>
                                        </p>
                                        <div className={styles.warningCard} style={{ borderLeftColor: '#ff4655', background: 'rgba(255, 70, 85, 0.05)' }}>
                                            <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                                When you select a 4:3 resolution in Valorant, the 3D world is locked at a 16:9 aspect ratio and letterboxed internally, then stretched. Your field of view (FOV) and target widths remain exactly the same. Only the HUD/UI is stretched. Your 3D mouse aiming speed is <strong>entirely unaffected</strong>. No adjustments are needed or possible.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {gameSel === 'apex' && (
                                    <div className={styles.gameOutputBox}>
                                        <div className={styles.gameTitleRow}>
                                            <span className={styles.gameBadge} style={{ background: '#da292a', color: '#fff' }}>Apex Legends</span>
                                            <h3>Independent X/Y Sensitivity</h3>
                                        </div>
                                        <p className={styles.gameDesc}>
                                            Apex Legends stretches the entire 3D world, compressing your horizontal field of view. Target models look wider, and horizontal speed feels <strong>{perceivedSpeedup.toFixed(2)}x</strong> faster.
                                        </p>
                                        <div className={styles.infoCard}>
                                            <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                                Apex does not have a console command to change horizontal sensitivity (like m_yaw). If you absolutely want a 1:1 screen feel, you must set independent X-axis and Y-axis DPI in your mouse software (e.g. set X-axis DPI to <code>{Math.round(800 / stretchFactor)}</code> and Y-axis DPI to <code>800</code>).
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {gameSel === 'other' && (
                                    <div className={styles.gameOutputBox}>
                                        <div className={styles.gameTitleRow}>
                                            <span className={styles.gameBadge}>General Games</span>
                                            <h3>Aim Scaling Analysis</h3>
                                        </div>
                                        <p className={styles.gameDesc}>
                                            For most FPS games, rendering on a stretched aspect ratio makes the horizontal pixels look <strong>{perceivedSpeedup.toFixed(2)}x</strong> faster.
                                        </p>
                                        <div className={styles.infoCard}>
                                            <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                                Since most modern engines do not provide independent X/Y mouse sensitivity scaling, you are highly encouraged to adapt to the perceived speedup. This maintains your physical angular memory (the exact hand movement required to turn 180 degrees).
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* WARNING BOX */}
                            <div className={styles.calcWarningBox}>
                                <div className={styles.warningTitle}>⚠️ Muscle Memory Advisory</div>
                                <p className={styles.warningText}>
                                    Changing your <code>m_yaw</code> or horizontal sensitivity makes horizontal movements cover less angular distance in the 3D world than vertical movements for the same physical hand travel. 
                                </p>
                                <ul className={styles.warningList}>
                                    <li>This breaks your <strong>vertical-to-horizontal uniformity</strong>.</li>
                                    <li>Drawing perfect circles or executing diagonal flicks will feel skewed.</li>
                                    <li>Vertical recoil control will require a different muscle movement scale than horizontal adjustments.</li>
                                </ul>
                                <p className={styles.warningFootnote}>
                                    <strong>Recommendation:</strong> Leave sensitivity settings at default and allow your brain to naturally adapt to the horizontal stretch.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
