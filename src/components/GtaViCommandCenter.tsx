"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { StripeCheckoutModal, type CheckoutPlanId } from "@/components/StripeCheckoutModal";
import styles from "./HardwareTools.module.css";

type ActiveTab = "converter" | "deadzone" | "weapons" | "checklist";
type InputMode = "controller" | "mouse";
type SourceGameId = "warzone" | "fortnite" | "apex" | "gtav" | "valorant" | "cs2";
type PlaystyleId = "freeaim" | "partial" | "driveby" | "balanced";
type ControllerModelId = "dualsense" | "dualsense_edge" | "xbox_series" | "xbox_elite" | "hall_tmr";

interface SourceGameSpec {
  id: SourceGameId;
  name: string;
  yaw: number;
  defaultMouseSens: number;
  defaultControllerSens: number;
  controllerMaxScale: number;
  controllerLabel: string;
}

const SOURCE_GAMES: SourceGameSpec[] = [
  {
    id: "warzone",
    name: "CoD: Warzone / Black Ops 6",
    yaw: 0.0066,
    defaultMouseSens: 4.5,
    defaultControllerSens: 6,
    controllerMaxScale: 20,
    controllerLabel: "Stick Sensitivity (1–20)",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    yaw: 0.005555,
    defaultMouseSens: 6.2,
    defaultControllerSens: 43,
    controllerMaxScale: 100,
    controllerLabel: "Look Sensitivity % (1–100%)",
  },
  {
    id: "apex",
    name: "Apex Legends",
    yaw: 0.022,
    defaultMouseSens: 1.5,
    defaultControllerSens: 4,
    controllerMaxScale: 8,
    controllerLabel: "Look Sensitivity (1–8 / ALC)",
  },
  {
    id: "gtav",
    name: "GTA V / GTA Online",
    yaw: 0.022,
    defaultMouseSens: 1.5,
    defaultControllerSens: 65,
    controllerMaxScale: 100,
    controllerLabel: "Rockstar Slider % (0–100%)",
  },
  {
    id: "valorant",
    name: "Valorant",
    yaw: 0.07,
    defaultMouseSens: 0.4,
    defaultControllerSens: 6,
    controllerMaxScale: 10,
    controllerLabel: "Base Stick Level (1–10)",
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    yaw: 0.022,
    defaultMouseSens: 1.25,
    defaultControllerSens: 6,
    controllerMaxScale: 10,
    controllerLabel: "Stick Sensitivity (1–10)",
  },
];

interface ControllerPreset {
  id: ControllerModelId;
  name: string;
  factoryDriftPct: number;
  pollingHz: string;
  recommendedDeadzone: number;
  curveNote: string;
}

const CONTROLLER_PRESETS: ControllerPreset[] = [
  {
    id: "dualsense",
    name: "PS5 DualSense (Standard ALPS)",
    factoryDriftPct: 3.5,
    pollingHz: "250 Hz (Wired/BT)",
    recommendedDeadzone: 5,
    curveNote: "Standard ALPS potentiometers develop 3–5% center play. Keep Deadzone at 5–6% and Acceleration at 85%.",
  },
  {
    id: "dualsense_edge",
    name: "PS5 DualSense Edge (Pro Modules)",
    factoryDriftPct: 2.0,
    pollingHz: "1000 Hz (Wired USB-C)",
    recommendedDeadzone: 3,
    curveNote: "Use the 'Dynamic' or 'Precise' profile on the right stick with +1 curve step and 3% in-game deadzone.",
  },
  {
    id: "xbox_series",
    name: "Xbox Series X|S Wireless Controller",
    factoryDriftPct: 4.0,
    pollingHz: "125 Hz (Xbox Wireless)",
    recommendedDeadzone: 6,
    curveNote: "Slightly lighter stick tension (~60 gf). Set Deadzone to 6% and Aim Acceleration to 90% to prevent over-flicking.",
  },
  {
    id: "xbox_elite",
    name: "Xbox Elite Wireless Series 2",
    factoryDriftPct: 2.5,
    pollingHz: "125–250 Hz",
    recommendedDeadzone: 4,
    curveNote: "Set physical stick tension to the middle notch (level 2) on the right thumbstick for micro-aim precision.",
  },
  {
    id: "hall_tmr",
    name: "Hall Effect / TMR Pro Controller",
    factoryDriftPct: 0.8,
    pollingHz: "1000 Hz Low-Latency",
    recommendedDeadzone: 2,
    curveNote: "Magnetic sensors have near-zero mechanical center play. Run 1–2% deadzone and 100% linear acceleration.",
  },
];

interface WeaponClassSpec {
  id: string;
  name: string;
  category: string;
  baseTtkCloseMs: number;
  baseTtkMidMs: number;
  recoilVertical: number;
  recoilHorizontal: number;
  optimalRange: string;
  adsMultiplierRec: number;
  tacticalNote: string;
}

