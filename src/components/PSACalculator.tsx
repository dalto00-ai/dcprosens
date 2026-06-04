"use client";

import { useState, useMemo } from "react";
import styles from "./PSACalculator.module.css";

interface HistoryStep {
    step: number;
    base: number;
    factor: number;
    low: number;
    high: number;
    choice: "low" | "high";
}

const GAME_DEFAULTS = [
    { name: "Valorant", sens: 0.4, step: 0.05 },
    { name: "CS2 / Counter-Strike", sens: 1.5, step: 0.1 },
    { name: "Apex Legends", sens: 1.5, step: 0.1 },
    { name: "Overwatch 2", sens: 5.0, step: 0.5 },
    { name: "Other / Custom", sens: 1.0, step: 0.1 }
];

const PSA_FACTORS = [0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.025]; // 7 iterations

export default function PSACalculator() {
    // Game selection and starting setup
    const [selectedGame, setSelectedGame] = useState(GAME_DEFAULTS[0].name);
    const [startingSens, setStartingSens] = useState<string>("0.4");
    const [isCalibrating, setIsCalibrating] = useState(false);

    // Calibration states
    const [step, setStep] = useState(1); // 1 to 7
    const [currentBase, setCurrentBase] = useState(0.4);
    const [history, setHistory] = useState<HistoryStep[]>([]);
    
    // Copy state
    const [copied, setCopied] = useState(false);

    // Game change handler
    const handleGameChange = (gameName: string) => {
        setSelectedGame(gameName);
        const game = GAME_DEFAULTS.find(g => g.name === gameName);
        if (game) {
            setStartingSens(game.sens.toString());
        }
    };

    // Derived values for the current iteration
    const currentFactor = useMemo(() => {
        if (step >= 1 && step <= 7) {
            return PSA_FACTORS[step - 1];
        }
        return 0;
    }, [step]);

    const currentLow = useMemo(() => {
        return parseFloat((currentBase - (currentBase * currentFactor)).toFixed(4));
    }, [currentBase, currentFactor]);

    const currentHigh = useMemo(() => {
        return parseFloat((currentBase + (currentBase * currentFactor)).toFixed(4));
    }, [currentBase, currentFactor]);

    // Start calibration
    const startCalibration = () => {
        const parsed = parseFloat(startingSens);
        if (isNaN(parsed) || parsed <= 0) {
            alert("Please enter a valid starting sensitivity.");
            return;
        }
        setCurrentBase(parsed);
        setStep(1);
        setHistory([]);
        setIsCalibrating(true);
        setCopied(false);
    };

    // User chooses Low
    const selectLow = () => {
        const nextStep = step + 1;
        const newHistory: HistoryStep = {
            step,
            base: currentBase,
            factor: currentFactor,
            low: currentLow,
            high: currentHigh,
            choice: "low"
        };
        setHistory([...history, newHistory]);
        setCurrentBase(currentLow);
        setStep(nextStep);
    };

    // User chooses High
    const selectHigh = () => {
        const nextStep = step + 1;
        const newHistory: HistoryStep = {
            step,
            base: currentBase,
            factor: currentFactor,
            low: currentLow,
            high: currentHigh,
            choice: "high"
        };
        setHistory([...history, newHistory]);
        setCurrentBase(currentHigh);
        setStep(nextStep);
    };

    // Undo previous step
    const handleUndo = () => {
        if (history.length === 0) return;
        const lastStep = history[history.length - 1];
        setCurrentBase(lastStep.base);
        setStep(lastStep.step);
        setHistory(history.slice(0, -1));
        setCopied(false);
    };

    // Reset everything
    const handleReset = () => {
        setIsCalibrating(false);
        setStep(1);
        setHistory([]);
        const game = GAME_DEFAULTS.find(g => g.name === selectedGame);
        if (game) {
            setStartingSens(game.sens.toString());
        } else {
            setStartingSens("0.4");
        }
        setCopied(false);
    };

    // Copy to clipboard
    const copyResult = () => {
        navigator.clipboard.writeText(currentBase.toFixed(4));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.psaCard}>
            {!isCalibrating ? (
                /* ── SETUP SCREEN ── */
                <div className={styles.setupScreen}>
                    <h3 className={styles.sectionTitle}>PSA Calibration Setup</h3>
                    <p className={styles.sectionDesc}>
                        The Perfect Sensitivity Approximation (PSA) method is a scientific procedure used by elite aim coaches to narrow down your optimal in-game sensitivity bounds.
                    </p>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Select Your Game</label>
                        <div className={styles.gameGrid}>
                            {GAME_DEFAULTS.map((game) => (
                                <button
                                    key={game.name}
                                    type="button"
                                    className={`${styles.gameBtn} ${selectedGame === game.name ? styles.activeGameBtn : ""}`}
                                    onClick={() => handleGameChange(game.name)}
                                >
                                    {game.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="starting-sens" className={styles.label}>Starting Sensitivity</label>
                        <p className={styles.inputHelp}>
                            Enter a sensitivity value you are currently comfortable with, or use the default game recommendation.
                        </p>
                        <input
                            id="starting-sens"
                            type="number"
                            step="0.01"
                            min="0.01"
                            className={styles.input}
                            value={startingSens}
                            onChange={(e) => setStartingSens(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className={styles.primaryBtn}
                        onClick={startCalibration}
                    >
                        Start Calibration ⚡
                    </button>
                </div>
            ) : step <= 7 ? (
                /* ── CALIBRATION SCREEN ── */
                <div className={styles.calibrationScreen}>
                    {/* Progress steps bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBarWrapper}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${((step - 1) / 7) * 100}%` }}
                            />
                        </div>
                        <div className={styles.stepsWrapper}>
                            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                                <div
                                    key={`step-node-${s}`}
                                    className={`${styles.stepNode} ${s < step ? styles.stepDone : ""} ${s === step ? styles.stepCurrent : ""}`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                        <div className={styles.progressText}>
                            Step <strong>{step} of 7</strong> ({Math.round(((step - 1) / 7) * 100)}% Complete)
                        </div>
                    </div>

                    {/* How to test info box */}
                    <div className={styles.instructionsBox}>
                        <h4 className={styles.instructionsTitle}>🧪 How to Test:</h4>
                        <ol className={styles.instructionsList}>
                            <li>Launch your game and enter the practice range or training arena.</li>
                            <li>Change your in-game sensitivity to the <strong>Low Sensitivity ({currentLow})</strong> value. Test your tracking on bots or targets for 30-60 seconds.</li>
                            <li>Change your in-game sensitivity to the <strong>High Sensitivity ({currentHigh})</strong> value. Test your tracking again.</li>
                            <li>Select which of the two values felt more controlled, comfortable, and natural.</li>
                        </ol>
                    </div>

                    {/* Low vs High Testing Cards */}
                    <div className={styles.testerGrid}>
                        {/* Low card */}
                        <div className={`${styles.testerCard} ${styles.lowCard}`}>
                            <div className={styles.testerBadge}>📉 Option A</div>
                            <h4 className={styles.testerLabel}>Low Sensitivity</h4>
                            <div className={styles.testerValue}>{currentLow}</div>
                            <button
                                type="button"
                                className={`${styles.testerBtn} ${styles.lowBtn}`}
                                onClick={selectLow}
                            >
                                Select Low
                            </button>
                        </div>

                        {/* High card */}
                        <div className={`${styles.testerCard} ${styles.highCard}`}>
                            <div className={styles.testerBadge}>📈 Option B</div>
                            <h4 className={styles.testerLabel}>High Sensitivity</h4>
                            <div className={styles.testerValue}>{currentHigh}</div>
                            <button
                                type="button"
                                className={`${styles.testerBtn} ${styles.highBtn}`}
                                onClick={selectHigh}
                            >
                                Select High
                            </button>
                        </div>
                    </div>

                    {/* Bottom control bar */}
                    <div className={styles.controlBar}>
                        <button
                            type="button"
                            className={styles.secondaryBtn}
                            onClick={handleUndo}
                            disabled={history.length === 0}
                        >
                            ← Undo Last Choice
                        </button>
                        <button
                            type="button"
                            className={styles.dangerBtn}
                            onClick={handleReset}
                        >
                            Restart Calibration 🔄
                        </button>
                    </div>
                </div>
            ) : (
                /* ── RESULT SCREEN ── */
                <div className={styles.resultScreen}>
                    <span className={styles.glowingBadge}>🎉 Calibration Complete</span>
                    <h3 className={styles.resultTitle}>Your Perfect Sensitivity</h3>
                    
                    <div className={styles.resultDisplay}>
                        <div className={styles.resultVal}>{currentBase.toFixed(4)}</div>
                        <p className={styles.resultSub}>Calculated for <strong>{selectedGame}</strong></p>
                        
                        <button
                            type="button"
                            className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
                            onClick={copyResult}
                        >
                            {copied ? "Copied! ✓" : "Copy Sensitivity 📋"}
                        </button>
                    </div>

                    {/* eDPI Projections */}
                    <div className={styles.edpiTableWrapper}>
                        <h4 className={styles.tableTitle}>Estimated eDPI by Mouse DPI</h4>
                        <div className={styles.edpiTable}>
                            <div className={styles.tableRowHeader}>
                                <div>Mouse DPI</div>
                                <div>Effective DPI (eDPI)</div>
                            </div>
                            {[400, 800, 1600].map((dpi) => (
                                <div key={`dpi-row-${dpi}`} className={styles.tableRowItem}>
                                    <div className={styles.dpiCol}>{dpi} DPI</div>
                                    <div className={styles.edpiCol}>{(currentBase * dpi).toFixed(0)} eDPI</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* History summary logs */}
                    <details className={styles.historyDetails}>
                        <summary className={styles.historySummary}>View Calibration Path History ({history.length} steps)</summary>
                        <div className={styles.historyLogs}>
                            {history.map((h) => (
                                <div key={`hist-log-${h.step}`} className={styles.historyRow}>
                                    <span>Step {h.step}:</span>
                                    <span>Base: {h.base.toFixed(3)}</span>
                                    <span>Factor: {h.factor}</span>
                                    <span>Tested Low: {h.low} vs High: {h.high}</span>
                                    <strong className={h.choice === "low" ? styles.logLow : styles.logHigh}>
                                        Chose: {h.choice.toUpperCase()}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </details>

                    {/* CTA/Button to start over */}
                    <div className={styles.resultControls}>
                        <button
                            type="button"
                            className={styles.primaryBtn}
                            onClick={handleReset}
                        >
                            Calculate New Sensitivity 🔄
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
