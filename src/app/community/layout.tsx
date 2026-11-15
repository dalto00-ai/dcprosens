import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pro Community — Precision Aim & Zero-Latency Hub',
  description:
    'Private competitive gaming community for tactical FPS players. Share telemetry setups, access pro coach VOD reviews, zero-latency Windows tuning, and curated config presets.',
  alternates: {
    canonical: 'https://dcprosens.com/community/',
  },
  openGraph: {
    title: 'DCPROSENS Pro Community — Precision Aim & Zero-Latency Hub',
    description:
      'Private competitive hub for tactical FPS mechanics, pro configs, and telemetry benchmarks.',
    url: 'https://dcprosens.com/community/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DCPROSENS Pro Community',
      },
    ],
    type: 'website',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
