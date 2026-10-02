'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { VehicleRatingData } from '@/data/vehicleSpecs';
import styles from './SpecificationRating.module.css';

interface SpecificationRatingProps {
  ratingData: VehicleRatingData;
}

export default function SpecificationRating({ ratingData }: SpecificationRatingProps) {
  const desktopFrameRef = useRef<HTMLDivElement>(null);
  const mobileFrameRef = useRef<HTMLDivElement>(null);

  // Entrance animation matching GSAP sequence (Stage 15: Step 1 Rating layout)
  useEffect(() => {
    const frames = [desktopFrameRef.current, mobileFrameRef.current].filter(Boolean);
    if (frames.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frames,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.55 }
      );
    });

    return () => ctx.revert();
  }, [ratingData]);

  // Star Category renderer helper (Exact same Fleet rating visual language)
  const renderStarCategory = (
    score: number,
    label: string,
    isMobile: boolean
  ) => {
    const size = isMobile ? 11 : 15;
    return (
      <div
        className={isMobile ? styles.categoryRowMobile : styles.categoryRowDesktop}
        data-category={label.toLowerCase()}
      >
        <div
          className={isMobile ? styles.starsFrameMobile : styles.starsFrameDesktop}
          aria-label={`${score} out of 5 stars for ${label}`}
        >
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isActive = starNum <= score;
            return (
              <svg
                key={starNum}
                width={size}
                height={size}
                viewBox="0 0 15 15"
                fill="none"
                className={styles.starSvg}
              >
                <path
                  d="M7.5 1.5L9.354 5.256L13.5 5.862L10.5 8.787L11.208 12.918L7.5 10.968L3.792 12.918L4.5 8.787L1.5 5.862L5.646 5.256L7.5 1.5Z"
                  fill={isActive ? '#FFBF00' : '#363232'}
                  style={{
                    transition: `fill 0.35s ease ${starNum * 40}ms`,
                  }}
                />
              </svg>
            );
          })}
        </div>
        <span className={isMobile ? styles.categoryLabelMobile : styles.categoryLabelDesktop}>
          {label}
        </span>
      </div>
    );
  };

  const desktopOffset = 232.48 * (1 - Math.min(Math.max(ratingData.rating, 0), 5) / 5);
  const mobileOffset = 150.8 * (1 - Math.min(Math.max(ratingData.rating, 0), 5) / 5);

  return (
    <>
      {/* DESKTOP RATING FRAME (Figma 188:114 node 219:11: left 1047px, top 673px, 327x118px) */}
      <div
        ref={desktopFrameRef}
        className={styles.desktopRatingFrame}
        id="specs-rating-desktop"
        aria-label="Vehicle ratings"
      >
        {/* Left: Circular Rating Gauge */}
        <div className={styles.gaugeContainerDesktop}>
          <svg width="88" height="85" viewBox="0 0 88 88" className={styles.gaugeSvg}>
            <circle
              cx="44"
              cy="44"
              r="37"
              fill="none"
              stroke="#171717"
              strokeWidth="7"
            />
            <circle
              id="specs-desktop-gauge-ring"
              cx="44"
              cy="44"
              r="37"
              fill="none"
              stroke="#003507"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={232.48}
              strokeDashoffset={desktopOffset}
              transform="rotate(-90 44 44)"
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
            />
          </svg>
          <div className={styles.desktopRatingValue} id="specs-desktop-rating-value">
            {ratingData.rating.toFixed(1)}
          </div>
          <div className={styles.desktopOverallRatingLabel}>Overall Rating</div>
        </div>

        {/* Right: Category Rows with 5 Stars Each */}
        <div className={styles.categoriesContainerDesktop}>
          {renderStarCategory(ratingData.performance, 'Performance', false)}
          {renderStarCategory(ratingData.comfort, 'Comfort', false)}
          {renderStarCategory(ratingData.design, 'Design', false)}
        </div>
      </div>

      {/* MOBILE RATING FRAME (Figma 188:460 node 188:561: left 20px, top 210px, 241x99px) */}
      <div
        ref={mobileFrameRef}
        className={styles.mobileRatingFrame}
        id="specs-rating-mobile"
        aria-label="Vehicle ratings"
      >
        {/* Left: Circular Rating Gauge */}
        <div className={styles.gaugeContainerMobile}>
          <svg width="60" height="58" viewBox="0 0 60 60" className={styles.gaugeSvgMobile}>
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="#171717"
              strokeWidth="6"
            />
            <circle
              id="specs-mobile-gauge-ring"
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="#003507"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={mobileOffset}
              transform="rotate(-90 30 30)"
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
            />
          </svg>
          <div className={styles.mobileRatingValue} id="specs-mobile-rating-value">
            {ratingData.rating.toFixed(1)}
          </div>
          <div className={styles.mobileOverallRatingLabel}>Overall Rating</div>
        </div>

        {/* Right: Category Rows with 5 Stars Each */}
        <div className={styles.categoriesContainerMobile}>
          {renderStarCategory(ratingData.performance, 'Performance', true)}
          {renderStarCategory(ratingData.comfort, 'Comfort', true)}
          {renderStarCategory(ratingData.design, 'Design', true)}
        </div>
      </div>
    </>
  );
}
