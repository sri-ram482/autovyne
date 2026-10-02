'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ExperiencesTypographySocial.module.css';

interface SocialItem {
  id: string;
  name: string;
  icon: string;
  href: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  { id: 'youtube', name: 'YouTube', icon: '/icons/YouTube.svg', href: '#youtube' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/icons/LinkedIn.svg', href: '#linkedin' },
  { id: 'facebook', name: 'Facebook', icon: '/icons/Facebook.svg', href: '#facebook' },
  { id: 'x', name: 'X', icon: '/icons/X.svg', href: '#x' },
  { id: 'instagram', name: 'Instagram', icon: '/icons/Instagram.svg', href: '#instagram' },
];

export default function ExperiencesTypographySocial() {
  // Desktop Refs
  const realDesktopRef = useRef<HTMLHeadingElement>(null);
  const experiencesDesktopRef = useRef<HTMLHeadingElement>(null);
  const descDesktopRef = useRef<HTMLParagraphElement>(null);
  const followDesktopRef = useRef<HTMLParagraphElement>(null);
  const socialIconsDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs
  const realMobileRef = useRef<HTMLHeadingElement>(null);
  const experiencesMobileRef = useRef<HTMLHeadingElement>(null);
  const descMobileRef = useRef<HTMLParagraphElement>(null);
  const followMobileRef = useRef<HTMLParagraphElement>(null);
  const socialIconsMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 768px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      // Set initial states
      gsap.set(
        [
          realDesktopRef.current,
          experiencesDesktopRef.current,
          descDesktopRef.current,
          followDesktopRef.current,
        ],
        { opacity: 0 }
      );

      const desktopLinks = socialIconsDesktopRef.current?.querySelectorAll(
        `.${styles.socialLinkDesktop}`
      );
      if (desktopLinks) {
        gsap.set(desktopLinks, { opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 0.15 });

      // 1. REAL (fade in + subtle slide right)
      tl.fromTo(
        realDesktopRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' },
        0.1
      );

      // 2. EXPERIENCES (fade in + subtle slide right)
      tl.fromTo(
        experiencesDesktopRef.current,
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power2.out' },
        0.25
      );

      // 3. Description (fade in + subtle slide up)
      tl.fromTo(
        descDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        0.45
      );

      // 4. FOLLOW THE JOURNEY (fade in + subtle slide up — after car arrives and parks)
      tl.fromTo(
        followDesktopRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        2.85 // Appears right as car reaches parked position (0.25s delay + 2.6s car duration)
      );

      // 5. Social Media Icons (staggered fade in + slide up — after car arrives)
      if (desktopLinks) {
        tl.fromTo(
          desktopLinks,
          { opacity: 0, y: 10 },
          { opacity: 0.85, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          2.95
        );
      }

      // Continuous subtle atmospheric floating animation on social icons (commences after entrance)
      const desktopImgs = socialIconsDesktopRef.current?.querySelectorAll(
        `.${styles.socialIconDesktop}`
      );
      if (desktopImgs) {
        desktopImgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 3.7 + i * 0.22 });
          floatTl
            .to(img, { y: -1.5, duration: 1.8 + i * 0.15, ease: 'sine.inOut' })
            .to(img, { y: 1.5, duration: 3.6 + i * 0.3, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.8 + i * 0.15, ease: 'sine.inOut' });
        });
      }
    });

    // ========================================================
    // MOBILE ANIMATION TIMELINE (< 768px, Figma 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      // Set initial states
      gsap.set(
        [
          followMobileRef.current,
          realMobileRef.current,
          experiencesMobileRef.current,
          descMobileRef.current,
        ],
        { opacity: 0 }
      );

      const mobileLinks = socialIconsMobileRef.current?.querySelectorAll(
        `.${styles.socialLinkMobile}`
      );
      if (mobileLinks) {
        gsap.set(mobileLinks, { opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 0.15 });

      // 1. FOLLOW THE JOURNEY
      tl.fromTo(
        followMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.1
      );

      // 2. Social Media Icons
      if (mobileLinks) {
        tl.fromTo(
          mobileLinks,
          { opacity: 0, y: -8 },
          { opacity: 0.85, y: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' },
          0.2
        );
      }

      // 3. REAL (fade in + subtle slide right)
      tl.fromTo(
        realMobileRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' },
        0.35
      );

      // 4. EXPERIENCES (fade in + subtle slide right)
      tl.fromTo(
        experiencesMobileRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' },
        0.5
      );

      // 5. Description (fade in + subtle slide up)
      tl.fromTo(
        descMobileRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.65
      );

      // Continuous subtle atmospheric floating animation on social icons
      const mobileImgs = socialIconsMobileRef.current?.querySelectorAll(
        `.${styles.socialIconMobile}`
      );
      if (mobileImgs) {
        mobileImgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 1.4 + i * 0.22 });
          floatTl
            .to(img, { y: -1.2, duration: 1.8 + i * 0.15, ease: 'sine.inOut' })
            .to(img, { y: 1.2, duration: 3.6 + i * 0.3, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.8 + i * 0.15, ease: 'sine.inOut' });
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className={styles.typographyRoot} id="experiences-typography-social-root">
      {/* Background layer: REAL & EXPERIENCES (Layered behind car on desktop) */}
      <div className={styles.headingLayer} aria-hidden="false">
        {/* Desktop Headings */}
        <div className={styles.desktopWrapper}>
          <h1
            ref={realDesktopRef}
            className={styles.realHeadingDesktop}
            id="experiences-heading-real-desktop"
          >
            REAL
          </h1>
          <h2
            ref={experiencesDesktopRef}
            className={styles.experiencesHeadingDesktop}
            id="experiences-heading-experiences-desktop"
          >
            EXPERIENCES
          </h2>
        </div>

        {/* Mobile Headings & Content */}
        <div className={styles.mobileWrapper}>
          {/* 1. FOLLOW THE JOURNEY & Social Media Frame (Mobile Frame 6, Node 225:635) */}
          <div className={styles.socialFrameMobile} id="experiences-social-frame-mobile">
            <p
              ref={followMobileRef}
              className={styles.followJourneyMobile}
              id="experiences-follow-journey-mobile"
            >
              FOLLOW THE JOURNEY
            </p>
            <div
              ref={socialIconsMobileRef}
              className={styles.socialIconsMobile}
              id="experiences-social-icons-mobile"
            >
              {SOCIAL_ITEMS.map((item) => (
                <a
                  key={`mobile-${item.id}`}
                  href={item.href}
                  className={styles.socialLinkMobile}
                  id={`experiences-social-${item.id}-mobile`}
                  aria-label={`Follow Autovyne on ${item.name}`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.socialIconMobile}
                    width={15}
                    height={90}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* 2. REAL Heading Mobile */}
          <h1
            ref={realMobileRef}
            className={styles.realHeadingMobile}
            id="experiences-heading-real-mobile"
          >
            REAL
          </h1>

          {/* 3. EXPERIENCES Heading Mobile */}
          <h2
            ref={experiencesMobileRef}
            className={styles.experiencesHeadingMobile}
            id="experiences-heading-experiences-mobile"
          >
            EXPERIENCES
          </h2>

          {/* 4. Description Mobile */}
          <p
            ref={descMobileRef}
            className={styles.descriptionMobile}
            id="experiences-description-mobile"
          >
            More than just rentals.
            <br />
            Unforgettable journeys, told by
            <br />
            those who lived them.
          </p>
        </div>
      </div>

      {/* Foreground layer: Description & Social Section (Layered in front of car on desktop) */}
      <div className={styles.foregroundLayer}>
        <div className={styles.desktopWrapper}>
          {/* 3. Description Desktop */}
          <p
            ref={descDesktopRef}
            className={styles.descriptionDesktop}
            id="experiences-description-desktop"
          >
            More than just rentals.
            <br />
            Unforgettable journeys, told by
            <br />
            those who lived them.
          </p>

          {/* 4. FOLLOW THE JOURNEY & Social Media Frame (Desktop Frame 4, Node 225:467) */}
          <div className={styles.socialFrameDesktop} id="experiences-social-frame-desktop">
            <p
              ref={followDesktopRef}
              className={styles.followJourneyDesktop}
              id="experiences-follow-journey-desktop"
            >
              FOLLOW THE JOURNEY
            </p>
            <div
              ref={socialIconsDesktopRef}
              className={styles.socialIconsDesktop}
              id="experiences-social-icons-desktop"
            >
              {SOCIAL_ITEMS.map((item) => (
                <a
                  key={`desktop-${item.id}`}
                  href={item.href}
                  className={styles.socialLinkDesktop}
                  id={`experiences-social-${item.id}-desktop`}
                  aria-label={`Follow Autovyne on ${item.name}`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.socialIconDesktop}
                    width={20}
                    height={90}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
