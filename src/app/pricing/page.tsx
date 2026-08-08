'use client';

import React, { useState } from 'react';
import { StripeCheckoutModal } from '@/components/StripeCheckoutModal';
import { useAuth } from '@/components/AuthProvider';
import ReviewsSection from '@/components/ReviewsSection';

export default function PricingPage() {
  const { userData } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime'>('monthly');
  const [wantsTrial, setWantsTrial] = useState(false);
  const trialAvailable = !userData?.trialUsedAt;

  const openCheckout = (plan: 'monthly' | 'annual' | 'lifetime') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div style={{
      backgroundColor: '#050507',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      padding: '6rem 1.5rem 8rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' }}>
        <span style={{
          background: 'linear-gradient(135deg, var(--primary, #00ff9d), #00d482)',
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
          💎 DCPROSENS Premium
        </span>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          background: 'linear-gradient(180deg, #ffffff 0%, #a2a2a8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Choose Your Precision Tier
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '1rem',
          lineHeight: 1.6
        }}>
          Unlock advanced sensitivity finders, pro database analytics, browser extension access, and optimized gaming guides.
        </p>
      </div>

      {trialAvailable && (
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '2rem',
          padding: '0.75rem 1.25rem',
          background: 'rgba(0, 255, 157, 0.06)',
          border: '1px solid rgba(0, 255, 157, 0.25)',
          borderRadius: '999px',
          fontSize: '0.85rem',
          color: '#cbd5e1',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={wantsTrial}
            onChange={(e) => setWantsTrial(e.target.checked)}
          />
          Start with a <strong style={{ color: 'var(--primary, #00ff9d)' }}>3-day free trial</strong> (card required, cancel anytime before it ends)
        </label>
      )}

      {/* PRICING GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '5rem'
      }}>
        {/* MONTHLY */}
        <div style={{
          backgroundColor: '#0b0b0f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#94a3b8' }}>Monthly Plan</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>Billed monthly. Cancel anytime.</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$4.99</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Universal Sensitivity Converter</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ 7-Step PSA Sensitivity Finder</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Pro Player Database & Compare</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Browser Extension Access</li>
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
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {wantsTrial && trialAvailable ? 'Start Free Trial' : 'Get Monthly Access'}
          </button>
        </div>

        {/* ANNUAL (BEST VALUE) */}
        <div style={{
          backgroundColor: '#0b0b0f',
          border: '2px solid var(--primary, #00ff9d)',
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
            backgroundColor: 'var(--primary, #00ff9d)',
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Annual Pass</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>$39.99 billed annually ($3.33/mo).</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary, #00ff9d)' }}>$3.33</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Everything in Monthly Plan</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Priority Support & Feature Requests</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Exclusive Pro Crosshair Presets</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Complete Ebook & Masterclass Guides</li>
          </ul>
          <button 
            onClick={() => openCheckout('annual')}
            style={{
              width: '100%',
              backgroundColor: 'var(--primary, #00ff9d)',
              border: 'none',
              color: '#000000',
              borderRadius: '8px',
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
          >
            {wantsTrial && trialAvailable ? 'Start Free Trial' : 'Get Annual Pass'}
          </button>
        </div>

        {/* LIFETIME */}
        <div style={{
          backgroundColor: '#0b0b0f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#94a3b8' }}>Lifetime</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>One-time payment. Yours forever.</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$149</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>once</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Everything in Annual Pass</li>
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
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Get Lifetime Access
          </button>
        </div>
      </div>

      <ReviewsSection page="pricing" />

      {/* STRIPE EMBEDDED CHECKOUT MODAL */}
      <StripeCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        trial={wantsTrial && trialAvailable && selectedPlan !== 'lifetime'}
      />
    </div>
  );
}
