export interface ConvertFaq {
    q: string;
    a: string;
}

export interface ConvertSection {
    heading: string;
    body: string;
}

export interface ConvertPair {
    slug: string;
    fromId: string;
    toId: string;
    fromLabel: string;
    toLabel: string;
    defaultSens: number;
    defaultDpi: number;
    intro: string;
    sections: ConvertSection[];
    faqs: ConvertFaq[];
    relatedBlogSlug?: string;
}

export const convertPairs: ConvertPair[] = [
    {
        slug: 'valorant-to-cs2',
        fromId: 'valorant',
        toId: 'csgo',
        fromLabel: 'Valorant',
        toLabel: 'CS2',
        defaultSens: 0.4,
        defaultDpi: 800,
        intro: "Valorant and CS2 use completely different yaw constants — Valorant turns your camera 0.07° per mouse count, CS2 (Source engine) turns it only 0.022° per count. That's why a Valorant sensitivity of 0.4 becomes roughly 1.27 in CS2: the ratio between the two engines is fixed at 3.1818, so your physical cm/360 (how far you physically move the mouse for a full turn) stays identical no matter what number appears on screen.",
        sections: [
            {
                heading: 'Should You Change Your DPI When Switching?',
                body: "No — keep your mouse DPI exactly the same and only change the in-game sensitivity number. DPI is a hardware setting (how many counts your sensor reports per inch of physical movement); yaw is a software setting (how many degrees the camera rotates per count). Changing DPI on top of the sensitivity conversion just adds a second variable to track for no benefit. The one exception: if your DPI is below 400 or above 3200, consider standardizing to something in that range first in both games — sensor tracking quality degrades at the extremes on most mice, and it makes your cm/360 easier to reason about later.",
            },
        ],
        faqs: [
            {
                q: 'Why is my CS2 sensitivity number so much lower than my Valorant one?',
                a: "Because CS2's Source engine yaw (0.022° per count) is roughly a third of Valorant's (0.07° per count). A lower on-screen number in CS2 is not a lower physical sensitivity — it's compensating for the engine's finer-grained rotation per count. Your actual hand movement for a 360° turn is the same in both games if you use the converted value.",
            },
            {
                q: 'Does this also work for CS:GO, not just CS2?',
                a: "Yes. CS:GO and CS2 share the same Source-family 0.022 yaw constant, so this conversion is identical for either game.",
            },
            {
                q: "What about Valorant's Operator or CS2's AWP scope sensitivity?",
                a: "Scope/ADS sensitivity uses a separate multiplier that this converter doesn't touch — see the free scope calculator below.",
            },
        ],
        relatedBlogSlug: 'valorant-to-cs2-sensitivity',
    },
    {
        slug: 'cs2-to-valorant',
        fromId: 'csgo',
        toId: 'valorant',
        fromLabel: 'CS2',
        toLabel: 'Valorant',
        defaultSens: 2.0,
        defaultDpi: 800,
        intro: "Coming from CS2 into Valorant, the math runs the other way: Riot's engine turns the camera 0.07° per count against Source's 0.022°, so your CS2 sensitivity gets multiplied by roughly 0.3143 to land on the equivalent Valorant number. If you're used to a CS2 sens like 2.0, don't be surprised to see something like 0.628 come out the other end — it looks tiny, but it preserves the exact same physical cm/360 you already have muscle memory for.",
        sections: [
            {
                heading: 'Why Your Valorant Sensitivity Number Looks So Small',
                body: "CS2 sensitivities commonly sit between 1.5 and 3.5 because Source's yaw constant is small (0.022°/count), which means the sensitivity number has to be proportionally larger to produce a normal turn speed. Valorant's yaw is over 3x larger (0.07°/count), so the equivalent number is proportionally smaller — most converted values land between 0.25 and 0.6. This is expected and correct; a small number in Valorant is not a slower mouse, it's just a different scale.",
            },
            {
                heading: 'CS:GO Sensitivity Also Works — Same Yaw as CS2',
                body: "If you're switching from CS:GO rather than CS2 specifically, use the exact same conversion — both games share the identical Source-engine 0.022 yaw constant, so there's no separate CS:GO-to-Valorant math needed.",
            },
        ],
        faqs: [
            {
                q: 'My converted Valorant sensitivity is under 0.3 — is that normal?',
                a: "Yes, if you play CS2 at a mid-to-high sensitivity (2.0+), a converted Valorant value under 0.3 is expected. Valorant's in-game slider supports values well below 0.3, and pros like TenZ play in that exact range.",
            },
            {
                q: 'Should I lower my DPI instead of using a tiny sensitivity number?',
                a: "Not necessary. Sensor tracking is fine anywhere from 400–1600 DPI on a modern sensor, and a low in-game sensitivity number doesn't cost you precision the way a very low DPI setting theoretically could.",
            },
        ],
        relatedBlogSlug: 'cs2-to-valorant-sensitivity-converter-guide',
    },
    {
        slug: 'apex-to-valorant',
        fromId: 'apex',
        toId: 'valorant',
        fromLabel: 'Apex Legends',
        toLabel: 'Valorant',
        defaultSens: 3.0,
        defaultDpi: 800,
        intro: "Apex Legends runs on Source engine (0.022° yaw per count, same family as CS2), while Valorant's yaw is 0.07° per count — over 3x larger. Converting from Apex to Valorant multiplies your sensitivity by roughly 0.3143, the same ratio used for CS2-to-Valorant, because Apex and CS2 share an identical yaw constant. If your Apex sens is 3.0, expect something close to 0.94 in Valorant to preserve the same physical cm/360.",
        sections: [
            {
                heading: 'Apex Uses Per-Optic ADS. Valorant Uses One Multiplier.',
                body: "One real difference between the two games shows up only when you aim down sights: Apex scales sensitivity separately for every optic (1x, 2x, 3x, up to 10x sniper scopes each get their own multiplier), while Valorant uses a single Zoom Sensitivity Multiplier for all scoped weapons. Your hipfire conversion above is unaffected by this — it's purely a scoped-aiming difference, and it's why Apex players often notice ADS feels more tunable game-to-game than in Valorant.",
            },
            {
                heading: 'Coming From Movement Shooter to Tactical: Expect to Go Lower',
                body: "Apex rewards fast 180° turns for third-partying and repositioning, which pushes a lot of players toward higher raw sensitivity than tactical shooters need. Valorant's slower TTK and stationary-angle-holding meta means most players settle into a noticeably lower cm/360 within a week or two of switching — don't be surprised if you end up adjusting the converted value down slightly after some practice.",
            },
        ],
        faqs: [
            {
                q: 'Does my Apex ADS sensitivity carry over to Valorant Operator scope?',
                a: "No — those are two separate systems. Use this converter for hipfire, then the free ADS/scope calculator on /ads/ for Operator, Marshal, or Guardian scope sensitivity.",
            },
            {
                q: 'Why do pro Apex players often play at higher cm/360 than Valorant pros?',
                a: "Apex's movement-heavy, third-person-adjacent gunfights reward faster target acquisition across a wider field of view, while Valorant's angle-holding, first-bullet-accuracy meta rewards more controlled, lower sensitivity. Neither is objectively better — they fit different games.",
            },
        ],
        relatedBlogSlug: 'valorant-to-apex-sensitivity-converter',
    },
    {
        slug: 'fortnite-to-valorant',
        fromId: 'fortnite',
        toId: 'valorant',
        fromLabel: 'Fortnite',
        toLabel: 'Valorant',
        defaultSens: 7,
        defaultDpi: 800,
        intro: "Fortnite's yaw constant (0.005555° per count) is the smallest of any major title on this site, over 12x smaller than Valorant's (0.07° per count) — which is why Fortnite sensitivities are typically written as whole numbers like 5–10 while the converted Valorant value lands under 0.6. A Fortnite sens of 7 converts to roughly 0.56 in Valorant to preserve the same physical hand movement per 360° turn.",
        sections: [
            {
                heading: 'Building Sensitivity Is Separate — This Converts Aim Only',
                body: "Fortnite splits sensitivity into multiple sliders: general look sensitivity (what this converter uses), ADS sensitivity, and separate building/editing sensitivity. Valorant has no building equivalent, so only your general/aim sensitivity is relevant here — don't try to map your edit sensitivity to anything in Valorant, it doesn't correspond to a real setting on the other side.",
            },
        ],
        faqs: [
            {
                q: 'Do I need to change my Fortnite ADS sensitivity too?',
                a: "This converter handles hipfire/general look sensitivity. Fortnite's ADS multiplier is a separate per-weapon-type setting with no direct Valorant equivalent, since Valorant's scoped weapons (Operator, Marshal) use a single zoom multiplier — see /ads/ for that conversion.",
            },
            {
                q: "Why is Fortnite's sensitivity number so much bigger than other games?",
                a: "Fortnite's yaw constant is unusually small (0.005555° per count), so the sensitivity slider compensates with much larger numbers to reach a normal turn speed. It's a scale difference, not a sign that Fortnite mice are less sensitive.",
            },
        ],
        relatedBlogSlug: 'fortnite-to-valorant-sensitivity-2026',
    },
    {
        slug: 'apex-to-cs2',
        fromId: 'apex',
        toId: 'csgo',
        fromLabel: 'Apex Legends',
        toLabel: 'CS2',
        defaultSens: 3.0,
        defaultDpi: 800,
        intro: "This is the one conversion on this page where the number doesn't actually change: Apex Legends and CS2 both run on Source-family engines with the exact same yaw constant, 0.022° per mouse count. Set the identical sensitivity number in both games at the same DPI and your physical cm/360 will match exactly — no multiplication needed.",
        sections: [
            {
                heading: "Same Yaw Doesn't Mean Same Game Feel",
                body: "Even with matched cm/360, Apex and CS2 can feel different because of what surrounds the number: Apex's higher game-speed movement (sliding, wall-running, third-partying) pushes players toward faster target acquisition, while CS2's stationary-angle meta rewards fine control. If CS2 feels 'slower' at your Apex sensitivity, that's a playstyle adjustment, not a conversion error — the math is already exact.",
            },
            {
                heading: 'Apex Uses Per-Optic ADS. CS2 Uses One Scope Ratio.',
                body: "The one place these games genuinely diverge is scoped aiming: Apex assigns a separate multiplier to every optic magnification, while CS2's AWP and Scout share a single zoom_sensitivity_ratio console command. See the free ADS calculator for both.",
            },
        ],
        faqs: [
            {
                q: "If the yaw is identical, why do converter sites even list this pair?",
                a: "Because plenty of players don't know Apex and CS2 share an engine family, and land here expecting a multiplier. The honest answer is there isn't one — same number, same DPI, same cm/360.",
            },
            {
                q: 'Does this also apply to Apex vs CS:GO?',
                a: "Yes — CS:GO uses the same 0.022 Source yaw as CS2, so the 1:1 relationship holds for either version.",
            },
        ],
    },
    {
        slug: 'overwatch-to-valorant',
        fromId: 'overwatch',
        toId: 'valorant',
        fromLabel: 'Overwatch 2',
        toLabel: 'Valorant',
        defaultSens: 6,
        defaultDpi: 800,
        intro: "Overwatch 2's yaw constant is 0.0066° per count — over 10x smaller than Valorant's 0.07° — which is why Overwatch sensitivities commonly run 4–10 while Valorant's equivalent sits under 0.6. An Overwatch 2 sens of 6 converts to roughly 0.57 in Valorant. This ratio is specific to Overwatch 2; don't reuse it for other hero shooters, since Marvel Rivals and Apex use a completely different (and much larger) yaw constant.",
        sections: [
            {
                heading: 'Hero-to-Agent: Aim Style Carries Over More Than the Number Does',
                body: "Overwatch's flick-and-track hitscan heroes (Ashe, Widowmaker, Soldier: 76) build the closest transferable aim style to Valorant's headshot-focused gunplay — if you already play those roles, expect the transition to feel more familiar than switching from a projectile-heavy or tank-focused Overwatch main. The converted cm/360 gets your hardware calibrated identically; your aim habits from hitscan heroes do the rest.",
            },
        ],
        faqs: [
            {
                q: 'Is Overwatch 2 sensitivity the same as Overwatch 1?',
                a: "Yes, the yaw constant is unchanged between the two versions, so this conversion applies to Overwatch 1 sensitivities as well.",
            },
            {
                q: 'Does this work for console Overwatch sensitivity too?',
                a: "No — console sensitivity uses stick input curves, not a mouse yaw constant, so this mouse-based conversion doesn't apply.",
            },
        ],
    },
    {
        slug: 'warzone-to-valorant',
        fromId: 'cod',
        toId: 'valorant',
        fromLabel: 'Call of Duty: Warzone',
        toLabel: 'Valorant',
        defaultSens: 6,
        defaultDpi: 800,
        intro: "Warzone and modern Call of Duty titles share the same 0.0066° per-count yaw constant as Overwatch 2 — over 10x smaller than Valorant's 0.07°. A Warzone sensitivity of 6 converts to roughly 0.57 in Valorant, preserving your physical cm/360 across the switch from a fast-TTK battle royale to Valorant's slower, headshot-first gunplay.",
        sections: [
            {
                heading: "Warzone's Relative ADS Setting Doesn't Transfer Directly",
                body: "If you play Warzone with ADS Sensitivity Type set to Relative, your scoped sensitivity is calculated as a coefficient of hipfire (commonly 1.0–1.4 depending on FOV) rather than a fixed multiplier per optic. Valorant's Operator/Marshal use a single Zoom Sensitivity Multiplier instead — the two systems aren't numerically interchangeable, so recalculate scope sensitivity separately rather than reusing your Warzone ADS coefficient.",
            },
        ],
        faqs: [
            {
                q: 'Does this conversion work for Modern Warfare 3 too, not just Warzone?',
                a: "Yes — MW3 and Warzone share the same underlying engine and yaw constant (0.0066° per count), so the same conversion applies.",
            },
            {
                q: 'Why does Warzone feel so much faster at the same cm/360?',
                a: "Warzone's larger maps, vehicle combat, and faster TTK reward wider, quicker target acquisition, so players often run a higher cm/360 there than they'd choose for Valorant even after an accurate conversion. That's a playstyle choice on top of the math, not an error in it.",
            },
        ],
        relatedBlogSlug: 'warzone-sensitivity-converter-guide',
    },
    {
        slug: 'r6-to-valorant',
        fromId: 'rainbow6',
        toId: 'valorant',
        fromLabel: 'Rainbow Six Siege',
        toLabel: 'Valorant',
        defaultSens: 50,
        defaultDpi: 800,
        intro: "Rainbow Six Siege uses a 0–100 sensitivity scale rather than the small decimal numbers you'll see in Valorant or CS2, which trips up a lot of players trying to convert by feel. Under the hood, Siege's yaw constant is 0.00572° per count; Valorant's is 0.07°, over 12x larger. A Siege sensitivity of 50 converts to roughly 0.51 in Valorant.",
        sections: [
            {
                heading: "Siege's 0–100 Scale Isn't a Percentage — Treat It as Siege's Own Unit",
                body: "It's tempting to read '50' as 'half sensitivity,' but Siege's scale doesn't work proportionally that way once you factor in ADS multipliers per sight (Red Dot, Holo, ACOG all scale differently). For this hipfire conversion, just plug in your raw Siege number exactly as it appears in settings — the yaw-based math handles the scale difference correctly regardless of what the number looks like.",
            },
        ],
        faqs: [
            {
                q: 'Does this include Rainbow Six Siege ADS/scope sensitivity?',
                a: "No — Siege's per-sight ADS scaling (Red Dot vs ACOG vs 2.5x) is a separate system from hipfire sensitivity and isn't covered by this converter.",
            },
            {
                q: 'Is the Siege yaw constant the same on console and PC?',
                a: "This conversion is based on PC mouse input; console stick sensitivity uses a different curve entirely and isn't comparable through yaw constants.",
            },
        ],
        relatedBlogSlug: 'rainbow-six-siege-sensitivity-converter',
    },
    {
        slug: 'marvel-rivals-to-overwatch',
        fromId: 'marvelrivals',
        toId: 'overwatch',
        fromLabel: 'Marvel Rivals',
        toLabel: 'Overwatch 2',
        defaultSens: 3,
        defaultDpi: 800,
        intro: "Marvel Rivals runs on Unreal Engine 5 with a yaw constant of 0.022° per count — over 3x larger than Overwatch 2's 0.0066°. A Marvel Rivals sensitivity of 3 converts to roughly 1.0 in Overwatch 2. Both being hero shooters with a wide roster of heroes/characters that each play differently, this is one of the more common cross-game moves right now as the hero-shooter audience splits attention between the two titles.",
        sections: [
            {
                heading: 'Character Kits Don\'t Map 1:1 — Your Aim Habits Still Do',
                body: "Marvel Rivals and Overwatch 2 don't share character kits directly, but the broad archetypes transfer: Rivals' Duelists (hitscan/projectile damage) map closest to Overwatch's DPS role, Vanguards to Tanks, Strategists to Support. If you main a hitscan Duelist like Hawkeye or Punisher, expect your Overwatch hitscan aim (Ashe, Soldier: 76) to translate faster than a projectile-focused main would.",
            },
        ],
        faqs: [
            {
                q: "Is Marvel Rivals' yaw the same as Overwatch's?",
                a: "No — Rivals uses 0.022° per count (Unreal Engine 5) versus Overwatch 2's 0.0066°, a more than 3x difference, so a direct number copy without conversion will feel noticeably faster in Rivals.",
            },
            {
                q: 'Does third-person mode in Marvel Rivals affect this conversion?',
                a: "Some Marvel Rivals heroes use third-person camera. This converter is calibrated for the standard first-person aiming most heroes use; third-person heroes may feel slightly different even at a matched cm/360 due to the camera offset.",
            },
        ],
    },
    {
        slug: 'the-finals-to-cs2',
        fromId: 'thefinals',
        toId: 'csgo',
        fromLabel: 'THE FINALS',
        toLabel: 'CS2',
        defaultSens: 4,
        defaultDpi: 800,
        intro: "THE FINALS shares its 0.0066° per-count yaw constant with Overwatch 2 and modern Call of Duty titles, while CS2 runs the larger Source-engine 0.022° constant — exactly 3.33x apart. A THE FINALS sensitivity of 4 converts to roughly 1.2 in CS2, preserving your physical cm/360 across the switch from THE FINALS' destructible, movement-heavy arenas to CS2's static, angle-holding maps.",
        sections: [
            {
                heading: 'Destructible Environments Change More Than Your Sensitivity Should',
                body: "THE FINALS' core identity — buildings collapsing mid-fight, verticality from destruction — rewards fast, wide target reacquisition since sightlines change constantly. CS2's map geometry is fixed, so once you're calibrated to the converted cm/360, most of the adjustment left is learning static angles rather than retuning your mouse.",
            },
        ],
        faqs: [
            {
                q: "Does THE FINALS' ADS sensitivity use the same multiplier as CS2's scope ratio?",
                a: "No — the two use unrelated systems. Convert hipfire sensitivity here; scoped/ADS sensitivity needs a separate calculation.",
            },
        ],
    },
    {
        slug: 'deadlock-to-cs2',
        fromId: 'deadlock',
        toId: 'csgo',
        fromLabel: 'Deadlock',
        toLabel: 'CS2',
        defaultSens: 2.0,
        defaultDpi: 800,
        intro: "Deadlock runs on Source 2 — the same engine family as CS2 — and both share an identical 0.022° per-count yaw constant. That means no conversion math is actually needed: set the same sensitivity number and DPI in both games and your physical cm/360 matches exactly, the same relationship CS2 has with Apex Legends and the original Source engine titles.",
        sections: [
            {
                heading: 'Why Deadlock Feels Different at an Identical cm/360',
                body: "Deadlock blends MOBA-style lane pushing with third-person-adjacent gunplay and vertical traversal (ziplines, jump pads), which asks for faster target reacquisition than CS2's stationary angle-holding. If your matched sensitivity feels 'slow' in Deadlock, that's the game's pacing, not a conversion problem — the yaw match is exact.",
            },
        ],
        faqs: [
            {
                q: "Is Deadlock still in early access — could the yaw constant change?",
                a: "Deadlock's Source 2 engine parameters are expected to stay consistent with CS2's, but as with any actively-updated title, re-check after major patches if your aim suddenly feels off.",
            },
        ],
        relatedBlogSlug: 'deadlock-valve-sensitivity-converter',
    },
];

export function getConvertPair(slug: string): ConvertPair | undefined {
    return convertPairs.find((p) => p.slug === slug);
}
