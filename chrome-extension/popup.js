// Auto-synced with src/lib/games.ts (87 games) and src/lib/pros.ts (22 pros)
const GAMES = [{"id": "valorant", "name": "Valorant", "yaw": 0.07}, {"id": "csgo", "name": "CS:GO / CS2", "yaw": 0.022}, {"id": "apex", "name": "Apex Legends", "yaw": 0.022}, {"id": "overwatch", "name": "Overwatch 2", "yaw": 0.0066}, {"id": "cod", "name": "Call of Duty: Warzone / MW3", "yaw": 0.0066}, {"id": "rainbow6", "name": "Rainbow Six Siege", "yaw": 0.00572}, {"id": "fortnite", "name": "Fortnite", "yaw": 0.005555}, {"id": "bf2042", "name": "Battlefield 2042", "yaw": 0.022}, {"id": "pubg", "name": "PUBG", "yaw": 0.00707}, {"id": "destiny2", "name": "Destiny 2", "yaw": 0.0066}, {"id": "quake", "name": "Quake / Source Engine", "yaw": 0.022}, {"id": "roblox", "name": "Roblox", "yaw": 0.2}, {"id": "minecraft", "name": "Minecraft (Java)", "yaw": 0.6}, {"id": "marvelrivals", "name": "Marvel Rivals", "yaw": 0.022}, {"id": "thefinals", "name": "THE FINALS", "yaw": 0.0066}, {"id": "rust", "name": "Rust", "yaw": 0.11247}, {"id": "deadlock", "name": "Deadlock", "yaw": 0.022}, {"id": "tf2", "name": "Team Fortress 2", "yaw": 0.022}, {"id": "l4d2", "name": "Left 4 Dead 2", "yaw": 0.022}, {"id": "titanfall2", "name": "Titanfall 2", "yaw": 0.022}, {"id": "halo", "name": "Halo Infinite", "yaw": 0.0225}, {"id": "tarkov", "name": "Escape from Tarkov", "yaw": 0.113636}, {"id": "gtav", "name": "Grand Theft Auto V", "yaw": 0.0066}, {"id": "insurgency", "name": "Insurgency: Sandstorm", "yaw": 0.14}, {"id": "squad", "name": "Squad", "yaw": 0.175}, {"id": "huntshowdown", "name": "Hunt: Showdown", "yaw": 0.022}, {"id": "dayz", "name": "DayZ", "yaw": 0.179}, {"id": "warframe", "name": "Warframe", "yaw": 0.014}, {"id": "arksurvival", "name": "ARK: Survival Evolved", "yaw": 0.175}, {"id": "diabotical", "name": "Diabotical", "yaw": 0.01667}, {"id": "hl2", "name": "Half-Life 2", "yaw": 0.022}, {"id": "portal2", "name": "Portal 2", "yaw": 0.022}, {"id": "gmod", "name": "Garry's Mod", "yaw": 0.022}, {"id": "cssource", "name": "Counter-Strike: Source", "yaw": 0.022}, {"id": "l4d1", "name": "Left 4 Dead", "yaw": 0.022}, {"id": "blackmesa", "name": "Black Mesa", "yaw": 0.022}, {"id": "quakechampions", "name": "Quake Champions", "yaw": 0.022}, {"id": "back4blood", "name": "Back 4 Blood", "yaw": 0.175}, {"id": "splitgate", "name": "Splitgate", "yaw": 0.009501}, {"id": "helldivers2", "name": "Helldivers 2", "yaw": 0.0175}, {"id": "cs16", "name": "Counter-Strike 1.6", "yaw": 0.022}, {"id": "halflife", "name": "Half-Life", "yaw": 0.022}, {"id": "codbo6", "name": "Call of Duty: Black Ops 6", "yaw": 0.0066}, {"id": "paladins", "name": "Paladins", "yaw": 0.0092}, {"id": "quake3", "name": "Quake III Arena", "yaw": 0.022}, {"id": "doometernal", "name": "DOOM Eternal", "yaw": 0.022}, {"id": "csconditionzero", "name": "Counter-Strike: Condition Zero", "yaw": 0.022}, {"id": "tfc", "name": "Team Fortress Classic", "yaw": 0.022}, {"id": "fallout76", "name": "Fallout 76", "yaw": 0.0175}, {"id": "battalion1944", "name": "Battalion 1944", "yaw": 0.0175}, {"id": "reflexarena", "name": "Reflex Arena", "yaw": 0.00573}, {"id": "krunker", "name": "Krunker.io", "yaw": 0.1376}, {"id": "doom2016", "name": "DOOM (2016)", "yaw": 0.022}, {"id": "wolfnewcolossus", "name": "Wolfenstein II: The New Colossus", "yaw": 0.022}, {"id": "wolfyoungblood", "name": "Wolfenstein: Youngblood", "yaw": 0.022}, {"id": "rtcw", "name": "Return to Castle Wolfenstein", "yaw": 0.022}, {"id": "wolfet", "name": "Wolfenstein: Enemy Territory", "yaw": 0.022}, {"id": "jediknight2", "name": "Star Wars Jedi Knight II: Jedi Outcast", "yaw": 0.022}, {"id": "jediacademy", "name": "Star Wars Jedi Knight: Jedi Academy", "yaw": 0.022}, {"id": "xonotic", "name": "Xonotic", "yaw": 0.022}, {"id": "openarena", "name": "OpenArena", "yaw": 0.022}, {"id": "quake1", "name": "Quake", "yaw": 0.022}, {"id": "quake2", "name": "Quake II", "yaw": 0.022}, {"id": "quakelive", "name": "Quake Live", "yaw": 0.022}, {"id": "quake4", "name": "Quake 4", "yaw": 0.022}, {"id": "drg", "name": "Deep Rock Galactic", "yaw": 0.0134}, {"id": "riskofrain2", "name": "Risk of Rain 2", "yaw": 0.5}, {"id": "splitgate2", "name": "Splitgate 2", "yaw": 0.01116}, {"id": "readyornot", "name": "Ready or Not", "yaw": 0.011}, {"id": "roboquest", "name": "Roboquest", "yaw": 0.00042}, {"id": "insurgency2014", "name": "Insurgency (2014)", "yaw": 0.022}, {"id": "payday2", "name": "Payday 2", "yaw": 0.0156}, {"id": "deltaforce", "name": "Delta Force", "yaw": 0.005555}, {"id": "arcraiders", "name": "Arc Raiders", "yaw": 0.0066}, {"id": "marathon", "name": "Marathon", "yaw": 0.0066}, {"id": "farlight84", "name": "Farlight 84", "yaw": 0.005555}, {"id": "repo", "name": "R.E.P.O.", "yaw": 0.022}, {"id": "peak", "name": "PEAK", "yaw": 0.022}, {"id": "fragpunk", "name": "FragPunk", "yaw": 0.005555}, {"id": "combatmaster", "name": "Combat Master", "yaw": 0.022}, {"id": "bloodstrike", "name": "Blood Strike", "yaw": 0.005555}, {"id": "strinova", "name": "Strinova", "yaw": 0.005555}, {"id": "seaofthieves", "name": "Sea of Thieves", "yaw": 0.005555}, {"id": "deadbydaylight", "name": "Dead by Daylight", "yaw": 0.005555}, {"id": "ultrakill", "name": "Ultrakill", "yaw": 0.022}, {"id": "enlisted", "name": "Enlisted", "yaw": 0.0175}, {"id": "crossfire", "name": "Crossfire", "yaw": 0.022}];

