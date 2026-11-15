'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HardwareTools.module.css';

const TEST_COLORS = [
  { name: 'Pure Black', desc: 'Reveals bright stuck pixels & backlight bleed', bg: '#000000' },
  { name: 'Pure White', desc: 'Reveals dark dead pixels & panel uniformity', bg: '#ffffff' },
  { name: 'Pure Red', desc: 'Isolates defective red subpixels', bg: '#ff0000' },
  { name: 'Pure Green', desc: 'Isolates defective green subpixels', bg: '#00ff00' },
  { name: 'Pure Blue', desc: 'Isolates defective blue subpixels', bg: '#0000ff' },
];

/**
 * Fullscreen dead-pixel / stuck-pixel inspector paired with a live browser Hz & frame-drop readout.
 */
export default function DeadPixelTester() {
  const [hz, setHz] = useState(0);
  const [frameTime, setFrameTime] = useState(16.67);
  const [frameDrops, setFrameDrops] = useState(0);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let frames = 0;
    let windowStart = performance.now();
    let prevTs = 0;
    let currentHz = 60;

    const tick = (ts: number) => {
      if (prevTs > 0) {
        const delta = ts - prevTs;
        const expected = 1000 / Math.max(currentHz, 30);
        if (delta > expected * 1.75) {
          setFrameDrops((d) => d + 1);
        }
      }
      prevTs = ts;
      frames += 1;

      const elapsed = ts - windowStart;
      if (elapsed >= 500) {
        const measured = Math.round((frames * 1000) / elapsed);
        currentHz = measured;
        setHz(measured);
        setFrameTime(Number((1000 / Math.max(measured, 1)).toFixed(2)));
        frames = 0;
        windowStart = ts;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (fullscreenIdx === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenIdx(null);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setFullscreenIdx((idx) => (idx === null ? null : (idx + 1) % TEST_COLORS.length));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFullscreenIdx((idx) =>
          idx === null ? null : (idx - 1 + TEST_COLORS.length) % TEST_COLORS.length
        );
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreenIdx]);

  const openFullscreen = (index: number) => {
    setFullscreenIdx(index);
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const closeFullscreen = () => {
    setFullscreenIdx(null);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.panelTitle}>Display Uniformity, Dead Pixel &amp; Live Hz Monitor</div>
        <button type="button" onClick={() => openFullscreen(0)} className={`${styles.btn} ${styles.btnPrimary}`}>
          Launch Fullscreen Pixel Sweep
        </button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statChip}>
          Measured Refresh:<span className={styles.statVal}>{hz || '...'} Hz</span>
        </div>
        <div className={styles.statChip}>
          Frame Interval:<span className={styles.statVal}>{frameTime} ms</span>
        </div>
        <div className={styles.statChip}>
          Frame Stutters:<span className={styles.statVal}>{frameDrops}</span>
        </div>
      </div>

      <div className={styles.colorGrid}>
        {TEST_COLORS.map((c, idx) => (
          <button key={c.name} type="button" onClick={() => openFullscreen(idx)} className={styles.colorSwatch}>
            <div
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '6px',
                background: c.bg,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
            <span>{c.name}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 400, color: 'var(--text-muted)' }}>{c.desc}</span>
          </button>
        ))}
      </div>

      {fullscreenIdx !== null && (
        <div
          ref={overlayRef}
          className={styles.fullscreenOverlay}
          style={{ background: TEST_COLORS[fullscreenIdx].bg }}
          onClick={() => setFullscreenIdx((fullscreenIdx + 1) % TEST_COLORS.length)}
        >
          <div className={styles.fullscreenHud} onClick={(e) => e.stopPropagation()}>
            <strong>{TEST_COLORS[fullscreenIdx].name}</strong>
            <span>Click background or press Space/Arrows to cycle colors · Esc to exit</span>
            <button type="button" onClick={closeFullscreen} className={`${styles.btn} ${styles.btnPrimary}`}>
              Exit Fullscreen
            </button>
          </div>
          <div />
        </div>
      )}
    </div>
  );
}
