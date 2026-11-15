import { pros, type ProPlayer } from "./pros";
import { games } from "./games";

// Every pro profile shipped the same ~230 words: a two-line bio plus spec
// tables. Google filed most of them under "Crawled – currently not indexed",
// and AdSense rejected the site for thin content. Tables are data, not
// substance — there was nothing on the page that answered "what does this
// player's setup actually mean for me?".
//
// Rather than pad with filler, this derives real analysis from the numbers the
// database already holds: where the player sits in the distribution of every
// other pro in the same game, what their cm/360 implies physically, whether
// their mousepad can even contain their own swipe, and what their sensitivity
// becomes in the other games this site converts to. Every sentence is computed
// from that player's row, so no two profiles read alike.

const YAW: Record<string, number> = {
    valorant: 0.07,
    csgo: 0.022,
    cs2: 0.022,
    apex: 0.022,
    overwatch: 0.0066,
    fortnite: 0.005555,
};

/** Pad width in cm, parsed from the product name where the size is stated. */
const PAD_WIDTH: Record<string, number> = {
    xl: 45, xxl: 90, l: 45, m: 36, s: 28,
};

function yawFor(gameId: string): number {
    return YAW[gameId] ?? games.find((g) => g.id === gameId)?.yaw ?? 0.022;
}

function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function ordinalPct(value: number, all: number[]): number {
    const below = all.filter((v) => v < value).length;
    return Math.round((below / all.length) * 100);
}

/** Rough pad width from a product name like "Artisan Zero FX M" or "XXL". */
function padWidthCm(mousepad: string): number | null {
    const m = mousepad.match(/\b(XXL|XL|L|M|S)\b/i);
    if (!m) return null;
    return PAD_WIDTH[m[1].toLowerCase()] ?? null;
}

export interface ProAnalysis {
    /** Short paragraphs, in reading order. */
    paragraphs: string[];
    /** Same-game peers used for the comparison, for a "compare" link row. */
    peers: ProPlayer[];
    /** This player's sensitivity expressed in other supported games. */
    conversions: { game: string; sens: string; note: string }[];
}

export function buildProAnalysis(pro: ProPlayer): ProAnalysis {
    const peers = pros.filter((p) => p.gameId === pro.gameId && p.slug !== pro.slug);
    const paragraphs: string[] = [];

    // ── 1. Where this eDPI sits among same-game pros ────────────────────────
    if (peers.length >= 3) {
        const edpis = pros.filter((p) => p.gameId === pro.gameId).map((p) => p.edpi);
        const med = median(edpis);
        const pct = ordinalPct(pro.edpi, edpis);
        const delta = Math.round(((pro.edpi - med) / med) * 100);
        const direction =
            Math.abs(delta) < 8
                ? `almost exactly the median for ${pro.game} pros in this database (${med} eDPI)`
                : delta > 0
                  ? `${delta}% above the ${pro.game} pro median of ${med} eDPI`
                  : `${Math.abs(delta)}% below the ${pro.game} pro median of ${med} eDPI`;
        paragraphs.push(
            `${pro.name} plays at ${pro.edpi} eDPI (${pro.dpi} DPI × ${pro.sens} in-game), which is ${direction}. ` +
                `That places ${pro.name} above ${pct}% of the ${pro.game} professionals tracked here. ` +
                `eDPI is the only number that compares directly between players, because a low DPI with a high in-game ` +
                `sensitivity and a high DPI with a low one can land on exactly the same physical speed.`
        );
    }

    // ── 2. What the cm/360 means physically ─────────────────────────────────
    const cm = pro.cm360;
    const style =
        cm >= 45
            ? "a full-arm style: turning 180° means sweeping most of the forearm, which trades flick speed for very fine micro-correction"
            : cm >= 30
              ? "a hybrid arm-and-wrist style: broad turns come from the forearm while tracking and micro-adjustment stay in the wrist"
              : cm >= 20
                ? "a wrist-led style: fast to turn and re-aim, but it demands a steady hand because small tremors translate into visible crosshair movement"
                : "an unusually fast wrist style: almost the whole turn happens inside the wrist, which suits close-range duels far more than long-range tracking";
    paragraphs.push(
        `A full 360° turn takes ${pro.name} ${cm} cm of mouse movement. In practice that is ${style}. ` +
            `Copying the number without copying the grip and desk depth rarely feels the same — cm/360 describes the distance, ` +
            `not the arm that has to cover it.`
    );

    // ── 3. Does the pad actually fit the swipe? ─────────────────────────────
    const pad = padWidthCm(pro.mousepad);
    if (pad) {
        const needed = Math.round(cm / 2);
        paragraphs.push(
            pad >= needed
                ? `${pro.name} pairs that with the ${pro.mousepad}. A single 180° turn needs roughly ${needed} cm of travel, ` +
                      `so a pad of about ${pad} cm leaves real headroom to reposition without lifting mid-fight.`
                : `${pro.name} pairs that with the ${pro.mousepad}. A 180° turn needs roughly ${needed} cm of travel against ` +
                      `roughly ${pad} cm of pad, so this setup depends on frequent, deliberate lift-offs — a habit worth building ` +
                      `before adopting the sensitivity.`
        );
    }

    // ── 4. Hardware chain, read as a set ────────────────────────────────────
    paragraphs.push(
        `The rest of the chain is built around keeping that input clean: a ${pro.mouse} at ${pro.pollingRate} Hz polling, ` +
            `raw input ${pro.rawInput ? "on" : "off"}, Windows pointer speed at ${pro.windowsSens}/11` +
            `${pro.windowsSens === 6 ? " (the 1:1 step, where Windows applies no scaling to the sensor's counts)" : ""}, ` +
            `and a ${pro.monitorHz} Hz ${pro.monitor}. ` +
            `The Windows setting matters more than most players expect: any value other than 6/11 makes the operating system ` +
            `add or drop counts before the game ever sees them.`
    );

    // ── 5. What this sensitivity is in other games ──────────────────────────
    const fromYaw = yawFor(pro.gameId);
    const targets = ["valorant", "csgo", "apex", "overwatch"].filter((g) => g !== pro.gameId && g !== (pro.gameId === "cs2" ? "csgo" : ""));
    const conversions = targets.map((id) => {
        const toYaw = yawFor(id);
        const converted = (pro.sens * fromYaw) / toYaw;
        const label = id === "csgo" ? "CS2" : id === "apex" ? "Apex Legends" : id === "overwatch" ? "Overwatch 2" : "Valorant";
        return {
            game: label,
            sens: converted < 1 ? converted.toFixed(3) : converted.toFixed(2),
            note: `at ${pro.dpi} DPI, same ${cm} cm/360`,
        };
    });

    return { paragraphs, peers: peers.slice(0, 4), conversions };
}
