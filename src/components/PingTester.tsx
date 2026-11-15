'use client';

import { useState } from 'react';
import styles from './HardwareTools.module.css';

interface PingResult {
  name: string;
  avg: number;
  jitter: number;
  samples: number[];
}

const ENDPOINTS = [
  { name: 'Cloudflare Anycast Edge', url: 'https://1.1.1.1' },
  { name: 'Google Public DNS', url: 'https://dns.google' },
  { name: 'AWS Global Front', url: 'https://aws.amazon.com' },
  { name: 'DCPROSENS CDN Baseline', url: '/' },
];

/**
 * Multi-pass HTTP round-trip latency and jitter benchmark against edge endpoints.
 */
export default function PingTester() {
  const [results, setResults] = useState<PingResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const measureOnce = async (url: string) => {
    const start = performance.now();
    try {
      await fetch(url, { mode: 'no-cors', cache: 'no-store' });
    } catch {
      // Request timing remains valid even when opaque/no-cors refuses body access
    }
    return Math.round(performance.now() - start);
  };

  const runTests = async () => {
    setIsTesting(true);
    setResults([]);
    const collected: PingResult[] = [];

    for (const endpoint of ENDPOINTS) {
      // Warmup request avoids skewed TLS/DNS cold-start spikes on sample #1
      await measureOnce(endpoint.url);

      const samples: number[] = [];
      for (let i = 0; i < 3; i++) {
        samples.push(await measureOnce(endpoint.url));
        await new Promise((r) => setTimeout(r, 150));
      }

      const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
      const jitter = Math.max(...samples) - Math.min(...samples);
      collected.push({ name: endpoint.name, avg, jitter, samples });
      setResults([...collected]);
    }

    setIsTesting(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div>
          <div className={styles.panelTitle}>Multi-Region Latency &amp; Jitter Benchmark</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Runs 1 warmup + 3 timed passes per endpoint to isolate packet jitter from raw ping.
          </p>
        </div>

        <button
          type="button"
          onClick={runTests}
          disabled={isTesting}
          className={`${styles.btn} ${styles.btnPrimary}`}
          style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem' }}
        >
          {isTesting ? 'Measuring Latency...' : 'Start Ping Test'}
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Average Ping</th>
              <th>Jitter (Spread)</th>
              <th>Samples</th>
              <th>FPS Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 && !isTesting && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  Click &quot;Start Ping Test&quot; above to benchmark your connection stability.
                </td>
              </tr>
            )}
            {results.map((r) => {
              const grade =
                r.avg < 50 && r.jitter <= 12
                  ? { label: 'Tournament Ready', cls: styles.badgeOk }
                  : r.avg < 100
                    ? { label: 'Playable', cls: styles.badgeWarn }
                    : { label: 'High Latency', cls: styles.badgeBad };

              return (
                <tr key={r.name}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary)' }}>{r.avg} ms</td>
                  <td style={{ fontFamily: 'monospace' }}>± {r.jitter} ms</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{r.samples.join(' / ')} ms</td>
                  <td>
                    <span className={grade.cls}>{grade.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
