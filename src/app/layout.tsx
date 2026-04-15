import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    "cm/360",
    "mouse sensitivity",
    "apex legends sensitivity",
    "overwatch sensitivity",
  ],
  authors: [{ name: "DCPROSENS" }],
  creator: "DCPROSENS",
  publisher: "DCPROSENS",
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
      <body className={`${outfit.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLJ3LS29"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1743865545749571"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PLJ3LS29');`,
          }}
        />
      </body>
    </html>
  );
}
