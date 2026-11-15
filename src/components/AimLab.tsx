"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import { games } from "@/lib/games";
import { calculateCmPer360 } from "@/lib/converter";
import { pros, getProsByGame } from "@/lib/pros";
import styles from "./AimLab.module.css";

type Mode = "microflick" | "dynamicclick" | "strafepeek" | "ghostvspro";

const MODE_META: Record<Mode, { label: string; icon: string; desc: string; tag: string; recommended?: boolean }> = {
    microflick: {
        label: "Micro-Flick",
        icon: "🎯",
        tag: "FLICKING",
        recommended: true,
        desc: "Small, tightly clustered targets — trains fine correction, not raw flick speed. Built for Valorant/CS2 headshot precision.",
    },
    dynamicclick: {
        label: "Dynamic Click",
        icon: "🏓",
        tag: "CLICKING",
        desc: "Targets bounce around the arena on a short timer — click them before they expire. Combines movement prediction with click timing.",
    },
    strafepeek: {
        label: "Strafe Peek",
        icon: "🚪",
        tag: "STRAFE-AIMING",
        desc: "A target flashes out from behind cover for 300-500ms, then retreats. Trains reaction and crosshair placement on common peek angles.",
    },
    ghostvspro: {
        label: "Ghost vs Pro",
        icon: "👻",
        tag: "PRO SIM",
        desc: "Play using a pro player's exact real sensitivity (converted to true cm/360) and see how their settings actually feel.",
    },
};

interface Target {
    id: number;
    x: number;
    y: number;
    r: number;
    spawnTime: number;
    vx?: number;
    vy?: number;
    duration?: number; // ms, for expiring targets
    hidden?: boolean; // strafepeek: currently behind cover
    revealAt?: number;
    hideAt?: number;
}

interface GameStats {
    score: number;
    hits: number;
    totalClicks: number;
    timeLeft: number;
    accuracy: number;
    avgReaction: number;
}

const DEFAULT_STATS: GameStats = {
    score: 0,
    hits: 0,
    totalClicks: 0,
    timeLeft: 30,
    accuracy: 0,
    avgReaction: 0,
};

const CANVAS_W = 800;
const CANVAS_H = 500;
const ROUND_SECONDS = 30;
const HISTORY_CAP = 20;

const STRAFE_SPOTS = [
    { x: 90, y: 140 },
    { x: 90, y: 360 },
    { x: 710, y: 140 },
    { x: 710, y: 360 },
    { x: 400, y: 90 },
];

interface AimLabProps {
    /** Fires once per completed round, regardless of login state — used by
     * AimLabGated to count free trials. */
    onRoundFinish?: () => void;
}

