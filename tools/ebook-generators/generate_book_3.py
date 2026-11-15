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
# BOOK 3: THE 15-MINUTE AIM WARM-UP
# =========================================================================
def generate_book_3():
    pages = []
    pages.append(create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_15min_aim_warmup.jpg",
        "FIELD GUIDE 03 // PRE-MATCH ACTIVATION",
        "THE 15-MINUTE",
        "AIM WARM-UP.",
        "The scientific pre-match activation routine: 3 phases, zero fatigue, peak reaction speed, and unbreakable focus before ranked queue.",
        "NEURAL ACTIVATION BLUEPRINT"
    ))

    # P2: The Science of a Warm-Up
    p2 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>Activation vs Fatigue</span><span class="card-num">01</span></div>
            <p class="card-desc">Grinding Aim Lab or Deathmatch for 60+ minutes right before ranked exhausts your fast-twitch motor units and burns out dopamine. You enter competitive matches with sluggish reflexes and muscle fatigue.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>The 15-Minute Sweet Spot</span><span class="card-num">02</span></div>
            <p class="card-desc">Sports physiology proves <strong>12 to 15 minutes</strong> is the optimal duration to raise intramuscular temperature, lubricate synovial joints, and prime optical tracking pathways without causing physical fatigue.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The 3 Objectives of Every Successful Warm-Up
        </div>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--primary);">1. Synovial Fluid:</strong> Warm up wrist tendons to eliminate gritty mousepad friction.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--secondary);">2. Neural Sync:</strong> Calibrate hand speed with optical retinal refresh rates.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-amber);">3. State of Flow:</strong> Induce relaxed competitive confidence and eliminate anxiety.
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>The Iron Law of Aim:</strong> Warm-up is for activation. Training is for growth. Warm up for 15 minutes before your match; do your heavy 45-minute training routines AFTER your matches.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "PHYSIOLOGY", "STEP 00 // ACTIVATION SCIENCE", "The purpose of a 15-minute warm-up.", "Why extended aim training before ranked causes muscle fatigue, and how a short routine primes fast-twitch reaction.", p2, "DCPROSENS", "15-MINUTE AIM WARM-UP", 2))

    # P3: The 3-Phase Structure Overview
    p3 = """
    <div class="grid-3" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary); font-weight: 700;">MINUTES 00 – 05</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 12pt; color: #fff; font-weight: 700; margin: 1mm 0;">Phase 1: Smoothness</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Eliminate jagged wrist jitter. Trace moving targets smoothly without clicking. Sync hand speed with target velocity.</p>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--secondary); font-weight: 700;">MINUTES 05 – 10</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 12pt; color: #fff; font-weight: 700; margin: 1mm 0;">Phase 2: Precision Flicks</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Small-angle static clicks. Enforce the 95%+ accuracy rule. Train finger micro-adjustments and clean stopping power.</p>
        </div>
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--accent-amber); font-weight: 700;">MINUTES 10 – 15</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 12pt; color: #fff; font-weight: 700; margin: 1mm 0;">Phase 3: Dynamic Speed</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Wide target transfers, rapid target switching, and reactive counter-strafing. Match real in-game duel tempo.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Where to Perform This Routine
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            You can run this routine in any dedicated aim trainer (Aim Lab, KovaaK's) or directly in your primary game's practice mode (Valorant Practice Range, CS2 Aim Botz / DM, Apex Firing Range).
        </p>
    </div>
    <div class="callout">
        <strong>Pacing Strategy:</strong> Do not play for high scores on a leaderboard. Play for relaxed, mechanical fluidity. Smooth is fast.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "ROUTINE STRUCTURE", "STEP 01 // THE 3-PHASE ARCHITECTURE", "The 3-phase warm-up breakdown.", "A balanced 15-minute progression from smooth tracking to micro-precision and dynamic tournament speed.", p3, "DCPROSENS", "15-MINUTE AIM WARM-UP", 3))

    # P4: Phase 1: Smoothness & Centering
    p4 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Drill: The Zero-Fire Tracking Trace (5 Minutes)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Pick a moving bot or spherical tracking target. <strong>Do NOT shoot.</strong> Place your crosshair on the center dot of the target and follow it continuously for 5 minutes without letting your crosshair slip off the target.
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Consciously Relax Hand Grip</h4><p>Most players grip their mouse with 80% maximum tension. Lower your grip force to 25–30%. Excessive tension causes micro-stutters in optical tracking.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Lead With Your Eyes First</h4><p>Lock your gaze onto the target's leading edge, not your crosshair. Let your peripheral vision pull your hand naturally into alignment.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Continuous Elbow-Wrist Fluidity</h4><p>Feel the smooth transition between forearm glide and wrist steering. Eradicate all stepped, jerky micro-stops.</p></div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Telemetry Benefit:</strong> Tracking drills calm the sympathetic nervous system and recalibrate your brain's spatial prediction engine before entering chaotic firefights.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "PHASE 01 // MINUTES 00-05", "STEP 02 // SMOOTHNESS TRACKING", "Phase 1: Smoothness & tracking activation.", "Eliminate jerky wrist micro-stutters and calibrate eye tracking with relaxed low-tension hand movements.", p4, "DCPROSENS", "15-MINUTE AIM WARM-UP", 4))

    # P5: Phase 2: Micro-Flicks & Precision
    p5 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Drill: The 95% Accuracy Static Clicks (5 Minutes)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Spawn static targets (e.g. 1w6ts, Bardpill, or Valorant Bot Armor). Execute controlled flicks between targets. <strong>You must maintain 95%+ accuracy.</strong> If you miss more than 1 in 20 shots, you are flicking too fast.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>Step 1: The Initial Stroke</span><span class="card-num">90%</span></div>
            <p class="card-desc">Move your hand briskly toward the target, covering 90% of the distance in a single straight line. Avoid curved or wavy flick trajectories.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>Step 2: The Micro-Confirmation</span><span class="card-num">10%</span></div>
            <p class="card-desc">Decelerate cleanly onto the head, visually confirm the dot is on target, then click. Never click while your mouse is still decelerating.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The Metronome Pacing Protocol
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            Flick with a steady, rhythmic cadence (e.g. 120–140 clicks per minute). Rhythm eliminates panic clicks and trains reliable stopping power in your fingertips.
        </p>
    </div>
    <div class="callout alert-red">
        <strong>The Speed Trap:</strong> Speed is a byproduct of precision, not the goal. If you train fast with misses, you are reinforcing missed shots in your muscle memory.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "PHASE 02 // MINUTES 05-10", "STEP 03 // MICRO-PRECISION", "Phase 2: Micro-flicks & stopping power.", "Develop razor-sharp first-bullet accuracy with static clicking drills, clean deceleration, and metronome pacing.", p5, "DCPROSENS", "15-MINUTE AIM WARM-UP", 5))

    # P6: Phase 3: Dynamic Speed & Switching
    p6 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Drill: Reactive Target Switching &amp; Counter-Strafing (5 Minutes)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Shift into match-intensity speed. Engage 2 to 3 targets in rapid succession, incorporating real movement keys (A-D counter-strafes, peeks, and resets).
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Target Transfer Bursting</h4><p>Eliminate target 1 with a 2-bullet burst, transfer immediately to target 2 with zero pause, reset your recoil, and eliminate target 3.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>A-D Counter-Strafe Sync</h4><p>Fire only at the exact millisecond your character halts between A and D keypresses. Build mechanical synchronization between left and right hands.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>180° Emergency Turn Drill</h4><p>Finish the last 60 seconds with 10 maximum-speed 180° turnaround snaps to calibrate emergency arm resets before loading into ranked.</p></div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Phase Complete:</strong> Your brain is now operating at match speed. Shut down the training lobby immediately and jump directly into competitive queue while your neural pathways are hot.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "PHASE 03 // MINUTES 10-15", "STEP 04 // MATCH TEMPO", "Phase 3: Dynamic target switching & speed.", "Bring your aim up to tournament intensity with rapid target transfers, counter-strafing rhythm, and emergency resets.", p6, "DCPROSENS", "15-MINUTE AIM WARM-UP", 6))

    # P7: Physical Stretches & Ergonomics
    p7 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Esports Physical Therapy: 3-Minute Wrist &amp; Hand Stretches
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Perform these 4 stretches before touching your mouse. They increase blood circulation by 40% and prevent debilitating tendonitis and carpal tunnel syndrome.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>01 / The Prayer Stretch</span><span class="card-num">30s</span></div>
            <p class="card-desc">Press palms together in front of your chest with fingers pointing upward. Slowly lower your hands while keeping palms touching until you feel a gentle stretch in your inner wrists.</p>
        </div>
        <div class="card">
            <div class="card-title"><span>02 / Extensor Pull-Back</span><span class="card-num">30s</span></div>
            <p class="card-desc">Extend your right arm straight forward, palm down. Use your left hand to gently pull fingers downward toward your body. Hold 15s per arm to stretch forearm extensor muscles.</p>
        </div>
        <div class="card">
            <div class="card-title"><span>03 / Finger Splay &amp; Tendon Glides</span><span class="card-num">30s</span></div>
            <p class="card-desc">Spread all fingers as wide as possible for 5 seconds, then curl them into a tight fist with your thumb wrapped outside. Repeat 10 times to release median nerve tension.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>04 / Warm Water Flush</span><span class="card-num">60s</span></div>
            <p class="card-desc">Run warm water over your hands and wrists for 60 seconds before cold-weather gaming. Warm tendons react 25ms faster than cold, stiff tendons.</p>
        </div>
    </div>
    <div class="callout">
        <strong>Joint Health Rule:</strong> If you feel sharp, burning nerve pain or tingling in your fingertips, stop immediately. Take a 24-hour break and inspect your chair and desk height.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "INJURY PREVENTION", "STEP 05 // PHYSICAL ACTIVATION", "Physical stretches & tendon health.", "Protect your hands and wrists with quick physiotherapy stretches designed to eliminate strain and maximize agility.", p7, "DCPROSENS", "15-MINUTE AIM WARM-UP", 7))

    # P8: Daily Warm-Up Log
    p8 = """
    <div class="form-row">
        <div class="field-box"><div class="field-label">DATE &amp; TIME</div><div class="field-line">e.g. 2026-10-12 // 15:00</div></div>
        <div class="field-box"><div class="field-label">TRAINING PLATFORM</div><div class="field-line">Aim Lab / KovaaKs / In-Game Range</div></div>
    </div>
    <div class="form-row" style="margin-bottom: 3.5mm;">
        <div class="field-box"><div class="field-label">ROOM TEMPERATURE / HAND WARMTH</div><div class="field-line">[  ] Warm &amp; Agile  [  ] Cold / Stiff</div></div>
        <div class="field-box"><div class="field-label">TARGET COMPETITIVE TITLE</div><div class="field-line">Valorant / CS2 / Apex / Warzone</div></div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Phase</th><th style="width: 30%;">Focus Metric</th><th style="width: 25%;">Target Threshold</th><th style="width: 20%;">Score / Status</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Phase 1: Smoothness</strong></td><td>Tracking Accuracy %</td><td>&gt;85% Lock-On</td><td>_______ %</td></tr>
                <tr><td><strong>Phase 2: Micro-Flicks</strong></td><td>Static Accuracy %</td><td>&gt;95% Accuracy</td><td>_______ %</td></tr>
                <tr><td><strong>Phase 3: Speed</strong></td><td>Targets Per Minute</td><td>Match Pace</td><td>_______ TPM</td></tr>
                <tr><td><strong>Post-Routine Check</strong></td><td>Physical Readiness</td><td>Scale 1–10</td><td>Rating: ___ / 10</td></tr>
            </tbody>
        </table>
    </div>
    <div class="card glow-primary">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff;">READY-TO-QUEUE THRESHOLD</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary);">STATUS</span>
        </div>
        <div style="font-size: 8pt; color: var(--text-muted);">
            If Readiness Rating is &ge; 8/10, proceed directly to Ranked Queue. If &lt; 5/10, take a 10-minute water break.
        </div>
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "TELEMETRY TRACKER", "STEP 06 // THE WORKSHEET", "Daily warm-up log & scorecard.", "Track your daily accuracy, smoothness rating, and physical readiness before every competitive session.", p8, "DCPROSENS", "15-MINUTE AIM WARM-UP", 8))

    # P9: Tilt Protocol
    p9 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The 10-Second Mental Reset Protocol
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Tilt does not happen in your hands; it happens in your amygdala. When an opponent gets a lucky shot or a teammate makes an error, your heart rate spikes and your adrenaline ruins fine motor control.
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>The Physiological Sigh (2 Inhales, 1 Long Exhale)</h4><p>Take two quick deep inhales through your nose, followed by one long, slow exhale through your mouth. This immediately drops heart rate by 10–15 BPM.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Release Mouse Grip Between Rounds</h4><p>Take your right hand completely off the mouse during the 15-second buy phase. Shake out your fingers and drop your shoulders.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Focus Purely on The Next Crosshair Placement</h4><p>Wipe the previous round from your mind. Tell yourself: <em>"My only job this round is to clear my first angle cleanly."</em></p></div>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>The 3-Loss Rule:</strong> If you lose 3 ranked games in a row, close the game immediately. Cognitive fatigue makes it statistically impossible to play at peak reaction speed.
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "MENTAL RESILIENCE", "STEP 07 // ANTI-TILT PROTOCOL", "Pre-queue mental activation & tilt reset.", "Master the psychology of high-stakes duels, control physiological heart rate spikes, and bounce back from bad rounds.", p9, "DCPROSENS", "15-MINUTE AIM WARM-UP", 9))

    # P10: Summary & DCPROSENS Hub
    p10 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                The 15-Minute Rules of Thumb
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>15 Minutes Max:</strong> Never train to exhaustion before ranked play.</li>
                <li><strong>Smoothness First:</strong> Fluid motion beats panicked flicking every time.</li>
                <li><strong>95% Accuracy:</strong> Precision creates speed; speed without precision creates misses.</li>
            </ul>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                When to Schedule Deep Aim Training
            </div>
            <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
                Schedule your heavy 45-minute mechanical aim routines (KovaaK's/Aim Lab playlists) <strong>at the end of your day</strong> or on non-ranked days to build long-term neuromuscular adaptation.
            </p>
        </div>
    </div>
    <div class="card glow-primary" style="background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 229, 255, 0.05)); border-color: var(--primary); padding: 4mm 5mm;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; font-weight: 700; color: #fff;">
                    Free Aim Lab &amp; KovaaKs DCPROSENS Routine Codes
                </div>
                <div style="font-size: 8.2pt; color: var(--text-muted); margin-top: 1mm;">
                    Download verified benchmark playlists and track your rank progression at <strong>dcprosens.com</strong>
                </div>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 700; color: var(--primary); padding: 2mm 3.5mm; background: rgba(0, 255, 157, 0.15); border-radius: 4px; border: 1px solid var(--primary);">
                DCPROSENS.COM ➔
            </div>
        </div>
    </div>
    """
    pages.append(create_page("03 / AIM WARM-UP", "DIRECTORY & NEXT STEPS", "FINAL SUMMARY // ACTIVATED", "Lock in your daily warm-up routine.", "Make this 15-minute protocol a non-negotiable pre-match ritual and watch your competitive consistency soar.", p10, "DCPROSENS", "15-MINUTE AIM WARM-UP", 10))

    html = get_header("The 15-Minute Aim Warm-Up") + "".join(pages) + get_footer()
    output_html = os.path.join(EBOOKS_DIR, "03_The_15_Minute_Aim_Warmup.html")
    output_pdf = os.path.join(EBOOKS_DIR, "03_The_15_Minute_Aim_Warmup.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    compile_pdf(output_html, output_pdf)

generate_book_3()
print("Book 3 generated.")
