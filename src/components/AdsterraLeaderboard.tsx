"use client";

import { useEffect, useState } from "react";
import AdsterraBanner, { type AdsterraSize } from "./AdsterraBanner";
import styles from "./Adsterra.module.css";

/**
 * The banner under the navbar on every page. Three fixed Adsterra formats are
 * available for this position, so the widest one that fits is chosen client
 * side — a 728x90 would overflow a phone and a 320x50 wastes a desktop.
 *
 * Nothing is rendered on the server: the choice depends on the viewport, and
 * guessing it would either hydrate wrong or lock every visitor to one size.
 * The wrapper still reserves the tallest possible height so the page does not
 * jump when the banner appears.
 */
function pickSize(width: number): AdsterraSize {
    if (width >= 992) return "728x90";
    if (width >= 520) return "468x60";
    return "320x50";
}

export default function AdsterraLeaderboard() {
    const [size, setSize] = useState<AdsterraSize | null>(null);

    useEffect(() => {
        // setSize with an unchanged string is a no-op in React, so the banner is
        // only ever remounted when a resize actually crosses a breakpoint.
        const sync = () => setSize(pickSize(window.innerWidth));
        sync();
        window.addEventListener("resize", sync);
        return () => window.removeEventListener("resize", sync);
    }, []);

    return (
        <div className={styles.topRail} style={{ minHeight: 108 }}>
            {size && <AdsterraBanner key={size} size={size} />}
        </div>
    );
}
