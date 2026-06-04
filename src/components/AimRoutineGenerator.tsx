"use client";

import React, { useState } from 'react';
import styles from './AimRoutineGenerator.module.css';

interface Scenario {
    name: string;
    instructions: string;
    targetScore: string;
}

interface Step {
    time: string;
    title: string;
    description: string;
    aimlabs?: Scenario;
    kovaaks?: Scenario;
}

export default function AimRoutineGenerator() {
    const [game, setGame] = useState<string>('Valorant');
    const [rank, setRank] = useState<string>('platinum-diamond');
    const [weakness, setWeakness] = useState<string>('flicking');
    const [routine, setRoutine] = useState<Step[] | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const handleGenerate = () => {
        // Dynamic generation logic
        const steps: Step[] = [];

        // 1. Warm-up (5 mins)
        const isTrackingFocus = weakness === 'tracking' || weakness === 'target-switching';
        const warmUpStep: Step = {
            time: "5 Min",
            title: "Warm-Up & Motor Activation",
            description: "Calibrate your eyes and hand-eye coordination. Move your mouse smoothly, focusing on a constant rhythm over raw speed.",
            aimlabs: isTrackingFocus ? {
                name: rank === 'bronze-gold' ? "Sphere-track Easy" : rank === 'platinum-diamond' ? "Sphere-track Ultimate" : "Sphere-track Precision",
                instructions: "Smoothly follow the floating sphere without guessing its changes in direction. Keep your wrist and arm completely relaxed.",
                targetScore: rank === 'bronze-gold' ? "65% Accuracy" : rank === 'platinum-diamond' ? "75% Accuracy" : "85% Accuracy"
            } : {
                name: rank === 'bronze-gold' ? "Gridshot Ultimate" : rank === 'platinum-diamond' ? "Gridshot Precision" : "Sixshot Ultimate",
                instructions: "Flick between targets in a steady rhythm. Prioritize straight lines and clean movements over raw speed.",
                targetScore: rank === 'bronze-gold' ? "65,000 Score" : rank === 'platinum-diamond' ? "78,000 Score" : "88,000 Score"
            },
            kovaaks: isTrackingFocus ? {
                name: rank === 'bronze-gold' ? "Close Long Strafes Easy" : rank === 'platinum-diamond' ? "Close Long Strafes" : "Close Fast Strafes Invincible",
                instructions: "Smooth tracking on a close target. Avoid predicting direction changes; instead, react instantly when it changes.",
                targetScore: rank === 'bronze-gold' ? "45% Accuracy" : rank === 'platinum-diamond' ? "55% Accuracy" : "65% Accuracy"
            } : {
                name: rank === 'bronze-gold' ? "1wall 6targets" : rank === 'platinum-diamond' ? "1wall 6targets small" : "1wall 6targets small extra small",
                instructions: "Static clicking. Move from target to target in straight lines. Aim for >95% accuracy.",
                targetScore: rank === 'bronze-gold' ? "85 Score" : rank === 'platinum-diamond' ? "105 Score" : "125 Score"
            }
        };
        steps.push(warmUpStep);

        // 2. Part 1 (10 mins) - Weakness Core
        let part1Step: Step;
        if (weakness === 'flicking') {
            part1Step = {
                time: "10 Min",
                title: "Core Flicking & Precision Speed",
                description: "Develop muscle memory for wide angles. Force yourself to decelerate just before the click to ensure high precision.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Gridshot Speed" : rank === 'platinum-diamond' ? "Spidershot Precision" : "Sixshot Precision",
                    instructions: "Practice precise, fast flicks. Focus on clean snap lines to the targets.",
                    targetScore: rank === 'bronze-gold' ? "75,000 Score" : rank === 'platinum-diamond' ? "70,000 Score" : "80,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Tile Frenzy" : rank === 'platinum-diamond' ? "VT 1w4ts" : "VT 1w4ts Small",
                    instructions: "Snap to targets and click cleanly. Maintain high accuracy to prevent resetting.",
                    targetScore: rank === 'bronze-gold' ? "100 Score" : rank === 'platinum-diamond' ? "85 Score" : "98 Score"
                }
            };
        } else if (weakness === 'micro-adjustments') {
            part1Step = {
                time: "10 Min",
                title: "Core Micro-Correction Drills",
                description: "Minimize the time between your initial wide flick and your final micro-correction onto the target's center.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Microshot Precision" : rank === 'platinum-diamond' ? "Microflick" : "Microshot Speed Precision",
                    instructions: "Flick to small targets appearing in a tight radius around the center. Keep your hand highly responsive.",
                    targetScore: rank === 'bronze-gold' ? "60,000 Score" : rank === 'platinum-diamond' ? "70,000 Score" : "80,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "1wall9000targets" : rank === 'platinum-diamond' ? "VT 1w2ts Micro" : "VT 1w2ts Micro Small",
                    instructions: "Extremely small flick corrections. Work on using tiny finger movements for fine-tuned control.",
                    targetScore: rank === 'bronze-gold' ? "100 Score" : rank === 'platinum-diamond' ? "90 Score" : "105 Score"
                }
            };
        } else if (weakness === 'tracking') {
            part1Step = {
                time: "10 Min",
                title: "Core Continuous Smooth Tracking",
                description: "Smooth tracking is about matching the speed of the enemy perfectly. Do not make jerky adjustments.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Strafetrack Ultimate" : rank === 'platinum-diamond' ? "Strafetrack Precision" : "Strafetrack Speed",
                    instructions: "Track a target moving randomly. Focus on matching the target velocity exactly.",
                    targetScore: rank === 'bronze-gold' ? "65% Accuracy" : rank === 'platinum-diamond' ? "72% Accuracy" : "80% Accuracy"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Thin Aiming Long Easy" : rank === 'platinum-diamond' ? "Thin Aiming Long" : "Thin Aiming Long Invincible",
                    instructions: "A narrow, long strafing target. Emphasize continuous tracking and avoid lifting your mouse.",
                    targetScore: rank === 'bronze-gold' ? "50% Accuracy" : rank === 'platinum-diamond' ? "60% Accuracy" : "70% Accuracy"
                }
            };
        } else if (weakness === 'target-switching') {
            part1Step = {
                time: "10 Min",
                title: "Core Target Switching & Rhythm",
                description: "Flick instantly to the next target as soon as the first target is eliminated. Eliminate any visual pause in between.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Multishot" : rank === 'platinum-diamond' ? "Multishot Precision" : "Sixshot Speed",
                    instructions: "Switch from target to target. Keep a continuous rhythm without stopping.",
                    targetScore: rank === 'bronze-gold' ? "70,000 Score" : rank === 'platinum-diamond' ? "80,000 Score" : "90,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Tile Frenzy 180 Easy" : rank === 'platinum-diamond' ? "Tile Frenzy 180" : "Tile Frenzy 180 Small",
                    instructions: "Rapidly transfer target focus. Switch direction dynamically.",
                    targetScore: rank === 'bronze-gold' ? "90 Score" : rank === 'platinum-diamond' ? "110 Score" : "130 Score"
                }
            };
        } else { // crosshair-placement
            part1Step = {
                time: "10 Min",
                title: "Core Centering & Line Control",
                description: "Practice keeping your crosshair perfectly aligned to horizontal lanes. Eliminate vertical drift when looking around.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Headshot Ultimate" : rank === 'platinum-diamond' ? "Headshot Precision" : "Headshot Speed",
                    instructions: "Keep the reticle locked onto the horizontal path. Minimize vertical correction.",
                    targetScore: rank === 'bronze-gold' ? "75% Accuracy" : rank === 'platinum-diamond' ? "85% Accuracy" : "92% Accuracy"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Centering I Easy" : rank === 'platinum-diamond' ? "Centering I" : "Centering I Invincible",
                    instructions: "Maintain your crosshair in the absolute horizontal center line of the screen.",
                    targetScore: rank === 'bronze-gold' ? "70% Accuracy" : rank === 'platinum-diamond' ? "80% Accuracy" : "90% Accuracy"
                }
            };
        }
        steps.push(part1Step);

        // 3. Part 2 (10 mins) - Specialized Weakness Adjustment
        let part2Step: Step;
        if (weakness === 'flicking') {
            part2Step = {
                time: "10 Min",
                title: "Dynamic Click-Timing & Evasion",
                description: "Flick towards targets that move unpredictably. Work on click timing: only click when the crosshair passes through the target.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Spidershot Ultimate" : rank === 'platinum-diamond' ? "Spidershot Precision" : "Microflick Precision",
                    instructions: "Wait for the target to spawn, slide cleanly, and click only when perfectly centered.",
                    targetScore: rank === 'bronze-gold' ? "70,000 Score" : rank === 'platinum-diamond' ? "80,000 Score" : "85,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "1wall5targets_pasu easy" : rank === 'platinum-diamond' ? "1wall5targets_pasu" : "1wall5targets_pasu reload small",
                    instructions: "A classic routine for timing flicks. Targets bounce around; click them at their apex or trajectory change.",
                    targetScore: rank === 'bronze-gold' ? "60 Score" : rank === 'platinum-diamond' ? "75 Score" : "88 Score"
                }
            };
        } else if (weakness === 'micro-adjustments') {
            part2Step = {
                time: "10 Min",
                title: "Reflex Microflicks",
                description: "Train your visual reaction to small movements. Perfect your hand's deceleration control (stopping power).",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Reflex Shot (Micro)" : rank === 'platinum-diamond' ? "Microshot Precision" : "Microflick Precision",
                    instructions: "Quick micro-flicks onto flashing nodes. Stay relaxed and click instantly.",
                    targetScore: rank === 'bronze-gold' ? "55,000 Score" : rank === 'platinum-diamond' ? "70,000 Score" : "80,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Floating Heads Timing Easy" : rank === 'platinum-diamond' ? "Floating Heads Timing" : "Floating Heads Timing Small",
                    instructions: "Practice small, precise microflicks to small moving sphere targets representing enemy heads.",
                    targetScore: rank === 'bronze-gold' ? "60 Score" : rank === 'platinum-diamond' ? "75 Score" : "85 Score"
                }
            };
        } else if (weakness === 'tracking') {
            part2Step = {
                time: "10 Min",
                title: "Reactive & Vertical Tracking",
                description: "Follow bouncing and flying targets. Keep your forearm engaged to handle vertical movement while using wrist for horizontal micro-tracking.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Circle Track" : rank === 'platinum-diamond' ? "Circle Track Precision" : "Circle Track Speed",
                    instructions: "Circular tracking movements. Focus on keeping your mouse movement fluid without micro-stops.",
                    targetScore: rank === 'bronze-gold' ? "60% Accuracy" : rank === 'platinum-diamond' ? "70% Accuracy" : "80% Accuracy"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "VT Bounce 180 Easy" : rank === 'platinum-diamond' ? "VT Bounce 180" : "VT Bounce 180 Tracking",
                    instructions: "Unpredictably bouncing targets. Keep tracking the target through its jumps and drops.",
                    targetScore: rank === 'bronze-gold' ? "45% Accuracy" : rank === 'platinum-diamond' ? "55% Accuracy" : "65% Accuracy"
                }
            };
        } else if (weakness === 'target-switching') {
            part2Step = {
                time: "10 Min",
                title: "Speed Switching & Control",
                description: "Maximize switching speed by reducing target-acquisition time. Hold down your fire button and track each target briefly before snapping to the next.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Motion Shot" : rank === 'platinum-diamond' ? "Motion Shot Precision" : "Motion Shot Speed",
                    instructions: "Targets appear in random motion. Instantly flick and transition between active moving entities.",
                    targetScore: rank === 'bronze-gold' ? "65,000 Score" : rank === 'platinum-diamond' ? "75,000 Score" : "85,000 Score"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "VT PatTargetSwitch Easy" : rank === 'platinum-diamond' ? "VT PatTargetSwitch" : "VT PatTargetSwitch Small",
                    instructions: "Switch targets as fast as possible. Track them momentarily to kill, then flick immediately.",
                    targetScore: rank === 'bronze-gold' ? "50 Score" : rank === 'platinum-diamond' ? "65 Score" : "80 Score"
                }
            };
        } else { // crosshair-placement
            part2Step = {
                time: "10 Min",
                title: "Angle Sweeping & Prefire Holding",
                description: "Hold tight angles while simulating character peeking. Train your reaction to targets moving horizontally away from walls.",
                aimlabs: {
                    name: rank === 'bronze-gold' ? "Wall Check" : rank === 'platinum-diamond' ? "Wall Check Precision" : "Wall Check Speed",
                    instructions: "Simulates sweeping corners. Keep the crosshair tight to the wall corner.",
                    targetScore: rank === 'bronze-gold' ? "85% Accuracy" : rank === 'platinum-diamond' ? "90% Accuracy" : "95% Accuracy"
                },
                kovaaks: {
                    name: rank === 'bronze-gold' ? "Angle Hold Trainer Easy" : rank === 'platinum-diamond' ? "Angle Hold Trainer" : "Angle Hold Trainer Small",
                    instructions: "Simulates holding angles. React instantly to targets peeking around the corner block.",
                    targetScore: rank === 'bronze-gold' ? "85% Accuracy" : rank === 'platinum-diamond' ? "95% Accuracy" : "98% Accuracy"
                }
            };
        }
        steps.push(part2Step);

        // 4. Cooldown & In-Game Integration (5 mins)
        let cooldownDescription = "";
        if (game === 'Valorant') {
            cooldownDescription = rank === 'bronze-gold'
                ? "Go to the Valorant Practice Range. Set bots to 'Medium' and complete 5 runs focusing on clean flicks (aim for 20+ bots). Then, play 1 Sheriff-only Deathmatch."
                : rank === 'platinum-diamond'
                ? "Play 2 Sheriff-only Deathmatches. Focus entirely on moving between shots (deadzoning) and holding your crosshair at head height. Never crouch spray."
                : "Play 2 Headshot-only Deathmatches. Focus on pre-aiming off-angles, fluid movement, and instant micro-corrections when targets peek.";
        } else if (game === 'CS2') {
            cooldownDescription = rank === 'bronze-gold'
                ? "Load the community map 'Aim Botz'. Practice 100 taps/bursts focusing purely on headshots. Then, play 1 Casual Deathmatch."
                : rank === 'platinum-diamond'
                ? "Load 'Aim Botz'. Practice 250 kills with AK-47, alternating between single taps, 2-bullet bursts, and spray transfers. Play 1 community FFA DM."
                : "Play 2 community FFA Headshot-only Deathmatches. Focus on active counter-strafing, pre-aiming common peeking lanes, and instant target switches.";
        } else if (game === 'Apex Legends') {
            cooldownDescription = rank === 'bronze-gold'
                ? "Go to the Firing Range. Pick up an R-301 or Flatline (no attachments) and practice one-clipping static bots from 15 meters. Repeat for 5 minutes."
                : rank === 'platinum-diamond'
                ? "Go to the Firing Range. Practice sliding, jumping, and one-clipping moving bots with an SMG (R-99/CAR) and a Wingman. Focus on matching tracking speed."
                : "Go to the Firing Range. Turn on aggressive moving bots. Practice tracking and target switching between targets while wall-jumping, sliding, and weapon swapping.";
        } else { // Overwatch 2
            cooldownDescription = rank === 'bronze-gold'
                ? "Join a custom lobby with the code 'VAXTA' (Aim Arena). Practice tracking and landing shots on randomly moving bots for 5 minutes."
                : rank === 'platinum-diamond'
                ? "Join 'VAXTA'. Focus on flicking with Cassidy/Ashe or tracking with Soldier: 76/Tracer on high-mobility bots. Perform active counter-strafing."
                : "Join custom lobby 'VAXTA' or 'BGBXQ'. Practice tracking high-mobility heroes (Genji/Tracer/Pharah) while matching their movement patterns.";
        }

        const cooldownStep: Step = {
            time: "5 Min",
            title: `In-Game Integration (${game} Cooldown)`,
            description: cooldownDescription
        };
        steps.push(cooldownStep);

        setRoutine(steps);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!routine) return;
        let text = `DCPROSENS CUSTOM AIM TRAINING ROUTINE\n`;
        text += `Game: ${game} | Skill Tier: ${rank.replace('-', ' to ').toUpperCase()} | Weakness: ${weakness.toUpperCase()}\n`;
        text += `==============================================\n\n`;

        routine.forEach((step, idx) => {
            text += `Step ${idx + 1}: ${step.title} (${step.time})\n`;
            text += `Description: ${step.description}\n`;
            if (step.aimlabs) {
                text += `  - Aimlabs Scenario: ${step.aimlabs.name}\n`;
                text += `    Instructions: ${step.aimlabs.instructions}\n`;
                text += `    Target Score: ${step.aimlabs.targetScore}\n`;
            }
            if (step.kovaaks) {
                text += `  - KovaaKs Scenario: ${step.kovaaks.name}\n`;
                text += `    Instructions: ${step.kovaaks.instructions}\n`;
                text += `    Target Score: ${step.kovaaks.targetScore}\n`;
            }
            text += `\n`;
        });

        text += `Generate your custom routine online at: https://dcprosens.com/aim-routines`;

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error("Could not copy routine to clipboard", err);
        });
    };

    const downloadTxtFile = () => {
        if (!routine) return;
        let text = `DCPROSENS CUSTOM AIM TRAINING ROUTINE\n`;
        text += `Game: ${game} | Skill Tier: ${rank.replace('-', ' to ').toUpperCase()} | Weakness: ${weakness.toUpperCase()}\n`;
        text += `==============================================\n\n`;

        routine.forEach((step, idx) => {
            text += `Step ${idx + 1}: ${step.title} (${step.time})\n`;
            text += `Description: ${step.description}\n`;
            if (step.aimlabs) {
                text += `  - Aimlabs Scenario: ${step.aimlabs.name}\n`;
                text += `    Instructions: ${step.aimlabs.instructions}\n`;
                text += `    Target Score: ${step.aimlabs.targetScore}\n`;
            }
            if (step.kovaaks) {
                text += `  - KovaaKs Scenario: ${step.kovaaks.name}\n`;
                text += `    Instructions: ${step.kovaaks.instructions}\n`;
                text += `    Target Score: ${step.kovaaks.targetScore}\n`;
            }
            text += `\n`;
        });

        text += `Generate your custom routine online at: https://dcprosens.com/aim-routines`;

        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = `dcprosens_aim_routine_${weakness}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Routine Configuration Questionnaire</h3>
            
            {/* Form Fields */}
            <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>1. Select Your Main Game</label>
                    <select
                        className={styles.select}
                        value={game}
                        onChange={(e) => setGame(e.target.value)}
                    >
                        <option value="Valorant">Valorant</option>
                        <option value="CS2">CS2 (Counter-Strike 2)</option>
                        <option value="Apex Legends">Apex Legends</option>
                        <option value="Overwatch 2">Overwatch 2</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>2. Current Competitive Rank</label>
                    <select
                        className={styles.select}
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                    >
                        <option value="bronze-gold">Bronze - Gold / Silver - Gold</option>
                        <option value="platinum-diamond">Platinum - Diamond</option>
                        <option value="master-radiant">Master - Radiant / Apex Predator</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>3. Mechanical Weakness Area</label>
                    <select
                        className={styles.select}
                        value={weakness}
                        onChange={(e) => setWeakness(e.target.value)}
                    >
                        <option value="flicking">Flicking &amp; Snapping (Static Clicking)</option>
                        <option value="micro-adjustments">Micro-adjustments (Small Correction flicks)</option>
                        <option value="tracking">Tracking (Continuous follow-track)</option>
                        <option value="target-switching">Target Switching (Speed switching target-to-target)</option>
                        <option value="crosshair-placement">Crosshair Placement (Prefire &amp; Centering)</option>
                    </select>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    type="button"
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                >
                    Generate Aim Routine
                </button>
            </div>

            {/* Generated Routine Sheet */}
            {routine && (
                <div className={styles.routineSheet}>
                    <div className={styles.sheetHeader}>
                        <div>
                            <div className={styles.sheetTitle}>Your 30-Minute Daily Playlist</div>
                            <div className={styles.sheetSubtitle}>
                                Game: {game} | Tier: {rank.replace('-', ' to ').toUpperCase()} | Focus: {weakness.replace('-', ' ')}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={`${styles.actionBtn} ${copied ? styles.actionBtnActive : ''}`}
                                onClick={copyToClipboard}
                            >
                                {copied ? "Copied!" : "Copy Routine Text"}
                            </button>
                            <button
                                type="button"
                                className={styles.actionBtn}
                                onClick={downloadTxtFile}
                            >
                                Download .txt Routine
                            </button>
                        </div>
                    </div>

                    <div className={styles.timeline}>
                        {routine.map((step, idx) => (
                            <div key={idx} className={styles.timelineStep}>
                                <div className={styles.stepTime}>{step.time}</div>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepTitleText}>
                                        Step {idx + 1}: {step.title}
                                    </div>
                                    <p className={styles.stepDesc}>{step.description}</p>

                                    {/* Show scenarios if available */}
                                    {(step.aimlabs || step.kovaaks) && (
                                        <div className={styles.scenariosGrid}>
                                            {step.aimlabs && (
                                                <div className={styles.scenarioBlock}>
                                                    <span className={`${styles.platformTag} ${styles.aimlabsTag}`}>
                                                        Aimlabs Playlist
                                                    </span>
                                                    <div className={styles.scenarioName}>{step.aimlabs.name}</div>
                                                    <p className={styles.scenarioInst}>{step.aimlabs.instructions}</p>
                                                    <div className={styles.scenarioTarget}>
                                                        Target: {step.aimlabs.targetScore}
                                                    </div>
                                                </div>
                                            )}
                                            {step.kovaaks && (
                                                <div className={styles.scenarioBlock}>
                                                    <span className={`${styles.platformTag} ${styles.kovaaksTag}`}>
                                                        KovaaKs Playlist
                                                    </span>
                                                    <div className={styles.scenarioName}>{step.kovaaks.name}</div>
                                                    <p className={styles.scenarioInst}>{step.kovaaks.instructions}</p>
                                                    <div className={styles.scenarioTarget}>
                                                        Target: {step.kovaaks.targetScore}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
