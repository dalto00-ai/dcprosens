"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PartnerBanner from "@/components/PartnerBanner";
import AdsKeeperWidget from "@/components/AdsKeeperWidget";

// The /embed widget is designed to be dropped into a streamer's page via
// <iframe>, so it must never carry the full site chrome (nav, footer) —
// only the bare widget content.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isEmbed = pathname?.startsWith("/embed");

    if (isEmbed) {
        return <>{children}</>;
    }

    return (
        <div className="app-wrapper">
            {/* First focusable element on the page: lets keyboard and screen-reader
                users jump straight to the content instead of tabbing through the
                whole nav on every one of the 400+ pages. Hidden until focused. */}
            <a href="#main-content" className="skip-to-content">
                Skip to content
            </a>
            <Navbar />
            <PartnerBanner slot="leaderboard" />
            <main className="main-content" id="main-content" tabIndex={-1}>
                {children}
            </main>
            <div style={{ maxWidth: "1200px", margin: "1.5rem auto", padding: "0 1rem", width: "100%" }}>
                <AdsKeeperWidget widgetId="2122080" style={{ marginBottom: "1rem" }} />
                <AdsKeeperWidget widgetId="2122067" />
            </div>
            <AdsKeeperWidget widgetId="2122068" />
            <PartnerBanner slot="bottomRail" />
            <Footer />
            <PartnerBanner slot="sideRailLeft" />
            <PartnerBanner slot="sideRailRight" />
            <BottomNav />
        </div>
    );
}
