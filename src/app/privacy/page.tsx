export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Privacy Policy for DCPROSENS</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

                <p className="mb-4">
                    At DCPROSENS (accessible from https://dcprosens.com), one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by DCPROSENS and how we use it.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>1. Information We Collect</h2>
                <p>
                    DCPROSENS operates primarily as a client-side utility tool. We do not require you to create an account or provide personal identification information (PII) to use our sensitivity converters or DPI tools.
                    All calculations regarding sensitivity, DPI, and eDPI are performed locally within your browser. Your gaming settings are not uploaded to our servers.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>2. Log Files</h2>
                <p>
                    DCPROSENS follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services' analytics.
                    The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                    These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>3. Cookies and Web Beacons</h2>
                <p>
                    Like any other website, DCPROSENS uses "cookies". These cookies are used to store information including visitors' preferences (such as your last selected game) and the pages on the website that the visitor accessed or visited.
                    The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>4. Google DoubleClick DART Cookie</h2>
                <p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
                    However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://policies.google.com/technologies/ads</a>
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>5. Google AdSense</h2>
                <p>
                    We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.
                    Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                <p>
                    Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>7. GDPR Data Protection Rights</h2>
                <p>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    The right to access, rectification, erasure, restrict processing, object to processing, and data portability.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>8. Contact Us</h2>
                <p>
                    If you have any questions about our Privacy Policy, do not hesitate to contact us via our Contact page or email support at support@dcprosens.com.
                </p>
            </div>
        </div>
    );
}
