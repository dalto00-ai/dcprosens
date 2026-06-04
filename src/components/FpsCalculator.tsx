"use client";

import React, { useState, useMemo } from 'react';
import styles from './FpsCalculator.module.css';

interface CpuItem {
  id: string;
  name: string;
  score: number; // base CPU power score
}

interface GpuItem {
  id: string;
  name: string;
  score: number; // base GPU power score
}

interface GameItem {
  id: string;
  name: string;
  genre: string;
  boundType: 'cpu' | 'balanced' | 'gpu';
  description: string;
}

const CPU_OPTIONS: CpuItem[] = [
  { id: 'ryzen_7800x3d', name: 'AMD Ryzen 7 7800X3D', score: 100 },
  { id: 'core_14900k', name: 'Intel Core i9 14900K', score: 96 },
  { id: 'ryzen_7950x3d', name: 'AMD Ryzen 9 7950X3D', score: 98 },
  { id: 'core_13700k', name: 'Intel Core i7 13700K', score: 86 },
  { id: 'core_13600k', name: 'Intel Core i5 13600K', score: 78 },
  { id: 'ryzen_7600x', name: 'AMD Ryzen 5 7600X', score: 72 },
  { id: 'ryzen_5800x3d', name: 'AMD Ryzen 7 5800X3D', score: 80 },
  { id: 'ryzen_5600x', name: 'AMD Ryzen 5 5600X', score: 60 },
  { id: 'core_12400f', name: 'Intel Core i5 12400F', score: 58 },
  { id: 'core_10400f', name: 'Intel Core i5 10400F', score: 40 },
  { id: 'core_8700k', name: 'Intel Core i7 8700K', score: 42 },
  { id: 'ryzen_3600', name: 'AMD Ryzen 5 3600', score: 45 },
  { id: 'core_7400', name: 'Intel Core i5 7400', score: 22 },
];

const GPU_OPTIONS: GpuItem[] = [
  { id: 'rtx_4090', name: 'NVIDIA GeForce RTX 4090', score: 120 },
  { id: 'rtx_4080', name: 'NVIDIA GeForce RTX 4080', score: 100 },
  { id: 'rtx_4070', name: 'NVIDIA GeForce RTX 4070', score: 75 },
  { id: 'rtx_4060', name: 'NVIDIA GeForce RTX 4060', score: 50 },
  { id: 'rtx_3070', name: 'NVIDIA GeForce RTX 3070', score: 62 },
  { id: 'rtx_3060', name: 'NVIDIA GeForce RTX 3060', score: 45 },
  { id: 'gtx_1660_super', name: 'NVIDIA GeForce GTX 1660 Super', score: 25 },
  { id: 'gtx_1060', name: 'NVIDIA GeForce GTX 1060', score: 18 },
  { id: 'rx_7900_xtx', name: 'AMD Radeon RX 7900 XTX', score: 98 },
  { id: 'rx_7800_xt', name: 'AMD Radeon RX 7800 XT', score: 78 },
  { id: 'rx_6700_xt', name: 'AMD Radeon RX 6700 XT', score: 55 },
  { id: 'rx_6600', name: 'AMD Radeon RX 6600', score: 42 },
  { id: 'rx_580', name: 'AMD Radeon RX 580', score: 15 },
];

const GAMES: GameItem[] = [
  { 
    id: 'valorant', 
    name: 'Valorant', 
    genre: 'Tactical Shooter',
    boundType: 'cpu',
    description: 'Valorant runs on Riot Games\' custom engine and is extremely CPU-bound. Upgrading your processor is the single best way to achieve competitive FPS.' 
  },
  { 
    id: 'cs2', 
    name: 'Counter-Strike 2', 
    genre: 'Tactical Shooter',
    boundType: 'balanced',
    description: 'CS2 runs on the Source 2 engine, introducing advanced smoke mechanics and physical lighting. It demands a highly balanced setup with a strong CPU and mid-to-high end GPU.' 
  },
  { 
    id: 'apex', 
    name: 'Apex Legends', 
    genre: 'Battle Royale',
    boundType: 'gpu',
    description: 'Apex Legends requires rendering large, open maps with dense vegetation and player particles, making it heavily dependent on your GPU. The engine has a hard limit of 300 FPS.' 
  },
];

