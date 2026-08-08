import type { Metadata } from "next";

// page.tsx is a client component ('use client'), so it can't export its own
// metadata — this layout is what actually gives /pricing a real title and
// description instead of silently inheriting the generic site-wide default
// from the root layout.
export const metadata: Metadata = {
    title: "Pricing — DCPROSENS Premium Plans",
    description: "Unlock the full DCPROSENS toolkit: universal sensitivity converter, 7-step PSA sensitivity finder, pro player database & compare, and the browser extension. Monthly, semi-annual and annual plans.",
    alternates: {
        canonical: "https://dcprosens.com/pricing",
    },
    openGraph: {
        title: "Pricing — DCPROSENS Premium Plans",
        description: "Unlock the full DCPROSENS toolkit: sensitivity converter, PSA finder, pro player database & compare, and the browser extension.",
        type: "website",
        url: "https://dcprosens.com/pricing",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing — DCPROSENS Premium Plans",
        description: "Unlock the full DCPROSENS toolkit: sensitivity converter, PSA finder, pro player database & compare, and more.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
