'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SensitivityTestGame.module.css';

const ROUNDS = 10;
const TARGET_RADIUS = 22;

interface RoundResult {
    timeMs: number;
    precisionPx: number; // distance from the exact target center at the moment of the hit
}

function verdictFor(avgTimeMs: number, avgPrecisionPx: number): { title: string; text: string } {
    if (avgTimeMs < 450 && avgPrecisionPx < 10) {
        return { title: '🎯 Locked In', text: 'Fast and precise — your current sensitivity looks well matched to your aim.' };
    }
    if (avgTimeMs > 750) {
        return { title: '🐢 A Bit Slow', text: 'You are taking a while to reach targets. Try a slightly higher sensitivity, or work on flick speed.' };
    }
    if (avgPrecisionPx > 16) {
        return { title: '🌀 Overshooting', text: 'You are reaching targets fast but missing the center often. Try lowering your sensitivity a little for more control.' };
    }
    return { title: '⚖️ Balanced', text: 'Decent balance of speed and precision. Small tweaks to sensitivity could still help.' };
}

function randomTargetPosition(width: number, height: number) {
    const margin = TARGET_RADIUS * 2;
    return {
        x: margin + Math.random() * (width - margin * 2),
        y: margin + Math.random() * (height - margin * 2),
    };
}

/* ======================================================
   DESKTOP VARIANT — pointer-locked mouse flick test
   ====================================================== */
