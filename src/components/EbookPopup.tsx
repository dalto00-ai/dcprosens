'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './EbookPopup.module.css';

export default function EbookPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already closed the popup in this session
        const isDismissed = sessionStorage.getItem('ebook_popup_dismissed');
        if (isDismissed === 'true') {
            return;
        }

        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        sessionStorage.setItem('ebook_popup_dismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={handleClose} aria-label="Close Promotion Modal">
                    ✕
                </button>

                <div className={styles.modalGrid}>
                    {/* Visual Cover Side */}
                    <div className={styles.visualSide}>
                        <div className={styles.coverWrapper}>
                            <Image 
                                src="/ebook-cover.png" 
                                alt="Precision Aim System Cover Stack" 
                                width={180} 
                                height={180} 
                                className={styles.coverImg}
                                priority
                            />
                        </div>
                    </div>

                    {/* Copy Side */}
                    <div className={styles.copySide}>
                        <span className={styles.promoBadge}>
                            ⚡ Special Offer - 80% OFF
                        </span>
                        <h2 className={styles.modalTitle}>
                            Master Pro-Level <span className="text-gradient">Aim consistency</span>
                        </h2>
                        <p className={styles.modalText}>
                            Get the complete <strong>Precision Aim System</strong> (4-Part Technical Manuals, Calibration Blueprints, and Posture Checksheets) for just <strong>$9.00 USD</strong>!
                        </p>
                        
                        <div className={styles.priceRow}>
                            <span className={styles.oldPrice}>$49.00</span>
                            <span className={styles.newPrice}>$9.00 USD</span>
                        </div>

                        <div className={styles.actionBlock}>
                            <Link 
                                href="/ebook" 
                                className={styles.primaryBtn}
                                onClick={handleClose}
                            >
                                Get the System Now ⚡
                            </Link>
                            <button className={styles.secondaryBtn} onClick={handleClose}>
                                No thanks, I&apos;ll stick to default settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
