import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EBOOKS_CATALOG, getEbookBySlug, MASTER_BUNDLE } from '@/data/ebooksData';
import { EbookDetailActionButton } from '@/components/EbookDetailActionButtons';
import styles from './EbookDetail.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return EBOOKS_CATALOG.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getEbookBySlug(slug);

  if (!book) {
    return {
      title: 'Field Guide Not Found — DCPROSENS',
    };
  }

  return {
    title: `${book.title} (Field Guide) — DCPROSENS`,
    description: book.shortDesc,
    alternates: {
      canonical: `https://dcprosens.com/ebooks/${book.slug}/`,
    },
    openGraph: {
      title: `${book.title} — DCPROSENS Esports Field Guide`,
      description: book.shortDesc,
      url: `https://dcprosens.com/ebooks/${book.slug}`,
      images: [
        {
          url: book.mockupImage,
          width: 900,
          height: 1100,
          alt: book.title,
        },
      ],
      type: 'book',
    },
  };
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = getEbookBySlug(slug);

  if (!book) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `https://dcprosens.com/ebooks/${book.slug}/#product`,
        name: book.title,
        description: book.shortDesc,
        image: `https://dcprosens.com${book.mockupImage}`,
        category: 'Digital Book / Esports Technical Field Guide',
        brand: {
          '@type': 'Brand',
          name: 'DCPROSENS',
        },
        offers: {
          '@type': 'Offer',
          price: book.price.toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: book.stripePaymentLink,
          priceValidUntil: '2027-12-31',
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'US',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
          seller: {
            '@type': 'Organization',
            name: 'DCPROSENS',
            url: 'https://dcprosens.com',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: book.rating.toString(),
          reviewCount: book.reviewsCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://dcprosens.com/ebooks/${book.slug}/#faq`,
        mainEntity: book.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://dcprosens.com/ebooks/${book.slug}/#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: book.title,
            item: `https://dcprosens.com/ebooks/${book.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <Link href="/ebooks/">FIELD GUIDES</Link>
          <span>/</span>
          <span style={{ color: '#fff' }}>{book.vol > 0 ? `VOL ${String(book.vol).padStart(2, '0')}` : 'MASTER OMNIBUS'}</span>
        </nav>

        {/* HERO SECTION */}
        <section className={styles.heroGrid}>
          {/* Visual Column */}
          <div className={styles.visualCol}>
            <Image
              src={book.mockupImage}
              alt={`${book.title} 3D Cover Mockup`}
              width={450}
              height={550}
              className={styles.mockupImage}
              priority
            />
          </div>

          {/* Info Column */}
          <div className={styles.infoCol}>
            <div className={styles.badgeRow}>
              <span className={styles.fieldBadge}>{book.badge}</span>
              <div className={styles.ratingBadge}>
                <span>★ ★ ★ ★ ★</span>
                <span>{book.rating} ({book.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className={styles.mainTitle}>{book.title}</h1>
            <div className={styles.subtitle}>{book.subtitle}</div>
            <p className={styles.tagline}>{book.longDesc}</p>

            {/* Pricing Box */}
            <div className={styles.priceBox}>
              <div className={styles.priceHeader}>
                <span className={styles.currentPrice}>${book.price.toFixed(2)} USD</span>
                <span className={styles.regularPrice}>${book.regularPrice.toFixed(2)}</span>
                <span className={styles.discountPill}>SAVE 55% TODAY</span>
              </div>

              <EbookDetailActionButton book={book} variant="hero" />

              <div className={styles.guaranteeRow}>
                <span>✓ Instant PDF Download</span>
                <span>✓ Companion Worksheet Included</span>
                <span>✓ 14-Day Money-Back Guarantee</span>
              </div>

              {/* FUNNEL UPSELL: ORDER BUMP / COMPLETE BUNDLE OFFER */}
              {book.id !== MASTER_BUNDLE.id ? (
                <div className={styles.funnelUpsellCard}>
                  <span className={styles.funnelBadge}>🔥 SPECIAL ONE-TIME OFFER</span>
                  <h3 className={styles.upsellTitle}>
                    Get The Complete 18-Volume Master Omnibus
                  </h3>
                  <p className={styles.upsellDesc}>
                    Upgrade your order to include <strong>all 18 technical field guides</strong> (Full Precision Aim System, GTA VI, CS2 Sub-Tick, Valorant Radiant, Hardware &amp; Controller Mastery) for just <strong>$39.99</strong> instead of $89.94!
                  </p>
                  <div className={styles.upsellActionRow}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through', marginRight: '6px' }}>$89.94</span>
                      <span className={styles.upsellPrice}>$39.99 USD</span>
                    </div>
                    <EbookDetailActionButton book={book} variant="upsell" />
                  </div>
                </div>
              ) : (
                <div className={styles.funnelUpsellCard} style={{ borderColor: 'rgba(0, 255, 157, 0.4)', background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)' }}>
                  <span className={styles.funnelBadge} style={{ background: 'rgba(0, 255, 157, 0.2)', color: '#00ff9d' }}>🌟 FULL 18-VOLUME ARCHIVE</span>
                  <h3 className={styles.upsellTitle} style={{ color: '#00ff9d' }}>
                    Includes All 18 Field Guides + Companion Worksheets
                  </h3>
                  <p className={styles.upsellDesc}>
                    Immediate download access to the complete 62-page omnibus, lifetime engine updates, and all individual PDFs (Volumes 1 through 18) for just <strong>$39.99</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT YOU WILL MASTER */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionPre}>COMPETITIVE ADVANTAGE</div>
            <h2 className={styles.sectionH2}>What You Will Master Inside</h2>
            <p className={styles.sectionSub}>
              Zero fluff. Every page delivers actionable engineering rules, telemetry calculations, and direct settings you can apply immediately.
            </p>
          </div>

          <div className={styles.masteryGrid}>
            {book.whatYouWillMaster.map((item, idx) => (
              <div key={idx} className={styles.masteryCard}>
                <div className={styles.checkIcon}>✓</div>
                <div className={styles.masteryText}>{item}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FULL CURRICULUM */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionPre}>STEP-BY-STEP BLUEPRINT</div>
            <h2 className={styles.sectionH2}>{book.vol > 0 ? 'Complete Curriculum' : 'Complete 18-Volume Syllabus Breakdown (62 Pages)'}</h2>
            <p className={styles.sectionSub}>
              Designed in an editorial field-guide format with structured steps, comparative diagrams, and a dedicated pre-match routine.
            </p>
          </div>

          <div className={styles.chaptersList}>
            {book.chapters.map((ch) => (
              <div key={ch.number} className={styles.chapterItem}>
                <div className={styles.chapterNum}>{book.vol > 0 ? `P${String(ch.number).padStart(2, '0')}` : `SEC ${String(ch.number).padStart(2, '0')}`}</div>
                <div className={styles.chapterInfo}>
                  <h4>{ch.title}</h4>
                  <p>{ch.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: TESTIMONIALS */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionPre}>VERIFIED RESULTS</div>
            <h2 className={styles.sectionH2}>Dominating The Ranked Ladders</h2>
            <p className={styles.sectionSub}>
              Read how competitive players transformed their mechanical consistency using this field guide.
            </p>
          </div>

          <div className={styles.testiGrid}>
            {book.testimonials.map((t, idx) => (
              <div key={idx} className={styles.testiCard}>
                <p className={styles.testiQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.testiAuthor}>
                  <span className={styles.testiName}>{t.name}</span>
                  <span className={styles.testiRank}>{t.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: 100% MONEY-BACK GUARANTEE */}
        <section className={styles.sectionBlock}>
          <div className={styles.guaranteeCard}>
            <div className={styles.shieldIcon}>🛡️</div>
            <div>
              <h3>14-Day Zero-Risk 100% Money-Back Guarantee</h3>
              <p>
                We stand behind our esports research 100%. If you apply this guide and do not experience a noticeable, measurable improvement in your mechanical consistency, target tracking, or system responsiveness within 14 days, simply email <strong>support@dcprosens.com</strong> for a full, prompt refund. No questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionPre}>QUESTIONS &amp; ANSWERS</div>
            <h2 className={styles.sectionH2}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {book.faq.map((item, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA BOX */}
        <section style={{ textAlign: 'center', background: '#0c101a', border: '1px solid rgba(0, 255, 157, 0.3)', borderRadius: '12px', padding: '3.5rem 1.5rem', margin: '3rem auto', maxWidth: '780px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Elevate Your Mechanical Precision Today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.5 }}>
            Join thousands of competitive players who eliminated inconsistent aim and unlocked predictable tournament execution.
          </p>
          <EbookDetailActionButton book={book} variant="final" />
        </section>
      </div>

      {/* Sticky Mobile Bar */}
      <div className={styles.stickyBottomBar}>
        <div className={styles.stickyPrice}>
          <span>{book.title}</span>
          <span>${book.price.toFixed(2)}</span>
        </div>
        <EbookDetailActionButton book={book} variant="sticky" />
      </div>
    </div>
  );
}
