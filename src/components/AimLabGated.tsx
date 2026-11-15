'use client';

import { useAuth } from '@/components/AuthProvider';
import { useTrialCount } from '@/utils/useTrialCount';
import AimLab from '@/components/AimLab';
import PremiumGuard from '@/components/PremiumGuard';

const MAX_FREE_TRIALS = 3;
const STORAGE_KEY = 'dcprosens_trial_aim-lab';

export default function AimLabGated() {
    const { userData, loading } = useAuth();
    // null until hydration completes — see useTrialCount.
    const [trialsCount, setTrialsCount] = useTrialCount(STORAGE_KEY);

    const isPremium = userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'premium';
    const hasAltAccess = !!userData?.aimLabAccess;
    const isUnlocked = isPremium || hasAltAccess;

    const handleRoundFinish = () => {
        if (!isUnlocked) {
            // ?? 0 is unreachable in practice (the null guard below renders a
            // loading state before the game can fire this), but keeps the handler
            // correct on its own terms rather than leaning on render order.
            setTrialsCount((trialsCount ?? 0) + 1);
        }
    };

    if (loading || trialsCount === null) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: '#94a3b8' }}>
                Loading...
            </div>
        );
    }

    if (!isUnlocked && trialsCount >= MAX_FREE_TRIALS) {
        return (
            <PremiumGuard
                previewTitle="Aim Lab"
                altAccessField="aimLabAccess"
                altAccessPrice="$1"
                altAccessLabel="Aim Lab"
            >
                <AimLab />
            </PremiumGuard>
        );
    }

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
                    <span>⚡ <strong>Free Trial Active:</strong> You have <strong>{MAX_FREE_TRIALS - trialsCount} of {MAX_FREE_TRIALS}</strong> free rounds remaining.</span>
                    <span style={{ fontSize: '0.75rem', background: '#00ff9d', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 800 }}>
                        {MAX_FREE_TRIALS - trialsCount} LEFT
                    </span>
                </div>
            )}
            <AimLab onRoundFinish={handleRoundFinish} />
        </div>
    );
}
