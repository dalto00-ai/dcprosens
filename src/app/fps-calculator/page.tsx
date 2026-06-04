import type { Metadata } from 'next';
import FpsCalculator from '@/components/FpsCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FPS & Bottleneck Calculator — Estimate Valorant, CS2 & Apex FPS | DCPROSENS',
  description: 'Check if your PC CPU or GPU is bottlenecking your game performance. Estimate average frames per second (FPS) for Valorant, CS2, and Apex Legends, and get upgrade tips.',
  keywords: [
    'fps calculator',
    'pc bottleneck calculator',
    'cpu gpu bottleneck',
    'valorant fps calculator',
    'cs2 bottleneck check',
    'apex legends fps test',
    'pc bottleneck checker',
    'ryzen 7800x3d gaming fps',
    'gpu bottleneck test',
    'monitor refresh rate compatibility',
    'gaming pc bottleneck calculator',
    'how to reduce cpu bottleneck',
    'fps limit apex legends',
    'valorant cpu bound',
  ],
  alternates: {
    canonical: 'https://dcprosens.com/fps-calculator',
  },
  openGraph: {
    title: 'FPS & Bottleneck Calculator — Estimate Valorant, CS2 & Apex FPS | DCPROSENS',
    description: 'Check if your CPU or GPU is bottlenecking your game. Estimate average FPS for Valorant, CS2, and Apex Legends instantly, and get monitor and hardware advice.',
    type: 'website',
    url: 'https://dcprosens.com/fps-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS & Bottleneck Calculator | DCPROSENS',
    description: 'Check CPU/GPU bottlenecks and estimate Valorant, CS2, & Apex FPS.',
  },
  robots: { index: true, follow: true },
};

export default function FpsCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'DCPROSENS FPS and Bottleneck Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        url: 'https://dcprosens.com/fps-calculator',
        description: 'Check CPU and GPU bottleneck percentages and estimate gaming FPS for Valorant, Counter-Strike 2, and Apex Legends.',
        featureList: [
          'CPU selector with gaming power scores',
          'GPU selector with rendering power scores',
          'Valorant, CS2, and Apex Legends gaming profiles',
          'Bottleneck percentage and bound-type analyzer',
          'Monitor refresh rate compatibility check (144Hz, 240Hz, 360Hz)',
          'Amazon affiliate product recommendations for hardware upgrades',
        ],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a bottleneck in gaming PCs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A bottleneck happens when one PC component limits the performance of another. In gaming, this is usually between the CPU and the GPU. A CPU bottleneck means the CPU cannot process game instructions fast enough for the GPU, leaving the GPU underutilized. A GPU bottleneck means the GPU is fully maxed out rendering frames, while the CPU is waiting.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is Valorant highly CPU bound?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Valorant is designed to be highly accessible and visually lightweight, so the graphics processing load on the GPU is relatively low. The performance limit instead falls on the CPU, which has to manage player inputs, hitboxes, character abilities, and server communication.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I fix a CPU bottleneck in games?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can reduce a CPU bottleneck by closing background programs like Google Chrome, Discord, or overlay software, upgrading your RAM to a higher frequency, or overclocking your processor. Ultimately, upgrading to a gaming-centric CPU like the AMD Ryzen 7 7800X3D is the most effective solution.',
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
            Hardware Benchmarking
          </p>
          <h1 className="hero-title">
            FPS & Bottleneck <span className="text-gradient">Calculator</span>
          </h1>
          <p className="hero-subtitle">
            Find out if your CPU or GPU is bottlenecking your performance. Estimate average frames per second (FPS) for Valorant, CS2, and Apex Legends, and get expert hardware recommendations.
          </p>
        </div>
      </section>

      {/* Tool Container */}
      <div className="container" style={{ maxWidth: 1000 }}>
        <FpsCalculator />
      </div>

      {/* SEO Article */}
      <div className="container" style={{ maxWidth: 900, marginTop: '5rem' }}>
        <article style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Understanding Game Performance and Bottlenecks
          </h2>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            When building or upgrading a gaming PC, the relationship between your CPU and GPU is critical. A perfectly balanced system ensures that you are getting 100% value out of both components. However, depending on the game you play, you might experience either a <strong style={{ color: 'var(--text-primary)' }}>CPU Bottleneck</strong> or a <strong style={{ color: 'var(--text-primary)' }}>GPU Bottleneck</strong>.
          </p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
            CPU-Bound Games vs. GPU-Bound Games
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Different games push hardware in different ways. Some titles require massive graphic rendering capacities, while others need rapid calculation of movement physics and logic ticks:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Valorant (CPU Bound):</strong> Riot Games built Valorant to run on almost any graphics card. Because of this, even entry-level GPUs can render frames extremely quickly. The CPU becomes the bottleneck, as it must calculate hit registration and server ticks. To get 360+ FPS, you need a high-performance gaming CPU like the Ryzen 7 7800X3D.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Counter-Strike 2 (Balanced):</strong> Running on Source 2, CS2 demands a fast CPU for tick calculations and a decent GPU to render volumetric smokes and realistic lighting effects. A bottleneck on either component will pull down your average frame rates.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Apex Legends (GPU Bound):</strong> Apex renders huge battle royale maps, visual particle effects from abilities, and high-quality textures. The load is placed heavily on your graphics card. High-tier GPUs like the RTX 4070 or RTX 4080 are necessary to stay locked at the game&apos;s engine cap of 300 FPS.
            </li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>
            How Does the Monitor Refresh Rate Fit In?
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Getting 300 FPS does not matter if your screen only refreshes 60 times a second. For competitive shooters, matching your average FPS to your monitor&apos;s refresh rate is essential:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>144Hz:</strong> The standard baseline for competitive FPS. Requires at least 144 average FPS to prevent stuttering. Very easy to hit on budget systems.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>240Hz:</strong> The sweet spot for esports. Highly recommended for tactical shooters like CS2 and Valorant. A system with a mid-range CPU (Ryzen 5 7600X) and GPU (RTX 4060) handles this easily.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>360Hz & 540Hz:</strong> The elite tier. Used by professional athletes. Requires top-tier components (RTX 4070+ and Ryzen 7 7800X3D) to hold a stable 360+ FPS line during chaotic fire fights.
            </li>
          </ul>

          <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>Need to align your sensitivity with your desk space?</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Calculate the ideal mousepad size and physical sensitivity boundaries for your physical desk setup.</p>
            <Link href="/desk-space-calculator" style={{
              display: 'inline-block',
              background: 'var(--primary)',
              color: '#000',
              padding: '0.75rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              transition: 'var(--transition-fast)',
            }}>
              Try Desk Space Calculator →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
