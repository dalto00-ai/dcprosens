"use client";

import { useEffect } from "react";

export default function AnalyticsLoader() {
  useEffect(() => {
    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Clean up event listeners immediately to prevent multiple executions
      window.removeEventListener("scroll", loadAnalytics);
      window.removeEventListener("click", loadAnalytics);
      window.removeEventListener("mousemove", loadAnalytics);
      window.removeEventListener("keydown", loadAnalytics);
      window.removeEventListener("touchstart", loadAnalytics);

      // 1. Google Tag Manager Inline Script & DataLayer Initialization
      const gtmInline = document.createElement("script");
      gtmInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-Y4EJZ062FD');
      `;
      document.head.appendChild(gtmInline);

      // 2. Google Tag Manager Library
      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PLJ3LS29";
      document.head.appendChild(gtmScript);

      // 3. Adsterra Popunder
      const popunderScript = document.createElement("script");
      popunderScript.src = "https://pl29886187.effectivecpmnetwork.com/e4/ea/93/e4ea9365381f766d70b3de5d606bf578.js";
      document.head.appendChild(popunderScript);

      // 4. Adsterra Social Bar
      const socialBarScript = document.createElement("script");
      socialBarScript.src = "https://pl29886189.effectivecpmnetwork.com/a6/25/75/a6257530db11b0e78ee3cdddec3edaf6.js";
      document.head.appendChild(socialBarScript);
    };

    // Listen to user interaction events (passive where possible for better scroll performance)
    window.addEventListener("scroll", loadAnalytics, { passive: true });
    window.addEventListener("click", loadAnalytics, { passive: true });
    window.addEventListener("mousemove", loadAnalytics, { passive: true });
    window.addEventListener("keydown", loadAnalytics, { passive: true });
    window.addEventListener("touchstart", loadAnalytics, { passive: true });

    // Fallback: load after 3.5 seconds if the user is completely idle
    const timeoutId = setTimeout(loadAnalytics, 3500);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", loadAnalytics);
      window.removeEventListener("click", loadAnalytics);
      window.removeEventListener("mousemove", loadAnalytics);
      window.removeEventListener("keydown", loadAnalytics);
      window.removeEventListener("touchstart", loadAnalytics);
    };
  }, []);

  return null;
}
