"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className={styles.bottomNav} role="navigation" aria-label="Mobile Navigation">
            <Link 
                href="/" 
                className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
            >
                <span className={styles.navIcon}>🏠</span>
                <span className={styles.navLabel}>Converter</span>
            </Link>

            <Link 
                href="/ads" 
                className={`${styles.navItem} ${pathname === '/ads' ? styles.active : ''}`}
            >
                <span className={styles.navIcon}>🎯</span>
                <span className={styles.navLabel}>ADS</span>
            </Link>

            <Link 
                href="/#pro-comparator" 
                className={`${styles.navItem} ${pathname === '/' && typeof window !== 'undefined' && window.location.hash === '#pro-comparator' ? styles.active : ''}`}
            >
                <span className={styles.navIcon}>⚖️</span>
                <span className={styles.navLabel}>Compare</span>
            </Link>

            <Link 
                href="/dpi" 
                className={`${styles.navItem} ${pathname === '/dpi' ? styles.active : ''}`}
            >
                <span className={styles.navIcon}>📏</span>
                <span className={styles.navLabel}>eDPI</span>
            </Link>

            <Link 
                href="/blog" 
                className={`${styles.navItem} ${pathname.startsWith('/blog') ? styles.active : ''}`}
            >
                <span className={styles.navIcon}>📰</span>
                <span className={styles.navLabel}>Blog</span>
            </Link>
        </div>
    );
}
