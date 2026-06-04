"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './DPIAnalyzer.module.css';

export default function DPIAnalyzer() {
    const [nominalDpi, setNominalDpi] = useState<number>(800);
    const [targetDistance, setTargetDistance] = useState<number>(10);
    const [distanceUnit, setDistanceUnit] = useState<'cm' | 'in'>('cm');

    const [isTesting, setIsTesting] = useState<boolean>(false);
    const [liveCounts, setLiveCounts] = useState<number>(0);
    const [testFinished, setTestFinished] = useState<boolean>(false);

    // Final results
    const [finalCounts, setFinalCounts] = useState<number>(0);
    const [realDpi, setRealDpi] = useState<number>(0);
    const [deviation, setDeviation] = useState<number>(0);

    // Compensation calculator
    const [inGameSens, setInGameSens] = useState<number | string>(1.0);

    const accumulatedXRef = useRef<number>(0);
    const zoneRef = useRef<HTMLDivElement>(null);

    // Handle Pointer Lock state changes
    useEffect(() => {
        const handlePointerLockChange = () => {
            if (document.pointerLockElement === zoneRef.current) {
                // Pointer locked, test starts
                setIsTesting(true);
                setLiveCounts(0);
                accumulatedXRef.current = 0;
            } else {
                // Pointer unlocked, test stops
                setIsTesting((wasTesting) => {
                    if (wasTesting) {
                        finishTest();
                    }
                    return false;
                });
            }
        };

        const handlePointerLockError = () => {
            console.error("Pointer Lock failed.");
            setIsTesting(false);
            alert("Could not lock mouse pointer. Please ensure you clicked the area directly and have given permission.");
        };

        document.addEventListener('pointerlockchange', handlePointerLockChange);
        document.addEventListener('pointerlockerror', handlePointerLockError);

        return () => {
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
            document.removeEventListener('pointerlockerror', handlePointerLockError);
        };
    }, [nominalDpi, targetDistance, distanceUnit]);

    // Handle Mouse movement and click (to stop)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement !== zoneRef.current) return;
            accumulatedXRef.current += e.movementX;
            setLiveCounts(Math.abs(accumulatedXRef.current));
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (document.pointerLockElement === zoneRef.current) {
                e.preventDefault();
                document.exitPointerLock();
            }
        };

        if (isTesting) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [isTesting]);

    const startTest = () => {
        setTestFinished(false);
        setLiveCounts(0);
        accumulatedXRef.current = 0;

        if (zoneRef.current) {
            try {
                // Request pointer lock
                const promise = zoneRef.current.requestPointerLock() as any;
                if (promise && typeof promise.catch === 'function') {
                    promise.catch((err: any) => {
                        console.error("Pointer lock error: ", err);
                    });
                }
            } catch (err) {
                console.error("Pointer lock exception: ", err);
            }
        }
    };

    const stopTest = () => {
        if (document.pointerLockElement === zoneRef.current) {
            document.exitPointerLock();
        }
    };

    const finishTest = () => {
        const counts = Math.abs(accumulatedXRef.current);
        setFinalCounts(counts);

        // Convert distance to inches
        const inches = distanceUnit === 'cm' ? targetDistance / 2.54 : targetDistance;

        if (inches <= 0) return;

        const calculatedRealDpi = Math.round(counts / inches);
        setRealDpi(calculatedRealDpi);

        const calculatedDeviation = ((calculatedRealDpi - nominalDpi) / nominalDpi) * 100;
        setDeviation(calculatedDeviation);

        setTestFinished(true);
    };

    // Calculate rating and color code for deviation
    const getDeviationRating = (devVal: number) => {
        const absDev = Math.abs(devVal);
        if (absDev < 3) return { text: 'Excellent', color: '#00ff9d', class: styles.alertGood };
        if (absDev <= 7) return { text: 'Moderate', color: '#ffb800', class: styles.alertWarning };
        return { text: 'High Deviation', color: '#ff3838', class: styles.alertBad };
    };

    const rating = getDeviationRating(deviation);

    // Calculate target nominal counts
    const inches = distanceUnit === 'cm' ? targetDistance / 2.54 : targetDistance;
    const targetCounts = Math.round(nominalDpi * inches);
    const progressPercent = Math.min(100, (liveCounts / targetCounts) * 100);

    // Calculate compensation multiplier
    const rawSens = Number(inGameSens) || 0;
    const adjustedSens = realDpi > 0 ? (rawSens * (nominalDpi / realDpi)).toFixed(4) : "0.0000";

    return (
        <div className={styles.card}>
            {/* Input Config Row */}
            <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Nominal Mouse DPI</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={nominalDpi}
                        onChange={(e) => setNominalDpi(Math.max(1, Number(e.target.value)))}
                        disabled={isTesting}
                        placeholder="e.g. 800"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Physical Distance</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={targetDistance}
                        onChange={(e) => setTargetDistance(Math.max(0.1, Number(e.target.value)))}
                        disabled={isTesting}
                        placeholder="e.g. 10"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Distance Unit</label>
                    <select
                        className={styles.select}
                        value={distanceUnit}
                        onChange={(e) => setDistanceUnit(e.target.value as 'cm' | 'in')}
                        disabled={isTesting}
                    >
                        <option value="cm">Centimeters (cm)</option>
                        <option value="in">Inches (in)</option>
                    </select>
                </div>
            </div>

            {/* Test Interactive Zone */}
            <div
                ref={zoneRef}
                id="pointer-lock-zone"
                className={`${styles.testZone} ${isTesting ? styles.testZoneActive : ''}`}
                onClick={!isTesting ? startTest : undefined}
            >
                {!isTesting ? (
                    <div>
                        <h3 className={styles.testTitle}>Ready to Measure DPI Deviation</h3>
                        <p className={styles.testInstruction}>
                            Align your mouse with the 0 mark on your physical ruler. Click below to start the analyzer, then slide your mouse exactly {targetDistance} {distanceUnit} horizontally.
                        </p>
                        <button type="button" className={styles.startButton} onClick={startTest}>
                            Start Analyzer Test
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3 className={styles.testTitle} style={{ color: 'var(--primary)' }}>
                            Analyzer Active &amp; Mouse Locked
                        </h3>
                        <p className={styles.testInstruction}>
                            Drag your mouse exactly <strong>{targetDistance} {distanceUnit}</strong> along your ruler, then <strong>Left-Click</strong> or press <strong>Esc</strong> to lock in the results.
                        </p>

                        {/* Interactive Progress Bar */}
                        <div className={styles.trackBarContainer}>
                            <div className={styles.trackLine}>
                                <div className={styles.trackFill} style={{ width: `${progressPercent}%` }} />
                                <div className={styles.trackDot} style={{ left: `${progressPercent}%` }} />
                            </div>
                        </div>

                        <div className={styles.statsRow}>
                            <div>
                                <div className={styles.statVal}>{liveCounts}</div>
                                <div className={styles.statDesc}>Raw Counts</div>
                            </div>
                            <div>
                                <div className={styles.statVal}>{targetCounts}</div>
                                <div className={styles.statDesc}>Target Counts</div>
                            </div>
                        </div>

                        <button type="button" className={styles.stopButton} onClick={stopTest}>
                            Stop &amp; Calculate
                        </button>
                    </div>
                )}
            </div>

            {/* Results Panel */}
            {testFinished && !isTesting && (
                <div className={styles.resultsPanel}>
                    <div className={styles.resultsGrid}>
                        {/* Dial column */}
                        <div className={styles.dialColumn}>
                            <div
                                className={styles.dialOuter}
                                style={{
                                    background: `conic-gradient(${rating.color} ${Math.min(100, Math.max(0, 50 + deviation * 2.5)) * 3.6}deg, rgba(255, 255, 255, 0.05) 0deg)`,
                                }}
                            >
                                <div className={styles.dialInner}>
                                    <div className={styles.dialVal}>
                                        {deviation >= 0 ? '+' : ''}{deviation.toFixed(2)}%
                                    </div>
                                    <div className={styles.dialLabel}>Deviation</div>
                                </div>
                            </div>
                            <div
                                className={styles.ratingBadge}
                                style={{ backgroundColor: rating.color }}
                            >
                                {rating.text}
                            </div>
                        </div>

                        {/* Details and feedback column */}
                        <div className={styles.resultsDetails}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Measurement Analysis</h3>
                            
                            <div className={styles.detailsList}>
                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsVal}>{realDpi}</div>
                                    <div className={styles.detailsLabel}>Real Measured DPI</div>
                                </div>
                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsVal}>{nominalDpi}</div>
                                    <div className={styles.detailsLabel}>Nominal DPI</div>
                                </div>
                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsVal}>{finalCounts}</div>
                                    <div className={styles.detailsLabel}>Total Raw Counts</div>
                                </div>
                                <div className={styles.detailsItem}>
                                    <div className={styles.detailsVal}>{targetDistance} {distanceUnit}</div>
                                    <div className={styles.detailsLabel}>Measured Distance</div>
                                </div>
                            </div>

                            {/* Feedback Text box */}
                            <div className={`${styles.feedbackAlert} ${rating.class}`}>
                                {Math.abs(deviation) < 3 ? (
                                    <p>
                                        <strong>Excellent sensor accuracy!</strong> Your mouse has negligible deviation ({deviation >= 0 ? '+' : ''}{deviation.toFixed(1)}%). Your muscle memory will be perfectly consistent, and you do not need to adjust your in-game sensitivity settings.
                                    </p>
                                ) : (
                                    <p>
                                        <strong>Sensor deviation detected!</strong> Your mouse travels {Math.abs(deviation).toFixed(1)}% {deviation > 0 ? 'faster' : 'slower'} than the nominal {nominalDpi} DPI. This is common due to pad surface and skates height. Use the adjustment tool below to align your sensitivity.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sensitivity compensation tool */}
                    <div className={styles.adjustmentCard}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            Sensitivity Adjustment Tool
                        </h4>
                        <div className={styles.adjustmentGrid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Current In-Game Sensitivity</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className={styles.input}
                                    value={inGameSens}
                                    onChange={(e) => setInGameSens(e.target.value)}
                                    placeholder="e.g. 1.0"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                    Adjusted Sensitivity (Compensated)
                                </label>
                                <div
                                    className={styles.input}
                                    style={{
                                        background: 'rgba(0, 255, 157, 0.05)',
                                        border: '1px solid var(--primary)',
                                        color: 'var(--primary)',
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {adjustedSens}
                                </div>
                            </div>
                        </div>
                        <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            * Using this adjusted sensitivity will make your mouse movement feel exactly like the true nominal DPI of {nominalDpi} without any sensor deviation.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
