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
    // UNVERIFIED: single-source figures, not yet cross-checked against a
    // second independent converter. Treat as a reasonable starting point,
    // not confirmed truth — same caveat as bf2042/pubg above.
    { id: 'halo', name: 'Halo Infinite', yaw: 0.02 },
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
];
