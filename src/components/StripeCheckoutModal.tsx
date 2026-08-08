'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';
import styles from './StripeCheckoutModal.module.css';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'monthly' | 'annual' | 'lifetime';
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

    // A payment must be tied to a logged-in account — otherwise there is no
    // way to know who to grant access to once the webhook confirms payment.
    if (!user) {
      setError('Please log in first, then come back to subscribe.');
      setLoading(false);
      return;
    }

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
        const response = await fetch('https://dcprosens.com/api/create-checkout-session.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan,
            origin: currentOrigin,
            userId: user.uid,
            email: user.email,
            trial: !!trial,
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
          const message = err instanceof Error ? err.message : 'Unable to load payment form. Please try again.';
          setError(message);
          setLoading(false);
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
            ⚡ DCPROSENS Pro <span className={styles.badge}>
              {trial ? '3-Day Free Trial' : plan === 'lifetime' ? 'Lifetime' : plan === 'annual' ? 'Annual (Save 33%)' : 'Monthly'}
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
              <p>Preparing secure checkout...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorContainer}>
              <p>⚠️ {error}</p>
              {!user ? (
                <a
                  href="/login"
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
                <button
                  onClick={onClose}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
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
