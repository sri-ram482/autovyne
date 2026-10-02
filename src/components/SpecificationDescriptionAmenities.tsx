'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { VehicleAmenities } from '@/data/vehicleSpecs';
import styles from './SpecificationDescriptionAmenities.module.css';

interface SpecificationDescriptionAmenitiesProps {
  descriptionWords: [string, string, string, string];
  amenities: VehicleAmenities;
}

export default function SpecificationDescriptionAmenities({
  descriptionWords,
  amenities,
}: SpecificationDescriptionAmenitiesProps) {
  // Container refs for animations
  const desktopRootRef = useRef<HTMLDivElement>(null);
  const mobileRootRef = useRef<HTMLDivElement>(null);

  // Desktop divider line and description row
  const desktopDividerRef = useRef<HTMLDivElement>(null);
  const desktopDescRowRef = useRef<HTMLDivElement>(null);

  // Desktop amenities refs
  const desktopAmenity1Ref = useRef<HTMLDivElement>(null); // Seats
  const desktopAmenity2Ref = useRef<HTMLDivElement>(null); // Luggage
  const desktopAmenity3Ref = useRef<HTMLDivElement>(null); // Doors
  const desktopAmenity4Ref = useRef<HTMLDivElement>(null); // 0-60 MPH
  const desktopAmenity5Ref = useRef<HTMLDivElement>(null); // Horse Power

  // Mobile amenities refs
  const mobileAmenity1Ref = useRef<HTMLDivElement>(null); // Seats
  const mobileAmenity2Ref = useRef<HTMLDivElement>(null); // Luggage
  const mobileAmenity3Ref = useRef<HTMLDivElement>(null); // Doors
  const mobileAmenity4Ref = useRef<HTMLDivElement>(null); // 0-60 MPH
  const mobileAmenity5Ref = useRef<HTMLDivElement>(null); // Horse Power

  // Mobile side badge
  const mobileSideBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const descRows = [desktopDescRowRef.current].filter(Boolean);
      const dividers = [desktopDividerRef.current].filter(Boolean);
      const desktopAmenities = [
        desktopAmenity1Ref.current,
        desktopAmenity2Ref.current,
        desktopAmenity3Ref.current,
        desktopAmenity4Ref.current,
        desktopAmenity5Ref.current,
      ].filter(Boolean);
      const mobileAmenities = [
        mobileAmenity1Ref.current,
        mobileAmenity2Ref.current,
        mobileAmenity3Ref.current,
        mobileAmenity4Ref.current,
        mobileAmenity5Ref.current,
      ].filter(Boolean);

      const tl = gsap.timeline({ delay: 0.65 });

      // Step 2: Car description text row (fade in + subtle slide down)
      tl.fromTo(
        descRows,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0
      );

      // Step 3: Divider line scales horizontally from center
      tl.fromTo(
        dividers,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
        0.15
      );

      // Step 4: Amenities staggered entrance (fade in + subtle slide up)
      tl.fromTo(
        desktopAmenities,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
        0.28
      );

      tl.fromTo(
        mobileAmenities,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
        0.28
      );

      // Side badge fade in on mobile
      if (mobileSideBadgeRef.current) {
        tl.fromTo(
          mobileSideBadgeRef.current,
          { opacity: 0, x: 6 },
          { opacity: 0.85, x: 0, duration: 0.5, ease: 'power2.out' },
          0.35
        );
      }

      // 2. Subtle Premium Floating Motion for all 5 amenities
      // Slow, smooth, non-distracting vertical float (staggered phases)
      const allAmenityItems = [
        [desktopAmenity1Ref.current, mobileAmenity1Ref.current],
        [desktopAmenity2Ref.current, mobileAmenity2Ref.current],
        [desktopAmenity3Ref.current, mobileAmenity3Ref.current],
        [desktopAmenity4Ref.current, mobileAmenity4Ref.current],
        [desktopAmenity5Ref.current, mobileAmenity5Ref.current],
      ];

      const floatPhases = [0, 0.4, 0.8, 1.2, 0.6];
      const floatDurations = [3.8, 4.2, 3.6, 4.0, 3.9];

      allAmenityItems.forEach((pair, index) => {
        const validItems = pair.filter(Boolean);
        if (validItems.length > 0) {
          gsap.to(validItems, {
            y: -1.5,
            duration: floatDurations[index],
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: floatPhases[index] + 0.8, // start after entrance completes
          });
        }
      });
    });

    return () => ctx.revert();
  }, [descriptionWords, amenities]);

  return (
    <>
      {/* ========================================================
          DESKTOP SPECIFICATIONS: DESCRIPTION & 5 AMENITIES
          ======================================================== */}
      <div
        ref={desktopRootRef}
        className={styles.desktopContainer}
        id="specs-desc-amenities-desktop"
        aria-label="Vehicle description and amenities"
      >
        {/* 1. Car Description Text Row (Figma node 203:59 Frame 21: 459x21px) */}
        <div
          ref={desktopDescRowRef}
          className={styles.desktopDescriptionRow}
          id="specs-desc-row-desktop"
        >
          <span className={styles.descriptionWordDesktop}>{descriptionWords[0]}</span>
          <span className={styles.descriptionSeparatorDesktop}>•</span>
          <span className={styles.descriptionWordDesktop}>{descriptionWords[1]}</span>
          <span className={styles.descriptionSeparatorDesktop}>•</span>
          <span className={styles.descriptionWordDesktop}>{descriptionWords[2]}</span>
          <span className={styles.descriptionSeparatorDesktop}>•</span>
          <span className={styles.descriptionWordDesktop}>{descriptionWords[3]}</span>
        </div>

        {/* 2. Divider Line (Figma node 204:60: 459x1px, #CACACA) */}
        <div
          ref={desktopDividerRef}
          className={styles.desktopDividerLine}
          id="specs-desc-divider-desktop"
        />

        {/* 3. Amenities Row 1: Seats, Luggage, Doors (Figma node 205:89 Frame 22: 379x31px) */}
        <div className={styles.desktopAmenitiesRow1} id="specs-amenities-row1-desktop">
          {/* Amenity 1: Seats */}
          <div
            ref={desktopAmenity1Ref}
            className={styles.amenityItemDesktop}
            id="specs-amenity-seats-desktop"
            data-amenity="seats"
          >
            <img
              src="/icons/Flight Seat.svg"
              alt=""
              width={30}
              height={30}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>{amenities.seats}</span>
              <span className={styles.amenityLabelDesktop}>Seats</span>
            </div>
          </div>

          {/* Amenity 2: Luggage */}
          <div
            ref={desktopAmenity2Ref}
            className={styles.amenityItemDesktop}
            id="specs-amenity-luggage-desktop"
            data-amenity="luggage"
          >
            <img
              src="/icons/Carry On Bag.svg"
              alt=""
              width={30}
              height={30}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>{amenities.luggage}</span>
              <span className={styles.amenityLabelDesktop}>Luggage</span>
            </div>
          </div>

          {/* Amenity 3: Doors */}
          <div
            ref={desktopAmenity3Ref}
            className={styles.amenityItemDesktop}
            id="specs-amenity-doors-desktop"
            data-amenity="doors"
          >
            <img
              src="/icons/Car Door.svg"
              alt=""
              width={30}
              height={30}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>{amenities.doors}</span>
              <span className={styles.amenityLabelDesktop}>Doors</span>
            </div>
          </div>
        </div>

        {/* 4. Amenities Row 2: 0-60 MPH, Horse Power (Figma node 205:90 Frame 23: 266x31px) */}
        <div className={styles.desktopAmenitiesRow2} id="specs-amenities-row2-desktop">
          {/* Amenity 4: 0-60 MPH */}
          <div
            ref={desktopAmenity4Ref}
            className={styles.amenityItemDesktop}
            id="specs-amenity-speed-desktop"
            data-amenity="speed"
          >
            <img
              src="/icons/Speedometer.svg"
              alt=""
              width={30}
              height={30}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>{amenities.zeroToSixty}</span>
              <span className={styles.amenityLabelDesktop}>0 - 60 MPH</span>
            </div>
          </div>

          {/* Amenity 5: Horse Power */}
          <div
            ref={desktopAmenity5Ref}
            className={styles.amenityItemDesktop}
            id="specs-amenity-hp-desktop"
            data-amenity="horsepower"
          >
            <img
              src="/icons/Horse.svg"
              alt=""
              width={30}
              height={30}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>{amenities.horsePower}</span>
              <span className={styles.amenityLabelDesktop}>Horse Power</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE SPECIFICATIONS: DESCRIPTION & 5 AMENITIES
          ======================================================== */}
      <div
        ref={mobileRootRef}
        className={styles.mobileContainer}
        id="specs-desc-amenities-mobile"
        aria-label="Vehicle description and amenities"
      >
        {/* 1. Mobile Amenities Row: All 5 in a single row (Figma Frame 30: 317x23px, left 36.5px, top 539px) */}
        <div className={styles.mobileAmenitiesRow} id="specs-amenities-row-mobile">
          {/* Amenity 1: Seats */}
          <div
            ref={mobileAmenity1Ref}
            className={styles.amenityItemMobile}
            id="specs-amenity-seats-mobile"
            data-amenity="seats"
          >
            <img
              src="/icons/Flight Seat.svg"
              alt=""
              width={15}
              height={15}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>{amenities.seats}</span>
              <span className={styles.amenityLabelMobile}>Seats</span>
            </div>
          </div>

          {/* Amenity 2: Luggage */}
          <div
            ref={mobileAmenity2Ref}
            className={styles.amenityItemMobile}
            id="specs-amenity-luggage-mobile"
            data-amenity="luggage"
          >
            <img
              src="/icons/Carry On Bag.svg"
              alt=""
              width={15}
              height={15}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>{amenities.luggage}</span>
              <span className={styles.amenityLabelMobile}>Luggage</span>
            </div>
          </div>

          {/* Amenity 3: Doors */}
          <div
            ref={mobileAmenity3Ref}
            className={styles.amenityItemMobile}
            id="specs-amenity-doors-mobile"
            data-amenity="doors"
          >
            <img
              src="/icons/Car Door.svg"
              alt=""
              width={15}
              height={15}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>{amenities.doors}</span>
              <span className={styles.amenityLabelMobile}>Doors</span>
            </div>
          </div>

          {/* Amenity 4: 0-60 MPH */}
          <div
            ref={mobileAmenity4Ref}
            className={styles.amenityItemMobile}
            id="specs-amenity-speed-mobile"
            data-amenity="speed"
          >
            <img
              src="/icons/Speedometer.svg"
              alt=""
              width={15}
              height={15}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>{amenities.zeroToSixty}</span>
              <span className={styles.amenityLabelMobile}>0-60 MPH</span>
            </div>
          </div>

          {/* Amenity 5: Horse Power */}
          <div
            ref={mobileAmenity5Ref}
            className={styles.amenityItemMobile}
            id="specs-amenity-hp-mobile"
            data-amenity="horsepower"
          >
            <img
              src="/icons/Horse.svg"
              alt=""
              width={15}
              height={15}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>{amenities.horsePower}</span>
              <span className={styles.amenityLabelMobile}>Horse Power</span>
            </div>
          </div>
        </div>

        {/* 4. Mobile Side Vertical Badge (Figma node 219:357) */}
        <div
          ref={mobileSideBadgeRef}
          className={styles.mobileSideBadge}
          id="specs-side-badge-mobile"
          aria-hidden="true"
        >
          {`> ${descriptionWords.join(' | ')}`}
        </div>
      </div>
    </>
  );
}
