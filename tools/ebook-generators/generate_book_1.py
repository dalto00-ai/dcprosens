import os
import subprocess
from generate_books_base import get_header, get_footer

BASE_DIR = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS"
EBOOKS_DIR = os.path.join(BASE_DIR, "ebooks")
os.makedirs(EBOOKS_DIR, exist_ok=True)

# Helper function to create standard page structure
def create_page(header_tag, header_sub, section_label, title, desc, content_html, footer_brand, footer_meta, page_num, total_pages=10):
    return f"""
<section class="page">
    <div>
        <div class="page-header">
            <div class="header-tag">{header_tag}</div>
            <div class="header-sub">{header_sub}</div>
        </div>
        <div class="title-block">
            <div class="section-label">{section_label}</div>
            <h2 class="page-title">{title}</h2>
            <p class="page-desc">{desc}</p>
        </div>
        {content_html}
    </div>
    <div class="page-footer">
        <div class="footer-brand">{footer_brand} // <span>{footer_meta}</span></div>
        <div class="footer-meta">DCPROSENS RESEARCH LAB</div>
        <div class="footer-num">{page_num:02d} / {total_pages:02d}</div>
    </div>
</section>
"""

def create_cover(cover_img_path, badge, title_h1, title_gradient, subtitle, meta_left, page_num=1, total_pages=10):
    return f"""
<section class="page cover-page">
    <img class="cover-bg-img" src="{cover_img_path}" alt="Cover Background">
    <div class="cover-overlay"></div>
    <div class="cover-inner">
        <div class="cover-top">
            <div class="cover-logo-brand">DCPROSENS<span>.</span></div>
            <div class="cover-badge-pill">{badge}</div>
        </div>
        <div class="cover-footer-box">
            <h1>{title_h1}<br><span>{title_gradient}</span></h1>
            <p>{subtitle}</p>
            <div class="cover-meta-bar">
                <div>AUTHOR: <span>DALTO OUTLIER</span> // AIM &amp; PERFORMANCE LAB</div>
                <div>{page_num:02d} / {total_pages:02d}</div>
            </div>
        </div>
    </div>
</section>
"""

