export interface Chapter {
  number: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  rank: string;
  game: string;
  quote: string;
  avatar?: string;
}

export interface EbookProduct {
  id: string;
  slug: string;
  vol: number;
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  price: number; // in USD
  regularPrice: number;
  stripePaymentLink: string;
  mockupImage: string;
  coverImage: string;
  pdfPath: string;
  pagesCount: number;
  rating: number;
  reviewsCount: number;
  shortDesc: string;
  longDesc: string;
  whoIsThisFor: string[];
  whatYouWillMaster: string[];
  chapters: Chapter[];
  testimonials: Testimonial[];
  faq: { question: string; answer: string }[];
}

export const MASTER_BUNDLE = {
  id: "complete-esports-master-bundle",
  title: "The Complete Esports Master Suite (18 Volumes Omnibus)",
  subtitle: "Every Technical Field Guide in One 62-Page Master Omnibus — Full Precision Aim System, GTA VI, CS2 Sub-Tick, Valorant Radiant, Hardware & Controller Mastery.",
  price: 39.99,
  regularPrice: 89.94,
  discountPercent: 55,
  stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
  totalModules: 18,
  totalPages: 62,
  mockupImage: "/ebooks/mockup_3d_book_1.png",
  pdfPath: "/ebooks/DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf",
  includes: [
    "Vol 01: The Precision Aim System Manifesto (6 Pages)",
    "Vol 02: GTA VI Pro Aim & Controller Field Guide (4 Pages)",
    "Vol 03: CS2 Sub-Tick Aim & Autoexec Field Guide",
    "Vol 04: Valorant Radiant Aim & eDPI Field Guide",
    "Vol 05: Warzone, BO6 & Apex Tracking Field Guide",
    "Vol 06: Zero-Latency PC & Sensor Hardware Guide",
    "Vol 07: The Architect of Precision 1:1 Engine Yaw Blueprint",
    "Vol 08: Apex Legends Competitive ALC & Recoil Smoothing Bible",
    "Vol 09: Overwatch 2 Hitscan, Projectile & Relative Zoom Guide",
    "Vol 10: Deadlock Eternus Aim, Third-Person & Soul-Orb Flick Guide",
    "Vol 11: Marvel Rivals Competitive Hero Crosshair & Parallax Guide",
    "Vol 12: Rainbow Six Siege Ranked 3.0 Multiplier & 1:1 ACOG Guide",
    "Vol 13: Fortnite Competitive Targeting, Scopes & Linear Pad Guide",
    "Vol 14: Escape From Tarkov 1.0 & Gray Zone Warfare Ballistics Guide",
    "Vol 15: Delta Force, FragPunk & Arc Raiders 2026 Tactical Guide",
    "Vol 16: Rapid Trigger, Hall Effect & Counter-Strafe Synchronization Bible",
    "Vol 17: The Pro Controller Bible: TMR Sticks, 1000Hz Overclock & Aim Assist",
    "Vol 18: The 2026 Esports Peripherals Matrix: Mice, Glass Pads, Skates & OLEDs",
    "Bonus: 62-Page Master Omnibus PDF + Companion Worksheets",
    "Lifetime Updates: Free revisions whenever game engines update"
  ]
};

