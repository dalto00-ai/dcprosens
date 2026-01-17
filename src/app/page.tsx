import Converter from '@/components/Converter';
import ProSettings from '@/components/ProSettings';

export default function Home() {
  return (
    <div className="container page-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Pro Gaming <span className="text-gradient">Sensitivity</span><br />
          Converter Tool
        </h1>

        <p className="hero-subtitle">
          Enhance your aim with precision. Convert sensitivity across games,
          calculate eDPI, and optimize your setup.
        </p>

        <Converter />

        <ProSettings />
      </div>
    </div>
  );
}