const PROS = [{"name": "TenZ", "flag": "🇨🇦", "game": "Valorant", "dpi": 800, "sens": 0.3, "edpi": 240, "crosshair": "0;s;1;P;o;1;0l;4;0o;2;0a;1;0f;0;1b;0"}, {"name": "Aspas", "flag": "🇧🇷", "game": "Valorant", "dpi": 800, "sens": 0.4, "edpi": 320, "crosshair": "0;s;1;P;c;1;h;0;0l;4;0o;1;0a;1;0f;0;1b;0"}, {"name": "Demon1", "flag": "🇺🇦", "game": "Valorant", "dpi": 1600, "sens": 0.1, "edpi": 160, "crosshair": "0;s;1;P;c;5;h;0;0l;4;0o;1;0a;1;0f;0;1b;0"}, {"name": "Boaster", "flag": "🇬🇧", "game": "Valorant", "dpi": 800, "sens": 0.25, "edpi": 200, "crosshair": "0;p;0;c;1;s;1;0l;4;0o;2;0a;1;0f;0;1b;0"}, {"name": "Chronicle", "flag": "🇷🇺", "game": "Valorant", "dpi": 400, "sens": 0.65, "edpi": 260, "crosshair": ""}, {"name": "yay", "flag": "🇺🇸", "game": "Valorant", "dpi": 800, "sens": 0.279, "edpi": 223, "crosshair": "0;s;1;P;c;5;o;0.449;0l;4;0o;1;0a;1;0f;0;1b;0"}, {"name": "nAts", "flag": "🇷🇺", "game": "Valorant", "dpi": 400, "sens": 0.86, "edpi": 344, "crosshair": ""}, {"name": "zekken", "flag": "🇺🇸", "game": "Valorant", "dpi": 1600, "sens": 0.175, "edpi": 280, "crosshair": "0;s;1;P;c;1;t;2;o;1;d;1;0b;0;1b;0;S;b;1;c;8;s;0.823"}, {"name": "Sacy", "flag": "🇧🇷", "game": "Valorant", "dpi": 800, "sens": 0.48, "edpi": 384, "crosshair": ""}, {"name": "s1mple", "flag": "🇺🇦", "game": "CS2", "dpi": 400, "sens": 3.09, "edpi": 1236, "crosshair": ""}, {"name": "NiKo", "flag": "🇧🇦", "game": "CS2", "dpi": 400, "sens": 1.4, "edpi": 560, "crosshair": ""}, {"name": "ZywOo", "flag": "🇫🇷", "game": "CS2", "dpi": 400, "sens": 2.0, "edpi": 800, "crosshair": ""}, {"name": "m0NESY", "flag": "🇷🇺", "game": "CS2", "dpi": 400, "sens": 2.3, "edpi": 920, "crosshair": ""}, {"name": "dev1ce", "flag": "🇩🇰", "game": "CS2", "dpi": 400, "sens": 1.9, "edpi": 760, "crosshair": ""}, {"name": "ropz", "flag": "🇪🇪", "game": "CS2", "dpi": 400, "sens": 1.09, "edpi": 436, "crosshair": ""}, {"name": "broky", "flag": "🇱🇻", "game": "CS2", "dpi": 400, "sens": 1.55, "edpi": 620, "crosshair": ""}, {"name": "karrigan", "flag": "🇩🇰", "game": "CS2", "dpi": 400, "sens": 2.2, "edpi": 880, "crosshair": ""}, {"name": "electronic", "flag": "🇷🇺", "game": "CS2", "dpi": 400, "sens": 1.75, "edpi": 700, "crosshair": ""}, {"name": "ImperialHal", "flag": "🇺🇸", "game": "Apex Legends", "dpi": 400, "sens": 2.0, "edpi": 800, "crosshair": ""}, {"name": "SweetDreams", "flag": "🇨🇦", "game": "Apex Legends", "dpi": 800, "sens": 1.2, "edpi": 960, "crosshair": ""}, {"name": "Someone", "flag": "🇰🇷", "game": "Overwatch 2", "dpi": 800, "sens": 5.5, "edpi": 4400, "crosshair": ""}, {"name": "Bugha", "flag": "🇺🇸", "game": "Fortnite", "dpi": 400, "sens": 8.0, "edpi": 32, "crosshair": ""}];

