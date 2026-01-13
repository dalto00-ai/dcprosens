export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                <p>By accessing DCPROSENS, you agree to these Terms of Service.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Use License</h2>
                <p>Permission is granted to temporarily use the materials on DCPROSENS for personal, non-commercial transitory viewing only.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer</h2>
                <p>The materials on DCPROSENS are provided on an 'as is' basis. Makes no warranties, expressed or implied.</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Limitations</h2>
                <p>In no event shall DCPROSENS be liable for any damages arising out of the use or inability to use the materials on the website.</p>
            </div>
        </div>
    );
}
