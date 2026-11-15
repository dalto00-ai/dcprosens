'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EBOOKS_CATALOG, MASTER_BUNDLE, EbookProduct } from '@/data/ebooksData';
import { TransparentCheckoutModal, CheckoutProduct } from '@/components/TransparentCheckoutModal';
import styles from './EbooksCatalog.module.css';

export default function EbooksCatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState<CheckoutProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBuyBundle = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProduct({
      id: MASTER_BUNDLE.id,
      title: MASTER_BUNDLE.title,
      price: MASTER_BUNDLE.price,
      plan: 'ebook-bundle',
      subtitle: MASTER_BUNDLE.subtitle,
      badge: 'ALL 18 VOLUMES',
      fallbackUrl: MASTER_BUNDLE.stripePaymentLink,
    });
    setIsCheckoutOpen(true);
  };

  const handleBuyBook = (e: React.MouseEvent, book: EbookProduct) => {
    e.preventDefault();
    setSelectedProduct({
      id: book.id,
      title: book.title,
      price: book.price,
      plan: `ebook-vol${book.vol}`,
      subtitle: book.subtitle,
      badge: book.badge,
      fallbackUrl: book.stripePaymentLink,
    });
    setIsCheckoutOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': 'https://dcprosens.com/ebooks/#itemlist',
        name: 'DCPROSENS Esports Field Guides Collection',
        description: 'High-performance competitive gaming technical manuals and handbooks.',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Product',
              name: MASTER_BUNDLE.title,
              description: MASTER_BUNDLE.subtitle,
              image: `https://dcprosens.com${MASTER_BUNDLE.mockupImage}`,
              offers: {
                '@type': 'Offer',
                price: MASTER_BUNDLE.price.toFixed(2),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: MASTER_BUNDLE.stripePaymentLink,
              },
            },
          },
          ...EBOOKS_CATALOG.map((book, idx) => ({
            '@type': 'ListItem',
            position: idx + 2,
            item: {
              '@type': 'Product',
              name: book.title,
              description: book.shortDesc,
              image: `https://dcprosens.com${book.mockupImage}`,
              offers: {
                '@type': 'Offer',
                price: book.price.toFixed(2),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: book.stripePaymentLink,
              },
            },
          })),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://dcprosens.com/ebooks/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://dcprosens.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Esports Field Guides',
            item: 'https://dcprosens.com/ebooks/',
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.catalogWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.catalogContainer}>
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#00ff9d', fontWeight: 600 }}>Esports Field Guides</span>
        </nav>

        {/* HERO SECTION */}
        <header className={styles.headerHero}>
          <div className={styles.heroBadge}>
            📚 OFFICIAL DCPROSENS TECHNICAL COMPENDIUMS
          </div>
          <h1 className={styles.heroH1}>
            Master The Biomechanics &amp; Engineering of Competitive Aim
          </h1>
          <p className={styles.heroSub}>
            The official DCPROSENS technical compendiums engineered for competitive FPS and controller players. No vague motivational fluff: pure telemetry, angle geometry, hardware friction matrices, and latency architecture.
          </p>
        </header>

        {/* MASTER BUNDLE FEATURED HERO CARD */}
        <section className={styles.masterBundleCard}>
          <div className={styles.bundleRibbon}>55% OFF • MASTER OMNIBUS</div>

          <div className={styles.bundleInfoCol}>
            <span className={styles.bundleSuperTitle}>THE DEFINITIVE COMPENDIUM</span>
            <h2 className={styles.bundleH2}>{MASTER_BUNDLE.title}</h2>
            <p className={styles.bundleDesc}>{MASTER_BUNDLE.subtitle}</p>

            <div className={styles.includesList}>
              {MASTER_BUNDLE.includes.map((item, idx) => (
                <div key={idx} className={styles.includeItem}>
                  <span>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleBuyBundle}
                className={styles.bundleCTA}
                style={{ cursor: 'pointer', border: 'none' }}
              >
                Get The Complete Master Omnibus ($39.99 USD) ⚡
              </button>
              <Link
                href="/ebooks/complete-esports-master-bundle/"
                style={{
                  color: '#00ff9d',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(0, 255, 157, 0.3)',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 255, 157, 0.05)',
                }}
              >
                <span>View Full 18-Volume Syllabus</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className={styles.bundlePriceBox}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Image
                src="/ebooks/mockup_3d_book_1.png"
                alt="DCPROSENS Master Suite Bundle"
                width={280}
                height={340}
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))' }}
                priority
              />
            </div>
            <div className={styles.bundlePriceOld}>Regular Value: ${MASTER_BUNDLE.regularPrice.toFixed(2)}</div>
            <div className={styles.bundlePriceMain}>${MASTER_BUNDLE.price.toFixed(2)}</div>
            <div className={styles.bundlePriceNote}>One-time payment • Instant Delivery</div>
            <button
              onClick={handleBuyBundle}
              className={styles.bundleCTA}
              style={{ cursor: 'pointer', border: 'none', width: '100%' }}
            >
              Instant Checkout ($39.99)
            </button>
          </div>
        </section>

        {/* SECTION HEADER: INDIVIDUAL FIELD GUIDES */}
        <div className={styles.catalogHeader}>
          <h2 className={styles.catalogH2}>Individual Field Guides ($14.99 Each)</h2>
          <p className={styles.catalogSub}>
            Looking to fix a specific issue? Choose the exact mechanical domain holding your performance back.
          </p>
        </div>

        {/* 18 INDIVIDUAL BOOK CARDS */}
        <div className={styles.booksGrid}>
          {EBOOKS_CATALOG.filter((book) => book.id !== MASTER_BUNDLE.id).map((book) => (
            <article key={book.id} className={styles.bookCard}>
              <div>
                <div className={styles.cardMockupWrap}>
                  <Link href={`/ebooks/${book.slug}/`}>
                    <Image
                      src={book.mockupImage}
                      alt={`${book.title} 3D Cover Mockup`}
                      width={220}
                      height={270}
                      className={styles.cardMockup}
                    />
                  </Link>
                </div>

                <div className={styles.cardMetaRow}>
                  <span className={styles.volBadge}>{book.badge}</span>
                  <span className={styles.pagesBadge}>{book.pagesCount} PAGES • PDF</span>
                </div>

                <h3 className={styles.bookCardTitle}>
                  <Link href={`/ebooks/${book.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {book.title}
                  </Link>
                </h3>
                <div className={styles.bookCardSubtitle}>{book.subtitle}</div>
                <p className={styles.bookCardDesc}>{book.shortDesc}</p>
              </div>

              <div className={styles.cardActionRow}>
                <div className={styles.cardPriceRow}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'line-through', marginRight: '6px' }}>
                      ${book.regularPrice.toFixed(2)}
                    </span>
                    <span className={styles.cardPrice}>${book.price.toFixed(2)} USD</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#00ff9d' }}>
                    ★ {book.rating}
                  </span>
                </div>

                <button
                  onClick={(e) => handleBuyBook(e, book)}
                  className={styles.cardBuyBtn}
                  style={{ cursor: 'pointer', border: 'none', width: '100%' }}
                >
                  Buy Now (${book.price.toFixed(2)}) ⚡
                </button>

                <Link href={`/ebooks/${book.slug}/`} className={styles.cardDetailsLink}>
                  View Full 10-Page Curriculum &amp; Reviews ➔
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* GUARANTEE & TRUST ROW */}
        <section className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <h4>⚡ Instant Download</h4>
            <p>Access your DRM-free PDF compendiums immediately after checkout on any device.</p>
          </div>
          <div className={styles.trustItem}>
            <h4>🛡️ 7-Day Precision Guarantee</h4>
            <p>If our telemetry methods don&apos;t measurably tighten your recoil control or consistency, get a 100% refund.</p>
          </div>
          <div className={styles.trustItem}>
            <h4>🔒 Bank-Grade Security</h4>
            <p>Processed through official 256-bit encrypted Stripe checkout with Apple Pay &amp; Google Pay.</p>
          </div>
          <div className={styles.trustItem}>
            <h4>🔄 Lifetime Free Revisions</h4>
            <p>Free PDF updates whenever game engines or driver telemetry standards change.</p>
          </div>
        </section>

        {/* UPSELL FUNNEL BANNER (BOTTOM) */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.08) 0%, rgba(0, 229, 255, 0.08) 100%)',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Want Every Advantage in One Complete Package?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '620px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
            Instead of buying books individually for $14.99 each ($89.94 total), unlock all 6 volumes, printable companion worksheets, and lifetime updates for just $39.99.
          </p>
          <button
            onClick={handleBuyBundle}
            className={styles.bundleCTA}
            style={{ display: 'inline-flex', padding: '1rem 2.5rem', cursor: 'pointer', border: 'none' }}
          >
            Claim The Complete Master Suite for $39.99 ➔
          </button>
        </section>
      </div>

      {/* MODAL TRANSPARENTE DE CHECKOUT */}
      <TransparentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
