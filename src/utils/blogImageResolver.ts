const AVAILABLE = new Set([
  "8khz-wireless-mouse.webp",
  "deadlock-valve-sensitivity.webp",
  "dpi-mouse-sensor-macro.webp",
  "dpi-vs-sensitivity.webp",
  "games-factory-sens.webp",
  "glass-vs-cloth-mousepad.webp",
  "gta-vi-aim-settings.webp",
  "overwatch-to-apex.webp",
  "perfect-sensitivity.webp",
  "riot-games-sensitivity.webp",
  "snap-tap-rapid-trigger.webp",
  "valorant-to-cs2.webp",
  "what-is-edpi.webp",
  "wireless-gaming-mouse-8khz.webp",
]);

const KEYWORD_MAP: [string[], string][] = [
  [["valorant", "riot", "crosshair-guide", "crosshair-placement", "crosshair-settings", "agent", "operator", "vandal"], "riot-games-sensitivity.webp"],
  [["cs2", "csgo", "awp", "spray", "peeking", "practice-commands", "cs2-to", "to-cs2", "counter-strafe"], "valorant-to-cs2.webp"],
  [["apex", "overwatch", "ow2", "to-apex", "apex-to"], "overwatch-to-apex.webp"],
  [["low-sens", "high-sens", "monitor-resolution", "dpi-vs", "sensitivity-difference"], "dpi-vs-sensitivity.webp"],
  [["mouse-sensor", "jitter", "latency", "mouse-weight", "mouse-grip", "best-gaming-mouse", "sensor"], "dpi-mouse-sensor-macro.webp"],
  [["mousepad", "glass", "cloth", "skate", "ergonomic", "setup", "desk"], "glass-vs-cloth-mousepad.webp"],
  [["wireless", "8khz", "polling", "wired-vs", "vs-wired"], "8khz-wireless-mouse.webp"],
  [["rapid-trigger", "snap-tap", "keybind", "keyboard", "analog"], "snap-tap-rapid-trigger.webp"],
  [["deadlock", "valve"], "deadlock-valve-sensitivity.webp"],
  [["gta", "console", "controller"], "gta-vi-aim-settings.webp"],
  [["what-is-edpi", "edpi-explained", "edpi-guide"], "what-is-edpi.webp"],
  [["fortnite", "warzone", "pubg", "battlefield", "halo", "rainbow", "xdefiant", "hunt-showdown", "minecraft", "the-finals", "factory"], "games-factory-sens.webp"],
  [["aim", "training", "routine", "improve", "plateau", "lab", "wrist", "arm", "reaction", "recoil", "elo", "tilt", "mental", "fov", "fps-boost", "colorblind", "beginner"], "perfect-sensitivity.webp"],
];

const DEFAULT = "/blog/perfect-sensitivity.webp";

export function resolveBlogImage(src: string): string {
  const filename = src.split("/").pop() ?? "";
  if (AVAILABLE.has(filename)) return src;

  const slug = filename.replace(".webp", "").toLowerCase();
  for (const [keywords, target] of KEYWORD_MAP) {
    if (keywords.some((kw) => slug.includes(kw))) return `/blog/${target}`;
  }
  return DEFAULT;
}
