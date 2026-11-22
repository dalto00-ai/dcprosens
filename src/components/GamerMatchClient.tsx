'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './GamerMatch.module.css';

export interface GamerCardProfile {
  id: string;
  handle: string;
  flag?: string;
  game: string;
  rank: string;
  role: string;
  platform: 'PC' | 'PS5' | 'Xbox';
  region: 'NA' | 'EU' | 'BR/LATAM' | 'APAC';
  cm360: number;
  sensNote: string;
  mic: boolean;
  bio: string;
  contactTag: string;
  superMatch?: boolean;
}

const SEED_GAMERS: GamerCardProfile[] = [
  {
    id: 'seed-1',
    handle: 'KaelVCT',
    flag: '🇺🇸',
    game: 'Valorant',
    rank: 'Immortal 2',
    role: 'Controller / IGL',
    platform: 'PC',
    region: 'NA',
    cm360: 46,
    sensNote: '800 DPI · 0.35 (46.6 cm/360°)',
    mic: true,
    bio: 'Looking for an aggressive Entry Duelist who plays around smokes and comms cleanly on NA East.',
    contactTag: 'Discord: kaelvct#4410',
  },
  {
    id: 'seed-2',
    handle: 'LeonidaHeistBR',
    flag: '🇧🇷',
    game: 'GTA VI',
    rank: 'Free-Aim Veteran',
    role: 'Heist Driver & Gunner',
    platform: 'PS5',
    region: 'BR/LATAM',
    cm360: 38,
    sensNote: 'DualSense 4% Deadzone · Classic Scheme',
    mic: true,
    bio: 'Montando squad sério no PS5 em Free-Aim para Heists, missões do Cap. 3+ e troféus sem trollar.',
    contactTag: 'PSN: LeonidaHeistBR',
  },
  {
    id: 'seed-3',
    handle: 'MirageAWP_EU',
    flag: '🇩🇪',
    game: 'CS2',
    rank: 'Faceit Lvl 10 (2350)',
    role: 'Primary AWPer',
    platform: 'PC',
    region: 'EU',
    cm360: 45,
    sensNote: '1600 DPI · 0.57 · 0.8189 Zoom',
    mic: true,
    bio: 'Consistent AWP + Mirage/Anubis anchor looking for a sharp entry rifler for Premier & Faceit duo.',
    contactTag: 'Discord: mirageawp_eu',
  },
  {
    id: 'seed-4',
    handle: 'ViceCitySniper',
    flag: '🇬🇧',
    game: 'GTA VI',
    rank: '100% Grinder',
    role: 'Overwatch / Missions',
    platform: 'Xbox',
    region: 'EU',
    cm360: 40,
    sensNote: 'Elite Series 2 · 3% Deadzone · 100% Accel',
    mic: true,
    bio: 'Chasing all 55 trophies and clean Free-Aim lobbies on Xbox Series X. Chill adults with mic.',
    contactTag: 'Xbox GT: ViceCitySniper',
  },
  {
    id: 'seed-5',
    handle: 'RebirthDemon',
    flag: '🇨🇦',
    game: 'Warzone / BO6',
    rank: 'Crimson III',
    role: 'SMG Entry / Slay',
    platform: 'PC',
    region: 'NA',
    cm360: 34,
    sensNote: '1600 DPI · 2.55 (34.0 cm/360°)',
    mic: true,
    bio: 'Fast-paced Resurgence & Ranked duo/trio. I call rotations and run zero-latency Reflex setup.',
    contactTag: 'Discord: rebirthdemon99',
  },
  {
    id: 'seed-6',
    handle: 'ValkMovement',
    flag: '🇸🇪',
    game: 'Apex Legends',
    rank: 'Masters',
    role: 'IGL / Fragger',
    platform: 'PC',
    region: 'EU',
    cm360: 36,
    sensNote: '800 DPI · 1.45 · 110 FOV',
    mic: true,
    bio: 'Looking for a Gibraltar/Newcastle anchor or controller fragger for evening Ranked grind.',
    contactTag: 'Discord: valkmove_se',
  },
  {
    id: 'seed-7',
    handle: 'ZeroBuildKing',
    flag: '🇺🇸',
    game: 'Fortnite',
    rank: 'Unreal',
    role: 'Zero Build / Box Fight',
    platform: 'PC',
    region: 'NA',
    cm360: 42,
    sensNote: '800 DPI · 7.8% X/Y',
    mic: true,
    bio: 'Zero Build & Reload cups. Always calibrated on DCPROSENS — no rage, good comms.',
    contactTag: 'Epic: ZeroBuildKing_TTV',
  },
  {
    id: 'seed-8',
    handle: 'AspasFanBR',
    flag: '🇧🇷',
    game: 'Valorant',
    rank: 'Ascendant 3',
    role: 'Initiator / Flex',
    platform: 'PC',
    region: 'BR/LATAM',
    cm360: 48,
    sensNote: '800 DPI · 0.34 (48.0 cm/360°)',
    mic: true,
    bio: 'Jogo de Sova/Fade/Skye todo dia à noite. Procurando Duelist ou Sentinela pra subir pro Imortal.',
    contactTag: 'Discord: aspasfan_br#7712',
  },
];

