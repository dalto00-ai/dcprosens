import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './EbookSales.module.css';

export const metadata: Metadata = {
    title: "The Precision Aim System Ebook",
    description: "Lock in 1:1 aim translation, calibrate angle geometry, and master pro-level muscle memory. Complete 4-part Technical Aim System for just $9.00 USD.",
    alternates: {
        canonical: "https://dcprosens.com/ebook/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "The Precision Aim System - 1:1 Aim & Pro Muscle Memory | DCPROSENS",
        description: "Complete 4-part Technical Aim System for tactical FPS. Lock in 1:1 aim for just $9.00 USD.",
        url: "https://dcprosens.com/ebook/",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function EbookSalesPage() {
    const checkoutLink = process.env.NEXT_PUBLIC_STRIPE_LINK_EBOOK || "https://buy.stripe.com/14AcN44IV9nQbVEfqA1ck03";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "The Precision Aim System — 4-Part Technical Aim Manifesto",
        "description": "Complete 4-part technical aim system covering sensor calibration, crosshair placement geometry, neuro-muscular conditioning, and zero-friction hardware matrix for competitive FPS players.",
        "image": "https://dcprosens.com/ebook-cover.png",
        "brand": {
            "@type": "Brand",
            "name": "DCPROSENS"
        },
        "offers": {
            "@type": "Offer",
            "price": "9.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": checkoutLink,
            "priceValidUntil": "2027-12-31",
            "seller": {
                "@type": "Organization",
                "name": "DCPROSENS"
            }
        },
        "category": "eBook / Gaming Training Guide",
        "audience": {
            "@type": "Audience",
            "audienceType": "Competitive FPS Gamers"
        }
    };

    return (
        <div className={styles.salesContainer}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* NEW RELEASES NOTICE */}
            <div style={{
                background: 'rgba(0, 255, 157, 0.1)',
                border: '1px solid #00ff9d',
                borderRadius: '8px',
                padding: '0.85rem 1.25rem',
                marginBottom: '2rem',
                textAlign: 'center',
                fontFamily: "'Space Grotesk', sans-serif"
            }}>
                <span style={{ color: '#00ff9d', fontWeight: 800 }}>⚡ NEW 2026 FIELD GUIDES AVAILABLE: </span>
                <span style={{ color: '#fff' }}>Looking for our individual specialized editions (Input Lag, Aim Warm-Up, Pad Friction, Controller)? </span>
                <Link href="/ebooks/" style={{ color: '#00e5ff', fontWeight: 700, textDecoration: 'underline', marginLeft: '6px' }}>
                    Explore All 6 Volumes &amp; Master Bundle ➔
                </Link>
            </div>

            {/* HERO / VSL HEADLINE */}
            <div className={styles.heroSection}>
                <span className={styles.promoBadge}>
                    ⚡ Limited Time Promotion - 80% Off
                </span>
                <h1 className={styles.headline}>
                    Lock In 1:1 Aim Translation, Deconstruct Angle Geometry & Achieve <span className="text-gradient">Elite Pro Muscle Memory</span>
                </h1>
                <p className={styles.subheadline}>
                    Stop guessing your sensitivity and fighting physical tension. Master the scientific calibration, biomechanics, and daily cognitive routines utilized by Tier-1 champions to dominate tactical shooters.
                </p>
            </div>

            {/* 3D SHOWCASE VALUE STACK */}
            <div className={styles.stackShowcase}>
                <div className={styles.visualWrapper}>
                    <div className={styles.stack3D}>
                        <Image 
                            src="/ebook-cover.png" 
                            alt="The Precision Aim System Cover Showcase" 
                            width={320} 
                            height={400}
                            className={styles.salesCoverImg}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.pitchDetails}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                        The Ultimate Technical Aim Package
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        This unified system bundles <strong>4 distinct technical aim manifestos</strong> into a single comprehensive training curriculum. You will receive immediate access to the digital blueprints, printable logs, and posture checksheets.
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <span className={styles.priceAnchor}>Regular Price: $49.00 USD</span>
                        <span className={styles.activePrice}>$9.00 USD</span>
                        <span className={styles.priceSub}>One-time payment • Instant download • Secure encrypted checkout</span>
                    </div>

                    <a 
                        href={checkoutLink} 
                        className={styles.salesCTA}
                    >
                        Unleash Elite Precision ($9) ⚡
                    </a>

                    <p className={styles.scarcityText}>
                        *Instant PDF download available globally immediately after checkout. 7-Day money-back guarantee included.
                    </p>
                </div>
            </div>

            {/* THE 4 SYSTEMS VALUE STACK DETAILS */}
            <div>
                <h2 className={styles.valueTitle}>
                    What You Will Master Inside This 4-Part System:
                </h2>

                <div className={styles.gridSystems}>
                    {/* System 1 */}
                    <div className={styles.systemCard}>
                        <span className={styles.systemIcon}>📐</span>
                        <span className={styles.systemNumber}>Part 1</span>
                        <h3 className={styles.systemTitle}>The Architect of Precision</h3>
                        <p className={styles.systemDesc}>
                            Master game engine yaw mathematics, 0% Monitor Distance focal length matching for sniper scopes, and resolve hardware DPI deviation.
                        </p>
                    </div>

                    {/* System 2 */}
                    <div className={styles.systemCard}>
                        <span className={styles.systemIcon}>🎯</span>
                        <span className={styles.systemNumber}>Part 2</span>
                        <h3 className={styles.systemTitle}>Perfect Crosshair Placement</h3>
                        <p className={styles.systemDesc}>
                            Deconstruct map angle geometry, slice corners with minimal mouse displacement, and pre-aim head height on 3D geometry.
                        </p>
                    </div>

                    {/* System 3 */}
                    <div className={styles.systemCard}>
                        <span className={styles.systemIcon}>🧠</span>
                        <span className={styles.systemNumber}>Part 3</span>
                        <h3 className={styles.systemTitle}>Neuro-Muscular Aim Conditioning</h3>
                        <p className={styles.systemDesc}>
                            Scientific routines to isolate arm vs. wrist movement, eliminate physical grip tension, and build fast twitch muscle memory.
                        </p>
                    </div>

                    {/* System 4 */}
                    <div className={styles.systemCard}>
                        <span className={styles.systemIcon}>⚙️</span>
                        <span className={styles.systemNumber}>Part 4</span>
                        <h3 className={styles.systemTitle}>Zero-Friction Hardware Matrix</h3>
                        <p className={styles.systemDesc}>
                            Optimize mousepad static vs dynamic friction, select PTFE/glass skates, and set up your desk posture for maximum arm sweep range.
                        </p>
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div style={{ marginTop: '5rem' }}>
                <span className={styles.promoBadge} style={{ display: 'table', margin: '0 auto' }}>
                    Player Results
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginTop: '1rem', color: 'var(--text-primary)' }}>
                    Dominating the Rank Ladders
                </h2>

                <div className={styles.testimonialGrid}>
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>
                            &ldquo;My Operator flicks used to feel completely disconnected from my rifle spray. After applying the 0% Monitor Distance formulas in Part 2, my sniper scoped aim matches my hipfire perfectly. I went from Diamond 2 to Immortal in less than a month.&rdquo;
                        </p>
                        <span className={styles.testimonialAuthor}>Marcus &ldquo;Viper&rdquo; T.</span>
                        <span className={styles.testimonialMeta}>Valorant Rank: Immortal 2</span>
                    </div>

                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>
                            &ldquo;I spent $150 on a gaming mouse but kept missing easy sprays. The Zero-Friction guidelines in Part 4 showed me how to align my posture and replace stock skates. The difference is night and day&mdash;my micro-adjustments feel like they glided on ice.&rdquo;
                        </p>
                        <span className={styles.testimonialAuthor}>Alexandre &ldquo;X-Factor&rdquo; S.</span>
                        <span className={styles.testimonialMeta}>CS2 Faceit Level 10</span>
                    </div>
                </div>
            </div>

            {/* 100% RISK FREE GUARANTEE */}
            <div className={styles.guaranteeBox}>
                <div className={styles.guaranteeBadge}>🛡️</div>
                <div>
                    <h3 className={styles.guaranteeTitle}>7-Day Risk-Free 100% Money-Back Guarantee</h3>
                    <p className={styles.guaranteeText}>
                        We are so confident in the Precision Aim System that if you do not feel a measurable improvement in your micro-flick accuracy and muscle relaxation within 7 days, simply drop us a line at support@dcprosens.com and we will issue a full, prompt refund. Zero questions asked.
                    </p>
                </div>
            </div>

            {/* FINAL CTA BOX */}
            <div className={styles.finalCTABox}>
                <h2 className={styles.finalTitle}>Unlock the Perfect Crosshair Response</h2>
                <p className={styles.finalDesc}>
                    Stop struggling with daily aim inconsistency. Lock in the complete 4-part Technical Aim System today and rebuild your muscle memory on perfect mathematical foundations.
                </p>
                <a 
                    href={checkoutLink} 
                    className={styles.salesCTA}
                >
                    Get the 4-Part System for $9 ⚡
                </a>
                <p className={styles.scarcityText} style={{ marginTop: '1.25rem' }}>
                    *Instant global access. Secured with 256-bit SSL encryption.
                </p>
            </div>
        </div>
    );
}
