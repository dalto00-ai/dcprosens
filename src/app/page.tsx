import Converter from '@/components/Converter';
import ProSettings from '@/components/ProSettings';
import HomeWiki from '@/components/HomeWiki';
import VoiceSearch from '@/components/VoiceSearch';
import AdsterraInContent from '@/components/AdsterraInContent';
import { AnimatedCounter, FloatingParticles, CompetitorTable, ScrollReveal } from '@/components/HomeAnimations';
import Link from 'next/link';
import type { Metadata } from 'next';
import { games as gameList } from '@/lib/games';
import { pros } from '@/lib/pros';

const toolCategories = [
    {
        title: "🎯 Aim & Sensitivity",
        tools: [
            { icon: "🔄", name: "1:1 Sensitivity Converter", desc: "Convert across dozens of game engines with precise cm/360 matching.", href: "/", tag: "MOST POPULAR" },
            { icon: "⚡", name: "Valorant to CS2 Converter", desc: "Locked-in converter, conversion table, and formula for the site's most-requested pair.", href: "/convert/valorant-to-cs2/", tag: "TOP CONVERSION" },
            { icon: "📐", name: "PSA Method Calculator", desc: "Find your scientifically perfect sensitivity using neuromuscular testing.", href: "/psa-calculator/", tag: "EXCLUSIVE" },
            { icon: "🔭", name: "Scopes & ADS 1:1", desc: "Match hip-fire and ADS sensitivity at every zoom level.", href: "/ads/", tag: "" },
            { icon: "🔎", name: "Sensitivity Finder", desc: "Guided sensitivity discovery through structured iterations.", href: "/sens-finder/", tag: "" },
            { icon: "📏", name: "FOV Converter", desc: "Convert field of view between horizontal, vertical, and diagonal formats.", href: "/fov-converter/", tag: "" },
            { icon: "📺", name: "Stretched Resolution Calc", desc: "Calculate effective FOV and pixel ratio for 4:3 stretched.", href: "/stretched-resolution/", tag: "" },
        ],
    },
    {
        title: "🏆 Pro Players & Crosshairs",
        tools: [
            { icon: "📊", name: "Pro Settings Database", desc: "DPI, sensitivity, eDPI, cm/360 and hardware of top pros.", href: "/pros/", tag: "UPDATED DAILY" },
            { icon: "⚖️", name: "Pro Compare Tool", desc: "Side-by-side comparison of pro configurations and gear.", href: "/pros/compare/", tag: "" },
            { icon: "🖥️", name: "Full Pro Setups", desc: "Complete rig breakdowns of elite players.", href: "/setups/", tag: "" },
            { icon: "✛", name: "Crosshair Generator", desc: "Design and export custom crosshairs for Valorant & CS2.", href: "/crosshair/", tag: "EXCLUSIVE" },
            { icon: "🗂️", name: "Crosshair Database", desc: "Browse and copy pro player crosshair codes instantly.", href: "/crosshair-database/", tag: "" },
            { icon: "📡", name: "Streamer Sensitivity Widget", desc: "Free embeddable widget for your Twitch panel or bio — viewers convert your sens to their game.", href: "/widget/", tag: "NEW" },
        ],
    },
    {
        title: "🔌 Gear & Hardware",
        tools: [
            { icon: "🖱️", name: "Mouse Spec Database", desc: "Sensor, dimension, weight and switch data for today's top competitive mice.", href: "/mouse-database/", tag: "" },
            { icon: "🤲", name: "Ergonomic Mouse Finder", desc: "Find the perfect mouse for your hand size and grip style.", href: "/mouse-finder/", tag: "AI POWERED" },
            { icon: "📐", name: "Mousepad Size Calculator", desc: "Calculate minimum pad dimensions based on cm/360.", href: "/mousepad-calculator/", tag: "" },
            { icon: "📊", name: "Mousepad Friction Chart", desc: "Compare friction of cloth, hybrid and glass pads.", href: "/mousepad-chart/", tag: "EXCLUSIVE" },
            { icon: "📈", name: "DPI Analyzer", desc: "Test your mouse actual DPI vs. advertised.", href: "/dpi-analyzer/", tag: "EXCLUSIVE" },
            { icon: "⌨️", name: "Keyboard & NKRO Test", desc: "Check key switches, ghosting, chattering, and latency in real time.", href: "/keyboard-test/", tag: "NEW" },
            { icon: "🎮", name: "Gamepad & Drift Tester", desc: "Measure stick drift, circularity error, and controller triggers.", href: "/gamepad-tester/", tag: "NEW" },
            { icon: "🔊", name: "Audio & Mic Tester", desc: "Verify L/R stereo imaging, frequency sweeps, and live mic input.", href: "/sound-test/", tag: "NEW" },
            { icon: "🌈", name: "Dead Pixel Screen Test", desc: "Fullscreen panel inspection for stuck or dead subpixels and bleed.", href: "/dead-pixel-test/", tag: "NEW" },
            { icon: "🌐", name: "Gaming Ping & Jitter Test", desc: "Measure live HTTP latency, jitter, and connection stability.", href: "/ping-test/", tag: "NEW" },
        ],
    },
    {
        title: "⚡ Training & Utilities",
        tools: [
            { icon: "🕹️", name: "Sensitivity Test Game", desc: "Free mini-game that measures your flick speed and precision.", href: "/sensitivity-test/", tag: "NEW" },
            { icon: "🧪", name: "Aim Lab", desc: "4 premium training modes — Micro-Flick, Dynamic Click, Strafe Peek, and Ghost vs Pro.", href: "/aim-lab/", tag: "PREMIUM" },
            { icon: "🎮", name: "Online Aim Trainer", desc: "Practice flicking, tracking and reaction time in-browser.", href: "/aim-trainer/", tag: "" },
            { icon: "📝", name: "Custom Aim Routines", desc: "Structured daily training built around your weaknesses.", href: "/aim-routines/", tag: "" },
            { icon: "⚡", name: "Reaction Time Test", desc: "Benchmark your visual reaction time scientifically.", href: "/reaction-time-test/", tag: "" },
            { icon: "🖱️", name: "CPS Click Speed Test", desc: "Test clicks per second with jitter and drag modes.", href: "/cps-test/", tag: "" },
            { icon: "💻", name: "FPS & Bottleneck Calc", desc: "Estimate maximum FPS and identify hardware bottlenecks.", href: "/fps-calculator/", tag: "" },
            { icon: "📺", name: "Hz Refresh Simulator", desc: "See the visual difference between 60Hz to 360Hz.", href: "/monitor-simulator/", tag: "" },
            { icon: "📏", name: "Desk Space Calculator", desc: "Check if your desk supports your cm/360 for full arm sweeps.", href: "/desk-space-calculator/", tag: "" },
            { icon: "⌨️", name: "CS2 Bind Generator", desc: "Generate optimized key-bind configs for Counter-Strike 2.", href: "/bind-generator/", tag: "" },
        ],
    },
];

