'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ExperiencesStatCards.module.css';

export default function ExperiencesStatCards() {
  const containerDesktopRef = useRef<HTMLDivElement>(null);
  const containerMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP TIMELINE (>= 1024px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 1024px)', () => {
      const cards = containerDesktopRef.current?.querySelectorAll(
        `.${styles.cardDesktop}`
      );
      if (!cards || cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 18 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power2.out',
        },
        0.45 // Arrives smoothly alongside the description
      );
    });

    // ========================================================
    // MOBILE & TABLET TIMELINE (< 1024px)
    // ========================================================
    mm.add('(max-width: 1023px)', () => {
      const cards = containerMobileRef.current?.querySelectorAll(
        `.${styles.cardMobile}`
      );
      if (!cards || cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 14 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        cards,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
        },
        0.75 // Arrives gracefully after the main headings
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      className={styles.statCardsSection}
      id="experiences-stat-cards-section"
      aria-label="Experience Highlights"
    >
      {/* ================= DESKTOP (1440x900, Frame 31) ================= */}
      <div className={styles.desktopWrapper}>
        <div
          ref={containerDesktopRef}
          className={styles.statCardsContainerDesktop}
          id="experiences-stat-cards-desktop"
        >
          {/* Card 1: Average Rating */}
          <div
            className={styles.cardDesktop}
            id="experiences-stat-card-rating-desktop"
          >
            <div className={styles.valueRatingDesktop}>
              <span className={styles.ratingNumberDesktop}>4.9</span>
              <span className={styles.ratingUnitDesktop}>/5</span>
            </div>
            <p className={styles.labelDesktop}>
              Average
              <br />
              Rating
            </p>
            <img
              src="/icons/Star.svg"
              alt="Star Rating"
              className={styles.iconDesktop}
              width={30}
              height={30}
            />
          </div>

          {/* Card 2: Happy Customers */}
          <div
            className={styles.cardDesktop}
            id="experiences-stat-card-customers-desktop"
          >
            <div className={styles.valueCustomersDesktop}>2500+</div>
            <p className={styles.labelDesktop}>
              Happy
              <br />
              Customers
            </p>
            <img
              src="/icons/User Account.svg"
              alt="Happy Customers"
              className={styles.iconDesktop}
              width={30}
              height={30}
            />
          </div>

          {/* Card 3: Recommended Us */}
          <div
            className={styles.cardDesktop}
            id="experiences-stat-card-recommended-desktop"
          >
            <div className={styles.valueRecommendedDesktop}>98%</div>
            <p className={styles.labelDesktop}>
              Recommended
              <br />
              Us
            </p>
            <img
              src="/icons/Facebook Like.svg"
              alt="Recommended Us"
              className={styles.iconDesktop}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      {/* ================= MOBILE (390x844, Frame 37) ================= */}
      <div className={styles.mobileWrapper}>
        <div
          ref={containerMobileRef}
          className={styles.statCardsContainerMobile}
          id="experiences-stat-cards-mobile"
        >
          {/* Card 1: Average Rating */}
          <div
            className={styles.cardMobile}
            id="experiences-stat-card-rating-mobile"
          >
            <div className={styles.valueRatingMobile}>
              <span className={styles.ratingNumberMobile}>4.9</span>
              <span className={styles.ratingUnitMobile}>/5</span>
            </div>
            <p className={styles.labelMobile}>Average Rating</p>
            <img
              src="/icons/Star.svg"
              alt="Star Rating"
              className={styles.iconMobile}
              width={15}
              height={15}
            />
          </div>

          {/* Card 2: Happy Customers */}
          <div
            className={styles.cardMobile}
            id="experiences-stat-card-customers-mobile"
          >
            <div className={styles.valueCustomersMobile}>2500+</div>
            <p className={styles.labelMobile}>Happy Customers</p>
            <img
              src="/icons/User Account.svg"
              alt="Happy Customers"
              className={styles.iconMobile}
              width={15}
              height={15}
            />
          </div>

          {/* Card 3: Recommended Us */}
          <div
            className={styles.cardMobile}
            id="experiences-stat-card-recommended-mobile"
          >
            <div className={styles.valueRecommendedMobile}>98%</div>
            <p className={styles.labelMobile}>Recommended Us</p>
            <img
              src="/icons/Facebook Like.svg"
              alt="Recommended Us"
              className={styles.iconMobile}
              width={15}
              height={15}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
