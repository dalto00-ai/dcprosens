"use client";

import { useState, useMemo } from 'react';
import styles from './MousepadCalculator.module.css';

interface PadRecommendation {
    category: 'XL' | 'Large' | 'Medium' | 'Any';
    minWidth: number;
    minHeight: number;
    idealWidth: number;
    idealHeight: number;
    reason: string;
    badgeClass: string;
    label: string;
}

interface PadProduct {
    name: string;
    size: string;
    surface: string;
    link: string;
    thickness: string;
}

const PAD_PRODUCTS: Record<string, PadProduct[]> = {
    XL: [
        {
            name: 'SteelSeries QcK Heavy XXL',
            size: '900×300mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B014W2XKXQ',
            thickness: '6mm',
        },
        {
            name: 'Logitech G840 XL',
            size: '900×400mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B01MXZTWZB',
            thickness: '3mm',
        },
        {
            name: 'Artisan Zero XL (Soft)',
            size: '490×420mm',
            surface: 'Hybrid cloth',
            link: 'https://www.amazon.com/dp/B085TGXL39',
            thickness: '4mm',
        },
    ],
    Large: [
        {
            name: 'SteelSeries QcK+ Large',
            size: '450×400mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B000UB2YOI',
            thickness: '2mm',
        },
        {
            name: 'Artisan Zero Mid (Soft)',
            size: '420×330mm',
            surface: 'Hybrid cloth',
            link: 'https://www.amazon.com/dp/B085TGX9MC',
            thickness: '4mm',
        },
        {
            name: 'Logitech G640 Large',
            size: '460×400mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B07CG1HD4P',
            thickness: '3mm',
        },
    ],
    Medium: [
        {
            name: 'SteelSeries QcK Medium',
            size: '320×270mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B000UB2YOI',
            thickness: '2mm',
        },
        {
            name: 'Artisan Zero Mid (Mid)',
            size: '420×330mm',
            surface: 'Hybrid cloth',
            link: 'https://www.amazon.com/dp/B085TGX9MC',
            thickness: '4mm',
        },
        {
            name: 'Logitech G440 Hard',
            size: '340×280mm',
            surface: 'Hard polymer',
            link: 'https://www.amazon.com/dp/B00Y33YVHK',
            thickness: '3mm',
        },
    ],
    Any: [
        {
            name: 'Logitech G240 Cloth',
            size: '340×280mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B00Y33YVHK',
            thickness: '3mm',
        },
        {
            name: 'SteelSeries QcK Mini',
            size: '250×210mm',
            surface: 'Cloth',
            link: 'https://www.amazon.com/dp/B000UB2YOI',
            thickness: '2mm',
        },
        {
            name: 'Artisan Zero Small',
            size: '300×250mm',
            surface: 'Hybrid cloth',
            link: 'https://www.amazon.com/dp/B085TGX9MC',
            thickness: '4mm',
        },
    ],
};

const PRO_REFERENCES = [
    { name: 'ZywOo', game: 'CS2', cm360: 35, dpi: 400 },
    { name: 'NiKo', game: 'CS2', cm360: 39, dpi: 400 },
    { name: 'aspas', game: 'Val', cm360: 28, dpi: 800 },
    { name: 'TenZ', game: 'Val', cm360: 34, dpi: 800 },
    { name: 's1mple', game: 'CS2', cm360: 42, dpi: 400 },
    { name: 'Shroud', game: 'Apex', cm360: 52, dpi: 400 },
    { name: 'Demon1', game: 'Val', cm360: 26, dpi: 800 },
];

function getRecommendation(cm360: number): PadRecommendation {
    if (cm360 < 30) {
        return {
            category: 'XL',
            minWidth: 450,
            minHeight: 400,
            idealWidth: 500,
            idealHeight: 400,
            label: 'XL Mousepad Required',
            reason: `At ${cm360}cm/360, you sweep your mouse across almost the entire pad for a single rotation. A minimum 450mm wide pad prevents you from running off the edge mid-fight. Most pros with this sensitivity use 900×400mm desk mats.`,
            badgeClass: styles.categoryXL,
        };
    }
    if (cm360 < 45) {
        return {
            category: 'Large',
            minWidth: 400,
            minHeight: 300,
            idealWidth: 450,
            idealHeight: 400,
            label: 'Large Mousepad Recommended',
            reason: `At ${cm360}cm/360, you need ample room for arm-aimed flicks. A 400×300mm+ pad gives you 2–3 full sweeps before hitting the edge. This range covers most competitive FPS pros.`,
            badgeClass: styles.categoryLarge,
        };
    }
    if (cm360 < 65) {
        return {
            category: 'Medium',
            minWidth: 350,
            minHeight: 250,
            idealWidth: 400,
            idealHeight: 350,
            label: 'Medium Mousepad Works',
            reason: `At ${cm360}cm/360, a 350×250mm pad comfortably fits your movements with room to spare. You can also use a large pad for extra comfort. Wrist and hybrid aim styles work well here.`,
            badgeClass: styles.categoryMedium,
        };
    }
    return {
        category: 'Any',
        minWidth: 250,
        minHeight: 200,
        idealWidth: 300,
        idealHeight: 250,
        label: 'Any Size Works Fine',
        reason: `At ${cm360}cm/360, your movements are small enough that even a compact 250×210mm pad provides plenty of space. You're likely a wrist-aimer — any quality pad will do.`,
        badgeClass: styles.categorySmall,
    };
}

