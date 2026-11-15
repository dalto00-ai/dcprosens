import type { Metadata } from 'next';
import Link from 'next/link';
import DeadPixelTester from '@/components/DeadPixelTester';
import ToolExplainer, { type ToolExplainerFaq, type ToolExplainerSection } from '@/components/ToolExplainer';
import JsonLd, { breadcrumb, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Dead Pixel Test & Live Monitor Hz Checker',
  description:
    'Check OLED, IPS, and TN monitors for dead pixels, bright stuck subpixels, and backlight uniformity in fullscreen solid colors while verifying live Windows refresh rate (Hz).',
  alternates: { canonical: 'https://dcprosens.com/dead-pixel-test/' },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Dead Pixel & Live Hz Checker' }],
    title: 'Dead Pixel Test & Live Monitor Hz Checker | DCPROSENS',
    description: 'Inspect solid-color screens for stuck or dead pixels and measure live monitor refresh rate in your browser.',
    url: 'https://dcprosens.com/dead-pixel-test/',
    type: 'website',
    siteName: 'DCPROSENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dead Pixel Test & Live Monitor Hz Checker | DCPROSENS',
    description: 'Fullscreen dead-pixel & subpixel defect test with live Hz verification.',
    images: ['/og-image.png'],
  },
};

const sections: ToolExplainerSection[] = [
  {
    heading: 'Dead pixels vs. stuck subpixels: how to tell the difference',
    body: [
      <>A dead pixel fails to receive voltage across all three RGB subpixels and stays permanently black on Pure White, Red, Green, and Blue slides. A stuck pixel stays illuminated in one solid color (red, green, blue, or white) on the Pure Black screen because a transistor remains switched on.</>,
      <>Always wipe gentle screen dust before claiming an RMA — surface dust mimics dark spots on bright screens, whereas true dead pixels remain sharp and grid-aligned from every viewing angle.</>,
    ],
  },
  {
    heading: 'Why your new 240Hz or 360Hz gaming monitor might be stuck at 60Hz',
    body: [
      <>Windows and graphics drivers frequently default high-refresh displays to 60Hz over HDMI or after a GPU driver clean install. The live Hz counter above uses your browser animation loop to confirm whether your active display output is genuinely running at 144Hz, 240Hz, or 360Hz+.</>,
      <>Want to visually compare 60Hz vs 240Hz/360Hz ghosting and overdrive clarity? Open our interactive <Link href="/monitor-simulator/" style={{ color: 'var(--primary)' }}>Monitor Hz &amp; Motion Blur Simulator</Link>.</>,
    ],
  },
];

const faqs: ToolExplainerFaq[] = [
  {
    q: 'How do I cycle colors during the fullscreen dead-pixel check?',
    a: 'Click anywhere on the fullscreen background, press Space, or use Left/Right arrow keys to move across Pure Black, White, Red, Green, and Blue. Press Esc or Exit Fullscreen when done.',
  },
  {
    q: 'Why does the Live Hz Counter show 60Hz on my 240Hz monitor?',
    a: 'Check Windows Display Settings -> Advanced Display -> Choose a refresh rate, ensure you are using DisplayPort or HDMI 2.1, and verify power-saving mode is disabled in your browser.',
  },
  {
    q: 'Can stuck pixels be repaired without returning the monitor?',
    a: 'Sometimes. Unlike dead pixels (which are permanent hardware failures), stuck subpixels occasionally recover after gently massaging the area through a microfiber cloth or cycling rapid color frames.',
  },
];

export default function DeadPixelTestPage() {
  const jsonLd = graph(
    breadcrumb([{ name: 'Dead Pixel Test', path: '/dead-pixel-test/' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'DCPROSENS Dead Pixel & Live Hz Checker',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://dcprosens.com/dead-pixel-test/',
      description: 'Fullscreen solid-color dead pixel inspection tool paired with live display refresh rate and frame-stutter monitoring.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  );

  return (
    <div className="container" style={{ padding: '4rem 0 6rem' }}>
      <JsonLd data={jsonLd} />

      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Dead Pixel &amp; <span className="text-gradient">Monitor Hz Checker</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Inspect your display in fullscreen solid colors to spot dead or stuck subpixels while verifying your live refresh rate (Hz).
        </p>
      </div>

      <DeadPixelTester />

      <ToolExplainer
        intro={<>Whether unboxing a new esports monitor or troubleshooting suspicious motion stutter, this quick diagnostic lets you confirm active Hertz output and isolate stuck or dead RGB subpixels edge-to-edge in fullscreen.</>}
        sections={sections}
        faqs={faqs}
      />
    </div>
  );
}
