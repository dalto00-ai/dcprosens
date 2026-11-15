"use client";

import React, { useState, useMemo } from 'react';
import styles from './DeskSpaceCalculator.module.css';

interface GearItem {
  name: string;
  dimensions: string;
  type: string;
  link: string;
}

const GEAR_SUGGESTIONS: Record<string, GearItem[]> = {
  XL: [
    {
      name: 'SteelSeries QcK Heavy XXL',
      dimensions: '900 x 400 mm (4mm thick)',
      type: 'Control Cloth',
      link: 'https://www.amazon.com/s?k=SteelSeries+QcK+Heavy+XXL&crid=2HJO9OR64VW0H&sprefix=steelseries+qck+heavy+xxl%2Caps%2C265&linkCode=ll2&tag=dcoutlier-20&linkId=562ff37d1b872d9e23fd344a235cdae4&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Logitech G840 XL',
      dimensions: '900 x 400 mm (3mm thick)',
      type: 'Balanced Cloth',
      link: 'https://www.amazon.com/s?k=Logitech+G840+XL&crid=2RCGCL3GGWPOH&sprefix=logitech+g840+xl%2Caps%2C254&linkCode=ll2&tag=dcoutlier-20&linkId=62cda0239449f4dcb6b32f4026a24495&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Artisan Zero XL (Soft)',
      dimensions: '490 x 420 mm (4mm thick)',
      type: 'Premium Hybrid Control',
      link: 'https://www.amazon.com/dp/B0B38FBNRV?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl'
    }
  ],
  Large: [
    {
      name: 'SteelSeries QcK+ Large',
      dimensions: '450 x 400 mm (2mm thick)',
      type: 'Classic Control',
      link: 'https://www.amazon.com/s?k=SteelSeries+QcK%2B+Large&crid=7NEGT6FSRHU8&sprefix=steelseries+qck%2B+large%2Caps%2C258&linkCode=ll2&tag=dcoutlier-20&linkId=1a73621ecce20c5e0a321cfe01666de5&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Logitech G640 Large',
      dimensions: '460 x 400 mm (3mm thick)',
      type: 'Balanced Glide',
      link: 'https://www.amazon.com/dp/B0BHMKVF1P?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Artisan Hayate Otsu L (XSoft)',
      dimensions: '420 x 330 mm (4mm thick)',
      type: 'Premium Speed/Control Hybrid',
      link: 'https://www.amazon.com/s?k=Artisan+Zero+Mid+%28Soft%29&crid=1AXV45EC8ISG9&sprefix=artisan+zero+mid+soft+%2Caps%2C263&linkCode=ll2&tag=dcoutlier-20&linkId=7298ebe8e92488c4801cee756bf4bd04&language=en_US&ref_=as_li_ss_tl'
    }
  ],
  Medium: [
    {
      name: 'SteelSeries QcK Medium',
      dimensions: '320 x 270 mm (2mm thick)',
      type: 'Compact Control',
      link: 'https://www.amazon.com/s?k=SteelSeries+QcK%2B+Large&crid=7NEGT6FSRHU8&sprefix=steelseries+qck%2B+large%2Caps%2C258&linkCode=ll2&tag=dcoutlier-20&linkId=1a73621ecce20c5e0a321cfe01666de5&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Razer Gigantus V2 Medium',
      dimensions: '360 x 275 mm (3mm thick)',
      type: 'Soft Textured Cloth',
      link: 'https://www.amazon.com/s?k=Razer+Gigantus+V2+Medium&crid=2XRXOGXBC49TM&sprefix=razer+gigantus+v2+medium%2Caps%2C273&linkCode=ll2&tag=dcoutlier-20&linkId=19c7ac6c0721627e71f068b473817a1d&language=en_US&ref_=as_li_ss_tl'
    }
  ],
  Small: [
    {
      name: 'SteelSeries QcK Mini',
      dimensions: '250 x 210 mm (2mm thick)',
      type: 'Ultra Compact Cloth',
      link: 'https://www.amazon.com/s?k=SteelSeries+QcK%2B+Large&crid=7NEGT6FSRHU8&sprefix=steelseries+qck%2B+large%2Caps%2C258&linkCode=ll2&tag=dcoutlier-20&linkId=1a73621ecce20c5e0a321cfe01666de5&language=en_US&ref_=as_li_ss_tl'
    },
    {
      name: 'Logitech G240 Small',
      dimensions: '340 x 280 mm (1mm thin)',
      type: 'Budget Control',
      link: 'https://www.amazon.com/s?k=Logitech+G440+Hard&crid=2WCMMQ7SQZHSP&sprefix=logitech+g440+hard%2Caps%2C262&linkCode=ll2&tag=dcoutlier-20&linkId=68c9e59f8ae0faef76fef29462355e84&language=en_US&ref_=as_li_ss_tl'
    }
  ]
};

