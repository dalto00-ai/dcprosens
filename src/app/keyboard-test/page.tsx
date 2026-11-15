import type { Metadata } from 'next';
import Link from 'next/link';
import KeyboardTester from '@/components/KeyboardTester';
import ToolExplainer, { type ToolExplainerFaq, type ToolExplainerSection } from '@/components/ToolExplainer';
import JsonLd, { breadcrumb, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Keyboard Test — NKRO & Anti-Ghosting Tester',
  description:
    'Free online mechanical keyboard tester. Check N-Key Rollover (NKRO), detect ghosting or key chatter, test 60% or 100% layouts, and audition switch sound profiles.',
  alternates: { canonical: 'https://dcprosens.com/keyboard-test/' },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Keyboard & NKRO Tester' }],
    title: 'Keyboard Test — NKRO & Anti-Ghosting Tester | DCPROSENS',
    description: 'Check N-Key Rollover, keyboard ghosting, switch chatter, and key speed live in your browser.',
    url: 'https://dcprosens.com/keyboard-test/',
    type: 'website',
    siteName: 'DCPROSENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyboard Test — NKRO & Anti-Ghosting Tester | DCPROSENS',
    description: 'Check N-Key Rollover, keyboard ghosting, and key response live in your browser.',
    images: ['/og-image.png'],
  },
};

const sections: ToolExplainerSection[] = [
  {
    heading: 'Why N-Key Rollover (NKRO) matters in tactical FPS',
    body: [
      <>In Counter-Strike 2 and Valorant, clean movement depends on rapid counter-strafing while crouching, inspecting, or switching utility. If a keyboard shares scan matrix traces without diodes, holding three or four movement keys can block another key press — a failure called keyboard ghosting or key jamming.</>,
      <>Hold down W, A, S, D, Left Shift, Control, and Space together on the matrix above. Any true gaming mechanical or Hall-Effect board will light up every key simultaneously and register Peak NKRO above 6.</>,
    ],
  },
  {
    heading: 'How to spot switch chatter and Rapid Trigger issues',
    body: [
      <>Key chatter happens when an oxidized leaf spring or miscalibrated Hall-Effect actuation point registers two inputs from one tap. Watch the Keys/Sec counter and Last Code readout while tapping a suspect switch slowly.</>,
      <>Pairing clean key switches with disciplined movement mechanics is covered in depth in our <Link href="/blog/snap-tap-rapid-trigger-keyboards/" style={{ color: 'var(--primary)' }}>Snap Tap &amp; Rapid Trigger guide</Link> and <Link href="/bind-generator/" style={{ color: 'var(--primary)' }}>FPS Bind Generator</Link>.</>,
    ],
  },
];

const faqs: ToolExplainerFaq[] = [
  {
    q: 'What is N-Key Rollover (NKRO)?',
    a: 'N-Key Rollover means every individual switch can register simultaneously regardless of how many other keys are held down. Most USB membrane boards max out at 2-key or 6-key rollover (6KRO), whereas gaming boards support full NKRO.',
  },
  {
    q: 'Does this keyboard tester work for 60% and Hall-Effect boards?',
    a: 'Yes. Toggle between Full 100% and Compact 60% layouts above. Hall-Effect keyboards like Wooting 60HE or Razer Huntsman V3 Pro send standard HID keycodes and work identically.',
  },
  {
    q: 'Can I save proof of my keyboard test?',
    a: 'Yes. Click Download Report after testing every key to export a timestamped plain-text verification certificate listing all tested keycodes and peak rollover.',
  },
];

export default function KeyboardTestPage() {
  const jsonLd = graph(
    breadcrumb([{ name: 'Keyboard Test', path: '/keyboard-test/' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'DCPROSENS Keyboard & NKRO Tester',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://dcprosens.com/keyboard-test/',
      description: 'Online mechanical keyboard rollover, ghosting, and switch verification tool.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  );

  return (
    <div className="container" style={{ padding: '4rem 0 6rem' }}>
      <JsonLd data={jsonLd} />

      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Keyboard &amp; <span className="text-gradient">NKRO Tester</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Press keys individually or simultaneously to verify N-Key Rollover, eliminate ghosting, and check every switch before queueing ranked.
        </p>
      </div>

      <KeyboardTester />

      <ToolExplainer
        intro={<>Run an instant hardware check on 60%, TKL, or full-size keyboards right inside your browser with zero software installed. Active switches glow bright green while tested keys stay highlighted so you can audit every single switch across the board.</>}
        sections={sections}
        faqs={faqs}
      />
    </div>
  );
}
