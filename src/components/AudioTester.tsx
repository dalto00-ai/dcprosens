'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HardwareTools.module.css';

type AudioMode = 'left' | 'center' | 'right' | 'bass' | 'treble' | null;

const BAR_HEIGHTS_IDLE = [16, 22, 18, 28, 20, 32, 24, 18, 26, 30, 22, 16, 20, 28, 34, 22, 18, 26, 20, 24];
const BAR_HEIGHTS_ACTIVE = [38, 64, 52, 86, 70, 94, 62, 82, 90, 58, 76, 88, 66, 92, 74, 60, 84, 54, 72, 46];

/**
 * Web Audio stereo channel, sub-bass, high-treble, and 20Hz-20kHz frequency sweep tester.
 */
export default function AudioTester() {
  const [activeChannel, setActiveChannel] = useState<AudioMode>(null);
  const [sweepFreq, setSweepFreq] = useState<number | null>(null);
  const sweepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const stopAudio = () => {
    if (sweepTimerRef.current) {
      clearInterval(sweepTimerRef.current);
      sweepTimerRef.current = null;
    }
    if (ctxRef.current && ctxRef.current.state !== 'closed') {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    setActiveChannel(null);
    setSweepFreq(null);
  };

  useEffect(() => stopAudio, []);

  const playTone = (mode: Exclude<AudioMode, null>) => {
    stopAudio();
    setActiveChannel(mode);

    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;

      const ctx = new Ctx();
      ctxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();

      osc.type = 'sine';
      if (mode === 'left') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        panner.pan.setValueAtTime(-1, ctx.currentTime);
      } else if (mode === 'right') {
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        panner.pan.setValueAtTime(1, ctx.currentTime);
      } else if (mode === 'center') {
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        panner.pan.setValueAtTime(0, ctx.currentTime);
      } else if (mode === 'bass') {
        osc.frequency.setValueAtTime(60, ctx.currentTime);
        panner.pan.setValueAtTime(0, ctx.currentTime);
      } else {
        osc.frequency.setValueAtTime(10000, ctx.currentTime);
        panner.pan.setValueAtTime(0, ctx.currentTime);
      }

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(panner);
      panner.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);

      setTimeout(() => {
        setActiveChannel((cur) => (cur === mode ? null : cur));
      }, 800);
    } catch {
      setActiveChannel(null);
    }
  };

  const runSweep = () => {
    stopAudio();
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;

      const ctx = new Ctx();
      ctxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const duration = 4.0;
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(20, now);
      osc.frequency.exponentialRampToValueAtTime(20000, now + duration);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.setValueAtTime(0.1, now + duration - 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);

      const start = Date.now();
      sweepTimerRef.current = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        if (elapsed >= duration) {
          stopAudio();
        } else {
          setSweepFreq(Math.round(20 * Math.pow(1000, elapsed / duration)));
        }
      }, 60);
    } catch {
      stopAudio();
    }
  };

  const isPlaying = Boolean(activeChannel || sweepFreq);

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.panelTitle}>Stereo Channel &amp; Frequency Diagnostic</div>
        <div className={styles.controlsRow}>
          {sweepFreq !== null && <span className={styles.badgeOk}>Sweeping: {sweepFreq} Hz</span>}
          {isPlaying && (
            <button type="button" onClick={stopAudio} className={`${styles.btn} ${styles.btnDanger}`}>
              Stop Tone
            </button>
          )}
        </div>
      </div>

      <div
        className={styles.subBox}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '150px',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '76px', marginBottom: '0.75rem' }}>
          {(isPlaying ? BAR_HEIGHTS_ACTIVE : BAR_HEIGHTS_IDLE).map((pct, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: `${pct}%`,
                borderRadius: '3px 3px 0 0',
                background: isPlaying ? 'var(--primary)' : 'rgba(255,255,255,0.14)',
                transition: 'height 0.15s ease, background 0.15s ease',
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
          {activeChannel
            ? `Active Output: ${activeChannel.toUpperCase()} Channel`
            : sweepFreq
              ? 'Full 20 Hz to 20,000 Hz Driver Sweep'
              : 'Select Left Ear, Center, or Right Ear to verify spatial imaging'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => playTone('left')}
          className={`${styles.btn} ${activeChannel === 'left' ? styles.btnPrimary : ''}`}
          style={{ padding: '0.85rem' }}
        >
          ◀ Left Ear
        </button>
        <button
          type="button"
          onClick={() => playTone('center')}
          className={`${styles.btn} ${activeChannel === 'center' ? styles.btnPrimary : ''}`}
          style={{ padding: '0.85rem' }}
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => playTone('right')}
          className={`${styles.btn} ${activeChannel === 'right' ? styles.btnPrimary : ''}`}
          style={{ padding: '0.85rem' }}
        >
          Right Ear ▶
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => playTone('bass')}
          className={`${styles.btn} ${activeChannel === 'bass' ? styles.btnPrimary : ''}`}
          style={{ padding: '0.7rem' }}
        >
          60Hz Sub-Bass
        </button>
        <button
          type="button"
          onClick={() => playTone('treble')}
          className={`${styles.btn} ${activeChannel === 'treble' ? styles.btnPrimary : ''}`}
          style={{ padding: '0.7rem' }}
        >
          10kHz Treble
        </button>
        <button
          type="button"
          onClick={runSweep}
          className={`${styles.btn} ${sweepFreq !== null ? styles.btnPrimary : styles.btnActive}`}
          style={{ padding: '0.7rem' }}
        >
          20–20kHz Sweep
        </button>
      </div>
    </div>
  );
}
