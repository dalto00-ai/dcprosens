export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
                <p>DCPROSENS does not collect any personal data from its users. All sensitivity calculations are performed locally in your browser.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Cookies</h2>
                <p>We use local storage to save your preferences (such as your last selected game) to enhance your experience. We may use third-party services like Google AdSense which may use cookies to serve ads based on your prior visits to our website.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Third-Party Links</h2>
                <p>Variable links on our site may direct you to external sites. We are not responsible for the privacy practices of other sites.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </div>
        </div>
    );
}
