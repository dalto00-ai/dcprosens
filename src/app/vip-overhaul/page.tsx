'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TransparentCheckoutModal, CheckoutProduct } from '@/components/TransparentCheckoutModal';

export default function VipOverhaulPage() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const stripePaymentLink = "https://buy.stripe.com/00w7sK4IV0Rk3p83HS1ck0a";

  const consultoriaProduct: CheckoutProduct = {
    id: 'vip-overhaul-360',
    title: 'DCPROSENS 360° VIP Overhaul',
    price: 97,
    plan: 'vip-overhaul',
    subtitle: '1:1 Private Session, Optimizer Engine v1.0, Biomechanical Aim Tuning & All 6 Field Guides',
    badge: '1:1 VIP SESSION',
    fallbackUrl: stripePaymentLink,
  };

  const handleOpenCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      backgroundColor: '#050507',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '4rem 1.5rem 8rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '650px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 255, 157, 0.12) 0%, rgba(0, 229, 255, 0.04) 50%, transparent 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/pricing/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</Link>
          <span>/</span>
          <span style={{ color: '#00ff9d', fontWeight: 600 }}>DCPROSENS 360° VIP Overhaul</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(0, 255, 157, 0.08)',
            border: '1px solid rgba(0, 255, 157, 0.3)',
            color: '#00ff9d',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            ⚡ 1:1 CONSULTATION + EXCLUSIVE DCPROSENS ENGINE
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 60%, #64748b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Eliminate PC Input Lag &amp; Micro-Stutters.<br />
            <span style={{
              background: 'linear-gradient(90deg, #00ff9d 0%, #00e5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Play With Tier-1 Tournament Responsiveness.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            The definitive <strong>DCPROSENS</strong> consultation pairs a personalized 1:1 remote session with our <strong>proprietary 3-click optimization tool</strong>. Hardware interrupts, MSI mode, DPC latency unthrottling, and biomechanical sensitivity calibrated in 45 minutes.
          </p>

          {/* METRIC BADGES */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(16, 17, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00ff9d' }}>-78%</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>DPC Latency Overhead</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Zero kernel queue delay</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(16, 17, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00e5ff' }}>+34%</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>1% Low FPS Stability</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>No more mid-fight micro-stutters</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(16, 17, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>1:1</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>True Raw Mouse Input</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Zero interpolation or smoothing</div>
            </div>

            <div style={{
              backgroundColor: 'rgba(16, 17, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1.25rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#facc15' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Anti-Cheat Verified</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Vanguard / EAC / FaceIT safe</div>
            </div>
          </div>

          {/* HERO CTA BUTTON */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleOpenCheckout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                backgroundColor: '#00ff9d',
                color: '#050507',
                fontSize: '1.15rem',
                fontWeight: 800,
                padding: '1.1rem 2.8rem',
                borderRadius: '12px',
                border: 'none',
                textDecoration: 'none',
                boxShadow: '0 0 35px rgba(0, 255, 157, 0.35)',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 157, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 157, 0.35)';
              }}
            >
              🚀 BOOK MY 360° OVERHAUL — $97 USD
            </button>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              🔒 Secure checkout via Stripe • Limited slots per week • 7-Day Money-Back Guarantee
            </span>
          </div>
        </div>

        {/* THE 3-CLICK ENGINE SHOWCASE */}
        <div style={{
          backgroundColor: '#0b0b0f',
          border: '1px solid rgba(0, 255, 157, 0.25)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          marginBottom: '5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: '#00ff9d', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              PROPRIETARY TECHNOLOGY
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              The Power of DCPROSENS Optimizer Engine v1.0
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
              Stop running sketchy forum batch files. Our software automates tournament-level precision across 3 certified steps:
            </p>
          </div>

          {/* ENGINE INTERFACE MOCKUP */}
          <div style={{
            backgroundColor: '#101118',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            {/* Window Topbar */}
            <div style={{
              backgroundColor: '#161822',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                  DCPROSENS Optimizer Engine v1.0 | Esports Latency Architecture
                </span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                backgroundColor: 'rgba(0, 255, 157, 0.15)',
                color: '#00ff9d',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontWeight: 700
              }}>
                ADMIN OPERATOR ACTIVE
              </span>
            </div>

            {/* Window Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {/* Step 1 Button */}
                <div
                  onClick={() => setActiveStep(1)}
                  style={{
                    padding: '1.1rem 1.5rem',
                    borderRadius: '10px',
                    backgroundColor: activeStep === 1 ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${activeStep === 1 ? '#00e5ff' : 'rgba(255, 255, 255, 0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        [ STEP 1 ] CREATE RESTORE POINT (100% SAFETY SHIELD)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Creates an unshakeable Windows snapshot. Easily roll back anytime with a single click.
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#00e5ff', fontWeight: 700 }}>VERIFIED</span>
                </div>

                {/* Step 2 Button */}
                <div
                  onClick={() => setActiveStep(2)}
                  style={{
                    padding: '1.2rem 1.5rem',
                    borderRadius: '10px',
                    backgroundColor: activeStep === 2 ? '#00ff9d' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${activeStep === 2 ? '#00ff9d' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: activeStep === 2 ? '#050507' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚡</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                        [ STEP 2 ] ACTIVATE DCPROSENS CORE OPTIMIZATION (LATENCY &amp; DPC TWEAKS)
                      </div>
                      <div style={{ fontSize: '0.82rem', color: activeStep === 2 ? '#0a301f' : '#94a3b8', fontWeight: 500 }}>
                        Enables MSI Mode on GPU/USB, purges telemetry bloat, unthrottles UDP network packets, and locks 1:1 Raw Input.
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: activeStep === 2 ? '#050507' : 'rgba(0, 255, 157, 0.1)',
                    color: activeStep === 2 ? '#00ff9d' : '#00ff9d',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    fontWeight: 800
                  }}>
                    EXCLUSIVE ENGINE
                  </span>
                </div>

                {/* Step 3 Button */}
                <div
                  onClick={() => setActiveStep(3)}
                  style={{
                    padding: '1.1rem 1.5rem',
                    borderRadius: '10px',
                    backgroundColor: activeStep === 3 ? 'rgba(0, 255, 157, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${activeStep === 3 ? '#00ff9d' : 'rgba(255, 255, 255, 0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📊</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        [ STEP 3 ] GENERATE AUDIT &amp; BENCHMARK (GRADE A+ VERIFIED)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Instant process &amp; latency report exported right to your Desktop with tournament certification.
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#00ff9d', fontWeight: 700 }}>CERTIFIED</span>
                </div>
              </div>

              {/* Console Output Simulation */}
              <div style={{
                backgroundColor: '#050508',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '0.82rem',
                color: '#00ff9d',
                lineHeight: 1.6,
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div>[18:04:12] [DCPROSENS] Activating Message Signaled Interrupts (MSI Mode) on GPU and USB Controller...</div>
                <div>[18:04:13] [DCPROSENS] SmoothMouseXCurve &amp; SmoothMouseYCurve zeroed out (1:1 Raw Input Active).</div>
                <div>[18:04:14] [DCPROSENS] NetworkThrottlingIndex disabled. 100% CPU priority dedicated to competitive gaming pipeline.</div>
                <div style={{ color: '#00e5ff' }}>[18:04:15] [DCPROSENS] Audit finished: STATUS GRADE A+ (PRO TOURNAMENT READY)</div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON: AMATEUR TWEAKERS VS DCPROSENS */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#00ff9d', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              WHY PRO PLAYERS CHOOSE US
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.5rem' }}>
              Amateur Discord Tweakers vs. DCPROSENS Engineering
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {/* AMATEUR */}
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.03)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              padding: '2.5rem 2rem'
            }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ❌ Amateur Discord &ldquo;Tweakers&rdquo;
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                <li>❌ Gut vital Windows services breaking Windows Update &amp; Microsoft Store</li>
                <li>❌ Run sketchy registry packs with zero rollback mechanism</li>
                <li>❌ Cause random blue screens mid-tournament match</li>
                <li>❌ High risk of triggering anti-cheats (Vanguard / FaceIT flag)</li>
                <li>❌ Charge $80-$120 and disappear when issues emerge</li>
              </ul>
            </div>

            {/* DCPROSENS */}
            <div style={{
              backgroundColor: 'rgba(0, 255, 157, 0.04)',
              border: '2px solid #00ff9d',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              boxShadow: '0 10px 30px rgba(0, 255, 157, 0.08)'
            }}>
              <h3 style={{ color: '#00ff9d', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✅ Scientific DCPROSENS Engineering
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                <li>✅ <strong>Mandatory Safety Restore Point:</strong> Revert anytime with 1 click</li>
                <li>✅ <strong>Proprietary Engine:</strong> Clean, verified, tournament-tested code</li>
                <li>✅ <strong>Surgical Stability:</strong> Flattens DPC latency without breaking core OS security</li>
                <li>✅ <strong>100% Anti-Cheat Safe:</strong> Zero dll injection, zero risk of bans</li>
                <li>✅ <strong>7-Day Ironclad Guarantee:</strong> Noticeable improvement or 100% instant refund</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WHAT'S INCLUDED / OFFER STACK */}
        <div style={{
          backgroundColor: '#0b0b0f',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          marginBottom: '5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(0, 255, 157, 0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }} />

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#00ff9d', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              THE COMPLETE 360° PACKAGE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Everything Included in Your VIP Overhaul
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
              Over $400 of proven technical value delivered directly into your competitive setup:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👨‍💻</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>1:1 Remote Calibration Session</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                45-minute private Discord/AnyDesk session with a DCPROSENS optimization specialist.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $150.00</div>
            </div>

            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Optimizer Engine License</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Lifetime access to our proprietary 3-click optimization software suite.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $99.00</div>
            </div>

            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Biomechanical Aim &amp; Sens Tuning</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Calculation of your exact eDPI based on grip style (Palm/Claw/Fingertip) and pad dimensions.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $50.00</div>
            </div>

            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📚</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>All 6 Official DCPROSENS Guides</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Complete PDF master collection including Input Lag Playbook, Warm-up routines, and Biomechanics.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $89.94</div>
            </div>

            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👑</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lifetime VIP Community Status</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Direct access to private channels, Telemetry Vault, VIP Lounge, and ongoing update support.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $49.00/yr</div>
            </div>

            <div style={{ backgroundColor: '#101118', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📑</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Grade A+ Audit Certificate</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Official telemetry performance audit exported to your Desktop proving reduced latency overhead.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#00ff9d', fontWeight: 700 }}>Individual Value: $35.00</div>
            </div>
          </div>

          {/* PRICING BOX */}
          <div style={{
            backgroundColor: '#161822',
            border: '2px solid #00ff9d',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through', marginBottom: '0.25rem' }}>
              Total Market Value: $472.94 USD
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3.2rem', fontWeight: 900, color: '#00ff9d' }}>$97</span>
              <span style={{ fontSize: '1.2rem', color: '#cbd5e1', fontWeight: 600 }}>USD</span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>(One-Time Payment)</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '2rem' }}>
              Includes the private 1:1 session, proprietary engine, all 6 guides, and lifetime VIP status. Zero recurring fees.
            </p>

            <button
              onClick={handleOpenCheckout}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#00ff9d',
                color: '#050507',
                fontSize: '1.15rem',
                fontWeight: 800,
                padding: '1.1rem',
                borderRadius: '10px',
                border: 'none',
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(0, 255, 157, 0.3)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 45px rgba(0, 255, 157, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 157, 0.3)';
              }}
            >
              👉 BOOK NOW WITH TRANSPARENT CHECKOUT ($97 USD)
            </button>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
              <span>🛡️ 7-Day Guarantee</span>
              <span>•</span>
              <span>⚡ Instant Slot Booking</span>
              <span>•</span>
              <span>🎮 All FPS Titles Supported</span>
            </div>
          </div>
        </div>

        {/* BOTTOM FINAL CALL */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: 'rgba(0, 255, 157, 0.03)',
          border: '1px solid rgba(0, 255, 157, 0.2)',
          borderRadius: '20px'
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>
            Ready To Climb Ranks Without Hardware Bottlenecks?
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Stop letting micro-stutters and input delay cost you tournament clutches. Schedule your overhaul today.
          </p>
          <button
            onClick={handleOpenCheckout}
            style={{
              display: 'inline-block',
              backgroundColor: '#00ff9d',
              color: '#050507',
              fontSize: '1.1rem',
              fontWeight: 800,
              padding: '1rem 2.5rem',
              borderRadius: '10px',
              border: 'none',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0, 255, 157, 0.35)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          >
            SECURE MY 360° OVERHAUL ($97 USD)
          </button>
        </div>

      </div>

      {/* TRANSPARENT CHECKOUT MODAL */}
      <TransparentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={consultoriaProduct}
      />
    </div>
  );
}
