import type { Metadata } from 'next';
import Link from 'next/link';
import GamerMatchClient from '@/components/GamerMatchClient';
import JsonLd, { graph, breadcrumb } from '@/components/JsonLd';
import ToolExplainer, { type ToolExplainerSection, type ToolExplainerFaq } from '@/components/ToolExplainer';

export const metadata: Metadata = {
  title: 'DCPROSENS Match — Gamer Duo & Squad Finder (Valorant, CS2, GTA VI)',
  description:
    'Swipe and match with calibrated FPS duos and GTA VI Free-Aim heist squads by game, platform (PC, PS5, Xbox), region, role, and cm/360 sensitivity compatibility.',
  keywords: [
    'gamer duo finder',
    'valorant duo match',
    'cs2 faceit squad finder',
    'gta 6 heist crew finder ps5 xbox',
    'tinder for gamers lfg',
    'fps teammate finder',
  ],
  alternates: {
    canonical: 'https://dcprosens.com/match/',
  },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'DCPROSENS — Gamer Duo & Squad Match' }],
    title: 'DCPROSENS Match — Find Calibrated Duos & GTA VI Squads',
    description:
      'Filter by Game, Platform (PC/PS5/Xbox), Region, and cm/360° aim compatibility. Swipe right to unlock Discord, PSN, or Xbox Gamertags.',
    url: 'https://dcprosens.com/match/',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = graph(
  {
    '@type': 'WebApplication',
    '@id': 'https://dcprosens.com/match/#app',
    name: 'DCPROSENS Gamer Duo & Squad Match',
    url: 'https://dcprosens.com/match/',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Any (Web Browser, PC, Android, iOS)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Aim-calibrated gamer matchmaking deck for Valorant, CS2, GTA VI PS5/Xbox heist squads, Warzone, Apex Legends, and Fortnite.',
  },
  breadcrumb([{ name: 'Duo & Squad Match', path: '/match/' }])
);

const explainerSections: ToolExplainerSection[] = [
  {
    heading: 'Why Aim-Calibrated Matchmaking Beats Random Public Lobbies',
    body: [
      <>Solo-queuing in ranked Valorant, Faceit CS2, or Warzone forces you into lobbies with silent teammates and clashing playstyles. <strong>DCPROSENS Match</strong> pairs players who actually care about mechanical consistency—letting you filter by game, platform (PC, PS5, Xbox Series X|S), server region, microphone status, and role compatibility.</>,
      <>Every card displays the player&apos;s verified sensitivity telemetry (<code>cm/360°</code>, eDPI, or DualSense/Xbox deadzone profile) alongside a live <strong>Aim Compatibility %</strong> score against your own setup.</>,
    ],
  },
  {
    heading: 'GTA VI Free-Aim Heist Crews & Trophy Hunters (PS5 & Xbox)',
    body: [
      <>Playing Grand Theft Auto VI Free-Aim lobbies or chasing all 55 trophies requires reliable teammates who communicate and do not quit mid-heist. Use the <strong>GTA VI</strong> filter above to find PS5 and Xbox Series X|S players running calibrated deadzones and Classic controls.</>,
      <>Before inviting a crew, double-check your controller resting drift with our <Link href="/gamepad-tester/" style={{ color: 'var(--primary, #00ff9d)' }}>Gamepad Stick Drift Tester</Link> and dial in your 3-scale camera speeds inside the <Link href="/gta-vi-sensitivity/" style={{ color: 'var(--primary, #00ff9d)' }}>GTA VI Command Center</Link>.</>,
    ],
  },
];

const explainerFaqs: ToolExplainerFaq[] = [
  {
    q: 'Is DCPROSENS Gamer Match free to use?',
    a: 'Yes. Browsing player cards, filtering by game/platform/region, matching, unlocking Discord/PSN/Xbox tags, and publishing your own Player Card are 100% free.',
  },
  {
    q: 'How does the Aim Compatibility percentage work?',
    a: 'Enter your physical cm/360° sensitivity in the filter bar. The deck compares your mechanical sensitivity range and mic preference against each player card to highlight teammates with compatible pacing and roles.',
  },
  {
    q: 'How do I report or hide an inappropriate player card?',
    a: 'Click "Report / Hide" at the bottom of any player card. The card is immediately hidden from your deck and logged for moderation review.',
  },
  {
    q: 'Can console players on PS5 and Xbox Series X|S use Squad Match for GTA VI?',
    a: 'Yes. Select GTA VI in the Game filter and PS5 or Xbox in the Platform filter to match with Leonida heist partners and share your PSN ID or Xbox Gamertag safely.',
  },
];

export default function MatchPage() {
  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '1160px', margin: '0 auto' }}>
      <JsonLd data={jsonLd} />

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(0, 255, 157, 0.14)',
            border: '1px solid rgba(0, 255, 157, 0.4)',
            color: '#00ff9d',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '0.9rem',
          }}
        >
          💘 DCPROSENS SQUAD MATCH // BETA
        </span>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem' }}>
          Find Your Calibrated <span style={{ color: '#00ff9d' }}>Duo or Squad</span>
        </h1>
        <p style={{ color: 'var(--text-secondary, #94a3b8)', maxWidth: '680px', margin: '0 auto', fontSize: '1.02rem', lineHeight: 1.6 }}>
          Swipe right on competitive teammates matched by Game, Platform (PC, PS5, Xbox), Region, Role, and <code>cm/360°</code> sensitivity—then copy their Discord or PSN tag in 1 click.
        </p>
      </header>

      <GamerMatchClient />

      <div style={{ marginTop: '4rem' }}>
        <ToolExplainer sections={explainerSections} faqs={explainerFaqs} />
      </div>
    </div>
  );
}
