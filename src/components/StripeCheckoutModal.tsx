'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { trackEvent } from '@/lib/analytics';
import styles from './StripeCheckoutModal.module.css';

export type CheckoutPlanId =
  | 'monthly'
  | 'annual'
  | 'lifetime'
  | 'aimlab'
  | 'gta6-promo'
  | 'gta6-vip-monthly'
  | 'master-omnibus-18vol'
  | 'winback-50'
  | 'winback-lifetime'
  | 'creator-25'
  | 'creator-100'
  | 'sponsor-weekly';

const PLAN_PRICES: Record<CheckoutPlanId, number> = {
  monthly: 7.99,
  annual: 49.00,
  lifetime: 129,
  aimlab: 1,
  'gta6-promo': 7.99,
  'gta6-vip-monthly': 4.99,
  'master-omnibus-18vol': 39.99,
  'winback-50': 3.99,
  'winback-lifetime': 24.99,
  'creator-25': 9.99,
  'creator-100': 14.99,
  'sponsor-weekly': 49.00,
};

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: CheckoutPlanId;
  /** Adds a 3-day free trial (still collects a card; only valid for monthly/annual). */
  trial?: boolean;
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

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  trial,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const embeddedCheckoutInstance = useRef<StripeEmbeddedCheckout | null>(null);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    trackEvent('begin_checkout', {
      currency: 'USD',
      value: PLAN_PRICES[plan],
      items: [{ item_id: plan, item_name: `DCPROSENS Pro — ${plan}`, price: PLAN_PRICES[plan] }],
    });

    const initCheckout = async () => {
      try {
        // Load Stripe JS if not already present
        if (!window.Stripe) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Stripe SDK'));
            document.body.appendChild(script);
          });
        }

        if (!window.Stripe) {
          throw new Error('Stripe JS not available');
        }

        const stripe = window.Stripe(publishableKey);

        // Call Hostinger PHP endpoint for clientSecret
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://dcprosens.com';
        const idToken = user ? await user.getIdToken().catch(() => '') : '';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (idToken) {
          headers['Authorization'] = `Bearer ${idToken}`;
        }

        const response = await fetch('https://dcprosens.com/api/create-checkout-session.php', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            plan,
            origin: currentOrigin,
            email: user?.email || undefined,
            trial: !!trial,
            idToken: idToken || undefined,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with ${response.status}`);
        }

        const data = await response.json();
        if (!data.clientSecret) {
          throw new Error('No clientSecret returned from checkout API');
        }

        if (!isMounted) return;

        // Initialize embedded checkout
        const checkout = await stripe.initEmbeddedCheckout({
          clientSecret: data.clientSecret,
        });

        embeddedCheckoutInstance.current = checkout;

        if (checkoutRef.current) {
          checkoutRef.current.innerHTML = '';
          checkout.mount(checkoutRef.current);
        }

        setLoading(false);
      } catch (err) {
        console.error('Stripe Checkout Error:', err);
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'We could not open the payment page. Try the button below.';
          setError(message);
          setLoading(false);
          trackEvent('checkout_failed', { plan, error_message: message });
        }
      }
    };

    initCheckout();

    return () => {
      isMounted = false;
      if (embeddedCheckoutInstance.current) {
        try {
          embeddedCheckoutInstance.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        embeddedCheckoutInstance.current = null;
      }
    };
  }, [isOpen, plan, publishableKey, user, trial]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>
            {plan === 'aimlab'
              ? '🧪 Aim Lab'
              : plan === 'gta6-promo'
              ? '🌴 GTA VI Day-One Pack'
              : plan === 'creator-25' || plan === 'creator-100'
              ? '🎬 Viral Video Studio'
              : plan === 'sponsor-weekly'
              ? '📢 Featured Partner Slot'
              : '⚡ DCPROSENS Pro'}{' '}
            <span className={styles.badge}>
              {plan === 'aimlab'
                ? 'Standalone — $1'
                : plan === 'gta6-promo'
                ? 'Launch 50% OFF — $7.99'
                : plan === 'gta6-vip-monthly'
                ? trial
                  ? '3-Day Free Trial ($4.99/mo)'
                  : 'VIP Monthly — $4.99/mo'
                : plan === 'master-omnibus-18vol'
                ? 'All-In Lifetime + 18 Vols — $39.99'
                : plan === 'winback-50'
                ? '50% OFF Win-Back — $3.99/mo'
                : plan === 'winback-lifetime'
                ? '50% OFF Lifetime — $24.99'
                : plan === 'creator-25'
                ? '25 HD Video Credits — $9.99'
                : plan === 'creator-100'
                ? '100 HD Videos (50% OFF) — $14.99'
                : plan === 'sponsor-weekly'
                ? '7-Day Placement — $49'
                : trial
                ? '3-Day Free Trial'
                : plan === 'lifetime'
                ? 'Lifetime'
                : plan === 'annual'
                ? 'Annual (Save 33%)'
                : 'Monthly'}
            </span>
          </h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner} />
              <p>Preparing secure payment...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorContainer}>
              <p>⚠️ {error}</p>
              {!user ? (
                <a
                  href="/login/"
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--primary, #00ff9d)',
                    color: '#000',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Log In
                </a>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                      // Trigger re-mount
                      if (typeof window !== 'undefined') {
                        const directUrl =
                          plan === 'annual'
                            ? process.env.NEXT_PUBLIC_STRIPE_LINK_ANNUAL || 'https://buy.stripe.com/14AcN44IV9nQbVEfqA1ck02'
                            : process.env.NEXT_PUBLIC_STRIPE_LINK_MONTHLY || 'https://buy.stripe.com/6oUcN44IV9nQcZI4LW1ck00';
                        window.location.href = directUrl;
                      }
                    }}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'var(--primary, #00ff9d)',
                      color: '#000',
                      border: 'none',
                      fontWeight: 700,
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Continue to Secure Payment ⚡
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      padding: '0.6rem 1rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            ref={checkoutRef}
            id="stripe-embedded-checkout"
            style={{ display: loading || error ? 'none' : 'block', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
