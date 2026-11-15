import type { Metadata } from "next";

// page.tsx is a client component ('use client'), so it can't export its own
// metadata — this layout is what actually gives /pricing a real title and
// description instead of silently inheriting the generic site-wide default
// from the root layout.
export const metadata: Metadata = {
    title: "Pricing — DCPROSENS Premium Plans",
    description: "Unlock the full DCPROSENS toolkit: 7-step PSA sensitivity finder, Aim Lab training modes and the pro compare tool. Monthly, annual and lifetime plans.",
    alternates: {
        canonical: "https://dcprosens.com/pricing/",
    },
    openGraph: {
        // Inherited from the root layout only when this page omits openGraph
        // entirely — declaring the object here replaces the parent's, so the
        // image has to be restated or the page ships with no og:image at all.
        images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: "DCPROSENS — Gaming Sensitivity Converter" }],
        title: "Pricing — DCPROSENS Premium Plans",
        description: "Unlock the full DCPROSENS toolkit: sensitivity converter, PSA finder, pro player database & compare, and the browser extension.",
        type: "website",
        url: "https://dcprosens.com/pricing/",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing — DCPROSENS Premium Plans",
        description: "Unlock the full DCPROSENS toolkit: sensitivity converter, PSA finder, pro player database & compare, and more.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