const gameCount = gameList.length;
const proCount = pros.length;
const toolCount = toolCategories.reduce((n, c) => n + c.tools.length, 0);

export const metadata: Metadata = {
    title: "DCPROSENS — Gaming Sensitivity Converter & DPI Calculator",
    description: `Convert mouse sensitivity between Valorant, CS2, Apex Legends, Overwatch 2 and ${gameCount}+ games using each game's real yaw value. ${toolCount}+ free precision tools.`,
    keywords: [
        'sensitivity converter', 'mouse sensitivity converter', 'gaming sensitivity calculator',
        'valorant to cs2 sensitivity', 'cs2 sensitivity converter', 'apex legends sensitivity converter',
        'overwatch 2 sensitivity converter', 'fortnite sensitivity converter', 'cod warzone sensitivity',
        'rainbow six siege sensitivity', 'pubg sensitivity converter', 'battlefield sensitivity',
        'edpi calculator', 'cm360 calculator', 'cm per 360 calculator', 'dpi calculator gaming',
        'mouse dpi calculator', 'true sensitivity calculator', 'game sensitivity calculator free',
        'online sensitivity converter', 'sensitivity converter tool 2026', 'mouse sensitivity converter 2026',
        'pro player sensitivity settings', 'tenz sensitivity', 's1mple dpi settings',
        'zywoo cs2 settings', 'aspas valorant sens', 'what sensitivity do pros use',
        'copy pro player sensitivity', 'pro gamer mouse settings',
        'how to convert valorant sensitivity to cs2', 'valorant sensitivity same feel cs2',
        'apex legends to valorant sensitivity', 'best sensitivity for fps games',
        'low sensitivity vs high sensitivity fps', 'ideal sensitivity gaming',
        '400 dpi vs 800 dpi gaming', 'what dpi should i use for fps',
        'psa method calculator', 'aim trainer online', 'crosshair generator valorant',
        'mouse database gaming', 'gaming mousepad calculator', 'dpi analyzer',
    ],
    alternates: {
        canonical: "https://dcprosens.com/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "DCPROSENS — #1 Gaming Sensitivity Calibration Platform",
        description: `Convert sensitivity between Valorant, CS2, Apex, Overwatch 2 and ${gameCount}+ games. Pro settings, aim tools & more.`,
        url: "https://dcprosens.com/",
        type: "website",
    },
};

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "DCPROSENS Sensitivity Converter",
                "applicationCategory": "GameApplication",
                "operatingSystem": "Web",
                "url": "https://dcprosens.com/",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "description": "The ultimate gaming sensitivity converter for Valorant, CS2, Overwatch 2, Apex Legends and more.",
                "featureList": [
                    `Sensitivity conversion between ${gameCount}+ games`,
                    "Real-time cm/360 calculation",
                    "eDPI calculator",
                    "Pro player settings database",
                    "PSA Method Calculator",
                    "Crosshair Generator & Database",
                    "Mouse Spec Database",
                    "3D Aim Trainer",
                    "DPI Analyzer",
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: [
                    { "@type": "Question", "name": "How to convert Valorant sensitivity to CS2?", "acceptedAnswer": { "@type": "Answer", "text": "Multiply your Valorant sensitivity by 3.18 to get your CS2 sensitivity. For example, Valorant 0.3 × 3.18 = 0.954 in CS2. This formula preserves your cm/360 across both games." } },
                    { "@type": "Question", "name": "What is eDPI and how do I calculate it?", "acceptedAnswer": { "@type": "Answer", "text": "eDPI (Effective Dots Per Inch) = Mouse DPI × In-Game Sensitivity. For example, 800 DPI × 0.3 = 240 eDPI." } },
                    { "@type": "Question", "name": "What is cm/360 in gaming?", "acceptedAnswer": { "@type": "Answer", "text": "cm/360 is the physical centimeters you must move your mouse to rotate 360° in a game. Most competitive FPS players use 25–55cm/360." } },
                    { "@type": "Question", "name": "What sensitivity do pro Valorant players use?", "acceptedAnswer": { "@type": "Answer", "text": "Most pro Valorant players use between 200–400 eDPI. TenZ uses 240 eDPI, Aspas uses 320 eDPI." } },
                    { "@type": "Question", "name": "Is the sensitivity converter free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, DCPROSENS sensitivity converter is 100% free with no registration required." } },
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://dcprosens.com#website",
                "name": "DCPROSENS",
                "url": "https://dcprosens.com/",
                "description": `Free gaming sensitivity converter for Valorant, CS2, Apex Legends, Overwatch 2 and ${gameCount}+ FPS games.`,
                "publisher": { "@id": "https://dcprosens.com#organization" },
                "inLanguage": "en-US",
                // No SearchAction here on purpose. It used to declare
                // `https://dcprosens.com/blog?q={search_term_string}`, but /blog
                // has no search — this is a static export with no query handling.
                // Google crawled the literal template URL and filed it under
                // "Page with redirect" in Search Console. Declaring a sitewide
                // search box the site does not have is a false capability claim;
                // it belongs here only once a real /blog search endpoint exists.
            },
            {
                "@type": "Organization",
                "@id": "https://dcprosens.com#organization",
                "name": "DCPROSENS",
                "url": "https://dcprosens.com/",
                "logo": { "@type": "ImageObject", "url": "https://dcprosens.com/og-image.png", "width": 1024, "height": 1024 },
                // sameAs is what lets Google (and LLM retrieval) tie this site to a
                // single real-world entity instead of treating each surface as an
                // unrelated domain. Only verified, live profiles belong here — an
                // unreachable URL weakens the cluster rather than strengthening it.
                "sameAs": [
                    "https://www.linkedin.com/in/dalto-cardoso-2a47ab122/",
                    "https://www.instagram.com/dcprosensofficial/",
                    "https://www.tiktok.com/@dcprosens",
                    "https://x.com/dcprosens",
                    "https://chromewebstore.google.com/detail/dcprosens-sensitivity-con/hamlcadjopefnhcebjafcllomlphapbc",
                    "https://play.google.com/store/apps/details?id=com.dcprosens.app",
                ],
            },
        ],
    };

    const trustBarGames = [
        "Valorant", "CS2", "Apex Legends", "Overwatch 2", "Fortnite",
        "Call of Duty", "R6 Siege", "PUBG", "Battlefield", "Halo Infinite",
        "Destiny 2", "The Finals", "Deadlock", "XDefiant", "Marvel Rivals",
    ];

    return (
        <div className="container page-container">
            <script dangerouslySetInnerHTML={{ __html: `if(window.location.hostname==='app.dcprosens.com'){window.location.replace('/login/')}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ═══════════ HERO ═══════════ */}
            <div className="hero-section" style={{ position: 'relative' }}>
                <FloatingParticles />

                <div className="home-hero-badge">
                    <span className="home-hero-badge-dot"></span>
                    TRUSTED BY COMPETITIVE PLAYERS WORLDWIDE
                </div>

                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    The <span className="text-gradient-animated">#1 Mouse Sensitivity Converter</span><br />
                    & Aim Calibration Platform
                </h1>

                <p className="hero-subtitle" style={{ marginBottom: '2rem', maxWidth: '650px' }}>
                    Convert sensitivity across {gameCount}+ games, study pro player setups, calibrate your aim scientifically,
                    and access {toolCount}+ precision tools — all in one place.
                </p>

                {/* Animated Stats Counter */}
                <div className="home-stats-row">
                    <div className="home-stat-item">
                        <span className="home-stat-number"><AnimatedCounter target={gameCount} suffix="+" /></span>
                        <span className="home-stat-label">Games</span>
                    </div>
                    <div className="home-stat-divider"></div>
                    <div className="home-stat-item">
                        <span className="home-stat-number"><AnimatedCounter target={toolCount} suffix="+" /></span>
                        <span className="home-stat-label">Tools</span>
                    </div>
                    <div className="home-stat-divider"></div>
                    <div className="home-stat-item">
                        <span className="home-stat-number"><AnimatedCounter target={proCount} suffix="+" /></span>
                        <span className="home-stat-label">Pro Players</span>
                    </div>
                    <div className="home-stat-divider"></div>
                    <div className="home-stat-item">
                        <span className="home-stat-number"><AnimatedCounter target={100} suffix="%" /></span>
                        <span className="home-stat-label">Free Core</span>
                    </div>
                </div>

                <VoiceSearch />
                <Converter />
                <AdsterraInContent />

                {/* ═══════════ GAMES TRUST BAR ═══════════ */}
                <ScrollReveal>
                    <section className="home-games-section">
                        <p className="home-games-label">SUPPORTING ALL MAJOR COMPETITIVE TITLES</p>
                        <div className="home-games-grid">
                            {trustBarGames.map((game) => (
                                <span key={game} className="home-game-chip">{game}</span>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ FREE AIM TRAINER SPOTLIGHT ═══════════ */}
                <ScrollReveal>
                    <section className="home-cta-section" style={{ marginTop: '3rem' }}>
                        <div className="home-cta-inner">
                            <span className="home-section-badge">🎮 100% FREE — NO SIGN-UP REQUIRED</span>
                            <h2 className="home-cta-title">
                                Practice &amp; Test Your Aim <span className="text-gradient">Right Now</span>
                            </h2>
                            <p className="home-cta-desc">
                                Our browser-based Aim Trainer simulates your exact in-game sensitivity — Gridshot flicks,
                                target tracking, and reflex drills. Free forever, no registration needed.
                            </p>
                            <div className="home-cta-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Link href="/aim-trainer/" className="home-cta-btn-primary">
                                    🎮 Play Free Aim Trainer →
                                </Link>
                                <Link href="/sensitivity-test/" className="home-cta-btn-secondary" style={{ border: '1px solid #00ff9d', color: '#00ff9d' }}>
                                    🕹️ Sensitivity Test (3 Free Trials)
                                </Link>
                                <Link href="/aim-lab/" className="home-cta-btn-secondary">
                                    ⚡ Unlock Aim Lab Pro
                                </Link>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ COMPLETE TOOL SUITE ═══════════ */}
                <ScrollReveal>
                    <section className="home-tools-section">
                        <div className="home-section-header">
                            <span className="home-section-badge">🛠️ COMPLETE PLATFORM</span>
                            <h2 className="home-section-title">
                                Everything You Need to <span className="text-gradient">Dominate</span>
                            </h2>
                            <p className="home-section-desc">
                                Not just a converter. A complete calibration ecosystem with {toolCount}+ tools.
                                No competitor offers this breadth of features in one platform.
                            </p>
                        </div>

                        {toolCategories.map((category) => (
                            <div key={category.title} className="home-tool-category">
                                <h3 className="home-tool-category-title">{category.title}</h3>
                                <div className="home-tool-grid">
                                    {category.tools.map((tool) => (
                                        <Link key={tool.name} href={tool.href} className="home-tool-card">
                                            {tool.tag && <span className="home-tool-tag">{tool.tag}</span>}
                                            <div className="home-tool-card-icon">{tool.icon}</div>
                                            <h4 className="home-tool-card-name">{tool.name}</h4>
                                            <p className="home-tool-card-desc">{tool.desc}</p>
                                            <span className="home-tool-card-arrow">→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </ScrollReveal>

                {/* ═══════════ COMPETITOR COMPARISON ═══════════ */}
                <ScrollReveal>
                    <section className="home-compare-section">
                        <div className="home-section-header">
                            <span className="home-section-badge">📊 COMPARISON</span>
                            <h2 className="home-section-title">
                                See How We <span className="text-gradient">Stack Up</span>
                            </h2>
                            <p className="home-section-desc">
                                We built every feature that our competitors charge for — and added tools nobody else has.
                            </p>
                        </div>
                        <CompetitorTable />
                    </section>
                </ScrollReveal>

                {/* ═══════════ WHY DCPROSENS ═══════════ */}
                <ScrollReveal>
                    <section className="home-why-section">
                        <div className="home-section-header">
                            <span className="home-section-badge">⚡ WHY DCPROSENS</span>
                            <h2 className="home-section-title">
                                What Makes Us <span className="text-gradient">Different</span>
                            </h2>
                        </div>

                        <div className="home-why-grid">
                            <div className="home-why-card home-why-card-glow">
                                <div className="home-why-icon">🧠</div>
                                <h3>Neuromuscular Science</h3>
                                <p>Our PSA Method uses structured physical movement tests — not random guessing — to mathematically converge on your perfect sensitivity.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">🔬</div>
                                <h3>Mathematical Precision</h3>
                                <p>Engine-specific yaw constants, focal-length matching and DPI-aware cm/360. Not simple multiplication tables.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">🎯</div>
                                <h3>All-In-One Platform</h3>
                                <p>{toolCount}+ tools in one place. Sensitivity converter, pro databases, aim trainer, crosshair tools, mouse finder, DPI analyzer.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">🆓</div>
                                <h3>Free Core Access</h3>
                                <p>The converter, pro settings database, and essential tools are 100% free. No paywall to convert your sensitivity.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">📱</div>
                                <h3>Works Everywhere</h3>
                                <p>Fully responsive. Convert sensitivity, browse pro setups and train your aim on any device — no download needed.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">🔒</div>
                                <h3>Privacy First</h3>
                                <p>All calculations run in your browser. We never store your data. Zero tracking, zero telemetry on your settings.</p>
                            </div>
                            <div className="home-why-card">
                                <div className="home-why-icon">🕹️</div>
                                <h3>Test It, Don&apos;t Just Guess</h3>
                                <p>Our free Sensitivity Test mini-game measures your actual flick speed and precision — no other site turns calibration into a game.</p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ PRO SETTINGS DATABASE ═══════════ */}
                <ScrollReveal>
                    <ProSettings />
                </ScrollReveal>

                {/* ═══════════ PREMIUM TOOL PREVIEWS ═══════════ */}
                <ScrollReveal>
                    <section className="home-premium-preview">
                        <div className="home-section-header">
                            <span className="home-section-badge">🔒 PREMIUM TOOLS PREVIEW</span>
                            <h2 className="home-section-title">
                                Unlock <span className="text-gradient">Advanced</span> Calibration
                            </h2>
                            <p className="home-section-desc">
                                These exclusive tools go beyond basic conversion — giving you the competitive edge that separates good aim from elite aim.
                            </p>
                        </div>

                        <div className="home-preview-grid">
                            {/* Preview Card 1: Pro Visual Comparator */}
                            <div className="home-preview-card">
                                <div className="home-preview-card-header">
                                    <span className="home-preview-icon">⚖️</span>
                                    <div>
                                        <h3>Pro Visual Comparator</h3>
                                        <span className="home-preview-badge">PREMIUM</span>
                                    </div>
                                </div>
                                <div className="home-preview-body">
                                    <div className="home-preview-mockup">
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Your cm/360°</span>
                                            <span className="home-preview-value home-preview-green">40.8 cm</span>
                                        </div>
                                        <div className="home-preview-bar">
                                            <div className="home-preview-bar-fill" style={{ width: '55%' }}></div>
                                            <span className="home-preview-bar-marker" style={{ left: '55%' }}>YOU</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">TenZ cm/360°</span>
                                            <span className="home-preview-value home-preview-green">54.4 cm</span>
                                        </div>
                                        <div className="home-preview-bar">
                                            <div className="home-preview-bar-fill home-preview-bar-pro" style={{ width: '72%' }}></div>
                                            <span className="home-preview-bar-marker home-preview-bar-marker-pro" style={{ left: '72%' }}>PRO</span>
                                        </div>
                                    </div>
                                    <div className="home-preview-blur-overlay"></div>
                                </div>
                                <p className="home-preview-desc">
                                    Visualize the physical distance your mouse travels on the mousepad compared to pros like TenZ, s1mple and NiKo. Includes AI coaching verdicts.
                                </p>
                                <Link href="/pricing/" className="home-preview-cta">Unlock This Tool →</Link>
                            </div>

                            {/* Preview Card 2: Aim Lab Pro (4 Advanced Modes) */}
                            <div className="home-preview-card">
                                <div className="home-preview-card-header">
                                    <span className="home-preview-icon">🧪</span>
                                    <div>
                                        <h3>Aim Lab Pro (4 Modes)</h3>
                                        <span className="home-preview-badge">PRO EXCLUSIVE</span>
                                    </div>
                                </div>
                                <div className="home-preview-body">
                                    <div className="home-preview-mockup">
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Mode 1: Micro-Flick</span>
                                            <span className="home-preview-value">✓</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Mode 2: Dynamic Click</span>
                                            <span className="home-preview-value">✓</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Mode 3: Strafe Peek</span>
                                            <span className="home-preview-value home-preview-green">→</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Ghost vs. Pro (TenZ)</span>
                                            <span className="home-preview-value home-preview-green">ACTIVE</span>
                                        </div>
                                    </div>
                                    <div className="home-preview-blur-overlay"></div>
                                </div>
                                <p className="home-preview-desc">
                                    Train across 4 competitive drill modes including Ghost vs. Pro pacing against TenZ, s1mple, and Aspas with live accuracy telemetry.
                                </p>
                                <Link href="/pricing/" className="home-preview-cta">Unlock Pro Access →</Link>
                            </div>

                            {/* Preview Card 3: AI Daily Aim Routines & Cloud Sync */}
                            <div className="home-preview-card">
                                <div className="home-preview-card-header">
                                    <span className="home-preview-icon">🤖</span>
                                    <div>
                                        <h3>AI Routines &amp; Cloud Sync</h3>
                                        <span className="home-preview-badge">PRO EXCLUSIVE</span>
                                    </div>
                                </div>
                                <div className="home-preview-body">
                                    <div className="home-preview-mockup">
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Weakness Focus</span>
                                            <span className="home-preview-value">Micro-Corrections</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Daily Schedule</span>
                                            <span className="home-preview-value">20 Min / 4 Drills</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">Saved Cloud Profiles</span>
                                            <span className="home-preview-value home-preview-green">UNLIMITED</span>
                                        </div>
                                        <div className="home-preview-mockup-row">
                                            <span className="home-preview-label">18-Vol Field Guides</span>
                                            <span className="home-preview-value home-preview-green">INCLUDED</span>
                                        </div>
                                    </div>
                                    <div className="home-preview-blur-overlay"></div>
                                </div>
                                <p className="home-preview-desc">
                                    Generate personalized daily training schedules tailored to your main game, sync unlimited sensitivity profiles in the cloud, and access all 18 Pro Field Guides.
                                </p>
                                <Link href="/pricing/" className="home-preview-cta">Unlock Pro Access →</Link>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ HOW IT WORKS ═══════════ */}
                <ScrollReveal>
                    <section className="home-howto-section">
                        <div className="home-section-header">
                            <span className="home-section-badge">🚀 GET STARTED</span>
                            <h2 className="home-section-title">
                                How to <span className="text-gradient">Calibrate</span> Your Aim
                            </h2>
                        </div>

                        <div className="home-howto-grid">
                            <div className="home-howto-step">
                                <div className="home-howto-number">01</div>
                                <h3>Convert Your Sensitivity</h3>
                                <p>Use the converter above to match your sensitivity across all your games with identical cm/360.</p>
                            </div>
                            <div className="home-howto-step">
                                <div className="home-howto-number">02</div>
                                <h3>Find Your PSA Baseline</h3>
                                <p>Run the PSA Method Calculator to discover your scientifically optimal sensitivity.</p>
                            </div>
                            <div className="home-howto-step">
                                <div className="home-howto-number">03</div>
                                <h3>Study Pro Setups</h3>
                                <p>Compare your settings with elite players using the Pro Database and visual comparator.</p>
                            </div>
                            <div className="home-howto-step">
                                <div className="home-howto-number">04</div>
                                <h3>Train & Refine</h3>
                                <p>Lock in your settings and train daily using the Aim Trainer and custom routines.</p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ CTA PREMIUM ═══════════ */}
                <ScrollReveal>
                    <section className="home-cta-section">
                        <div className="home-cta-inner">
                            <span className="home-section-badge">✨ UNLOCK FULL ACCESS</span>
                            <h2 className="home-cta-title">
                                Ready to Go <span className="text-gradient">Premium</span>?
                            </h2>
                            <p className="home-cta-desc">
                                Unlock all {toolCount}+ tools, advanced pro comparisons, custom aim routines, crosshair generator,
                                mousepad analytics, DPI analyzer and more. Plans start at just $4.08/month on the annual pass.
                            </p>
                            <div className="home-cta-buttons">
                                <Link href="/pricing/" className="home-cta-btn-primary">
                                    View Plans & Pricing →
                                </Link>
                                <Link href="/login/" className="home-cta-btn-secondary">
                                    Sign Up Free
                                </Link>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ═══════════ VIBERANK BADGE ═══════════ */}
                <ScrollReveal>
                    <section className="home-cta-section" style={{ textAlign: 'center' }}>
                        <span className="home-section-badge">🏅 FEATURED ON</span>
                        <p className="home-section-desc" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                            Enjoying DCPROSENS? Leave us a vote and a review on VibeRank.
                        </p>
                        <a href="https://viberank.dev/apps/DCPROSENS" target="_blank" rel="noopener noreferrer">
                            {/* eslint-disable-next-line @next/next/no-img-element -- external badge that updates itself server-side on viberank.dev, next/image's domain allowlist adds no value here */}
                            <img src="https://viberank.dev/badge?app=DCPROSENS&theme=dark" alt="DCPROSENS on VibeRank" />
                        </a>
                    </section>
                </ScrollReveal>

                {/* ═══════════ MID/BOTTOM AD SLOT ═══════════ */}
                <AdsterraInContent />

                {/* ═══════════ SEO WIKI ═══════════ */}
                <HomeWiki />
            </div>
        </div>
    );
}
