import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking attacks
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Ensure proper origin isolation with COOP
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  // Force HTTPS for 2 years (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Restrict browser APIs (camera, mic, geolocation)
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), payment=(), usb=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: GTM + Adsterra (popunder, social bar, native, banners)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
        " https://www.googletagmanager.com" +
        " https://www.google-analytics.com" +
        // Adsterra — popunder & social bar
        " https://pl29886187.effectivecpmnetwork.com" +
        " https://pl29886188.effectivecpmnetwork.com" +
        " https://pl29886189.effectivecpmnetwork.com" +
        " https://*.effectivecpmnetwork.com" +
        // Adsterra — banners (highperformanceformat)
        " https://www.highperformanceformat.com" +
        " https://*.highperformanceformat.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      // Connect: GTM + Adsterra endpoints
      "connect-src 'self'" +
        " https://www.google-analytics.com" +
        " https://analytics.google.com" +
        " https://*.effectivecpmnetwork.com" +
        " https://*.highperformanceformat.com",
      // Frames: Adsterra banners are iframes
      "frame-src 'self'" +
        " https://www.googletagmanager.com" +
        " https://*.effectivecpmnetwork.com" +
        " https://*.highperformanceformat.com" +
        " https://*.adsterra.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Prevent cross-site scripting via DNS prefetch
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // /polling-rate was linked in the navbar and sitemap but the page was
      // never built; send visitors and indexed links to the equivalent guide.
      {
        source: "/polling-rate",
        destination: "/blog/polling-rate-explained-1000hz-vs-4000hz-vs-8000hz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
