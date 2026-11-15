import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Your Field Guides — DCPROSENS',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
