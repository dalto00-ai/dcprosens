import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Esports Field Guides & Training Compendiums',
  description:
    'Tactical field guides and engineering manuals for competitive FPS players: Sensitivity calibration, crosshair angle geometry, 15-min warm-up routines, pad friction, zero-latency input lag, and controller aim assist.',
  alternates: {
    canonical: 'https://dcprosens.com/ebooks/',
  },
  openGraph: {
    title: 'Esports Field Guides & Training Compendiums — DCPROSENS',
    description:
      'Professional engineering manuals for tactical FPS mechanics. Available individually ($14.99) or in the complete Master Suite ($39.99).',
    url: 'https://dcprosens.com/ebooks/',
    images: [
      {
        url: '/ebooks/mockup_3d_book_1.png',
        width: 900,
        height: 1100,
        alt: 'DCPROSENS Competitive Field Guides',
      },
    ],
    type: 'website',
  },
};

export default function EbooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
