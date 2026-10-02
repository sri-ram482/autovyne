'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './CheckoutSuccessCard.module.css';

export default function CheckoutSuccessCard() {
  const boxDesktopRef = useRef<HTMLDivElement>(null);
  const iconDesktopRef = useRef<HTMLDivElement>(null);
  const titleDesktopRef = useRef<HTMLHeadingElement>(null);
  const subtitleDesktopRef = useRef<HTMLParagraphElement>(null);
  const btnDesktopRef = useRef<HTMLAnchorElement>(null);

  const boxMobileRef = useRef<HTMLDivElement>(null);
  const iconMobileRef = useRef<HTMLDivElement>(null);
  const titleMobileRef = useRef<HTMLHeadingElement>(null);
  const subtitleMobileRef = useRef<HTMLParagraphElement>(null);
  const btnMobileRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ENTRANCE (>= 768px, 1440x900)
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({ delay: 0.15 });

      if (boxDesktopRef.current) {
        tl.fromTo(
          boxDesktopRef.current,
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
          0.0
        );
      }

      if (iconDesktopRef.current) {
        tl.fromTo(
          iconDesktopRef.current,
          { opacity: 0, scale: 0.65 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' },
          0.2
        );
      }

      if (titleDesktopRef.current) {
        tl.fromTo(
          titleDesktopRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.3
        );
      }

      if (subtitleDesktopRef.current) {
        tl.fromTo(
          subtitleDesktopRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.38
        );
      }

      if (btnDesktopRef.current) {
        tl.fromTo(
          btnDesktopRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.46
        );
      }
    });

    // ========================================================
    // MOBILE ENTRANCE (< 768px, 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (boxMobileRef.current) {
        tl.fromTo(
          boxMobileRef.current,
          { opacity: 0, y: 16, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
          0.0
        );
      }

      if (iconMobileRef.current) {
        tl.fromTo(
          iconMobileRef.current,
          { opacity: 0, scale: 0.65 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
          0.15
        );
      }

      if (titleMobileRef.current) {
        tl.fromTo(
          titleMobileRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.25
        );
      }

      if (subtitleMobileRef.current) {
        tl.fromTo(
          subtitleMobileRef.current,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.32
        );
      }

      if (btnMobileRef.current) {
        tl.fromTo(
          btnMobileRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.38
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className={styles.successSection}
      id="autovyne-checkout-success-section"
      aria-label="Booking Confirmation Success"
    >
      {/* ========================================================
          DESKTOP (>= 768px, 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <div
          ref={boxDesktopRef}
          className={styles.successBoxDesktop}
          id="checkout-success-card-desktop"
        >
          {/* Aesthetic Green Tick Icon */}
          <div
            ref={iconDesktopRef}
            className={styles.iconWrapperDesktop}
            aria-hidden="true"
          >
            <svg
              className={styles.tickSvg}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Booking Success Heading */}
          <h2
            ref={titleDesktopRef}
            className={styles.titleDesktop}
            id="checkout-success-title-desktop"
          >
            BOOKING SUCCESSFUL
          </h2>

          {/* Subtitle Message */}
          <p
            ref={subtitleDesktopRef}
            className={styles.subtitleDesktop}
            id="checkout-success-subtitle-desktop"
          >
            Your reservation has been confirmed. A confirmation receipt has been sent to your email.
          </p>

          {/* Back Navigation Link */}
          <Link
            ref={btnDesktopRef}
            href="/fleet"
            className={styles.actionBtnDesktop}
            id="checkout-success-btn-desktop"
          >
            Explore Our Fleet
          </Link>
        </div>
      </div>

      {/* ========================================================
          MOBILE (< 768px, 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <div
          ref={boxMobileRef}
          className={styles.successBoxMobile}
          id="checkout-success-card-mobile"
        >
          {/* Aesthetic Green Tick Icon */}
          <div
            ref={iconMobileRef}
            className={styles.iconWrapperMobile}
            aria-hidden="true"
          >
            <svg
              className={styles.tickSvgMobile}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Booking Success Heading */}
          <h2
            ref={titleMobileRef}
            className={styles.titleMobile}
            id="checkout-success-title-mobile"
          >
            BOOKING SUCCESSFUL
          </h2>

          {/* Subtitle Message */}
          <p
            ref={subtitleMobileRef}
            className={styles.subtitleMobile}
            id="checkout-success-subtitle-mobile"
          >
            Your reservation has been confirmed. A confirmation receipt has been sent to your email.
          </p>

          {/* Back Navigation Link */}
          <Link
            ref={btnMobileRef}
            href="/fleet"
            className={styles.actionBtnMobile}
            id="checkout-success-btn-mobile"
          >
            Explore Our Fleet
          </Link>
        </div>
      </div>
    </section>
  );
}
