import Link from 'next/link';
import styles from './HomeWiki.module.css';

export default function HomeWiki() {
    return (
        <section className={styles.wikiContainer}>
            <div className={styles.divider}></div>

            <article className={styles.content}>
                <h2 className={styles.h2}>The Ultimate Guide to Mouse Sensitivity & Aim Conversion</h2>

                <p>
                    Welcome to <strong>DCPROSENS</strong>, the industry-leading destination for competitive gamers looking to <strong>convert sensitivity</strong> between titles like <em>Valorant</em>, <em>CS2</em>, <em>Apex Legends</em>, and <em>Overwatch 2</em>.
                    Unlike basic calculators, our engine uses the <strong>cm/360 algorithm</strong> to ensure your muscle memory translates perfectly across engines (Source, Unreal Engine, Unity, and more).
                </p>

                <h3 className={styles.h3}>Why Sensitivity Conversion Matters for Muscle Memory</h3>
                <p>
                    Your brain learns aim through physical distance, not in-game numbers. If you move your mouse 30cm to do a 360-degree turn in Valorant,
                    but 25cm in CS2, your aim training is effectively useless. This is why pros like <strong>TenZ</strong>, <strong>s1mple</strong>, and <strong>Faker</strong>
                    obsess over their <strong>eDPI</strong> (Effective Dots Per Inch). By standardizing your settings using our calculator, you maximize consistency.
                </p>

                <h3 className={styles.h3}>Supported Games & Engines</h3>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h4>Valorant (Unreal Engine)</h4>
                        <p>With a Yaw of 0.07, Valorant requires precise conversion math when moving to Source titles.
                            Use our tool to calculate exact <Link href="/blog/valorant-to-cs2-sensitivity">Valorant to CS2 sensitivity</Link>.</p>
                    </div>
                    <div className={styles.card}>
                        <h4>CS:GO & CS2 (Source/Source 2)</h4>
                        <p>The gold standard of aim. Uses 0.022 Yaw. Commonly converted to Apex Legends (same yaw) for seamless tracking practice.</p>
                    </div>
                    <div className={styles.card}>
                        <h4>Overwatch 2 & COD</h4>
                        <p>Fast-paced tracking games. Often converted using the "0% Monitor Distance Match" method for visual consistency.</p>
                    </div>
                </div>

                <h3 className={styles.h3}>Frequently Asked Questions (FAQ)</h3>

                <div className={styles.faq}>
                    <details>
                        <summary>What is a good eDPI for Valorant?</summary>
                        <p>Most professional players sit between <strong>200 and 400 eDPI</strong>. This allows for micro-adjustments while maintaining turn potential.</p>
                    </details>
                    <details>
                        <summary>Does DPI affect latency?</summary>
                        <p>Yes. As explained in our <Link href="/blog/dpi-vs-sensitivity-difference">DPI Guide</Link>, higher DPI (1600+) can reduce standard deviation in input latency by up to 2-3ms.</p>
                    </details>
                    <details>
                        <summary>How do I convert Fortnite sens to Valorant?</summary>
                        <p>Fortnite uses a slider percentage which equals a raw multiplier. Our tool handles this complexity automatically. Select Fortnite as input and Valorant as output.</p>
                    </details>
                    <details>
                        <summary>What is Games Factory Sens?</summary>
                        <p>The "Games Factory" methodology refers to treating your settings like a production line—calibrated, tested, and never changed based on emotion. Read our <Link href="/blog/games-factory-sens-perfect-aim-guide">full guide here</Link>.</p>
                    </details>
                </div>

                <h3 className={styles.h3}>Advanced Concepts: cm/360</h3>
                <p>
                    <strong>Centimeters per 360 (cm/360)</strong> is the only universal language of aim.
                    Low Sensitivity (High cm/360) offers precision (CS2). High Sensitivity (Low cm/360) offers reactivity (Fortnite).
                    Our tool displays this metric in real-time, helping you find your "Perfect Sensitivity Approximation" (PSA).
                </p>
            </article>
        </section>
    );
}
