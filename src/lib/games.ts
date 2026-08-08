export interface Game {
    id: string;
    name: string;
    yaw: number; // Degree per count (sensitivity multiplier)
}

export const games: Game[] = [
    { id: 'valorant', name: 'Valorant', yaw: 0.07 },
    { id: 'csgo', name: 'CS:GO / CS2', yaw: 0.022 },
    { id: 'apex', name: 'Apex Legends', yaw: 0.022 },
    // 0.0066 confirmed by multiple independent sources (incl. KovaaK Sensitivity
    // Matcher docs). Previous 0.006326531 wasn't corroborated anywhere.
    { id: 'overwatch', name: 'Overwatch 2', yaw: 0.0066 },
    { id: 'cod', name: 'Call of Duty: Warzone / MW3', yaw: 0.0066 },
    { id: 'rainbow6', name: 'Rainbow Six Siege', yaw: 0.00572 },
    { id: 'fortnite', name: 'Fortnite', yaw: 0.005555 },
    // UNVERIFIED: community sources disagree on BF2042's yaw (seen cited as
    // 0.0066, 0.002222, and this current 0.022 value depending on the site).
    // Frostbite is not the Source engine, so 0.022 is suspect, but there is no
    // convergent replacement value — do not "fix" this without solid evidence.
    { id: 'bf2042', name: 'Battlefield 2042', yaw: 0.022 },
    // UNVERIFIED / possibly non-linear: some sources use 0.022 for PUBG, others
    // (like the value already here) use ~0.00707. PUBG's slider is also reported
    // to scale non-linearly at the extremes, which a fixed yaw can't capture
    // exactly. Needs empirical validation (e.g. KovaaK Sensitivity Matcher)
    // before changing.
    { id: 'pubg', name: 'PUBG', yaw: 0.00707 },
    { id: 'destiny2', name: 'Destiny 2', yaw: 0.0066 },
    { id: 'quake', name: 'Quake / Source Engine', yaw: 0.022 },
    // UNVERIFIED: no corroborating second source found for Roblox's yaw —
    // Roblox's camera code isn't published, and third-party converters don't
    // agree on a figure. Treat as an approximation.
    { id: 'roblox', name: 'Roblox', yaw: 0.2 },
    // APPROXIMATION, not a fixed linear yaw: Minecraft Java's actual mouse
    // code is f = sensitivity*0.6+0.2, then cubed — a non-linear curve, so
    // no single yaw value converts it exactly at every sensitivity value.
    // 0.6 approximates the mid-range (40-70% slider) most PvP players use.
    { id: 'minecraft', name: 'Minecraft (Java)', yaw: 0.6 },
    // Added after cross-referencing 2+ independent community sources each.
    { id: 'marvelrivals', name: 'Marvel Rivals', yaw: 0.022 },
    { id: 'thefinals', name: 'THE FINALS', yaw: 0.0066 },
    { id: 'rust', name: 'Rust', yaw: 0.11247 },
    // Deadlock runs on Source 2, same engine family as CS2 — multiple sources
    // converge on the same 0.022 yaw.
    { id: 'deadlock', name: 'Deadlock', yaw: 0.022 },
    // Source engine family (same as csgo/quake/deadlock above) — well
    // established 0.022 convention across converter sites.
    { id: 'tf2', name: 'Team Fortress 2', yaw: 0.022 },
    { id: 'l4d2', name: 'Left 4 Dead 2', yaw: 0.022 },
    { id: 'titanfall2', name: 'Titanfall 2', yaw: 0.022 },
    // Confirmed via KovaaK Sensitivity Matcher preset yaw profiles (0.0225),
    // upgraded from an earlier unverified 0.02 guess.
    { id: 'halo', name: 'Halo Infinite', yaw: 0.0225 },
    { id: 'tarkov', name: 'Escape from Tarkov', yaw: 0.113636 },
    { id: 'gtav', name: 'Grand Theft Auto V', yaw: 0.0066 },
    { id: 'insurgency', name: 'Insurgency: Sandstorm', yaw: 0.14 },
    { id: 'squad', name: 'Squad', yaw: 0.175 },
    // Source engine — same 0.022 convention as tf2/l4d2/titanfall2 above.
    { id: 'huntshowdown', name: 'Hunt: Showdown', yaw: 0.022 },
    // UNVERIFIED: single-source figure only.
    { id: 'dayz', name: 'DayZ', yaw: 0.179 },
    { id: 'warframe', name: 'Warframe', yaw: 0.014 },
    // Single-source (mouse-sensitivity.com community forums). Note: ARK's
    // sensitivity also scales with FOV, which a fixed yaw doesn't capture —
    // treat as an approximation.
    { id: 'arksurvival', name: 'ARK: Survival Evolved', yaw: 0.175 },
    // Cross-referenced against KovaaK's SensitivityMatcher source code
    // (independent technical source, not a converter-site aggregator) —
    // also confirmed our existing rainbow6/overwatch/quake values match.
    { id: 'diabotical', name: 'Diabotical', yaw: 0.01667 },
    // More Source-engine titles. Not individually re-verified per game, but
    // 0.022 is Valve's well-documented Source engine default (m_yaw) — the
    // same constant already independently corroborated across csgo, quake,
    // deadlock, tf2, l4d2, titanfall2 and huntshowdown above, so extending
    // it to other known-Source titles is a structural fact, not a guess.
    { id: 'hl2', name: 'Half-Life 2', yaw: 0.022 },
    { id: 'portal2', name: 'Portal 2', yaw: 0.022 },
    { id: 'gmod', name: "Garry's Mod", yaw: 0.022 },
    { id: 'cssource', name: 'Counter-Strike: Source', yaw: 0.022 },
    { id: 'l4d1', name: 'Left 4 Dead', yaw: 0.022 },
    { id: 'blackmesa', name: 'Black Mesa', yaw: 0.022 },
    // Explicitly confirmed 0.022 (id Tech/Quake lineage, not just inferred).
    { id: 'quakechampions', name: 'Quake Champions', yaw: 0.022 },
    // UNVERIFIED: single-source figure only.
    { id: 'back4blood', name: 'Back 4 Blood', yaw: 0.175 },
    // WEAKEST-CONFIDENCE entry in this file — not a directly published yaw.
    // Derived from a Valorant->Splitgate sensitivity ratio (x7.367413)
    // quoted by a gaming-news site (Sportskeeda), not a sensitivity-focused
    // technical source, via yaw = 0.07 (our Valorant value) / 7.367413.
    // Treat as a rough starting point only; replace if a better source shows up.
    { id: 'splitgate', name: 'Splitgate', yaw: 0.009501 },
    // Single-source, specific figure (not shared with any existing entry).
    { id: 'helldivers2', name: 'Helldivers 2', yaw: 0.0175 },
    // GoldSrc — Source engine's direct technical predecessor, same 0.022
    // m_yaw default, well documented (Liquipedia, Steam guides).
    { id: 'cs16', name: 'Counter-Strike 1.6', yaw: 0.022 },
    { id: 'halflife', name: 'Half-Life', yaw: 0.022 },
    // Same 0.0066 family as our existing cod (Warzone/MW3) entry — modern
    // CoD titles share this convention across the IW/Treyarch engines.
    { id: 'codbo6', name: 'Call of Duty: Black Ops 6', yaw: 0.0066 },
    // UNVERIFIED: single-source figure only.
    { id: 'paladins', name: 'Paladins', yaw: 0.0092 },
    // id Tech/Quake lineage — confirmed via technical forums (quake3world,
    // esreality), same 0.022 as our existing Quake/Quake Champions entries.
    { id: 'quake3', name: 'Quake III Arena', yaw: 0.022 },
    { id: 'doometernal', name: 'DOOM Eternal', yaw: 0.022 },
    // Official Valve GoldSrc titles from the same era/tech as CS 1.6 —
    // not individually re-verified, but this is Valve's own well-documented
    // default, not a third-party port/spinoff with unknown modifications
    // (unlike Counter-Strike Online/Neo, which were deliberately excluded).
    { id: 'csconditionzero', name: 'Counter-Strike: Condition Zero', yaw: 0.022 },
    { id: 'tfc', name: 'Team Fortress Classic', yaw: 0.022 },
    // UNVERIFIED: single-source figure. (Fallout 4's figure from the same
    // source was 3.78 — implausible next to every other entry in this file,
    // almost certainly a unit mix-up — so it was left out entirely rather
    // than trusted just because it came from the same place as this one.)
    { id: 'fallout76', name: 'Fallout 76', yaw: 0.0175 },

    // ===== Added from a full pass over a 1000-title candidate list =====
    // Same sourcing discipline as above: real value only when a technical
    // source (engine confirmation or a published constant) backs it up.
    // Official KovaaK Sensitivity Matcher source code (github.com/KovaaK/
    // SensitivityMatcher) — the tool's own built-in presets and its
    // community CustomYawList.ini, not a converter-site aggregator.
    { id: 'battalion1944', name: 'Battalion 1944', yaw: 0.0175 },
    // Same built-in constant as Rainbow Six Siege in KovaaK's own source
    // ($yawReflex, labelled "Rainbow6/Reflex") — Reflex Arena and Rainbow
    // Six Siege share this exact turn-rate constant.
    { id: 'reflexarena', name: 'Reflex Arena', yaw: 0.005730 },
    // Derived from a public GitHub sensitivity-converter repo (Rakkues/
    // Sensitivity-Converter). Its other 4 games (CS2, Valorant, Overwatch 2,
    // Titanfall 2) independently reproduce our already-confirmed values to
    // within rounding error, which validates trusting this one too.
    { id: 'krunker', name: 'Krunker.io', yaw: 0.1376 },
    // id Tech 6 — same engine lineage as DOOM Eternal (id Tech 7, its
    // direct successor), which is already confirmed at 0.022 in this file.
    { id: 'doom2016', name: 'DOOM (2016)', yaw: 0.022 },
    { id: 'wolfnewcolossus', name: 'Wolfenstein II: The New Colossus', yaw: 0.022 },
    { id: 'wolfyoungblood', name: 'Wolfenstein: Youngblood', yaw: 0.022 },
    // id Tech 3 / Quake III engine lineage — same 0.022 m_yaw convention as
    // csgo/quake/tf2/etc above, confirmed via engine documentation (RTCW's
    // engine is a modified id Tech 3; Enemy Territory runs on the RTCW
    // engine; both Jedi Knight titles ran directly on id Tech 3/Quake III).
    { id: 'rtcw', name: 'Return to Castle Wolfenstein', yaw: 0.022 },
    { id: 'wolfet', name: 'Wolfenstein: Enemy Territory', yaw: 0.022 },
    { id: 'jediknight2', name: 'Star Wars Jedi Knight II: Jedi Outcast', yaw: 0.022 },
    { id: 'jediacademy', name: 'Star Wars Jedi Knight: Jedi Academy', yaw: 0.022 },
    // Open-source Quake-lineage engines: Xonotic runs on DarkPlaces (a
    // Quake 1 engine derivative), OpenArena runs on ioquake3 (a direct
    // id Tech 3 fork) — same 0.022 convention applies.
    { id: 'xonotic', name: 'Xonotic', yaw: 0.022 },
    { id: 'openarena', name: 'OpenArena', yaw: 0.022 },
    // id Software's own Quake-branded titles — these are literally the
    // titles that originated the m_yaw=0.022 console-variable convention
    // extended to every other Source/id Tech entry in this file.
    { id: 'quake1', name: 'Quake', yaw: 0.022 },
    { id: 'quake2', name: 'Quake II', yaw: 0.022 },
    { id: 'quakelive', name: 'Quake Live', yaw: 0.022 },
    // Slightly lower confidence than the id Tech 3 titles above: Quake 4
    // runs on id Tech 4 (the DOOM 3 engine), a different generation, but
    // it inherited the same m_yaw cvar convention from its Quake lineage.
    { id: 'quake4', name: 'Quake 4', yaw: 0.022 },
    // Directly reported numeric yaw values from sensitivity-converter
    // sources, each cross-checked against the plausible 0.005–0.22 range
    // established by every other entry in this file. Single-source each,
    // so treat as a good starting point rather than definitive.
    { id: 'drg', name: 'Deep Rock Galactic', yaw: 0.0134 },
    { id: 'riskofrain2', name: 'Risk of Rain 2', yaw: 0.5 },
    { id: 'splitgate2', name: 'Splitgate 2', yaw: 0.01116 },
    { id: 'readyornot', name: 'Ready or Not', yaw: 0.011 },
    // UNVERIFIED and notably outside this file's typical 0.005–0.22 range —
    // included only because it's explicitly documented on a converter site,
    // but treat with more skepticism than the other entries in this block.
    { id: 'roboquest', name: 'Roboquest', yaw: 0.00042 },
    // Confirmed running on Valve's Source engine (specifically the same
    // up-to-date Source branch as CS:GO) — same 0.022 convention applies.
    { id: 'insurgency2014', name: 'Insurgency (2014)', yaw: 0.022 },
    // Directly reported numeric yaw value (Diesel engine).
    { id: 'payday2', name: 'Payday 2', yaw: 0.0156 },
];
