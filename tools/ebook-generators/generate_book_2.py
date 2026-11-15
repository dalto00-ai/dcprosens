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
# BOOK 2: CROSSHAIR PLACEMENT & ANGLE CONTROL
# =========================================================================
def generate_book_2():
    pages = []
    pages.append(create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_crosshair_placement.jpg",
        "FIELD GUIDE 02 // TACTICAL CROSSHAIR MASTERY",
        "CROSSHAIR PLACEMENT",
        "&amp; ANGLE CONTROL.",
        "Master the geometry of angles, pre-aiming landmarks, peeker's advantage, and eliminating wasted flick distance.",
        "TACTICAL AIM ARCHITECTURE"
    ))

    # P2: The 90% Rule
    p2 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>The Myth of the 360° Flick</span><span class="card-num">01</span></div>
            <p class="card-desc">Highlight reels show wild 180° flick shots, but pro stats prove <strong>88% of professional kills</strong> require less than a 5-degree crosshair adjustment. Pro aim is passive placement, not panic reaction.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>Flick Latency Penalty</span><span class="card-num">02</span></div>
            <p class="card-desc">Every 100 pixels your crosshair is off-target adds <strong>140ms–220ms</strong> of human motor latency (visual recognition + deceleration). Perfect placement reduces time-to-damage to purely your mouse click debounce time.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The Crosshair Placement Efficiency Index (CPEI)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35; margin-bottom: 2mm;">
            Compare your time-to-kill based on initial crosshair distance when an enemy appears:
        </p>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-red);">Lazy Aim (&gt;15° Off):</strong> 190ms reaction + 180ms flick = <strong>370ms TTK</strong> (Dead).
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-amber);">Average Aim (5° Off):</strong> 190ms reaction + 80ms micro-adjust = <strong>270ms TTK</strong> (Coinflip).
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--primary);">Pro Pre-Aim (&lt;1° Off):</strong> 160ms reaction + 0ms flick = <strong>160ms Instant Headshot</strong>.
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Core Philosophy:</strong> If you have to make a hero flick, your crosshair placement already failed. Your goal is to make aiming boring and effortless.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "THE FOUNDATION", "STEP 00 // THE 90% RULE", "Why crosshair placement beats flick aim.", "Understanding flick latency penalties and why elite shooters focus entirely on predictive pre-aiming.", p2, "DCPROSENS", "CROSSHAIR PLACEMENT", 2))

    # P3: Head-Level Elevation & Landmarks
    p3 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The Environmental Horizon (Map Geometry Landmarks)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Never guess head height. Game level designers align map textures and props to character heights. Memorize these universal environmental cues:
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>Crates, Boxes &amp; Barrels</span><span class="card-num">CUE 01</span></div>
            <p class="card-desc">In CS2 and Valorant, the standard green/wooden Radianite crates are exactly head height on flat ground. Align your crosshair with the top horizontal edge or horizontal banding line.</p>
        </div>
        <div class="card">
            <div class="card-title"><span>Door Handles &amp; Wall Stripes</span><span class="card-num">CUE 02</span></div>
            <p class="card-desc">Most tactical shooter door handles sit at chest level, while double-line wall trims mark exact eye-level. Use them as permanent horizontal guide rails while traversing.</p>
        </div>
        <div class="card">
            <div class="card-title"><span>Stairs &amp; Incline Elevation</span><span class="card-num">CUE 03</span></div>
            <p class="card-desc">When clearing stairs, raise your crosshair by 1 step height per step ahead. Pre-elevate before you peek; never adjust elevation during the peek swing.</p>
        </div>
        <div class="card">
            <div class="card-title"><span>Teammate Neck Line</span><span class="card-num">CUE 04</span></div>
            <p class="card-desc">During pre-round or rotations, align your crosshair directly with your teammate's chin/neck. Lock that vertical angle in your wrist muscles before engaging.</p>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>Floor-Sweeping Habit:</strong> Beginners habitually aim down at the floor to 'see more screen'. Every downward tilt forces a vertical correction before a shot can be fired. Keep your crosshair locked to the horizon.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "VERTICAL ALIGNMENT", "STEP 01 // HEAD ELEVATION", "Head-level elevation & landmarks.", "How to use environmental textures, props, and teammate silhouettes to keep your crosshair permanently glued to head height.", p3, "DCPROSENS", "CROSSHAIR PLACEMENT", 3))

    # P4: Slicing the Pie
    p4 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm; padding: 3mm 4mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The Geometry of 'Slicing the Pie'
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35; margin-bottom: 2mm;">
            Never swing an entire bombsite or room at once. Clear the angle in 15-degree micro-slices so you only ever expose your hitbox to <strong>one possible enemy position at a time</strong>.
        </p>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>1. Identify Pivot:</strong> Anchor your vision to the corner edge.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>2. Lateral Arc:</strong> Move in an orbital circle, maintaining max distance.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>3. Micro-Stops:</strong> Counter-strafe stop at each 15° slice to clear depths.
            </div>
        </div>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Pre-Aim Through The Wall</h4><p>Position your crosshair where the enemy will be BEFORE taking the step. As you step out with your A/D key, the corner slides past and your crosshair lands on their head.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Strict Keyboard Peeking (Zero Mouse Motion)</h4><p>During the final peek step, do NOT move your mouse. Clear the angle purely with lateral keyboard movement. Keep mouse tracking purely for micro-adjustments.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Isolate 1v1 Duels</h4><p>If you peek wide, two defenders can shoot you simultaneously. Slicing the pie forces two defenders into sequential 1v1 duels.</p></div>
        </div>
    </div>
    <div class="callout">
        <strong>Geometric Law:</strong> The player who exposes their body to multiple angles simultaneously will always lose to the player who clears sequentially.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "ANGLE ISOLATION", "STEP 02 // SLICING THE PIE", "The geometry of slicing the pie.", "How to isolate complex bombsite corners into manageable 15-degree duels without exposing your flank.", p4, "DCPROSENS", "CROSSHAIR PLACEMENT", 4))

    # P5: Common Angles vs Off-Angles
    p5 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>COMMON CORNERS</span><span class="card-num">PREDICTABLE</span></div>
            <p class="card-desc"><strong>What it is:</strong> Standard 90-degree corners and default site boxes.<br><strong>The Risk:</strong> Every competent opponent pre-aims and pre-fires these angles through the wall. Holding tight common corners gets you killed instantly.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>OFF-ANGLES</span><span class="card-num">LETHAL</span></div>
            <p class="card-desc"><strong>What it is:</strong> Standing 2–3 meters away from the corner in open space, or on non-standard geometry.<br><strong>The Advantage:</strong> Breaks the peeker's pre-aim muscle memory, forcing them to execute a wide corrective flick.</p>
        </div>
    </div>
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The 3 Rules for Holding Off-Angles
        </div>
        <div class="step-list">
            <div class="step-item">
                <div class="step-num">A</div>
                <div class="step-content"><h4>One Kill &amp; Fall Back</h4><p>An off-angle only works once per half. Once revealed, it becomes a death trap with zero cover. Get your opening pick and immediately retreat to secondary cover.</p></div>
            </div>
            <div class="step-item">
                <div class="step-num">B</div>
                <div class="step-content"><h4>Require an Escape Ability</h4><p>Off-angles are best held by agents with instant escape mechanisms (Jett dash, Chamber TP, Reyna dismiss) or with flash support.</p></div>
            </div>
            <div class="step-item">
                <div class="step-num">C</div>
                <div class="step-content"><h4>Elevated Geometry</h4><p>Standing on a single crate or slope shifts your head box above the expected horizontal horizon, adding ~100ms to the enemy's vertical adjustment.</p></div>
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Esports Secret:</strong> Pro defenders rarely hold the 90° corner. They hold 2 meters off-angle and catch the swinging attacker mid-stride.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "TACTICAL POSITIONING", "STEP 03 // OFF-ANGLES", "Common angles vs lethal off-angles.", "How to break your opponent's pre-aim muscle memory by exploiting unexpected spacing and elevation.", p5, "DCPROSENS", "CROSSHAIR PLACEMENT", 5))

    # P6: Distance From Wall & Peeker's Advantage
    p6 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm; padding: 3mm 4mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Perspective Angle Geometry (The Wall Distance Law)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            In 3D video game engines, the player who stands <strong>farther away from the obscuring corner wall</strong> sees the enemy's shoulder and elbow first.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card" style="border-left: 3px solid var(--accent-red);">
            <div class="card-title"><span>HUGGING THE WALL (WRONG)</span><span class="card-num">LOSE</span></div>
            <p class="card-desc">When you stand 1 meter from the corner, your shoulder model clips into the enemy's field of view before your camera can see them. You are visible <strong>80ms–120ms before you can react</strong>.</p>
        </div>
        <div class="card glow-primary" style="border-left: 3px solid var(--primary);">
            <div class="card-title"><span>MAX DISTANCE ANGLE (CORRECT)</span><span class="card-num">WIN</span></div>
            <p class="card-desc">Back up 5–8 meters away from the corner. Your wide line of sight catches the peeker's leading elbow and shoulder while your head remains fully obscured by the geometry.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Netcode &amp; Peeker's Advantage Breakdown
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            Peeker's advantage = <code>Attacker Ping + Defender Ping + Server Tick Buffer (~40ms–70ms total)</code>. An aggressive swinger sees a static defender before the server transmits their movement packet to the defender's monitor.
        </p>
    </div>
    <div class="callout alert-red">
        <strong>The Counter-Measure:</strong> Never stand completely motionless when holding an angle against a swinging attacker. Use micro A-D jiggle peeks to reset peeker's advantage in your favor.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "PERSPECTIVE SCIENCE", "STEP 04 // PERSPECTIVE ADVANTAGE", "Distance from the wall & peeker's advantage.", "The physics of 3D camera projection: why standing far from corners lets you see enemies before they see you.", p6, "DCPROSENS", "CROSSHAIR PLACEMENT", 6))

    # P7: Reaction Time Cushion
    p7 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Why Hugging The Corner Pixel Gets You Killed
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Placing your crosshair on the exact 1-pixel edge of a corner assumes your human reaction time is 0ms. In reality, human visual reaction time + input lag + ping equals <strong>180ms–240ms</strong>. By the time you click, the enemy has already run past your crosshair.
        </p>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Enemy Movement</th><th style="width: 25%;">Enemy Velocity</th><th style="width: 25%;">Crosshair Gap Needed</th><th style="width: 25%;">Target Placement</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Walk / Shift Peek</strong></td><td>120–150 units/s</td><td>50–75 pixels from wall</td><td>Tight reaction gap</td></tr>
                <tr><td><strong>Standard Run Peek</strong></td><td>220–250 units/s</td><td>120–160 pixels from wall</td><td>Optimal tournament cushion</td></tr>
                <tr><td><strong>Wide Swing / Jump</strong></td><td>260–300+ units/s</td><td>200–280 pixels from wall</td><td>Wide reaction cushion</td></tr>
            </tbody>
        </table>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>AWP / Operator Spacing</span></div>
            <p class="card-desc">With one-shot sniper rifles, leave a <strong>wider cushion</strong>. Allow the enemy to sprint directly into your crosshairs rather than attempting to flick onto their leading shoulder.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>Rifle Micro-Track Spacing</span></div>
            <p class="card-desc">With assault rifles, place your crosshair <strong>1.5 head-widths</strong> off the wall. The enemy's head will intersect your crosshair precisely as your nervous system triggers the click.</p>
        </div>
    </div>
    <div class="callout">
        <strong>The Rule:</strong> Adjust your crosshair gap based on the enemy's expected momentum. Wide swingers get wide cushions; tight jigglers get tight cushions.
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "REACTION TIMING", "STEP 05 // THE REACTION CUSHION", "The reaction time cushion.", "Why placing your crosshair directly on the corner pixel is a fatal mistake, and how to calibrate your reaction gap.", p7, "DCPROSENS", "CROSSHAIR PLACEMENT", 7))

    # P8: Angle Clearing Worksheet & Drill Log
    p8 = """
    <div class="form-row">
        <div class="field-box">
            <div class="field-label">TARGET MAP &amp; BOMBSITE</div>
            <div class="field-line">e.g. Mirage A Site / Ascent B Site</div>
        </div>
        <div class="field-box">
            <div class="field-label">WEAPON PLATFORM TESTED</div>
            <div class="field-line">Vandal / AK-47 / Operator / AWP</div>
        </div>
    </div>
    <div class="form-row" style="margin-bottom: 3.5mm;">
        <div class="field-box">
            <div class="field-label">PRIMARY PEEKING TECHNIQUE</div>
            <div class="field-line">Slice The Pie / Jiggle Peek / Wide Swing</div>
        </div>
        <div class="field-box">
            <div class="field-label">MEASURED REACTION CUSHION GAP</div>
            <div class="field-line">Target Gap: _______ pixels / head-widths</div>
        </div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Angle Test</th><th style="width: 25%;">Head Height Landmark</th><th style="width: 25%;">Flick Correction Needed</th><th style="width: 25%;">First-Bullet Accuracy</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Angle 01 (Close Left)</strong></td><td>Box Edge / Door Handle</td><td>[  ] &lt;2°  [  ] 5°  [  ] &gt;10°</td><td>[  ] Headshot  [  ] Missed</td></tr>
                <tr><td><strong>Angle 02 (Deep Site)</strong></td><td>Wall Texture Line</td><td>[  ] &lt;2°  [  ] 5°  [  ] &gt;10°</td><td>[  ] Headshot  [  ] Missed</td></tr>
                <tr><td><strong>Angle 03 (Elevated)</strong></td><td>Stair Incline Landmark</td><td>[  ] &lt;2°  [  ] 5°  [  ] &gt;10°</td><td>[  ] Headshot  [  ] Missed</td></tr>
                <tr><td><strong>Angle 04 (Off-Angle)</strong></td><td>Open Space Offset (2m)</td><td>[  ] &lt;2°  [  ] 5°  [  ] &gt;10°</td><td>[  ] Headshot  [  ] Missed</td></tr>
            </tbody>
        </table>
    </div>
    <div class="card glow-primary">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff;">SESSION CROSSHAIR MASTERY GRADE</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary);">SELF-EVALUATION</span>
        </div>
        <div style="font-size: 8pt; color: var(--text-muted);">
            [  ] Tier S (&gt;90% Headshots Without Flicking) &nbsp;|&nbsp; [  ] Tier A (Minor Micro-Adjusts) &nbsp;|&nbsp; [  ] Tier B (Excessive Flicking)
        </div>
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "TRAINING LOG", "STEP 06 // THE WORKSHEET", "Angle clearing worksheet & drill log.", "Document your environmental landmarks, angle correction scores, and crosshair placement consistency.", p8, "DCPROSENS", "CROSSHAIR PLACEMENT", 8))

    # P9: 6-Step Angle Mastery Routine
    p9 = """
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>01 / Offline Custom Server Map Walk (10 Minutes)</h5>
                <p>Load an empty server. Walk common routes with your crosshair glued to head-level landmarks. Train your hand to elevate over stairs automatically.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>02 / Wall-Trace Strafe Drill</h5>
                <p>Pick a sharp corner edge. Move sideways left and right while keeping your crosshair locked onto the corner edge without drifting into open space.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>03 / Pre-Aim Through Wall Peeks</h5>
                <p>Line up your crosshair on common hiding spots through solid walls, take one A/D step, counter-strafe stop, and fire 1 bullet. Verify zero corrective mouse flick.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>04 / Cushion Spacing Practice</h5>
                <p>Hold angles with a teammate in custom games. Have them wide swing, walk peek, and jump peek. Dial in your reaction cushion gap.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>05 / Eliminate Floor-Scanning</h5>
                <p>Review 1 match replay. Count how many seconds your crosshair spent pointed at the floor while rotating. Cut this number to zero.</p>
            </div>
        </div>
        <div class="check-item">
            <div class="check-box-mock"></div>
            <div class="check-text">
                <h5>06 / Pre-Aim Confidence Protocol</h5>
                <p>When entering a site, commit to your pre-aimed angles. Peek with 100% confidence that an enemy is already at your crosshair.</p>
            </div>
        </div>
    </div>
    <div class="progress-pill">
        <span>ANGLE MASTERY PROTOCOL</span>
        <span class="progress-val">6 / 6 STEPS DRILL COMPLETED</span>
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "TRAINING PROTOCOL", "STEP 07 // DAILY DRILLS", "6-step angle mastery routine.", "Daily custom lobby drills to burn competitive map geometry and crosshair elevation into automatic muscle memory.", p9, "DCPROSENS", "CROSSHAIR PLACEMENT", 9))

    # P10: Summary & DCPROSENS Crosshair Lab
    p10 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                The 3 Laws of Crosshair Placement
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>1. Glue to the Horizon:</strong> Floor aiming is the single biggest cause of lost duels.</li>
                <li><strong>2. Slice, Don't Swing:</strong> Clear angles one 15° piece at a time.</li>
                <li><strong>3. Leave a Cushion:</strong> Your crosshair belongs where the enemy will stop, not where they start.</li>
            </ul>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                Optimal Crosshair Settings
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>Color:</strong> Cyan (#00e5ff) or Green (#00ff9d) for maximum retinal contrast against red/dark targets.</li>
                <li><strong>Size:</strong> Small static crosshair (e.g. 1-4-2-2 in CS2, 1-4-2-0 in Valorant).</li>
                <li><strong>Outlines:</strong> 1px black outline for visibility against bright skyboxes.</li>
            </ul>
        </div>
    </div>
    <div class="card glow-primary" style="background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 229, 255, 0.05)); border-color: var(--primary); padding: 4mm 5mm;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; font-weight: 700; color: #fff;">
                    Explore Pro Player Crosshair Database
                </div>
                <div style="font-size: 8.2pt; color: var(--text-muted); margin-top: 1mm;">
                    Access verified crosshair codes and sensitivity profiles from top tier-1 pros at <strong>dcprosens.com</strong>
                </div>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 700; color: var(--primary); padding: 2mm 3.5mm; background: rgba(0, 255, 157, 0.15); border-radius: 4px; border: 1px solid var(--primary);">
                DCPROSENS.COM ➔
            </div>
        </div>
    </div>
    """
    pages.append(create_page("02 / CROSSHAIR & ANGLES", "TACTICAL DIRECTORY", "FINAL SUMMARY // MASTERY", "Eliminate reaction flicks permanently.", "Master tactical geometry, embrace passive crosshair placement, and dominate your competitive matches.", p10, "DCPROSENS", "CROSSHAIR PLACEMENT", 10))

    html = get_header("Crosshair Placement & Angle Control") + "".join(pages) + get_footer()
    output_html = os.path.join(EBOOKS_DIR, "02_Crosshair_Placement_Angle_Control.html")
    output_pdf = os.path.join(EBOOKS_DIR, "02_Crosshair_Placement_Angle_Control.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    compile_pdf(output_html, output_pdf)

generate_book_2()
print("Book 2 generated.")
