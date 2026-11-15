'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { EBOOKS_CATALOG, type EbookProduct } from '@/data/ebooksData';
import { useAuth } from '@/components/AuthProvider';

const BUNDLE_PLANS = [
  'master-omnibus-18vol',
  'ebook-bundle',
  'master-bundle',
  'complete-esports-master-bundle',
  'lifetime',
  'annual',
  'monthly',
  'vip-overhaul',
  'consultoria',
];

function resolveVolumeFromPlan(plan: string): number | null {
  const match = plan.match(/vol(\d+)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

function DownloadContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const bookParam = searchParams.get('book') || '';
  const { userData, loading: authLoading } = useAuth();

  const isProUser =
    userData?.subscriptionStatus === 'active' ||
    userData?.subscriptionStatus === 'premium';

  const [verifying, setVerifying] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [unlockedPlan, setUnlockedPlan] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (authLoading) return;

    // 1. Pro / VIP members automatically unlock the complete library
    if (isProUser) {
      setVerified(true);
      setUnlockedPlan('master-omnibus-18vol');
      setVerifying(false);
      return;
    }

    // 2. Check cached verified session in sessionStorage so page refresh works smoothly
    if (!sessionId) {
      try {
        const cachedPlan = sessionStorage.getItem('dc_verified_ebook_plan');
        if (cachedPlan) {
          setVerified(true);
          setUnlockedPlan(cachedPlan);
          setVerifying(false);
          return;
        }
      } catch {
        // ignore storage errors
      }
      setVerified(false);
      setVerifying(false);
      return;
    }

    // 3. Verify Stripe Checkout session_id against backend API
    let active = true;
    const verifySession = async () => {
      try {
        const res = await fetch(
          `/api/verify-ebook-session.php?session_id=${encodeURIComponent(sessionId)}`
        );
        const data = await res.json().catch(() => ({}));
        if (!active) return;

        if (res.ok && data.verified) {
          const plan = data.plan || bookParam || 'master-omnibus-18vol';
          setVerified(true);
          setUnlockedPlan(plan);
          if (data.customerEmail) setBuyerEmail(data.customerEmail);
          try {
            sessionStorage.setItem('dc_verified_ebook_plan', plan);
          } catch {
            // ignore
          }
        } else {
          setVerified(false);
          setErrorMsg(
            data.error ||
              'We could not verify an active purchase for this session.'
          );
        }
      } catch {
        if (!active) return;
        setVerified(false);
        setErrorMsg('Unable to reach payment verification server.');
      } finally {
        if (active) setVerifying(false);
      }
    };

    verifySession();
    return () => {
      active = false;
    };
  }, [sessionId, bookParam, isProUser, authLoading]);

  if (verifying || authLoading) {
    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '6rem 1.5rem',
          textAlign: 'center',
          color: '#e2e8f0',
        }}
      >
        <div
          style={{
            fontSize: '2.2rem',
            marginBottom: '1rem',
            color: '#00ff9d',
          }}
        >
          ⚡
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Verifying Your Order...
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Confirming your Stripe checkout session and preparing your DRM-free PDF field guides.
        </p>
      </div>
    );
  }

  // Gated state if visitor did not purchase and is not a Pro member
  if (!verified) {
    return (
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '5rem 1.5rem 6rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#0c101a',
            border: '1px solid rgba(255, 71, 87, 0.35)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            Verified Purchase Required
          </h1>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            {errorMsg ||
              'This download portal is reserved for customers who purchased a DCPROSENS Technical Field Guide or hold an active Pro Membership.'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/ebooks/"
              style={{
                background: '#00ff9d',
                color: '#07090e',
                fontWeight: 800,
                padding: '0.85rem 1.6rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Browse Esports Field Guides →
            </Link>
            <Link
              href="/login/"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
                fontWeight: 700,
                padding: '0.85rem 1.6rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Sign In to Pro Account
            </Link>
          </div>

          <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '1.75rem' }}>
            Already completed your purchase? Check your email receipt or contact{' '}
            <a href="mailto:support@dcprosens.com" style={{ color: '#00ff9d' }}>
              support@dcprosens.com
            </a>{' '}
            with your order receipt for instant assistance.
          </p>
        </div>
      </div>
    );
  }

  // Determine which books are unlocked for this verified session
  const isFullBundleUnlocked =
    isProUser ||
    BUNDLE_PLANS.includes(unlockedPlan) ||
    unlockedPlan.includes('bundle') ||
    unlockedPlan.includes('omnibus');

  const unlockedVol = resolveVolumeFromPlan(unlockedPlan);
  const individualVolumes = EBOOKS_CATALOG.filter((b) => b.vol > 0);

  const visibleBooks: EbookProduct[] = isFullBundleUnlocked
    ? individualVolumes
    : individualVolumes.filter(
        (b) =>
          (unlockedVol !== null && b.vol === unlockedVol) ||
          (bookParam && (b.id.includes(bookParam) || b.slug.includes(bookParam)))
      );

  // Fallback if a single-book plan didn't match a specific volume number
  const booksToRender =
    visibleBooks.length > 0 ? visibleBooks : individualVolumes.slice(0, 1);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Success Badge */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0, 255, 157, 0.15)',
            border: '2px solid #00ff9d',
            color: '#00ff9d',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#00ff9d',
            letterSpacing: '0.15em',
            marginBottom: '0.5rem',
          }}
        >
          ORDER CONFIRMED &bull; INSTANT DIGITAL DELIVERY
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2.4rem',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '0.75rem',
          }}
        >
          Thank You For Your Purchase!
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
          Your transaction is verified{buyerEmail ? ` for ${buyerEmail}` : ''}. Download your high-resolution DRM-free PDF field guide{isFullBundleUnlocked ? 's' : ''} below.
        </p>
      </div>

      {/* Download Section */}
      <div
        style={{
          background: '#0c101a',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>📥</span> Your Unlocked Downloads
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Master Omnibus Featured Download Card — only shown when Full Bundle / Omnibus is purchased */}
          {isFullBundleUnlocked && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.12) 0%, rgba(0, 229, 255, 0.08) 100%)',
                border: '1px solid rgba(0, 255, 157, 0.6)',
                borderRadius: '12px',
                padding: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 10px 30px rgba(0, 255, 157, 0.15)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#00ff9d',
                    fontWeight: 800,
                    marginBottom: '0.2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  ★ MASTER OMNIBUS &bull; ALL 18 VOLUMES &bull; 62 PAGES &bull; PDF
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.25rem',
                  }}
                >
                  The Complete 18-Volume Esports Field Guides Master Omnibus
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '580px' }}>
                  All 18 technical field guides combined into one definitive 62-page technical compendium, complete with calibration worksheets and cross-game yaw formulas.
                </div>
              </div>

              <a
                href="/ebooks/DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf"
                download="DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf"
                style={{
                  background: '#00ff9d',
                  color: '#07090e',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  padding: '0.85rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 20px rgba(0, 255, 157, 0.4)',
                }}
              >
                Download Master Omnibus (62P) ⬇
              </a>
            </div>
          )}

          {booksToRender.map((book) => (
            <div
              key={book.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0, 255, 157, 0.05)',
                border: '1px solid rgba(0, 255, 157, 0.4)',
                borderRadius: '10px',
                padding: '1.25rem 1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#00ff9d',
                    fontWeight: 700,
                    marginBottom: '0.2rem',
                  }}
                >
                  {book.badge} &bull; {book.pagesCount} PAGES &bull; PDF
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.2rem',
                  }}
                >
                  {book.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{book.subtitle}</div>
              </div>

              <a
                href={book.pdfPath}
                download
                style={{
                  background: '#00ff9d',
                  color: '#07090e',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  padding: '0.75rem 1.25rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 0 15px rgba(0, 255, 157, 0.3)',
                }}
              >
                Download PDF ⬇
              </a>
            </div>
          ))}
        </div>

        {!isFullBundleUnlocked && (
          <div
            style={{
              marginTop: '2rem',
              padding: '1.25rem',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(0, 255, 157, 0.35)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>
                Want all 18 Volumes in the 62-Page Master Omnibus?
              </strong>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Unlock the complete 18-volume technical compendium at 55% off.
              </span>
            </div>
            <Link
              href="/ebooks/"
              style={{
                color: '#00ff9d',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              View Master Suite →
            </Link>
          </div>
        )}
      </div>

      {/* Helpful Instructions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📄 PDF Reader</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Open these files in Adobe Acrobat, Apple Books, Google Drive, or any modern web browser.
          </p>
        </div>

        <div
          style={{
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>🖨️ Printable Worksheets</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Each guide includes a calibration worksheet. Print it out or keep it on your second monitor.
          </p>
        </div>

        <div
          style={{
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>💬 Need Support?</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Questions or issues? Reach our engineering team at <strong>support@dcprosens.com</strong>.
          </p>
        </div>
      </div>

      {/* Footer Return Link */}
      <div style={{ textAlign: 'center' }}>
        <Link
          href="/"
          style={{
            color: '#00e5ff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          ← Return to DCPROSENS Sensitivity Calculator
        </Link>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div style={{ color: '#fff', textAlign: 'center', padding: '5rem' }}>
          Loading your downloads...
        </div>
      }
    >
      <DownloadContent />
    </Suspense>
  );
}
