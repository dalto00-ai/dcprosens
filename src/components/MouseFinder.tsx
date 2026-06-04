"use client";

import { useState, useMemo } from 'react';
import { mouseDatabase, MouseSpec } from '@/lib/mouseDatabase';
import styles from './MouseFinder.module.css';

type GripType = 'palm' | 'claw' | 'fingertip';
type ConnPref = 'wireless' | 'wired' | 'nopref';
type WeightPref = 'light' | 'medium' | 'heavy' | 'nopref';
type BudgetPref = 'low' | 'mid' | 'high';

export default function MouseFinder() {
    const [step, setStep] = useState(1);

    // Quiz inputs
    const [handLength, setHandLength] = useState(18.0);
    const [handWidth, setHandWidth] = useState(9.0);
    const [gripStyle, setGripStyle] = useState<GripType>('claw');
    const [connPref, setConnPref] = useState<ConnPref>('wireless');
    const [weightPref, setWeightPref] = useState<WeightPref>('light');
    const [budgetPref, setBudgetPref] = useState<BudgetPref>('high');

    // Matching Algorithm
    const topMatches = useMemo(() => {
        if (step !== 5) return [];

        const scored = mouseDatabase.map(mouse => {
            let score = 0;
            const maxScore = 120; // 30 (len) + 10 (width) + 30 (grip shape) + 10 (grip size) + 20 (conn) + 20 (weight) = 120

            // 1. Hand Length Fit
            // Small hand: length < 17cm -> prefers mouse length < 118mm
            // Medium hand: length 17 - 19.5cm -> prefers mouse length 118 - 125mm
            // Large hand: length > 19.5cm -> prefers mouse length > 125mm
            if (handLength < 17) {
                if (mouse.length < 118) score += 30;
                else if (mouse.length <= 125) score += 15;
            } else if (handLength >= 17 && handLength <= 19.5) {
                if (mouse.length >= 118 && mouse.length <= 125) score += 30;
                else score += 15;
            } else {
                if (mouse.length > 125) score += 30;
                else if (mouse.length >= 118) score += 15;
            }

            // Hand Width Fit
            // Narrow (<8.5cm) -> prefers narrower mouse (<60mm)
            // Medium (8.5-10cm) -> prefers mouse width 60-64mm
            // Wide (>10cm) -> prefers wider mouse (>64mm)
            if (handWidth < 8.5) {
                if (mouse.width < 60) score += 10;
                else if (mouse.width <= 64) score += 5;
            } else if (handWidth >= 8.5 && handWidth <= 10.0) {
                if (mouse.width >= 60 && mouse.width <= 65) score += 10;
                else score += 5;
            } else {
                if (mouse.width > 64) score += 10;
                else if (mouse.width >= 60) score += 5;
            }

            // 2. Grip Style Matching
            if (gripStyle === 'palm') {
                // Palm prefers Ergonomic Right/Left
                if (mouse.shape === 'Ergonomic Right' || mouse.shape === 'Ergonomic Left') score += 30;
                else score += 10;
                // Prefers larger mice
                if (mouse.length >= 120) score += 10;
            } else if (gripStyle === 'claw') {
                // Claw prefers Symmetrical, Ergonomic Right is also good
                if (mouse.shape === 'Symmetrical') score += 30;
                else if (mouse.shape === 'Ergonomic Right') score += 25;
                // Prefers medium size
                if (mouse.length >= 118 && mouse.length <= 126) score += 10;
                else score += 5;
            } else if (gripStyle === 'fingertip') {
                // Fingertip prefers Symmetrical
                if (mouse.shape === 'Symmetrical') score += 30;
                else score += 5;
                // Prefers small mice
                if (mouse.length < 120) score += 10;
            }

            // 3. Connectivity Matching
            if (connPref === 'wireless') {
                if (mouse.connectivity === 'Wireless' || mouse.connectivity === 'Both') score += 20;
            } else if (connPref === 'wired') {
                if (mouse.connectivity === 'Wired' || mouse.connectivity === 'Both') score += 20;
            } else {
                score += 20; // No preference
            }

            // 4. Weight Matching
            // Ultra-Light <65g, Medium 65g-80g, Heavy >80g
            if (weightPref === 'light') {
                if (mouse.weight < 65) score += 20;
                else if (mouse.weight <= 80) score += 10;
            } else if (weightPref === 'medium') {
                if (mouse.weight >= 65 && mouse.weight <= 80) score += 20;
                else score += 10;
            } else if (weightPref === 'heavy') {
                if (mouse.weight > 80) score += 20;
                else if (mouse.weight >= 65) score += 10;
            } else {
                score += 20; // No preference
            }

            // 5. Budget Penalty
            // Under $80, $80-$130, Unlimited
            const priceVal = parseInt(mouse.price.replace('$', '')) || 100;
            let budgetPenalty = 0;
            if (budgetPref === 'low') {
                if (priceVal <= 80) score += 20;
                else if (priceVal <= 130) budgetPenalty = 15;
                else budgetPenalty = 45; // heavy penalty for over $130
            } else if (budgetPref === 'mid') {
                if (priceVal <= 130) score += 20;
                else budgetPenalty = 25;
            } else {
                score += 20;
            }

            const finalPercent = Math.min(100, Math.max(0, Math.round(((score - budgetPenalty) / maxScore) * 100)));

            return {
                ...mouse,
                matchPercentage: finalPercent
            };
        });

        // Sort: Match percentage desc, then proScore desc
        return scored
            .sort((a, b) => {
                if (b.matchPercentage !== a.matchPercentage) {
                    return b.matchPercentage - a.matchPercentage;
                }
                return b.proScore - a.proScore;
            })
            .slice(0, 3);
    }, [step, handLength, handWidth, gripStyle, connPref, weightPref, budgetPref]);

    const getExplanation = (mouse: MouseSpec) => {
        const sizeCat = handLength < 17 ? 'small' : handLength <= 19.5 ? 'medium' : 'large';
        const shapeText = mouse.shape === 'Symmetrical' ? 'symmetrical shape' : 'ergonomic right-handed shape';
        let gripMatch = '';
        if (gripStyle === 'palm') gripMatch = 'fully supports your palm resting posture';
        else if (gripStyle === 'claw') gripMatch = 'anchors your palm contact points for claw clicks';
        else gripMatch = 'leaves maximum under-palm clearance for fingertip adjustments';

        return `This ${mouse.weight}g ${shapeText} perfectly matches your ${sizeCat} hand size and ${gripMatch}.`;
    };

    const handleRestart = () => {
        setStep(1);
    };

    return (
        <div className={styles.wrapper}>
            {/* PROGRESS BAR */}
            {step <= 4 && (
                <div className={styles.progressContainer}>
                    <div className={styles.stepsText}>Step {step} of 4</div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }} />
                    </div>
                </div>
            )}

            {/* STEP 1: HAND SIZE */}
            {step === 1 && (
                <div className={styles.quizCard}>
                    <div className={styles.quizHeader}>
                        <h2 className={styles.stepTitle}>📏 Step 1: Hand Size</h2>
                        <p className={styles.stepSubtitle}>
                            Measure from the base of your palm to the tip of your middle finger (Length), and across your knuckles excluding your thumb (Width).
                        </p>
                    </div>

                    <div className={styles.stepContentGrid}>
                        {/* SLIDERS */}
                        <div className={styles.slidersCol}>
                            <div className={styles.sliderGroup}>
                                <div className={styles.sliderLabelRow}>
                                    <label htmlFor="hand-length-slider" className={styles.sliderLabel}>Hand Length</label>
                                    <strong className={styles.sliderVal}>{handLength.toFixed(1)} cm</strong>
                                </div>
                                <input
                                    id="hand-length-slider"
                                    type="range"
                                    min="12.0"
                                    max="22.0"
                                    step="0.5"
                                    value={handLength}
                                    onChange={(e) => setHandLength(parseFloat(e.target.value))}
                                    className={styles.rangeInput}
                                />
                                <div className={styles.sliderTicks}>
                                    <span>12cm (Small)</span>
                                    <span>17cm</span>
                                    <span>22cm (Large)</span>
                                </div>
                            </div>

                            <div className={styles.sliderGroup} style={{ marginTop: '2rem' }}>
                                <div className={styles.sliderLabelRow}>
                                    <label htmlFor="hand-width-slider" className={styles.sliderLabel}>Hand Width</label>
                                    <strong className={styles.sliderVal}>{handWidth.toFixed(1)} cm</strong>
                                </div>
                                <input
                                    id="hand-width-slider"
                                    type="range"
                                    min="6.0"
                                    max="12.0"
                                    step="0.5"
                                    value={handWidth}
                                    onChange={(e) => setHandWidth(parseFloat(e.target.value))}
                                    className={styles.rangeInput}
                                />
                                <div className={styles.sliderTicks}>
                                    <span>6cm (Narrow)</span>
                                    <span>9cm</span>
                                    <span>12cm (Wide)</span>
                                </div>
                            </div>
                        </div>

                        {/* HAND DIAGRAM SVG */}
                        <div className={styles.diagramCol}>
                            <svg className={styles.handSvg} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Hand drawing */}
                                <path d="M60 180 C60 150, 45 130, 40 100 C37 80, 45 60, 50 40 C52 35, 58 35, 60 40 C65 60, 68 80, 70 95 C71 70, 75 40, 80 15 C82 10, 88 10, 90 15 C95 45, 96 70, 96 90 C98 65, 103 35, 108 20 C110 15, 116 15, 118 20 C122 50, 122 75, 120 95 C122 75, 129 50, 134 35 C136 30, 142 32, 143 37 C147 65, 148 95, 145 115 C142 135, 155 140, 160 150 C165 160, 160 180, 140 180 Z" stroke="var(--border-color)" strokeWidth="3" fill="rgba(255,255,255,0.02)" />
                                
                                {/* Length Indicator (Base of palm to middle finger tip) */}
                                <line x1="85" y1="15" x2="85" y2="180" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
                                <polygon points="85,15 81,25 89,25" fill="var(--primary)" />
                                <polygon points="85,180 81,170 89,170" fill="var(--primary)" />
                                <text x="65" y="105" fill="var(--primary)" fontWeight="800" fontSize="10">Length</text>

                                {/* Width Indicator (Across Knuckles) */}
                                <line x1="42" y1="95" x2="146" y2="95" stroke="var(--secondary)" strokeWidth="2" strokeDasharray="4 4" />
                                <polygon points="42,95 52,91 52,99" fill="var(--secondary)" />
                                <polygon points="146,95 136,91 136,99" fill="var(--secondary)" />
                                <text x="80" y="87" fill="var(--secondary)" fontWeight="800" fontSize="10">Width</text>
                            </svg>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.nextBtn} onClick={() => setStep(2)}>Next Step →</button>
                    </div>
                </div>
            )}

            {/* STEP 2: GRIP STYLE */}
            {step === 2 && (
                <div className={styles.quizCard}>
                    <div className={styles.quizHeader}>
                        <h2 className={styles.stepTitle}>✊ Step 2: Grip Style</h2>
                        <p className={styles.stepSubtitle}>
                            Select the grip style that you naturally use when holding a mouse during tense gaming moments.
                        </p>
                    </div>

                    <div className={styles.gripGrid}>
                        {/* PALM */}
                        <div 
                            className={`${styles.gripCard} ${gripStyle === 'palm' ? styles.gripCardSelected : ''}`}
                            onClick={() => setGripStyle('palm')}
                        >
                            <div className={styles.gripIconWrapper}>
                                <svg className={styles.gripSvg} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                    {/* Mouse */}
                                    <rect x="25" y="10" width="50" height="80" rx="25" stroke="var(--border-color)" fill="none" />
                                    <line x1="50" y1="10" x2="50" y2="40" stroke="var(--border-color)" />
                                    {/* Hand flat overlay */}
                                    <path d="M32 90 C32 60, 25 45, 30 35 C35 32, 45 40, 48 30 C51 28, 54 28, 55 30 C58 40, 62 35, 68 35 C70 35, 75 42, 72 50 C70 65, 70 80, 68 90 Z" fill="rgba(0, 255, 157, 0.2)" stroke="var(--primary)" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className={styles.gripName}>Palm Grip</h3>
                            <p className={styles.gripDesc}>Your entire hand rests flat on the mouse shell. Best for smooth, stable tracking and low-fatigue play.</p>
                            <div className={styles.gripProsCons}>
                                <div><span className={styles.plus}>+</span> Maximum stability</div>
                                <div><span className={styles.minus}>-</span> Limited vertical finger speed</div>
                            </div>
                        </div>

                        {/* CLAW */}
                        <div 
                            className={`${styles.gripCard} ${gripStyle === 'claw' ? styles.gripCardSelected : ''}`}
                            onClick={() => setGripStyle('claw')}
                        >
                            <div className={styles.gripIconWrapper}>
                                <svg className={styles.gripSvg} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                    {/* Mouse */}
                                    <rect x="25" y="10" width="50" height="80" rx="25" stroke="var(--border-color)" fill="none" />
                                    <line x1="50" y1="10" x2="50" y2="40" stroke="var(--border-color)" />
                                    {/* Hand Claw (back palm rests on hump, fingers arched) */}
                                    <path d="M35 90 C35 70, 32 65, 30 55" stroke="var(--secondary)" strokeWidth="2" />
                                    <path d="M65 90 C65 70, 68 65, 70 55" stroke="var(--secondary)" strokeWidth="2" />
                                    {/* Arched fingers contact buttons */}
                                    <circle cx="40" cy="25" r="4" fill="var(--secondary)" />
                                    <circle cx="60" cy="25" r="4" fill="var(--secondary)" />
                                    <path d="M35 90 C40 85, 60 85, 65 90 Z" fill="rgba(112, 0, 255, 0.2)" stroke="var(--secondary)" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className={styles.gripName}>Claw Grip</h3>
                            <p className={styles.gripDesc}>Palm contacts the back hump while fingers arch tightly onto the buttons. Excellent for recoil control and fast flicks.</p>
                            <div className={styles.gripProsCons}>
                                <div><span className={styles.plus}>+</span> Snappy clicks &amp; target changes</div>
                                <div><span className={styles.minus}>-</span> Can feel fatiguing initially</div>
                            </div>
                        </div>

                        {/* FINGERTIP */}
                        <div 
                            className={`${styles.gripCard} ${gripStyle === 'fingertip' ? styles.gripCardSelected : ''}`}
                            onClick={() => setGripStyle('fingertip')}
                        >
                            <div className={styles.gripIconWrapper}>
                                <svg className={styles.gripSvg} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                    {/* Mouse */}
                                    <rect x="25" y="10" width="50" height="80" rx="25" stroke="var(--border-color)" fill="none" />
                                    <line x1="50" y1="10" x2="50" y2="40" stroke="var(--border-color)" />
                                    {/* Fingertips only, palm far back */}
                                    <circle cx="28" cy="55" r="4" fill="var(--primary)" />
                                    <circle cx="72" cy="55" r="4" fill="var(--primary)" />
                                    <circle cx="40" cy="20" r="4" fill="var(--primary)" />
                                    <circle cx="60" cy="20" r="4" fill="var(--primary)" />
                                </svg>
                            </div>
                            <h3 className={styles.gripName}>Fingertip Grip</h3>
                            <p className={styles.gripDesc}>Palm is completely elevated off the mouse. Only the tips of your fingers guide it. Ideal for micro-adjustments and fast flicks.</p>
                            <div className={styles.gripProsCons}>
                                <div><span className={styles.plus}>+</span> Maximum vertical movement range</div>
                                <div><span className={styles.minus}>-</span> Least stable tracking style</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                        <button className={styles.nextBtn} onClick={() => setStep(3)}>Next Step →</button>
                    </div>
                </div>
            )}

            {/* STEP 3: PREFERENCES */}
            {step === 3 && (
                <div className={styles.quizCard}>
                    <div className={styles.quizHeader}>
                        <h2 className={styles.stepTitle}>📡 Step 3: Preferences</h2>
                        <p className={styles.stepSubtitle}>
                            Select your preferences regarding mouse connectivity and physical weight.
                        </p>
                    </div>

                    <div className={styles.prefsWrapper}>
                        {/* CONNECTIVITY */}
                        <div className={styles.prefGroup}>
                            <h3 className={styles.prefTitle}>Connectivity Preference</h3>
                            <div className={styles.optionsRow}>
                                {[
                                    { id: 'wireless', label: '📡 Wireless', desc: 'Cordless convenience' },
                                    { id: 'wired', label: '🔌 Wired', desc: 'No charging, cheaper' },
                                    { id: 'nopref', label: '⚖️ No Preference', desc: 'Show both options' }
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`${styles.prefButton} ${connPref === opt.id ? styles.prefButtonActive : ''}`}
                                        onClick={() => setConnPref(opt.id as ConnPref)}
                                    >
                                        <div className={styles.prefBtnLabel}>{opt.label}</div>
                                        <div className={styles.prefBtnDesc}>{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* WEIGHT */}
                        <div className={styles.prefGroup} style={{ marginTop: '2.5rem' }}>
                            <h3 className={styles.prefTitle}>Weight Category Preference</h3>
                            <div className={styles.optionsRow}>
                                {[
                                    { id: 'light', label: '⚡ Ultra-Light (<65g)', desc: 'Fastest flicks & micro-aim' },
                                    { id: 'medium', label: '🎯 Medium (65g-80g)', desc: 'Balanced stability & speed' },
                                    { id: 'heavy', label: '⚓ Heavy (>80g)', desc: 'Full physical control feel' },
                                    { id: 'nopref', label: '⚖️ No Preference', desc: 'Any weight range' }
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`${styles.prefButton} ${weightPref === opt.id ? styles.prefButtonActive : ''}`}
                                        onClick={() => setWeightPref(opt.id as WeightPref)}
                                    >
                                        <div className={styles.prefBtnLabel}>{opt.label}</div>
                                        <div className={styles.prefBtnDesc}>{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                        <button className={styles.nextBtn} onClick={() => setStep(4)}>Next Step →</button>
                    </div>
                </div>
            )}

            {/* STEP 4: BUDGET */}
            {step === 4 && (
                <div className={styles.quizCard}>
                    <div className={styles.quizHeader}>
                        <h2 className={styles.stepTitle}>💰 Step 4: Budget Range</h2>
                        <p className={styles.stepSubtitle}>
                            Select your budget limit. We will prioritize options that match your spending preference.
                        </p>
                    </div>

                    <div className={styles.budgetWrapper}>
                        <div className={styles.optionsRow}>
                            {[
                                { id: 'low', label: '💸 Under $80', desc: 'Best value / Budget picks' },
                                { id: 'mid', label: '🎮 $80 - $130', desc: 'Premium competitive grade' },
                                { id: 'high', label: '👑 Unlimited / Best of Best', desc: 'Flagship esports gear' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    className={`${styles.prefButton} ${budgetPref === opt.id ? styles.prefButtonActive : ''}`}
                                    onClick={() => setBudgetPref(opt.id as BudgetPref)}
                                    style={{ padding: '1.5rem' }}
                                >
                                    <div className={styles.prefBtnLabel} style={{ fontSize: '1.1rem' }}>{opt.label}</div>
                                    <div className={styles.prefBtnDesc} style={{ marginTop: '0.4rem' }}>{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.backBtn} onClick={() => setStep(3)}>← Back</button>
                        <button className={styles.nextBtn} style={{ background: 'var(--primary)', color: '#000' }} onClick={() => setStep(5)}>Find My Matches! 🎯</button>
                    </div>
                </div>
            )}

            {/* STEP 5: RESULTS */}
            {step === 5 && (
                <div className={styles.resultsContainer}>
                    <div className={styles.resultsHeader}>
                        <span className={styles.resultsEmoji}>🏆</span>
                        <h2 className={styles.resultsTitle}>Your Top Gaming Mice Matches</h2>
                        <p className={styles.resultsSubtitle}>
                            We analyzed {mouseDatabase.length} flagship mice based on your hand measurements ({handLength}cm × {handWidth}cm), {gripStyle} grip style, and preferred specifications. Here are your top 3 matches:
                        </p>
                    </div>

                    <div className={styles.resultsGrid}>
                        {topMatches.map((mouse, index) => (
                            <div key={mouse.id} className={styles.resultCard}>
                                {/* Rank indicator */}
                                <div className={styles.rankBadge}>#{index + 1} MATCH</div>

                                {/* Match percentage circular badge */}
                                <div className={styles.matchPercentRow}>
                                    <div className={styles.progressRing}>
                                        <svg viewBox="0 0 36 36" className={styles.ringSvg}>
                                            <path
                                                className={styles.ringBg}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className={styles.ringFill}
                                                strokeDasharray={`${mouse.matchPercentage}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className={styles.ringText}>{mouse.matchPercentage}%</text>
                                        </svg>
                                    </div>
                                    <div className={styles.brandMeta}>
                                        <span className={styles.resultBrand}>{mouse.brand}</span>
                                        <h3 className={styles.resultName}>{mouse.name}</h3>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className={styles.badgeRow}>
                                    {mouse.badge && <span className={styles.resultBadge}>{mouse.badge}</span>}
                                    <span className={styles.connBadge} style={{ color: mouse.connectivity === 'Wireless' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                                        {mouse.connectivity === 'Wireless' ? '📡 Wireless' : '🔌 Wired'}
                                    </span>
                                </div>

                                {/* Dynamic explanation */}
                                <p className={styles.matchingExplanation}>
                                    {getExplanation(mouse)}
                                </p>

                                {/* Specs Box */}
                                <div className={styles.specsBox}>
                                    <div className={styles.specRow}>
                                        <span>Weight:</span>
                                        <strong>{mouse.weight} grams</strong>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span>Shape:</span>
                                        <strong>{mouse.shape}</strong>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span>Dimensions:</span>
                                        <strong>{mouse.length} × {mouse.width} × {mouse.height} mm</strong>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span>Sensor:</span>
                                        <strong>{mouse.sensor}</strong>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span>Polling Rate:</span>
                                        <strong>{mouse.pollingRate}</strong>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span>Approx Price:</span>
                                        <strong style={{ color: 'var(--primary)' }}>{mouse.price}</strong>
                                    </div>
                                </div>

                                {/* Pro Usage */}
                                {mouse.proUsage.length > 0 && (
                                    <div className={styles.prosBox}>
                                        <span className={styles.prosLabel}>👤 Used by FPS Pros:</span>
                                        <div className={styles.proTagsRow}>
                                            {mouse.proUsage.map(p => (
                                                <span key={p} className={styles.proTag}>{p}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Buy Button */}
                                <div className={styles.cardActionsRow}>
                                    <a
                                        href={mouse.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        className={styles.amazonBuyBtn}
                                    >
                                        Check Price on Amazon 🛍️
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.resultsRestartRow}>
                        <button className={styles.restartBtn} onClick={handleRestart}>🔄 Retake Quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
}
