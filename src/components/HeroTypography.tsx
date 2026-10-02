'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './HeroTypography.module.css';

export default function HeroTypography() {
  const router = useRouter();
  // Desktop Refs (Back Layer)
  const driveDesktopRef = useRef<HTMLParagraphElement>(null);
  const premiumDesktopRef = useRef<HTMLParagraphElement>(null);
  const carRentalsDesktopRef = useRef<HTMLHeadingElement>(null);
  const descDesktopRef = useRef<HTMLParagraphElement>(null);
  const btnDesktopRef = useRef<HTMLAnchorElement>(null);
  const normalDescDesktopRef = useRef<HTMLDivElement>(null);
  const normalLineDesktopRef = useRef<HTMLDivElement>(null);

  // Desktop Refs (Front Layer - Above Car)
  const inDesktopRef = useRef<HTMLParagraphElement>(null);
  const nyDesktopRef = useRef<HTMLHeadingElement>(null);
  const followDesktopRef = useRef<HTMLParagraphElement>(null);
  const socialIconsDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs (Back Layer)
  const driveMobileRef = useRef<HTMLParagraphElement>(null);
  const premiumMobileRef = useRef<HTMLParagraphElement>(null);
  const carTextMobileRef = useRef<HTMLHeadingElement>(null);
  const rentalsTextMobileRef = useRef<HTMLHeadingElement>(null);
  const descMobileRef = useRef<HTMLParagraphElement>(null);
  const btnMobileRef = useRef<HTMLAnchorElement>(null);
  const normalDescMobileRef = useRef<HTMLDivElement>(null);
  const normalLineMobileRef = useRef<HTMLDivElement>(null);

  // Mobile Refs (Front Layer - Above Car)
  const inMobileRef = useRef<HTMLParagraphElement>(null);
  const nyMobileRef = useRef<HTMLHeadingElement>(null);
  const followMobileRef = useRef<HTMLParagraphElement>(null);
  const socialIconsMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 768px, Figma 1440x900)
    // Coordinated sequence following automotive typography hierarchy
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      // Set initial states
      gsap.set(
        [
          driveDesktopRef.current,
          premiumDesktopRef.current,
          carRentalsDesktopRef.current,
          descDesktopRef.current,
          btnDesktopRef.current,
          inDesktopRef.current,
          nyDesktopRef.current,
          followDesktopRef.current,
        ],
        { opacity: 0 }
      );

      if (normalDescDesktopRef.current) {
        const items = normalDescDesktopRef.current.querySelectorAll(`.${styles.normalDescItemDesktop}`);
        gsap.set(items, { opacity: 0, x: 20 });
      }
      if (normalLineDesktopRef.current) {
        gsap.set(normalLineDesktopRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
      }
      if (socialIconsDesktopRef.current) {
        const links = socialIconsDesktopRef.current.querySelectorAll(`.${styles.socialLinkDesktop}`);
        gsap.set(links, { opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. DRIVE A HIGHER STANDARD (fade + slide down)
      tl.fromTo(
        driveDesktopRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0.1
      );

      // 2. PREMIUM (fade + slide down)
      tl.fromTo(
        premiumDesktopRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        0.25
      );

      // 3. CAR RENTALS (fade + slide right) - Sits gracefully behind the car
      tl.fromTo(
        carRentalsDesktopRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.45
      );

      // 4. normal_description_layout (staggered fade + slide left + line scale)
      if (normalDescDesktopRef.current) {
        const items = normalDescDesktopRef.current.querySelectorAll(`.${styles.normalDescItemDesktop}`);
        tl.to(
          items,
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          0.6
        );
      }
      if (normalLineDesktopRef.current) {
        tl.to(
          normalLineDesktopRef.current,
          { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
          1.0
        );
      }

      // 5. Hero Description (fade + slide up)
      tl.fromTo(
        descDesktopRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        0.8
      );

      // 6. Explore Our Fleet Button (fade + slide right)
      tl.fromTo(
        btnDesktopRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        1.05
      );

      // 7. IN + NEW YORK (fade + slide up in front of the car)
      tl.fromTo(
        nyDesktopRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        1.3
      );
      tl.fromTo(
        inDesktopRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        1.45
      );

      // 8. FOLLOW THE JOURNEY (fade + subtle slide up)
      tl.fromTo(
        followDesktopRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        1.45
      );

      // 9. Social Media Icons (staggered fade + subtle slide up)
      if (socialIconsDesktopRef.current) {
        const links = socialIconsDesktopRef.current.querySelectorAll(`.${styles.socialLinkDesktop}`);
        tl.fromTo(
          links,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 0.85, duration: 0.9, stagger: 0.08, ease: 'power2.out' },
          1.55
        );

        // Continuous subtle atmospheric floating animation
        const imgs = socialIconsDesktopRef.current.querySelectorAll(`.${styles.socialIconDesktop}`);
        imgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 1.55 + i * 0.25 });
          floatTl
            .to(img, { y: -2, duration: 1.6, ease: 'sine.inOut' })
            .to(img, { y: 2, duration: 3.2, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.6, ease: 'sine.inOut' });
        });
      }
    });

    // ========================================================
    // MOBILE ANIMATION TIMELINE (< 768px, Figma 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      gsap.set(
        [
          driveMobileRef.current,
          premiumMobileRef.current,
          carTextMobileRef.current,
          rentalsTextMobileRef.current,
          descMobileRef.current,
          btnMobileRef.current,
          inMobileRef.current,
          nyMobileRef.current,
          followMobileRef.current,
        ],
        { opacity: 0 }
      );

      if (normalDescMobileRef.current) {
        const items = normalDescMobileRef.current.querySelectorAll(`.${styles.normalDescItemMobile}`);
        gsap.set(items, { opacity: 0, x: 15 });
      }
      if (normalLineMobileRef.current) {
        gsap.set(normalLineMobileRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
      }
      if (socialIconsMobileRef.current) {
        const links = socialIconsMobileRef.current.querySelectorAll(`.${styles.socialLinkMobile}`);
        gsap.set(links, { opacity: 0 });
      }

      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        driveMobileRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.1
      );

      tl.fromTo(
        premiumMobileRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0.25
      );

      tl.fromTo(
        carTextMobileRef.current,
        { x: -25, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        0.4
      );

      tl.fromTo(
        rentalsTextMobileRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        0.55
      );

      if (normalDescMobileRef.current) {
        const items = normalDescMobileRef.current.querySelectorAll(`.${styles.normalDescItemMobile}`);
        tl.to(
          items,
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          0.6
        );
      }
      if (normalLineMobileRef.current) {
        tl.to(
          normalLineMobileRef.current,
          { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0.9
        );
      }

      tl.fromTo(
        descMobileRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0.75
      );

      tl.fromTo(
        btnMobileRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0.95
      );

      tl.fromTo(
        nyMobileRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        1.15
      );

      tl.fromTo(
        inMobileRef.current,
        { x: 15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        1.3
      );

      // 8. FOLLOW THE JOURNEY (fade + subtle slide up)
      tl.fromTo(
        followMobileRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        1.25
      );

      // 9. Mobile Social Media Icons (staggered fade + subtle slide up)
      if (socialIconsMobileRef.current) {
        const links = socialIconsMobileRef.current.querySelectorAll(`.${styles.socialLinkMobile}`);
        tl.fromTo(
          links,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 0.85, duration: 0.8, stagger: 0.06, ease: 'power2.out' },
          1.35
        );

        // Continuous subtle atmospheric floating animation
        const imgs = socialIconsMobileRef.current.querySelectorAll(`.${styles.socialIconMobile}`);
        imgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 1.35 + i * 0.2 });
          floatTl
            .to(img, { y: -1.2, duration: 1.5, ease: 'sine.inOut' })
            .to(img, { y: 1.2, duration: 3.0, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.5, ease: 'sine.inOut' });
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ========================================================
          1. BACK LAYER (z-index: 5 — Strictly BEHIND HeroCar)
          Contains: DRIVE A HIGHER STANDARD, Premium, CAR RENTALS,
          Description, Explore Our Fleet Button, normal_description_layout
          ======================================================== */}
      <div className={styles.backLayer} id="hero-typography-back-layer" aria-hidden="false">
        {/* Desktop Back Elements */}
        <div className={styles.desktopWrapper}>
          {/* DRIVE A HIGHER STANDARD (Node 51:16) */}
          <p
            ref={driveDesktopRef}
            className={styles.driveDesktop}
            id="hero-drive-desktop"
          >
            DRIVE A HIGHER STANDARD
          </p>

          {/* Premium (Node 50:15) */}
          <p
            ref={premiumDesktopRef}
            className={styles.premiumDesktop}
            id="hero-premium-desktop"
          >
            Premium
          </p>

          {/* CAR RENTALS (Node 50:14) — Passes behind Porsche roof */}
          <h1
            ref={carRentalsDesktopRef}
            className={styles.carRentalsDesktop}
            id="hero-car-rentals-desktop"
          >
            CAR RENTALS
          </h1>

          {/* Description Text (Node 51:17) */}
          <p
            ref={descDesktopRef}
            className={styles.descriptionDesktop}
            id="hero-description-desktop"
          >
            Iconic cars, Unforgettable journeys. Experience New York with unmatched style, freedom and performance. From the city’s dazzling skyline to its legendary streets, dive the car you’ve always dreamed of and turn every moment into an unforgettable experience. Luxury isn’t just the destination - it’s the journey.
          </p>

          {/* EXPLORE OUR FLEET BUTTON (Node 51:23) */}
          <Link
            ref={btnDesktopRef}
            href="/fleet"
            className={styles.exploreBtnDesktop}
            id="explore-our-fleet-button-desktop"
            aria-label="Explore Our Fleet"
            onClick={(e) => {
              e.preventDefault();
              router.push('/fleet');
            }}
          >
            <span className={styles.exploreBtnTextDesktop}>Explore Our Fleet</span>
            <img
              src="/images/Right Arrow.svg"
              alt=""
              className={styles.exploreBtnArrowDesktop}
              width={26}
              height={90}
            />
          </Link>

          {/* normal_description_layout (Node 37:32) */}
          <div
            ref={normalDescDesktopRef}
            className={styles.normalDescDesktop}
            id="normal-description-layout-desktop"
          >
            <span className={styles.normalDescItemDesktop}>CARS</span>
            <span className={styles.normalDescItemDesktop}>CITY</span>
            <span className={styles.normalDescItemDesktop}>FREEDOM</span>
            <span className={styles.normalDescItemDesktop}>YOU</span>
            <div
              ref={normalLineDesktopRef}
              className={styles.normalDescLineDesktop}
              id="normal-description-line-desktop"
            />
          </div>
        </div>

        {/* Mobile Back Elements */}
        <div className={styles.mobileWrapper}>
          {/* DRIVE A HIGHER STANDARD (Node 123:93) */}
          <p
            ref={driveMobileRef}
            className={styles.driveMobile}
            id="hero-drive-mobile"
          >
            DRIVE A HIGHER STANDARD
          </p>

          {/* Premium (Node 123:92) */}
          <p
            ref={premiumMobileRef}
            className={styles.premiumMobile}
            id="hero-premium-mobile"
          >
            Premium
          </p>

          {/* CAR (Node 136:2) */}
          <h1
            ref={carTextMobileRef}
            className={styles.carTextMobile}
            id="hero-car-mobile"
          >
            CAR
          </h1>

          {/* RENTALS (Node 123:91) */}
          <h2
            ref={rentalsTextMobileRef}
            className={styles.rentalsTextMobile}
            id="hero-rentals-mobile"
          >
            RENTALS
          </h2>

          {/* Description Text (Node 123:95) */}
          <p
            ref={descMobileRef}
            className={styles.descriptionMobile}
            id="hero-description-mobile"
          >
            Iconic cars, Unforgettable journeys. Experience New York with unmatched style, freedom and performance. From the city’s dazzling skyline to its legendary streets, dive the car you’ve always dreamed of and turn every moment into an unforgettable experience. Luxury isn’t just the destination - it’s the journey.
          </p>

          {/* EXPLORE OUR FLEET BUTTON (Node 123:119) */}
          <Link
            ref={btnMobileRef}
            href="/fleet"
            className={styles.exploreBtnMobile}
            id="explore-our-fleet-button-mobile"
            aria-label="Explore Our Fleet"
            onClick={(e) => {
              e.preventDefault();
              router.push('/fleet');
            }}
          >
            <span className={styles.exploreBtnTextMobile}>Explore Our Fleet</span>
            <img
              src="/images/Right Arrow.svg"
              alt=""
              className={styles.exploreBtnArrowMobile}
              width={14}
              height={48}
            />
          </Link>

          {/* normal_description_layout (Node 123:113) */}
          <div
            ref={normalDescMobileRef}
            className={styles.normalDescMobile}
            id="normal-description-layout-mobile"
          >
            <span className={styles.normalDescItemMobile}>CARS</span>
            <span className={styles.normalDescItemMobile}>CITY</span>
            <span className={styles.normalDescItemMobile}>FREEDOM</span>
            <span className={styles.normalDescItemMobile}>YOU</span>
            <div
              ref={normalLineMobileRef}
              className={styles.normalDescLineMobile}
              id="normal-description-line-mobile"
            />
          </div>

          {/* Mobile NEW YORK & in (BEHIND CAR on mobile per user instruction) */}
          {/* NEW YORK (Node 123:123) */}
          <p
            ref={nyMobileRef}
            className={styles.newYorkTextMobile}
            id="hero-new-york-mobile"
          >
            NEW YORK
          </p>

          {/* in (Node 123:124) */}
          <p
            ref={inMobileRef}
            className={styles.inTextMobile}
            id="hero-in-mobile"
          >
            in
          </p>
        </div>
      </div>

      {/* ========================================================
          2. FRONT LAYER (z-index: 20 — Strictly IN FRONT OF HeroCar)
          Contains: Desktop "NEW YORK" and "in"
          Must appear on top of car body on desktop per Figma layer order
          ======================================================== */}
      <div className={styles.frontLayer} id="hero-typography-front-layer" aria-hidden="false">
        {/* Desktop Front Elements */}
        <div className={styles.desktopWrapper}>
          {/* NEW YORK (Node 51:24) */}
          <p
            ref={nyDesktopRef}
            className={styles.newYorkTextDesktop}
            id="hero-new-york-desktop"
          >
            NEW YORK
          </p>

          {/* in (Node 51:25) */}
          <p
            ref={inDesktopRef}
            className={styles.inTextDesktop}
            id="hero-in-desktop"
          >
            in
          </p>

          {/* FOLLOW THE JOURNEY & SOCIAL MEDIA ICONS (Node 139:13 Frame 4) */}
          <div
            className={styles.socialGroupDesktop}
            id="hero-social-group-desktop"
          >
            <p
              ref={followDesktopRef}
              className={styles.followJourneyDesktop}
              id="hero-follow-journey-desktop"
            >
              FOLLOW THE JOURNEY
            </p>
            <div
              ref={socialIconsDesktopRef}
              className={styles.socialIconsDesktop}
              id="hero-social-icons-desktop"
            >
              <a
                href="#youtube"
                className={styles.socialLinkDesktop}
                id="social-icon-youtube-desktop"
                aria-label="Follow Autovyne on YouTube"
              >
                <img
                  src="/icons/YouTube.svg"
                  alt="YouTube"
                  className={styles.socialIconDesktop}
                  width={20}
                  height={90}
                />
              </a>
              <a
                href="#linkedin"
                className={styles.socialLinkDesktop}
                id="social-icon-linkedin-desktop"
                aria-label="Follow Autovyne on LinkedIn"
              >
                <img
                  src="/icons/LinkedIn.svg"
                  alt="LinkedIn"
                  className={styles.socialIconDesktop}
                  width={20}
                  height={90}
                />
              </a>
              <a
                href="#facebook"
                className={styles.socialLinkDesktop}
                id="social-icon-facebook-desktop"
                aria-label="Follow Autovyne on Facebook"
              >
                <img
                  src="/icons/Facebook.svg"
                  alt="Facebook"
                  className={styles.socialIconDesktop}
                  width={20}
                  height={90}
                />
              </a>
              <a
                href="#x"
                className={styles.socialLinkDesktop}
                id="social-icon-x-desktop"
                aria-label="Follow Autovyne on X"
              >
                <img
                  src="/icons/X.svg"
                  alt="X"
                  className={styles.socialIconDesktop}
                  width={20}
                  height={90}
                />
              </a>
              <a
                href="#instagram"
                className={styles.socialLinkDesktop}
                id="social-icon-instagram-desktop"
                aria-label="Follow Autovyne on Instagram"
              >
                <img
                  src="/icons/Instagram.svg"
                  alt="Instagram"
                  className={styles.socialIconDesktop}
                  width={20}
                  height={90}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Front Elements */}
        <div className={styles.mobileWrapper}>
          {/* FOLLOW THE JOURNEY & SOCIAL MEDIA ICONS (Node 139:22 Frame 6) */}
          <div
            className={styles.socialGroupMobile}
            id="hero-social-group-mobile"
          >
            <p
              ref={followMobileRef}
              className={styles.followJourneyMobile}
              id="hero-follow-journey-mobile"
            >
              FOLLOW THE JOURNEY
            </p>
            <div
              ref={socialIconsMobileRef}
              className={styles.socialIconsMobile}
              id="hero-social-icons-mobile"
            >
              <a
                href="#youtube"
                className={styles.socialLinkMobile}
                id="social-icon-youtube-mobile"
                aria-label="Follow Autovyne on YouTube"
              >
                <img
                  src="/icons/YouTube.svg"
                  alt="YouTube"
                  className={styles.socialIconMobile}
                  width={15}
                  height={90}
                />
              </a>
              <a
                href="#linkedin"
                className={styles.socialLinkMobile}
                id="social-icon-linkedin-mobile"
                aria-label="Follow Autovyne on LinkedIn"
              >
                <img
                  src="/icons/LinkedIn.svg"
                  alt="LinkedIn"
                  className={styles.socialIconMobile}
                  width={15}
                  height={90}
                />
              </a>
              <a
                href="#facebook"
                className={styles.socialLinkMobile}
                id="social-icon-facebook-mobile"
                aria-label="Follow Autovyne on Facebook"
              >
                <img
                  src="/icons/Facebook.svg"
                  alt="Facebook"
                  className={styles.socialIconMobile}
                  width={15}
                  height={90}
                />
              </a>
              <a
                href="#x"
                className={styles.socialLinkMobile}
                id="social-icon-x-mobile"
                aria-label="Follow Autovyne on X"
              >
                <img
                  src="/icons/X.svg"
                  alt="X"
                  className={styles.socialIconMobile}
                  width={15}
                  height={90}
                />
              </a>
              <a
                href="#instagram"
                className={styles.socialLinkMobile}
                id="social-icon-instagram-mobile"
                aria-label="Follow Autovyne on Instagram"
              >
                <img
                  src="/icons/Instagram.svg"
                  alt="Instagram"
                  className={styles.socialIconMobile}
                  width={15}
                  height={90}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
