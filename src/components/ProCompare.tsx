"use client";

import { useState, useMemo } from "react";
import { pros } from "@/lib/pros";
import { mouseDatabase } from "@/lib/mouseDatabase";
import styles from "./ProCompare.module.css";

// Affiliate links for common gear items (replicated and extended from setups)
const affiliateLinks: Record<string, string> = {
    'Logitech G Pro X Superlight 2':
        'https://www.amazon.com/Logitech-Superlight-Wireless-Pro-Grade-Programmable/dp/B09NBWL8J5?tag=dcoutlier-20',
    'Logitech G Pro X Superlight':
        'https://www.amazon.com/dp/B09B388RT4?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'Logitech G PRO X':
        'https://www.amazon.com/s?k=Logitech+Mechanical+Gaming+Keyboard+Switches&crid=2GZ29Q6IE9CHR&sprefix=logitech+mechanical+gaming+keyboard+switches%2Caps%2C244&linkCode=ll2&tag=dcoutlier-20&linkId=88246b09b7823a04708ca6f9cf21cf8a&language=en_US&ref_=as_li_ss_tl',
    'Logitech G PRO X 2':
        'https://www.amazon.com/dp/B0G3V45SV1?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'BenQ ZOWIE XL2546K':
        'https://www.amazon.com/s?k=BenQ+ZOWIE+XL2546K+Esports+Monitor&crid=14IQGX297M72S&sprefix=benq+zowie+xl2546k+esports+monitor%2Caps%2C232&linkCode=ll2&tag=dcoutlier-20&linkId=1d7ce9eb3fd32ec3317d7855f1aed662&language=en_US&ref_=as_li_ss_tl',
    'ASUS ROG Swift PG259QN':
        'https://www.amazon.com/s?k=ASUS+ROG+PG259QN+1ms+Monitor&crid=JOHIIDYFD3YG&sprefix=asus+rog+pg259qn+1ms+monitor%2Caps%2C276&linkCode=ll2&tag=dcoutlier-20&linkId=06f4282a39e0bb4696f3ee476335197a&language=en_US&ref_=as_li_ss_tl',
    'Razer BlackShark V2 Pro':
        'https://www.amazon.com/s?k=Razer+BlackShark+V2+Pro+Wireless&crid=16KL6B5Y880G1&sprefix=razer+blackshark+v2+pro+wireless%2Caps%2C292&linkCode=ll2&tag=dcoutlier-20&linkId=0f7d6ab4f22e3dd2a7976e81e61b1bba&language=en_US&ref_=as_li_ss_tl',
    'Razer BlackWidow V4 Pro':
        'https://www.amazon.com/dp/B0FCTPBDP3?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'Zowie EC2-GW':
        'https://www.amazon.com/s?k=BenQ+ZOWIE+EC2+GW+Professional+Gaming&crid=2RR2PZRP1ZFKV&sprefix=benq+zowie+ec2+gw+professional+gaming%2Caps%2C252&linkCode=ll2&tag=dcoutlier-20&linkId=f94b6090d4c2fedf1437023c45c0cb52&language=en_US&ref_=as_li_ss_tl',
    'Artisan Zero FX M':
        'https://www.amazon.com/s?k=Artisan+Japan+Gaming+Mousepad+FX+ZERO&crid=1UMUG3RKJRBIF&sprefix=artisan+japan+gaming+mousepad+fx+zero%2Caps%2C248&linkCode=ll2&tag=dcoutlier-20&linkId=092b7bc0b3956de46a8f81f93136aa21&language=en_US&ref_=as_li_ss_tl',
    'Artisan Zero FX L':
        'https://www.amazon.com/s?k=Artisan+Japan+Gaming+Mousepad+FX+ZERO&crid=1UMUG3RKJRBIF&sprefix=artisan+japan+gaming+mousepad+fx+zero%2Caps%2C248&linkCode=ll2&tag=dcoutlier-20&linkId=092b7bc0b3956de46a8f81f93136aa21&language=en_US&ref_=as_li_ss_tl',
    'Logitech G640':
        'https://www.amazon.com/dp/B0BHMKVF1P?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'Logitech G840':
        'https://www.amazon.com/dp/B0BHMN52LY?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'Wooting 60HE':
        'https://www.amazon.com/s?k=Wooting+60HE+Keyboard&crid=210PUMYONV20O&sprefix=wooting+60he+keyboard%2Caps%2C297&linkCode=ll2&tag=dcoutlier-20&linkId=fb192abdc39d6ef2b2cfc7dfa45b88a2&language=en_US&ref_=as_li_ss_tl',
    'HyperX Cloud Alpha':
        'https://www.amazon.com/s?k=HyperX+Cloud+Alpha+Pro+Gaming&crid=1FC1RPWE92SSZ&sprefix=hyperx+cloud+alpha+pro+gaming%2Caps%2C274&linkCode=ll2&tag=dcoutlier-20&linkId=72ce571b3a47253cf8cbf4e4cfeaee4a&language=en_US&ref_=as_li_ss_tl',
    'SteelSeries Arctis Pro':
        'https://www.amazon.com/s?k=SteelSeries+Arctis+Pro+Gaming+Headset&crid=QS9K26EOAGSX&sprefix=steelseries+arctis+pro+gaming+headset%2Caps%2C284&linkCode=ll2&tag=dcoutlier-20&linkId=53450b939f38005694e11d1a2a6a15ef&language=en_US&ref_=as_li_ss_tl',
    'Pulsar Xlite V3':
        'https://www.amazon.com/dp/B0FVV7HYCP?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
    'Alienware AW2521H':
        'https://www.amazon.com/dp/B08XWKCC68?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl',
};

