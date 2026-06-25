"use client";

import { useEffect, useRef } from "react";

const CONTAINER_ID = "container-22fbfc0d329775fb328afde575e28a12";
const SCRIPT_SRC =
  "https://pl29886188.effectivecpmnetwork.com/22fbfc0d329775fb328afde575e28a12/invoke.js";

export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const container = containerRef.current;
    if (!container) return;

    // Script must be a sibling inserted AFTER the container div,
    // not a child — Adsterra locates the container by ID from outside.
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = SCRIPT_SRC;

    const parent = container.parentElement;
    if (parent) {
      parent.insertBefore(script, container.nextSibling);
    } else {
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "24px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div id={CONTAINER_ID} ref={containerRef} style={{ width: "100%" }} />
    </div>
  );
}
