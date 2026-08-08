import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Link href="/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Conversor</Link>
                    <Link href="/ads" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calculadora ADS</Link>
                    <Link href="/dpi" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calculadora eDPI</Link>
                    <Link href="/fps-calculator" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>FPS Calc</Link>
                    <Link href="/desk-space-calculator" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Espaço na Mesa</Link>
                    <Link href="/about" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sobre</Link>
                    <Link href="/contact" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Contato</Link>
                    <Link href="/privacy" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Privacidade</Link>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <a 
                        href="https://chromewebstore.google.com/detail/dcprosens-sensitivity-con/hamlcadjopefnhcebjafcllomlphapbc" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        🌐 Chrome Web Store Extension
                    </a>
                    <a 
                        href="https://play.google.com/store/apps/details?id=com.dcprosens.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        📱 Google Play Store App
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} DCPROSENS. All rights reserved.</p>
                <p className={styles.powered} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Site feito com muito carinho pela <a href="https://dcoutlier.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 500 }}>DCOUTLIER</a>
                </p>
            </div>
        </footer>
    );
}
