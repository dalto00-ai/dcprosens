import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
                    <a href="/about" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>About</a>
                    <a href="/contact" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Contact</a>
                    <a href="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Privacy Policy</a>
                    <a href="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Terms of Service</a>
                </div>
                <p>&copy; {new Date().getFullYear()} DCPROSENS. All rights reserved.</p>
                <p className={styles.powered}>
                    Powered by <span style={{ color: 'var(--primary)' }}>Antigravity</span>
                </p>
            </div>
        </footer>
    );
}
