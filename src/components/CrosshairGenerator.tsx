"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './CrosshairGenerator.module.css';

interface CrosshairState {
    color: string;
    outlineEnabled: boolean;
    outlineOpacity: number;
    outlineThickness: number;
    centerDotEnabled: boolean;
    centerDotOpacity: number;
    centerDotThickness: number;
    innerLineLength: number;
    innerLineThickness: number;
    innerLineOpacity: number;
    innerLineOffset: number;
    outerLineEnabled: boolean;
    outerLineLength: number;
    outerLineThickness: number;
    outerLineOpacity: number;
    outerLineOffset: number;
    game: 'valorant' | 'cs2';
}

const DEFAULT_STATE: CrosshairState = {
    color: '#00FF9D',
    outlineEnabled: true,
    outlineOpacity: 0.5,
    outlineThickness: 1,
    centerDotEnabled: false,
    centerDotOpacity: 1,
    centerDotThickness: 2,
    innerLineLength: 6,
    innerLineThickness: 2,
    innerLineOpacity: 1,
    innerLineOffset: 3,
    outerLineEnabled: false,
    outerLineLength: 4,
    outerLineThickness: 2,
    outerLineOpacity: 1,
    outerLineOffset: 10,
    game: 'valorant',
};

interface Preset {
    name: string;
    pro: string;
    game: 'valorant' | 'cs2';
    state: Partial<CrosshairState>;
}

const PRESETS: Preset[] = [
    {
        name: 'TenZ',
        pro: 'Sentinels',
        game: 'valorant',
        state: {
            color: '#00FF00',
            outlineEnabled: false,
            centerDotEnabled: false,
            innerLineLength: 4,
            innerLineThickness: 2,
            innerLineOpacity: 1,
            innerLineOffset: 3,
            outerLineEnabled: false,
        },
    },
    {
        name: 'aspas',
        pro: 'LOUD',
        game: 'valorant',
        state: {
            color: '#FFFFFF',
            outlineEnabled: true,
            outlineOpacity: 0.5,
            outlineThickness: 1,
            centerDotEnabled: true,
            centerDotOpacity: 1,
            centerDotThickness: 2,
            innerLineLength: 4,
            innerLineThickness: 2,
            innerLineOpacity: 1,
            innerLineOffset: 2,
            outerLineEnabled: false,
        },
    },
    {
        name: 'yay',
        pro: 'OpTic',
        game: 'valorant',
        state: {
            color: '#00FF9D',
            outlineEnabled: true,
            outlineOpacity: 1,
            outlineThickness: 1,
            centerDotEnabled: false,
            innerLineLength: 6,
            innerLineThickness: 2,
            innerLineOpacity: 1,
            innerLineOffset: 4,
            outerLineEnabled: false,
        },
    },
    {
        name: 'Dot Only',
        pro: 'Center Dot',
        game: 'valorant',
        state: {
            color: '#FF4C4C',
            outlineEnabled: true,
            outlineOpacity: 0.8,
            outlineThickness: 1,
            centerDotEnabled: true,
            centerDotOpacity: 1,
            centerDotThickness: 4,
            innerLineLength: 0,
            innerLineThickness: 2,
            innerLineOpacity: 0,
            innerLineOffset: 0,
            outerLineEnabled: false,
        },
    },
    {
        name: 's1mple',
        pro: 'NAVI',
        game: 'cs2',
        state: {
            color: '#FFFFFF',
            outlineEnabled: true,
            outlineOpacity: 0,
            outlineThickness: 1,
            centerDotEnabled: false,
            innerLineLength: 5,
            innerLineThickness: 1,
            innerLineOpacity: 1,
            innerLineOffset: 3,
            outerLineEnabled: true,
            outerLineLength: 4,
            outerLineThickness: 1,
            outerLineOpacity: 1,
            outerLineOffset: 10,
        },
    },
    {
        name: 'NiKo',
        pro: 'G2',
        game: 'cs2',
        state: {
            color: '#00FFFF',
            outlineEnabled: false,
            centerDotEnabled: false,
            innerLineLength: 3,
            innerLineThickness: 1,
            innerLineOpacity: 1,
            innerLineOffset: 2,
            outerLineEnabled: false,
        },
    },
];

