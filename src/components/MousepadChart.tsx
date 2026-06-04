"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./MousepadChart.module.css";

interface Mousepad {
  id: string;
  name: string;
  brand: string;
  staticFriction: number; // Higher is faster (less friction)
  dynamicFriction: number; // Higher is faster (less friction)
  stoppingPower: number; // Higher is more stopping power
  durability: number; // Higher is better durability
  thickness: string;
  speedCategory: "Pure Control" | "Control" | "Balanced" | "Speed" | "Pure Speed";
  bestFor: string;
  bestGames?: string;
  price: string;
  affiliateLink: string;
}

const MOUSEPADS_DATABASE: Mousepad[] = [
  {
    id: "artisan-zero",
    name: "Artisan Zero (FX L / Soft)",
    brand: "Artisan",
    staticFriction: 4,
    dynamicFriction: 5,
    stoppingPower: 8,
    durability: 9,
    thickness: "4mm",
    speedCategory: "Control",
    bestFor: "Control/Medium",
    bestGames: "CS2, Valorant, R6 Siege",
    price: "$65",
    affiliateLink: "https://www.amazon.com/dp/B07YNQPXJ9",
  },
  {
    id: "artisan-hien",
    name: "Artisan Hien (FX L / Soft)",
    brand: "Artisan",
    staticFriction: 7,
    dynamicFriction: 8,
    stoppingPower: 5,
    durability: 10,
    thickness: "4mm",
    speedCategory: "Speed",
    bestFor: "Speed/Hybrid",
    price: "$65",
    affiliateLink: "https://www.amazon.com/dp/B07YNQPXJ9",
  },
  {
    id: "artisan-otsu",
    name: "Artisan Hayate Otsu",
    brand: "Artisan",
    staticFriction: 6,
    dynamicFriction: 7,
    stoppingPower: 6,
    durability: 8,
    thickness: "4mm",
    speedCategory: "Balanced",
    bestFor: "Balanced",
    price: "$69",
    affiliateLink: "https://www.amazon.com/dp/B07YNQPXJ9",
  },
  {
    id: "logitech-g640",
    name: "Logitech G640",
    brand: "Logitech",
    staticFriction: 5,
    dynamicFriction: 5,
    stoppingPower: 6,
    durability: 5,
    thickness: "3mm",
    speedCategory: "Control",
    bestFor: "Control",
    price: "$39",
    affiliateLink: "https://www.amazon.com/dp/B07CX8ZB6J",
  },
  {
    id: "steelseries-qck-heavy",
    name: "SteelSeries QcK Heavy",
    brand: "SteelSeries",
    staticFriction: 3,
    dynamicFriction: 4,
    stoppingPower: 8,
    durability: 6,
    thickness: "6mm",
    speedCategory: "Pure Control",
    bestFor: "Pure Control",
    price: "$29",
    affiliateLink: "https://www.amazon.com/dp/B000UEZ36W",
  },
  {
    id: "zowie-gsr-ii",
    name: "Zowie G-SR II",
    brand: "Zowie",
    staticFriction: 2,
    dynamicFriction: 3,
    stoppingPower: 9,
    durability: 8,
    thickness: "3.5mm",
    speedCategory: "Pure Control",
    bestFor: "Pure Control",
    price: "$49",
    affiliateLink: "https://www.amazon.com/dp/B01CQCL5SG",
  },
  {
    id: "lgg-saturn-pro",
    name: "Lethal Gaming Gear Saturn Pro",
    brand: "Lethal Gaming Gear",
    staticFriction: 4,
    dynamicFriction: 5,
    stoppingPower: 8,
    durability: 9,
    thickness: "4mm",
    speedCategory: "Control",
    bestFor: "Control/Medium",
    price: "$59",
    affiliateLink: "https://www.amazon.com/dp/B0BPMMQYRL",
  },
  {
    id: "fnatic-dash",
    name: "Fnatic Dash",
    brand: "Fnatic",
    staticFriction: 8,
    dynamicFriction: 8,
    stoppingPower: 4,
    durability: 7,
    thickness: "3mm",
    speedCategory: "Speed",
    bestFor: "Speed",
    price: "$39",
    affiliateLink: "https://fnatic.com/gear/mousepads",
  },
  {
    id: "pulsar-es2",
    name: "Pulsar ES2",
    brand: "Pulsar",
    staticFriction: 5,
    dynamicFriction: 6,
    stoppingPower: 6,
    durability: 8,
    thickness: "3mm",
    speedCategory: "Balanced",
    bestFor: "Balanced",
    price: "$45",
    affiliateLink: "https://www.amazon.com/dp/B0BY4FC5WW",
  },
  {
    id: "skypad-glass-3",
    name: "SkyPAD Glass 3.0",
    brand: "SkyPAD",
    staticFriction: 10,
    dynamicFriction: 10,
    stoppingPower: 1,
    durability: 10,
    thickness: "3.7mm",
    speedCategory: "Pure Speed",
    bestFor: "Pure Speed (Glass)",
    price: "$119",
    affiliateLink: "https://www.amazon.com/dp/B0B68L8X5C",
  },
  {
    id: "razer-gigantus-v2",
    name: "Razer Gigantus V2",
    brand: "Razer",
    staticFriction: 4,
    dynamicFriction: 4,
    stoppingPower: 7,
    durability: 6,
    thickness: "3mm",
    speedCategory: "Control",
    bestFor: "Control",
    price: "$15",
    affiliateLink: "https://www.amazon.com/dp/B0885F14KL",
  },
  {
    id: "artisan-shidenkai-v2",
    name: "Artisan Shidenkai V2",
    brand: "Artisan",
    staticFriction: 9,
    dynamicFriction: 9,
    stoppingPower: 2,
    durability: 7,
    thickness: "4mm",
    speedCategory: "Pure Speed",
    bestFor: "Speed",
    price: "$75",
    affiliateLink: "https://www.amazon.com/dp/B07YNQPXJ9",
  },
  {
    id: "endgame-emc",
    name: "Endgame Gear EMC",
    brand: "Endgame Gear",
    staticFriction: 3,
    dynamicFriction: 3,
    stoppingPower: 9,
    durability: 9,
    thickness: "3mm",
    speedCategory: "Pure Control",
    bestFor: "Pure Control",
    price: "$39",
    affiliateLink: "https://www.amazon.com/dp/B0C3MBJ64J",
  },
];

