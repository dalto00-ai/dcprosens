"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MonitorSimulator.module.css";

type SpeedSetting = "Slow" | "Medium" | "Fast";
type PanelSetting = "OLED" | "Fast IPS" | "TN" | "VA";
type BottomHzSetting = 240 | 360;

interface MonitorRecommendation {
  name: string;
  brand: string;
  panelType: string;
  hz: string;
  responseTime: string;
  price: string;
  badge: string;
  affiliateLink: string;
}

const RECOMMENDATIONS: MonitorRecommendation[] = [
  {
    name: "ASUS ROG Swift PG27AQDM",
    brand: "ASUS",
    panelType: "OLED",
    hz: "240Hz",
    responseTime: "0.03ms",
    price: "$799",
    badge: "Ultimate Motion Clarity",
    affiliateLink: "https://www.amazon.com/dp/B0BZR9T1M5",
  },
  {
    name: "BenQ ZOWIE XL2566K",
    brand: "BenQ ZOWIE",
    panelType: "TN (DyAc⁺)",
    hz: "360Hz",
    responseTime: "0.5ms",
    price: "$599",
    badge: "Esports Pro Choice",
    affiliateLink: "https://www.amazon.com/dp/B0BGLV299V",
  },
  {
    name: "LG UltraGear 27GR83Q-B",
    brand: "LG",
    panelType: "Fast IPS",
    hz: "240Hz",
    responseTime: "1ms",
    price: "$349",
    badge: "Best Value 240Hz",
    affiliateLink: "https://www.amazon.com/dp/B0C63HD5V8",
  },
  {
    name: "Gigabyte G24F 2",
    brand: "Gigabyte",
    panelType: "IPS",
    hz: "165Hz",
    responseTime: "1ms",
    price: "$149",
    badge: "Best Budget Gaming",
    affiliateLink: "https://www.amazon.com/dp/B0B586K79X",
  },
];