// Generate Valorant crosshair code string from state
function generateValorantCode(s: CrosshairState): string {
    const colorMap: Record<string, number> = {
        '#FFFFFF': 0, '#00FF00': 1, '#00FFFF': 2, '#FFFF00': 3,
        '#FF69B4': 4, '#00FF9D': 5, '#FF4C4C': 6,
    };
    const colorCode = colorMap[s.color.toUpperCase()] ?? 5;
    const outO = Math.round(s.outlineOpacity * 255);
    const outT = s.outlineThickness;
    const dotO = Math.round(s.centerDotOpacity * 255);
    const dotT = s.centerDotThickness;
    const ilL = s.innerLineLength;
    const ilO = s.innerLineOffset;
    const ilOp = Math.round(s.innerLineOpacity * 255);
    const olL = s.outerLineLength;
    const olO = s.outerLineOffset;
    const olOp = Math.round(s.outerLineOpacity * 255);
    const bDot = s.centerDotEnabled ? 1 : 0;

    if (s.game === 'cs2') {
        return `cl_crosshaircolor ${colorCode}; cl_crosshairsize ${ilL}; cl_crosshairgap ${ilO}; cl_crosshairthickness ${s.innerLineThickness}; cl_crosshair_drawoutline ${s.outlineEnabled ? 1 : 0}; cl_crosshairdot ${bDot}`;
    }

    return `0;P;c;${colorCode};o;${outO};0t;${outT};0l;${ilL};0o;${ilO};0a;${ilOp};0f;0;1b;${bDot};1t;${dotT};1a;${dotO};1m;0;1e;0;2l;${olL};2o;${olO};2a;${olOp};2e;0`;
}

interface SliderRowProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    suffix?: string;
}

function SliderRow({ label, value, min, max, step, onChange, suffix = '' }: SliderRowProps) {
    return (
        <div className={styles.sliderRow}>
            <span className={styles.sliderLabel}>{label}</span>
            <input
                type="range"
                className={styles.slider}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <span className={styles.sliderValue}>{value}{suffix}</span>
        </div>
    );
}

