// Yaw mapping from src/lib/games.ts for exact synchronization with the site
const gameYaws = {
  valorant: 0.07,
  csgo: 0.022,
  apex: 0.022,
  overwatch: 0.0066,
  cod: 0.0066,
  rainbow6: 0.00572,
  fortnite: 0.005555,
  bf2042: 0.022,
  pubg: 0.00707,
  destiny2: 0.0066,
  quake: 0.022,
  roblox: 0.2,
  minecraft: 0.6,
  marvelrivals: 0.022,
  thefinals: 0.0066,
  rust: 0.11247,
  deadlock: 0.022,
};

// Real settings pulled from the site's pro player database (src/lib/pros.ts)
const proDatabase = [
  { name: 'TenZ', flag: '🇨🇦', game: 'Valorant', dpi: 800, sens: 0.3 },
  { name: 's1mple', flag: '🇺🇦', game: 'CS2', dpi: 400, sens: 3.09 },
  { name: 'ImperialHal', flag: '🇺🇸', game: 'Apex Legends', dpi: 400, sens: 2.0 },
  { name: 'Bugha', flag: '🇺🇸', game: 'Fortnite', dpi: 400, sens: 0.08 },
];

// The Semi-Annual plan is the "Best Value" tier — used as the default target
// for every upsell click (locked stats, badge, blurred result overlay, etc).
const UPGRADE_URL = 'https://buy.stripe.com/bJe6oGb7jarUgbU7Y81ck01';

// DOM Elements
const fromGameSelect = document.getElementById('from-game');
const toGameSelect = document.getElementById('to-game');
const sensInput = document.getElementById('sens-input');
const dpiInput = document.getElementById('dpi-input');
const swapBtn = document.getElementById('swap-btn');
const resultSensDiv = document.getElementById('result-sens');
const statCmSpan = document.getElementById('stat-cm');
const statInchesSpan = document.getElementById('stat-inches');
const statEdpiSpan = document.getElementById('stat-edpi');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const proDbList = document.getElementById('pro-db-list');
const matchProSelect = document.getElementById('match-pro-select');
const matchDpiInput = document.getElementById('match-dpi-input');
const matchProName = document.getElementById('match-pro-name');
const matchProGame = document.getElementById('match-pro-game');
const matchResult = document.getElementById('match-result');

// ══════ Conversion logic (values are always computed — only the UI is gated) ══════
function convertSensitivity() {
  const fromGame = fromGameSelect.value;
  const toGame = toGameSelect.value;
  const sensValue = parseFloat(sensInput.value) || 0;
  const dpiValue = parseInt(dpiInput.value, 10) || 800;

  const fromYaw = gameYaws[fromGame] || 0.022;
  const toYaw = gameYaws[toGame] || 0.022;

  const converted = toYaw !== 0 ? (sensValue * fromYaw) / toYaw : 0;
  resultSensDiv.textContent = converted.toFixed(3);

  let cm360 = 0;
  let inches360 = 0;
  if (sensValue !== 0 && dpiValue !== 0) {
    inches360 = 360 / (sensValue * fromYaw * dpiValue);
    cm360 = inches360 * 2.54;
  }
  statCmSpan.textContent = cm360 > 0 ? `${cm360.toFixed(1)} cm` : '0.0 cm';
  statInchesSpan.textContent = inches360 > 0 ? `${inches360.toFixed(1)}"` : '0.0"';
  statEdpiSpan.textContent = (sensValue * dpiValue).toFixed(0);

  saveState();
}

// ══════ Upsell — every locked element sends the user to a real Stripe checkout ══════
function openUpgrade() {
  window.open(UPGRADE_URL, '_blank');
}

document.querySelectorAll('.stat-locked, .badge-locked, .result-lock-overlay').forEach((el) => {
  el.addEventListener('click', openUpgrade);
});

// Copy is Pro-gated too: it opens checkout instead of copying free text.
copyBtn.addEventListener('click', openUpgrade);

