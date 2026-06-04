import type { Metadata } from 'next';
import DeskSpaceCalculator from '@/components/DeskSpaceCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Desk Space Sensitivity Calculator — Match DPI & Desk Size | DCPROSENS',
  description: 'Calculate the ideal mouse sensitivity and mousepad size for your physical desk space. Avoid hitting your keyboard or sliding off your desk during flick shots.',
  keywords: [
    'desk space sensitivity calculator',
    'mouse sensitivity desk size',
    'mousepad width calculator',
    'valorant sens for small desk',
    'cs2 sens for small desk',
    'gaming mousepad size finder',
    'how to stop hitting keyboard with mouse',
    'mouse dpi desk space',
    'eDPI desk size matching',
    'physical distance sensitivity tool',
    'cm/360 desk width',
    'perfect sens for desk space',
  ],
  alternates: {
    canonical: 'https://dcprosens.com/desk-space-calculator',
  },
  openGraph: {
    title: 'Desk Space Sensitivity Calculator — Match DPI & Desk Size | DCPROSENS',
    description: 'Calculate the ideal mouse sensitivity and mousepad size for your physical desk space. Avoid sliding off your desk or hitting your keyboard during intense gaming sessions.',
    type: 'website',
    url: 'https://dcprosens.com/desk-space-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desk Space Sensitivity Calculator | DCPROSENS',
    description: 'Match your mouse sensitivity and DPI with your available desk space. Free gaming tool.',
  },
  robots: { index: true, follow: true },
};

export default function DeskSpaceCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'DCPROSENS Desk Space Sensitivity Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        url: 'https://dcprosens.com/desk-space-calculator',
        description: 'Calculate maximum cm/360 and minimum in-game sensitivity bounds to avoid running out of mousepad space on your desk.',
        featureList: [
          'Desk width input slider (15cm to 100cm)',
          'Target rotation swipe selection (90°, 180°, 360°)',
          'DPI setting buttons',
          'Min sensitivity output for Valorant, CS2, Apex Legends, and Overwatch 2',
          'Interactive, scaled visual desk widget',
          'Mousepad size suggestions with Amazon affiliate links',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does desk space affect gaming sensitivity?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If you have limited desk space (under 30cm of mousepad width) and use a low sensitivity (e.g., 50cm/360), you will run out of space and hit your keyboard or slide off your desk before completing a 180-degree turn. You must use a higher in-game sensitivity to stay within your desk space safety boundaries.',
            },
          },
          {
            '@type': 'Question',
            name: 'What keyboard layout gives the most desk space for gaming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Using a tenkeyless (TKL), 75%, or 60% mechanical keyboard frees up significant desk space by removing the numpad and arrow clusters. This provides an additional 8 to 15 cm of mousepad width, allowing you to use a lower, more precise sensitivity.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <p style={{
            display: 'inline-block',
            background: 'rgba(0,255,157,0.1)',
            border: '1px solid rgba(0,255,157,0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '0.3rem 1rem',
            fontSize: '0.8rem',
            color: 'var(--primary)',
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Desk Space Optimizer
          </p>
          <h1 className="hero-title">
            Desk Space Sensitivity <span className="text-gradient">Calculator</span>
          </h1>
          <p className="hero-subtitle">
            Input your available desk space and mouse DPI to find the minimum in-game sensitivity required to stay on your pad. Avoid smashing your keyboard during critical swipe turns.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="container" style={{ maxWidth: 1000 }}>
        <DeskSpaceCalculator />
      </div>

      {/* SEO Article */}
      <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
        <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Why Desk Space is the Silent Killer of Aim Accuracy
          </h2>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Many players copy the sensitivity of professional esports players (such as 35cm to 50cm per 360) without checking if their physical gaming setup supports it. If you try to run a low sensitivity on a 20cm office mousepad, you will constantly hit the edge. This forces you to pick up and reposition your mouse during intense fire fights, which ruins tracking and makes reactive aiming impossible.
          </p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
            The Physics of Swipe Turns: 90°, 180°, and 360°
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            To navigate game worlds efficiently, your physical swipe distance must align with your movement requirements:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>180-Degree Swipe:</strong> In tactical shooters (Valorant, Counter-Strike 2), the most critical rotation is turning around to face an enemy behind you. If your available desk width is 30cm, your maximum cm/360 must be under 60cm. That way, a full side-to-side sweep (30cm) yields a 180° rotation.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>360-Degree Swipe:</strong> In arena shooters or fast tracking games (Apex Legends, Overwatch 2, Warzone), enemies fly over your head or flank you constantly. Having a sensitivity where a full swipe across your pad does a full 360° is highly recommended to maintain quick orientation.
            </li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
            How to Free Up Desk Space for Lower Sensitivity
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            If your desk space limits you to high, jittery sensitivities, try the following upgrades:
          </p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Switch to a smaller keyboard:</strong> Full-sized keyboards with numeric pads take up a massive footprint. Switching to a Tenkeyless (TKL) or a 60% keyboard (like the Wooting 60HE) instantly gives you 10cm to 15cm of extra mouse movement area.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Tilt your keyboard:</strong> Many professional FPS players tilt their keyboards at a 45-degree angle. This reduces the shoulder width footprint of the keyboard, providing extra space for the mousepad.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Use a monitor arm:</strong> Standard monitor stands have wide legs that eat up desk depth and width. A clamping monitor arm frees up the desk surface entirely, letting you push your mousepad slightly higher or further left.
            </li>
          </ol>

          <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>Want to check if your computer is bottlenecking your games?</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Check CPU/GPU compatibility and estimate FPS benchmarks for Valorant, CS2, and Apex Legends.</p>
            <Link href="/fps-calculator" style={{
              display: 'inline-block',
              background: 'var(--primary)',
              color: '#000',
              padding: '0.75rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              transition: 'var(--transition-fast)',
            }}>
              Go to FPS & Bottleneck Calculator →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
