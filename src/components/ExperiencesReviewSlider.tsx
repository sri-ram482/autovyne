'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EXPERIENCES_REVIEWS, ReviewItem } from '@/data/experiencesReviews';
import styles from './ExperiencesReviewSlider.module.css';

export default function ExperiencesReviewSlider() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Desktop configuration (5 cards visible at a time, 10 total)
  const VISIBLE_CARDS_DESKTOP = 5;
  const maxDesktopIndex = EXPERIENCES_REVIEWS.length - VISIBLE_CARDS_DESKTOP; // 5

  // Mobile configuration (1 centered card at a time, 10 total)
  const maxMobileIndex = EXPERIENCES_REVIEWS.length - 1; // 9

  const trackDesktopRef = useRef<HTMLDivElement>(null);
  const trackMobileRef = useRef<HTMLDivElement>(null);

  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const leftBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const rightBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const dividerDesktopRef = useRef<HTMLDivElement>(null);

  const leftBtnMobileRef = useRef<HTMLButtonElement>(null);
  const rightBtnMobileRef = useRef<HTMLButtonElement>(null);
  const dividerMobileRef = useRef<HTMLDivElement>(null);

  // Touch & Swipe gesture state for Mobile
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const isSwiping = useRef(false);

  // Mouse drag gesture state for desktop testing of mobile viewport
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validDesktopCards = desktopCardsRef.current.filter(Boolean);
      const validMobileCards = mobileCardsRef.current.filter(Boolean);

      // 1. Staggered fade in + slide up for review cards
      if (validDesktopCards.length > 0) {
        gsap.fromTo(
          validDesktopCards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 1.1,
          }
        );
      }

      if (validMobileCards.length > 0) {
        gsap.fromTo(
          validMobileCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 1.1,
          }
        );
      }

      // 2. Entrance for circular glass slider buttons
      const leftButtons = [leftBtnDesktopRef.current, leftBtnMobileRef.current].filter(Boolean);
      const rightButtons = [rightBtnDesktopRef.current, rightBtnMobileRef.current].filter(Boolean);
      const dividers = [dividerDesktopRef.current, dividerMobileRef.current].filter(Boolean);

      if (leftButtons.length > 0) {
        gsap.fromTo(
          leftButtons,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 1.35 }
        );
      }

      if (rightButtons.length > 0) {
        gsap.fromTo(
          rightButtons,
          { opacity: 0, x: 15 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 1.35 }
        );
      }

      // 3. Subtle horizontal reveal for #242424 center divider line
      if (dividers.length > 0) {
        gsap.fromTo(
          dividers,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out', delay: 1.35 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Desktop Slider Transition Animation
  const isDesktopMounted = useRef(false);
  useEffect(() => {
    if (!trackDesktopRef.current) return;
    const cardWidth = 250;
    const cardGap = 16;
    const targetX = -desktopIndex * (cardWidth + cardGap);

    if (!isDesktopMounted.current) {
      isDesktopMounted.current = true;
      gsap.set(trackDesktopRef.current, { x: targetX });
    } else {
      gsap.to(trackDesktopRef.current, {
        x: targetX,
        duration: 0.55,
        ease: 'power2.out',
      });
    }
  }, [desktopIndex]);

  // Mobile Slider Transition Animation
  const isMobileMounted = useRef(false);
  useEffect(() => {
    if (!trackMobileRef.current) return;
    const cardWidth = 233;
    const cardGap = 27;
    // In Figma mobile (390px), active card is centered: (390 - 233) / 2 = 78.5px
    const initialOffset = 78.5;
    const targetX = initialOffset - mobileIndex * (cardWidth + cardGap);

    if (!isMobileMounted.current) {
      isMobileMounted.current = true;
      gsap.set(trackMobileRef.current, { x: targetX });
    } else {
      gsap.to(trackMobileRef.current, {
        x: targetX,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mobileIndex]);

  // Navigation handlers
  // Left button: moves back towards start (slide right to left)
  const handleDesktopLeft = () => {
    setDesktopIndex((prev) => Math.max(0, prev - 1));
  };

  // Right button: advances towards end (slide left to right)
  const handleDesktopRight = () => {
    setDesktopIndex((prev) => Math.min(maxDesktopIndex, prev + 1));
  };

  const handleMobileLeft = () => {
    setMobileIndex((prev) => Math.max(0, prev - 1));
  };

  const handleMobileRight = () => {
    setMobileIndex((prev) => Math.min(maxMobileIndex, prev + 1));
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current || touchStartX.current === null) return;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current || touchStartX.current === null || touchCurrentX.current === null) {
      isSwiping.current = false;
      return;
    }
    const diffX = touchCurrentX.current - touchStartX.current;
    const SWIPE_THRESHOLD = 35; // minimum swipe distance in px

    if (diffX < -SWIPE_THRESHOLD) {
      // Swiped left (finger moved right-to-left) -> Next review
      setMobileIndex((prev) => Math.min(maxMobileIndex, prev + 1));
    } else if (diffX > SWIPE_THRESHOLD) {
      // Swiped right (finger moved left-to-right) -> Previous review
      setMobileIndex((prev) => Math.max(0, prev - 1));
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
    isSwiping.current = false;
  };

  // Mouse Drag Handlers for Mobile Viewport (allows dragging with mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) {
      isMouseDown.current = false;
      return;
    }
    const diffX = e.clientX - mouseStartX.current;
    const SWIPE_THRESHOLD = 35;

    if (diffX < -SWIPE_THRESHOLD) {
      setMobileIndex((prev) => Math.min(maxMobileIndex, prev + 1));
    } else if (diffX > SWIPE_THRESHOLD) {
      setMobileIndex((prev) => Math.max(0, prev - 1));
    }

    mouseStartX.current = null;
    isMouseDown.current = false;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    mouseStartX.current = null;
  };

  // Helper to render exactly 5 stars with active #FFBF00 and inactive #363232
  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((starNum) => {
      const isActive = starNum <= rating;
      return (
        <svg
          key={starNum}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={styles.starSvg}
          aria-hidden="true"
        >
          <path
            d="M5 1L6.236 3.504L9 3.908L7 5.858L7.472 8.612L5 7.312L2.528 8.612L3 5.858L1 3.908L3.764 3.504L5 1Z"
            fill={isActive ? '#FFBF00' : '#363232'}
          />
        </svg>
      );
    });
  };

  return (
    <section
      className={styles.reviewsSection}
      id="experiences-ratings-layout"
      aria-label="Customer reviews and ratings"
    >
      {/* ========================================================
          DESKTOP VIEW (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        {/* Frame 32: Reviews container (w: 1314px, h: 177px) */}
        <div
          className={styles.reviewViewportDesktop}
          id="reviews-viewport-desktop"
        >
          <div ref={trackDesktopRef} className={styles.trackDesktop}>
            {EXPERIENCES_REVIEWS.map((review: ReviewItem, idx: number) => (
              <div
                key={`desktop-review-${review.id}-${idx}`}
                ref={(el) => {
                  desktopCardsRef.current[idx] = el;
                }}
                className={styles.cardDesktop}
                id={`desktop-review-card-${review.id}`}
              >
                {/* Decorative Top Quote Mark */}
                <span className={styles.quoteMarkDesktop} aria-hidden="true">
                  “
                </span>

                {/* Review Text in Port Lligat Slab */}
                <p className={styles.reviewTextDesktop}>
                  {review.text}
                </p>

                {/* Circular Profile Picture */}
                <div className={styles.avatarContainerDesktop}>
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className={styles.avatarImageDesktop}
                  />
                </div>

                {/* User Information */}
                <div className={styles.userInfoDesktop}>
                  <h4 className={styles.userNameDesktop}>{review.userName}</h4>
                  <span className={styles.userLocationDesktop}>{review.cityPlace}</span>
                  <div
                    className={styles.starsRowDesktop}
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frame 33: Controls container (x: 59px, y: 832px, w: 1316px, h: 38px) */}
        <div className={styles.controlsDesktop} id="slider-controls-desktop">
          {/* Left Circular Glass Button: In start left chevron button is disabled */}
          <button
            ref={leftBtnDesktopRef}
            onClick={handleDesktopLeft}
            disabled={desktopIndex === 0}
            className={styles.sliderButtonDesktop}
            id="slider-button-left-desktop"
            aria-label="Previous reviews (slide right to left)"
          >
            <img
              src="/icons/Chevron Left.svg"
              alt="Previous"
              className={styles.chevronIconDesktop}
            />
          </button>

          {/* Center Divider Line (#242424) */}
          <div ref={dividerDesktopRef} className={styles.dividerLineDesktop} />

          {/* Right Circular Glass Button: In end of slider right chevron button is disabled */}
          <button
            ref={rightBtnDesktopRef}
            onClick={handleDesktopRight}
            disabled={desktopIndex === maxDesktopIndex}
            className={styles.sliderButtonDesktop}
            id="slider-button-right-desktop"
            aria-label="Next reviews (slide left to right)"
          >
            <img
              src="/icons/Chevron Right.svg"
              alt="Next"
              className={styles.chevronIconDesktop}
            />
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE VIEW (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        {/* Frame 38: Mobile Reviews Viewport (y: 551px, h: 157px) with touch swipe */}
        <div
          className={styles.reviewViewportMobile}
          id="reviews-viewport-mobile"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={trackMobileRef} className={styles.trackMobile}>
            {EXPERIENCES_REVIEWS.map((review: ReviewItem, idx: number) => (
              <div
                key={`mobile-review-${review.id}-${idx}`}
                ref={(el) => {
                  mobileCardsRef.current[idx] = el;
                }}
                className={styles.cardMobile}
                id={`mobile-review-card-${review.id}`}
              >
                {/* Decorative Top Quote Mark */}
                <span className={styles.quoteMarkMobile} aria-hidden="true">
                  “
                </span>

                {/* Review Text in Port Lligat Slab */}
                <p className={styles.reviewTextMobile}>
                  {review.text}
                </p>

                {/* Circular Profile Picture */}
                <div className={styles.avatarContainerMobile}>
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className={styles.avatarImageMobile}
                  />
                </div>

                {/* User Information */}
                <div className={styles.userInfoMobile}>
                  <h4 className={styles.userNameMobile}>{review.userName}</h4>
                  <span className={styles.userLocationMobile}>{review.cityPlace}</span>
                  <div
                    className={styles.starsRowMobile}
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frame 39: Mobile Controls (x: 74px, y: 717px, w: 262px, h: 27px) */}
        <div className={styles.controlsMobile} id="slider-controls-mobile">
          {/* Left Circular Glass Button: Disabled at start */}
          <button
            ref={leftBtnMobileRef}
            onClick={handleMobileLeft}
            disabled={mobileIndex === 0}
            className={styles.sliderButtonMobile}
            id="slider-button-left-mobile"
            aria-label="Previous review (slide right to left)"
          >
            <img
              src="/icons/Chevron Left.svg"
              alt="Previous"
              className={styles.chevronIconMobile}
            />
          </button>

          {/* Center Divider Line (#242424) */}
          <div ref={dividerMobileRef} className={styles.dividerLineMobile} />

          {/* Right Circular Glass Button: Disabled at end */}
          <button
            ref={rightBtnMobileRef}
            onClick={handleMobileRight}
            disabled={mobileIndex === maxMobileIndex}
            className={styles.sliderButtonMobile}
            id="slider-button-right-mobile"
            aria-label="Next review (slide left to right)"
          >
            <img
              src="/icons/Chevron Right.svg"
              alt="Next"
              className={styles.chevronIconMobile}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
