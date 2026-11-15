import type { Metadata } from 'next';
import Link from 'next/link';
import GamepadTester from '@/components/GamepadTester';
import ToolExplainer, { type ToolExplainerFaq, type ToolExplainerSection } from '@/components/ToolExplainer';
import JsonLd, { breadcrumb, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Gamepad Tester — Stick Drift & Deadzone Check',
  description:
    'Test PS5 DualSense, Xbox, and Hall-Effect PC controllers online. Measure analog stick drift, resting deadzone percentages, L2/R2 triggers, and dual-motor rumble.',
  alternates: { canonical: 'https://dcprosens.com/gamepad-tester/' },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Gamepad & Stick Drift Tester' }],
    title: 'Gamepad Tester — Stick Drift & Deadzone Check | DCPROSENS',
    description: 'Check controller stick drift, live axis telemetry, trigger curves, and vibration online.',
    url: 'https://dcprosens.com/gamepad-tester/',
    type: 'website',
    siteName: 'DCPROSENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamepad Tester — Stick Drift & Deadzone Check | DCPROSENS',
    description: 'Check controller stick drift, live axis telemetry, and triggers online.',
    images: ['/og-image.png'],
  },
};

const sections: ToolExplainerSection[] = [
  {
    heading: 'How to read analog stick drift and set your in-game deadzone',
    body: [
      <>After plugging in your controller and tapping any button, release both thumbsticks completely and watch the X/Y axis bars above. A healthy Hall-Effect or TMR stick settles within 0.000 to 0.015. Resting readings between 0.030 and 0.090 reveal potentiometer wear — commonly felt as slow camera drift.</>,
      <>Set your in-game inner deadzone just above your highest resting spike. For example, if your right stick rests at 0.042, use a 5% (0.05) deadzone in Warzone, Apex Legends, Fortnite, or <Link href="/gta-vi-sensitivity/" style={{ color: 'var(--primary)' }}>GTA VI sensitivity settings</Link> to keep rotational aim assist active without phantom drift.</>,
    ],
  },
  {
    heading: 'Eliminating drift permanently with TMR and Hall-Effect upgrades',
    body: [
      <>Traditional carbon-film potentiometers degrade mechanically from micro-dust and spring fatigue. Modern magnetic sensors measure magnetic flux with zero physical friction, allowing ultra-low 1%–2% deadzones.</>,
      <>Explore full mechanical repair methods in our <Link href="/blog/controller-deadzone-stick-drift/" style={{ color: 'var(--primary)' }}>Controller Deadzone &amp; Stick Drift guide</Link> and <Link href="/blog/magnetic-controller-sticks-drift/" style={{ color: 'var(--primary)' }}>TMR &amp; Hall-Effect stick analysis</Link>.</>,
    ],
  },
];

const faqs: ToolExplainerFaq[] = [
  {
    q: 'Why does the tester say No Controller Detected after plugging in?',
    a: 'Browsers keep the Gamepad API asleep for privacy until you press any button or move a stick after focusing the tab. Tap X/A or a trigger and the controller telemetry will appear immediately.',
  },
  {
    q: 'What level of stick drift is considered normal?',
    a: 'Up to 0.02 (2%) resting offset is normal recentering tolerance on spring-centered sticks. Anything consistently resting past 0.06–0.08 requires raising your deadzone or cleaning/replacing the thumbstick module.',
  },
  {
    q: 'Which controllers work with this browser diagnostic?',
    a: 'Xbox Series/One, PlayStation DualSense & DualShock 4, Nintendo Switch Pro Controller, and third-party Scuf, Battle Beaver, Gamesir, and Hall-Effect PC gamepads via USB or Bluetooth.',
  },
];

export default function GamepadTesterPage() {
  const jsonLd = graph(
    breadcrumb([{ name: 'Gamepad Tester', path: '/gamepad-tester/' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'DCPROSENS Gamepad & Stick Drift Tester',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://dcprosens.com/gamepad-tester/',
      description: 'Live HTML5 Gamepad API tool for checking stick drift, deadzones, triggers, and controller rumble.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  );

  return (
    <div className="container" style={{ padding: '4rem 0 6rem' }}>
      <JsonLd data={jsonLd} />

      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Gamepad &amp; <span className="text-gradient">Stick Drift Tester</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Inspect live thumbstick X/Y resting offsets, measure exact deadzone thresholds, test L2/R2 triggers, and fire dual-motor rumble.
        </p>
      </div>

      <GamepadTester />

      <ToolExplainer
        intro={<>Dialing in controller aim starts with knowing your physical hardware limits. Use the axis readout below before locking deadzone values in competitive shooters so you stay as close to zero deadzone as possible without unwanted camera drift.</>}
        sections={sections}
        faqs={faqs}
      />
    </div>
  );
}
