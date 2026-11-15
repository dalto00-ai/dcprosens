'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HardwareTools.module.css';

type LayoutMode = '100' | '60';
type SwitchProfile = 'blue' | 'red' | 'brown';

interface LastKeyInfo {
  code: string;
  key: string;
}

interface KeyDef {
  label: string;
  code: string;
  width?: number;
}

/**
 * Interactive ANSI keyboard ghosting, switch chatter, and N-Key Rollover (NKRO) tester.
 */
export default function KeyboardTester() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(() => new Set());
  const [testedKeys, setTestedKeys] = useState<Set<string>>(() => new Set());
  const [maxRollover, setMaxRollover] = useState(0);
  const [lastKey, setLastKey] = useState<LastKeyInfo | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [captureActive, setCaptureActive] = useState(true);
  const [layout, setLayout] = useState<LayoutMode>('100');
  const [switchType, setSwitchType] = useState<SwitchProfile>('red');
  const [cps, setCps] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timestampsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playSwitchSound = useCallback(
    (isDown: boolean) => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (Ctx) audioCtxRef.current = new Ctx();
        }
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (switchType === 'blue') {
          osc.type = isDown ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(isDown ? 1100 : 750, now);
          osc.frequency.exponentialRampToValueAtTime(isDown ? 180 : 220, now + 0.03);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
        } else if (switchType === 'red') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(isDown ? 420 : 310, now);
          osc.frequency.exponentialRampToValueAtTime(isDown ? 90 : 120, now + 0.04);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        } else {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(isDown ? 620 : 450, now);
          osc.frequency.exponentialRampToValueAtTime(isDown ? 140 : 160, now + 0.035);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      } catch {
        // Ignore audio context block before user gesture
      }
    },
    [soundEnabled, switchType]
  );

  useEffect(() => {
    if (!captureActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      e.preventDefault();
      if (!e.repeat) {
        playSwitchSound(true);
        const now = Date.now();
        timestampsRef.current = [...timestampsRef.current.filter((t) => now - t < 1000), now];
        setCps(timestampsRef.current.length);
      }

      setLastKey({ code: e.code, key: e.key });

      setActiveKeys((prev) => {
        if (prev.has(e.code)) return prev;
        const next = new Set(prev);
        next.add(e.code);
        setMaxRollover((peak) => Math.max(peak, next.size));
        return next;
      });

      setTestedKeys((prev) => {
        if (prev.has(e.code)) return prev;
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      playSwitchSound(false);
      setActiveKeys((prev) => {
        if (!prev.has(e.code)) return prev;
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const handleBlur = () => setActiveKeys(new Set());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [captureActive, playSwitchSound]);

  const resetTest = () => {
    setActiveKeys(new Set());
    setTestedKeys(new Set());
    setMaxRollover(0);
    setLastKey(null);
    setCps(0);
    timestampsRef.current = [];
  };

  const exportReport = () => {
    const report = [
      '===========================================',
      'DCPROSENS - KEYBOARD & NKRO TEST REPORT',
      `Date: ${new Date().toISOString()}`,
      'URL: https://dcprosens.com/keyboard-test/',
      '===========================================',
      `Unique Keys Tested: ${testedKeys.size}`,
      `Peak Simultaneous Rollover (NKRO): ${maxRollover} keys`,
      `Latest Key Speed: ${cps} keys/sec`,
      `Layout Profile: ${layout === '100' ? 'Full 100% ANSI' : 'Compact 60%'}`,
      'Tested Key Codes:',
      Array.from(testedKeys).sort().join(', ') || 'None',
      '===========================================',
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dcprosens-keyboard-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderKey = ({ label, code, width = 1 }: KeyDef) => {
    const isActive = activeKeys.has(code);
    const isTested = testedKeys.has(code);
    const cls = `${styles.keyCap} ${isActive ? styles.keyActive : isTested ? styles.keyTested : ''}`;

    return (
      <div key={code} className={cls} style={{ flex: width }}>
        {label}
      </div>
    );
  };

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.panelTitle}>
          <span>Interactive Keyboard Matrix &amp; NKRO Tester</span>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.segmentGroup}>
            <button
              type="button"
              onClick={() => setLayout('100')}
              className={`${styles.btn} ${layout === '100' ? styles.btnPrimary : ''}`}
            >
              Full 100%
            </button>
            <button
              type="button"
              onClick={() => setLayout('60')}
              className={`${styles.btn} ${layout === '60' ? styles.btnPrimary : ''}`}
            >
              Compact 60%
            </button>
          </div>

          <div className={styles.segmentGroup}>
            {(['red', 'blue', 'brown'] as SwitchProfile[]).map((profile) => (
              <button
                key={profile}
                type="button"
                onClick={() => {
                  setSoundEnabled(true);
                  setSwitchType(profile);
                }}
                className={`${styles.btn} ${soundEnabled && switchType === profile ? styles.btnActive : ''}`}
              >
                {profile.charAt(0).toUpperCase() + profile.slice(1)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className={`${styles.btn} ${!soundEnabled ? styles.btnActive : ''}`}
            >
              {soundEnabled ? 'Sound On' : 'Muted'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setCaptureActive((c) => !c)}
            className={`${styles.btn} ${captureActive ? styles.btnActive : ''}`}
          >
            {captureActive ? 'Capture: ON' : 'Capture: Paused'}
          </button>

          <button type="button" onClick={exportReport} className={styles.btn}>
            Download Report
          </button>

          <button type="button" onClick={resetTest} className={`${styles.btn} ${styles.btnDanger}`}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statChip}>
          Active Now:<span className={styles.statVal}>{activeKeys.size}</span>
        </div>
        <div className={styles.statChip}>
          Peak NKRO:<span className={styles.statVal}>{maxRollover}</span>
        </div>
        <div className={styles.statChip}>
          Unique Tested:<span className={styles.statVal}>{testedKeys.size}</span>
        </div>
        <div className={styles.statChip}>
          Keys / Sec:<span className={styles.statVal}>{cps}</span>
        </div>
        {lastKey && (
          <div className={styles.statChip}>
            Last Code:<span className={styles.statVal}>{lastKey.code}</span>
          </div>
        )}
      </div>

      <div className={styles.keyboardScroll}>
        <div className={styles.keyboardWrap}>
          <div className={styles.keyMatrix}>
            {layout === '100' && (
              <div className={styles.keyRow}>
                {renderKey({ label: 'Esc', code: 'Escape' })}
                <div style={{ width: '16px' }} />
                {['F1', 'F2', 'F3', 'F4'].map((k) => renderKey({ label: k, code: k }))}
                <div style={{ width: '10px' }} />
                {['F5', 'F6', 'F7', 'F8'].map((k) => renderKey({ label: k, code: k }))}
                <div style={{ width: '10px' }} />
                {['F9', 'F10', 'F11', 'F12'].map((k) => renderKey({ label: k, code: k }))}
              </div>
            )}

            <div className={styles.keyRow}>
              {[
                { label: '~', code: 'Backquote' },
                { label: '1', code: 'Digit1' },
                { label: '2', code: 'Digit2' },
                { label: '3', code: 'Digit3' },
                { label: '4', code: 'Digit4' },
                { label: '5', code: 'Digit5' },
                { label: '6', code: 'Digit6' },
                { label: '7', code: 'Digit7' },
                { label: '8', code: 'Digit8' },
                { label: '9', code: 'Digit9' },
                { label: '0', code: 'Digit0' },
                { label: '-', code: 'Minus' },
                { label: '=', code: 'Equal' },
                { label: 'Back', code: 'Backspace', width: 2 },
              ].map(renderKey)}
            </div>

            <div className={styles.keyRow}>
              {[
                { label: 'Tab', code: 'Tab', width: 1.5 },
                ...'QWERTYUIOP'.split('').map((c) => ({ label: c, code: `Key${c}` })),
                { label: '[', code: 'BracketLeft' },
                { label: ']', code: 'BracketRight' },
                { label: '\\', code: 'Backslash', width: 1.5 },
              ].map(renderKey)}
            </div>

            <div className={styles.keyRow}>
              {[
                { label: 'Caps', code: 'CapsLock', width: 1.8 },
                ...'ASDFGHJKL'.split('').map((c) => ({ label: c, code: `Key${c}` })),
                { label: ';', code: 'Semicolon' },
                { label: "'", code: 'Quote' },
                { label: 'Enter', code: 'Enter', width: 2.2 },
              ].map(renderKey)}
            </div>

            <div className={styles.keyRow}>
              {[
                { label: 'Shift', code: 'ShiftLeft', width: 2.4 },
                ...'ZXCVBNM'.split('').map((c) => ({ label: c, code: `Key${c}` })),
                { label: ',', code: 'Comma' },
                { label: '.', code: 'Period' },
                { label: '/', code: 'Slash' },
                { label: 'Shift', code: 'ShiftRight', width: 2.4 },
              ].map(renderKey)}
            </div>

            <div className={styles.keyRow}>
              {[
                { label: 'Ctrl', code: 'ControlLeft', width: 1.25 },
                { label: 'Win', code: 'MetaLeft', width: 1.25 },
                { label: 'Alt', code: 'AltLeft', width: 1.25 },
                { label: 'Space', code: 'Space', width: 6.25 },
                { label: 'Alt', code: 'AltRight', width: 1.25 },
                { label: 'Menu', code: 'ContextMenu', width: 1.25 },
                { label: 'Ctrl', code: 'ControlRight', width: 1.25 },
              ].map(renderKey)}
            </div>
          </div>

          {layout === '100' && (
            <div className={styles.clusterDivider}>
              <div className={styles.keyMatrix} style={{ width: '125px', flex: 'none' }}>
                <div className={styles.keyRow}>
                  {renderKey({ label: 'Prt', code: 'PrintScreen' })}
                  {renderKey({ label: 'Scr', code: 'ScrollLock' })}
                  {renderKey({ label: 'Pau', code: 'Pause' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: 'Ins', code: 'Insert' })}
                  {renderKey({ label: 'Hm', code: 'Home' })}
                  {renderKey({ label: 'PgU', code: 'PageUp' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: 'Del', code: 'Delete' })}
                  {renderKey({ label: 'End', code: 'End' })}
                  {renderKey({ label: 'PgD', code: 'PageDown' })}
                </div>
                <div style={{ height: '2.5rem' }} />
                <div className={styles.keyRow} style={{ justifyContent: 'center' }}>
                  <div style={{ width: '36px' }}>{renderKey({ label: '▲', code: 'ArrowUp' })}</div>
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: '◀', code: 'ArrowLeft' })}
                  {renderKey({ label: '▼', code: 'ArrowDown' })}
                  {renderKey({ label: '▶', code: 'ArrowRight' })}
                </div>
              </div>

              <div className={styles.keyMatrix} style={{ width: '155px', flex: 'none' }}>
                <div className={styles.keyRow}>
                  {renderKey({ label: 'Num', code: 'NumLock' })}
                  {renderKey({ label: '/', code: 'NumpadDivide' })}
                  {renderKey({ label: '*', code: 'NumpadMultiply' })}
                  {renderKey({ label: '-', code: 'NumpadSubtract' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: '7', code: 'Numpad7' })}
                  {renderKey({ label: '8', code: 'Numpad8' })}
                  {renderKey({ label: '9', code: 'Numpad9' })}
                  {renderKey({ label: '+', code: 'NumpadAdd' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: '4', code: 'Numpad4' })}
                  {renderKey({ label: '5', code: 'Numpad5' })}
                  {renderKey({ label: '6', code: 'Numpad6' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: '1', code: 'Numpad1' })}
                  {renderKey({ label: '2', code: 'Numpad2' })}
                  {renderKey({ label: '3', code: 'Numpad3' })}
                  {renderKey({ label: 'Ent', code: 'NumpadEnter' })}
                </div>
                <div className={styles.keyRow}>
                  {renderKey({ label: '0', code: 'Numpad0', width: 2 })}
                  {renderKey({ label: '.', code: 'NumpadDecimal' })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
