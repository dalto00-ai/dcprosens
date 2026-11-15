"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, type SavedProfile } from "@/components/AuthProvider";
import { StripeCheckoutModal } from "@/components/StripeCheckoutModal";
import SupportForm from "@/components/SupportForm";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { games } from "@/lib/games";
import { mouseDatabase } from "@/lib/mouseDatabase";
import { pros } from "@/lib/pros";
import { trackEvent } from "@/lib/analytics";
import styles from "./Dashboard.module.css";

// Dados simulados de ofertas da Amazon com links de afiliados.
// Quando o usuário clica em comprar, você ganha comissão de afiliado.
interface Deal {
  id: string;
  category: string;
  title: string;
  oldPrice: string;
  newPrice: string;
  discount: string;
  amazonLink: string;
}

const AMAZON_DEALS: Deal[] = [
  {
    id: "mouse-1",
    category: "Mouse",
    title: "Logitech G Pro X Superlight 2 (Black)",
    oldPrice: "$159.00",
    newPrice: "$139.00",
    discount: "-12%",
    amazonLink: "https://www.amazon.com/dp/B09NBWL8J5?tag=dcoutlier-20&linkCode=ll1&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "mouse-2",
    category: "Mouse",
    title: "Razer DeathAdder V3 Pro Wireless (Black)",
    oldPrice: "$149.99",
    newPrice: "$119.99",
    discount: "-20%",
    amazonLink: "https://www.amazon.com/s?k=Razer+DeathAdder+V3+Pro+Wireless+%28Black%29&crid=3DQOSSMWJEAGM&sprefix=razer+deathadder+v3+pro+wireless+black+%2Caps%2C259&linkCode=ll2&tag=dcoutlier-20&linkId=6a04f97b9033f881e70900725fa4e61b&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "mousepad-1",
    category: "Mousepad",
    title: "Artisan Hayate Otsu FX Soft (XL)",
    oldPrice: "$65.00",
    newPrice: "$55.00",
    discount: "-15%",
    amazonLink: "https://www.amazon.com/s?k=Artisan+Hayate+Otsu+FX+Soft+%28XL%29&crid=1V29ZYRW8B42W&sprefix=artisan+hayate+otsu+fx+soft+xl+%2Caps%2C283&linkCode=ll2&tag=dcoutlier-20&linkId=5bc32080d13a6165e5550f3c9786a8ec&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "keyboard-1",
    category: "Keyboard",
    title: "Wooting 60HE+ (Hall Effect)",
    oldPrice: "$199.99",
    newPrice: "$179.99",
    discount: "-10%",
    amazonLink: "https://www.amazon.com/s?k=Wooting+60HE%2B+%28Hall+Effect%29&crid=15R1U294Q27PF&sprefix=wooting+60he%2B+hall+effect+%2Caps%2C292&linkCode=ll2&tag=dcoutlier-20&linkId=628a90123a31c2316b53c00f8f656579&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "mouse-3",
    category: "Mouse",
    title: "Finalmouse UltralightX Cheetah",
    oldPrice: "$189.00",
    newPrice: "$179.00",
    discount: "-5%",
    amazonLink: "https://www.amazon.com/s?k=Finalmouse+UltralightX+Cheetah&crid=EIOQ001K8OY3&sprefix=finalmouse+ultralight+x+cheetah%2Caps%2C277&linkCode=ll2&tag=dcoutlier-20&linkId=fd63fc5293172ab391d4a79f3c19fdae&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "accessories-1",
    category: "Accessories",
    title: "Superglide Glass Skates (GPX2)",
    oldPrice: "$29.99",
    newPrice: "$24.99",
    discount: "-16%",
    amazonLink: "https://www.amazon.com/s?k=Superglide+Glass+Skates+%28GPX2%29&crid=2ALGR31EHLFYW&sprefix=superglide+glass+skates+gpx2+%2Caps%2C267&linkCode=ll2&tag=dcoutlier-20&linkId=6e5e8f91ef366cd4fbae28366782bd54&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "mousepad-2",
    category: "Mousepad",
    title: "Lethal Gaming Gear Saturn Pro (XL)",
    oldPrice: "$54.99",
    newPrice: "$49.99",
    discount: "-9%",
    amazonLink: "https://www.amazon.com/s?k=Lethal+Gaming+Gear+Saturn+Pro+%28XL%29&crid=35ABEB9GC7N2K&sprefix=lethal+gaming+gear+saturn+pro+xl+%2Caps%2C303&linkCode=ll2&tag=dcoutlier-20&linkId=83d8a627d57c9950d4002de331dca9eb&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "monitor-1",
    category: "Monitor",
    title: "ZOWIE XL2546K 24.5\" 240Hz",
    oldPrice: "$499.00",
    newPrice: "$429.00",
    discount: "-14%",
    amazonLink: "https://www.amazon.com/s?k=ZOWIE+XL2546K+24.5%5C&crid=XBRA3Q6475TH&sprefix=zowie+xl2546k+24.5+%2Caps%2C342&linkCode=ll2&tag=dcoutlier-20&linkId=b6f4bd4ede43cde82da31c46471f671d&language=en_US&ref_=as_li_ss_tl",
  }
];

