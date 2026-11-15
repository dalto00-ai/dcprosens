import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    robots: { index: false, follow: false },
    alternates: { canonical: 'https://dcprosens.com/dashboard/' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return children;
}
