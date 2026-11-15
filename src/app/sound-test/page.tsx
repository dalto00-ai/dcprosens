import type { Metadata } from 'next';
import Link from 'next/link';
import AudioTester from '@/components/AudioTester';
import ToolExplainer, { type ToolExplainerFaq, type ToolExplainerSection } from '@/components/ToolExplainer';
import JsonLd, { breadcrumb, graph } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '7.1 Surround & Stereo Headset Sound Test',
  description:
    'Verify left and right stereo ear channels, test 60Hz sub-bass and 10kHz treble clarity, and run a 20Hz-20kHz frequency sweep for competitive FPS gaming headsets.',
  alternates: { canonical: 'https://dcprosens.com/sound-test/' },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS Stereo & 7.1 Headset Sound Test' }],
    title: '7.1 Surround & Stereo Headset Sound Test | DCPROSENS',
    description: 'Check left/right headset wiring, frequency response, and spatial imaging directly in your browser.',
    url: 'https://dcprosens.com/sound-test/',
    type: 'website',
    siteName: 'DCPROSENS',
  },
  twitter: {
    card: 'summary_large_image',
    title: '7.1 Surround & Stereo Headset Sound Test | DCPROSENS',
    description: 'Check left/right headset imaging and 20Hz-20kHz frequency sweep online.',
    images: ['/og-image.png'],
  },
};

const sections: ToolExplainerSection[] = [
  {
    heading: 'Why stereo imaging beats fake 7.1 surround in tactical shooters',
    body: [
      <>Games like Counter-Strike 2, Valorant, and Apex Legends ship with bespoke binaural HRTF engines calibrated for clean 2-channel stereo output. Enabling motherboard or USB dongle virtual 7.1 DSP often smears directional cues and adds software audio latency.</>,
      <>Click Left Ear and Right Ear above to make sure your headset or IEMs are not swapped or suffering from a loose TRS cable connection. The center tone should localize cleanly inside the middle of your head with equal loudness on both drivers.</>,
    ],
  },
  {
    heading: 'Using the frequency sweep to spot earcup imbalance and footstep masks',
    body: [
      <>Competitive footsteps sit largely between 1,500 Hz and 6,000 Hz, while explosions and sub-bass mud sit around 60–150 Hz. During the 20Hz–20kHz sweep, notice if one side sounds thinner or drops out early — a classic sign of a worn headset driver or Windows balance offset.</>,
      <>Check our <Link href="/gear/" style={{ color: 'var(--primary)' }}>Pro Gear Database</Link> to see which studio headphones, IEMs, and headsets top tournament rosters use alongside their audio setups.</>,
    ],
  },
];

const faqs: ToolExplainerFaq[] = [
  {
    q: 'How do I fix flipped left and right audio channels on Windows?',
    a: 'First check whether your headset earpads or IEM cable connectors (Left vs Right markings) are swapped physically. If the hardware is oriented correctly, inspect Windows Sound Settings or third-party equalizer software for channel inversion.',
  },
  {
    q: 'Should I turn off Windows Spatial Sound and virtual 7.1?',
    a: 'For most competitive FPS titles with built-in HRTF (Valorant, CS2, Overwatch 2), raw stereo mode gives sharper directional accuracy than stacking virtual 7.1 on top of game audio.',
  },
  {
    q: 'Why can I not hear frequencies above 16,000 Hz during the sweep?',
    a: 'Human upper hearing sensitivity gradually declines above 15–17 kHz with age, and some gaming headsets roll off output near 18–20 kHz. That does not affect footstep clarity in FPS games.',
  },
];

export default function SoundTestPage() {
  const jsonLd = graph(
    breadcrumb([{ name: 'Sound Test', path: '/sound-test/' }]),
    {
      '@type': 'SoftwareApplication',
      name: 'DCPROSENS Stereo & Headset Sound Test',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://dcprosens.com/sound-test/',
      description: 'Browser Web Audio tool for left/right speaker imaging, bass/treble balance, and 20Hz-20kHz acoustic sweeps.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  );

  return (
    <div className="container" style={{ padding: '4rem 0 6rem' }}>
      <JsonLd data={jsonLd} />

      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
          Headset &amp; <span className="text-gradient">Stereo Sound Test</span>
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: 0 }}>
          Verify Left/Right ear orientation, balance center imaging, and sweep your drivers from 20Hz to 20kHz for crisp in-game footsteps.
        </p>
      </div>

      <AudioTester />

      <ToolExplainer
        intro={<>Audio cues often tell you where an opponent is peeking half a second before they enter your crosshair. Use this browser-native tone generator to validate Left/Right channel wiring and detect driver imbalance on IEMs, headsets, and desktop speakers.</>}
        sections={sections}
        faqs={faqs}
      />
    </div>
  );
}