function computeCompatibility(userCm360: number, targetCm360: number, micMatch: boolean): number {
  const diff = Math.abs(userCm360 - targetCm360);
  const sensScore = Math.max(55, 97 - Math.round(diff * 0.85));
  return Math.min(99, sensScore + (micMatch ? 2 : 0));
}

export default function GamerMatchClient() {
  const [profiles, setProfiles] = useState<GamerCardProfile[]>(SEED_GAMERS);
  const [gameFilter, setGameFilter] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [micOnly, setMicOnly] = useState<boolean>(false);
  const [userCm360, setUserCm360] = useState<number>(42);

  const [passedIds, setPassedIds] = useState<string[]>([]);
  const [matches, setMatches] = useState<GamerCardProfile[]>([]);
  const [activeMatchPopup, setActiveMatchPopup] = useState<GamerCardProfile | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reportNotice, setReportNotice] = useState<string>('');

  // Create card state
  const [handle, setHandle] = useState('');
  const [game, setGame] = useState('GTA VI');
  const [rank, setRank] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState<'PC' | 'PS5' | 'Xbox'>('PS5');
  const [region, setRegion] = useState<'NA' | 'EU' | 'BR/LATAM' | 'APAC'>('NA');
  const [cmInput, setCmInput] = useState('42');
  const [sensNote, setSensNote] = useState('');
  const [contactTag, setContactTag] = useState('');
  const [bio, setBio] = useState('');
  const [mic, setMic] = useState(true);
  const [publishStatus, setPublishStatus] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  // Touch/Mouse drag state
  const dragStartX = useRef<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  useEffect(() => {
    Promise.resolve().then(() => {
      try {
        const savedMatches = localStorage.getItem('dcprosens_match_saved_v1');
        if (savedMatches) setMatches(JSON.parse(savedMatches));
        const savedPassed = localStorage.getItem('dcprosens_match_passed_v1');
        if (savedPassed) setPassedIds(JSON.parse(savedPassed));
      } catch {
        // ignore storage errors
      }
    });

    fetch('https://dcprosens.com/api/match-profiles.php')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.profiles?.length) {
          setProfiles((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const remote: GamerCardProfile[] = data.profiles.filter(
              (p: GamerCardProfile) => !existingIds.has(p.id)
            );
            return [...remote, ...prev];
          });
        }
      })
      .catch(() => {
        // Seed cards remain available offline / in static export
      });
  }, []);

  const deck = useMemo(() => {
    const matchedIds = new Set(matches.map((m) => m.id));
    const passedSet = new Set(passedIds);
    return profiles.filter((p) => {
      if (matchedIds.has(p.id) || passedSet.has(p.id)) return false;
      if (gameFilter !== 'All' && p.game !== gameFilter) return false;
      if (platformFilter !== 'All' && p.platform !== platformFilter) return false;
      if (regionFilter !== 'All' && p.region !== regionFilter) return false;
      if (micOnly && !p.mic) return false;
      return true;
    });
  }, [profiles, matches, passedIds, gameFilter, platformFilter, regionFilter, micOnly]);

  const currentCard = deck[0] || null;

  const handlePass = () => {
    if (!currentCard) return;
    const next = [...passedIds, currentCard.id];
    setPassedIds(next);
    setDragOffsetX(0);
    try {
      localStorage.setItem('dcprosens_match_passed_v1', JSON.stringify(next));
    } catch {}
  };

  const handleSquadMatch = (superMatch = false) => {
    if (!currentCard) return;
    const matchedCard: GamerCardProfile = { ...currentCard, superMatch };
    const nextMatches = [matchedCard, ...matches];
    setMatches(nextMatches);
    setActiveMatchPopup(matchedCard);
    setDragOffsetX(0);
    try {
      localStorage.setItem('dcprosens_match_saved_v1', JSON.stringify(nextMatches));
    } catch {}
  };

  const handleResetDeck = () => {
    setPassedIds([]);
    try {
      localStorage.removeItem('dcprosens_match_passed_v1');
    } catch {}
  };

  const handleCopyTag = async (id: string, tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
    } catch {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleReport = async (targetId: string) => {
    setPassedIds((prev) => [...prev, targetId]);
    setMatches((prev) => prev.filter((m) => m.id !== targetId));
    setReportNotice('Profile hidden and reported for moderation review.');
    setTimeout(() => setReportNotice(''), 3500);
    fetch('https://dcprosens.com/api/match-profiles.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'report', targetId, reason: 'User report from Squad Match' }),
    }).catch(() => {});
  };

  const handlePublishCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !contactTag.trim() || !bio.trim()) {
      setPublishStatus('Please fill in your Gamer Handle, Discord/PSN tag, and Bio.');
      return;
    }
    setSubmitting(true);
    setPublishStatus('');

    const newCard: GamerCardProfile = {
      id: `local-${Date.now()}`,
      handle: handle.trim(),
      flag: region === 'BR/LATAM' ? '🇧🇷' : region === 'EU' ? '🇪🇺' : region === 'APAC' ? '🌏' : '🇺🇸',
      game,
      rank: rank.trim() || 'Competitive',
      role: role.trim() || 'Flex',
      platform,
      region,
      cm360: Number(cmInput) || 42,
      sensNote: sensNote.trim() || `${Number(cmInput) || 42} cm/360°`,
      mic,
      bio: bio.trim(),
      contactTag: contactTag.trim(),
    };

    try {
      const res = await fetch('https://dcprosens.com/api/match-profiles.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', ...newCard }),
      });
      if (res.ok) {
        setPublishStatus('✅ Your Player Card is live in the Squad Match deck!');
      } else {
        setPublishStatus('✅ Card saved to your session preview.');
      }
    } catch {
      setPublishStatus('✅ Card saved to your session preview.');
    }

    setProfiles((prev) => [newCard, ...prev]);
    setHandle('');
    setRank('');
    setRole('');
    setSensNote('');
    setContactTag('');
    setBio('');
    setSubmitting(false);
  };

  return (
    <div>
      {/* Filters Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterField}>
          <label htmlFor="match-game-filter">Game</label>
          <select id="match-game-filter" value={gameFilter} onChange={(e) => setGameFilter(e.target.value)}>
            <option value="All">All Games</option>
            <option value="GTA VI">GTA VI (Heists / Free-Aim)</option>
            <option value="Valorant">Valorant</option>
            <option value="CS2">CS2 / Faceit</option>
            <option value="Warzone / BO6">Warzone / BO6</option>
            <option value="Apex Legends">Apex Legends</option>
            <option value="Fortnite">Fortnite</option>
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="match-platform-filter">Platform</label>
          <select id="match-platform-filter" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="All">All Platforms</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox Series X|S</option>
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="match-region-filter">Region</label>
          <select id="match-region-filter" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="All">All Regions</option>
            <option value="NA">North America (NA)</option>
            <option value="EU">Europe (EU)</option>
            <option value="BR/LATAM">Brazil / LATAM</option>
            <option value="APAC">Asia-Pacific</option>
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="user-cm-input">Your cm/360° (Compat.)</label>
          <input
            id="user-cm-input"
            type="number"
            min={10}
            max={120}
            value={userCm360}
            onChange={(e) => setUserCm360(Number(e.target.value) || 42)}
          />
        </div>

        <div className={styles.filterField} style={{ justifyContent: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', color: '#fff', fontSize: '0.82rem', textTransform: 'none' }}>
            <input
              type="checkbox"
              checked={micOnly}
              onChange={(e) => setMicOnly(e.target.checked)}
              style={{ width: 'auto' }}
            />
            🎙️ Mic Required Only
          </label>
        </div>
      </div>

      {reportNotice && (
        <div style={{ background: 'rgba(234, 179, 8, 0.14)', border: '1px solid #facc15', color: '#fef08a', padding: '0.7rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.86rem' }}>
          {reportNotice}
        </div>
      )}

      {/* Main Split: Swipe Deck + Matches & Create Card */}
      <div className={styles.matchLayout}>
        {/* LEFT: TINDER-STYLE SWIPE DECK */}
        <div className={styles.deckStage}>
          {activeMatchPopup && (
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.14), rgba(0, 229, 255, 0.12))',
                border: '2px solid #00ff9d',
                borderRadius: '16px',
                padding: '1.15rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#00ff9d', fontSize: '1rem' }}>
                  {activeMatchPopup.superMatch ? '⭐ SUPER DUO UNLOCKED!' : '💚 SQUAD MATCH UNLOCKED!'}
                </strong>
                <button
                  type="button"
                  onClick={() => setActiveMatchPopup(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
                  aria-label="Close match banner"
                >
                  ✕
                </button>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                Add <strong>{activeMatchPopup.handle}</strong> ({activeMatchPopup.game} · {activeMatchPopup.platform}):
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#050810', padding: '0.65rem 0.9rem', borderRadius: '10px' }}>
                <code style={{ color: '#00e5ff', fontWeight: 800, fontSize: '0.95rem' }}>{activeMatchPopup.contactTag}</code>
                <button
                  type="button"
                  className={styles.copyTagBtn}
                  onClick={() => handleCopyTag(activeMatchPopup.id, activeMatchPopup.contactTag)}
                >
                  {copiedId === activeMatchPopup.id ? '✓ Copied!' : 'Copy Tag'}
                </button>
              </div>
            </div>
          )}

          {currentCard ? (
            <>
              <div
                className={styles.swipeCard}
                style={{
                  transform: `translateX(${dragOffsetX}px) rotate(${dragOffsetX * 0.03}deg)`,
                }}
                onPointerDown={(e) => {
                  dragStartX.current = e.clientX;
                }}
                onPointerMove={(e) => {
                  if (dragStartX.current !== null) {
                    setDragOffsetX(e.clientX - dragStartX.current);
                  }
                }}
                onPointerUp={() => {
                  if (dragOffsetX > 85) handleSquadMatch(false);
                  else if (dragOffsetX < -85) handlePass();
                  else setDragOffsetX(0);
                  dragStartX.current = null;
                }}
                onPointerLeave={() => {
                  dragStartX.current = null;
                  setDragOffsetX(0);
                }}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.playerTitle}>
                      {currentCard.flag || '🎮'} {currentCard.handle}
                    </h2>
                    <div className={styles.playerSub}>
                      <span>{currentCard.game}</span>
                      <span>•</span>
                      <span>{currentCard.platform}</span>
                      <span>•</span>
                      <span>{currentCard.region}</span>
                      <span>•</span>
                      <span>{currentCard.mic ? '🎙️ Mic On' : '🔇 Text Only'}</span>
                    </div>
                  </div>
                  <div className={styles.compatBadge}>
                    {computeCompatibility(userCm360, currentCard.cm360, currentCard.mic)}% Aim Match
                  </div>
                </div>

                <div className={styles.tagGrid}>
                  <div className={styles.statTile}>
                    <span>Rank / Tier</span>
                    <strong>{currentCard.rank}</strong>
                  </div>
                  <div className={styles.statTile}>
                    <span>Primary Role</span>
                    <strong>{currentCard.role}</strong>
                  </div>
                  <div className={styles.statTile} style={{ gridColumn: '1 / -1' }}>
                    <span>DCPROSENS Calibrated Telemetry</span>
                    <strong style={{ color: '#00e5ff' }}>{currentCard.sensNote}</strong>
                  </div>
                </div>

                <div className={styles.bioBox}>{currentCard.bio}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: '#64748b' }}>
                  <span>Swipe right or click Squad Up to reveal Discord/PSN</span>
                  <button type="button" className={styles.reportBtn} onClick={() => handleReport(currentCard.id)}>
                    Report / Hide
                  </button>
                </div>
              </div>

              <div className={styles.swipeActions}>
                <button type="button" className={styles.btnPass} onClick={handlePass}>
                  ✕ Pass
                </button>
                <button type="button" className={styles.btnSuper} onClick={() => handleSquadMatch(true)}>
                  ⭐ Super Duo
                </button>
                <button type="button" className={styles.btnMatch} onClick={() => handleSquadMatch(false)}>
                  💚 Squad Up!
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Showing {deck.length} calibrated player{deck.length === 1 ? '' : 's'} matching your filters
              </div>
            </>
          ) : (
            <div className={styles.swipeCard} style={{ textAlign: 'center', padding: '2.5rem 1.75rem' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: '#fff' }}>
                You&apos;ve reviewed all players in this filter!
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Widen your Game/Region filters, post your own Player Card on the right, or reset passed cards to browse again.
              </p>
              <button type="button" className={styles.btnMatch} style={{ maxWidth: '240px', margin: '0 auto' }} onClick={handleResetDeck}>
                🔄 Reset Passed Cards
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: SAVED MATCHES + POST MY PLAYER CARD */}
        <div className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
              💚 Your Squad Matches ({matches.length})
            </h3>
            {matches.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                Swipe right or click <strong>Squad Up!</strong> on any player card to unlock their Discord, PSN, or Xbox Gamertag here.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '260px', overflowY: 'auto' }}>
                {matches.map((m) => (
                  <div key={m.id} className={styles.matchItem}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.88rem' }}>
                        {m.flag || '🎮'} {m.handle} <span style={{ color: '#00e5ff', fontWeight: 600 }}>({m.game})</span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{m.contactTag}</div>
                    </div>
                    <button
                      type="button"
                      className={styles.copyTagBtn}
                      onClick={() => handleCopyTag(m.id, m.contactTag)}
                    >
                      {copiedId === m.id ? '✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form className={styles.panelCard} onSubmit={handlePublishCard} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              🪪 Post Your Player Card (Free)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
              Publish your setup so calibrated teammates in your game and region can match with you.
            </p>

            <div className={styles.tagGrid} style={{ marginBottom: 0 }}>
              <div className={styles.filterField}>
                <label htmlFor="card-handle">Gamer Handle *</label>
                <input id="card-handle" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="e.g. ViceSniper" maxLength={32} required />
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-game">Main Game</label>
                <select id="card-game" value={game} onChange={(e) => setGame(e.target.value)}>
                  <option value="GTA VI">GTA VI</option>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                  <option value="Warzone / BO6">Warzone / BO6</option>
                  <option value="Apex Legends">Apex Legends</option>
                  <option value="Fortnite">Fortnite</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-platform">Platform</label>
                <select id="card-platform" value={platform} onChange={(e) => setPlatform(e.target.value as 'PC' | 'PS5' | 'Xbox')}>
                  <option value="PS5">PS5</option>
                  <option value="Xbox">Xbox Series X|S</option>
                  <option value="PC">PC</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-region">Region</label>
                <select id="card-region" value={region} onChange={(e) => setRegion(e.target.value as 'NA' | 'EU' | 'BR/LATAM' | 'APAC')}>
                  <option value="NA">NA</option>
                  <option value="EU">EU</option>
                  <option value="BR/LATAM">BR / LATAM</option>
                  <option value="APAC">APAC</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-rank">Rank / Mode</label>
                <input id="card-rank" value={rank} onChange={(e) => setRank(e.target.value)} placeholder="e.g. Free-Aim / Ascendant" maxLength={32} />
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-role">Role</label>
                <input id="card-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Entry / Heist Driver" maxLength={32} />
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-cm">cm/360°</label>
                <input id="card-cm" type="number" min={10} max={120} value={cmInput} onChange={(e) => setCmInput(e.target.value)} />
              </div>
              <div className={styles.filterField}>
                <label htmlFor="card-sens">Sens / Deadzone Note</label>
                <input id="card-sens" value={sensNote} onChange={(e) => setSensNote(e.target.value)} placeholder="800 DPI 0.35 or 4% DZ" maxLength={48} />
              </div>
            </div>

            <div className={styles.filterField}>
              <label htmlFor="card-contact">Discord / PSN / Xbox Gamertag *</label>
              <input id="card-contact" value={contactTag} onChange={(e) => setContactTag(e.target.value)} placeholder="e.g. Discord: user#1234 or PSN: User" maxLength={48} required />
            </div>

            <div className={styles.filterField}>
              <label htmlFor="card-bio">Short LFG Bio *</label>
              <input id="card-bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Looking for chill duo/heist crew with mic..." maxLength={200} required />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#cbd5e1', cursor: 'pointer' }}>
              <input type="checkbox" checked={mic} onChange={(e) => setMic(e.target.checked)} style={{ width: 'auto' }} />
              🎙️ I have a working microphone
            </label>

            <button type="submit" disabled={submitting} className={styles.btnMatch} style={{ width: '100%' }}>
              {submitting ? 'Publishing...' : '🚀 Publish Player Card'}
            </button>

            {publishStatus && (
              <div style={{ fontSize: '0.82rem', color: '#00ff9d', fontWeight: 700 }}>{publishStatus}</div>
            )}
          </form>

          <div className={styles.panelCard} style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(0,229,255,0.06))' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f472b6', marginBottom: '0.35rem' }}>
              🌴 PLAYING GTA VI ON PS5 OR XBOX?
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '0 0 0.75rem' }}>
              Calibrate your DualSense deadzones before joining a Free-Aim Heist crew and unlock the 11-page Launch Bible (61 Cheats + 55 Trophies).
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/gta-vi-sensitivity/" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00ff9d', textDecoration: 'none' }}>
                GTA VI Command Center →
              </Link>
              <Link href="/community/" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00e5ff', textDecoration: 'none' }}>
                Community Forum →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
