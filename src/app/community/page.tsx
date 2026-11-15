'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { StripeCheckoutModal, type CheckoutPlanId } from '@/components/StripeCheckoutModal';
import styles from './Community.module.css';

interface CommunityPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  badge: 'pro' | 'founder' | 'coach';
  channel: string;
  game: string;
  timeAgo: string;
  replies: number;
  upvotes: number;
}

const SEED_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'PSA Method Telemetry: Why 44.5cm/360 is the median sweet spot for Radiant/Immortal players',
    excerpt:
      'After auditing 240 player calibration sheets from our Field Guide Vol 01, here is why extreme low sens (65cm+) causes micro-flick fatigue in close-quarter retakes and why 40-48cm/360 yields the lowest standard deviation in target tracking.',
    author: 'Coach Artyom',
    badge: 'coach',
    channel: 'aim',
    game: 'Valorant / CS2',
    timeAgo: '2 hours ago',
    replies: 28,
    upvotes: 142,
  },
  {
    id: 'post-2',
    title: 'DPC Latency Deep-Dive: Isolating nvlddmkm.sys driver spikes on RTX 40/50 series with MSI Mode',
    excerpt:
      'Step-by-step telemetry audit reducing GPU driver ISR interrupt execution latency from 450μs down to 32μs on Windows 11 24H2. Interrupt steering script attached in the Telemetry Vault.',
    author: 'Null_Lag',
    badge: 'founder',
    channel: 'latency',
    game: 'PC Kernel Tuning',
    timeAgo: '5 hours ago',
    replies: 35,
    upvotes: 219,
  },
  {
    id: 'post-3',
    title: 'Rotational Aim Assist Thresholds in BO6 & Warzone: Left-stick deflection limit for 100% lock',
    excerpt:
      'Engine verification confirms stationary right-stick aim receives 0% rotational assist. You must maintain minimum 12% left-stick analog input to engage the rotational bubble continuously.',
    author: 'Viper_FPS',
    badge: 'pro',
    channel: 'controller',
    game: 'Call of Duty / Apex',
    timeAgo: '8 hours ago',
    replies: 41,
    upvotes: 184,
  },
  {
    id: 'post-4',
    title: 'Artisan Zero vs Type-99 vs Saturn Pro: 60-day friction matrix with glass vs PTFE skates',
    excerpt:
      'We measured static friction (μs) and dynamic friction (μd) before and after 200 hours of scrims. Poron xsoft shows a 14% stopping power increase when pressed, but glass skates glaze Cordura weave prematurely.',
    author: 'MatrixReview',
    badge: 'founder',
    channel: 'hardware',
    game: 'Hardware Lab',
    timeAgo: '1 day ago',
    replies: 19,
    upvotes: 97,
  },
  {
    id: 'post-5',
    title: 'VCT Champions 2026 Angle Geometry: How Aspas slices peeks without micro-overaiming',
    excerpt:
      'Frame-by-frame mechanical breakdown of crosshair pre-elevation on Haven A-Long. Slicing angle arcs mathematically eliminates the need for reactive flick corrections.',
    author: 'TacticalEye',
    badge: 'coach',
    channel: 'vod',
    game: 'Valorant VOD',
    timeAgo: '2 days ago',
    replies: 31,
    upvotes: 165,
  },
  {
    id: 'post-6',
    title: 'High-ELO Duo & Scrim Matchmaking (Faceit Level 10 / Premier 25k+ EU & NA)',
    excerpt:
      'Verified members thread to team up with non-toxic, calibrated players. Post your discord tag, server region, and sensitivity / roles below.',
    author: 'Spectre_CS',
    badge: 'pro',
    channel: 'lounge',
    game: 'Faceit / Premier',
    timeAgo: '3 days ago',
    replies: 64,
    upvotes: 89,
  },
  {
    id: 'post-7',
    title: '🌴 GTA VI Leonida Syndicate: PS5 & Xbox Free-Aim Heist Squads (Zero Auto-Aim Lobbies)',
    excerpt:
      'Recruiting calibrated console players running 3%–6% DualSense/Xbox deadzones and 85%+ drive-by camera for Day-One Vice City missions and clean Free-Aim PVP.',
    author: 'Dalto Outlier',
    badge: 'founder',
    channel: 'gta6',
    game: 'GTA VI (PS5 / Xbox)',
    timeAgo: '1 hour ago',
    replies: 52,
    upvotes: 248,
  },
  {
    id: 'post-8',
    title: 'GTA VI 120 MPH Drive-By & Car Meet Crew Roster (NA / EU / BR Regions)',
    excerpt:
      'Drop your PSN / Xbox Gamertag, preferred role (Driver, Gunner, Sniper OverWatch), and verified DCPROSENS Command Center setup below.',
    author: 'ViceSyndicate',
    badge: 'coach',
    channel: 'gta6',
    game: 'GTA VI Crews',
    timeAgo: '4 hours ago',
    replies: 39,
    upvotes: 176,
  },
];

