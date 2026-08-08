"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

// The /embed widget is designed to be dropped into a streamer's page via
// <iframe>, so it must never carry the full site chrome (nav, footer, ads) —
// only the bare widget content.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isEmbed = pathname?.startsWith("/embed");

    if (isEmbed) {
        return <>{children}</>;
    }

    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
            <BottomNav />
        </div>
    );
}
