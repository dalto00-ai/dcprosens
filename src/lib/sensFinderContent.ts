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
    {
        gameId: 'hl2',
        displayName: 'Half-Life 2',
        engine: 'Source',
        category: 'Classic FPS',
        blurb: "Half-Life 2 helped define the Source engine's 0.022 m_yaw convention that CS2, TF2, and dozens of other Valve and Valve-licensed titles still use today.",
        faqs: [
            { q: 'Can I copy my CS2 sensitivity straight into Half-Life 2?', a: 'Yes — identical 0.022 yaw, so the same sensitivity and DPI gives you the same cm/360.' },
        ],
    },
    {
        gameId: 'portal2',
        displayName: 'Portal 2',
        engine: 'Source',
        category: 'Puzzle FPS',
        blurb: "Portal 2 shares the Source engine's 0.022 yaw with the rest of Valve's catalog — precise aim isn't the focus of Portal's puzzles, but the conversion is exact if you want consistent camera feel across Valve titles.",
        faqs: [
            { q: 'Does portal-shooting need different sensitivity than a normal FPS?', a: 'No — the yaw and turn rate work identically to any other Source-engine title; only the objective (placing portals, not eliminating enemies) differs.' },
        ],
    },
    {
        gameId: 'gmod',
        displayName: "Garry's Mod",
        engine: 'Source',
        category: 'Sandbox',
        blurb: "Garry's Mod runs on the original Source engine and inherits its 0.022 yaw — useful if you're setting up any first-person sandbox or roleplay server and want your aim to feel identical to CS2 or TF2.",
        faqs: [
            { q: "Do custom Garry's Mod gamemodes change the sensitivity math?", a: "Most don't — the underlying Source engine camera code stays the same across gamemodes unless a specific addon explicitly rescales mouse input." },
        ],
    },
    {
        gameId: 'cssource',
        displayName: 'Counter-Strike: Source',
        engine: 'Source',
        category: 'Tactical Shooter',
        blurb: "The predecessor to CS:GO and CS2, Counter-Strike: Source uses the exact same 0.022 yaw its successors kept for nearly two decades.",
        faqs: [
            { q: "Has CS's yaw value ever changed across CS:Source, CS:GO, and CS2?", a: 'No — all three generations kept the same 0.022 m_yaw default, which is why sensitivity numbers have carried over unchanged across CS titles since 2004.' },
        ],
    },
    {
        gameId: 'l4d1',
        displayName: 'Left 4 Dead',
        engine: 'Source',
        category: 'Co-op Survival Shooter',
        blurb: "The original Left 4 Dead shares Left 4 Dead 2's Source engine and identical 0.022 yaw — sensitivity transfers directly between the two games.",
        faqs: [
            { q: 'Is my sensitivity the same in Left 4 Dead and Left 4 Dead 2?', a: 'Yes — both run on the same Source engine build with the same 0.022 yaw, so no conversion is needed between them.' },
        ],
    },
    {
        gameId: 'blackmesa',
        displayName: 'Black Mesa',
        engine: 'Source',
        category: 'Classic FPS Remake',
        blurb: "Black Mesa, the fan-made-turned-official remake of the original Half-Life, runs on Source and keeps the same 0.022 yaw as every other title in Valve's engine family.",
        faqs: [
            { q: 'Does Black Mesa play differently from Half-Life 2 in terms of sensitivity?', a: 'No — same engine, same yaw. The remake changes visuals and some level design, not the underlying camera or input code.' },
        ],
    },
    {
        gameId: 'quakechampions',
        displayName: 'Quake Champions',
        engine: 'id Tech / Quake lineage',
        category: 'Arena Shooter',
        blurb: "Quake Champions modernizes the classic Quake formula but keeps the franchise's defining 0.022 m_yaw convention, confirmed directly rather than just inferred from genre.",
        faqs: [
            { q: 'Does Quake Champions convert 1:1 with CS2?', a: 'Yes — both use 0.022 yaw, so the same sensitivity and DPI produces an identical cm/360 in either game.' },
        ],
    },
    {
        gameId: 'back4blood',
        displayName: 'Back 4 Blood',
        engine: 'Unreal Engine 4',
        category: 'Co-op Survival Shooter',
        blurb: "Back 4 Blood's yaw (0.175) is a single-source figure — treat it as a solid starting point for this Left 4 Dead spiritual successor rather than a fully cross-verified value.",
        faqs: [
            { q: 'Is Back 4 Blood\'s sensitivity similar to Left 4 Dead 2\'s, since they\'re spiritually related?', a: 'No — despite sharing some of the same designers, Back 4 Blood runs on a completely different engine (Unreal Engine 4 vs Source) with its own distinct yaw.' },
        ],
    },
    {
        gameId: 'splitgate',
        displayName: 'Splitgate',
        engine: 'Unreal Engine 4',
        category: 'Arena Shooter',
        blurb: "Splitgate is the weakest-confidence entry in our full list — its yaw (0.009501) was derived from a Valorant-to-Splitgate ratio quoted by a gaming-news site rather than a dedicated technical source. Treat it as a rough starting point only.",
        faqs: [
            { q: "Why is Splitgate's yaw less certain than other games here?", a: "It wasn't independently measured — it's back-calculated from a single published sensitivity ratio, so small inaccuracies are more likely than with our directly-sourced entries." },
        ],
    },
    {
        gameId: 'helldivers2',
        displayName: 'Helldivers 2',
        engine: 'Autodesk Stingray (Arrowhead)',
        category: 'Co-op Third-Person Shooter',
        blurb: "Helldivers 2's yaw (0.0175) numerically matches Fallout 76 and Battalion 1944, though all three run on entirely unrelated engines — a reminder that identical yaw values don't always imply a shared engine lineage.",
        faqs: [
            { q: "Does Helldivers 2's third-person-leaning camera change the sensitivity math?", a: 'No — the yaw conversion works the same for the over-the-shoulder camera as it would for a pure first-person title; only the visual perspective differs.' },
        ],
    },
    {
        gameId: 'cs16',
        displayName: 'Counter-Strike 1.6',
        engine: 'GoldSrc',
        category: 'Tactical Shooter',
        blurb: "Counter-Strike 1.6 runs on GoldSrc, Source's direct technical predecessor, and uses the same 0.022 m_yaw default that carried forward into every Source-engine title since.",
        faqs: [
            { q: 'Does my CS2 sensitivity match my old CS 1.6 muscle memory?', a: 'Yes — GoldSrc and Source share the identical 0.022 yaw convention, so a properly converted cm/360 should feel the same across both generations.' },
        ],
    },
    {
        gameId: 'halflife',
        displayName: 'Half-Life',
        engine: 'GoldSrc',
        category: 'Classic FPS',
        blurb: "The original Half-Life runs on GoldSrc and shares the 0.022 m_yaw default with CS 1.6 and every later Source-engine title.",
        faqs: [
            { q: "Is Half-Life's sensitivity the same as Half-Life 2's?", a: 'Yes numerically (both 0.022), even though the games run on different engine generations (GoldSrc vs Source) — the m_yaw convention carried forward unchanged.' },
        ],
    },
    {
        gameId: 'doom2016',
        displayName: 'DOOM (2016)',
        engine: 'id Tech 6',
        category: 'Classic Arena FPS',
        blurb: 'DOOM (2016) runs on id Tech 6, the same engine lineage as DOOM Eternal, and shares the 0.022 yaw convention that traces back to the original Quake engine — the same value used by CS2, TF2, and the entire Source/id Tech family.',
        faqs: [
            {
                q: 'Does my CS2 or DOOM Eternal sensitivity carry over to DOOM 2016?',
                a: 'Yes — all three share the same 0.022 yaw, so the same sensitivity at the same DPI produces the same cm/360 with no conversion needed.',
            },
        ],
    },
    {
        gameId: 'halo',
        displayName: 'Halo Infinite',
        engine: 'Slipspace Engine (343 Industries)',
        category: 'Arena Shooter',
        blurb: 'Halo Infinite uses a yaw of 0.0225, confirmed via KovaaK\'s Sensitivity Matcher — close to, but not exactly, the 0.022 Source/id Tech standard, so a straight CS2 or Valorant number needs the converter above rather than a direct copy.',
        faqs: [
            {
                q: 'Can I just use my CS2 sensitivity number in Halo Infinite?',
                a: 'Almost, but not quite — Halo\'s yaw (0.0225) is very close to CS2\'s (0.022) but not identical. Run it through the converter above to keep your cm/360 exact rather than eyeballing it.',
            },
        ],
    },
    {
        gameId: 'codbo6',
        displayName: 'Call of Duty: Black Ops 6',
        engine: 'IW / Treyarch Engine',
        category: 'Tactical Shooter',
        blurb: "Black Ops 6 shares the 0.0066 yaw used across modern Call of Duty titles since the IW engine's Warzone era, so sensitivity carries over cleanly from Warzone or MW3.",
        faqs: [
            { q: 'Do I need to reconvert if I switch between Black Ops 6 and Warzone?', a: 'No — both share the same 0.0066 yaw, so the same sensitivity number at the same DPI gives an identical cm/360 in either game.' },
        ],
    },
    {
        gameId: 'paladins',
        displayName: 'Paladins',
        engine: 'Unreal Engine 3/4 (Evil Mojo)',
        category: 'Hero Shooter',
        blurb: "Paladins' yaw (0.0092) is a single-source figure specific to this hero shooter — don't assume it matches Hi-Rez's other titles like Smite without converting explicitly.",
        faqs: [
            { q: 'Is Paladins often compared to Overwatch 2 for sensitivity?', a: 'The genres are similar, but the yaw values differ (0.0092 vs 0.0066) — use the converter above rather than copying the number directly between the two.' },
        ],
    },
    {
        gameId: 'quake3',
        displayName: 'Quake III Arena',
        engine: 'id Tech 3',
        category: 'Classic Arena FPS',
        blurb: "Quake III Arena is one of the two titles (alongside the original Quake) that established the id Tech / Source-family 0.022 m_yaw convention still used by CS2 and dozens of other games today.",
        faqs: [
            { q: "Is Quake III Arena's sensitivity the same as Counter-Strike 2's?", a: 'Yes — both use 0.022 yaw. Quake III Arena predates CS2 by over two decades, but the underlying convention never changed.' },
        ],
    },
    {
        gameId: 'doometernal',
        displayName: 'DOOM Eternal',
        engine: 'id Tech 7',
        category: 'Classic Arena FPS',
        blurb: "DOOM Eternal runs on id Tech 7 and confirms the 0.022 m_yaw convention carried forward from id Software's original Quake engines all the way to their newest titles.",
        faqs: [
            { q: "Does DOOM Eternal's fast-paced combat need a different cm/360 than CS2?", a: 'The yaw conversion keeps physical mouse movement identical — many DOOM Eternal players do prefer a faster (smaller cm/360) feel for its acrobatic combat, but that is a personal choice, not a technical requirement.' },
        ],
    },
    {
        gameId: 'csconditionzero',
        displayName: 'Counter-Strike: Condition Zero',
        engine: 'GoldSrc',
        category: 'Tactical Shooter',
        blurb: "Condition Zero is one of Valve's own official GoldSrc-era Counter-Strike releases and shares the 0.022 m_yaw default with CS 1.6 and the entire Source-family lineage.",
        faqs: [
            { q: 'Is Condition Zero different from third-party CS spinoffs?', a: 'Yes — Condition Zero is an official Valve release on the standard GoldSrc engine, unlike some regional third-party Counter-Strike ports that modified the underlying code and are not guaranteed to share this yaw.' },
        ],
    },
    {
        gameId: 'tfc',
        displayName: 'Team Fortress Classic',
        engine: 'GoldSrc',
        category: 'Class-Based Shooter',
        blurb: "Team Fortress Classic, the original class-based shooter that TF2 later modernized, runs on GoldSrc with the same 0.022 m_yaw default as CS 1.6.",
        faqs: [
            { q: 'Does TFC play the same as TF2 in terms of sensitivity?', a: 'The yaw is identical (0.022) between both, even though TF2 moved to the newer Source engine — the convention held steady across the transition.' },
        ],
    },
    {
        gameId: 'fallout76',
        displayName: 'Fallout 76',
        engine: 'Creation Engine (Bethesda)',
        category: 'Survival RPG',
        blurb: "Fallout 76's yaw (0.0175) is a single-source figure — Bethesda's Creation Engine handles sensitivity differently from Source/id Tech, and this value hasn't been cross-verified against a second independent source.",
        faqs: [
            { q: 'Does this apply to other Fallout or Elder Scrolls titles?', a: "No — Bethesda's Creation Engine games each need their own verification, and we don't have a confirmed value for Fallout 4 or Skyrim in our data yet." },
        ],
    },
    {
        gameId: 'battalion1944',
        displayName: 'Battalion 1944',
        engine: 'Unreal Engine 4',
        category: 'Tactical Shooter',
        blurb: "Battalion 1944's yaw (0.0175) comes directly from KovaaK's own Sensitivity Matcher tool source code — an official technical source, not a converter-site aggregator.",
        faqs: [
            { q: 'Why does Battalion 1944 need its own value instead of a generic Unreal Engine number?', a: "Unreal Engine developers rescale mouse input per title, so there's no single 'Unreal Engine yaw' — Battalion 1944's 0.0175 is specific to this game." },
        ],
    },
    {
        gameId: 'reflexarena',
        displayName: 'Reflex Arena',
        engine: 'Custom (id Tech-inspired)',
        category: 'Arena Shooter',
        blurb: "Reflex Arena shares its exact yaw constant with Rainbow Six Siege (0.005730), confirmed directly in KovaaK's own Sensitivity Matcher source code as a shared built-in preset.",
        faqs: [
            { q: 'Why would an arena shooter share a yaw with a tactical shooter like Rainbow Six Siege?', a: "It's coincidental rather than a shared engine lineage — KovaaK's tool groups them together because they happen to measure the same, not because they're related games." },
        ],
    },
    {
        gameId: 'krunker',
        displayName: 'Krunker.io',
        engine: 'Custom (three.js / WebGL)',
        category: 'Browser Shooter',
        blurb: "Krunker.io's yaw (0.1376) was derived from a public GitHub sensitivity-converter repository whose other listed games independently matched our already-confirmed values — a solid cross-validation for a browser-based title with no official technical documentation.",
        faqs: [
            { q: 'Is Krunker.io\'s sensitivity comparable to other browser shooters like Shell Shockers?', a: "We don't have a verified value for other browser shooters yet — don't assume they share Krunker's yaw without checking." },
        ],
    },
    {
        gameId: 'wolfnewcolossus',
        displayName: 'Wolfenstein II: The New Colossus',
        engine: 'id Tech 6',
        category: 'Classic FPS',
        blurb: "Wolfenstein II runs on id Tech 6, the same engine family as DOOM 2016, and shares the 0.022 m_yaw convention.",
        faqs: [
            { q: 'Does this apply to Wolfenstein: The New Order too?', a: "No — The New Order runs on the older id Tech 5, a different generation without a confirmed value in our data. Don't assume it shares New Colossus's number." },
        ],
    },
    {
        gameId: 'wolfyoungblood',
        displayName: 'Wolfenstein: Youngblood',
        engine: 'id Tech 6',
        category: 'Co-op FPS',
        blurb: "Youngblood shares id Tech 6 with Wolfenstein II: The New Colossus and DOOM 2016, all confirmed at the same 0.022 yaw.",
        faqs: [
            { q: 'Can I copy my DOOM 2016 sensitivity into Youngblood?', a: 'Yes — both run on id Tech 6 with the same 0.022 yaw, so the same sensitivity at the same DPI produces an identical cm/360.' },
        ],
    },
    {
        gameId: 'rtcw',
        displayName: 'Return to Castle Wolfenstein',
        engine: 'id Tech 3 (modified)',
        category: 'Classic FPS',
        blurb: "Return to Castle Wolfenstein runs on a modified id Tech 3 (Quake III) engine, confirmed via its open-sourced engine code, and keeps the franchise's 0.022 m_yaw default.",
        faqs: [
            { q: 'Is this the same engine as the newer Wolfenstein reboots?', a: 'No — this classic-era RTCW runs on id Tech 3, while the 2014+ reboots (New Order, New Colossus) moved to id Tech 5/6. Both happen to converge near 0.022, but for different reasons.' },
        ],
    },
    {
        gameId: 'wolfet',
        displayName: 'Wolfenstein: Enemy Territory',
        engine: 'id Tech 3 (RTCW engine)',
        category: 'Class-Based Shooter',
        blurb: "Enemy Territory runs on a modified version of Return to Castle Wolfenstein's id Tech 3 engine, open-sourced since 2010, and shares the same 0.022 m_yaw default.",
        faqs: [
            { q: 'Is Enemy Territory\'s sensitivity the same as the original RTCW campaign?', a: "Yes — Enemy Territory is built directly on RTCW's engine, so both share the identical 0.022 yaw." },
        ],
    },
    {
        gameId: 'jediknight2',
        displayName: 'Star Wars Jedi Knight II: Jedi Outcast',
        engine: 'id Tech 3',
        category: 'Classic FPS',
        blurb: "Jedi Outcast was the first Star Wars title to run on id Tech 3 (the Quake III Arena engine), inheriting its 0.022 m_yaw default alongside lightsaber combat and blaster gunplay.",
        faqs: [
            { q: 'Does lightsaber combat change the sensitivity math?', a: 'No — melee lightsaber combat and ranged blaster combat both use the same underlying camera yaw; only your playstyle preference should differ, not the conversion.' },
        ],
    },
    {
        gameId: 'jediacademy',
        displayName: 'Star Wars Jedi Knight: Jedi Academy',
        engine: 'id Tech 3',
        category: 'Classic FPS',
        blurb: "Jedi Academy runs on the same id Tech 3 engine as its predecessor Jedi Outcast, keeping the identical 0.022 m_yaw default.",
        faqs: [
            { q: 'Can I use the same sensitivity in Jedi Academy as Jedi Outcast?', a: 'Yes — same engine, same 0.022 yaw, so your cm/360 carries over exactly between the two games.' },
        ],
    },
    {
        gameId: 'xonotic',
        displayName: 'Xonotic',
        engine: 'DarkPlaces (Quake 1-derived)',
        category: 'Arena Shooter',
        blurb: "Xonotic runs on DarkPlaces, an advanced fork of the original Quake 1 engine, and inherits the classic 0.022 m_yaw convention that Quake helped establish.",
        faqs: [
            { q: 'Is Xonotic related to Quake Champions or other modern arena shooters?', a: "Not directly — Xonotic is a free, open-source community project descended from Quake 1's engine, distinct from id Software's own modern titles, but it happens to share the same yaw convention." },
        ],
    },
    {
        gameId: 'openarena',
        displayName: 'OpenArena',
        engine: 'ioquake3 (id Tech 3 fork)',
        category: 'Arena Shooter',
        blurb: "OpenArena is a free, open-source fork of ioquake3 — itself a direct fork of id Tech 3 — and keeps the exact same 0.022 m_yaw default as Quake III Arena.",
        faqs: [
            { q: 'Is OpenArena basically the same as Quake III Arena for sensitivity purposes?', a: 'Yes — OpenArena forked directly from the Quake III Arena engine code, so the yaw convention transferred over unchanged.' },
        ],
    },
    {
        gameId: 'quake1',
        displayName: 'Quake',
        engine: 'id Tech 1 (Quake engine)',
        category: 'Classic Arena FPS',
        blurb: "The original Quake is where id Software's 0.022 m_yaw convention began — the same default value that Source, GoldSrc, and every id Tech generation since has carried forward.",
        faqs: [
            { q: 'Why do so many unrelated games share Quake\'s exact yaw value?', a: 'Because so many later engines (GoldSrc, Source, id Tech 2-7, and many licensed or open-source forks) either derived from or deliberately matched Quake\'s original m_yaw default — it became a de facto industry convention within that engine lineage.' },
        ],
    },
    {
        gameId: 'quakelive',
        displayName: 'Quake Live',
        engine: 'id Tech 3',
        category: 'Classic Arena FPS',
        blurb: "Quake Live is a browser/standalone-distributed version of Quake III Arena and keeps the exact same id Tech 3 engine and 0.022 m_yaw default.",
        faqs: [
            { q: 'Is Quake Live just Quake III Arena with a different name?', a: 'Essentially yes for sensitivity purposes — Quake Live runs on the same id Tech 3 engine, so the yaw and conversion are identical.' },
        ],
    },
    {
        gameId: 'quake4',
        displayName: 'Quake 4',
        engine: 'id Tech 4 (DOOM 3 engine)',
        category: 'Classic Arena FPS',
        blurb: "Quake 4 moved to id Tech 4 (the DOOM 3 engine), a full generation newer than Quake III's id Tech 3 — but it inherited the same m_yaw cvar convention, so we list it at 0.022 with slightly lower confidence than the id Tech 3 titles.",
        faqs: [
            { q: "Is Quake 4's yaw as certain as the original Quake or Quake III?", a: "Slightly less — Quake 4 runs on a different, newer engine generation (id Tech 4 vs id Tech 3), so while the m_yaw convention almost certainly carried over, it's not as directly confirmed as the id Tech 3 titles on this list." },
        ],
    },
    {
        gameId: 'splitgate2',
        displayName: 'Splitgate 2',
        engine: 'Unreal Engine 5',
        category: 'Arena Shooter',
        blurb: "Splitgate 2's yaw (0.01116) is a fresh, directly-reported value on Unreal Engine 5 — distinct from the original Splitgate's much lower-confidence, back-calculated number.",
        faqs: [
            { q: "Is Splitgate 2's sensitivity the same as the original Splitgate's?", a: "No — Splitgate 2 is a full engine rebuild on Unreal Engine 5 with its own yaw. Don't reuse your original Splitgate sensitivity without converting." },
        ],
    },
    {
        gameId: 'readyornot',
        displayName: 'Ready or Not',
        engine: 'Unreal Engine 4 (modified)',
        category: 'Tactical Shooter',
        blurb: "Ready or Not's yaw (0.011) is specific to this tactical shooter's modified Unreal Engine 4 build — its realistic, weighty aim model is reflected directly in this lower turn-rate value.",
        faqs: [
            { q: "Does Ready or Not's slower, tactical pace mean I need a different cm/360 than CS2?", a: 'The conversion keeps your physical mouse distance constant regardless of pace — many Ready or Not players do prefer a larger cm/360 for its deliberate, precision-focused gameplay, which is a personal choice on top of the base conversion.' },
        ],
    },
    {
        gameId: 'roboquest',
        displayName: 'Roboquest',
        engine: 'Unity',
        category: 'Roguelite Shooter',
        blurb: "Roboquest's reported yaw (0.00042) is notably lower than every other entry in our database and comes from a single source — treat any conversion involving Roboquest with extra caution until a second source confirms it.",
        faqs: [
            { q: "Why is Roboquest's yaw value so different from everything else on this list?", a: "It's an outlier we haven't been able to independently confirm — Unity games can use very different internal scaling than Source/id Tech titles, but until we find a second source, treat this conversion as a rough estimate only." },
        ],
    },
    {
        gameId: 'insurgency2014',
        displayName: 'Insurgency (2014)',
        engine: 'Source (CS:GO branch)',
        category: 'Tactical Shooter',
        blurb: "Insurgency (2014), the standalone sequel to a Source-engine Half-Life 2 mod, runs on the same up-to-date Source 1 branch as CS:GO and shares its 0.022 yaw.",
        faqs: [
            { q: 'Is this the same as Insurgency: Sandstorm?', a: 'No — Sandstorm is a separate sequel built on Unreal Engine 4 with its own distinct yaw (0.14). Do not confuse the two when converting.' },
        ],
    },
    {
        gameId: 'quake2',
        displayName: 'Quake II',
        engine: 'id Tech 2 (Quake II Engine)',
        category: 'Classic Arena FPS',
        blurb: 'Quake II is one of the original sources of the 0.022 m_yaw convention that the entire Source and id Tech engine family still uses today, from CS2 to TF2 to DOOM Eternal.',
        faqs: [
            {
                q: 'Why does Quake II share a yaw with modern games like CS2?',
                a: 'The 0.022 m_yaw default originated in id Software\'s Quake engines and was carried forward through GoldSrc, Source, and id Tech — Quake II\'s sensitivity converts 1:1 with any of them at the same DPI.',
            },
        ],
    },
    {
        gameId: 'payday2',
        displayName: 'Payday 2',
        engine: 'Diesel Engine',
        category: 'Co-op Heist Shooter',
        blurb: 'Payday 2 runs on Starbreeze\'s Diesel engine with its own 0.0156 yaw, sitting between the Source-family standard (0.022) and the CoD/Overwatch family (0.0066) — worth converting explicitly rather than assuming either.',
        faqs: [
            {
                q: 'Is Payday 2 sensitivity the same as Payday 3?',
                a: 'No — Payday 3 moved to Unreal Engine, a different engine with its own separate yaw. Use the converter above rather than copying your Payday 2 number directly.',
            },
        ],
    },
    {
        gameId: 'drg',
        displayName: 'Deep Rock Galactic',
        engine: 'Unreal Engine 4',
        category: 'Co-op Survival Shooter',
        blurb: 'Deep Rock Galactic uses a yaw of 0.0134 on Unreal Engine 4 — Unreal titles rescale mouse input per game, so this value is specific to DRG and does not carry over to other UE4/UE5 shooters without converting.',
        faqs: [
            {
                q: 'Does this sensitivity work for other Unreal Engine games too?',
                a: 'No — Unreal Engine developers rescale mouse input per title, so each game needs its own verified yaw. Deep Rock Galactic\'s 0.0134 is specific to this game; use the converter above when switching titles.',
            },
        ],
    },
    {
        gameId: 'bf2042',
        displayName: 'Battlefield 2042',
        engine: 'Frostbite',
        category: 'Battle Royale / Tactical Shooter',
        blurb: 'Battlefield 2042 runs on Frostbite, a completely different engine family from Source or id Tech — its listed yaw (0.022) is community-sourced but unverified against an authoritative technical source, unlike most Source-family titles on this list. Treat conversions to or from BF2042 as a solid starting point rather than an exact match.',
        faqs: [
            { q: "Is Battlefield 2042's yaw actually confirmed the same as CS2's?", a: 'Not with full confidence — both list 0.022, but Frostbite and Source are unrelated engines, so this could be coincidental rather than a shared convention. We flag BF2042 as our least-certain 0.022 entry.' },
        ],
    },
    {
        gameId: 'pubg',
        displayName: 'PUBG',
        engine: 'Unreal Engine 4',
        category: 'Battle Royale',
        blurb: "PUBG's sensitivity slider has been reported to scale non-linearly at extreme low and high settings, so its yaw (0.00707) works best as a mid-range approximation rather than an exact match at every point on the slider.",
        faqs: [
            { q: 'Why might my converted PUBG sensitivity feel slightly off at very high or low DPI?', a: "PUBG's sensitivity curve isn't perfectly linear at the extremes, so conversions are most accurate in the middle of the slider range — a small manual nudge may still be needed outside that." },
        ],
    },
    {
        gameId: 'quake',
        displayName: 'Quake / Source Engine',
        engine: 'id Tech / Source (generic)',
        category: 'Reference / Engine Family',
        blurb: 'This entry represents the shared 0.022 yaw convention used across the entire Source and id Tech engine family — pick it if you want to convert to or from that baseline directly rather than a specific title like CS2 or TF2.',
        faqs: [
            { q: "What's the difference between this and picking a specific game like CS2?", a: 'None mathematically — both use 0.022. This generic entry exists for converting to the engine-family baseline itself rather than one specific title.' },
        ],
    },
    {
        gameId: 'rust',
        displayName: 'Rust',
        engine: 'Unity (Facepunch)',
        category: 'Survival',
        blurb: "Rust's yaw (0.11247) is on the higher end of this list, closer to Roblox and Risk of Rain 2 than to tactical shooters — expect small in-game sensitivity numbers to translate into large physical cm/360 distances.",
        faqs: [
            { q: 'Why does Rust need such a low sensitivity number for the same cm/360 as CS2?', a: "Rust's yaw is roughly 5x higher than CS2's, so a much smaller in-game slider value produces the same physical mouse distance per 360° turn." },
        ],
    },
    {
        gameId: 'deadlock',
        displayName: 'Deadlock',
        engine: 'Source 2',
        category: 'Hero Shooter',
        blurb: "Deadlock runs on Source 2, the same engine generation as CS2, and shares its 0.022 yaw — a natural fit if you're splitting time between Valve's two current competitive titles.",
        faqs: [
            { q: 'Does my CS2 sensitivity carry over directly to Deadlock?', a: 'Yes — both run on Source 2 with the same 0.022 yaw, so the same sensitivity and DPI gives you an identical cm/360 in both games.' },
        ],
    },
    {
        gameId: 'tarkov',
        displayName: 'Escape from Tarkov',
        engine: 'Unity (Battlestate Games)',
        category: 'Extraction Shooter',
        blurb: "Escape from Tarkov's yaw (0.113636) reflects Unity's turn-rate scale rather than a Source/id Tech convention — combined with its complex per-scope ADS system, treat hipfire conversion as a starting point, not the full picture.",
        faqs: [
            { q: 'Does this account for aiming down sights on different Tarkov optics?', a: "No — this converts hipfire turn rate only. Tarkov's wide range of scopes and their individual zoom multipliers still need separate in-game tuning." },
        ],
    },
    {
        gameId: 'insurgency',
        displayName: 'Insurgency: Sandstorm',
        engine: 'Unreal Engine 4',
        category: 'Tactical Shooter',
        blurb: "Insurgency: Sandstorm's yaw (0.14) is specific to this title — Unreal Engine developers rescale mouse input per game, so this value doesn't carry over to other UE4 titles without converting explicitly.",
        faqs: [
            { q: 'Does this work for the original 2014 Insurgency too?', a: 'No — use the separate Insurgency (2014) entry. That title runs on the Source engine (0.022), a completely different value from Sandstorm\'s Unreal Engine 4 build.' },
        ],
    },
    {
        gameId: 'squad',
        displayName: 'Squad',
        engine: 'Unreal Engine 4',
        category: 'Milsim / Tactical Shooter',
        blurb: "Squad's large-scale combined-arms combat runs on Unreal Engine 4 with its own yaw (0.175) — noticeably higher than most tactical shooters, so expect a smaller converted sensitivity number than you'd use in CS2 or Valorant.",
        faqs: [
            { q: "Is Squad's sensitivity the same as Squad 44's?", a: "Not confirmed — Squad 44 (formerly Post Scriptum) is a related but separate title without a verified yaw in our data, so don't assume a 1:1 match." },
        ],
    },
    {
        gameId: 'dayz',
        displayName: 'DayZ',
        engine: 'Enfusion (Bohemia Interactive)',
        category: 'Survival',
        blurb: "DayZ's yaw (0.179) sits close to Squad and ARK on this list — all reflect the more permissive turn-rate scaling common in survival and milsim titles compared to tight competitive shooters.",
        faqs: [
            { q: "Does DayZ's sensitivity match ARMA's, since both are made by Bohemia?", a: "Not necessarily — DayZ moved to the newer Enfusion engine, which can rescale input differently than ARMA's older Real Virtuality engine. Convert explicitly rather than assuming a shared value." },
        ],
    },
    {
        gameId: 'warframe',
        displayName: 'Warframe',
        engine: 'Evolution Engine (Digital Extremes)',
        category: 'Looter Shooter',
        blurb: "Warframe's yaw (0.014) sits closer to the Call of Duty/Overwatch 2 family than to Source-engine titles — worth double-checking explicitly if you're switching from CS2 or Apex for Warframe's fast-paced parkour combat.",
        faqs: [
            { q: 'Does Warframe\'s fast movement mean I need a different sensitivity than other shooters?', a: 'The conversion keeps your physical cm/360 constant regardless of game speed — many Warframe players do prefer a faster feel for parkour, which means intentionally choosing a smaller cm/360 rather than assuming the converted value is automatically best.' },
        ],
    },
    {
        gameId: 'arksurvival',
        displayName: 'ARK: Survival Evolved',
        engine: 'Unreal Engine 4',
        category: 'Survival',
        blurb: "ARK's yaw (0.175) is a single-source approximation, and ARK's sensitivity is also known to scale with FOV — treat the converted value as a solid starting point rather than an exact match.",
        faqs: [
            { q: 'Why might ARK sensitivity still feel off after converting?', a: "ARK's sensitivity interacts with your FOV setting in ways a fixed yaw doesn't fully capture — a small manual adjustment after changing FOV is normal." },
        ],
    },
    {
        gameId: 'diabotical',
        displayName: 'Diabotical',
        engine: 'Custom (id Tech-inspired)',
        category: 'Arena Shooter',
        blurb: "Diabotical's yaw (0.01667) was cross-referenced against KovaaK's Sensitivity Matcher source code — an independent technical source, not just a converter-site aggregator — making it one of the more confidently sourced non-Source-engine values on this list.",
        faqs: [
            { q: "Is Diabotical's yaw close to Quake's, given both are arena shooters?", a: "No — despite the genre similarity, Diabotical's 0.01667 is notably different from Quake's 0.022, confirming they don't share the same underlying engine convention." },
        ],
    },
    {
        gameId: 'riskofrain2',
        displayName: 'Risk of Rain 2',
        engine: 'Unity Engine',
        category: 'Roguelite Shooter',
        blurb: 'Risk of Rain 2 uses a notably high yaw (0.5) on Unity, similar in scale to Minecraft and Roblox — expect the converted sensitivity number to look small compared to CS2 or Valorant at the same physical cm/360.',
        faqs: [
            {
                q: 'Why does my converted Risk of Rain 2 sensitivity look so low?',
                a: 'Risk of Rain 2\'s yaw (0.5) is roughly 22x higher than CS2\'s (0.022), so the same physical mouse movement needs a much smaller in-game number to match — that is expected, not an error.',
            },
        ],
    },
    {
        gameId: 'deltaforce',
        displayName: 'Delta Force',
        engine: 'Unreal Engine 5',
        category: 'Tactical Shooter',
        blurb: 'Delta Force runs on an optimized branch of Unreal Engine 5, using the standard Unreal yaw multiplier (0.005555) — the same value as Fortnite. That means a much larger in-game sensitivity number is needed to match the same physical cm/360 as Source-engine games like CS2.',
        faqs: [
            {
                q: 'What DPI and sensitivity should I use in Delta Force?',
                a: 'Delta Force shares its yaw constant with Fortnite (0.005555), so converting from a Source-engine game like CS2 will produce a noticeably higher in-game sensitivity number for the same physical mouse movement — that is expected, not an error.',
            },
            {
                q: 'Does Delta Force sensitivity differ between Hazard Operations and Havoc Warfare?',
                a: 'No — the core mouse yaw is the same across both modes; only aim-down-sights (ADS) multipliers per weapon/scope change, the same way they do in most modern shooters.',
            },
        ],
    },
    {
        gameId: 'arcraiders',
        displayName: 'Arc Raiders',
        engine: 'Unreal Engine 5 (modified, with NVIDIA)',
        category: 'Extraction Shooter',
        blurb: 'Arc Raiders runs on a heavily customized Unreal Engine 5 build co-developed with NVIDIA — Embark skipped Lumen and Nanite in favor of a performance-first pipeline. Its yaw (0.0066) puts it in the Call of Duty / Overwatch 2 / Destiny 2 conversion family rather than the lower Fortnite/UE-default value, despite also running on Unreal.',
        faqs: [
            {
                q: 'Does Arc Raiders use the standard Unreal Engine sensitivity scale?',
                a: 'No — even though it runs on Unreal Engine 5, Embark tuned Arc Raiders to a 0.0066 yaw (the CoD/Overwatch 2/Destiny 2 family) rather than the 0.005555 default that other Unreal titles like Fortnite and Delta Force use. Always convert per-game rather than assuming "Unreal Engine" implies one fixed value.',
            },
            {
                q: 'Does this cover aiming down sights on different scopes?',
                a: 'This converts hipfire/turn sensitivity via cm/360. Arc Raiders applies its own ADS multiplier per weapon and scope, which still needs separate in-game tuning.',
            },
        ],
    },
    {
        gameId: 'marathon',
        displayName: 'Marathon',
        engine: 'Tiger Engine (Bungie, evolved blam! engine)',
        category: 'Extraction Shooter',
        blurb: "Marathon runs on Bungie's Tiger Engine, the same evolved blam! engine lineage that powers Destiny 2 — which is exactly why both share the same 0.0066 yaw. If you already have a cm/360 dialed in from Destiny 2, it carries over to Marathon with no conversion needed.",
        faqs: [
            {
                q: 'Does my Destiny 2 sensitivity transfer to Marathon?',
                a: "Yes for hipfire — both run on Bungie's Tiger Engine lineage and share the same 0.0066 yaw, so the same sensitivity and DPI produces an identical cm/360 in both games.",
            },
        ],
    },
    {
        gameId: 'farlight84',
        displayName: 'Farlight 84',
        engine: 'Unreal Engine 4',
        category: 'Battle Royale',
        blurb: 'Farlight 84 runs on Unreal Engine 4 and uses the standard Unreal yaw multiplier (0.005555) — the same value as Fortnite and Delta Force — so converting from a Source-engine game like CS2 produces a noticeably larger in-game sensitivity number for the same physical cm/360.',
        faqs: [
            {
                q: 'Why does my Farlight 84 sensitivity number look so much bigger than CS2?',
                a: "Farlight 84 shares its yaw constant (0.005555) with Fortnite and Delta Force, roughly 4x lower than CS2's 0.022 — the same physical mouse movement needs a proportionally larger in-game number. That is expected, not an error.",
            },
        ],
    },
    {
        gameId: 'repo',
        displayName: 'R.E.P.O.',
        engine: 'Unity',
        category: 'Co-op Extraction Horror',
        blurb: "R.E.P.O. is built in Unity by Swedish studio Semiwork, their first multiplayer title. Its listed yaw (0.022) happens to land on the same Source-engine-style convention as CS2 and Apex, even though the underlying engine and genre — physics-based co-op horror extraction — are completely different.",
        faqs: [
            {
                q: "Does R.E.P.O.'s physics-based grabbing affect the sensitivity conversion?",
                a: 'No — camera/aim sensitivity and the physics-based object-grabbing controls are handled separately. This converter only applies to your camera turn rate, not how objects are picked up or carried.',
            },
        ],
    },
    {
        gameId: 'peak',
        displayName: 'PEAK',
        engine: 'Unity',
        category: 'Co-op Climbing',
        blurb: "PEAK, the co-op climbing game from Aggro Crab and Landfall Games, runs on Unity. Its yaw (0.022) matches the Source-engine convention used by CS2 and Apex, so if you already have a cm/360 you like from a Source-family shooter, the same DPI and sensitivity number will feel identical here.",
        faqs: [
            {
                q: 'Does climbing movement in PEAK change how sensitivity feels?',
                a: 'No — the camera yaw works the same as any first-person title. Climbing physics and stamina affect movement speed and camera shake, not the underlying turn-rate math.',
            },
        ],
    },
    {
        gameId: 'fragpunk',
        displayName: 'FragPunk',
        engine: 'Unreal Engine 5',
        category: 'Hero Shooter',
        blurb: 'FragPunk runs on Unreal Engine 5 with Lumen, Virtual Shadows, and Nanite disabled for performance — a common choice for competitive UE5 shooters. It uses the standard Unreal yaw multiplier (0.005555), the same value as Fortnite and Delta Force, so expect a larger in-game sensitivity number than you would use in CS2 for the same cm/360.',
        faqs: [
            {
                q: "Do FragPunk's Shard cards (round-modifier powerups) change sensitivity?",
                a: 'No — Shard cards alter weapon behavior, movement, and round rules, not the base mouse yaw. Your converted sensitivity stays the same regardless of which cards are active.',
            },
        ],
    },
    {
        gameId: 'combatmaster',
        displayName: 'Combat Master',
        engine: 'Unity',
        category: 'Tactical Shooter',
        blurb: 'Combat Master, developed by Alfa Bravo and originally a mobile-only release before coming to PC, runs on Unity. Its yaw (0.022) lands on the same Source-engine-style convention as CS2 and Apex despite the different engine, so sensitivity converts 1:1 at the same DPI.',
        faqs: [
            {
                q: 'Can I use my CS2 sensitivity directly in Combat Master?',
                a: 'Yes for hipfire — both list a 0.022 yaw, so the same sensitivity and DPI give you the same cm/360 even though Combat Master runs on Unity rather than Source.',
            },
        ],
    },
    {
        gameId: 'bloodstrike',
        displayName: 'Blood Strike',
        engine: 'Proprietary (NetEase in-house engine)',
        category: 'Battle Royale',
        blurb: "Blood Strike runs on a proprietary NetEase in-house engine rather than Unreal or Unity — NetEase has not publicly confirmed which specific internal engine powers this title. Its yaw (0.005555) matches the standard Unreal convention used by Fortnite and Delta Force, so treat the conversion itself as reliable while noting the engine detail is closed-source.",
        faqs: [
            {
                q: 'Why does Blood Strike need a much higher sensitivity number than CS2 for the same feel?',
                a: "Blood Strike's yaw (0.005555) is roughly 4x lower than CS2's (0.022), so a larger in-game sensitivity value is needed to produce the same physical cm/360 — that is expected, not an error.",
            },
        ],
    },
    {
        gameId: 'strinova',
        displayName: 'Strinova',
        engine: 'Unreal Engine 4',
        category: 'Tactical Shooter',
        blurb: "Strinova, the anime-styled 5v5 tactical shooter from Day1 Studio, runs on Unreal Engine 4. It uses the standard Unreal yaw multiplier (0.005555), the same value as Fortnite, so a Source-engine sensitivity from CS2 or Apex needs the converter above rather than a direct copy.",
        faqs: [
            {
                q: "Does Strinova's 2D \"stringification\" mechanic affect sensitivity?",
                a: 'No — switching between the 3D and flattened 2D forms changes collision and movement, not the camera yaw. Your converted sensitivity applies the same in both states.',
            },
        ],
    },
    {
        gameId: 'seaofthieves',
        displayName: 'Sea of Thieves',
        engine: 'Unreal Engine 4',
        category: 'Action-Adventure',
        blurb: "Sea of Thieves runs on Unreal Engine 4 — Rare has said publicly it has no near-term plan to move to UE5 given how much bespoke tooling the game relies on. Its yaw (0.005555) matches the standard Unreal default shared with Fortnite and Delta Force.",
        faqs: [
            {
                q: 'Does aiming on a moving ship affect the sensitivity conversion?',
                a: "No — the underlying camera yaw is constant whether you're on solid ground or a rocking ship deck. Any perceived difference comes from the ship's motion adding to your view, not a change in mouse sensitivity itself.",
            },
        ],
    },
    {
        gameId: 'deadbydaylight',
        displayName: 'Dead by Daylight',
        engine: 'Unreal Engine 5 (originally Unreal Engine 4)',
        category: 'Asymmetric Horror',
        blurb: 'Dead by Daylight launched on Unreal Engine 4 in 2016 and migrated to Unreal Engine 5 in 2024. Its yaw (0.005555) matches the standard Unreal default used by Fortnite and Delta Force, so a Source-engine sensitivity from CS2 needs converting rather than copying directly.',
        faqs: [
            {
                q: 'Do Killers and Survivors use the same sensitivity conversion?',
                a: 'Yes — the base camera yaw is shared across both roles. Killer power add-ons and Survivor perks can add situational camera effects, but they do not change the underlying turn-rate math.',
            },
        ],
    },
    {
        gameId: 'ultrakill',
        displayName: 'Ultrakill',
        engine: 'Unity',
        category: 'Boomer Shooter',
        blurb: 'Ultrakill runs on Unity (currently on the 2022 LTS branch) and lists a 0.022 yaw, the same Source-engine-style convention as CS2 and Apex — convenient if you split time between Ultrakill and any Source-family competitive shooter.',
        faqs: [
            {
                q: "Does Ultrakill's fast movement (dashing, wall-jumping) mean I need a different cm/360?",
                a: 'The conversion keeps your physical mouse distance constant regardless of movement speed — many Ultrakill players do prefer a smaller cm/360 (higher sensitivity) for its acrobatic combat, but that is a personal preference layered on top of the base conversion, not a requirement.',
            },
        ],
    },
    {
        gameId: 'enlisted',
        displayName: 'Enlisted',
        engine: 'Dagor Engine',
        category: 'Milsim / Tactical Shooter',
        blurb: "Enlisted runs on Gaijin Entertainment's Dagor Engine — the same engine that powers War Thunder — built by developer Darkflow Software. Its yaw (0.0175) matches Helldivers 2, Battalion 1944, and Fallout 76 numerically, though none of those titles share an engine lineage with Enlisted.",
        faqs: [
            {
                q: 'Does controlling AI squadmates in Enlisted affect my personal sensitivity?',
                a: "No — squad orders and AI soldier control are separate systems from your own camera aim. The yaw conversion only applies to your own character's look sensitivity.",
            },
        ],
    },
    {
        gameId: 'crossfire',
        displayName: 'CrossFire',
        engine: 'Lithtech Jupiter EX',
        category: 'Tactical Shooter',
        blurb: "The long-running CrossFire, Smilegate's globally popular tactical shooter (especially across Asia), runs on a modified Lithtech Jupiter EX engine — distinct from the Unreal Engine builds used by newer franchise spin-offs like CrossfireX and the upcoming CrossFire AAA project. Its listed yaw (0.022) matches the Source-engine convention used by CS2 and Apex.",
        faqs: [
            {
                q: 'Is this the same as CrossfireX or the new CrossFire AAA game?',
                a: 'No — this entry covers the original long-running CrossFire PC title on Lithtech Jupiter EX. CrossfireX (Unreal Engine 4/Northlight) and the upcoming CrossFire AAA project (Unreal Engine 5) are separate titles that may use different sensitivity scaling.',
            },
        ],
    },
];

export function getSensFinderContent(gameId: string): SensFinderGameContent | undefined {
    return sensFinderContent.find((g) => g.gameId === gameId);
}
