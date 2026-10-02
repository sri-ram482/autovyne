'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';
import styles from './FleetCarSlider.module.css';

export interface VehiclePricingRating {
  id: number;
  slug: string;
  price: number;
  rating: number;
  performance: number;
  comfort: number;
  design: number;
}

export const FLEET_VEHICLE_DATA: VehiclePricingRating[] = [
  { id: 1, slug: 'vehicle-1', price: 10, rating: 4.3, performance: 5, comfort: 4, design: 4 },
  { id: 2, slug: 'vehicle-2', price: 12, rating: 4.7, performance: 5, comfort: 4, design: 5 },
  { id: 3, slug: 'vehicle-3', price: 9, rating: 4.6, performance: 5, comfort: 4, design: 5 },
  { id: 4, slug: 'vehicle-4', price: 11, rating: 4.8, performance: 5, comfort: 5, design: 5 },
  { id: 5, slug: 'vehicle-5', price: 10, rating: 4.5, performance: 4, comfort: 5, design: 4 },
  { id: 6, slug: 'vehicle-6', price: 13, rating: 4.6, performance: 5, comfort: 4, design: 5 },
  { id: 7, slug: 'vehicle-7', price: 14, rating: 4.9, performance: 5, comfort: 4, design: 5 },
];

export interface VehicleConfig {
  id: number;
  name: string;
  brand: string;
  model: string;
  bodySrc: string;
  desktop: {
    width: number;
    height: number;
    left: number;
    top: number;
    frontWheel: { left: number; top: number; width: number; height: number };
    rearWheel: { left: number; top: number; width: number; height: number };
  };
  mobile: {
    width: number;
    height: number;
    left: number;
    top: number;
    frontWheel: { left: number; top: number; width: number; height: number };
    rearWheel: { left: number; top: number; width: number; height: number };
  };
}

export const FLEET_VEHICLES: VehicleConfig[] = [
  // Vehicle 1: Lamborghini Urus (car_one)
  {
    id: 1,
    name: 'car_one',
    brand: 'LAMBORGHINI',
    model: 'URUS',
    bodySrc: '/images/car_body_1.svg',
    desktop: {
      width: 874,
      height: 378,
      left: 331,
      top: 262,
      frontWheel: { left: 80, top: 205, width: 177, height: 157 },
      rearWheel: { left: 594, top: 199, width: 184, height: 163 },
    },
    mobile: {
      width: 264,
      height: 114,
      left: 70,
      top: 413,
      frontWheel: { left: 24, top: 62, width: 53, height: 47 },
      rearWheel: { left: 179, top: 60, width: 56, height: 49 },
    },
  },
  // Vehicle 2: Mercedes AMG GT (car_two)
  {
    id: 2,
    name: 'car_two',
    brand: 'MERCEDES',
    model: 'AMG GT',
    bodySrc: '/images/car_body_2.svg',
    desktop: {
      width: 905,
      height: 359,
      left: 331,
      top: 262,
      frontWheel: { left: 62, top: 173, width: 210, height: 186 },
      rearWheel: { left: 582, top: 165, width: 218, height: 193 },
    },
    mobile: {
      width: 264,
      height: 105,
      left: 70,
      top: 418,
      frontWheel: { left: 18, top: 50, width: 61, height: 54 },
      rearWheel: { left: 170, top: 48, width: 64, height: 56 },
    },
  },
  // Vehicle 3: BMW M4 Competition (car_three)
  {
    id: 3,
    name: 'car_three',
    brand: 'BMW',
    model: 'M4 COMPETITION',
    bodySrc: '/images/car_body_3.svg',
    desktop: {
      width: 816,
      height: 364,
      left: 331,
      top: 262,
      frontWheel: { left: 39, top: 198, width: 203, height: 180 },
      rearWheel: { left: 530, top: 194, width: 211, height: 180 },
    },
    mobile: {
      width: 264,
      height: 118,
      left: 70,
      top: 409,
      frontWheel: { left: 13, top: 64, width: 66, height: 58 },
      rearWheel: { left: 171, top: 63, width: 68, height: 58 },
    },
  },
  // Vehicle 4: Audi RS 7 (car_four)
  {
    id: 4,
    name: 'car_four',
    brand: 'AUDI',
    model: 'RS 7',
    bodySrc: '/images/car_body_4.svg',
    desktop: {
      width: 953,
      height: 378,
      left: 331,
      top: 262,
      frontWheel: { left: 86, top: 182, width: 209, height: 185 },
      rearWheel: { left: 653, top: 178, width: 209, height: 185 },
    },
    mobile: {
      width: 264,
      height: 105,
      left: 70,
      top: 418,
      frontWheel: { left: 24, top: 50, width: 58, height: 51 },
      rearWheel: { left: 181, top: 49, width: 58, height: 51 },
    },
  },
  // Vehicle 5: Range Rover Sport (car_five)
  {
    id: 5,
    name: 'car_five',
    brand: 'RANGE ROVER',
    model: 'SPORT',
    bodySrc: '/images/car_body_5.svg',
    desktop: {
      width: 953,
      height: 378,
      left: 331,
      top: 262,
      frontWheel: { left: 82, top: 189, width: 213, height: 189 },
      rearWheel: { left: 635, top: 182, width: 217, height: 192 },
    },
    mobile: {
      width: 264,
      height: 105,
      left: 70,
      top: 418,
      frontWheel: { left: 23, top: 52, width: 59, height: 52 },
      rearWheel: { left: 176, top: 50, width: 60, height: 53 },
    },
  },
  // Vehicle 6: Maserati GranTurismo (car_six)
  {
    id: 6,
    name: 'car_six',
    brand: 'MASERATI',
    model: 'GRAN TURISMO',
    bodySrc: '/images/car_body_6.svg',
    desktop: {
      width: 756,
      height: 378,
      left: 331,
      top: 262,
      frontWheel: { left: 52, top: 181, width: 170, height: 151 },
      rearWheel: { left: 520, top: 178, width: 174, height: 154 },
    },
    mobile: {
      width: 264,
      height: 132,
      left: 70,
      top: 404,
      frontWheel: { left: 18, top: 63, width: 59, height: 53 },
      rearWheel: { left: 182, top: 62, width: 61, height: 54 },
    },
  },
  // Vehicle 7: Porsche 911 Carrera (car_seven)
  {
    id: 7,
    name: 'car_seven',
    brand: 'PORSCHE',
    model: '911 CARRERA',
    bodySrc: '/images/car_body_7.svg',
    desktop: {
      width: 672,
      height: 378,
      left: 331,
      top: 262,
      frontWheel: { left: 66, top: 195, width: 151, height: 134 },
      rearWheel: { left: 423, top: 189, width: 159, height: 141 },
    },
    mobile: {
      width: 264,
      height: 148,
      left: 70,
      top: 396,
      frontWheel: { left: 26, top: 77, width: 59, height: 53 },
      rearWheel: { left: 166, top: 74, width: 63, height: 55 },
    },
  },
];

