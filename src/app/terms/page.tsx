import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the Terms of Service for DCPROSENS. Understand your rights and obligations when using our sensitivity converter and gaming tools.",
    alternates: {
        canonical: "https://dcprosens.com/terms/",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}><strong>Effective Date:</strong> January 1, 2026</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using the website DCPROSENS (https://dcprosens.com), you accept and agree to be bound by the terms and provision of this agreement.
                    In addition, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on DCPROSENS&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '1rem' }}>
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on DCPROSENS&apos;s website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                </ul>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>3. Disclaimer</h2>
                <p>
                    The materials on DCPROSENS&apos;s website are provided on an &apos;as is&apos; basis. DCPROSENS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    Further, DCPROSENS does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>4. Limitations</h2>
                <p>
                    In no event shall DCPROSENS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DCPROSENS&apos;s website, even if DCPROSENS or a DCPROSENS authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on DCPROSENS&apos;s website could include technical, typographical, or photographic errors. DCPROSENS does not warrant that any of the materials on its website are accurate, complete or current.
                    DCPROSENS may make changes to the materials contained on its website at any time without notice. However DCPROSENS does not make any commitment to update the materials.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>6. Links</h2>
                <p>
                    DCPROSENS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DCPROSENS of the site. Use of any such linked website is at the user&apos;s own risk.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>7. Modifications</h2>
                <p>
                    DCPROSENS may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>8. Subscriptions, Billing &amp; Cancellation</h2>
                <p>
                    DCPROSENS offers paid subscription tiers (Monthly, Annual VIP Pass, and Lifetime Founder VIP) that unlock premium features including custom crosshair generators, aim training routines, and ad-free browsing.
                </p>
                <p>
                    All payments are securely processed by Stripe. Subscriptions renew automatically at the end of each billing cycle (monthly or annually) unless cancelled prior to the renewal date. You can cancel your subscription at any time directly through your <a href="/dashboard/" style={{ color: 'var(--primary)' }}>Account Dashboard</a> via the customer billing portal link. Upon cancellation, you will retain full Pro access until the end of your current paid billing period.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>9. Refund Policy (Digital Goods &amp; Memberships)</h2>
                <p>
                    Due to the immediate digital delivery and non-tangible nature of our downloadable PDFs, optimizer scripts, and instant Pro software unlocks, all sales are generally final once access is granted.
                </p>
                <p>
                    However, customer satisfaction is our top priority. We offer a <strong>7-day money-back guarantee</strong> under the following conditions:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '1rem' }}>
                    <li>You encountered a verified technical defect or billing duplicate that our support team could not resolve;</li>
                    <li>You request the refund within 7 calendar days of your initial purchase;</li>
                    <li>For consultation sessions, cancellation must be requested at least 24 hours prior to the scheduled 1:1 call.</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                    To request a refund or report a billing issue, email us at <a href="mailto:support@dcprosens.com" style={{ color: 'var(--primary)' }}>support@dcprosens.com</a> with your order email and Stripe invoice reference.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>10. Contact Us</h2>
                <p>
                    For inquiries regarding these Terms of Service or our refund policy, please contact us via our <a href="/contact/" style={{ color: 'var(--primary)' }}>Contact page</a> or directly at <a href="mailto:support@dcprosens.com" style={{ color: 'var(--primary)' }}>support@dcprosens.com</a>.
                </p>
            </div>
        </div>
    );
}