function DesktopGame({ onFinish }: { onFinish: (results: RoundResult[]) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | undefined>(undefined);
    const crosshairRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const targetSpawnedAtRef = useRef(0);
    const roundRef = useRef(0);
    const resultsRef = useRef<RoundResult[]>([]);
    const [sensitivity, setSensitivity] = useState(1);
    const [isLocked, setIsLocked] = useState(false);
    const [roundDisplay, setRoundDisplay] = useState(0);
    const sensitivityRef = useRef(sensitivity);

    useEffect(() => { sensitivityRef.current = sensitivity; }, [sensitivity]);

    const spawnTarget = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        targetRef.current = randomTargetPosition(canvas.width, canvas.height);
        targetSpawnedAtRef.current = performance.now();
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.fillStyle = '#0a0b0e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Target
        const t = targetRef.current;
        ctx.beginPath();
        ctx.arc(t.x, t.y, TARGET_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 157, 0.15)';
        ctx.fill();
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Crosshair
        const c = crosshairRef.current;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x - 8, c.y); ctx.lineTo(c.x - 3, c.y);
        ctx.moveTo(c.x + 3, c.y); ctx.lineTo(c.x + 8, c.y);
        ctx.moveTo(c.x, c.y - 8); ctx.lineTo(c.x, c.y - 3);
        ctx.moveTo(c.x, c.y + 3); ctx.lineTo(c.x, c.y + 8);
        ctx.stroke();

        // eslint-disable-next-line react-hooks/immutability -- intentional self-referencing rAF loop; `draw` is only invoked async, after this assignment has run
        requestRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            canvas.width = rect.width;
            canvas.height = 420;
            crosshairRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        };
        resize();
        window.addEventListener('resize', resize);
        requestRef.current = requestAnimationFrame(draw);
        return () => {
            window.removeEventListener('resize', resize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [draw]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement !== canvasRef.current) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const c = crosshairRef.current;
            crosshairRef.current = {
                x: Math.max(0, Math.min(canvas.width, c.x + e.movementX * sensitivityRef.current)),
                y: Math.max(0, Math.min(canvas.height, c.y + e.movementY * sensitivityRef.current)),
            };
        };

        const handleClick = () => {
            if (document.pointerLockElement !== canvasRef.current) return;
            const c = crosshairRef.current;
            const t = targetRef.current;
            const dist = Math.hypot(c.x - t.x, c.y - t.y);
            if (dist > TARGET_RADIUS) return; // missed, try again

            const timeMs = performance.now() - targetSpawnedAtRef.current;
            resultsRef.current = [...resultsRef.current, { timeMs, precisionPx: dist }];
            roundRef.current += 1;
            setRoundDisplay(roundRef.current);

            if (roundRef.current >= ROUNDS) {
                document.exitPointerLock();
                onFinish(resultsRef.current);
                return;
            }
            spawnTarget();
        };

        const handlePointerLockChange = () => {
            setIsLocked(document.pointerLockElement === canvasRef.current);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('pointerlockchange', handlePointerLockChange);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
        };
    }, [onFinish, spawnTarget]);

    const start = () => {
        roundRef.current = 0;
        resultsRef.current = [];
        setRoundDisplay(0);
        spawnTarget();
        canvasRef.current?.requestPointerLock();
    };

    return (
        <div className={styles.gameWrap}>
            <div className={styles.hud}>
                <span>Round {roundDisplay}/{ROUNDS}</span>
                <label className={styles.sensLabel}>
                    Sensitivity
                    <input
                        type="range" min={0.2} max={3} step={0.1}
                        value={sensitivity}
                        onChange={(e) => setSensitivity(Number(e.target.value))}
                    />
                    {sensitivity.toFixed(1)}
                </label>
            </div>
            <div className={styles.canvasContainer}>
                <canvas ref={canvasRef} className={styles.canvas} />
                {!isLocked && (
                    <div className={styles.overlay}>
                        <button onClick={start} className={styles.startBtn}>
                            {roundDisplay > 0 ? 'Click to Resume' : 'Click to Start'}
                        </button>
                        <p>Click the canvas to lock your mouse, then hit the {ROUNDS} targets as fast as you can.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ======================================================
   MOBILE VARIANT — direct-tap accuracy test
   ====================================================== */
function MobileGame({ onFinish }: { onFinish: (results: RoundResult[]) => void }) {
    const areaRef = useRef<HTMLDivElement>(null);
    const [round, setRound] = useState(0);
    const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
    const spawnedAtRef = useRef(0);
    const resultsRef = useRef<RoundResult[]>([]);

    const spawnTarget = useCallback(() => {
        const area = areaRef.current;
        if (!area) return;
        const rect = area.getBoundingClientRect();
        setTarget(randomTargetPosition(rect.width, rect.height));
        spawnedAtRef.current = performance.now();
    }, []);

    const start = () => {
        setRound(0);
        resultsRef.current = [];
        spawnTarget();
    };

    const handleTap = (e: React.TouchEvent | React.MouseEvent) => {
        if (!target) return;
        const rect = areaRef.current!.getBoundingClientRect();
        const point = 'touches' in e ? e.changedTouches[0] : e;
        const x = point.clientX - rect.left;
        const y = point.clientY - rect.top;
        const dist = Math.hypot(x - target.x, y - target.y);
        if (dist > TARGET_RADIUS * 1.8) return; // missed, ignore

        const timeMs = performance.now() - spawnedAtRef.current;
        resultsRef.current = [...resultsRef.current, { timeMs, precisionPx: dist }];
        const next = round + 1;
        setRound(next);

        if (next >= ROUNDS) {
            setTarget(null);
            onFinish(resultsRef.current);
            return;
        }
        spawnTarget();
    };

    return (
        <div className={styles.gameWrap}>
            <div className={styles.hud}>
                <span>Round {round}/{ROUNDS}</span>
            </div>
            <div ref={areaRef} className={styles.canvasContainer} style={{ height: 420 }}>
                {target && (
                    <button
                        className={styles.mobileTarget}
                        style={{ left: target.x - TARGET_RADIUS, top: target.y - TARGET_RADIUS }}
                        onTouchStart={handleTap}
                        onClick={handleTap}
                        aria-label="Target"
                    />
                )}
                {!target && (
                    <div className={styles.overlay}>
                        <button onClick={start} className={styles.startBtn}>
                            {round > 0 ? 'Tap to Resume' : 'Tap to Start'}
                        </button>
                        <p>Tap the {ROUNDS} targets as fast and precisely as you can.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ======================================================
   ROOT COMPONENT — picks desktop vs mobile, shows results
   ====================================================== */
export default function SensitivityTestGame() {
    // Detected client-side only, after mount: `window`/touch capability is
    // unavailable at static-export build time, so guessing here would cause
    // a hydration mismatch between the server-built markup and the client.
    const [isTouch, setIsTouch] = useState<boolean | null>(null);
    const [results, setResults] = useState<RoundResult[] | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: only known after mount
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleFinish = (r: RoundResult[]) => setResults(r);
    const playAgain = () => setResults(null);

    if (isTouch === null) {
        return <div className={styles.gameWrap} style={{ minHeight: 420 }} />;
    }

    if (results) {
        const avgTime = results.reduce((sum, r) => sum + r.timeMs, 0) / results.length;
        const avgPrecision = results.reduce((sum, r) => sum + r.precisionPx, 0) / results.length;
        const verdict = verdictFor(avgTime, avgPrecision);

        return (
            <div className={styles.results}>
                <h3>{verdict.title}</h3>
                <p className={styles.verdictText}>{verdict.text}</p>
                <div className={styles.statsRow}>
                    <div className={styles.statBox}>
                        <span className={styles.statValue}>{avgTime.toFixed(0)}ms</span>
                        <span className={styles.statLabel}>Avg. Speed</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statValue}>{avgPrecision.toFixed(1)}px</span>
                        <span className={styles.statLabel}>Avg. Precision</span>
                    </div>
                </div>
                <button onClick={playAgain} className={styles.startBtn}>Play Again</button>
            </div>
        );
    }

    return isTouch ? <MobileGame onFinish={handleFinish} /> : <DesktopGame onFinish={handleFinish} />;
}