const CHANNELS = [
  { id: 'all', label: 'All Discussions', icon: '🌐' },
  { id: 'gta6', label: 'GTA VI Leonida Syndicate', icon: '🌴' },
  { id: 'aim', label: 'Aim Mechanics & Drills', icon: '🎯' },
  { id: 'latency', label: 'Zero-Latency & PC Tuning', icon: '⚡' },
  { id: 'controller', label: 'Controller & Aim Assist', icon: '🕹️' },
  { id: 'hardware', label: 'Mousepads & Skates Matrix', icon: '🖱️' },
  { id: 'vod', label: 'Pro VOD Reviews', icon: '🏆' },
  { id: 'lounge', label: 'VIP Lounge & LFG', icon: '💬' },
];

export default function CommunityPage() {
  const { user, userData } = useAuth();
  const [activeChannel, setActiveChannel] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlanId>('gta6-vip-monthly');
  const [showWinbackOffer, setShowWinbackOffer] = useState(false);
  const [newPostModal, setNewPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postChannel, setPostChannel] = useState('gta6');
  const [posts, setPosts] = useState<CommunityPost[]>(SEED_POSTS);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Owner Admin Control state
  const [adminTargetUid, setAdminTargetUid] = useState('');
  const [adminStatusMsg, setAdminStatusMsg] = useState<string | null>(null);
  const [adminBusy, setAdminBusy] = useState(false);

  // Check if member has paid membership
  const isMember =
    userData?.subscriptionStatus === 'active' ||
    userData?.subscriptionStatus === 'pro' ||
    userData?.subscriptionStatus === 'lifetime';

  const isExMember =
    !isMember &&
    Boolean(userData?.stripeSubscriptionId || userData?.trialUsedAt || userData?.subscriptionPlan === 'free');

  const isOwnerAdmin =
    user?.email?.toLowerCase() === 'dalto00@gmail.com' ||
    userData?.subscriptionPlan === 'admin';

  const filteredPosts =
    activeChannel === 'all'
      ? posts
      : posts.filter((p) => p.channel === activeChannel);

  const handleOpenCheckout = (plan: CheckoutPlanId) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleAdminAction = async (action: 'grant_lifetime' | 'grant_vip_monthly' | 'grant_video_100' | 'revoke_access') => {
    if (!user || !adminTargetUid.trim()) return;
    setAdminBusy(true);
    setAdminStatusMsg(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('https://dcprosens.com/api/admin-member-control.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          targetUid: adminTargetUid.trim(),
          action,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAdminStatusMsg(`⚠️ ${data.error || 'Request failed'}`);
      } else {
        setAdminStatusMsg(`✓ Applied "${action}" to UID ${data.targetUid}`);
      }
    } catch {
      setAdminStatusMsg('⚠️ Network error reaching admin endpoint');
    } finally {
      setAdminBusy(false);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: postTitle.trim(),
      excerpt: postContent.trim().substring(0, 220) + (postContent.length > 220 ? '...' : ''),
      author: userData?.displayName || user?.displayName || 'Pro Member',
      badge: userData?.subscriptionStatus === 'lifetime' ? 'founder' : 'pro',
      channel: postChannel,
      game: 'Community Thread',
      timeAgo: 'Just now',
      replies: 0,
      upvotes: 1,
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setNewPostModal(false);
  };

  const referralCode = user?.uid ? user.uid.substring(0, 8) : 'squad';
  const referralUrl = `https://dcprosens.com/community/?ref=${referralCode}`;

  const handleCopyReferral = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(referralUrl);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2500);
    }
  };

  return (
    <div className={styles.communityWrapper}>
      <div className={styles.container}>
        {/* Header Block */}
        <header className={styles.headerBlock}>
          <span className={styles.vipBadge}>PRO ESPORTS COMMUNITY &bull; MEMBERS ONLY</span>
          <h1 className={styles.headline}>The Precision Aim &amp; Telemetry Hub</h1>
          <p className={styles.subheadline}>
            A dedicated, zero-noise sanctuary for competitive FPS players. Discuss tournament telemetry,
            share verified hardware friction ratings, debug sub-millisecond PC latency, and run pro VOD analyses.
          </p>
        </header>

        {/* OWNER ADMIN CONTROL PANEL (VISIBLE ONLY TO ADMIN) */}
        {isOwnerAdmin && (
          <section
            style={{
              marginBottom: '1.75rem',
              padding: '1.25rem 1.5rem',
              borderRadius: '14px',
              background: 'rgba(112, 0, 255, 0.08)',
              border: '1px solid rgba(192, 132, 252, 0.45)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem' }}>
              <div>
                <strong style={{ color: '#e9d5ff', fontSize: '1rem' }}>👑 Owner Member Control Panel</strong>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  Grant permanent Lifetime VIP, monthly VIP, 100 Video Studio credits, or revoke access for any Firebase User UID.
                </div>
              </div>
              {adminStatusMsg && (
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00ff9d' }}>{adminStatusMsg}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                value={adminTargetUid}
                onChange={(e) => setAdminTargetUid(e.target.value)}
                placeholder="Paste target Firebase User UID..."
                style={{
                  flex: '1 1 240px',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  background: '#07090e',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontSize: '0.85rem',
                }}
              />
              <button
                type="button"
                disabled={adminBusy || !adminTargetUid.trim()}
                onClick={() => handleAdminAction('grant_lifetime')}
                style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', border: 'none', background: '#00ff9d', color: '#000', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Grant Lifetime VIP
              </button>
              <button
                type="button"
                disabled={adminBusy || !adminTargetUid.trim()}
                onClick={() => handleAdminAction('grant_vip_monthly')}
                style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Grant Monthly VIP
              </button>
              <button
                type="button"
                disabled={adminBusy || !adminTargetUid.trim()}
                onClick={() => handleAdminAction('grant_video_100')}
                style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.45)', background: 'transparent', color: '#38bdf8', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                +100 Video Credits
              </button>
              <button
                type="button"
                disabled={adminBusy || !adminTargetUid.trim()}
                onClick={() => handleAdminAction('revoke_access')}
                style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(248, 113, 113, 0.5)', background: 'transparent', color: '#f87171', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Revoke Access
              </button>
            </div>
          </section>
        )}

        {/* Channel Navigation Tabs */}
        <nav className={styles.channelNav} aria-label="Community Channels">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              className={`${styles.channelBtn} ${activeChannel === ch.id ? styles.activeChannel : ''}`}
              onClick={() => setActiveChannel(ch.id)}
            >
              <span>{ch.icon}</span>
              <span>{ch.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Layout Grid */}
        <div className={styles.mainLayout}>
          {/* Main Feed Column */}
          <main>
            <div className={styles.feedHeader}>
              <h2 className={styles.feedTitle}>
                {CHANNELS.find((c) => c.id === activeChannel)?.label || 'Discussions'}
              </h2>
              {isMember ? (
                <button
                  className={styles.newPostBtn}
                  onClick={() => setNewPostModal(true)}
                >
                  <span>+</span> Start New Discussion
                </button>
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#00ff9d', fontFamily: "'JetBrains Mono', monospace" }}>
                  🔒 VIP ACCESS REQUIRED TO POST
                </span>
              )}
            </div>

            {/* If Member: Unlocked Interactive Posts */}
            {isMember ? (
              <div className={styles.postsList}>
                {filteredPosts.map((post) => (
                  <article key={post.id} className={styles.postCard}>
                    <div className={styles.postTopRow}>
                      <div className={styles.authorMeta}>
                        <div className={styles.avatar}>
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <span className={styles.authorName}>{post.author}</span>
                        {post.badge === 'founder' && <span className={styles.badgeFounder}>FOUNDER VIP</span>}
                        {post.badge === 'coach' && <span className={styles.badgeCoach}>AIM COACH</span>}
                        {post.badge === 'pro' && <span className={styles.badgePro}>PRO MEMBER</span>}
                      </div>
                      <span className={styles.postTime}>{post.timeAgo}</span>
                    </div>

                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>

                    <div className={styles.postTagsRow}>
                      <span className={styles.tagPill}>{post.game}</span>
                      <div className={styles.postStatsRow}>
                        <span>▲ {post.upvotes} upvotes</span>
                        <span>💬 {post.replies} replies</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* If NOT Member: High-Converting Paywall Gate Overlay */
              <div className={styles.paywallOverlay}>
                {/* Blurred Content Background */}
                <div className={styles.blurredContent}>
                  {SEED_POSTS.slice(0, 3).map((post) => (
                    <article key={post.id} className={styles.postCard} style={{ marginBottom: '1.25rem' }}>
                      <div className={styles.postTopRow}>
                        <div className={styles.authorMeta}>
                          <div className={styles.avatar}>{post.author.charAt(0)}</div>
                          <span className={styles.authorName}>{post.author}</span>
                        </div>
                      </div>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                    </article>
                  ))}
                </div>

                {/* Central Paywall Gate Card */}
                <div className={styles.paywallGateCard}>
                  <div className={styles.lockIconCircle}>🔒</div>
                  <h2 className={styles.gateH2}>Unlock The DCPROSENS Pro Hub</h2>
                  <p className={styles.gateDesc}>
                    Gain direct access to private telemetry discussions, pro coach reviews, zero-latency scripts,
                    exclusive gear matrices, and high-ELO teammates. No Discord clutter — 100% native and private.
                  </p>

                  {/* 3 Competitive Pricing Options */}
                  <div className={styles.gatePricingGrid}>
                    {/* Monthly Option */}
                    <div className={styles.pricingOption}>
                      <div>
                        <div className={styles.planName}>GTA VI &amp; FPS Monthly</div>
                        <div className={styles.planBilling}>Billed monthly • Cancel anytime</div>
                        <div className={styles.planPrice}>
                          $4.99 <span>/mo</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout('gta6-vip-monthly')}
                        className={styles.altCheckoutBtn}
                      >
                        Join Monthly ($4.99)
                      </button>
                    </div>

                    {/* Annual VIP Option (Featured) */}
                    <div className={`${styles.pricingOption} ${styles.featuredOption}`}>
                      <span className={styles.popularPill}>SAVE 49% • BEST VALUE</span>
                      <div>
                        <div className={styles.planName}>Annual VIP Pass</div>
                        <div className={styles.planBilling}>$49.00 billed annually ($4.08/mo)</div>
                        <div className={styles.planPrice}>
                          $4.08 <span>/mo</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout('annual')}
                        className={styles.checkoutBtn}
                      >
                        Claim Annual VIP ⚡
                      </button>
                    </div>

                    {/* Lifetime Founder Option */}
                    <div className={styles.pricingOption}>
                      <div>
                        <div className={styles.planName}>Lifetime Founder + 18 Vols</div>
                        <div className={styles.planBilling}>One-time payment • Yours forever</div>
                        <div className={styles.planPrice}>
                          $39.99 <span>once</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout('master-omnibus-18vol')}
                        className={styles.altCheckoutBtn}
                      >
                        Get Lifetime ($39.99)
                      </button>
                    </div>
                  </div>

                  {/* AUTOMATED 50% OFF RETENTION / WIN-BACK OFFER */}
                  {(isExMember || showWinbackOffer) ? (
                    <div
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.12), rgba(112, 0, 255, 0.14))',
                        border: '1px solid rgba(0, 255, 157, 0.45)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        marginBottom: '1.25rem',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#00ff9d', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        🔥 Exclusive 50% OFF Retention Deal Unlocked
                      </div>
                      <p style={{ margin: '0 0 0.75rem', fontSize: '0.86rem', color: '#e2e8f0' }}>
                        Keep your VIP Syndicate role, GTA VI Free-Aim squads, and unlimited Viral Studio access at half price:
                      </p>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenCheckout('winback-50')}
                          className={styles.checkoutBtn}
                          style={{ width: 'auto', padding: '0.55rem 1rem', fontSize: '0.84rem' }}
                        >
                          Reactivate for $3.99/mo (50% OFF)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenCheckout('winback-lifetime')}
                          className={styles.altCheckoutBtn}
                          style={{ width: 'auto', padding: '0.55rem 1rem', fontSize: '0.84rem' }}
                        >
                          Lock Lifetime Forever for $24.99
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginBottom: '1.1rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowWinbackOffer(true)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                        }}
                      >
                        Former member or looking for a launch discount? Claim 50% OFF retention pricing
                      </button>
                    </div>
                  )}

                  {/* Competitor Comparison Note */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span>Aimlabs+: <strong>$12.99/mo</strong></span>
                    <span>ProGuides: <strong>$9.99/mo</strong></span>
                    <span style={{ color: '#00ff9d' }}>DCPROSENS: <strong>$7.99/mo ($4.08/mo Annual)</strong></span>
                  </div>

                  {/* Trust Badges */}
                  <div className={styles.paywallTrustRow}>
                    <span>🔒 256-Bit Stripe Anti-Fraud Protection</span>
                    <span>🛡️ 14-Day 100% Money-Back Guarantee</span>
                    <span>⚡ Instant Unlock Post-Checkout</span>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Share / Referral Squad Box */}
            <div className={styles.widgetBox} style={{ border: '1px solid rgba(0, 255, 157, 0.35)', background: 'linear-gradient(180deg, rgba(0, 255, 157, 0.05) 0%, rgba(5, 7, 12, 0.95) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <h4 className={styles.widgetTitle} style={{ margin: 0, color: '#00ff9d' }}>
                  <span>🎁</span> Invite Squad &amp; Share
                </h4>
                <span style={{ fontSize: '0.68rem', background: '#00ff9d', color: '#05070c', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Reward
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                Share your personal squad link. Friends receive a <strong>guest preview</strong>, but <strong>must purchase membership</strong> to unlock full discussions &amp; downloads.
              </p>
              <div style={{ background: 'rgba(0, 255, 157, 0.08)', border: '1px dashed rgba(0, 255, 157, 0.3)', borderRadius: '6px', padding: '0.5rem 0.65rem', marginBottom: '0.75rem', fontSize: '0.74rem', color: '#94a3b8' }}>
                💎 <strong>Squad Bonus:</strong> Earn <strong>1 Free Month of VIP</strong> for each referral who joins as a paid member!
              </div>

              {/* Referral Link & Copy Button */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    padding: '0.45rem 0.6rem',
                    color: '#e2e8f0',
                    fontSize: '0.72rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  style={{
                    background: copiedReferral ? '#00e5ff' : '#00ff9d',
                    color: '#05070c',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 0.85rem',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copiedReferral ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>

              {/* Social Quick Share Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Join the DCPROSENS Pro Esports Hub for zero-latency PC tuning and precision aim: ' + referralUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    background: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    color: '#25D366',
                    padding: '0.4rem 0.2rem',
                    borderRadius: '5px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Level up your aim and latency with the @DCPROSENS Pro Community: ')}&url=${encodeURIComponent(referralUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    padding: '0.4rem 0.2rem',
                    borderRadius: '5px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  X / Tweet
                </a>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    background: 'rgba(88, 101, 242, 0.15)',
                    border: '1px solid rgba(88, 101, 242, 0.35)',
                    color: '#5865F2',
                    padding: '0.4rem 0.2rem',
                    borderRadius: '5px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Discord
                </button>
              </div>
            </div>

            {/* VIP Telemetry Vault Box */}
            <div className={styles.widgetBox}>
              <h4 className={styles.widgetTitle}>
                <span>📥</span> Telemetry Vault Downloads
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.4 }}>
                Curated configurations and telemetry files maintained by our coaching staff.
              </p>

              <div className={styles.telemetryList}>
                <div className={styles.telemetryItem}>
                  <div>
                    <h5>CS2 Sub-Tick Latency Autoexec</h5>
                    <p>Clean binds, cl_updaterate 128</p>
                  </div>
                  {isMember ? (
                    <a href="/Aim_Calibration_Checklist.txt" download className={styles.downloadPresetBtn}>
                      Download
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🔒 Pro</span>
                  )}
                </div>

                <div className={styles.telemetryItem}>
                  <div>
                    <h5>KovaaK&apos;s 15-Min Precision Playlist</h5>
                    <p>Micro-tracking &amp; dynamic clicks</p>
                  </div>
                  {isMember ? (
                    <a href="/Aim_Calibration_Checklist.txt" download className={styles.downloadPresetBtn}>
                      Download
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🔒 Pro</span>
                  )}
                </div>

                <div className={styles.telemetryItem}>
                  <div>
                    <h5>LatencyMon MSI Driver Steering</h5>
                    <p>RTX 40/50 interrupt registry profile</p>
                  </div>
                  {isMember ? (
                    <a href="/Aim_Calibration_Checklist.txt" download className={styles.downloadPresetBtn}>
                      Download
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🔒 Pro</span>
                  )}
                </div>

                <div className={styles.telemetryItem}>
                  <div>
                    <h5>6 Esports Companion Worksheets</h5>
                    <p>Fillable calibration telemetry PDF</p>
                  </div>
                  {isMember ? (
                    <a href="/ebooks/01_The_Architect_of_Precision.pdf" download className={styles.downloadPresetBtn}>
                      Download
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🔒 Pro</span>
                  )}
                </div>
              </div>
            </div>

            {/* Community Guidelines Widget */}
            <div className={styles.widgetBox}>
              <h4 className={styles.widgetTitle}>
                <span>🛡️</span> Zero-Toxicity Code
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                <li>✓ Focus on verifiable telemetry and motor skills.</li>
                <li>✓ Zero marketing spam or unauthorized affiliate links.</li>
                <li>✓ Respect player skill levels from Iron to Radiant.</li>
                <li>✓ Direct coach support available in VOD reviews.</li>
              </ul>
            </div>

            {/* Need More Field Guides? */}
            <div className={styles.widgetBox} style={{ borderColor: 'rgba(0, 255, 157, 0.2)' }}>
              <h4 className={styles.widgetTitle}>
                <span>📚</span> Esports Field Guides
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.4 }}>
                Want deep 10-page technical breakdowns for specific bottlenecks (Input Lag, Friction, Warmup)?
              </p>
              <Link
                href="/ebooks/"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0d121f',
                  border: '1px solid #00ff9d',
                  color: '#00ff9d',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '0.6rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                Browse All 6 Field Guides ($14.99) ➔
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Embedded Stripe Checkout Modal (for logged-in users upgrading inside page) */}
      <StripeCheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
      />

      {/* New Post Modal for Active Members */}
      {newPostModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setNewPostModal(false)}
        >
          <div
            style={{
              background: '#0c101a',
              border: '1.5px solid #00ff9d',
              borderRadius: '16px',
              padding: '2rem',
              width: '100%',
              maxWidth: '600px',
              boxShadow: '0 0 40px rgba(0, 255, 157, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#fff', marginBottom: '1.25rem' }}>
              Create New Discussion
            </h3>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Channel Category
                </label>
                <select
                  value={postChannel}
                  onChange={(e) => setPostChannel(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#07090e',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="gta6">🌴 GTA VI Leonida Syndicate</option>
                  <option value="aim">🎯 Aim Mechanics &amp; Drills</option>
                  <option value="latency">⚡ Zero-Latency &amp; PC Tuning</option>
                  <option value="controller">🕹️ Controller &amp; Aim Assist</option>
                  <option value="hardware">🖱️ Mousepads &amp; Skates Matrix</option>
                  <option value="vod">🏆 Pro VOD Reviews</option>
                  <option value="lounge">💬 VIP Lounge &amp; LFG</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Discussion Title
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Question on 1600 DPI vs 800 DPI sensor jitter..."
                  maxLength={120}
                  required
                  style={{
                    width: '100%',
                    background: '#07090e',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Content / Details
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={5}
                  placeholder="Share your setup, telemetry readings, or question..."
                  maxLength={3000}
                  required
                  style={{
                    width: '100%',
                    background: '#07090e',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setNewPostModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#00ff9d',
                    border: 'none',
                    color: '#07090e',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    padding: '0.6rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Publish Discussion 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
