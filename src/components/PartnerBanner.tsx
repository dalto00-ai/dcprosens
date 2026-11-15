'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BannerItem {
  desktopImage?: string;
  mobileImage?: string;
  image?: string;
  linkUrl: string;
  altText: string;
  tag: string;
}

const LEADERBOARD_ITEMS: BannerItem[] = [
  {
    desktopImage: '/partners/amazon-728x90.webp',
    mobileImage: '/partners/amazon-320x50.webp',
    linkUrl: '/deals',
    altText: 'DCPROSENS - Upgrade Your Setup on Amazon',
    tag: 'Amazon Gaming',
  },
  {
    desktopImage: '/partners/brands-728x90.webp',
    mobileImage: '/partners/brands-320x50.webp',
    linkUrl: '/advertise',
    altText: 'DCPROSENS - Put Your Brand in the Spotlight - Advertise With Us',
    tag: 'Advertise With Us',
  },
];

const INCONTENT_ITEMS: BannerItem[] = [
  {
    image: '/partners/amazon-300x250.webp',
    linkUrl: '/deals',
    altText: 'DCPROSENS - Upgrade Your Gaming Setup on Amazon',
    tag: 'Amazon Deals',
  },
  {
    image: '/partners/brands-300x250.webp',
    linkUrl: '/advertise',
    altText: 'DCPROSENS - Put Your Brand in the Spotlight - Advertise With Us',
    tag: 'Advertise With Us',
  },
];

const SKYSCRAPER_ITEMS: BannerItem[] = [
  {
    image: '/partners/amazon-160x600.webp',
    linkUrl: '/deals',
    altText: 'DCPROSENS - Upgrade Your Setup on Amazon',
    tag: 'Amazon Gear',
  },
  {
    image: '/partners/brands-160x600.webp',
    linkUrl: '/advertise',
    altText: 'DCPROSENS - Put Your Brand in the Spotlight - Advertise With Us',
    tag: 'Advertise With Us',
  },
];

interface PartnerBannerProps {
  slot: 'leaderboard' | 'inContent' | 'bottomRail' | 'sideRailLeft' | 'sideRailRight';
  className?: string;
  initialIndex?: number;
}

