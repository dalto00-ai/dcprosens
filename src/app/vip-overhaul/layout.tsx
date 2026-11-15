import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DCPROSENS 360° VIP Overhaul | 1:1 Latency & Sensitivity Consultation',
  description: 'Eliminate PC input lag and micro-stutters with DCPROSENS 1:1 private esports consultation and our proprietary 3-click Optimizer Engine. Grade A+ Tournament Ready.',
  alternates: {
    canonical: 'https://dcprosens.com/vip-overhaul/',
  },
  openGraph: {
    title: 'DCPROSENS 360° VIP Overhaul | 1:1 Latency & Sensitivity Consultation',
    description: 'Eliminate PC input lag and micro-stutters with DCPROSENS 1:1 private esports consultation and our proprietary 3-click Optimizer Engine.',
    url: 'https://dcprosens.com/vip-overhaul/',
    siteName: 'DCPROSENS',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCPROSENS 360° VIP Overhaul | 1:1 Latency & Sensitivity',
    description: 'Eliminate PC input lag and micro-stutters with DCPROSENS 1:1 private esports consultation.',
    images: ['/images/og-default.png'],
  },
};

export default function VipOverhaulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
