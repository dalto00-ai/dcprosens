"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { StripeCheckoutModal } from "@/components/StripeCheckoutModal";
import SupportForm from "@/components/SupportForm";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { games } from "@/lib/games";
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
    amazonLink: "https://www.amazon.com/dp/B0CGMP4N9X?tag=dcprosens-20",
  },
  {
    id: "mouse-2",
    category: "Mouse",
    title: "Razer DeathAdder V3 Pro Wireless (Black)",
    oldPrice: "$149.99",
    newPrice: "$119.99",
    discount: "-20%",
    amazonLink: "https://www.amazon.com/dp/B0B6Y7WTL5?tag=dcprosens-20",
  },
  {
    id: "mousepad-1",
    category: "Mousepad",
    title: "Artisan Hayate Otsu FX Soft (XL)",
    oldPrice: "$65.00",
    newPrice: "$55.00",
    discount: "-15%",
    amazonLink: "https://www.amazon.com/dp/B08V5H5H5X?tag=dcprosens-20",
  },
  {
    id: "keyboard-1",
    category: "Keyboard",
    title: "Wooting 60HE+ (Hall Effect)",
    oldPrice: "$199.99",
    newPrice: "$179.99",
    discount: "-10%",
    amazonLink: "https://www.amazon.com/dp/B0CL8H8H8X?tag=dcprosens-20",
  },
  {
    id: "mouse-3",
    category: "Mouse",
    title: "Finalmouse UltralightX Cheetah",
    oldPrice: "$189.00",
    newPrice: "$179.00",
    discount: "-5%",
    amazonLink: "https://www.amazon.com/dp/B0CP2G7H8X?tag=dcprosens-20",
  },
  {
    id: "accessories-1",
    category: "Accessories",
    title: "Superglide Glass Skates (GPX2)",
    oldPrice: "$29.99",
    newPrice: "$24.99",
    discount: "-16%",
    amazonLink: "https://www.amazon.com/dp/B0CGMR118H?tag=dcprosens-20",
  },
  {
    id: "mousepad-2",
    category: "Mousepad",
    title: "Lethal Gaming Gear Saturn Pro (XL)",
    oldPrice: "$54.99",
    newPrice: "$49.99",
    discount: "-9%",
    amazonLink: "https://www.amazon.com/dp/B0CL9I118X?tag=dcprosens-20",
  },
  {
    id: "monitor-1",
    category: "Monitor",
    title: "ZOWIE XL2546K 24.5\" 240Hz",
    oldPrice: "$499.00",
    newPrice: "$429.00",
    discount: "-14%",
    amazonLink: "https://www.amazon.com/dp/B08GEMCZND?tag=dcprosens-20",
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
      router.push("/login");
    }
  }, [user, loading, router]);

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
      console.error("Erro ao salvar configurações:", err);
      alert("Erro ao salvar suas configurações. Verifique o console.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Redireciona diretamente para a URL de pagamento estática do Stripe
  const handleCheckout = (planUrl: string) => {
    if (planUrl) {
      window.location.href = planUrl;
    } else {
      alert("Link de pagamento não configurado no .env.local");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  if (loading || !user) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Carregando painel...</p>
      </div>
    );
  }

  // Verifica se o usuário é premium
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
                    👑 Monthly Plan - $4.99/mo
                  </button>
                  <button
                    onClick={() => openCheckout('annual')}
                    className={`${styles.subscriptionAction} ${styles.tierBtn}`}
                  >
                    👑 Annual Plan - $3.33/mo ($39.99/yr)
                  </button>
                  <button
                    onClick={() => openCheckout('lifetime')}
                    className={`${styles.subscriptionAction} ${styles.tierBtn}`}
                  >
                    👑 Lifetime - $149 once
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
              📦 Apps & Extensions
            </h2>
            <div className={styles.downloadsList}>
              {/* Chrome Extension */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>Chrome Extension</span>
                  <span className={styles.downloadDesc}>Quick tab converters</span>
                </div>
                {isPremium ? (
                  <a href="/downloads/dcprosens-extension.zip" download className={styles.downloadBtn}>
                    Download .ZIP
                  </a>
                ) : (
                  <button disabled className={`${styles.downloadBtn} ${styles.downloadBtnDisabled}`}>
                    🔒 Premium
                  </button>
                )}
              </div>

              {/* Android App */}
              <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                  <span className={styles.downloadTitle}>Android App (.apk)</span>
                  <span className={styles.downloadDesc}>Calculate on-the-go</span>
                </div>
                {isPremium ? (
                  <a href="/downloads/dcprosens.apk" download className={styles.downloadBtn}>
                    Download APK
                  </a>
                ) : (
                  <button disabled className={`${styles.downloadBtn} ${styles.downloadBtnDisabled}`}>
                    🔒 Premium
                  </button>
                )}
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
