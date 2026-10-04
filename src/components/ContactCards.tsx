'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ContactCards.module.css';

export default function ContactCards() {
  // Desktop Refs
  const callDesktopRef = useRef<HTMLAnchorElement>(null);
  const emailDesktopRef = useRef<HTMLAnchorElement>(null);
  const whatsappDesktopRef = useRef<HTMLAnchorElement>(null);
  const visitDesktopRef = useRef<HTMLAnchorElement>(null);
  const leftLineDesktopRef = useRef<HTMLDivElement>(null);
  const leftDotDesktopRef = useRef<HTMLDivElement>(null);
  const rightLineDesktopRef = useRef<HTMLDivElement>(null);
  const rightDotDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs
  const callMobileRef = useRef<HTMLAnchorElement>(null);
  const emailMobileRef = useRef<HTMLAnchorElement>(null);
  const whatsappMobileRef = useRef<HTMLAnchorElement>(null);
  const visitMobileRef = useRef<HTMLAnchorElement>(null);
  const leftLineMobileRef = useRef<HTMLDivElement>(null);
  const leftDotMobileRef = useRef<HTMLDivElement>(null);
  const rightLineMobileRef = useRef<HTMLDivElement>(null);
  const rightDotMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 1024px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 1024px)', () => {
      // Set initial states
      gsap.set(
        [
          callDesktopRef.current,
          emailDesktopRef.current,
          whatsappDesktopRef.current,
          visitDesktopRef.current,
          leftLineDesktopRef.current,
          leftDotDesktopRef.current,
          rightLineDesktopRef.current,
          rightDotDesktopRef.current,
        ],
        { opacity: 0 }
      );

      gsap.set([leftLineDesktopRef.current, rightLineDesktopRef.current], {
        scaleX: 0,
      });

      const tl = gsap.timeline({ delay: 0.35 });

      // 1. Call card (fade in + subtle slide down)
      tl.fromTo(
        callDesktopRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.1
      );

      // 2. Email card (fade in + subtle slide down)
      tl.fromTo(
        emailDesktopRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.22
      );

      // 3. WhatsApp card (fade in + subtle slide up)
      tl.fromTo(
        whatsappDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.34
      );

      // 4. Visit Us card (fade in + subtle slide up)
      tl.fromTo(
        visitDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.46
      );

      // 5. Left decorative line (subtle horizontal reveal from right)
      tl.fromTo(
        leftLineDesktopRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out' },
        0.58
      );

      // 6. Left endpoint dot (subtle slide/fade from LEFT)
      tl.fromTo(
        leftDotDesktopRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        0.68
      );

      // 7. Right decorative line (subtle horizontal reveal from left)
      tl.fromTo(
        rightLineDesktopRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out' },
        0.65
      );

      // 8. Right endpoint dot (subtle slide/fade from RIGHT)
      tl.fromTo(
        rightDotDesktopRef.current,
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        0.75
      );
    });

    // ========================================================
    // MOBILE & TABLET ANIMATION TIMELINE (< 1024px)
    // ========================================================
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          callMobileRef.current,
          emailMobileRef.current,
          whatsappMobileRef.current,
          visitMobileRef.current,
          leftLineMobileRef.current,
          leftDotMobileRef.current,
          rightLineMobileRef.current,
          rightDotMobileRef.current,
        ],
        { opacity: 0 }
      );

      gsap.set([leftLineMobileRef.current, rightLineMobileRef.current], {
        scaleX: 0,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Call card
      tl.fromTo(
        callMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.1
      );

      // 2. Email card
      tl.fromTo(
        emailMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.2
      );

      // 3. WhatsApp card
      tl.fromTo(
        whatsappMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.3
      );

      // 4. Visit Us card
      tl.fromTo(
        visitMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.4
      );

      // 5. Left line
      tl.fromTo(
        leftLineMobileRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
        0.5
      );

      // 6. Left dot (from LEFT)
      tl.fromTo(
        leftDotMobileRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.58
      );

      // 7. Right line
      tl.fromTo(
        rightLineMobileRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
        0.55
      );

      // 8. Right dot (from RIGHT)
      tl.fromTo(
        rightDotMobileRef.current,
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.63
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      className={styles.contactCardsSection}
      id="autovyne-contact-cards-section"
      aria-label="Contact Information Cards and Accents"
    >
      {/* ========================================================
          DESKTOP CONTACT CARDS & DECORATIVE LINES (>= 768px, 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        {/* Top Row: Call Card, Email Card, Right Line + Dot */}
        {/* 1. Call Box */}
        <a
          ref={callDesktopRef}
          href="tel:+12225550187"
          className={`${styles.glassCardDesktop} ${styles.callCardDesktop}`}
          id="contact-card-call-desktop"
          aria-label="Call Us: +1 (222) 555-0187"
        >
          <img
            src="/icons/Phone_yellow.svg"
            alt="Phone"
            className={`${styles.cardIconDesktop} ${styles.callIconDesktop}`}
            width={30}
            height={30}
          />
          <div className={`${styles.cardContentDesktop} ${styles.callContentDesktop}`}>
            <span className={styles.cardLabelDesktop}>Call Us</span>
            <span className={styles.cardValueDesktop}>+1 (222) 555-0187</span>
            <span className={styles.cardSubtextDesktop}>24/7 Support</span>
          </div>
        </a>

        {/* 2. Email Box */}
        <a
          ref={emailDesktopRef}
          href="mailto:hello@gmail.com"
          className={`${styles.glassCardDesktop} ${styles.emailCardDesktop}`}
          id="contact-card-email-desktop"
          aria-label="Email Us: hello@gmail.com"
        >
          <img
            src="/icons/Email_yellow.svg"
            alt="Email"
            className={`${styles.cardIconDesktop} ${styles.emailIconDesktop}`}
            width={30}
            height={30}
          />
          <div className={`${styles.cardContentDesktop} ${styles.emailContentDesktop}`}>
            <span className={styles.cardLabelDesktop}>Email Us</span>
            <span className={styles.cardValueDesktop}>hello@gmail.com</span>
            <span className={styles.cardSubtextDesktop}>We reply within 1 hour</span>
          </div>
        </a>

        {/* Right Decorative Line with Endpoint Dot at RIGHT END */}
        <div className={styles.rightLineGroupDesktop} id="contact-right-line-group-desktop">
          <div
            ref={rightLineDesktopRef}
            className={styles.rightLineDesktop}
            id="contact-line-right-desktop"
          />
          <div
            ref={rightDotDesktopRef}
            className={styles.rightDotDesktop}
            id="contact-dot-right-desktop"
          />
        </div>

        {/* Bottom Row: Left Line + Dot, WhatsApp Card, Visit Us Card */}
        {/* Left Decorative Line with Endpoint Dot at LEFT END */}
        <div className={styles.leftLineGroupDesktop} id="contact-left-line-group-desktop">
          <div
            ref={leftDotDesktopRef}
            className={styles.leftDotDesktop}
            id="contact-dot-left-desktop"
          />
          <div
            ref={leftLineDesktopRef}
            className={styles.leftLineDesktop}
            id="contact-line-left-desktop"
          />
        </div>

        {/* 3. WhatsApp Box */}
        <a
          ref={whatsappDesktopRef}
          href="https://wa.me/12225550187"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.glassCardDesktop} ${styles.whatsappCardDesktop}`}
          id="contact-card-whatsapp-desktop"
          aria-label="WhatsApp: +1 (222) 555-0187"
        >
          <img
            src="/icons/WhatsApp_yellow.svg"
            alt="WhatsApp"
            className={`${styles.cardIconDesktop} ${styles.whatsappIconDesktop}`}
            width={30}
            height={30}
          />
          <div className={`${styles.cardContentDesktop} ${styles.whatsappContentDesktop}`}>
            <span className={styles.cardLabelDesktop}>WhatsApp</span>
            <span className={styles.cardValueDesktop}>+1 (222) 555-0187</span>
            <span className={styles.cardSubtextDesktop}>Chat with Us</span>
          </div>
        </a>

        {/* 4. Visit Us Box */}
        <a
          ref={visitDesktopRef}
          href="https://maps.google.com/?q=350+5th+Ave,+New+York,+NY+10118"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.glassCardDesktop} ${styles.visitCardDesktop}`}
          id="contact-card-visit-desktop"
          aria-label="Visit Us: 350 5th Ave, New York, NY 10118"
        >
          <img
            src="/icons/Visit.svg"
            alt="Location"
            className={`${styles.cardIconDesktop} ${styles.visitIconDesktop}`}
            width={30}
            height={30}
          />
          <div className={`${styles.cardContentDesktop} ${styles.visitContentDesktop}`}>
            <span className={styles.cardLabelDesktop}>Visit Us</span>
            <span className={styles.cardValueDesktop}>New York, USA</span>
            <span className={styles.cardSubtextDesktop}>
              350 5th Ave, New York, NY 10118
            </span>
          </div>
        </a>
      </div>

      {/* ========================================================
          MOBILE CONTACT CARDS & DECORATIVE LINES (< 768px, 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        {/* Top Row Mobile */}
        {/* 1. Call Box */}
        <a
          ref={callMobileRef}
          href="tel:+12225550187"
          className={`${styles.glassCardMobile} ${styles.callCardMobile}`}
          id="contact-card-call-mobile"
          aria-label="Call Us: +1 (222) 555-0187"
        >
          <img
            src="/icons/Phone_yellow.svg"
            alt="Phone"
            className={`${styles.cardIconMobile} ${styles.callIconMobile}`}
            width={15}
            height={15}
          />
          <div className={`${styles.cardContentMobile} ${styles.callContentMobile}`}>
            <span className={styles.cardLabelMobile}>Call Us</span>
            <span className={styles.cardValueMobile}>+1 (222) 555-0187</span>
            <span className={styles.cardSubtextMobile}>24/7 Support</span>
          </div>
        </a>

        {/* 2. Email Box */}
        <a
          ref={emailMobileRef}
          href="mailto:hello@gmail.com"
          className={`${styles.glassCardMobile} ${styles.emailCardMobile}`}
          id="contact-card-email-mobile"
          aria-label="Email Us: hello@gmail.com"
        >
          <img
            src="/icons/Email_yellow.svg"
            alt="Email"
            className={`${styles.cardIconMobile} ${styles.emailIconMobile}`}
            width={15}
            height={15}
          />
          <div className={`${styles.cardContentMobile} ${styles.emailContentMobile}`}>
            <span className={styles.cardLabelMobile}>Email Us</span>
            <span className={styles.cardValueMobile}>hello@gmail.com</span>
            <span className={styles.cardSubtextMobile}>
              We reply within
              <br />1 hour
            </span>
          </div>
        </a>

        {/* Right Line + Dot Mobile (Dot at RIGHT END) */}
        <div className={styles.rightLineGroupMobile} id="contact-right-line-group-mobile">
          <div
            ref={rightLineMobileRef}
            className={styles.rightLineMobile}
            id="contact-line-right-mobile"
          />
          <div
            ref={rightDotMobileRef}
            className={styles.rightDotMobile}
            id="contact-dot-right-mobile"
          />
        </div>

        {/* Bottom Row Mobile */}
        {/* Left Line + Dot Mobile (Dot at LEFT END) */}
        <div className={styles.leftLineGroupMobile} id="contact-left-line-group-mobile">
          <div
            ref={leftDotMobileRef}
            className={styles.leftDotMobile}
            id="contact-dot-left-mobile"
          />
          <div
            ref={leftLineMobileRef}
            className={styles.leftLineMobile}
            id="contact-line-left-mobile"
          />
        </div>

        {/* 3. WhatsApp Box */}
        <a
          ref={whatsappMobileRef}
          href="https://wa.me/12225550187"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.glassCardMobile} ${styles.whatsappCardMobile}`}
          id="contact-card-whatsapp-mobile"
          aria-label="WhatsApp: +1 (222) 555-0187"
        >
          <img
            src="/icons/WhatsApp_yellow.svg"
            alt="WhatsApp"
            className={`${styles.cardIconMobile} ${styles.whatsappIconMobile}`}
            width={15}
            height={15}
          />
          <div className={`${styles.cardContentMobile} ${styles.whatsappContentMobile}`}>
            <span className={styles.cardLabelMobile}>WhatsApp</span>
            <span className={styles.cardValueMobile}>+1 (222) 555-0187</span>
            <span className={styles.cardSubtextMobile}>Chat with Us</span>
          </div>
        </a>

        {/* 4. Visit Us Box */}
        <a
          ref={visitMobileRef}
          href="https://maps.google.com/?q=350+5th+Ave,+New+York,+NY+10118"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.glassCardMobile} ${styles.visitCardMobile}`}
          id="contact-card-visit-mobile"
          aria-label="Visit Us: 350 5th Ave, New York, NY 10118"
        >
          <img
            src="/icons/Visit.svg"
            alt="Location"
            className={`${styles.cardIconMobile} ${styles.visitIconMobile}`}
            width={15}
            height={15}
          />
          <div className={`${styles.cardContentMobile} ${styles.visitContentMobile}`}>
            <span className={styles.cardLabelMobile}>Visit Us</span>
            <span className={styles.cardValueMobile}>New York, USA</span>
            <span className={styles.cardSubtextMobile}>
              350 5th Ave,
              <br />New York, NY 10118
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
