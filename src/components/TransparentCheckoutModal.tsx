'use client';

import React, { useEffect, useState, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export interface CheckoutProduct {
  id: string;
  title: string;
  price: number;
  plan: string;
  subtitle?: string;
  badge?: string;
  fallbackUrl?: string;
}

interface TransparentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CheckoutProduct | null;
}

interface StripeEmbeddedCheckout {
  mount: (el: HTMLElement) => void;
  destroy: () => void;
}

interface StripeJsInstance {
  initEmbeddedCheckout: (options: { clientSecret: string }) => Promise<StripeEmbeddedCheckout>;
}

declare global {
  interface Window {
    Stripe?: (key: string) => StripeJsInstance;
  }
}

export const TransparentCheckoutModal: React.FC<TransparentCheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const checkoutContainerRef = useRef<HTMLDivElement>(null);
  const embeddedInstance = useRef<StripeEmbeddedCheckout | null>(null);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

  useEffect(() => {
    if (!isOpen || !product) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    trackEvent('begin_checkout', {
      currency: 'USD',
      value: product.price,
      items: [{ item_id: product.id, item_name: product.title, price: product.price }],
    });

    const loadAndInit = async () => {
      try {
        // 1. Ensure Stripe.js is loaded
        if (!window.Stripe) {
          await new Promise<void>((resolve, reject) => {
            const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/"]');
            if (existingScript) {
              existingScript.addEventListener('load', () => resolve());
              existingScript.addEventListener('error', () => reject(new Error('Failed to load Stripe SDK')));
              return;
            }
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Stripe SDK'));
            document.body.appendChild(script);
          });
        }

        if (!window.Stripe) {
          throw new Error('Stripe JS is unavailable');
        }

        const stripe = window.Stripe(publishableKey);

        // 2. Request clientSecret from PHP backend
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://dcprosens.com';
        const res = await fetch('https://dcprosens.com/api/create-checkout-session.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: product.plan,
            title: product.title,
            origin: currentOrigin,
          }),
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || `Server responded with ${res.status}`);
        }

        const data = await res.json();
        if (!data.clientSecret) {
          throw new Error('No clientSecret received from Stripe session API');
        }

        if (!isMounted) return;

        // 3. Initialize Stripe Embedded Checkout
        const checkout = await stripe.initEmbeddedCheckout({
          clientSecret: data.clientSecret,
        });

        embeddedInstance.current = checkout;

        if (checkoutContainerRef.current) {
          checkoutContainerRef.current.innerHTML = '';
          checkout.mount(checkoutContainerRef.current);
        }

        setLoading(false);
      } catch (err: unknown) {
        console.error('Transparent Checkout Error:', err);
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Could not initialize transparent payment frame.';
          setError(msg);
          setLoading(false);
        }
      }
    };

    loadAndInit();

    return () => {
      isMounted = false;
      if (embeddedInstance.current) {
        try {
          embeddedInstance.current.destroy();
        } catch {
          // ignore destroy errors
        }
        embeddedInstance.current = null;
      }
    };
  }, [isOpen, product, publishableKey]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '94vh',
          backgroundColor: '#0c0d14',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 157, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: '#12141f',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>⚡</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  DCPROSENS
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(0, 255, 157, 0.12)',
                    color: '#00ff9d',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Transparent Checkout
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {product.title} • <strong style={{ color: '#00ff9d' }}>${product.price.toFixed(2)} USD</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.25rem',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            ✕
          </button>
        </div>

        {/* Security Bar */}
        <div
          style={{
            padding: '0.5rem 1.75rem',
            backgroundColor: 'rgba(0, 255, 157, 0.04)',
            borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#00ff9d' }}>🔒</span>
            <span>256-Bit End-to-End SSL Encryption</span>
          </div>
          <div style={{ color: '#64748b' }}>
            Securely processed via <strong>Stripe</strong>
          </div>
        </div>

        {/* Modal Body / Embedded Checkout */}
        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
            minHeight: '440px',
            position: 'relative',
          }}
        >
          {loading && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '3px solid rgba(0, 255, 157, 0.15)',
                  borderTopColor: '#00ff9d',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 600 }}>
                Loading secure checkout...
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Preparing instant seamless payment
              </div>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {error && (
            <div
              style={{
                padding: '2rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🛡️</span>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: '1rem' }}>
                Secure Direct Checkout
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '440px', margin: 0 }}>
                Click below to complete your instant payment for <strong>{product.title}</strong> in a verified secure window:
              </p>

              <a
                href={product.fallbackUrl || `https://buy.stripe.com/00w7sK4IV0Rk3p83HS1ck0a`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#00ff9d',
                  color: '#050507',
                  fontWeight: 800,
                  fontSize: '1rem',
                  padding: '0.9rem 2rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 0 25px rgba(0, 255, 157, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                Pay Now with Stripe (${product.price.toFixed(2)}) →
              </a>
            </div>
          )}

          {/* Stripe Embedded Mount Element */}
          <div
            ref={checkoutContainerRef}
            style={{
              display: loading || error ? 'none' : 'block',
              width: '100%',
              minHeight: '400px',
            }}
          />
        </div>

        {/* Bottom Guarantee Footer */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#090a0f',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontSize: '0.72rem',
            color: '#64748b',
          }}
        >
          <span>✓ Instant Access</span>
          <span>•</span>
          <span>✓ 7-Day Money-Back Guarantee</span>
          <span>•</span>
          <span>✓ Dedicated Support</span>
        </div>
      </div>
    </div>
  );
};
