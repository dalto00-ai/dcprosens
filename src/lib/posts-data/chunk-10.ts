import type { BlogPost } from './types';

export const postsChunk10: BlogPost[] = [
  {
    slug: 'why-aim-feels-different-after-converting-sensitivity',
    title: 'Why Does Your Aim Feel Different After Converting Sensitivity?',
    excerpt: "You matched your cm/360 exactly and it still feels off. Here are the 7 real reasons a mathematically correct sensitivity conversion can still feel wrong — and how to tell which one is yours.",
    date: 'August 19, 2026',
    readTime: '9 min read',
    category: 'Guide',
    image: '/blog/why-aim-feels-different-after-converting-sensitivity.webp',
    summary: "Your cm/360 is almost certainly right. The mismatch usually comes from one of six other variables the conversion doesn't touch: FOV, aspect ratio, mouse acceleration still running somewhere, frame rate/input latency, an unconverted scope multiplier, or a mousepad/grip change made at the same time.",
    content: `<h2>Your cm/360 Is Right. Here's What Isn't.</h2>
      <p>If you used a real yaw-based converter (not a generic ratio table), your physical hand movement for a 360° turn is almost certainly identical between the two games. When aim still feels wrong after that, the cause is one of six things the sensitivity conversion never touched in the first place — not a bad conversion.</p>

      <h2>Cause 1: FOV Is Different</h2>
      <p>Two games at the exact same cm/360 will feel different if their Field of View settings don't match. A wider FOV shows more of the world moving past the same physical mouse swing, which reads as "faster" even though your camera is rotating at the identical angular speed. Check both games' FOV sliders before assuming the sensitivity conversion is the problem — a mismatch here is one of the most common false positives.</p>

      <h2>Cause 2: Aspect Ratio and Stretched Resolution</h2>
      <p>Playing one game at native 16:9 and another at a stretched 4:3 resolution changes how much horizontal rotation maps to a given amount of screen-space movement, independent of yaw. If you use stretched resolution in one title and not the other, that's an extra variable on top of the sensitivity conversion. See our <a href="/stretched-resolution/">stretched resolution guide</a> for how much this actually shifts your effective sensitivity.</p>

      <h2>Cause 3: Mouse Acceleration Is Still On Somewhere</h2>
      <p>Windows' "Enhance Pointer Precision," a mouse driver's built-in acceleration curve, or an in-game acceleration setting can all silently distort your input even when your raw sensitivity number is correct. Acceleration means the same physical swing produces different amounts of rotation depending on how fast you moved — which breaks a fixed-yaw conversion by definition, since that math assumes a constant, linear response. Check all three layers: Windows pointer settings, your mouse manufacturer's software, and each game's own acceleration toggle.</p>

      <h2>Cause 4: Frame Rate and Input Latency Aren't Equal</h2>
      <p>A game running at 240 FPS feels more responsive to the same mouse movement than the same game at 90 FPS, purely from render latency — your input reaches the screen faster relative to your hand motion. This isn't a sensitivity issue at all, but it's frequently misdiagnosed as one. Use our <a href="/fps-calculator/">FPS calculator</a> to check whether your hardware is actually delivering comparable frame rates in both titles before you chase a sensitivity explanation.</p>

      <h2>Cause 5: Your Scope and ADS Sensitivity Didn't Convert</h2>
      <p>This is the cause that catches the most people. A hipfire sensitivity converter — including the one on this site — deliberately doesn't touch scoped/ADS sensitivity, because that uses a completely separate multiplier system per game. If your hipfire feels perfect but every scoped duel feels wrong, this is almost always why. Most competitors lock this conversion behind a paid tier; <a href="/ads/">DCPROSENS' scope calculator is free</a>, covering Valorant, CS2, Apex, and Warzone.</p>

      <h2>Cause 6: Character Movement and Weapon Sway</h2>
      <p>Some games apply extra camera sway or bob tied to movement state (sprinting, sliding, crouching) that has nothing to do with your sensitivity setting. If your aim feels inconsistent specifically while moving rather than while stationary, that's a movement-system difference between the two games, not a conversion error — no yaw-based calculator can compensate for it, because it isn't a sensitivity variable at all.</p>

      <h2>Cause 7: You Changed Mousepad or Grip at the Same Time</h2>
      <p>Switching games is a common moment to also switch mousepads, grip style, or even mouse — and stacking that change on top of a sensitivity conversion makes it hard to tell which variable is responsible for the "off" feeling. Higher-friction cloth pads and lower-friction glass/hard pads genuinely change how controlled your micro-adjustments feel at an identical cm/360. See our <a href="/mousepad-chart/">mousepad friction comparison</a> if you changed surfaces recently.</p>

      <h2>How to Diagnose Which One Is Your Problem</h2>
      <ol>
        <li><strong>Check FOV first.</strong> Set both games to the same effective FOV (or use each game's "match" setting if it has one) before touching anything else.</li>
        <li><strong>Confirm raw input / acceleration off</strong> in Windows, mouse software, and in-game settings, in all three places.</li>
        <li><strong>Test hipfire only</strong> in an empty range or bot match before judging scoped feel — isolate the variable.</li>
        <li><strong>Then test ADS/scope separately</strong> using the dedicated scope calculator, not your hipfire number.</li>
        <li><strong>Compare frame rate</strong> between the two games under similar in-game conditions, not just in the menu.</li>
        <li><strong>If you changed hardware</strong> (mousepad, mouse, grip) at the same time as the game switch, revert one variable at a time.</li>
      </ol>
    `,
    faqs: [
      { q: 'I matched my cm/360 exactly — why does the new game still feel faster?', a: "Check FOV first. Two games at an identical cm/360 but different Field of View settings will feel like different speeds, because a wider FOV shows more world movement per degree of rotation. This is the single most common cause of a 'correct but wrong-feeling' conversion." },
      { q: "Does mouse acceleration really break sensitivity conversion that much?", a: "Yes — a fixed-yaw conversion assumes a linear relationship between hand movement and camera rotation. Any acceleration curve (Windows, driver, or in-game) breaks that assumption, since the same physical swing now produces different rotation depending on speed." },
      { q: "Why does my scoped sensitivity still feel off even though hipfire is perfect?", a: "Hipfire and scoped/ADS sensitivity are separate systems in every FPS. A hipfire converter intentionally doesn't touch scope multipliers — use a dedicated ADS calculator for that." },
    ],
  },
  {
    slug: 'complete-fps-yaw-value-reference',
    title: 'Complete FPS Yaw Value Reference Table (Sourced)',
    excerpt: "Every yaw constant used on this site, with its confidence level and source — not copied from another converter site. Corrections welcome.",
    date: 'August 19, 2026',
    readTime: '10 min read',
    category: 'Guide',
    image: '/blog/complete-fps-yaw-value-reference.webp',
    summary: "A yaw constant is the number of degrees your camera rotates per mouse count in a given game. This table lists every value used across DCPROSENS' converters, each labeled by how well-corroborated it is — from 'confirmed by multiple independent sources' down to 'single-source, treat with caution.'",
    content: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'FPS Game Yaw Constant Reference Table',
      description: 'Yaw constants (degrees of camera rotation per mouse count) for competitive FPS and third-person shooter titles, with source confidence per entry.',
      creator: { '@type': 'Organization', name: 'DCPROSENS', url: 'https://dcprosens.com' },
      license: 'https://dcprosens.com/terms',
      variableMeasured: 'Yaw constant (degrees per mouse count)',
    })}</script>
      <h2>What a Yaw Value Actually Is</h2>
      <p>A yaw constant is the number of degrees a game's camera rotates for every single count your mouse sensor reports. It's the number underneath every sensitivity slider — the slider is just a multiplier on top of it. Two games can have wildly different "sensitivity" numbers on screen while producing the exact same physical hand movement, purely because their yaw constants differ. That's the entire basis of sensitivity conversion: <code>sens1 × yaw1 = sens2 × yaw2</code> when cm/360 is held constant.</p>

      <h2>Complete Yaw Reference Table</h2>
      <div class="scroll-container" style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
        <thead><tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:0.5rem;">Game</th>
          <th style="text-align:left; padding:0.5rem;">Engine</th>
          <th style="text-align:left; padding:0.5rem;">Yaw</th>
          <th style="text-align:left; padding:0.5rem;">Confidence</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:0.5rem;">Valorant</td><td style="padding:0.5rem;">Unreal Engine 4</td><td style="padding:0.5rem;">0.07</td><td style="padding:0.5rem;">Confirmed, widely corroborated</td></tr>
          <tr><td style="padding:0.5rem;">CS2 / CS:GO</td><td style="padding:0.5rem;">Source / Source 2</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Confirmed — Valve's documented m_yaw default</td></tr>
          <tr><td style="padding:0.5rem;">Apex Legends</td><td style="padding:0.5rem;">Source</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Confirmed, same Source-family constant</td></tr>
          <tr><td style="padding:0.5rem;">Overwatch 2</td><td style="padding:0.5rem;">Own engine</td><td style="padding:0.5rem;">0.0066</td><td style="padding:0.5rem;">Confirmed by multiple independent sources (incl. KovaaK Sensitivity Matcher)</td></tr>
          <tr><td style="padding:0.5rem;">CoD: Warzone / MW3</td><td style="padding:0.5rem;">IW Engine</td><td style="padding:0.5rem;">0.0066</td><td style="padding:0.5rem;">Same family as Overwatch 2, cross-checked</td></tr>
          <tr><td style="padding:0.5rem;">Rainbow Six Siege</td><td style="padding:0.5rem;">AnvilNext</td><td style="padding:0.5rem;">0.00572</td><td style="padding:0.5rem;">Confirmed via KovaaK Sensitivity Matcher source</td></tr>
          <tr><td style="padding:0.5rem;">Fortnite</td><td style="padding:0.5rem;">Unreal Engine 5</td><td style="padding:0.5rem;">0.005555</td><td style="padding:0.5rem;">Confirmed, widely corroborated</td></tr>
          <tr><td style="padding:0.5rem;">Marvel Rivals</td><td style="padding:0.5rem;">Unreal Engine 5</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Cross-referenced against 2+ independent community sources</td></tr>
          <tr><td style="padding:0.5rem;">THE FINALS</td><td style="padding:0.5rem;">Unreal Engine 5</td><td style="padding:0.5rem;">0.0066</td><td style="padding:0.5rem;">Cross-referenced against 2+ independent community sources</td></tr>
          <tr><td style="padding:0.5rem;">Deadlock</td><td style="padding:0.5rem;">Source 2</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Multiple sources converge (same engine family as CS2)</td></tr>
          <tr><td style="padding:0.5rem;">Halo Infinite</td><td style="padding:0.5rem;">Slipspace</td><td style="padding:0.5rem;">0.0225</td><td style="padding:0.5rem;">Confirmed via KovaaK preset yaw profiles</td></tr>
          <tr><td style="padding:0.5rem;">Escape from Tarkov</td><td style="padding:0.5rem;">Unity</td><td style="padding:0.5rem;">0.113636</td><td style="padding:0.5rem;">Single technical source</td></tr>
          <tr><td style="padding:0.5rem;">Destiny 2</td><td style="padding:0.5rem;">Tiger Engine</td><td style="padding:0.5rem;">0.0066</td><td style="padding:0.5rem;">Cross-referenced, same family as Overwatch 2</td></tr>
          <tr><td style="padding:0.5rem;">PUBG</td><td style="padding:0.5rem;">Unreal Engine 4</td><td style="padding:0.5rem;">0.00707</td><td style="padding:0.5rem;">Unverified — sources disagree, possibly non-linear at extremes</td></tr>
          <tr><td style="padding:0.5rem;">Battlefield 2042</td><td style="padding:0.5rem;">Frostbite</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Unverified — community sources disagree (0.0066, 0.0022, 0.022 all cited)</td></tr>
          <tr><td style="padding:0.5rem;">Hunt: Showdown</td><td style="padding:0.5rem;">CryEngine</td><td style="padding:0.5rem;">0.022</td><td style="padding:0.5rem;">Source-family convention applied, not independently measured for Hunt specifically</td></tr>
          <tr><td style="padding:0.5rem;">Roblox</td><td style="padding:0.5rem;">Own engine</td><td style="padding:0.5rem;">0.2</td><td style="padding:0.5rem;">Unverified — no published camera code, treat as approximation</td></tr>
          <tr><td style="padding:0.5rem;">Grand Theft Auto V</td><td style="padding:0.5rem;">RAGE</td><td style="padding:0.5rem;">0.0066</td><td style="padding:0.5rem;">Single-source figure</td></tr>
        </tbody>
      </table>
      </div>
      <p style="font-size:0.85rem; margin-top:0.75rem;">This table is a subset of the full list used in our <a href="/">converter</a> (70+ titles). Values marked "Unverified" or "single-source" are starting points, not guarantees — treat them accordingly.</p>

      <h2>Games That Don't Have a Fixed Yaw</h2>
      <p>Not every game can be reduced to one constant. Hunt: Showdown and several titles with FOV-dependent scope scaling apply different effective sensitivity at different zoom levels even with a fixed base yaw — a single number describes hipfire only. Minecraft (Java) uses a non-linear curve (<code>f = sensitivity × 0.6 + 0.2</code>, then cubed) rather than a straight multiplier, so no single yaw value converts it exactly at every point on the slider — our 0.6 entry approximates the 40–70% range most PvP players actually use, not the full curve. Treat any single-number yaw for these titles as an approximation of the range you play in, not an exact universal constant.</p>

      <h2>Our Measurement Methodology</h2>
      <p>Values on this site come from one of three tiers, always labeled: (1) a game's own documented console variable or engine default — the strongest tier, e.g. CS2's m_yaw; (2) cross-referencing 2+ independent technical sources that don't cite each other (engine documentation, published sensitivity-matching tool source code, or multiple community measurements that converge); (3) a single uncorroborated source, explicitly flagged as such and treated as a starting point rather than a guarantee. We do not publish a number as "confirmed" on the strength of a single converter website repeating it — that's how uncorroborated figures spread across the whole niche.</p>

      <h2>How to Measure Yaw Yourself</h2>
      <p>If you want to verify a value independently: set a fixed, known DPI (800 is easiest to do the arithmetic with), mark a starting point on your mousepad, and record the exact physical distance your mouse travels for one full 360° in-game turn at a known sensitivity. Repeat at least 5 times and average the result to reduce measurement error, then solve for yaw using <code>yaw = 360 / (sensitivity × DPI × inches_moved)</code>. Raw input and mouse acceleration must both be confirmed off first, or the measurement will be unreliable.</p>

      <h2>Corrections and Contributions</h2>
      <p>If you have a better-sourced value for anything marked "unverified" or "single-source" above, or you spot an error, use the <a href="/contact/">contact page</a> to send it our way along with your source. We'll update the table and credit the correction.</p>

      <h2>Frequently Asked Questions</h2>
    `,
    faqs: [
      { q: 'What is a yaw value in FPS games?', a: 'It\'s the number of degrees a game rotates its camera for every single count reported by your mouse sensor — the raw constant that every sensitivity slider multiplies against.' },
      { q: "Why do different sites list different yaw values for the same game?", a: "Because many converter sites copy figures from each other rather than independently verifying them, small errors propagate and calcify. This table only labels a value 'confirmed' when it traces to the game's own documented setting or multiple independent technical sources." },
      { q: 'Is Overwatch 2\'s yaw really 0.0066 and not 0.022?', a: 'Yes — 0.0066 is confirmed by multiple independent sources including KovaaK\'s Sensitivity Matcher. 0.022 is the Source-engine constant (CS2, Apex, Deadlock); the two get mixed up because they\'re often listed on the same line in low-quality sensitivity guides.' },
    ],
  },
  {
    slug: 'do-you-have-enough-desk-space-for-low-sensitivity',
    title: 'Do You Have Enough Desk Space for Low Sensitivity?',
    excerpt: "Pro-level cm/360 needs more physical desk room than most setups have. Here's how to check if your desk is actually the thing limiting your sensitivity, not your skill.",
    date: 'August 19, 2026',
    readTime: '7 min read',
    category: 'Gear',
    image: '/blog/do-you-have-enough-desk-space-for-low-sensitivity.webp',
    summary: "Low sensitivity (40cm/360 or lower) requires enough mousepad and desk room to physically sweep that distance without lifting your mouse. If your setup can't fit it, you're not \"bad at low sens\" — your desk is capping you before your aim ever gets a chance to.",
    content: `<h2>The 30-Second Answer</h2>
      <p>To play at a given cm/360 without constantly lifting and repositioning your mouse, you need roughly that many centimeters of clear sweep room in your dominant horizontal direction, plus a margin for micro-adjustments after a full turn. A 40cm/360 setup needs meaningfully more physical room than a 15cm/360 setup — if your desk or pad can't fit the sweep, you'll lift constantly, and lifting breaks the exact muscle-memory consistency low sensitivity is supposed to buy you. Check your current cm/360 with the <a href="/">sensitivity converter</a> before doing anything else here.</p>

      <h2>The Math: Why cm/360 Sets Your Minimum Pad Width</h2>
      <p>cm/360 is literally defined as the physical distance your mouse travels for a full 360° in-game turn. A player at 40cm/360 who wants to flick a full 180° without lifting needs about 20cm of clear lateral room in one direction, plus space to return without immediately hitting the pad edge. Add micro-adjustment headroom — the small corrective movements after a flick — and the practical minimum pad width for comfortable 40cm/360 play sits closer to 45-50cm, not the bare 20cm the geometry alone suggests. Use the <a href="/mousepad-calculator/">mousepad calculator</a> to check the exact minimum for your own cm/360.</p>

      <h2>Pad Size by Sensitivity Bracket</h2>
      <div class="scroll-container" style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
        <thead><tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:0.5rem;">cm/360 Range</th>
          <th style="text-align:left; padding:0.5rem;">Practical Minimum Width</th>
          <th style="text-align:left; padding:0.5rem;">Common Commercial Size</th>
        </tr></thead>
        <tbody>
          <tr><td style="padding:0.5rem;">60cm+ (Very Low)</td><td style="padding:0.5rem;">~60cm+</td><td style="padding:0.5rem;">XXL (900mm+)</td></tr>
          <tr><td style="padding:0.5rem;">40–60cm (Low)</td><td style="padding:0.5rem;">45–55cm</td><td style="padding:0.5rem;">XL (450-500mm)</td></tr>
          <tr><td style="padding:0.5rem;">25–40cm (Medium)</td><td style="padding:0.5rem;">30–40cm</td><td style="padding:0.5rem;">L (400mm)</td></tr>
          <tr><td style="padding:0.5rem;">Under 25cm (High)</td><td style="padding:0.5rem;">20–30cm</td><td style="padding:0.5rem;">M (350mm) or smaller</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Arm Aim vs Wrist Aim Changes the Answer</h2>
      <p>The same cm/360 needs different amounts of physical room depending on whether you aim primarily from the wrist or the whole arm. An arm-aim player generates the same sweep distance using shoulder and elbow movement across a flatter, wider arc, which typically needs more raw pad width than a wrist-aim player covering the identical distance in a tighter motion closer to the pad's center. If your desk is genuinely too narrow for your preferred cm/360, shifting more of the motion to the wrist is often more realistic than buying a bigger desk.</p>

      <h2>What Pro Players Use</h2>
      <p>Most low-sensitivity pro players in tactical shooters run XL or larger pads specifically to support their cm/360 without lifting — see our <a href="/setups/">pro player setups</a> for real examples of pad size paired with sensitivity.</p>

      <h2>Surface Type Matters as Much as Size</h2>
      <p>A pad that's technically wide enough but has the wrong friction level still causes problems — too much friction on a low-sensitivity setup makes long sweeps physically tiring, while too little makes fine corrections harder to control. See our <a href="/mousepad-chart/">mousepad friction comparison</a> for how glass, cloth, and hybrid surfaces affect control at different sensitivities.</p>

      <h2>Desk Space Is the Real Constraint</h2>
      <p>A big enough mousepad doesn't help if the desk underneath it isn't deep enough to hold it, or if a keyboard, monitor stand, or wrist rest is already eating the room you'd sweep into. Use the <a href="/desk-space-calculator/">desk space calculator</a> to check your actual available surface before buying a pad sized for a desk you don't have.</p>

      <h2>Frequently Asked Questions</h2>
    `,
    faqs: [
      { q: 'How much desk space do I need for 40cm/360 sensitivity?', a: "Roughly 45–55cm of clear pad width in your dominant sweep direction, once you account for the return stroke and micro-adjustment room after a flick — not just the bare 20cm the 180°-turn geometry alone implies." },
      { q: 'Can I play low sensitivity on a small desk if I use wrist aim instead of arm aim?', a: "Yes — wrist-driven motion covers the same cm/360 distance in a tighter arc than arm-driven motion, so it needs meaningfully less raw pad width for the same sensitivity." },
      { q: "Is a bigger mousepad always better for aim?", a: "No — a pad much larger than your actual cm/360 needs just adds unused space and can encourage inconsistent hand positioning. Size the pad to your sensitivity, not the other way around." },
    ],
  },
  {
    slug: 'is-your-mouse-actually-the-dpi-it-says',
    title: 'Is Your Mouse Actually the DPI It Says? Test It',
    excerpt: "Most gaming mice don't track at the exact DPI printed on the box or software. Here's why that gap exists and how to measure your mouse's real DPI in under two minutes.",
    date: 'August 19, 2026',
    readTime: '6 min read',
    category: 'Gear',
    image: '/blog/is-your-mouse-actually-the-dpi-it-says.webp',
    summary: "A mouse set to 800 DPI in software doesn't necessarily track at exactly 800 counts per inch — sensor manufacturing tolerance, firmware rounding, and driver-level scaling can all introduce a small but real gap. Measure it directly with the DPI analyzer instead of trusting the number in the settings panel.",
    content: `<h2>Your Mouse's Real DPI Isn't Its Advertised DPI</h2>
      <p>Setting your mouse to "800 DPI" in software tells the sensor what to aim for — it doesn't guarantee the sensor delivers exactly 800 counts per inch of physical movement. Manufacturing tolerance on the sensor itself, firmware-level rounding to the nearest supported step, and in some cases software-side interpolation can all introduce a gap between the number you set and what the hardware actually outputs. This matters for sensitivity conversion specifically: the yaw-based math this site uses assumes your DPI input is accurate, so a mismatch here quietly throws off every converted number downstream. Measure your actual DPI with the <a href="/dpi-analyzer/">DPI analyzer</a> rather than assuming the software panel is exact.</p>

      <h2>400 vs 800 vs 1600: The Actual Differences</h2>
      <p>Within the 400–1600 DPI range most competitive players use, the practical difference between steps is mostly about how finely your in-game sensitivity slider lets you dial in a given cm/360, not raw tracking accuracy — modern optical sensors track accurately across this entire range. Going with a round, commonly-used DPI (400, 800, or 1600) mostly matters because it makes your settings easier to communicate, compare against pro settings, and reproduce on a new mouse — not because one of these numbers is inherently more "correct" than another.</p>

      <h2>Does Higher DPI Reduce Input Lag?</h2>
      <p>There's a real but small effect here that gets wildly overstated in marketing: a higher DPI means the sensor reports position updates at finer physical granularity, which can very slightly reduce the perceptible "steppiness" of very slow, precise movements. The actual latency difference this produces is on the order of a fraction of a millisecond to low single-digit microseconds at the sensor level for any modern gaming mouse sensor — not the multi-millisecond figures some marketing and older guides claim. Don't choose a higher DPI expecting a noticeable competitive input-lag advantage; choose it because it makes your preferred cm/360 land on a sensitivity number you're comfortable dialing in.</p>

      <h2>Sensor Smoothing at High DPI</h2>
      <p>Pushing DPI very high (above roughly 3200–6400 depending on the sensor) can introduce smoothing or filtering on some sensors, where the firmware averages out rapid position changes to reduce reported noise — the opposite of the precision boost people expect from "more DPI." If you're running unusually high DPI and your aim feels slightly delayed or floaty compared to a lower setting at the same converted cm/360, this is worth ruling out before blaming your sensitivity numbers.</p>

      <h2>What Pros Use and Why It's Mostly Habit</h2>
      <p>The overwhelming majority of pro players across tactical and hero shooters sit at 400 or 800 DPI — see <a href="/pros/">pro player settings</a> for real examples. This isn't because those specific numbers are technically superior; it's because they're round, well-documented, and easy to recreate exactly on a new mouse or at a LAN. There's no measured competitive advantage to an unusual DPI value like 923 over a round 800 — if your mouse's real, tested DPI doesn't land on a round number, converting your sensitivity to compensate is more useful than chasing a specific DPI figure.</p>

      <h2>Frequently Asked Questions</h2>
    `,
    faqs: [
      { q: 'How do I check my mouse\'s real DPI?', a: "Use a DPI analyzer tool that measures actual counts-per-inch from physical mouse movement, rather than trusting the number shown in your mouse's software panel." },
      { q: 'Does it really matter if my mouse is a few percent off its advertised DPI?', a: "For casual play, not much. For precise sensitivity conversion between games, a few percent of DPI error compounds into a real cm/360 mismatch — worth checking if your converted sensitivity never quite feels exactly right." },
      { q: 'Is 1600 DPI better than 800 DPI for input lag?', a: "The real difference is a fraction of a millisecond at most on modern sensors — far smaller than commonly claimed. Pick a DPI based on what makes your target cm/360 easy to set precisely, not for a latency advantage that isn't practically noticeable." },
    ],
  },
  {
    slug: 'does-stretched-resolution-change-your-sensitivity',
    title: 'Does Stretched Resolution Change Your Sensitivity?',
    excerpt: "Playing at a stretched 4:3 resolution shifts your effective sensitivity even if the in-game slider doesn't move. Here's exactly what changes and how to compensate.",
    date: 'August 19, 2026',
    readTime: '6 min read',
    category: 'Guide',
    image: '/blog/does-stretched-resolution-change-your-sensitivity.webp',
    summary: "Stretched resolution changes your field of view without changing your sensitivity slider — which means the same mouse movement covers a different amount of the game world than it did at native resolution. Use the stretched resolution simulator to see the FOV shift before you decide whether to compensate.",
    content: `<h2>Stretching Changes FOV, Not Yaw</h2>
      <p>Running a game at a stretched resolution — a lower native resolution (like 4:3) forced to fill a widescreen monitor — doesn't change your sensitivity slider or your yaw constant. What it changes is your effective horizontal field of view: objects appear wider and closer to center, and less of the world is visible at the edges. That's a genuinely different visual experience from your sensitivity setting, even though the two get conflated constantly in FPS communities.</p>

      <h2>Why It Feels Faster Even Though the Math Didn't Change</h2>
      <p>Because a narrower effective FOV shows less world per degree of camera rotation, the same physical mouse movement produces what feels like a faster, more zoomed-in sweep across the visible scene — even though your actual angular rotation speed (the thing sensitivity conversion controls) hasn't changed at all. This is the same underlying effect that makes FOV mismatches break "correctly converted" sensitivity between two different games, just triggered by a resolution setting inside one game instead of a cross-game switch. See our <a href="/monitor-simulator/">monitor and stretched resolution simulator</a> to see the visual difference directly rather than guessing at it.</p>

      <h2>Does This Mean You Should Compensate?</h2>
      <p>That's a personal preference call, not a math requirement. Some competitive players who stretch resolution specifically want the visual effect — bigger, more central hitboxes — and don't compensate sensitivity at all, since their target acquisition muscle memory adapts to the new visual scale over time. Others prefer to keep the visual feel of turning consistent with their native-resolution habits and adjust sensitivity slightly to compensate for the narrower effective FOV. Neither approach is objectively correct; what matters is picking one and sticking with it rather than switching back and forth, which is what actually breaks muscle memory.</p>

      <h2>How This Interacts With Cross-Game Sensitivity Conversion</h2>
      <p>If you use a converted sensitivity from another game and also play at a stretched resolution, you're stacking two variables that both affect perceived aim speed — the yaw-based conversion, and the FOV shift from stretching. If a converted sensitivity feels off specifically in a title where you stretch resolution but not in others, that's very likely the FOV effect described above, not an error in the conversion itself. Isolate it by briefly testing at native resolution before concluding the sensitivity math is wrong.</p>

      <h2>Frequently Asked Questions</h2>
    `,
    faqs: [
      { q: 'Does stretched resolution actually change my sensitivity number?', a: "No — your sensitivity slider and yaw constant stay exactly the same. What changes is your effective field of view, which makes the same mouse movement feel like it covers more of the screen." },
      { q: 'Should I lower my sensitivity when I switch to stretched resolution?', a: "Only if you want to compensate for the narrower FOV making things feel faster. It's a personal preference, not something the underlying sensitivity math requires you to correct." },
      { q: 'Why does my converted sensitivity feel wrong only on games where I use stretched res?', a: "That's very likely the FOV shift from stretching, not a conversion error — test the same converted sensitivity at native resolution to isolate the variable." },
    ],
  },
];