const WEAPON_CLASSES: WeaponClassSpec[] = [
  {
    id: "tactical_ar",
    name: "Tactical Carbine Rifle (AR Meta)",
    category: "Assault Rifle",
    baseTtkCloseMs: 390,
    baseTtkMidMs: 510,
    recoilVertical: 42,
    recoilHorizontal: 18,
    optimalRange: "18m – 55m",
    adsMultiplierRec: 0.78,
    tacticalNote: "Primary all-rounder for Vice City streets and Heist interiors. Pair with Compensator + Angled Grip to cut first-shot vertical jump by 24%.",
  },
  {
    id: "driveby_smg",
    name: "Micro Tactical SMG (120 MPH Drive-By)",
    category: "Submachine Gun",
    baseTtkCloseMs: 320,
    baseTtkMidMs: 640,
    recoilVertical: 55,
    recoilHorizontal: 34,
    optimalRange: "5m – 25m (Vehicle & CQB)",
    adsMultiplierRec: 0.92,
    tacticalNote: "Highest one-handed fire rate inside vehicles. Requires Vehicle Camera Sensitivity at 85%+ and L2+R2 (LT+RT) separate aim/fire bind.",
  },
  {
    id: "heavy_sniper",
    name: "Heavy Precision Rifle (.50 Cal)",
    category: "Sniper Rifle",
    baseTtkCloseMs: 180,
    baseTtkMidMs: 180,
    recoilVertical: 88,
    recoilHorizontal: 12,
    optimalRange: "60m – 250m (Rooftops & Causeways)",
    adsMultiplierRec: 0.62,
    tacticalNote: "One-shot upper-torso/head potential. Use 0% Monitor Distance Match (0.62x Zoom Scale) so flicks match your hipfire muscle memory.",
  },
  {
    id: "combat_shotgun",
    name: "Semi-Auto Tactical Shotgun",
    category: "Shotgun",
    baseTtkCloseMs: 210,
    baseTtkMidMs: 890,
    recoilVertical: 68,
    recoilHorizontal: 22,
    optimalRange: "2m – 12m (Interior Breaching)",
    adsMultiplierRec: 0.95,
    tacticalNote: "Dominates nightclub and motel room clears in Leonida. Keep Third-Person Field of View at maximum to track corner slide-peeks.",
  },
  {
    id: "ap_pistol",
    name: "Armor-Piercing Sidearm",
    category: "Pistol / Sidearm",
    baseTtkCloseMs: 360,
    baseTtkMidMs: 580,
    recoilVertical: 38,
    recoilHorizontal: 25,
    optimalRange: "8m – 28m",
    adsMultiplierRec: 0.88,
    tacticalNote: "Fastest swap time when your rifle mag empties mid-duel and top-tier accuracy for armored vehicle windshields.",
  },
];

interface ChecklistItem {
  id: string;
  category: "display" | "controls" | "tactical";
  title: string;
  detail: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "chk_120hz",
    category: "display",
    title: "Enable Performance Mode + 120Hz VRR Output (PS5 / Xbox Series X)",
    detail: "Cuts RAGE engine render queue input latency from ~78ms (30fps Fidelity) down to ~31ms.",
  },
  {
    id: "chk_blur",
    category: "display",
    title: "Set Motion Blur Strength to 0% & Depth of Field OFF",
    detail: "Eliminates ghosting smears during fast 180-degree camera turns and high-speed Vice City chases.",
  },
  {
    id: "chk_deadzone",
    category: "controls",
    title: "Lower Stick Deadzone to 3%–6% & Set Aim Acceleration to 85%–100%",
    detail: "Removes the sluggish Rockstar default center deadzone that causes delayed micro-aim response.",
  },
  {
    id: "chk_driveby",
    category: "controls",
    title: "Switch Drive-By Control from 'Fire Only' to 'Aim + Fire (L2+R2 / LT+RT)'",
    detail: "Prevents accidental shots while steering and gives independent crosshair stabilization at 120 MPH.",
  },
  {
    id: "chk_camera_height",
    category: "controls",
    title: "Set Vehicle Camera Height to HIGH & First-Person Auto-Center to OFF",
    detail: "Raises your sightline over traffic roofs and stops the vehicle camera from fighting your right stick.",
  },
  {
    id: "chk_fov",
    category: "tactical",
    title: "Maximize First-Person & Third-Person Field of View (FOV) Sliders",
    detail: "Wider horizontal FOV reduces perceived visual recoil by up to 22% on full-auto rifles and SMGs.",
  },
];

