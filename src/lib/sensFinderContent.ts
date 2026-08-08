export interface SensFinderGameContent {
    /** Must match a games.ts id */
    gameId: string;
    displayName: string;
    engine: string;
    category: string;
    blurb: string;
    faqs: { q: string; a: string }[];
}

// Curated subset of games.ts with real search/competitive relevance today.
// Deliberately excludes: Quake, Rust (low search priority in the competitive
// FPS niche) and BF2042/PUBG (yaw is flagged UNVERIFIED in games.ts — a
// dedicated landing page would push traffic toward a number we don't trust
// yet). Roblox and Minecraft were added despite not being traditional
// competitive FPS titles — real GA4 traffic already showed demand for
// Minecraft content, and both are core to the site's broader "any game
// played on PC" positioning, not just tactical shooters.
export const sensFinderContent: SensFinderGameContent[] = [
    {
        gameId: 'valorant',
        displayName: 'Valorant',
        engine: 'Unreal Engine 4 (Riot custom netcode)',
        category: 'Tactical Shooter',
        blurb: 'Valorant uses the highest yaw value (0.07) of any major competitive shooter, meaning the smallest physical mouse movement produces the most camera rotation. That is why Valorant sensitivity numbers look tiny (0.2-0.5) compared to CS2 or Apex.',
        faqs: [
            {
                q: 'What eDPI do Valorant pros use?',
                a: 'Most Valorant pros sit between 200 and 320 eDPI. TenZ plays at 800 DPI × 0.3 sens (240 eDPI); Aspas plays at 800 DPI × 0.4 (320 eDPI). There is no single "correct" number — both approaches work at the highest level.',
            },
            {
                q: 'Does Valorant have raw input support?',
                a: 'Yes, Valorant reads raw mouse input directly, bypassing Windows pointer acceleration curves. Make sure "Enhance Pointer Precision" is disabled in Windows mouse settings regardless, since it can still affect desktop/menu navigation.',
            },
        ],
    },
    {
        gameId: 'csgo',
        displayName: 'CS2',
        engine: 'Source 2',
        category: 'Tactical Shooter',
        blurb: 'CS2 runs on Source 2, the successor to the original Source engine that also powers Apex Legends and (partially) Deadlock — which is why those three share the same 0.022 yaw and convert 1:1 at the same DPI.',
        faqs: [
            {
                q: 'How do I set my exact sensitivity in CS2?',
                a: 'Open the developer console and type sensitivity X, replacing X with your value (e.g. sensitivity 2.0). You can also set it in Settings → Mouse, but the console command supports more decimal precision.',
            },
            {
                q: 'Does sub-tick affect sensitivity conversion?',
                a: 'No. Sub-tick changes how the server processes inputs between ticks, not how mouse movement translates to camera rotation. Your cm/360 conversion from CS:GO or any other Source-family game still applies exactly.',
            },
        ],
    },
    {
        gameId: 'apex',
        displayName: 'Apex Legends',
        engine: 'Source (modified, Respawn)',
        category: 'Battle Royale',
        blurb: 'Apex Legends runs on a heavily modified Source engine, inheriting the same 0.022 yaw as CS2. The extra layer to manage is ADS sensitivity per scope (1x-4x), which Apex treats as separate multipliers rather than a single zoom slider.',
        faqs: [
            {
                q: 'Why does my Apex sensitivity feel different per scope?',
                a: 'Apex lets you set a different ADS sensitivity multiplier for each optic (1x-2x, 3x, 4x-6x, 6x+ Sniper). If only one feels off, adjust that specific scope multiplier instead of your base sensitivity.',
            },
            {
                q: 'Is Apex sensitivity 1:1 with CS2?',
                a: 'Yes for hipfire — both use yaw 0.022, so the same sensitivity at the same DPI gives the same cm/360. ADS sensitivity still needs its own per-scope tuning.',
            },
        ],
    },
    {
        gameId: 'overwatch',
        displayName: 'Overwatch 2',
        engine: 'Proprietary (Blizzard)',
        category: 'Hero Shooter',
        blurb: 'Overwatch 2 uses a yaw of 0.0066, the same family as Call of Duty and Destiny 2. Because heroes have wildly different zoom levels (Ana\'s scope, Widowmaker\'s sniper, Sombra\'s hip-fire), Overwatch also has a separate "Relative Aim Sensitivity While Zoomed" slider most converters ignore.',
        faqs: [
            {
                q: 'What is "Relative Aim Sensitivity While Zoomed"?',
                a: 'It is a percentage of your base sensitivity applied whenever a hero zooms in (Ana\'s scope, Ashe ADS, Widowmaker scope). Most OWL pros settle around 40-55%, depending on the hero pool they play.',
            },
            {
                q: 'Do all Overwatch 2 heroes use the same sensitivity?',
                a: 'Yes, hipfire sensitivity is global across all heroes — only the zoom multiplier changes per ability. Tracking-heavy players (Tracer, Genji, Soldier) tend toward higher base sensitivity than precision heroes (Widowmaker, Ana, Ashe).',
            },
        ],
    },
    {
        gameId: 'fortnite',
        displayName: 'Fortnite',
        engine: 'Unreal Engine 5',
        category: 'Battle Royale / Building Shooter',
        blurb: 'Fortnite has the lowest yaw (0.005555) of any game in this list, so numeric sensitivity values look large. Building adds a second layer most other games do not have: many players run a separate, higher "Builder Pro" turn rate independent of their aim sensitivity.',
        faqs: [
            {
                q: 'Should building sensitivity match aim sensitivity?',
                a: 'Not necessarily. Many competitive players run a higher sensitivity specifically for building/editing (faster piece placement and edits) than for ADS aiming, since building rewards speed over precision.',
            },
            {
                q: 'Does this converter account for Fortnite\'s ADS sensitivity multiplier?',
                a: 'This tool converts hipfire/turn sensitivity via cm/360. Fortnite\'s separate scoped sensitivity multipliers (per optic) still need independent in-game tuning.',
            },
        ],
    },
    {
        gameId: 'cod',
        displayName: 'Call of Duty: Warzone / MW3',
        engine: 'IW Engine',
        category: 'Battle Royale / Tactical Shooter',
        blurb: 'Modern Call of Duty titles share a yaw of 0.0066 across Warzone, MW3, and Black Ops — the same family as Overwatch 2 and Destiny 2 — so sensitivity values transfer across CoD sub-titles without conversion.',
        faqs: [
            {
                q: 'Does this sensitivity value work for every recent CoD title?',
                a: 'Yes — Warzone, Modern Warfare III, and Black Ops 6 all use the same core sensitivity scale, so a cm/360-matched value carries over between them without adjustment.',
            },
            {
                q: 'How does ADS sensitivity work in CoD?',
                a: 'CoD uses a per-weapon ADS multiplier (Low/Medium/High/1.0-2.0 numeric scale) tied to the base sensitivity rather than a single global zoom slider. Set your base sensitivity first, then tune the ADS multiplier separately.',
            },
        ],
    },
    {
        gameId: 'rainbow6',
        displayName: 'Rainbow Six Siege',
        engine: 'AnvilNext 2.0 (Ubisoft)',
        category: 'Tactical Shooter',
        blurb: 'Siege uses one of the lower yaw values on this list (0.00572), and every operator with an ACOG or scope applies its own ADS multiplier on top of your base sensitivity — so a value that feels right hipfire can still need per-scope tuning.',
        faqs: [
            {
                q: 'Why does my sensitivity feel off when aiming down sights in Siege?',
                a: 'Siege applies a separate ADS sensitivity multiplier per zoom level (1.0x-2.5x operator sights). Converting your hipfire cm/360 gets your base feel right; ADS still needs its own multiplier check per operator.',
            },
        ],
    },
    {
        gameId: 'destiny2',
        displayName: 'Destiny 2',
        engine: 'Proprietary Tiger Engine (Bungie)',
        category: 'Looter Shooter',
        blurb: 'Destiny 2 shares the 0.0066 yaw family with Call of Duty and Overwatch 2, but its wide range of weapon archetypes (snipers, scout rifles, hand cannons) each carry different zoom levels, so ADS feel varies more than in flatter tactical shooters.',
        faqs: [
            {
                q: 'Does Destiny 2 sensitivity convert directly from Overwatch 2 or CoD?',
                a: 'Yes for hipfire — all three share the same 0.0066 yaw, so the same cm/360 carries over directly. Per-weapon ADS zoom in Destiny 2 still needs separate in-game feel-testing.',
            },
        ],
    },
    {
        gameId: 'marvelrivals',
        displayName: 'Marvel Rivals',
        engine: 'Unreal Engine 5 (NetEase)',
        category: 'Hero Shooter',
        blurb: 'Marvel Rivals launched on Unreal Engine 5 and settled on a 0.022 yaw, the same as CS2 and Apex Legends — a common choice for newer UE5 shooters aiming for a familiar competitive feel out of the box.',
        faqs: [
            {
                q: 'Can I reuse my CS2 or Apex sensitivity in Marvel Rivals?',
                a: 'Yes — Marvel Rivals uses the same 0.022 yaw as CS2 and Apex Legends, so the same sensitivity at the same DPI preserves your cm/360 with no conversion needed.',
            },
        ],
    },
    {
        gameId: 'thefinals',
        displayName: 'THE FINALS',
        engine: 'Unreal Engine 5 (Embark Studios)',
        category: 'Arena Destruction Shooter',
        blurb: 'THE FINALS uses a 0.0066 yaw, aligning it with the Call of Duty / Overwatch 2 / Destiny 2 family rather than the Source-engine 0.022 standard — worth checking explicitly if you are switching from CS2 or Apex.',
        faqs: [
            {
                q: 'Why does my CS2 sensitivity feel too slow in THE FINALS?',
                a: 'THE FINALS uses a lower yaw (0.0066) than CS2/Apex (0.022) — the same raw sensitivity number produces roughly 3.3x less rotation. Use the converter above instead of copying the number directly.',
            },
        ],
    },
    {
        gameId: 'minecraft',
        displayName: 'Minecraft (Java)',
        engine: 'Custom Java (Mojang)',
        category: 'Sandbox / PvP',
        blurb: 'Minecraft Java does not use a fixed yaw like FPS games — its mouse code (f = sensitivity × 0.6 + 0.2, then cubed) is non-linear, so no single conversion number is exact at every setting. The value used here approximates the 40-70% slider range most PvP players actually play in; treat the converted number as a strong starting point to fine-tune by feel, not a locked-in exact match.',
        faqs: [
            {
                q: 'Why is my converted Minecraft sensitivity slightly off?',
                a: 'Because Minecraft’s sensitivity slider scales your mouse input on a cubic curve instead of a straight multiplier like Valorant or CS2. A linear cm/360 conversion gets you very close, but expect to nudge the slider by a few percent after testing in a world.',
            },
            {
                q: 'What sensitivity do Minecraft PvP players use?',
                a: 'Most competitive Java PvPers land between 40% and 70%, often paired with 800-1600 DPI. Higher-DPI players tend to run lower percentages for finer control during hit-trading.',
            },
        ],
    },
    {
        gameId: 'roblox',
        displayName: 'Roblox',
        engine: 'Custom (Roblox Engine)',
        category: 'Platform / Multi-Genre',
        blurb: 'Roblox is a platform, not a single game — camera sensitivity is set once at the platform level and carries into most first-person Roblox shooters and PvP experiences. Roblox does not publish its camera code, so the yaw used here is an approximation rather than a confirmed engine constant; use it as a starting point and adjust by feel inside the specific experience you play.',
        faqs: [
            {
                q: 'Does one Roblox sensitivity setting work for every game?',
                a: 'Mostly yes — the platform-level mouse sensitivity applies across experiences, but individual games can add their own ADS or scope multipliers on top, the same way Valorant or Apex do.',
            },
            {
                q: 'What cm/360 is good for Roblox shooters?',
                a: 'Most players are comfortable between 25cm and 40cm per 360°, similar to mid-sensitivity ranges in Fortnite or Apex — start there and adjust for the specific experience’s FOV and pace.',
            },
        ],
    },
    {
        gameId: 'tf2',
        displayName: 'Team Fortress 2',
        engine: 'Source',
        category: 'Class-Based Shooter',
        blurb: 'Team Fortress 2 runs on the original Source engine and uses the same 0.022 yaw as CS2, Left 4 Dead 2, and every other Source-family title — sensitivity carries over 1:1 at the same DPI with zero conversion needed.',
        faqs: [
            {
                q: 'Can I copy my CS2 sensitivity directly into TF2?',
                a: 'Yes — same engine, same 0.022 yaw. Set the same sensitivity number at the same DPI and your cm/360 stays identical.',
            },
        ],
    },
    {
        gameId: 'l4d2',
        displayName: 'Left 4 Dead 2',
        engine: 'Source',
        category: 'Co-op Survival Shooter',
        blurb: 'Left 4 Dead 2 shares the Source engine\'s standard 0.022 yaw with CS2, TF2, and Half-Life-derived titles, so any sensitivity you already use in another Source game transfers over exactly.',
        faqs: [
            {
                q: 'Does DPI matter differently in L4D2 than other Source games?',
                a: 'No — DPI scales identically across every Source-family title. If you know your cm/360 in one, the same DPI and sensitivity gives you the same cm/360 here.',
            },
        ],
    },
    {
        gameId: 'titanfall2',
        displayName: 'Titanfall 2',
        engine: 'Source (modified, Respawn)',
        category: 'Movement Shooter',
        blurb: 'Titanfall 2 runs on a heavily modified Source engine (the same lineage Respawn later used for Apex Legends) and keeps the familiar 0.022 yaw — though its fast wall-running movement means many players run a noticeably lower cm/360 than they would in a stationary tac-shooter.',
        faqs: [
            {
                q: 'Should I use a different sensitivity for Titanfall 2 than CS2?',
                a: 'The yaw conversion is 1:1 (both 0.022), but many players prefer a faster (lower cm/360) sensitivity in Titanfall 2 specifically because of wall-running and mech combat requiring quick 180s.',
            },
        ],
    },
    {
        gameId: 'huntshowdown',
        displayName: 'Hunt: Showdown',
        engine: 'CryEngine',
        category: 'PvPvE Extraction Shooter',
        blurb: 'Despite running on CryEngine rather than Source, Hunt: Showdown converges on the same 0.022 yaw used by the entire Source-engine family — convenient if you split time between Hunt and CS2 or Apex.',
        faqs: [
            {
                q: 'Does Hunt: Showdown ADS sensitivity need separate conversion?',
                a: 'Yes — like most extraction shooters, aiming down sights on Hunt\'s varied weapon scopes uses its own multiplier separate from hip-fire, so convert those individually rather than assuming a flat ratio.',
            },
        ],
    },
    {
        gameId: 'gtav',
        displayName: 'Grand Theft Auto V',
        engine: 'RAGE Engine',
        category: 'Open World / Third-Person',
        blurb: 'GTA V uses a 0.0066 yaw, putting it in the same conversion family as Call of Duty, Overwatch 2, and Destiny 2 rather than the Source-engine 0.022 standard — worth double-checking if you\'re switching from CS2 or Apex specifically for first-person mode or online shootouts.',
        faqs: [
            {
                q: 'Does this apply to GTA Online too?',
                a: 'Yes — GTA Online shares the same RAGE engine sensitivity system as GTA V\'s story mode, so the same yaw and conversion applies to both.',
            },
        ],
    },
];

export function getSensFinderContent(gameId: string): SensFinderGameContent | undefined {
    return sensFinderContent.find((g) => g.gameId === gameId);
}