export interface VehicleTextConfig {
  id: number;
  brandText: string;
  modelText: string;
  desktop: {
    brand: { left: number; top: number; width: number; height: number; fontSize: number; lineHeight: number };
    model: { left: number; top: number; width: number; height: number; fontSize: number; lineHeight: number };
    line: { left: number; top: number; width: number; height: number };
    descContainer: { left: number; top: number; width: number; height: number };
    words: string[];
  };
  mobile: {
    brand: { left: number; top: number; width: number; height: number; fontSize: number; lineHeight: number };
    model: { left: number; top: number; width: number; height: number; fontSize: number; lineHeight: number };
    descText: string;
    desc: { left: number; top: number; width: number; height: number; fontSize: number; lineHeight: number };
  };
}

export const FLEET_TEXT_DATA: VehicleTextConfig[] = [
  // 1. Lamborghini Urus
  {
    id: 1,
    brandText: 'LAMBORGHINI',
    modelText: 'URUS',
    desktop: {
      brand: { left: 628, top: 130, width: 288, height: 60, fontSize: 40, lineHeight: 60 },
      model: { left: 474, top: 105, width: 596, height: 330, fontSize: 220, lineHeight: 330 },
      line: { left: 1090, top: 221, width: 2, height: 122 },
      descContainer: { left: 1103, top: 227, width: 72, height: 116 },
      words: ['POWER', 'LUXURY', 'PRESENCE', 'LIMITS'],
    },
    mobile: {
      brand: { left: 131, top: 341, width: 144, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 67, top: 332, width: 271, height: 150, fontSize: 100, lineHeight: 150 },
      descText: '> POWER | LUXURY | PRESENCE | LIMITS',
      desc: { left: 22, top: 170, width: 141, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 2. Mercedes AMG GT
  {
    id: 2,
    brandText: 'MERCEDES',
    modelText: 'AMG GT',
    desktop: {
      brand: { left: 657.5, top: 126, width: 215, height: 60, fontSize: 40, lineHeight: 60 },
      model: { left: 325, top: 105, width: 880, height: 330, fontSize: 220, lineHeight: 330 },
      line: { left: 1184, top: 243, width: 2, height: 122 },
      descContainer: { left: 1197, top: 249, width: 107, height: 116 },
      words: ['PERFORMANCE', 'PRECISION', 'ELEGANCE', 'SPEED'],
    },
    mobile: {
      brand: { left: 141, top: 355, width: 108, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 35, top: 355, width: 320, height: 120, fontSize: 80, lineHeight: 120 },
      descText: '> PERFORMACE | PRECISION | ELEGANCE | SPEED',
      desc: { left: 22, top: 170, width: 177, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 3. BMW M4 Competition
  {
    id: 3,
    brandText: 'BMW',
    modelText: 'M4 COMPETITION',
    desktop: {
      brand: { left: 667, top: 126, width: 196, height: 110, fontSize: 73, lineHeight: 109.5 },
      model: { left: 100, top: 170, width: 1329, height: 225, fontSize: 150, lineHeight: 225 },
      line: { left: 198, top: 352, width: 2, height: 122 },
      descContainer: { left: 211, top: 358, width: 95, height: 116 },
      words: ['DOMINANCE', 'PRESTIGE', 'HERITAGE', 'ENGINEERING'],
    },
    mobile: {
      brand: { left: 163.5, top: 364.5, width: 81, height: 45, fontSize: 30, lineHeight: 45 },
      model: { left: 26, top: 387, width: 355, height: 60, fontSize: 40, lineHeight: 60 },
      descText: '> DOMINANCE | PRESTIGE | HERITAGE | ENGINEERING',
      desc: { left: 22, top: 170, width: 192, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 4. Audi RS 7
  {
    id: 4,
    brandText: 'AUDI',
    modelText: 'RS 7',
    desktop: {
      brand: { left: 714.5, top: 126, width: 101, height: 60, fontSize: 40, lineHeight: 60 },
      model: { left: 545, top: 105, width: 440, height: 330, fontSize: 220, lineHeight: 330 },
      line: { left: 1043, top: 184, width: 2, height: 122 },
      descContainer: { left: 1056, top: 190, width: 120, height: 116 },
      words: ['INNOVATION', 'VELOCITY', 'EXCELLENCE', 'SOPHISTICATION'],
    },
    mobile: {
      brand: { left: 203.5, top: 348, width: 51, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 129, top: 338, width: 200, height: 150, fontSize: 100, lineHeight: 150 },
      descText: '> INNOVATION | VELOCITY | EXCELLENCE | SOPHISTICATION',
      desc: { left: 22, top: 170, width: 217, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 5. Range Rover Sport
  {
    id: 5,
    brandText: 'RANGE ROVER',
    modelText: 'SPORT',
    desktop: {
      brand: { left: 623, top: 126, width: 284, height: 60, fontSize: 40, lineHeight: 60 },
      model: { left: 427, top: 105, width: 728, height: 330, fontSize: 220, lineHeight: 330 },
      line: { left: 1131, top: 238, width: 2, height: 122 },
      descContainer: { left: 1144, top: 244, width: 121, height: 116 },
      words: ['AUTHORITY', 'THRILL', 'CONTROL', 'CRAFTSMANSHIP'],
    },
    mobile: {
      brand: { left: 125, top: 345, width: 142, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 47, top: 339, width: 298, height: 135, fontSize: 90, lineHeight: 135 },
      descText: '> AUTHORITY | THRILL | CONTROL | CRAFTSMANSHIP',
      desc: { left: 22, top: 170, width: 190, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 6. Maserati GranTurismo
  {
    id: 6,
    brandText: 'MASERATI',
    modelText: 'GRAN TURISMO',
    desktop: {
      brand: { left: 557.5, top: 126, width: 415, height: 120, fontSize: 80, lineHeight: 120 },
      model: { left: 126, top: 186, width: 1241, height: 240, fontSize: 160, lineHeight: 240 },
      line: { left: 248, top: 367, width: 2, height: 122 },
      descContainer: { left: 261, top: 373, width: 94, height: 116 },
      words: ['ICONIC', 'DYNAMIC', 'REFINED', 'AGGRESSION'],
    },
    mobile: {
      brand: { left: 149, top: 381, width: 104, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 26, top: 392, width: 349, height: 68, fontSize: 45, lineHeight: 67.5 },
      descText: '> ICONIC | DYNAMIC | REFINED | AGGRESSION',
      desc: { left: 22, top: 170, width: 168, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
  // 7. Porsche 911 Carrera
  {
    id: 7,
    brandText: 'PORSCHE',
    modelText: '911 CARRERA',
    desktop: {
      brand: { left: 558, top: 126, width: 414, height: 131, fontSize: 87, lineHeight: 130.5 },
      model: { left: 146, top: 186, width: 1211, height: 285, fontSize: 190, lineHeight: 285 },
      line: { left: 986, top: 136, width: 2, height: 122 },
      descContainer: { left: 999, top: 142, width: 89, height: 116 },
      words: ['EXCLUSIVITY', 'ADRENALINE', 'AMBITION', 'LEGACY'],
    },
    mobile: {
      brand: { left: 158, top: 375, width: 96, height: 30, fontSize: 20, lineHeight: 30 },
      model: { left: 46, top: 383, width: 319, height: 75, fontSize: 50, lineHeight: 75 },
      descText: '> EXCLUSIVITY | ADRENALINE | AMBITION | LEGACY',
      desc: { left: 22, top: 170, width: 183, height: 12, fontSize: 8, lineHeight: 12 },
    },
  },
];

interface FleetCarSliderProps {
  onVehicleChange?: (vehicle: VehicleConfig, index: number) => void;
}

export default function FleetCarSlider({ onVehicleChange }: FleetCarSliderProps) {
  const router = useRouter();
  const { isInCart, toggleCart } = useCart();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isAnimatingRef = useRef<boolean>(true); // starts true during initial entrance
  const hasEnteredRef = useRef<boolean>(false);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  // Active vehicle and rating data
  const activeVehicle = FLEET_VEHICLES[activeIndex];
  const activeData = FLEET_VEHICLE_DATA[activeIndex];
  const isCurrentInCart = isInCart(activeData.id);

  const handleSpecsClick = () => {
    router.push(`/fleet/${activeData.slug}/specifications`);
  };

  const handleCartToggle = () => {
    toggleCart(activeData.id);
  };

  // Helper to get travel distance based on current window width
  const getTravelDistance = useCallback(() => {
    if (typeof window === 'undefined') return 1440;
    const isDesktop = window.innerWidth >= 768;
    return isDesktop
      ? Math.max(window.innerWidth, 1440)
      : Math.max(window.innerWidth, 390);
  }, []);

  // Star Category renderer helper
  const renderStarCategory = (
    rating: number,
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
          aria-label={`${rating} out of 5 stars for ${label}`}
        >
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isActive = starNum <= rating;
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

  // ========================================================
  // INITIAL VEHICLE 1 ENTRANCE ANIMATION (RIGHT -> LEFT)
  // + CAR SLIDER INDICATORS FADE IN & SLIDE UP
  // + PRICE, RATING, BUTTONS FADE IN
  // ========================================================
  useEffect(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    const travelDist = getTravelDistance();
    const isDesktop = window.innerWidth >= 768;
    const duration = isDesktop ? 2.2 : 1.8;

    const carEls = [
      document.getElementById('fleet-car-desktop-0'),
      document.getElementById('fleet-car-mobile-0'),
    ].filter(Boolean);

    if (carEls.length === 0) return;

    // Set initial off-screen right position and 0 rotation
    gsap.set(carEls, { x: travelDist, display: 'block', opacity: 1 });
    const wheels = carEls.flatMap((el) =>
      Array.from(el!.querySelectorAll('[data-wheel]'))
    );
    gsap.set(wheels, { rotation: 0 });

    // Initial state for indicators: hidden and shifted downward for fade in + slide up
    const indicatorsEl = indicatorsRef.current || document.getElementById('fleet-slider-indicators');
    if (indicatorsEl) {
      gsap.set(indicatorsEl, { y: isDesktop ? 20 : 14, opacity: 0 });
    }

    // Initial state for Vehicle 1 text
    const initTextEls = [
      document.getElementById('fleet-text-desktop-0'),
      document.getElementById('fleet-text-mobile-0'),
    ].filter(Boolean);

    const initBrands = initTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="brand"]')));
    const initModels = initTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="model"]')));
    const initLines = initTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descLine"]')));
    const initWords = initTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descWord"], [data-text="desc"]')));

    gsap.set(initBrands, { opacity: 0, y: -20 });
    gsap.set(initModels, { opacity: 0, y: 30 });
    gsap.set(initLines, { opacity: 0, scaleY: 0 });
    gsap.set(initWords, { opacity: 0, x: 20 });

    // Stage 12: Initial state for price, rating, buttons
    const initPrices = [
      document.getElementById('fleet-price-desktop-0'),
      document.getElementById('fleet-price-mobile-0'),
    ].filter(Boolean);

    const initRatingFrames = [
      document.getElementById('fleet-rating-desktop'),
      document.getElementById('fleet-rating-mobile'),
    ].filter(Boolean);

    const initButtonLayers = [
      document.getElementById('fleet-buttons-desktop'),
      document.getElementById('fleet-buttons-mobile'),
    ].filter(Boolean);

    gsap.set(initPrices, { opacity: 0, y: 15 });
    gsap.set(initRatingFrames, { opacity: 0, y: 15 });
    gsap.set(initButtonLayers, { opacity: 0, y: 15 });

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        isAnimatingRef.current = false;
        if (onVehicleChange) {
          onVehicleChange(FLEET_VEHICLES[0], 0);
        }
      },
    });

    // 1. Car translation: RIGHT -> LEFT to exact parked position (x: 0)
    tl.to(
      carEls,
      {
        x: 0,
        duration,
        ease: 'power2.out',
      },
      0
    );

    // 2. Wheel rotation: counter-clockwise while moving, stops exactly when car stops
    tl.to(
      wheels,
      {
        rotation: -720,
        duration,
        ease: 'power2.out',
      },
      0
    );

    // 3. Car slider indicators: Fade in and slide up smoothly as car approaches parked position
    if (indicatorsEl) {
      tl.to(
        indicatorsEl,
        {
          y: 0,
          opacity: 1,
          duration: isDesktop ? 0.9 : 0.75,
          ease: 'power2.out',
        },
        duration * 0.45
      );
    }

    // 4. Vehicle 1 Text: Fade in and slide into position
    tl.to(initModels, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, duration * 0.35);
    tl.to(initBrands, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, duration * 0.42);
    tl.to(initLines, { opacity: 1, scaleY: 1, duration: 0.65, ease: 'power2.out' }, duration * 0.5);
    tl.to(initWords, { opacity: 1, x: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' }, duration * 0.52);

    // 5. Stage 12: Price, Rating & Buttons Entrance
    tl.to(initPrices, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, duration * 0.45);
    tl.to(initRatingFrames, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, duration * 0.48);
    tl.to(initButtonLayers, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, duration * 0.52);

    return () => {
      tl.kill();
    };
  }, [getTravelDistance, onVehicleChange]);

  // ========================================================
  // SLIDER TRANSITION: GO TO TARGET VEHICLE (INDEX 0..6)
  // Coordinated directional transition using GSAP & wheel rotation
  // ========================================================
  const goToIndex = useCallback(
    (targetIdx: number) => {
      if (isAnimatingRef.current) return;
      if (targetIdx === activeIndex) return;
      if (targetIdx < 0 || targetIdx >= FLEET_VEHICLES.length) return;

      const currIdx = activeIndex;
      const isForward = targetIdx > currIdx;

      isAnimatingRef.current = true;

      const travelDist = getTravelDistance();
      const isDesktop = window.innerWidth >= 768;
      const duration = isDesktop ? 1.4 : 1.2;

      // Direction vectors:
      // Forward (target > current): Current exits LEFT (-travelDist), Target enters RIGHT (+travelDist -> 0), Wheels rotate counter-clockwise (-720)
      // Reverse (target < current): Current exits RIGHT (+travelDist), Target enters LEFT (-travelDist -> 0), Wheels rotate clockwise (+720)
      const currentExitX = isForward ? -travelDist : travelDist;
      const targetStartX = isForward ? travelDist : -travelDist;
      const rotationDelta = isForward ? -720 : 720;

      const currCarEls = [
        document.getElementById(`fleet-car-desktop-${currIdx}`),
        document.getElementById(`fleet-car-mobile-${currIdx}`),
      ].filter(Boolean);

      const targetCarEls = [
        document.getElementById(`fleet-car-desktop-${targetIdx}`),
        document.getElementById(`fleet-car-mobile-${targetIdx}`),
      ].filter(Boolean);

      // Text elements
      const currTextEls = [
        document.getElementById(`fleet-text-desktop-${currIdx}`),
        document.getElementById(`fleet-text-mobile-${currIdx}`),
      ].filter(Boolean);

      const targetTextEls = [
        document.getElementById(`fleet-text-desktop-${targetIdx}`),
        document.getElementById(`fleet-text-mobile-${targetIdx}`),
      ].filter(Boolean);

      const currBrands = currTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="brand"]')));
      const currModels = currTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="model"]')));
      const currLines = currTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descLine"]')));
      const currWords = currTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descWord"], [data-text="desc"]')));

      const targetBrands = targetTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="brand"]')));
      const targetModels = targetTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="model"]')));
      const targetLines = targetTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descLine"]')));
      const targetWords = targetTextEls.flatMap((el) => Array.from(el!.querySelectorAll('[data-text="descWord"], [data-text="desc"]')));

      // Directional vectors for text:
      // Forward: outgoing exits LEFT (-x), incoming enters from RIGHT (+x)
      // Reverse: outgoing exits RIGHT (+x), incoming enters from LEFT (-x)
      const textExitX = isForward ? -60 : 60;
      const textStartX = isForward ? 60 : -60;

      // Stage 12: Price elements
      const currPriceEls = [
        document.getElementById(`fleet-price-desktop-${currIdx}`),
        document.getElementById(`fleet-price-mobile-${currIdx}`),
      ].filter(Boolean);

      const targetPriceEls = [
        document.getElementById(`fleet-price-desktop-${targetIdx}`),
        document.getElementById(`fleet-price-mobile-${targetIdx}`),
      ].filter(Boolean);

      const priceExitX = isForward ? -40 : 40;
      const priceStartX = isForward ? 40 : -40;

      // Prepare target vehicle
      gsap.set(targetCarEls, { x: targetStartX, display: 'block', opacity: 1 });

      // Prepare target text
      gsap.set(targetTextEls, { display: 'block' });
      gsap.set(targetBrands, { x: textStartX, opacity: 0 });
      gsap.set(targetModels, { x: textStartX * 1.3, opacity: 0 });
      gsap.set(targetLines, { x: isForward ? 30 : -30, opacity: 0, scaleY: 0 });
      gsap.set(targetWords, { x: textStartX * 0.5, opacity: 0 });

      // Prepare target price
      gsap.set(targetPriceEls, { display: 'flex', x: priceStartX, opacity: 0 });

      const currWheels = currCarEls.flatMap((el) =>
        Array.from(el!.querySelectorAll('[data-wheel]'))
      );
      const targetWheels = targetCarEls.flatMap((el) =>
        Array.from(el!.querySelectorAll('[data-wheel]'))
      );

      gsap.set(currWheels, { rotation: 0 });
      gsap.set(targetWheels, { rotation: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Hide outgoing vehicle, text & price
          gsap.set(currCarEls, { display: 'none' });
          gsap.set(currTextEls, { display: 'none' });
          gsap.set(currPriceEls, { display: 'none' });
          gsap.set(targetWheels, { rotation: 0 });
          gsap.set([...targetBrands, ...targetModels, ...targetLines, ...targetWords], { x: 0, y: 0, opacity: 1 });
          gsap.set(targetPriceEls, { x: 0, opacity: 1 });
          setActiveIndex(targetIdx);
          isAnimatingRef.current = false;

          if (onVehicleChange) {
            onVehicleChange(FLEET_VEHICLES[targetIdx], targetIdx);
          }
        },
      });

      // Outgoing vehicle exit
      tl.to(
        currCarEls,
        {
          x: currentExitX,
          duration,
          ease: 'power2.inOut',
        },
        0
      );

      // Outgoing wheels rotate
      tl.to(
        currWheels,
        {
          rotation: rotationDelta,
          duration,
          ease: 'power2.inOut',
        },
        0
      );

      // Outgoing text exit (fade out + directional slide)
      tl.to(currBrands, { x: textExitX, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0);
      tl.to(currModels, { x: textExitX * 1.3, opacity: 0, duration: 0.42, ease: 'power2.in' }, 0.02);
      tl.to(currLines, { x: isForward ? -30 : 30, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.04);
      tl.to(currWords, { x: textExitX * 0.5, opacity: 0, duration: 0.38, ease: 'power2.in' }, 0.04);

      // Outgoing price exit
      tl.to(currPriceEls, { x: priceExitX, opacity: 0, duration: 0.38, ease: 'power2.in' }, 0);

      // Synchronize active vehicle index at transition midpoint so rating, progress & buttons transition
      tl.add(() => {
        setActiveIndex(targetIdx);
      }, duration * 0.45);

      // Incoming vehicle entrance to final parked position (x: 0)
      tl.to(
        targetCarEls,
        {
          x: 0,
          duration,
          ease: 'power2.inOut',
        },
        0
      );

      // Incoming wheels rotate and stop when car stops
      tl.to(
        targetWheels,
        {
          rotation: rotationDelta,
          duration,
          ease: 'power2.inOut',
        },
        0
      );

      // Incoming text entrance (fade in + directional slide into resting position x: 0, opacity: 1)
      tl.to(targetModels, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.45);
      tl.to(targetBrands, { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.52);
      tl.to(targetLines, { x: 0, opacity: 1, scaleY: 1, duration: 0.55, ease: 'power2.out' }, 0.58);
      tl.to(targetWords, { x: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.out' }, 0.6);

      // Incoming price entrance
      tl.to(targetPriceEls, { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.45);
    },
    [activeIndex, getTravelDistance, onVehicleChange]
  );

  // Left Chevron button: GO TO NEXT VEHICLE (forward)
  const handleLeftClick = () => {
    goToIndex(activeIndex + 1);
  };

  // Right Chevron button: GO TO PREVIOUS VEHICLE (reverse)
  const handleRightClick = () => {
    goToIndex(activeIndex - 1);
  };

  // Button disabled states per specifications:
  // Vehicle 1 (index 0): Left ENABLED, Right DISABLED
  // Vehicle 2-6 (indexes 1-5): Left ENABLED, Right ENABLED
  // Vehicle 7 (index 6): Left DISABLED, Right ENABLED
  const isLeftDisabled = activeIndex >= FLEET_VEHICLES.length - 1;
  const isRightDisabled = activeIndex <= 0;

  return (
    <div
      className={styles.sliderContainer}
      id="autovyne-fleet-slider"
      data-active-index={activeIndex}
      data-active-model={activeVehicle.model}
      aria-label="Our Fleet Car Slider"
    >
      {/* ========================================================
          VEHICLE NAMES & DESCRIPTIONS LAYER (STAGE 11)
          Layered behind carsViewport (z-index: 2 vs z-index: 5)
          ======================================================== */}
      <div className={styles.textsViewport} id="fleet-texts-viewport">
        {/* DESKTOP TEXTS LAYER (>= 768px) */}
        <div className={styles.desktopTextsLayer} aria-hidden="false">
          {FLEET_TEXT_DATA.map((item, index) => {
            const isInitial = index === 0;
            return (
              <div
                key={`desktop-text-${item.id}`}
                id={`fleet-text-desktop-${index}`}
                className={styles.desktopVehicleText}
                style={{ display: isInitial ? 'block' : 'none' }}
              >
                {/* 1. MODEL NAME (Large background typography in #5F605F) */}
                <div
                  className={styles.desktopModel}
                  data-text="model"
                  style={{
                    left: `${item.desktop.model.left}px`,
                    top: `${item.desktop.model.top}px`,
                    width: `${item.desktop.model.width}px`,
                    height: `${item.desktop.model.height}px`,
                    fontSize: `${item.desktop.model.fontSize}px`,
                    lineHeight: `${item.desktop.model.lineHeight}px`,
                  }}
                >
                  {item.modelText}
                </div>

                {/* 2. BRAND NAME (#CACACA) */}
                <div
                  className={styles.desktopBrand}
                  data-text="brand"
                  style={{
                    left: `${item.desktop.brand.left}px`,
                    top: `${item.desktop.brand.top}px`,
                    width: `${item.desktop.brand.width}px`,
                    height: `${item.desktop.brand.height}px`,
                    fontSize: `${item.desktop.brand.fontSize}px`,
                    lineHeight: `${item.desktop.brand.lineHeight}px`,
                  }}
                >
                  {item.brandText}
                </div>

                {/* 3. DESCRIPTION GROUP (Line + Stacked Words in #979897) */}
                <div className={styles.desktopDescGroup} data-text="descGroup">
                  <div
                    className={styles.desktopDescLine}
                    data-text="descLine"
                    style={{
                      left: `${item.desktop.line.left}px`,
                      top: `${item.desktop.line.top}px`,
                      width: `${item.desktop.line.width}px`,
                      height: `${item.desktop.line.height}px`,
                    }}
                  />
                  <div
                    className={styles.desktopDescWords}
                    data-text="descWords"
                    style={{
                      left: `${item.desktop.descContainer.left}px`,
                      top: `${item.desktop.descContainer.top}px`,
                      width: `${item.desktop.descContainer.width}px`,
                      height: `${item.desktop.descContainer.height}px`,
                    }}
                  >
                    {item.desktop.words.map((word, wIdx) => (
                      <span key={wIdx} className={styles.desktopDescWord} data-text="descWord">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE TEXTS LAYER (< 768px) */}
        <div className={styles.mobileTextsLayer} aria-hidden="true">
          {FLEET_TEXT_DATA.map((item, index) => {
            const isInitial = index === 0;
            return (
              <div
                key={`mobile-text-${item.id}`}
                id={`fleet-text-mobile-${index}`}
                className={styles.mobileVehicleText}
                style={{ display: isInitial ? 'block' : 'none' }}
              >
                {/* 1. MODEL NAME (#5F605F) */}
                <div
                  className={styles.mobileModel}
                  data-text="model"
                  style={{
                    left: `${item.mobile.model.left}px`,
                    top: `${item.mobile.model.top}px`,
                    width: `${item.mobile.model.width}px`,
                    height: `${item.mobile.model.height}px`,
                    fontSize: `${item.mobile.model.fontSize}px`,
                    lineHeight: `${item.mobile.model.lineHeight}px`,
                  }}
                >
                  {item.modelText}
                </div>

                {/* 2. BRAND NAME (#CACACA) */}
                <div
                  className={styles.mobileBrand}
                  data-text="brand"
                  style={{
                    left: `${item.mobile.brand.left}px`,
                    top: `${item.mobile.brand.top}px`,
                    width: `${item.mobile.brand.width}px`,
                    height: `${item.mobile.brand.height}px`,
                    fontSize: `${item.mobile.brand.fontSize}px`,
                    lineHeight: `${item.mobile.brand.lineHeight}px`,
                  }}
                >
                  {item.brandText}
                </div>

                {/* 3. DESCRIPTION (> ...) */}
                <div
                  className={styles.mobileDesc}
                  data-text="desc"
                  style={{
                    left: `${item.mobile.desc.left}px`,
                    top: `${item.mobile.desc.top}px`,
                    width: `${item.mobile.desc.width}px`,
                    height: `${item.mobile.desc.height}px`,
                    fontSize: `${item.mobile.desc.fontSize}px`,
                    lineHeight: `${item.mobile.desc.lineHeight}px`,
                  }}
                >
                  {item.mobile.descText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ========================================================
          CARS VIEWPORT: Contains 7 independently structured vehicles
          ======================================================== */}
      <div className={styles.carsViewport} id="fleet-cars-viewport">
        {/* DESKTOP LAYER (>= 768px) */}
        <div className={styles.desktopLayer} aria-hidden="false">
          {FLEET_VEHICLES.map((vehicle, index) => {
            const isInitialActive = index === 0;
            return (
              <div
                key={`desktop-${vehicle.id}`}
                id={`fleet-car-desktop-${index}`}
                className={styles.desktopVehicle}
                style={{
                  width: `${vehicle.desktop.width}px`,
                  height: `${vehicle.desktop.height}px`,
                  left: `${vehicle.desktop.left}px`,
                  top: `${vehicle.desktop.top}px`,
                  display: isInitialActive ? 'block' : 'none',
                }}
              >
                {/* 1. FRONT WHEEL */}
                <img
                  src="/images/wheel_our_fleet_cars.svg"
                  alt=""
                  data-wheel="front"
                  className={styles.wheelDesktop}
                  style={{
                    left: `${vehicle.desktop.frontWheel.left}px`,
                    top: `${vehicle.desktop.frontWheel.top}px`,
                    width: `${vehicle.desktop.frontWheel.width}px`,
                    height: `${vehicle.desktop.frontWheel.height}px`,
                  }}
                />

                {/* 2. REAR WHEEL */}
                <img
                  src="/images/wheel_our_fleet_cars.svg"
                  alt=""
                  data-wheel="rear"
                  className={styles.wheelDesktop}
                  style={{
                    left: `${vehicle.desktop.rearWheel.left}px`,
                    top: `${vehicle.desktop.rearWheel.top}px`,
                    width: `${vehicle.desktop.rearWheel.width}px`,
                    height: `${vehicle.desktop.rearWheel.height}px`,
                  }}
                />

                {/* 3. CAR BODY (Layered on top of wheels, with wheel arches cut out) */}
                <img
                  src={vehicle.bodySrc}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className={styles.carBodyDesktop}
                  width={vehicle.desktop.width}
                  height={vehicle.desktop.height}
                />
              </div>
            );
          })}
        </div>

        {/* MOBILE LAYER (< 768px) */}
        <div className={styles.mobileLayer} aria-hidden="true">
          {FLEET_VEHICLES.map((vehicle, index) => {
            const isInitialActive = index === 0;
            return (
              <div
                key={`mobile-${vehicle.id}`}
                id={`fleet-car-mobile-${index}`}
                className={styles.mobileVehicle}
                style={{
                  width: `${vehicle.mobile.width}px`,
                  height: `${vehicle.mobile.height}px`,
                  left: `${vehicle.mobile.left}px`,
                  top: `${vehicle.mobile.top}px`,
                  display: isInitialActive ? 'block' : 'none',
                }}
              >
                {/* 1. FRONT WHEEL */}
                <img
                  src="/images/wheel_our_fleet_cars.svg"
                  alt=""
                  data-wheel="front"
                  className={styles.wheelMobile}
                  style={{
                    left: `${vehicle.mobile.frontWheel.left}px`,
                    top: `${vehicle.mobile.frontWheel.top}px`,
                    width: `${vehicle.mobile.frontWheel.width}px`,
                    height: `${vehicle.mobile.frontWheel.height}px`,
                  }}
                />

                {/* 2. REAR WHEEL */}
                <img
                  src="/images/wheel_our_fleet_cars.svg"
                  alt=""
                  data-wheel="rear"
                  className={styles.wheelMobile}
                  style={{
                    left: `${vehicle.mobile.rearWheel.left}px`,
                    top: `${vehicle.mobile.rearWheel.top}px`,
                    width: `${vehicle.mobile.rearWheel.width}px`,
                    height: `${vehicle.mobile.rearWheel.height}px`,
                  }}
                />

                {/* 3. CAR BODY */}
                <img
                  src={vehicle.bodySrc}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className={styles.carBodyMobile}
                  width={vehicle.mobile.width}
                  height={vehicle.mobile.height}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          LEFT CHEVRON BUTTON (GO TO NEXT VEHICLE)
          Desktop: 72x72 at x: 36px, y: 389px
          Mobile: 26x26 at x: 15px, y: 449px
          Initial State: ENABLED
          ======================================================== */}
      <button
        type="button"
        id="fleet-slider-btn-left"
        onClick={handleLeftClick}
        disabled={isLeftDisabled}
        aria-label="Next vehicle"
        aria-disabled={isLeftDisabled}
        tabIndex={isLeftDisabled ? -1 : 0}
        className={`${styles.sliderBtn} ${styles.btnLeft} ${
          isLeftDisabled ? styles.btnDisabled : ''
        }`}
      >
        <img
          src="/icons/Chevron Left.svg"
          alt=""
          className={styles.chevronIcon}
          width={35}
          height={35}
        />
      </button>

      {/* ========================================================
          RIGHT CHEVRON BUTTON (GO TO PREVIOUS VEHICLE)
          Desktop: 72x72 at x: 1302px (right: 66px), y: 389px
          Mobile: 26x26 at x: 351px (right: 13px), y: 449px
          Initial State: DISABLED
          ======================================================== */}
      <button
        type="button"
        id="fleet-slider-btn-right"
        onClick={handleRightClick}
        disabled={isRightDisabled}
        aria-label="Previous vehicle"
        aria-disabled={isRightDisabled}
        tabIndex={isRightDisabled ? -1 : 0}
        className={`${styles.sliderBtn} ${styles.btnRight} ${
          isRightDisabled ? styles.btnDisabled : ''
        }`}
      >
        <img
          src="/icons/Chevron Right.svg"
          alt=""
          className={styles.chevronIcon}
          width={35}
          height={35}
        />
      </button>

      {/* ========================================================
          CAR SLIDER INDICATORS (7 Rounded Rectangles)
          Desktop (Figma 158:228): x: 671px, y: 667px, width: 193px, height: 3px (gap: 10px, 19x3px each)
          Mobile (Figma 187:71): x: 161px, y: 540px, width: 67px, height: 1px (gap: 3px, 7x1px each)
          Active color: #CACACA | Inactive color: #5F605F
          ======================================================== */}
      <div
        ref={indicatorsRef}
        className={styles.indicatorsGroup}
        id="fleet-slider-indicators"
        data-node="car_slider_indicators"
        role="tablist"
        aria-label="Vehicle selection"
      >
        {FLEET_VEHICLES.map((vehicle, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`indicator-${vehicle.id}`}
              type="button"
              id={`fleet-slider-indicator-${index}`}
              role="tab"
              aria-selected={isActive}
              aria-label={`Show vehicle ${index + 1}`}
              className={`${styles.indicatorItem} ${
                isActive ? styles.indicatorActive : ''
              }`}
              onClick={() => goToIndex(index)}
              tabIndex={0}
            />
          );
        })}
      </div>

      {/* ========================================================
          STAGE 12: PRICE LAYOUT
          Desktop (Figma 160:238): left 137px, top 673px, 241x131px
          Mobile (Figma 188:79): centered, top 571px, 183x96px
          ======================================================== */}
      {/* DESKTOP PRICE LAYER */}
      <div className={styles.desktopPriceLayer} id="fleet-prices-desktop">
        {FLEET_VEHICLE_DATA.map((item, index) => {
          const isInitial = index === 0;
          return (
            <div
              key={`desktop-price-${item.id}`}
              id={`fleet-price-desktop-${index}`}
              className={styles.desktopPriceItem}
              style={{ display: isInitial ? 'flex' : 'none' }}
            >
              <span className={styles.priceSymbol}>$</span>
              <span className={styles.priceNum}>{item.price}</span>
              <span className={styles.priceUnit}>/day</span>
            </div>
          );
        })}
      </div>

      {/* MOBILE PRICE LAYER */}
      <div className={styles.mobilePriceLayer} id="fleet-prices-mobile">
        {FLEET_VEHICLE_DATA.map((item, index) => {
          const isInitial = index === 0;
          return (
            <div
              key={`mobile-price-${item.id}`}
              id={`fleet-price-mobile-${index}`}
              className={styles.mobilePriceItem}
              style={{ display: isInitial ? 'flex' : 'none' }}
            >
              <span className={styles.priceSymbol}>$</span>
              <span className={styles.priceNum}>{item.price}</span>
              <span className={styles.priceUnit}>/day</span>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          STAGE 12: RATING LAYOUT
          Desktop (Figma 169:357): left 628px, top 704px, 327x118px
          Mobile (Figma 188:86): left 20px, top 210px, 241x99px glass card
          ======================================================== */}
      {/* DESKTOP RATING FRAME */}
      <div className={styles.desktopRatingFrame} id="fleet-rating-desktop" aria-label="Vehicle ratings">
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
              id="desktop-gauge-ring"
              cx="44"
              cy="44"
              r="37"
              fill="none"
              stroke="#003507"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={232.48}
              strokeDashoffset={232.48 * (1 - activeData.rating / 5)}
              transform="rotate(-90 44 44)"
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
            />
          </svg>
          <div className={styles.desktopRatingValue} id="desktop-rating-value">
            {activeData.rating.toFixed(1)}
          </div>
          <div className={styles.desktopOverallRatingLabel}>Overall Rating</div>
        </div>

        {/* Right: Category Rows with 5 Stars Each */}
        <div className={styles.categoriesContainerDesktop}>
          {renderStarCategory(activeData.performance, 'Performance', false)}
          {renderStarCategory(activeData.comfort, 'Comfort', false)}
          {renderStarCategory(activeData.design, 'Design', false)}
        </div>
      </div>

      {/* MOBILE RATING FRAME */}
      <div className={styles.mobileRatingFrame} id="fleet-rating-mobile" aria-label="Vehicle ratings">
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
              id="mobile-gauge-ring"
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="#003507"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 * (1 - activeData.rating / 5)}
              transform="rotate(-90 30 30)"
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }}
            />
          </svg>
          <div className={styles.mobileRatingValue} id="mobile-rating-value">
            {activeData.rating.toFixed(1)}
          </div>
          <div className={styles.mobileOverallRatingLabel}>Overall Rating</div>
        </div>

        {/* Right: Category Rows with 5 Stars Each */}
        <div className={styles.categoriesContainerMobile}>
          {renderStarCategory(activeData.performance, 'Performance', true)}
          {renderStarCategory(activeData.comfort, 'Comfort', true)}
          {renderStarCategory(activeData.design, 'Design', true)}
        </div>
      </div>

      {/* ========================================================
          STAGE 12: SPECIFICATIONS & ADD TO CART BUTTONS
          Desktop: 1156px / 1154px, top 691px / 758px
          Mobile: centered, top 686px / 736px
          ======================================================== */}
      {/* DESKTOP BUTTONS */}
      <div className={styles.desktopButtonsLayer} id="fleet-buttons-desktop" aria-hidden="false">
        <button
          type="button"
          id="fleet-specs-btn-desktop"
          className={styles.specsBtnDesktop}
          onClick={handleSpecsClick}
          aria-label="View specifications for active vehicle"
        >
          Specifications
        </button>
        <button
          type="button"
          id="fleet-cart-btn-desktop"
          className={`${styles.cartBtnDesktop} ${isCurrentInCart ? styles.cartBtnAdded : ''}`}
          onClick={handleCartToggle}
          aria-label={isCurrentInCart ? 'Remove from cart' : 'Add to cart'}
        >
          {isCurrentInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>

      {/* MOBILE BUTTONS */}
      <div className={styles.mobileButtonsLayer} id="fleet-buttons-mobile" aria-hidden="true">
        <button
          type="button"
          id="fleet-specs-btn-mobile"
          className={styles.specsBtnMobile}
          onClick={handleSpecsClick}
          aria-label="View specifications for active vehicle"
        >
          Specifications
        </button>
        <button
          type="button"
          id="fleet-cart-btn-mobile"
          className={`${styles.cartBtnMobile} ${isCurrentInCart ? styles.cartBtnAdded : ''}`}
          onClick={handleCartToggle}
          aria-label={isCurrentInCart ? 'Remove from cart' : 'Add to cart'}
        >
          {isCurrentInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
