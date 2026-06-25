"use client";

import { useEffect, useRef } from "react";

type BannerSize =
  | "728x90"   // Leaderboard — desktop topo/fundo
  | "468x60"   // Banner — desktop alternativo
  | "320x50"   // Mobile banner
  | "300x250"  // Medium Rectangle — alto desempenho
  | "160x600"  // Wide Skyscraper — sidebar
  | "160x300"; // Half Page — sidebar compacta

interface BannerConfig {
  key: string;
  width: number;
  height: number;
  src: string;
}

const BANNER_CONFIGS: Record<BannerSize, BannerConfig> = {
  "728x90": {
    key: "fd6d088ab33d8b2ccb719c00a04eb60b",
    width: 728,
    height: 90,
    src: "https://www.highperformanceformat.com/fd6d088ab33d8b2ccb719c00a04eb60b/invoke.js",
  },
  "468x60": {
    key: "dd2fdea8c46df28e59ab2b4fed56244e",
    width: 468,
    height: 60,
    src: "https://www.highperformanceformat.com/dd2fdea8c46df28e59ab2b4fed56244e/invoke.js",
  },
  "320x50": {
    key: "771567c99c7e638fdf6e904642ab265a",
    width: 320,
    height: 50,
    src: "https://www.highperformanceformat.com/771567c99c7e638fdf6e904642ab265a/invoke.js",
  },
  "300x250": {
    key: "3bf01e98c0dd7febb0c7f47e443dc0c6",
    width: 300,
    height: 250,
    src: "https://www.highperformanceformat.com/3bf01e98c0dd7febb0c7f47e443dc0c6/invoke.js",
  },
  "160x600": {
    key: "09576ba2a097b0d337b0719d4d9aeff6",
    width: 160,
    height: 600,
    src: "https://www.highperformanceformat.com/09576ba2a097b0d337b0719d4d9aeff6/invoke.js",
  },
  "160x300": {
    key: "8511ce8b00fb36868de0075c90259382",
    width: 160,
    height: 300,
    src: "https://www.highperformanceformat.com/8511ce8b00fb36868de0075c90259382/invoke.js",
  },
};

interface AdsterraBannerProps {
  size: BannerSize;
  /** Centraliza o banner horizontalmente (padrão: true) */
  centered?: boolean;
  /** Margem vertical em px (padrão: 16) */
  margin?: number;
}

/**
 * Adsterra Banner — componente reutilizável para todos os tamanhos.
 *
 * Uso:
 *   <AdsterraBanner size="728x90" />   ← Desktop leaderboard
 *   <AdsterraBanner size="300x250" />  ← Medium rectangle (entre conteúdo)
 *   <AdsterraBanner size="320x50" />   ← Mobile banner
 *   <AdsterraBanner size="160x600" />  ← Sidebar skyscraper
 */
export default function AdsterraBanner({
  size,
  centered = true,
  margin = 16,
}: AdsterraBannerProps) {
  const config = BANNER_CONFIGS[size];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Inject atOptions inline script
    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '${config.key}',
        'format' : 'iframe',
        'height' : ${config.height},
        'width' : ${config.width},
        'params' : {}
      };
    `;
    wrapper.appendChild(optionsScript);

    // Inject invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src = config.src;
    wrapper.appendChild(invokeScript);
  }, [config]);

  return (
    <div
      style={{
        width: "100%",
        margin: `${margin}px auto`,
        display: "flex",
        justifyContent: centered ? "center" : "flex-start",
        overflow: "hidden",
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          width: config.width,
          height: config.height,
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