export default function AimLab({ onRoundFinish }: AimLabProps = {}) {
    const { user, userData } = useAuth();

    const [mode, setMode] = useState<Mode>("microflick");
    const [dpi, setDpi] = useState<number>(800);
    const [sensitivity, setSensitivity] = useState<number>(0.35);
    const [gameId, setGameId] = useState<string>("valorant");

    // {gameId, gameName} pairs, deduped — gameId is what getProsByGame() filters
    // on, gameName is what we show in the dropdown label.
    const proGameOptions = useMemo(() => {
        const seen = new Map<string, string>();
        pros.forEach((p) => {
            if (!seen.has(p.gameId)) seen.set(p.gameId, p.game);
        });
        return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
    }, []);
    const [proGameFilter, setProGameFilter] = useState<string>(proGameOptions[0]?.id ?? "valorant");
    const availablePros = useMemo(() => getProsByGame(proGameFilter), [proGameFilter]);
    const [selectedProSlug, setSelectedProSlug] = useState<string>(availablePros[0]?.slug ?? "");
    const selectedPro = useMemo(
        () => pros.find((p) => p.slug === selectedProSlug) ?? availablePros[0],
        [selectedProSlug, availablePros]
    );

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [uiStats, setUiStats] = useState<GameStats>(DEFAULT_STATS);
    const [gameOver, setGameOver] = useState(false);
    const [saved, setSaved] = useState(false);
    // `saved` only covers the Firestore history write. The leaderboard POST used
    // to end in `.catch(() => {})`, so a rejected submission still displayed as
    // a success — tracked separately now.
    const [boardState, setBoardState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);

    const isPlayingRef = useRef(false);
    const timeLeftRef = useRef(ROUND_SECONDS);
    const modeRef = useRef<Mode>("microflick");
    const gameYawRef = useRef(0.022);
    const sensRef = useRef(0.35);
    const dpiRef = useRef(800);

    const crosshairRef = useRef({ x: CANVAS_W / 2, y: CANVAS_H / 2 });
    const targetsRef = useRef<Target[]>([]);
    const nextIdRef = useRef(0);

    const scoreRef = useRef(0);
    const hitsRef = useRef(0);
    const totalClicksRef = useRef(0);
    const reactionTimesRef = useRef<number[]>([]);
    const frameCountRef = useRef(0);
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);
    useEffect(() => {
        sensRef.current = sensitivity;
    }, [sensitivity]);
    useEffect(() => {
        dpiRef.current = dpi;
    }, [dpi]);
    useEffect(() => {
        gameYawRef.current = games.find((g) => g.id === gameId)?.yaw ?? 0.022;
    }, [gameId]);

    // Ghost vs Pro locks sens/dpi/yaw to the selected pro's real numbers.
    useEffect(() => {
        if (mode !== "ghostvspro" || !selectedPro) return;
        const proGame = games.find((g) => g.id === selectedPro.gameId);
        sensRef.current = selectedPro.sens;
        dpiRef.current = selectedPro.dpi;
        gameYawRef.current = proGame?.yaw ?? 0.022;
    }, [mode, selectedPro]);

    const playSound = useCallback((type: "hit" | "miss") => {
        if (typeof window === "undefined") return;
        try {
            const AudioContextClass =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
            if (!AudioContextClass) return;
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (type === "hit") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(130, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.14, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            }
        } catch {
            // Audio is a nice-to-have; ignore failures (e.g. autoplay policy).
        }
    }, []);

    // --- Target spawners per mode -----------------------------------------
    const spawnMicroFlickCluster = useCallback((): Target[] => {
        const clusterX = 160 + Math.random() * (CANVAS_W - 320);
        const clusterY = 120 + Math.random() * (CANVAS_H - 240);
        const count = 3;
        const out: Target[] = [];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
            const dist = 45 + Math.random() * 25;
            out.push({
                id: nextIdRef.current++,
                x: Math.max(20, Math.min(CANVAS_W - 20, clusterX + Math.cos(angle) * dist)),
                y: Math.max(20, Math.min(CANVAS_H - 20, clusterY + Math.sin(angle) * dist)),
                r: 12,
                spawnTime: performance.now(),
            });
        }
        return out;
    }, []);

    const spawnDynamicClickTarget = useCallback((): Target => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 2.5;
        return {
            id: nextIdRef.current++,
            x: 100 + Math.random() * (CANVAS_W - 200),
            y: 100 + Math.random() * (CANVAS_H - 200),
            r: 20,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            spawnTime: performance.now(),
            duration: 2200,
        };
    }, []);

    const spawnStrafePeekTarget = useCallback((): Target => {
        const spot = STRAFE_SPOTS[Math.floor(Math.random() * STRAFE_SPOTS.length)];
        const now = performance.now();
        const showDelay = 300 + Math.random() * 500;
        const visibleFor = 300 + Math.random() * 200; // 300-500ms window
        return {
            id: nextIdRef.current++,
            x: spot.x,
            y: spot.y,
            r: 22,
            spawnTime: now,
            hidden: true,
            revealAt: now + showDelay,
            hideAt: now + showDelay + visibleFor,
        };
    }, []);

    const spawnGhostTarget = useCallback((): Target => {
        const padding = 60;
        return {
            id: nextIdRef.current++,
            x: padding + Math.random() * (CANVAS_W - padding * 2),
            y: padding + Math.random() * (CANVAS_H - padding * 2),
            r: 24,
            spawnTime: performance.now(),
        };
    }, []);

    const calculateAccuracy = useCallback(() => {
        if (totalClicksRef.current === 0) return 0;
        return Math.round((hitsRef.current / totalClicksRef.current) * 100);
    }, []);

    const calculateAvgReaction = useCallback(() => {
        if (reactionTimesRef.current.length === 0) return 0;
        const sum = reactionTimesRef.current.reduce((a, b) => a + b, 0);
        return Math.round(sum / reactionTimesRef.current.length);
    }, []);

    // --- Result persistence (Coach Adaptativo layer) ------------------------
    const saveSession = useCallback(async () => {
        if (!user) return;
        try {
            const entry = {
                mode: modeRef.current,
                score: scoreRef.current,
                accuracy: calculateAccuracy(),
                avgReaction: calculateAvgReaction(),
                timestamp: new Date().toISOString(),
            };
            const prevHistory = userData?.aimLabHistory ?? [];
            const nextHistory = [...prevHistory, entry].slice(-HISTORY_CAP);
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { aimLabHistory: nextHistory });
            setSaved(true);

            setBoardState("saving");
            const idToken = await user.getIdToken();
            fetch("/api/submit-score.php", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
                body: JSON.stringify({
                    // Sent in the body too, because header forwarding varies by host.
                    idToken,
                    displayName: userData?.displayName || user.email?.split("@")[0] || "Anonymous",
                    game: "aim-lab",
                    mode: modeRef.current,
                    score: scoreRef.current,
                    dpi: dpiRef.current,
                }),
            })
                .then((res) => setBoardState(res.ok ? "saved" : "failed"))
                .catch(() => setBoardState("failed"));
        } catch (err) {
            console.error("Failed to save Aim Lab session:", err);
        }
    }, [user, userData, calculateAccuracy, calculateAvgReaction]);

    // --- Main render/update loop --------------------------------------------
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#0a0b0f";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Subtle grid
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 1;
        for (let x = 0; x < CANVAS_W; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, CANVAS_H);
            ctx.stroke();
        }
        for (let y = 0; y < CANVAS_H; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(CANVAS_W, y);
            ctx.stroke();
        }

        if (isPlayingRef.current) {
            frameCountRef.current++;
            const now = performance.now();
            const elapsed = (now - (canvas.dataset.startTime ? Number(canvas.dataset.startTime) : now)) / 1000;
            timeLeftRef.current = Math.max(0, ROUND_SECONDS - elapsed);

            if (timeLeftRef.current <= 0) {
                isPlayingRef.current = false;
                setIsPlaying(false);
                setGameOver(true);
                if (document.pointerLockElement === canvas) document.exitPointerLock();
            }

            const mode = modeRef.current;

            // --- Draw strafe-peek cover walls ---
            if (mode === "strafepeek") {
                ctx.fillStyle = "rgba(255,255,255,0.06)";
                ctx.fillRect(0, 0, 60, CANVAS_H);
                ctx.fillRect(CANVAS_W - 60, 0, 60, CANVAS_H);
                ctx.fillRect(340, 0, 120, 60);

                // spawn logic
                if (targetsRef.current.length === 0 && now - lastSpawnRef.current > 200) {
                    targetsRef.current = [spawnStrafePeekTarget()];
                    lastSpawnRef.current = now;
                }
                const t = targetsRef.current[0];
                if (t && t.revealAt !== undefined && t.hideAt !== undefined) {
                    if (t.hidden && now >= t.revealAt) t.hidden = false;
                    if (!t.hidden && now >= t.hideAt) {
                        // missed window — expired
                        targetsRef.current = [];
                    }
                }
            } else if (mode === "microflick") {
                if (targetsRef.current.length === 0) {
                    targetsRef.current = spawnMicroFlickCluster();
                }
            } else if (mode === "dynamicclick") {
                if (targetsRef.current.length < 2 && now - lastSpawnRef.current > 350) {
                    targetsRef.current.push(spawnDynamicClickTarget());
                    lastSpawnRef.current = now;
                }
                // move + bounce + expire
                targetsRef.current = targetsRef.current.filter((t) => {
                    if (t.duration && now - t.spawnTime > t.duration) return false;
                    t.x += t.vx ?? 0;
                    t.y += t.vy ?? 0;
                    if (t.x - t.r < 0 || t.x + t.r > CANVAS_W) t.vx = -(t.vx ?? 0);
                    if (t.y - t.r < 0 || t.y + t.r > CANVAS_H) t.vy = -(t.vy ?? 0);
                    t.x = Math.max(t.r, Math.min(CANVAS_W - t.r, t.x));
                    t.y = Math.max(t.r, Math.min(CANVAS_H - t.r, t.y));
                    return true;
                });
            } else if (mode === "ghostvspro") {
                if (targetsRef.current.length === 0) {
                    targetsRef.current = [spawnGhostTarget()];
                }
            }

            // --- Draw targets ---
            targetsRef.current.forEach((t) => {
                if (t.hidden) return;
                ctx.save();
                const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
                grad.addColorStop(0, mode === "strafepeek" ? "#ff6b6b" : "#00ff9d");
                grad.addColorStop(1, mode === "strafepeek" ? "#a83f2f" : "#00b377");
                ctx.shadowColor = mode === "strafepeek" ? "rgba(255,107,107,0.6)" : "rgba(0,255,157,0.5)";
                ctx.shadowBlur = 14;
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            // --- Crosshair ---
            const cx = crosshairRef.current.x;
            const cy = crosshairRef.current.y;
            ctx.save();
            ctx.strokeStyle = "#00d9ff";
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
            ctx.fillStyle = "#00d9ff";
            ctx.beginPath();
            ctx.arc(cx, cy, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (frameCountRef.current % 6 === 0) {
                setUiStats({
                    score: scoreRef.current,
                    hits: hitsRef.current,
                    totalClicks: totalClicksRef.current,
                    timeLeft: Math.ceil(timeLeftRef.current),
                    accuracy: calculateAccuracy(),
                    avgReaction: calculateAvgReaction(),
                });
            }
        } else {
            const cx = CANVAS_W / 2;
            const cy = CANVAS_H / 2;
            ctx.save();
            ctx.strokeStyle = "rgba(0, 217, 255, 0.35)";
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

        requestRef.current = requestAnimationFrame(draw);
    }, [
        calculateAccuracy,
        calculateAvgReaction,
        spawnMicroFlickCluster,
        spawnDynamicClickTarget,
        spawnStrafePeekTarget,
        spawnGhostTarget,
    ]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (document.pointerLockElement !== canvasRef.current) return;
        if (!isPlayingRef.current) return;

        const yaw = gameYawRef.current;
        const factor = (yaw / 0.022) * 1.55;
        const sens = sensRef.current;

        let newX = crosshairRef.current.x + e.movementX * sens * factor;
        let newY = crosshairRef.current.y + e.movementY * sens * factor;
        newX = Math.max(0, Math.min(CANVAS_W, newX));
        newY = Math.max(0, Math.min(CANVAS_H, newY));
        crosshairRef.current = { x: newX, y: newY };
    }, []);

    const handleMouseDown = useCallback(() => {
        if (document.pointerLockElement !== canvasRef.current) return;
        if (!isPlayingRef.current || timeLeftRef.current <= 0) return;

        totalClicksRef.current += 1;
        const cx = crosshairRef.current.x;
        const cy = crosshairRef.current.y;
        const mode = modeRef.current;

        const hitIndex = targetsRef.current.findIndex((t) => {
            if (t.hidden) return false;
            const dx = t.x - cx;
            const dy = t.y - cy;
            return Math.sqrt(dx * dx + dy * dy) <= t.r;
        });

        if (hitIndex >= 0) {
            const t = targetsRef.current[hitIndex];
            reactionTimesRef.current.push(performance.now() - t.spawnTime);
            hitsRef.current += 1;
            scoreRef.current += mode === "microflick" ? 8 : mode === "strafepeek" ? 15 : 10;
            playSound("hit");

            if (mode === "microflick") {
                targetsRef.current = spawnMicroFlickCluster();
            } else if (mode === "strafepeek") {
                targetsRef.current = [];
            } else if (mode === "dynamicclick") {
                targetsRef.current = targetsRef.current.filter((_, i) => i !== hitIndex);
            } else if (mode === "ghostvspro") {
                targetsRef.current = [spawnGhostTarget()];
            }
        } else {
            scoreRef.current = Math.max(0, scoreRef.current - 2);
            playSound("miss");
        }
    }, [playSound, spawnMicroFlickCluster, spawnGhostTarget]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [handleMouseMove, handleMouseDown]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(draw);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- draw is intentionally captured once; it reads live state via refs
    }, []);

    useEffect(() => {
        const handleLockChange = () => {
            const locked = document.pointerLockElement === canvasRef.current;
            setIsLocked(locked);
            if (!locked && isPlayingRef.current) {
                isPlayingRef.current = false;
                setIsPlaying(false);
            }
        };
        document.addEventListener("pointerlockchange", handleLockChange);
        return () => document.removeEventListener("pointerlockchange", handleLockChange);
    }, []);

    const startRound = () => {
        if (mode === "ghostvspro" && !selectedPro) return;
        scoreRef.current = 0;
        hitsRef.current = 0;
        totalClicksRef.current = 0;
        reactionTimesRef.current = [];
        targetsRef.current = [];
        timeLeftRef.current = ROUND_SECONDS;
        frameCountRef.current = 0;
        lastSpawnRef.current = 0;
        crosshairRef.current = { x: CANVAS_W / 2, y: CANVAS_H / 2 };
        setUiStats(DEFAULT_STATS);
        setGameOver(false);
        setSaved(false);
        setBoardState('idle');

        const canvas = canvasRef.current;
        if (canvas) {
            canvas.dataset.startTime = String(performance.now());
            canvas.requestPointerLock();
        }
        isPlayingRef.current = true;
        setIsPlaying(true);
    };

    // Auto-save once a round ends, if logged in.
    useEffect(() => {
        if (gameOver && user && !saved) {
            saveSession();
        }
    }, [gameOver, user, saved, saveSession]);

    // Notify the trial gate once per completed round — fires regardless of
    // login state, since trial counting shouldn't require an account.
    const roundFinishNotifiedRef = useRef(false);
    useEffect(() => {
        if (gameOver && !roundFinishNotifiedRef.current) {
            roundFinishNotifiedRef.current = true;
            onRoundFinish?.();
        } else if (!gameOver) {
            roundFinishNotifiedRef.current = false;
        }
    }, [gameOver, onRoundFinish]);

    const savedSettings = userData?.savedSettings;
    const savedCm360 = savedSettings
        ? calculateCmPer360(savedSettings.sens, savedSettings.dpi, savedSettings.game)
        : null;

    const proCm360 = selectedPro
        ? calculateCmPer360(selectedPro.sens, selectedPro.dpi, selectedPro.gameId)
        : null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.modeTabs}>
                {(Object.keys(MODE_META) as Mode[]).map((m) => (
                    <button
                        key={m}
                        className={`${styles.modeTab} ${mode === m ? styles.modeTabActive : ""}`}
                        onClick={() => {
                            if (isPlaying) return;
                            setMode(m);
                            setGameOver(false);
                        }}
                        disabled={isPlaying}
                    >
                        {MODE_META[m].recommended && (
                            <span className={styles.modeTabRecommended}>★ Start here</span>
                        )}
                        <span className={styles.modeTabTag}>{MODE_META[m].tag}</span>
                        <span>{MODE_META[m].icon} {MODE_META[m].label}</span>
                    </button>
                ))}
            </div>

            <p className={styles.modeDesc}>{MODE_META[mode].desc}</p>

            <div className={styles.setupCard}>
                {mode !== "ghostvspro" ? (
                    <>
                        <div className={styles.inputGroup}>
                            <span className={styles.label}>Game (yaw)</span>
                            <select
                                className={styles.select}
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                disabled={isPlaying}
                            >
                                {games.slice(0, 20).map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <span className={styles.label}>Sensitivity</span>
                            <input
                                className={styles.input}
                                type="number"
                                step="0.01"
                                value={sensitivity}
                                onChange={(e) => setSensitivity(Number(e.target.value) || 0)}
                                disabled={isPlaying}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <span className={styles.label}>DPI</span>
                            <input
                                className={styles.input}
                                type="number"
                                step="50"
                                value={dpi}
                                onChange={(e) => setDpi(Number(e.target.value) || 800)}
                                disabled={isPlaying}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.inputGroup}>
                            <span className={styles.label}>Game</span>
                            <select
                                className={styles.select}
                                value={proGameFilter}
                                onChange={(e) => {
                                    setProGameFilter(e.target.value);
                                    const first = getProsByGame(e.target.value)[0];
                                    setSelectedProSlug(first?.slug ?? "");
                                }}
                                disabled={isPlaying}
                            >
                                {proGameOptions.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <span className={styles.label}>Pro Player</span>
                            <select
                                className={styles.select}
                                value={selectedProSlug}
                                onChange={(e) => setSelectedProSlug(e.target.value)}
                                disabled={isPlaying}
                            >
                                {availablePros.map((p) => (
                                    <option key={p.slug} value={p.slug}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedPro && (
                            <div className={styles.proStat}>
                                <span className={styles.label}>Real settings</span>
                                <span className={styles.proStatValue}>
                                    {selectedPro.dpi} DPI &middot; {selectedPro.sens} sens
                                    {proCm360 ? ` · ${proCm360.toFixed(1)} cm/360` : ""}
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>

            {savedCm360 !== null && (
                <p className={styles.tip}>
                    💡 Your saved sensitivity is <strong>{savedCm360.toFixed(1)} cm/360</strong> — keep an
                    eye on whether your accuracy holds up as this session&apos;s cm/360 gets faster or
                    slower than that.
                </p>
            )}

            <div className={styles.canvasWrap}>
                <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className={styles.canvas} />

                {!isPlaying && !gameOver && (
                    <div className={styles.overlay}>
                        <button className={styles.startBtn} onClick={startRound}>
                            Click to Start ({ROUND_SECONDS}s)
                        </button>
                        <p className={styles.overlayHint}>Locks your mouse cursor — press Esc anytime to exit.</p>
                    </div>
                )}

                {isPlaying && !isLocked && (
                    <div className={styles.overlay}>
                        <p className={styles.overlayHint}>Click the canvas to re-lock your cursor.</p>
                    </div>
                )}

                {gameOver && (
                    <div className={styles.overlay}>
                        <h3 className={styles.resultTitle}>Round Complete</h3>
                        <div className={styles.resultGrid}>
                            <div>
                                <span className={styles.resultLabel}>Score</span>
                                <span className={styles.resultValue}>{uiStats.score}</span>
                            </div>
                            <div>
                                <span className={styles.resultLabel}>Accuracy</span>
                                <span className={styles.resultValue}>{uiStats.accuracy}%</span>
                            </div>
                            <div>
                                <span className={styles.resultLabel}>Avg Reaction</span>
                                <span className={styles.resultValue}>{uiStats.avgReaction}ms</span>
                            </div>
                        </div>
                        {user ? (
                            <p className={styles.saveNote}>
                                {saved ? "✓ Saved to your history" : "Saving…"}
                                {boardState === "failed" ? (
                                    <span style={{ color: "#ff6b81" }}>
                                        {" · Could not post to the leaderboard. Refresh and play one more round."}
                                    </span>
                                ) : (
                                    <>
                                        {" · "}
                                        <Link href="/leaderboard/" style={{ color: "var(--primary)", fontWeight: 600 }}>See the leaderboard →</Link>
                                    </>
                                )}
                            </p>
                        ) : (
                            <p className={styles.saveNote}>
                                <Link href="/login/" style={{ color: "var(--primary)", fontWeight: 600 }}>Log in</Link> to track your progress and appear on the leaderboard.
                            </p>
                        )}
                        <button className={styles.startBtn} onClick={startRound}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.statBar}>
                <div>
                    <span className={styles.statLabel}>Score</span>
                    <span className={styles.statValue}>{uiStats.score}</span>
                </div>
                <div>
                    <span className={styles.statLabel}>Time</span>
                    <span className={styles.statValue}>{uiStats.timeLeft}s</span>
                </div>
                <div>
                    <span className={styles.statLabel}>Accuracy</span>
                    <span className={styles.statValue}>{uiStats.accuracy}%</span>
                </div>
                <div>
                    <span className={styles.statLabel}>Avg Reaction</span>
                    <span className={styles.statValue}>{uiStats.avgReaction}ms</span>
                </div>
            </div>
        </div>
    );
}
