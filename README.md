# DCPROSENS — Precision Esports & Sensitivity Platform

DCPROSENS (`dcprosens.com`) is a high-performance web platform built for competitive FPS and esports gamers. It features a physics-accurate 1:1 mouse sensitivity converter across dozens of game engines, neuromuscular sensitivity testing (PSA method), in-browser 3D aim training, pro player hardware databases, custom crosshair generators, and an expanding ecosystem of precision gaming utilities.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Vanilla CSS + CSS Modules (`*.module.css`) + CSS Custom Properties Design System
- **Build Output:** Static HTML/CSS/JS export (`output: "export"` with `trailingSlash: true`)
- **Authentication & Database:** Firebase Auth + Cloud Firestore (Client SDK + PHP Admin REST API)
- **Payments & Billing:** Stripe Checkout (Monthly, Yearly, Lifetime + $1 Aim Lab single pass)
- **Multiplatform:**
  - **Chrome Extension:** Manifest V3 with Chrome Side Panel API (`chrome-extension/`)
  - **Android App:** Capacitor wrapper (`android-app/`)

---

## 🎮 Features & Tool Suite

### 1. Aim & Sensitivity Tools
- **1:1 Sensitivity Converter:** True physical cm/360 preservation across 70+ FPS titles based on exact engine yaw multipliers.
- **PSA Method Calculator:** Interactive neuromuscular iteration test to discover individual optimal sensitivity.
- **Scope & ADS 1:1 Matcher:** Hipfire-to-ADS zoom calibration for multiple optic magnifications.
- **Sensitivity Finder:** Guided iterative calibration tool for fine-tuning cm/360.
- **FOV & Aspect Ratio Converters:** Horizontal, vertical, and diagonal FOV matching + 4:3 Stretched Resolution Calculator.

### 2. Aim Training & Calibration Games
- **Online 3D Aim Trainer (Free):** In-browser training modes including Gridshot, Target Tracking, and Reflex benchmarks.
- **Aim Lab Pro (Premium):** 4 advanced drills (Micro-Flick, Dynamic Click, Strafe Peek, and Ghost vs Pro).
- **Sensitivity Test Mini-Game:** Rapid flick precision benchmark with trial access.
- **Reaction Time & CPS Tests:** Millisecond reaction speed benchmark and multi-mode click speed meter.

### 3. Esports Data & Hardware
- **Pro Settings Database:** DPI, eDPI, cm/360, resolution, and hardware breakdown of elite pro players.
- **Crosshair Creator & Database:** Interactive reticle builder and code importer/exporter for Valorant and CS2.
- **Mouse Spec & Grip Guide:** Hand size and grip style (Palm, Claw, Fingertip) recommendation engine.
- **Mousepad Surface & Friction Chart:** Speed vs. Control dynamic stopping power and pad sizing calculator.
- **Streamer Sensitivity Widget:** Embeddable responsive widget for Twitch panels and creator portfolios.

---

## 📁 Project Structure

```text
├── android-app/            # Capacitor Android native project
├── chrome-extension/       # Manifest V3 Chrome Side Panel extension
├── docs/                   # Handoffs, prompts, SEO and image specifications
│   ├── handoffs/           # Session handoff documentation
│   └── image-prompts/      # Blog and visual asset prompts
├── public/                 # Static assets, sitemaps, robots.txt, and PHP API
│   ├── api/                # PHP backend endpoints (Stripe webhook, leaderboard, reviews)
│   ├── blog/               # WebP blog cover images (1600x900)
│   └── web-stories/        # Google Web Stories static bundles
├── scripts/                # Verification, build, and asset automation scripts
├── src/
│   ├── app/                # Next.js App Router pages and metadata
│   ├── components/         # Modular React components with scoped CSS Modules
│   ├── lib/                # Math models, game yaw tables, databases, and Firebase config
│   └── utils/              # Client helpers, analytics, and image resolvers
├── firestore.rules         # Cloud Firestore security rules with diff key verification
└── next.config.ts          # Static export configuration
```

---

## 💻 Local Development & Scripts

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Verify Code Quality & Type Safety
```bash
# Run ESLint (must pass with 0 errors)
npm run lint

# Check TypeScript types
npx tsc --noEmit
```

### Build & Post-Build Validation
```bash
# Build static export into out/
npm run build

# Run comprehensive 32-point automated post-build audit
# (checks SEO, sitemaps, 404 images, accessibility, CSP headers, robots)
bash scripts/verify-build.sh
```

### Blog Image Utilities
```bash
# Synchronize public/blog/*.webp images into the Next.js image resolver
npm run sync:images

# Check blog post image coverage and identify any missing files
npm run check:images
```

---

## 🔒 Security Architecture

- **Firestore Rules:** All client updates are strictly restricted to non-sensitive fields (`savedSettings`, `savedProfiles`, `aimLabHistory`, `displayName`). Stripe customer IDs and subscription privileges are only writable via server-side credentials.
- **Environment Isolation:** Sensitive PHP API secrets are loaded from outside the web root (`../dcprosens-secrets.php`), preventing credential loss during static file exports.
- **Headers & Framing:** `Content-Security-Policy` with `frame-ancestors` enforcement is configured via `.htaccess`, granting framing permissions only to the `/embed/` widget.
