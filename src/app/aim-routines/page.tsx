import type { Metadata } from "next";
import AimRoutineGenerator from '@/components/AimRoutineGenerator';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Custom Aim Training Routine Generator — Aimlabs & KovaaKs | DCPROSENS",
    description: "Get a personalized 30-minute aim training routine. Select your game, rank, and target weaknesses to generate step-by-step training playlists for KovaaKs and Aimlabs.",
    keywords: [
        'aim routine generator', 'aim training generator', 'kovaaks routine generator', 'aimlabs routine generator',
        'valorant aim training routine', 'cs2 aim training routine', 'apex legends tracking routine',
        'overwatch 2 aim routine', 'custom aim routine', 'aimlabs playlist creator', 'kovaaks playlist creator',
        '30 minute aim routine', 'aimlabs gridshot routine', 'voltaic aim routines', 'fps aim training guide',
        'how to improve aim', 'aim training spreadsheet', 'mouse control exercises'
    ],
    alternates: {
        canonical: "https://dcprosens.com/aim-routines",
    },
    openGraph: {
        title: "Custom Aim Training Routine Generator — Aimlabs & KovaaKs | DCPROSENS",
        description: "Generate a personalized 30-minute aim training routine for KovaaKs and Aimlabs based on your game, rank, and weaknesses.",
        type: "website",
        url: "https://dcprosens.com/aim-routines",
    },
    twitter: {
        card: "summary_large_image",
        title: "Custom Aim Training Routine Generator — Aimlabs & KovaaKs",
        description: "Get a personalized 30-minute aim training routine for KovaaKs and Aimlabs based on your game and rank.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AimRoutinesPage() {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dcprosens.com" },
            { "@type": "ListItem", "position": 2, "name": "Aim Routines", "item": "https://dcprosens.com/aim-routines" },
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
                        name: "How often should I train my aim?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "For the best results, you should train daily for 30 to 45 minutes. Consistency is much more important than duration. Training 30 minutes every day will yield better muscle memory than training 3 hours once a week.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Should I use KovaaKs or Aimlabs?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Both are excellent tools. KovaaKs has an older, highly mature physics engine with thousands of community-made scenarios. Aimlabs is free, modern, and has outstanding visual analysis and statistics tracking. This generator provides routines compatible with both.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What is the best way to warm up before a match?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "A quick 5-to-10 minute warmup in Aimlabs (like Gridshot or Microshot) or KovaaKs, followed by one or two Deathmatches in-game, is the best way to calibrate your hand-eye coordination before jumping into competitive matches.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Does aim training actually work?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. Aim training isolates mouse control variables (like tracking, flicking speed, click timing, and stopping power) that occur infrequently in normal games. By practicing hundreds of repetitions in a few minutes, you build mouse control rapidly.",
                        },
                    },
                ],
            },
            {
                "@type": "SoftwareApplication",
                name: "DCPROSENS Aim Training Routine Generator",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
                url: "https://dcprosens.com/aim-routines",
                description: "Get a custom KovaaKs and Aimlabs aim training playlist based on your rank, game, and mechanical weaknesses.",
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
                Aim Training <span className="text-gradient">Routine Generator</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Generate a custom 30-minute daily aim training playlist for KovaaKs or Aimlabs optimized for your main game, rank, and mechanical weaknesses.
            </p>

            <AimRoutineGenerator />

            <article style={{ marginTop: '5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    How to Aim Train Effectively: The Science of Mouse Control
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                    Many gamers believe that simply playing their favorite shooter is enough to build god-like aim. While in-game experience is critical for game sense, positioning, and crosshair placement, it is a highly inefficient way to build raw mouse control. 
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    In a typical 40-minute Valorant or CS2 match, you might only engage in 20-30 gunfights. That means you are only practicing active aiming for less than a minute in total! An aim trainer like <strong style={{ color: 'var(--text-primary)' }}>KovaaKs</strong> or <strong style={{ color: 'var(--text-primary)' }}>Aimlabs</strong> allows you to engage in continuous shooting, doing thousands of repetitions in just a single 30-minute session.
                </p>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    Why a Structured 30-Minute Aim Routine is Key
                </h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    Aim training without a routine is like going to the gym and randomly picking up weights. To build balanced mouse control, your routine should be split into distinct phases:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Phase 1: Warm-up (5 Minutes).</strong> Activates the small muscles in your fingers and wrist, increases blood flow, and calibrates basic eye-to-hand coordination.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Phase 2: Core Focus (10 Minutes).</strong> Focuses on the primary mechanics needed for your game, like flicking/clicking in tactical shooters or tracking in arena/battle royale shooters.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Phase 3: Weakness Targeting (10 Minutes).</strong> Targets your specific mechanical weaknesses, such as micro-adjustments or fast target-switching.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Phase 4: Cooldown &amp; Integration (5 Minutes).</strong> Integrates your trainer mouse control back into your actual game environment (e.g. via Deathmatch or specialized custom maps).
                    </li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    How to Choose Your Mechanical Weakness
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                    Identifying your weak spots is essential for rapid improvement. Choose the focus area that matches your symptom:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Flicking:</strong> You struggle to lock onto targets quickly when they appear suddenly outside your crosshair.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Micro-adjustments:</strong> You can flick close to targets, but you struggle to make the tiny, precise correction to land headshots.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Tracking:</strong> In fast-moving games like Apex Legends or Overwatch, you find it difficult to keep your crosshair locked onto enemies who are strafing or flying.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Target Switching:</strong> In multi-enemy situations, you kill one player but take too long to lock onto the next, or fail to make clean, horizontal sweeps.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Crosshair Placement:</strong> You constantly have to make large flicks because you do not pre-aim angles or hold crosshairs at head level.
                    </li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
                    Golden Rules for Aim Training Success
                </h3>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Prioritize Accuracy:</strong> In clicking scenarios, aim for 95%+ accuracy. Speed will naturally develop as your brain optimizes the neural pathways for correct paths.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Stay Relaxed:</strong> Do not tense your hand, wrist, or arm. Tension limits your range of motion, creates jittery movements, and can lead to repetitive strain injuries (RSI) like tendonitis.
                    </li>
                    <li>
                        <strong style={{ color: 'var(--text-primary)' }}>Match Your Sensitivities:</strong> Ensure your mouse DPI and sensitivity in the aim trainer match your main game. (Use our sensitivity converter if you need to calculate matching trainer sensitivities!).
                    </li>
                </ol>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem' }}>Need to match your sensitivity settings between your game and KovaaKs/Aimlabs?</p>
                    <Link href="/" style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 700,
                        fontSize: '1rem',
                    }}>
                        Use Sensitivity Converter →
                    </Link>
                </div>
            </article>
        </div>
    );
}