export const EBOOKS_CATALOG: EbookProduct[] = [
  {
    id: "complete-esports-master-bundle",
    slug: "complete-esports-master-bundle",
    vol: 0,
    badge: "OFFICIAL 18-VOLUME SUITE // COMPLETE ESPORTS MASTER OMNIBUS",
    title: "The Complete Esports Master Suite (18 Volumes Omnibus)",
    subtitle: "Every Technical Field Guide in One 62-Page Master Omnibus — Full Precision Aim System, GTA VI, CS2 Sub-Tick, Valorant Radiant, Hardware & Controller Mastery",
    tagline: "Own the complete competitive FPS library. 18 field guides, 62 dense technical pages, sensor telemetry, sub-tick autoexec scripts, per-optic calculators, and controller aim assist blueprints.",
    price: 39.99,
    regularPrice: 89.94,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_architect_of_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf",
    pagesCount: 62,
    rating: 5.0,
    reviewsCount: 1420,
    shortDesc: "The complete 18-volume esports engineering compilation: tactical shooters, battle royales, hero shooters, 3rd-person tracking, PC input latency, rapid-trigger keyboards, and pro controllers with continuous 0ms aim assist.",
    longDesc: "Why purchase field guides individually when you can secure the entire 18-volume competitive library at a 55% discount? The Complete Esports Master Suite bundles all 18 standalone DCPROSENS technical field guides into a single 62-page omnibus: Volume 1 (Precision Aim System Manifesto), Volume 2 (GTA VI Pro Aim & Controller), Volume 3 (CS2 Sub-Tick & Autoexec), Volume 4 (Valorant Radiant Aim & eDPI), Volume 5 (Warzone/BO6/Apex Tracking), Volume 6 (Zero-Latency PC & Sensors), Volume 7 (Universal 1:1 Sensitivity Blueprint), Volume 8 (Apex Competitive ALC), Volume 9 (Overwatch 2 Zoom Ratios), Volume 10 (Deadlock Third-Person & Soul-Orbs), Volume 11 (Marvel Rivals Parallax), Volume 12 (R6 Siege 0.002 Multiplier & ACOG), Volume 13 (Fortnite Competitive), Volume 14 (Tarkov & Gray Zone Ballistics), Volume 15 (Delta Force & FragPunk), Volume 16 (Rapid Trigger & Counter-Strafing), Volume 17 (Pro Controller TMR Sticks & Aim Assist), and Volume 18 (Esports Peripherals Matrix). Includes lifetime digital updates and all telemetry worksheets.",
    whoIsThisFor: [
      "Serious competitive players competing across multiple FPS titles (CS2, Valorant, Warzone, Apex, R6, Marvel Rivals, Deadlock)",
      "Esports athletes, team coaches, and content creators needing the definitive reference library for all game engine yaw constants and FOV scaling math",
      "Gamers transitioning between mouse/keyboard and pro controllers who demand zero input lag and mathematically perfect muscle memory",
      "Anyone wanting to own the entire 18-volume collection at a massive 55% bundle discount"
    ],
    whatYouWillMaster: [
      "Complete 18-Volume Technical Library: 62 pages covering every major competitive shooter engine and hardware interface",
      "1:1 Universal Muscle Memory: Zero discrepancy between CS2, Valorant, Apex, Call of Duty, Overwatch, Fortnite, and GTA VI",
      "Sub-Tick & Engine Tuning: Autoexec aliases, desync buffer elimination, tickrate interpolation, and 1:1 ADS focal matching",
      "0ms Rotational Aim Assist (RAA): Vector activation thresholds, 75% left-stick max deadzone secret, and 1000Hz controller overclocking",
      "Hall-Effect & Rapid Trigger: 0.10mm magnetic actuation, 48ms counter-strafe latency reduction, and tournament SOCD compliance",
      "Peripheral Tribology: Matching mousepad static/dynamic friction (μs/μk), aftermarket skate CPI ride-height shifts, and 480Hz OLED motion clarity"
    ],
    chapters: [
      { number: 1, title: "Tactical Shooters: CS2 Sub-Tick, Valorant Radiant Aim & R6 Siege 0.002 Multipliers", description: "Source 2 sub-tick click timing, Riot Unreal Engine focal matching, and Rainbow Six Siege 1:1 ACOG optical scaling." },
      { number: 2, title: "Battle Royales & Hero Shooters: Warzone, Apex Competitive ALC, Overwatch 2 & Marvel Rivals", description: "Recoil smoothing physics, 4-3 Linear controller curves, relative zoom sensitivity formulas, and 3rd-person crosshair parallax." },
      { number: 3, title: "Next-Gen 2026 Engines: GTA VI Leonida, Deadlock Eternus, Delta Force & FragPunk", description: "Rockstar RAGE free-aim vehicle mechanics, third-person soul-orb flicking, UE 5.6 targeting, and card-shard sensitivity scaling." },
      { number: 4, title: "Hardware, Sensors & Presentation Latency: 8000Hz Mice, DPC Latency & 480Hz OLEDs", description: "Eliminating Windows 11 flip-model buffer delay, sensor spin-out physics, PTFE skate ride-height CPI deviations, and display motion clarity." },
      { number: 5, title: "Movement & Controller Mastery: Rapid Trigger Hall-Effect, TMR Sticks & 1000Hz Overclocking", description: "0.1mm magnetic switch counter-strafing, tournament SOCD anti-cheat compliance, ALPS vs TMR joystick sensors, and continuous Rotational Aim Assist uptime." }
    ],
    testimonials: [
      { name: "Lucas 'Valkyrie' M.", rank: "Multi-Game Esports Coach", game: "CS2 & Valorant", quote: "Having all 18 guides in a single 62-page omnibus is the holy grail for our team. Whenever a player swaps mice, changes games, or switches to a Rapid Trigger keyboard, the exact engineering solution is right here." },
      { name: "Brandon 'Ravage' T.", rank: "Pro Controller Player", game: "Warzone & Apex", quote: "Buying the Master Bundle was the best investment I made this year. The controller sections (Vol 2, Vol 5, Vol 8, Vol 17) gave me the tightest centering and aim assist uptime I've ever experienced." }
    ],
    faq: [
      { question: "What exactly is included in the Complete Esports Master Suite?", answer: "You receive immediate access to the full 62-page Master Omnibus PDF containing all 18 technical field guides, plus download links to all 18 individual field guide PDFs and companion calibration worksheets." },
      { question: "Do I get free updates when games update?", answer: "Yes! Your purchase grants lifetime access to all future editions and engine revisions (such as GTA VI PC launch updates, CS2 engine patches, and new competitive shooter profiles)." },
      { question: "How does the transparent checkout work?", answer: "Click 'Instant Access & Download' to open our secure, encrypted Stripe checkout directly on the page. Complete your order via card, Apple Pay, or Google Pay without ever leaving dcprosens.com." },
      { question: "Is there a money-back guarantee?", answer: "Yes, every DCPROSENS field guide and master bundle comes with a no-questions-asked 14-day money-back guarantee." }
    ]
  },
  {
    id: "01-precision-aim-system-manifesto",
    slug: "precision-aim-system-manifesto",
    vol: 1,
    badge: "FIELD GUIDE 01 // NEUROMUSCULAR CALIBRATION",
    title: "The Precision Aim System Manifesto",
    subtitle: "Neuromuscular Calibration, 7-Step PSA & 0% MDM Math Across 90+ FPS Engines",
    tagline: "The definitive mathematical and biomechanical blueprint for 1:1 mouse sensitivity across 90+ FPS engines.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/4gM14m6R31Vo6Bka6g1ck04",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_architect_of_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_1_The_Precision_Aim_System_Manifesto.pdf",
    pagesCount: 6,
    rating: 4.98,
    reviewsCount: 384,
    shortDesc: "The engineering foundation of competitive FPS aiming: master 3D camera yaw physics, execute the 7-step PSA binary convergence protocol, calibrate 0% Monitor Distance Matching, and build permanent myelin motor memory.",
    longDesc: "Every game engine translates physical mouse movement into 3D angular rotation through its own internal Yaw constant. Changing your sensitivity after a bad match destroys neuromuscular motor memory. The Precision Aim System Manifesto gives you an empirical testing protocol to calculate your true anatomical cm/360, synchronize arm vs wrist pivots, and lock in 1:1 optical tracking across Valorant, CS2, Apex Legends, and Warzone.",
    whoIsThisFor: [
      "Competitive FPS players who constantly switch sensitivities after tough losses",
      "Gamers experiencing wrist stiffness, jerky micro-aim, or tracking inconsistency",
      "Players transitioning between CS2, Valorant, Apex Legends, and Warzone who feel disconnected",
      "Aim enthusiasts who want mathematically verified 1:1 focal length matching across all scopes"
    ],
    whatYouWillMaster: [
      "Game Engine 3D Camera Rotation Physics: Why in-game slider numbers lie and deconstructing m_yaw",
      "Universal cm/360 Mathematical Formula: Converting hand displacement into absolute physical metrics",
      "The 7-Step PSA Method: Neuromuscular binary search to find your hand's anatomical sweet spot in 25 mins",
      "Biomechanical Pivot Synchronization: Arm sweeps (35-50cm), Wrist centering (25-35cm), Finger micro-flicks",
      "Optical Scope Scaling & 0% vs 100% MDM: Preserving identical focal speed on center-screen pixels",
      "The 30-Day Neuromuscular Periodization: Daily 15-minute warmup protocol and permanent motor calibration"
    ],
    chapters: [
      { number: 1, title: "The Physics of 3D Camera Rotation: Why In-Game Numbers Lie", description: "Deconstructing optical DPI integer counts, USB HID polling, and game engine m_yaw constants across Source, Unreal, and idTech." },
      { number: 2, title: "Universal cm/360 Metric & The Physical Sensitivity Spectrum", description: "Measuring real hand travel across Wrist (<25cm), Hybrid (25-35cm), and Arm (35-50cm) ergonomic brackets." },
      { number: 3, title: "Hardware Sensor Deviation & 1600 DPI Click-to-Photon Physics", description: "Why 1600 DPI slashes sensor input lag without smoothing, and the 10cm physical ruler calibration test." },
      { number: 4, title: "The 7-Step PSA Method: Neuromuscular Binary Convergence", description: "The exact high/low bracket iteration protocol to isolate your nervous system's optimal target acquisition center." },
      { number: 5, title: "Biomechanical Pivot Mechanics: Arm, Wrist & Finger Synchronization", description: "How the shoulder anchors, the elbow positions, the wrist centers, and fingertip micro-adjustments land headshots." },
      { number: 6, title: "Optical Scope Scaling: 0% vs. 100% Monitor Distance Match (MDM)", description: "The trigonometry of focal length matching and why 0% MDM preserves 1:1 screen-center micro-flick muscle memory." },
      { number: 7, title: "Cross-Game Sensitivity Translation Table (Valorant, CS2, Apex, CoD, OW2)", description: "Direct numerical conversion formulas and yaw multipliers to keep identical cm/360 across all active engines." },
      { number: 8, title: "The 30-Day Neuromuscular Periodization Routine", description: "Overcoming confirmation bias, building dense myelin sheathing, and locking your physical settings permanently." },
      { number: 9, title: "Pre-Match 15-Minute Calibration Checklist & Worksheets", description: "Step-by-step physical routine: tendon glides, smoothness tracking, metronome micro-clicks, and strafe sync." },
      { number: 10, title: "Diagnostic Troubleshooting & Advanced Telemetry Tools", description: "Isolating pad friction mud, DPI drift, and testing your baseline metrics on DCPROSENS Pro tools." }
    ],
    testimonials: [
      { name: "Marcus 'Viper' T.", rank: "Valorant Radiant", game: "Valorant", quote: "My Operator scoped aim always felt completely detached from my Vandal rifle. After applying the 0% MDM formula and the 1600 DPI switch from Chapter 6, my micro-adjustments locked in. Climbed from Ascendant to Radiant in 3 weeks." },
      { name: "Alexandre S.", rank: "Faceit Level 10 (2450 ELO)", game: "CS2", quote: "The 7-Step PSA protocol took all the anxiety out of my settings. I locked in 42.4 cm/360 and haven't touched my slider in 4 months. Unbelievable consistency." }
    ],
    faq: [
      { question: "Will this guide work for my mouse model and DPI?", answer: "Yes. The formulas apply to all optical gaming sensors (Logitech HERO, Razer Focus Pro, PixArt PAW3395/3950, Zowie, Lamzu) and all DPI levels." },
      { question: "How long does the 7-Step PSA calibration take?", answer: "The complete binary convergence protocol takes approximately 25 to 30 minutes in your game's training range or in Aim Lab." },
      { question: "What files do I receive upon purchase?", answer: "Instant DRM-free high-resolution PDF field guide formatted for mobile and desktop reading, complete with interactive printable worksheets and telemetry tables." }
    ]
  },
  {
    id: "02-gta-6-pro-aim-controller-guide",
    slug: "gta-6-pro-aim-controller-guide",
    vol: 2,
    badge: "FIELD GUIDE 02 // LEONIDA FREE AIM",
    title: "GTA VI Complete Launch Bible & Pro Aim Guide",
    subtitle: "Cheat Codes, 55-Trophy Platinum Roadmap, PS5 Pro/Xbox Settings & RAGE Deadzones",
    tagline: "Master Leonida from Day 1: 61 Cheats, Missable Trophy Alerts, L3 Sprint Fix & Linear Controller Precision.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/4gMdR81wJ0RkaRAemw1ck05",
    mockupImage: "/ebooks/mockup_3d_book_2.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_2_GTA_VI_Pro_Aim_and_Controller_Field_Guide.pdf",
    pagesCount: 11,
    rating: 4.99,
    reviewsCount: 412,
    shortDesc: "The complete 11-page second-screen companion for GTA 6 on PS5, PS5 Pro & Xbox Series X|S: fix the L3 Sprint & 18% deadzone lag, tune 30 FPS HDR/TV visuals, unlock all 61 cheat codes safely, follow the 55-trophy Platinum roadmap (with Chapter 1 missable alerts), and master 4-slot mission replay saves.",
    longDesc: "Rockstar's Grand Theft Auto VI changes core muscle memory with L3 sprinting, conservative 18% thumbstick deadzones, post-campaign cheat unlock requirements, and a 200-hour 55-trophy Platinum featuring missable Chapter 1 triggers. The GTA VI Complete Launch Bible & Pro Aim Guide combines controller calibration telemetry with complete console launch checklists—cheat sequences, trophy roadmaps, PS5 Pro 30 FPS HDR tuning, fast cash loops, and 4-slot save architecture.",
    whoIsThisFor: [
      "PS5, PS5 Pro, and Xbox Series X|S players starting GTA VI who want the optimal Day-1 control & TV setup",
      "Trophy & Achievement hunters chasing all 55 trophies without missing Chapter 1 triggers",
      "Players unlocking GTA VI's 61 cheat codes who want safe sandbox save-slot workflows",
      "Competitive Free-Aim & FPS veterans converting Warzone, Apex, Fortnite, or GTA V sensitivity 1:1"
    ],
    whatYouWillMaster: [
      "Day-1 Control Fix: Restoring Classic sprint scheme, cutting 18% deadzones to 3%–5%, and 100% Aim Acceleration",
      "PS5 Pro 30 FPS, Xbox Series S RT & TV HDR Calibration: Eliminating motion blur and dark-alley shadow crush",
      "Complete Cheat Codes & Unlock Rules: Phone + L1/LB + R1/RB buffer, D-pad strings & safe save slots",
      "55-Trophy Platinum Roadmap (~200h): Zero-spoiler checklist & Chapter 1 missable warning (Positive Mental Attitude)",
      "Leonida Side Activities, Fast Cash Loops & Police Evasion: Beating aggressive AI pursuits",
      "4-Slot Save Architecture & Mission Replay: Unlocking multiple endings and revisiting locked interiors"
    ],
    chapters: [
      { number: 1, title: "Fix Day-1 Muscle Memory: L3 Sprint, Deadzones & Aim Response", description: "Restoring Classic control scheme, reducing 18% deadzones to 3%–5%, and setting 85%–100% Aim Acceleration." },
      { number: 2, title: "PS5 Pro 30 FPS, Xbox Series S RT & TV HDR Calibration", description: "Optimal TV Game Mode, disabling motion blur/film grain, and fixing dark HDR shadow floors." },
      { number: 3, title: "Cross-Game 1:1 Sensitivity Conversion Tables", description: "Converting Warzone, Apex Legends, Fortnite, and GTA V into GTA VI Third-Person, First-Person & Drive-By scales." },
      { number: 4, title: "Complete GTA VI Cheat Codes & Unlock Requirements", description: "Phone + L1/LB + R1/RB activation, D-pad cheat matrix, unlock milestones, and Trophy/Save lock warnings." },
      { number: 5, title: "All 55 Trophies Platinum Roadmap & Missable Alerts", description: "Phase-by-phase Platinum checklist (0 online trophies) plus critical Chapter 1 missable warnings." },
      { number: 6, title: "Leonida Side Activities, Fast Cash & Police Evasion", description: "Playable arcade/mini-games, early cash loops, and breaking Leonida's smarter police line-of-sight." },
      { number: 7, title: "Mission Replay & 4-Slot Manual Save Blueprint", description: "Replaying story missions for gold medals, locked interiors, and testing multiple endings safely." },
      { number: 8, title: "DualSense Edge, Xbox Elite Series 2 & Gyro Setup", description: "Back paddle mapping, PS5 Gyro aiming (4.0 RWS), trigger stops, and pre-session launch checklist." }
    ],
    testimonials: [
      { name: "Dante 'Apex' V.", rank: "Competitive Free-Aim Veteran", game: "GTA PvP & FiveM", quote: "Rockstar's default stick ramp makes micro-adjusting impossible. Setting Aiming Acceleration to 100% and deadzone to 5% as detailed in Section 1 made the game feel like a modern responsive shooter. Game-changer." },
      { name: "Mateo R.", rank: "Warzone & GTA Online Grinder", game: "Warzone / GTA Online", quote: "The conversion table from CoD 6-6 Dynamic to GTA VI let me jump right in without losing my recoil muscle memory. The drive-by camera tip alone is worth the price." }
    ],
    faq: [
      { question: "Will these settings work on PlayStation 5, Xbox Series X, and PC?", answer: "Yes! The calibration values and mechanical principles apply directly across PS5, PS5 Pro, Xbox Series X|S, and the upcoming PC release." },
      { question: "Do I need a pro controller with paddles?", answer: "No. The settings dramatically improve standard DualSense and Xbox Wireless controllers. Dedicated paddle mapping instructions are included as an optional advanced section." },
      { question: "How does Free Aim matchmaking work?", answer: "In GTA VI, choosing Free Aim groups you exclusively with players who do not have lock-on aim assist, ensuring fair and competitive gunplay." }
    ]
  },
  {
    id: "03-cs2-subtick-aim-autoexec-guide",
    slug: "cs2-subtick-aim-autoexec-guide",
    vol: 3,
    badge: "FIELD GUIDE 03 // SOURCE 2 TACTICAL",
    title: "CS2 Sub-Tick Aim & Autoexec Field Guide",
    subtitle: "Sub-Tick Strafing, Spray Transfer & Autoexec Engineering for Source 2",
    tagline: "Master Source 2 m_yaw 0.022 physics, 4:3 Stretched FOV, and AWP 0.818933 focal scaling.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/fZudR83ER0Rkf7Q6U41ck06",
    mockupImage: "/ebooks/mockup_3d_book_3.png",
    coverImage: "/ebooks/cover_15min_aim_warmup.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_3_CS2_SubTick_Aim_and_Autoexec_Field_Guide.pdf",
    pagesCount: 4,
    rating: 4.97,
    reviewsCount: 362,
    shortDesc: "The engineering blueprint for Counter-Strike 2: master Source 2 sub-tick timestamping, configure pro eDPI brackets (560–1000 eDPI), debunk the dangerous 4:3 m_yaw 0.0165 myth, calculate 0% MDM AWP zoom (0.818933), and install a tournament-ready autoexec.cfg.",
    longDesc: "Counter-Strike 2's Sub-Tick architecture evaluates player crosshair coordinates at the exact sub-millisecond between frames when a mouse click occurs. The CS2 Sub-Tick Aim & Autoexec Field Guide delivers proven telemetry settings from top professionals (NiKo, ropz, ZywOo, donk, m0NESY), debunking widespread internet myths and locking in your Source 2 competitive configuration.",
    whoIsThisFor: [
      "Competitive CS2 riflers and AWPers looking to eliminate shot registration inconsistency",
      "Players transitioning to 4:3 Stretched who want the true mathematical facts on m_yaw",
      "Anyone wanting a clean, production-ready autoexec.cfg with optimal network and telemetry cvars",
      "Faceit and Premier grinders wanting verified pro eDPI and Rapid Trigger counter-strafe timing"
    ],
    whatYouWillMaster: [
      "Source 2 Sub-Tick Physics: How millisecond timestamping evaluates click registration between frames",
      "Pro eDPI Corridor: Why elite tier-1 players cluster between 560 eDPI (NiKo) and 1000 eDPI (donk)",
      "4:3 Stretched Resolution Reality: Why 1280x960 narrows FOV to 90° and why m_yaw must remain 0.022",
      "AWP & Scout 0% MDM Zoom Scaling: zoom_sensitivity_ratio 0.818933 vs. 1.00 for aggressive flicking",
      "Production-Ready Autoexec: Optimal cvars for cl_hud_telemetry, unscope delay, and crisp audio EQ",
      "Rapid Trigger Counter-Strafing: How 0.1mm magnetic resets reach standing accuracy 90ms faster"
    ],
    chapters: [
      { number: 1, title: "Source 2 Sub-Tick Architecture & Sensitivity Math", description: "How m_yaw 0.022 calculates angular displacement and why sub-tick evaluates click position without server-tick quantization." },
      { number: 2, title: "Pro Player Telemetry & eDPI Distribution", description: "Comprehensive breakdown of verified gear, eDPI, and cm/360 from NiKo (560), ropz (708), ZywOo (800), and donk (1000)." },
      { number: 3, title: "4:3 Stretched Resolution vs. 16:9 Native", description: "The 33.3% wider character model effect, horizontal FOV projection, and preserving physical 3D angular rotation." },
      { number: 4, title: "Debunking the m_yaw 0.0165 Myth", description: "Why changing m_yaw warps diagonal crosshair velocity by 33% and destroys permanent motor muscle memory." },
      { number: 5, title: "AWP & Scout Zoom Calibration: 0.818933 vs. 1.00", description: "Trigonometric focal-length match (0% MDM) at 0.818933 vs. 100% 4:3 screen-edge match (1.00) used by m0NESY." },
      { number: 6, title: "Rapid Trigger Counter-Strafe Deceleration", description: "Reaching the 34% standing accuracy threshold (73.1 units/sec) 90ms faster using opposite-key actuation." },
      { number: 7, title: "Production-Ready CS2 Autoexec Configuration", description: "Complete, tournament-compliant autoexec.cfg file with telemetry cvars and zero-bloat network values." },
      { number: 8, title: "Frametime Telemetry & Stutter Diagnostics", description: "Configuring cl_hud_telemetry_frametime_show 2 to isolate CPU interrupts, DPC spikes, and polling latency." },
      { number: 9, title: "Audio Equalization & Sound Profile (snd_headphone_eq)", description: "Boosting 2kHz–4kHz footstep transients with built-in engine filters without external audio bloatware." },
      { number: 10, title: "Premier & Faceit Pre-Match Calibration Routine", description: "5-minute Aim Botz flick verification and recoil compensation warmup protocol." }
    ],
    testimonials: [
      { name: "Viktor 'Kovacs' P.", rank: "Faceit Level 10 (2600 ELO)", game: "Counter-Strike 2", quote: "I fell for the m_yaw 0.0165 trap on 4:3 stretched for months. Resetting back to 0.022 and locking zoom_sensitivity_ratio to 0.818933 as explained in Section 2 instantly fixed my AWP micro-flicks. Incredible engineering breakdown." },
      { name: "Emil S.", rank: "Premier 22,400", game: "Counter-Strike 2", quote: "The autoexec in Section 3 is pure gold. No snake oil, just the exact commands that eliminate frame pacing stutters." }
    ],
    faq: [
      { question: "Where do I save the autoexec.cfg file?", answer: "Place it in Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg/ and add '+exec autoexec.cfg' into your Steam launch options." },
      { question: "Should I use 0.818933 or 1.00 for AWP zoom?", answer: "Use 0.818933 if you rely on micro-adjustments within 5 degrees of the reticle (0% MDM). Use 1.00 if you play aggressive entry AWP with wide screen-edge flick shots." },
      { question: "Does this guide work with 4:3 black bars or 16:9 native?", answer: "Yes! The guide provides exact comparisons and formulas for 16:9 native, 16:10, and 4:3 Stretched resolutions." }
    ]
  },
  {
    id: "04-valorant-radiant-aim-edpi-guide",
    slug: "valorant-radiant-aim-edpi-guide",
    vol: 4,
    badge: "FIELD GUIDE 04 // RADIANT CALIBRATION",
    title: "Valorant Radiant Aim & eDPI Field Guide",
    subtitle: "Radiant Micro-Flicks, 200–350 eDPI Biomechanics & Map Crosshair Matrix",
    tagline: "Calibrating 0.07 Yaw, RawInputBuffer, Operator 0.847 zoom & map contrast reticles.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU5kC6R3cA25xgbak1ck07",
    mockupImage: "/ebooks/mockup_3d_book_4.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_4_Valorant_Radiant_Aim_and_eDPI_Field_Guide.pdf",
    pagesCount: 3,
    rating: 4.98,
    reviewsCount: 395,
    shortDesc: "The ultimate VCT-grade Valorant aiming guide: calibrate the 0.07 yaw constant, master the 200–350 eDPI biomechanical corridor by agent role, eliminate high-polling packet drops with RawInputBuffer, calculate 0% MDM Operator zoom (0.847), and import map-optimized crosshair palettes.",
    longDesc: "Valorant's 0.07 yaw constant makes each slider unit 3.181818 times faster than Counter-Strike 2. Combined with a locked 103° horizontal FOV and high headshot multipliers, success requires precise micro-adjustments. The Valorant Radiant Aim & eDPI Field Guide breaks down the biomechanical brackets across Duelists, Initiators, and Sentinels, unlocks zero-latency RawInputBuffer, and gives you ready-to-import crosshair codes for every map.",
    whoIsThisFor: [
      "Valorant players aiming to climb through Ascendant, Immortal, and Radiant",
      "Duelists, Initiators, and Sentinels looking for role-specific ergonomic eDPI ranges",
      "Snipers using Marshal, Outlaw, and Operator who want 1:1 focal length scaling",
      "Players wanting map-specific crosshair colors that never blend into textures"
    ],
    whatYouWillMaster: [
      "Valorant 0.07 Yaw Physics & 103° Locked FOV: Why micro-sensitivity adjustments matter 3x more",
      "The 200–350 eDPI Biomechanical Rule: Role ranges from Entry Duelist (280–380) to Sentinel (160–260)",
      "RawInputBuffer Architecture: Eliminating Windows message loop delays and sensor jitter on 4K/8K mice",
      "Exact 0% MDM Scoped Math: 0.847 for Marshal/Operator Zoom 1, 1.150 for Zoom 2, 0.90 for Rifle ADS",
      "Map-by-Map Reticle Contrast Matrix: Cyan (#00FFEA) for Ascent/Bind, White (#FFFFFF) for Abyss/Split",
      "Ready-to-Import VCT Profile Codes: Directly import TenZ, Aspas, and Demon1 reticles"
    ],
    chapters: [
      { number: 1, title: "Valorant 0.07 Yaw Engine Architecture & Locked 103° FOV", description: "Why Valorant calculates angular rotation 3.181818 times faster per unit than Source, and the 103° FOV lock." },
      { number: 2, title: "Role-by-Role eDPI Biomechanics & Archetypes", description: "Optimal sensitivity corridors: Entry Duelists (280–380 eDPI), Contact Duelists (220–300), Initiators (230–310), Sentinels (160–260)." },
      { number: 3, title: "RawInputBuffer: Low-Level HID Direct Hardware Polling", description: "Bypassing Windows message loops and eliminating packet drops on 2000Hz, 4000Hz, and 8000Hz gaming mice." },
      { number: 4, title: "1600 DPI Sensor Saturation & Sub-Pixel Micro-Flicks", description: "Why 1600 DPI provides smoother sub-pixel interpolation on long-range Vandal headshots without smoothing lag." },
      { number: 5, title: "Operator & Marshal 0% MDM Zoom Synchronization", description: "The trigonometry of focal-length matching: why 0.847 equals 1:1 screen-center rotational speed on 1x zoom." },
      { number: 6, title: "Operator 2.5x Double Zoom & Rifle ADS Multipliers", description: "Configuring 1.150 for 2.5x zoom distance matching and 0.90–0.95 for Bulldog/Guardian ADS burst stability." },
      { number: 7, title: "Map-by-Map Environmental Contrast Matrix", description: "Color palettes: Warm Sandstone (Ascent/Bind/Sunset), Dark Vertical (Abyss/Split), and Bright Cyan (Icebox/Breeze)." },
      { number: 8, title: "Ready-to-Import VCT Reticle Codes & Sizing", description: "Direct import codes for 1-4-2-2 Cyan, 1-4-2-2 Outlined White, 1-3-1-2 Center Dot, and TenZ universal preset." },
      { number: 9, title: "First-Bullet Inaccuracy & Movement Error Physics", description: "Weapon recovery cooldowns, counter-strafe deadzones, and eliminating accidental movement penalty." },
      { number: 10, title: "The Daily 15-Minute Range & Deathmatch Radiant Drill", description: "Hard Bot 50-kill tracking protocol, Sheriff micro-adjustments, and anti-recoil smoothing." }
    ],
    testimonials: [
      { name: "Kevin 'RazeMain' L.", rank: "Radiant (Top 450)", game: "Valorant", quote: "Setting RawInputBuffer = On and switching my Operator scoped multiplier to 0.847 completely transformed my sniper play. My micro-adjustments feel like an extension of my hand." },
      { name: "Sarah T.", rank: "Immortal 2", game: "Valorant", quote: "The map-by-map crosshair colors in Section 3 are genius. On Ascent and Sunset, the cyan #00FFEA reticle stands out so clearly against the orange walls that my reaction time improved noticeably." }
    ],
    faq: [
      { question: "Why do you recommend 0.847 for Scoped Sensitivity?", answer: "0.847 is the exact trigonometric 0% Monitor Distance Match for Valorant's sniper scopes, keeping your micro-flick muscle memory identical between hipfire and scoped mode." },
      { question: "How do I import the crosshair profile codes?", answer: "In Valorant, go to Settings → Crosshair → Import Profile Code (down arrow icon), paste the code from Section 3, and hit Import." },
      { question: "Should I play with 800 DPI or 1600 DPI in Valorant?", answer: "1600 DPI reduces click-to-photon latency by ~2.5ms compared to 400 DPI and offers finer sub-pixel micro-steps at high frame rates, provided you enable RawInputBuffer." }
    ]
  },
  {
    id: "05-mw4-warzone-apex-tracking-guide",
    slug: "mw4-warzone-apex-tracking-guide",
    vol: 5,
    badge: "FIELD GUIDE 05 // HIGH-TTK TRACKING",
    title: "Call of Duty: Warzone, BO6 & Apex Legends Tracking Field Guide",
    subtitle: "Recoil Smoothing Physics, 6-6 Dynamic Response Curves, Rotational Aim Assist & 4-3 Linear ALC",
    tagline: "The definitive mathematical manual for high-TTK tracking, engine recoil smoothing triggers, and 100% active Rotational Aim Assist.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/dRmbJ0ejvbvYe3M5Q01ck08",
    mockupImage: "/ebooks/mockup_3d_book_5.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_5_MW4_Warzone_and_Apex_Tracking_Field_Guide.pdf",
    pagesCount: 4,
    rating: 4.98,
    reviewsCount: 342,
    shortDesc: "Master high-TTK tracking physics: engage engine recoil smoothing above the >12°/sec angular threshold, configure 6-6 Dynamic reverse S-curves in MW4/Warzone, trigger 100% active Rotational Aim Assist with optimized stick deadzones, fine-tune Season 30 ALC values, and transfer muscle memory across Overwatch 2, Deadlock, and Marvel Rivals.",
    longDesc: "High-Time-To-Kill titles like Apex Legends (Competitive Meta), Call of Duty: Modern Warfare 4 (launching October 23, 2026), and Warzone (Zodiac Resurgence) require keeping your crosshair glued to erratically sliding, diving, or air-strafing opponents for 600 to 1,400 consecutive milliseconds. The Call of Duty: Warzone, BO6 & Apex Legends Tracking Field Guide deconstructs the mathematical physics of Recoil Smoothing (eliminating up to 85% of vertical climb during lateral tracking), reveals the 6-6 Dynamic response curve reverse S-curve math, shows the exact left-stick deadzone settings (0.02–0.04 min, 0.65–0.75 max) that keep Rotational Aim Assist continuously engaged in close-quarters duels, and provides verified ALC calibrations and a 10-minute anti-mirror tracking drill.",
    whoIsThisFor: [
      "Warzone and Modern Warfare 4 players struggling to track erratically sliding opponents through Omnimovement",
      "Apex Legends players wanting granular ALC settings beyond standard 4-3 Linear or compensating for Bloodhound ult scaling",
      "Controller players who want Rotational Aim Assist (RAA) locked on 100% of the time during close-range gunfights",
      "Mouse and keyboard aimers wanting to master engine recoil smoothing (>12°/sec threshold) to erase vertical recoil kick",
      "Competitors transferring aim mechanics across high-TTK engines: Overwatch 2, Deadlock, and Marvel Rivals"
    ],
    whatYouWillMaster: [
      "Recoil Smoothing Physics: The >12°/sec horizontal camera tracking threshold that cuts vertical recoil by 85%",
      "The 30–45 cm/360° Tracking Corridor: Why high-TTK shooters require higher sensitivity than tactical shooters",
      "CoD MW4 & Warzone 6-6 Dynamic Reverse S-Curve: Snapping onto slide-cancels while keeping micro-aim stable",
      "100% Active Rotational Aim Assist: Left Stick Min 0.02–0.04 and Max 0.65–0.75 deadzone calibration",
      "Apex Legends Competitive ALC Breakdown: 2–3% deadzone, response curve 0–2, 240/190 yaw/pitch, and 0ms extra ramp",
      "Cross-Engine Tracking Transfer Matrix: Calibrating Overwatch 2, Deadlock (0.0440 yaw), and Marvel Rivals (0.0175 yaw)",
      "The 10-Minute High-TTK Tracking Drill: Anti-mirror strafe tracking, vertical elevation drops, and sustained target switches"
    ],
    chapters: [
      { number: 1, title: "High-TTK Tracking Physics & The Mechanics of Recoil Smoothing", description: "Why tracking requires 30–45 cm/360° (Apex 960–1440 eDPI, CoD 3200–4800 eDPI), the 12°–15°/sec angular threshold, and how counter-directional strafe tracking suppresses vertical recoil by 85%." },
      { number: 2, title: "Call of Duty MW4 & Warzone: 6-6 Dynamic Curve & Rotational Aim Assist", description: "Dynamic reverse S-curve math vs Standard/Linear, Left Stick Min (0.02–0.04) and Max (0.65–0.75) deadzones for 100% active RAA, instant ADS transition, and pro CDL controller settings." },
      { number: 3, title: "Apex Legends Competitive: ALC Conversion Table & Bloodhound Ult Scaling", description: "Granular ALC tuning: 2%–3% deadzone, response curve 0–2, 240/190 hipfire yaw/pitch, 130/95 ADS, and compensating for the reworked Season 30 Allfather's Cloak speed boost." },
      { number: 4, title: "Cross-Engine Tracking Transfer: Overwatch 2, Deadlock & Marvel Rivals", description: "Synchronizing cm/360° turn distance across Tracer/Genji (27–34cm), Deadlock (0.0440 yaw, 0.5x CS2/Apex), Marvel Rivals (0.0175 yaw, 4x Valorant), and the 10-minute anti-mirror tracking routine." }
    ],
    testimonials: [
      { name: "Darius 'Clutch' M.", rank: "Top 250 Warzone", game: "Warzone", quote: "The Left Stick deadzone tip in Chapter 2 was an instant game-changer. Lowering my min deadzone to 0.03 and capping max at 0.70 kept Rotational Aim Assist engaged continuously in close quarters. My close-range KD went from 2.8 to 4.2." },
      { name: "Elena 'Valkyrie' S.", rank: "Apex Predator", game: "Apex Legends", quote: "Understanding recoil smoothing physics changed how I take mid-range fights. Instead of pulling down hard on the Flatline, I match the enemy strafe at >12°/sec and the weapon beams with zero vertical climb. Essential reading." }
    ],
    faq: [
      { question: "Does recoil smoothing work with both mouse and controller?", answer: "Yes! Recoil smoothing is an engine-level mechanic in Source (Apex) and IW Engine (Call of Duty). As long as your horizontal camera velocity exceeds ~12° per second, vertical recoil kick is dynamically suppressed regardless of input device." },
      { question: "Why is Dynamic response curve preferred over Linear in Call of Duty?", answer: "Linear accelerates proportionally across the entire stick travel, which can make fine micro-adjustments inside the aim assist bubble twitchy. Dynamic applies a reverse S-curve: fast initial deflection that flattens in the mid-band, giving you smooth centering tracking and fast 180° turns." },
      { question: "How does the ALC conversion compare to standard 4-3 Linear in Apex?", answer: "The ALC values in Chapter 3 reproduce the responsive tracking feel of 4-3 Linear while allowing you to dial in custom deadzones (critical for Hall Effect sticks) and custom ADS pitch/yaw ratios without excessive extra turning boost." }
    ]
  },
  {
    id: "06-zero-latency-pc-sensor-hardware-guide",
    slug: "zero-latency-pc-sensor-hardware-guide",
    vol: 6,
    badge: "FIELD GUIDE 06 // ZERO-LATENCY HARDWARE",
    title: "Zero-Latency PC & Sensor Hardware Guide",
    subtitle: "Optical Sensor DPI Deviation, 8000Hz Bus Saturation, DPC Latency & OLED Motion Clarity",
    tagline: "Eliminate hidden DPI drift, saturate 8000Hz USB polling, and slash Click-to-Photon delay from 68ms down to 6ms.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/5kQ5kCfnzcA2f7Qdis1ck09",
    mockupImage: "/ebooks/mockup_3d_book_6.png",
    coverImage: "/ebooks/cover_controller_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_6_Zero_Latency_PC_and_Sensor_Hardware_Guide.pdf",
    pagesCount: 5,
    rating: 4.99,
    reviewsCount: 418,
    shortDesc: "The comprehensive esports hardware and system latency manual: diagnose 2%–8% optical sensor DPI deviation, calibrate the 60-second ruler formula, saturate 4000Hz/8000Hz USB polling with 1600 DPI count density, pair tier-1 mice, mousepads, and 540Hz OLED monitors, slash Click-to-Photon delay down to 6ms, and configure Rapid Trigger Hall Effect actuation.",
    longDesc: "Every optical gaming sensor deviates from its nominal DPI due to aftermarket skate thickness (+0.20mm lens height shift), mousepad Poron foam compression (0.5–1.2mm under spray pressure), and firmware CPI step quantization. Furthermore, running an 8000Hz mouse at 400 or 800 DPI starves the USB polling bus during micro-flicks. The Zero-Latency PC & Sensor Hardware Guide provides the empirical 60-second ruler compensation equation, benchmarked specs for the top 2026 esports mice (Superlight 2, Viper V3 Pro, Beast X Max), mousepads (Artisan Zero, Wallhack glass), and 540Hz OLED monitors, plus an end-to-end 5-stage latency budget and Rapid Trigger key split configurations.",
    whoIsThisFor: [
      "Competitive players using 4000Hz or 8000Hz mice who want true sub-0.5ms sensor reporting without packet starvation",
      "Gamers who switched mouse skates or mousepads and feel like their sensitivity changed",
      "Esports competitors choosing between high-speed glass pads, Artisan Poron cloth, and 540Hz OLED monitors",
      "Anyone looking to audit their full Click-to-Photon latency budget from mouse switch debounce to display scanout",
      "Hall-Effect keyboard users calibrating Rapid Trigger actuation points for instant counter-strafing"
    ],
    whatYouWillMaster: [
      "Sensor DPI Deviation Physics: Skate thickness (+0.20mm lens rise), Poron foam compression, and CPI quantization",
      "The 60-Second 10cm Ruler Compensation Formula: Exact math to restore true physical cm/360°",
      "8000Hz USB Polling Bus Saturation: Why 400 DPI drops to ~800Hz during micro-flicks and why 1600 DPI is required",
      "2026 Esports Peripheral Benchmark Matrix: Superlight 2, Viper V3 Pro, DeathAdder V4 Pro, Beast X Max, Artisan Zero, Wallhack SP-004, Wooting 80HE, 540Hz OLED",
      "Windows 11 & BIOS Zero-Latency Setup: 6/11 pointer speed, direct CPU rear USB lane routing, and NVIDIA Reflex Boost",
      "The 5-Stage Click-to-Photon Latency Budget: Slashing system delay from 32–68ms down to 5.95–11.95ms",
      "Rapid Trigger Key Split: 0.3mm actuation / 0.1mm reset on WASD vs 1.2mm on utility and jump keys"
    ],
    chapters: [
      { number: 1, title: "Optical Sensor DPI Deviation: The 60-Second Ruler Compensation Protocol", description: "How skate thickness and Poron base compression alter lens magnification by 2%–8%, and the exact formula: Compensated Sens = Sens × (Nominal DPI ÷ Real DPI)." },
      { number: 2, title: "USB Polling Rate Physics: 1000Hz vs 4000Hz vs 8000Hz & Bus Saturation", description: "Packet interval math (1.0ms to 0.125ms), hand velocity count density requirements, and why 1600 DPI unlocks sub-0.4ms true latency on high-polling sensors." },
      { number: 3, title: "The 2026 Esports Mouse, Mousepad & OLED Monitor Engineering Matrix", description: "Comprehensive hardware audit: weight, sensor, grip compatibility, Poron vs micro-etched silicate glass, 540Hz DyAc 2 vs 0.03ms OLED, and direct CPU rear USB routing." },
      { number: 4, title: "End-to-End Click-to-Photon Latency Budget & Rapid Trigger Actuation", description: "Auditing the 5 latency stages (Switch, Sensor, OS Queue, Render Pipeline, Display Scanout) to gain a +25ms to +50ms reaction advantage, plus WASD Rapid Trigger split." }
    ],
    testimonials: [
      { name: "Tarik 'K1netic' B.", rank: "Faceit Challenger / ESEA Elite", game: "CS2", quote: "I measured my mouse using the 10cm ruler test from Chapter 1 and discovered my 800 DPI was actually tracking at 854 DPI (+6.75% fast) on my new glass skates. Compensating my in-game sens down restored my exact 44.5 cm/360°. My crosshair placement stopped overshooting instantly." },
      { name: "Liam 'Phase' W.", rank: "VCT Contenders", game: "Valorant", quote: "The 8000Hz polling analysis in Chapter 2 explains everything. I was playing 400 DPI on an 8K mouse wondering why micro-adjustments felt jittery. Bumping to 1600 DPI saturated the bus and made tracking buttery smooth. Best $15 I've spent on gear optimization." }
    ],
    faq: [
      { question: "Will 8000Hz polling lag my CPU in competitive games?", answer: "At 8000Hz, the CPU receives 8,000 hardware interrupts per second. Modern multi-core processors (Ryzen 7000/9000, Intel 13th/14th Gen) handle this with <2% CPU overhead provided the receiver is plugged into a rear USB port wired directly to the CPU lanes rather than a shared chipset hub." },
      { question: "Why do you recommend 1600 DPI over 400 DPI or 800 DPI?", answer: "1600 DPI generates 4x more count reports per millimeter of movement. This saturates high-polling USB queues during subtle 1° micro-adjustments where hand speed is slow, cutting input latency by ~2.5ms without adding sensor smoothing." },
      { question: "How does Rapid Trigger improve counter-strafing?", answer: "Traditional mechanical switches require releasing the key past a fixed reset point (usually ~2.0mm). Rapid Trigger dynamically resets the key the millisecond your finger begins upward travel (0.1mm reset distance), cutting 15ms–20ms off your stopping latency." }
    ]
  },
  {
    id: "07-the-architect-of-precision",
    slug: "architect-of-precision-quick-start-guide",
    vol: 7,
    badge: "FIELD GUIDE 07 // RAPID ONBOARDING & YAW BLUEPRINT",
    title: "The Architect of Precision: 1:1 Universal Sensitivity Blueprint",
    subtitle: "Universal Cross-Game Conversion Reference Table, 0% MDM Scoped Math & Mousepad Desk Clearance",
    tagline: "The fast-track mathematical blueprint to calibrate 1:1 sensitivity, convert between 90+ engines, and verify physical mousepad clearance.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/4gM14m6R31Vo6Bka6g1ck04",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_architect_of_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_7_The_Architect_of_Precision_Free_Lead_Magnet.pdf",
    pagesCount: 3,
    rating: 4.97,
    reviewsCount: 512,
    shortDesc: "The essential rapid-onboarding guide: calibrate the 3-step hardware baseline (Windows 6/11, raw input, 1600 DPI), convert sensitivities instantly across Valorant, CS2, Apex, Overwatch 2, CoD MW4, and Deadlock at 800 & 1600 DPI, and calculate physical desk space clearance.",
    longDesc: "Transitioning between tactical shooters, high-TTK battle royales, and third-person hero shooters often ruins crosshair placement because each engine computes rotational yaw differently. The Architect of Precision: 1:1 Universal Sensitivity Blueprint eliminates sensitivity confusion in 15 minutes. It provides verified sensitivity conversion tables across all major pro cm/360° brackets (from Boaster's 65.3cm arm anchor to aceu's 28.9cm wrist tracking), demystifies focal length scaling, and applies the physical desk space formula (cm/360 ÷ 2 + 8cm) so you never run out of mousepad space during 180° clutch sweeps.",
    whoIsThisFor: [
      "Competitive players transitioning between Valorant, CS2, Apex Legends, Overwatch 2, and Deadlock",
      "Gamers unsure whether to play at 800 DPI or 1600 DPI on modern high-refresh monitors",
      "Anyone wondering if their mousepad is wide enough for their current sensitivity",
      "Aim enthusiasts looking for instant plug-and-play pro sensitivity conversion values"
    ],
    whatYouWillMaster: [
      "The 3-Step Hardware Baseline Calibration: Windows 6/11 raw input lock and 1600 DPI click-to-photon optimization",
      "Universal Cross-Game Conversion Table: Exact numerical values for Valorant, CS2, Apex, OW2, CoD, and Deadlock",
      "The 5 Core Ergonomic Archetypes: Low Arm Anchor (65.3cm), Pro Tactical Median (54.4cm), Balanced Hybrid (46.7cm), Fast Entry Duelist (40.8cm), and Pure Wrist Tracking (28.9cm)",
      "Desk Space & Mousepad Sizing Math: The (cm/360° ÷ 2) + 8 cm formula to prevent running off your pad during 180° sweeps",
      "Keyboard Angling Biomechanics: Why 15°–30° keyboard tilt unlocks up to 12cm of extra horizontal mouse swipe room",
      "Aim Lab Pro Integration: Preparing your baseline metrics for 4-mode structured training routines"
    ],
    chapters: [
      { number: 1, title: "Step 1 — The 3-Step Precision Baseline Calibration", description: "Configuring Windows 11 pointer speed to the exact 6/11 tick with raw input, selecting 1600 DPI for high-refresh scanout, and verifying zero sensor acceleration." },
      { number: 2, title: "Step 2 — Universal Cross-Game Conversion Reference Table (800 & 1600 DPI)", description: "Direct numerical conversions across Valorant, CS2, Apex, Overwatch 2, CoD MW4, and Deadlock matching 65.3cm (Boaster), 54.4cm (TenZ), 46.7cm (zekken), 40.8cm (Aspas), 34.0cm (s1mple), and 28.9cm (aceu)." },
      { number: 3, title: "Step 3 — Desk Clearance & Mousepad Sizing Verification", description: "Calculating minimum usable mousepad width via (cm/360° ÷ 2) + 8 cm, sizing recommendations for XXL / Artisan XL vs Large pads, and 15°–30° keyboard angling." }
    ],
    testimonials: [
      { name: "Julian 'Nexus' R.", rank: "Immortal 3 / Faceit 9", game: "Multi-FPS", quote: "The cross-game table in Step 2 is the most useful quick reference I've ever seen. I matched my 46.7 cm/360 across Valorant (0.350), CS2 (1.114), and Deadlock (0.557) in literally 2 minutes. The mouse movement feels 100% identical." },
      { name: "Mateo 'Kite' P.", rank: "Master", game: "Apex Legends", quote: "I was running out of pad on my 180s until I applied the desk clearance formula in Step 3. Tilting my keyboard 20 degrees gave me 10cm more mouse room without buying a new desk." }
    ],
    faq: [
      { question: "Why does the guide recommend 1600 DPI instead of 800 DPI?", answer: "1600 DPI reports coordinate packets with twice the count density per millimeter compared to 800 DPI. On 240Hz, 360Hz, and 540Hz monitors, this reduces initial motion delay by ~2.2ms on subtle micro-adjustments." },
      { question: "Does my in-game FOV change my hipfire cm/360?", answer: "No. Hipfire cm/360° is purely determined by mouse DPI, in-game sensitivity, and engine m_yaw. FOV changes your visual angular magnification, which affects scoped 0% MDM multipliers, but not your physical 360° turn distance." },
      { question: "Can I use these conversion numbers on controller?", answer: "These specific tables are engineered for optical mouse sensors. For gamepad stick sensitivities, response curves, and deadzones, see Volume 2 (GTA VI), Volume 5 (Warzone/Apex), and Volume 8 (Apex ALC)." }
    ]
  },
  {
    id: "08-apex-legends-season-30-alc-recoil-smoothing",
    slug: "apex-legends-season-30-alc-recoil-smoothing-guide",
    vol: 8,
    badge: "FIELD GUIDE 08 // APEX LEGENDS TRACKING & ALGS",
    title: "Apex Legends (Competitive Meta): Recoil Smoothing, 4-3 Linear ALC & Per-Optic Bible",
    subtitle: "Source Derivative 0.022 Yaw Physics, 110 FOV Zoom Scalars & ALGS Controller/MnK Calibration",
    tagline: "The definitive ALGS manual for Source 0.022 yaw, 85% recoil smoothing triggers, per-optic profile.cfg scalars, and 4-3 Linear ALC.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_3.png",
    coverImage: "/ebooks/cover_friction_control_matrix.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_8_Apex_Legends_Season_30_ALC_and_Recoil_Smoothing.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 468,
    shortDesc: "Master high-speed Apex Legends tracking: deconstruct the 0.022 Source yaw constant, trigger 85% recoil smoothing on Flatline/R-301 via counter-directional strafing (>12°/sec), apply verified profile.cfg per-optic scalars across all 7 scope classes at 110 FOV, and lock in ALGS 4-3 Linear vs custom ALC values.",
    longDesc: "Apex Legends combat demands continuous 3D tracking against rapid vertical abilities (Horizon Gravity Lifts, Pathfinder grapples) and Season 30's reworked Bloodhound Allfather's Cloak speed multipliers. The Apex Legends (Competitive Meta): Recoil Smoothing, 4-3 Linear ALC & Per-Optic Bible breaks down the mathematical difference between 104° FOV (118.9° horizontal) and 110° FOV (123.3° horizontal), benchmarks top ALGS champions (ImperialHal, Zer0, SweetDreams, HisWattson, aceu, Verhulst, Genburten), provides exact config scalars for all 7 scope tiers in profile.cfg, and proves why counter-directional strafe tracking beats fatigue-inducing 10Hz jitter aiming.",
    whoIsThisFor: [
      "ALGS and ranked Apex Legends players wanting zero-recoil beam tracking at 30m–80m",
      "Controller players optimizing 4-3 Linear or dialing in custom ALC stick deadzones (2% deadzone, response curve 0)",
      "Mouse and keyboard players looking to eliminate sluggishness on 2x Bruiser, 3x Ranger, and 4x optics at 110 FOV",
      "Anyone experiencing forearm fatigue from jitter aiming who wants engine-assisted recoil smoothing"
    ],
    whatYouWillMaster: [
      "Source 0.022 Yaw Physics & 110 FOV Geometry: The relationship between cl_fovScale 1.55 (123.3° HFOV) and 0% MDM scalars",
      "The ALGS Pro Sensitivity Corridor: Why champions cluster between 800 and 1440 eDPI (28.8cm to 51.9cm per 360°)",
      "Recoil Smoothing Mechanics: How >12°–15°/sec camera angular velocity cancels vertical weapon kick by over 85%",
      "Recoil Smoothing vs Jitter Aiming: Why smooth counter-directional strafe tracking preserves tendon health and vision",
      "Exact Per-Optic Config Scalars for profile.cfg: 1x (1.00/1.32), 2x Bruiser (1.08/1.15), 3x Ranger (1.12/1.25), 4x (1.14/1.30), Sniper (1.16/1.40)",
      "Controller 4-3 Linear vs Custom ALC Standard: Deadzone 2%, Response Curve 0, Yaw 250 / Pitch 200, ADS 135 / 100, 0% Extra Ramp"
    ],
    chapters: [
      { number: 1, title: "Source Derivative Physics (0.022 Yaw), FOV Scaling & Recoil Smoothing", description: "Why Apex shares 1:1 yaw with CS2, the 104° vs 110° FOV horizontal expansion (118.9° vs 123.3°), and ALGS pro sensitivity benchmarks (ImperialHal 800 eDPI, HisWattson 1120 eDPI, aceu 1440 eDPI)." },
      { number: 2, title: "Mastering Recoil Smoothing vs. Jitter Aiming", description: "Engine suppression of vertical recoil above 12°–15°/sec, counter-directional strafe mechanics on Flatline, R-301, HAVOC, and CAR SMG, and why jitter aiming damages wrists at 30m–80m." },
      { number: 3, title: "Exact Per-Optic ADS Scalars & ALGS Controller Configuration", description: "Configuring mouse_zoomed_sensitivity_scalar in profile.cfg for strict 0% MDM vs pro tracking feel across all 7 optic tiers, plus 4-3 Linear vs 250/200 ALC settings." }
    ],
    testimonials: [
      { name: "Devin 'ApexPred' C.", rank: "Apex Predator (#184)", game: "Apex Legends", quote: "Applying the 2x Bruiser (1.15) and 3x Ranger (1.25) scalars from Section 3 eliminated the heavy feeling on mid-range optics at 110 FOV. My Havoc beams at 60 meters are twice as consistent." },
      { name: "Tyson 'Volt' M.", rank: "Master", game: "Apex Legends", quote: "I stopped jitter aiming and started using the anti-mirror strafe tracking at >12°/sec from Section 2. The Flatline literally doesn't kick upward at all. My wrists feel 100x better after 6-hour ranked grinds." }
    ],
    faq: [
      { question: "Where do I edit the per-optic config scalars in Apex?", answer: "Open Saved Games/Respawn/Apex/profile/profile.cfg (or configure in-game under Settings → Mouse/Keyboard → Advanced Look Controls → Optic Multipliers) and enter the exact scalars from Chapter 3." },
      { question: "Why do ALGS controller pros prefer 4-3 Linear over Classic?", answer: "Classic applies an aggressive acceleration curve that delays initial stick response. 4-3 Linear maps thumbstick deflection 1:1, allowing instantaneous micro-centering into the 0ms Rotational Aim Assist bubble." },
      { question: "Does recoil smoothing work with high-recoil weapons like the Flatline and HAVOC?", answer: "Yes! In fact, the higher the weapon's natural vertical recoil, the more dramatic the smoothing effect is. At >12°/sec horizontal camera tracking speed, both weapons shoot almost completely flat." }
    ]
  },
  {
    id: "09-overwatch-2-hitscan-projectile-relative-zoom",
    slug: "overwatch-2-hitscan-projectile-relative-zoom-guide",
    vol: 9,
    badge: "FIELD GUIDE 09 // HERO SHOOTER CALIBRATION",
    title: "Overwatch 2: Hitscan, Projectile & Relative Aim Zoom Field Guide",
    subtitle: "Relative Scoped Zoom Mathematics (37.89% vs 51.47%), Sub-Frame Mouse Input & Heroes of Busan Tank Mechanics",
    tagline: "Master 0.0066° yaw geometry, 0% MDM relative zoom focal matching, sub-frame mouse polling, and OWCS champion per-hero sensitivity overrides.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_4.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_9_Overwatch_2_Hitscan_Projectile_and_Relative_Zoom.pdf",
    pagesCount: 3,
    rating: 4.98,
    reviewsCount: 382,
    shortDesc: "Master Overwatch 2's distinct 0.0066° yaw geometry, lock in the exact 0% MDM scoped zoom scalars (37.89% for Widow/Ana, 51.47% for Ashe, 45.90% for Freja), configure High Precision Mouse Input for sub-frame tick sampling, and apply per-hero tracking overrides for OWCS Winston/D.Va/Genji and hitscan carries.",
    longDesc: "Overwatch 2 operates on a fixed 103° horizontal FOV and a 0.0066° yaw angle constant—identical to Call of Duty and Apex Legends when normalized, yet vastly more punishing due to instantaneous hyper-mobility (Tracer blinks, Genji dash-resets, Lucio wall-rides) and the total lack of player movement acceleration. The Overwatch 2: Hitscan, Projectile & Relative Aim Zoom Field Guide demystifies the trigonometry of relative aim while zoomed, proves why default 30% scoped sensitivity breaks muscle memory, benchmarks OWCS Grandmaster standards (Proper, Lip, Shu, Someone), and delivers zero-latency sub-frame input engine configurations.",
    whoIsThisFor: [
      "Hitscan specialists (Cassidy, Soldier: 76, Sojourn, Widowmaker, Ashe) seeking consistent crosshair placement and flick consistency",
      "Ana and Widowmaker mains wanting mathematically perfect 1:1 focal transition on scoped shots",
      "Tank and flex players needing per-hero sensitivity overrides for 180° Winston/D.Va/Genji mechanics without ruining hitscan tracking",
      "Competitive Overwatch 2 players looking to enable High Precision Mouse Input and Reflex Boost to eliminate sub-tick input lag"
    ],
    whatYouWillMaster: [
      "Overwatch 2 Engine Yaw (0.0066°) & 103° FOV Geometry: Converting sensitivity seamlessly to and from CS2, Valorant, and Apex",
      "Relative Aim While Zoomed Trigonometry: The exact 0% Monitor Distance Match (37.89% for Widowmaker & Ana, 51.47% for Ashe)",
      "Sub-Frame Mouse Polling: How 'High Precision Mouse Input = ON' samples mouse packets between 60Hz tick intervals",
      "Per-Hero Sensitivity Architecture: Why 38–48 cm/360° hitscan must be separated from 28–34 cm/360° dive tank mechanics",
      "Projectile Travel Lead vs Hitscan Tracking: Compensation vectors for Kiriko, Hanzo, and Mei icicles",
      "Zero-Latency Engine Pipeline: Reduce Buffering toggle logic, NVIDIA Reflex On + Boost, and uncapped custom framerates"
    ],
    chapters: [
      { number: 1, title: "The 0.0066° Yaw Geometry, 103° FOV Lock & Zero Acceleration Dynamics", description: "Why Overwatch 2 characters reach full velocity instantly (0ms acceleration), requiring rapid reactive centering, and how 0.0066° yaw maps across 800 and 1600 DPI." },
      { number: 2, title: "The Relative Aim While Zoomed Trigonometry (0% MDM Master Table)", description: "Deriving the focal tangent ratio: 37.89% (38.0%) for Widowmaker & Ana 30° FOV, 51.47% for Ashe 65.8° FOV, and 45.90% for scoped projectile mechanics." },
      { number: 3, title: "Per-Hero Sensitivity Overrides, Sub-Frame Input & OWCS Champions Benchmark", description: "High Precision Mouse Input engine flags, Reduce Buffering toggle cadence, and pro profile benchmarks (Lip 800 DPI × 4.5, Proper 800 DPI × 5.0, Someone 800 DPI × 5.5)." }
    ],
    testimonials: [
      { name: "Min-jun 'Kuro' P.", rank: "Top 500 / Contenders", game: "Overwatch 2", quote: "Switching my Ashe scoped sensitivity from the default 30% to exactly 51.47% completely fixed my ADS tracking. My scoped critical hit rate jumped from 18% to 27% in GM1 lobbies." },
      { name: "Elena 'Valk' S.", rank: "Grandmaster 2", game: "Overwatch 2", quote: "Separating my Ana/Widow (37.89%) from my Tracer/Winston overrides following Chapter 3 saved my wrist. High Precision Mouse Input made micro-flicks feel crystal clear at 360Hz." }
    ],
    faq: [
      { question: "Why does the guide recommend 37.89% instead of 38% for Widowmaker and Ana?", answer: "At 103° horizontal FOV, the exact 0% Monitor Distance Matching formula yields 37.8848%. Entering 37.89% in the slider ensures 1:1 crosshair displacement at the micro-flick focal point." },
      { question: "Does High Precision Mouse Input increase CPU usage?", answer: "Minimally (less than 1% on modern multi-core CPUs). It allows the game engine to read raw mouse deltas on each render frame rather than quantizing them to the 60Hz network simulation tick." },
      { question: "Why do Winston and Reinhardt need higher sensitivity overrides?", answer: "Melee and cleave heroes require instant 180° turns for primal rage juggling and shield flicking. Running 30–32 cm/360° on tanks while keeping 42 cm/360° on Cassidy preserves hitscan precision while maximizing tank mobility." }
    ]
  },
  {
    id: "10-deadlock-eternus-aim-soul-orb-flick-guide",
    slug: "deadlock-eternus-aim-soul-orb-flick-guide",
    vol: 10,
    badge: "FIELD GUIDE 10 // THIRD-PERSON MOBA-SHOOTER",
    title: "Deadlock (Eternus Tier): Third-Person Tracking, Ziplines & Soul-Orb Flick Guide",
    subtitle: "Valve Source 2 0.044 Yaw Conversion, Fitts's Law Soul-Deny Optimization & Post-Patch Hero Settings",
    tagline: "Conquer Source 2 0.044 yaw conversion, 350ms rising Soul-Orb denies, third-person camera parallax, and the 36–46 cm Eternus sensitivity corridor.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_5.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_10_Deadlock_Eternus_Aim_and_Soul_Orb_Flick_Guide.pdf",
    pagesCount: 3,
    rating: 4.97,
    reviewsCount: 326,
    shortDesc: "Master Valve Source 2's 0.044 yaw constant, conquer high-speed third-person vertical tracking, calibrate Fitts's Law micro-flicks to secure and deny 350ms rising Soul Orbs, optimize Zoom Sensitivity Ratio (0.82–0.90), and dial in Eternus-tier hero sensitivity brackets.",
    longDesc: "Valve's tactical MOBA-shooter Deadlock runs on a modified Source 2 engine with a default yaw constant of 0.044—exactly 2.0x faster per slider unit than CS2 and Apex Legends (0.022) and 0.62857x Valorant (0.07). The Deadlock (Eternus Tier): Third-Person Tracking, Ziplines & Soul-Orb Flick Guide breaks down the dual motor-skill requirement unique to Deadlock: tracking elusive brawlers across rooftop ziplines while executing lightning-fast vertical micro-flicks onto rising Soul Orbs (250–350ms deny window). Discover exact conversion formulas, Eternus pro hero brackets (Vindicta, Haze, Lash, Celeste), and Source 2 engine autoexec console parameters.",
    whoIsThisFor: [
      "Deadlock players climbing from Ascendant and Oracle to Eternus tier",
      "CS2, Valorant, and Overwatch veterans struggling with third-person camera offset and vertical soul-orb denies",
      "Tracking and hitscan carries (Haze, Wraith, Infernus, Vindicta) needing clean mousepad friction control",
      "High-mobility brawlers (Lash, Abrams, Yamato, Shiv) needing rapid 180° dash-cancels and Heavy Melee parry turns"
    ],
    whatYouWillMaster: [
      "Valve Source 2 0.044 Yaw Constant: Dividing CS2 sensitivity by 2.0 or multiplying Valorant by 1.5909 for 1:1 cm/360° translation",
      "The 36–46 cm/360° Eternus Corridor: Why extreme high and low sensitivities fail Deadlock's unique tracking + vertical flick demands",
      "Fitts's Law Soul-Orb Deny Dynamics: Two-phase motor execution (horizontal target tracking + 8°–25° upward wrist flick onto 350ms orbs)",
      "Third-Person Camera Parallax: Accounting for over-the-shoulder bullet trajectory convergence at close vs long range",
      "Zoom Sensitivity Ratio Calibration: Setting 0.82 to 0.90 for smooth tracking through weapon ADS falloff curves",
      "Source 2 Console & Telemetry: fps_max 400, r_fullscreen_gamma 2.1, cl_interp_ratio 1, and 128-tick client update rate"
    ],
    chapters: [
      { number: 1, title: "Source 2 0.044 Yaw Physics, Third-Person Parallax & The Eternus Corridor", description: "Mathematical comparison with CS2/Apex (0.022) and Valorant (0.07), camera offset bullet convergence, and why 36–46 cm/360° dominates the top 0.1% ladder." },
      { number: 2, title: "Fitts's Law Soul-Orb Deny Dynamics, Zipline Tracking & Radial Wrist Mechanics", description: "Sub-second motor transition from lane trading to vertical orb popping, radial wrist extension, and tracking airborne targets on high-velocity zipline trajectories." },
      { number: 3, title: "Hero Sensitivity Brackets, Zoom Scalars & Source 2 Console Optimization", description: "Vindicta/Grey Talon sniper profiles (43–55cm), Haze/Infernus tracking carries (34–44cm), Lash/Shiv brawlers (28–36cm), and competitive autoexec console flags." }
    ],
    testimonials: [
      { name: "Kallum 'Aether' R.", rank: "Eternus Rank (Top 50)", game: "Deadlock", quote: "Converting my CS2 sens (1.6 at 800 DPI) using the 0.044 yaw rule (0.8 in Deadlock) and tuning my Zoom Ratio to 0.86 made my Vindicta sniper shots and soul denies completely automated." },
      { name: "Marcus 'Slick' T.", rank: "Oracle IV", game: "Deadlock", quote: "The Soul-Orb deny section in Chapter 2 explaining the 2-step motor movement changed my laning phase. I went from denying 30% of lane souls to over 75% against immortal brawlers." }
    ],
    faq: [
      { question: "How do I convert my CS2 sensitivity directly to Deadlock?", answer: "Because Deadlock's yaw is 0.044 and CS2's yaw is 0.022, simply divide your CS2 sensitivity by 2.0 (e.g., CS2 sens 2.00 = Deadlock sens 1.00 at the same DPI)." },
      { question: "What Zoom Sensitivity Ratio should I use in Deadlock?", answer: "We recommend between 0.82 and 0.90 (0.86 is the tournament benchmark). This matches the focal scaling of weapon zoom without feeling excessively sluggish on rapid micro-flicks." },
      { question: "Why is vertical mousepad space so important in Deadlock?", answer: "Unlike tactical shooters where targets remain on a horizontal plane, Deadlock requires continuous upward tracking against rising Soul Orbs, Lash air grapples, and Vindicta Flight. Positioning your mouse 2–3cm lower on the pad gives you the needed upward runway." }
    ]
  },
  {
    id: "11-marvel-rivals-hero-crosshair-parallax",
    slug: "marvel-rivals-hero-crosshair-parallax-guide",
    vol: 11,
    badge: "FIELD GUIDE 11 // THIRD-PERSON HERO SHOOTER",
    title: "Marvel Rivals (Competitive Meta): Hero Crosshair Codes & 3rd-Person Parallax Playbook",
    subtitle: "UE5 0.0175 Yaw Conversion (4x Valorant), Right-Shoulder Parallax Compensation & Per-Hero Reticles",
    tagline: "Master Unreal Engine 5 0.0175 yaw, right-shoulder camera parallax offsets, Season 9.5 per-hero reticle codes, and 2% deadzone controller linear curves.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_6.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_11_Marvel_Rivals_Season_9_5_Hero_Crosshair_and_Aim.pdf",
    pagesCount: 3,
    rating: 4.98,
    reviewsCount: 341,
    shortDesc: "Master Marvel Rivals' Unreal Engine 5 0.0175° yaw constant (4x Valorant scale), compensate for 2m–8m close-quarters right-shoulder camera parallax, import verified Season 9.5 reticle codes (Hela dot, The Hood Vanguard spread circle, Peni Parker lead-prediction ruler), eliminate 12–22ms Frame Generation input delay, and lock in Linear controller curves.",
    longDesc: "Marvel Rivals operates on Unreal Engine 5 with a verified angular yaw constant of 0.0175° per count—making its slider values exactly 4.0 times larger than Valorant (0.07 / 0.0175 = 4.0) and 1.25714 times larger than CS2 and Apex Legends (0.022 / 0.0175 = 1.25714). Because combat takes place from a third-person over-the-right-shoulder perspective, weapon projectiles and hitscan rays converge toward the screen center from the left/center, creating an angular Parallax Offset that causes point-blank shots aimed directly at head models to miss left. The Marvel Rivals (Competitive Meta): Hero Crosshair Codes & 3rd-Person Parallax Playbook reveals exact role sensitivity brackets (Hitscan 45–59cm, Tracking Duelists 35–47cm, Hyper-Dive 22–31cm), delivers custom reticle configurations for every hero class, benchmarks controller 2% deadzone Linear ramp settings for tracking airborne targets (Iron Man, Storm, Spider-Man), and explains why disabling DLSS/FSR Frame Generation is non-negotiable for competitive latency.",
    whoIsThisFor: [
      "Marvel Rivals competitive players climbing through Grandmaster and Eternity ranks",
      "Valorant, Overwatch 2, and CS2 players needing 1:1 cross-game sensitivity conversion into UE5 0.0175 yaw",
      "Precision hitscan and sniper mains (Hela, Black Widow, Hawkeye) suffering from close-range right-shoulder parallax misses",
      "Controller players seeking zero-acceleration Linear curve tracking against vertical dive heroes (Spider-Man, Black Panther, Psylocke)"
    ],
    whatYouWillMaster: [
      "Unreal Engine 5 0.0175° Yaw Math: Multiplying Valorant sens by 4.0 or CS2 by 1.25714 for mathematically identical cm/360°",
      "Right-Shoulder Camera Parallax Compensation: Why 2m–8m point-blank duels require micro-aiming to the right of enemy head hitboxes",
      "Season 9.5 Per-Hero Reticle Matrix: Tight Cyan micro-dots (#00FFEA) for Hela/Widow, effective spread circles for The Hood, and lead-prediction rulers for Peni Parker and Hawkeye",
      "Eliminating UE5 Frame-Gen Latency: Why DLSS 3/4 Frame Generation adds 12ms–22ms input lag, and how to configure Reflex On + Boost",
      "Role Sensitivity Corridors: 45.0–59.4 cm/360° for hitscan snipers vs 22.5–31.1 cm/360° for 180° melee dive specialists",
      "Controller Pro Linear Curve Calibration: 2% Min Deadzone, 1% Max Deadzone, Horizontal 240–280, Vertical 190–220"
    ],
    chapters: [
      { number: 1, title: "Unreal Engine 5 Physics (0.0175 Yaw) & Right-Shoulder Camera Parallax", description: "Yaw conversion formulas (4x Valorant), bullet convergence geometry from the weapon model, and compensating for 2m–8m close duels." },
      { number: 2, title: "Season 9.5 Hero-Specific Reticle & Crosshair Calibration", description: "Per-hero reticle overrides for Hela (dot + tight bars), The Hood (circle + crosshair), and Peni Parker rework (horizontal ruler lead prediction)." },
      { number: 3, title: "Per-Hero Reticle Matrix, Scoped Multipliers & Controller Linear Curves", description: "Black Widow & Hawkeye scoped scalars (0.82–0.88 focal match), disabling Frame Generation input delay, and 2% deadzone Linear controller setup." }
    ],
    testimonials: [
      { name: "Julian 'Nexus' M.", rank: "Eternity Tier (Top 100)", game: "Marvel Rivals", quote: "The Chapter 1 explanation of right-shoulder parallax clicked immediately. I was missing point-blank headshots with Hela because of bullet convergence. Aiming half an inch right at 4 meters made my close-range duel winrate skyrocket." },
      { name: "Kenji 'Apex' S.", rank: "Grandmaster 1", game: "Marvel Rivals", quote: "Switching from default Dual-Zone curve to the 2% Linear settings in Chapter 3 made tracking Spider-Man and airborne Storms feel effortless on controller." }
    ],
    faq: [
      { question: "How do I convert my Valorant sensitivity to Marvel Rivals?", answer: "Multiply your Valorant sensitivity by exactly 4.0 at the same DPI (for example, Valorant 0.35 × 4.0 = 1.40 in Marvel Rivals, which equals 46.65 cm/360°)." },
      { question: "Why should I disable DLSS/FSR Frame Generation in Marvel Rivals?", answer: "Frame Generation holds back raw mouse input to generate an artificial interpolated frame between real render frames, injecting 12ms to 22ms of input lag. Run DLSS on Quality with Reflex On + Boost instead." },
      { question: "Why do dive heroes like Spider-Man need higher sensitivity?", answer: "Dive and melee flankers must execute rapid 180° web-zip turns and wall-climbs in under 150ms. Running 22–31 cm/360° provides the necessary turning agility without running out of mousepad space." }
    ]
  },
  {
    id: "12-rainbow-six-siege-ranked-multiplier-acog",
    slug: "rainbow-six-siege-ranked-multiplier-acog-guide",
    vol: 12,
    badge: "FIELD GUIDE 12 // TACTICAL BREACH & SIEGE",
    title: "Rainbow Six Siege (Ranked 3.0): 0.002 Multiplier Unit & 1:1 ACOG Engineering",
    subtitle: "GameSettings.ini Decimal Granularity, 0% vs. 100% MDM (45/74 vs. 50/83) & 4:3/16:10 FOV Calibration",
    tagline: "Unlock 10x decimal sensitivity precision with the 0.002 GameSettings.ini multiplier, achieve 1:1 ADS focal matching across 1x and 2.5x ACOG, and optimize 4:3 vs 16:10 stretched resolution.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_architect_of_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_12_Rainbow_Six_Siege_Ranked_3_0_Multiplier_and_ACOG.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 412,
    shortDesc: "Master Rainbow Six Siege's Anvil engine yaw mathematics, eliminate coarse 4.7cm slider jumps by applying the pro 0.002 MouseSensitivityMultiplierUnit in GameSettings.ini, lock in 1:1 0% MDM vs 100% MDM across 1x sights and 2.5x ACOG scopes, benchmark Invitational champion configs (Shaiiko, Beaulo, Spoit, HerdsZ), and calibrate 4:3 vs 16:10 stretched FOV geometry.",
    longDesc: "Rainbow Six Siege uses an internal angular yaw constant of 0.00572958° multiplied by MouseSensitivityMultiplierUnit in GameSettings.ini. By default, Ubisoft sets this unit to 0.02, restricting in-game sensitivity to coarse integer steps that jump physical 360° turn distance by up to 4.7 cm per notch on 800 DPI. Changing MouseSensitivityMultiplierUnit=0.002000 unlocks 10x finer decimal precision, transforming an inflexible sensitivity of 6.0 into 60 and allowing micro-adjustments like 62 or 65. The Rainbow Six Siege (Ranked 3.0): 0.002 Multiplier Unit & 1:1 ACOG Engineering handbook delivers the exact 0% MDM focal match values (45 for 1x, 74 for 2.5x ACOG) versus 100% MDM screen-edge match (50 for 1x, 83 for 2.5x ACOG), breaks down the 33% hitbox expansion of 4:3 stretched at 84°–90° FOV, and benchmarks top Six Invitational champions.",
    whoIsThisFor: [
      "Ranked 3.0 Siege players competing from Emerald and Diamond up to Champion rank",
      "Players struggling with coarse in-game sensitivity sliders who need 10x decimal fine-tuning in GameSettings.ini",
      "Entry and flex players switching between 1.0x Holo/Reflex and 2.5x Magnified ACOG scopes who want uniform muscle memory",
      "Anyone calibrating 4:3, 16:10, or 3:2 stretched aspect ratios at 84°–90° vertical FOV"
    ],
    whatYouWillMaster: [
      "Anvil Engine Math & 0.002 Multiplier: Replacing default 0.02 with MouseSensitivityMultiplierUnit=0.002000 for 10x decimal sensitivity control",
      "1:1 Visuomotor ADS Scaling: The mathematical difference between 0% MDM (45 for 1x, 74 for 2.5x ACOG) and 100% MDM (50 for 1x, 83 for 2.5x ACOG)",
      "Six Invitational Pro Benchmarks: Shaiiko (400 DPI, 0.002 unit, 120/120 sens, 35/62 ADS), Beaulo (400 DPI, 0.002 unit, 95/95 sens, 48/78 ADS), Spoit (44.3cm), HerdsZ (57.0cm)",
      "Stretched Aspect Ratio Geometry: Why 4:3 widens pixel-peek head models by 33% for aggressive entry, while 16:10 / 3:2 offers balanced 2.5x ACOG peripheral tracking",
      "GameSettings.ini Configuration Checklist: RawInputMouseKeyboard=1, ADSMouseUseSpecific=1, and custom FOV locks",
      "Vertical FOV to Horizontal FOV Conversion: How 84°–90° vertical FOV maps across 16:9, 16:10, and 4:3 displays"
    ],
    chapters: [
      { number: 1, title: "Anvil Engine Math & The Pro 0.002 MouseSensitivityMultiplierUnit Tweak", description: "Why default 0.02 causes 4.7cm jumps per slider unit, editing GameSettings.ini for 10x decimal granularity, and Invitational pro sensitivity benchmarks." },
      { number: 2, title: "1:1 Visuomotor ADS Scaling Across 1x & 2.5x Magnified Scopes", description: "Deriving 0% MDM focal match (45 for 1x, 74 for 2.5x ACOG) vs 100% MDM screen-edge match (50 for 1x, 83 for 2.5x ACOG) across all optic tiers." },
      { number: 3, title: "Stretched Aspect Ratio Geometry (4:3 vs. 16:10 vs. 16:9) & Step-by-Step INI Setup", description: "33% head hitbox expansion in 4:3, hybrid 16:10 ACOG tracking, and the 4-step GameSettings.ini tournament readiness checklist." }
    ],
    testimonials: [
      { name: "Mathieu 'Viper' B.", rank: "Champion Rank (#112)", game: "Rainbow Six Siege", quote: "Changing MouseSensitivityMultiplierUnit to 0.002 in GameSettings.ini completely solved my aim plateau. Instead of being stuck between 7 and 8 on 400 DPI, setting 74 gave me the exact 44.5cm feel I needed." },
      { name: "Lars 'Kodiak' H.", rank: "Diamond 1", game: "Rainbow Six Siege", quote: "Applying the 45 (1x) and 74 (2.5x ACOG) 0% MDM values on 4:3 stretched made my ACOG flicks feel identical to my hipfire micro-corrections. Best R6 technical guide by far." }
    ],
    faq: [
      { question: "Where is the GameSettings.ini file located in Rainbow Six Siege?", answer: "It is located in Documents\\My Games\\Rainbow Six Siege\\<Your-Ubisoft-UUID>\\GameSettings.ini. Make sure the game is closed before editing and saving." },
      { question: "Why should I use the 0.002 multiplier instead of default 0.02?", answer: "Default 0.02 creates coarse jumps of ~4.7 cm/360° per slider integer. 0.002 provides 10x finer steps, so an old sensitivity of 8 becomes 80, allowing you to fine-tune to 78, 81, or 84." },
      { question: "Should I use 0% MDM (45/74) or 100% MDM (50/83) in Siege?", answer: "0% MDM (45 for 1x, 74 for 2.5x ACOG) matches sensitivity at the exact crosshair center, perfect for micro-flicks and pixel peeks. 100% MDM (50 for 1x, 83 for 2.5x ACOG) matches tracking feel at the screen edge, preferred by aggressive entry fraggers." }
    ]
  },
  {
    id: "13-fortnite-chapter-7-targeting-scope-pad",
    slug: "fortnite-chapter-7-targeting-scope-pad-guide",
    vol: 13,
    badge: "FIELD GUIDE 13 // BATTLE ROYALE & PIECE-CONTROL",
    title: "Fortnite (Competitive Meta): UE 5.6 Targeting, Scope Multipliers & Pad Guide",
    subtitle: "0.55550° Percentage Yaw Math, Build/Edit Multiplier Decoupling, 0% MDM Scopes & Linear Pad Setup",
    tagline: "Master Unreal Engine 5.6 0.55550° percentage yaw math, decouple build/edit mechanics from gunplay, lock in 0% MDM targeting, and apply FNCS champion Linear controller curves.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_2.png",
    coverImage: "/ebooks/cover_friction_control_matrix.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_13_Fortnite_Chapter_7_Targeting_Scope_and_Pad_Guide.pdf",
    pagesCount: 3,
    rating: 4.98,
    reviewsCount: 374,
    shortDesc: "Master Fortnite Competitive's Unreal Engine 5.6 yaw constant (0.55550° per 1%), decouple high-speed build/edit mechanics (sub-21cm/360°) from precision gunplay, calibrate 1:1 X/Y parity, lock in exact 0% MDM targeting (59.2%–60.0%) and scope scalars (49%–55%), benchmark FNCS champion setups (Bugha, Peterbot, Pollo), and configure zero-dampening Linear controller presets.",
    longDesc: "Fortnite Competitive calculates mouse rotation using a percentage slider from 0.0% to 100.0% with an internal angular constant of 0.55550° per 1.0% slider increment. Unlike pure tactical shooters, Fortnite demands instantaneous 90° and 180° camera flicks to place walls, ramps, and cones during box fights, followed instantly by sub-millimeter shotgun pellet and red-dot AR tracking. The Fortnite (Competitive Meta): UE 5.6 Targeting, Scope Multipliers & Pad Guide demystifies the mechanics of building and editing multiplier decoupling, enforces strict 1:1 X/Y axis parity to eliminate distorted diagonal peanut-butter edits, delivers exact 0% MDM focal ratios for ADS and first-person weapon mods, and optimizes DirectX 12 Performance Mode to eliminate disk I/O CPU interrupts during moving endgame tournament zones.",
    whoIsThisFor: [
      "Competitive FNCS and Ranked Fortnite players wanting instant box-fight piece control and laser AR beams",
      "Keyboard and mouse players struggling to balance high building speed with low shotgun tracking sensitivity",
      "Controller players optimizing Advanced Options Linear curve, 0% Boost, 0.00s Dampening, and edit multipliers",
      "Zero Build and Battle Royale players equipping Chapter 7 first-person modded optics (Red-Dot, Holo, Sniper scopes)"
    ],
    whatYouWillMaster: [
      "Unreal Engine 5.6 0.55550° Yaw Math: Calculating exact cm/360° via 914.4 / (DPI * Sens_% * 0.55550) for 1:1 CS2/Valorant translation",
      "Build & Edit Multiplier Decoupling: Running 35–44 cm/360° hipfire while multiplying building (155%–200%) and editing (155%–200%) for sub-21cm turns",
      "1:1 X/Y Axis Parity: Why unequal Y sensitivity distorts diagonal peanut-butter and top-right corner edit tiles",
      "Targeting & Scope 0% MDM Scaling: Third-person 80° HFOV to 52.8° ADS focal match (59.2%–60.0%) and 1.15x/1.3x/2.1x optic scalars (49%–55%)",
      "FNCS Champion Benchmarks: Bugha (800 DPI, 6.4%, 155% build/edit), Peterbot (800 DPI, 6.3%, 195/200%), Pollo (800 DPI, 6.1%, 175/185%)",
      "Controller Advanced Linear Preset: Build/Edit 2.0x–2.3x, Look H/V 41%–44%, 0% Boost, 0.00s Ramp, 10%–12% ADS, 0.00s Dampening",
      "DirectX 12 Performance Mode & Latency: Low Meshes, Medium View Distance, and disabling replay recording to eliminate micro-stutters"
    ],
    chapters: [
      { number: 1, title: "Unreal Engine 5.6 Yaw Math (0.55550° per 1%) & Build/Edit Decoupling", description: "Deriving physical cm/360° from percentage sliders, converting to/from CS2 and Valorant, and separating piece-control rotation from gunplay tracking." },
      { number: 2, title: "X/Y Axis Parity & 0% Monitor Distance Match for Targeting and Scopes", description: "Why unequal axes ruin diagonal edit consistency, the 59.2% (60%) 0% MDM formula for third-person ADS, and first-person modded scope scalars." },
      { number: 3, title: "Controller Calibration: Linear vs. Exponential & Zero-Delay Edit Settings", description: "FNCS pro controller settings (Mero, Reet), 0.00s Look Dampening, and DirectX 12 Performance Mode optimization to eliminate input delay." }
    ],
    testimonials: [
      { name: "Kaden 'Swift' P.", rank: "Unreal Rank / FNCS Qualifier", game: "Fortnite", quote: "Decoupling my building (185%) from my hipfire (6.2% at 800 DPI) using the Section 1 formula completely changed my box fights. My pump shot accuracy jumped from 32% to over 54%." },
      { name: "Thiago 'Velo' R.", rank: "Champion Rank", game: "Fortnite", quote: "Switching to 1:1 X/Y parity and 60% Targeting ADS fixed my diagonal wall edits. The controller Linear preset in Chapter 3 made close-range SMG tracking lock on effortlessly." }
    ],
    faq: [
      { question: "Why does the guide recommend 1:1 X and Y sensitivity instead of lower Y?", answer: "Modern Fortnite requires vertical builds, shockwave rotations, and diagonal peanut-butter edits. Unequal X and Y axes distort the physical cursor path along diagonals, causing you to mis-click corner edit tiles." },
      { question: "What Targeting sensitivity percentage gives a true 1:1 focal match?", answer: "At 16:9, Fortnite's third-person ADS reduces FOV from 80.0° to 52.8°. The exact 0% Monitor Distance Match formula yields 59.2% (or 60.0% on the in-game slider)." },
      { question: "Why do FNCS controller pros prefer Linear over Exponential?", answer: "Linear maps thumbstick deflection 1:1 to camera rotation without curve acceleration ramps, allowing instant muscle memory for triple-edits and close-quarters shotgun flicks." }
    ]
  },
  {
    id: "14-escape-from-tarkov-gray-zone-ballistics",
    slug: "escape-from-tarkov-gray-zone-ballistics-guide",
    vol: 14,
    badge: "FIELD GUIDE 14 // EXTRACTION & MIL-SIM BALLISTICS",
    title: "Escape from Tarkov (1.0) & Gray Zone Warfare: Gear Penalties & PiP Scopes",
    subtitle: "Unity 0.125 Yaw Math, Exact Armor/Helmet Turn-Penalty Compensation Formula & LPVO Optic Scaling",
    tagline: "Defeat gear turn-speed penalties with the exact mathematical compensation formula, master dual-render PiP scopes, and align 1:1 sensitivity between Tarkov 1.0 and Gray Zone Warfare.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_3.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_14_Escape_From_Tarkov_1_0_and_Gray_Zone_Ballistics_Guide.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 362,
    shortDesc: "Master Escape from Tarkov 1.0's Unity 0.125 yaw constant, defeat armor/helmet turn-speed penalties using the exact slider compensation formula (Compensated Sens = Base Sens / (1.00 - Penalty)), fix the sluggish 1x LPVO bug on EOTech Vudu and Vortex Razor optics, and bridge 1:1 sensitivity to Gray Zone Warfare.",
    longDesc: "Escape from Tarkov (1.0 Release) operates on Unity with a base hipfire yaw constant of 0.125° per mouse count. However, equipping heavy helmets (-14%) and Class 5/6 body armors (-11%) introduces cumulative turn-speed penalties that slash your yaw constant by up to -30%, stretching physical 360° turn distance from 38.1cm to over 54cm and destroying cross-game muscle memory. The Escape from Tarkov (1.0) & Gray Zone Warfare: Gear Penalties & PiP Scopes handbook delivers the exact mathematical compensation formula for every raid archetype (Naked, Ulach/Trooper, Fast MT/Slick, Altyn/Zabralo), solves the sluggish 1x LPVO scope bug on 1-6x optics, and establishes 1:1 sensitivity translation tables with Gray Zone Warfare on Unreal Engine 5.",
    whoIsThisFor: [
      "Escape from Tarkov 1.0 and Arena players tired of sluggish aiming caused by heavy armor and helmet debuffs",
      "Mil-sim and tactical extraction players rotating between Tarkov and Gray Zone Warfare",
      "Marksmen and snipers using variable LPVO scopes (EOTech Vudu 1-6x, Vortex Razor HD Gen II, Valday PS-320)",
      "Players seeking to eliminate Picture-in-Picture (PiP) scope stutter and frame-time drops during right-click ADS"
    ],
    whatYouWillMaster: [
      "Tarkov 1.0 Unity Physics (0.125 Yaw): Deriving cm/360° = 914.4 / (DPI * Sens * 0.125) for 1:1 CS2/Valorant mapping",
      "Armor & Helmet Turn-Speed Penalty Compensation: Using Compensated Sens = Base Sens / (1.00 - Total Penalty Decimal) to keep a constant 38.1 cm/360°",
      "Raid Loadout Profiles: Exact compensated slider settings for Naked (0.300), Ulach + Trooper (0.32), Fast MT + Slick (0.34), Korund (0.37), and Altyn + Zabralo (0.43)",
      "Dual-Render Picture-in-Picture (PiP) Scopes: Understanding how dual camera rendering impacts GPU framerate and optic FOV",
      "Fixing the 1x LPVO Sluggishness Bug: Calibrating Aiming Sensitivity (0.28–0.34) and using DPI clutch mechanics on 1-6x variable scopes",
      "Gray Zone Warfare (UE5) 1:1 Conversion: Mapping Tarkov 0.300 to GZW 10.8 (CS2 1.364, 38.1cm) and Tarkov 0.250 to GZW 9.0",
      "Frame-Time Stutter Elimination: DLSS 4 Preset K (Quality) at 1440p/4K to prevent 25%–35% FPS drops during initial ADS flicking"
    ],
    chapters: [
      { number: 1, title: "Tarkov 1.0 Unity Physics (0.125 Yaw) & Defeating Gear Turn-Speed Penalties", description: "Why heavy body armor and helmets destroy muscle memory, the mathematical slider compensation formula, and loadout archetype benchmarks." },
      { number: 2, title: "Dual-Render Picture-in-Picture (PiP) Scopes & Ergonomics Calibration", description: "PiP scope rendering mechanics, fixing the 1x LPVO sluggishness bug on Vudu/Razor 1-6x optics, and weapon ergonomics ADS delay." },
      { number: 3, title: "Gray Zone Warfare (UE5) 1:1 Conversion & Extraction Audio/Visual Tweaks", description: "Cross-game sensitivity conversion table between Tarkov and Gray Zone Warfare, DLSS Quality scope frame pacing, and clarity tweaks." }
    ],
    testimonials: [
      { name: "Dmitri 'Shturman' V.", rank: "Kappa Container / Labs Main", game: "Escape from Tarkov", quote: "The armor penalty compensation formula in Chapter 1 blew my mind. When running Korund and Bastion, setting my sensitivity to 0.37 kept my 38cm muscle memory identical to my scav runs. My point-fire spray consistency doubled." },
      { name: "Caleb 'Specter' M.", rank: "Level 64 PMC / Lamang Veteran", game: "Gray Zone Warfare", quote: "Converting my Tarkov sens (0.30) to Gray Zone (10.8) using Section 3 gave me an exact 1:1 feel between both extraction games. Zero adjustment time between wipes." }
    ],
    faq: [
      { question: "How does armor turn-speed penalty affect my sensitivity in Tarkov?", answer: "Heavy armor and helmets reduce your internal yaw constant by a fixed percentage (for example, -18% on Korund + Bastion). This makes your mouse feel sluggish and stretches your cm/360° unless you adjust your slider using the guide's formula." },
      { question: "Why do Picture-in-Picture (PiP) scopes drop my FPS in Tarkov and Gray Zone?", answer: "PiP scopes render the game world twice simultaneously—once for your unmagnified screen and once for inside the scope glass. Using DLSS Quality helps smooth out the frame-time spike when right-clicking." },
      { question: "How do I convert my Tarkov sensitivity directly to Gray Zone Warfare?", answer: "At 800 DPI, multiply your Tarkov base sensitivity by 36 (for example, Tarkov 0.300 × 36 = 10.8 in Gray Zone Warfare, which equals 38.10 cm/360°)." }
    ]
  },
  {
    id: "15-delta-force-fragpunk-arc-raiders",
    slug: "delta-force-fragpunk-arc-raiders-tactical-guide",
    vol: 15,
    badge: "FIELD GUIDE 15 // 2026 NEXT-GEN TACTICAL & EXTRACTION",
    title: "2026 Shooters Field Guide: Delta Force: Hawk Ops, FragPunk & Arc Raiders",
    subtitle: "MDV 0% vs. 133% Per-Optic Scaling, FragPunk Shard Card Calibration & Arc Raiders 3rd-Person Setup",
    tagline: "Unify your sensitivity across 2026's elite tactical releases: master Delta Force MDV per-optic scalars, FragPunk shard card modifiers, and Arc Raiders third-person mechanics.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_4.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_15_Delta_Force_FragPunk_and_Arc_Raiders_2026_Tactical_Guide.pdf",
    pagesCount: 3,
    rating: 4.97,
    reviewsCount: 319,
    shortDesc: "Master 2026's trio of tactical releases: calibrate Delta Force: Hawk Ops Monitor Distance Vertical (MDV 0% vs 133%) and gradual ADS interpolation, navigate FragPunk 5v5 Shard Card match modifiers without altering sensitivity, and configure Arc Raiders third-person shoulder-swap mechanics.",
    longDesc: "Competitive FPS players testing 2026's standout tactical and extraction releases—Delta Force: Hawk Ops, FragPunk, and Arc Raiders—often lose hours fighting incompatible sensitivity scales and unfamiliar zoom transition settings. The 2026 Shooters Field Guide: Delta Force: Hawk Ops, FragPunk & Arc Raiders anchors all three titles to your verified physical turn distance (cm/360°) and 0% Monitor Distance Match. Discover exact ADS configuration rules inside Delta Force (MDV 0% focal precision vs 133% tracking transfer, Gradual zoom interpolation), preserve 1:1 muscle memory through FragPunk dynamic Shard Card modifiers (Low Gravity, Jump Pads, Big Head), and optimize Arc Raiders aerial drone tracking using 1600 DPI and shoulder-swap keybinds.",
    whoIsThisFor: [
      "Tactical players competing in Delta Force: Hawk Ops (Hazard Operations & Havoc Warfare)",
      "5v5 competitive duelists playing Bad Guitar Studio's FragPunk shard card bomb-defusal mode",
      "Extraction shooters navigating Embark Studios' post-apocalyptic Arc Raiders",
      "Anyone wanting a unified cm/360° translation formula connecting 2026 games to CS2 and Valorant"
    ],
    whatYouWillMaster: [
      "Unified 2026 Sensitivity Scaling: Establishing exact cm/360° targets across Delta Force, FragPunk (0.07° yaw), and Arc Raiders (UE5)",
      "Delta Force: Hawk Ops MDV Engineering: Choosing 0% MDV (0.00) for first-bullet headshot flicks vs 133% MDV (1.33) for vehicle tracking",
      "ADS Sensitivity Transition Timing: Why 'During ADS Zoom (Gradual)' eliminates the jarring 250ms mid-flick speed jump when quick-peeking",
      "Tactical Stance & Canted Laser Multipliers: Locking 1.00 for 1:1 point-blank room clearing in Hazard Operations",
      "FragPunk Shard Card Stability: Why anchoring 37cm–45cm/360° beats changing sensitivity during High Velocity and Jump Pad rounds",
      "Arc Raiders Shoulder-Swap & Drone Tracking: Binding shoulder swap to Mouse4 to eliminate corner parallax against aerial ARC machines"
    ],
    chapters: [
      { number: 1, title: "Unifying 2026's Top New Shooters: Delta Force, FragPunk & Arc Raiders", description: "Cross-game sensitivity conversion table, establishing fixed cm/360° corridors, and mapping 800/1600 DPI across all three engines." },
      { number: 2, title: "Delta Force: Hawk Ops (Hazard Operations & Havoc Warfare) ADS Engineering", description: "MDV 0% vs 133% coefficient math, gradual sensitivity zoom interpolation, and canted laser tactical stance multipliers." },
      { number: 3, title: "FragPunk (Shard Card Tactics) & Arc Raiders (3rd-Person Extraction) Setup", description: "Handling dynamic match modifiers without changing sensitivity, Arc Raiders shoulder-swap keybinds, and 1600 DPI aerial drone tracking." }
    ],
    testimonials: [
      { name: "Ronan 'Vanguard' K.", rank: "Delta Force Alpha / Hazard Elite", game: "Delta Force", quote: "Switching Delta Force ADS transition to 'During ADS Zoom (Gradual)' and setting MDV to 0% following Section 2 made my M4A1 flicks feel identical to CS2. No more clumsy ADS delays." },
      { name: "Milo 'Glitch' T.", rank: "FragPunk Master Tier", game: "FragPunk", quote: "The Shard Card advice in Chapter 3 saved my rank. Instead of panicking and changing sens when speed cards were played, anchoring the 37cm baseline kept my headshots consistent." }
    ],
    faq: [
      { question: "What is the difference between 0% MDV and 133% MDV in Delta Force?", answer: "0% MDV matches sensitivity at the exact crosshair center, perfect for tactical shooter players who rely on instant micro-flicks. 133% MDV matches tracking speed across the outer screen edge, preferred by Battlefield and Warzone players." },
      { question: "Why does Delta Force recommend Gradual ADS transition?", answer: "Instant transition abruptly snaps your sensitivity at the end of the zoom animation. Gradual transition smoothly scales your sensitivity in real-time as FOV compresses, preserving fluid muscle memory." },
      { question: "How does FragPunk sensitivity compare to Valorant?", answer: "FragPunk uses the exact same 0.07° yaw constant as Valorant. A sensitivity of 0.35 in Valorant equals exactly 0.35 in FragPunk at the same DPI." }
    ]
  },
  {
    id: "16-rapid-trigger-hall-effect-counter-strafe",
    slug: "rapid-trigger-hall-effect-counter-strafe-guide",
    vol: 16,
    badge: "FIELD GUIDE 16 // MOVEMENT & KEYBOARD ENGINEERING",
    title: "Hall-Effect, Rapid Trigger & Counter-Strafe Synchronization Bible",
    subtitle: "0.1mm Magnetic Actuation Physics, CS2/Valorant Velocity Decay Curves & Tournament SOCD Compliance",
    tagline: "Master 0.1mm magnetic Hall-Effect actuation, eliminate counter-strafe stopping delay by 48ms, navigate tournament anti-cheat SOCD bans, and synchronize left-hand strafes with right-hand micro-flicks.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_5.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_16_Rapid_Trigger_Hall_Effect_and_Snap_Tap_Movement_Bible.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 489,
    shortDesc: "Master Hall-Effect magnetic switches (Wooting, Razer, SteelSeries): configure 0.10mm Rapid Trigger to eliminate mechanical hysteresis, cut counter-strafe stopping latency by 35ms–48ms, navigate Valve's strict CS2 SOCD/Snap Tap tournament bans, and execute the 10-minute left/right hand synchronization routine.",
    longDesc: "In tactical shooters like Counter-Strike 2 and Valorant, left-hand movement dictates over 50% of your aim: firing while your player model is decelerating triggers massive bloom inaccuracy penalties even if your crosshair is dead-center. Traditional mechanical switches actuate at a fixed 2.0mm depth and require rising back past a 1.8mm hysteresis point before resetting. The Hall-Effect, Rapid Trigger & Counter-Strafe Synchronization Bible breaks down the physics of 8000Hz continuous magnetic flux sensing, delivers exact per-game actuation and release thresholds (CS2 0.15mm/0.10mm, Valorant 0.20mm/0.10mm, Apex 0.30mm/0.15mm), clarifies official tournament anti-cheat compliance (why SOCD / Snap Tap is banned in CS2 but legal elsewhere), and details the 10-minute visual crosshair synchronization protocol.",
    whoIsThisFor: [
      "Competitive CS2, Valorant, Overwatch, and Apex players using or considering Hall-Effect magnetic keyboards (Wooting 60HE+/80HE, Razer Huntsman V3 Pro, Apex Pro)",
      "Players struggling with premature firing error bloom or counter-strafe mis-timing after switching to Rapid Trigger",
      "Tournament players needing to ensure firmware compliance and avoid server kicks for illegal SOCD / Snap Tap binds",
      "Anyone wanting to synchronize left-hand WASD stopping mechanics with right-hand crosshair micro-flicks"
    ],
    whatYouWillMaster: [
      "Magnetic Actuation Physics: How Hall-Effect & TMR switches poll at 8000Hz with 0.01mm continuous flux measurement",
      "Eliminating Mechanical Hysteresis: Why 0.10mm Rapid Trigger cuts counter-strafe stopping delay by 35ms to 48ms",
      "Exact Per-Game WASD Thresholds: CS2 (0.15mm act / 0.10mm RT), Valorant (0.20mm / 0.10mm), Overwatch/Rivals (0.20mm / 0.10mm), Apex (0.30mm / 0.15mm)",
      "Ability Key Protection: Why setting Q, E, C, and Space to 0.80mm–1.20mm prevents disastrous fat-finger activations",
      "Tournament SOCD / Snap Tap Rules: Why Valve strictly bans hardware SOCD in CS2 (and how to configure legal non-SOCD profiles)",
      "The 10-Minute Left/Right Synchronization Protocol: Visual dynamic crosshair drill and decoupling sympathetic finger tension"
    ],
    chapters: [
      { number: 1, title: "Why Left-Hand Movement Dictates 50% of Your Aim: Magnetic Switch Physics", description: "Mechanical copper leaves vs continuous magnetic flux, velocity decay curves in CS2 and Valorant, and shaving 48ms off time-to-accurate." },
      { number: 2, title: "Tournament Compliance: SOCD / Snap-Tap / Rappy Snappy Rules by Title", description: "Valve's CS2 server-side input detector and ban policy, legal Rapid Trigger configurations, and switching onboard keyboard profiles." },
      { number: 3, title: "Synchronizing Left-Hand Strafe Stops with Right-Hand Micro-Flicks", description: "Overcoming the 40ms mechanical timing lag, the 5-minute visual crosshair gap drill, and decoupling hand muscle tension." }
    ],
    testimonials: [
      { name: "Søren 'K1ng' J.", rank: "FACEIT Level 10 (2950 ELO)", game: "CS2", quote: "I was getting kicked from Premier for having Snap Tap enabled on my Razer keyboard. Chapter 2 explained exactly how to disable SOCD while keeping 0.10mm Rapid Trigger. My counter-strafes feel instant and 100% tournament legal." },
      { name: "Damian 'Flux' M.", rank: "Radiant (#44)", game: "Valorant", quote: "The synchronization drills in Chapter 3 made the Wooting 80HE click. I stopped firing early and started timing my micro-flicks to the exact 0.1mm release point. Best movement handbook available." }
    ],
    faq: [
      { question: "Is Rapid Trigger allowed in Counter-Strike 2 tournaments?", answer: "Yes! Rapid Trigger (which resets the key dynamically upon upward motion) is 100% legal. What Valve bans is SOCD (Snap Tap), which cancels opposing directional inputs in firmware without physically releasing the key." },
      { question: "What is the best Rapid Trigger sensitivity for Valorant?", answer: "We recommend a WASD actuation point of 0.20mm to 0.30mm, with Rapid Trigger Up set to 0.10mm. This gives you instant stopping upon lifting your finger while preventing accidental inputs." },
      { question: "Why do I miss shots after switching to a Hall-Effect keyboard?", answer: "Because magnetic switches stop your character 40ms faster than mechanical switches, your old muscle memory is likely clicking Mouse1 too late (or pressing the opposite key too early). Chapter 3's 10-minute drill retrains this timing." }
    ]
  },
  {
    id: "17-pro-controller-tmr-sticks-aim-assist",
    slug: "pro-controller-tmr-sticks-aim-assist-guide",
    vol: 17,
    badge: "FIELD GUIDE 17 // PRO CONTROLLER ENGINEERING",
    title: "The Pro Controller Bible: TMR Sticks, 1000Hz Overclocking & Aim Assist",
    subtitle: "ALPS vs. Hall-Effect vs. TMR Sensors, Deadzone Geometry & Continuous Rotational Aim Assist Uptime",
    tagline: "Unlock zero-drift TMR joystick sensors, eliminate 7ms of gamepad polling latency with 1000Hz hidusbf overclocking, and master the left-stick 75% max deadzone secret to maintain continuous Rotational Aim Assist lock-on.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_6.png",
    coverImage: "/ebooks/cover_controller_precision.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_17_The_Pro_Controller_Bible_TMR_Sticks_ALC_and_Aim_Assist.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 512,
    shortDesc: "The comprehensive competitive controller engineering guide: ALPS potentiometer wear vs Hall-Effect vs cutting-edge Tunnel Magnetoresistance (TMR) sensors, 1000Hz USB polling rate overclocking (hidusbf), Rotational Aim Assist (RAA) activation vector math across Call of Duty, Apex Legends, GTA VI, and Fortnite, and the 75% Left-Stick Max Deadzone secret.",
    longDesc: "In cross-platform esports, competitive controller gaming is defined by thumbstick hardware fidelity and aim assist vector activation. Standard controllers rely on carbon-track ALPS potentiometers that develop physical stick drift within 300 to 500 hours, forcing players to raise deadzones to 10%–15% and destroying micro-centering. The Pro Controller Bible breaks down the physics of contactless Hall-Effect and 2026 TMR (Tunnel Magnetoresistance) sensors that allow true 0%–2% inner deadzones without drift, details 1000Hz (1.0ms) USB polling rate overclocking via hidusbf to slash 7ms of input delay, reveals the mathematical triggers that engage 0ms Rotational Aim Assist across modern game engines (CoD MW4/Warzone, Apex Legends, GTA VI, Fortnite), and explains the pro secret of lowering Left-Stick Max Deadzone to 75% for continuous aim assist uptime.",
    whoIsThisFor: [
      "Competitive controller players across Call of Duty (MW4, Warzone), Apex Legends, Fortnite, and GTA VI",
      "Gamers experiencing stick drift, sluggish thumbstick response, or heavy center deadzones",
      "Players upgrading to Hall-Effect or TMR controllers (Flydigi Vader 4 Pro, Scuf Envision, DualSense Edge, Razer Wolverine V3 Pro)",
      "Tournament players looking to overclock polling rates to 1000Hz and maximize Rotational Aim Assist lock-on"
    ],
    whatYouWillMaster: [
      "Sensor Architecture Comparison: ALPS Potentiometers vs Hall-Effect vs 2026 TMR (Tunnel Magnetoresistance 16-bit resolution)",
      "True Deadzone Calibration: Running 0%–2% inner deadzones without center drift or jitter",
      "1000Hz USB Overclocking (hidusbf): Shaving 7ms of polling delay from Xbox (125Hz) and PlayStation (250Hz) gamepads",
      "Rotational Aim Assist Vector Math: Why RAA reacts with 0ms delay to enemy lateral movement vectors",
      "Per-Game Engine Settings: CoD Dynamic curve + 2% deadzones, Apex 4-3 Linear / ALC 0%, GTA VI Free Aim, Fortnite Linear",
      "The 75% Left-Stick Max Deadzone Secret: Reaching 100% strafe velocity with 25% less physical travel to maintain permanent RAA uptime"
    ],
    chapters: [
      { number: 1, title: "Sensor Physics: ALPS Potentiometer vs Hall-Effect vs TMR Sticks", description: "Mechanical carbon wear vs magnetic flux sensing, 12-16 bit ADC resolution, and why 2026 TMR sensors combine ALPS smooth resistance with zero-drift longevity." },
      { number: 2, title: "1000Hz Controller Overclocking: Cutting 7ms of Input Latency", description: "Overclocking DualSense and third-party controllers with hidusbf (bInterval=1), native 1000Hz-8000Hz architectures, and eliminating packet jitter." },
      { number: 3, title: "The Geometry of Rotational Aim Assist (RAA): Vector Mechanics & The 75% Max Deadzone Secret", description: "Why stationary crosshairs get 0% RAA, per-game trigger thresholds, anti-mirror strafing, and lowering Left-Stick Max Deadzone to 70%-75% for 100% rotational assist uptime." }
    ],
    testimonials: [
      { name: "Marcus 'TTV-Clutch' R.", rank: "Top 250 Warzone", game: "Call of Duty: Warzone", quote: "The tip in Chapter 3 about lowering Left-Stick Max Deadzone to 75% changed my close-range gunfights instantly. I used to lose Rotational Aim Assist whenever I didn't push the stick all the way. Now my RAA is active 100% of the gunfight." },
      { name: "Devon 'Kinetix' S.", rank: "Apex Predator", game: "Apex Legends", quote: "Switching from standard ALPS to TMR sticks and overclocking to 1000Hz with Chapter 2 gave my 4-3 Linear setup the tightest micro-centering I have ever felt. Complete game changer." }
    ],
    faq: [
      { question: "Can all controllers be overclocked to 1000Hz?", answer: "Official Xbox Series controllers have Microsoft firmware locked at 125Hz over USB. DualSense, DualShock 4, Scuf Envision Pro, Flydigi, and custom tournament controllers can be safely overclocked to 1000Hz (1.0ms) using the open-source hidusbf driver." },
      { question: "What is the difference between Hall-Effect and TMR sticks?", answer: "Both are contactless and eliminate drift. Hall-Effect uses magnetic field strength, which can feel slightly floaty or less linear at extreme angles. TMR (Tunnel Magnetoresistance) uses quantum resistance shifts, providing up to 16-bit resolution, ultra-precise center stability, and the familiar mechanical resistance feel of tournament ALPS sticks without wear." },
      { question: "Why does lowering Left Stick Max Deadzone to 75% improve Aim Assist?", answer: "Rotational Aim Assist requires your character to be moving above a minimum speed threshold. At 99% max deadzone, you have to push the stick all the way to the rim to reach top velocity. At 75%, you hit maximum strafe speed with 25% less physical travel, guaranteeing your RAA bubble remains permanently locked during erratic gunfights." }
    ]
  },
  {
    id: "18-esports-peripherals-matrix-mousepad-oled",
    slug: "esports-peripherals-matrix-mousepad-oled-guide",
    vol: 18,
    badge: "FIELD GUIDE 18 // HARDWARE & TRIBOLOGY REFERENCE",
    title: "The 2026 Esports Peripherals Matrix: Mice, Glass Pads, Skates & OLEDs",
    subtitle: "Surface Friction Coefficients (μs/μk), Hand-Size Grip Biomechanics, PTFE Skates & 480Hz OLED Clarity",
    tagline: "Optimize your physical hardware interface: match surface friction coefficients to your sensitivity, fit mouse shapes to hand biomechanics, eliminate skate ride-height CPI deviations, and master 480Hz OLED motion clarity.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU3cu4IVgQif7QfqA1ck03",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/DCPROSENS_Vol_18_The_2026_Esports_Peripherals_Buyers_Matrix_and_Setup.pdf",
    pagesCount: 3,
    rating: 4.99,
    reviewsCount: 473,
    shortDesc: "The definitive 2026 competitive hardware matrix: mousepad tribology (static friction μs vs dynamic friction μk across glass, hybrid, and control cloth), hand-size grip biomechanics (palm-claw, relaxed claw, fingertip), aftermarket PTFE skates vs sensor ride-height CPI shifts, and 360Hz–480Hz QD-OLED / WOLED display motion clarity.",
    longDesc: "Your in-game sensitivity is only half the equation—the physical friction between your mouse skates and mousepad surface determines your actual kinetic precision. The 2026 Esports Peripherals Matrix delivers the ultimate engineering breakdown of competitive gaming gear: it classifies mousepad surfaces by static friction (μs) and dynamic friction (μk) across Tempered Glass, Speed Hybrid, Balanced Poron, and Control Cloth; categorizes mouse shells by hand measurement and grip biomechanics; analyzes aftermarket PTFE skates and warns of the 3%–6% CPI shifts caused by 0.15mm skate thickness variations; and provides the exact competitive calibration protocol for modern 360Hz–480Hz QD-OLED and 540Hz DyAc 2 displays.",
    whoIsThisFor: [
      "Competitive FPS players calibrating their physical gear interface (mice, mousepads, skates, monitors)",
      "Players struggling with micro-adjustments due to sticky initial friction or uncontrolled glide on glass/cloth",
      "Gamers experiencing unexplained sensitivity changes after replacing worn mouse skates",
      "Esports competitors configuring 360Hz–480Hz OLED or 540Hz Fast-TN gaming displays"
    ],
    whatYouWillMaster: [
      "Tribology & Friction Coefficients: Static friction (μs) for micro-adjustments vs Dynamic friction (μk) for high-speed tracking",
      "4 Surface Categories: Tempered Glass (μs=0.14), Speed Hybrid (μs=0.19–0.23), Balanced Poron (μs=0.27–0.29), and Control Cloth (μs=0.34–0.36)",
      "Hand Biomechanics: Sizing mice by hand length/width for Ergonomic Tilt, Claw Grip, and Pure Fingertip",
      "PTFE Skates & CPI Ride-Height Shift: Why a 0.15mm skate thickness variance changes sensor focal distance and true CPI by 3%–6%",
      "Sensor Calibration Protocol: Auditing true CPI after skate swaps using dcprosens.com/dpi-analyzer/",
      "2026 Display Engineering: 0.03ms GtG OLED response vs 540Hz DyAc 2 backlight strobing for zero motion blur"
    ],
    chapters: [
      { number: 1, title: "Mousepad Tribology: Static Friction (μs) vs Dynamic Friction (μk)", description: "The physics of initial resistance vs kinetic glide, matching surface speed classes to tactical vs tracking shooters, and Poron base hardness." },
      { number: 2, title: "Mouse Shape Biomechanics & Hand Sizing: Ergonomic vs Claw vs Fingertip", description: "Skeletal hand measurements (Length x Width), palm hump support vs finger freedom, and ultralight shell weight distribution (34g to 58g)." },
      { number: 3, title: "PTFE Skates, Sensor Ride-Height CPI Shift & 2026 OLED Motion Clarity", description: "Why thicker aftermarket skates alter sensor focal distance and CPI by up to 6%, re-auditing with DPI Analyzer, and configuring 360Hz–480Hz OLED displays." }
    ],
    testimonials: [
      { name: "Erik 'Synapse' V.", rank: "Challenger / Semi-Pro", game: "Valorant & CS2", quote: "I replaced my worn stock skates with 0.85mm aftermarket skates and thought my aim felt off. Chapter 3 explained the sensor ride-height shift: my mouse CPI had dropped from 800 to 762! Re-measured with DCPROSENS DPI Analyzer, fixed the sensitivity, and was immediately back to hitting headshots." },
      { name: "Liam 'Drift' C.", rank: "Grandmaster", game: "Overwatch 2", quote: "The friction coefficient breakdown in Chapter 1 helped me understand why glass pads were ruining my Cass flicks while hybrid cloth (Hayate Otsu) gave me the perfect balance of micro-adjustments and tracking stability." }
    ],
    faq: [
      { question: "Why does my sensitivity feel different after installing new mouse skates?", answer: "Changing mouse skates often alters the distance between the optical sensor and the pad surface by 0.1mm to 0.25mm. In modern optical sensors (PAW3395, PAW3950, HERO 2), this focal shift alters your real-world CPI by 3% to 6%. We recommend running the DCPROSENS DPI Analyzer after every skate replacement to recalibrate." },
      { question: "Is a glass mousepad good for tactical shooters like CS2 or Valorant?", answer: "Glass mousepads have ultra-low static friction (μs ≈ 0.14), which is exceptional for high-speed tracking games like Overwatch or Apex, but offers almost zero stopping power for precision micro-flicks in CS2 or Valorant. For tactical shooters, high-control cloth pads (μs ≈ 0.34–0.36 like Artisan Zero Soft, Saturn Pro, or G-SR II) provide the necessary stopping power." },
      { question: "What is the advantage of 480Hz OLED over 540Hz TN displays?", answer: "OLED displays offer near-instantaneous 0.03ms pixel response times (GtG) with zero overdrive overshoot or inverse ghosting, delivering peerless dark-area contrast. 540Hz TN displays (like Zowie DyAc 2) use backlight strobing to achieve CRT-like motion clarity, but sacrifice color depth and viewing angles." }
    ]
  },
  {
    id: "01-the-architect-of-precision",
    slug: "the-architect-of-precision",
    vol: 1,
    badge: "FIELD GUIDE 01 // CALIBRATION",
    title: "The Architect of Precision",
    subtitle: "The Ultimate Sensitivity, cm/360 & 1:1 Cross-Game Muscle Memory Blueprint",
    tagline: "Stop guessing your sensitivity and destroying your muscle memory between games.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/4gM14m6R31Vo6Bka6g1ck04",
    mockupImage: "/ebooks/mockup_3d_book_1.png",
    coverImage: "/ebooks/cover_architect_of_precision.jpg",
    pdfPath: "/ebooks/01_The_Architect_of_Precision.pdf",
    pagesCount: 10,
    rating: 4.95,
    reviewsCount: 312,
    shortDesc: "Master game engine yaw mathematics, calculate your exact cm/360, eliminate hardware sensor deviation, and discover your true anatomical sensitivity sweet spot in 30 minutes.",
    longDesc: "Most FPS players change their sensitivity after every bad match, trapping themselves in an endless cycle of muscle memory reset. The Architect of Precision gives you an empirical testing protocol to calculate your physical cm/360, align your arm vs wrist mechanics, and convert your sensitivity with 1:1 focal length precision across CS2, Valorant, Apex Legends, and Warzone.",
    whoIsThisFor: [
      "Players who constantly change sensitivity after losing ranked matches",
      "Gamers switching between CS2, Valorant, and Apex who feel their aim is disconnected",
      "Anyone experiencing wrist fatigue, stiffness, or inconsistent micro-flicks",
      "Competitive players who want a mathematically verified sensitivity foundation"
    ],
    whatYouWillMaster: [
      "Why eDPI is a myth: Deconstructing game engine m_yaw differences",
      "The Universal cm/360 Formula: Measure hand movement in centimeters, not sliders",
      "The 30-Minute PSA Binary Search Method: Find your hand's ergonomic sweet spot",
      "Sensor DPI Sweet Spot: Why 1600 DPI reduces input lag by 2.5ms without acceleration",
      "Arm vs Wrist vs Finger Biomechanics: Ergonomic pivot synchronization",
      "Cross-Game Conversion Table: 0% Monitor Distance and focal length matching"
    ],
    chapters: [
      { number: 1, title: "The Foundation: Why eDPI is Lying to You", description: "How CS2 (0.022) and Valorant (0.070) calculate displacement differently." },
      { number: 2, title: "cm/360: The Universal Physical Metric", description: "Measuring real hand travel across Wrist (<25cm), Hybrid (25-35cm), and Arm (35-50cm) brackets." },
      { number: 3, title: "The 30-Minute PSA Calibration Protocol", description: "A structured binary search to pinpoint your natural tracking and flicking center." },
      { number: 4, title: "Hardware Telemetry: 1600 DPI & Sensor Deviation", description: "Lowering click latency and testing your mouse with the 10cm physical ruler test." },
      { number: 5, title: "Biomechanics: Arm, Wrist & Finger Synchronization", description: "How the elbow positions, the wrist centers, and the fingertips execute headshots." },
      { number: 6, title: "Cross-Game Conversion & FOV Matching", description: "Transferring exact 2D optical speed between CS2, Valorant, Apex, and Overwatch." },
      { number: 7, title: "The Interactive Calibration Worksheet", description: "Fillable testing log to record your baseline, test iterations, and final locked sensitivity." },
      { number: 8, title: "Pre-Match Calibration Checklist", description: "5-minute routine to sync hand warmth, pad glide, and 180° sweeps before ranked." },
      { number: 9, title: "The 21-Day Lock Discipline", description: "Overcoming confirmation bias and building permanent myelin motor memory." },
      { number: 10, title: "Pro Hub & Verification Tools", description: "Online converters and tools to keep your aim synced across all titles." }
    ],
    testimonials: [
      { name: "Marcus 'Viper' T.", rank: "Valorant Radiant", game: "Valorant", quote: "My Operator scoped aim always felt completely detached from my rifle. After applying the cm/360 conversion and the 1600 DPI switch in Chapter 4, my micro-adjustments locked in. Climbed from Ascendant to Radiant in 3 weeks." },
      { name: "Alexandre S.", rank: "Faceit Level 10 (2450 ELO)", game: "CS2", quote: "The PSA method took all the guesswork out of my setup. I locked in 41.5 cm/360 and haven't touched my slider in 4 months. Unbelievable consistency." }
    ],
    faq: [
      { question: "Will this guide work for my specific mouse and DPI?", answer: "Yes. The formulas apply to all optical gaming mice (Logitech, Razer, Zowie, Lamzu, Pulsar, etc.) and all standard DPI ranges." },
      { question: "How long does it take to calibrate?", answer: "The complete PSA method takes approximately 25 to 30 minutes in your game's practice range or Aim Lab." },
      { question: "What format do I receive?", answer: "Instant 10-page high-resolution PDF field guide formatted for printing and digital reading, plus the interactive printable worksheet." }
    ]
  },
  {
    id: "02-crosshair-placement-angle-control",
    slug: "crosshair-placement-angle-control",
    vol: 2,
    badge: "FIELD GUIDE 02 // TACTICAL ANGLES",
    title: "Crosshair Placement & Angle Control",
    subtitle: "Mastering Tactical Angles, Environmental Landmarks, Pre-Aim & Peeker's Advantage",
    tagline: "Stop relying on panic flick shots. Make aiming boring, effortless, and lethal.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/4gMdR81wJ0RkaRAemw1ck05",
    mockupImage: "/ebooks/mockup_3d_book_2.png",
    coverImage: "/ebooks/cover_crosshair_placement.jpg",
    pdfPath: "/ebooks/02_Crosshair_Placement_Angle_Control.pdf",
    pagesCount: 10,
    rating: 4.98,
    reviewsCount: 284,
    shortDesc: "Learn the 90% rule, slice corners in 15° micro-duels, memorize environmental headshot landmarks, exploit lethal off-angles, and calibrate your reaction time cushion.",
    longDesc: "Highlight clips glorify wild 180° flick shots, but telemetry data shows that 88% of professional kills require less than a 5-degree adjustment. The Crosshair Placement & Angle Control Field Guide teaches you the geometric rules of map clearance, perspective wall spacing, and predictive pre-aiming so enemies walk directly into your crosshairs.",
    whoIsThisFor: [
      "Players who constantly lose duels when holding angles or swinging corners",
      "Anyone caught 'sweeping the floor' with their crosshair while navigating maps",
      "Competitive players looking to drop their average time-to-kill below 170ms",
      "Tactical FPS players in CS2, Valorant, Rainbow Six Siege, and Warzone"
    ],
    whatYouWillMaster: [
      "The 90% Rule: Why elite aim is passive positioning, not panic reaction",
      "Head-Level Elevation Landmarks: Crates, door handles, and wall trims as horizontal guide rails",
      "Slicing The Pie: Isolating bombsite corners into sequential 1v1 engagements",
      "Common Corners vs Lethal Off-Angles: Breaking the enemy's pre-aim muscle memory",
      "Wall Distance Geometry: Why hugging the corner gets you killed before you can react",
      "The Reaction Time Cushion: Leaving a 100-160px gap matching your nervous system"
    ],
    chapters: [
      { number: 1, title: "The Foundation: The 90% Placement Rule", description: "Why flick latency adds 180ms of human motor delay and how pre-aim eliminates it." },
      { number: 2, title: "Head-Level Elevation & Environmental Landmarks", description: "Using Radianite crates, door heights, and wall textures to lock your vertical horizon." },
      { number: 3, title: "The Geometry of Slicing the Pie", description: "Clearing angles in 15-degree micro-slices with lateral keyboard movement only." },
      { number: 4, title: "Common Predictable Angles vs Lethal Off-Angles", description: "Why default 90° corners are pre-fired death traps, and how 2-meter offsets dominate." },
      { number: 5, title: "Perspective Geometry & Distance From The Wall", description: "The 3D camera projection law: standing far away lets you see elbows before they see you." },
      { number: 6, title: "The Reaction Time Cushion", description: "Why aiming on the corner pixel gets you killed, and calculating your speed-adjusted gap." },
      { number: 7, title: "Angle Clearing Worksheet & Drill Log", description: "Fillable drill scorecard to track pre-aim accuracy across common map routes." },
      { number: 8, title: "The 6-Step Daily Angle Mastery Routine", description: "Custom lobby drills to eliminate floor-scanning and burn map elevations into memory." },
      { number: 9, title: "Peeker's Advantage Counter-Measures", description: "Netcode realities and using micro A-D jiggles to reverse ping latency advantages." },
      { number: 10, title: "Optimal Crosshair Color & Reticle Settings", description: "Retinal contrast colors (#00e5ff, #00ff9d) and static sizing configurations." }
    ],
    testimonials: [
      { name: "Devin 'Krona' M.", rank: "Immortal 3", game: "Valorant", quote: "Chapter 6 on the Reaction Time Cushion completely changed how I hold Haven Long. I stopped hugging the 1-pixel corner, left two head-widths of space, and my first-bullet headshot percentage went from 18% to 32%." },
      { name: "Lukas B.", rank: "CS2 ESEA Main", game: "CS2", quote: "The section on standing farther from the corner is pure physics. You literally see their shoulder 100ms before they can even render your head. Essential read." }
    ],
    faq: [
      { question: "Does this apply to games with high verticality like Apex?", answer: "Yes! While written primarily for tactical shooters (Valorant, CS2), the perspective geometry, reaction cushion, and pre-aim principles apply directly to Apex and Warzone." },
      { question: "Is this suitable for beginners or only high-rank players?", answer: "Beginners will see an instant, dramatic improvement by eliminating floor-aiming, while advanced players will benefit from the perspective math and reaction cushions." }
    ]
  },
  {
    id: "03-the-15-minute-aim-warm-up",
    slug: "the-15-minute-aim-warm-up",
    vol: 3,
    badge: "FIELD GUIDE 03 // PRE-MATCH ACTIVATION",
    title: "The 15-Minute Aim Warm-Up",
    subtitle: "The Science of Neural Activation, 3-Phase Progression, Stretches & Tilt Control",
    tagline: "Stop burning out your hands before your first match. Activate fast-twitch reflexes in 15 minutes.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/fZudR83ER0Rkf7Q6U41ck06",
    mockupImage: "/ebooks/mockup_3d_book_3.png",
    coverImage: "/ebooks/cover_15min_aim_warmup.jpg",
    pdfPath: "/ebooks/03_The_15_Minute_Aim_Warmup.pdf",
    pagesCount: 10,
    rating: 4.96,
    reviewsCount: 349,
    shortDesc: "A complete 3-phase pre-match routine: 5m smoothness tracking, 5m micro-precision clicks, 5m match-tempo speed, plus esports physical therapy stretches and a 10-second anti-tilt protocol.",
    longDesc: "Most competitive players warm up wrong: they grind intense Aim Lab scenarios or Deathmatch for an hour, exhausting their fast-twitch motor units and dopamine before their first ranked match. The 15-Minute Aim Warm-Up delivers a proven sports physiology routine that lubricates tendons, syncs optical tracking, and induces a calm state of flow without fatigue.",
    whoIsThisFor: [
      "Players who feel sluggish, stiff, or inconsistent in their first 2 matches of the day",
      "Anyone who overtrains for an hour before ranked and feels burnt out midway through a session",
      "Gamers experiencing wrist stiffness, cold hands, or tendon fatigue",
      "Competitive players looking for a bulletproof, non-negotiable pre-match ritual"
    ],
    whatYouWillMaster: [
      "The Activation vs Fatigue Law: Why 15 minutes is the biological golden window",
      "Phase 1 (Min 0-5): Zero-Fire Smoothness Tracking to eliminate jerky wrist micro-stutters",
      "Phase 2 (Min 5-10): The 95% Accuracy Rule for static micro-clicks and stopping power",
      "Phase 3 (Min 10-15): Dynamic Target Transfers and counter-strafe rhythm at match tempo",
      "4 Physical Therapy Stretches: Prevent RSI, carpal tunnel, and tendon strain",
      "The 10-Second Physiological Reset: Regain laser focus and eliminate tilt between rounds"
    ],
    chapters: [
      { number: 1, title: "The Physiology of Warm-Up: Activation vs Fatigue", description: "Why extended pre-match grinding burns out fast-twitch fibers, and the 15-minute window." },
      { number: 2, title: "The 3-Phase Progression Architecture", description: "The smooth progression from zero-tension tracking to micro-precision and match tempo." },
      { number: 3, title: "Phase 1: Zero-Fire Smoothness Tracking (Min 0–5)", description: "Relaxing grip tension to 25% and leading with your eyes to eliminate micro-jitter." },
      { number: 4, title: "Phase 2: Micro-Flicks & Stopping Power (Min 5–10)", description: "The 95% accuracy rule and metronome pacing for decisive first-bullet deceleration." },
      { number: 5, title: "Phase 3: Dynamic Speed & Target Transfers (Min 10–15)", description: "Burst transfers, A-D counter-strafe sync, and 180° emergency turnaround drills." },
      { number: 6, title: "Physical Therapy Stretches for Gamers", description: "Prayer stretch, extensor pulls, tendon glides, and warm water tendon activation." },
      { number: 7, title: "Daily Warm-Up Telemetry Log & Scorecard", description: "Fillable scorecard to track daily tracking accuracy, flick speed, and readiness rating." },
      { number: 8, title: "The 10-Second Anti-Tilt Reset Protocol", description: "Physiological sigh breathing to drop heart rate by 15 BPM and reset emotional tilt." },
      { number: 9, title: "The 3-Loss Rule & Cognitive Fatigue", description: "Protecting your rank by recognizing mental exhaustion and knowing when to stop." },
      { number: 10, title: "Training Playlists & Routine Verification", description: "Official DCPROSENS benchmark playlists for Aim Lab, KovaaK's, and in-game ranges." }
    ],
    testimonials: [
      { name: "Julian 'Aero' K.", rank: "Apex Predator (#312)", game: "Apex Legends", quote: "I used to jump straight into ranked cold and drop 150 RP in my first 2 games. Following this exact 15-minute structure makes my tracking feel butter-smooth from game one. The wrist stretches alone saved my hand." },
      { name: "Matheus R.", rank: "Level 10 Faceit", game: "CS2", quote: "The 95% accuracy rule in Phase 2 fixed my bad habit of rushing shots. My first bullet hitrate increased noticeably." }
    ],
    faq: [
      { question: "Can I do this inside the game without installing Aim Lab?", answer: "Yes! Every phase has instructions for in-game practice modes (Valorant Range, CS2 Aim Botz, Apex Firing Range) as well as dedicated aim trainers." },
      { question: "Is this routine suitable for controller players?", answer: "Yes! Phase 1 (centering) and Phase 3 (recoil smoothing and strafe tracking) are equally vital for controller players." }
    ]
  },
  {
    id: "04-friction-control-matrix",
    slug: "friction-control-matrix",
    vol: 4,
    badge: "FIELD GUIDE 04 // HARDWARE PHYSICS",
    title: "Friction & Control Matrix",
    subtitle: "Mousepad Weaves, Virgin PTFE Skates, Mouse Weight Dynamics & Humidity Control",
    tagline: "Your mousepad and skates dictate your stopping power. Stop fighting unpredictable glide.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/6oU5kC6R3cA25xgbak1ck07",
    mockupImage: "/ebooks/mockup_3d_book_4.png",
    coverImage: "/ebooks/cover_friction_control_matrix.jpg",
    pdfPath: "/ebooks/04_Friction_Control_Matrix.pdf",
    pagesCount: 10,
    rating: 4.97,
    reviewsCount: 268,
    shortDesc: "The engineering breakdown of static vs dynamic friction, Poron foam base hardness, virgin PTFE vs glass skates, 45g–60g mouse weight dynamics, and the 20-minute pad restoration wash.",
    longDesc: "You can have the best sensor in the world, but if your mousepad has high static friction, your 5-pixel micro-adjustments will feel like dragging through mud. The Friction & Control Matrix field guide reveals the physical interactions between cloth/hybrid/glass surfaces, skate chamfer edges, and relative humidity so you achieve effortless initial movement with locked-in stopping power.",
    whoIsThisFor: [
      "Gamers whose mousepad feels slow, muddy, or inconsistent between summer and winter",
      "Players struggling with micro-adjustments sticking or overshooting due to lack of stopping power",
      "Anyone wondering whether to buy glass skates, PTFE dots, or an Artisan/LGG pad",
      "Competitive players looking to optimize their physical gear synergy for tactical or tracking FPS"
    ],
    whatYouWillMaster: [
      "Static vs Dynamic Friction: The physics of initial movement resistance vs glide braking force",
      "The Surface Spectrum: Control Cloth vs Cordura Hybrids vs Hard Glass pads",
      "Poron Base Hardness: How Mid, Soft, and XSoft foam bases react to downward hand pressure",
      "100% Virgin Grade PTFE vs Glass Skates: Why 95% of tier-1 pros stick with rounded PTFE",
      "Mouse Weight Dynamics: Why 45g to 60g delivers optimal flick momentum without micro-jitter",
      "Humidity Defense: How 60%+ relative humidity slows cloth pads by 35%, and the 20-minute wash guide"
    ],
    chapters: [
      { number: 1, title: "The Physics of Glide: Static vs Dynamic Friction", description: "Why low static friction + controlled dynamic friction is the esports holy grail." },
      { number: 2, title: "The Mousepad Surface Spectrum", description: "Control cloth (Artisan Zero/Saturn) vs Hybrids (Hayate Otsu/Hien) vs Glass (Skypad/Wallhack)." },
      { number: 3, title: "Poron Foam Base Hardness: Mid vs Soft vs XSoft", description: "Choosing the right foam density for your hand pressure and stopping habits." },
      { number: 4, title: "Mouse Skates: Virgin PTFE vs Hardened Glass vs Dots", description: "Skate thickness (0.8mm), edge beveling, pad wear, and universal 6mm PTFE dots." },
      { number: 5, title: "Mouse Weight & Momentum Physics", description: "Why 45g–60g is the competitive standard and how center-of-gravity balance affects spin-outs." },
      { number: 6, title: "The Silent Aim Killer: Relative Humidity (>60% RH)", description: "Preventing mud glide with compression arm sleeves, hybrid weaves, and room climate controls." },
      { number: 7, title: "The 20-Minute Pad Restoration Protocol (Wash Guide)", description: "Step-by-step cleaning with lukewarm water and mild dish soap to restore factory glide." },
      { number: 8, title: "Hardware Synergy Audit Worksheet", description: "Fillable audit to evaluate mouse weight, skate wear, pad friction, and replacement dates." },
      { number: 9, title: "The Competitive Recommendation Matrix", description: "The best pad + skates combinations for CS2, Valorant, Apex, and Warzone." },
      { number: 10, title: "Verified Hardware Deals & Gear Testing Lab", description: "Curated pro gear links and lowest verified prices on the DCPROSENS Deals hub." }
    ],
    testimonials: [
      { name: "Christian 'Sly' P.", rank: "Faceit Level 10", game: "CS2", quote: "I followed the 20-minute wash guide on my 8-month-old Artisan Zero. The difference was astonishing—the mud feeling completely vanished and my micro-adjustments felt like out of the box." },
      { name: "Tyler H.", rank: "Master", game: "Overwatch 2", quote: "Swapping from an 85g mouse to a 54g Viper V3 Pro with Tiger Ice dots on a Hayate Otsu gave me tracking smoothness I didn't think was physically possible." }
    ],
    faq: [
      { question: "Are glass mousepads good for Valorant or CS2?", answer: "Generally no. Glass pads have almost zero dynamic stopping power, making micro-stopping on headshots extremely difficult. They excel in tracking games like Apex, Quake, and Overwatch." },
      { question: "How often should I wash my mousepad?", answer: "Every 30 to 45 days. Dead skin cells and hand oils accumulate in the micro-weaves, creating distinct slow spots in your main aiming zone." }
    ]
  },
  {
    id: "05-fps-input-lag-playbook",
    slug: "fps-input-lag-playbook",
    vol: 5,
    badge: "FIELD GUIDE 05 // SYSTEM TUNING",
    title: "FPS & Input Lag Playbook",
    subtitle: "Maximum Frame Delivery, Zero Presentation Latency & Empirical PC Tuning",
    tagline: "Find the true bottleneck. Test one change. Keep only what delivers measurable millisecond gains.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/dRmbJ0ejvbvYe3M5Q01ck08",
    mockupImage: "/ebooks/mockup_3d_book_5.png",
    coverImage: "/ebooks/cover_fps_input_lag.jpg",
    pdfPath: "/ebooks/05_FPS_Input_Lag_Playbook.pdf",
    pagesCount: 10,
    rating: 4.99,
    reviewsCount: 421,
    shortDesc: "The scientific PC optimization protocol: isolate frame delivery stutters, configure Windows 11 flip-model presentation, optimize NVIDIA Reflex vs AMD Anti-Lag, and purge dangerous placebo tweaks.",
    longDesc: "Most PC gaming optimization guides on the internet are filled with dangerous snake-oil: sketchy registry debloaters, disabled security features, and placebo boot-timer commands that degrade system stability. The FPS & Input Lag Playbook provides an empirical, scientific testing protocol based on official Microsoft WDDM and NVIDIA Reflex documentation to eliminate micro-stutters and slash click-to-photon latency.",
    whoIsThisFor: [
      "Players with high average FPS but noticeable micro-stuttering or floaty crosshair response",
      "Anyone who ran questionable 'FPS booster packs' or registry tweaks and destabilized Windows",
      "Competitive players looking for empirical 3-run benchmark testing protocols",
      "PC gamers with NVIDIA RTX or AMD Radeon GPUs wanting zero-latency presentation"
    ],
    whatYouWillMaster: [
      "Diagnostic Triage: Isolate frame delivery stutters from render queue latency and network lag",
      "The 4-Stage Latency Pipeline: Input ➔ Game Simulation ➔ GPU Render Queue ➔ Photon Scanout",
      "Windows 11 Presentation Stack: Optimizations for Windowed Games, HAGS, and Game Mode",
      "Graphics Architecture: NVIDIA Reflex On vs Boost, AMD Anti-Lag, and debunking 'Hz - 3'",
      "Peripheral Telemetry: 1000Hz vs 4000Hz/8000Hz polling rate and CPU interrupt overhead",
      "Empirical Telemetry Worksheet: Measure A vs B with 3-run 60s median captures"
    ],
    chapters: [
      { number: 1, title: "Diagnostic Route: What Feels Wrong?", description: "Triage matrix: small freezes, heavy/floaty input, low FPS, or online rubber-banding." },
      { number: 2, title: "Understand the Signal: FPS is Not Input Lag", description: "Deconstructing the 4-stage pipeline and converting frame intervals (60, 144, 240, 360Hz)." },
      { number: 3, title: "Experiment 01: Build a Repeatable Baseline", description: "Synthesizing frametime pacing curves and executing the 3-run 60-second median protocol." },
      { number: 4, title: "Experiment 02: Reversible Windows Optimizations", description: "WDDM modern flip-model swapchains, borderless latency elimination, and HAGS." },
      { number: 5, title: "Placebo Purge: What We Strictly Reject", description: "Why BCDEdit boot options and registry cleaners are dangerous debugging flags, not gaming presets." },
      { number: 6, title: "Experiment 03: Choose Your Graphics Route", description: "NVIDIA Reflex render queue pacing vs AMD Anti-Lag and manual engine frame capping." },
      { number: 7, title: "Experiment 04: Mouse Polling Without The Hype", description: "1000Hz (1.0ms) vs 4000Hz (0.25ms), DPC interrupt loads, and 2.4GHz receiver placement." },
      { number: 8, title: "Your Interactive Experiment Log", description: "Fillable telemetry worksheet to calculate net deltas, frame pacing variance, and verdicts." },
      { number: 9, title: "The Pre-Competitive Checklist", description: "6-step tournament-ready validation checklist and structured hardware support ticket format." },
      { number: 10, title: "Scientific References & Industry Standards", description: "Official citations from NVIDIA Reflex SDK, Microsoft DirectX WDDM, and DCPROSENS Pro Tools." }
    ],
    testimonials: [
      { name: "Gabriel 'Vortex' F.", rank: "Semi-Pro CS2", game: "CS2", quote: "I was convinced my RTX 4070 Ti had driver issues because my game felt jittery at 350 FPS. Running the 3-run baseline in Chapter 3 revealed my frame pacing variance was 18ms. Fixing the flip-model settings dropped variance to 3.2ms. The game feels completely locked in." },
      { name: "Kyle D.", rank: "Grandmaster", game: "Overwatch 2", quote: "No snake oil, no sketchy registry files. Just clear, verified settings that actually shaved 12ms off my system latency." }
    ],
    faq: [
      { question: "Does this require downloading third-party tweaking software?", answer: "No! The playbook relies on official Windows 11 settings, official GPU control panels, and verified telemetry tools like CapFrameX or PresentMon." },
      { question: "Is this safe for my Windows install?", answer: "100% safe. We explicitly reject dangerous registry debloaters or boot-flag commands that break Windows updates or anti-cheat engines (Vanguard, Easy Anti-Cheat)." }
    ]
  },
  {
    id: "06-controller-precision-guide",
    slug: "controller-precision-guide",
    vol: 6,
    badge: "FIELD GUIDE 06 // GAMEPAD MASTERY",
    title: "Controller Precision Guide",
    subtitle: "Mastering Rotational Aim Assist, Dynamic Response Curves, Zero Deadzones & 1000Hz Overclock",
    tagline: "Exploit the true mathematical power of modern controller aim assist and eliminate stick drift.",
    price: 14.99,
    regularPrice: 29.99,
    stripePaymentLink: "https://buy.stripe.com/5kQ5kCfnzcA2f7Qdis1ck09",
    mockupImage: "/ebooks/mockup_3d_book_6.png",
    coverImage: "/ebooks/cover_controller_precision.jpg",
    pdfPath: "/ebooks/06_Controller_Precision_Guide.pdf",
    pagesCount: 10,
    rating: 4.96,
    reviewsCount: 295,
    shortDesc: "Master Rotational Aim Assist (RAA) activation thresholds, Dynamic vs Linear curves, zero-drift deadzone limits, KontrolFreek lever physics, and 1000Hz USB polling overclocking.",
    longDesc: "Crossplay competitive shooters are dominated by controller players, yet 90% of controller gamers configure their settings incorrectly: they set deadzones too high, pick the wrong response curves, and fight against their own aim assist. The Controller Precision Guide reveals the exact engine triggers that engage 0ms Rotational Aim Assist, optimize stick lever physics, and overclock controller polling rates to 1ms.",
    whoIsThisFor: [
      "Warzone, Apex Legends, Fortnite, and Call of Duty controller players",
      "Gamers struggling with stick drift or sluggish micro-aim in close-quarters duels",
      "Anyone wanting to understand why Dynamic curve is used by 92% of tournament pros",
      "Competitive gamepad players seeking 1000Hz USB polling overclocking on PC"
    ],
    whatYouWillMaster: [
      "Potentiometers vs Hall Effect Sensors: Why contactless magnetic sticks eliminate drift forever",
      "Response Curves Deconstructed: Why Dynamic curve dominates Linear and Standard in Warzone/Apex",
      "Deadzone Zeroing: Finding your true minimum zero-drift threshold to eliminate input lag",
      "Rotational Aim Assist Exploitation: How left-stick strafe input triggers 0ms reaction lock-on",
      "Thumbstick Lever Physics: How high-rise KontrolFreeks extend arc distance by 30%",
      "1000Hz Controller USB Overclock: Slash gamepad input latency from 8ms down to 1.0ms"
    ],
    chapters: [
      { number: 1, title: "The Modern Controller Architecture", description: "Potentiometer carbon wear vs Hall Effect magnetic sticks, and USB polling latency." },
      { number: 2, title: "Response Curves: Linear vs Dynamic vs Standard", description: "Why Dynamic curve gives you fine center micro-aim with high-speed 180° snap at the outer edge." },
      { number: 3, title: "Stick Deadzones: Finding the Zero-Drift Limit", description: "Step-by-step custom lobby test to calibrate your absolute minimum Right Stick Min Deadzone." },
      { number: 4, title: "Rotational Aim Assist (RAA) Mechanics & Exploitation", description: "Why stationary players get 0% RAA, and using left-stick mirror strafing to engage the lock-on bubble." },
      { number: 5, title: "Thumbstick Lever Physics & KontrolFreeks", description: "Extending physical arc radius by 120% for sub-millimeter recoil control on high look sensitivity." },
      { number: 6, title: "Overclocking Controller Polling to 1000Hz (1.0ms)", description: "Step-by-step guide to installing LordOfMice hidusbf driver to slash controller input delay." },
      { number: 7, title: "Controller Calibration Worksheet", description: "Fillable audit form for stick deadzones, curve types, ADS multipliers, and overclock status." },
      { number: 8, title: "Daily 6-Step Controller Activation Routine", description: "Centering drills, left-stick mirror tracking, and recoil smoothing exercises before ranked." },
      { number: 9, title: "Recoil Smoothing Mechanics", description: "How lateral movement cancels vertical weapon kick completely in modern battle royales." },
      { number: 10, title: "Pro Controller Config Standard & Hardware Hub", description: "Verified settings from top controller pros (Scump, Biffle, Genburten) and gear guides." }
    ],
    testimonials: [
      { name: "Brayden 'Apex' L.", rank: "Apex Predator (Console & PC)", game: "Apex Legends", quote: "I was playing on 4-3 Linear with 0.08 deadzone and losing close-range fights. Chapter 4 on left-stick RAA activation made it click. Once you let the left stick steer the duel, Rotational Aim Assist does the tracking for you." },
      { name: "Jordan K.", rank: "Top 250 Warzone", game: "Warzone", quote: "Overclocking my DualSense Edge to 1000Hz using the hidusbf guide in Chapter 6 made the sticks feel twice as responsive. Must-have guide for any serious controller player." }
    ],
    faq: [
      { question: "Can I overclock an Xbox controller?", answer: "Official Xbox Series controllers have Microsoft firmware locked at 125Hz. DualSense, DualShock 4, Scuf Envision, and third-party Hall Effect controllers can be overclocked to 1000Hz." },
      { question: "Does this guide work on PlayStation 5 and Xbox consoles?", answer: "All deadzone calibration, response curve settings, Rotational Aim Assist techniques, and KontrolFreek recommendations apply 100% to console players (only the USB overclock requires PC)." }
    ]
  }
];

export function getEbookBySlug(slug: string): EbookProduct | undefined {
  return EBOOKS_CATALOG.find((b) => b.slug === slug);
}