const gameMap = Object.fromEntries(GAMES.map((g) => [g.id, g]));

const gameSearch = document.getElementById("game-search");
const fromSelect = document.getElementById("from-game");
const toSelect = document.getElementById("to-game");
const sensInput = document.getElementById("sens-input");
const dpiInput = document.getElementById("dpi-input");
const swapBtn = document.getElementById("swap-btn");
const resultSens = document.getElementById("result-sens");
const multiplierInfo = document.getElementById("multiplier-info");
const statCm = document.getElementById("stat-cm");
const statInches = document.getElementById("stat-inches");
const statEdpi = document.getElementById("stat-edpi");
const copyBtn = document.getElementById("copy-btn");
const badgeTitle = document.getElementById("badge-title");
const badgeDesc = document.getElementById("badge-desc");
const themeToggle = document.getElementById("theme-toggle");

const matchProSelect = document.getElementById("match-pro-select");
const matchDpiInput = document.getElementById("match-dpi-input");
const matchProName = document.getElementById("match-pro-name");
const matchProGame = document.getElementById("match-pro-game");
const matchResult = document.getElementById("match-result");
const copyMatchBtn = document.getElementById("copy-match-btn");
const proFilter = document.getElementById("pro-filter");
const proDbList = document.getElementById("pro-db-list");

// Tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    document.querySelectorAll(".tab-panel").forEach((p) => {
      p.classList.toggle("active", p.id === `tab-${target}`);
    });
  });
});

function populateGameSelects(filterText = "", keepFrom = "valorant", keepTo = "csgo") {
  const q = filterText.trim().toLowerCase();
  const filtered = q
    ? GAMES.filter((g) => g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q))
    : GAMES;
  const list = filtered.length ? filtered : GAMES;

  const buildOptions = (selectedId) =>
    list
      .map((g) => `<option value="${g.id}"${g.id === selectedId ? " selected" : ""}>${g.name}</option>`)
      .join("");

  const fromId = list.some((g) => g.id === keepFrom) ? keepFrom : list[0].id;
  const toId = list.some((g) => g.id === keepTo) ? keepTo : (list[1] || list[0]).id;

  fromSelect.innerHTML = buildOptions(fromId);
  toSelect.innerHTML = buildOptions(toId);
}

function classifySpeed(cm) {
  if (!cm || cm <= 0) return ["Enter sensitivity above", "Instant physical cm/360 calculation"];
  if (cm >= 60) return ["Ultra-Low Arm Precision", "Recommended pad: 490×420mm+ XL / Deskpad"];
  if (cm >= 42) return ["Tactical Rifle Sweet Spot", "Pro Valorant/CS2 Zone · 450×400mm+ XL Pad"];
  if (cm >= 30) return ["Balanced Hybrid / Tracking", "Versatile for Apex, Warzone & Tactical FPS"];
  return ["High-Sens Wrist Flick", "Fast 180° turns · Ultralight <55g mouse ideal"];
}

function convertSensitivity() {
  const fromGame = gameMap[fromSelect.value] || GAMES[0];
  const toGame = gameMap[toSelect.value] || GAMES[1];
  const sensVal = parseFloat(sensInput.value) || 0;
  const dpiVal = parseInt(dpiInput.value, 10) || 800;

  const mult = toGame.yaw !== 0 ? fromGame.yaw / toGame.yaw : 1;
  const converted = sensVal * mult;

  resultSens.textContent = converted.toFixed(4).replace(/\.?0+$/, "") || "0";
  multiplierInfo.textContent = `Multiplier (${fromGame.name} → ${toGame.name}): ${mult.toFixed(4)}×`;

  let inches = 0;
  let cm = 0;
  if (sensVal > 0 && dpiVal > 0) {
    inches = 360 / (sensVal * fromGame.yaw * dpiVal);
    cm = inches * 2.54;
  }

  statCm.textContent = cm > 0 ? `${cm.toFixed(1)} cm` : "0.0 cm";
  statInches.textContent = inches > 0 ? `${inches.toFixed(1)}"` : "0.0\"";
  statEdpi.textContent = (sensVal * dpiVal).toFixed(0);

  const [title, desc] = classifySpeed(cm);
  badgeTitle.textContent = title;
  badgeDesc.textContent = desc;

  chrome.storage?.local?.set({
    lastFromGame: fromSelect.value,
    lastToGame: toSelect.value,
    lastSens: sensInput.value,
    lastDpi: dpiInput.value,
  });
}

async function copyText(text, btn, defaultLabel) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  btn.textContent = "✓ Copied!";
  setTimeout(() => {
    btn.textContent = defaultLabel;
  }, 1400);
}

copyBtn.addEventListener("click", () => copyText(resultSens.textContent, copyBtn, "📋 Copy"));