export default function GtaViCommandCenter() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("converter");
  const [inputMode, setInputMode] = useState<InputMode>("controller");
  const [sourceGame, setSourceGame] = useState<SourceGameId>("warzone");
  const [playstyle, setPlaystyle] = useState<PlaystyleId>("freeaim");

  // Converter state
  const [controllerSensInput, setControllerSensInput] = useState<number>(6);
  const [mouseSensInput, setMouseSensInput] = useState<number>(4.5);
  const [mouseDpiInput, setMouseDpiInput] = useState<number>(800);
  const [fovInput, setFovInput] = useState<number>(95);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);

  // Deadzone & Live Gamepad state
  const [controllerModel, setControllerModel] = useState<ControllerModelId>("dualsense");
  const [measuredDrift, setMeasuredDrift] = useState<number>(3.5);
  const [liveGamepadName, setLiveGamepadName] = useState<string | null>(null);
  const [liveStickDrift, setLiveStickDrift] = useState<number | null>(null);

  // Weapon Matrix state
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>("tactical_ar");
  const [barrelMod, setBarrelMod] = useState<"none" | "compensator" | "suppressor">("compensator");
  const [gripMod, setGripMod] = useState<"none" | "angled" | "vertical">("angled");
  const [opticMod, setOpticMod] = useState<"iron" | "holo" | "scope4x">("holo");

  // Checklist state
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    chk_120hz: true,
    chk_driveby: true,
  });

  // Stripe Checkout Modal state (Triple Pricing Ladder + Self-Serve Sponsor)
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlanId>("gta6-promo");

  const openStripePlan = (plan: CheckoutPlanId) => {
    setCheckoutPlan(plan);
    setCheckoutOpen(true);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dcprosens_gta6_checklist_v1");
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("dcprosens_gta6_checklist_v1", JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Update default input values when changing source game
  const currentSourceSpec = useMemo(
    () => SOURCE_GAMES.find((g) => g.id === sourceGame) || SOURCE_GAMES[0],
    [sourceGame]
  );

  const handleSourceGameChange = (newId: SourceGameId) => {
    setSourceGame(newId);
    const spec = SOURCE_GAMES.find((g) => g.id === newId);
    if (spec) {
      setMouseSensInput(spec.defaultMouseSens);
      setControllerSensInput(spec.defaultControllerSens);
    }
  };

  const handleControllerModelChange = (newId: ControllerModelId) => {
    setControllerModel(newId);
    const preset = CONTROLLER_PRESETS.find((c) => c.id === newId);
    if (preset) {
      setMeasuredDrift(preset.factoryDriftPct);
    }
  };

  // Poll connected gamepad when on Deadzone tab
  useEffect(() => {
    if (activeTab !== "deadzone" || typeof navigator === "undefined" || !navigator.getGamepads) {
      return;
    }
    let rafId: number;
    const poll = () => {
      const pads = navigator.getGamepads();
      const pad = pads ? Array.from(pads).find((p) => p && p.connected) : null;
      if (pad) {
        setLiveGamepadName(pad.id);
        const lx = pad.axes[0] || 0;
        const ly = pad.axes[1] || 0;
        const rx = pad.axes[2] || 0;
        const ry = pad.axes[3] || 0;
        const magL = Math.hypot(lx, ly);
        const magR = Math.hypot(rx, ry);
        const maxMag = Math.min(1, Math.max(magL, magR));
        const pct = Number((maxMag * 100).toFixed(1));
        setLiveStickDrift(pct);
      }
      rafId = requestAnimationFrame(poll);
    };
    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, [activeTab]);

  // Calculate 3-Scale GTA VI Sensitivity Output
  const calibrationResult = useMemo(() => {
    const playstyleMod =
      playstyle === "freeaim"
        ? 0.92
        : playstyle === "partial"
        ? 1.0
        : playstyle === "driveby"
        ? 1.12
        : 1.0;

    if (inputMode === "controller") {
      const normalizedRatio = Math.min(
        1,
        Math.max(0.05, controllerSensInput / currentSourceSpec.controllerMaxScale)
      );
      const thirdPersonLookPct = Math.min(100, Math.max(15, Math.round(normalizedRatio * 105 * playstyleMod)));
      const thirdPersonAimPct = Math.min(100, Math.max(10, Math.round(thirdPersonLookPct * 0.76)));
      const firstPersonAimPct = Math.min(100, Math.max(10, Math.round(thirdPersonLookPct * 0.68 * (fovInput / 90))));
      const vehicleCamPct = Math.min(100, Math.max(40, Math.round(Math.max(75, thirdPersonLookPct * 1.18))));
      const scopeScalePct = Math.min(100, Math.max(15, Math.round(firstPersonAimPct * 0.65)));
      const equivCm360 = Number((58 - normalizedRatio * 34).toFixed(1));

      return {
        thirdPersonLookPct,
        thirdPersonAimPct,
        firstPersonAimPct,
        vehicleCamPct,
        scopeScalePct,
        thirdPersonTicks: Math.round(thirdPersonLookPct / 10),
        adsTicks: Math.round(thirdPersonAimPct / 10),
        vehicleTicks: Math.round(vehicleCamPct / 10),
        equivCm360,
        mouseRawSens: null,
        mouseAdsSens: null,
        mouseVehicleSens: null,
      };
    } else {
      // Mouse cm/360 math using real engine yaw
      const safeSens = Math.max(0.01, mouseSensInput);
      const safeDpi = Math.max(100, mouseDpiInput);
      const cm360 = (360 * 2.54) / (currentSourceSpec.yaw * safeSens * safeDpi);
      // RAGE Engine baseline yaw constant (0.022 standard raw projection)
      const rageYaw = 0.022;
      const baseRageSens = ((360 * 2.54) / (cm360 * rageYaw * safeDpi)) * playstyleMod;
      const firstPersonAds = baseRageSens * 0.78 * (fovInput / 90);
      const vehicleMouseSens = baseRageSens * 1.35;

      // Map to 0-100% Rockstar slider equivalent
      const sliderPct = Math.min(100, Math.max(5, Math.round((45 / Math.max(10, cm360)) * 55)));

      return {
        thirdPersonLookPct: sliderPct,
        thirdPersonAimPct: Math.max(5, Math.round(sliderPct * 0.78)),
        firstPersonAimPct: Math.max(5, Math.round(sliderPct * 0.72)),
        vehicleCamPct: Math.min(100, Math.round(sliderPct * 1.25)),
        scopeScalePct: Math.max(5, Math.round(sliderPct * 0.62)),
        thirdPersonTicks: Math.round(sliderPct / 10),
        adsTicks: Math.round((sliderPct * 0.78) / 10),
        vehicleTicks: Math.min(10, Math.round((sliderPct * 1.25) / 10)),
        equivCm360: Number(cm360.toFixed(2)),
        mouseRawSens: Number(baseRageSens.toFixed(3)),
        mouseAdsSens: Number(firstPersonAds.toFixed(3)),
        mouseVehicleSens: Number(vehicleMouseSens.toFixed(3)),
      };
    }
  }, [inputMode, controllerSensInput, mouseSensInput, mouseDpiInput, fovInput, currentSourceSpec, playstyle]);

  // Deadzone calculation
  const currentControllerPreset = useMemo(
    () => CONTROLLER_PRESETS.find((c) => c.id === controllerModel) || CONTROLLER_PRESETS[0],
    [controllerModel]
  );

  const deadzoneResult = useMemo(() => {
    const safeInnerDeadzone = Math.min(25, Math.max(1, Math.ceil(measuredDrift + 1.5)));
    const outerThreshold = measuredDrift > 8 ? 92 : 98;
    const accelPct = controllerModel === "hall_tmr" ? 100 : playstyle === "freeaim" ? 88 : 85;
    const healthStatus =
      measuredDrift <= 2.5
        ? "Tournament Grade (Zero Drift)"
        : measuredDrift <= 5.5
        ? "Healthy Standard Stick"
        : measuredDrift <= 10
        ? "Moderate Wear (Compensated)"
        : "Severe Potentiometer Drift — Recalibrate";

    return {
      safeInnerDeadzone,
      outerThreshold,
      accelPct,
      healthStatus,
    };
  }, [measuredDrift, controllerModel, playstyle]);

  // Weapon Matrix calculation
  const selectedWeapon = useMemo(
    () => WEAPON_CLASSES.find((w) => w.id === selectedWeaponId) || WEAPON_CLASSES[0],
    [selectedWeaponId]
  );

  const weaponStats = useMemo(() => {
    let vRec = selectedWeapon.recoilVertical;
    let hRec = selectedWeapon.recoilHorizontal;
    let ttkClose = selectedWeapon.baseTtkCloseMs;
    let ttkMid = selectedWeapon.baseTtkMidMs;

    if (barrelMod === "compensator") {
      vRec = Math.round(vRec * 0.78);
    } else if (barrelMod === "suppressor") {
      vRec = Math.round(vRec * 0.94);
      ttkMid = Math.round(ttkMid * 1.04);
    }

    if (gripMod === "angled") {
      hRec = Math.round(hRec * 0.76);
    } else if (gripMod === "vertical") {
      vRec = Math.round(vRec * 0.84);
    }

    const opticZoomMod = opticMod === "scope4x" ? 0.65 : opticMod === "holo" ? 0.92 : 1.0;
    const recommendedAdsPct = Math.max(
      10,
      Math.round(calibrationResult.thirdPersonAimPct * selectedWeapon.adsMultiplierRec * opticZoomMod)
    );

    return {
      vRec,
      hRec,
      ttkClose,
      ttkMid,
      recommendedAdsPct,
      stabilityScore: Math.min(99, Math.max(20, 100 - Math.round(vRec * 0.55 + hRec * 0.45))),
    };
  }, [selectedWeapon, barrelMod, gripMod, opticMod, calibrationResult.thirdPersonAimPct]);

  const handleCopyConfig = () => {
    const text = [
      `=== DCPROSENS GTA VI COMMAND CENTER CONFIG ===`,
      `Input Mode: ${inputMode === "controller" ? "Controller (PS5/Xbox)" : `Mouse & Keyboard (${mouseDpiInput} DPI)`}`,
      `Source Profile: ${currentSourceSpec.name} | Playstyle: ${playstyle.toUpperCase()}`,
      `3rd-Person Look Sensitivity: ${calibrationResult.thirdPersonLookPct}% (${calibrationResult.thirdPersonTicks}/10 Bars)`,
      `3rd-Person Aiming (ADS): ${calibrationResult.thirdPersonAimPct}% (${calibrationResult.adsTicks}/10 Bars)`,
      `1st-Person Aiming (FOV ${fovInput}°): ${calibrationResult.firstPersonAimPct}%`,
      `Vehicle & 120 MPH Drive-By Camera: ${calibrationResult.vehicleCamPct}% (${calibrationResult.vehicleTicks}/10 Bars)`,
      `Sniper / Scope MDM Scale: ${calibrationResult.scopeScalePct}%`,
      `Inner Stick Deadzone: ${deadzoneResult.safeInnerDeadzone}% | Aim Acceleration: ${deadzoneResult.accelPct}%`,
      `Calibrated at: https://dcprosens.com/gta-vi-sensitivity/`,
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedConfig(true);
        setTimeout(() => setCopiedConfig(false), 2500);
      });
    }
  };

  const completedCount = CHECKLIST_ITEMS.filter((item) => checkedIds[item.id]).length;

  return (
    <div className={styles.toolWrapper}>
      {/* TOP NAVIGATION TABS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          marginBottom: "1.5rem",
          padding: "0.5rem",
          background: "rgba(15, 16, 20, 0.9)",
          border: "1px solid var(--border-color, #2a2a2a)",
          borderRadius: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("converter")}
          className={activeTab === "converter" ? styles.btnPrimary : styles.btnSecondary}
          style={{ flex: "1 1 200px", textAlign: "center" }}
        >
          🎯 1. 3-Scale Sens Converter
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("deadzone")}
          className={activeTab === "deadzone" ? styles.btnPrimary : styles.btnSecondary}
          style={{ flex: "1 1 200px", textAlign: "center" }}
        >
          🎮 2. Deadzone &amp; Drift Lab
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("weapons")}
          className={activeTab === "weapons" ? styles.btnPrimary : styles.btnSecondary}
          style={{ flex: "1 1 200px", textAlign: "center" }}
        >
          🔫 3. Meta Weapons &amp; Recoil
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("checklist")}
          className={activeTab === "checklist" ? styles.btnPrimary : styles.btnSecondary}
          style={{ flex: "1 1 200px", textAlign: "center" }}
        >
          ⚡ 4. 120Hz &amp; Launch Checklist ({completedCount}/{CHECKLIST_ITEMS.length})
        </button>
      </div>

      {/* TAB 1: 3-SCALE CONVERTER */}
      {activeTab === "converter" && (
        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarGroup}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Platform Input:
              </span>
              <button
                type="button"
                onClick={() => setInputMode("controller")}
                className={inputMode === "controller" ? styles.btnPrimary : styles.btnSecondary}
              >
                🎮 PS5 / Xbox Controller
              </button>
              <button
                type="button"
                onClick={() => setInputMode("mouse")}
                className={inputMode === "mouse" ? styles.btnPrimary : styles.btnSecondary}
              >
                🖱️ Mouse &amp; Keyboard
              </button>
            </div>

            <div className={styles.toolbarGroup}>
              <button type="button" onClick={handleCopyConfig} className={styles.btnSecondary}>
                {copiedConfig ? "✓ Copied GTA VI Profile!" : "📋 Copy Full GTA VI Config"}
              </button>
            </div>
          </div>

          <div className={styles.grid2} style={{ marginBottom: "1.5rem" }}>
            {/* LEFT COLUMN: INPUTS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="gta6-source-game"
                  style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                >
                  Convert From Your Primary Game
                </label>
                <select
                  id="gta6-source-game"
                  value={sourceGame}
                  onChange={(e) => handleSourceGameChange(e.target.value as SourceGameId)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "#08090c",
                    color: "#fff",
                    border: "1px solid var(--border-color, #2a2a2a)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  {SOURCE_GAMES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              {inputMode === "controller" ? (
                <div>
                  <label
                    htmlFor="gta6-controller-sens"
                    style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                  >
                    <span>Your {currentSourceSpec.name} {currentSourceSpec.controllerLabel}</span>
                    <strong style={{ color: "var(--primary, #00ff9d)" }}>{controllerSensInput}</strong>
                  </label>
                  <input
                    id="gta6-controller-sens"
                    type="range"
                    min={1}
                    max={currentSourceSpec.controllerMaxScale}
                    step={1}
                    value={controllerSensInput}
                    onChange={(e) => setControllerSensInput(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary, #00ff9d)" }}
                  />
                </div>
              ) : (
                <div className={styles.grid2}>
                  <div>
                    <label
                      htmlFor="gta6-mouse-sens"
                      style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                    >
                      In-Game Mouse Sens
                    </label>
                    <input
                      id="gta6-mouse-sens"
                      type="number"
                      step="0.05"
                      min="0.05"
                      max="100"
                      value={mouseSensInput}
                      onChange={(e) => setMouseSensInput(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "8px",
                        background: "#08090c",
                        color: "#fff",
                        border: "1px solid var(--border-color, #2a2a2a)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gta6-mouse-dpi"
                      style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                    >
                      Mouse DPI
                    </label>
                    <input
                      id="gta6-mouse-dpi"
                      type="number"
                      step="50"
                      min="100"
                      max="32000"
                      value={mouseDpiInput}
                      onChange={(e) => setMouseDpiInput(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "8px",
                        background: "#08090c",
                        color: "#fff",
                        border: "1px solid var(--border-color, #2a2a2a)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className={styles.grid2}>
                <div>
                  <label
                    htmlFor="gta6-playstyle"
                    style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                  >
                    Leonida Combat Profile
                  </label>
                  <select
                    id="gta6-playstyle"
                    value={playstyle}
                    onChange={(e) => setPlaystyle(e.target.value as PlaystyleId)}
                    style={{
                      width: "100%",
                      padding: "0.65rem",
                      borderRadius: "8px",
                      background: "#08090c",
                      color: "#fff",
                      border: "1px solid var(--border-color, #2a2a2a)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <option value="freeaim">Free-Aim Competitive PVP (0% Snap Lock)</option>
                    <option value="partial">Assisted Aim - Partial (Balanced Tracking)</option>
                    <option value="driveby">120 MPH Vehicle &amp; Drive-By Specialist</option>
                    <option value="balanced">Story Mode &amp; Exploration All-Rounder</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="gta6-fov"
                    style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                  >
                    <span>Target Field of View (FOV)</span>
                    <strong style={{ color: "var(--primary, #00ff9d)" }}>{fovInput}°</strong>
                  </label>
                  <input
                    id="gta6-fov"
                    type="range"
                    min={75}
                    max={110}
                    step={1}
                    value={fovInput}
                    onChange={(e) => setFovInput(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary, #00ff9d)", marginTop: "0.4rem" }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ROCKSTAR 3-SCALE SLIDER VISUALIZER */}
            <div
              style={{
                background: "rgba(5, 5, 7, 0.75)",
                border: "1px solid rgba(0, 255, 157, 0.22)",
                borderRadius: "12px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.9rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--primary, #00ff9d)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Verified RAGE 3-Scale Calibration
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  Arc: <strong>{calibrationResult.equivCm360} cm/360°</strong>
                </span>
              </div>

              {/* Scale 1: 3rd Person */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>1. Third-Person Look &amp; Hipfire</span>
                  <strong style={{ color: "#fff" }}>
                    {calibrationResult.thirdPersonLookPct}% ({calibrationResult.thirdPersonTicks}/10 Bars)
                  </strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: `${calibrationResult.thirdPersonLookPct}%` }} />
                </div>
              </div>

              {/* Scale 2: ADS & 1st Person */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>2. Third/First-Person Aiming (ADS)</span>
                  <strong style={{ color: "var(--primary, #00ff9d)" }}>
                    {calibrationResult.thirdPersonAimPct}% ({calibrationResult.adsTicks}/10 Bars)
                  </strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: `${calibrationResult.thirdPersonAimPct}%` }} />
                </div>
              </div>

              {/* Scale 3: Vehicle & Drive-By */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span>3. Vehicle &amp; 120 MPH Drive-By Camera</span>
                  <strong style={{ color: "#38bdf8" }}>
                    {calibrationResult.vehicleCamPct}% ({calibrationResult.vehicleTicks}/10 Bars)
                  </strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${calibrationResult.vehicleCamPct}%`, background: "linear-gradient(90deg, #0ea5e9, #38bdf8)" }}
                  />
                </div>
              </div>

              {inputMode === "mouse" && calibrationResult.mouseRawSens !== null && (
                <div
                  style={{
                    marginTop: "0.25rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>Raw Mouse Multiplier: <strong style={{ color: "#fff" }}>{calibrationResult.mouseRawSens}</strong></span>
                  <span>ADS Multiplier: <strong style={{ color: "var(--primary, #00ff9d)" }}>{calibrationResult.mouseAdsSens}</strong></span>
                  <span>Vehicle: <strong style={{ color: "#38bdf8" }}>{calibrationResult.mouseVehicleSens}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* KPI METRIC CARDS */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>3rd-Person Aim Scale</div>
              <div className={`${styles.statValue} ${styles.statAccent}`}>{calibrationResult.thirdPersonAimPct}%</div>
              <div className={styles.statSub}>{calibrationResult.adsTicks} / 10 Rockstar Slider Bars</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>1st-Person FOV-Matched</div>
              <div className={styles.statValue}>{calibrationResult.firstPersonAimPct}%</div>
              <div className={styles.statSub}>Calibrated for {fovInput}° Horizontal FOV</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Drive-By Camera Scale</div>
              <div className={styles.statValue} style={{ color: "#38bdf8" }}>{calibrationResult.vehicleCamPct}%</div>
              <div className={styles.statSub}>Camera Height: HIGH | Auto-Center: OFF</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Sniper Scope (0% MDM)</div>
              <div className={styles.statValue}>{calibrationResult.scopeScalePct}%</div>
              <div className={styles.statSub}>1:1 Focal Length Flick Consistency</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEADZONE & DRIFT LAB */}
      {activeTab === "deadzone" && (
        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                PS5 DualSense &amp; Xbox Stick Deadzone Calibrator
              </h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Connect your controller via USB/Bluetooth for live drift telemetry or select your controller hardware preset below.
              </p>
            </div>
            <Link href="/gamepad-tester/" className={styles.btnSecondary} prefetch={false}>
              🕹️ Open Full Circularity Tester
            </Link>
          </div>

          {liveGamepadName ? (
            <div
              style={{
                padding: "0.85rem 1.1rem",
                marginBottom: "1.25rem",
                borderRadius: "10px",
                background: "rgba(0, 255, 157, 0.08)",
                border: "1px solid rgba(0, 255, 157, 0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <span style={{ fontSize: "0.88rem", color: "#fff" }}>
                🟢 <strong>Live Controller Detected:</strong> {liveGamepadName} — Resting Stick Deflection:{" "}
                <strong style={{ color: "var(--primary, #00ff9d)" }}>{liveStickDrift ?? 0}%</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (liveStickDrift !== null) setMeasuredDrift(Math.max(0.5, liveStickDrift));
                }}
                className={styles.btnPrimary}
                style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}
              >
                Use Live Drift ({liveStickDrift ?? 0}%)
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "1.25rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border-color, #2a2a2a)",
                fontSize: "0.83rem",
                color: "var(--text-secondary)",
              }}
            >
              💡 <strong>Tip:</strong> Press any button on a connected PS5 DualSense or Xbox controller to read your real resting stick drift automatically, or pick your controller model below.
            </div>
          )}

          <div className={styles.grid2} style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="gta6-controller-model"
                  style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                >
                  Select Your Controller Hardware
                </label>
                <select
                  id="gta6-controller-model"
                  value={controllerModel}
                  onChange={(e) => handleControllerModelChange(e.target.value as ControllerModelId)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "#08090c",
                    color: "#fff",
                    border: "1px solid var(--border-color, #2a2a2a)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  {CONTROLLER_PRESETS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.pollingHz})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="gta6-drift-slider"
                  style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                >
                  <span>Measured Resting Stick Drift (%)</span>
                  <strong style={{ color: "var(--primary, #00ff9d)" }}>{measuredDrift.toFixed(1)}%</strong>
                </label>
                <input
                  id="gta6-drift-slider"
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={measuredDrift}
                  onChange={(e) => setMeasuredDrift(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--primary, #00ff9d)" }}
                />
              </div>

              <div
                style={{
                  padding: "0.9rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "3px solid var(--primary, #00ff9d)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                <strong style={{ color: "#fff" }}>Hardware Lab Note:</strong> {currentControllerPreset.curveNote}
              </div>
            </div>

            <div className={styles.statsRow} style={{ margin: 0, gridTemplateColumns: "1fr 1fr" }}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Optimal GTA VI Deadzone</div>
                <div className={`${styles.statValue} ${styles.statAccent}`}>{deadzoneResult.safeInnerDeadzone}%</div>
                <div className={styles.statSub}>Zero Phantom Drift Margin (+1.5%)</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Aim Acceleration</div>
                <div className={styles.statValue}>{deadzoneResult.accelPct}%</div>
                <div className={styles.statSub}>Cuts RAGE Stick Ramp Delay</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Outer Stick Threshold</div>
                <div className={styles.statValue}>{deadzoneResult.outerThreshold}%</div>
                <div className={styles.statSub}>Instant 100% Turn Rate</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Sensor Status</div>
                <div className={styles.statValue} style={{ fontSize: "1rem", lineHeight: 1.3 }}>
                  {deadzoneResult.healthStatus}
                </div>
                <div className={styles.statSub}>{currentControllerPreset.pollingHz}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: META WEAPONS & RECOIL MATRIX */}
      {activeTab === "weapons" && (
        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                Vice City Weapon Archetypes, TTK &amp; Recoil Loadout Matrix
              </h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Select a weapon archetype and attachment combo to calculate recoil reduction and your exact ADS sensitivity multiplier.
              </p>
            </div>
          </div>

          <div className={styles.grid2} style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div>
                <label
                  htmlFor="gta6-weapon-select"
                  style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem" }}
                >
                  Select Weapon Archetype
                </label>
                <select
                  id="gta6-weapon-select"
                  value={selectedWeaponId}
                  onChange={(e) => setSelectedWeaponId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "#08090c",
                    color: "#fff",
                    border: "1px solid var(--border-color, #2a2a2a)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  {WEAPON_CLASSES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.grid3}>
                <div>
                  <label
                    htmlFor="gta6-barrel-mod"
                    style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem" }}
                  >
                    Muzzle / Barrel
                  </label>
                  <select
                    id="gta6-barrel-mod"
                    value={barrelMod}
                    onChange={(e) => setBarrelMod(e.target.value as "none" | "compensator" | "suppressor")}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: "#08090c",
                      color: "#fff",
                      border: "1px solid var(--border-color, #2a2a2a)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <option value="compensator">Compensator (-22% V-Recoil)</option>
                    <option value="suppressor">Tactical Suppressor (Stealth)</option>
                    <option value="none">Standard Muzzle</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="gta6-grip-mod"
                    style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem" }}
                  >
                    Underbarrel Grip
                  </label>
                  <select
                    id="gta6-grip-mod"
                    value={gripMod}
                    onChange={(e) => setGripMod(e.target.value as "none" | "angled" | "vertical")}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: "#08090c",
                      color: "#fff",
                      border: "1px solid var(--border-color, #2a2a2a)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <option value="angled">Angled Grip (-24% H-Bounce)</option>
                    <option value="vertical">Vertical Foregrip (-16% Climb)</option>
                    <option value="none">No Underbarrel</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="gta6-optic-mod"
                    style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem" }}
                  >
                    Optic Sight
                  </label>
                  <select
                    id="gta6-optic-mod"
                    value={opticMod}
                    onChange={(e) => setOpticMod(e.target.value as "iron" | "holo" | "scope4x")}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: "#08090c",
                      color: "#fff",
                      border: "1px solid var(--border-color, #2a2a2a)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <option value="holo">1.25x Holo / Red Dot</option>
                    <option value="iron">1.0x Iron Sights</option>
                    <option value="scope4x">4.0x Combat Scope</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  padding: "0.9rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "3px solid var(--primary, #00ff9d)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                <strong style={{ color: "#fff" }}>Tactical Meta Note:</strong> {selectedWeapon.tacticalNote}
              </div>
            </div>

            <div className={styles.statsRow} style={{ margin: 0, gridTemplateColumns: "1fr 1fr" }}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Close-Range TTK (15m)</div>
                <div className={`${styles.statValue} ${styles.statAccent}`}>{weaponStats.ttkClose} ms</div>
                <div className={styles.statSub}>Optimal Range: {selectedWeapon.optimalRange}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Mid-Range TTK (40m)</div>
                <div className={styles.statValue}>{weaponStats.ttkMid} ms</div>
                <div className={styles.statSub}>Upper-Torso / Head Burst</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Recoil Control Stability</div>
                <div className={styles.statValue} style={{ color: "#38bdf8" }}>{weaponStats.stabilityScore} / 100</div>
                <div className={styles.statSub}>
                  V-Climb: {weaponStats.vRec} | H-Drift: {weaponStats.hRec}
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Matched ADS Sensitivity</div>
                <div className={`${styles.statValue} ${styles.statAccent}`}>{weaponStats.recommendedAdsPct}%</div>
                <div className={styles.statSub}>0% MDM Recoil-Sweetspot</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 120HZ & DAY-ONE CHECKLIST */}
      {activeTab === "checklist" && (
        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                GTA VI Day-One Zero-Latency &amp; Vice City Calibration Checklist
              </h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Your progress is saved automatically in your browser so you can check off each setting on your phone or second monitor on launch day.
              </p>
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--primary, #00ff9d)" }}>
              {completedCount} of {CHECKLIST_ITEMS.length} Completed
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {CHECKLIST_ITEMS.map((item) => {
              const checked = !!checkedIds[item.id];
              return (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.9rem",
                    padding: "1rem 1.15rem",
                    borderRadius: "10px",
                    background: checked ? "rgba(0, 255, 157, 0.06)" : "rgba(255, 255, 255, 0.02)",
                    border: checked ? "1px solid rgba(0, 255, 157, 0.35)" : "1px solid var(--border-color, #2a2a2a)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(item.id)}
                    style={{ marginTop: "0.25rem", width: "18px", height: "18px", accentColor: "var(--primary, #00ff9d)" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: checked ? "var(--primary, #00ff9d)" : "#fff" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                      {item.detail}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* TRIPLE PRICING LADDER (PROMO + VIP SUBSCRIPTION + LIFETIME MASTER) */}
      <div
        style={{
          marginTop: "2.25rem",
          padding: "2rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(180deg, rgba(15, 16, 22, 0.96) 0%, rgba(8, 9, 13, 0.98) 100%)",
          border: "1px solid rgba(0, 255, 157, 0.25)",
        }}
      >
        <div id="gta6-pricing" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 1.75rem", scrollMarginTop: "5rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.28rem 0.9rem",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(0, 255, 157, 0.14)",
              color: "var(--primary, #00ff9d)",
              marginBottom: "0.65rem",
            }}
          >
            🔥 GTA VI Launch Special — Instant Access
          </span>
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>
            Unlock Pro Vice City Presets, PDF Field Guides &amp; Syndicate Hub
          </h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Choose the tier that fits your setup — one-time Day-One Pack, monthly VIP access, or Lifetime Founder unlock.
          </p>
        </div>

        <div className={styles.grid3}>
          {/* 1. LAUNCH PROMO ($7.99) */}
          <div
            style={{
              background: "#0a0b10",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#facc15", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                ⚡ 50% OFF Launch Flash Deal
              </div>
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                Day-One Calibration Pack
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.9rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--primary, #00ff9d)" }}>$7.99</span>
                <span style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "line-through" }}>$14.99</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>one-time</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.84rem", color: "#cbd5e1" }}>
                <li>✓ 11-Page GTA VI Complete Launch Bible PDF</li>
                <li>✓ 61 Cheat Codes &amp; 55-Trophy Platinum Roadmap</li>
                <li>✓ PS5 Pro 30 FPS HDR, Deadzone &amp; Classic Fix</li>
                <li>✓ Instant Download — No Subscription</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => openStripePlan("gta6-promo")}
              className={styles.btnSecondary}
              style={{ width: "100%", textAlign: "center", fontWeight: 700 }}
            >
              Get Launch Pack ($7.99)
            </button>
          </div>

          {/* 2. VIP MONTHLY ($4.99/mo) */}
          <div
            style={{
              background: "#0a0b10",
              border: "2px solid var(--primary, #00ff9d)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
              boxShadow: "0 8px 30px rgba(0, 255, 157, 0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--primary, #00ff9d)", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                💎 Most Popular — Leonida VIP
              </div>
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                Pro + Syndicate VIP Pass
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", marginBottom: "0.9rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "#fff" }}>$4.99</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>/ month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.84rem", color: "#fff" }}>
                <li>✓ Full GTA VI Syndicate &amp; Crew LFG Hub</li>
                <li>✓ Weekly GTA VI Meta &amp; Patch Updates</li>
                <li>✓ Full Aim Lab 3D + Cloud Config Sync</li>
                <li>✓ Cancel Anytime — Multi-Game Channels</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => openStripePlan("gta6-vip-monthly")}
              className={styles.btnPrimary}
              style={{ width: "100%", textAlign: "center" }}
            >
              Unlock VIP Pass ($4.99/mo)
            </button>
          </div>

          {/* 3. LIFETIME ALL-IN ($39.99) */}
          <div
            style={{
              background: "#0a0b10",
              border: "1px solid rgba(112, 0, 255, 0.45)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#c084fc", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                👑 Best Value — Zero Monthly Fees
              </div>
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                Founder Lifetime + 18 eBooks
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.9rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "#c084fc" }}>$39.99</span>
                <span style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "line-through" }}>$129.00</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>lifetime</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.84rem", color: "#cbd5e1" }}>
                <li>✓ Permanent Founder VIP Community Access</li>
                <li>✓ All 18 Esports Technical Field Guides PDF</li>
                <li>✓ All Future GTA VI Online &amp; PC Tools</li>
                <li>✓ Gold Founder Badge — Pay Once Forever</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => openStripePlan("master-omnibus-18vol")}
              className={styles.btnSecondary}
              style={{ width: "100%", textAlign: "center", borderColor: "rgba(192, 132, 252, 0.5)", color: "#e9d5ff", fontWeight: 700 }}
            >
              Claim Lifetime + 18 Vols ($39.99)
            </button>
          </div>
        </div>

        {/* SELF-SERVE FEATURED PARTNER / SPONSOR BANNER */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <strong style={{ color: "#fff", fontSize: "0.95rem" }}>
              📢 Sponsor the GTA VI Command Center (Discord Crews, Brands &amp; Streamers)
            </strong>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              Reserve a 7-day Featured Partner placement across our GTA VI &amp; Hardware diagnostic suite with instant Stripe booking.
            </div>
          </div>
          <button
            type="button"
            onClick={() => openStripePlan("sponsor-weekly")}
            className={styles.btnSecondary}
            style={{ fontSize: "0.85rem", fontWeight: 700 }}
          >
            ⚡ Book 7-Day Slot ($49)
          </button>
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
