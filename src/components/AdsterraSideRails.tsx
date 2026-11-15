"use client";

import AdsterraBanner from "./AdsterraBanner";
import styles from "./Adsterra.module.css";

/**
 * The two skyscraper formats, parked in the empty margin either side of the
 * 1200px content column. CSS hides them entirely below 1500px — the width at
 * which a 160px rail plus its gutter stops overlapping the container — and the
 * lazy mount inside AdsterraBanner means no request is made while they are
 * display:none and therefore never intersecting.
 */
export default function AdsterraSideRails() {
    return (
        <>
            <div className={`${styles.rail} ${styles.railLeft}`}>
                <AdsterraBanner size="160x600" />
            </div>
            <div className={`${styles.rail} ${styles.railRight}`}>
                <AdsterraBanner size="160x300" />
            </div>
        </>
    );
}