# =========================================================================
# BOOK 1: THE ARCHITECT OF PRECISION
# =========================================================================
def generate_book_1():
    pages = []
    # P1: Cover
    pages.append(create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_architect_of_precision.jpg",
        "FIELD GUIDE 01 // SENSITIVITY CALIBRATION",
        "THE ARCHITECT",
        "OF PRECISION.",
        "The complete blueprint to calculating your true cm/360, eliminating sensor deviation, and matching your 1:1 muscle memory across every FPS.",
        "ESPORTS CALIBRATION BLUEPRINT"
    ))

    # P2: Step 00: Why eDPI is a Lie
    p2_content = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>The eDPI Calculation Trap</span><span class="card-num">01</span></div>
            <p class="card-desc">Most players multiply DPI × Sensitivity and assume equal numbers mean identical speed. In reality, different game engines use completely different <strong>m_yaw</strong> multipliers.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>Engine Yaw Discrepancy</span><span class="card-num">02</span></div>
            <p class="card-desc">CS2 &amp; Apex use <code>Yaw = 0.022</code>. Valorant uses <code>Yaw = 0.0707</code>. A '1.0' sensitivity in CS2 is over <strong>3.18× faster</strong> than a '1.0' in Valorant.</p>
        </div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Game Engine</th><th style="width: 25%;">Default Yaw Constant</th><th style="width: 25%;">800 DPI Example</th><th style="width: 25%;">Resulting 360° Turn</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>CS2 / Source</strong></td><td>0.02200</td><td>Sens 1.00</td><td>51.95 cm / 360°</td></tr>
                <tr><td><strong>Valorant / Unreal</strong></td><td>0.07000</td><td>Sens 0.314</td><td>51.95 cm / 360° (Exact Match)</td></tr>
                <tr><td><strong>Overwatch 2</strong></td><td>0.00660</td><td>Sens 3.33</td><td>51.95 cm / 360° (Exact Match)</td></tr>
                <tr><td><strong>Fortnite</strong></td><td>0.00200</td><td>Sens 8.8%</td><td>51.95 cm / 360° (Exact Match)</td></tr>
            </tbody>
        </table>
    </div>
    <div class="callout alert-cyan">
        <strong>The Golden Takeaway:</strong> Never calibrate your aim using arbitrary in-game sliders. Always calibrate by measuring physical centimeters traveled on your mousepad.
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "THE FOUNDATION", "STEP 00 // YAW DECONSTRUCTION", "Why 'eDPI' is lying to you.", "How game engines translate sensor dots into camera angles, and why arbitrary sliders destroy cross-game consistency.", p2_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 2))

    # P3: cm/360 Universal Metric
    p3_content = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm; padding: 3.5mm 4.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10.5pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The Universal Formula for cm/360
        </div>
        <div style="background: var(--bg-card-alt); border-left: 2px solid var(--primary); padding: 2.5mm 3.5mm; font-family: 'JetBrains Mono', monospace; font-size: 8pt; color: var(--primary); margin-bottom: 2mm;">
            cm/360 = (360 × 2.54) ÷ (DPI × In-Game Sens × Yaw)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            cm/360 is the exact physical distance in centimeters your hand moves horizontally on the mousepad to complete one full 360-degree rotation in-game.
        </p>
    </div>
    <div class="grid-4" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--accent-red); font-weight: 700;">WRIST TIER</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13pt; color: #fff; font-weight: 700; margin: 1mm 0;">&lt; 25 cm</div>
            <p style="font-size: 7.5pt; color: var(--text-muted);">High speed, high strain. Requires constant micro-tension. Higher risk of RSI.</p>
        </div>
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--secondary); font-weight: 700;">HYBRID TIER</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13pt; color: #fff; font-weight: 700; margin: 1mm 0;">25 – 35 cm</div>
            <p style="font-size: 7.5pt; color: var(--text-muted);">Fast target switching. Ideal for Apex Legends, Overwatch &amp; arena shooters.</p>
        </div>
        <div class="card glow-primary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary); font-weight: 700;">PRO STANDARD</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13pt; color: var(--primary); font-weight: 700; margin: 1mm 0;">35 – 50 cm</div>
            <p style="font-size: 7.5pt; color: var(--text-muted);">Tactical shooter sweet spot. Used by 78% of Valorant and CS2 professionals.</p>
        </div>
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--text-dim); font-weight: 700;">ARM TIER</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13pt; color: #fff; font-weight: 700; margin: 1mm 0;">&gt; 50 cm</div>
            <p style="font-size: 7.5pt; color: var(--text-muted);">Maximum micro-precision. Requires huge mousepad (500×500mm) and rapid arm resets.</p>
        </div>
    </div>
    <div class="callout">
        <strong>Esports Benchmark:</strong> If your cm/360 is faster than 25cm in tactical shooters, your crosshair micro-adjustments will suffer from uncontrollable jitter under tournament adrenaline.
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "UNIVERSAL METRICS", "STEP 01 // CM/360 SPECTRUM", "The universal metric of physical aim.", "Ditch arbitrary sliders. Measure your hand displacement in centimeters and discover which bracket fits your game.", p3_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 3))

    # P4: The 30-Minute PSA Method
    p4_content = """
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content">
                <h4>Find Your Starting Anchor (180° Comfortable Swipe)</h4>
                <p>Sit in your natural posture. Move your mouse from the center of your mousepad to the comfortable right edge. Adjust your sensitivity until this single natural stroke produces exactly a 180° rotation.</p>
            </div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content">
                <h4>Bracket High vs Low (The ±50% Test)</h4>
                <p>Multiply your starting sens by 1.5 (High) and by 0.5 (Low). Play 2 minutes of tracking bots with High, then 2 minutes with Low. Record which bracket felt smoother on your wrist.</p>
            </div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content">
                <h4>Perform The Strafe Tracking Test</h4>
                <p>Pick a stationary head-sized target. Keep your crosshair locked onto it while counter-strafing left and right at varying distances. If you lag behind the target, your sens is too slow; if you jitter past it, it is too fast.</p>
            </div>
        </div>
        <div class="step-item">
            <div class="step-num">4</div>
            <div class="step-content">
                <h4>Narrow The Range by Half (Binary Iteration)</h4>
                <p>Halve the interval each round (e.g. 1.0 ➔ 1.25 ➔ 1.125). In exactly 5 iterations, your mathematical sweet spot will emerge with zero guesswork.</p>
            </div>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>Warning Against Placebo Shuffling:</strong> Never change your sensitivity multiple times in one week. Once your PSA method yields a result, lock it in for a minimum of 21 days to build deep neuromuscular myelin pathways.
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "CALIBRATION PROTOCOL", "STEP 02 // PSA METHOD", "Finding your personal sweet spot.", "A disciplined 30-minute binary search test to discover your hand's natural ergonomic sensitivity.", p4_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 4))

    # P5: Sensor DPI & Deviation
    p5_content = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>Why 1600 DPI Beats 400 DPI</span><span class="card-num">INPUT LAG</span></div>
            <p class="card-desc">At 400 DPI, your sensor must physically travel <strong>4× farther</strong> before registering its first movement count compared to 1600 DPI. At 1600 DPI, input latency drops by ~2.5ms without increasing cursor speed if you lower in-game sens.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>The Myth of Sensor Smoothing</span><span class="card-num">SWEET SPOT</span></div>
            <p class="card-desc">Legacy sensors had smoothing above 1600 DPI. Modern sensors (PAW3395, Focus Pro 35K, HERO 2) remain raw and 1:1 up to 3200 DPI. <strong>1600 DPI is the pro sweet spot.</strong></p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 2mm;">
            The 10-Centimeter Physical Ruler Test (DPI Deviation)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35; margin-bottom: 2mm;">
            Manufacturing tolerances in sensor lenses mean an '800 DPI' mouse might actually read at 835 DPI (+4.3%) or 765 DPI (-4.4%). Here is how to measure your true sensor DPI:
        </p>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>1. Tape a Ruler:</strong> Fix a physical metric ruler alongside your mousepad edge.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>2. Move Exactly 10cm:</strong> Slide mouse from 0cm to 10.0cm horizontally while logging counts.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>3. Calculate Deviation:</strong> <code>Real DPI = (Counts × 2.54) ÷ 10</code>. Adjust sens to match.
            </div>
        </div>
    </div>
    <div class="callout">
        <strong>Hardware Standard:</strong> Always set Windows pointer speed to 6/11 (slider tick 6) and uncheck "Enhance Pointer Precision" to ensure pure linear 1:1 hardware translation.
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "HARDWARE PRECISION", "STEP 03 // SENSOR TELEMETRY", "Sensor DPI sweet spots & deviation.", "Why pro players are switching to 1600 DPI for lower latency, and how to verify your mouse's real physical tracking accuracy.", p5_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 5))

    # P6: Arm vs Wrist vs Finger Mechanics
    p6_content = """
    <div class="grid-3" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>ARM (ELBOW PIVOT)</span><span class="card-num">MACRO</span></div>
            <p class="card-desc"><strong>Used for:</strong> 180° turns, wide target transfers, and clearing large rooms.<br><strong>Anchor:</strong> Forearm resting lightly on desk/pad, pivoting from the elbow joint.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>WRIST (CARPAL PIVOT)</span><span class="card-num">TRACKING</span></div>
            <p class="card-desc"><strong>Used for:</strong> Primary target tracking, enemy strafe compensation.<br><strong>Anchor:</strong> Base of the palm resting on pad, operating within a 30° cone of motion.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>FINGERS (MICRO)</span><span class="card-num">PRECISION</span></div>
            <p class="card-desc"><strong>Used for:</strong> Tiny 10-pixel headshot adjustments, recoil pull-down.<br><strong>Anchor:</strong> Fingertips flexing inward/outward on mouse sides for vertical nuance.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Ergonomics: The 90-Degree Forearm Rule
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35; margin-bottom: 2mm;">
            If your chair is too low, your shoulder shrugs upward, transferring excess downward friction to your wrist. If your desk is too low, you slouch forward, cutting off arm mobility.
        </p>
        <div class="step-list">
            <div class="step-item">
                <div class="step-num">A</div>
                <div class="step-content"><h4>Desk &amp; Elbow Alignment</h4><p>Set armrests/desk so your elbow forms a relaxed 90° to 100° angle with zero shoulder elevation.</p></div>
            </div>
            <div class="step-item">
                <div class="step-num">B</div>
                <div class="step-content"><h4>Friction-Free Forearm</h4><p>Rest 50–70% of your forearm on the desk surface. Never let your wrist dangle off the desk edge.</p></div>
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Core Principle:</strong> Elite aim is the synchronization of all three pivot points. The arm gets you in the neighborhood; the wrist centers the target; the fingers click the head.
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "BIOMECHANICS", "STEP 04 // PIVOT MECHANICS", "Arm vs wrist vs finger aiming.", "How to coordinate all three anatomical levers for zero-friction movement and long-term joint health.", p6_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 6))

    # P7: Cross-Game Conversion Formula & FOV
    p7_content = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The FOV Scaling Trap (Focal Length vs 0% Monitor Distance)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Even if cm/360 is identical, an enemy moving across your screen will appear faster in a narrow FOV game (Valorant 103° Horizontal) than in a wide FOV game (Apex Legends 110°+). To preserve 2D optical speed, competitive players use <strong>0% Monitor Distance Matching</strong>.
        </p>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th>Game</th><th>Render Engine</th><th>Direct Conversion From Valorant</th><th>Direct Conversion From CS2</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>CS2 / CS:GO</strong></td><td>Source 2</td><td>Valorant Sens × 3.1818</td><td>1.000 (Base)</td></tr>
                <tr><td><strong>Valorant</strong></td><td>Unreal Engine</td><td>1.000 (Base)</td><td>CS2 Sens ÷ 3.1818</td></tr>
                <tr><td><strong>Apex Legends</strong></td><td>Source (Modified)</td><td>Valorant Sens × 3.1818</td><td>CS2 Sens × 1.000</td></tr>
                <tr><td><strong>Overwatch 2</strong></td><td>Proprietary</td><td>Valorant Sens × 10.606</td><td>CS2 Sens × 3.3333</td></tr>
                <tr><td><strong>Warzone / CoD</strong></td><td>IW Engine</td><td>Valorant Sens × 10.606</td><td>CS2 Sens × 3.3333</td></tr>
            </tbody>
        </table>
    </div>
    <div class="callout">
        <strong>Scoped Sensitivity Rule:</strong> In CS2, set <code>zoom_sensitivity_ratio 1.0</code>. In Valorant, set <code>Scoped Sensitivity Multiplier 1.0</code> or <code>0.82</code> (to match 1:1 crosshair displacement at 103° FOV).
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "CROSS-ENGINE SYNC", "STEP 05 // CONVERSION MATRIX", "Converting sensitivity across games.", "Preserve exact 1:1 muscle memory when transitioning between tactical shooters and high-mobility battle royales.", p7_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 7))

    # P8: The Sensitivity Calibration Worksheet
    p8_content = """
    <div class="form-row">
        <div class="field-box">
            <div class="field-label">PRIMARY GAME &amp; ENGINE</div>
            <div class="field-line">Valorant / CS2 / Apex Legends</div>
        </div>
        <div class="field-box">
            <div class="field-label">HARDWARE DPI SETTING</div>
            <div class="field-line">400 / 800 / 1600 DPI</div>
        </div>
    </div>
    <div class="form-row" style="margin-bottom: 3.5mm;">
        <div class="field-box">
            <div class="field-label">STARTING IN-GAME SENS</div>
            <div class="field-line">Current: _______</div>
        </div>
        <div class="field-box">
            <div class="field-label">MEASURED CM / 360° DISTANCE</div>
            <div class="field-line">Physical: _______ cm</div>
        </div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 20%;">Iteration</th><th style="width: 25%;">Tested Sensitivity</th><th style="width: 25%;">Tracking Strafe Score</th><th style="width: 30%;">Micro-Flick Tendency</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Pass 01 (High)</strong></td><td>Sens × 1.5 = _______</td><td>[  ] Smooth  [  ] Jittery</td><td>[  ] Overshot  [  ] Undershot</td></tr>
                <tr><td><strong>Pass 02 (Low)</strong></td><td>Sens × 0.5 = _______</td><td>[  ] Smooth  [  ] Heavy</td><td>[  ] Overshot  [  ] Undershot</td></tr>
                <tr><td><strong>Pass 03 (Mid)</strong></td><td>Sens = _______</td><td>[  ] Smooth  [  ] Stiff</td><td>[  ] On Target  [  ] Drifting</td></tr>
                <tr><td><strong>Pass 04 (Final)</strong></td><td>Sens = _______</td><td>[  ] Optimal Lock-On</td><td>[  ] 1:1 Natural Flow</td></tr>
            </tbody>
        </table>
    </div>
    <div class="card glow-primary">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff;">MY VERIFIED CALIBRATION RESULT</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary);">LOCKED VALUE</span>
        </div>
        <div class="form-row">
            <div class="field-box"><div class="field-label">FINAL IN-GAME SENS</div><div class="field-line">Sens: _______</div></div>
            <div class="field-box"><div class="field-label">FINAL CM/360°</div><div class="field-line">Target: _______ cm/360</div></div>
        </div>
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "CALIBRATION LOG", "STEP 06 // THE WORKSHEET", "The sensitivity calibration worksheet.", "Fill out your empirical iteration results to permanently record your physical aim parameters.", p8_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 8))

    # P9: Pre-Match Calibration Routine
    p9_content = """
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>01 / Surface Friction &amp; Hand Temperature Check</h5>
                <p>Ensure your hands are warm and the mousepad is free of oil/dust. Cold hands reduce finger micro-adjustment accuracy by up to 35%.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>02 / The Edge-to-Edge 180° Verification</h5>
                <p>Swipe once across your pad from center to comfortable edge. Ensure your crosshair hits a perfect 180° turnaround without looking at your hand.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>03 / Micro-Step Strafe Tracking (2 Minutes)</h5>
                <p>Lock your crosshair onto a bot's head while performing short A-D counter-strafes. Verify your wrist is completely relaxed.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>04 / Distance Flick Reset (2 Minutes)</h5>
                <p>Perform 20 medium-range flicks between two static points. If you consistently overshoot, do NOT lower sens; let your neural paths adapt.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>05 / The 21-Day Lock Discipline</h5>
                <p>Vow never to alter this value during a losing streak. A bad game is mental or tactical fatigue, not a sudden sensitivity mismatch.</p>
            </div>
        </div>
    </div>
    <div class="progress-pill">
        <span>PRE-MATCH CALIBRATION PROTOCOL</span>
        <span class="progress-val">CALIBRATED &amp; READY TO QUEUE</span>
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "DAILY DISCIPLINE", "STEP 07 // DAILY ACTIVATION", "Pre-match calibration checklist.", "A 5-minute pre-match routine to sync your hand temperature, pad glide, and hand-eye coordination before ranked play.", p9_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 9))

    # P10: Summary & Pro Tools
    p10_content = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                The 3 Core Commandments of Precision
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>1. Measure in cm/360:</strong> Sliders change; physical space on your desk never changes.</li>
                <li><strong>2. High DPI (1600):</strong> Slash input latency and avoid pixel stepping.</li>
                <li><strong>3. Consistency Beats Modification:</strong> Lock your sens for 21 days minimum.</li>
            </ul>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                Common Traps to Avoid
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li>Copying pro players blindly without matching their mouse weight and pad friction.</li>
                <li>Changing sens after every bad match (confirmation bias trap).</li>
                <li>Aiming purely with your wrist on ultra-high sensitivity.</li>
            </ul>
        </div>
    </div>
    <div class="card glow-primary" style="background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 229, 255, 0.05)); border-color: var(--primary); padding: 4mm 5mm;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; font-weight: 700; color: #fff;">
                    Free Online Pro Sensitivity Converter
                </div>
                <div style="font-size: 8.2pt; color: var(--text-muted); margin-top: 1mm;">
                    Convert your exact cm/360 and 0% Monitor Distance across 50+ FPS titles at <strong>dcprosens.com</strong>
                </div>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 700; color: var(--primary); padding: 2mm 3.5mm; background: rgba(0, 255, 157, 0.15); border-radius: 4px; border: 1px solid var(--primary);">
                DCPROSENS.COM ➔
            </div>
        </div>
    </div>
    """
    pages.append(create_page("01 / SENSITIVITY ARCHITECTURE", "DIRECTORY & NEXT STEPS", "FINAL SUMMARY // REVOLUTION", "Your calibration journey starts here.", "Review the core rules, eliminate bad habits, and unlock effortless 1:1 muscle memory.", p10_content, "DCPROSENS", "THE ARCHITECT OF PRECISION", 10))

    html = get_header("The Architect of Precision") + "".join(pages) + get_footer()
    output_html = os.path.join(EBOOKS_DIR, "01_The_Architect_of_Precision.html")
    output_pdf = os.path.join(EBOOKS_DIR, "01_The_Architect_of_Precision.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    print("Wrote Book 1 HTML.")
    subprocess.run([
        "google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-pdf-header-footer", "--virtual-time-budget=6000", "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={output_pdf}", output_html
    ], check=True)
    print(f"Compiled Book 1 PDF: {output_pdf}")

generate_book_1()
