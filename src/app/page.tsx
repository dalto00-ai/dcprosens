

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
        "description": "The best sens converter and mouse sensitivity calculator. Convert sens between Valorant, CS2, Overwatch, and calculate eDPI instantly."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to use a sens converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Select the game you currently play, input your sensitivity, and select the game you want to convert to. Our sensitivity calculator will instantly show your new sens and cm/360."
            }
          },
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
            "name": "What is the best dpi sens converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DCPROSENS is the most accurate DPI sens converter, supporting over 100+ games and focusing on exact cm/360 translations to preserve your muscle memory."
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
          Ultimate Mouse <span className="text-gradient">Sens Converter</span><br />
          & Calculator Tool
        </h1>

        <p className="hero-subtitle">
          Enhance your aim with the most accurate sensitivity calculator.
          Instantly convert sens across games, calculate your eDPI, and optimize your setup.
        </p>

        <VoiceSearch />

        <Converter />

        <ProSettings />

        <HomeWiki />
      </div>
    </div>
  );
}
