import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Conversor</Link>
                    <Link href="/ads" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calculadora ADS</Link>
                    <Link href="/dpi" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calculadora eDPI</Link>
                    <Link href="/fps-calculator" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>FPS Calc</Link>
                    <Link href="/desk-space-calculator" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Espaço na Mesa</Link>
                    <Link href="/about" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sobre</Link>
                    <Link href="/contact" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Contato</Link>
                    <Link href="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Privacidade</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} DCPROSENS. All rights reserved.</p>
                <p className={styles.powered} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Site feito com muito carinho pela <a href="https://dcoutlier.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 500 }}>DCOUTLIER</a>
                </p>
            </div>
        </footer>
    );
}