export default function MonitorSimulator() {
  const [speed, setSpeed] = useState<SpeedSetting>("Medium");
  const [panel, setPanel] = useState<PanelSetting>("Fast IPS");
  const [bottomHz, setBottomHz] = useState<BottomHzSetting>(360);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  // Speed values in pixels per second
  const getSpeedPx = (s: SpeedSetting) => {
    switch (s) {
      case "Slow":
        return 350;
      case "Medium":
        return 800;
      case "Fast":
        return 1500;
      default:
        return 800;
    }
  };

  // Trail count corresponding to response time
  const getTrailCount = (p: PanelSetting) => {
    switch (p) {
      case "OLED":
        return 0; // Instant response, no ghosting
      case "Fast IPS":
        return 2; // Very minor ghosting
      case "TN":
        return 4; // Low-to-moderate ghosting
      case "VA":
        return 12; // Heavy ghosting/black smearing
      default:
        return 2;
    }
  };

  // Stats specs
  const getStats = (hz: number) => {
    switch (hz) {
      case 60:
        return { frameTime: "16.7ms", inputLag: "16.7ms - 22.0ms", smoothness: "Low (Stuttery)" };
      case 144:
        return { frameTime: "6.9ms", inputLag: "6.9ms - 10.2ms", smoothness: "High (Fluid)" };
      case 240:
        return { frameTime: "4.2ms", inputLag: "4.2ms - 6.5ms", smoothness: "Ultra (Fluid)" };
      case 360:
        return { frameTime: "2.8ms", inputLag: "2.8ms - 4.1ms", smoothness: "Perfect (Esports)" };
      default:
        return { frameTime: "16.7ms", inputLag: "16.7ms", smoothness: "Low" };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hardcode logical dimensions for sharp rendering
    const logicalWidth = 1200;
    const logicalHeight = 450;
    canvas.width = logicalWidth;
    canvas.height = logicalHeight;

    let continuousX = 0;
    let lastTime = performance.now();

    // Lanes structure
    const lanes = {
      lane1: { hz: 60, currentX: 0, accumulator: 0, history: [] as number[] },
      lane2: { hz: 144, currentX: 0, accumulator: 0, history: [] as number[] },
      lane3: { hz: bottomHz, currentX: 0, accumulator: 0, history: [] as number[] },
    };

    const drawUfo = (x: number, y: number, opacity: number = 1, isGhost: boolean = false) => {
      ctx.save();
      ctx.globalAlpha = opacity;

      // Glow only for real UFO, not ghosts
      if (!isGhost && panel !== "VA") {
        ctx.shadowColor = "#00ff9d";
        ctx.shadowBlur = 8;
      }

      // 1. UFO Dome
      ctx.fillStyle = isGhost ? "rgba(0, 255, 157, 0.25)" : "rgba(0, 255, 157, 0.85)";
      ctx.beginPath();
      ctx.arc(x, y - 6, 18, Math.PI, 2 * Math.PI);
      ctx.fill();

      // Alien eye details
      if (!isGhost) {
        ctx.fillStyle = "#050507";
        ctx.beginPath();
        ctx.arc(x - 5, y - 11, 2.5, 0, 2 * Math.PI);
        ctx.arc(x + 5, y - 11, 2.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      // 2. UFO Saucer Body
      ctx.fillStyle = isGhost ? "rgba(112, 0, 255, 0.25)" : "#7000ff";
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 40, 10, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Rim Highlight
      ctx.strokeStyle = isGhost ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Cabin Lights
      const lightColors = ["#00ff9d", "#ffc800", "#00ff9d"];
      [-20, 0, 20].forEach((offset, idx) => {
        ctx.fillStyle = isGhost ? "rgba(255, 255, 255, 0.2)" : lightColors[idx];
        ctx.beginPath();
        ctx.arc(x + offset, y + 3, 3.5, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.restore();
    };

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Clean canvas
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // Draw background vertical stripes (moving lines make judder/stutter obvious)
      ctx.strokeStyle = "#121319";
      ctx.lineWidth = 2;
      for (let x = 0; x < logicalWidth; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, logicalHeight);
        ctx.stroke();
      }

      // Draw lane dividers
      ctx.strokeStyle = "#22232b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 150);
      ctx.lineTo(logicalWidth, 150);
      ctx.moveTo(0, 300);
      ctx.lineTo(logicalWidth, 300);
      ctx.stroke();

      // Update UFO physics speed
      const speedPx = getSpeedPx(speed);
      continuousX = (continuousX + speedPx * (delta / 1000)) % logicalWidth;

      // Update and Draw Lanes
      const keys: (keyof typeof lanes)[] = ["lane1", "lane2", "lane3"];
      keys.forEach((key, laneIdx) => {
        const lane = lanes[key];
        const centerY = laneIdx * 150 + 75;

        // Accumulate delta time
        lane.accumulator += delta;

        // Check frame duration based on simulation refresh rate
        const frameDuration = 1000 / lane.hz;
        let didUpdate = false;

        while (lane.accumulator >= frameDuration) {
          lane.currentX = continuousX;
          lane.history.push(continuousX);

          const maxHistory = 15;
          if (lane.history.length > maxHistory) {
            lane.history.shift();
          }

          lane.accumulator -= frameDuration;
          didUpdate = true;
        }

        // Draw Trails (Ghosting simulation)
        const trailCount = getTrailCount(panel);
        if (trailCount > 0 && lane.history.length > 0) {
          // Draw trails from oldest to newest
          const availableHistory = lane.history.slice(-trailCount);
          availableHistory.forEach((oldX, idx) => {
            const opacity = 0.3 * ((idx + 1) / availableHistory.length);
            drawUfo(oldX, centerY, opacity, true);
          });
        }

        // Draw active UFO
        drawUfo(lane.currentX, centerY);

        // Draw Info Tag overlays inside the canvas
        ctx.save();
        ctx.fillStyle = "rgba(10, 11, 15, 0.85)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(15, laneIdx * 150 + 15, 240, 34, 4);
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillStyle = key === "lane1" ? "#ff4a4a" : key === "lane2" ? "#a95fff" : "#00ff9d";
        ctx.fillText(`${lane.hz} Hz Simulator`, 28, laneIdx * 150 + 36);

        ctx.font = "12px monospace";
        ctx.fillStyle = "var(--text-secondary)";
        ctx.fillText(`Frame time: ${frameDuration.toFixed(1)}ms`, 150, laneIdx * 150 + 36);
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // Trigger loop
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [speed, panel, bottomHz]);

  const activeStats = [
    { hz: 60, title: "60 Hz Entry", css: styles.hzBadgeSecondary },
    { hz: 144, title: "144 Hz Standard", css: styles.hzBadgeSecondary },
    { hz: bottomHz, title: `${bottomHz} Hz Pro Target`, css: styles.hzBadgePrimary },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Simulation Controls Dashboard */}
      <div className={styles.controlsCard}>
        {/* Speed Option */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>🏃‍♂️ Motion Speed</span>
          <div className={styles.btnGrid}>
            {(["Slow", "Medium", "Fast"] as SpeedSetting[]).map((s) => (
              <button
                key={s}
                className={`${styles.controlBtn} ${speed === s ? styles.controlBtnActive : ""}`}
                onClick={() => setSpeed(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Panel Type Option */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>🖥️ Panel Ghosting / Response Time</span>
          <div className={styles.btnGrid}>
            {(["OLED", "Fast IPS", "TN", "VA"] as PanelSetting[]).map((p) => (
              <button
                key={p}
                className={`${styles.controlBtn} ${panel === p ? styles.controlBtnActive : ""}`}
                onClick={() => setPanel(p)}
              >
                {p} ({p === "OLED" ? "0.1ms" : p === "Fast IPS" ? "1ms" : p === "TN" ? "2ms" : "8ms"})
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Lane Refresh Rate Selector */}
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>⚡ Target Refresh Rate</span>
          <div className={styles.btnGrid}>
            {([240, 360] as BottomHzSetting[]).map((hz) => (
              <button
                key={hz}
                className={`${styles.controlBtn} ${bottomHz === hz ? styles.controlBtnActive : ""}`}
                onClick={() => setBottomHz(hz)}
              >
                {hz} Hz
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Viewport Canvas */}
      <div className={styles.canvasContainer}>
        <canvas className={styles.canvas} ref={canvasRef} />
      </div>

      {/* Stats Dashboard */}
      <div className={styles.statsSection}>
        {activeStats.map((lane) => {
          const stats = getStats(lane.hz);
          return (
            <div key={lane.hz} className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <span className={styles.controlLabel}>{lane.title}</span>
                <span className={`${styles.hzBadge} ${lane.css}`}>{lane.hz} Hz</span>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Frame Time</span>
                  <span className={styles.statVal}>{stats.frameTime}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Average Input Lag</span>
                  <span className={styles.statVal}>{stats.inputLag}</span>
                </div>
                <div className={styles.statItem} style={{ gridColumn: "span 2" }}>
                  <span className={styles.statLabel}>Visual Smoothness Rating</span>
                  <span
                    className={styles.statVal}
                    style={{
                      color:
                        lane.hz === 60
                          ? "#ff4a4a"
                          : lane.hz === 144
                          ? "#a95fff"
                          : "var(--primary)",
                    }}
                  >
                    {stats.smoothness}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Panel Differences Analysis */}
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
          Panel Types Analysis: OLED vs TN vs IPS vs VA
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Refresh rate (Hz) determines how many frames your monitor can output per second, but pixel response times (G2G) determine whether those frames look clear or smeared. In competitive shooters, high motion clarity is just as vital as high refresh rate.
        </p>

        <div className={styles.panelTableContainer}>
          <table className={styles.panelTable}>
            <thead>
              <tr>
                <th>Panel Type</th>
                <th>Avg. Response Time</th>
                <th>Motion Clarity</th>
                <th>Color Accuracy</th>
                <th>Contrast Ratio</th>
                <th>Best Suited For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: "var(--primary)" }}>OLED</td>
                <td style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>0.03ms - 0.1ms</td>
                <td style={{ fontWeight: 600, color: "var(--primary)" }}>Absolute Perfect (Instant)</td>
                <td>Excellent (Infinite Gamut)</td>
                <td style={{ fontFamily: "monospace" }}>Infinite : 1</td>
                <td>High-End Competitive & Immersion</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#00e0ff" }}>TN Panel</td>
                <td style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>0.5ms - 1ms</td>
                <td>Very High (Sharp Trails)</td>
                <td>Poor (Washed out)</td>
                <td style={{ fontFamily: "monospace" }}>1000 : 1</td>
                <td>Pure Esports Professionals</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#a95fff" }}>Fast IPS</td>
                <td style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>1ms - 2ms</td>
                <td>High (Clean / Light Trails)</td>
                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>Excellent (Wide gamut)</td>
                <td style={{ fontFamily: "monospace" }}>1000 : 1</td>
                <td>All-around Gaming & Content Creation</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#ff4a4a" }}>VA Panel</td>
                <td style={{ fontFamily: "monospace", color: "var(--text-primary)" }}>4ms - 8ms</td>
                <td>Low (Smearing in dark zones)</td>
                <td>Decent (Medium gamut)</td>
                <td style={{ fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>3000:1 - 5000:1</td>
                <td>Casual Gaming & Movies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Gaming Monitors (ItemList Structured Data schema source) */}
      <div className={styles.recommendationsSection}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
          🛒 Recommended Competitive Gaming Monitors
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Top-rated monitors for esports chosen based on panel speed, strobe tuning (ELMB/DyAc), and color performance.
        </p>

        <div className={styles.recommendationsGrid}>
          {RECOMMENDATIONS.map((mon) => (
            <div key={mon.name} className={styles.monitorCard}>
              <span className={styles.monitorTag}>{mon.badge}</span>
              <div className={styles.monitorName}>{mon.name}</div>
              <div className={styles.monitorSpecs}>
                <span>Brand: {mon.brand}</span>
                <span>Panel Type: {mon.panelType}</span>
                <span>Specs: {mon.hz} · {mon.responseTime} G2G</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {mon.price}
                </span>
                <a
                  href={mon.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={styles.buyBtn}
                  style={{ marginTop: 0, padding: "0.4rem 1rem" }}
                >
                  View Deals
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
