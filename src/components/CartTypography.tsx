'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CartTypography.module.css';

export default function CartTypography() {
  // Desktop Refs
  const yourCartDesktopRef = useRef<HTMLHeadingElement>(null);
  const driveDesktopRef = useRef<HTMLDivElement>(null);
  const yourDreamsDesktopRef = useRef<HTMLDivElement>(null);
  const descriptionDesktopRef = useRef<HTMLParagraphElement>(null);

  // Mobile Refs
  const yourCartMobileRef = useRef<HTMLHeadingElement>(null);
  const driveMobileRef = useRef<HTMLDivElement>(null);
  const yourDreamsMobileRef = useRef<HTMLDivElement>(null);
  const descriptionMobileRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATIONS (>= 768px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      gsap.set(
        [
          yourCartDesktopRef.current,
          driveDesktopRef.current,
          yourDreamsDesktopRef.current,
          descriptionDesktopRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.25 });

      // 1. YOUR CART (fade in + subtle slide down)
      tl.fromTo(
        yourCartDesktopRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.0
      );

      // 2. DRIVE (fade in + subtle slide up)
      tl.fromTo(
        driveDesktopRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        0.12
      );

      // 3. YOUR DREAMS (fade in + subtle slide up)
      tl.fromTo(
        yourDreamsDesktopRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.24
      );

      // 4. Description (fade in + subtle slide right)
      tl.fromTo(
        descriptionDesktopRef.current,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' },
        0.36
      );
    });

    // ========================================================
    // MOBILE ANIMATIONS (< 768px, Figma 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      gsap.set(
        [
          yourCartMobileRef.current,
          driveMobileRef.current,
          yourDreamsMobileRef.current,
          descriptionMobileRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.2 });

      // 1. YOUR CART
      tl.fromTo(
        yourCartMobileRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.0
      );

      // 2. DRIVE
      tl.fromTo(
        driveMobileRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.1
      );

      // 3. YOUR DREAMS
      tl.fromTo(
        yourDreamsMobileRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.2
      );

      // 4. Description
      tl.fromTo(
        descriptionMobileRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.3
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className={styles.cartSection}
      id="autovyne-cart-typography-section"
      aria-label="Cart Page Header and Overview"
    >
      {/* ========================================================
          DESKTOP IMPLEMENTATION (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        {/* 1. YOUR CART Heading */}
        <h2
          ref={yourCartDesktopRef}
          className={styles.yourCartDesktop}
          id="cart-heading-your-cart-desktop"
        >
          YOUR CART
        </h2>

        {/* 2. DRIVE Big Text */}
        <div
          ref={driveDesktopRef}
          className={styles.driveDesktop}
          id="cart-text-drive-desktop"
          aria-hidden="true"
        >
          DRIVE
        </div>

        {/* 3. YOUR DREAMS Big Text */}
        <div
          ref={yourDreamsDesktopRef}
          className={styles.yourDreamsDesktop}
          id="cart-text-your-dreams-desktop"
          aria-hidden="true"
        >
          YOUR DREAMS
        </div>

        {/* 4. Description */}
        <p
          ref={descriptionDesktopRef}
          className={styles.descriptionDesktop}
          id="cart-description-desktop"
        >
          Review your selection{'\n'}and complete your booking.
        </p>
      </div>

      {/* ========================================================
          MOBILE IMPLEMENTATION (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        {/* 1. YOUR CART Heading */}
        <h2
          ref={yourCartMobileRef}
          className={styles.yourCartMobile}
          id="cart-heading-your-cart-mobile"
        >
          YOUR CART
        </h2>

        {/* 2. DRIVE Big Text */}
        <div
          ref={driveMobileRef}
          className={styles.driveMobile}
          id="cart-text-drive-mobile"
          aria-hidden="true"
        >
          DRIVE
        </div>

        {/* 3. YOUR DREAMS Big Text */}
        <div
          ref={yourDreamsMobileRef}
          className={styles.yourDreamsMobile}
          id="cart-text-your-dreams-mobile"
          aria-hidden="true"
        >
          YOUR DREAMS
        </div>

        {/* 4. Description */}
        <p
          ref={descriptionMobileRef}
          className={styles.descriptionMobile}
          id="cart-description-mobile"
        >
          Review your selection{'\n'}and complete your booking.
        </p>
      </div>
    </section>
  );
}
