'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ContactTypographySocial.module.css';

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

export default function ContactTypographySocial() {
  // Desktop Refs
  const getInTouchDesktopRef = useRef<HTMLParagraphElement>(null);
  const contactDesktopRef = useRef<HTMLHeadingElement>(null);
  const usDesktopRef = useRef<HTMLHeadingElement>(null);
  const descDesktopRef = useRef<HTMLParagraphElement>(null);
  const followDesktopRef = useRef<HTMLParagraphElement>(null);
  const socialIconsDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs
  const getInTouchMobileRef = useRef<HTMLParagraphElement>(null);
  const contactMobileRef = useRef<HTMLHeadingElement>(null);
  const usMobileRef = useRef<HTMLHeadingElement>(null);
  const descMobileRef = useRef<HTMLParagraphElement>(null);
  const followMobileRef = useRef<HTMLParagraphElement>(null);
  const socialIconsMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 1024px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 1024px)', () => {
      gsap.set(
        [
          getInTouchDesktopRef.current,
          contactDesktopRef.current,
          usDesktopRef.current,
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

      // 1. GET IN TOUCH (fade in + subtle slide down)
      tl.fromTo(
        getInTouchDesktopRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        0.1
      );

      // 2. CONTACT (fade in + subtle slide right)
      tl.fromTo(
        contactDesktopRef.current,
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.95, ease: 'power2.out' },
        0.2
      );

      // 3. US (fade in + subtle slide right)
      tl.fromTo(
        usDesktopRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' },
        0.35
      );

      // 4. Description (fade in + subtle slide up)
      tl.fromTo(
        descDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        0.5
      );

      // 5. FOLLOW THE JOURNEY (fade in + subtle slide up)
      tl.fromTo(
        followDesktopRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.65
      );

      // 6. Social Media Icons (staggered fade in + slide up)
      if (desktopLinks) {
        tl.fromTo(
          desktopLinks,
          { opacity: 0, y: 10 },
          { opacity: 0.85, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          0.75
        );
      }

      // 7. Continuous subtle atmospheric floating animation on social icons
      const desktopImgs = socialIconsDesktopRef.current?.querySelectorAll(
        `.${styles.socialIconDesktop}`
      );
      if (desktopImgs) {
        desktopImgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 1.5 + i * 0.22 });
          floatTl
            .to(img, { y: -1.5, duration: 1.8 + i * 0.15, ease: 'sine.inOut' })
            .to(img, { y: 1.5, duration: 3.6 + i * 0.3, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.8 + i * 0.15, ease: 'sine.inOut' });
        });
      }
    });

    // ========================================================
    // MOBILE & TABLET ANIMATION TIMELINE (< 1024px)
    // ========================================================
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          getInTouchMobileRef.current,
          contactMobileRef.current,
          usMobileRef.current,
          descMobileRef.current,
          followMobileRef.current,
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

      // 1. GET IN TOUCH
      tl.fromTo(
        getInTouchMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        0.1
      );

      // 2. CONTACT
      tl.fromTo(
        contactMobileRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' },
        0.2
      );

      // 3. US
      tl.fromTo(
        usMobileRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        0.35
      );

      // 4. Description
      tl.fromTo(
        descMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        0.45
      );

      // 5. FOLLOW THE JOURNEY
      tl.fromTo(
        followMobileRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.55
      );

      // 6. Social Media Icons
      if (mobileLinks) {
        tl.fromTo(
          mobileLinks,
          { opacity: 0, y: 8 },
          { opacity: 0.85, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
          0.65
        );
      }

      // 7. Continuous subtle floating animation on mobile icons
      const mobileImgs = socialIconsMobileRef.current?.querySelectorAll(
        `.${styles.socialIconMobile}`
      );
      if (mobileImgs) {
        mobileImgs.forEach((img, i) => {
          const floatTl = gsap.timeline({ repeat: -1, delay: 1.5 + i * 0.2 });
          floatTl
            .to(img, { y: -1.0, duration: 1.6 + i * 0.15, ease: 'sine.inOut' })
            .to(img, { y: 1.0, duration: 3.2 + i * 0.3, ease: 'sine.inOut' })
            .to(img, { y: 0, duration: 1.6 + i * 0.15, ease: 'sine.inOut' });
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      className={styles.contactTextSection}
      id="autovyne-contact-typography-social-section"
      aria-label="Contact Page Typography and Social Media"
    >
      {/* ========================================================
          DESKTOP CONTACT TYPOGRAPHY & SOCIAL (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        {/* 1. GET IN TOUCH (Node 238:1407: x: 493, y: 186, w: 297, h: 27) */}
        <p
          ref={getInTouchDesktopRef}
          className={styles.getInTouchDesktop}
          id="contact-get-in-touch-desktop"
        >
          GET IN TOUCH
        </p>

        {/* 2. CONTACT Heading (Node 238:1024: x: 35, y: 160, w: 755, h: 225) */}
        <h1
          ref={contactDesktopRef}
          className={styles.contactHeadingDesktop}
          id="contact-heading-contact-desktop"
        >
          CONTACT
        </h1>

        {/* 3. US Heading (Node 238:1025: x: 36, y: 304, w: 134, h: 150) */}
        <h2
          ref={usDesktopRef}
          className={styles.usHeadingDesktop}
          id="contact-heading-us-desktop"
        >
          US
        </h2>

        {/* 4. Contact Page Description (Node 238:1056: x: 186, y: 343, w: 292, h: 78) */}
        <p
          ref={descDesktopRef}
          className={styles.descDesktop}
          id="contact-description-desktop"
        >
          Have questions or ready to book
          <br />
          your next drive? We’re here to help
          <br />
          you 24/7.
        </p>

        {/* 5. FOLLOW THE JOURNEY & Social Media Frame (Desktop Frame 4, Node 238:1049: x: 1122, y: 804, w: 258, h: 90) */}
        <div
          className={styles.socialFrameDesktop}
          id="contact-social-frame-desktop"
        >
          <p
            ref={followDesktopRef}
            className={styles.followJourneyDesktop}
            id="contact-follow-journey-desktop"
          >
            FOLLOW THE JOURNEY
          </p>
          <div
            ref={socialIconsDesktopRef}
            className={styles.socialIconsDesktop}
            id="contact-social-icons-desktop"
          >
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.socialLinkDesktop}
                id={`contact-social-${item.id}-desktop`}
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

      {/* ========================================================
          MOBILE CONTACT TYPOGRAPHY & SOCIAL (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        {/* 1. GET IN TOUCH (Node 244:1554: x: 115, y: 187, w: 198, h: 18) */}
        <p
          ref={getInTouchMobileRef}
          className={styles.getInTouchMobile}
          id="contact-get-in-touch-mobile"
        >
          GET IN TOUCH
        </p>

        {/* 2. CONTACT Heading (Node 244:1551: x: 21, y: 185, w: 292, h: 87) */}
        <h1
          ref={contactMobileRef}
          className={styles.contactHeadingMobile}
          id="contact-heading-contact-mobile"
        >
          CONTACT
        </h1>

        {/* 3. US Heading (Node 244:1552: x: 21, y: 245, w: 54, h: 60) */}
        <h2
          ref={usMobileRef}
          className={styles.usHeadingMobile}
          id="contact-heading-us-mobile"
        >
          US
        </h2>

        {/* 4. Contact Page Description (Node 244:1553: x: 86, y: 257, w: 138, h: 36) */}
        <p
          ref={descMobileRef}
          className={styles.descMobile}
          id="contact-description-mobile"
        >
          Have questions or ready to book
          <br />
          your next drive? We’re here to help
          <br />
          you 24/7.
        </p>

        {/* 5. FOLLOW THE JOURNEY & Social Media Frame (Mobile Frame 6, Node 238:1310: x: 24, y: 261, w: 181, h: 90) */}
        <div
          className={styles.socialFrameMobile}
          id="contact-social-frame-mobile"
        >
          <p
            ref={followMobileRef}
            className={styles.followJourneyMobile}
            id="contact-follow-journey-mobile"
          >
            FOLLOW THE JOURNEY
          </p>
          <div
            ref={socialIconsMobileRef}
            className={styles.socialIconsMobile}
            id="contact-social-icons-mobile"
          >
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.socialLinkMobile}
                id={`contact-social-${item.id}-mobile`}
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
      </div>
    </div>
  );
}
