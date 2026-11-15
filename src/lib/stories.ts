export interface StoryPage {
    id: string;
    image: string;
    title: string;
    description?: string;
    cta?: { label: string; href: string };
}

export interface WebStory {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishDate: string;
    category: string;
    isCustomAmp?: boolean;
    pages: StoryPage[];
}

export const stories: WebStory[] = [
    // ───────────────────────────────────────────────────
    // 2027 Edition Google Web Stories (AMP Optimized)
    // ───────────────────────────────────────────────────
    {
        slug: 'gta-6-2027-pro-aim-and-controller-settings-guide',
        title: 'GTA 6 (2027 Meta): 5 Pro Aim & Controller Settings You Must Lock Day 1',
        excerpt: "Don't let Rockstar's heavy RAGE 9 default deadzones ruin your first gunfight in Vice City.",
        coverImage: '/web-stories/assets/gta-6-2027-pro-aim-and-controller-settings-guide-poster.webp',
        publishDate: 'October 19, 2026',
        category: 'GTA 6',
        isCustomAmp: true,
        pages: [
            {
                id: '1',
                image: '/web-stories/assets/gta-6-2027-pro-aim-and-controller-settings-guide-slide-1.webp',
                title: 'GTA 6 (2027 META): 5 PRO AIM SETTINGS',
                description: "Don't let Rockstar's heavy RAGE 9 default deadzones ruin your first gunfight in Vice City.",
            },
            {
                id: '2',
                image: '/web-stories/assets/gta-6-2027-pro-aim-and-controller-settings-guide-slide-2.webp',
                title: '1. FREE-AIM ASSISTED + 0.02 DEADZONE',
                description: 'Lower your Inner Deadzone to 0.02 on TMR/Hall-Effect sticks and set Look Acceleration to 100%.',
            },
            {
                id: '3',
                image: '/web-stories/assets/gta-6-2027-pro-aim-and-controller-settings-guide-slide-3.webp',
                title: '2. FIRST-PERSON FOV = +18% STRAFE SPEED',
                description: 'Switching to First-Person mode during sniper duels boosts ADAD strafe speed by 18%.',
            },
            {
                id: '4',
                image: '/web-stories/assets/gta-6-2027-pro-aim-and-controller-settings-guide-slide-4.webp',
                title: '3. LOCK 0% MDM ON 8X/12X SNIPER SCOPES',
                description: 'Convert your CS2, Valorant, or Warzone cm/360° directly into GTA 6.',
                cta: { label: 'Open Free GTA 6 Aim Converter', href: '/' },
            },
        ],
    },
    {
        slug: 'valorant-to-cs2-2027-sensitivity-conversion-31818-formula',
        title: 'Valorant to CS2 (2027 Guide): Why You Must Multiply Your Sens by 3.1818',
        excerpt: '90% of players copy 0.35 from Valorant straight into CS2—and wonder why they whiff every easy micro-flick.',
        coverImage: '/web-stories/assets/valorant-to-cs2-2027-sensitivity-conversion-31818-formula-poster.webp',
        publishDate: 'October 19, 2026',
        category: 'Valorant & CS2',
        isCustomAmp: true,
        pages: [
            {
                id: '1',
                image: '/web-stories/assets/valorant-to-cs2-2027-sensitivity-conversion-31818-formula-slide-1.webp',
                title: 'VALORANT TO CS2 (2027): THE 3.1818 FORMULA',
                description: 'Why copying raw numbers ruins your CS2 muscle memory instantly.',
            },
            {
                id: '2',
                image: '/web-stories/assets/valorant-to-cs2-2027-sensitivity-conversion-31818-formula-slide-2.webp',
                title: 'THE MATH: CS2 SENS = VALORANT × 3.1818',
                description: 'CS2 yaw is 0.022. Valorant yaw is 0.07. 0.07 / 0.022 = 3.181818.',
            },
            {
                id: '3',
                image: '/web-stories/assets/valorant-to-cs2-2027-sensitivity-conversion-31818-formula-slide-3.webp',
                title: '103 FOV VS 90 FOV FOCAL LENGTH DISPARITY',
                description: 'Maintain identical crosshair velocity on 4:3 stretched or 16:9 native.',
            },
            {
                id: '4',
                image: '/web-stories/assets/valorant-to-cs2-2027-sensitivity-conversion-31818-formula-slide-4.webp',
                title: 'CONVERT YOUR EXACT CM/360° IN 3 SECONDS',
                description: 'Get sub-pixel accuracy between Valorant and Counter-Strike 2.',
                cta: { label: 'Open CS2 Sens Converter', href: '/convert/valorant-to-cs2/' },
            },
        ],
    },
    {
        slug: '800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark',
        title: '800 DPI vs 1600 DPI in 2027: Why Every Pro Switched (+10cm Ruler Test)',
        excerpt: 'Still using 400 or 800 DPI on a 2000Hz–8000Hz wireless mouse? You are leaving 0.8ms of reaction speed on the table.',
        coverImage: '/web-stories/assets/800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark-poster.webp',
        publishDate: 'October 19, 2026',
        category: 'Hardware',
        isCustomAmp: true,
        pages: [
            {
                id: '1',
                image: '/web-stories/assets/800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark-slide-1.webp',
                title: '800 DPI VS 1600 DPI (2027 BENCHMARK)',
                description: 'Why 1600 DPI cuts sensor initial motion latency from 1.6ms down to 0.8ms.',
            },
            {
                id: '2',
                image: '/web-stories/assets/800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark-slide-2.webp',
                title: 'HIGHER COUNTS PER MILLIMETER',
                description: 'At 1600 DPI, modern PAW3950/HERO 2 sensors send telemetry twice as frequently.',
            },
            {
                id: '3',
                image: '/web-stories/assets/800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark-slide-3.webp',
                title: 'AVOID JITTER: STOP AT 1600 OR 3200 DPI',
                description: 'Above 3200 DPI, sensor smoothing algorithms introduce frame delay.',
            },
            {
                id: '4',
                image: '/web-stories/assets/800-dpi-vs-1600-dpi-2027-sensor-latency-benchmark-slide-4.webp',
                title: 'CALIBRATE YOUR TRUE SENSOR DPI',
                description: 'Measure your sensor deviation with our 10cm ruler analyzer.',
                cta: { label: 'Analyze Your DPI Now', href: '/dpi-analyzer/' },
            },
        ],
    },
    {
        slug: 'donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings',
        title: 'donk (800 eDPI) vs Demon1 (160 eDPI): Which 2027 Pro Aim Style Fits You?',
        excerpt: 'Two world champions, two radically different biomechanics. Which sensitivity corridor matches your hand and desk setup in 2027?',
        coverImage: '/web-stories/assets/donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings-poster.webp',
        publishDate: 'October 19, 2026',
        category: 'Pro Settings',
        isCustomAmp: true,
        pages: [
            {
                id: '1',
                image: '/web-stories/assets/donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings-slide-1.webp',
                title: 'DONK (800 eDPI) VS DEMON1 (160 eDPI)',
                description: 'The ultimate comparison between wrist aggressive rifling and ultra-low arm stability.',
            },
            {
                id: '2',
                image: '/web-stories/assets/donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings-slide-2.webp',
                title: 'DONK: 800 DPI × 1.0 SENS = 800 eDPI',
                description: 'Sub-tick pre-aiming with instant 180° turns on glass or fast hybrid pads.',
            },
            {
                id: '3',
                image: '/web-stories/assets/donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings-slide-3.webp',
                title: 'DEMON1: 1600 DPI × 0.1 SENS = 160 eDPI',
                description: 'Full arm swipe aiming with zero pixel micro-jitter for pure one-taps.',
            },
            {
                id: '4',
                image: '/web-stories/assets/donk-800-edpi-vs-demon1-160-edpi-2027-pro-settings-slide-4.webp',
                title: 'FIND YOUR IDEAL PRO SENSITIVITY CORRIDOR',
                description: 'Compare pro settings across 400+ esports champions.',
                cta: { label: 'Explore Pro Database', href: '/pros/' },
            },
        ],
    },
    {
        slug: '2027-esports-hardware-meta-rapid-trigger-and-480hz-oled',
        title: '2027 Esports Hardware Meta: 0.1mm Rapid Trigger, 8000Hz Mice & 480Hz OLED',
        excerpt: 'Why upgrading your keyboard, monitor, and mousepad in 2027 requires recalibrating your in-game sensitivity.',
        coverImage: '/web-stories/assets/2027-esports-hardware-meta-rapid-trigger-and-480hz-oled-poster.webp',
        publishDate: 'October 19, 2026',
        category: 'Gear',
        isCustomAmp: true,
        pages: [
            {
                id: '1',
                image: '/web-stories/assets/2027-esports-hardware-meta-rapid-trigger-and-480hz-oled-slide-1.webp',
                title: '2027 ESPORTS HARDWARE REVOLUTION',
                description: 'The holy trinity of sub-1ms competitive gaming: Rapid Trigger, 8KHz, and 480Hz.',
            },
            {
                id: '2',
                image: '/web-stories/assets/2027-esports-hardware-meta-rapid-trigger-and-480hz-oled-slide-2.webp',
                title: '0.1MM RAPID TRIGGER & SNAP TAP',
                description: 'Stop and shoot instantly with magnetic Hall-Effect switches without key reset travel.',
            },
            {
                id: '3',
                image: '/web-stories/assets/2027-esports-hardware-meta-rapid-trigger-and-480hz-oled-slide-3.webp',
                title: '480HZ OLED ZERO MOTION BLUR',
                description: 'Near 0.03ms pixel response times make targets crystal clear during high-speed tracking.',
            },
            {
                id: '4',
                image: '/web-stories/assets/2027-esports-hardware-meta-rapid-trigger-and-480hz-oled-slide-4.webp',
                title: 'FIND YOUR TRUE PSA SENSITIVITY',
                description: 'Recalibrate your muscle memory with our 7-step PSA method calculator.',
                cta: { label: 'Calculate PSA Method', href: '/psa-calculator/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 1: What is eDPI?
    // ───────────────────────────────────────────────────
    {
        slug: 'what-is-edpi-quick-guide',
        title: 'What is eDPI? The Universal Sensitivity Number',
        excerpt: 'eDPI = DPI × In-game sensitivity. Learn why every pro player uses this formula to compare settings.',
        coverImage: '/blog/what-is-edpi.webp',
        publishDate: 'April 26, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/blog/what-is-edpi.webp',
                title: 'What is eDPI?',
                description: 'The one number that unifies all gaming sensitivity settings.',
            },
            {
                id: '1',
                image: '/blog/dpi-vs-sensitivity.webp',
                title: 'The Formula: DPI × Sensitivity',
                description: 'If you play at 800 DPI and 0.35 sens in Valorant, your eDPI is 280.',
            },
            {
                id: '2',
                image: '/web-stories/dpi-edpi-explained-visually-2.webp',
                title: 'Why It Matters',
                description: 'Two players with different DPI can share the exact same feel by matching eDPI.',
            },
            {
                id: '3',
                image: '/blog/perfect-sensitivity.webp',
                title: 'Pro Median eDPI',
                description: 'VCT pros average ~270 eDPI. CS2 pros average ~800 eDPI.',
            },
            {
                id: '4',
                image: '/web-stories/dpi-edpi-explained-visually-4.webp',
                title: 'Find Your Perfect eDPI',
                description: 'Use the DCPROSENS calculator to find the best eDPI for your hand size and grip.',
                cta: { label: 'Open Calculator →', href: '/dpi/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 2: 5 Pro Sensitivity Tips
    // ───────────────────────────────────────────────────
    {
        slug: '5-pro-sensitivity-tips-fps',
        title: '5 Sensitivity Tips Used by Pro FPS Players',
        excerpt: 'From counter-strafing to muscle memory — the 5 habits that separate pro sensitivity from amateur.',
        coverImage: '/web-stories/legacy-holographic-viewer.webp',
        publishDate: 'April 25, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/legacy-holographic-viewer.webp',
                title: '5 Pro Sensitivity Secrets',
                description: 'Tips that pros know but never explain.',
            },
            {
                id: '1',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-1.webp',
                title: '#1: Disable Mouse Acceleration',
                description: 'Windows Enhanced Pointer Precision must be OFF. It makes your sensitivity inconsistent.',
            },
            {
                id: '2',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-3.webp',
                title: '#2: Set Polling Rate to 1000Hz+',
                description: 'At 1000Hz your mouse reports position 1000× per second. Essential for precision.',
            },
            {
                id: '3',
                image: '/web-stories/train-your-aim-like-a-pro-1.webp',
                title: '#3: Pick One Aiming Style',
                description: 'Wrist or arm aiming — not both. Mixing styles destroys muscle memory.',
            },
            {
                id: '4',
                image: '/web-stories/train-your-aim-like-a-pro-2.webp',
                title: '#4: Warm Up Before Ranked',
                description: '15 min of Aim Lab before queue = 20-30% better early match performance.',
            },
            {
                id: '5',
                image: '/blog/perfect-sensitivity.webp',
                title: '#5: Never Change Sensitivity Mid-Session',
                description: 'Lock your sensitivity for 30 days minimum. Consistency builds elite muscle memory.',
                cta: { label: 'Convert Your Sens →', href: '/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 3: Valorant vs CS2 Sensitivity
    // ───────────────────────────────────────────────────
    {
        slug: 'valorant-vs-cs2-sensitivity-differences',
        title: 'Valorant vs CS2: Sensitivity Explained',
        excerpt: 'These two games use completely different scales. Here is how to convert your settings perfectly.',
        coverImage: '/web-stories/legacy-cybernetic-grip.webp',
        publishDate: 'April 24, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/legacy-cybernetic-grip.webp',
                title: 'Valorant vs CS2 Sensitivity',
                description: 'Why you cannot just copy-paste your settings.',
            },
            {
                id: '1',
                image: '/web-stories/dpi-edpi-explained-visually-1.webp',
                title: 'Valorant Uses 0.07 Yaw',
                description: 'To convert CS2 → Valorant, multiply by 3.18. A CS2 sens of 1.0 = ~0.314 in Valorant.',
            },
            {
                id: '2',
                image: '/web-stories/perfect-crosshair-placement-guide-2.webp',
                title: 'CS2 Has Deterministic Spray',
                description: 'Unlike Valorant, CS2 recoil patterns are fixed. Low sens helps you control the AK-47 spray.',
            },
            {
                id: '3',
                image: '/web-stories/train-your-aim-like-a-pro-3.webp',
                title: 'Counter-Strafing Changes Feel',
                description: 'CS2 forces you to stop before shooting. Slightly lower sens gives you more control.',
            },
            {
                id: '4',
                image: '/web-stories/legacy-gamer-monitor.webp',
                title: 'Valorant = Ability + Aim',
                description: 'Abilities mean faster camera pivots. Pro Valorant eDPI averages ~270 vs ~800 in CS2.',
                cta: { label: 'Convert Now →', href: '/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 4: Top 5 Gaming Mice 2026
    // ───────────────────────────────────────────────────
    {
        slug: 'top-5-gaming-mice-2026',
        title: 'Top 5 Gaming Mice of 2026 for FPS',
        excerpt: 'From ultralight to wireless dominance — the 5 mice pros rely on to win tournaments in 2026.',
        coverImage: '/web-stories/legacy-mice-infographic.webp',
        publishDate: 'April 23, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/legacy-mice-infographic.webp',
                title: 'Top 5 Mice 2026',
                description: 'Used at VCT, BLAST, and ALGS. Here are the winners.',
            },
            {
                id: '1',
                image: '/web-stories/wireless-mouse-setup-tips-cover.webp',
                title: '#1: G Pro X Superlight 2',
                description: '60g | HERO 25K sensor | 95h battery. The most-used mouse at VCT 2026.',
            },
            {
                id: '2',
                image: '/web-stories/mouse-skates-glide-guide-cover.webp',
                title: '#2: Lamzu Atlantis V2 Pro',
                description: '47g wireless | PAW3395 | Used by rising Valorant talent worldwide.',
            },
            {
                id: '3',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-cover.webp',
                title: '#3: Razer Viper V3 HyperSpeed',
                description: '82g | HyperSpeed 2.4GHz | Ergonomic right-hand design perfected.',
            },
            {
                id: '4',
                image: '/web-stories/wireless-mouse-setup-tips-4.webp',
                title: '#4: Zowie EC2-CW',
                description: '77g wireless | Plug-and-play | No software required. The no-nonsense pick.',
            },
            {
                id: '5',
                image: '/web-stories/mouse-skates-glide-guide-2.webp',
                title: '#5: Pulsar X2H Wireless',
                description: '55g | Focus Pro sensor | Symmetrical shape for claw-grip players.',
                cta: { label: 'See All Mice →', href: '/blog/best-gaming-mouse-for-fps-2026/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 5: How to Rank Up Fast
    // ───────────────────────────────────────────────────
    {
        slug: 'how-to-rank-up-fast-fps-2026',
        title: 'How to Rank Up Fast in Any FPS Game',
        excerpt: '5 habits supported by pro coaching data that accelerate your rank climb in Valorant, CS2, and Apex.',
        coverImage: '/web-stories/track-your-ranked-progress-cover.webp',
        publishDate: 'April 22, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/track-your-ranked-progress-cover.webp',
                title: 'Rank Up Fast in FPS',
                description: '5 habits from pro coaches that actually work.',
            },
            {
                id: '1',
                image: '/web-stories/train-your-aim-like-a-pro-cover.webp',
                title: 'Habit 1: Warm Up Every Day',
                description: 'Players who warm up before ranked win 18% more rounds in their first 3 games.',
            },
            {
                id: '2',
                image: '/web-stories/perfect-crosshair-placement-guide-1.webp',
                title: 'Habit 2: Crosshair at Head Height',
                description: 'Every angle you pre-aim at head height is a kill you get without reacting.',
            },
            {
                id: '3',
                image: '/web-stories/legacy-cryo-chamber.webp',
                title: 'Habit 3: Stop at 2 Losses',
                description: 'Two consecutive losses = cognitive tilt. Stop the session. Return fresh tomorrow.',
            },
            {
                id: '4',
                image: '/web-stories/track-your-ranked-progress-1.webp',
                title: 'Habit 4: Review Your Deaths',
                description: 'Watch your kill cam for every death. Note the angle. Do not repeat it next round.',
            },
            {
                id: '5',
                image: '/blog/perfect-sensitivity.webp',
                title: 'Habit 5: Lock Your Sensitivity',
                description: 'Changing settings is the #1 reason players plateau. Lock in once. Commit for 30 days.',
                cta: { label: 'Find Your Sens →', href: '/dpi/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 6: DPI & eDPI Explained Visually
    // ───────────────────────────────────────────────────
    {
        slug: 'dpi-edpi-explained-visually',
        title: 'DPI & eDPI Explained Visually',
        excerpt: 'A visual breakdown of how DPI, in-game sensitivity, and eDPI combine into the one number that actually matters for your aim.',
        coverImage: '/web-stories/dpi-edpi-explained-visually-cover.webp',
        publishDate: 'August 11, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/dpi-edpi-explained-visually-cover.webp',
                title: 'DPI & eDPI, Visually',
                description: 'The science behind every sensitivity setting — no math degree required.',
            },
            {
                id: '1',
                image: '/web-stories/dpi-edpi-explained-visually-1.webp',
                title: 'DPI = Dots Per Inch',
                description: 'Your mouse sensor reports how many counts it sends per inch moved. Higher DPI is not more "skill", just more counts.',
            },
            {
                id: '2',
                image: '/web-stories/dpi-edpi-explained-visually-2.webp',
                title: 'Sensitivity Multiplies DPI',
                description: 'In-game sensitivity scales your DPI up or down. Change either one and your aim feel changes completely.',
            },
            {
                id: '3',
                image: '/web-stories/dpi-edpi-explained-visually-3.webp',
                title: 'eDPI Is the Real Number',
                description: 'eDPI = DPI × sensitivity. It is the only value you can compare fairly across different games and mice.',
            },
            {
                id: '4',
                image: '/web-stories/dpi-edpi-explained-visually-4.webp',
                title: 'Calculate Your eDPI Free',
                description: 'Plug in your DPI and sensitivity to see exactly where you land vs. pro averages.',
                cta: { label: 'Open the Calculator →', href: '/dpi/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 7: How a Gaming Mouse Sensor Works
    // ───────────────────────────────────────────────────
    {
        slug: 'how-a-gaming-mouse-sensor-works',
        title: 'How a Gaming Mouse Sensor Actually Works',
        excerpt: 'From optical tracking to polling rate — what happens inside your mouse every time you move it.',
        coverImage: '/web-stories/how-a-gaming-mouse-sensor-works-cover.webp',
        publishDate: 'August 10, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-cover.webp',
                title: 'Inside Your Mouse Sensor',
                description: 'What actually happens between your hand and your crosshair.',
            },
            {
                id: '1',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-1.webp',
                title: 'Optical Tracking 101',
                description: 'A tiny camera photographs your mousepad thousands of times per second to detect movement.',
            },
            {
                id: '2',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-2.webp',
                title: 'CPI vs. DPI',
                description: 'Technically it is CPI (counts per inch) — but the industry calls it DPI. Same idea, different name.',
            },
            {
                id: '3',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-3.webp',
                title: 'Polling Rate Matters Too',
                description: '1000Hz means your sensor reports its position 1000 times per second — less input lag, smoother tracking.',
            },
            {
                id: '4',
                image: '/web-stories/how-a-gaming-mouse-sensor-works-4.webp',
                title: 'Find the Right Mouse for You',
                description: 'Compare sensors, weight, and shape across every mouse in our database.',
                cta: { label: 'Browse Mouse Database →', href: '/mouse-database/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 8: Mouse Skates & Glide Guide
    // ───────────────────────────────────────────────────
    {
        slug: 'mouse-skates-glide-guide',
        title: 'Mouse Skates & Glide: The Complete Guide',
        excerpt: 'Why the little plastic feet under your mouse can matter as much as the sensor itself.',
        coverImage: '/web-stories/mouse-skates-glide-guide-cover.webp',
        publishDate: 'August 9, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/mouse-skates-glide-guide-cover.webp',
                title: 'Mouse Skates, Explained',
                description: 'The unsung hero of every fast flick shot.',
            },
            {
                id: '1',
                image: '/web-stories/mouse-skates-glide-guide-1.webp',
                title: 'What Are Mouse Skates?',
                description: 'The small pads on the bottom of your mouse that control how smoothly it glides across your pad.',
            },
            {
                id: '2',
                image: '/web-stories/mouse-skates-glide-guide-2.webp',
                title: 'PTFE Is the Gold Standard',
                description: 'Pure PTFE (Teflon) skates glide with the lowest friction — that is why almost every pro mouse ships with them.',
            },
            {
                id: '3',
                image: '/web-stories/mouse-skates-glide-guide-3.webp',
                title: 'Worn Skates Ruin Your Aim',
                description: 'Scratched or worn skates create drag and inconsistent glide, throwing off your flicks without you noticing.',
            },
            {
                id: '4',
                image: '/web-stories/mouse-skates-glide-guide-4.webp',
                title: 'Match Your Skates to Your Pad',
                description: 'Cloth and hard pads need different glide profiles. Find your ideal combo in our mousepad guide.',
                cta: { label: 'Compare Mousepads →', href: '/mousepad-chart/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 9: Wireless Mouse Setup Tips
    // ───────────────────────────────────────────────────
    {
        slug: 'wireless-mouse-setup-tips',
        title: 'Wireless Mouse Setup: Do It Right',
        excerpt: 'Cut the cord without cutting performance — the setup tricks that keep wireless mice competitive-grade.',
        coverImage: '/web-stories/wireless-mouse-setup-tips-cover.webp',
        publishDate: 'August 8, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/wireless-mouse-setup-tips-cover.webp',
                title: 'Wireless Mouse Setup Tips',
                description: 'Zero-lag wireless is real — if you set it up correctly.',
            },
            {
                id: '1',
                image: '/web-stories/wireless-mouse-setup-tips-1.webp',
                title: 'Use the 2.4GHz Dongle, Not Bluetooth',
                description: 'Bluetooth adds latency. The included USB receiver is built for competitive response times.',
            },
            {
                id: '2',
                image: '/web-stories/wireless-mouse-setup-tips-2.webp',
                title: 'Keep the Receiver Close',
                description: 'Use an extension cable to place the dongle within 20cm of your mouse — it reduces signal interference.',
            },
            {
                id: '3',
                image: '/web-stories/wireless-mouse-setup-tips-3.webp',
                title: 'Charge, Do Not Drain',
                description: 'Play on a charging cable once battery drops below 20% — some sensors throttle polling rate on low battery.',
            },
            {
                id: '4',
                image: '/web-stories/wireless-mouse-setup-tips-4.webp',
                title: 'Find Your Perfect Wireless Mouse',
                description: 'Weight, sensor, and battery life compared side by side.',
                cta: { label: 'Find Your Mouse →', href: '/mouse-finder/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 10: Perfect Crosshair Placement
    // ───────────────────────────────────────────────────
    {
        slug: 'perfect-crosshair-placement-guide',
        title: 'Perfect Crosshair Placement',
        excerpt: 'The single habit that separates players who react to fights from players who win them before they start.',
        coverImage: '/web-stories/perfect-crosshair-placement-guide-cover.webp',
        publishDate: 'August 7, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/perfect-crosshair-placement-guide-cover.webp',
                title: 'Perfect Crosshair Placement',
                description: 'Pre-aim like a pro — before you even see the enemy.',
            },
            {
                id: '1',
                image: '/web-stories/perfect-crosshair-placement-guide-1.webp',
                title: 'Aim at Head Height',
                description: 'Keep your crosshair where an enemy head would be, not at your feet or the floor.',
            },
            {
                id: '2',
                image: '/web-stories/perfect-crosshair-placement-guide-2.webp',
                title: 'Pre-Aim Common Angles',
                description: 'Every corner and doorway has a predictable angle. Pre-aim it before you peek.',
            },
            {
                id: '3',
                image: '/web-stories/perfect-crosshair-placement-guide-3.webp',
                title: 'Coaches Drill This Daily',
                description: 'Pro coaches rate crosshair placement as the #1 predictor of consistent aim, above raw mechanical skill.',
            },
            {
                id: '4',
                image: '/web-stories/perfect-crosshair-placement-guide-4.webp',
                title: 'Build Your Ideal Crosshair',
                description: 'Generate a crosshair tuned for visibility and precision in seconds.',
                cta: { label: 'Open Crosshair Generator →', href: '/crosshair/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 11: Train Your Aim Like a Pro
    // ───────────────────────────────────────────────────
    {
        slug: 'train-your-aim-like-a-pro',
        title: 'Train Your Aim Like a Pro',
        excerpt: 'The neuroscience of muscle memory — and the drills that actually rewire your aim.',
        coverImage: '/web-stories/train-your-aim-like-a-pro-cover.webp',
        publishDate: 'August 6, 2026',
        category: 'Training',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/train-your-aim-like-a-pro-cover.webp',
                title: 'Train Your Aim Like a Pro',
                description: 'What separates "natural talent" from trained precision.',
            },
            {
                id: '1',
                image: '/web-stories/train-your-aim-like-a-pro-1.webp',
                title: 'Aim Is a Neural Pathway',
                description: 'Every repeated flick strengthens the same neuromuscular pathway. Consistency beats intensity.',
            },
            {
                id: '2',
                image: '/web-stories/train-your-aim-like-a-pro-2.webp',
                title: 'Warm Up Before You Compete',
                description: 'Cold aim underperforms. 10-15 minutes of drills primes your reaction time before ranked.',
            },
            {
                id: '3',
                image: '/web-stories/train-your-aim-like-a-pro-3.webp',
                title: 'Stress Changes Your Aim',
                description: 'Under pressure, your mechanics tighten up. Practicing under simulated stress builds real match composure.',
            },
            {
                id: '4',
                image: '/web-stories/train-your-aim-like-a-pro-4.webp',
                title: 'Start Training Free',
                description: 'Micro-flicks, tracking, and reflex drills — built for competitive FPS players.',
                cta: { label: 'Try Aim Lab →', href: '/aim-lab/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 12: Build the Ultimate Gaming Desk
    // ───────────────────────────────────────────────────
    {
        slug: 'build-the-ultimate-gaming-desk',
        title: 'Build the Ultimate Gaming Desk',
        excerpt: 'Desk space, mousepad size, and keyboard feel — the physical setup choices that quietly affect your aim.',
        coverImage: '/web-stories/build-the-ultimate-gaming-desk-cover.webp',
        publishDate: 'August 5, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/build-the-ultimate-gaming-desk-cover.webp',
                title: 'Build the Ultimate Gaming Desk',
                description: 'Your setup affects your aim more than you think.',
            },
            {
                id: '1',
                image: '/web-stories/build-the-ultimate-gaming-desk-1.webp',
                title: 'Give Your Mouse Room to Breathe',
                description: 'Low sensitivity players need real desk space — cramped setups force compromises on sens.',
            },
            {
                id: '2',
                image: '/web-stories/build-the-ultimate-gaming-desk-2.webp',
                title: 'Vertical Monitor Placement',
                description: 'Eye level with the top third of your screen reduces neck strain during long sessions.',
            },
            {
                id: '3',
                image: '/web-stories/build-the-ultimate-gaming-desk-3.webp',
                title: 'Mousepad Size Sets Your Ceiling',
                description: 'A pad too small caps how low you can set your sensitivity. Bigger pads unlock lower, more precise sens.',
            },
            {
                id: '4',
                image: '/web-stories/build-the-ultimate-gaming-desk-4.webp',
                title: 'Calculate Your Ideal Desk Setup',
                description: 'Find the perfect pad size and monitor distance for your sensitivity.',
                cta: { label: 'Open Desk Calculator →', href: '/desk-space-calculator/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 13: Inside the Esports Arena
    // ───────────────────────────────────────────────────
    {
        slug: 'inside-the-esports-arena',
        title: 'Inside the Esports Arena',
        excerpt: 'What it actually takes to compete on the biggest stages in Valorant, CS2, and Apex Legends.',
        coverImage: '/web-stories/inside-the-esports-arena-cover.webp',
        publishDate: 'August 4, 2026',
        category: 'Esports',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/inside-the-esports-arena-cover.webp',
                title: 'Inside the Esports Arena',
                description: 'From bedroom queue to the main stage.',
            },
            {
                id: '1',
                image: '/web-stories/inside-the-esports-arena-1.webp',
                title: 'The Stage Is Silent',
                description: 'Pro players compete in soundproof booths — no crowd noise, just the game and their teammates voices.',
            },
            {
                id: '2',
                image: '/web-stories/inside-the-esports-arena-2.webp',
                title: 'Every Setting Is Identical',
                description: 'Tournament PCs are locked to identical specs. The only variable left is skill and sensitivity.',
            },
            {
                id: '3',
                image: '/web-stories/inside-the-esports-arena-3.webp',
                title: 'One Trophy, Thousands of Reps',
                description: 'Every podium moment represents thousands of hours of repetitive, deliberate practice.',
            },
            {
                id: '4',
                image: '/web-stories/inside-the-esports-arena-4.webp',
                title: 'Meet the Pros Who Made It',
                description: 'Explore real settings from top Valorant, CS2, and Apex pros.',
                cta: { label: 'Browse Pro Settings →', href: '/pros/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 14: Track Your Ranked Progress
    // ───────────────────────────────────────────────────
    {
        slug: 'track-your-ranked-progress',
        title: 'Track Your Ranked Progress',
        excerpt: 'Why the best players treat their stats like data — and how to start doing the same.',
        coverImage: '/web-stories/track-your-ranked-progress-cover.webp',
        publishDate: 'August 3, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/track-your-ranked-progress-cover.webp',
                title: 'Track Your Ranked Progress',
                description: 'What gets measured, gets improved.',
            },
            {
                id: '1',
                image: '/web-stories/track-your-ranked-progress-1.webp',
                title: 'Stats Do Not Lie',
                description: 'Win rate feels random. Headshot %, reaction time, and flick accuracy tell you exactly what to fix.',
            },
            {
                id: '2',
                image: '/web-stories/track-your-ranked-progress-2.webp',
                title: 'Small Trends Matter',
                description: 'A slow decline in reaction time over weeks often means it is time to adjust sensitivity, not skill.',
            },
            {
                id: '3',
                image: '/web-stories/track-your-ranked-progress-3.webp',
                title: 'Compare, Do Not Just Track',
                description: 'Your numbers only mean something next to a benchmark — pro averages, or your own past self.',
            },
            {
                id: '4',
                image: '/web-stories/track-your-ranked-progress-4.webp',
                title: 'See Where You Stand',
                description: 'Compare your settings and stats against real pro player data.',
                cta: { label: 'Compare Your Settings →', href: '/pros/compare/' },
            },
        ],
    },
    // ───────────────────────────────────────────────────
    // Story 15: Improve Your Game Sense Fast
    // ───────────────────────────────────────────────────
    {
        slug: 'improve-your-game-sense-fast',
        title: 'Improve Your Game Sense Fast',
        excerpt: 'Aim gets you the shot. Game sense gets you there before the fight even starts.',
        coverImage: '/web-stories/improve-your-game-sense-fast-cover.webp',
        publishDate: 'August 2, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/web-stories/improve-your-game-sense-fast-cover.webp',
                title: 'Improve Your Game Sense Fast',
                description: 'The skill that mechanical aim alone cannot replace.',
            },
            {
                id: '1',
                image: '/web-stories/improve-your-game-sense-fast-1.webp',
                title: 'Read the Map, Not Just the Fight',
                description: 'Tracking rotations and utility usage tells you where the next fight is happening before it does.',
            },
            {
                id: '2',
                image: '/web-stories/improve-your-game-sense-fast-2.webp',
                title: 'Radar Habits Win Rounds',
                description: 'Elite players check their radar every 1-2 seconds — it becomes reflexive, not a conscious decision.',
            },
            {
                id: '3',
                image: '/web-stories/improve-your-game-sense-fast-3.webp',
                title: 'Every Game Has Its Own Sense',
                description: 'Valorant abilities, CS2 economy, Apex zone timing — game sense is learned per title, not generic.',
            },
            {
                id: '4',
                image: '/web-stories/improve-your-game-sense-fast-4.webp',
                title: 'Explore All Our Training Tools',
                description: 'Aim trainers, calculators, and guides for every competitive FPS.',
                cta: { label: 'See All Games →', href: '/games/' },
            },
        ],
    },
];
