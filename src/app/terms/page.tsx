export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using the website DCPROSENS (https://dcprosens.com), you accept and agree to be bound by the terms and provision of this agreement.
                    In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on DCPROSENS's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginTop: '1rem' }}>
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on DCPROSENS's website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>3. Disclaimer</h2>
                <p>
                    The materials on DCPROSENS's website are provided on an 'as is' basis. DCPROSENS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    Further, DCPROSENS does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>4. Limitations</h2>
                <p>
                    In no event shall DCPROSENS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DCPROSENS's website, even if DCPROSENS or a DCPROSENS authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on DCPROSENS's website could include technical, typographical, or photographic errors. DCPROSENS does not warrant that any of the materials on its website are accurate, complete or current.
                    DCPROSENS may make changes to the materials contained on its website at any time without notice. However DCPROSENS does not make any commitment to update the materials.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>6. Links</h2>
                <p>
                    DCPROSENS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DCPROSENS of the site. Use of any such linked website is at the user's own risk.
                </p>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.2rem' }}>7. Modifications</h2>
                <p>
                    DCPROSENS may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
            </div>
        </div>
    );
}
