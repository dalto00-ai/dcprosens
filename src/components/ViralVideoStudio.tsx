"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { StripeCheckoutModal, type CheckoutPlanId } from "@/components/StripeCheckoutModal";
import styles from "./HardwareTools.module.css";

type StudioMode = "vs_reel" | "clip_overlay";
type ThemeId = "vice_neon" | "valorant_red" | "cs2_gold" | "cyber_emerald";

interface ThemeSpec {
  id: ThemeId;
  label: string;
  bgTop: string;
  bgBottom: string;
  accent: string;
  accent2: string;
}

const THEMES: ThemeSpec[] = [
  { id: "vice_neon", label: "🌴 GTA VI Vice Neon", bgTop: "#140724", bgBottom: "#050509", accent: "#ff3cac", accent2: "#00f5d4" },
  { id: "cyber_emerald", label: "⚡ DCPROSENS Pro Emerald", bgTop: "#051914", bgBottom: "#050507", accent: "#00ff9d", accent2: "#38bdf8" },
  { id: "valorant_red", label: "🎯 Valorant Crimson", bgTop: "#24080e", bgBottom: "#070507", accent: "#ff4655", accent2: "#facc15" },
  { id: "cs2_gold", label: "🏆 CS2 Major Gold", bgTop: "#1c1505", bgBottom: "#060608", accent: "#f59e0b", accent2: "#60a5fa" },
];

const TEMPLATES = [
  {
    name: "GTA VI Default vs Zero-Drift",
    hook: "STOP USING DEFAULT GTA 6 AIM ❌",
    game: "GTA VI (PS5 / Xbox)",
    leftName: "DEFAULT ROCKSTAR",
    leftStat1: "14% Deadzone",
    leftStat2: "Slow Ramp",
    leftScore: 38,
    rightName: "PRO ZERO-DRIFT",
    rightStat1: "4% Deadzone",
    rightStat2: "88% Accel",
    rightScore: 96,
    theme: "vice_neon" as ThemeId,
  },
  {
    name: "Warzone → GTA VI Conversion",
    hook: "COPY YOUR WARZONE AIM TO GTA 6 🎯",
    game: "Warzone → GTA VI",
    leftName: "OLD SENS (6 / 6)",
    leftStat1: "1-Scale Guess",
    leftStat2: "Slow Drive-By",
    leftScore: 44,
    rightName: "3-SCALE SYNCED",
    rightStat1: "65% Look / 50% ADS",
    rightStat2: "85% Vehicle",
    leftScore2: 98,
    rightScore: 98,
    theme: "cyber_emerald" as ThemeId,
  },
  {
    name: "TenZ vs Aspas Settings",
    hook: "WHO HAS THE FASTEST FLICK? ⚡",
    game: "Valorant / FPS",
    leftName: "TENZ (1600 DPI)",
    leftStat1: "0.245 Sens",
    leftStat2: "392 eDPI",
    leftScore: 92,
    rightName: "ASPAS (800 DPI)",
    rightStat1: "0.40 Sens",
    rightStat2: "320 eDPI",
    rightScore: 95,
    theme: "valorant_red" as ThemeId,
  },
];

const FREE_EXPORTS_LIMIT = 2;

