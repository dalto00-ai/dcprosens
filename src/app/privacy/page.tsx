import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for DCPROSENS. Learn how we handle your data, cookies, analytics, advertising and affiliate links.",
    alternates: {
        canonical: "https://dcprosens.com/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const h2Style = { color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' };

export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Privacy Policy for DCPROSENS</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}><strong>Effective Date:</strong> June 6, 2026</p>

                <p style={{ marginBottom: '1.5rem' }}>
                    DCPROSENS (accessible from <a href="https://dcprosens.com" style={{ color: 'var(--primary)' }}>https://dcprosens.com</a>) is a free gaming sensitivity converter and toolset for FPS players.
                    This page explains, in plain terms, what data our site collects, how it is used, and the choices you have. If anything here is unclear, reach out via the e-mail at the bottom of this page.
                </p>

                <h2 style={h2Style}>1. The Converter Tools Run in Your Browser</h2>
                <p>
                    Our sensitivity converter, eDPI calculator, cm/360 calculator and similar tools do not require an account, login, or any personal information.
                    All conversions are calculated locally in your browser using JavaScript — the DPI and sensitivity values you type are never transmitted to or stored on our servers.
                </p>

                <h2 style={h2Style}>2. Information Collected Automatically (Log Files &amp; Analytics)</h2>
                <p>
                    Like most websites, our hosting infrastructure automatically logs standard technical information for every visit — such as IP address, browser type, device/operating system, referring page, and timestamps.
                    This is used purely to operate, secure, and troubleshoot the site, and is not linked to your identity.
                </p>
                <p>
                    We also use <strong>Google Analytics</strong>, loaded through <strong>Google Tag Manager (GTM)</strong>, to understand how visitors use DCPROSENS (e.g., which pages and tools are most popular) so we can improve the site.
                    Google Analytics uses cookies and similar technologies to collect aggregated, anonymized usage statistics. You can learn more about how Google handles this data at{' '}
                    <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>policies.google.com/technologies/partner-sites</a>, and you can opt out of Google Analytics tracking using the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google Analytics Opt-out Browser Add-on</a>.
                </p>

                <h2 style={h2Style}>3. Cookies</h2>
                <p>
                    DCPROSENS uses cookies and similar local-storage technologies to remember your preferences (such as the last game you selected in the converter) and to power the analytics and advertising described in this policy.
                    Most browsers let you refuse or delete cookies through their settings; doing so may affect how some features of the site behave, but the core converter tools will continue to work.
                </p>

                <h2 style={h2Style}>4. Advertising — Google AdSense &amp; Consent</h2>
                <p>
                    DCPROSENS displays ads served through <strong>Google AdSense</strong>. Google and its advertising partners may use cookies and similar technologies to serve ads based on your prior visits to this and other websites,
                    and to measure ad performance. You can learn more about how Google uses this data, and the choices available to you, at{' '}
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>policies.google.com/technologies/ads</a>, and manage personalized-ad settings at{' '}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>adssettings.google.com</a>.
                </p>
                <p>
                    Where required by applicable law (such as the GDPR in the EEA/UK or the CCPA/CPRA in California), we display a consent banner powered by <strong>Google&apos;s Privacy &amp; messaging (Funding Choices)</strong> tool before
                    personalized ads or non-essential cookies are activated, so you can review and manage your choices.
                </p>

                <h2 style={h2Style}>5. Affiliate Links (Amazon Associates)</h2>
                <p>
                    Some pages — such as our gear recommendations and pro-settings guides — contain links to products on Amazon (e.g., mice, mousepads, monitors). DCPROSENS participates in the <strong>Amazon Associates Program</strong>,
                    an affiliate advertising program. If you click one of these links and make a qualifying purchase, we may earn a small commission at no extra cost to you. We only recommend gear we believe is genuinely useful to competitive FPS players,
                    and our recommendations are independent of any commission we may receive.
                </p>

                <h2 style={h2Style}>6. The Free Ebook Download Form</h2>
                <p>
                    If you choose to download our free ebook (&quot;The Architect of Precision&quot;), we ask for your <strong>name</strong>, <strong>e-mail address</strong>, and <strong>main game</strong>. This information is stored securely on our servers
                    so we can provide the download and, where you have not objected, occasionally share related gaming-sensitivity content. We do not sell this information to third parties.
                    You can request that we delete your data at any time by emailing us at the address below — we will action the request promptly.
                </p>

                <h2 style={h2Style}>7. Children&apos;s Privacy</h2>
                <p>
                    DCPROSENS is not directed at children under 13 (or the equivalent minimum age in your jurisdiction), and we do not knowingly collect personal information from them.
                    If you believe a child has provided us with personal information, please contact us so we can remove it.
                </p>

                <h2 style={h2Style}>8. CCPA Privacy Rights (California)</h2>
                <p>
                    Under the CCPA/CPRA, California residents have the right to request that we disclose the categories and specific pieces of personal data we have collected about them, request deletion of that data,
                    and opt out of the sale or sharing of personal information (DCPROSENS does not sell personal information). To exercise any of these rights, please contact us — we aim to respond within one month.
                </p>

                <h2 style={h2Style}>9. GDPR Data Protection Rights (EEA/UK)</h2>
                <p>
                    If you are located in the EEA or UK, you have the right to access, rectify, erase, restrict or object to the processing of your personal data, and the right to data portability.
                    To exercise any of these rights regarding data you have submitted to us (for example, through the ebook form), please contact us using the details below.
                </p>

                <h2 style={h2Style}>10. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal/regulatory reasons. The &quot;Effective Date&quot; at the top of this page indicates when it was last revised.
                    We encourage you to review this page periodically.
                </p>

                <h2 style={h2Style}>11. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy or how your data is handled, please reach us via our <a href="/contact" style={{ color: 'var(--primary)' }}>Contact page</a> or by emailing{' '}
                    <a href="mailto:support@dcprosens.com" style={{ color: 'var(--primary)' }}>support@dcprosens.com</a>.
                </p>
            </div>
        </div>
    );
}
