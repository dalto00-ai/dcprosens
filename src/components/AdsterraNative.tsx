"use client";

import { useEffect } from "react";
import styles from "./Adsterra.module.css";

/**
 * Adsterra "native banner". Unlike the fixed-size banners this one is keyed by
 * the id of its container div rather than by the global `atOptions`, so it can
 * safely run inline in the page and stretch to the container width — which is
 * the point of the format. The flip side is that the id is unique per unit:
 * only one of these may exist per document.
 */
const CONTAINER_ID = "container-22fbfc0d329775fb328afde575e28a12";
const INVOKE_SRC =
    "https://pl29886188.profitableratecpmnetwork.com/22fbfc0d329775fb328afde575e28a12/invoke.js";

export default function AdsterraNative() {
    useEffect(() => {
        // Client-side navigation remounts this component on every route change,
        // but the loader only ever needs to run once per document.
        if (document.querySelector(`script[data-adsterra-native]`)) return;

        const script = document.createElement("script");
        script.src = INVOKE_SRC;
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.setAttribute("data-adsterra-native", "true");
        document.body.appendChild(script);
    }, []);

    return (
        <div aria-hidden="true">
            <span className={styles.label}>Sponsored</span>
            <div id={CONTAINER_ID} className={styles.native} />
        </div>
    );
}
