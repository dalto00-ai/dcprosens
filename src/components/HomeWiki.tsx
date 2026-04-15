import Link from 'next/link';
import styles from './HomeWiki.module.css';

export default function HomeWiki() {
    return (
        <section className={styles.wikiContainer}>
            <div className={styles.divider}></div>

            <article className={styles.content}>
                <h2 className={styles.h2}>The Ultimate Guide to Mouse Sensitivity &amp; Aim Conversion</h2>

                <p>
                    Welcome to <strong>DCPROSENS</strong>, the industry-leading <strong>sensitivity converter</strong> for competitive gamers looking to
                    convert sensitivity between titles like <em>Valorant</em>, <em>CS2</em>, <em>Apex Legends</em>, and <em>Overwatch 2</em>.
                    Unlike basic calculators, our engine uses the <strong>cm/360 algorithm</strong> to ensure your muscle memory translates
                    perfectly across all game engines — Source, Unreal Engine, and more.
                </p>

                <h3 className={styles.h3}>What is a Sensitivity Converter?</h3>
                <p>
                    A <strong>sensitivity converter</strong> (also called a sensitivity calculator or aim converter) translates your in-game
                    mouse sensitivity from one game to another while preserving your physical mouse movement. For example, if
                    you move 30cm to do a 360° turn in Valorant, the converter ensures you still move 30cm to do a 360° turn in
                    CS2 — even though the internal sensitivity numbers are completely different.
                </p>

                <h3 className={styles.h3}>Why Your cm/360 Matters More Than Sensitivity Numbers</h3>
                <p>
                    Your brain learns aim through <strong>physical distance</strong>, not in-game numbers. If you move your mouse 30cm to
                    do a 360° turn in Valorant, but 25cm in CS2, your aim training transfers incorrectly. This is why pros
                    like <strong>TenZ</strong>, <strong>s1mple</strong>, and <strong>NiKo</strong> obsess over their
                    <strong> eDPI</strong> (Effective Dots Per Inch). Standardizing your settings using our calculator
                    maximizes your consistency across every game you play.
                </p>

                <h3 className={styles.h3}>Supported Games &amp; Conversion Accuracy</h3>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h4>Valorant → CS2</h4>
                        <p>Most popular conversion. Multiply Valorant sens by <strong>3.18</strong>. Our tool handles this
                            automatically. <Link href="/blog/valorant-to-cs2-sensitivity">Full Valorant to CS2 guide →</Link></p>
                    </div>
                    <div className={styles.card}>
                        <h4>Apex Legends → Valorant</h4>
                        <p>Apex uses yaw 0.022, Valorant uses 0.07. Our converter preserves your cm/360 exactly for seamless tracking transfer.</p>
                    </div>
                    <div className={styles.card}>
                        <h4>Overwatch 2 → CS2 / Apex</h4>
                        <p>Overwatch 2&apos;s unique yaw (0.006327) requires precise math. Select OW2 as input and get an exact conversion instantly.</p>
                    </div>
                </div>

                <h3 className={styles.h3}>Frequently Asked Questions</h3>

                <div className={styles.faq}>
                    <details>
                        <summary>What is a good eDPI for Valorant?</summary>
                        <p>Most professional Valorant players sit between <strong>200–400 eDPI</strong>. TenZ uses 240 eDPI (800 DPI × 0.3),
                            Aspas uses 320 eDPI (800 DPI × 0.4). Players in the 300–400 eDPI range tend to balance precision headshots with fast flicking.</p>
                    </details>
                    <details>
                        <summary>How do I use the sensitivity converter?</summary>
                        <p>Select your source game (e.g., Valorant), enter your current sensitivity and DPI. Then select your target game
                            (e.g., CS2). The converted sensitivity and your cm/360 appear instantly. Copy the result and paste it into your game settings.</p>
                    </details>
                    <details>
                        <summary>Does DPI affect latency in games?</summary>
                        <p>Slightly. As covered in our <Link href="/blog/dpi-vs-sensitivity-difference">DPI vs Sensitivity guide</Link>, higher DPI (1600+)
                            can reduce input rounding errors and may improve perceived smoothness on high-refresh monitors (240Hz+).
                            However, the eDPI is what truly determines aim feel.</p>
                    </details>
                    <details>
                        <summary>How do I convert Fortnite sensitivity to Valorant?</summary>
                        <p>Fortnite uses a slider percentage that corresponds to a raw multiplier. Our tool handles this third-person FOV
                            complexity automatically. Select Fortnite as input, enter your percentage, and select Valorant as output.
                            Read our <Link href="/blog/fortnite-to-valorant-sensitivity-2026">complete Fortnite to Valorant guide</Link>.</p>
                    </details>
                    <details>
                        <summary>What is cm/360 and why does it matter?</summary>
                        <p><strong>cm/360</strong> (centimeters per 360°) is the physical distance you must move your mouse
                            to rotate a full circle in-game. It is the universal aim standard because it is independent of
                            DPI settings or game engine math. Most FPS pros use <strong>25–55 cm/360</strong>.</p>
                    </details>
                    <details>
                        <summary>What sensitivity do CS2 pros use?</summary>
                        <p>CS2 professionals typically use 400 DPI with 1.0–3.0 in-game sensitivity, resulting in 400–1200 eDPI.
                            s1mple uses 400 DPI × 3.09 = 1236 eDPI. NiKo uses 400 DPI × 1.4 = 560 eDPI.
                            Check our <Link href="/#pro-settings">Pro Player Settings database</Link> above for the full list.</p>
                    </details>
                </div>

                <h3 className={styles.h3}>Advanced Concepts: cm/360 &amp; eDPI Explained</h3>
                <p>
                    <strong>Centimeters per 360 (cm/360)</strong> is the only universal language of aim across all FPS games.
                    Low sensitivity (high cm/360 = ~45cm+) offers precision for tactical shooters like CS2.
                    High sensitivity (low cm/360 = ~15–25cm) offers fast reactivity for tracking-heavy games like Apex.
                    Our tool lets you input your sens+DPI and immediately see your cm/360 — helping you find your
                    &quot;Perfect Sensitivity Approximation&quot; (PSA) scientifically.
                </p>

                <p style={{ marginTop: '1.5rem' }}>
                    Want to go deeper? Read our guides on{' '}
                    <Link href="/blog/what-is-edpi-gaming-guide">what eDPI means</Link>,{' '}
                    <Link href="/blog/find-perfect-mouse-sensitivity">how to find your perfect mouse sensitivity</Link>,{' '}
                    and <Link href="/blog/dpi-vs-sensitivity-difference">DPI vs in-game sensitivity</Link>.
                </p>
            </article>

            <div className={styles.divider}></div>

            <article className={styles.content}>
                <h3 className={styles.h3}>Latest Web Stories</h3>
                <div className={styles.grid}>
                    <Link href="/web-stories/top-5-mice-2026" className={styles.card} style={{ textDecoration: 'none' }}>
                        <h4>Top 5 Gaming Mice 2026</h4>
                        <p>The best wireless mice for competitive gaming this year.</p>
                    </Link>
                    <Link href="/web-stories/valorant-vs-cs2-differences" className={styles.card} style={{ textDecoration: 'none' }}>
                        <h4>Valorant vs CS2</h4>
                        <p>Key differences in movement and mechanics explaining the switch.</p>
                    </Link>
                    <Link href="/web-stories/what-is-edpi" className={styles.card} style={{ textDecoration: 'none' }}>
                        <h4>What is eDPI?</h4>
                        <p>A quick visual guide to understanding effective sensitivity.</p>
                    </Link>
                </div>
            </article>
        </section>
    );
}
