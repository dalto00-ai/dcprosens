import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Link href="/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sensitivity Converter</Link>
                    <Link href="/ads/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>ADS Calculator</Link>
                    <Link href="/dpi/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>eDPI Calculator</Link>
                    <Link href="/fps-calculator/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>FPS Calc</Link>
                    <Link href="/desk-space-calculator/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Desk Space Calculator</Link>
                    <Link href="/games/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>All Games</Link>
                    <Link href="/dpi-guide/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>DPI Guide</Link>
                    <Link href="/gta-vi-sensitivity/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>GTA VI Sensitivity</Link>
                    <Link href="/pricing/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Pricing</Link>
                    <Link href="/deals/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Gear Deals</Link>
                    <Link href="/advertise/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Advertise</Link>
                    <Link href="/about/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>About</Link>
                    <Link href="/contact/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Contact</Link>
                    <Link href="/privacy/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                    <Link href="/terms/" prefetch={false} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Terms of Service</Link>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <a
                        href="https://www.instagram.com/dcprosensofficial/"
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="DCPROSENS on Instagram"
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
                        📸 Instagram
                    </a>
                    <a
                        href="https://www.tiktok.com/@dcprosens"
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="DCPROSENS on TikTok"
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
                        🎵 TikTok
                    </a>
                    <a
                        href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/"
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="Founder Dalto Cardoso on LinkedIn"
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
                        💼 LinkedIn (Founder)
                    </a>
                    <a
                        href="https://x.com/dcprosens"
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="DCPROSENS on X"
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
                        𝕏 Twitter/X
                    </a>
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
                    Founded &amp; engineered by{' '}
                    <a href="https://www.linkedin.com/in/dalto-cardoso-2a47ab122/" target="_blank" rel="me noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        Dalto Cardoso
                    </a>{' '}
                    (<a href="https://dcoutlier.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 500 }}>DCOUTLIER</a>)
                </p>
            </div>
        </footer>
    );
}
