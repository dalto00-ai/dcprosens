'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { StripeCheckoutModal } from './StripeCheckoutModal';
import LiveCalibrationPreview from './LiveCalibrationPreview';

interface PremiumGuardProps {
  children: React.ReactNode;
  /** Shown in the animated preview card's title bar, e.g. "PSA Calculator". */
  previewTitle?: string;
  /**
   * Name of a boolean field on the user's Firestore doc that, on its own,
   * also unlocks this specific tool — e.g. "aimLabAccess" for the $1
   * standalone Aim Lab purchase. Grants access to THIS tool only; it does
   * not imply a full Pro subscription.
   */
  altAccessField?: 'aimLabAccess';
  /** Price shown on the standalone unlock button, e.g. "$1". Required if altAccessField is set. */
  altAccessPrice?: string;
  /** Label for what the standalone purchase unlocks, e.g. "Aim Lab". */
  altAccessLabel?: string;
}

export default function PremiumGuard({
  children,
  previewTitle,
  altAccessField,
  altAccessPrice,
  altAccessLabel,
}: PremiumGuardProps) {
  const { user, userData, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime' | 'aimlab'>('monthly');

  const openCheckout = (plan: 'monthly' | 'annual' | 'lifetime' | 'aimlab') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const isPremium = userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'premium';
  const hasAltAccess = !!(altAccessField && userData?.[altAccessField]);

  // Renderiza spinner de carregamento
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        color: '#94a3b8'
      }}>
        <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Verifying subscription access...</div>
        <div style={{
          width: '30px',
          height: '30px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#00ff9d',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </div>
    );
  }

  // Full Pro subscription unlocks everything; the narrower altAccessField
  // (e.g. the $1 Aim Lab purchase) only unlocks the specific tool it was
  // bought for — both paths render the same way from here.
  if (user && (isPremium || hasAltAccess)) {
    return <>{children}</>;
  }

  // Caso contrário, renderiza o conteúdo desfocado (SEO amigável) + cards de preços no rodapé
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Container desfocado — `inert` bloqueia clique, teclado e foco em toda a
          subárvore no nível do navegador, então funciona mesmo que algum
          componente filho tenha seus próprios listeners globais ou CSS que
          sobrescreva pointer-events. Conteúdo continua presente no DOM/HTML
          de propósito, para indexação (SEO). */}
      <div
        inert={true}
        style={{
          filter: 'blur(5px)',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.65,
          transition: 'filter 0.3s ease'
        }}>
        {children}
      </div>

      {/* Bloqueador visual e Convite de Compra */}
      <div style={{
        marginTop: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#050507',
        borderRadius: '16px',
        boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '600px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #00ff9d, #00d482)',
            color: '#000000',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            🔒 PRO TOOL LOCKED
          </span>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '1rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #a2a2a8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Unlock Premium Access
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            This is a premium feature. Subscribe to one of the tiers below to get instant, unlimited access to all calculators, finders, and setups.
          </p>
        </div>

        <LiveCalibrationPreview title={previewTitle} />

        {/* PRICING GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {/* MONTHLY */}
          <div style={{
            backgroundColor: '#0b0b0f',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#94a3b8' }}>Monthly Plan</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>Billed monthly. Cancel anytime.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>$4.99</span>
              <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Universal Sensitivity Converter</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ 7-Step PSA Sensitivity Finder</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Pro Player Database & Compare</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Browser Extension Download</li>
            </ul>
            <button
              onClick={() => openCheckout('monthly')}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.75rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Get Monthly Access
            </button>
          </div>

          {/* ANNUAL (BEST VALUE) */}
          <div style={{
            backgroundColor: '#0b0b0f',
            border: '2px solid #00ff9d',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0, 255, 157, 0.05)'
          }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#00ff9d',
              color: '#000000',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Save 33% (Best Value)
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Annual Plan</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>$39.99 billed annually ($3.33/mo).</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00ff9d' }}>$3.33</span>
              <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Everything in Monthly</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Priority updates & support</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Exclusive Pro crosshair presets</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Complete ebook & masterclass guides</li>
            </ul>
            <button
              onClick={() => openCheckout('annual')}
              style={{
                width: '100%',
                backgroundColor: '#00ff9d',
                border: 'none',
                color: '#000000',
                borderRadius: '8px',
                padding: '0.75rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'filter 0.2s'
              }}
            >
              Get Annual Access
            </button>
          </div>

          {/* LIFETIME */}
          <div style={{
            backgroundColor: '#0b0b0f',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#94a3b8' }}>Lifetime</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>One-time payment. Yours forever.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>$149</span>
              <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>once</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Everything in Annual</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Never pay again, no renewals</li>
              <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ All future Pro tools included</li>
            </ul>
            <button
              onClick={() => openCheckout('lifetime')}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.75rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Get Lifetime Access
            </button>
          </div>
        </div>

        {altAccessField && (
          <div style={{
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            maxWidth: '480px',
          }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
              Only want {altAccessLabel || 'this tool'}? Skip the subscription.
            </p>
            <button
              onClick={() => openCheckout('aimlab')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                borderRadius: '8px',
                padding: '0.65rem 1.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Unlock {altAccessLabel || 'this tool'} only — {altAccessPrice || '$1'} one-time
            </button>
          </div>
        )}
      </div>

      <StripeCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