export default function FpsCalculator() {
  const [selectedCpuId, setSelectedCpuId] = useState<string>(CPU_OPTIONS[0].id);
  const [selectedGpuId, setSelectedGpuId] = useState<string>(GPU_OPTIONS[2].id); // default to RTX 4070
  const [selectedGameId, setSelectedGameId] = useState<string>(GAMES[0].id); // default to Valorant

  // Find objects
  const cpu = useMemo(() => CPU_OPTIONS.find(c => c.id === selectedCpuId) || CPU_OPTIONS[0], [selectedCpuId]);
  const gpu = useMemo(() => GPU_OPTIONS.find(g => g.id === selectedGpuId) || GPU_OPTIONS[0], [selectedGpuId]);
  const game = useMemo(() => GAMES.find(g => g.id === selectedGameId) || GAMES[0], [selectedGameId]);

  // Calculations
  const calculatedData = useMemo(() => {
    const cpuScore = cpu.score;
    const gpuScore = gpu.score;

    // Formulas
    let rawFps = 0;
    if (game.id === 'valorant') {
      rawFps = cpuScore * 6 + gpuScore * 1.5;
    } else if (game.id === 'cs2') {
      rawFps = cpuScore * 4 + gpuScore * 3;
    } else if (game.id === 'apex') {
      rawFps = Math.min(300, cpuScore * 2 + gpuScore * 5); // engine cap at 300
    }

    const fps = Math.round(rawFps);

    // Bottlenecks
    const cpuBottleneck = Math.max(0, ((gpuScore - cpuScore) / gpuScore) * 100);
    const gpuBottleneck = Math.max(0, ((cpuScore - gpuScore) / cpuScore) * 100);

    let bottleneckType: 'cpu' | 'gpu' | 'balanced' = 'balanced';
    let bottleneckPct = 0;

    if (cpuBottleneck > 8) {
      bottleneckType = 'cpu';
      bottleneckPct = Math.round(cpuBottleneck);
    } else if (gpuBottleneck > 8) {
      bottleneckType = 'gpu';
      bottleneckPct = Math.round(gpuBottleneck);
    } else {
      bottleneckType = 'balanced';
      bottleneckPct = Math.round(Math.max(cpuBottleneck, gpuBottleneck));
    }

    // Monitor refresh rates
    const monitorStatus = {
      hz144: fps >= 144,
      hz240: fps >= 240,
      hz360: fps >= 360,
    };

    return {
      fps,
      bottleneckType,
      bottleneckPct,
      monitorStatus,
    };
  }, [cpu, gpu, game]);

  const { fps, bottleneckType, bottleneckPct, monitorStatus } = calculatedData;

  // Recommendations
  const upgradeRecommendation = useMemo(() => {
    if (bottleneckType === 'cpu') {
      return {
        type: 'CPU Upgrade Needed',
        productName: 'AMD Ryzen 7 7800X3D',
        reason: `Your ${cpu.name} is bottlenecks the performance of your ${gpu.name}. To unlock the full potential of your graphics card in ${game.name}, we strongly recommend upgrading to the Ryzen 7 7800X3D — currently the world's best gaming CPU due to its massive 3D V-Cache.`,
        amazonLink: 'https://www.amazon.com/dp/B0BTZB7F88?tag=dcprosens-20',
        badge: 'Highly CPU Bound',
      };
    } else if (bottleneckType === 'gpu') {
      const targetGpu = gpu.score < 40 ? 'GeForce RTX 4060' : 'GeForce RTX 4070 Super';
      const targetLink = gpu.score < 40 
        ? 'https://www.amazon.com/dp/B0C7YPF1K5?tag=dcprosens-20' 
        : 'https://www.amazon.com/dp/B0CSBDV15F?tag=dcprosens-20';
      return {
        type: 'GPU Upgrade Needed',
        productName: `NVIDIA ${targetGpu}`,
        reason: `Your ${gpu.name} is struggling to keep up with your high-end ${cpu.name}. In ${game.name}, the GPU is running at 100% load while the CPU waits. Upgrading to a ${targetGpu} will dramatically increase your frames and enable higher visual settings.`,
        amazonLink: targetLink,
        badge: 'Highly GPU Bound',
      };
    } else {
      return {
        type: 'Balanced Setup',
        productName: 'Monitor / RAM Upgrade',
        reason: `Your CPU and GPU are running in great harmony! You have less than 8% bottleneck. If you want further improvements, consider getting low-latency high-speed DDR5 RAM or investing in a premium gaming monitor to match your stellar frame rates.`,
        amazonLink: 'https://www.amazon.com/s?k=240hz+gaming+monitor&tag=dcprosens-20',
        badge: 'Perfectly Balanced',
      };
    }
  }, [bottleneckType, cpu, gpu, game]);

  return (
    <div className={styles.wrapper}>
      {/* Configuration Grid */}
      <div className={styles.configCard}>
        <h2 className={styles.configTitle}>⚙️ Configure Your Gaming PC</h2>
        
        <div className={styles.formRow}>
          {/* Game Selector */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>🎮 Choose Game</label>
            <div className={styles.gameTabs}>
              {GAMES.map(g => (
                <button
                  key={g.id}
                  className={`${styles.gameTab} ${selectedGameId === g.id ? styles.activeGame : ''}`}
                  onClick={() => setSelectedGameId(g.id)}
                  type="button"
                >
                  <span className={styles.gameName}>{g.name}</span>
                  <span className={styles.gameBound}>
                    {g.boundType === 'cpu' ? 'CPU Bound' : g.boundType === 'gpu' ? 'GPU Bound' : 'Balanced'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.selectorsRow}>
          {/* CPU Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="cpu-select">🖥️ Central Processing Unit (CPU)</label>
            <select
              id="cpu-select"
              className={styles.select}
              value={selectedCpuId}
              onChange={(e) => setSelectedCpuId(e.target.value)}
            >
              {CPU_OPTIONS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} (Power Score: {c.score})
                </option>
              ))}
            </select>
            <p className={styles.helperText}>Select your exact or nearest processor model</p>
          </div>

          {/* GPU Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="gpu-select">🔌 Graphics Card (GPU)</label>
            <select
              id="gpu-select"
              className={styles.select}
              value={selectedGpuId}
              onChange={(e) => setSelectedGpuId(e.target.value)}
            >
              {GPU_OPTIONS.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} (Power Score: {g.score})
                </option>
              ))}
            </select>
            <p className={styles.helperText}>Select your graphics card</p>
          </div>
        </div>
      </div>

      {/* Main Results Panel */}
      <div className={styles.dashboardGrid}>
        
        {/* Estimated FPS Card */}
        <div className={styles.dashCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardCategory}>Estimated Performance</span>
          </div>
          <div className={styles.fpsDisplay}>
            <span className={styles.fpsNum}>{fps}</span>
            <span className={styles.fpsUnit}>AVG FPS</span>
          </div>
          <div className={styles.gameDetails}>
            <span className={styles.genreBadge}>{game.genre}</span>
            <p className={styles.gameInfoText}>{game.description}</p>
          </div>
        </div>

        {/* Bottleneck Analysis Card */}
        <div className={styles.dashCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardCategory}>Bottleneck Diagnosis</span>
          </div>
          
          <div className={styles.bottleneckMeterArea}>
            {bottleneckType === 'cpu' && (
              <div className={`${styles.statusBadge} ${styles.badgeCpu}`}>
                ⚠️ CPU Bottleneck: {bottleneckPct}%
              </div>
            )}
            {bottleneckType === 'gpu' && (
              <div className={`${styles.statusBadge} ${styles.badgeGpu}`}>
                ⚠️ GPU Bottleneck: {bottleneckPct}%
              </div>
            )}
            {bottleneckType === 'balanced' && (
              <div className={`${styles.statusBadge} ${styles.badgeBalanced}`}>
                ✅ Perfectly Balanced: {bottleneckPct}% Bottleneck
              </div>
            )}
            
            {/* Visual Bar representation */}
            <div className={styles.barContainer}>
              <div className={styles.barLabel}>
                <span>CPU ({cpu.name})</span>
                <span>GPU ({gpu.name})</span>
              </div>
              <div className={styles.visualBar}>
                <div 
                  className={styles.cpuFill} 
                  style={{ width: `${(cpu.score / (cpu.score + gpu.score)) * 100}%` }} 
                />
                <div 
                  className={styles.gpuFill} 
                  style={{ width: `${(gpu.score / (cpu.score + gpu.score)) * 100}%` }} 
                />
              </div>
              <div className={styles.barLegend}>
                <span className={styles.legendCpu}>CPU Share</span>
                <span className={styles.legendGpu}>GPU Share</span>
              </div>
            </div>

            <p className={styles.bottleneckDesc}>
              {bottleneckType === 'cpu' && (
                `Your graphics card (${gpu.name}) is waiting on your processor (${cpu.name}) to compile frame data. Upgrading your CPU will directly push your frames higher in ${game.name}.`
              )}
              {bottleneckType === 'gpu' && (
                `Your processor (${cpu.name}) is sending data faster than your GPU (${gpu.name}) can render it. The GPU is maxed out. To get more frames, you should upgrade your GPU or reduce in-game graphics settings.`
              )}
              {bottleneckType === 'balanced' && (
                `Great configuration! Your CPU and GPU are incredibly well-matched. Neither component is severely restricting the potential of the other, giving you optimal performance efficiency.`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Monitor refresh rate compatibility & Upgrades */}
      <div className={styles.upgradeSection}>
        
        {/* Refresh Rate Support */}
        <div className={styles.upgradeBlock}>
          <h3 className={styles.subTitle}>🖥️ Monitor Refresh Rate Compatibility</h3>
          <p className={styles.subText}>See which gaming monitors this setup can run smoothly based on your estimated FPS of {fps}:</p>
          
          <div className={styles.hzStatusGrid}>
            {/* 144Hz */}
            <div className={`${styles.hzCard} ${monitorStatus.hz144 ? styles.hzOk : styles.hzFail}`}>
              <div className={styles.hzCheckIcon}>
                {monitorStatus.hz144 ? '✅' : '❌'}
              </div>
              <div className={styles.hzTitle}>144Hz Monitor</div>
              <div className={styles.hzStatusText}>
                {monitorStatus.hz144 ? 'Excellent Match' : 'Not Recommended'}
              </div>
              <p className={styles.hzDesc}>
                {monitorStatus.hz144 
                  ? 'Your system runs well above 144 FPS, maintaining butter-smooth gameplay on 144Hz panels.' 
                  : 'Your frames might dip below 144, causing stutter on high-refresh rate displays.'}
              </p>
            </div>

            {/* 240Hz */}
            <div className={`${styles.hzCard} ${monitorStatus.hz240 ? styles.hzOk : styles.hzFail}`}>
              <div className={styles.hzCheckIcon}>
                {monitorStatus.hz240 ? '✅' : '❌'}
              </div>
              <div className={styles.hzTitle}>240Hz Monitor</div>
              <div className={styles.hzStatusText}>
                {monitorStatus.hz240 ? 'Excellent Match' : 'Sub-Optimal'}
              </div>
              <p className={styles.hzDesc}>
                {monitorStatus.hz240 
                  ? 'Perfect for 240Hz high-tier competitive monitors. Minimal system delay.' 
                  : 'You won\'t fully saturate a 240Hz monitor. Consider upgrading hardware first.'}
              </p>
            </div>

            {/* 360Hz */}
            <div className={`${styles.hzCard} ${monitorStatus.hz360 ? styles.hzOk : styles.hzFail}`}>
              <div className={styles.hzCheckIcon}>
                {monitorStatus.hz360 ? '✅' : '❌'}
              </div>
              <div className={styles.hzTitle}>360Hz Monitor</div>
              <div className={styles.hzStatusText}>
                {monitorStatus.hz360 ? 'Excellent Match' : 'Not Recommended'}
              </div>
              <p className={styles.hzDesc}>
                {monitorStatus.hz360 
                  ? 'Stellar performance. Fully compatible with ultra-competitive 360Hz/540Hz displays.' 
                  : 'FPS is too low to warrant a 360Hz display. Stick to 144Hz or upgrade CPU/GPU.'}
              </p>
            </div>
          </div>
        </div>

        {/* Upgrade Advice Box */}
        <div className={styles.recommendationCard}>
          <div className={styles.badgeLine}>
            <span className={styles.recBadge}>{upgradeRecommendation.badge}</span>
            <span className={styles.recTitle}>{upgradeRecommendation.type}</span>
          </div>
          <h4 className={styles.recProduct}>{upgradeRecommendation.productName}</h4>
          <p className={styles.recText}>{upgradeRecommendation.reason}</p>
          
          <a
            href={upgradeRecommendation.amazonLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={styles.buyBtn}
          >
            Check Price on Amazon →
          </a>
          <span className={styles.affiliateNote}>*As an Amazon Associate we earn from qualifying purchases.</span>
        </div>
      </div>

      {/* Educational FAQ Section */}
      <div className={styles.faqSection}>
        <h3 className={styles.faqTitle}>💡 FPS & Bottlenecks Explained</h3>
        
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>What is a PC bottleneck?</h4>
            <p>A bottleneck occurs when one hardware component limits the performance of another. For example, if you have an ultra-fast RTX 4090 GPU but an old Intel i5 7400 CPU, the CPU cannot compute game state fast enough. The RTX 4090 sits idle, waiting for the CPU, resulting in lower FPS than expected.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Why does Valorant benefit more from a fast CPU?</h4>
            <p>Games like Valorant, CS2, and League of Legends are tactical shooters designed to run on simple graphics hardware. Because the graphics are lightweight, the GPU finishes rendering quickly. The game performance is instead limited by how fast the CPU can calculate player positions, hit registration, and server-side tick rate inputs.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>How can I reduce CPU bottlenecks without upgrading?</h4>
            <p>If you have a CPU bottleneck, you can reduce its impact by: 1) Closing all background applications (like Discord, Chrome browser tabs, or recording software), 2) Enabling XMP/EXPO in your motherboard BIOS to speed up RAM, or 3) Capping your FPS to match your monitor's refresh rate to stabilize frame times.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>How can I reduce GPU bottlenecks?</h4>
            <p>If you are GPU bottlenecked, you can easily increase your FPS by lowering your in-game graphic settings. Turn down shadow quality, ambient occlusion, anti-aliasing, and resolution scale. Enabling scaling technologies like NVIDIA DLSS or AMD FSR will also provide an immediate FPS boost.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
