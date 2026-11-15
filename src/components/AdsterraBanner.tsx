"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Adsterra.module.css";

/**
 * One Adsterra iframe banner.
 *
 * The tag is NOT inlined into the page. Each format is driven by a global
 * `atOptions` object that its invoke.js reads on load, so two formats in the
 * same document overwrite each other and only the last one renders. Every
 * format therefore lives in its own static document under /adsterra/ and this
 * component frames it — which also keeps the third-party script out of the
 * app's own execution context.
 */

export type AdsterraSize =
    | "728x90"
    | "468x60"
    | "320x50"
    | "300x250"
    | "160x600"
    | "160x300";

const DIMENSIONS: Record<AdsterraSize, { width: number; height: number }> = {
    "728x90": { width: 728, height: 90 },
    "468x60": { width: 468, height: 60 },
    "320x50": { width: 320, height: 50 },
    "300x250": { width: 300, height: 250 },
    "160x600": { width: 160, height: 600 },
    "160x300": { width: 160, height: 300 },
};

export default function AdsterraBanner({
    size,
    className,
    showLabel = true,
}: {
    size: AdsterraSize;
    className?: string;
    showLabel?: boolean;
}) {
    const holderRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const { width, height } = DIMENSIONS[size];

    // Hold the slot open from the first paint but only fetch the ad once it is
    // within a screen of the viewport, so the skyscrapers and the pre-footer
    // rectangle cost nothing on a page the visitor never scrolls.
    useEffect(() => {
        const el = holderRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            const timer = setTimeout(() => setMounted(true), 0);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setMounted(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "400px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={holderRef}
            className={className ? `${styles.slot} ${className}` : styles.slot}
            style={{ width, height: showLabel ? height + 18 : height }}
            aria-hidden="true"
        >
            {showLabel && <span className={styles.label}>Ad</span>}
            {mounted && (
                <iframe
                    className={styles.frame}
                    src={`/adsterra/${size}.html`}
                    width={width}
                    height={height}
                    title={`Advertisement ${size}`}
                    scrolling="no"
                    loading="lazy"
                    // The ad chain needs scripts, its own navigation and popups to
                    // monetise; it must not be able to reach back into this origin,
                    // which `allow-same-origin` being absent enforces.
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-forms"
                />
            )}
        </div>
    );
}
