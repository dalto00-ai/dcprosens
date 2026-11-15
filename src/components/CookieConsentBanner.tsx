'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'dc_cookie_consent';

export default function CookieConsentBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = localStorage.getItem(STORAGE_KEY);
            if (!consent) {
                // Show banner if no prior choice was made
                setVisible(true);
            } else if (consent === 'accepted') {
                updateGoogleConsent(true);
            } else {
                updateGoogleConsent(false);
            }
        } catch {
            // localStorage not available
        }
    }, []);

    const updateGoogleConsent = (granted: boolean) => {
        if (typeof window !== 'undefined') {
            const win = window as unknown as {
                dataLayer?: unknown[];
                gtag?: (...args: unknown[]) => void;
            };
            win.dataLayer = win.dataLayer || [];
            if (!win.gtag) {
                win.gtag = function () {
                    // eslint-disable-next-line prefer-rest-params
                    win.dataLayer!.push(arguments);
                };
            }
            win.gtag('consent', 'update', {
                analytics_storage: granted ? 'granted' : 'denied',
                ad_storage: granted ? 'granted' : 'denied',
                ad_user_data: granted ? 'granted' : 'denied',
                ad_personalization: granted ? 'granted' : 'denied',
            });
        }
    };

    const handleChoice = (choice: 'accepted' | 'essential') => {
        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch {
            // ignore
        }
        updateGoogleConsent(choice === 'accepted');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <aside
            role="dialog"
            aria-label="Cookie Consent"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(10, 10, 16, 0.96)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(0, 255, 157, 0.25)',
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.6)',
                padding: '1.25rem 1.5rem',
                color: '#e2e8f0',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                lineHeight: 1.5,
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                }}
            >
                <div style={{ flex: '1 1 500px', minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>🍪</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>
                            Cookie &amp; Privacy Choices
                        </strong>
                    </div>
                    <p style={{ margin: 0, color: '#94a3b8' }}>
                        We use essential cookies to operate our gaming tools, and optional cookies to analyze traffic and personalize ads via Google AdSense &amp; DoubleClick DART. You can accept all or keep essential cookies only. Learn more in our{' '}
                        <Link
                            href="/privacy/"
                            style={{ color: 'var(--primary, #00ff9d)', textDecoration: 'underline' }}
                        >
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="/terms/"
                            style={{ color: 'var(--primary, #00ff9d)', textDecoration: 'underline' }}
                        >
                            Terms of Service
                        </Link>.
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        type="button"
                        onClick={() => handleChoice('essential')}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#cbd5e1',
                            padding: '0.55rem 1.1rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.color = '#cbd5e1';
                        }}
                    >
                        Essential Only
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChoice('accepted')}
                        style={{
                            background: 'var(--primary, #00ff9d)',
                            border: 'none',
                            color: '#05140d',
                            padding: '0.55rem 1.3rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 15px rgba(0, 255, 157, 0.3)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 157, 0.3)';
                        }}
                    >
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </aside>
    );
}

