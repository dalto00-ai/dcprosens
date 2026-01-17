export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Guide' | 'Gear' | 'News' | 'Esports';
  image: string;
  content: string;
}

export const posts: BlogPost[] = [
  // NEW 2026 ARTICLES
  {
    slug: 'deadlock-valve-sensitivity-converter',
    title: 'Deadlock Sensitivity Guide: Converting from CS2 & Overwatch',
    excerpt: 'Valve\'s new hero shooter "Deadlock" is here. Learn how to convert your aim from CS2 and Overwatch 2 to dominate in 2026.',
    date: 'January 25, 2026',
    readTime: '8 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `
      <h2>Valve's New Challenger</h2>
      <p>Deadlock has taken the world by storm in early 2026. Merging the MOBA lanes of Dota with the gunplay of TF2, it requires a unique aim style. 
      But how do you transfer your skills?</p>

      <h3>The Source 2 Engine Connection</h3>
      <p>Like CS2, Deadlock runs on Source 2. This means the <strong>yaw value is identical (0.022)</strong>.
      If you play CS2, your sensitivity is 1:1. You don't need to change a thing.</p>
      
      <h3>The Overwatch Conversion</h3>
      <p>Coming from Overwatch? The math is standard:
      <br><code>Overwatch Sens ÷ 3.333 = Deadlock Sens</code></p>

      <h3>Tracking vs. Clicking</h3>
      <p>Deadlock is tracking-heavy. A slightly higher cm/360 (25-35cm) is recommended compared to the tactical precision of CS (45-55cm).</p>
    `
  },
  {
    slug: 'gta-vi-aim-settings-pc',
    title: 'GTA VI PC Aim Settings: Preparing for the Launch',
    excerpt: 'GTA 6 comes to PC later this year. Here is how to prepare your mouse settings for Vice City\'s open world combat.',
    date: 'January 24, 2026',
    readTime: '6 min read',
    category: 'News',
    image: '/globe.svg',
    content: `
      <h2>Vice City Awaits</h2>
      <p>Rockstar's latest RAGE engine update brings more responsive controls than RDR2. 
      Input lag has been reduced, making competitive aim in GTA Online 2 viable.</p>

      <h3>Raw Input is Finally Here</h3>
      <p>Leaks suggest GTA VI will support Raw Input by default, bypassing the terrible Windows acceleration that plagued GTA V. 
      We recommend sticking to a consistent eDPI of around 800-1200 for third-person control.</p>
    `
  },
  {
    slug: '8khz-wireless-mouse-worth-it',
    title: 'Is 8000Hz Polling Rate Worth It in 2026?',
    excerpt: 'With the release of the Logitech G Pro X Superlight 3 and Razer Viper V4, 8KHz is standard. But can you feel it?',
    date: 'January 22, 2026',
    readTime: '10 min read',
    category: 'Gear',
    image: '/globe.svg',
    content: `
      <h2>The New Standard</h2>
      <p>In 2024, 4KHz was premium. In 2026, 8KHz is baseline. 
      High-refresh rate monitors (540Hz OLEDs) expose the micro-stutters of 1000Hz mice.</p>
      
      <h3>Battery Life Concerns?</h3>
      <p>New efficiency chips mean 8KHz mice now last 60+ hours. There is literally no downside besides CPU usage, which is negligible on modern Ryzen 9000 / Intel Ultra chips.</p>
    `
  },
  {
    slug: 'glass-mousepad-vs-cloth-2026',
    title: 'Glass Pads vs. Cloth: The Speed Meta Shift',
    excerpt: 'Why pros are abandoning traditional cloth pads for SkyPAD and Superglide glass surfaces.',
    date: 'January 21, 2026',
    readTime: '7 min read',
    category: 'Gear',
    image: '/globe.svg',
    content: `
      <h2>Friction is the Enemy</h2>
      <p>The tracking meta (Apex, The Finals, Deadlock) requires zero static friction. 
      Glass pads offer "unlimited" durability and consistency that humidity cannot affect.</p>
      
      <h3>Control on Glass?</h3>
      <p>It sounds impossible, but arm sleeves and "Control" glass textures have made stopping power possible. 
      If you haven't switched to glass in 2026, you are playing with brakes on.</p>
    `
  },
  {
    slug: 'snap-tap-rapid-trigger-keyboards',
    title: 'Snap Tap & Rapid Trigger: The Movement Revolution',
    excerpt: 'Wooting started it. Razer perfected it. Now everyone has it. How SOCD and Rapid Trigger changed strafing forever.',
    date: 'January 20, 2026',
    readTime: '9 min read',
    category: 'Gear',
    image: '/blog/snap-tap-rapid-trigger.png',
    content: `
      <h2>Perfect Counter-Strafing</h2>
      <p><strong>Snap Tap</strong> (or SOCD) ensures that you never overlap inputs. 
      When you press 'A' then 'D', the 'A' input is instantly cut. 
      This makes counter-strafing in CS2 and Valorant inhumanly consistent.</p>
      
      <h3>Is it Cheating?</h3>
      <p>Valve kicked users. Riot embraced it. Now it's a hardware standard. 
      If your keyboard doesn't have Hall Effect switches in 2026, you are at a movement disadvantage.</p>
    `
  },
  // EXISTING ARTICLES (Updated with Categories)
  {
    slug: 'valorant-to-cs2-sensitivity',
    title: 'How to Convert Valorant Sensitivity to CS2',
    excerpt: 'Stop guessing your aim. Learn the exact formula to transfer your muscle memory from Valorant to CS2 effectively.',
    date: 'January 14, 2026',
    readTime: '8 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `
      <h2>The Ultimate Valorant to CS2 Sensitivity Guide</h2>
      <p>Switching between tactical shooters is a rite of passage for many FPS players...</p>
      <p>...</p>
    `
  },
  {
    slug: 'what-is-edpi-gaming-guide',
    title: 'What is eDPI? The Ultimate Guide',
    excerpt: 'DPI, eDPI, Sensitivity... confused? We explain what eDPI is and how to calculate yours.',
    date: 'January 13, 2026',
    readTime: '6 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `
      <h2>Understanding eDPI</h2>
      <p>If you've ever looked up a pro player's settings, you've seen the term eDPI...</p>
    `
  },
  {
    slug: 'find-perfect-mouse-sensitivity',
    title: 'How to Find Your Perfect Mouse Sensitivity',
    excerpt: 'Struggling to hit shots? Try the PSA method to find your aimbot settings.',
    date: 'January 12, 2026',
    readTime: '10 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `<h2>The Quest for the "God Sens"</h2><p>...</p>`
  },
  {
    slug: 'dpi-vs-sensitivity-difference',
    title: 'DPI vs. Sensitivity: What is the Difference?',
    excerpt: 'Hardware vs Software. Should you use 400, 800, or 1600 DPI?',
    date: 'January 10, 2026',
    readTime: '7 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `<h2>The Hardware vs. Software Debate</h2><p>...</p>`
  },
  {
    slug: 'overwatch-2-to-apex-legends-aim',
    title: 'Transfer Aim from Overwatch 2 to Apex Legends',
    excerpt: 'How to sync your tracking aim between OW2 and Apex.',
    date: 'January 09, 2026',
    readTime: '5 min read',
    category: 'Guide',
    image: '/globe.svg',
    content: `<h2>The Tracking Titans</h2><p>...</p>`
  },
  {
    slug: 'games-factory-sens-perfect-aim-guide',
    title: 'Games Factory Sens: The Guide',
    excerpt: 'Unlock the secrets of the "Games Factory" sensitivity method.',
    date: 'January 17, 2026',
    readTime: '9 min read',
    category: 'Esports',
    image: '/globe.svg',
    content: `<h2>What is the "Games Factory Sens" Trend?</h2><p>...</p>`
  },
  {
    slug: 'riot-games-sensitivity-mastery',
    title: 'Riot Games Sensitivity Mastery',
    excerpt: 'Dominate the Riot ecosystem. From League of Legends to Valorant.',
    date: 'January 16, 2026',
    readTime: '11 min read',
    category: 'Esports',
    image: '/globe.svg',
    content: `<h2>The Riot Games Ecosystem</h2><p>...</p>`
  }
];