// Compute the visual size of the pad in the diagram (as %)
function getPadVizSize(rec: PadRecommendation): { width: string; height: string } {
    // Desk is ~800×400mm conceptually. Scale accordingly.
    const deskW = 800;
    const deskH = 400;
    const w = Math.min((rec.idealWidth / deskW) * 100, 85);
    const h = Math.min((rec.idealHeight / deskH) * 100, 80);
    return { width: `${w}%`, height: `${h}%` };
}

export default function MousepadCalculator() {
    const [cm360, setCm360] = useState(38);
    const [dpi, setDpi] = useState(800);

    const recommendation = useMemo(() => getRecommendation(cm360), [cm360]);
    const pads = PAD_PRODUCTS[recommendation.category];
    const padViz = getPadVizSize(recommendation);

    const minMs = (10 / 100) * 100;
    const maxMs = 100;

    return (
        <div className={styles.wrapper}>
            {/* Input Card */}
            <div className={styles.inputCard}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        🖱️ Your cm/360 Sensitivity
                    </label>
                    <div className={styles.sliderWrapper}>
                        <input
                            type="range"
                            className={styles.slider}
                            min={10}
                            max={100}
                            step={1}
                            value={cm360}
                            onChange={(e) => setCm360(Number(e.target.value))}
                            aria-label="cm per 360 degrees"
                        />
                        <span className={styles.sliderVal}>{cm360} cm</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '-0.25rem' }}>
                        Distance moved for one full 360° rotation
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>🔢 Mouse DPI</label>
                    <div className={styles.dpiButtons}>
                        {[400, 800, 1000, 1600, 3200].map(d => (
                            <button
                                key={d}
                                className={`${styles.dpiBtn} ${dpi === d ? styles.active : ''}`}
                                onClick={() => setDpi(d)}
                                type="button"
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        In-game sensitivity at {dpi} DPI: ~{((360 * 2.54) / (cm360 * 0.07 * (dpi / 800))).toFixed(3)} (Valorant)
                    </p>
                </div>
            </div>

            {/* Result Grid */}
            <div className={styles.resultGrid}>
                {/* Recommendation */}
                <div className={styles.recommendCard}>
                    <span className={`${styles.categoryBadge} ${recommendation.badgeClass}`}>
                        {recommendation.category} — {recommendation.label}
                    </span>
                    <div className={styles.recommendTitle}>Ideal Mousepad Size</div>
                    <div className={styles.recommendDims}>
                        {recommendation.idealWidth}×{recommendation.idealHeight}mm
                    </div>
                    <p className={styles.recommendReason}>{recommendation.reason}</p>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '0.75rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>MIN WIDTH</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>{recommendation.minWidth}mm</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '0.75rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>MIN HEIGHT</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>{recommendation.minHeight}mm</div>
                        </div>
                    </div>
                </div>

                {/* Desk Diagram */}
                <div className={styles.diagramCard}>
                    <div className={styles.diagramTitle}>Pad Size Relative to Desk</div>
                    <div className={styles.deskScene}>
                        <div className={styles.deskSurface}>
                            <div
                                className={styles.mousepadViz}
                                style={{ width: padViz.width, height: padViz.height }}
                            >
                                {recommendation.idealWidth}×{recommendation.idealHeight}
                            </div>
                        </div>
                    </div>
                    <div className={styles.diagramLegend}>
                        <div className={styles.legendItem}>
                            <div className={styles.legendDot} style={{ background: '#333' }} />
                            <span>Standard desk (~800mm wide)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={styles.legendDot} style={{ background: 'rgba(0,255,157,0.3)', border: '1px solid var(--primary)' }} />
                            <span>Recommended pad</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Mousepads */}
            <div className={styles.mousepadsSection}>
                <div className={styles.sectionTitle}>🛒 Recommended Mousepads for {recommendation.category} Size</div>
                <div className={styles.padGrid}>
                    {pads.map(pad => (
                        <a
                            key={pad.name}
                            href={pad.link}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className={styles.padItem}
                        >
                            <div className={styles.padInfo}>
                                <div className={styles.padName}>{pad.name}</div>
                                <div className={styles.padSize}>{pad.size}</div>
                                <div className={styles.padDetails}>{pad.surface} · {pad.thickness} thick</div>
                            </div>
                            <span className={styles.padLink}>View on Amazon →</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Pro Reference */}
            <div className={styles.proStrip}>
                <div className={styles.proStripTitle}>📊 What cm/360 Do Pros Use?</div>
                {/* Visual track */}
                <div className={styles.proTrack}>
                    {PRO_REFERENCES.map(pro => {
                        const pct = ((pro.cm360 - 10) / (100 - 10)) * 100;
                        return (
                            <div
                                key={pro.name}
                                className={styles.proMarker}
                                style={{ left: `${pct}%` }}
                                title={`${pro.name}: ${pro.cm360} cm/360`}
                            >
                                {pro.name}
                            </div>
                        );
                    })}
                </div>
                <table className={styles.proTable}>
                    <thead>
                        <tr>
                            <th>Pro Player</th>
                            <th>Game</th>
                            <th>DPI</th>
                            <th>cm/360</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PRO_REFERENCES.map(pro => (
                            <tr key={pro.name}>
                                <td>{pro.name}</td>
                                <td>{pro.game}</td>
                                <td>{pro.dpi}</td>
                                <td>{pro.cm360} cm</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
