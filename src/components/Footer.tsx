import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Link href="/about" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>About</Link>
                    <Link href="/contact" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Contact</Link>
                    <Link href="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                    <Link href="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Terms of Service</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} DCPROSENS. All rights reserved.</p>
                <p className={styles.powered} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Site feito com muito carinho pela <a href="https://dcoutlier.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 500 }}>DCOUTLIER</a>
                </p>
            </div>
        </footer>
    );
}
