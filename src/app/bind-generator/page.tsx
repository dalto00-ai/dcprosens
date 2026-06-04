import type { Metadata } from "next";
import BindGenerator from '@/components/BindGenerator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "CS2 Bind Generator 2025 — Jumpthrow, Radar Zoom, Autoexec CFG | DCPROSENS",
    description: "Generate custom CS2 console binds instantly. Create jumpthrow binds, radar toggles, drop bomb binds, and download your autoexec.cfg file free.",
    keywords: [
        'cs2 bind generator', 'cs2 config generator', 'cs2 jumpthrow bind 2025', 'cs2 radar toggle bind',
        'cs2 drop bomb bind', 'cs2 autoexec generator', 'counter strike 2 binds', 'cs2 console commands',
        'clear decals cs2 bind', 'crosshair toggle bind cs2', 'voice toggle bind cs2', 'cs2 autoexec config',
        'how to create autoexec cs2', 'cs2 buy binds generator', 'cs2 crosshair alignment bind'
    ],
    alternates: {
        canonical: "https://dcprosens.com/bind-generator",
    },
    openGraph: {
        title: "CS2 Bind Generator 2025 — Jumpthrow, Radar Zoom, Autoexec CFG | DCPROSENS",
        description: "Generate and download your custom CS2 autoexec.cfg with jumpthrow, radar toggle, and drop bomb binds instantly.",
        type: "website",
        url: "https://dcprosens.com/bind-generator",
    },
    twitter: {
        card: "summary_large_image",
        title: "CS2 Bind Generator 2025 — Jumpthrow, Radar Zoom, Autoexec CFG",
        description: "Custom CS2 console binds generator. Instantly create jumpthrow, radar toggle, and drop bomb binds.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BindGeneratorPage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com" },
            { "@type": "ListItem", "position": 2, "name": "CS2 Bind Generator", "item": "https://dcprosens.com/bind-generator" },
        ],
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What is a jumpthrow bind in CS2?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "A jumpthrow bind is a console shortcut that jumps and releases a grenade at the exact same microsecond, ensuring perfect consistency for smoke lineups. In CS2, this is achieved by creating an alias bind in your autoexec config.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How do I create and install an autoexec.cfg for CS2?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Create a text file named 'autoexec.cfg' and place it in your CS2 cfg directory (typically: Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg). Write your binds inside and save it. Right-click CS2 in Steam -> Properties -> Launch Options -> add '+exec autoexec.cfg'.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Does clear decals bind work in CS2?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "No. The classic 'r_cleardecals' command was disabled in CS2 by Valve. Blood and bullet impacts are server-sided and cannot be cleared locally. Many players now use keys for alternative utilities like radar scaling or inspecting weapons.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How do I toggle voice chat mute in CS2?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "In CS2, you can mute and unmute all voice comms using the command 'voice_modenable_toggle'. Binding this to a key allows you to instantly clutch in quiet scenarios without distraction.",
                        },
                    },
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "DCPROSENS CS2 Bind & Autoexec Generator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://dcprosens.com/bind-generator",
                description: "Free online CS2 bind generator. Create jumpthrows, radar toggles, mute voice binds, and export autoexec.cfg configs.",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '900px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                CS2 Config <span className="text-gradient">Bind Generator</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Create custom console binds for Counter-Strike 2. Generate jumpthrow, radar toggle, and drop bomb binds, and export your personal autoexec.cfg.
            </p>

            <BindGenerator />

            <article style={{ marginTop: '5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    What is a CS2 Autoexec Config &amp; Why You Need It
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                    An <strong style={{ color: 'var(--text-primary)' }}>autoexec.cfg</strong> is a custom configuration file where you store your keybinds, crosshair settings, radar sizes, and network optimizations. Every time you launch Counter-Strike 2, the game runs this file automatically, ensuring your competitive settings are loaded correctly.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    Without an autoexec file, some custom configurations (like aliases and multi-command binds, such as the jumpthrow) can reset or fail to execute when the game restarts. An autoexec ensures all your settings remain persistent.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    Step-by-Step: How to Setup and Run Your autoexec.cfg
                </h3>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        Generate your binds above, then click <strong style={{ color: 'var(--primary)' }}>Download autoexec.cfg</strong> to get your config file.
                    </li>
                    <li>
                        Open Steam, go to your Library, right-click <strong style={{ color: 'var(--text-primary)' }}>Counter-Strike 2</strong>, select <strong style={{ color: 'var(--text-primary)' }}>Properties</strong>, and click <strong style={{ color: 'var(--text-primary)' }}>Installed Files &rarr; Browse...</strong>
                    </li>
                    <li>
                        Navigate to the following folder:
                        <br />
                        <code style={{ background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                            game / csgo / cfg
                        </code>
                    </li>
                    <li>
                        Place the downloaded <strong style={{ color: 'var(--text-primary)' }}>autoexec.cfg</strong> inside this folder.
                    </li>
                    <li>
                        Go back to Steam, right-click CS2 &rarr; Properties. In the <strong style={{ color: 'var(--text-primary)' }}>General</strong> tab, find <strong style={{ color: 'var(--text-primary)' }}>Launch Options</strong> at the bottom.
                    </li>
                    <li>
                        Add the following command to the text field:
                        <br />
                        <code style={{ background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--primary)' }}>
                            +exec autoexec.cfg
                        </code>
                    </li>
                    <li>
                        Launch CS2 and open the console (default key: `~` or `\`). Type <code style={{ color: 'var(--text-primary)' }}>exec autoexec</code> to verify it loaded successfully.
                    </li>
                </ol>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    Explaining the Key Competitive Binds
                </h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>CS2 Jumpthrow Bind:</strong> In CS2, sub-tick movements make manual jump-throwing slightly inconsistent. This alias bind executes the jump and grenade release at the exact same microsecond, ensuring your smokes land in the exact same spot every round.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Radar Zoom Toggle:</strong> Toggles your radar scale between a zoomed-in layout (for close-range combat and finding bomb drops in smoke) and a zoomed-out layout (to see teammate pings and enemy dots across the entire map).
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Drop Bomb Bind:</strong> Instantly equips the C4 bomb and drops it on the ground without switching away from your active gun, saving precious seconds when passing the bomb to teammates.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Mute Voice Chat (Clutch Bind):</strong> Instantly mutes all voice communications so you can hear quiet footsteps, reloading sounds, and bomb defusal cues during clutch situations. Press again to unmute your team.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Lineup Crosshair Toggle:</strong> Toggles your crosshair size to a massive layout that stretches across the entire screen, allowing you to align smoke throws perfectly with details in the sky or walls.
                    </li>
                </ul>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Need to check your mouse DPI deviation before calibrating your binds?</p>
                    <Link href="/dpi-analyzer" style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: '1rem',
                    }}>
                        Use Mouse DPI Analyzer →
                    </Link>
                </div>
            </article>
        </div>
    );
}
