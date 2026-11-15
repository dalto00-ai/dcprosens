'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$7.99</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Private Pro Community &amp; Hub Access</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Universal Sensitivity Converter (87 Games)</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ 7-Step PSA Sensitivity Finder</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Pro Player Database &amp; Compare</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Verified Hardware &amp; Latency Presets</li>
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
            Save 49% (Best Value)
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Annual VIP Pass</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>$49.00 billed annually ($4.08/mo).</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary, #00ff9d)' }}>$4.08</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Everything in Monthly Plan</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ VIP Pro Community Badge &amp; Lounge</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Priority VOD Review &amp; Coach Q&amp;A</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ Exclusive Pro Crosshair &amp; Telemetry Presets</li>
            <li style={{ fontSize: '0.9rem', color: '#ffffff' }}>✓ All 6 Esports Field Guides ($89 Value) Included</li>
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#94a3b8' }}>Lifetime Founder VIP</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>One-time payment. Yours forever.</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$129</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>once</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Everything in Annual Pass</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Permanent Founder VIP Status in Community</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ Never pay again, zero recurring fees</li>
            <li style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>✓ All future Pro tools &amp; guides unlocked forever</li>
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

      {/* VIP 1:1 CONSULTATION & 3-CLICK OPTIMIZER BANNER */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.08) 0%, rgba(0, 229, 255, 0.03) 100%)',
        border: '2px solid rgba(0, 255, 157, 0.3)',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        marginBottom: '5rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        boxShadow: '0 10px 40px rgba(0, 255, 157, 0.06)'
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(0, 255, 157, 0.15)',
            color: '#00ff9d',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem'
          }}>
            ⚡ VIP 1:1 Private Session &amp; Proprietary Engine
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            DCPROSENS 360° VIP Overhaul
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Want our engineers to calibrate your PC remotely? Includes our <strong>proprietary 3-click Optimizer Engine</strong> (MSI mode, DPC latency &amp; USB polling), personalized biomechanical sensitivity tuning, and all 6 Pro Field Guides.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <span>✓ 45-Min Remote Session</span>
            <span>✓ Grade A+ Audit Report</span>
            <span>✓ 100% Anti-Cheat Safe</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>$197 USD</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#00ff9d', lineHeight: 1 }}>$97 <span style={{ fontSize: '1rem', color: '#94a3b8' }}>once</span></div>
          </div>
          <Link
            href="/vip-overhaul/"
            style={{
              width: '100%',
              backgroundColor: '#00ff9d',
              color: '#050507',
              textAlign: 'center',
              padding: '0.85rem 1.75rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 0 25px rgba(0, 255, 157, 0.3)',
              transition: 'all 0.2s',
              display: 'inline-block'
            }}
          >
            Explore 360° Overhaul →
          </Link>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Limited slots per week</span>
        </div>
      </div>

      {/* WHY PAY — vs. what's typically out there for free */}
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '5rem' }}>
        <h2 style={{
          fontSize: '1.9rem',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '0.6rem',
          color: '#ffffff',
        }}>
          Why pay for this at all?
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.95rem',
          maxWidth: '620px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6,
        }}>
          Most sensitivity and aim-training sites online are free — and it shows. Here&apos;s what that usually means, compared to what a subscription here actually buys you.
        </p>

        <div style={{
          background: '#0b0b0f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {[
            {
              label: 'Ad load',
              free: 'Banner ads stacked around (and sometimes inside) the calculator itself',
              paid: 'Completely ad-free, on every tool, always',
            },
            {
              label: 'The sensitivity math',
              free: 'Generic multiplier tables, often the same numbers copy-pasted across many sites',
              paid: "Each game's real yaw constant (physical camera rotation per count), sourced and shown to you",
            },
            {
              label: 'Converter + aim training',
              free: 'Separate tools from separate companies — a sensitivity site, a different aim trainer, a different crosshair app',
              paid: 'One account: converter, Aim Lab training, crosshair creator and mouse database all connected to each other',
            },
            {
              label: 'Saved settings',
              free: "Stored in your browser only — gone if you clear cache or switch devices",
              paid: 'Synced to your account across desktop, Chrome Extension and the Android app',
            },
            {
              label: 'Pro player database',
              free: 'Often outdated by a season or more, rarely maintained',
              paid: 'Actively updated pro settings, cross-game comparisons',
            },
            {
              label: 'When something breaks',
              free: 'No support channel, or a community forum nobody answers',
              paid: 'A real support form that reaches a person, priority on annual and lifetime',
            },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr 1.4fr',
              gap: '1rem',
              padding: '1.1rem 1.5rem',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              alignItems: 'start',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{row.label}</div>
              <div style={{ fontSize: '0.82rem', color: '#71717a', lineHeight: 1.5 }}>
                <span style={{ opacity: 0.7 }}>✕</span> {row.free}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--primary, #00ff9d)' }}>✓</span> {row.paid}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.8rem',
          marginTop: '1.25rem',
        }}>
          To be clear: the sensitivity converter, pro player database, and core calculators stay free forever, for everyone, no account needed. This is about what the paid tier adds on top.
        </p>
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
