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
# BOOK 4: FRICTION & CONTROL MATRIX
# =========================================================================
def generate_book_4():
    pages = []
    pages.append(create_cover(
        "file:///home/usuario/Documentos/GOOGLE%20ANTIGRAVIY/DCPROSENS/public/ebooks/cover_friction_control_matrix.jpg",
        "FIELD GUIDE 04 // HARDWARE &amp; FRICTION PHYSICS",
        "FRICTION &amp;",
        "CONTROL MATRIX.",
        "The complete engineering guide to mousepad weaves, virgin PTFE skates, mouse weight dynamics, and zero-humidity glide.",
        "HARDWARE SYNERGY BLUEPRINT"
    ))

    # P2: Static vs Dynamic Friction
    p2 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>STATIC FRICTION (μs)</span><span class="card-num">INITIAL FORCE</span></div>
            <p class="card-desc">The resistance required to initiate movement from a dead stop. <strong>High static friction</strong> makes tiny 5-pixel headshot micro-adjustments feel sticky, jerky, and sluggish.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>DYNAMIC FRICTION (μk)</span><span class="card-num">GLIDE RESISTANCE</span></div>
            <p class="card-desc">The resistance felt while your mouse is actively gliding across the pad. <strong>Controlled dynamic friction</strong> provides vital stopping power when terminating high-speed flicks.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            The Esports Holy Grail: Low Static + High Dynamic Friction
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35; margin-bottom: 2mm;">
            Competitive players do not want frictionless ice; they want instantaneous micro-adjustments combined with stable braking force.
        </p>
        <div class="grid-3" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-red);">Mud Pad (High μs / High μk):</strong> Sticky micro-adjustments, causes overshoot from overcompensating.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--accent-amber);">Glass Pad (Low μs / Low μk):</strong> Zero friction, incredible tracking, zero stopping power.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong style="color: var(--primary);">Artisan Zero / Saturn (Low μs / Med μk):</strong> Effortless micro-aim + crisp, locked-in stopping power.
            </div>
        </div>
    </div>
    <div class="callout alert-cyan">
        <strong>Hardware Secret:</strong> If your micro-adjustments feel like they are fighting glue, your pad has excessive static friction. Upgrading skates or cleaning your pad solves this immediately.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "SURFACE PHYSICS", "STEP 00 // FRICTION MECHANICS", "Static vs dynamic friction explained.", "The two physical forces that dictate your mouse tracking speed, stopping power, and micro-precision.", p2, "DCPROSENS", "FRICTION & CONTROL MATRIX", 2))

    # P3: Mousepad Surface Spectrum
    p3 = """
    <div class="grid-3" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary); font-weight: 700;">CONTROL CLOTH</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; color: #fff; font-weight: 700; margin: 1mm 0;">Artisan Zero / Saturn Pro</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Micro-textured cloth weave. High stopping power, medium glide speed. <strong>Best for Valorant &amp; CS2.</strong></p>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--secondary); font-weight: 700;">HYBRID CORDURA</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; color: #fff; font-weight: 700; margin: 1mm 0;">Artisan Hayate Otsu / Hien</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Rough poly-weave. Fast glide, low initial friction, indestructible durability. <strong>Best for Apex &amp; Overwatch.</strong></p>
        </div>
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--accent-amber); font-weight: 700;">HARD GLASS</div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; color: #fff; font-weight: 700; margin: 1mm 0;">Skypad 3.0 / Wallhack SP-004</div>
            <p style="font-size: 7.8pt; color: var(--text-muted);">Tempered glass surface. Ultra-fast, zero static friction. Requires arm sleeve. <strong>Fast tracking only.</strong></p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Poron Foam Base Hardness (Mid vs Soft vs XSoft)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            High-end Japanese mousepads use Japanese Poron foam bases that react to downward hand pressure:
        </p>
        <div class="grid-3" style="gap: 2mm; margin-top: 1.5mm;">
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>MID (Firm):</strong> Consistent speed regardless of hand pressure. Highly predictable for fast arm swipers.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>SOFT (Balanced):</strong> Moderate cushion. Allows you to dig your mouse skates into the pad for emergency braking.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2mm; border-radius: 4px; font-size: 7.8pt;">
                <strong>XSOFT (Plush):</strong> Deep compression. Provides extreme dynamic stopping power when clamping down on flicks.
            </div>
        </div>
    </div>
    <div class="callout">
        <strong>Recommendation:</strong> If you are unsure, choose <strong>SOFT</strong>. It offers the ideal balance of uniform glide and controlled stopping compression.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "PAD TAXONOMY", "STEP 01 // SURFACE SPECTRUM", "The mousepad surface spectrum.", "Decoding control cloth, hybrid weaves, glass surfaces, and Japanese Poron foam base hardness.", p3, "DCPROSENS", "FRICTION & CONTROL MATRIX", 3))

    # P4: Mouse Skates: PTFE vs Glass vs Dots
    p4 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>100% VIRGIN GRADE PTFE</span><span class="card-num">PRO CHOICE</span></div>
            <p class="card-desc"><strong>What it is:</strong> Pure white fluoropolymer with zero colored additives or recycled fillers.<br><strong>Performance:</strong> Predictable, smooth, self-lubricating glide. Rounded curved edges prevent pad scratching. <strong>Used by 95% of pros.</strong></p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>HARDENED GLASS SKATES</span><span class="card-num">NICHE</span></div>
            <p class="card-desc"><strong>What it is:</strong> Polished aluminosilicate glass (e.g. Superglides).<br><strong>Performance:</strong> Blistering initial speed, but creates extreme pad wear on cloth and slows down drastically under high ambient humidity.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
            Full-Coverage Skates vs Universal PTFE Dots
        </div>
        <div class="grid-2" style="gap: 2mm;">
            <div style="background: var(--bg-card-alt); padding: 2.5mm; border-radius: 4px; font-size: 8pt;">
                <strong>Full-Coverage Corner Skates:</strong> Larger surface area disperses downward hand pressure. Slower glide, more controlled stopping power on soft cloth pads.
            </div>
            <div style="background: var(--bg-card-alt); padding: 2.5mm; border-radius: 4px; font-size: 8pt;">
                <strong>Universal 6mm PTFE Dots (X-Raypad / Tiger Ice):</strong> Minimal surface contact area. Drastically reduces static friction and creates lightning-fast initial glide on textured pads.
            </div>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>Replacement Interval:</strong> Mouse skates wear down microscopic grooves every 4 to 6 months of intense gaming. When the bevelled edges flatten, your mouse base starts scraping the pad. Replace skates twice a year.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "SKATES & FEET", "STEP 02 // SKATE DYNAMICS", "Mouse skates: virgin PTFE vs glass vs dots.", "How skate material, thickness (0.8mm), and surface area dictate your initial launch speed and pad wear.", p4, "DCPROSENS", "FRICTION & CONTROL MATRIX", 4))

    # P5: Mouse Weight Dynamics
    p5 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Inertia &amp; Momentum: The Physics of Mouse Weight
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Force = Mass × Acceleration. A heavy 100g mouse carries twice the momentum of a 50g mouse during a high-speed flick. To stop a heavy mouse, your wrist must exert double the braking force, causing muscle fatigue and overshoot.
        </p>
    </div>
    <div class="grid-3" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--accent-red); font-weight: 700;">HEAVY TIER (&gt;80g)</div>
            <p class="card-desc" style="margin-top: 1mm;">Legacy mice (G502, DeathAdder Elite). High wrist fatigue, slow direction changes, excessive tendon strain over 3+ hour sessions.</p>
        </div>
        <div class="card glow-primary">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary); font-weight: 700;">SWEET SPOT (45g–60g)</div>
            <p class="card-desc" style="margin-top: 1mm;">Logitech Superlight 2 (60g), Razer Viper V3 Pro (54g), BeastX (42g). Perfect structural rigidity, zero hand fatigue, stable micro-aim.</p>
        </div>
        <div class="card">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--secondary); font-weight: 700;">EXTREME (&lt;35g)</div>
            <p class="card-desc" style="margin-top: 1mm;">Carbon fiber shells. Zero inertia, but can induce micro-jitters under adrenaline if your mousepad has insufficient dynamic stopping power.</p>
        </div>
    </div>
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Center of Gravity (Weight Distribution)
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            Always ensure your mouse has a <strong>balanced 50/50 center of mass</strong>. A rear-heavy mouse will drag its tail during flicks, lifting the optical sensor slightly off the pad and causing tracking spin-outs.
        </p>
    </div>
    <div class="callout">
        <strong>Rule of Thumb:</strong> Transitioning from an 85g mouse to a 55g mouse immediately shaves 15–20ms off your physical target deceleration time.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "MASS & MOMENTUM", "STEP 03 // WEIGHT DYNAMICS", "Mouse weight & momentum physics.", "Why 45g to 60g is the undisputed competitive standard, and how weight distribution dictates stopping accuracy.", p5, "DCPROSENS", "FRICTION & CONTROL MATRIX", 5))

    # P6: Humidity & Sweat Management
    p6 = """
    <div class="card glow-secondary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The Silent Aim Killer: Relative Humidity (&gt;60% RH)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Standard cloth mousepads (like SteelSeries QcK) are made of woven polyester and rubber that absorb moisture from ambient air and palm sweat. At 65% humidity, a cloth pad's dynamic friction increases by up to <strong>35%</strong>, turning your glide into mud.
        </p>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card">
            <div class="card-title"><span>01 / Compression Arm Sleeves</span><span class="card-num">GEAR</span></div>
            <p class="card-desc">Polyester-spandex gaming arm sleeves eliminate forearm skin friction against the desk and pad. They prevent sweat transfer and guarantee identical forearm glide in summer and winter.</p>
        </div>
        <div class="card glow-primary">
            <div class="card-title"><span>02 / Humidity-Resistant Weaves</span><span class="card-num">SURFACE</span></div>
            <p class="card-desc">Upgrade to closed-structure hybrid weaves (Artisan Hayate Otsu, LGG Saturn Pro) or treated Cordura pads. These repel atmospheric moisture and maintain uniform friction year-round.</p>
        </div>
    </div>
    <div class="card" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            Room Environment Calibration
        </div>
        <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
            Keep your competitive room temperature at <strong>20°C–23°C (68°F–73°F)</strong> with relative humidity below 50%. A small desk dehumidifier will permanently stabilize your mousepad glide speed.
        </p>
    </div>
    <div class="callout alert-cyan">
        <strong>Tournament Pro Tip:</strong> At LAN events where stage lighting causes humidity spikes, pros always pack a fresh, sealed backup mousepad and a compression sleeve.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "CLIMATE SCIENCE", "STEP 04 // HUMIDITY DEFENSE", "Humidity, temperature & sweat management.", "Prevent your mousepad from turning into sticky mud during summer matches with moisture-resistant gear and arm sleeves.", p6, "DCPROSENS", "FRICTION & CONTROL MATRIX", 6))

    # P7: Pad Maintenance & Deep Cleaning Protocol
    p7 = """
    <div class="card glow-primary" style="margin-bottom: 3.5mm;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1mm;">
            The 20-Minute Pad Restoration Protocol (Wash Guide)
        </div>
        <p style="font-size: 8.2pt; color: var(--text-muted); line-height: 1.35;">
            Dead skin cells, dried sweat, and dust accumulate between micro-weaves every month, creating uneven slow spots in your aiming zone. Clean your pad every 30 days using this verified method:
        </p>
    </div>
    <div class="step-list" style="margin-bottom: 3.5mm;">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-content"><h4>Lukewarm Water Soak (Never Hot)</h4><p>Place pad flat in bathtub or large sink. Soak thoroughly with lukewarm water (25°C–30°C). Hot water dissolves the natural Poron rubber base adhesive.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-content"><h4>Gentle Dish Soap Foam (Zero Bleach)</h4><p>Apply 2 drops of mild grease-cutting dish soap (Dawn). Use a soft microfiber cloth or your clean palms in gentle circular motions. Never use abrasive brushes.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-content"><h4>Thorough Low-Pressure Rinse</h4><p>Rinse until the water runs 100% clear with zero soap bubbles. Residual dried soap creates horrific sticky friction when dry.</p></div>
        </div>
        <div class="step-item">
            <div class="step-num">4</div>
            <div class="step-content"><h4>Flat Air Dry (Towel Sandwich)</h4><p>Sandwich pad between two dry towels, press down gently to extract excess moisture, then lay completely flat on a table for 12 hours. Never hang with clips or tumble dry.</p></div>
        </div>
    </div>
    <div class="callout alert-red">
        <strong>Absolute Prohibition:</strong> Never expose mousepads to direct sunlight or hairdryers. Heat warps the rubber base permanently and ruins stitched borders.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "EQUIPMENT CARE", "STEP 05 // CLEANING PROTOCOL", "Deep cleaning & maintenance protocol.", "Safely wash cloth and hybrid mousepads without damaging micro-weaves, restoring factory out-of-the-box glide in 20 minutes.", p7, "DCPROSENS", "FRICTION & CONTROL MATRIX", 7))

    # P8: Hardware Synergy Worksheet
    p8 = """
    <div class="form-row">
        <div class="field-box"><div class="field-label">CURRENT MOUSE MODEL &amp; WEIGHT</div><div class="field-line">e.g. Superlight 2 // 60 grams</div></div>
        <div class="field-box"><div class="field-label">MOUSEPAD SURFACE &amp; BASE</div><div class="field-line">e.g. Artisan Zero Soft // 4mm</div></div>
    </div>
    <div class="form-row" style="margin-bottom: 3.5mm;">
        <div class="field-box"><div class="field-label">SKATES INSTALLED</div><div class="field-line">Stock PTFE / Tiger Ice / Corepad / Dots</div></div>
        <div class="field-box"><div class="field-label">LAST CLEANED DATE</div><div class="field-line">Date: _______</div></div>
    </div>
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Hardware Test</th><th style="width: 30%;">Assessment Criteria</th><th style="width: 25%;">Observed Telemetry</th><th style="width: 20%;">Action Needed</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Static Friction (Micro)</strong></td><td>5-pixel crosshair nudge</td><td>[  ] Clean  [  ] Sticky</td><td>Clean / Dots</td></tr>
                <tr><td><strong>Stopping Power (Brake)</strong></td><td>High-speed flick clamp</td><td>[  ] Firm  [  ] Slippery</td><td>Softer Base</td></tr>
                <tr><td><strong>Vertical vs Horiz Glide</strong></td><td>X/Y axis speed parity</td><td>[  ] 1:1  [  ] Y-Axis Slower</td><td>Rotate / Replace</td></tr>
                <tr><td><strong>Skate Edge Wear</strong></td><td>Fingernail bevel test</td><td>[  ] Smooth  [  ] Sharp Edge</td><td>Replace Skates</td></tr>
            </tbody>
        </table>
    </div>
    <div class="card glow-primary">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 9.5pt; font-weight: 700; color: #fff;">MY HARDWARE SYNERGY RATING</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: var(--primary);">RATING</span>
        </div>
        <div style="font-size: 8pt; color: var(--text-muted);">
            [  ] Flawless Synergy (Glide is uniform &amp; effortless) &nbsp;|&nbsp; [  ] Friction Imbalance (Skates or pad need replacement)
        </div>
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "HARDWARE AUDIT", "STEP 06 // THE WORKSHEET", "Hardware synergy audit worksheet.", "Audit your mouse, pad, and skates combo to pinpoint friction bottlenecks and determine maintenance intervals.", p8, "DCPROSENS", "FRICTION & CONTROL MATRIX", 8))

    # P9: Pad & Skates Recommendation Matrix
    p9 = """
    <div style="margin-bottom: 3.5mm;">
        <table class="spec-table">
            <thead>
                <tr><th style="width: 25%;">Game Genre</th><th style="width: 25%;">Ideal Pad Recommendation</th><th style="width: 25%;">Ideal Skates Setup</th><th style="width: 25%;">Primary Advantage</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Tactical Shooters</strong><br>(CS2 / Valorant)</td><td><strong>Artisan Zero (Soft)</strong><br>or Lethal Gaming Saturn Pro</td><td>Full-Size Virgin PTFE<br>(Corepad Pro / Tiger Ice)</td><td>Maximum stopping power, controlled micro-adjusts on headshots.</td></tr>
                <tr><td><strong>Fast Tracking</strong><br>(Apex / Overwatch)</td><td><strong>Artisan Hayate Otsu</strong><br>or Artisan Hien (Soft)</td><td>Tiger Ice V2<br>or 6mm PTFE Dots</td><td>Zero static friction, smooth directional tracking switches.</td></tr>
                <tr><td><strong>Battle Royale</strong><br>(Warzone / Fortnite)</td><td><strong>LGG Venus Pro</strong><br>or Razer Gigantus V2</td><td>Standard Virgin PTFE<br>(0.8mm thickness)</td><td>Balanced speed and stability across close and long range duels.</td></tr>
            </tbody>
        </table>
    </div>
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div class="card-title"><span>TOP VALUE COMBO</span></div>
            <p class="card-desc"><strong>Lethal Gaming Gear Saturn + Corepad Skatez ($45 total):</strong> Delivers 95% of Artisan performance with lifetime durability and zero humidity sensitivity.</p>
        </div>
        <div class="card glow-secondary">
            <div class="card-title"><span>FLAGSHIP ESPORTS COMBO</span></div>
            <p class="card-desc"><strong>Logitech G Pro X Superlight 2 (60g) + Artisan Zero Soft + Tiger Ice V2 Skates:</strong> The gold standard used by major CS2 and Valorant Champions winners.</p>
        </div>
    </div>
    <div class="callout">
        <strong>Hardware Investment Rule:</strong> A $50 premium mousepad paired with fresh skates improves your aim more than upgrading a $2,000 graphics card.
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "BUYER'S GUIDE", "STEP 07 // RECOMMENDATION MATRIX", "The competitive pad & skate combinations.", "Exact hardware pairings optimized for tactical shooters, tracking-heavy arena shooters, and high-mobility games.", p9, "DCPROSENS", "FRICTION & CONTROL MATRIX", 9))

    # P10: Summary & DCPROSENS Gear Hub
    p10 = """
    <div class="grid-2" style="margin-bottom: 3.5mm;">
        <div class="card glow-primary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                The 3 Laws of Friction
            </div>
            <ul style="font-size: 8pt; color: var(--text-muted); line-height: 1.4; padding-left: 3.5mm;">
                <li><strong>1. Low Static, High Dynamic:</strong> Effortless micro-aim + crisp stopping power.</li>
                <li><strong>2. PTFE is King:</strong> Avoid glass skates unless you play pure tracking arena titles.</li>
                <li><strong>3. Clean Every 30 Days:</strong> Never let sweat and dust destroy your pad's glide.</li>
            </ul>
        </div>
        <div class="card glow-secondary">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 1.5mm;">
                Verified Amazon Gear Deals
            </div>
            <p style="font-size: 8pt; color: var(--text-muted); line-height: 1.35;">
                Browse our curated gear guide with verified lowest prices on Superlight 2, Artisan Zero, Razer Viper V3 Pro, and Corepad skates at <strong>dcprosens.com/deals</strong>.
            </p>
        </div>
    </div>
    <div class="card glow-primary" style="background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 229, 255, 0.05)); border-color: var(--primary); padding: 4mm 5mm;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 11pt; font-weight: 700; color: #fff;">
                    Visit The DCPROSENS Hardware Lab
                </div>
                <div style="font-size: 8.2pt; color: var(--text-muted); margin-top: 1mm;">
                    Access real-time sensor tests, skate friction telemetry, and pro gear databases at <strong>dcprosens.com</strong>
                </div>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8pt; font-weight: 700; color: var(--primary); padding: 2mm 3.5mm; background: rgba(0, 255, 157, 0.15); border-radius: 4px; border: 1px solid var(--primary);">
                DCPROSENS.COM ➔
            </div>
        </div>
    </div>
    """
    pages.append(create_page("04 / FRICTION & GEAR", "DIRECTORY & NEXT STEPS", "FINAL SUMMARY // PERFECTION", "Unlock perfect physical glide.", "Build the ultimate mouse and mousepad synergy and experience effortless mechanical stopping power.", p10, "DCPROSENS", "FRICTION & CONTROL MATRIX", 10))

    html = get_header("Friction & Control Matrix") + "".join(pages) + get_footer()
    output_html = os.path.join(EBOOKS_DIR, "04_Friction_Control_Matrix.html")
    output_pdf = os.path.join(EBOOKS_DIR, "04_Friction_Control_Matrix.pdf")
    with open(output_html, "w", encoding="utf-8") as f:
        f.write(html)
    compile_pdf(output_html, output_pdf)

generate_book_4()
print("Book 4 generated.")
