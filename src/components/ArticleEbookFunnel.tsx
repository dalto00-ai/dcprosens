import React from 'react';
import Link from 'next/link';

interface ArticleEbookFunnelProps {
  slug: string;
  category?: string;
}

export default function ArticleEbookFunnel({ slug }: ArticleEbookFunnelProps) {
  const isTmrOrProController =
    slug.includes('tmr') ||
    slug.includes('hall-effect-stick') ||
    slug.includes('stick-drift') ||
    slug.includes('aim-assist') ||
    slug.includes('rotational-aim') ||
    slug.includes('overclock-controller') ||
    slug.includes('hidusbf') ||
    slug.includes('vader-4') ||
    slug.includes('scuf') ||
    slug.includes('flydigi') ||
    slug.includes('controller-overclock');

  const isPeripheralsOrMousepad =
    slug.includes('mousepad') ||
    slug.includes('glass-pad') ||
    slug.includes('glass-mousepad') ||
    slug.includes('skate') ||
    slug.includes('ptfe') ||
    slug.includes('poron') ||
    slug.includes('artisan') ||
    slug.includes('wallhack') ||
    slug.includes('saturn') ||
    slug.includes('oled') ||
    slug.includes('peripherals');

  const isRapidTriggerOrKeyboard =
    slug.includes('rapid-trigger') ||
    slug.includes('wooting') ||
    slug.includes('hall-effect') ||
    slug.includes('snap-tap') ||
    slug.includes('snappy-tappy') ||
    slug.includes('counter-strafe') ||
    slug.includes('keyboard') ||
    slug.includes('huntsman-mini') ||
    slug.includes('tkl-vs-60');

  const isHardwareOrLatency =
    slug.includes('latency') ||
    slug.includes('input-lag') ||
    slug.includes('dpc') ||
    slug.includes('polling') ||
    slug.includes('8000hz') ||
    slug.includes('4000hz') ||
    slug.includes('sensor') ||
    slug.includes('spin-out') ||
    slug.includes('lod') ||
    slug.includes('dpi') ||
    slug.includes('reflex') ||
    slug.includes('motion-blur');

  const isApex =
    slug.includes('apex') ||
    slug.includes('alc') ||
    slug.includes('bloodhound');

  const isOverwatch =
    slug.includes('overwatch') ||
    slug.includes('tracer') ||
    slug.includes('widowmaker') ||
    slug.includes('hitscan') ||
    slug.includes('ana-biotic') ||
    slug.includes('relative-zoom') ||
    slug.includes('ashe-viper');

  const isDeadlock =
    slug.includes('deadlock') ||
    slug.includes('soul-orb') ||
    slug.includes('eternus') ||
    slug.includes('patron') ||
    slug.includes('trooper-deny');

  const isMarvelRivals =
    slug.includes('marvel-rivals') ||
    slug.includes('hela') ||
    slug.includes('punisher') ||
    slug.includes('star-lord') ||
    slug.includes('peni-parker');

  const isSiege =
    slug.includes('rainbow-six') ||
    slug.includes('siege') ||
    slug.includes('r6') ||
    slug.includes('acog') ||
    slug.includes('shaiiko') ||
    slug.includes('beaulo') ||
    slug.includes('noor');

  const isFortnite =
    slug.includes('fortnite') ||
    slug.includes('fncs') ||
    slug.includes('bugha') ||
    slug.includes('peterbot') ||
    slug.includes('piece-control');

  const isTarkov =
    slug.includes('tarkov') ||
    slug.includes('eft') ||
    slug.includes('gray-zone') ||
    slug.includes('pip-scope') ||
    slug.includes('extraction');

  const isDeltaForceOr2026 =
    slug.includes('delta-force') ||
    slug.includes('hawk-ops') ||
    slug.includes('fragpunk') ||
    slug.includes('arc-raiders') ||
    slug.includes('shard-card');

  const isCoDOrWarzoneOrTracking =
    slug.includes('warzone') ||
    slug.includes('call-of-duty') ||
    slug.includes('cod') ||
    slug.includes('mw4') ||
    slug.includes('mw3') ||
    slug.includes('tracking') ||
    slug.includes('recoil-smoothing');

  const isUniversalOrDesk =
    slug.includes('desk-space') ||
    slug.includes('mousepad-size') ||
    slug.includes('converter') ||
    slug.includes('conversion') ||
    slug.includes('pointer-speed') ||
    slug.includes('raw-input');

  const isCs2 =
    slug.includes('cs2') ||
    slug.includes('csgo') ||
    slug.includes('counter-strike') ||
    slug.includes('sub-tick') ||
    slug.includes('stretched') ||
    slug.includes('s1mple') ||
    slug.includes('zywoo') ||
    slug.includes('donk') ||
    slug.includes('m0nesy') ||
    slug.includes('niko') ||
    slug.includes('awp');

  const isValorant =
    slug.includes('valorant') ||
    slug.includes('vct') ||
    slug.includes('tenz') ||
    slug.includes('aspas') ||
    slug.includes('demon1') ||
    slug.includes('radiant') ||
    slug.includes('operator');

  const isGtaOrController =
    slug.includes('gta') ||
    slug.includes('controller') ||
    slug.includes('deadzone') ||
    slug.includes('stick-drift') ||
    slug.includes('ps5') ||
    slug.includes('xbox') ||
    slug.includes('analog');

  // FUNNEL VOL 17: The Pro Controller Bible: TMR Sticks, 1000Hz Overclocking & Aim Assist
  if (isTmrOrProController && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(168, 85, 247, 0.2)',
            color: '#c084fc',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎮 FIELD GUIDE VOL 17 // PRO CONTROLLER ENGINEERING
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          The Pro Controller Bible: TMR Sticks, 1000Hz Overclocking &amp; Aim Assist
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master ALPS vs Hall-Effect vs cutting-edge TMR joystick sensors, eliminate 7ms of gamepad polling latency with 1000Hz hidusbf overclocking, and unlock continuous Rotational Aim Assist lock-on with the 75% Left-Stick Max Deadzone secret.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/pro-controller-tmr-sticks-aim-assist-guide/"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Read Field Guide 17 ($14.99)</span>
            <span>&rarr;</span>
          </Link>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>
            Included in <Link href="/ebooks/" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Master Bundle</Link>
          </div>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 18: The 2026 Esports Peripherals Matrix: Mice, Glass Pads, Skates & OLEDs
  if (isPeripheralsOrMousepad) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🖱️ FIELD GUIDE VOL 18 // HARDWARE &amp; TRIBOLOGY REFERENCE
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          The 2026 Esports Peripherals Matrix: Mice, Glass Pads, Skates &amp; OLEDs
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master mousepad friction coefficients (&mu;s / &mu;k across glass, hybrid, and control cloth), size mouse shapes to hand biomechanics, eliminate 6% CPI deviations caused by skate thickness shifts, and optimize 480Hz OLED motion clarity.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/esports-peripherals-matrix-mousepad-oled-guide/"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Read Field Guide 18 ($14.99)</span>
            <span>&rarr;</span>
          </Link>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>
            Included in <Link href="/ebooks/" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Master Bundle</Link>
          </div>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 16: Rapid Trigger, Hall Effect & Counter-Strafe Synchronization Bible
  if (isRapidTriggerOrKeyboard && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(236, 72, 153, 0.2)',
            color: '#f472b6',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          ⚡ FIELD GUIDE VOL 16 // MOVEMENT &amp; KEYBOARD ENGINEERING
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Hall-Effect, Rapid Trigger &amp; Counter-Strafe Synchronization Bible
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master 0.1mm magnetic Hall-Effect actuation (Wooting, Razer, SteelSeries), eliminate counter-strafe stopping delay by 48ms, navigate Valve&apos;s strict CS2 SOCD/Snap Tap bans, and execute the 10-minute left/right hand synchronization routine.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/rapid-trigger-hall-effect-counter-strafe-guide/"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Rapid Trigger Bible ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; CS2 &amp; Valorant Actuation Matrix &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 06: Zero-Latency PC & Sensor Hardware Guide
  if (isHardwareOrLatency) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(6, 182, 212, 0.2)',
            color: '#06b6d4',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          ⚡ FIELD GUIDE VOL 06 // ZERO-LATENCY HARDWARE
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Zero-Latency PC &amp; Sensor Hardware Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master optical sensor DPI deviation, calibrate the 60-second ruler formula, saturate 4000Hz/8000Hz USB polling at 1600 DPI, audit the 5-stage Click-to-Photon latency budget (cutting 68ms down to 6ms), and configure Rapid Trigger Hall Effect actuation.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/zero-latency-pc-sensor-hardware-guide/"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Zero-Latency Hardware Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Peripheral Benchmark Matrix &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 08: Apex Legends Season 30 ALC & Recoil Smoothing
  if (isApex && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🔥 FIELD GUIDE VOL 08 // APEX LEGENDS TRACKING &amp; ALGS
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Apex Legends (Season 30): Recoil Smoothing &amp; ALC Bible
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Source 0.022 yaw physics, trigger 85% recoil smoothing with anti-mirror strafe tracking, apply exact per-optic config scalars in profile.cfg at 110 FOV, and lock in ALGS 4-3 Linear vs custom ALC values.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/apex-legends-season-30-alc-recoil-smoothing-guide/"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Apex Legends Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Per-Optic Scalars Included &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 09: Overwatch 2 Hitscan, Projectile & Relative Zoom
  if (isOverwatch && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(245, 158, 11, 0.2)',
            color: '#f59e0b',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎯 FIELD GUIDE VOL 09 // HERO SHOOTER CALIBRATION
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Overwatch 2: Hitscan, Projectile &amp; Relative Aim Zoom Field Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master 0.0066° yaw geometry, lock in the exact 0% MDM relative zoom scalars (37.89% for Widow/Ana, 51.47% for Ashe, 45.90% for Freja), configure High Precision Mouse Input for sub-frame tick sampling, and apply per-hero tracking overrides for OWCS champions.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/overwatch-2-hitscan-projectile-relative-zoom-guide/"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Overwatch 2 Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; 0% MDM Scoped Tangent Table &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 10: Deadlock Eternus Aim & Soul-Orb Flick
  if (isDeadlock && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.14) 0%, rgba(234, 179, 8, 0.08) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(168, 85, 247, 0.2)',
            color: '#c084fc',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🔮 FIELD GUIDE VOL 10 // THIRD-PERSON MOBA-SHOOTER
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Deadlock (Eternus Tier): Third-Person Tracking &amp; Soul-Orb Flick Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Valve Source 2 0.044 yaw conversion, conquer high-speed third-person vertical tracking, calibrate Fitts&apos;s Law micro-flicks to secure and deny 350ms rising Soul Orbs, and lock in the 36–46 cm Eternus sensitivity corridor.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/deadlock-eternus-aim-soul-orb-flick-guide/"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Deadlock Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Soul-Orb Deny Drills &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 11: Marvel Rivals Season 9.5 Hero Crosshair & Parallax
  if (isMarvelRivals && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(234, 179, 8, 0.08) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(220, 38, 38, 0.2)',
            color: '#ef4444',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          ⚔️ FIELD GUIDE VOL 11 // THIRD-PERSON HERO SHOOTER
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Marvel Rivals (Season 9.5): Hero Crosshair &amp; Parallax Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Unreal Engine 5 0.0175° yaw (4x Valorant), compensate for 2m–8m close-quarters right-shoulder camera parallax, import Season 9.5 reticle overrides for Hela and The Hood, and eliminate Frame Generation input delay.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/marvel-rivals-hero-crosshair-parallax-guide/"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Marvel Rivals Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Season 9.5 Reticle Codes &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 12: Rainbow Six Siege Ranked 3.0 Multiplier & 1:1 ACOG
  if (isSiege && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.14) 0%, rgba(37, 99, 235, 0.08) 100%)',
          border: '1px solid rgba(2, 132, 199, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(2, 132, 199, 0.2)',
            color: '#38bdf8',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🛡️ FIELD GUIDE VOL 12 // TACTICAL BREACH &amp; SIEGE
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Rainbow Six Siege (Ranked 3.0): 0.002 Multiplier &amp; 1:1 ACOG Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Anvil engine yaw mathematics, eliminate coarse 4.7cm slider jumps with the 0.002 MouseSensitivityMultiplierUnit in GameSettings.ini, achieve 1:1 0% MDM across 1x and 2.5x ACOG, and optimize 4:3 vs 16:10 stretched FOV.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/rainbow-six-siege-ranked-multiplier-acog-guide/"
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(2, 132, 199, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Rainbow Six Siege Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; GameSettings.ini Tweak &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 13: Fortnite Chapter 7 Targeting, Scopes & Linear Pad
  if (isFortnite && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          ⚡ FIELD GUIDE VOL 13 // BATTLE ROYALE &amp; PIECE-CONTROL
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Fortnite (Chapter 7): UE 5.6 Targeting, Scope Multipliers &amp; Pad Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Unreal Engine 5.6 0.55550° percentage yaw math, decouple building and editing multipliers (sub-21cm) from gunplay tracking, lock in 1:1 X/Y parity, apply 60% 0% MDM targeting, and run FNCS pro Linear controller presets.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/fortnite-chapter-7-targeting-scope-pad-guide/"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Fortnite Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; FNCS Pro Benchmarks &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 14: Escape From Tarkov 1.0 & Gray Zone Warfare Ballistics
  if (isTarkov && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.12) 0%, rgba(202, 138, 4, 0.08) 100%)',
          border: '1px solid rgba(132, 204, 22, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(132, 204, 22, 0.2)',
            color: '#a3e635',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎯 FIELD GUIDE VOL 14 // EXTRACTION &amp; MIL-SIM BALLISTICS
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Escape from Tarkov (1.0) &amp; Gray Zone: Gear Penalties &amp; PiP Scopes
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Tarkov 1.0 Unity 0.125 yaw, defeat armor/helmet turn-speed penalties using the exact slider compensation formula, fix the sluggish 1x LPVO bug on Vudu/Razor scopes, and align 1:1 sensitivity with Gray Zone Warfare.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/escape-from-tarkov-gray-zone-ballistics-guide/"
            style={{
              background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Tarkov &amp; Gray Zone Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Armor Compensation Formula &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 15: Delta Force, FragPunk & Arc Raiders 2026 Tactical Guide
  if (isDeltaForceOr2026 && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(202, 138, 4, 0.08) 100%)',
          border: '1px solid rgba(234, 179, 8, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(234, 179, 8, 0.2)',
            color: '#facc15',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎖️ FIELD GUIDE VOL 15 // 2026 NEXT-GEN TACTICAL &amp; EXTRACTION
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          2026 Shooters Field Guide: Delta Force, FragPunk &amp; Arc Raiders
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Delta Force: Hawk Ops Monitor Distance Vertical (MDV 0% vs 133%) and gradual ADS interpolation, navigate FragPunk 5v5 Shard Card match modifiers without altering sensitivity, and configure Arc Raiders third-person shoulder-swap mechanics.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/delta-force-fragpunk-arc-raiders-tactical-guide/"
            style={{
              background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
              color: '#000000',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock 2026 Tactical Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; MDV Zoom Calculator &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 05: Call of Duty MW4, Warzone & Apex Tracking
  if (isCoDOrWarzoneOrTracking && !slug.includes('gta')) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(249, 115, 22, 0.2)',
            color: '#f97316',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎯 FIELD GUIDE VOL 05 // HIGH-TTK TRACKING
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Call of Duty: MW4, Warzone &amp; Apex Tracking Field Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master high-TTK tracking physics: engage engine recoil smoothing above the &gt;12°/sec threshold, configure 6-6 Dynamic reverse S-curves in MW4/Warzone, trigger 100% active Rotational Aim Assist with optimized stick deadzones, and dial in Season 30 ALC values.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/mw4-warzone-apex-tracking-guide/"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(249, 115, 22, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Tracking Field Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Includes 10-Min Anti-Mirror Drill &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 03: CS2 Sub-Tick & Autoexec
  if (isCs2 && !isValorant) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(0, 229, 255, 0.08) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(245, 158, 11, 0.18)',
            color: '#fbbf24',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎯 FIELD GUIDE VOL 03 // SOURCE 2 TACTICAL
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          CS2 Sub-Tick Aim &amp; Autoexec Field Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Master Source 2 sub-tick click registration, calibrate 560–1000 eDPI pro brackets (NiKo, donk, m0NESY), debunk the dangerous 4:3 m_yaw 0.0165 trap, calculate 0% MDM AWP zoom (0.818933), and install our tournament-ready autoexec.cfg.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/cs2-subtick-aim-autoexec-guide/"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#07090e',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock CS2 Sub-Tick Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Includes autoexec.cfg &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 04: Valorant Radiant Aim & eDPI
  if (isValorant) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(255, 70, 85, 0.12) 0%, rgba(0, 255, 234, 0.08) 100%)',
          border: '1px solid rgba(255, 70, 85, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 70, 85, 0.2)',
            color: '#ff4655',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🔥 FIELD GUIDE VOL 04 // RADIANT CALIBRATION
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          Valorant Radiant Aim &amp; eDPI Field Guide
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Calibrate the 0.07 yaw constant, master the 200–350 eDPI biomechanical corridor by agent role (Duelist vs Sentinel), eliminate high-polling jitter with RawInputBuffer, lock 0% MDM Operator zoom (0.847), and import map-optimized reticle palettes.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/valorant-radiant-aim-edpi-guide/"
            style={{
              background: 'linear-gradient(135deg, #ff4655 0%, #e11d48 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(255, 70, 85, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Radiant Aim Guide ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Ready-to-Import Reticle Codes &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 02: GTA VI & Controller
  if (isGtaOrController) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(236, 72, 153, 0.18)',
            color: '#f472b6',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          🎮 FIELD GUIDE VOL 02 // LEONIDA FREE AIM
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          GTA VI Complete Launch Bible &amp; Pro Aim Companion (11-Page PDF)
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Instant second-screen playbook for PS5, PS5 Pro &amp; Xbox Series X|S: unlock all 61 cheat codes safely, follow the 55-trophy Platinum roadmap (with Chapter 1 missable alerts), fix L3 Sprint &amp; 18% RAGE deadzones, and dial in PS5 Pro 30 FPS HDR settings.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/gta-vi-sensitivity/#gta6-pricing"
            style={{
              background: 'linear-gradient(135deg, #00ff9d 0%, #06b6d4 100%)',
              color: '#050810',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Get GTA VI Launch Pack ($7.99 — 50% OFF) ➔
          </Link>
          <Link
            href="/ebooks/gta-6-pro-aim-controller-guide/"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              padding: '0.85rem 1.4rem',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Full Guide Specs
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF Download &bull; No Account Required &bull; PS5 &amp; Xbox Ready
          </span>
        </div>
      </div>
    );
  }

  // FUNNEL VOL 07: The Architect of Precision 1:1 Universal Blueprint
  if (isUniversalOrDesk) {
    return (
      <div
        style={{
          marginTop: '3.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
          border: '1px solid rgba(20, 184, 166, 0.45)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(20, 184, 166, 0.2)',
            color: '#14b8a6',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
          }}
        >
          📐 FIELD GUIDE VOL 07 // RAPID ONBOARDING &amp; YAW BLUEPRINT
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.25,
          }}
        >
          The Architect of Precision: 1:1 Universal Sensitivity Blueprint
        </h3>

        <p
          style={{
            color: '#cbd5e1',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px',
          }}
        >
          Calibrate the 3-step hardware baseline (Windows 6/11 raw input, 1600 DPI), convert sensitivities instantly across Valorant, CS2, Apex, Overwatch 2, and Deadlock, and verify your physical mousepad clearance with the desk space formula.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link
            href="/ebooks/architect-of-precision-quick-start-guide/"
            style={{
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 800,
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(20, 184, 166, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Unlock Universal Blueprint ($14.99) ➔
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Instant PDF &bull; Desk Clearance Formula &bull; 14-Day Guarantee
          </span>
        </div>
      </div>
    );
  }

  // DEFAULT / FUNNEL VOL 01: Precision Aim System Manifesto
  return (
    <div
      style={{
        marginTop: '3.5rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.08) 0%, rgba(0, 229, 255, 0.05) 100%)',
        border: '1px solid rgba(0, 255, 157, 0.4)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(0, 255, 157, 0.15)',
          color: '#00ff9d',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '0.25rem 0.75rem',
          borderRadius: '50px',
          marginBottom: '1rem',
          letterSpacing: '0.05em',
        }}
      >
        ⚡ FIELD GUIDE VOL 01 // NEUROMUSCULAR CALIBRATION
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}
      >
        The Precision Aim System Manifesto
      </h3>

      <p
        style={{
          color: '#cbd5e1',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          marginBottom: '1.75rem',
          maxWidth: '680px',
        }}
      >
        Stop guessing random sensitivity numbers and destroying your muscle memory between games. Master 3D camera yaw physics, calculate your anatomical cm/360 with the 7-Step PSA binary search, and lock in 0% Monitor Distance Matching across 90+ FPS titles.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <Link
          href="/ebooks/precision-aim-system-manifesto/"
          style={{
            background: '#00ff9d',
            color: '#07090e',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 800,
            padding: '0.85rem 1.85rem',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Get The Precision Aim Manifesto ($14.99) ➔
        </Link>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          Included in <Link href="/ebooks/complete-esports-master-bundle/" style={{ color: '#00ff9d', textDecoration: 'underline' }}>18-Volume Master Omnibus ($39.99)</Link>
        </span>
      </div>
    </div>
  );
}