export default function DashboardPage() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"deals" | "settings" | "community">("deals");
  
  // States para salvar configurações de sensibilidade do usuário
  const [userGame, setUserGame] = useState("valorant");
  const [userSens, setUserSens] = useState<number | string>(0.3);
  const [userDpi, setUserDpi] = useState<number | string>(800);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Named, saveable sensitivity profiles (multi-entry CRUD)
  const [profileName, setProfileName] = useState("");
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Quest state for gamification
  const [questsCompleted, setQuestsCompleted] = useState<boolean[]>([false, false, false, false, false]);

  // Checkout modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<'monthly' | 'annual' | 'lifetime'>('monthly');
  const openCheckout = (plan: 'monthly' | 'annual' | 'lifetime') => {
    setCheckoutPlan(plan);
    setCheckoutModalOpen(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem("dcprosens_quests");
    if (saved) {
      try {
        setQuestsCompleted(JSON.parse(saved));
      } catch {}
    } else {
      const initial = [
        userData?.savedSettings ? true : false,
        false,
        false,
        false,
        false
      ];
      setQuestsCompleted(initial);
    }
  }, [userData]);

  const handleToggleQuest = (idx: number) => {
    const updated = [...questsCompleted];
    updated[idx] = !updated[idx];
    setQuestsCompleted(updated);
    localStorage.setItem("dcprosens_quests", JSON.stringify(updated));
  };

  const completedCount = questsCompleted.filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / questsCompleted.length) * 100);

  let userRank = "Recruit";
  if (completedCount === 5) userRank = "Aim God";
  else if (completedCount >= 4) userRank = "Elite Aim";
  else if (completedCount >= 2) userRank = "Sharpshooter";
  else if (completedCount >= 1) userRank = "Calibrated";

  const quests = [
    { title: "Neuromuscular Baseline", desc: "Run the PSA Method Calculator to find your range.", done: questsCompleted[0] },
    { title: "Cross-Game Calibration", desc: "Convert your sensitivity for all favorite FPS games.", done: questsCompleted[1] },
    { title: "Custom Crosshair Setup", desc: "Design a custom esports crosshair code.", done: questsCompleted[2] },
    { title: "Reaction Speed Benchmark", desc: "Complete a Reaction Time benchmark test.", done: questsCompleted[3] },
    { title: "Esports Daily Routine", desc: "Generate a custom 30-minute daily playlist.", done: questsCompleted[4] }
  ];

  // Redireciona para o login caso o usuário não esteja autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login/");
    }
  }, [user, loading, router]);

  // Detects the return from a completed Stripe checkout (?payment=success&session_id=...)
  // to fire the matching purchase event — this is the other half of the
  // begin_checkout event fired when StripeCheckoutModal opens, closing the funnel.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      const sessionId = params.get("session_id") || undefined;
      trackEvent("purchase", { transaction_id: sessionId });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Carrega as configurações existentes do Firestore se houverem
  useEffect(() => {
    if (userData?.savedSettings) {
      setUserGame(userData.savedSettings.game || "valorant");
      setUserSens(userData.savedSettings.sens ?? 0.3);
      setUserDpi(userData.savedSettings.dpi ?? 800);
    }
  }, [userData]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaveLoading(true);
    setSaveSuccess(false);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        savedSettings: {
          game: userGame,
          sens: Number(userSens) || 0,
          dpi: Number(userDpi) || 800,
        }
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error saving your settings. Please check console.");
    } finally {
      setSaveLoading(false);
    }
  };

  // --- Saved profiles CRUD (multiple named presets, separate from the
  // single "active" savedSettings above) ---
  const savedProfiles = userData?.savedProfiles ?? [];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profileName.trim()) return;
    setProfileSaving(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const entry = {
        id: editingProfileId || `${Date.now()}`,
        name: profileName.trim().slice(0, 40),
        game: userGame,
        sens: Number(userSens) || 0,
        dpi: Number(userDpi) || 800,
        createdAt: new Date().toISOString(),
      };
      const nextProfiles = editingProfileId
        ? savedProfiles.map((p) => (p.id === editingProfileId ? entry : p))
        : [...savedProfiles, entry];
      await updateDoc(userRef, { savedProfiles: nextProfiles });
      setProfileName("");
      setEditingProfileId(null);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile. Please check console.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleEditProfile = (profile: SavedProfile) => {
    setUserGame(profile.game);
    setUserSens(profile.sens);
    setUserDpi(profile.dpi);
    setProfileName(profile.name);
    setEditingProfileId(profile.id);
  };

  const handleCancelEditProfile = () => {
    setProfileName("");
    setEditingProfileId(null);
  };

  const handleDeleteProfile = async (id: string) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { savedProfiles: savedProfiles.filter((p) => p.id !== id) });
      if (editingProfileId === id) handleCancelEditProfile();
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  const handleActivateProfile = async (profile: { game: string; sens: number; dpi: number }) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        savedSettings: { game: profile.game, sens: profile.sens, dpi: profile.dpi },
      });
    } catch (err) {
      console.error("Error activating profile:", err);
    }
  };

  // Redirects directly to the Stripe billing portal / static checkout URL
  const handleCheckout = (planUrl: string) => {
    if (planUrl) {
      window.location.href = planUrl;
    } else {
      alert("Billing portal link is not configured.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading || !user) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Check if user has an active Pro subscription
  const isPremium = userData?.subscriptionStatus === "active" || userData?.subscriptionStatus === "premium";

  // Static link to the Stripe-hosted billing portal (for managing an existing
  // subscription) — this one legitimately stays a plain URL from Stripe.
  const stripePortalLink = process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK || "";

  return (
    <div className={styles.container}>
      {/* DASHBOARD HEADER */}
      <div className={styles.header}>
        <div className={styles.welcomeText}>
          <h1>Welcome, <span>{userData?.displayName || user.email?.split("@")[0]}</span>!</h1>
          <p>Access your premium calibration panel and saved configurations.</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* LIVE PLATFORM STATS — real counts, computed from the same data
          arrays the rest of the site uses, never hardcoded. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1px',
        background: 'var(--border-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}>
        {[
          { n: games.length, label: 'Games Supported' },
          { n: pros.length, label: 'Pro Players Tracked' },
          { n: mouseDatabase.length, label: 'Mice in Database' },
          { n: '100%', label: 'Free Core Tools' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', padding: '1.1rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
              {stat.n}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {/* SIDEBAR (STATUS AND DOWNLOADS) */}
        <div className={styles.sidebar}>
          {/* SUBSCRIPTION PANEL */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              💳 Your Subscription
            </h2>
            <div className={styles.statusBox}>
              <div className={styles.badgeRow}>
                <span className={styles.badgeLabel}>Current status:</span>
                <span className={`${styles.badge} ${isPremium ? styles.badgePremium : styles.badgeFree}`}>
                  {isPremium ? "Premium" : "Free"}
                </span>
              </div>
              
              {!isPremium ? (
                <>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4, marginBottom: "1.25rem" }}>
                    Subscribe today to unlock custom crosshair builders, aim training routines, the Chrome extension, Android App, and real-time cloud backup.
                  </p>
                  
                  <button
                    onClick={() => openCheckout('monthly')}
                    className={`${styles.subscriptionAction} ${styles.tierBtn}`}
                  >
                    👑 Monthly Plan - $7.99/mo
                  </button>
                  <button
                    onClick={() => openCheckout('annual')}
                    className={`${styles.subscriptionAction} ${styles.tierBtn}`}
                  >
                    👑 Annual VIP Pass - $4.08/mo ($49/yr)
                  </button>
                  <button
                    onClick={() => openCheckout('lifetime')}
                    className={`${styles.subscriptionAction} ${styles.tierBtn}`}
                  >
                    👑 Lifetime Founder VIP - $129 once
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "500", marginBottom: "1rem" }}>
                    ✓ Thank you for supporting the project! Full access unlocked.
                  </p>
                  {stripePortalLink && (
                    <button 
                      onClick={() => handleCheckout(stripePortalLink)}
                      className={`${styles.subscriptionAction} ${styles.billingBtn}`}
                    >
                      ⚙️ Manage Subscription
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* AIM JOURNEY GAMIFICATION PANEL */}
          <div className={styles.panel} style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.04) 0%, rgba(0, 0, 0, 0) 100%)',
            border: '1px solid rgba(0, 255, 157, 0.12)',
            padding: '1.5rem',
            borderRadius: '12px'
          }}>
            <h2 className={styles.panelTitle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: 'none', paddingBottom: 0 }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>🏆 Aim Journey</span>
              <span style={{
                fontSize: '0.7rem',
                background: 'linear-gradient(135deg, #00ff9d, #00d482)',
                color: '#000',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 0 10px rgba(0, 255, 157, 0.2)'
              }}>
                {userRank}
              </span>
            </h2>
            
            <div style={{ margin: '1rem 0 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                <span>Calibration Progress</span>
                <span style={{ color: 'var(--text-primary)' }}>{progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #00ff9d, #00d482)', borderRadius: '4px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <Link
                href="/aim-trainer/"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.6rem 0.5rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00ff9d, #00d482)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                ▶ Play Aim Trainer (Free)
              </Link>
              <Link
                href="/aim-lab/"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.6rem 0.5rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 255, 157, 0.08)',
                  border: '1px solid rgba(0, 255, 157, 0.35)',
                  color: '#00ff9d',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                🔒 Aim Lab (Premium)
              </Link>
            </div>

            {/* The leaderboard was reachable only from the navbar and from the
                end-of-round screen, so from the dashboard — where players go to
                check their progress — it looked like it did not exist. */}
            <Link
              href="/leaderboard/"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '0.6rem',
                padding: '0.55rem 0.5rem',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px dashed rgba(255,255,255,0.2)',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.76rem',
                textDecoration: 'none',
              }}
            >
              🏆 View the global leaderboard →
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {quests.map((q, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleToggleQuest(idx)}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: q.done ? '1px solid #00ff9d' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: q.done ? '#00ff9d' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '0.15rem',
                    color: '#000',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}>
                    {q.done && "✓"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: q.done ? '#ffffff' : 'var(--text-secondary)',
                      textDecoration: q.done ? 'line-through' : 'none',
                      transition: 'color 0.2s'
                    }}>
                      {q.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem', lineHeight: 1.3 }}>
                      {q.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOWNLOADS PANEL (GATED) */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              📦 Apps &amp; Downloads
            </h2>
            <div className={styles.downloadsList}>
              {/* Chrome Extension */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>Chrome Extension</span>
                  <span className={styles.downloadDesc}>Quick tab converters &amp; hotkeys</span>
                </div>
                <a
                  href="https://chromewebstore.google.com/detail/dcprosens-sensitivity-con/hamlcadjopefnhcebjafcllomlphapbc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                >
                  Chrome Store ↗
                </a>
              </div>

              {/* Android App */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>Android App</span>
                  <span className={styles.downloadDesc}>Calculate on-the-go offline</span>
                </div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dcprosens.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                >
                  Google Play ↗
                </a>
              </div>

              {/* VIP Optimizer Engine */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>VIP Optimizer Engine</span>
                  <span className={styles.downloadDesc}>v1.0 Windows Latency Scripts (.zip)</span>
                </div>
                {isPremium ? (
                  <a href="/downloads/DCPROSENS-Optimizer-Engine-v1.0.zip" download className={styles.downloadBtn}>
                    Download .ZIP
                  </a>
                ) : (
                  <button disabled className={`${styles.downloadBtn} ${styles.downloadBtnDisabled}`}>
                    🔒 Premium
                  </button>
                )}
              </div>

              {/* 18-Volume Esports Field Guides Omnibus */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>18-Volume Master Omnibus</span>
                  <span className={styles.downloadDesc}>Complete technical field guides (.pdf)</span>
                </div>
                {isPremium ? (
                  <a href="/ebooks/DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf" download className={styles.downloadBtn}>
                    Download .PDF
                  </a>
                ) : (
                  <button disabled className={`${styles.downloadBtn} ${styles.downloadBtnDisabled}`}>
                    🔒 Premium
                  </button>
                )}
              </div>

              {/* Free Aim Calibration Checklist */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>Aim Calibration Checklist</span>
                  <span className={styles.downloadDesc}>Free physical setup checklist (.txt)</span>
                </div>
                <a href="/Aim_Calibration_Checklist.txt" download className={styles.downloadBtn}>
                  Download .TXT
                </a>
              </div>
            </div>
          </div>

          <SupportForm />
        </div>

        {/* MAIN PANEL CONTENT (TABS) */}
        <div className={styles.mainContent}>
          <div className={styles.tabs}>
            <button 
              onClick={() => setActiveTab("deals")} 
              className={`${styles.tab} ${activeTab === "deals" ? styles.tabActive : ""}`}
            >
              🏷️ Deals & Discounts
            </button>
            <button 
              onClick={() => setActiveTab("settings")} 
              className={`${styles.tab} ${activeTab === "settings" ? styles.tabActive : ""}`}
            >
              ⚙️ My Settings
            </button>
            <button 
              onClick={() => setActiveTab("community")} 
              className={`${styles.tab} ${activeTab === "community" ? styles.tabActive : ""}`}
            >
              👥 VIP Community
            </button>
          </div>

          {/* TAB: HARDWARE DEALS */}
          {activeTab === "deals" && (
            <div>
              <p className={styles.dealsDescription}>
                We monitor Amazon daily for the best deals on mice, mousepads, and keyboards. 
                Using our links helps support our independent gaming tools!
              </p>
              <div className={styles.dealsGrid}>
                {AMAZON_DEALS.map((deal) => (
                  <div key={deal.id} className={styles.dealCard}>
                    <div className={styles.dealHeader}>
                      <span className={styles.dealCategory}>{deal.category}</span>
                      <span className={styles.discountBadge}>{deal.discount}</span>
                    </div>
                    <h3 className={styles.dealTitle}>{deal.title}</h3>
                    <div className={styles.dealFooter}>
                      <div className={styles.dealPrice}>
                        <span className={styles.oldPrice}>{deal.oldPrice}</span>
                        <span className={styles.newPrice}>{deal.newPrice}</span>
                      </div>
                      <a 
                        href={deal.amazonLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.buyBtn}
                      >
                        View on Amazon →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SAVED CONFIGURATIONS */}
          {activeTab === "settings" && (
            !isPremium ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 2rem 5rem',
                backgroundColor: '#0c0c12',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                marginTop: '1rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Visual Glow Effect */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(0, 255, 157, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />

                <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))' }}>🔒</div>
                
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                  Cloud Profile Settings (Premium)
                </h2>
                
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '520px', marginBottom: '2.5rem' }}>
                  Save and synchronize your custom sensitivity and mouse DPI settings directly to the cloud in real-time. Keep your gear configuration active across all your devices.
                </p>

                {/* Premium Perks Checklist */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  width: '100%',
                  maxWidth: '450px',
                  marginBottom: '2.5rem',
                  fontSize: '0.9rem',
                  color: '#e2e8f0',
                  lineHeight: '1.5'
                }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
                    <span>Unlimited online sensitivity backup profiles</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
                    <span>Instant sync to Chrome Extension and mobile device</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
                    <span>Exclusive access to downloadable pro presets</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: '#00ff9d', fontWeight: 'bold' }}>✓</span>
                    <span>Prioritized API calculation response times</span>
                  </div>
                </div>

                <p style={{ color: '#00ff9d', fontSize: '0.95rem', fontWeight: 700, animation: 'pulse 2s infinite', letterSpacing: '0.02em' }}>
                  ★ Subscribe to a premium tier on the left for instant activation!
                </p>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes pulse {
                    0% { opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { opacity: 0.8; }
                  }
                `}} />
              </div>
            ) : (
              <div>
                <p className={styles.profileDescription}>
                  Save your target game sensitivity and DPI to sync them across your browsers in real-time.
                </p>
                
                <div className={styles.settingsCard}>
                  <div className={styles.settingsGrid}>
                    <div className={styles.settingsItem}>
                      <span className={styles.settingsLabel}>Saved Game</span>
                      <span className={styles.settingsValue}>
                        {games.find(g => g.id === userGame)?.name || userGame}
                      </span>
                    </div>
                    <div className={styles.settingsItem}>
                      <span className={styles.settingsLabel}>Sensitivity</span>
                      <span className={styles.settingsValue}>{userSens}</span>
                    </div>
                    <div className={styles.settingsItem}>
                      <span className={styles.settingsLabel}>Mouse DPI</span>
                      <span className={styles.settingsValue}>{userDpi}</span>
                    </div>
                    <div className={styles.settingsItem}>
                      <span className={styles.settingsLabel}>Saved eDPI</span>
                      <span className={styles.settingsValue}>
                        {(Number(userSens) * Number(userDpi)).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSettings} className={styles.profileForm}>
                    <div className={styles.formGrid}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Game</label>
                        <select 
                          className={styles.select}
                          value={userGame}
                          onChange={(e) => setUserGame(e.target.value)}
                        >
                          {games.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Sensitivity</label>
                        <input 
                          type="number" 
                          step="0.001"
                          className={styles.input}
                          value={userSens}
                          onChange={(e) => setUserSens(e.target.value)}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>DPI</label>
                        <input 
                          type="number" 
                          className={styles.input}
                          value={userDpi}
                          onChange={(e) => setUserDpi(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={saveLoading} className={styles.saveBtn}>
                      {saveLoading ? "Saving..." : "Save Settings"}
                    </button>

                    {saveSuccess && (
                      <p style={{ color: "var(--primary)", fontSize: "0.85rem", marginTop: "0.5rem", fontWeight: "600" }}>
                        ✓ Settings saved successfully to Firebase!
                      </p>
                    )}
                  </form>
                </div>

                {/* SAVED PROFILES (multiple named presets) */}
                <div style={{ marginTop: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                    📁 Saved Profiles
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Keep as many named sensitivity presets as you want — one per mouse, per game, whatever you need. &quot;Activate&quot; makes one the config Aim Lab reads.
                  </p>

                  {savedProfiles.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                      {savedProfiles.map((profile) => (
                        <div key={profile.id} style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '10px',
                          padding: '0.85rem 1.1rem',
                        }}>
                          <div>
                            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{profile.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                              {games.find(g => g.id === profile.game)?.name || profile.game} · {profile.sens} sens · {profile.dpi} DPI · eDPI {(profile.sens * profile.dpi).toFixed(0)}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button type="button" onClick={() => handleActivateProfile(profile)} className={styles.saveBtn} style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                              Activate
                            </button>
                            <button type="button" onClick={() => handleEditProfile(profile)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>
                              Edit
                            </button>
                            <button type="button" onClick={() => handleDeleteProfile(profile.id)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className={styles.settingsCard} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1 1 160px' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Profile name</label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Superlight 2 — Valorant"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        maxLength={40}
                      />
                    </div>
                    <button type="submit" disabled={profileSaving || !profileName.trim()} className={styles.saveBtn}>
                      {profileSaving ? 'Saving…' : editingProfileId ? 'Update Profile' : 'Save Current Values as Profile'}
                    </button>
                    {editingProfileId && (
                      <button type="button" onClick={handleCancelEditProfile} style={{ padding: '0.6rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        Cancel
                      </button>
                    )}
                  </form>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>
                    Uses the Game / Sensitivity / DPI values from the form above — set those first, then name and save the profile.
                  </p>
                </div>
              </div>
            )
          )}

          {/* TAB: VIP COMMUNITY (COMING SOON) */}
          {activeTab === "community" && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5rem 2rem',
              backgroundColor: '#0c0c12',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              marginTop: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Visual Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))' }}>👥</div>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                VIP Discord Community (Coming Soon)
              </h2>
              
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '520px', marginBottom: '2.5rem' }}>
                Interact directly with professional esports players, share your custom crosshair codes, download community routine playlists, and discuss gear setups.
              </p>

              <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                ★ Free for all active Premium Subscribers. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>

      <StripeCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        plan={checkoutPlan}
      />
    </div>
  );
}
