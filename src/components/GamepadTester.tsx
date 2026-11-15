'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HardwareTools.module.css';

interface AxisSnapshot {
  axes: number[];
  buttons: { pressed: boolean; value: number }[];
  id: string;
  mapping: string;
}

/**
 * Real-time browser Gamepad API tester with stick drift detection and trigger readouts.
 */
export default function GamepadTester() {
  const [gamepad, setGamepad] = useState<AxisSnapshot | null>(null);
  const [driftDetected, setDriftDetected] = useState(false);
  const [rumbleStatus, setRumbleStatus] = useState<string | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const poll = () => {
      const pads = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : [];
      const active = Array.from(pads).find((gp): gp is Gamepad => gp !== null);

      if (active) {
        const axes = Array.from(active.axes);
        const buttons = active.buttons.map((b) => ({ pressed: b.pressed, value: b.value }));
        setGamepad({
          axes,
          buttons,
          id: active.id,
          mapping: active.mapping || 'standard',
        });

        // Resting offsets between 1.5% and 8% indicate worn potentiometers or stick drift
        const hasDrift = axes.some((v) => Math.abs(v) > 0.015 && Math.abs(v) < 0.08);
        setDriftDetected(hasDrift);
      } else {
        setGamepad(null);
        setDriftDetected(false);
      }

      rafRef.current = requestAnimationFrame(poll);
    };

    window.addEventListener('gamepadconnected', poll);
    window.addEventListener('gamepaddisconnected', poll);
    rafRef.current = requestAnimationFrame(poll);

    return () => {
      window.removeEventListener('gamepadconnected', poll);
      window.removeEventListener('gamepaddisconnected', poll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const triggerRumble = async () => {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const active = Array.from(pads).find((gp): gp is Gamepad => gp !== null);
    const actuator = (active as Gamepad & {
      vibrationActuator?: {
        playEffect?: (type: string, opts: Record<string, number>) => Promise<unknown>;
      };
    })?.vibrationActuator;

    if (!actuator?.playEffect) {
      setRumbleStatus('Rumble not supported by this browser or controller.');
      return;
    }

    try {
      await actuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: 500,
        weakMagnitude: 0.75,
        strongMagnitude: 1.0,
      });
      setRumbleStatus('Dual-motor rumble pulse sent.');
    } catch {
      setRumbleStatus('Could not activate controller vibration.');
    }
  };

  if (!gamepad) {
    return (
      <div className={styles.panel} style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          No Controller Detected Yet
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
          Plug in your Xbox, PlayStation DualSense/DS4, or Hall-Effect controller via USB or Bluetooth and{' '}
          <strong style={{ color: 'var(--primary)' }}>press any button</strong> to wake the Gamepad API.
        </p>
      </div>
    );
  }

  const lx = gamepad.axes[0] || 0;
  const ly = gamepad.axes[1] || 0;
  const rx = gamepad.axes[2] || 0;
  const ry = gamepad.axes[3] || 0;
  const lt = gamepad.buttons[6]?.value || 0;
  const rt = gamepad.buttons[7]?.value || 0;

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div>
          <div className={styles.panelTitle}>{gamepad.id}</div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Mapping: {gamepad.mapping} · {gamepad.axes.length} Axes · {gamepad.buttons.length} Buttons
          </p>
        </div>

        <div className={styles.controlsRow}>
          {driftDetected ? (
            <span className={styles.badgeWarn}>Potential Stick Drift Detected (&lt;8% Deadzone)</span>
          ) : (
            <span className={styles.badgeOk}>Stick Center Clean</span>
          )}
          <button type="button" onClick={triggerRumble} className={`${styles.btn} ${styles.btnPrimary}`}>
            Test Vibration
          </button>
        </div>
      </div>

      {rumbleStatus && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{rumbleStatus}</p>
      )}

      <div className={styles.twoCol}>
        {/* Analog Stick & Trigger Visualizers */}
        <div className={styles.subBox}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
            Live Thumbstick &amp; Trigger Telemetry
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '1.5rem' }}>
            {[
              { label: 'Left Stick (L3)', x: lx, y: ly, click: gamepad.buttons[10]?.pressed },
              { label: 'Right Stick (R3)', x: rx, y: ry, click: gamepad.buttons[11]?.pressed },
            ].map((stick) => (
              <div key={stick.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '112px',
                    height: '112px',
                    borderRadius: '50%',
                    border: `2px solid ${stick.click ? 'var(--primary)' : 'rgba(255,255,255,0.16)'}`,
                    background: 'rgba(0,0,0,0.6)',
                    position: 'relative',
                    margin: '0 auto 0.5rem',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '38%',
                      borderRadius: '50%',
                      border: '1px dashed rgba(255,255,255,0.2)',
                    }}
                  />
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: stick.click ? '#fff' : 'var(--primary)',
                      boxShadow: '0 0 10px var(--primary-glow)',
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${stick.x * 42}px), calc(-50% + ${stick.y * 42}px))`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stick.label}</div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  X: {stick.x.toFixed(3)} · Y: {stick.y.toFixed(3)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            {[
              { label: 'LT / L2 Trigger', value: lt },
              { label: 'RT / R2 Trigger', value: rt },
            ].map((trig) => (
              <div key={trig.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                  <span>{trig.label}</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{Math.round(trig.value * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${trig.value * 100}%`, background: 'var(--primary)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Axes + Active Button Grid */}
        <div className={styles.subBox}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
            Axes &amp; Button States
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
            {gamepad.axes.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '54px', fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  AXIS {idx}
                </span>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: Math.abs(val) > 0.05 ? 'var(--primary)' : '#777',
                      left: `calc(${((val + 1) / 2) * 100}% - 6px)`,
                    }}
                  />
                </div>
                <span style={{ width: '52px', textAlign: 'right', fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                  {val.toFixed(3)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.4rem' }}>
            {gamepad.buttons.slice(0, 18).map((btn, i) => (
              <div
                key={i}
                style={{
                  padding: '0.4rem 0.25rem',
                  textAlign: 'center',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  border: `1px solid ${btn.pressed ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                  background: btn.pressed ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                  color: btn.pressed ? '#050507' : 'var(--text-muted)',
                }}
              >
                B{i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
