'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './EmptyCartCard.module.css';

export default function EmptyCartCard() {
  const boxDesktopRef = useRef<HTMLDivElement>(null);
  const boxMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION (>= 768px, 1440x900)
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      if (boxDesktopRef.current) {
        gsap.fromTo(
          boxDesktopRef.current,
          { opacity: 0, y: 22, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
        );
      }
    });

    // ========================================================
    // MOBILE ANIMATION (< 768px, 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      if (boxMobileRef.current) {
        gsap.fromTo(
          boxMobileRef.current,
          { opacity: 0, y: 15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out', delay: 0.15 }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className={styles.emptyCartSection}
      id="autovyne-empty-cart-section"
      aria-label="Empty Shopping Cart"
    >
      {/* ========================================================
          DESKTOP (>= 768px, 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <div
          ref={boxDesktopRef}
          className={styles.emptyBoxDesktop}
          id="empty-cart-card-desktop"
        >
          {/* Shopping Cart Icon */}
          <div className={styles.iconDesktopWrapper} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CACACA"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>

          {/* Empty Cart Message */}
          <h2 className={styles.titleDesktop} id="empty-cart-title-desktop">
            Your Cart Is Empty
          </h2>

          {/* Subtitle */}
          <p className={styles.subtitleDesktop} id="empty-cart-subtitle-desktop">
            Explore our fleet and reserve your extraordinary drive.
          </p>
        </div>
      </div>

      {/* ========================================================
          MOBILE (< 768px, 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <div
          ref={boxMobileRef}
          className={styles.emptyBoxMobile}
          id="empty-cart-card-mobile"
        >
          {/* Shopping Cart Icon */}
          <div className={styles.iconMobileWrapper} aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CACACA"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>

          {/* Empty Cart Message */}
          <h2 className={styles.titleMobile} id="empty-cart-title-mobile">
            Your Cart Is Empty
          </h2>

          {/* Subtitle */}
          <p className={styles.subtitleMobile} id="empty-cart-subtitle-mobile">
            Explore our fleet and reserve your extraordinary drive.
          </p>
        </div>
      </div>
    </section>
  );
}