// ══════ Swap source/target games ══════
swapBtn.addEventListener('click', () => {
  const currentFrom = fromGameSelect.value;
  const currentTo = toGameSelect.value;
  fromGameSelect.value = currentTo;
  toGameSelect.value = currentFrom;
  convertSensitivity();
});

// ══════ Theme toggle (persisted via chrome.storage) ══════
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  chrome.storage?.local?.set({ theme: next });
});

// ══════ Mini pro database ══════
function renderProDatabase() {
  proDbList.innerHTML = proDatabase
    .map((pro) => {
      const edpi = (pro.dpi * pro.sens).toFixed(0);
      return `
        <div class="pro-db-item">
          <span class="pro-db-name">${pro.flag} ${pro.name}</span>
          <span class="pro-db-game">${pro.game}</span>
          <span class="pro-db-stat">${pro.dpi} DPI</span>
          <span class="pro-db-stat">${edpi} eDPI</span>
        </div>
      `;
    })
    .join('');
}

// ══════ Free "Match a Pro" mini calculator ══════
// Matching eDPI (dpi * sens) reproduces the exact same physical mouse
// distance for a 360° turn within the same game — no yaw needed, since
// cm/360 is proportional to 1 / (sens * dpi) for a fixed game.
function populateMatchProSelect() {
  matchProSelect.innerHTML = proDatabase
    .map((pro, index) => `<option value="${index}">${pro.flag} ${pro.name} (${pro.game})</option>`)
    .join('');
}

function calculateProMatch() {
  const pro = proDatabase[matchProSelect.value] || proDatabase[0];
  const yourDpi = parseInt(matchDpiInput.value, 10) || 800;
  const yourSens = (pro.dpi * pro.sens) / yourDpi;

  matchProName.textContent = pro.name;
  matchProGame.textContent = pro.game;
  matchResult.textContent = yourSens.toFixed(3);

  chrome.storage?.local?.set({ matchDpi: matchDpiInput.value, matchProIndex: matchProSelect.value });
}

matchProSelect.addEventListener('change', calculateProMatch);
matchDpiInput.addEventListener('input', calculateProMatch);

// ══════ Persist last used game/DPI/sens + theme via chrome.storage ══════
function saveState() {
  chrome.storage?.local?.set({
    lastFromGame: fromGameSelect.value,
    lastToGame: toGameSelect.value,
    lastSens: sensInput.value,
    lastDpi: dpiInput.value,
  });
}

function restoreState() {
  if (!chrome.storage?.local) {
    convertSensitivity();
    calculateProMatch();
    applyTheme('dark');
    return;
  }

  chrome.storage.local.get(
    ['lastFromGame', 'lastToGame', 'lastSens', 'lastDpi', 'theme', 'matchDpi', 'matchProIndex'],
    (data) => {
      if (data.lastFromGame && gameYaws[data.lastFromGame] !== undefined) {
        fromGameSelect.value = data.lastFromGame;
      }
      if (data.lastToGame && gameYaws[data.lastToGame] !== undefined) {
        toGameSelect.value = data.lastToGame;
      }
      if (data.lastSens) sensInput.value = data.lastSens;
      if (data.lastDpi) dpiInput.value = data.lastDpi;
      if (data.matchDpi) matchDpiInput.value = data.matchDpi;
      if (data.matchProIndex && proDatabase[data.matchProIndex]) {
        matchProSelect.value = data.matchProIndex;
      }

      applyTheme(data.theme === 'light' ? 'light' : 'dark');
      convertSensitivity();
      calculateProMatch();
    }
  );
}

// ══════ Event listeners ══════
fromGameSelect.addEventListener('change', convertSensitivity);
toGameSelect.addEventListener('change', convertSensitivity);
sensInput.addEventListener('input', convertSensitivity);
dpiInput.addEventListener('input', convertSensitivity);

// ══════ Init ══════
renderProDatabase();
populateMatchProSelect();
restoreState();
