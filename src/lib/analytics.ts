// Thin wrapper around gtag for custom GA4 events. AnalyticsLoader defers
// loading gtag.js until the user's first interaction, so `window.gtag` may
// not exist yet when this is called. gtag() itself is just
// `function gtag(){dataLayer.push(arguments)}` — pushing the same
// ["event", name, params] shape directly onto dataLayer means gtag.js
// processes it correctly once it finishes loading, same as if gtag() had
// been called directly.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', eventName, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(['event', eventName, params]);
}
