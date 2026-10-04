'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ExperiencesCar.module.css';

export default function ExperiencesCar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Desktop Refs
  const carDesktopRef = useRef<HTMLDivElement>(null);
  const frontWheelDesktopRef = useRef<HTMLImageElement>(null);
  const rearWheelDesktopRef = useRef<HTMLImageElement>(null);

  // Mobile Refs
  const carMobileRef = useRef<HTMLDivElement>(null);
  const frontWheelMobileRef = useRef<HTMLImageElement>(null);
  const rearWheelMobileRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP TIMELINE (>= 1024px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 1024px)', () => {
      if (
        !carDesktopRef.current ||
        !frontWheelDesktopRef.current ||
        !rearWheelDesktopRef.current
      ) {
        return;
      }

      // Wheel visible diameter ~146.5px, circumference = pi * 146.5 ~= 460.24px
      // 3 complete revolutions = 1380.7px translation
      // At x = 1380.7px, with container left: 424px, the car begins off-screen at x = 1804.7px (> 1440px)
      const startX = 1380.7;
      const totalRotation = -1080; // Exactly 3 full rotations landing at the upright Figma resting angle (0deg)

      // Set initial state: car outside viewport, wheels at 0deg
      gsap.set(carDesktopRef.current, { x: startX, opacity: 1 });
      gsap.set(
        [frontWheelDesktopRef.current, rearWheelDesktopRef.current],
        { rotation: 0 }
      );

      // Single coordinated GSAP timeline
      const tl = gsap.timeline({
        delay: 0.25, // Small cinematic breath on load
      });

      // 1. Car translation: RIGHT -> LEFT to exact Figma parked position (x: 0)
      tl.to(
        carDesktopRef.current,
        {
          x: 0,
          duration: 2.6,
          ease: 'power2.out',
        },
        0
      );

      // 2. Both wheels rotate continuously around their exact axle axis while moving
      // Stops rotating at the exact same instant the car reaches its final position
      tl.to(
        [frontWheelDesktopRef.current, rearWheelDesktopRef.current],
        {
          rotation: totalRotation,
          duration: 2.6,
          ease: 'power2.out',
        },
        0
      );
    });

    // ========================================================
    // MOBILE & TABLET TIMELINE (< 1024px)
    // ========================================================
    mm.add('(max-width: 1023px)', () => {
      if (
        !carMobileRef.current ||
        !frontWheelMobileRef.current ||
        !rearWheelMobileRef.current
      ) {
        return;
      }

      // Mobile wheel visible diameter ~50.86px, circumference = pi * 50.86 ~= 159.8px
      // 2 complete revolutions = ~320px translation
      // At x = 330px, with container left: 64px, the car begins off-screen at x = 394px (>= 390px)
      const startX = 330;
      const totalRotation = -720; // Exactly 2 full rotations landing at upright Figma angle (0deg)

      gsap.set(carMobileRef.current, { x: startX, opacity: 1 });
      gsap.set(
        [frontWheelMobileRef.current, rearWheelMobileRef.current],
        { rotation: 0 }
      );

      const tl = gsap.timeline({
        delay: 0.25,
      });

      tl.to(
        carMobileRef.current,
        {
          x: 0,
          duration: 2.4,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        [frontWheelMobileRef.current, rearWheelMobileRef.current],
        {
          rotation: totalRotation,
          duration: 2.4,
          ease: 'power2.out',
        },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={styles.experiencesCarSection}
      id="autovyne-experiences-car-section"
      aria-label="Experiences Page Featured Vehicle"
    >
      {/* ========================================================
          DESKTOP EXPERIENCES CAR (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <div
          ref={carDesktopRef}
          className={styles.carContainerDesktop}
          id="experiences-car-desktop"
        >
          {/* Front Wheel (Left in viewer perspective) - Behind Car Body */}
          <img
            ref={frontWheelDesktopRef}
            src="/images/new_front_wheel.svg"
            alt="Porsche 911 Front Wheel"
            className={styles.frontWheelDesktop}
            id="experiences-front-wheel-desktop"
            width={204}
            height={181}
          />

          {/* Rear Wheel (Right in viewer perspective) - Behind Car Body */}
          <img
            ref={rearWheelDesktopRef}
            src="/images/new_rear_wheel.svg"
            alt="Porsche 911 Rear Wheel"
            className={styles.rearWheelDesktop}
            id="experiences-rear-wheel-desktop"
            width={207}
            height={183}
          />

          {/* Car Body (Strictly in front of wheels) */}
          <img
            src="/images/car_body_main.svg"
            alt="Porsche 911 Turbo S"
            className={styles.carBodyDesktop}
            id="experiences-car-body-desktop"
            width={841}
            height={315}
          />
        </div>
      </div>

      {/* ========================================================
          MOBILE EXPERIENCES CAR (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <div
          ref={carMobileRef}
          className={styles.carContainerMobile}
          id="experiences-car-mobile"
        >
          {/* Front Wheel (Left in viewer perspective) - Behind Car Body */}
          <img
            ref={frontWheelMobileRef}
            src="/images/new_front_wheel.svg"
            alt="Porsche 911 Front Wheel"
            className={styles.frontWheelMobile}
            id="experiences-front-wheel-mobile"
          />

          {/* Rear Wheel (Right in viewer perspective) - Behind Car Body */}
          <img
            ref={rearWheelMobileRef}
            src="/images/new_rear_wheel.svg"
            alt="Porsche 911 Rear Wheel"
            className={styles.rearWheelMobile}
            id="experiences-rear-wheel-mobile"
          />

          {/* Car Body (Strictly in front of wheels) */}
          <img
            src="/images/car_body_main.svg"
            alt="Porsche 911 Turbo S"
            className={styles.carBodyMobile}
            id="experiences-car-body-mobile"
          />
        </div>
      </div>
    </div>
  );
}