swapBtn.addEventListener("click", () => {
  const a = fromSelect.value;
  const b = toSelect.value;
  fromSelect.value = b;
  toSelect.value = a;
  convertSensitivity();
});

gameSearch.addEventListener("input", () => {
  populateGameSelects(gameSearch.value, fromSelect.value, toSelect.value);
  convertSensitivity();
});

fromSelect.addEventListener("change", convertSensitivity);
toSelect.addEventListener("change", convertSensitivity);
sensInput.addEventListener("input", convertSensitivity);
dpiInput.addEventListener("input", convertSensitivity);

// Pros & Crosshairs
function populateMatchProSelect() {
  matchProSelect.innerHTML = PROS.map(
    (p, idx) => `<option value="${idx}">${p.flag} ${p.name} (${p.game})</option>`
  ).join("");
}

function calculateProMatch() {
  const pro = PROS[matchProSelect.value] || PROS[0];
  const yourDpi = parseInt(matchDpiInput.value, 10) || 800;
  const yourSens = (pro.dpi * pro.sens) / yourDpi;
  matchProName.textContent = pro.name;
  matchProGame.textContent = pro.game;
  matchResult.textContent = yourSens.toFixed(3);
  chrome.storage?.local?.set({ matchDpi: matchDpiInput.value, matchProIndex: matchProSelect.value });
}

copyMatchBtn.addEventListener("click", () => copyText(matchResult.textContent, copyMatchBtn, "Copy"));
matchProSelect.addEventListener("change", calculateProMatch);
matchDpiInput.addEventListener("input", calculateProMatch);

function renderProDatabase(filterGame = "all") {
  const items = filterGame === "all" ? PROS : PROS.filter((p) => p.game === filterGame);
  proDbList.innerHTML = items
    .map(
      (pro, idx) => `
      <div class="pro-db-item">
        <div class="pro-db-top">
          <span class="pro-db-name">${pro.flag} ${pro.name}</span>
          <span class="pro-db-game">${pro.game}</span>
        </div>
        <div class="pro-db-stats">
          <span>${pro.dpi} DPI</span>
          <span>• Sens: ${pro.sens}${pro.game === "Fortnite" ? "%" : ""}</span>
          <span>• ${pro.edpi} eDPI</span>
          ${
            pro.crosshair
              ? `<button type="button" class="mini-copy-btn pro-ch-btn" data-idx="${idx}" data-game="${filterGame}">Copy Crosshair</button>`
              : ""
          }
        </div>
      </div>`
    )
    .join("");

  proDbList.querySelectorAll(".pro-ch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-idx"));
      const list = filterGame === "all" ? PROS : PROS.filter((p) => p.game === filterGame);
      if (list[i]?.crosshair) {
        copyText(list[i].crosshair, btn, "Copy Crosshair");
      }
    });
  });
}

proFilter.addEventListener("change", () => renderProDatabase(proFilter.value));

// Theme
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const nxt = cur === "dark" ? "light" : "dark";
  applyTheme(nxt);
  chrome.storage?.local?.set({ theme: nxt });
});

// Init
populateGameSelects();
populateMatchProSelect();
renderProDatabase("all");

if (chrome.storage?.local) {
  chrome.storage.local.get(
    ["lastFromGame", "lastToGame", "lastSens", "lastDpi", "theme", "matchDpi", "matchProIndex"],
    (data) => {
      if (data.lastFromGame && gameMap[data.lastFromGame]) fromSelect.value = data.lastFromGame;
      if (data.lastToGame && gameMap[data.lastToGame]) toSelect.value = data.lastToGame;
      if (data.lastSens) sensInput.value = data.lastSens;
      if (data.lastDpi) dpiInput.value = data.lastDpi;
      if (data.matchDpi) matchDpiInput.value = data.matchDpi;
      if (data.matchProIndex && PROS[data.matchProIndex]) matchProSelect.value = data.matchProIndex;
      applyTheme(data.theme === "light" ? "light" : "dark");
      convertSensitivity();
      calculateProMatch();
    }
  );
} else {
  applyTheme("dark");
  convertSensitivity();
  calculateProMatch();
}
