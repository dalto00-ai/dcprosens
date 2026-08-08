'use client';

import { useState, useEffect, useRef } from 'react';

/* ======================================================
   ANIMATED COUNTER — Numbers count up when visible
   ====================================================== */
export function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Easing: ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ======================================================
   LIVE ACTIVITY FEED — Simulated real-time conversions
   ====================================================== */
const activityData = [
    { from: 'Valorant', to: 'CS2', sens: '0.3', result: '0.954', country: '🇺🇸', time: '2s ago' },
    { from: 'Apex', to: 'Valorant', sens: '2.5', result: '0.786', country: '🇧🇷', time: '5s ago' },
    { from: 'CS2', to: 'Overwatch 2', sens: '1.8', result: '6.26', country: '🇰🇷', time: '8s ago' },
    { from: 'Fortnite', to: 'Valorant', sens: '45%', result: '0.42', country: '🇩🇪', time: '12s ago' },
    { from: 'Overwatch 2', to: 'CS2', sens: '4.0', result: '1.15', country: '🇯🇵', time: '15s ago' },
    { from: 'Valorant', to: 'Apex', sens: '0.5', result: '1.59', country: '🇬🇧', time: '18s ago' },
    { from: 'R6 Siege', to: 'Valorant', sens: '12', result: '0.98', country: '🇫🇷', time: '22s ago' },
    { from: 'CS2', to: 'Valorant', sens: '2.0', result: '0.629', country: '🇹🇷', time: '25s ago' },
];

export function LiveActivityFeed() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % activityData.length);
                setIsVisible(true);
            }, 400);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const activity = activityData[currentIndex];

    return (
        <div className="home-live-feed">
            <div className="home-live-dot"></div>
            <div className={`home-live-text ${isVisible ? 'home-live-visible' : 'home-live-hidden'}`}>
                <span className="home-live-flag">{activity.country}</span>
                <span>
                    <strong>{activity.from}</strong> → <strong>{activity.to}</strong>
                    <span className="home-live-detail"> ({activity.sens} → {activity.result})</span>
                </span>
                <span className="home-live-time">{activity.time}</span>
            </div>
        </div>
    );
}

/* ======================================================
   FLOATING PARTICLES — Background animation for hero
   ====================================================== */
export function FloatingParticles() {
    // Random values are generated client-side only, after mount: computing
    // them during render would make the server-rendered markup (fixed at
    // build time) and the first client render disagree, triggering a
    // hydration mismatch on every page load.
    const [particles, setParticles] = useState<React.CSSProperties[] | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: only known after mount
        setParticles(
            Array.from({ length: 20 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 8}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                opacity: 0.15 + Math.random() * 0.25,
            }))
        );
    }, []);

    return (
        <div className="home-particles" aria-hidden="true">
            {particles?.map((style, i) => (
                <div key={i} className="home-particle" style={style} />
            ))}
        </div>
    );
}

/* ======================================================
   COMPETITOR COMPARISON TABLE
   ====================================================== */
export function CompetitorTable() {
    // "otherSites" is a generic yes/no — does at least one typical
    // competitor site offer this — kept deliberately unnamed rather than
    // calling out specific competitors by name.
    const features = [
        { name: '1:1 Sensitivity Converter', dcprosens: true, otherSites: true },
        { name: 'PSA Method Calculator', dcprosens: true, otherSites: false },
        { name: 'Pro Settings Database', dcprosens: true, otherSites: true },
        { name: 'Crosshair Generator', dcprosens: true, otherSites: false },
        { name: 'Mouse Spec Database', dcprosens: true, otherSites: true },
        { name: 'Online Aim Trainer', dcprosens: true, otherSites: true },
        { name: 'Sensitivity Test Mini-Game', dcprosens: true, otherSites: false },
        { name: 'DPI Analyzer', dcprosens: true, otherSites: false },
        { name: 'Scopes/ADS 1:1 Matching', dcprosens: true, otherSites: true },
        { name: 'Mousepad Friction Chart', dcprosens: true, otherSites: false },
        { name: 'Visual Pro Comparator', dcprosens: true, otherSites: false },
        { name: 'No Ads / Clean UI', dcprosens: true, otherSites: false },
        { name: 'Free Core Tools', dcprosens: true, otherSites: true },
    ];

    const dcTotal = features.filter((f) => f.dcprosens).length;
    const otherTotal = features.filter((f) => f.otherSites).length;

    return (
        <div className="home-compare-table-wrap">
            <div className="home-compare-table-scroll">
                <table className="home-compare-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th className="home-compare-highlight">DCPROSENS</th>
                            <th>Other Sites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((f) => (
                            <tr key={f.name}>
                                <td className="home-compare-feature">{f.name}</td>
                                <td className="home-compare-highlight">{f.dcprosens ? '✅' : '—'}</td>
                                <td>{f.otherSites ? '✅' : '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="home-compare-feature"><strong>Total</strong></td>
                            <td className="home-compare-highlight"><strong className="home-compare-score">{dcTotal}/{features.length}</strong></td>
                            <td><strong>{otherTotal}/{features.length}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

/* ======================================================
   SCROLL REVEAL WRAPPER — Fade-in on scroll
   ====================================================== */
export function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`home-scroll-reveal ${isVisible ? 'home-scroll-visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
