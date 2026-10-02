'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';
import {
  FLEET_VEHICLES,
  FLEET_VEHICLE_DATA,
  FLEET_TEXT_DATA,
} from '@/components/FleetCarSlider';
import { VEHICLE_SPECIFICATIONS } from '@/data/vehicleSpecs';
import styles from './CartItemsLayout.module.css';

const LOCATIONS = [
  'New York',
  'Jersey City',
  'Hoboken',
  'Newark',
  'Yonkers',
  'White Plains',
  'New Rochelle',
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function formatTitleCase(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => {
      const upper = word.toUpperCase();
      if (['BMW', 'AMG', 'GT', 'RS'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function parseDisplayDate(dStr: string): Date | null {
  if (!dStr) return null;
  if (dStr.toLowerCase() === 'dd/mm/yyyy') return null;
  const parts = dStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
}

function isValidDisplayDate(dStr: string | null | undefined): boolean {
  if (!dStr) return false;
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dStr)) return false;
  const d = parseDisplayDate(dStr);
  return d !== null && !isNaN(d.getTime());
}

function formatDisplayDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function isBeforeDay(d1: Date, d2: Date): boolean {
  const d1Zero = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const d2Zero = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return d1Zero < d2Zero;
}

const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  AUTOVYNE10: { percent: 10, label: '10% OFF' },
  VIP: { percent: 15, label: '15% VIP OFF' },
  SAVE10: { percent: 10, label: '10% OFF' },
};

export default function CartItemsLayout() {
  const { cartVehicleIds, removeFromCart, clearCart, setIsCheckoutSuccess } = useCart();

  // Active item index within cartVehicleIds (single source of truth)
  const [activeCartIndex, setActiveCartIndex] = useState<number>(0);
  const [displayedVehicleIndex, setDisplayedVehicleIndex] = useState<number>(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Promo Code & Checkout States
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Shared booking state (Default location New York, empty dates)
  const [bookingData, setBookingData] = useState<{
    location: string;
    pickupDate: string;
    dropoffDate: string;
  }>({
    location: 'New York',
    pickupDate: '',
    dropoffDate: '',
  });

  // Active popup: 'pickup' | 'dropoff' | 'location' | null
  const [activePopup, setActivePopup] = useState<'pickup' | 'dropoff' | 'location' | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Desktop Refs
  const boxDesktopRef = useRef<HTMLDivElement>(null);
  const viewportDesktopRef = useRef<HTMLDivElement>(null);
  const currentSlideDesktopRef = useRef<HTMLDivElement>(null);
  const incomingSlideDesktopRef = useRef<HTMLDivElement>(null);
  const removeBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const leftBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const rightBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const carTitleDesktopRef = useRef<HTMLDivElement>(null);
  const carPriceDesktopRef = useRef<HTMLDivElement>(null);
  const carDescDesktopRef = useRef<HTMLDivElement>(null);
  const detailsBoxDesktopRef = useRef<HTMLDivElement>(null);
  const pickupDesktopRef = useRef<HTMLDivElement>(null);
  const divider1DesktopRef = useRef<HTMLDivElement>(null);
  const dropoffDesktopRef = useRef<HTMLDivElement>(null);
  const divider2DesktopRef = useRef<HTMLDivElement>(null);
  const locationDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs
  const viewportMobileRef = useRef<HTMLDivElement>(null);
  const currentSlideMobileRef = useRef<HTMLDivElement>(null);
  const incomingSlideMobileRef = useRef<HTMLDivElement>(null);
  const removeBtnMobileRef = useRef<HTMLButtonElement>(null);
  const leftBtnMobileRef = useRef<HTMLButtonElement>(null);
  const rightBtnMobileRef = useRef<HTMLButtonElement>(null);
  const carTitleMobileRef = useRef<HTMLDivElement>(null);
  const carPriceMobileRef = useRef<HTMLDivElement>(null);
  const carDescMobileRef = useRef<HTMLDivElement>(null);
  const detailsRowMobileRef = useRef<HTMLDivElement>(null);

  // Distinct Popup Refs for Desktop and Mobile
  const popupDesktopRef = useRef<HTMLDivElement>(null);
  const popupMobileRef = useRef<HTMLDivElement>(null);

  // Main Specifications & Amenities Refs - Desktop
  const mainSpecsBoxDesktopRef = useRef<HTMLDivElement>(null);
  const engineDesktopRef = useRef<HTMLDivElement>(null);
  const fuelDesktopRef = useRef<HTMLDivElement>(null);
  const transmissionDesktopRef = useRef<HTMLDivElement>(null);
  const specDivider1DesktopRef = useRef<HTMLDivElement>(null);
  const specDivider2DesktopRef = useRef<HTMLDivElement>(null);
  const amenitiesContainerDesktopRef = useRef<HTMLDivElement>(null);
  const amenityDesktopRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Main Specifications & Amenities Refs - Mobile
  const mainSpecsBoxMobileRef = useRef<HTMLDivElement>(null);
  const engineMobileRef = useRef<HTMLDivElement>(null);
  const fuelMobileRef = useRef<HTMLDivElement>(null);
  const transmissionMobileRef = useRef<HTMLDivElement>(null);
  const specDivider1MobileRef = useRef<HTMLDivElement>(null);
  const specDivider2MobileRef = useRef<HTMLDivElement>(null);
  const amenitiesContainerMobileRef = useRef<HTMLDivElement>(null);
  const amenityMobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Order Summary Refs - Desktop
  const orderSummaryBoxDesktopRef = useRef<HTMLDivElement>(null);
  const orderHeadingDesktopRef = useRef<HTMLHeadingElement>(null);
  const rentalRowDesktopRef = useRef<HTMLDivElement>(null);
  const divider1OrderDesktopRef = useRef<HTMLDivElement>(null);
  const serviceFeeDesktopRef = useRef<HTMLDivElement>(null);
  const divider2OrderDesktopRef = useRef<HTMLDivElement>(null);
  const insuranceDesktopRef = useRef<HTMLDivElement>(null);
  const divider3OrderDesktopRef = useRef<HTMLDivElement>(null);
  const taxesDesktopRef = useRef<HTMLDivElement>(null);
  const divider4OrderDesktopRef = useRef<HTMLDivElement>(null);
  const totalRowDesktopRef = useRef<HTMLDivElement>(null);
  const checkoutBtnDesktopRef = useRef<HTMLButtonElement>(null);
  const promoGroupDesktopRef = useRef<HTMLDivElement>(null);
  const securityDividerDesktopRef = useRef<HTMLDivElement>(null);
  const securityGroupDesktopRef = useRef<HTMLDivElement>(null);

  // Order Summary Refs - Mobile
  const orderSummaryBoxMobileRef = useRef<HTMLDivElement>(null);
  const orderHeadingMobileRef = useRef<HTMLHeadingElement>(null);
  const rentalRowMobileRef = useRef<HTMLDivElement>(null);
  const divider1OrderMobileRef = useRef<HTMLDivElement>(null);
  const serviceFeeMobileRef = useRef<HTMLDivElement>(null);
  const divider2OrderMobileRef = useRef<HTMLDivElement>(null);
  const insuranceMobileRef = useRef<HTMLDivElement>(null);
  const divider3OrderMobileRef = useRef<HTMLDivElement>(null);
  const taxesMobileRef = useRef<HTMLDivElement>(null);
  const divider4OrderMobileRef = useRef<HTMLDivElement>(null);
  const totalRowMobileRef = useRef<HTMLDivElement>(null);
  const checkoutBtnMobileRef = useRef<HTMLButtonElement>(null);
  const promoGroupMobileRef = useRef<HTMLDivElement>(null);
  const securityDividerMobileRef = useRef<HTMLDivElement>(null);
  const securityGroupMobileRef = useRef<HTMLDivElement>(null);

  // Load shared booking data on mount (strictly session-scoped, no stale localStorage fallback)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('autovyne_booking_data');
        localStorage.removeItem('autovyne_rental_search');
      }
      const raw = sessionStorage.getItem('autovyne_booking_data');
      if (raw) {
        const parsed = JSON.parse(raw);
        const loadedBooking = {
          location: parsed.location && parsed.location !== 'Select Location' ? parsed.location : 'New York',
          pickupDate: isValidDisplayDate(parsed.pickupDate) ? parsed.pickupDate : '',
          dropoffDate: isValidDisplayDate(parsed.dropoffDate) ? parsed.dropoffDate : '',
        };
        setBookingData(loadedBooking);
        if (loadedBooking.pickupDate) {
          const d = parseDisplayDate(loadedBooking.pickupDate);
          if (d) {
            setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
          }
        }
      } else {
        setBookingData({
          location: 'New York',
          pickupDate: '',
          dropoffDate: '',
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideDesktop = popupDesktopRef.current && popupDesktopRef.current.contains(target);
      const isInsideMobile = popupMobileRef.current && popupMobileRef.current.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        const targetEl = event.target as HTMLElement;
        if (
          targetEl.closest?.(`.${styles.editBtnDesktop}`) ||
          targetEl.closest?.(`.${styles.dropdownBtnDesktop}`) ||
          targetEl.closest?.(`.${styles.detailColMobile}`)
        ) {
          return;
        }
        setActivePopup(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePopup(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePopup]);

  // Clamp activeCartIndex safely whenever cart count changes
  useEffect(() => {
    if (cartVehicleIds.length === 0) return;
    if (activeCartIndex >= cartVehicleIds.length) {
      const nextIdx = Math.max(0, cartVehicleIds.length - 1);
      setActiveCartIndex(nextIdx);
      setDisplayedVehicleIndex(nextIdx);
    }
  }, [cartVehicleIds.length, activeCartIndex]);

  // Derived button disabled states
  const isRightDisabled = activeCartIndex <= 0 || isTransitioning;
  const isLeftDisabled = activeCartIndex >= cartVehicleIds.length - 1 || isTransitioning;

  // Resolve vehicles from data
  const currentVehicleId = cartVehicleIds[displayedVehicleIndex] ?? 1;
  const currentVehicle =
    FLEET_VEHICLES.find((v) => v.id === currentVehicleId) || FLEET_VEHICLES[0];
  const currentPrice =
    FLEET_VEHICLE_DATA.find((p) => p.id === currentVehicle.id)?.price ?? 10;
  const currentText =
    FLEET_TEXT_DATA[currentVehicle.id - 1]?.desktop.words || [
      'POWER',
      'LUXURY',
      'PRESENCE',
      'LIMITS',
    ];
  const currentSpecs =
    VEHICLE_SPECIFICATIONS[currentVehicle.id] || VEHICLE_SPECIFICATIONS[1];

  const incomingVehicleId = incomingIndex !== null ? cartVehicleIds[incomingIndex] : null;
  const incomingVehicle =
    incomingVehicleId !== null
      ? FLEET_VEHICLES.find((v) => v.id === incomingVehicleId) || FLEET_VEHICLES[0]
      : null;

  // Final frame video freeze handlers
  const handleVideoEnded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v) {
      v.pause();
      if (v.duration) {
        v.currentTime = v.duration;
      }
    }
  }, []);

  const handleTimeUpdate = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!v) return;
    if (v.duration && v.currentTime >= v.duration - 0.05 && !v.paused) {
      v.pause();
      v.currentTime = v.duration;
    }
  }, []);

  // Shared booking data updater
  const updateBooking = (
    newData: Partial<{ location: string; pickupDate: string; dropoffDate: string }>
  ) => {
    setBookingData((prev) => {
      const next = { ...prev, ...newData };
      try {
        const toSave = { ...next, timestamp: Date.now() };
        sessionStorage.setItem('autovyne_booking_data', JSON.stringify(toSave));
        sessionStorage.setItem('autovyne_rental_search', JSON.stringify(toSave));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleDateSelect = (d: Date, type: 'pickup' | 'dropoff') => {
    const dateFormatted = formatDisplayDate(d);
    if (type === 'pickup') {
      const currentDropoff = parseDisplayDate(bookingData.dropoffDate);
      let newDropoff = bookingData.dropoffDate;
      if (currentDropoff && isBeforeDay(currentDropoff, d)) {
        newDropoff = '';
      }
      updateBooking({
        pickupDate: dateFormatted,
        dropoffDate: newDropoff,
      });
    } else {
      const currentPickup = parseDisplayDate(bookingData.pickupDate);
      if (currentPickup && isBeforeDay(d, currentPickup)) {
        return; // Validation: dropoff cannot be before pickup
      }
      updateBooking({
        dropoffDate: dateFormatted,
      });
    }
    setActivePopup(null);
  };

  const handleLocationSelect = (loc: string) => {
    updateBooking({ location: loc });
    setActivePopup(null);
  };

  // Pricing calculations across all cart vehicles
  const totalDailyRate = cartVehicleIds.reduce((sum, id) => {
    const vData = FLEET_VEHICLE_DATA.find((p) => p.id === id);
    return sum + (vData?.price ?? 10);
  }, 0);

  // For pricing purposes, treat booking as COMPLETE only when:
  // 1. cart contains at least one item
  // 2. pickupDate is a real selected date (not empty, not DD/MM/YYYY)
  // 3. dropoffDate is a real selected date (not empty, not DD/MM/YYYY)
  // 4. location is a real non-empty location value (default 'New York' is valid)
  const isPickupComplete = isValidDisplayDate(bookingData.pickupDate);
  const isDropoffComplete = isValidDisplayDate(bookingData.dropoffDate);
  const isLocationComplete = Boolean(
    bookingData.location &&
      bookingData.location.trim() !== '' &&
      bookingData.location !== 'Select Location'
  );
  const isBookingComplete =
    cartVehicleIds.length > 0 && isPickupComplete && isDropoffComplete && isLocationComplete;

  const getRentalDays = (): number => {
    if (!isBookingComplete) return 0;
    const pick = parseDisplayDate(bookingData.pickupDate);
    const drop = parseDisplayDate(bookingData.dropoffDate);
    if (!pick || !drop) return 0;
    const diffDays = Math.round((drop.getTime() - pick.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const rentalDays = getRentalDays();
  const rentalCharges = isBookingComplete ? totalDailyRate * rentalDays : 0;
  const serviceFee = isBookingComplete ? 1 : 0;
  const insuranceFee = isBookingComplete ? 3 : 0;
  const taxesAndCharges = isBookingComplete ? 1 : 0;

  const discountAmount =
    isBookingComplete && appliedPromo
      ? Math.round((rentalCharges * appliedPromo.percent) / 100)
      : 0;
  const totalAmount = isBookingComplete
    ? Math.max(0, rentalCharges + serviceFee + insuranceFee + taxesAndCharges - discountAmount)
    : 0;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Enter code');
      setPromoSuccessMsg(null);
      setTimeout(() => {
        setPromoError(null);
      }, 3500);
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, percent: PROMO_CODES[code].percent });
      setPromoError(null);
      setPromoSuccessMsg(`${PROMO_CODES[code].label} Applied`);
    } else {
      setAppliedPromo(null);
      setPromoError('Invalid code');
      setPromoSuccessMsg(null);
      setTimeout(() => {
        setPromoError(null);
      }, 3500);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isBookingComplete) {
      if (!isPickupComplete && !isDropoffComplete) {
        setCheckoutError('Please select Pick-up and Drop-off dates');
      } else if (!isPickupComplete) {
        setCheckoutError('Please select Pick-up date');
      } else if (!isDropoffComplete) {
        setCheckoutError('Please select Drop-off date');
      } else {
        setCheckoutError('Please select a valid location');
      }
      setTimeout(() => {
        setCheckoutError(null);
      }, 4000);
      return;
    }

    setCheckoutError(null);
    setIsCheckoutSuccess(true);
    clearCart();
  };

  // ========================================================
  // 1. ENTRANCE ANIMATION (GSAP matchMedia)
  // ========================================================
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({ delay: 0.15 });

      if (boxDesktopRef.current) {
        tl.fromTo(
          boxDesktopRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.0
        );
      }

      if (viewportDesktopRef.current) {
        tl.fromTo(
          viewportDesktopRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
          0.1
        );
      }

      if (removeBtnDesktopRef.current) {
        tl.fromTo(
          removeBtnDesktopRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.22
        );
      }

      if (leftBtnDesktopRef.current) {
        tl.fromTo(
          leftBtnDesktopRef.current,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          0.3
        );
      }

      if (rightBtnDesktopRef.current) {
        tl.fromTo(
          rightBtnDesktopRef.current,
          { opacity: 0, x: 10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          0.3
        );
      }

      // Staggered entrance for Car Title, Price, Description
      if (carTitleDesktopRef.current) {
        tl.fromTo(
          carTitleDesktopRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.25
        );
      }

      if (carPriceDesktopRef.current) {
        tl.fromTo(
          carPriceDesktopRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.28
        );
      }

      if (carDescDesktopRef.current) {
        tl.fromTo(
          carDescDesktopRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.32
        );
      }

      // Rental Details & Dividers
      if (pickupDesktopRef.current) {
        tl.fromTo(
          pickupDesktopRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          0.36
        );
      }

      if (divider1DesktopRef.current) {
        tl.fromTo(
          divider1DesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.35, ease: 'power2.out' },
          0.4
        );
      }

      if (dropoffDesktopRef.current) {
        tl.fromTo(
          dropoffDesktopRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          0.44
        );
      }

      if (divider2DesktopRef.current) {
        tl.fromTo(
          divider2DesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.35, ease: 'power2.out' },
          0.48
        );
      }

      if (locationDesktopRef.current) {
        tl.fromTo(
          locationDesktopRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          0.52
        );
      }

      // Main Specifications Glass-morphism Box & Contents Entrance (Desktop)
      if (mainSpecsBoxDesktopRef.current) {
        tl.fromTo(
          mainSpecsBoxDesktopRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.38
        );
      }

      if (engineDesktopRef.current) {
        tl.fromTo(
          engineDesktopRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.44
        );
      }

      if (specDivider1DesktopRef.current) {
        tl.fromTo(
          specDivider1DesktopRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' },
          0.47
        );
      }

      if (fuelDesktopRef.current) {
        tl.fromTo(
          fuelDesktopRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.50
        );
      }

      if (specDivider2DesktopRef.current) {
        tl.fromTo(
          specDivider2DesktopRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' },
          0.53
        );
      }

      if (transmissionDesktopRef.current) {
        tl.fromTo(
          transmissionDesktopRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.56
        );
      }

      // Five Amenities Entrance (Desktop)
      if (amenitiesContainerDesktopRef.current) {
        tl.fromTo(
          amenitiesContainerDesktopRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.60
        );
      }

      amenityDesktopRefs.current.forEach((el, idx) => {
        if (el) {
          tl.fromTo(
            el,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            0.64 + idx * 0.04
          );
        }
      });

      // Order Summary Box & Inner Elements Entrance (Desktop)
      if (orderSummaryBoxDesktopRef.current) {
        tl.fromTo(
          orderSummaryBoxDesktopRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.45
        );
      }
      if (orderHeadingDesktopRef.current) {
        tl.fromTo(
          orderHeadingDesktopRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.52
        );
      }
      if (rentalRowDesktopRef.current) {
        tl.fromTo(
          rentalRowDesktopRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          0.56
        );
      }
      if (divider1OrderDesktopRef.current) {
        tl.fromTo(
          divider1OrderDesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
          0.60
        );
      }
      if (serviceFeeDesktopRef.current) {
        tl.fromTo(
          serviceFeeDesktopRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          0.63
        );
      }
      if (divider2OrderDesktopRef.current) {
        tl.fromTo(
          divider2OrderDesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
          0.67
        );
      }
      if (insuranceDesktopRef.current) {
        tl.fromTo(
          insuranceDesktopRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          0.70
        );
      }
      if (divider3OrderDesktopRef.current) {
        tl.fromTo(
          divider3OrderDesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
          0.74
        );
      }
      if (taxesDesktopRef.current) {
        tl.fromTo(
          taxesDesktopRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          0.77
        );
      }
      if (divider4OrderDesktopRef.current) {
        tl.fromTo(
          divider4OrderDesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
          0.81
        );
      }
      if (totalRowDesktopRef.current) {
        tl.fromTo(
          totalRowDesktopRef.current,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          0.84
        );
      }
      if (checkoutBtnDesktopRef.current) {
        tl.fromTo(
          checkoutBtnDesktopRef.current,
          { opacity: 0, y: 8, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power2.out' },
          0.88
        );
      }
      if (promoGroupDesktopRef.current) {
        tl.fromTo(
          promoGroupDesktopRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.93
        );
      }
      if (securityDividerDesktopRef.current) {
        tl.fromTo(
          securityDividerDesktopRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
          0.97
        );
      }
      if (securityGroupDesktopRef.current) {
        tl.fromTo(
          securityGroupDesktopRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          1.01
        );
      }
    });

    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (viewportMobileRef.current) {
        tl.fromTo(
          viewportMobileRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
          0.0
        );
      }

      if (removeBtnMobileRef.current) {
        tl.fromTo(
          removeBtnMobileRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.15
        );
      }

      if (leftBtnMobileRef.current) {
        tl.fromTo(
          leftBtnMobileRef.current,
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          0.22
        );
      }

      if (rightBtnMobileRef.current) {
        tl.fromTo(
          rightBtnMobileRef.current,
          { opacity: 0, x: 8 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          0.22
        );
      }

      if (carTitleMobileRef.current) {
        tl.fromTo(
          carTitleMobileRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.18
        );
      }

      if (carPriceMobileRef.current) {
        tl.fromTo(
          carPriceMobileRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.2
        );
      }

      if (carDescMobileRef.current) {
        tl.fromTo(
          carDescMobileRef.current,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.24
        );
      }

      if (detailsRowMobileRef.current) {
        tl.fromTo(
          detailsRowMobileRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.28
        );
      }

      // Main Specifications Glass-morphism Box & Contents Entrance (Mobile)
      if (mainSpecsBoxMobileRef.current) {
        tl.fromTo(
          mainSpecsBoxMobileRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.32
        );
      }

      if (engineMobileRef.current) {
        tl.fromTo(
          engineMobileRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.36
        );
      }

      if (specDivider1MobileRef.current) {
        tl.fromTo(
          specDivider1MobileRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' },
          0.39
        );
      }

      if (fuelMobileRef.current) {
        tl.fromTo(
          fuelMobileRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.42
        );
      }

      if (specDivider2MobileRef.current) {
        tl.fromTo(
          specDivider2MobileRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out' },
          0.45
        );
      }

      if (transmissionMobileRef.current) {
        tl.fromTo(
          transmissionMobileRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          0.48
        );
      }

      // Five Amenities Entrance (Mobile)
      if (amenitiesContainerMobileRef.current) {
        tl.fromTo(
          amenitiesContainerMobileRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.52
        );
      }

      amenityMobileRefs.current.forEach((el, idx) => {
        if (el) {
          tl.fromTo(
            el,
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            0.56 + idx * 0.04
          );
        }
      });

      // Order Summary Box & Inner Elements Entrance (Mobile)
      if (orderSummaryBoxMobileRef.current) {
        tl.fromTo(
          orderSummaryBoxMobileRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.4
        );
      }
      if (orderHeadingMobileRef.current) {
        tl.fromTo(
          orderHeadingMobileRef.current,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.46
        );
      }
      if (rentalRowMobileRef.current) {
        tl.fromTo(
          rentalRowMobileRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          0.5
        );
      }
      if (divider1OrderMobileRef.current) {
        tl.fromTo(
          divider1OrderMobileRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' },
          0.53
        );
      }
      if (serviceFeeMobileRef.current) {
        tl.fromTo(
          serviceFeeMobileRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          0.56
        );
      }
      if (divider2OrderMobileRef.current) {
        tl.fromTo(
          divider2OrderMobileRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' },
          0.59
        );
      }
      if (insuranceMobileRef.current) {
        tl.fromTo(
          insuranceMobileRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          0.62
        );
      }
      if (divider3OrderMobileRef.current) {
        tl.fromTo(
          divider3OrderMobileRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' },
          0.65
        );
      }
      if (taxesMobileRef.current) {
        tl.fromTo(
          taxesMobileRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          0.68
        );
      }
      if (divider4OrderMobileRef.current) {
        tl.fromTo(
          divider4OrderMobileRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' },
          0.71
        );
      }
      if (totalRowMobileRef.current) {
        tl.fromTo(
          totalRowMobileRef.current,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          0.74
        );
      }
      if (checkoutBtnMobileRef.current) {
        tl.fromTo(
          checkoutBtnMobileRef.current,
          { opacity: 0, y: 6, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
          0.78
        );
      }
      if (promoGroupMobileRef.current) {
        tl.fromTo(
          promoGroupMobileRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.82
        );
      }
      if (securityDividerMobileRef.current) {
        tl.fromTo(
          securityDividerMobileRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' },
          0.85
        );
      }
      if (securityGroupMobileRef.current) {
        tl.fromTo(
          securityGroupMobileRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          0.88
        );
      }
    });

    return () => mm.revert();
  }, []);

  // ========================================================
  // 2. SLIDER HORIZONTAL TRANSITION & COORDINATED DATA UPDATE
  // ========================================================
  useEffect(() => {
    if (incomingIndex === null || slideDirection === null) return;

    const targetsCurrent = [
      currentSlideDesktopRef.current,
      currentSlideMobileRef.current,
    ].filter(Boolean);

    const targetsIncoming = [
      incomingSlideDesktopRef.current,
      incomingSlideMobileRef.current,
    ].filter(Boolean);

    const carDetailsElements = [
      carTitleDesktopRef.current,
      carPriceDesktopRef.current,
      carDescDesktopRef.current,
      engineDesktopRef.current,
      fuelDesktopRef.current,
      transmissionDesktopRef.current,
      amenitiesContainerDesktopRef.current,
      carTitleMobileRef.current,
      carPriceMobileRef.current,
      carDescMobileRef.current,
      engineMobileRef.current,
      fuelMobileRef.current,
      transmissionMobileRef.current,
      amenitiesContainerMobileRef.current,
    ].filter(Boolean);

    const isFwd = slideDirection === 'forward';
    const exitX = isFwd ? -100 : 100;
    const enterStartX = isFwd ? 100 : -100;

    gsap.set(targetsIncoming, { xPercent: enterStartX, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveCartIndex(incomingIndex);
        setDisplayedVehicleIndex(incomingIndex);
        setIncomingIndex(null);
        setSlideDirection(null);
        setIsTransitioning(false);
        gsap.set(targetsCurrent, { xPercent: 0, opacity: 1 });
        gsap.set(carDetailsElements, { opacity: 1, y: 0 });
      },
    });

    // Video slide transition
    tl.to(
      targetsCurrent,
      {
        xPercent: exitX,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0
    );

    tl.to(
      targetsIncoming,
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      0
    );

    // Coordinated car details fade/slide
    if (carDetailsElements.length > 0) {
      tl.to(
        carDetailsElements,
        {
          opacity: 0,
          y: isFwd ? -6 : 6,
          duration: 0.2,
          ease: 'power2.in',
        },
        0
      );

      tl.add(() => {
        setDisplayedVehicleIndex(incomingIndex);
      }, 0.21);

      tl.fromTo(
        carDetailsElements,
        { opacity: 0, y: isFwd ? 6 : -6 },
        { opacity: 1, y: 0, duration: 0.23, ease: 'power2.out' },
        0.22
      );
    }

    return () => {
      tl.kill();
    };
  }, [incomingIndex, slideDirection]);

  // ========================================================
  // 2b. SUBTLE CONTINUOUS FLOATING ANIMATION FOR AMENITIES
  // ========================================================
  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    // Desktop amenities continuous float
    amenityDesktopRefs.current.forEach((el, idx) => {
      if (el) {
        const tw = gsap.to(el, {
          y: -2.5,
          duration: 3 + idx * 0.35,
          delay: idx * 0.25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        tweens.push(tw);
      }
    });

    // Mobile amenities continuous float
    amenityMobileRefs.current.forEach((el, idx) => {
      if (el) {
        const tw = gsap.to(el, {
          y: -2,
          duration: 3 + idx * 0.35,
          delay: idx * 0.25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        tweens.push(tw);
      }
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  // ========================================================
  // 3. NAVIGATION HANDLERS
  // ========================================================
  const handleLeftClick = useCallback(() => {
    if (isTransitioning || isLeftDisabled) return;
    const targetIdx = activeCartIndex + 1;
    if (targetIdx >= cartVehicleIds.length) return;

    setIsTransitioning(true);
    setIncomingIndex(targetIdx);
    setSlideDirection('forward');
  }, [isTransitioning, isLeftDisabled, activeCartIndex, cartVehicleIds.length]);

  const handleRightClick = useCallback(() => {
    if (isTransitioning || isRightDisabled) return;
    const targetIdx = activeCartIndex - 1;
    if (targetIdx < 0) return;

    setIsTransitioning(true);
    setIncomingIndex(targetIdx);
    setSlideDirection('backward');
  }, [isTransitioning, isRightDisabled, activeCartIndex]);

  // ========================================================
  // 4. REMOVE HANDLER
  // ========================================================
  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isTransitioning) return;
      const targetVehicleId = cartVehicleIds[activeCartIndex];
      if (targetVehicleId !== undefined) {
        const remainingCount = cartVehicleIds.length - 1;
        removeFromCart(targetVehicleId);
        if (remainingCount <= 0) {
          setIsCheckoutSuccess(false);
          setBookingData({
            location: 'New York',
            pickupDate: '',
            dropoffDate: '',
          });
          try {
            const defaultBooking = {
              location: 'New York',
              pickupDate: '',
              dropoffDate: '',
              timestamp: Date.now(),
            };
            sessionStorage.setItem('autovyne_booking_data', JSON.stringify(defaultBooking));
            sessionStorage.setItem('autovyne_rental_search', JSON.stringify(defaultBooking));
            localStorage.removeItem('autovyne_booking_data');
            localStorage.removeItem('autovyne_rental_search');
          } catch {
            // ignore
          }
        }
      }
    },
    [isTransitioning, cartVehicleIds, activeCartIndex, removeFromCart, setIsCheckoutSuccess]
  );

  // ========================================================
  // 5. CALENDAR DAYS GENERATOR
  // ========================================================
  const renderCalendarDays = (type: 'pickup' | 'dropoff') => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const currentPickup = parseDisplayDate(bookingData.pickupDate);
    const currentDropoff = parseDisplayDate(bookingData.dropoffDate);
    const today = new Date();

    const cells = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push(<div key={`empty-${i}`} className={styles.calendarDayCell} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isPast = isBeforeDay(
        cellDate,
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );
      const isPickup = isSameDay(cellDate, currentPickup);
      const isDropoff = isSameDay(cellDate, currentDropoff);
      const isSelected = type === 'pickup' ? isPickup : isDropoff;

      let isDisabled = isPast;
      if (type === 'dropoff' && currentPickup && isBeforeDay(cellDate, currentPickup)) {
        isDisabled = true;
      }

      let inRange = false;
      if (
        currentPickup &&
        currentDropoff &&
        !isBeforeDay(cellDate, currentPickup) &&
        !isBeforeDay(currentDropoff, cellDate)
      ) {
        inRange = true;
      }

      cells.push(
        <button
          key={`day-${day}`}
          type="button"
          data-day={day}
          disabled={isDisabled}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            handleDateSelect(cellDate, type);
          }}
          className={`${styles.calendarDayCell} ${
            isSelected ? styles.calendarDaySelected : ''
          } ${inRange && !isSelected ? styles.calendarDayInRange : ''} ${
            isDisabled ? styles.dayDisabled : ''
          }`}
          aria-label={`${day} ${MONTH_NAMES[month]} ${year}`}
        >
          {day}
        </button>
      );
    }

    return cells;
  };

  return (
    <section
      className={styles.cartItemsSection}
      id="autovyne-cart-items-section"
      aria-label="Cart Items and Slider"
    >
      {/* ========================================================
          DESKTOP (>= 768px, 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        {/* A. Large Glass-morphism Round-Corner Cart Items Box (Rectangle 33) */}
        <div
          ref={boxDesktopRef}
          className={styles.cartItemsBoxDesktop}
          id="cart-items-box-desktop"
        />

        {/* B. Carted Vehicle Video Slider Viewport */}
        <div
          ref={viewportDesktopRef}
          className={styles.videoViewportDesktop}
          id="cart-video-viewport-desktop"
        >
          <div className={styles.slideTrackDesktop}>
            {/* Current Active Vehicle Slide */}
            <div
              ref={currentSlideDesktopRef}
              className={styles.slideItemDesktop}
              id={`cart-slide-current-${currentVehicle.id}`}
            >
              <video
                key={`cart-video-desktop-${currentVehicle.id}`}
                src={`/videos/${currentVehicle.name}_video.webm`}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
                onTimeUpdate={handleTimeUpdate}
                className={styles.cartVideoDesktop}
              />
            </div>

            {/* Incoming Vehicle Slide */}
            {incomingVehicle && (
              <div
                ref={incomingSlideDesktopRef}
                className={styles.slideItemDesktop}
                id={`cart-slide-incoming-${incomingVehicle.id}`}
              >
                <video
                  key={`cart-video-desktop-incoming-${incomingVehicle.id}`}
                  src={`/videos/${incomingVehicle.name}_video.webm`}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                  className={styles.cartVideoDesktop}
                />
              </div>
            )}
          </div>
        </div>

        {/* C. Remove Button (Desktop) */}
        <button
          ref={removeBtnDesktopRef}
          type="button"
          id="cart-remove-btn-desktop"
          className={styles.removeBtnDesktop}
          onClick={handleRemove}
          aria-label={`Remove ${currentVehicle.brand} ${currentVehicle.model} from cart`}
        >
          <img
            src="/icons/Trash.svg"
            alt=""
            width={12}
            height={12}
            className={styles.trashIconDesktop}
          />
          <span className={styles.removeTextDesktop}>Remove</span>
        </button>

        {/* D. Left Chevron Slider Button (Desktop) -> Next Item */}
        <button
          ref={leftBtnDesktopRef}
          type="button"
          id="cart-slider-btn-left"
          className={`${styles.sliderBtnDesktop} ${styles.btnLeftDesktop} ${
            isLeftDisabled ? styles.btnDisabled : ''
          }`}
          onClick={handleLeftClick}
          disabled={isLeftDisabled}
          aria-label="Next cart vehicle"
          aria-disabled={isLeftDisabled}
          tabIndex={isLeftDisabled ? -1 : 0}
        >
          <img
            src="/icons/Chevron Left.svg"
            alt=""
            width={10}
            height={10}
            className={styles.chevronIconDesktop}
          />
        </button>

        {/* E. Right Chevron Slider Button (Desktop) -> Previous Item */}
        <button
          ref={rightBtnDesktopRef}
          type="button"
          id="cart-slider-btn-right"
          className={`${styles.sliderBtnDesktop} ${styles.btnRightDesktop} ${
            isRightDisabled ? styles.btnDisabled : ''
          }`}
          onClick={handleRightClick}
          disabled={isRightDisabled}
          aria-label="Previous cart vehicle"
          aria-disabled={isRightDisabled}
          tabIndex={isRightDisabled ? -1 : 0}
        >
          <img
            src="/icons/Chevron Right.svg"
            alt=""
            width={10}
            height={10}
            className={styles.chevronIconDesktop}
          />
        </button>

        {/* F. Car Title (Brand + Car Name) (Desktop - Figma node 256:11) */}
        <div
          ref={carTitleDesktopRef}
          className={styles.carTitleDesktop}
          id="cart-car-name-desktop"
        >
          {formatTitleCase(currentVehicle.brand)} {formatTitleCase(currentVehicle.model)}
        </div>

        {/* G. Price Container (Desktop - Figma node 256:12) */}
        <div
          ref={carPriceDesktopRef}
          className={styles.priceContainerDesktop}
          id="cart-car-price-desktop"
        >
          <span className={styles.priceValueDesktop}>${currentPrice}</span>
          <span className={styles.priceUnitDesktop}>/day</span>
        </div>

        {/* H. Car Description (Desktop - Figma node 256:14 Frame 25) */}
        <div
          ref={carDescDesktopRef}
          className={styles.descriptionRowDesktop}
          id="cart-car-desc-desktop"
        >
          <span className={styles.descWordDesktop}>{currentText[0]}</span>
          <span className={styles.descDotDesktop}>•</span>
          <span className={styles.descWordDesktop}>{currentText[1]}</span>
          <span className={styles.descDotDesktop}>•</span>
          <span className={styles.descWordDesktop}>{currentText[2]}</span>
          <span className={styles.descDotDesktop}>•</span>
          <span className={styles.descWordDesktop}>{currentText[3]}</span>
        </div>

        {/* I. Rental Details Box (Desktop - Figma node 260:50 Frame 54) */}
        <div
          ref={detailsBoxDesktopRef}
          className={styles.detailsBoxDesktop}
          id="cart-details-box-desktop"
        >
          {/* Pick-up Date (Group 23) */}
          <div
            ref={pickupDesktopRef}
            className={styles.detailRowDesktop}
            id="cart-pickup-row-desktop"
          >
            <img
              src="/icons/Calendar.svg"
              alt=""
              width={25}
              height={90}
              className={styles.detailIconDesktop}
            />
            <div className={styles.detailTextColDesktop}>
              <span className={styles.detailLabelDesktop}>Pick-up Date</span>
              <div className={styles.detailValueRowDesktop}>
                <span
                  className={`${styles.detailValueDesktop} ${
                    !bookingData.pickupDate ? styles.detailValuePlaceholder : ''
                  }`}
                >
                  {bookingData.pickupDate || 'DD/MM/YYYY'}
                </span>
                <button
                  type="button"
                  id="cart-edit-pickup-desktop"
                  className={styles.editBtnDesktop}
                  onClick={(e) => {
                    e.stopPropagation();
                    const d = parseDisplayDate(bookingData.pickupDate);
                    if (d) {
                      setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                    } else {
                      const today = new Date();
                      setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                    }
                    setActivePopup((prev) => (prev === 'pickup' ? null : 'pickup'));
                  }}
                  aria-label="Edit pick-up date"
                >
                  <span className={styles.editTextDesktop}>Edit</span>
                  <img
                    src="/icons/Pencil.svg"
                    alt=""
                    width={12}
                    height={12}
                    className={styles.pencilIconDesktop}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Divider 1 (Rectangle 34, #454545) */}
          <div
            ref={divider1DesktopRef}
            className={styles.dividerLineDesktop}
            id="cart-divider-1-desktop"
          />

          {/* Drop-off Date (Group 25) */}
          <div
            ref={dropoffDesktopRef}
            className={styles.detailRowDesktop}
            id="cart-dropoff-row-desktop"
          >
            <img
              src="/icons/Calendar.svg"
              alt=""
              width={25}
              height={90}
              className={styles.detailIconDesktop}
            />
            <div className={styles.detailTextColDesktop}>
              <span className={styles.detailLabelDesktop}>Drop-off Date</span>
              <div className={styles.detailValueRowDesktop}>
                <span
                  className={`${styles.detailValueDesktop} ${
                    !bookingData.dropoffDate ? styles.detailValuePlaceholder : ''
                  }`}
                >
                  {bookingData.dropoffDate || 'DD/MM/YYYY'}
                </span>
                <button
                  type="button"
                  id="cart-edit-dropoff-desktop"
                  className={styles.editBtnDesktop}
                  onClick={(e) => {
                    e.stopPropagation();
                    const d =
                      parseDisplayDate(bookingData.dropoffDate) ||
                      parseDisplayDate(bookingData.pickupDate);
                    if (d) {
                      setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                    } else {
                      const today = new Date();
                      setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                    }
                    setActivePopup((prev) => (prev === 'dropoff' ? null : 'dropoff'));
                  }}
                  aria-label="Edit drop-off date"
                >
                  <span className={styles.editTextDesktop}>Edit</span>
                  <img
                    src="/icons/Pencil.svg"
                    alt=""
                    width={12}
                    height={12}
                    className={styles.pencilIconDesktop}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Divider 2 (Rectangle 35, #454545) */}
          <div
            ref={divider2DesktopRef}
            className={styles.dividerLineDesktop}
            id="cart-divider-2-desktop"
          />

          {/* Location (Group 24) */}
          <div
            ref={locationDesktopRef}
            className={styles.detailRowDesktop}
            id="cart-location-row-desktop"
          >
            <img
              src="/icons/Location.svg"
              alt=""
              width={25}
              height={90}
              className={styles.detailIconDesktop}
            />
            <div className={styles.detailTextColDesktop}>
              <span className={styles.detailLabelDesktop}>Location</span>
              <div className={styles.detailValueRowDesktop}>
                <span className={styles.detailValueDesktop}>
                  {bookingData.location || 'New York'}
                </span>
                <button
                  type="button"
                  id="cart-edit-location-desktop"
                  className={styles.dropdownBtnDesktop}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopup((prev) => (prev === 'location' ? null : 'location'));
                  }}
                  aria-label="Edit location"
                >
                  <img
                    src="/icons/Drop Down Arrow.svg"
                    alt=""
                    width={15}
                    height={15}
                    className={`${styles.dropdownArrowDesktop} ${
                      activePopup === 'location' ? styles.dropdownArrowOpen : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Popups (Calendar or Location) */}
          {activePopup && (
            <div
              ref={popupDesktopRef}
              className={styles.popupWrapperDesktop}
              id="cart-popup-desktop"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {activePopup === 'location' ? (
                <div className={styles.locationDropdown}>
                  {LOCATIONS.map((loc) => {
                    const isSelected = Boolean(bookingData.location && loc === bookingData.location);
                    return (
                      <div
                        key={`desktop-loc-${loc}`}
                        className={`${styles.locationOption} ${
                          isSelected ? styles.locationOptionSelected : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLocationSelect(loc);
                        }}
                      >
                        <span>{loc}</span>
                        {isSelected && <span className={styles.locationCheck}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.calendarPopup}>
                  <div className={styles.calendarHeader}>
                    <span className={styles.calendarMonthTitle}>
                      {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                    </span>
                    <div className={styles.calendarNav}>
                      <button
                        type="button"
                        className={styles.calendarNavBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1
                            )
                          );
                        }}
                        aria-label="Previous month"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className={styles.calendarNavBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1
                            )
                          );
                        }}
                        aria-label="Next month"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  <div className={styles.calendarWeekdays}>
                    {WEEKDAYS.map((w) => (
                      <span key={`desk-w-${w}`}>{w}</span>
                    ))}
                  </div>
                  <div className={styles.calendarGrid}>
                    {renderCalendarDays(activePopup as 'pickup' | 'dropoff')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* I. Main Specifications Glass-morphism Box (Desktop - Figma node 256:23 box_8) */}
        <div
          ref={mainSpecsBoxDesktopRef}
          className={styles.mainSpecsBoxDesktop}
          id="cart-main-specs-box-desktop"
        >
          {/* Engine Section (256:26, 256:28, 256:31) */}
          <div
            ref={engineDesktopRef}
            className={styles.specSectionDesktop}
            id="cart-spec-engine-desktop"
          >
            <div className={styles.specHeaderDesktop}>
              <img
                src="/icons/Engine.svg"
                alt=""
                width={20}
                height={20}
                className={styles.specIconDesktop}
              />
              <span className={styles.specLabelDesktop}>Engine</span>
            </div>
            <div className={styles.specValueBlockDesktop}>
              <div className={styles.engineNumericDesktop}>
                {currentSpecs.engine.numeric}
              </div>
              <div className={styles.engineSuffixDesktop}>
                {currentSpecs.engine.suffix}
              </div>
            </div>
          </div>

          {/* Specification Divider 1 (Rectangle 17, 256:25) */}
          <div
            ref={specDivider1DesktopRef}
            className={styles.specDividerDesktop}
            style={{ left: '141px' }}
          />

          {/* Fuel Section (256:27, 256:29, 256:30) */}
          <div
            ref={fuelDesktopRef}
            className={styles.specSectionDesktop}
            id="cart-spec-fuel-desktop"
          >
            <div className={styles.specHeaderDesktop}>
              <img
                src="/icons/Gas Station_yellow.svg"
                alt=""
                width={20}
                height={20}
                className={styles.specIconDesktop}
              />
              <span className={styles.specLabelDesktop}>Fuel</span>
            </div>
            <div className={styles.specValueBlockDesktop}>
              <div className={styles.specValueBoldDesktop}>
                {currentSpecs.fuel}
              </div>
            </div>
          </div>

          {/* Specification Divider 2 (Rectangle 18, 259:32) */}
          <div
            ref={specDivider2DesktopRef}
            className={styles.specDividerDesktop}
            style={{ left: '268px' }}
          />

          {/* Transmission Section (259:35, 259:36, 259:37) */}
          <div
            ref={transmissionDesktopRef}
            className={styles.specSectionDesktop}
            id="cart-spec-transmission-desktop"
          >
            <div className={styles.specHeaderDesktop}>
              <img
                src="/icons/Gears.svg"
                alt=""
                width={20}
                height={20}
                className={styles.specIconDesktop}
              />
              <span className={styles.specLabelDesktop}>Transmission</span>
            </div>
            <div className={styles.specValueBlockDesktop}>
              <div className={styles.specValueBoldDesktop}>
                {currentSpecs.transmission}
              </div>
            </div>
          </div>
        </div>

        {/* J. Five Amenities Row (Desktop - Figma node 260:61 Frame 25) */}
        <div
          ref={amenitiesContainerDesktopRef}
          className={styles.amenitiesContainerDesktop}
          id="cart-amenities-desktop"
        >
          {/* 1. Seats (Group 3, 260:62) */}
          <div
            ref={(el) => {
              amenityDesktopRefs.current[0] = el;
            }}
            className={styles.amenityItemDesktop}
            id="cart-amenity-seats-desktop"
          >
            <img
              src="/icons/Flight Seat.svg"
              alt=""
              width={20}
              height={20}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>
                {currentSpecs.amenities.seats}
              </span>
              <span className={styles.amenityLabelDesktop}>Seats</span>
            </div>
          </div>

          {/* 2. Luggage (Group 4, 260:66) */}
          <div
            ref={(el) => {
              amenityDesktopRefs.current[1] = el;
            }}
            className={styles.amenityItemDesktop}
            id="cart-amenity-luggage-desktop"
          >
            <img
              src="/icons/Carry On Bag.svg"
              alt=""
              width={20}
              height={20}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>
                {currentSpecs.amenities.luggage}
              </span>
              <span className={styles.amenityLabelDesktop}>Luggage</span>
            </div>
          </div>

          {/* 3. Doors (Group 5, 260:70) */}
          <div
            ref={(el) => {
              amenityDesktopRefs.current[2] = el;
            }}
            className={styles.amenityItemDesktop}
            id="cart-amenity-doors-desktop"
          >
            <img
              src="/icons/Car Door.svg"
              alt=""
              width={20}
              height={20}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>
                {currentSpecs.amenities.doors}
              </span>
              <span className={styles.amenityLabelDesktop}>Doors</span>
            </div>
          </div>

          {/* 4. 0–60 MPH (Group 6, 260:75) */}
          <div
            ref={(el) => {
              amenityDesktopRefs.current[3] = el;
            }}
            className={styles.amenityItemDesktop}
            id="cart-amenity-zerotosixty-desktop"
          >
            <img
              src="/icons/Speedometer.svg"
              alt=""
              width={20}
              height={20}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>
                {currentSpecs.amenities.zeroToSixty}
              </span>
              <span className={styles.amenityLabelDesktop}>0–60 MPH</span>
            </div>
          </div>

          {/* 5. Horse Power (Group 7, 260:79) */}
          <div
            ref={(el) => {
              amenityDesktopRefs.current[4] = el;
            }}
            className={styles.amenityItemDesktop}
            id="cart-amenity-horsepower-desktop"
          >
            <img
              src="/icons/Horse.svg"
              alt=""
              width={20}
              height={20}
              className={styles.amenityIconDesktop}
            />
            <div className={styles.amenityTextColDesktop}>
              <span className={styles.amenityValueDesktop}>
                {currentSpecs.amenities.horsePower}
              </span>
              <span className={styles.amenityLabelDesktop}>Horse Power</span>
            </div>
          </div>
        </div>

        {/* K. Order Summary Glass-morphism Box (Desktop - Figma Rectangle 26, 247:1935) */}
        <div
          ref={orderSummaryBoxDesktopRef}
          className={styles.orderSummaryBoxDesktop}
          id="cart-order-summary-box-desktop"
        >
          {/* Heading (247:1940) */}
          <h2
            ref={orderHeadingDesktopRef}
            className={styles.orderHeadingDesktop}
            id="cart-order-heading-desktop"
          >
            ORDER SUMMARY
          </h2>

          {/* Rental Charges Row (250:1979) */}
          <div
            ref={rentalRowDesktopRef}
            className={styles.orderRowDesktop}
            id="cart-rental-charges-row-desktop"
          >
            <div className={styles.rentalLabelColDesktop}>
              <span className={styles.orderLabelDesktop}>Rental Charges</span>
              <span
                className={styles.rentalCalcSubtextDesktop}
                style={{ visibility: isBookingComplete ? 'visible' : 'hidden' }}
              >
                ${totalDailyRate} x {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <span className={styles.orderPriceDesktop}>
              {isBookingComplete ? `$${rentalCharges}` : '-'}
            </span>
          </div>

          {/* Divider 1 (Rectangle 27, 247:1944) */}
          <div
            ref={divider1OrderDesktopRef}
            className={styles.orderDividerDesktop}
            id="cart-order-divider-1-desktop"
          />

          {/* Service Fee Row (Group 21, 250:1982) */}
          <div
            ref={serviceFeeDesktopRef}
            className={styles.orderRowDesktop}
            id="cart-service-fee-row-desktop"
          >
            <div className={styles.orderLabelWithIconDesktop}>
              <span className={styles.orderSubLabelDesktop}>Service Fee</span>
              <img
                src="/icons/Info.svg"
                alt="Information"
                width={16}
                height={15}
                className={styles.infoIconDesktop}
              />
            </div>
            <span className={styles.orderPriceDesktop}>
              {isBookingComplete ? `$${serviceFee}` : '-'}
            </span>
          </div>

          {/* Divider 2 (Rectangle 28, 247:1948) */}
          <div
            ref={divider2OrderDesktopRef}
            className={styles.orderDividerDesktop}
            id="cart-order-divider-2-desktop"
          />

          {/* Insurance (Basic) Row (Group 20, 250:1981) */}
          <div
            ref={insuranceDesktopRef}
            className={styles.orderRowDesktop}
            id="cart-insurance-row-desktop"
          >
            <div className={styles.orderLabelWithIconDesktop}>
              <span className={styles.orderSubLabelDesktop}>Insurance (Basic)</span>
              <img
                src="/icons/Info.svg"
                alt="Information"
                width={16}
                height={15}
                className={styles.infoIconDesktop}
              />
            </div>
            <span className={styles.orderPriceDesktop}>
              {isBookingComplete ? `$${insuranceFee}` : '-'}
            </span>
          </div>

          {/* Divider 3 (Rectangle 29, 247:1952) */}
          <div
            ref={divider3OrderDesktopRef}
            className={styles.orderDividerDesktop}
            id="cart-order-divider-3-desktop"
          />

          {/* Taxes & Charges Row (Group 22, 250:1983) */}
          <div
            ref={taxesDesktopRef}
            className={styles.orderRowDesktop}
            id="cart-taxes-row-desktop"
          >
            <div className={styles.orderLabelWithIconDesktop}>
              <span className={styles.orderSubLabelDesktop}>Taxes & Charges</span>
              <img
                src="/icons/Info.svg"
                alt="Information"
                width={16}
                height={15}
                className={styles.infoIconDesktop}
              />
            </div>
            <span className={styles.orderPriceDesktop}>
              {isBookingComplete ? `$${taxesAndCharges}` : '-'}
            </span>
          </div>

          {/* Divider 4 (Rectangle 30, 247:1956) */}
          <div
            ref={divider4OrderDesktopRef}
            className={styles.orderDividerDesktop}
            id="cart-order-divider-4-desktop"
          />

          {/* Total Amount Row (Group 19, 250:1980) */}
          <div
            ref={totalRowDesktopRef}
            className={styles.orderRowDesktop}
            id="cart-total-row-desktop"
          >
            <span className={styles.totalLabelDesktop}>Total Amount</span>
            <span className={styles.totalPriceDesktop}>
              {isBookingComplete ? `$${totalAmount}` : '-'}
            </span>
          </div>

          {/* Validation Error Message */}
          {checkoutError && (
            <div
              className={styles.validationErrorDesktop}
              id="cart-checkout-validation-error-desktop"
            >
              {checkoutError}
            </div>
          )}

          {/* Proceed to Checkout Button (247:1649) */}
          <button
            ref={checkoutBtnDesktopRef}
            type="button"
            id="cart-proceed-checkout-btn-desktop"
            className={styles.checkoutBtnDesktop}
            onClick={handleProceedToCheckout}
            aria-label="Proceed to Checkout"
          >
            <span>Proceed To Checkout</span>
            <img
              src="/icons/Right Arrow.svg"
              alt=""
              width={20}
              height={20}
              className={styles.checkoutArrowDesktop}
            />
          </button>

          {/* Promo Code Section (Group 16, 250:1977) */}
          <div
            ref={promoGroupDesktopRef}
            className={styles.promoGroupDesktop}
            id="cart-promo-group-desktop"
          >
            <div className={styles.promoHeaderDesktop}>
              <img
                src="/icons/Price Tag.svg"
                alt=""
                width={20}
                height={20}
                className={styles.promoTagIconDesktop}
              />
              <span className={styles.promoTitleDesktop}>Have a Promo Code?</span>
            </div>
            <div className={styles.promoInputRowDesktop}>
              <input
                type="text"
                id="cart-promo-input-desktop"
                className={styles.promoInputDesktop}
                placeholder="Enter Code"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyPromo();
                }}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                id="cart-promo-apply-btn-desktop"
                className={styles.promoApplyBtnDesktop}
                onClick={handleApplyPromo}
                aria-label="Apply Promo Code"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <span className={styles.promoErrorTextDesktop}>{promoError}</span>
            )}
            {promoSuccessMsg && (
              <span className={styles.promoSuccessTextDesktop}>{promoSuccessMsg}</span>
            )}
          </div>

          {/* Security Divider (Rectangle 32, 250:1975) */}
          <div
            ref={securityDividerDesktopRef}
            className={styles.securityDividerDesktop}
            id="cart-security-divider-desktop"
          />

          {/* 100% Secure Payment Section (Group 17, 250:1978) */}
          <div
            ref={securityGroupDesktopRef}
            className={styles.securityGroupDesktop}
            id="cart-security-group-desktop"
          >
            <img
              src="/icons/Protect.svg"
              alt="Security Protect"
              width={25}
              height={25}
              className={styles.protectIconDesktop}
            />
            <div className={styles.securityTextColDesktop}>
              <span className={styles.securityTitleDesktop}>100% Secure Payment</span>
              <span className={styles.securitySubtextDesktop}>
                Your information is encrypted and safe with us.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE (< 768px, 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        {/* A. Carted Vehicle Video Slider Viewport (Mobile) */}
        <div
          ref={viewportMobileRef}
          className={styles.videoViewportMobile}
          id="cart-video-viewport-mobile"
        >
          <div className={styles.slideTrackMobile}>
            {/* Current Active Vehicle Slide */}
            <div
              ref={currentSlideMobileRef}
              className={styles.slideItemMobile}
              id={`cart-slide-current-mobile-${currentVehicle.id}`}
            >
              <video
                key={`cart-video-mobile-${currentVehicle.id}`}
                src={`/videos/${currentVehicle.name}_video.webm`}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
                onTimeUpdate={handleTimeUpdate}
                className={styles.cartVideoMobile}
              />
            </div>

            {/* Incoming Vehicle Slide */}
            {incomingVehicle && (
              <div
                ref={incomingSlideMobileRef}
                className={styles.slideItemMobile}
                id={`cart-slide-incoming-mobile-${incomingVehicle.id}`}
              >
                <video
                  key={`cart-video-mobile-incoming-${incomingVehicle.id}`}
                  src={`/videos/${incomingVehicle.name}_video.webm`}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                  className={styles.cartVideoMobile}
                />
              </div>
            )}
          </div>
        </div>

        {/* B. Remove Button (Mobile) */}
        <button
          ref={removeBtnMobileRef}
          type="button"
          id="cart-remove-btn-mobile"
          className={styles.removeBtnMobile}
          onClick={handleRemove}
          aria-label={`Remove ${currentVehicle.brand} ${currentVehicle.model} from cart`}
        >
          <img
            src="/icons/Trash.svg"
            alt=""
            width={7}
            height={7}
            className={styles.trashIconMobile}
          />
          <span className={styles.removeTextMobile}>Remove</span>
        </button>

        {/* C. Left Chevron Slider Button (Mobile) -> Next Item */}
        <button
          ref={leftBtnMobileRef}
          type="button"
          id="cart-slider-btn-left-mobile"
          className={`${styles.sliderBtnMobile} ${styles.btnLeftMobile} ${
            isLeftDisabled ? styles.btnDisabled : ''
          }`}
          onClick={handleLeftClick}
          disabled={isLeftDisabled}
          aria-label="Next cart vehicle"
          aria-disabled={isLeftDisabled}
          tabIndex={isLeftDisabled ? -1 : 0}
        >
          <img
            src="/icons/Chevron Left.svg"
            alt=""
            width={7}
            height={7}
            className={styles.chevronIconMobile}
          />
        </button>

        {/* D. Right Chevron Slider Button (Mobile) -> Previous Item */}
        <button
          ref={rightBtnMobileRef}
          type="button"
          id="cart-slider-btn-right-mobile"
          className={`${styles.sliderBtnMobile} ${styles.btnRightMobile} ${
            isRightDisabled ? styles.btnDisabled : ''
          }`}
          onClick={handleRightClick}
          disabled={isRightDisabled}
          aria-label="Previous cart vehicle"
          aria-disabled={isRightDisabled}
          tabIndex={isRightDisabled ? -1 : 0}
        >
          <img
            src="/icons/Chevron Right.svg"
            alt=""
            width={7}
            height={7}
            className={styles.chevronIconMobile}
          />
        </button>

        {/* E. Car Title (Mobile - Figma node 273:190) */}
        <div
          ref={carTitleMobileRef}
          className={styles.carTitleMobile}
          id="cart-car-name-mobile"
        >
          {formatTitleCase(currentVehicle.brand)} {formatTitleCase(currentVehicle.model)}
        </div>

        {/* F. Price Container (Mobile - Figma node 273:191) */}
        <div
          ref={carPriceMobileRef}
          className={styles.priceContainerMobile}
          id="cart-car-price-mobile"
        >
          <span className={styles.priceValueMobile}>${currentPrice}</span>
          <span className={styles.priceUnitMobile}>/day</span>
        </div>

        {/* G. Car Description (Mobile - Figma node 273:192 Frame 60) */}
        <div
          ref={carDescMobileRef}
          className={styles.descriptionRowMobile}
          id="cart-car-desc-mobile"
        >
          <span className={styles.descWordMobile}>{currentText[0]}</span>
          <span className={styles.descDotMobile}>•</span>
          <span className={styles.descWordMobile}>{currentText[1]}</span>
          <span className={styles.descDotMobile}>•</span>
          <span className={styles.descWordMobile}>{currentText[2]}</span>
          <span className={styles.descDotMobile}>•</span>
          <span className={styles.descWordMobile}>{currentText[3]}</span>
        </div>

        {/* H. Rental Details Row (Mobile - Figma node 273:213 Frame 61) */}
        <div
          ref={detailsRowMobileRef}
          className={`${styles.detailsRowMobile} ${
            activePopup ? styles.detailsRowMobileOpen : ''
          }`}
          id="cart-rental-details-mobile"
        >
          {/* Pick-up Date (Group 23) */}
          <button
            type="button"
            className={styles.detailColMobile}
            id="cart-pickup-col-mobile"
            onClick={(e) => {
              e.stopPropagation();
              const d = parseDisplayDate(bookingData.pickupDate);
              if (d) {
                setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
              } else {
                const today = new Date();
                setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
              }
              setActivePopup((prev) => (prev === 'pickup' ? null : 'pickup'));
            }}
            aria-label="Edit pick-up date"
          >
            <img
              src="/icons/Calendar.svg"
              alt=""
              width={16}
              height={16}
              className={styles.detailIconMobile}
            />
            <div className={styles.detailTextColMobile}>
              <span className={styles.detailLabelMobile}>Pick-up Date</span>
              <div className={styles.detailValueRowMobile}>
                <span
                  className={`${styles.detailValueMobile} ${
                    !bookingData.pickupDate ? styles.detailValuePlaceholder : ''
                  }`}
                >
                  {bookingData.pickupDate || 'DD/MM/YYYY'}
                </span>
                <img
                  src="/icons/Pencil.svg"
                  alt=""
                  width={7}
                  height={7}
                  className={styles.pencilIconMobile}
                />
              </div>
            </div>
          </button>

          {/* Drop-off Date (Group 25) */}
          <button
            type="button"
            className={styles.detailColMobile}
            id="cart-dropoff-col-mobile"
            onClick={(e) => {
              e.stopPropagation();
              const d =
                parseDisplayDate(bookingData.dropoffDate) ||
                parseDisplayDate(bookingData.pickupDate);
              if (d) {
                setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
              } else {
                const today = new Date();
                setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
              }
              setActivePopup((prev) => (prev === 'dropoff' ? null : 'dropoff'));
            }}
            aria-label="Edit drop-off date"
          >
            <img
              src="/icons/Calendar.svg"
              alt=""
              width={16}
              height={16}
              className={styles.detailIconMobile}
            />
            <div className={styles.detailTextColMobile}>
              <span className={styles.detailLabelMobile}>Drop-off Date</span>
              <div className={styles.detailValueRowMobile}>
                <span
                  className={`${styles.detailValueMobile} ${
                    !bookingData.dropoffDate ? styles.detailValuePlaceholder : ''
                  }`}
                >
                  {bookingData.dropoffDate || 'DD/MM/YYYY'}
                </span>
                <img
                  src="/icons/Pencil.svg"
                  alt=""
                  width={7}
                  height={7}
                  className={styles.pencilIconMobile}
                />
              </div>
            </div>
          </button>

          {/* Location (Group 24) */}
          <button
            type="button"
            className={styles.detailColMobile}
            id="cart-location-col-mobile"
            onClick={(e) => {
              e.stopPropagation();
              setActivePopup((prev) => (prev === 'location' ? null : 'location'));
            }}
            aria-label="Edit location"
          >
            <img
              src="/icons/Location.svg"
              alt=""
              width={16}
              height={16}
              className={styles.detailIconMobile}
            />
            <div className={styles.detailTextColMobile}>
              <span className={styles.detailLabelMobile}>Location</span>
              <div className={styles.detailValueRowMobile}>
                <span className={styles.detailValueMobile}>
                  {bookingData.location || 'New York'}
                </span>
                <img
                  src="/icons/Drop Down Arrow.svg"
                  alt=""
                  width={7}
                  height={7}
                  className={`${styles.dropdownArrowMobile} ${
                    activePopup === 'location' ? styles.dropdownArrowOpen : ''
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Mobile Popups (Calendar or Location) */}
          {activePopup && (
            <div
              ref={popupMobileRef}
              className={styles.popupWrapperMobile}
              id="cart-popup-mobile"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {activePopup === 'location' ? (
                <div
                  className={`${styles.locationDropdown} ${styles.locationDropdownMobile}`}
                >
                  {LOCATIONS.map((loc) => {
                    const isSelected = Boolean(bookingData.location && loc === bookingData.location);
                    return (
                      <div
                        key={`mob-loc-${loc}`}
                        className={`${styles.locationOption} ${
                          isSelected ? styles.locationOptionSelected : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLocationSelect(loc);
                        }}
                      >
                        <span>{loc}</span>
                        {isSelected && <span className={styles.locationCheck}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`${styles.calendarPopup} ${styles.calendarPopupMobile}`}
                >
                  <div className={styles.calendarHeader}>
                    <span className={styles.calendarMonthTitle}>
                      {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                    </span>
                    <div className={styles.calendarNav}>
                      <button
                        type="button"
                        className={styles.calendarNavBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1
                            )
                          );
                        }}
                        aria-label="Previous month"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className={styles.calendarNavBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1
                            )
                          );
                        }}
                        aria-label="Next month"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  <div className={styles.calendarWeekdays}>
                    {WEEKDAYS.map((w) => (
                      <span key={`mob-w-${w}`}>{w}</span>
                    ))}
                  </div>
                  <div className={styles.calendarGrid}>
                    {renderCalendarDays(activePopup as 'pickup' | 'dropoff')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* I. Main Specifications Glass-morphism Box (Mobile - Figma node 273:200 box_8) */}
        <div
          ref={mainSpecsBoxMobileRef}
          className={styles.mainSpecsBoxMobile}
          id="cart-main-specs-box-mobile"
        >
          {/* Engine Section (273:204, 273:206, 273:209) */}
          <div
            ref={engineMobileRef}
            className={styles.specSectionMobile}
            id="cart-spec-engine-mobile"
          >
            <div className={styles.specHeaderMobile}>
              <img
                src="/icons/Engine.svg"
                alt=""
                width={10}
                height={10}
                className={styles.specIconMobile}
              />
              <span className={styles.specLabelMobile}>Engine</span>
            </div>
            <div className={styles.specValueBlockMobile}>
              <div className={styles.engineNumericMobile}>
                {currentSpecs.engine.numeric}
              </div>
              <div className={styles.engineSuffixMobile}>
                {currentSpecs.engine.suffix}
              </div>
            </div>
          </div>

          {/* Specification Divider 1 (Rectangle 17, 273:202) */}
          <div
            ref={specDivider1MobileRef}
            className={styles.specDividerMobile}
            style={{ left: '80px' }}
          />

          {/* Fuel Section (273:205, 273:207, 273:208) */}
          <div
            ref={fuelMobileRef}
            className={styles.specSectionMobile}
            id="cart-spec-fuel-mobile"
          >
            <div className={styles.specHeaderMobile}>
              <img
                src="/icons/Gas Station_yellow.svg"
                alt=""
                width={10}
                height={10}
                className={styles.specIconMobile}
              />
              <span className={styles.specLabelMobile}>Fuel</span>
            </div>
            <div className={styles.specValueBlockMobile}>
              <div className={styles.specValueBoldMobile}>
                {currentSpecs.fuel}
              </div>
            </div>
          </div>

          {/* Specification Divider 2 (Rectangle 18, 273:203) */}
          <div
            ref={specDivider2MobileRef}
            className={styles.specDividerMobile}
            style={{ left: '154px' }}
          />

          {/* Transmission Section (273:210, 273:211, 273:212) */}
          <div
            ref={transmissionMobileRef}
            className={styles.specSectionMobile}
            id="cart-spec-transmission-mobile"
          >
            <div className={styles.specHeaderMobile}>
              <img
                src="/icons/Gears.svg"
                alt=""
                width={10}
                height={10}
                className={styles.specIconMobile}
              />
              <span className={styles.specLabelMobile}>Transmission</span>
            </div>
            <div className={styles.specValueBlockMobile}>
              <div className={styles.specValueBoldMobile}>
                {currentSpecs.transmission}
              </div>
            </div>
          </div>
        </div>

        {/* J. Five Amenities Row (Mobile - Figma node 273:233 Frame 62) */}
        <div
          ref={amenitiesContainerMobileRef}
          className={styles.amenitiesContainerMobile}
          id="cart-amenities-mobile"
        >
          {/* 1. Seats (Group 3, 273:234) */}
          <div
            ref={(el) => {
              amenityMobileRefs.current[0] = el;
            }}
            className={styles.amenityItemMobile}
            id="cart-amenity-seats-mobile"
          >
            <img
              src="/icons/Flight Seat.svg"
              alt=""
              width={10}
              height={10}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>
                {currentSpecs.amenities.seats}
              </span>
              <span className={styles.amenityLabelMobile}>Seats</span>
            </div>
          </div>

          {/* 2. Luggage (Group 4, 273:238) */}
          <div
            ref={(el) => {
              amenityMobileRefs.current[1] = el;
            }}
            className={styles.amenityItemMobile}
            id="cart-amenity-luggage-mobile"
          >
            <img
              src="/icons/Carry On Bag.svg"
              alt=""
              width={10}
              height={10}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>
                {currentSpecs.amenities.luggage}
              </span>
              <span className={styles.amenityLabelMobile}>Luggage</span>
            </div>
          </div>

          {/* 3. Doors (Group 5, 273:242) */}
          <div
            ref={(el) => {
              amenityMobileRefs.current[2] = el;
            }}
            className={styles.amenityItemMobile}
            id="cart-amenity-doors-mobile"
          >
            <img
              src="/icons/Car Door.svg"
              alt=""
              width={10}
              height={10}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>
                {currentSpecs.amenities.doors}
              </span>
              <span className={styles.amenityLabelMobile}>Doors</span>
            </div>
          </div>

          {/* 4. 0–60 MPH (Group 6, 273:246) */}
          <div
            ref={(el) => {
              amenityMobileRefs.current[3] = el;
            }}
            className={styles.amenityItemMobile}
            id="cart-amenity-zerotosixty-mobile"
          >
            <img
              src="/icons/Speedometer.svg"
              alt=""
              width={10}
              height={10}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>
                {currentSpecs.amenities.zeroToSixty}
              </span>
              <span className={styles.amenityLabelMobile}>0–60 MPH</span>
            </div>
          </div>

          {/* 5. Horse Power (Group 7, 273:250) */}
          <div
            ref={(el) => {
              amenityMobileRefs.current[4] = el;
            }}
            className={styles.amenityItemMobile}
            id="cart-amenity-horsepower-mobile"
          >
            <img
              src="/icons/Horse.svg"
              alt=""
              width={10}
              height={10}
              className={styles.amenityIconMobile}
            />
            <div className={styles.amenityTextColMobile}>
              <span className={styles.amenityValueMobile}>
                {currentSpecs.amenities.horsePower}
              </span>
              <span className={styles.amenityLabelMobile}>Horse Power</span>
            </div>
          </div>
        </div>

        {/* K. Order Summary Glass-morphism Box (Mobile - Figma Rectangle 37, 273:141) */}
        <div
          ref={orderSummaryBoxMobileRef}
          className={styles.orderSummaryBoxMobile}
          id="cart-order-summary-box-mobile"
        >
          {/* Mobile Inner Frame 63 (279:284) */}
          <div className={styles.mobileOrderInner}>
            {/* Heading (279:260) */}
            <h2
              ref={orderHeadingMobileRef}
              className={styles.orderHeadingMobile}
              id="cart-order-heading-mobile"
            >
              ORDER SUMMARY
            </h2>

            {/* Rental Charges Row (Group 26, 279:279) */}
            <div
              ref={rentalRowMobileRef}
              className={styles.orderRowMobile}
              id="cart-rental-charges-row-mobile"
            >
              <div className={styles.rentalLabelColMobile}>
                <span className={styles.orderLabelMobile}>Rental Charges</span>
                <span
                  className={styles.rentalCalcSubtextMobile}
                  style={{ visibility: isBookingComplete ? 'visible' : 'hidden' }}
                >
                  ${totalDailyRate} x {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <span className={styles.orderPriceMobile}>
                {isBookingComplete ? `$${rentalCharges}` : '-'}
              </span>
            </div>

            {/* Divider 1 (Rectangle 27, 267:15) */}
            <div
              ref={divider1OrderMobileRef}
              className={styles.orderDividerMobile}
              id="cart-order-divider-1-mobile"
            />

            {/* Service Fee Row (Group 27, 279:280) */}
            <div
              ref={serviceFeeMobileRef}
              className={styles.orderRowMobile}
              id="cart-service-fee-row-mobile"
            >
              <div className={styles.orderLabelWithIconMobile}>
                <span className={styles.orderSubLabelMobile}>Service Fee</span>
                <img
                  src="/icons/Info.svg"
                  alt="Information"
                  width={10}
                  height={10}
                  className={styles.infoIconMobile}
                />
              </div>
              <span className={styles.orderPriceMobile}>
                {isBookingComplete ? `$${serviceFee}` : '-'}
              </span>
            </div>

            {/* Divider 2 (Rectangle 38, 279:274) */}
            <div
              ref={divider2OrderMobileRef}
              className={styles.orderDividerMobile}
              id="cart-order-divider-2-mobile"
            />

            {/* Insurance (Basic) Row (Group 28, 279:281) */}
            <div
              ref={insuranceMobileRef}
              className={styles.orderRowMobile}
              id="cart-insurance-row-mobile"
            >
              <div className={styles.orderLabelWithIconMobile}>
                <span className={styles.orderSubLabelMobile}>Insurance (Basic)</span>
                <img
                  src="/icons/Info.svg"
                  alt="Information"
                  width={10}
                  height={10}
                  className={styles.infoIconMobile}
                />
              </div>
              <span className={styles.orderPriceMobile}>
                {isBookingComplete ? `$${insuranceFee}` : '-'}
              </span>
            </div>

            {/* Divider 3 (Rectangle 39, 279:275) */}
            <div
              ref={divider3OrderMobileRef}
              className={styles.orderDividerMobile}
              id="cart-order-divider-3-mobile"
            />

            {/* Taxes & Charges Row (Group 29, 279:282) */}
            <div
              ref={taxesMobileRef}
              className={styles.orderRowMobile}
              id="cart-taxes-row-mobile"
            >
              <div className={styles.orderLabelWithIconMobile}>
                <span className={styles.orderSubLabelMobile}>Taxes & Charges</span>
                <img
                  src="/icons/Info.svg"
                  alt="Information"
                  width={10}
                  height={10}
                  className={styles.infoIconMobile}
                />
              </div>
              <span className={styles.orderPriceMobile}>
                {isBookingComplete ? `$${taxesAndCharges}` : '-'}
              </span>
            </div>

            {/* Divider 4 (Rectangle 40, 279:276) */}
            <div
              ref={divider4OrderMobileRef}
              className={styles.orderDividerMobile}
              id="cart-order-divider-4-mobile"
            />

            {/* Total Amount Row (Group 30, 279:283) */}
            <div
              ref={totalRowMobileRef}
              className={styles.orderRowMobile}
              id="cart-total-row-mobile"
            >
              <span className={styles.totalLabelMobile}>Total Amount</span>
              <span className={styles.totalPriceMobile}>
                {isBookingComplete ? `$${totalAmount}` : '-'}
              </span>
            </div>

            {/* Validation Error Message */}
            {checkoutError && (
              <div
                className={styles.validationErrorMobile}
                id="cart-checkout-validation-error-mobile"
              >
                {checkoutError}
              </div>
            )}

            {/* Proceed to Checkout Button (267:34) */}
            <button
              ref={checkoutBtnMobileRef}
              type="button"
              id="cart-proceed-checkout-btn-mobile"
              className={styles.checkoutBtnMobile}
              onClick={handleProceedToCheckout}
              aria-label="Proceed to Checkout"
            >
              <span>Proceed To Checkout</span>
              <img
                src="/icons/Right Arrow.svg"
                alt=""
                width={10}
                height={10}
                className={styles.checkoutArrowMobile}
              />
            </button>
          </div>

          {/* Promo Code Section (Group 20, 273:173) */}
          <div
            ref={promoGroupMobileRef}
            className={styles.promoGroupMobile}
            id="cart-promo-group-mobile"
          >
            <div className={styles.promoHeaderMobile}>
              <img
                src="/icons/Price Tag.svg"
                alt=""
                width={10}
                height={10}
                className={styles.promoTagIconMobile}
              />
              <span className={styles.promoTitleMobile}>Have a Promo Code?</span>
            </div>
            <div className={styles.promoInputRowMobile}>
              <input
                type="text"
                id="cart-promo-input-mobile"
                className={`${styles.promoInputMobile} ${promoError ? styles.promoInputErrorMobile : ''}`}
                placeholder="Enter Code"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyPromo();
                }}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                id="cart-promo-apply-btn-mobile"
                className={`${styles.promoApplyBtnMobile} ${promoError ? styles.promoApplyBtnErrorMobile : ''}`}
                onClick={handleApplyPromo}
                aria-label="Apply Promo Code"
              >
                Apply
              </button>
            </div>
            {promoSuccessMsg && (
              <span className={styles.promoSuccessTextMobile}>{promoSuccessMsg}</span>
            )}
          </div>

          {/* Security Divider */}
          <div
            ref={securityDividerMobileRef}
            className={styles.securityDividerMobile}
            id="cart-security-divider-mobile"
          />

          {/* 100% Secure Payment Section (Group 21, 273:181) */}
          <div
            ref={securityGroupMobileRef}
            className={styles.securityGroupMobile}
            id="cart-security-group-mobile"
          >
            <img
              src="/icons/Protect.svg"
              alt="Security Protect"
              width={10}
              height={10}
              className={styles.protectIconMobile}
            />
            <div className={styles.securityTextColMobile}>
              <span className={styles.securityTitleMobile}>100% Secure Payment</span>
              <span className={styles.securitySubtextMobile}>
                Your information is encrypted and safe with us.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
