'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './FooterFeatures.module.css';

interface FeatureItemData {
  id: string;
  title: string;
  subtext: string;
  iconSrc: string;
  desktopClass: string;
  mobileClass: string;
  mobileIconClass: string;
  mobileIconWidth: number;
  mobileIconHeight: number;
  hasDesktopDivider: boolean;
}

const FEATURES_DATA: FeatureItemData[] = [
  {
    id: 'premium-fleet',
    title: 'Premium Fleet',
    subtext: 'World-class Luxury Cars',
    iconSrc: '/icons/Diamond.svg',
    desktopClass: styles.groupPremiumFleetDesktop,
    mobileClass: styles.itemPremiumFleetMobile,
    mobileIconClass: styles.iconDiamondMobile,
    mobileIconWidth: 15,
    mobileIconHeight: 23,
    hasDesktopDivider: true,
  },
  {
    id: 'secure-booking',
    title: 'Secure Booking',
    subtext: 'Safe & Hassle-free',
    iconSrc: '/icons/Security Shield.svg',
    desktopClass: styles.groupSecureBookingDesktop,
    mobileClass: styles.itemSecureBookingMobile,
    mobileIconClass: styles.iconShieldMobile,
    mobileIconWidth: 15,
    mobileIconHeight: 22,
    hasDesktopDivider: true,
  },
  {
    id: 'support',
    title: '24/7 Support',
    subtext: 'Always here for you',
    iconSrc: '/icons/Headset.svg',
    desktopClass: styles.groupSupportDesktop,
    mobileClass: styles.itemSupportMobile,
    mobileIconClass: styles.iconHeadsetMobile,
    mobileIconWidth: 15,
    mobileIconHeight: 23,
    hasDesktopDivider: true,
  },
  {
    id: 'locations',
    title: 'Multiple Locations',
    subtext: 'Across New York',
    iconSrc: '/icons/Place Marker.svg',
    desktopClass: styles.groupLocationsDesktop,
    mobileClass: styles.itemLocationsMobile,
    mobileIconClass: styles.iconMarkerMobile,
    mobileIconWidth: 15,
    mobileIconHeight: 22,
    hasDesktopDivider: false, // Explicit rule: NO divider after Multiple Locations
  },
];

export default function FooterFeatures() {
  const desktopItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopDividersRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // 1. Desktop feature items soft entrance with subtle slide up and stagger
      const validDesktopItems = desktopItemsRef.current.filter(Boolean);
      if (validDesktopItems.length > 0) {
        gsap.fromTo(
          validDesktopItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 1.7,
            stagger: 0.12,
            ease: 'power2.out',
          }
        );
      }

      // 2. Desktop dividers reveal subtly after content appears
      const validDividers = desktopDividersRef.current.filter(Boolean);
      if (validDividers.length > 0) {
        gsap.fromTo(
          validDividers,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.6,
            delay: 2.1,
            stagger: 0.1,
            ease: 'power2.out',
            transformOrigin: 'top center',
          }
        );
      }
    });

    mm.add('(max-width: 767px)', () => {
      // Mobile feature items soft entrance with gentle stagger
      const validMobileItems = mobileItemsRef.current.filter(Boolean);
      if (validMobileItems.length > 0) {
        gsap.fromTo(
          validMobileItems,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 1.6,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <aside className={styles.container} id="footer-features-root" aria-label="Key Service Features">
      {/* ========================================================
          DESKTOP FOOTER FEATURES (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <div className={styles.footerFeaturesDesktop} id="footer-features-desktop">
          {FEATURES_DATA.map((item, index) => (
            <div
              key={`desktop-${item.id}`}
              ref={(el) => {
                desktopItemsRef.current[index] = el;
              }}
              className={`${styles.featureGroupDesktop} ${item.desktopClass}`}
              id={`feature-item-${item.id}-desktop`}
            >
              <img
                src={item.iconSrc}
                alt=""
                className={styles.featureIconDesktop}
                width={60}
                height={90}
                aria-hidden="true"
              />
              <div className={styles.textContainerDesktop}>
                <h3 className={styles.featureTitleDesktop}>{item.title}</h3>
                <p className={styles.featureSubtextDesktop}>{item.subtext}</p>
              </div>

              {item.hasDesktopDivider && (
                <div
                  ref={(el) => {
                    desktopDividersRef.current[index] = el;
                  }}
                  className={styles.dividerDesktop}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          MOBILE FOOTER FEATURES (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <div className={styles.footerFeaturesMobile} id="footer-features-mobile">
          {FEATURES_DATA.map((item, index) => (
            <div
              key={`mobile-${item.id}`}
              ref={(el) => {
                mobileItemsRef.current[index] = el;
              }}
              className={`${styles.featureItemMobile} ${item.mobileClass}`}
              id={`feature-item-${item.id}-mobile`}
            >
              <img
                src={item.iconSrc}
                alt=""
                className={`${styles.featureIconMobile} ${item.mobileIconClass}`}
                width={item.mobileIconWidth}
                height={item.mobileIconHeight}
                aria-hidden="true"
              />
              <h3 className={styles.featureTitleMobile}>{item.title}</h3>
              <p className={styles.featureSubtextMobile}>{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
