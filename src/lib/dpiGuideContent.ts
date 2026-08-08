export interface DpiGuideContent {
    gameId: string;
    displayName: string;
    genre: string;
    // Why this game doesn't get a sensitivity *converter*: no free-look
    // camera means there's no yaw/cm-360 to convert, only cursor speed.
    whyNoConverter: string;
    dpiRange: string;
    proExamples: { name: string; dpi: string }[];
    tips: string[];
    faqs: { q: string; a: string }[];
}

export const dpiGuideContent: DpiGuideContent[] = [
    {
        gameId: 'lol',
        displayName: 'League of Legends',
        genre: 'MOBA',
        whyNoConverter: 'League of Legends uses a fixed top-down camera — the mouse points and clicks, it never rotates a first-person view. There is no yaw value to convert between games, so a cm/360 sensitivity converter genuinely does not apply here. What actually matters is DPI (cursor speed and click precision) and your Windows pointer settings.',
        dpiRange: '1200–1600 DPI is the most common range, favoring fast camera panning and quick ability targeting across the map.',
        proExamples: [
            { name: 'Faker', dpi: '800 DPI' },
        ],
        tips: [
            'Disable "Enhance Pointer Precision" in Windows mouse settings — it adds acceleration that makes clicks inconsistent.',
            'Higher DPI (1200–1600) suits players who rely on fast map awareness and quick skillshot flicks.',
            'Lower DPI (800 and below) suits players who prioritize precise last-hitting and clean camera control — Faker being the most famous example.',
            'Whatever you pick, keep it consistent — MOBA precision comes from muscle memory, not a "correct" number.',
        ],
        faqs: [
            {
                q: 'Is there a League of Legends sensitivity converter?',
                a: 'Not in the traditional FPS sense. League\'s camera doesn\'t rotate with the mouse, so there\'s no yaw/cm-360 value to convert. What you actually want to match across games is DPI and pointer acceleration settings, not an aim sensitivity number.',
            },
            {
                q: 'What DPI does Faker use?',
                a: '800 DPI — notably lower than the 1200–1600 range many other pros and high-elo players prefer, showing there isn\'t one "correct" setting.',
            },
        ],
    },
    {
        gameId: 'dota2',
        displayName: 'Dota 2',
        genre: 'MOBA',
        whyNoConverter: 'Like League of Legends, Dota 2 uses a fixed overhead camera controlled by clicking, not a rotating first-person view. There is no yaw to convert — DPI and click precision are what actually matter here.',
        dpiRange: '400–800 DPI is the most common range, with many pros favoring the lower end for precise last-hitting and clean spell targeting.',
        proExamples: [
            { name: 'Common pro baseline', dpi: '800 DPI' },
            { name: 'Precision-focused players', dpi: '400 DPI' },
        ],
        tips: [
            'Disable mouse acceleration for consistent click behavior.',
            'Lower DPI (400) gives finer control for last-hitting and accurate spell casting, at the cost of needing more physical mouse movement.',
            '800 DPI is the most common "sweet spot" balancing camera movement speed with precision.',
        ],
        faqs: [
            {
                q: 'Is there a Dota 2 sensitivity converter?',
                a: 'No — Dota 2\'s camera is fixed overhead and controlled by the cursor, not a first-person yaw rotation, so there\'s nothing to convert. DPI is the setting that actually carries over between games.',
            },
            {
                q: 'What DPI do Dota 2 pros use?',
                a: 'Most commonly 800 DPI, with some precision-focused players going as low as 400 DPI for finer last-hit and spell-cast accuracy.',
            },
        ],
    },
    {
        gameId: 'freefire',
        displayName: 'Free Fire',
        genre: 'Battle Royale (Mobile / PC)',
        whyNoConverter: 'Free Fire is mobile-first, played on PC either through Garena\'s native PC client or through third-party emulators (BlueStacks, MEmu, LDPlayer) — each of which translates mouse movement into simulated touch input differently. There is no single, consistent yaw constant across these setups the way there is for a native PC shooter, so a precise sensitivity converter can\'t be built honestly here.',
        dpiRange: 'A mid-range 800 DPI is a reasonable starting point on emulators; fine-tune the in-game percentage sliders (General, Red Dot, 2x/4x Scope, Free Look) by feel from there.',
        proExamples: [],
        tips: [
            'On emulators, many competitive players keep the in-game "General" sensitivity low and let the emulator\'s own tracking handle precision — this varies by emulator, so test directly.',
            'On the native PC client (x86 build), separate X/Y sensitivity sliders give more direct control than emulator-translated input.',
            'Disable Windows pointer acceleration regardless of which client you use.',
            'Because the touch-to-mouse translation differs per emulator, a setting that feels right on BlueStacks may not feel identical on MEmu or LDPlayer — expect to re-tune if you switch.',
        ],
        faqs: [
            {
                q: 'Is there an exact Free Fire sensitivity converter?',
                a: 'Not a reliable one. Free Fire\'s sensitivity behavior depends on whether you\'re on the native PC client or an emulator, and each emulator translates mouse movement into simulated touch differently. Treat any published "exact" conversion for Free Fire with skepticism.',
            },
            {
                q: 'Should I use the official PC client or an emulator?',
                a: "Garena's native x86 PC client gives more direct, predictable mouse input since it doesn't go through a touch-simulation layer. Emulators remain popular for their extra tracking/aim assist tooling, which is a trade-off some competitive players prefer despite the less direct input.",
            },
        ],
    },
];

export function getDpiGuideContent(gameId: string): DpiGuideContent | undefined {
    return dpiGuideContent.find((g) => g.gameId === gameId);
}
