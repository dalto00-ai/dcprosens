"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './AimTrainer.module.css';

interface Target {
    id: number;
    x: number;
    y: number;
    r: number;
    spawnTime: number;
}

interface TrackingTarget {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
}

interface ReflexTarget {
    x: number;
    y: number;
    r: number;
    maxRadius: number;
    spawnTime: number;
    duration: number; // ms
}

interface GameStats {
    score: number;
    hits: number;
    totalClicks: number;
    timeLeft: number;
    accuracy: number;
    kps: number;
    avgReaction: number;
}

const DEFAULT_STATS: GameStats = {
    score: 0,
    hits: 0,
    totalClicks: 0,
    timeLeft: 30,
    accuracy: 0,
    kps: 0,
    avgReaction: 0,
};

export default function AimTrainer() {
    // Config states
    const [dpi, setDpi] = useState<number>(800);
    const [sensitivity, setSensitivity] = useState<number>(0.35);
    const [game, setGame] = useState<'valorant' | 'cs2' | 'apex'>('valorant');
    const [gameMode, setGameMode] = useState<'gridshot' | 'tracking' | 'reflex'>('gridshot');

    // Game loop & control states
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [uiStats, setUiStats] = useState<GameStats>(DEFAULT_STATS);
    const [gameOver, setGameOver] = useState<boolean>(false);

    // Canvas references
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);

    // Keep all game loop values in refs to avoid React state lag & closures
    const isPlayingRef = useRef<boolean>(false);
    const timeLeftRef = useRef<number>(30);
    const gameModeRef = useRef<'gridshot' | 'tracking' | 'reflex'>('gridshot');
    const gameRef = useRef<'valorant' | 'cs2' | 'apex'>('valorant');
    const sensitivityRef = useRef<number>(0.35);
    
    // Crosshair coordinates
    const crosshairRef = useRef<{ x: number; y: number }>({ x: 400, y: 250 });

    // Mode-specific targets in refs
    const targetsRef = useRef<Target[]>([]);
    const trackingTargetRef = useRef<TrackingTarget | null>(null);
    const reflexTargetRef = useRef<ReflexTarget | null>(null);

    // Stats refs
    const scoreRef = useRef<number>(0);
    const hitsRef = useRef<number>(0);
    const totalClicksRef = useRef<number>(0);
    const reactionTimesRef = useRef<number[]>([]);
    const totalTrackingFramesRef = useRef<number>(0);
    const hoverTrackingFramesRef = useRef<number>(0);

    // Time keeping
    const gameStartTimeRef = useRef<number>(0);
    const frameCountRef = useRef<number>(0);

    // Sync refs back to react state inputs
    useEffect(() => {
        gameModeRef.current = gameMode;
    }, [gameMode]);

    useEffect(() => {
        gameRef.current = game;
    }, [game]);

    useEffect(() => {
        sensitivityRef.current = sensitivity;
    }, [sensitivity]);

    // Synthesized Web Audio API Sound Effects
    const playSound = useCallback((type: 'hit' | 'miss' | 'track') => {
        if (typeof window === 'undefined') return;
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) return;
            const ctx = new AudioContextClass();
            
            if (type === 'hit') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(580, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
                
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === 'miss') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(140, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.1);
                
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } else if (type === 'track') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                
                gain.gain.setValueAtTime(0.02, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.04);
            }
        } catch (e) {
            console.error('AudioContext failed to trigger:', e);
        }
    }, []);

    // Target Generator Functions
    const spawnGridshotTarget = useCallback((): Target => {
        const padding = 60;
        const w = 800;
        const h = 500;
        return {
            id: Math.random(),
            x: padding + Math.random() * (w - padding * 2),
            y: padding + Math.random() * (h - padding * 2),
            r: 25,
            spawnTime: performance.now(),
        };
    }, []);

    const spawnTrackingTarget = useCallback((): TrackingTarget => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 3;
        return {
            x: 400,
            y: 250,
            r: 24,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
        };
    }, []);

    const spawnReflexTarget = useCallback((): ReflexTarget => {
        const padding = 70;
        const w = 800;
        const h = 500;
        return {
            x: padding + Math.random() * (w - padding * 2),
            y: padding + Math.random() * (h - padding * 2),
            r: 0,
            maxRadius: 28,
            spawnTime: performance.now(),
            duration: 1000 + Math.random() * 400, // 1000ms to 1400ms target lifespan
        };
    }, []);

    // Calculate dynamic stats
    const calculateAccuracy = useCallback(() => {
        if (gameModeRef.current === 'tracking') {
            if (totalTrackingFramesRef.current === 0) return 0;
            return Math.round((hoverTrackingFramesRef.current / totalTrackingFramesRef.current) * 100);
        } else {
            if (totalClicksRef.current === 0) return 0;
            return Math.round((hitsRef.current / totalClicksRef.current) * 100);
        }
    }, []);

    const calculateKps = useCallback(() => {
        const elapsed = 30 - timeLeftRef.current;
        if (elapsed <= 0.5) return 0;
        return parseFloat((hitsRef.current / elapsed).toFixed(2));
    }, []);

    const calculateAvgReaction = useCallback(() => {
        const times = reactionTimesRef.current;
        if (times.length === 0) return 0;
        const sum = times.reduce((a, b) => a + b, 0);
        return Math.round(sum / times.length);
    }, []);

    // Game loop renderer
    const draw = useCallback((timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear and draw background grid
        ctx.fillStyle = '#0a0b0e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grids
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        if (isPlayingRef.current) {
            frameCountRef.current++;

            // Handle timer countdown
            const elapsed = (timestamp - gameStartTimeRef.current) / 1000;
            const remaining = Math.max(0, 30 - elapsed);
            timeLeftRef.current = remaining;

            if (remaining <= 0) {
                // Game over sequence
                isPlayingRef.current = false;
                setIsPlaying(false);
                setGameOver(true);
                if (document.pointerLockElement === canvas) {
                    document.exitPointerLock();
                }
            }

            // --- MODE 1: Gridshot ---
            if (gameModeRef.current === 'gridshot') {
                targetsRef.current.forEach((t) => {
                    ctx.save();
                    const grad = ctx.createRadialGradient(
                        t.x - t.r * 0.35, t.y - t.r * 0.35, t.r * 0.05,
                        t.x, t.y, t.r
                    );
                    grad.addColorStop(0, '#FFFFFF');
                    grad.addColorStop(0.3, '#A855F7'); // purple
                    grad.addColorStop(1, '#3B0764');
                    ctx.fillStyle = grad;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });
            }

            // --- MODE 2: Tracking ---
            if (gameModeRef.current === 'tracking') {
                const t = trackingTargetRef.current;
                if (t) {
                    // Update movement physics
                    t.x += t.vx;
                    t.y += t.vy;

                    // Wall bounce logic
                    if (t.x - t.r < 15 || t.x + t.r > canvas.width - 15) {
                        t.vx *= -1;
                        t.x = Math.max(t.r + 15, Math.min(canvas.width - t.r - 15, t.x));
                    }
                    if (t.y - t.r < 15 || t.y + t.r > canvas.height - 15) {
                        t.vy *= -1;
                        t.y = Math.max(t.r + 15, Math.min(canvas.height - t.r - 15, t.y));
                    }

                    // Random direction adjustments (1.5% chance per frame)
                    if (Math.random() < 0.015) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 4 + Math.random() * 3.5;
                        t.vx = Math.cos(angle) * speed;
                        t.vy = Math.sin(angle) * speed;
                    }

                    // Hover checking
                    const cx = crosshairRef.current.x;
                    const cy = crosshairRef.current.y;
                    const dist = Math.sqrt((t.x - cx) ** 2 + (t.y - cy) ** 2);
                    const isHovered = dist <= t.r;

                    totalTrackingFramesRef.current++;
                    if (isHovered) {
                        hoverTrackingFramesRef.current++;
                        scoreRef.current += 4;
                        hitsRef.current = Math.floor(hoverTrackingFramesRef.current / 3); // Emulate hit count
                        if (totalTrackingFramesRef.current % 10 === 0) {
                            playSound('track');
                        }
                    }

                    // Render target
                    ctx.save();
                    const grad = ctx.createRadialGradient(
                        t.x - t.r * 0.35, t.y - t.r * 0.35, t.r * 0.05,
                        t.x, t.y, t.r
                    );
                    grad.addColorStop(0, '#FFFFFF');
                    if (isHovered) {
                        grad.addColorStop(0.3, '#00FF9D'); // neon green
                        grad.addColorStop(1, '#022C22');
                        ctx.shadowColor = 'rgba(0, 255, 157, 0.6)';
                    } else {
                        grad.addColorStop(0.3, '#A855F7'); // purple
                        grad.addColorStop(1, '#3B0764');
                        ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
                    }
                    ctx.shadowBlur = 18;
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                    ctx.fill();

                    if (isHovered) {
                        ctx.strokeStyle = '#00FF9D';
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.arc(t.x, t.y, t.r + 6, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }

            // --- MODE 3: Reflex ---
            if (gameModeRef.current === 'reflex') {
                let t = reflexTargetRef.current;
                if (t) {
                    const elapsedMs = performance.now() - t.spawnTime;
                    if (elapsedMs > t.duration) {
                        // Target expired / missed
                        totalClicksRef.current++;
                        playSound('miss');
                        reflexTargetRef.current = spawnReflexTarget();
                        t = reflexTargetRef.current;
                    } else {
                        // Calculate grow & fade scale (sine envelope)
                        const scale = Math.sin((elapsedMs / t.duration) * Math.PI);
                        t.r = t.maxRadius * scale;
                    }
                }

                if (t && t.r > 1) {
                    ctx.save();
                    const grad = ctx.createRadialGradient(
                        t.x - t.r * 0.35, t.y - t.r * 0.35, t.r * 0.05,
                        t.x, t.y, t.r
                    );
                    grad.addColorStop(0, '#FFFFFF');
                    grad.addColorStop(0.35, '#EF4444'); // Bright Red
                    grad.addColorStop(1, '#7F1D1D');
                    ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            // --- Draw custom crosshair ---
            const cx = crosshairRef.current.x;
            const cy = crosshairRef.current.y;
            ctx.save();
            ctx.strokeStyle = '#00FF9D'; // Neon green
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Horizontal lines
            ctx.moveTo(cx - 7, cy);
            ctx.lineTo(cx - 2, cy);
            ctx.moveTo(cx + 2, cy);
            ctx.lineTo(cx + 7, cy);
            // Vertical lines
            ctx.moveTo(cx, cy - 7);
            ctx.lineTo(cx, cy - 2);
            ctx.moveTo(cx, cy + 2);
            ctx.lineTo(cx, cy + 7);
            ctx.stroke();

            // Tiny dot in the middle
            ctx.fillStyle = '#00FF9D';
            ctx.beginPath();
            ctx.arc(cx, cy, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Throttle UI state updates to every 6 frames (~100ms) for speed
            if (frameCountRef.current % 6 === 0) {
                setUiStats({
                    score: scoreRef.current,
                    hits: hitsRef.current,
                    totalClicks: totalClicksRef.current,
                    timeLeft: Math.ceil(timeLeftRef.current),
                    accuracy: calculateAccuracy(),
                    kps: calculateKps(),
                    avgReaction: calculateAvgReaction(),
                });
            }
        } else {
            // Draw static crosshair in the center of canvas when paused
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 255, 157, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx - 7, cy);
            ctx.lineTo(cx - 2, cy);
            ctx.moveTo(cx + 2, cy);
            ctx.lineTo(cx + 7, cy);
            ctx.moveTo(cx, cy - 7);
            ctx.lineTo(cx, cy - 2);
            ctx.moveTo(cx, cy + 2);
            ctx.lineTo(cx, cy + 7);
            ctx.stroke();
            ctx.restore();
        }

        // Loop next animation frame
        requestRef.current = requestAnimationFrame(draw);
    }, [playSound, spawnGridshotTarget, spawnReflexTarget, calculateAccuracy, calculateKps, calculateAvgReaction]);

    // Handle mouse move (raw movement when pointer locked)
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (document.pointerLockElement !== canvasRef.current) return;
        if (!isPlayingRef.current) return;

        const yaw = gameRef.current === 'valorant' ? 0.07 : 0.022;
        // Game sensitivity multiplier
        // Scale delta using yaw factors and scaling multiplier to match 2D space
        const factor = (yaw / 0.022) * 1.55;
        const sens = sensitivityRef.current;

        let newX = crosshairRef.current.x + e.movementX * sens * factor;
        let newY = crosshairRef.current.y + e.movementY * sens * factor;

        const canvas = canvasRef.current;
        if (canvas) {
            newX = Math.max(0, Math.min(canvas.width, newX));
            newY = Math.max(0, Math.min(canvas.height, newY));
        }

        crosshairRef.current = { x: newX, y: newY };
    }, []);

    // Handle clicks inside pointer lock
    const handleMouseDown = useCallback(() => {
        if (document.pointerLockElement !== canvasRef.current) return;
        if (!isPlayingRef.current || timeLeftRef.current <= 0) return;

        const mode = gameModeRef.current;
        const cx = crosshairRef.current.x;
        const cy = crosshairRef.current.y;

        if (mode === 'gridshot') {
            totalClicksRef.current++;
            let hit = false;
            const currentTargets = [...targetsRef.current];

            for (let i = 0; i < currentTargets.length; i++) {
                const t = currentTargets[i];
                const dist = Math.sqrt((t.x - cx) ** 2 + (t.y - cy) ** 2);
                if (dist <= t.r) {
                    hit = true;
                    const reaction = performance.now() - t.spawnTime;
                    reactionTimesRef.current.push(reaction);
                    scoreRef.current += 1;
                    hitsRef.current += 1;
                    currentTargets[i] = spawnGridshotTarget();
                    break;
                }
            }

            targetsRef.current = currentTargets;
            if (hit) {
                playSound('hit');
            } else {
                playSound('miss');
            }
        } else if (mode === 'reflex') {
            totalClicksRef.current++;
            let hit = false;
            const t = reflexTargetRef.current;

            if (t && t.r > 2) {
                const dist = Math.sqrt((t.x - cx) ** 2 + (t.y - cy) ** 2);
                if (dist <= t.r) {
                    hit = true;
                    const reaction = performance.now() - t.spawnTime;
                    reactionTimesRef.current.push(reaction);
                    scoreRef.current += 1;
                    hitsRef.current += 1;
                    reflexTargetRef.current = spawnReflexTarget();
                }
            }

            if (hit) {
                playSound('hit');
            } else {
                playSound('miss');
            }
        }
    }, [playSound, spawnGridshotTarget, spawnReflexTarget]);

    // Initializer to start/restart
    const startGame = useCallback(() => {
        // Reset states
        scoreRef.current = 0;
        hitsRef.current = 0;
        totalClicksRef.current = 0;
        reactionTimesRef.current = [];
        totalTrackingFramesRef.current = 0;
        hoverTrackingFramesRef.current = 0;
        timeLeftRef.current = 30;
        frameCountRef.current = 0;

        // Reset crosshair position
        crosshairRef.current = { x: 400, y: 250 };

        // Generate targets
        if (gameMode === 'gridshot') {
            targetsRef.current = [
                spawnGridshotTarget(),
                spawnGridshotTarget(),
                spawnGridshotTarget(),
            ];
        } else if (gameMode === 'tracking') {
            trackingTargetRef.current = spawnTrackingTarget();
        } else {
            reflexTargetRef.current = spawnReflexTarget();
        }

        // Start game loop
        setGameOver(false);
        setUiStats({
            score: 0,
            hits: 0,
            totalClicks: 0,
            timeLeft: 30,
            accuracy: 0,
            kps: 0,
            avgReaction: 0,
        });

        // Request pointer lock
        if (canvasRef.current) {
            canvasRef.current.requestPointerLock();
        }
    }, [gameMode, spawnGridshotTarget, spawnTrackingTarget, spawnReflexTarget]);

    // Pointer lock state events
    useEffect(() => {
        const handleLockChange = () => {
            const canvas = canvasRef.current;
            if (document.pointerLockElement === canvas) {
                setIsLocked(true);
                
                // If game was paused/reset, begin playing now
                if (!isPlayingRef.current && !gameOver) {
                    gameStartTimeRef.current = performance.now();
                    isPlayingRef.current = true;
                    setIsPlaying(true);
                }
            } else {
                setIsLocked(false);
                if (isPlayingRef.current) {
                    // Pause game (technically freezes time and game update)
                    isPlayingRef.current = false;
                    setIsPlaying(false);
                }
            }
        };

        const canvas = canvasRef.current;
        document.addEventListener('pointerlockchange', handleLockChange);
        if (canvas) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            document.removeEventListener('pointerlockchange', handleLockChange);
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, [handleMouseMove, handleMouseDown, gameOver]);

    // Animate canvas loop on mount
    useEffect(() => {
        requestRef.current = requestAnimationFrame(draw);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [draw]);

    // Handle rank info text & color mapping
    const getRank = () => {
        const score = uiStats.score;
        if (gameMode === 'gridshot') {
            if (score < 25) return { name: 'Bronze Clicker', color: '#B45309', badge: '🥉', desc: 'Warm up your arm. Try playing slow and steady to build basic accuracy.' };
            if (score < 45) return { name: 'Silver Sharpshooter', color: '#6B7280', badge: '🥈', desc: 'Good rhythm! Practice smaller flicking movements for greater precision.' };
            if (score < 65) return { name: 'Platinum Ranger', color: '#38BDF8', badge: '🥇', desc: 'Excellent flick speed. You are consistently hitting your targets!' };
            if (score < 80) return { name: 'Immortal Aim', color: '#C084FC', badge: '⚡', desc: 'Absolute monster. Incredibly fast click timings and micro-adjustments.' };
            return { name: 'Aim God!', color: '#00FF9D', badge: '👑', desc: 'Flawless dexterity. You have fully achieved gaming god-tier reflex speed.' };
        } else if (gameMode === 'tracking') {
            if (score < 600) return { name: 'Rusty Tracker', color: '#B45309', badge: '🥉', desc: 'Practice keeping a steady velocity without over-correcting.' };
            if (score < 1400) return { name: 'Steady Hand', color: '#6B7280', badge: '🥈', desc: 'Good track control. Your cursor matches the target velocity quite well.' };
            if (score < 2200) return { name: 'Lock-on Specialist', color: '#38BDF8', badge: '🥇', desc: 'Excellent continuous tracking. You stick like a magnet to the target.' };
            if (score < 2700) return { name: 'Neural Link', color: '#C084FC', badge: '⚡', desc: 'Phenomenal anticipation. Your pathing matches the target almost instantly.' };
            return { name: 'Aim God! (True Tracker)', color: '#00FF9D', badge: '👑', desc: 'Absolute perfection. Complete mouse mastery and fluid tracking control.' };
        } else {
            if (score < 10) return { name: 'Slow Reflexes', color: '#B45309', badge: '🥉', desc: 'Focus on snapping immediately to targets when they flash on screen.' };
            if (score < 18) return { name: 'Quick Draw', color: '#6B7280', badge: '🥈', desc: 'Solid fast twitches. Focus on clicking before they start fading.' };
            if (score < 24) return { name: 'Lightning Speed', color: '#38BDF8', badge: '🥇', desc: 'Sub-250ms visual reaction times. Extremely fast trigger reflexes.' };
            if (score < 28) return { name: 'Predator Response', color: '#C084FC', badge: '⚡', desc: 'Incredible speed. Your neural processing is at the absolute limit.' };
            return { name: 'Aim God! (Instant Reflex)', color: '#00FF9D', badge: '👑', desc: 'Legendary neural response. Incredible fast twitch visual reaction!' };
        }
    };

    const currentRank = getRank();

    return (
        <div className={styles.wrapper}>
            {/* Sensitivity Customizer Bar */}
            <div className={styles.setupCard}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Game</label>
                    <select 
                        value={game} 
                        onChange={(e) => setGame(e.target.value as any)}
                        className={styles.select}
                        disabled={isPlaying}
                    >
                        <option value="valorant">🎯 Valorant</option>
                        <option value="cs2">💥 CS2</option>
                        <option value="apex">🚀 Apex Legends</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>DPI</label>
                    <input
                        type="number"
                        value={dpi}
                        onChange={(e) => setDpi(Number(e.target.value))}
                        className={styles.input}
                        disabled={isPlaying}
                        min={100}
                        max={16000}
                        step={50}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Sensitivity</label>
                    <input
                        type="number"
                        value={sensitivity}
                        onChange={(e) => setSensitivity(Number(e.target.value))}
                        className={styles.input}
                        disabled={isPlaying}
                        min={0.01}
                        max={20}
                        step={0.05}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Game Mode</label>
                    <div className={styles.modeTabs}>
                        <button
                            onClick={() => { setGameMode('gridshot'); setGameOver(false); }}
                            className={`${styles.modeTab} ${gameMode === 'gridshot' ? styles.activeTab : ''}`}
                            disabled={isPlaying}
                        >
                            🎯 Flicking
                        </button>
                        <button
                            onClick={() => { setGameMode('tracking'); setGameOver(false); }}
                            className={`${styles.modeTab} ${gameMode === 'tracking' ? styles.activeTab : ''}`}
                            disabled={isPlaying}
                        >
                            🔄 Tracking
                        </button>
                        <button
                            onClick={() => { setGameMode('reflex'); setGameOver(false); }}
                            className={`${styles.modeTab} ${gameMode === 'reflex' ? styles.activeTab : ''}`}
                            disabled={isPlaying}
                        >
                            ⚡ Reflex
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Canvas Container */}
            <div className={styles.canvasContainer}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className={styles.canvas}
                    onClick={isPlaying ? undefined : startGame}
                />

                {/* Overlays */}
                {!isPlaying && !gameOver && (
                    <div className={styles.overlay} onClick={startGame}>
                        <div className={styles.overlayContent}>
                            <span className={styles.overlayIcon}>🎯</span>
                            <h2 className={styles.overlayTitle}>
                                Click to Lock Cursor &amp; Play
                            </h2>
                            <p className={styles.overlayText}>
                                Emulating your exact <strong style={{ color: 'var(--primary)' }}>{game.toUpperCase()}</strong> physical sensitivity.
                            </p>
                            <p className={styles.overlaySubtext}>
                                Press <kbd className={styles.kbd}>Esc</kbd> anytime to pause or release cursor.
                            </p>
                        </div>
                    </div>
                )}

                {isLocked && !isPlaying && !gameOver && (
                    <div className={styles.overlay} onClick={startGame}>
                        <div className={styles.overlayContent}>
                            <h2 className={styles.overlayTitle}>Paused</h2>
                            <p className={styles.overlayText}>Click the screen to resume aim training.</p>
                        </div>
                    </div>
                )}

                {gameOver && (
                    <div className={styles.overlay} onClick={startGame}>
                        <div className={styles.overlayContent} style={{ maxWidth: '500px' }}>
                            <span className={styles.rankBadge} style={{ color: currentRank.color, borderColor: currentRank.color }}>
                                {currentRank.badge} {currentRank.name}
                            </span>
                            <h2 className={styles.overlayTitle} style={{ marginTop: '1rem' }}>
                                Challenge Completed!
                            </h2>
                            <p className={styles.rankDesc}>{currentRank.desc}</p>
                            
                            <div className={styles.finalStatsGrid}>
                                <div className={styles.finalStatItem}>
                                    <span className={styles.finalStatLabel}>Score</span>
                                    <span className={styles.finalStatVal} style={{ color: 'var(--primary)' }}>{uiStats.score}</span>
                                </div>
                                <div className={styles.finalStatItem}>
                                    <span className={styles.finalStatLabel}>Accuracy</span>
                                    <span className={styles.finalStatVal}>{uiStats.accuracy}%</span>
                                </div>
                                <div className={styles.finalStatItem}>
                                    <span className={styles.finalStatLabel}>KPS</span>
                                    <span className={styles.finalStatVal}>{uiStats.kps}</span>
                                </div>
                                <div className={styles.finalStatItem}>
                                    <span className={styles.finalStatLabel}>Avg Reaction</span>
                                    <span className={styles.finalStatVal}>
                                        {gameMode === 'tracking' ? 'N/A' : `${uiStats.avgReaction}ms`}
                                    </span>
                                </div>
                            </div>
                            
                            <button className={styles.restartBtn} onClick={startGame}>
                                🔄 Click to Train Again
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Live Stats Header */}
            <div className={styles.statsCard}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>⏱️ Time Left</span>
                    <span className={styles.statValue}>{uiStats.timeLeft}s</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>🎯 Score</span>
                    <span className={styles.statValue} style={{ color: 'var(--primary)' }}>{uiStats.score}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>⚡ Accuracy</span>
                    <span className={styles.statValue}>{uiStats.accuracy}%</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>📊 Hits/Sec (KPS)</span>
                    <span className={styles.statValue}>{uiStats.kps}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>🚀 Reaction Time</span>
                    <span className={styles.statValue}>
                        {gameMode === 'tracking' ? 'N/A' : `${uiStats.avgReaction}ms`}
                    </span>
                </div>
            </div>
        </div>
    );
}
