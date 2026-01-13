import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`container ${styles.navbar}`}>
            <Link href="/" className={styles.logo}>
                DC<span>PROSENS</span>
            </Link>

            <div className={styles.links}>
                <Link href="/" className={styles.link}>Converter</Link>
                <Link href="/dpi" className={styles.link}>DPI Tool</Link>
                <Link href="/games" className={styles.link}>Games</Link>
            </div>

        </nav>
    );
}
