"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, loading } = useAuth();

    const [loginUrl, setLoginUrl] = useState('/login');
    const [dashboardUrl, setDashboardUrl] = useState('/dashboard');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        // `window` doesn't exist at static-export build time, so the initial
        // render (both server-built HTML and the first client pass) must use
        // the relative default to match — hostname-based URLs are only safe
        // to apply after mount, which is why this can't be computed inline
        // during render without causing a hydration mismatch.
        if (typeof window !== 'undefined' && window.location.hostname === 'dcprosens.com') {
            /* eslint-disable react-hooks/set-state-in-effect -- intentional: only known after mount */
            setLoginUrl('https://app.dcprosens.com/login/');
            setDashboardUrl('https://app.dcprosens.com/dashboard/');
            /* eslint-enable react-hooks/set-state-in-effect */
        }

        // Theme Initialization
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme as 'dark' | 'light');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        if (nextTheme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={`container ${styles.navbar}`}>
                <Link href="/" className={styles.logo} onClick={closeDrawer}>
                    DC<span>PROSENS</span>
                </Link>

                {/* DESKTOP LINKS - CATEGORIZED WITH DROPDOWNS */}
                <div className={styles.links}>
                    {/* DROP DOWN 1: AIM GAMES & CALIBRATORS */}
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownToggle}>Aim &amp; Games</span>
                        <div className={styles.dropdownMenu}>
                            <Link href="/" className={`${styles.dropdownItem} ${pathname === '/' ? styles.activeItem : ''}`} prefetch={false}>
                                🎯 Sensitivity Converter
                            </Link>
                            <Link href="/aim-trainer/" className={`${styles.dropdownItem} ${(pathname === '/aim-trainer' || pathname === '/aim-trainer/') ? styles.activeItem : ''}`} prefetch={false}>
                                🎮 Online 3D Aim Trainer <span style={{ fontSize: '0.68rem', background: '#00ff9d', color: '#000', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 800, marginLeft: '0.4rem' }}>FREE</span>
                            </Link>
                            <Link href="/aim-lab/" className={`${styles.dropdownItem} ${(pathname === '/aim-lab' || pathname === '/aim-lab/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⚡ Aim Lab Pro <span style={{ fontSize: '0.68rem', background: 'linear-gradient(135deg, #ff4757, #ff6b81)', color: '#fff', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 800, marginLeft: '0.4rem' }}>PREMIUM</span>
                            </Link>
                            <Link href="/sensitivity-test/" className={`${styles.dropdownItem} ${(pathname === '/sensitivity-test' || pathname === '/sensitivity-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                🕹️ Sensitivity Test <span style={{ fontSize: '0.68rem', background: 'rgba(0,255,157,0.15)', color: '#00ff9d', border: '1px solid #00ff9d', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700, marginLeft: '0.4rem' }}>3 TRIALS</span>
                            </Link>
                            <Link href="/widget/" className={`${styles.dropdownItem} ${(pathname === '/widget' || pathname === '/widget/') ? styles.activeItem : ''}`} prefetch={false}>
                                📡 Streamer Sens Widget <span style={{ fontSize: '0.68rem', background: '#3b82f6', color: '#fff', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 800, marginLeft: '0.4rem' }}>PRO</span>
                            </Link>
                            <Link href="/leaderboard/" className={`${styles.dropdownItem} ${(pathname === '/leaderboard' || pathname === '/leaderboard/') ? styles.activeItem : ''}`} prefetch={false}>
                                🏆 Leaderboard
                            </Link>
                            <Link href="/psa-calculator/" className={`${styles.dropdownItem} ${(pathname === '/psa-calculator' || pathname === '/psa-calculator/') ? styles.activeItem : ''}`} prefetch={false}>
                                📐 PSA Method Calculator
                            </Link>
                            <Link href="/sens-finder/" className={`${styles.dropdownItem} ${(pathname === '/sens-finder' || pathname === '/sens-finder/') ? styles.activeItem : ''}`} prefetch={false}>
                                🔍 cm/360 Sensitivity Finder
                            </Link>
                            <Link href="/ads/" className={`${styles.dropdownItem} ${(pathname === '/ads' || pathname === '/ads/') ? styles.activeItem : ''}`} prefetch={false}>
                                🔭 ADS &amp; Scope 1:1
                            </Link>
                            <Link href="/dpi/" className={`${styles.dropdownItem} ${(pathname === '/dpi' || pathname === '/dpi/') ? styles.activeItem : ''}`} prefetch={false}>
                                📏 DPI &amp; eDPI Calc
                            </Link>
                            <Link href="/aim-routines/" className={`${styles.dropdownItem} ${(pathname === '/aim-routines' || pathname === '/aim-routines/') ? styles.activeItem : ''}`} prefetch={false}>
                                📅 Custom Aim Routines
                            </Link>
                            <Link href="/fov-converter/" className={`${styles.dropdownItem} ${(pathname === '/fov-converter' || pathname === '/fov-converter/') ? styles.activeItem : ''}`} prefetch={false}>
                                🖥️ FOV Converter
                            </Link>
                            <Link href="/stretched-resolution/" className={`${styles.dropdownItem} ${(pathname === '/stretched-resolution' || pathname === '/stretched-resolution/') ? styles.activeItem : ''}`} prefetch={false}>
                                📺 Stretched Resolution Calc
                            </Link>
                            <Link href="/gta-vi-sensitivity/" className={`${styles.dropdownItem} ${(pathname === '/gta-vi-sensitivity' || pathname === '/gta-vi-sensitivity/') ? styles.activeItem : ''}`} prefetch={false}>
                                🌴 GTA VI Command Center
                            </Link>
                        </div>
                    </div>

                    {/* DROP DOWN 2: PRO PLAYERS */}
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownToggle}>Pro Players</span>
                        <div className={styles.dropdownMenu}>
                            <Link href="/pros/" className={`${styles.dropdownItem} ${pathname.startsWith('/pros') && pathname !== '/pros/compare' ? styles.activeItem : ''}`} prefetch={false}>
                                👤 Pro Settings Database
                            </Link>
                            <Link href="/pros/compare/" className={`${styles.dropdownItem} ${(pathname === '/pros/compare' || pathname === '/pros/compare/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⚖️ Pro Compare Tool
                            </Link>
                            <Link href="/setups/" className={`${styles.dropdownItem} ${(pathname === '/setups' || pathname === '/setups/') ? styles.activeItem : ''}`} prefetch={false}>
                                🏆 Pro Full Setups
                            </Link>
                            <Link href="/crosshair-database/" className={`${styles.dropdownItem} ${(pathname === '/crosshair-database' || pathname === '/crosshair-database/') ? styles.activeItem : ''}`} prefetch={false}>
                                📋 Pro Crosshairs List
                            </Link>
                            <Link href="/crosshair/" className={`${styles.dropdownItem} ${(pathname === '/crosshair' || pathname === '/crosshair/') ? styles.activeItem : ''}`} prefetch={false}>
                                ✛ Crosshair Generator
                            </Link>
                        </div>
                    </div>

                    {/* DROP DOWN 3: GEAR & UTILITIES */}
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownToggle}>Gear &amp; Databases</span>
                        <div className={styles.dropdownMenu}>
                            <Link href="/mouse-database/" className={`${styles.dropdownItem} ${(pathname === '/mouse-database' || pathname === '/mouse-database/') ? styles.activeItem : ''}`} prefetch={false}>
                                🖱️ Gaming Mouse Specs
                            </Link>
                            <Link href="/gear/" className={`${styles.dropdownItem} ${(pathname === '/gear' || pathname === '/gear/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⚙️ Keyboard, Monitors &amp; Headsets
                            </Link>
                            <Link href="/mouse-finder/" className={`${styles.dropdownItem} ${(pathname === '/mouse-finder' || pathname === '/mouse-finder/') ? styles.activeItem : ''}`} prefetch={false}>
                                🔍 Ergonomic Mouse Finder
                            </Link>
                            <Link href="/mousepad-calculator/" className={`${styles.dropdownItem} ${(pathname === '/mousepad-calculator' || pathname === '/mousepad-calculator/') ? styles.activeItem : ''}`} prefetch={false}>
                                📐 Mousepad Size Calculator
                            </Link>
                            <Link href="/mousepad-chart/" className={`${styles.dropdownItem} ${(pathname === '/mousepad-chart' || pathname === '/mousepad-chart/') ? styles.activeItem : ''}`} prefetch={false}>
                                📊 Mousepad Friction Chart
                            </Link>
                            <Link href="/monitor-simulator/" className={`${styles.dropdownItem} ${(pathname === '/monitor-simulator' || pathname === '/monitor-simulator/') ? styles.activeItem : ''}`} prefetch={false}>
                                🖥️ Refresh Rate Hz Simulator
                            </Link>
                            <Link href="/keyboard-test/" className={`${styles.dropdownItem} ${(pathname === '/keyboard-test' || pathname === '/keyboard-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⌨️ Keyboard &amp; NKRO Test
                            </Link>
                            <Link href="/gamepad-tester/" className={`${styles.dropdownItem} ${(pathname === '/gamepad-tester' || pathname === '/gamepad-tester/') ? styles.activeItem : ''}`} prefetch={false}>
                                🎮 Gamepad Drift Tester
                            </Link>
                            <Link href="/sound-test/" className={`${styles.dropdownItem} ${(pathname === '/sound-test' || pathname === '/sound-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                🔊 Audio &amp; Mic Tester
                            </Link>
                            <Link href="/dead-pixel-test/" className={`${styles.dropdownItem} ${(pathname === '/dead-pixel-test' || pathname === '/dead-pixel-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                🌈 Dead Pixel Screen Test
                            </Link>
                            <Link href="/ping-test/" className={`${styles.dropdownItem} ${(pathname === '/ping-test' || pathname === '/ping-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                🌐 Gaming Ping &amp; Jitter Test
                            </Link>
                        </div>
                    </div>

                    {/* DROP DOWN 4: MORE TOOLS */}
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownToggle}>More</span>
                        <div className={styles.dropdownMenu}>
                            <Link href="/fps-calculator/" className={`${styles.dropdownItem} ${(pathname === '/fps-calculator' || pathname === '/fps-calculator/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⚡ Bottleneck &amp; FPS Calc
                            </Link>
                            <Link href="/desk-space-calculator/" className={`${styles.dropdownItem} ${(pathname === '/desk-space-calculator' || pathname === '/desk-space-calculator/') ? styles.activeItem : ''}`} prefetch={false}>
                                📐 Desk Space Required Calc
                            </Link>
                            <Link href="/dpi-analyzer/" className={`${styles.dropdownItem} ${(pathname === '/dpi-analyzer' || pathname === '/dpi-analyzer/') ? styles.activeItem : ''}`} prefetch={false}>
                                🧪 Mouse DPI Analyzer
                            </Link>
                            <Link href="/cps-test/" className={`${styles.dropdownItem} ${(pathname === '/cps-test' || pathname === '/cps-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                🖱️ CPS Click Speed Test
                            </Link>
                            <Link href="/reaction-time-test/" className={`${styles.dropdownItem} ${(pathname === '/reaction-time-test' || pathname === '/reaction-time-test/') ? styles.activeItem : ''}`} prefetch={false}>
                                ⚡ Reaction Time Test
                            </Link>
                            <Link href="/bind-generator/" className={`${styles.dropdownItem} ${(pathname === '/bind-generator' || pathname === '/bind-generator/') ? styles.activeItem : ''}`} prefetch={false}>
                                🎛️ CS2 Bind Generator
                            </Link>
                            <Link href="/ebooks/" className={`${styles.dropdownItem} ${pathname.startsWith('/ebook') ? styles.activeItem : ''}`} prefetch={false}>
                                📚 Esports Field Guides &amp; Ebooks
                            </Link>
                            <Link href="/community/" className={`${styles.dropdownItem} ${pathname.startsWith('/community') ? styles.activeItem : ''}`} prefetch={false}>
                                👑 Pro Community &amp; Hub
                            </Link>
                            <Link href="/viral-studio/" className={`${styles.dropdownItem} ${(pathname === '/viral-studio' || pathname === '/viral-studio/') ? styles.activeItem : ''}`} prefetch={false}>
                                🎬 Viral 9:16 Video Studio
                            </Link>
                        </div>
                    </div>

                    <Link href="/blog/" className={`${styles.link} ${pathname.startsWith('/blog') ? styles.activeLink : ''}`}>Blog</Link>

                    {/* THEME TOGGLE BUTTON */}
                    <button 
                        className={styles.themeToggle} 
                        onClick={toggleTheme} 
                        aria-label="Toggle theme mode"
                    >
                        {theme === 'dark' ? (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>

                    {!loading && (
                        user ? (
                            <Link href={dashboardUrl} className={`${styles.link} ${styles.loginBtn}`}>Dashboard</Link>
                        ) : (
                            <Link href={loginUrl} className={`${styles.link} ${styles.loginBtn}`}>Log In / Sign Up</Link>
                        )
                    )}
                </div>

                {/* MOBILE HAMBURGER BUTTON */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button 
                        className={styles.themeToggle} 
                        style={{ border: 'none', fontSize: '1.2rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={toggleTheme} 
                        aria-label="Toggle theme mode"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button 
                        className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`} 
                        onClick={toggleDrawer}
                        aria-label="Toggle Navigation Menu"
                        aria-expanded={isOpen}
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>
                </div>
            </nav>

            {/* MOBILE SIDEBAR DRAWER OVERLAY */}
            {isOpen && (
                <div className={styles.overlay} onClick={closeDrawer} />
            )}

            {/* MOBILE SIDEBAR DRAWER PANEL */}
            <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerLogo}>DC<span>PROSENS</span></span>
                    <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close menu">✕</button>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Theme Mode</span>
                    <button 
                        onClick={toggleTheme} 
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '20px', 
                            padding: '0.3rem 1rem', 
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            fontSize: '0.85rem',
                            display: 'flex',
                            gap: '0.4rem',
                            alignItems: 'center'
                        }}
                    >
                        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>

                <div className={styles.drawerLinks} style={{ overflowY: 'auto', flex: 1, paddingBottom: '2rem' }}>
                    <div className={styles.drawerCategory}>🎯 Aim &amp; Sensitivity Games</div>
                    <Link href="/" className={`${styles.drawerLink} ${pathname === '/' ? styles.drawerActive : ''}`} onClick={closeDrawer}>
                        🏠 Primary Converter
                    </Link>
                    <Link href="/aim-trainer/" className={`${styles.drawerLink} ${(pathname === '/aim-trainer' || pathname === '/aim-trainer/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🎮 Online 3D Aim Trainer (FREE)
                    </Link>
                    <Link href="/aim-lab/" className={`${styles.drawerLink} ${(pathname === '/aim-lab' || pathname === '/aim-lab/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⚡ Aim Lab Pro (PREMIUM)
                    </Link>
                    <Link href="/sensitivity-test/" className={`${styles.drawerLink} ${(pathname === '/sensitivity-test' || pathname === '/sensitivity-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🕹️ Sensitivity Test (3 TRIALS)
                    </Link>
                    <Link href="/widget/" className={`${styles.drawerLink} ${(pathname === '/widget' || pathname === '/widget/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📡 Streamer Sens Widget (PRO)
                    </Link>
                    <Link href="/leaderboard/" className={`${styles.drawerLink} ${(pathname === '/leaderboard' || pathname === '/leaderboard/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🏆 Leaderboard
                    </Link>
                    <Link href="/ads/" className={`${styles.drawerLink} ${(pathname === '/ads' || pathname === '/ads/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🎯 Scopes / ADS 1:1
                    </Link>
                    <Link href="/dpi/" className={`${styles.drawerLink} ${(pathname === '/dpi' || pathname === '/dpi/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📏 eDPI Calculator
                    </Link>
                    <Link href="/sens-finder/" className={`${styles.drawerLink} ${(pathname === '/sens-finder' || pathname === '/sens-finder/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🔍 Find My Sensitivity
                    </Link>
                    <Link href="/psa-calculator/" className={`${styles.drawerLink} ${(pathname === '/psa-calculator' || pathname === '/psa-calculator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📐 PSA Method Calc
                    </Link>
                    <Link href="/aim-routines/" className={`${styles.drawerLink} ${(pathname === '/aim-routines' || pathname === '/aim-routines/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📅 Custom Aim Routines
                    </Link>
                    <Link href="/fov-converter/" className={`${styles.drawerLink} ${(pathname === '/fov-converter' || pathname === '/fov-converter/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🖥️ FOV Converter
                    </Link>
                    <Link href="/stretched-resolution/" className={`${styles.drawerLink} ${(pathname === '/stretched-resolution' || pathname === '/stretched-resolution/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🖥️ Stretched Resolution
                    </Link>
                    <Link href="/gta-vi-sensitivity/" className={`${styles.drawerLink} ${(pathname === '/gta-vi-sensitivity' || pathname === '/gta-vi-sensitivity/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🌴 GTA VI Command Center (HOT)
                    </Link>

                    <div className={styles.drawerCategory}>👤 Pro Settings</div>
                    <Link href="/pros/" className={`${styles.drawerLink} ${pathname.startsWith('/pros') && pathname !== '/pros/compare' ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        👤 Pro Player Database
                    </Link>
                    <Link href="/pros/compare/" className={`${styles.drawerLink} ${(pathname === '/pros/compare' || pathname === '/pros/compare/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⚖️ Settings Compare Tool
                    </Link>
                    <Link href="/setups/" className={`${styles.drawerLink} ${(pathname === '/setups' || pathname === '/setups/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🏆 Pro Full Setups
                    </Link>
                    <Link href="/crosshair-database/" className={`${styles.drawerLink} ${(pathname === '/crosshair-database' || pathname === '/crosshair-database/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📋 Pro Crosshairs
                    </Link>
                    <Link href="/crosshair/" className={`${styles.drawerLink} ${(pathname === '/crosshair' || pathname === '/crosshair/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ✛ Crosshair Generator
                    </Link>

                    <div className={styles.drawerCategory}>🔌 Gear &amp; Specs</div>
                    <Link href="/mouse-database/" className={`${styles.drawerLink} ${(pathname === '/mouse-database' || pathname === '/mouse-database/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🖱️ Gaming Mouse Specs
                    </Link>
                    <Link href="/gear/" className={`${styles.drawerLink} ${(pathname === '/gear' || pathname === '/gear/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⚙️ Peripherals Database
                    </Link>
                    <Link href="/mouse-finder/" className={`${styles.drawerLink} ${(pathname === '/mouse-finder' || pathname === '/mouse-finder/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🔍 Mouse Finder
                    </Link>
                    <Link href="/mousepad-calculator/" className={`${styles.drawerLink} ${(pathname === '/mousepad-calculator' || pathname === '/mousepad-calculator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📐 Mousepad Size Calc
                    </Link>
                    <Link href="/mousepad-chart/" className={`${styles.drawerLink} ${(pathname === '/mousepad-chart' || pathname === '/mousepad-chart/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📊 Friction Speed Chart
                    </Link>
                    <Link href="/monitor-simulator/" className={`${styles.drawerLink} ${(pathname === '/monitor-simulator' || pathname === '/monitor-simulator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🖥️ Refresh Rate Simulator
                    </Link>
                    <Link href="/keyboard-test/" className={`${styles.drawerLink} ${(pathname === '/keyboard-test' || pathname === '/keyboard-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⌨️ Keyboard &amp; NKRO Test
                    </Link>
                    <Link href="/gamepad-tester/" className={`${styles.drawerLink} ${(pathname === '/gamepad-tester' || pathname === '/gamepad-tester/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🎮 Gamepad Drift Tester
                    </Link>
                    <Link href="/sound-test/" className={`${styles.drawerLink} ${(pathname === '/sound-test' || pathname === '/sound-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🔊 Audio &amp; Mic Tester
                    </Link>
                    <Link href="/dead-pixel-test/" className={`${styles.drawerLink} ${(pathname === '/dead-pixel-test' || pathname === '/dead-pixel-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🌈 Dead Pixel Screen Test
                    </Link>
                    <Link href="/ping-test/" className={`${styles.drawerLink} ${(pathname === '/ping-test' || pathname === '/ping-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🌐 Gaming Ping &amp; Jitter Test
                    </Link>

                    <div className={styles.drawerCategory}>⚡ Extra Utilities</div>
                    <Link href="/fps-calculator/" className={`${styles.drawerLink} ${(pathname === '/fps-calculator' || pathname === '/fps-calculator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⚡ FPS &amp; Bottleneck Calc
                    </Link>
                    <Link href="/desk-space-calculator/" className={`${styles.drawerLink} ${(pathname === '/desk-space-calculator' || pathname === '/desk-space-calculator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📐 Desk Space Required
                    </Link>
                    <Link href="/dpi-analyzer/" className={`${styles.drawerLink} ${(pathname === '/dpi-analyzer' || pathname === '/dpi-analyzer/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🧪 Mouse DPI Analyzer
                    </Link>
                    <Link href="/cps-test/" className={`${styles.drawerLink} ${(pathname === '/cps-test' || pathname === '/cps-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🖱️ CPS Click Test
                    </Link>
                    <Link href="/reaction-time-test/" className={`${styles.drawerLink} ${(pathname === '/reaction-time-test' || pathname === '/reaction-time-test/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        ⚡ Reaction Time Test
                    </Link>
                    <Link href="/viral-studio/" className={`${styles.drawerLink} ${(pathname === '/viral-studio' || pathname === '/viral-studio/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🎬 Viral 9:16 Video Studio
                    </Link>
                    <Link href="/bind-generator/" className={`${styles.drawerLink} ${(pathname === '/bind-generator' || pathname === '/bind-generator/') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        🎛️ CS2 Bind Generator
                    </Link>
                    <Link href="/ebooks/" className={`${styles.drawerLink} ${pathname.startsWith('/ebook') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        📚 Esports Field Guides (6 Volumes)
                    </Link>
                    <Link href="/community/" className={`${styles.drawerLink} ${pathname.startsWith('/community') ? styles.drawerActive : ''}`} prefetch={false} onClick={closeDrawer}>
                        👑 Pro Community &amp; Hub
                    </Link>
                    <Link href="/blog/" className={`${styles.drawerLink} ${pathname.startsWith('/blog') ? styles.drawerActive : ''}`} onClick={closeDrawer}>
                        📰 Blog Articles
                    </Link>

                    {!loading && (
                        user ? (
                            <Link href={dashboardUrl} className={`${styles.drawerLink} ${pathname === '/dashboard' ? styles.drawerActive : ''}`} onClick={closeDrawer}>
                                💻 Dashboard
                            </Link>
                        ) : (
                            <Link href={loginUrl} className={`${styles.drawerLink} ${pathname === '/login' ? styles.drawerActive : ''}`} onClick={closeDrawer}>
                                🔑 Log In / Sign Up
                            </Link>
                        )
                    )}
                </div>

                <div className={styles.drawerFooter}>
                    <p>Perfect Sensitivity for Pro Gamers.</p>
                </div>
            </div>
        </header>
    );
}
