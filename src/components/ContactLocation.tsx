'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ContactLocation.module.css';

const MAPS_URL = 'https://maps.google.com/?q=350+5th+Ave,+New+York,+NY+10118';

export default function ContactLocation() {
  // Desktop Refs
  const headingDesktopRef = useRef<HTMLHeadingElement>(null);
  const descriptionDesktopRef = useRef<HTMLParagraphElement>(null);
  const buttonDesktopRef = useRef<HTMLAnchorElement>(null);

  // Mobile Refs
  const headingMobileRef = useRef<HTMLHeadingElement>(null);
  const descriptionMobileRef = useRef<HTMLParagraphElement>(null);
  const buttonMobileRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 768px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 768px)', () => {
      gsap.set(
        [
          headingDesktopRef.current,
          descriptionDesktopRef.current,
          buttonDesktopRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.5 });

      // 1. OUR LOCATION Heading (fade in + subtle slide down)
      tl.fromTo(
        headingDesktopRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.0
      );

      // 2. Description (fade in + subtle slide down)
      tl.fromTo(
        descriptionDesktopRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.12
      );

      // 3. GET DIRECTIONS Button (fade in + subtle slide up)
      tl.fromTo(
        buttonDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.24
      );
    });

    // ========================================================
    // MOBILE ANIMATION TIMELINE (< 768px, Figma 390x844)
    // ========================================================
    mm.add('(max-width: 767px)', () => {
      gsap.set(
        [
          headingMobileRef.current,
          descriptionMobileRef.current,
          buttonMobileRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.45 });

      // 1. Heading
      tl.fromTo(
        headingMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.0
      );

      // 2. Description
      tl.fromTo(
        descriptionMobileRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.1
      );

      // 3. Button
      tl.fromTo(
        buttonMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.2
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className={styles.locationSection}
      id="autovyne-contact-location-section"
      aria-label="Our Location and Directions"
    >
      {/* ========================================================
          DESKTOP IMPLEMENTATION (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <div
          className={styles.locationContainerDesktop}
          id="contact-location-container-desktop"
        >
          {/* A. OUR LOCATION Heading */}
          <h2
            ref={headingDesktopRef}
            className={styles.headingDesktop}
            id="contact-location-heading-desktop"
          >
            Our Location
          </h2>

          {/* B. Description */}
          <p
            ref={descriptionDesktopRef}
            className={styles.descriptionDesktop}
            id="contact-location-description-desktop"
          >
            Find us at the Heart of New York. Visit our Showroom or pick up your Car{'\n'}from a convenient location.
          </p>

          {/* C. GET DIRECTIONS Button with D. Navigation Icon */}
          <a
            ref={buttonDesktopRef}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonDesktop}
            id="contact-get-directions-button-desktop"
            aria-label="Get Directions to AutoVyne New York"
          >
            <img
              src="/icons/Navigation.svg"
              alt=""
              className={styles.buttonIconDesktop}
              width={30}
              height={30}
              aria-hidden="true"
            />
            <span className={styles.buttonTextDesktop}>
              Get Directions
            </span>
          </a>
        </div>
      </div>

      {/* ========================================================
          MOBILE IMPLEMENTATION (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <div
          className={styles.locationContainerMobile}
          id="contact-location-container-mobile"
        >
          {/* A. OUR LOCATION Heading */}
          <h2
            ref={headingMobileRef}
            className={styles.headingMobile}
            id="contact-location-heading-mobile"
          >
            Our Location
          </h2>

          {/* B. Description */}
          <p
            ref={descriptionMobileRef}
            className={styles.descriptionMobile}
            id="contact-location-description-mobile"
          >
            Find us at the Heart of New York. Visit our Showroom or pick up your Car{'\n'}from a convenient location.
          </p>

          {/* C. GET DIRECTIONS Button with D. Navigation Icon */}
          <a
            ref={buttonMobileRef}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonMobile}
            id="contact-get-directions-button-mobile"
            aria-label="Get Directions to AutoVyne New York"
          >
            <img
              src="/icons/Navigation.svg"
              alt=""
              className={styles.buttonIconMobile}
              width={15}
              height={15}
              aria-hidden="true"
            />
            <span className={styles.buttonTextMobile}>
              Get Directions
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