const GAMES_LIST = [
  { id: 'valorant', name: 'Valorant', constant: 13062.86 },
  { id: 'cs2', name: 'Counter-Strike 2 / CS:GO', constant: 41563.64 },
  { id: 'apex', name: 'Apex Legends', constant: 41563.64 },
  { id: 'overwatch', name: 'Overwatch 2', constant: 138545.45 }
];

export default function DeskSpaceCalculator() {
  const [deskWidth, setDeskWidth] = useState<number>(45); // width in cm
  const [targetRotation, setTargetRotation] = useState<number>(180); // 90, 180, 360 degrees
  const [selectedGameId, setSelectedGameId] = useState<string>('valorant');
  const [dpi, setDpi] = useState<number>(800);

  const selectedGame = useMemo(() => {
    return GAMES_LIST.find(g => g.id === selectedGameId) || GAMES_LIST[0];
  }, [selectedGameId]);

  const calculations = useMemo(() => {
    // Determine maximum physical cm/360 allowed
    let maxCm360 = deskWidth;
    if (targetRotation === 180) {
      maxCm360 = deskWidth * 2;
    } else if (targetRotation === 90) {
      maxCm360 = deskWidth * 4;
    }

    // Min in-game sensitivity (lower cm/360 means higher sens)
    const minSens = selectedGame.constant / (dpi * maxCm360);

    // Mousepad category recommendation based on available desk space
    let padCategory: 'XL' | 'Large' | 'Medium' | 'Small' = 'Large';
    let padReason = '';

    if (deskWidth >= 45) {
      padCategory = 'XL';
      padReason = 'You have plenty of space! An XL or extended desk mat will fit perfectly and allow low-sensitivity arm aiming without any risk of hitting peripherals.';
    } else if (deskWidth >= 35) {
      padCategory = 'Large';
      padReason = 'A large mousepad is the ideal sweet spot. It provides comfortable room for 180° turns for hybrid wrist/arm aimers, fitting standard gaming desks.';
    } else if (deskWidth >= 25) {
      padCategory = 'Medium';
      padReason = 'A medium pad fits compact spaces. You should watch your sensitivity to ensure you do not run off the edges during fast flick shots.';
    } else {
      padCategory = 'Small';
      padReason = 'Tight fit! You are limited to small mousepads. You will need a high in-game sensitivity to avoid swiping off your pad constantly.';
    }

    return {
      maxCm360: Math.round(maxCm360 * 10) / 10,
      minSens: Math.round(minSens * 1000) / 1000,
      padCategory,
      padReason
    };
  }, [deskWidth, targetRotation, selectedGame, dpi]);

  const { maxCm360, minSens, padCategory, padReason } = calculations;

  // Gear suggestions based on recommendation
  const gearList = GEAR_SUGGESTIONS[padCategory];

  return (
    <div className={styles.wrapper}>
      {/* Inputs Section */}
      <div className={styles.inputCard}>
        <h2 className={styles.cardTitle}>📐 Input Your Desk Dimensions</h2>
        
        <div className={styles.inputGrid}>
          {/* Desk Space Slider */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              📏 Available Mousepad Desk Width: <span className={styles.highlight}>{deskWidth} cm</span>
            </label>
            <div className={styles.sliderWrapper}>
              <input
                type="range"
                className={styles.slider}
                min={15}
                max={100}
                step={1}
                value={deskWidth}
                onChange={(e) => setDeskWidth(Number(e.target.value))}
                aria-label="Available desk width in cm"
              />
            </div>
            <p className={styles.helperText}>
              Measure the horizontal space from your keyboard to the edge of your desk.
            </p>
          </div>

          {/* Swipe Degree Dropdown */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="rotation-select">🔄 Target Rotation in One Swipe</label>
            <select
              id="rotation-select"
              className={styles.select}
              value={targetRotation}
              onChange={(e) => setTargetRotation(Number(e.target.value))}
            >
              <option value={90}>90° Turn (Half-turn to side)</option>
              <option value={180}>180° Turn (Instant look behind)</option>
              <option value={360}>360° Turn (Full rotation)</option>
            </select>
            <p className={styles.helperText}>
              The rotation you want to complete comfortably in a single side-to-side swipe.
            </p>
          </div>

          {/* Game Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="game-select">🎮 Target Game</label>
            <select
              id="game-select"
              className={styles.select}
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
            >
              {GAMES_LIST.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <p className={styles.helperText}>Calculates the specific in-game sensitivity limits.</p>
          </div>

          {/* Mouse DPI */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>🔢 Mouse DPI</label>
            <div className={styles.dpiGrid}>
              {[400, 800, 1600, 3200].map(d => (
                <button
                  key={d}
                  className={`${styles.dpiBtn} ${dpi === d ? styles.dpiActive : ''}`}
                  onClick={() => setDpi(d)}
                  type="button"
                >
                  {d}
                </button>
              ))}
            </div>
            <p className={styles.helperText}>Dots Per Inch of your mouse hardware sensor.</p>
          </div>
        </div>
      </div>

      {/* Visual Desk Representation */}
      <div className={styles.deskWidgetCard}>
        <h3 className={styles.widgetTitle}>🖥️ Visual Desk Layout Map</h3>
        <p className={styles.widgetSubtitle}>
          Visualizing your mousepad space ({deskWidth}cm) on a standard 120cm wide gaming desk setup.
        </p>

        <div className={styles.deskScene}>
          <div className={styles.virtualDesk}>
            {/* Monitor */}
            <div className={styles.virtualMonitor}>
              <div className={styles.screen}>Monitor</div>
              <div className={styles.stand} />
            </div>

            {/* Keyboard */}
            <div className={styles.virtualKeyboard}>
              <div className={styles.kbKeys} />
            </div>

            {/* Mousepad area - dynamically scaled */}
            <div 
              className={styles.virtualPad}
              style={{ width: `${Math.max(15, Math.min(65, (deskWidth / 120) * 100))}%` }}
            >
              <div className={styles.padLabel}>
                <span>Mousepad Area</span>
                <strong>{deskWidth} cm</strong>
              </div>
              
              {/* Mouse inside pad */}
              <div className={styles.virtualMouse}>🖱️</div>
            </div>
          </div>
        </div>
        
        <div className={styles.widgetLegend}>
          <span>💡 Mousepad width is scaled relative to the keyboard and monitor footprint.</span>
        </div>
      </div>

      {/* Analysis Results Panel */}
      <div className={styles.resultsGrid}>
        
        {/* Safe Zone Details */}
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.headerBadge}>Safe Zone Analysis</span>
          </div>
          
          <div className={styles.resultMainValue}>
            <span className={styles.resultLabel}>Maximum cm/360 Limit</span>
            <span className={styles.resultVal}>{maxCm360} cm</span>
            <span className={styles.resultSub}>Any higher cm/360 will slide off the desk</span>
          </div>

          <div className={styles.sensRequirement}>
            <span className={styles.reqTitle}>Required In-Game Sensitivity</span>
            <div className={styles.reqValueBox}>
              <span className={styles.reqArrow}>&gt;=</span>
              <span className={styles.reqSens}>{minSens}</span>
            </div>
            <p className={styles.reqExplain}>
              To prevent running out of desk space when doing a {targetRotation}° swipe, your in-game sensitivity for <strong>{selectedGame.name}</strong> at <strong>{dpi} DPI</strong> must be <strong>{minSens} or higher</strong>.
            </p>
          </div>
        </div>

        {/* Mousepad Size Recommendations */}
        <div className={styles.recommendCard}>
          <div className={styles.cardHeader}>
            <span className={`${styles.headerBadge} ${styles.badgeAccent}`}>Size Recommendation</span>
          </div>

          <div className={styles.recommendHeader}>
            <span className={styles.recLabel}>Suggested Mousepad Class</span>
            <h3 className={styles.recClass}>{padCategory} Size Pad</h3>
          </div>

          <p className={styles.recText}>{padReason}</p>

          <div className={styles.gearBox}>
            <h4 className={styles.gearBoxTitle}>🛒 Top Pick Mousepads for this Space:</h4>
            <div className={styles.gearList}>
              {gearList.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer sponsored"
                  className={styles.gearItem}
                >
                  <div className={styles.gearInfo}>
                    <span className={styles.gearName}>{item.name}</span>
                    <span className={styles.gearDetails}>{item.dimensions} · {item.type}</span>
                  </div>
                  <span className={styles.amazonLink}>Shop Amazon →</span>
                </a>
              ))}
            </div>
            <span className={styles.affiliateDisclaimer}>*As an Amazon Associate we earn from qualifying purchases.</span>
          </div>
        </div>
      </div>

      {/* SEO Explanations */}
      <div className={styles.faqSection}>
        <h3 className={styles.faqTitle}>💡 Tips to Optimize Mousepad Space & Sensitivity</h3>
        
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>How do I measure my available desk space?</h4>
            <p>Place your keyboard in its normal gaming position (often tilted for FPS players). Use a tape measure to check the distance from the right edge of your keyboard (or numeric pad) to the right-hand edge of your desk. That represents your available width.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Should I choose a 180° or 360° swipe rotation?</h4>
            <p>Most tactical shooter players (Valorant, CS2) only need to make a 180° turn in one comfortable swipe because enemies rarely appear behind you. Faster tracking games like Apex Legends or Overwatch 2 benefit from a 360° swipe because players fly overhead and require constant vertical/horizontal re-positioning.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Is it bad to run a high sensitivity on a small desk?</h4>
            <p>High sensitivity (low cm/360) is necessary for small desks, but it makes micro-adjustments and long-range tracking harder. If you are struggling with accuracy, consider shifting your keyboard further left, tilting it, or getting a 60% mechanical keyboard to carve out 10-15cm of extra mousepad space.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>What is cm/360?</h4>
            <p>cm/360 is the physical distance in centimeters your mouse must travel on the mousepad to spin your character in a complete 360-degree circle in-game. It is the only universal sensitivity metric, as it combines your in-game sensitivity and mouse DPI into a single physical unit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
