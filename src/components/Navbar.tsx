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
                    <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.activeLink : ''}`}>Conversor</Link>
                    <Link href="/ads" className={`${styles.link} ${pathname === '/ads' ? styles.activeLink : ''}`}>Mira ADS</Link>
                    <Link href="/dpi" className={`${styles.link} ${pathname === '/dpi' ? styles.activeLink : ''}`}>Calc DPI</Link>
                    <Link href="/games" className={`${styles.link} ${pathname === '/games' ? styles.activeLink : ''}`}>Jogos</Link>
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
                        🏠 Conversor Principal
                    </Link>
                    <Link 
                        href="/ads" 
                        className={`${styles.drawerLink} ${pathname === '/ads' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎯 Calculadora ADS 1:1
                    </Link>
                    <Link 
                        href="/dpi" 
                        className={`${styles.drawerLink} ${pathname === '/dpi' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📏 Calculadora eDPI
                    </Link>
                    <Link 
                        href="/games" 
                        className={`${styles.drawerLink} ${pathname === '/games' ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        🎮 Banco de Jogos (Yaws)
                    </Link>
                    <Link 
                        href="/blog" 
                        className={`${styles.drawerLink} ${pathname.startsWith('/blog') ? styles.drawerActive : ''}`}
                        onClick={closeDrawer}
                    >
                        📰 Artigos & Guias de Mira
                    </Link>
                    <Link 
                        href="/#pro-comparator" 
                        className={styles.drawerLink}
                        onClick={closeDrawer}
                    >
                        ⚖️ Comparador Visual Pro
                    </Link>
                </div>

                <div className={styles.drawerFooter}>
                    <p>Sensibilidade Perfeita para Pro Gamers.</p>
                </div>
            </div>
        </header>
    );
}