function getAffiliateLink(item: string): string {
    if (!item) return "";
    // Exact match first
    if (affiliateLinks[item]) return affiliateLinks[item];
    // Partial match
    for (const key of Object.keys(affiliateLinks)) {
        if (item.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(item.toLowerCase())) {
            return affiliateLinks[key];
        }
    }
    // Fallback: Amazon search
    return `https://www.amazon.com/s?k=${encodeURIComponent(item)}&tag=dcoutlier-20`;
}

function getMouseWeight(mouse: string): number | null {
    if (!mouse) return null;
    const mouseLower = mouse.toLowerCase();
    for (const m of mouseDatabase) {
        if (mouseLower.includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(mouseLower)) {
            return m.weight;
        }
    }
    // Custom fallbacks
    if (mouseLower.includes("superlight 2")) return 60;
    if (mouseLower.includes("superlight")) return 63;
    if (mouseLower.includes("atlantis")) return 55;
    if (mouseLower.includes("hts+")) return 49;
    if (mouseLower.includes("xlite")) return 55;
    if (mouseLower.includes("ec2")) return 73;
    if (mouseLower.includes("deathadder")) return 63;
    if (mouseLower.includes("viper v3")) return 54;
    return null;
}

export default function ProCompare() {
    // Select Player A and Player B (pre-populate with the first two)
    const [playerASlug, setPlayerASlug] = useState<string>(pros[0]?.slug || "tenz");
    const [playerBSlug, setPlayerBSlug] = useState<string>(pros[1]?.slug || "aspas");

    const playerA = useMemo(() => pros.find((p) => p.slug === playerASlug) || pros[0], [playerASlug]);
    const playerB = useMemo(() => pros.find((p) => p.slug === playerBSlug) || pros[1], [playerBSlug]);

    const playerAMouseWeight = useMemo(() => getMouseWeight(playerA.mouse), [playerA]);
    const playerBMouseWeight = useMemo(() => getMouseWeight(playerB.mouse), [playerB]);

    // Difference Highlights
    const differences = useMemo(() => {
        const list: { title: string; desc: string; type: "sens" | "weight" | "hz" | "general" }[] = [];

        // 1. Sensitivity / cm360 comparison (physical mousepad movement)
        if (playerA.cm360 && playerB.cm360) {
            const diffPct = Math.round((Math.abs(playerA.cm360 - playerB.cm360) / Math.min(playerA.cm360, playerB.cm360)) * 100);
            if (diffPct > 5) {
                const slower = playerA.cm360 > playerB.cm360 ? playerA : playerB;
                const faster = playerA.cm360 < playerB.cm360 ? playerA : playerB;
                list.push({
                    title: "Physical Sensitivity Difference",
                    desc: `${slower.name} uses a slower physical sensitivity (${slower.cm360} cm/360°) which requires ${diffPct}% more mouse pad space to complete a full turn compared to ${faster.name} (${faster.cm360} cm/360°).`,
                    type: "sens",
                });
            } else {
                list.push({
                    title: "Physical Sensitivity Match",
                    desc: `${playerA.name} and ${playerB.name} have nearly identical physical sensitivities, requiring around ${playerA.cm360} cm for a 360° turn.`,
                    type: "sens",
                });
            }
        }

        // 2. Mouse weight comparison
        if (playerAMouseWeight && playerBMouseWeight) {
            const weightDiff = Math.abs(playerAMouseWeight - playerBMouseWeight);
            if (weightDiff > 2) {
                const lighter = playerAMouseWeight < playerBMouseWeight ? playerA : playerB;
                const heavier = playerAMouseWeight > playerBMouseWeight ? playerA : playerB;
                const lighterW = Math.min(playerAMouseWeight, playerBMouseWeight);
                const heavierW = Math.max(playerAMouseWeight, playerBMouseWeight);
                list.push({
                    title: "Mouse Weight Preference",
                    desc: `${lighter.name} uses a lighter mouse (${lighter.mouse} at ${lighterW}g), which is ${weightDiff}g lighter than ${heavier.name}'s setup (${heavier.mouse} at ${heavierW}g).`,
                    type: "weight",
                });
            } else {
                list.push({
                    title: "Mouse Weight Match",
                    desc: `Both players prefer ultra-lightweight mice around ${playerAMouseWeight}g for quick target tracking and low friction.`,
                    type: "weight",
                });
            }
        }

        // 3. Monitor Refresh Rate
        if (playerA.monitorHz && playerB.monitorHz) {
            if (playerA.monitorHz !== playerB.monitorHz) {
                const higher = playerA.monitorHz > playerB.monitorHz ? playerA : playerB;
                const lower = playerA.monitorHz < playerB.monitorHz ? playerA : playerB;
                list.push({
                    title: "Monitor Refresh Rate",
                    desc: `${higher.name} plays at a higher refresh rate of ${higher.monitorHz}Hz compared to ${lower.name}'s ${lower.monitorHz}Hz monitor.`,
                    type: "hz",
                });
            } else {
                list.push({
                    title: "Monitor Performance Match",
                    desc: `Both players run top-tier esports monitors at ${playerA.monitorHz}Hz for ultimate motion clarity.`,
                    type: "hz",
                });
            }
        }

        // 4. Game matching
        if (playerA.gameId !== playerB.gameId) {
            list.push({
                title: "Active Game & Environment",
                desc: `${playerA.name} competes primarily in ${playerA.game} (${playerA.role}), while ${playerB.name} competes in ${playerB.game} (${playerB.role}). Game scaling formulas differ between these titles.`,
                type: "general",
            });
        }

        return list;
    }, [playerA, playerB, playerAMouseWeight, playerBMouseWeight]);

    return (
        <div className={styles.compareContainer}>
            {/* Dropdown selectors */}
            <div className={styles.selectorsCard}>
                <div className={styles.selectorWrapper}>
                    <label htmlFor="playerA-select" className={styles.label}>Player A</label>
                    <select
                        id="playerA-select"
                        className={styles.select}
                        value={playerASlug}
                        onChange={(e) => setPlayerASlug(e.target.value)}
                    >
                        {pros.map((p) => (
                            <option key={`a-${p.slug}`} value={p.slug}>
                                {p.name} ({p.game})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.versusDivider}>VS</div>

                <div className={styles.selectorWrapper}>
                    <label htmlFor="playerB-select" className={styles.label}>Player B</label>
                    <select
                        id="playerB-select"
                        className={styles.select}
                        value={playerBSlug}
                        onChange={(e) => setPlayerBSlug(e.target.value)}
                    >
                        {pros.map((p) => (
                            <option key={`b-${p.slug}`} value={p.slug}>
                                {p.name} ({p.game})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Cards Row */}
            <div className={styles.quickCardsRow}>
                {/* Player A Quick Card */}
                <div className={`${styles.quickCard} ${styles.playerACard}`}>
                    <div className={styles.flagAndName}>
                        <span className={styles.bigFlag}>{playerA.countryFlag}</span>
                        <div>
                            <h3 className={styles.playerName}>{playerA.name}</h3>
                            <p className={styles.playerSub}>{playerA.realName} • {playerA.team}</p>
                        </div>
                    </div>
                    <div className={styles.primaryStatBox}>
                        <div className={styles.primaryStat}>
                            <span className={styles.statLabel}>eDPI</span>
                            <span className={styles.statVal}>{playerA.edpi}</span>
                        </div>
                        <div className={styles.primaryStat}>
                            <span className={styles.statLabel}>cm/360</span>
                            <span className={styles.statVal}>{playerA.cm360} cm</span>
                        </div>
                    </div>
                </div>

                {/* Player B Quick Card */}
                <div className={`${styles.quickCard} ${styles.playerBCard}`}>
                    <div className={styles.flagAndName}>
                        <span className={styles.bigFlag}>{playerB.countryFlag}</span>
                        <div>
                            <h3 className={styles.playerName}>{playerB.name}</h3>
                            <p className={styles.playerSub}>{playerB.realName} • {playerB.team}</p>
                        </div>
                    </div>
                    <div className={styles.primaryStatBox}>
                        <div className={styles.primaryStat}>
                            <span className={styles.statLabel}>eDPI</span>
                            <span className={styles.statVal}>{playerB.edpi}</span>
                        </div>
                        <div className={styles.primaryStat}>
                            <span className={styles.statLabel}>cm/360</span>
                            <span className={styles.statVal}>{playerB.cm360} cm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Comparison Grid */}
            <div className={styles.comparisonTable}>
                {/* Headers */}
                <div className={styles.tableHeader}>
                    <div className={styles.colLeft}>{playerA.name}</div>
                    <div className={styles.colCenter}>Category</div>
                    <div className={styles.colRight}>{playerB.name}</div>
                </div>

                {/* Rows */}
                {[
                    { label: "Game", valA: playerA.game, valB: playerB.game, highlight: playerA.game !== playerB.game },
                    { label: "Team", valA: playerA.team, valB: playerB.team, highlight: playerA.team !== playerB.team },
                    { label: "Role", valA: playerA.role, valB: playerB.role, highlight: playerA.role !== playerB.role },
                    { label: "Mouse DPI", valA: `${playerA.dpi} DPI`, valB: `${playerB.dpi} DPI`, highlight: playerA.dpi !== playerB.dpi },
                    { label: "Sensitivity", valA: playerA.sens, valB: playerB.sens, highlight: playerA.sens !== playerB.sens },
                    { label: "eDPI", valA: playerA.edpi, valB: playerB.edpi, highlight: playerA.edpi !== playerB.edpi },
                    { label: "cm/360", valA: `${playerA.cm360} cm`, valB: `${playerB.cm360} cm`, highlight: playerA.cm360 !== playerB.cm360 },
                    {
                        label: "Mouse",
                        valA: playerA.mouse,
                        valB: playerB.mouse,
                        linkA: getAffiliateLink(playerA.mouse),
                        linkB: getAffiliateLink(playerB.mouse),
                        extraA: playerAMouseWeight ? `${playerAMouseWeight}g` : undefined,
                        extraB: playerBMouseWeight ? `${playerBMouseWeight}g` : undefined,
                        highlight: playerA.mouse !== playerB.mouse
                    },
                    {
                        label: "Keyboard",
                        valA: playerA.keyboard,
                        valB: playerB.keyboard,
                        linkA: getAffiliateLink(playerA.keyboard),
                        linkB: getAffiliateLink(playerB.keyboard),
                        highlight: playerA.keyboard !== playerB.keyboard
                    },
                    {
                        label: "Headset",
                        valA: playerA.headset,
                        valB: playerB.headset,
                        linkA: getAffiliateLink(playerA.headset),
                        linkB: getAffiliateLink(playerB.headset),
                        highlight: playerA.headset !== playerB.headset
                    },
                    {
                        label: "Monitor",
                        valA: `${playerA.monitor} (${playerA.monitorHz}Hz)`,
                        valB: `${playerB.monitor} (${playerB.monitorHz}Hz)`,
                        linkA: getAffiliateLink(playerA.monitor),
                        linkB: getAffiliateLink(playerB.monitor),
                        highlight: playerA.monitorHz !== playerB.monitorHz || playerA.monitor !== playerB.monitor
                    },
                    {
                        label: "Mousepad",
                        valA: playerA.mousepad,
                        valB: playerB.mousepad,
                        linkA: getAffiliateLink(playerA.mousepad),
                        linkB: getAffiliateLink(playerB.mousepad),
                        highlight: playerA.mousepad !== playerB.mousepad
                    }
                ].map((row, index) => {
                    return (
                        <div
                            key={`row-${index}`}
                            className={`${styles.tableRow} ${row.highlight ? styles.rowHighlight : ""}`}
                        >
                            {/* Player A Value */}
                            <div className={styles.colLeft}>
                                {row.linkA ? (
                                    <div className={styles.gearLinkWrapper}>
                                        <a href={row.linkA} target="_blank" rel="noopener noreferrer sponsored" className={styles.gearLink}>
                                            {row.valA} <span className={styles.linkIcon}>↗</span>
                                        </a>
                                        {row.extraA && <span className={styles.extraTag}>{row.extraA}</span>}
                                    </div>
                                ) : (
                                    <span className={styles.textValue}>{row.valA}</span>
                                )}
                            </div>

                            {/* Label */}
                            <div className={styles.colCenter}>{row.label}</div>

                            {/* Player B Value */}
                            <div className={styles.colRight}>
                                {row.linkB ? (
                                    <div className={styles.gearLinkWrapper}>
                                        <a href={row.linkB} target="_blank" rel="noopener noreferrer sponsored" className={styles.gearLink}>
                                            {row.valB} <span className={styles.linkIcon}>↗</span>
                                        </a>
                                        {row.extraB && <span className={styles.extraTag}>{row.extraB}</span>}
                                    </div>
                                ) : (
                                    <span className={styles.textValue}>{row.valB}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Analysis & Highlights */}
            <div className={styles.analysisCard}>
                <h4 className={styles.analysisTitle}>
                    <span className={styles.analysisIcon}>📊</span> Comparison Insights
                </h4>
                <div className={styles.diffList}>
                    {differences.map((diff, index) => (
                        <div key={`diff-${index}`} className={`${styles.diffItem} ${styles[diff.type]}`}>
                            <div className={styles.diffHeader}>
                                <span className={styles.diffBullet} />
                                <strong>{diff.title}</strong>
                            </div>
                            <p className={styles.diffDesc}>{diff.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ebook Promotion Card */}
            <div className={styles.ebookCard}>
                <span className={styles.promoBadge}>💡 Master Your Sensitivity</span>
                <h3 className={styles.promoTitle}>Want to play with the consistency of these pros?</h3>
                <p className={styles.promoDesc}>
                    Unlock all 20+ premium tools including the PSA Method, custom aim routines, crosshair generator, and advanced pro analytics.
                </p>
                <a
                    href="/pricing/"
                    className={styles.promoBtn}
                >
                    View Premium Plans →
                </a>
            </div>
        </div>
    );
}
