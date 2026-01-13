import Converter from '@/components/Converter';

export default function Home() {
  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <div style={{
        minHeight: 'calc(100vh - 200px)', /* Account for header/footer approximately */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '3rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          marginBottom: '1rem',
          lineHeight: 1.1,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          maxWidth: '800px'
        }}>
          Pro Gaming <span className="text-gradient">Sensitivity</span><br />
          Converter Tool
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Enhance your aim with precision. Convert sensitivity across games,
          calculate eDPI, and optimize your setup.
        </p>

        <Converter />
      </div>
    </div>
  );
}
