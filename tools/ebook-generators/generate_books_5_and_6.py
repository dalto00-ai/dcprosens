import os
import subprocess
from generate_books_base import get_header, get_footer
from generate_book_1 import create_page, create_cover

BASE_DIR = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS"
EBOOKS_DIR = os.path.join(BASE_DIR, "ebooks")

def compile_pdf(html_path, pdf_path):
    subprocess.run([
        "google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-pdf-header-footer", "--virtual-time-budget=6000", "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={pdf_path}", html_path
    ], check=True)
    print(f"Compiled PDF: {pdf_path}")

# =========================================================================
# BOOK 5: FPS & INPUT LAG PLAYBOOK
# =========================================================================
def generate_book_5():
    # Read the existing content from DCPROSENS_FPS_INPUT_LAG_PLAYBOOK.html
    # but adapt page 1 to use cover_fps_input_lag.jpg
    with open(os.path.join(BASE_DIR, "DCPROSENS_FPS_INPUT_LAG_PLAYBOOK.html"), "r", encoding="utf-8") as f:
        content = f.read()

    # Replace the cover section with the standardized cover format with cover_fps_input_lag.jpg
    cover_html = create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_fps_input_lag.jpg",
        "FIELD GUIDE 05 // SYSTEM TUNING",
        "FPS &amp; INPUT LAG",
        "PLAYBOOK.",
        "Find the true bottleneck. Test one variable at a time. Keep only what delivers measurable, repeatable ms reductions.",
        "ZERO-LATENCY PROTOCOL"
    )

    # In DCPROSENS_FPS_INPUT_LAG_PLAYBOOK.html, replace the first <section class="page cover-page">...</section>
    start_tag = '<section class="page cover-page">'
    end_tag = '</section>'
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag, start_idx) + len(end_tag)

    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + cover_html + content[end_idx:]
    else:
        new_content = content

    output_html = os.path.join(EBOOKS_DIR, "05_FPS_Input_Lag_Playbook.html")
    output_pdf = os.path.join(EBOOKS_DIR, "05_FPS_Input_Lag_Playbook.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(new_content)
    compile_pdf(output_html, output_pdf)

# =========================================================================
# BOOK 6: CONTROLLER PRECISION GUIDE
# =========================================================================
def generate_book_6():
    pages = []
    pages.append(create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_controller_precision.jpg",
        "FIELD GUIDE 06 // CONTROLLER CALIBRATION",
        "CONTROLLER",
        "PRECISION GUIDE.",
        "Master rotational aim assist, linear vs dynamic response curves, zero deadzones, stick tension, and USB polling overclocking.",
        "COMPETITIVE CONTROLLER BLUEPRINT"
    ))

    # P2: The Modern Controller Engine
    p2 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>POTENTIOMETERS VS HALL EFFECT</span><span class="card-num">HARDWARE</span></div>
            <p class="card-desc">Legacy analog sticks use carbon film wipers that scrape away graphite, causing inevitable stick drift within 3 months. <strong>Hall Effect sensors</strong> use contactless magnets with zero physical friction, allowing true <strong>0.00 deadzones</strong> without drift.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>USB POLLING LATENCY GAP</span><span class="card-num">SIGNAL</span></div>
            <p class="card-desc">Stock controllers poll at 125Hz–250Hz (4ms–8ms latency). Overclocking your gamepad to <strong>1000Hz (1.0ms)</strong> cuts input latency by 75% and makes thumbstick response feel immediate.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The 3 Pillars of Competitive Controller Aim
        </div>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--primary);">1. Deadzone Zeroing:</strong> Eliminate the physical dead gap before thumb movement registers.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--secondary);">2. Dynamic Curve:</strong> Fine micro-aim in the center + rapid 180° snap at the outer edge.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-amber);">3. Rotational AA:</strong> Keep the left stick engaged to activate game engine rotational tracking.
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>The Golden Rule:</strong> Never blame aim assist when you miss. Aim assist only activates when your character is actively inputting movement. Learn the activation thresholds.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "HARDWARE ENGINE", "STEP 00 // ANALOG MECHANICS", "The modern controller architecture.", "Understand analog potentiometers, Hall Effect magnetic sensors, and why USB polling rate dictates stick responsiveness.", p2, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 2))

    # P3: Response Curves: Linear vs Dynamic vs Standard
    p3 = """
    <div class="grid-3" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--text-dim); font-weight: 700;">STANDARD / EXPONENTIAL</div>
            <p class="card-desc" style="margin-top: 1mm;">Slow acceleration that ramps up late. Sluggish micro-corrections and unpredictable acceleration curves. <strong>Avoid for competitive play.</strong></p>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--secondary); font-weight: 700;">LINEAR (RAW 1:1)</div>
            <p class="card-desc" style="margin-top: 1mm;">Direct 1:1 ratio between thumbstick deflection and camera rotation. Ultra-responsive for flicking, but requires god-tier thumb dexterity and 0 stick drift.</p>
        </div>
        <div class="card glow-primary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary); font-weight: 700;">DYNAMIC (PRO STANDARD)</div>
            <p class="card-desc" style="margin-top: 1mm;">Reverse S-curve: gentle precision in the center for micro-headshots, accelerating rapidly at the perimeter for 180° snaps. <strong>Used by 92% of Warzone &amp; Apex pros.</strong></p>
        </div>
    </div>
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Why Dynamic Curve Dominates Esports
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Dynamic curve compresses the center 20% of your stick deflection, giving you the micro-precision of low sensitivity when making tiny crosshair adjustments, while preserving high-speed turn capability when pushing the stick to maximum deflection.
        </p>
    </div>
    <div class="callout">
        <strong>Recommendation:</strong> Switch your Aim Response Curve Type to <strong>Dynamic</strong> in Call of Duty / Warzone or <strong>Response Curve 0–3</strong> in Apex Legends.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "RESPONSE CURVES", "STEP 01 // DYNAMIC VS LINEAR", "Response curves: linear vs dynamic.", "Why Dynamic curve is the undisputed choice of tournament champions in Warzone and Apex Legends.", p3, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 3))

    # P4: Stick Deadzones: The Zero-Drift Limit
    p4 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            What Deadzone Actually Does (Input Delay Trap)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            A deadzone of 0.10 means you must push your thumbstick <strong>10% of its total travel distance</strong> before the game engine sends a single degree of camera movement. High deadzones simulate massive input lag.
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Set Right Stick Min Deadzone to 0.00</h4><p>Load into a custom lobby or firing range. Lower your Right Stick Min Deadzone to 0.00. Do not touch the controller.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Observe Stationary Camera Drift</h4><p>Watch your crosshair against a distant wall landmark. If the camera slowly pans automatically, raise the deadzone by +0.01.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Lock at The Zero-Drift Threshold</h4><p>Stop raising the value the exact moment camera drift halts (typically 0.02 to 0.04 on good controllers). This is your true physical minimum deadzone.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">4</div>
            <div class="step-content"><h4>Max Deadzone Calibration (0.99)</h4><p>Set Right Stick Max Deadzone to 0.99 (or 0.95). This ensures you reach 100% turn speed without slamming the plastic stick against the housing ring.</p></div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Pro Benchmark:</strong> If your controller requires a deadzone higher than 0.07 to prevent drift, your potentiometer wipers are degraded. Replace the module or upgrade to Hall Effect sticks.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "DEADZONE CALIBRATION", "STEP 02 // ZERO DRIFT LIMIT", "Stick deadzones: the zero-drift limit.", "How to find your true physical minimum deadzone and eliminate artificial thumbstick latency.", p4, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 4))

    # P5: Rotational Aim Assist (RAA) Exploitation
    p5 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The Mechanics of Rotational Aim Assist (0ms Reaction Tracking)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Traditional slowdown aim assist only reduces sensitivity when your crosshair crosses an enemy. <strong>Rotational Aim Assist (RAA)</strong> actively rotates your camera to mirror enemy directional changes with <strong>0ms reaction delay</strong>.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card" style="border-left: 3px solid var(--accent-red);">
            <div class="card-title"><span>STATIC DEFENDER (0% RAA)</span><span class="card-num">FAIL</span></div>
            <p class="card-desc">If your left thumbstick is stationary (0% movement input), Rotational Aim Assist is <strong>COMPLETELY DISABLED</strong> in modern engines. You rely entirely on manual thumb adjustments.</p>
        </div>
        <div class="card glow-primary" style="border-left: 3px solid var(--primary);">
            <div class="card-title"><span>ACTIVE STRAFE (100% RAA)</span><span class="card-num">LOCK-ON</span></div>
            <p class="card-desc">Pushing your left thumbstick slightly in any direction (&gt;5% deflection) instantly triggers Rotational Aim Assist, locking your crosshair onto the target's center mass during directional changes.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The Left-Stick Aiming Technique (Mirror Strafing)
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            In close-quarters gunfights, use your right stick only for initial target centering. Once locked, use your <strong>left stick (lateral strafing)</strong> to steer the gunfight. The game engine's RAA algorithm will handle 60% of the micro-tracking automatically.
        </p>
    </div>
    <div class="callout alert-red">
        <strong>The Biggest Mistake:</strong> Panicking and slamming your right thumbstick across the housing. Over-aiming with your right stick breaks the aim assist rotational bubble. Let the left stick do the work.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "AIM ASSIST SCIENCE", "STEP 03 // ROTATIONAL AA", "Rotational aim assist (RAA) exploitation.", "The exact engine triggers required to activate full rotational aim assist and achieve 0ms reactive tracking.", p5, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 5))

    # P6: Stick Tension, KontrolFreeks & Lever Physics
    p6 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Lever Physics: Increasing Arc Distance by 30%
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            A standard controller thumbstick is ~8mm tall. Adding a high-rise thumbstick extender (e.g. KontrolFreek Galaxy / Inferno) increases height to ~18mm. This extends the physical arc radius by <strong>120%</strong>.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>Stock Short Stick</span><span class="card-num">TIGHT ARC</span></div>
            <p class="card-desc">Tiny physical arc distance. A 1mm hand twitch creates a large camera shift. High sensitivity makes fine long-range recoil control and headshots inconsistent.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>High-Rise Extended Stick</span><span class="card-num">WIDE ARC</span></div>
            <p class="card-desc">Doubles the physical movement distance required to deflect the analog sensor. Gives you <strong>sub-millimeter precision</strong> while allowing high sensitivity for rapid turns.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Stick Tension &amp; Precision Rings
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            Adding a foam precision ring (medium resistance) around the right stick shaft adds physical resistance against over-deflection, preventing you from overshooting targets during sudden panic flicks.
        </p>
    </div>
    <div class="callout">
        <strong>Hardware Configuration:</strong> Keep the left thumbstick short and concave for fast directional changes. Make the right thumbstick tall and convex for maximum micro-aim leverage.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "ERGONOMICS & LEVERS", "STEP 04 // STICK EXTENDERS", "Stick tension & KontrolFreek mechanics.", "How thumbstick lever height extends arc radius and unlocks surgical micro-corrections on high sensitivity.", p6, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 6))

    # P7: Overclocking Controller Polling Rate
    p7 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            1000Hz USB Overclocking via LordOfMice HIDUSBF
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            By default, Windows polls USB controllers at 125Hz or 250Hz (4ms–8ms latency). Overclocking the USB endpoint filter driver forces Windows to poll the controller every <strong>1.0ms (1000Hz)</strong>.
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Download Official HIDUSBF Tool</h4><p>Download the verified open-source <code>hidusbf</code> driver utility by LordOfMice from GitHub. Extract to a dedicated folder.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Locate Your Gamepad Endpoint</h4><p>Run <code>Setup.exe</code> as Administrator. Select 'Mice' ➔ switch dropdown to 'All'. Locate your controller (e.g. Wireless Controller for DualSense).</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Set Rate to 1000Hz &amp; Install Service</h4><p>Check 'Filter on Device'. Set Selected Rate to <strong>1000</strong>. Click 'Install Service'. Unplug and replug your controller USB cable.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">4</div>
            <div class="step-content"><h4>Verify With Polling Rate Checker</h4><p>Run <code>XInputTest</code> or <code>GamepadTester</code>. Verify polling interval shows steady 1.00ms with &lt;0.5ms jitter.</p></div>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>Hardware Compatibility:</strong> PlayStation DualSense / DualShock 4 controllers support 1000Hz over USB cleanly. Official Xbox Series controllers are locked by Microsoft firmware to 125Hz–250Hz.
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "SIGNAL OVERCLOCK", "STEP 05 // 1000HZ OVERCLOCK", "Overclocking controller polling rate.", "Slash hardware input lag from 8ms down to 1ms by overclocking your controller USB driver on Windows 11.", p7, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 7))

    # P8: Controller Calibration Worksheet
    p8 = """
    <div class="form-row">
        <div class="field-box"><div class="field-label">CONTROLLER MODEL &amp; SENSOR TYPE</div><div class="field-line">DualSense Edge / Scuf / Flydigi (Hall Effect)</div></div>
        <div class="field-box"><div class="field-label">USB POLLING RATE</div><div class="field-line">125Hz (Stock) / 1000Hz (Overclocked)</div></div>
    </div>
    <div class="form-row" style="margin-bottom: 3.5mm;">
        <div class="field-box"><div class="field-label">AIM RESPONSE CURVE TYPE</div><div class="field-line">Dynamic / Linear / Standard</div></div>
        <div class="field-box"><div class="field-label">THUMBSTICK HEIGHT CONFIGURATION</div><div class="field-line">Stock Left / High-Rise Galaxy Right</div></div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Stick Parameter</th><th style="width: 25%;">Baseline Setting</th><th style="width: 25%;">Calibrated Value</th><th style="width: 25%;">Stability Status</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Right Stick Min Deadzone</strong></td><td>Default (0.10)</td><td>Calibrated: 0.0___</td><td>[  ] Zero Drift Verified</td></tr>
                <tr><td><strong>Right Stick Max Deadzone</strong></td><td>Default (1.00)</td><td>Calibrated: 0.99</td><td>[  ] Instant 100% Turn</td></tr>
                <tr><td><strong>Horizontal Look Sens</strong></td><td>Current: ___</td><td>Calibrated: 6 – 8</td><td>[  ] Snappy 180° Snaps</td></tr>
                <tr><td><strong>ADS Sensitivity Multiplier</strong></td><td>Current: 1.00</td><td>Calibrated: 0.75 – 0.85</td><td>[  ] Controlled Micro-Aim</td></tr>
            </tbody>
        </table>
    </div>
    <div class="card glow-primary">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff;">COMPETITIVE CONTROLLER AUDIT STATUS</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary);">VERIFIED</span>
        </div>
        <div style="font-size: 8pt; color: var(--text-muted);">
            [  ] Dynamic Curve Locked &nbsp;|&nbsp; [  ] Zero Drift Validated &nbsp;|&nbsp; [  ] 1000Hz Overclock Active
        </div>
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "TELEMETRY AUDIT", "STEP 06 // THE WORKSHEET", "Controller calibration worksheet.", "Document your stick deadzones, response curve, look sensitivity, and USB polling overclocking status.", p8, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 8))

    # P9: Daily 6-Step Controller Warm-Up Routine
    p9 = """
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>01 / Stick Centering &amp; Drift Verification (1 Minute)</h5>
                <p>Spawn in firing range. Verify crosshair remains stationary without thumb contact. Warm up thumb joints with circular stick rotations.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>02 / Left-Stick Strafe Mirror Drill (3 Minutes)</h5>
                <p>Track a moving bot purely using your left thumbstick. Never touch the right stick. Feel the Rotational Aim Assist engage automatically.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>03 / Centering &amp; ADS Snap Drill (3 Minutes)</h5>
                <p>Align crosshair with enemy chest before aiming down sights. Tap ADS, fire 3 rounds, release ADS, transfer to next target.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>04 / Recoil Smoothing Circle Drills (3 Minutes)</h5>
                <p>In Call of Duty/Apex, gently strafe sideways while firing full auto. Recoil smoothing completely eliminates vertical weapon kick.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>05 / 180° Slide Cancel Turnaround Drill (2 Minutes)</h5>
                <p>Practice sliding past a target, snapping 180° using maximum stick deflection, and locking back on with left-stick strafe.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>06 / Lock Controller Grip Tension</h5>
                <p>Ensure your ring and pinky fingers are relaxed on the back paddles. Zero hand cramp before queuing ranked.</p>
            </div>
        </div>
    </div>
    <div class="progress-pill">
        <span>CONTROLLER WARM-UP STATUS</span>
        <span class="progress-val">CALIBRATED &amp; READY TO QUEUE</span>
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "DAILY DRILLS", "STEP 07 // CONTROLLER ACTIVATION", "Daily 6-step controller warm-up routine.", "A 12-minute mechanical warm-up to synchronize thumb dexterity, left-stick strafe tracking, and recoil smoothing.", p9, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 9))

    # P10: Summary & DCPROSENS Hub
    p10 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                The 3 Commandments of Controller Precision
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>1. Always Use Dynamic Curve:</strong> Instant micro-aim in the center; maximum speed at the edge.</li>
                <li><strong>2. Left Stick is Your Secret Weapon:</strong> Never stop strafing during duels to keep RAA engaged.</li>
                <li><strong>3. Minimum Deadzone:</strong> Lower deadzones eliminate artificial input lag.</li>
            </ul>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                Pro Controller Config Standard
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>Look Sens:</strong> 6-6 or 7-7 (CoD) / 4-3 Linear or 4-4 Dynamic (Apex).</li>
                <li><strong>ADS Multiplier:</strong> 0.75 to 0.85 for stable recoil tracking.</li>
                <li><strong>Right Stick Deadzone:</strong> 0.02 – 0.04.</li>
            </ul>
        </div>
    </div>
    <div class="card glow-primary" style="background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 229, 255, 0.05)); border-color: var(--primary); padding: 4mm 5mm;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; font-weight: 700; color: #fff;">
                    Visit The DCPROSENS Controller Hub
                </div>
                <div style="font-size: 8.2pt; color: var(--text-muted); margin-top: 1mm;">
                    Access top controller pro settings (Scump, Biffle, Genburten) and calibration tools at <strong>dcprosens.com</strong>
                </div>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 700; color: var(--primary); padding: 2mm 3.5mm; background: rgba(0, 255, 157, 0.15); border-radius: 4px; border: 1px solid var(--primary);">
                DCPROSENS.COM ➔
            </div>
        </div>
    </div>
    """
    pages.append(create_page("06 / CONTROLLER PRECISION", "DIRECTORY & NEXT STEPS", "FINAL SUMMARY // CONTROLLER GOD", "Master the gamepad advantage.", "Combine low deadzones, dynamic curves, and left-stick rotational aim assist to dominate crossplay lobbies.", p10, "DCPROSENS", "CONTROLLER PRECISION GUIDE", 10))

    html = get_header("Controller Precision Guide") + "".join(pages) + get_footer()
    output_html = os.path.join(EBOOKS_DIR, "06_Controller_Precision_Guide.html")
    output_pdf = os.path.join(EBOOKS_DIR, "06_Controller_Precision_Guide.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    compile_pdf(output_html, output_pdf)

generate_book_5()
print("Book 5 generated.")
generate_book_6()
print("Book 6 generated.")