export default function PartnerBanner({ slot, className, initialIndex = 0 }: PartnerBannerProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);

  // Intervalo suave de 6.5s para intercalar sem incomodar a leitura
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(timer);
  }, [isHovered]);

  // 1. Leaderboard (Topo: alterna 728x90 em PC / 320x50 em Mobile com crossfade suave)
  if (slot === 'leaderboard') {
    return (
      <div
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.6rem 1rem 0.25rem',
          maxWidth: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <span
            style={{
              fontSize: '0.62rem',
              color: 'var(--text-secondary, #8a8a8a)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              opacity: 0.7,
            }}
          >
            Sponsored • {LEADERBOARD_ITEMS[index].tag}
          </span>
          <span style={{ fontSize: '0.55rem', opacity: 0.4 }}>•</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: index === 0 ? 'var(--primary, #00ff9d)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: index === 1 ? 'var(--primary, #00ff9d)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Container fixo para zero Cumulative Layout Shift (CLS) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '728px',
            aspectRatio: '728 / 90',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {LEADERBOARD_ITEMS.map((item, idx) => {
            const isActive = index === idx;
            return (
              <Link
                key={item.linkUrl}
                href={item.linkUrl}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 0.8s ease-in-out',
                  display: 'block',
                }}
              >
                <picture>
                  {item.mobileImage && (
                    <source media="(max-width: 520px)" srcSet={item.mobileImage} width={320} height={50} />
                  )}
                  <img
                    src={item.desktopImage}
                    alt={item.altText}
                    width={728}
                    height={90}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="eager"
                  />
                </picture>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. In-Content (300x250 no meio de artigos e calculadoras)
  if (slot === 'inContent') {
    return (
      <div
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem auto',
          maxWidth: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
          <span
            style={{
              fontSize: '0.62rem',
              color: 'var(--text-secondary, #8a8a8a)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              opacity: 0.7,
            }}
          >
            Sponsored • {INCONTENT_ITEMS[index].tag}
          </span>
          <span style={{ fontSize: '0.55rem', opacity: 0.4 }}>•</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: index === 0 ? 'var(--primary, #00ff9d)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: index === 1 ? 'var(--primary, #00ff9d)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '300px',
            height: '250px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
          }}
        >
          {INCONTENT_ITEMS.map((item, idx) => {
            const isActive = index === idx;
            return (
              <Link
                key={item.linkUrl}
                href={item.linkUrl}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 0.8s ease-in-out',
                  display: 'block',
                }}
              >
                <img
                  src={item.image}
                  alt={item.altText}
                  width={300}
                  height={250}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Bottom Rail Duplo (Dois blocos de 300x250 que intercalam em fases opostas)
  if (slot === 'bottomRail') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2.5rem 1rem 3rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-secondary, #8a8a8a)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: '1rem',
            opacity: 0.6,
          }}
        >
          Official Partners & Sponsorships
        </span>
        <div
          style={{
            display: 'flex',
            gap: '1.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Caixa 1: Inicia no Amazon, alterna para Brands */}
          <AnimatedSquareBanner items={INCONTENT_ITEMS} startIndex={0} />

          {/* Caixa 2: Inicia no Brands, alterna para Amazon */}
          <AnimatedSquareBanner items={INCONTENT_ITEMS} startIndex={1} />
        </div>
      </div>
    );
  }

  // 4. Skyscraper Slots (160x600 nas laterais em telas >= 1500px)
  const isLeft = slot === 'sideRailLeft';
  const startIndex = isLeft ? 0 : 1;

  return (
    <div
      style={{
        position: 'fixed',
        top: '96px',
        [isLeft ? 'left' : 'right']: 'max(0.5rem, calc((100vw - 1220px) / 2 - 172px))',
        zIndex: 20,
        display: 'none',
      }}
      className={`partner-rail ${isLeft ? 'partner-rail-left' : 'partner-rail-right'}`}
    >
      <AnimatedSkyscraperBanner items={SKYSCRAPER_ITEMS} startIndex={startIndex} />
    </div>
  );
}

// Subcomponente animado para caixas quadradas (300x250)
function AnimatedSquareBanner({ items, startIndex }: { items: BannerItem[]; startIndex: number }) {
  const [active, setActive] = useState(startIndex);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => {
      setActive((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '300px',
        height: '250px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {items.map((item, idx) => {
        const isCurrent = active === idx;
        return (
          <Link
            key={item.linkUrl}
            href={item.linkUrl}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isCurrent ? 1 : 0,
              pointerEvents: isCurrent ? 'auto' : 'none',
              transition: 'opacity 0.8s ease-in-out',
              display: 'block',
            }}
          >
            <img
              src={item.image}
              alt={item.altText}
              width={300}
              height={250}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </Link>
        );
      })}
    </div>
  );
}

// Subcomponente animado para arranha-céus laterais (160x600)
function AnimatedSkyscraperBanner({ items, startIndex }: { items: BannerItem[]; startIndex: number }) {
  const [active, setActive] = useState(startIndex);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => {
      setActive((prev) => (prev === 0 ? 1 : 0));
    }, 6500);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span
        style={{
          display: 'block',
          textAlign: 'center',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary, #8a8a8a)',
          opacity: 0.6,
          marginBottom: '0.3rem',
        }}
      >
        Partner
      </span>
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '600px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        {items.map((item, idx) => {
          const isCurrent = active === idx;
          return (
            <Link
              key={item.linkUrl}
              href={item.linkUrl}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isCurrent ? 1 : 0,
                pointerEvents: isCurrent ? 'auto' : 'none',
                transition: 'opacity 0.8s ease-in-out',
                display: 'block',
              }}
            >
              <img
                src={item.image}
                alt={item.altText}
                width={160}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
