import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Log In',
    robots: { index: false, follow: false },
    alternates: { canonical: 'https://dcprosens.com/login/' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
