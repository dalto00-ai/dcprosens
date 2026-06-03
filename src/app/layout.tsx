import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dcprosens.com"),
  title: {
    default: "DCPROSENS | Ultimate Sensitivity Converter & DPI Tool",
    template: "%s | DCPROSENS",
  },
  description:
    "The world's best sensitivity converter and gaming utility tool for competitive gamers. Convert sensitivity between Valorant, CS2, Apex Legends, Overwatch and more.",
  keywords: [
    "sensitivity converter",
    "gaming sensitivity",
    "valorant sensitivity",
    "cs2 sensitivity",
    "eDPI calculator",
    "DPI calculator",
    "cm/360 calculator",
    "mouse sensitivity converter",
    "apex legends sensitivity",
    "overwatch sensitivity",
    "pro player settings",
    "fps sensitivity tool",
    "valorant to cs2 converter",
  ],
  authors: [{ name: "DCPROSENS", url: "https://dcprosens.com" }],
  creator: "DCPROSENS",
  publisher: "DCPROSENS",
  category: "Gaming Tools",
  classification: "Gaming / FPS / Esports",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dcprosens.com",
    siteName: "DCPROSENS",
    title: "DCPROSENS | Ultimate Sensitivity Converter & DPI Tool",
    description:
      "Convert sensitivity between Valorant, CS2, Apex Legends, Overwatch and more. Calculate eDPI and cm/360 instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DCPROSENS - Ultimate Sensitivity Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCPROSENS | Ultimate Sensitivity Converter & DPI Tool",
    description:
      "Convert sensitivity between Valorant, CS2, Apex Legends, Overwatch and more.",
    images: ["/og-image.png"],
    creator: "@dcprosens",
  },
  alternates: {
    canonical: "https://dcprosens.com",
  },
  verification: {
    google: "bc2564470ebbe5d4",
    yandex: "b50282a38dee461f",
    other: {
      "naver-site-verification": "93e0b3ee0e795faf55c0172e4ccbd6a5b79dc3dd",
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "google-adsense-account": "ca-pub-1743865545749571",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-PLJ3LS29" />
      <body className={`${outfit.variable}`}>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
          <BottomNav />
        </div>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1743865545749571"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
