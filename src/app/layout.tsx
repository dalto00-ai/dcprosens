import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import AnalyticsLoader from "@/components/AnalyticsLoader";
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
        width: 1024,
        height: 1024,
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
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "google-adsense-account": "ca-pub-1743865545749571",
  },
  alternates: {
    canonical: "https://dcprosens.com",
    languages: {
      "en-US": "https://dcprosens.com",
      "x-default": "https://dcprosens.com",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DCPROSENS",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable}`}>
        {/* Google Funding Choices (Privacy & messaging) — shows the GDPR/CCPA
            consent dialog configured in the AdSense "Privacy & messaging"
            settings. No-op until a message is published there. */}
        <Script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-1743865545749571?ers=1"
          strategy="afterInteractive"
        />
        <Script id="googlefc-present" strategy="afterInteractive">
          {`(function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();`}
        </Script>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
          <BottomNav />
        </div>

        <AnalyticsLoader />
      </body>
    </html>
  );
}
