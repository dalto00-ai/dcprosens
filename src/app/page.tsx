

import Converter from '@/components/Converter';
import ProSettings from '@/components/ProSettings';
import HomeWiki from '@/components/HomeWiki';
import VoiceSearch from '@/components/VoiceSearch';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "DCPROSENS",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1250"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "The ultimate gaming sensitivity converter for Valorant, CS2, Overwatch, and more. Calculate cm/360 and eDPI instantly."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to convert Valorant sensitivity to CS2?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiply your Valorant sensitivity by 3.181818 to get your CS2 sensitivity."
            }
          },
          {
            "@type": "Question",
            "name": "What is eDPI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "eDPI (Effective Dots Per Inch) is your mouse DPI multiplied by your in-game sensitivity."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="container page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-section">
        <h1 className="hero-title">
          Pro Gaming <span className="text-gradient">Sensitivity</span><br />
          Converter Tool
        </h1>

        <p className="hero-subtitle">
          Enhance your aim with precision. Convert sensitivity across games,
          calculate eDPI, and optimize your setup.
        </p>

        <VoiceSearch />

        <Converter />

        <ProSettings />

        <HomeWiki />
      </div>
    </div>
  );
}
