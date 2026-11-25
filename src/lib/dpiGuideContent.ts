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
    /**
     * Long-form sections rendered under the tips. Added because the guide
     * pages were the thinnest on the site: a spec line and four bullets is
     * not an answer to "what DPI should I use and why".
     */
    deepDive?: { heading: string; paragraphs: string[] }[];
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
        deepDive: [
            {
                heading: 'Why MOBA players run higher DPI than FPS players',
                paragraphs: [
                    'In a shooter, DPI feeds a camera rotation, and a low value gives you finer control over a small angular movement. In League there is no rotation — the mouse crosses a screen. The useful movement is the distance from your champion to the far edge of your vision, and covering it quickly is what a higher DPI buys.',
                    'That is why the typical League range of 1200 to 1600 DPI would be extremely high for a CS2 player and is unremarkable here. The two numbers are doing different jobs, and comparing them directly is a category error.',
                    'Screen resolution genuinely matters in this context, unlike in FPS aim. A 1440p display has more pixels to cross than a 1080p one, so the same DPI covers proportionally less of the screen. Players moving up in resolution often need to raise DPI to keep the same feel.',
                ],
            },
            {
                heading: 'What precision actually means in League',
                paragraphs: [
                    'Two distinct tasks compete for your DPI setting. Last-hitting and spell targeting want precision: small, exact cursor placements on a minion or a champion model. Map awareness and camera panning want speed: covering distance quickly to check a lane or land a long skillshot.',
                    'Faker famously plays at 800 DPI, toward the low end, which suits a precision-first style with heavy camera-lock usage. Players who rely on unlocked camera and constant panning tend upward from there.',
                    'Neither is correct. What is correct is picking one and keeping it, because click precision in a MOBA is muscle memory in exactly the same way aim is in a shooter.',
                ],
            },
            {
                heading: 'The Windows settings that matter first',
                paragraphs: [
                    'Set the Windows pointer speed slider to the sixth notch of eleven and turn off Enhance Pointer Precision before you touch DPI. The sixth notch is the only position where Windows applies no scaling to the counts your mouse reports; every other setting multiplies or divides them before League ever sees the movement.',
                    'Enhance Pointer Precision is mouse acceleration by another name. It makes a fast hand movement travel further than a slow one covering the same distance, which is precisely what destroys the consistency last-hitting depends on.',
                    'Once both are correct, your DPI setting means what it says, and any adjustment you make is measuring the thing you intended to measure.',
                ],
            },
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
        deepDive: [
            {
                heading: 'Why Dota pros sit lower than League pros',
                paragraphs: [
                    'The 400 to 800 DPI range common in Dota is noticeably lower than League\'s 1200 to 1600, and the reason is the game rather than the players. Dota\'s last-hitting window is tighter, denying is a mechanic League does not have, and several spells require placing a cursor precisely inside a small radius under time pressure.',
                    'All of those reward a cursor that moves less per centimetre of hand movement. The cost is more physical travel to cross the screen, which Dota players absorb because the precision matters more than the panning speed.',
                    'If you are coming from League, expect your first hour in Dota at your usual DPI to feel twitchy rather than fast. That is the game asking for a different kind of accuracy, not a settings problem.',
                ],
            },
            {
                heading: 'Camera control and why it changes the answer',
                paragraphs: [
                    'How you move the camera changes how much cursor travel you actually need. Players who use edge-pan cover the map with the mouse itself, which makes a low DPI tiring. Players who bind camera movement to keys or use camera grip rarely move the cursor far, which makes a low DPI comfortable.',
                    'Deciding your camera control method first and your DPI second is the right order. Doing it the other way round produces a setting that fights the way you actually play.',
                    'Most professionals use a mix, leaning on hotkeys for the big movements and reserving cursor travel for targeting. That is the pattern the lower DPI range grew around.',
                ],
            },
            {
                heading: 'Setting it up correctly',
                paragraphs: [
                    'Windows pointer speed goes to the sixth notch of eleven, and Enhance Pointer Precision goes off. Those two decide whether the DPI you set is the DPI the game receives; everything else is downstream of them.',
                    'Pick a DPI from the range, play twenty games, and change nothing in between. Click precision is motor learning, and it needs the same uninterrupted run that FPS aim does.',
                    'If you also play a shooter, keep the same DPI across both and let each game\'s own settings carry the difference. One hardware setting across everything means your hand only has to learn one thing about the mouse.',
                ],
            },
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
        deepDive: [
            {
                heading: 'Why emulator X/Y sensitivity differs from native FPS yaw',
                paragraphs: [
                    'Native PC shooters convert raw Windows mouse counts directly into spherical camera degrees using a single linear yaw scalar. Android emulators playing Free Fire cannot talk to a native Raw Input look loop—instead, they translate physical mouse movement into virtual finger swipes inside a bounded right-side touch box on an emulated phone screen.',
                    'Because a virtual swipe stops or resets whenever it hits the edge of that simulated viewport box (requiring automated virtual finger-lift resets), changing emulator resolution, FPS cap, or touch-box size alters how fast a 1-centimeter flick rotates your character.',
                    'Separate horizontal (X) and vertical (Y) sensitivity multipliers inside BlueStacks or MSI App Player exist specifically to compensate for asymmetric touch-screen drag curves—boosting Y lets you drag upward toward the headbox quickly without making horizontal 180-degree turns uncontrollable.',
                ],
            },
            {
                heading: 'Tuning Windows DPI, emulator speed, and in-game sliders',
                paragraphs: [
                    'Always lock Windows pointer speed at 6/11 with Enhance Pointer Precision disabled before opening your emulator. If Windows applies dynamic acceleration before the emulator samples cursor deltas, your upward one-tap drag distance changes depending on how fast you flick your wrist.',
                    'Set a single consistent hardware mouse DPI (800 DPI is standard across most competitive PC emulator setups) and avoid changing mouse DPI per weapon. Keep in-game General sensitivity lower (often 0 to 30 depending on your emulator) and let your emulator X/Y values handle the coarse turn speed.',
                    'For Red Dot, 2x, and 4x scopes, drop multipliers progressively only if overshooting headshots at mid-to-long range; aggressive close-range SMG rushers usually keep Red Dot closer to General speed.',
                ],
            },
            {
                heading: 'Native x86 client vs third-party emulators',
                paragraphs: [
                    'Garena’s native x86 PC build eliminates virtual Android frame pacing and reduces mouse-to-photon latency compared to full VM emulators, giving cleaner stop consistency during fast crouch-stand shots.',
                    'However, many tournament players still tune BlueStacks or LDPlayer setups because they offer granular X/Y curves and key-mapping tweaks. Whichever platform you choose, stick to one build and one DPI for at least two full weeks before tweaking X/Y decimals again.',
                ],
            },
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
