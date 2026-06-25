"use client";

import { useEffect, useRef } from "react";

/**
 * Adsterra Native Banner
 * Alto RPM — usar em posições de destaque entre seções de conteúdo.
 * Script ID: 22fbfc0d329775fb328afde575e28a12
 */
export default function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const container = containerRef.current;
    if (!container) return;

    // Inject the invoke script once
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src =
      "https://pl29886188.effectivecpmnetwork.com/22fbfc0d329775fb328afde575e28a12/invoke.js";
    container.appendChild(script);
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
      <div
        id="container-22fbfc0d329775fb328afde575e28a12"
        ref={containerRef}
        style={{ width: "100%" }}
      />
    </div>
  );
}
