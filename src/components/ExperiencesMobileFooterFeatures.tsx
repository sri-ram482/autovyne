'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ExperiencesMobileFooterFeatures.module.css';

interface FooterFeatureItem {
  id: string;
  title: string;
  subtext: string;
  iconSrc: string;
  itemClass: string;
  iconClass: string;
  iconWidth: number;
  iconHeight: number;
}

const FOOTER_FEATURES_DATA: FooterFeatureItem[] = [
  {
    id: 'premium-fleet',
    title: 'Premium Fleet',
    subtext: 'World-class Luxury Cars',
    iconSrc: '/icons/Diamond.svg',
    itemClass: styles.itemPremiumFleet,
    iconClass: styles.iconDiamond,
    iconWidth: 15,
    iconHeight: 23,
  },
  {
    id: 'support-24-7',
    title: '24/7 Support',
    subtext: 'Always here for you',
    iconSrc: '/icons/Headset.svg',
    itemClass: styles.itemSupport,
    iconClass: styles.iconHeadset,
    iconWidth: 15,
    iconHeight: 23,
  },
  {
    id: 'secure-booking',
    title: 'Secure Booking',
    subtext: 'Safe & Hassle-free',
    iconSrc: '/icons/Security Shield.svg',
    itemClass: styles.itemSecureBooking,
    iconClass: styles.iconShield,
    iconWidth: 15,
    iconHeight: 22,
  },
  {
    id: 'multiple-locations',
    title: 'Multiple Locations',
    subtext: 'Across New York',
    iconSrc: '/icons/Place Marker.svg',
    itemClass: styles.itemLocations,
    iconClass: styles.iconMarker,
    iconWidth: 15,
    iconHeight: 22,
  },
];

export default function ExperiencesMobileFooterFeatures() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only animate on mobile and tablet viewports (< 1024px)
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;

    const validItems = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validItems.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Staggered fade in + slide up entrance animation
      gsap.fromTo(
        validItems,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 1.4,
          onComplete: () => {
            // 2. Subtle, continuous floating animation for each feature item as a unified visual unit
            const floatConfigs = [
              { y: -3, duration: 3.0, delay: 0 },
              { y: -2.5, duration: 3.4, delay: 0.3 },
              { y: -3, duration: 3.2, delay: 0.6 },
              { y: -2.5, duration: 2.8, delay: 0.9 },
            ];

            validItems.forEach((item, idx) => {
              const cfg = floatConfigs[idx] || { y: -2.5, duration: 3.0, delay: 0 };
              gsap.to(item, {
                y: cfg.y,
                duration: cfg.duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: cfg.delay,
              });
            });
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={styles.footerFeaturesContainer}
      id="experiences-mobile-footer-features"
      aria-label="Features and Services"
    >
      <div className={styles.mobileWrapper}>
        {FOOTER_FEATURES_DATA.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className={`${styles.featureItem} ${item.itemClass}`}
            id={`experiences-footer-feature-${item.id}`}
          >
            {/* Exact supplied SVG artwork */}
            <img
              src={item.iconSrc}
              alt=""
              width={item.iconWidth}
              height={item.iconHeight}
              className={`${styles.featureIcon} ${item.iconClass}`}
            />

            {/* Feature Title: Poppins Medium #5F605F */}
            <span className={styles.featureTitle}>{item.title}</span>

            {/* Feature Subtext: Poppins Medium #1E1F22 */}
            <span className={styles.featureSubtext}>{item.subtext}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