export default function CrosshairGenerator() {
    const [state, setState] = useState<CrosshairState>(DEFAULT_STATE);
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const update = useCallback((partial: Partial<CrosshairState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    }, []);

    const loadPreset = (preset: Preset) => {
        setState((prev) => ({ ...prev, game: preset.game, ...preset.state }));
    };

    // Draw crosshair on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 200;
        const H = 200;
        const cx = W / 2;
        const cy = H / 2;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, W, H);

        const drawLine = (x1: number, y1: number, x2: number, y2: number, color: string, thickness: number, opacity: number) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        };

        const drawOutlineLine = (x1: number, y1: number, x2: number, y2: number, thickness: number, opacity: number) => {
            if (state.outlineEnabled && state.outlineOpacity > 0) {
                drawLine(x1, y1, x2, y2, '#000000', thickness + state.outlineThickness * 2, opacity);
            }
        };

        const t = state.innerLineThickness;
        const len = state.innerLineLength;
        const off = state.innerLineOffset;
        const op = state.innerLineOpacity;

        // Outline pass
        if (state.outlineEnabled) {
            // Right
            drawOutlineLine(cx + off, cy, cx + off + len, cy, t, state.outlineOpacity);
            // Left
            drawOutlineLine(cx - off, cy, cx - off - len, cy, t, state.outlineOpacity);
            // Down
            drawOutlineLine(cx, cy + off, cx, cy + off + len, t, state.outlineOpacity);
            // Up
            drawOutlineLine(cx, cy - off, cx, cy - off - len, t, state.outlineOpacity);

            // Outer lines outline
            if (state.outerLineEnabled) {
                const ot = state.outerLineThickness;
                const ol = state.outerLineLength;
                const oo = state.outerLineOffset;
                drawOutlineLine(cx + oo, cy, cx + oo + ol, cy, ot, state.outlineOpacity);
                drawOutlineLine(cx - oo, cy, cx - oo - ol, cy, ot, state.outlineOpacity);
                drawOutlineLine(cx, cy + oo, cx, cy + oo + ol, ot, state.outlineOpacity);
                drawOutlineLine(cx, cy - oo, cx, cy - oo - ol, ot, state.outlineOpacity);
            }
        }

        // Inner lines
        drawLine(cx + off, cy, cx + off + len, cy, state.color, t, op);
        drawLine(cx - off, cy, cx - off - len, cy, state.color, t, op);
        drawLine(cx, cy + off, cx, cy + off + len, state.color, t, op);
        drawLine(cx, cy - off, cx, cy - off - len, state.color, t, op);

        // Outer lines
        if (state.outerLineEnabled) {
            const ot = state.outerLineThickness;
            const ol = state.outerLineLength;
            const oo = state.outerLineOffset;
            const oop = state.outerLineOpacity;
            drawLine(cx + oo, cy, cx + oo + ol, cy, state.color, ot, oop);
            drawLine(cx - oo, cy, cx - oo - ol, cy, state.color, ot, oop);
            drawLine(cx, cy + oo, cx, cy + oo + ol, state.color, ot, oop);
            drawLine(cx, cy - oo, cx, cy - oo - ol, state.color, ot, oop);
        }

        // Center dot
        if (state.centerDotEnabled) {
            const r = state.centerDotThickness;
            if (state.outlineEnabled) {
                ctx.save();
                ctx.globalAlpha = state.outlineOpacity;
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(cx, cy, r + state.outlineThickness, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            ctx.save();
            ctx.globalAlpha = state.centerDotOpacity;
            ctx.fillStyle = state.color;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }, [state]);

    const codeString = generateValorantCode(state);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleExportPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'crosshair-dcprosens.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className={styles.wrapper}>
            {/* ---- LEFT: Controls ---- */}
            <div className={styles.controlsPanel}>
                {/* Game tabs */}
                <div className={styles.gameTabs}>
                    <button
                        className={`${styles.gameTab} ${state.game === 'valorant' ? styles.active : ''}`}
                        onClick={() => update({ game: 'valorant' })}
                        type="button"
                    >
                        🎯 Valorant
                    </button>
                    <button
                        className={`${styles.gameTab} ${state.game === 'cs2' ? styles.active : ''}`}
                        onClick={() => update({ game: 'cs2' })}
                        type="button"
                    >
                        💥 CS2
                    </button>
                </div>

                {/* Color */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Color</div>
                    <div className={styles.colorRow}>
                        <span className={styles.colorLabel}>Crosshair Color</span>
                        <input
                            type="color"
                            className={styles.colorInput}
                            value={state.color}
                            onChange={(e) => update({ color: e.target.value })}
                        />
                        <span className={styles.colorHex}>{state.color.toUpperCase()}</span>
                    </div>
                    {/* Color presets */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {['#00FF9D', '#FFFFFF', '#00FF00', '#00FFFF', '#FFFF00', '#FF4C4C', '#FF69B4'].map(c => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => update({ color: c })}
                                style={{
                                    width: 24, height: 24, borderRadius: '50%', background: c,
                                    border: state.color.toUpperCase() === c ? '2px solid #fff' : '2px solid transparent',
                                    cursor: 'pointer', outline: 'none', transition: 'transform 0.15s',
                                }}
                                aria-label={`Set color ${c}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Outline */}
                <div className={styles.section}>
                    <div className={styles.toggleRow}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Outline</span>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={state.outlineEnabled} onChange={e => update({ outlineEnabled: e.target.checked })} />
                            <span className={styles.toggleSlider} />
                        </label>
                    </div>
                    {state.outlineEnabled && (
                        <>
                            <SliderRow label="Opacity" value={state.outlineOpacity} min={0} max={1} step={0.05}
                                onChange={v => update({ outlineOpacity: v })} />
                            <SliderRow label="Thickness" value={state.outlineThickness} min={1} max={3} step={1}
                                onChange={v => update({ outlineThickness: v })} />
                        </>
                    )}
                </div>

                {/* Inner Lines */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Inner Lines</div>
                    <SliderRow label="Length" value={state.innerLineLength} min={0} max={20} step={1}
                        onChange={v => update({ innerLineLength: v })} />
                    <SliderRow label="Thickness" value={state.innerLineThickness} min={1} max={8} step={1}
                        onChange={v => update({ innerLineThickness: v })} />
                    <SliderRow label="Opacity" value={state.innerLineOpacity} min={0} max={1} step={0.05}
                        onChange={v => update({ innerLineOpacity: v })} />
                    <SliderRow label="Offset (Gap)" value={state.innerLineOffset} min={0} max={10} step={1}
                        onChange={v => update({ innerLineOffset: v })} />
                </div>

                {/* Outer Lines */}
                <div className={styles.section}>
                    <div className={styles.toggleRow}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Outer Lines</span>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={state.outerLineEnabled} onChange={e => update({ outerLineEnabled: e.target.checked })} />
                            <span className={styles.toggleSlider} />
                        </label>
                    </div>
                    {state.outerLineEnabled && (
                        <>
                            <SliderRow label="Length" value={state.outerLineLength} min={0} max={20} step={1}
                                onChange={v => update({ outerLineLength: v })} />
                            <SliderRow label="Thickness" value={state.outerLineThickness} min={1} max={8} step={1}
                                onChange={v => update({ outerLineThickness: v })} />
                            <SliderRow label="Opacity" value={state.outerLineOpacity} min={0} max={1} step={0.05}
                                onChange={v => update({ outerLineOpacity: v })} />
                            <SliderRow label="Offset" value={state.outerLineOffset} min={5} max={30} step={1}
                                onChange={v => update({ outerLineOffset: v })} />
                        </>
                    )}
                </div>

                {/* Center Dot */}
                <div className={styles.section}>
                    <div className={styles.toggleRow}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Center Dot</span>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={state.centerDotEnabled} onChange={e => update({ centerDotEnabled: e.target.checked })} />
                            <span className={styles.toggleSlider} />
                        </label>
                    </div>
                    {state.centerDotEnabled && (
                        <>
                            <SliderRow label="Size" value={state.centerDotThickness} min={1} max={8} step={1}
                                onChange={v => update({ centerDotThickness: v })} />
                            <SliderRow label="Opacity" value={state.centerDotOpacity} min={0} max={1} step={0.05}
                                onChange={v => update({ centerDotOpacity: v })} />
                        </>
                    )}
                </div>
            </div>

            {/* ---- RIGHT: Preview + Code + Presets ---- */}
            <div className={styles.previewPanel}>
                {/* SVG Preview */}
                <div className={styles.previewBox}>
                    <div className={styles.previewTitle}>Live Preview</div>
                    <canvas
                        ref={canvasRef}
                        width={200}
                        height={200}
                        className={styles.previewCanvas}
                        aria-label="Crosshair preview"
                    />
                </div>

                {/* Code output */}
                <div className={styles.codeBox}>
                    <div className={styles.codeTitle}>
                        {state.game === 'valorant' ? 'Valorant Crosshair Code' : 'CS2 Console Commands'}
                    </div>
                    <div className={styles.codeString}>{codeString}</div>
                    <div className={styles.actionBtns}>
                        <button
                            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                            onClick={handleCopy}
                            type="button"
                        >
                            {copied ? '✓ Copied!' : '📋 Copy Code'}
                        </button>
                        <button className={styles.exportBtn} onClick={handleExportPNG} type="button">
                            ⬇ PNG
                        </button>
                    </div>
                </div>

                {/* Pro Presets */}
                <div className={styles.presetsBox}>
                    <div className={styles.presetsTitle}>Pro Crosshair Presets</div>
                    <div className={styles.presetList}>
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                className={styles.presetItem}
                                onClick={() => loadPreset(preset)}
                                type="button"
                            >
                                <div>
                                    <div className={styles.presetName}>{preset.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{preset.pro}</div>
                                </div>
                                <span className={styles.presetGame}>{preset.game === 'valorant' ? 'VAL' : 'CS2'}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
