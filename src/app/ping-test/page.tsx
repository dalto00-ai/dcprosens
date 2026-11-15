import type { Metadata } from 'next';
import Link from 'next/link';
import PingTester from '@/components/PingTester';
import ToolExplainer, { type ToolExplainerFaq, type ToolExplainerSection } from '@/components/ToolExplainer';
import JsonLd, { breadcrumb, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Gaming Ping Test — Latency & Jitter Checker',
  description:
    'Measure real HTTP network latency and jitter across Cloudflare, Google, and AWS endpoints directly in your browser before launching competitive FPS matches.',
  alternates: { canonical: 'https://dcprosens.com/ping-test/' },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Gaming Ping & Jitter Test' }],
    title: 'Gaming Ping Test — Latency & Jitter Checker | DCPROSENS',
    description: 'Check average network ping and packet jitter stability across multiple cloud edge servers.',
    url: 'https://dcprosens.com/ping-test/',
    type: 'website',
    siteName: 'DCPROSENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaming Ping Test — Latency & Jitter Checker | DCPROSENS',
    description: 'Measure average ping and jitter stability in your browser.',
    images: ['/og-image.png'],
  },
};

const sections: ToolExplainerSection[] = [
  {
    heading: 'Why jitter ruins gunfights more than stable 40ms ping',
    body: [
      <>A rock-solid 40ms connection lets game server lag compensation predict your movement cleanly. When jitter swings between 25ms and 85ms due to Wi-Fi interference or bufferbloat, players warp on peeks and hit registration feels delayed even if average ping looks low.</>,
      <>Look at the Jitter (Spread) column after running the test. For competitive Valorant, CS2, and Apex Legends, aim for jitter under 10ms on wired Cat6 Ethernet rather than shared 5GHz Wi-Fi.</>,
    ],
  },
  {
    heading: 'Isolating network lag from local PC and peripheral input lag',
    body: [
      <>Slow server responses only account for one half of sluggish aim. Frame pacing, display refresh rate, and mouse polling stability govern everything between your hand and monitor.</>,
      <>Run our <Link href="/fps-calculator/" style={{ color: 'var(--primary)' }}>FPS Benchmark Calculator</Link> and <Link href="/dead-pixel-test/" style={{ color: 'var(--primary)' }}>Monitor Hz &amp; Frame Drop Checker</Link> to confirm your local hardware is not bottlenecking your aim, or book full system tuning via <Link href="/vip-overhaul/" style={{ color: 'var(--primary)' }}>360° VIP Overhaul</Link>.</>,
    ],
  },
];

const faqs: ToolExplainerFaq[] = [
  {
    q: 'Why does browser ping differ slightly from ICMP cmd ping or in-game ping?',
    a: 'Browsers cannot open raw ICMP sockets for security reasons, so web ping tools time HTTPS round-trips (including browser TLS/network scheduling overhead). Repeating the test reveals packet instability and jitter accurately.',
  },
  {
    q: 'What ping and jitter are ideal for competitive FPS?',
    a: 'Under 35–50ms average with under 10ms jitter is tournament-grade. If jitter regularly spikes above 15–20ms, switching from Wi-Fi to Ethernet and enabling SQM/QoS on your router helps most.',
  },
  {
    q: 'Does changing DNS lower game server ping?',
    a: 'Usually no — DNS resolves server hostnames once before joining a match and does not route in-game UDP packets. Physical routing distance, ISP peering, and wired Ethernet matter far more.',
  },
];

export default function PingTestPage() {
  const jsonLd = graph(
    breadcrumb([{ name: 'Ping Test', path: '/ping-test/' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'DCPROSENS Gaming Ping & Jitter Tester',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://dcprosens.com/ping-test/',
      description: 'Multi-pass browser latency and packet jitter tester across major cloud edge networks.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  );

  return (
    <div className="container" style={{ padding: '4rem 0 6rem' }}>
      <JsonLd data={jsonLd} />

      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Gaming <span className="text-gradient">Ping &amp; Jitter Test</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Measure round-trip latency and stability across multiple cloud edge servers before queueing ranked matches.
        </p>
      </div>

      <PingTester />

      <ToolExplainer
        intro={<>High jitter causes rubber-banding, ghost hits, and inconsistent peeker&apos;s advantage. This diagnostic warms up each connection and times three consecutive passes to highlight both average response time and latency variance.</>}
        sections={sections}
        faqs={faqs}
      />
    </div>
  );
}
