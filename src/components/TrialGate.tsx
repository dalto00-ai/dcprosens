'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import PremiumGuard from '@/components/PremiumGuard';
import { readTrialCount, writeTrialCount } from '@/utils/useTrialCount';

interface TrialGateProps {
    /** Unique id for this tool's own trial counter — do not reuse across tools. */
    toolId: string;
    /** Shown in PremiumGuard's preview card once trials run out. */
    previewTitle: string;
    maxTrials?: number;
    altAccessField?: 'aimLabAccess';
    altAccessPrice?: string;
    altAccessLabel?: string;
    /** If true, the gate does NOT increment on page visit; child tool handles calibration counts on action */
    manualIncrement?: boolean;
    children: React.ReactNode;
}

/**
 * Free-trial gate: counts page visits (or manual tool actions when manualIncrement=true).
 * Falls through to PremiumGuard once the count is exhausted. Non-blocking for premium users.
 * 
 * CRITICAL FOR SEO & SSR:
 * Always renders children during static generation (!isMounted) so Googlebot indexes the
 * complete HTML markup of the tool rather than "Loading...".
 */
export default function TrialGate({
    toolId,
    previewTitle,
    maxTrials = 3,
    altAccessField,
    altAccessPrice,
    altAccessLabel,
    manualIncrement = false,
    children,
}: TrialGateProps) {
    const { userData, loading } = useAuth();
    const [trialsUsedBefore, setTrialsUsedBefore] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const isPremium = userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'premium';
    const hasAltAccess = !!(altAccessField && userData?.[altAccessField]);
    const isUnlocked = isPremium || hasAltAccess;
    const storageKey = `dcprosens_trial_${toolId}`;

    useEffect(() => {
        setIsMounted(true);
        if (loading) return;
        const priorCount = readTrialCount(storageKey);
        setTrialsUsedBefore(priorCount);

        // Only auto-increment if manualIncrement is false
        if (!manualIncrement && !isUnlocked && priorCount < maxTrials) {
            writeTrialCount(storageKey, priorCount + 1);
            setTrialsUsedBefore(priorCount + 1);
        }
    }, [loading, isUnlocked, storageKey, maxTrials, manualIncrement]);

    // CRITICAL FOR SEO & SSR (Next.js static export):
    // When rendering statically (!isMounted), we MUST render {children}
    // so Googlebot and search crawlers receive the complete HTML of the calculator/tool.
    if (!isMounted) {
        return <>{children}</>;
    }

    if (!isUnlocked && trialsUsedBefore >= maxTrials) {
        return (
            <PremiumGuard
                previewTitle={previewTitle}
                altAccessField={altAccessField}
                altAccessPrice={altAccessPrice}
                altAccessLabel={altAccessLabel}
            >
                {children}
            </PremiumGuard>
        );
    }

    // If manualIncrement is true, the tool itself manages the counter badge and increment on action.
    if (manualIncrement) {
        return <>{children}</>;
    }

    const remaining = Math.max(0, maxTrials - trialsUsedBefore);

    return (
        <div>
            {!isUnlocked && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    background: 'rgba(0, 255, 157, 0.08)',
                    border: '1px solid rgba(0, 255, 157, 0.25)',
                    borderRadius: '10px',
                    padding: '0.75rem 1.25rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.88rem',
                    color: '#e2e8f0',
                }}>
                    <span>⚡ <strong>Free Trial:</strong> {remaining} of {maxTrials} free uses remaining.</span>
                    <span style={{ fontSize: '0.75rem', background: '#00ff9d', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 800 }}>
                        {remaining} LEFT
                    </span>
                </div>
            )}
            {children}
        </div>
    );
}