const SPEED_LEVELS = [
  { value: 0, label: "All Speeds" },
  { value: 1, label: "Pure Control" },
  { value: 2, label: "Control" },
  { value: 3, label: "Balanced" },
  { value: 4, label: "Speed" },
  { value: 5, label: "Pure Speed" },
];

export default function MousepadChart() {
  const [speedLevel, setSpeedLevel] = useState<number>(0);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [hoveredPad, setHoveredPad] = useState<Mousepad | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    pad: Mousepad;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter pads dynamically based on the slider value
  const filteredPads = useMemo(() => {
    if (speedLevel === 0) return MOUSEPADS_DATABASE;
    const category = SPEED_LEVELS[speedLevel].label;
    return MOUSEPADS_DATABASE.filter((pad) => pad.speedCategory === category);
  }, [speedLevel]);

  // Toggle pad in comparison list (max 3)
  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // Keep maximum of 3, remove oldest
      }
      return [...prev, id];
    });
  };

  // Get compared pads data
  const comparedPads = useMemo(() => {
    return MOUSEPADS_DATABASE.filter((pad) => compareIds.includes(pad.id));
  }, [compareIds]);

  // Mouse moves over SVG points to generate custom tooltips
  const handleMouseMoveDot = (e: React.MouseEvent<SVGCircleElement>, pad: Mousepad) => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left + 15;
    const y = e.clientY - svgRect.top - 60;
    setTooltip({ x, y, pad });
    setHoveredPad(pad);
  };

  const handleMouseLeaveDot = () => {
    setTooltip(null);
    setHoveredPad(null);
  };

  // SVG Chart Dimensions
  const chartWidth = 600;
  const chartHeight = 450;
  const margin = { top: 50, right: 50, bottom: 60, left: 60 };

  // Mapping function for dots (X is static friction speed, Y is dynamic friction speed)
  const getCoords = (staticF: number, dynamicF: number) => {
    const x = margin.left + ((staticF - 1) / 9) * (chartWidth - margin.left - margin.right);
    const y = chartHeight - margin.bottom - ((dynamicF - 1) / 9) * (chartHeight - margin.top - margin.bottom);
    return { x, y };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pure Control":
        return "#ff4a4a";
      case "Control":
        return "#a95fff";
      case "Balanced":
        return "#ffc800";
      case "Speed":
        return "#00ff9d";
      case "Pure Speed":
        return "#00e0ff";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* Dynamic Range Slider Control */}
      <div className={styles.controlsCard}>
        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            🕹️ Filter by Speed Level:{" "}
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              {SPEED_LEVELS[speedLevel].label}
            </span>
          </div>
          <div className={styles.sliderWrapper}>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={speedLevel}
              onChange={(e) => setSpeedLevel(Number(e.target.value))}
              className={styles.slider}
              aria-label="Speed level filter slider"
            />
            <div className={styles.sliderTicks}>
              {SPEED_LEVELS.map((level) => (
                <span
                  key={level.value}
                  className={`${styles.tick} ${
                    speedLevel === level.value ? styles.tickActive : ""
                  }`}
                  onClick={() => setSpeedLevel(level.value)}
                >
                  {level.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {speedLevel > 0 && (
          <div className={styles.filterBadge}>
            Filtering: {SPEED_LEVELS[speedLevel].label} Pads ({filteredPads.length} items)
            <span
              style={{ cursor: "pointer", marginLeft: "0.5rem", fontWeight: 900 }}
              onClick={() => setSpeedLevel(0)}
            >
              ✕
            </span>
          </div>
        )}
      </div>

      {/* SVG Interactive Scatter Plot */}
      <div className={styles.chartSection}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Friction Space Map (Static vs Dynamic Speed)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Hover over dots to inspect speeds. Higher scores represent higher speeds (lower friction/faster glide).
          </p>
        </div>

        <div className={styles.chartContainer}>
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className={styles.svgChart}
            ref={svgRef}
          >
            {/* Background Grid */}
            {Array.from({ length: 10 }).map((_, i) => {
              const val = i + 1;
              const coords = getCoords(val, val);
              return (
                <g key={i}>
                  {/* Vertical grid lines */}
                  <line
                    x1={coords.x}
                    y1={margin.top}
                    x2={coords.x}
                    y2={chartHeight - margin.bottom}
                    className={styles.chartGrid}
                  />
                  {/* Horizontal grid lines */}
                  <line
                    x1={margin.left}
                    y1={coords.y}
                    x2={chartWidth - margin.right}
                    y2={coords.y}
                    className={styles.chartGrid}
                  />
                  {/* Labels X Axis */}
                  <text
                    x={coords.x}
                    y={chartHeight - margin.bottom + 20}
                    textAnchor="middle"
                    className={styles.chartLabel}
                  >
                    {val}
                  </text>
                  {/* Labels Y Axis */}
                  <text
                    x={margin.left - 15}
                    y={coords.y + 4}
                    textAnchor="end"
                    className={styles.chartLabel}
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={margin.left}
              y1={chartHeight - margin.bottom}
              x2={chartWidth - margin.right}
              y2={chartHeight - margin.bottom}
              className={styles.chartAxis}
            />
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={chartHeight - margin.bottom}
              className={styles.chartAxis}
            />

            {/* Axis Titles */}
            <text
              x={(chartWidth - margin.left - margin.right) / 2 + margin.left}
              y={chartHeight - 15}
              textAnchor="middle"
              className={styles.chartLabel}
              style={{ fontWeight: 600, fill: "var(--text-primary)" }}
            >
              Static Glide Speed Score (Initial Friction Resistance) →
            </text>
            <text
              transform={`rotate(-90 ${15} ${(chartHeight - margin.top - margin.bottom) / 2 + margin.top})`}
              x={15}
              y={(chartHeight - margin.top - margin.bottom) / 2 + margin.top}
              textAnchor="middle"
              className={styles.chartLabel}
              style={{ fontWeight: 600, fill: "var(--text-primary)" }}
            >
              Dynamic Glide Speed Score (Gliding Speed) →
            </text>

            {/* Scatter Dots */}
            {MOUSEPADS_DATABASE.map((pad) => {
              const coords = getCoords(pad.staticFriction, pad.dynamicFriction);
              const isFiltered = filteredPads.some((fp) => fp.id === pad.id);
              const isHovered = hoveredPad?.id === pad.id;
              const isCompared = compareIds.includes(pad.id);
              const color = getCategoryColor(pad.speedCategory);

              return (
                <circle
                  key={pad.id}
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered ? 12 : isCompared ? 9 : 7}
                  fill={color}
                  stroke={isCompared ? "var(--primary)" : "#13141a"}
                  strokeWidth={isCompared ? 3 : 1.5}
                  opacity={isFiltered ? 1 : 0.15}
                  className={styles.chartDot}
                  onMouseMove={(e) => isFiltered && handleMouseMoveDot(e, pad)}
                  onMouseLeave={handleMouseLeaveDot}
                  onClick={() => isFiltered && handleToggleCompare(pad.id)}
                />
              );
            })}
          </svg>

          {/* Render Tooltip dynamically */}
          {tooltip && (
            <div
              className={styles.chartTooltip}
              style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            >
              <div className={styles.tooltipTitle}>{tooltip.pad.name}</div>
              <div className={styles.tooltipMeta}>
                Type: {tooltip.pad.speedCategory} · {tooltip.pad.thickness}
              </div>
              <div className={styles.tooltipScores}>
                <span>Static Speed: {tooltip.pad.staticFriction}/10</span>
                <span>Dynamic Speed: {tooltip.pad.dynamicFriction}/10</span>
                <span>Stop: {tooltip.pad.stoppingPower}/10</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "0.25rem" }}>
                Click dot to add to comparison
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Dashboard (Renders if 1+ pad is selected) */}
      {comparedPads.length > 0 && (
        <div className={styles.compareSection}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              📊 Mousepad Comparison Dashboard ({comparedPads.length}/3 Selected)
            </h3>
            <button
              onClick={() => setCompareIds([])}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Clear Comparison
            </button>
          </div>

          <div className={styles.compareGrid}>
            {comparedPads.map((pad) => (
              <div key={pad.id} className={styles.compareCard}>
                <button
                  className={styles.removeCompareBtn}
                  onClick={() => handleToggleCompare(pad.id)}
                  title="Remove from comparison"
                >
                  ✕
                </button>
                <div className={styles.compareCardName}>{pad.name}</div>
                <div style={{ marginTop: "-0.5rem" }}>
                  <span
                    className={`${styles.speedCategoryBadge} ${
                      pad.speedCategory === "Pure Control"
                        ? styles.badgePureControl
                        : pad.speedCategory === "Control"
                        ? styles.badgeControl
                        : pad.speedCategory === "Balanced"
                        ? styles.badgeBalanced
                        : pad.speedCategory === "Speed"
                        ? styles.badgeSpeed
                        : styles.badgePureSpeed
                    }`}
                  >
                    {pad.speedCategory}
                  </span>
                </div>

                <div className={styles.compareBarGroup}>
                  {/* Static Friction / Speed */}
                  <div>
                    <div className={styles.compareBarLabel}>
                      <span>Static Glide Speed (Flick Response)</span>
                      <span>{pad.staticFriction}/10</span>
                    </div>
                    <div className={styles.compareBarOuter}>
                      <div
                        className={styles.compareBarInner}
                        style={{
                          width: `${pad.staticFriction * 10}%`,
                          background: getCategoryColor(pad.speedCategory),
                        }}
                      />
                    </div>
                  </div>

                  {/* Dynamic Friction / Speed */}
                  <div>
                    <div className={styles.compareBarLabel}>
                      <span>Dynamic Glide Speed (Tracking Speed)</span>
                      <span>{pad.dynamicFriction}/10</span>
                    </div>
                    <div className={styles.compareBarOuter}>
                      <div
                        className={styles.compareBarInner}
                        style={{
                          width: `${pad.dynamicFriction * 10}%`,
                          background: getCategoryColor(pad.speedCategory),
                        }}
                      />
                    </div>
                  </div>

                  {/* Stopping Power */}
                  <div>
                    <div className={styles.compareBarLabel}>
                      <span>Stopping Power (Braking Control)</span>
                      <span>{pad.stoppingPower}/10</span>
                    </div>
                    <div className={styles.compareBarOuter}>
                      <div
                        className={styles.compareBarInner}
                        style={{
                          width: `${pad.stoppingPower * 10}%`,
                          background: "var(--secondary)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Durability */}
                  <div>
                    <div className={styles.compareBarLabel}>
                      <span>Durability / Lifespan</span>
                      <span>{pad.durability}/10</span>
                    </div>
                    <div className={styles.compareBarOuter}>
                      <div
                        className={styles.compareBarInner}
                        style={{
                          width: `${pad.durability * 10}%`,
                          background: "#fff",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.compareDetails}>
                  <div className={styles.compareDetailItem}>
                    <span className={styles.detailLabel}>Thickness</span>
                    <span className={styles.detailVal}>{pad.thickness}</span>
                  </div>
                  <div className={styles.compareDetailItem}>
                    <span className={styles.detailLabel}>Price</span>
                    <span className={styles.detailVal}>{pad.price}</span>
                  </div>
                  <div className={styles.compareDetailItem} style={{ gridColumn: "span 2" }}>
                    <span className={styles.detailLabel}>Best For Games</span>
                    <span className={styles.detailVal} style={{ fontSize: "0.75rem" }}>
                      {pad.bestGames || "CS2, Valorant, Apex, Fortnite"}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  <a
                    href={pad.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={styles.buyBtn}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    View Pricing & Reviews →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Database Table View */}
      <div className={styles.tableContainer}>
        <table className={styles.padTable}>
          <thead>
            <tr>
              <th>Mousepad Model</th>
              <th>Speed Category</th>
              <th>Static Speed</th>
              <th>Dynamic Speed</th>
              <th>Stopping Power</th>
              <th>Durability</th>
              <th>Thickness</th>
              <th>Price</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPads.map((pad) => {
              const isCompared = compareIds.includes(pad.id);
              return (
                <tr key={pad.id}>
                  <td>
                    <div className={styles.padNameCell}>
                      <span className={styles.padName}>{pad.name}</span>
                      <span className={styles.padBrand}>{pad.brand}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.speedCategoryBadge} ${
                        pad.speedCategory === "Pure Control"
                          ? styles.badgePureControl
                          : pad.speedCategory === "Control"
                          ? styles.badgeControl
                          : pad.speedCategory === "Balanced"
                          ? styles.badgeBalanced
                          : pad.speedCategory === "Speed"
                          ? styles.badgeSpeed
                          : styles.badgePureSpeed
                      }`}
                    >
                      {pad.speedCategory}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.scoreBadge} ${
                        pad.staticFriction >= 8
                          ? styles.scoreBadgeHigh
                          : pad.staticFriction >= 5
                          ? styles.scoreBadgeMed
                          : styles.scoreBadgeLow
                      }`}
                    >
                      {pad.staticFriction}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.scoreBadge} ${
                        pad.dynamicFriction >= 8
                          ? styles.scoreBadgeHigh
                          : pad.dynamicFriction >= 5
                          ? styles.scoreBadgeMed
                          : styles.scoreBadgeLow
                      }`}
                    >
                      {pad.dynamicFriction}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.scoreBadge} ${
                        pad.stoppingPower >= 8
                          ? styles.scoreBadgeHigh
                          : pad.stoppingPower >= 5
                          ? styles.scoreBadgeMed
                          : styles.scoreBadgeLow
                      }`}
                    >
                      {pad.stoppingPower}
                    </span>
                  </td>
                  <td>
                    <span className={styles.scoreBadge}>{pad.durability}</span>
                  </td>
                  <td>
                    <span style={{ fontFamily: "monospace" }}>{pad.thickness}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      {pad.price}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.25rem" }}>
                      <button
                        className={`${styles.compareBtn} ${
                          isCompared ? styles.compareBtnActive : ""
                        }`}
                        onClick={() => handleToggleCompare(pad.id)}
                      >
                        {isCompared ? "Compared" : "Compare"}
                      </button>
                      <a
                        href={pad.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className={styles.buyBtn}
                      >
                        Buy
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards view for Mobile screens */}
      <div className={styles.cardsGrid}>
        {filteredPads.map((pad) => {
          const isCompared = compareIds.includes(pad.id);
          return (
            <div key={pad.id} className={styles.padCard}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>{pad.name}</div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {pad.brand} · {pad.thickness}
                  </span>
                </div>
                <span
                  className={`${styles.speedCategoryBadge} ${
                    pad.speedCategory === "Pure Control"
                      ? styles.badgePureControl
                      : pad.speedCategory === "Control"
                      ? styles.badgeControl
                      : pad.speedCategory === "Balanced"
                      ? styles.badgeBalanced
                      : pad.speedCategory === "Speed"
                      ? styles.badgeSpeed
                      : styles.badgePureSpeed
                  }`}
                >
                  {pad.speedCategory}
                </span>
              </div>

              <div className={styles.cardStats}>
                <div className={styles.cardStatItem}>
                  <span className={styles.statLabel}>Static</span>
                  <span className={styles.statVal}>{pad.staticFriction}</span>
                </div>
                <div className={styles.cardStatItem}>
                  <span className={styles.statLabel}>Dynamic</span>
                  <span className={styles.statVal}>{pad.dynamicFriction}</span>
                </div>
                <div className={styles.cardStatItem}>
                  <span className={styles.statLabel}>Stop</span>
                  <span className={styles.statVal}>{pad.stoppingPower}</span>
                </div>
                <div className={styles.cardStatItem}>
                  <span className={styles.statLabel}>Life</span>
                  <span className={styles.statVal}>{pad.durability}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{pad.price}</span>
                <div className={styles.cardAction}>
                  <button
                    className={`${styles.compareBtn} ${isCompared ? styles.compareBtnActive : ""}`}
                    onClick={() => handleToggleCompare(pad.id)}
                    style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
                  >
                    {isCompared ? "Compared" : "Compare"}
                  </button>
                  <a
                    href={pad.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={styles.buyBtn}
                    style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem" }}
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
