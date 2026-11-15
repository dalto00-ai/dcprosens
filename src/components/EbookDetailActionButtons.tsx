'use client';

import React, { useState } from 'react';
import { EbookProduct, MASTER_BUNDLE } from '@/data/ebooksData';
import { TransparentCheckoutModal, CheckoutProduct } from '@/components/TransparentCheckoutModal';
import styles from '@/app/ebooks/[slug]/EbookDetail.module.css';

interface Props {
  book: EbookProduct;
  variant: 'hero' | 'upsell' | 'final' | 'sticky';
}

export const EbookDetailActionButton: React.FC<Props> = ({ book, variant }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CheckoutProduct | null>(null);

  const openBookCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProduct({
      id: book.id,
      title: book.title,
      price: book.price,
      plan: book.id === MASTER_BUNDLE.id ? 'ebook-bundle' : `ebook-vol${book.vol}`,
      subtitle: book.subtitle,
      badge: book.badge,
      fallbackUrl: book.stripePaymentLink,
    });
    setIsCheckoutOpen(true);
  };

  const openBundleCheckout = (e: React.MouseEvent) => {
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

  return (
    <>
      {variant === 'hero' && (
        <button
          onClick={openBookCheckout}
          className={styles.ctaButton}
          style={{ cursor: 'pointer', border: 'none', width: '100%' }}
        >
          Instant Access &amp; Download (${book.price.toFixed(2)}) ⚡
        </button>
      )}

      {variant === 'upsell' && (
        <button
          onClick={openBundleCheckout}
          className={styles.upsellButton}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          Upgrade to Master Bundle ($39.99) ➔
        </button>
      )}

      {variant === 'final' && (
        <button
          onClick={openBookCheckout}
          className={styles.ctaButton}
          style={{ maxWidth: '420px', margin: '0 auto', cursor: 'pointer', border: 'none', width: '100%' }}
        >
          Download {book.title} (${book.price.toFixed(2)}) ⚡
        </button>
      )}

      {variant === 'sticky' && (
        <button
          onClick={openBookCheckout}
          className={styles.stickyBtn}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          Buy Now (${book.price.toFixed(2)})
        </button>
      )}

      <TransparentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};