export default function ViralVideoStudio() {
  const { user, userData } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoElemRef = useRef<HTMLVideoElement | null>(null);

  const [mode, setMode] = useState<StudioMode>("vs_reel");
  const [themeId, setThemeId] = useState<ThemeId>("vice_neon");
  const [hookTitle, setHookTitle] = useState("STOP USING DEFAULT GTA 6 AIM ❌");
  const [gameTag, setGameTag] = useState("GTA VI (PS5 / Xbox)");
  const [creatorHandle, setCreatorHandle] = useState("@YOUR_CHANNEL");

  // VS Mode fields
  const [leftName, setLeftName] = useState("DEFAULT ROCKSTAR");
  const [leftSub, setLeftSub] = useState("14% Deadzone • Slow Ramp");
  const [leftPct, setLeftPct] = useState(38);
  const [rightName, setRightName] = useState("PRO ZERO-DRIFT");
  const [rightSub, setRightSub] = useState("4% Deadzone • 88% Accel");
  const [rightPct, setRightPct] = useState(96);

  // Clip Overlay Mode
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [hudSensText, setHudSensText] = useState("65% Look | 50% ADS | 4% Deadzone");

  // Credits & Rendering state
  const [localFreeUsed, setLocalFreeUsed] = useState<number>(0);
  const [localPaidCredits, setLocalPaidCredits] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);

  // Stripe Modal
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlanId>("creator-100");

  useEffect(() => {
    try {
      const used = Number(localStorage.getItem("dcprosens_studio_free_used") || "0");
      const paid = Number(localStorage.getItem("dcprosens_studio_paid_credits") || "0");
      setLocalFreeUsed(Number.isFinite(used) ? used : 0);
      setLocalPaidCredits(Number.isFinite(paid) ? paid : 0);
    } catch {
      // ignore
    }
  }, []);

  const isUnlimitedVip = userData?.subscriptionStatus === "active";
  const serverCreditsRemaining = Math.max(
    0,
    (userData?.videoCreditsGranted || 0) - (userData?.videoCreditsUsed || 0)
  );
  const totalPaidCredits = serverCreditsRemaining + localPaidCredits;
  const freeRemaining = Math.max(0, FREE_EXPORTS_LIMIT - localFreeUsed);
  const canExportWatermarkFree = isUnlimitedVip || totalPaidCredits > 0;
  const canExportAtAll = canExportWatermarkFree || freeRemaining > 0;

  const activeTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, progress: number) => {
      const W = 540;
      const H = 960;
      ctx.clearRect(0, 0, W, H);

      // Background
      if (mode === "clip_overlay" && videoElemRef.current && videoElemRef.current.readyState >= 2) {
        const vid = videoElemRef.current;
        const scale = Math.max(W / vid.videoWidth, H / vid.videoHeight);
        const dw = vid.videoWidth * scale;
        const dh = vid.videoHeight * scale;
        ctx.drawImage(vid, (W - dw) / 2, (H - dh) / 2, dw, dh);
        ctx.fillStyle = "rgba(5, 5, 10, 0.28)";
        ctx.fillRect(0, 0, W, H);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, activeTheme.bgTop);
        grad.addColorStop(1, activeTheme.bgBottom);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Subtle grid
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 45) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
          ctx.stroke();
        }
        for (let y = 0; y < H; y += 45) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }
      }

      // Animated glow pulse
      const pulse = 0.5 + 0.5 * Math.sin(progress * Math.PI * 4);
      const glow = ctx.createRadialGradient(W / 2, H * 0.22, 10, W / 2, H * 0.22, 260);
      glow.addColorStop(0, `${activeTheme.accent}33`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Top Game Pill
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.strokeStyle = activeTheme.accent2;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(W / 2 - 140, 56, 280, 42, 21);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = activeTheme.accent2;
      ctx.font = "bold 18px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(gameTag.toUpperCase(), W / 2, 83);

      // Viral CapCut Hook Banner
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 32px Inter, system-ui, sans-serif";
      const words = hookTitle.split(" ");
      let line1 = "";
      let line2 = "";
      for (const w of words) {
        if ((line1 + " " + w).trim().length <= 22) line1 = (line1 + " " + w).trim();
        else line2 = (line2 + " " + w).trim();
      }
      ctx.fillText(line1, W / 2, 152);
      if (line2) {
        ctx.fillStyle = activeTheme.accent;
        ctx.fillText(line2, W / 2, 194);
      }

      if (mode === "vs_reel") {
        const animEase = Math.min(1, progress * 1.6);

        // Card A (Left / Top)
        ctx.fillStyle = "rgba(15, 16, 24, 0.88)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(42, 240, W - 84, 210, 18);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "800 15px Inter, system-ui, sans-serif";
        ctx.fillText("OPTION A", 68, 276);

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 26px Inter, system-ui, sans-serif";
        ctx.fillText(leftName, 68, 314);

        ctx.fillStyle = "#cbd5e1";
        ctx.font = "600 17px Inter, system-ui, sans-serif";
        ctx.fillText(leftSub, 68, 346);

        // Bar A
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.roundRect(68, 376, W - 136, 26, 13);
        ctx.fill();

        const barAW = Math.max(24, ((W - 136) * leftPct * animEase) / 100);
        ctx.fillStyle = "#64748b";
        ctx.beginPath();
        ctx.roundRect(68, 376, barAW, 26, 13);
        ctx.fill();

        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 18px Inter, system-ui, sans-serif";
        ctx.fillText(`${Math.round(leftPct * animEase)}/100`, W - 68, 428);

        // VS Badge
        ctx.fillStyle = activeTheme.accent;
        ctx.beginPath();
        ctx.arc(W / 2, 475, 28 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = "900 20px Inter, system-ui, sans-serif";
        ctx.fillText("VS", W / 2, 482);

        // Card B (Winner)
        ctx.fillStyle = "rgba(15, 16, 24, 0.94)";
        ctx.strokeStyle = activeTheme.accent2;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(42, 505, W - 84, 220, 18);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = activeTheme.accent2;
        ctx.font = "800 15px Inter, system-ui, sans-serif";
        ctx.fillText("★ CALIBRATED WINNER", 68, 542);

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 27px Inter, system-ui, sans-serif";
        ctx.fillText(rightName, 68, 582);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "600 17px Inter, system-ui, sans-serif";
        ctx.fillText(rightSub, 68, 614);

        // Bar B
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.roundRect(68, 644, W - 136, 28, 14);
        ctx.fill();

        const barBW = Math.max(24, ((W - 136) * rightPct * animEase) / 100);
        const barGrad = ctx.createLinearGradient(68, 0, 68 + barBW, 0);
        barGrad.addColorStop(0, activeTheme.accent);
        barGrad.addColorStop(1, activeTheme.accent2);
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(68, 644, barBW, 28, 14);
        ctx.fill();

        ctx.textAlign = "right";
        ctx.fillStyle = activeTheme.accent2;
        ctx.font = "900 20px Inter, system-ui, sans-serif";
        ctx.fillText(`${Math.round(rightPct * animEase)}/100`, W - 68, 698);
      } else {
        // Clip Overlay HUD Pill at bottom
        ctx.fillStyle = "rgba(8, 9, 14, 0.85)";
        ctx.strokeStyle = activeTheme.accent2;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(36, 720, W - 72, 105, 16);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.fillStyle = activeTheme.accent2;
        ctx.font = "800 15px Inter, system-ui, sans-serif";
        ctx.fillText("LIVE CALIBRATED SETTINGS", W / 2, 754);

        ctx.fillStyle = "#ffffff";
        ctx.font = "800 20px Inter, system-ui, sans-serif";
        ctx.fillText(hudSensText, W / 2, 792);
      }

      // Creator Handle Footer
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 19px Inter, system-ui, sans-serif";
      ctx.fillText(creatorHandle, W / 2, 868);

      // Promotional Watermark for Free Exports (Organic TikTok/Shorts Growth)
      if (!canExportWatermarkFree) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
        ctx.beginPath();
        ctx.roundRect(48, 888, W - 96, 46, 10);
        ctx.fill();
        ctx.fillStyle = activeTheme.accent2;
        ctx.font = "800 16px Inter, system-ui, sans-serif";
        ctx.fillText("MADE AT DCPROSENS.COM • TEST YOUR AIM", W / 2, 917);
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.font = "600 13px Inter, system-ui, sans-serif";
        ctx.fillText("Verified Telemetry • dcprosens.com", W / 2, 912);
      }
    },
    [
      mode,
      activeTheme,
      gameTag,
      hookTitle,
      leftName,
      leftSub,
      leftPct,
      rightName,
      rightSub,
      rightPct,
      hudSensText,
      creatorHandle,
      canExportWatermarkFree,
    ]
  );

  // Live preview loop
  useEffect(() => {
    let rafId: number;
    let start = performance.now();
    const render = (now: number) => {
      const canvas = canvasRef.current;
      if (canvas && !isRecording) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const t = ((now - start) % 4000) / 4000;
          drawFrame(ctx, t);
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [drawFrame, isRecording]);

  const handleExportVideo = () => {
    if (!canExportAtAll) {
      setCheckoutPlan("creator-100");
      setCheckoutOpen(true);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas || typeof MediaRecorder === "undefined") return;

    setIsRecording(true);
    setRecordProgress(0);
    setExportedUrl(null);

    if (mode === "clip_overlay" && videoElemRef.current) {
      videoElemRef.current.currentTime = 0;
      videoElemRef.current.play().catch(() => {});
    }

    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4_000_000 });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setExportedUrl(url);
      setIsRecording(false);
      setRecordProgress(100);

      // Deduct credit
      if (!isUnlimitedVip) {
        if (totalPaidCredits > 0) {
          const nextPaid = Math.max(0, localPaidCredits - 1);
          setLocalPaidCredits(nextPaid);
          try {
            localStorage.setItem("dcprosens_studio_paid_credits", String(nextPaid));
          } catch {
            // ignore
          }
        } else {
          const nextFree = localFreeUsed + 1;
          setLocalFreeUsed(nextFree);
          try {
            localStorage.setItem("dcprosens_studio_free_used", String(nextFree));
          } catch {
            // ignore
          }
        }
      }
    };

    recorder.start();
    const durationMs = 5000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(1, elapsed / durationMs);
      setRecordProgress(Math.round(pct * 100));
      const ctx = canvas.getContext("2d");
      if (ctx) drawFrame(ctx, pct);

      if (elapsed < durationMs) {
        requestAnimationFrame(step);
      } else {
        recorder.stop();
      }
    };
    requestAnimationFrame(step);
  };

  const handleDownloadSetupPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "dcprosens-setup-card-9x16.png";
    a.click();
  };

  const handleCopyNightbot = () => {
    const cmd = `!addcom !gta6sens ${creatorHandle} GTA VI Settings: ${hudSensText} — Convert yours 1:1 at https://dcprosens.com/gta-vi-sensitivity/`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).then(() => {
        setCopiedCommand(true);
        setTimeout(() => setCopiedCommand(false), 2500);
      });
    }
  };

  return (
    <div className={styles.toolWrapper}>
      {/* CREDIT BALANCE BAR */}
      <div
        className={styles.card}
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderColor: "rgba(0, 255, 157, 0.3)",
        }}
      >
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary, #00ff9d)", textTransform: "uppercase" }}>
            🎬 Studio Export Balance
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginTop: "0.2rem" }}>
            {isUnlimitedVip ? (
              "∞ Unlimited VIP Exports (Watermark-Free)"
            ) : totalPaidCredits > 0 ? (
              `${totalPaidCredits} Pro Watermark-Free Video Credits`
            ) : (
              `${freeRemaining} of ${FREE_EXPORTS_LIMIT} Free Exports Remaining (With Watermark)`
            )}
          </div>
          {user && (
            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              Signed in as {user.email}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              setCheckoutPlan("creator-100");
              setCheckoutOpen(true);
            }}
            className={styles.btnPrimary}
          >
            🔥 100 Videos — 50% OFF ($14.99)
          </button>
          <button
            type="button"
            onClick={() => {
              setCheckoutPlan("creator-25");
              setCheckoutOpen(true);
            }}
            className={styles.btnSecondary}
          >
            25 Videos ($9.99)
          </button>
        </div>
      </div>

      <div className={styles.grid2} style={{ alignItems: "start" }}>
        {/* LEFT COLUMN: CONTROLS */}
        <div className={styles.card} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setMode("vs_reel")}
              className={mode === "vs_reel" ? styles.btnPrimary : styles.btnSecondary}
              style={{ flex: 1 }}
            >
              ⚡ VS Comparison Video
            </button>
            <button
              type="button"
              onClick={() => setMode("clip_overlay")}
              className={mode === "clip_overlay" ? styles.btnPrimary : styles.btnSecondary}
              style={{ flex: 1 }}
            >
              🎥 Clip HUD Overlay
            </button>
          </div>

          {/* Quick Templates */}
          <div>
            <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              1-Click Viral Templates:
            </span>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  type="button"
                  onClick={() => {
                    setMode("vs_reel");
                    setHookTitle(tpl.hook);
                    setGameTag(tpl.game);
                    setLeftName(tpl.leftName);
                    setLeftSub(`${tpl.leftStat1} • ${tpl.leftStat2}`);
                    setLeftPct(tpl.leftScore);
                    setRightName(tpl.rightName);
                    setRightSub(`${tpl.rightStat1} • ${tpl.rightStat2}`);
                    setRightPct(tpl.rightScore);
                    setThemeId(tpl.theme);
                  }}
                  className={styles.btnSecondary}
                  style={{ fontSize: "0.76rem", padding: "0.4rem 0.7rem" }}
                >
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid2}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                Visual Theme
              </label>
              <select
                value={themeId}
                onChange={(e) => setThemeId(e.target.value as ThemeId)}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
              >
                {THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                Your Handle (@TikTok / Twitch)
              </label>
              <input
                type="text"
                value={creatorHandle}
                onChange={(e) => setCreatorHandle(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
              Viral 3-Second Hook Headline
            </label>
            <input
              type="text"
              value={hookTitle}
              onChange={(e) => setHookTitle(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
              Game Badge
            </label>
            <input
              type="text"
              value={gameTag}
              onChange={(e) => setGameTag(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
            />
          </div>

          {mode === "vs_reel" ? (
            <>
              <div className={styles.grid2}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Option A Title
                  </label>
                  <input
                    type="text"
                    value={leftName}
                    onChange={(e) => setLeftName(e.target.value)}
                    style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Option A Score ({leftPct})
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={leftPct}
                    onChange={(e) => setLeftPct(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#94a3b8", marginTop: "0.5rem" }}
                  />
                </div>
              </div>
              <div className={styles.grid2}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Option B Title (Winner)
                  </label>
                  <input
                    type="text"
                    value={rightName}
                    onChange={(e) => setRightName(e.target.value)}
                    style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                    Option B Score ({rightPct})
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={rightPct}
                    onChange={(e) => setRightPct(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary, #00ff9d)", marginTop: "0.5rem" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  Upload Gameplay Clip (MP4 / WebM — processed 100% locally)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setClipUrl(url);
                    }
                  }}
                  style={{ fontSize: "0.85rem", color: "#cbd5e1" }}
                />
                {clipUrl && (
                  <video
                    ref={videoElemRef}
                    src={clipUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    style={{ display: "none" }}
                  />
                )}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                  HUD Sensitivity Overlay Text
                </label>
                <input
                  type="text"
                  value={hudSensText}
                  onChange={(e) => setHudSensText(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "#08090c", color: "#fff", border: "1px solid var(--border-color, #2a2a2a)" }}
                />
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={handleExportVideo}
              disabled={isRecording}
              className={styles.btnPrimary}
              style={{ flex: "1 1 200px" }}
            >
              {isRecording
                ? `🎬 Rendering 9:16 Video (${recordProgress}%)...`
                : canExportAtAll
                ? "🎬 Export 9:16 Short Video (5s)"
                : "🔒 Unlock 100 Videos — 50% OFF ($14.99)"}
            </button>
            <button type="button" onClick={handleDownloadSetupPng} className={styles.btnSecondary}>
              🖼️ Save PNG Card
            </button>
          </div>

          {exportedUrl && (
            <div
              style={{
                padding: "0.9rem",
                borderRadius: "10px",
                background: "rgba(0, 255, 157, 0.08)",
                border: "1px solid rgba(0, 255, 157, 0.35)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--primary, #00ff9d)" }}>
                ✓ Video Rendered! Ready for TikTok, Shorts &amp; Reels.
              </span>
              <a
                href={exportedUrl}
                download="dcprosens-viral-9x16.webm"
                className={styles.btnPrimary}
                style={{ padding: "0.45rem 0.9rem", fontSize: "0.82rem", textDecoration: "none" }}
              >
                ⬇ Download Video
              </a>
            </div>
          )}

          {/* STREAMER LIVE COMMAND HELPER */}
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-color, #2a2a2a)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.6rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              📺 <strong>Live Streamers:</strong> Auto-reply <code>!gta6sens</code> command in Twitch / YouTube chat
            </span>
            <button type="button" onClick={handleCopyNightbot} className={styles.btnSecondary} style={{ fontSize: "0.78rem" }}>
              {copiedCommand ? "✓ Copied Nightbot Command!" : "📋 Copy !gta6sens Command"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE 9:16 PREVIEW CANVAS */}
        <div
          className={styles.card}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
        >
          <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Live 9:16 Vertical Preview (TikTok / Reels / Shorts)
          </div>
          <canvas
            ref={canvasRef}
            width={540}
            height={960}
            style={{
              width: "100%",
              maxWidth: "310px",
              aspectRatio: "9 / 16",
              borderRadius: "16px",
              border: "2px solid rgba(255,255,255,0.14)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>

      <StripeCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        plan={checkoutPlan}
      />
    </div>
  );
}
