"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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

                {/* DESKTOP LINKS */}
                <div className={styles.links}>
                    <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.activeLink : ''}`}>Converter</Link>
                    <Link href="/ads" className={`${styles.link} ${pathname === '/ads' ? styles.activeLink : ''}`}>ADS</Link>
                    <Link href="/dpi" className={`${styles.link} ${pathname === '/dpi' ? styles.activeLink : ''}`}>eDPI</Link>
                    <Link href="/sens-finder" className={`${styles.link} ${pathname === '/sens-finder' ? styles.activeLink : ''}`}>Sens Finder</Link>
                    <Link href="/psa-calculator" className={`${styles.link} ${pathname === '/psa-calculator' ? styles.activeLink : ''}`}>PSA Calc</Link>
                    <Link href="/crosshair" className={`${styles.link} ${pathname === '/crosshair' ? styles.activeLink : ''}`}>Crosshair</Link>
                    <Link href="/pros" className={`${styles.link} ${pathname.startsWith('/pros') && pathname !== '/pros/compare' ? styles.activeLink : ''}`}>Pros</Link>
                    <Link href="/pros/compare" className={`${styles.link} ${pathname === '/pros/compare' ? styles.activeLink : ''}`}>Compare</Link>
                    <Link href="/mouse-database" className={`${styles.link} ${pathname === '/mouse-database' ? styles.activeLink : ''}`}>Mice DB</Link>
                    <Link href="/gear" className={`${styles.link} ${pathname === '/gear' ? styles.activeLink : ''}`}>Gear</Link>
                    <Link href="/blog" className={`${styles.link} ${pathname.startsWith('/blog') ? styles.activeLink : ''}`}>Blog</Link>
                </div>

                {/* MOBILE HAMBURGER BUTTON */}
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
                
                <div className={styles.drawerLinks}>
                    <Link 
                        href="/" 
                        className={`${styles.drawerLink} ${pathname === '/' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🏠 Primary Converter
                    </Link>
                    <Link 
                        href="/ads" 
                        className={`${styles.drawerLink} ${pathname === '/ads' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎯 Scopes / ADS 1:1
                    </Link>
                    <Link 
                        href="/dpi" 
                        className={`${styles.drawerLink} ${pathname === '/dpi' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📏 eDPI Calculator
                    </Link>
                    <Link 
                        href="/sens-finder" 
                        className={`${styles.drawerLink} ${pathname === '/sens-finder' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🔍 Find My Sensitivity (cm/360)
                    </Link>
                    <Link 
                        href="/psa-calculator" 
                        className={`${styles.drawerLink} ${pathname === '/psa-calculator' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📐 PSA Method Calculator
                    </Link>
                    <Link 
                        href="/crosshair" 
                        className={`${styles.drawerLink} ${pathname === '/crosshair' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        ✛ Crosshair Generator
                    </Link>
                    <Link 
                        href="/mousepad-calculator" 
                        className={`${styles.drawerLink} ${pathname === '/mousepad-calculator' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🖱️ Mousepad Size Calculator
                    </Link>
                    <Link 
                        href="/polling-rate" 
                        className={`${styles.drawerLink} ${pathname === '/polling-rate' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        ⚡ Polling Rate Guide
                    </Link>
                    <Link 
                        href="/mouse-finder" 
                        className={`${styles.drawerLink} ${pathname === '/mouse-finder' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🔍 Ergonomic Mouse Finder
                    </Link>
                    <Link 
                        href="/dpi-analyzer" 
                        className={`${styles.drawerLink} ${pathname === '/dpi-analyzer' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🧪 Mouse DPI Analyzer
                    </Link>
                    <Link 
                        href="/stretched-resolution" 
                        className={`${styles.drawerLink} ${pathname === '/stretched-resolution' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🖥️ Stretched Resolution Calc
                    </Link>
                    <Link 
                        href="/aim-routines" 
                        className={`${styles.drawerLink} ${pathname === '/aim-routines' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📅 Custom Aim Routines
                    </Link>
                    <Link 
                        href="/bind-generator" 
                        className={`${styles.drawerLink} ${pathname === '/bind-generator' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎛️ CS2 Bind Generator
                    </Link>
                    <Link 
                        href="/aim-trainer" 
                        className={`${styles.drawerLink} ${pathname === '/aim-trainer' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎯 Online Aim Trainer
                    </Link>
                    <Link 
                        href="/ebook" 
                        className={`${styles.drawerLink} ${pathname === '/ebook' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        ⚡ Precision Aim System ($9)
                    </Link>
                    <Link 
                        href="/pros" 
                        className={`${styles.drawerLink} ${pathname.startsWith('/pros') && pathname !== '/pros/compare' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        👤 Pro Player Settings
                    </Link>
                    <Link 
                        href="/pros/compare" 
                        className={`${styles.drawerLink} ${pathname === '/pros/compare' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        ⚖️ Pro Player Compare Tool
                    </Link>
                    <Link 
                        href="/setups" 
                        className={`${styles.drawerLink} ${pathname === '/setups' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🏆 Pro Full Setups
                    </Link>
                    <Link 
                        href="/mouse-database" 
                        className={`${styles.drawerLink} ${pathname === '/mouse-database' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🖱️ Gaming Mouse Database
                    </Link>
                    <Link 
                        href="/gear" 
                        className={`${styles.drawerLink} ${pathname === '/gear' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        ⚙️ Gear Database (Keyboards, Headsets...)
                    </Link>
                    <Link 
                        href="/games" 
                        className={`${styles.drawerLink} ${pathname === '/games' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎮 Game Profiles Database
                    </Link>
                    <Link 
                        href="/blog" 
                        className={`${styles.drawerLink} ${pathname.startsWith('/blog') ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📰 Blog Articles & Manuals
                    </Link>
                    <Link 
                        href="/#pro-comparator" 
                        className={styles.drawerLink}
                        onClick={closeDrawer}
                    >
                        ⚖️ Pro Visual Comparator
                    </Link>
                </div>


                <div className={styles.drawerFooter}>
                    <p>Sensibilidade Perfeita para Pro Gamers.</p>
                </div>
            </div>
        </header>
    );
}
