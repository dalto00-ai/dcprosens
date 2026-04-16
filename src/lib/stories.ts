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
    pages: StoryPage[];
}

export const stories: WebStory[] = [
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
                image: '/blog/sensitivity-converter-guide.webp',
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
                image: '/blog/cm360-guide.webp',
                title: 'Find Your Perfect eDPI',
                description: 'Use the DCPROSENS calculator to find the best eDPI for your hand size and grip.',
                cta: { label: 'Open Calculator →', href: '/dpi' },
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
        coverImage: '/blog/valorant-sensitivity-2026.webp',
        publishDate: 'April 25, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/blog/valorant-sensitivity-2026.webp',
                title: '5 Pro Sensitivity Secrets',
                description: 'Tips that pros know but never explain.',
            },
            {
                id: '1',
                image: '/blog/mouse-acceleration-guide.webp',
                title: '#1: Disable Mouse Acceleration',
                description: 'Windows Enhanced Pointer Precision must be OFF. It makes your sensitivity inconsistent.',
            },
            {
                id: '2',
                image: '/blog/polling-rate-guide.webp',
                title: '#2: Set Polling Rate to 1000Hz+',
                description: 'At 1000Hz your mouse reports position 1000× per second. Essential for precision.',
            },
            {
                id: '3',
                image: '/blog/wrist-vs-arm-aiming.webp',
                title: '#3: Pick One Aiming Style',
                description: 'Wrist or arm aiming — not both. Mixing styles destroys muscle memory.',
            },
            {
                id: '4',
                image: '/blog/aim-training-routine.webp',
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
        coverImage: '/blog/cs2-sensitivity-2026.webp',
        publishDate: 'April 24, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/blog/cs2-sensitivity-2026.webp',
                title: 'Valorant vs CS2 Sensitivity',
                description: 'Why you cannot just copy-paste your settings.',
            },
            {
                id: '1',
                image: '/blog/valorant-sensitivity-2026.webp',
                title: 'Valorant Uses 0.07 Yaw',
                description: 'To convert CS2 → Valorant, multiply by 3.18. A CS2 sens of 1.0 = ~0.314 in Valorant.',
            },
            {
                id: '2',
                image: '/blog/cs2-spray-control.webp',
                title: 'CS2 Has Deterministic Spray',
                description: 'Unlike Valorant, CS2 recoil patterns are fixed. Low sens helps you control the AK-47 spray.',
            },
            {
                id: '3',
                image: '/blog/counter-strafe-cs2.webp',
                title: 'Counter-Strafing Changes Feel',
                description: 'CS2 forces you to stop before shooting. Slightly lower sens gives you more control.',
            },
            {
                id: '4',
                image: '/blog/valorant-crosshair-placement.webp',
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
        coverImage: '/blog/best-gaming-mouse-2026.webp',
        publishDate: 'April 23, 2026',
        category: 'Gear',
        pages: [
            {
                id: 'cover',
                image: '/blog/best-gaming-mouse-2026.webp',
                title: 'Top 5 Mice 2026',
                description: 'Used at VCT, BLAST, and ALGS. Here are the winners.',
            },
            {
                id: '1',
                image: '/blog/wireless-vs-wired-mouse.webp',
                title: '#1: G Pro X Superlight 2',
                description: '60g | HERO 25K sensor | 95h battery. The most-used mouse at VCT 2026.',
            },
            {
                id: '2',
                image: '/blog/mouse-weight-guide.webp',
                title: '#2: Lamzu Atlantis V2 Pro',
                description: '47g wireless | PAW3395 | Used by rising Valorant talent worldwide.',
            },
            {
                id: '3',
                image: '/blog/mouse-sensor-guide.webp',
                title: '#3: Razer Viper V3 HyperSpeed',
                description: '82g | HyperSpeed 2.4GHz | Ergonomic right-hand design perfected.',
            },
            {
                id: '4',
                image: '/blog/mouse-grip-styles.webp',
                title: '#4: Zowie EC2-CW',
                description: '77g wireless | Plug-and-play | No software required. The no-nonsense pick.',
            },
            {
                id: '5',
                image: '/blog/mouse-skates-guide.webp',
                title: '#5: Pulsar X2H Wireless',
                description: '55g | Focus Pro sensor | Symmetrical shape for claw-grip players.',
                cta: { label: 'See All Mice →', href: '/blog/best-gaming-mouse-2026' },
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
        coverImage: '/blog/escape-elo-hell-guide.webp',
        publishDate: 'April 22, 2026',
        category: 'Guide',
        pages: [
            {
                id: 'cover',
                image: '/blog/escape-elo-hell-guide.webp',
                title: 'Rank Up Fast in FPS',
                description: '5 habits from pro coaches that actually work.',
            },
            {
                id: '1',
                image: '/blog/aim-improvement-plateau.webp',
                title: 'Habit 1: Warm Up Every Day',
                description: 'Players who warm up before ranked win 18% more rounds in their first 3 games.',
            },
            {
                id: '2',
                image: '/blog/valorant-crosshair-placement.webp',
                title: 'Habit 2: Crosshair at Head Height',
                description: 'Every angle you pre-aim at head height is a kill you get without reacting.',
            },
            {
                id: '3',
                image: '/blog/mental-game-fps-tilt.webp',
                title: 'Habit 3: Stop at 2 Losses',
                description: 'Two consecutive losses = cognitive tilt. Stop the session. Return fresh tomorrow.',
            },
            {
                id: '4',
                image: '/blog/aim-training-routine.webp',
                title: 'Habit 4: Review Your Deaths',
                description: 'Watch your kill cam for every death. Note the angle. Do not repeat it next round.',
            },
            {
                id: '5',
                image: '/blog/perfect-sensitivity.webp',
                title: 'Habit 5: Lock Your Sensitivity',
                description: 'Changing settings is the #1 reason players plateau. Lock in once. Commit for 30 days.',
                cta: { label: 'Find Your Sens →', href: '/dpi' },
            },
        ],
    },
];
