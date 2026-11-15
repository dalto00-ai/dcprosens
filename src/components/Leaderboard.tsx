"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import styles from "./Leaderboard.module.css";

type Game = "aim-trainer" | "aim-lab";

const MODES: Record<Game, { id: string; label: string }[]> = {
  "aim-trainer": [
    { id: "gridshot", label: "Gridshot" },
    { id: "tracking", label: "Tracking" },
    { id: "reflex", label: "Reflex" },
  ],
  "aim-lab": [
    { id: "microflick", label: "Micro-Flick" },
    { id: "dynamicclick", label: "Dynamic Click" },
    { id: "strafepeek", label: "Strafe Peek" },
    { id: "ghostvspro", label: "Ghost vs Pro" },
  ],
};

interface ScoreRow {
  displayName: string;
  score: number;
  createdAt: string;
}

const DPI_BUCKETS = [
  { id: "", label: "All DPI" },
  { id: "lt400", label: "< 400" },
  { id: "400to800", label: "400–800" },
  { id: "800to1600", label: "800–1600" },
  { id: "gte1600", label: "1600+" },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [game, setGame] = useState<Game>("aim-trainer");
  const [mode, setMode] = useState<string>("gridshot");
  const [dpiBucket, setDpiBucket] = useState<string>("");
  // One piece of state tagged with the filter combination it belongs to.
  // Previously `setRows(null); setError(null);` ran synchronously in the
  // effect body, which forced an extra render pass on every filter change,
  // and a slow response for the previous filters could still land and paint
  // the wrong board. Tagging the result and comparing against the current
  // key makes stale data simply read as "still loading".
  const [result, setResult] = useState<{
    key: string;
    rows: ScoreRow[] | null;
    error: string | null;
  } | null>(null);

  const filterKey = `${game}|${mode}|${dpiBucket}`;

  useEffect(() => {
    let cancelled = false;
    const bucketParam = dpiBucket ? `&dpiBucket=${encodeURIComponent(dpiBucket)}` : "";
    fetch(
      `/api/get-leaderboard.php?game=${encodeURIComponent(game)}&mode=${encodeURIComponent(mode)}&limit=25${bucketParam}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setResult({ key: filterKey, rows: data.scores || [], error: null });
      })
      .catch(() => {
        if (cancelled) return;
        setResult({
          key: filterKey,
          rows: null,
          error: "Could not load the leaderboard right now. Try again shortly.",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [filterKey, game, mode, dpiBucket]);

  const current = result?.key === filterKey ? result : null;
  const rows = current?.rows ?? null;
  const error = current?.error ?? null;

  const handleGameChange = (g: Game) => {
    setGame(g);
    setMode(MODES[g][0].id);
  };

  const userRank = user
    ? rows?.findIndex((r) => r.displayName && user.email && r.displayName === user.email.split("@")[0]) ?? -1
    : -1;

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        <button className={`${styles.gameTab} ${game === "aim-trainer" ? styles.active : ""}`} onClick={() => handleGameChange("aim-trainer")}>
          🎯 Aim Trainer <span className={styles.freeTag}>Free</span>
        </button>
        <button className={`${styles.gameTab} ${game === "aim-lab" ? styles.active : ""}`} onClick={() => handleGameChange("aim-lab")}>
          🧪 Aim Lab
        </button>
      </div>

      <div className={styles.modeRow}>
        {MODES[game].map((m) => (
          <button
            key={m.id}
            className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ""}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Filter by mouse DPI:</span>
        {DPI_BUCKETS.map((b) => (
          <button
            key={b.id}
            className={`${styles.dpiBtn} ${dpiBucket === b.id ? styles.dpiBtnActive : ""}`}
            onClick={() => setDpiBucket(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {!user && (
        <div className={styles.nudge}>
          <span><Link href="/login/">Log in</Link> to save your runs and show up here — it&apos;s free.</span>
          <Link href="/aim-trainer/" className={styles.nudgeCta}>Play Aim Trainer →</Link>
        </div>
      )}

      <div className={styles.tableWrap}>
        {error && <p className={styles.empty}>{error}</p>}
        {!error && rows === null && <p className={styles.empty}>Loading…</p>}
        {!error && rows !== null && rows.length === 0 && (
          <p className={styles.empty}>No scores yet for this mode — be the first.</p>
        )}
        {!error && rows !== null && rows.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i === userRank ? styles.myRow : undefined}>
                  <td className={styles.rankCell}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </td>
                  <td>{row.displayName}</td>
                  <td className={styles.scoreCell}>{row.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
