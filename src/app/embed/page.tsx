import type { Metadata } from "next";
import { Suspense } from "react";
import EmbedWidget from "@/components/EmbedWidget";

export const metadata: Metadata = {
    title: "Sensitivity Widget",
    description: "Embeddable sensitivity widget powered by DCPROSENS.",
    robots: { index: false, follow: false },
    alternates: { canonical: "https://dcprosens.com/embed/" },
};

export default function EmbedPage() {
    return (
        <Suspense fallback={null}>
            <EmbedWidget />
        </Suspense>
    );
}
