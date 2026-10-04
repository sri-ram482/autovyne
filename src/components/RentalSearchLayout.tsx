'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './RentalSearchLayout.module.css';

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
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function formatDisplayDate(d: Date | null): string {
  if (!d) return 'dd/mm/yyyy';
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

export default function RentalSearchLayout() {
  const router = useRouter();

  // Selected states
  const [location, setLocation] = useState<string>('New York');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);

  // Active popup: 'location' | 'pickup' | 'dropoff' | null
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Current calendar view month/year
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Validation state
  const [errors, setErrors] = useState<{ pickup?: string; dropoff?: string }>({});

  // Refs for animation & click-outside
  const desktopContainerRef = useRef<HTMLFormElement>(null);
  const mobileContainerRef = useRef<HTMLFormElement>(null);
  const searchRootRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRootRef.current && !searchRootRef.current.contains(event.target as Node)) {
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
  }, []);

  // GSAP entrance animation coordinated with page typography
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (desktopContainerRef.current) {
        gsap.fromTo(
          desktopContainerRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, delay: 1.5, ease: 'power2.out' }
        );
      }
    });

    mm.add('(max-width: 1023px)', () => {
      if (mobileContainerRef.current) {
        gsap.fromTo(
          mobileContainerRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 1.4, ease: 'power2.out' }
        );
      }
    });

    return () => mm.revert();
  }, []);

  // Handlers
  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setActivePopup(null);
    try {
      const existingRaw = sessionStorage.getItem('autovyne_booking_data');
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const updated = {
        ...existing,
        location: loc,
        timestamp: Date.now(),
      };
      sessionStorage.setItem('autovyne_booking_data', JSON.stringify(updated));
      sessionStorage.setItem('autovyne_rental_search', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDateSelect = (d: Date, type: 'pickup' | 'dropoff') => {
    if (type === 'pickup') {
      setPickupDate(d);
      setErrors((prev) => ({ ...prev, pickup: undefined }));
      // If dropoff is before new pickup, reset dropoff
      if (dropoffDate && isBeforeDay(dropoffDate, d)) {
        setDropoffDate(null);
      }
    } else {
      setDropoffDate(d);
      setErrors((prev) => ({ ...prev, dropoff: undefined }));
    }
    setActivePopup(null);
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { pickup?: string; dropoff?: string } = {};

    if (!location || location.trim() === '') {
      newErrors.pickup = 'Please select a location';
    }
    if (!pickupDate) {
      newErrors.pickup = 'Please select pick-up date';
    }
    if (!dropoffDate) {
      newErrors.dropoff = 'Please select drop-off date';
    } else if (pickupDate && isBeforeDay(dropoffDate, pickupDate)) {
      newErrors.dropoff = 'Drop-off date cannot be before pick-up date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Valid: save search data and navigate to /fleet
    const bookingData = {
      location,
      pickupDate: formatDisplayDate(pickupDate),
      dropoffDate: formatDisplayDate(dropoffDate),
      timestamp: Date.now(),
    };

    try {
      sessionStorage.setItem('autovyne_booking_data', JSON.stringify(bookingData));
      sessionStorage.setItem('autovyne_rental_search', JSON.stringify(bookingData));
      localStorage.setItem('autovyne_booking_data', JSON.stringify(bookingData));
    } catch {
      // ignore storage errors
    }

    router.push('/fleet');
  };

  // Calendar Day Generator
  const renderCalendarDays = (type: 'pickup' | 'dropoff') => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    // Convert to Monday = 0
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const cells = [];

    // Empty offset cells
    for (let i = 0; i < startOffset; i++) {
      cells.push(<div key={`empty-${i}`} className={styles.calendarDayCell} />);
    }

    // Day cells
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isPast = isBeforeDay(cellDate, new Date(today.getFullYear(), today.getMonth(), today.getDate()));
      const isPickup = isSameDay(cellDate, pickupDate);
      const isDropoff = isSameDay(cellDate, dropoffDate);
      const isSelected = type === 'pickup' ? isPickup : isDropoff;

      let isDisabled = isPast;
      if (type === 'dropoff' && pickupDate && isBeforeDay(cellDate, pickupDate)) {
        isDisabled = true;
      }

      let inRange = false;
      if (pickupDate && dropoffDate && !isBeforeDay(cellDate, pickupDate) && !isBeforeDay(dropoffDate, cellDate)) {
        inRange = true;
      }

      cells.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            handleDateSelect(cellDate, type);
          }}
          className={`${styles.calendarDayCell} ${isSelected ? styles.calendarDaySelected : ''} ${
            inRange && !isSelected ? styles.calendarDayInRange : ''
          } ${isDisabled ? styles.dayDisabled : ''}`}
          aria-label={`${day} ${MONTH_NAMES[month]} ${year}`}
        >
          {day}
        </button>
      );
    }

    return cells;
  };

  return (
    <div ref={searchRootRef} className={styles.container} id="rental-search-layer">
      {/* ========================================================
          DESKTOP RENTAL SEARCH LAYOUT (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <form
          ref={desktopContainerRef}
          className={styles.rentalSearchDesktop}
          id="rental-search-layout-desktop"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* 1. Location Box (Node 58:39) */}
          <div
            className={`${styles.searchCardDesktop} ${errors.pickup ? '' : ''}`}
            id="search-card-location-desktop"
            onClick={() => setActivePopup(activePopup === 'location-desktop' ? null : 'location-desktop')}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={activePopup === 'location-desktop'}
          >
            <p className={styles.cardLabelDesktop}>Location</p>
            <img
              src="/icons/Location.svg"
              alt=""
              className={styles.cardIconDesktop}
              width={36}
              height={90}
            />
            <p className={styles.cardValueDesktop}>{location}</p>
            <img
              src="/icons/Drop Down Arrow.svg"
              alt=""
              className={`${styles.cardChevronDesktop} ${
                activePopup === 'location-desktop' ? styles.cardChevronOpen : ''
              }`}
              width={30}
              height={90}
            />

            {/* Custom Location Dropdown */}
            {activePopup === 'location-desktop' && (
              <div className={styles.locationDropdown} role="listbox">
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc}
                    className={`${styles.locationOption} ${
                      loc === location ? styles.locationOptionSelected : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocationSelect(loc);
                    }}
                    role="option"
                    aria-selected={loc === location}
                  >
                    <span>{loc}</span>
                    {loc === location && <span>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Pick-up Date Box (Node 58:41) */}
          <div
            className={`${styles.searchCardDesktop} ${errors.pickup ? styles.cardInvalid : ''}`}
            id="search-card-pickup-desktop"
            onClick={() => {
              setActivePopup(activePopup === 'pickup-desktop' ? null : 'pickup-desktop');
              if (pickupDate) {
                setCalendarMonth(new Date(pickupDate.getFullYear(), pickupDate.getMonth(), 1));
              }
            }}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'pickup-desktop'}
          >
            <p className={styles.cardLabelDesktop}>Pick-up Date</p>
            <img
              src="/icons/Calendar.svg"
              alt=""
              className={styles.cardIconDesktop}
              width={36}
              height={90}
            />
            <p
              className={`${styles.cardValueDesktop} ${
                !pickupDate ? styles.cardValuePlaceholderDesktop : ''
              }`}
            >
              {formatDisplayDate(pickupDate)}
            </p>

            {errors.pickup && <span className={styles.validationTooltip}>{errors.pickup}</span>}

            {/* Custom Calendar Popup */}
            {activePopup === 'pickup-desktop' && (
              <div
                className={styles.calendarPopup}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Pick-up date calendar"
              >
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarMonthTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
                <div className={styles.calendarWeekdays}>
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className={styles.calendarGrid}>{renderCalendarDays('pickup')}</div>
              </div>
            )}
          </div>

          {/* 3. Drop-off Date Box (Node 58:47) */}
          <div
            className={`${styles.searchCardDesktop} ${errors.dropoff ? styles.cardInvalid : ''}`}
            id="search-card-dropoff-desktop"
            onClick={() => {
              setActivePopup(activePopup === 'dropoff-desktop' ? null : 'dropoff-desktop');
              if (dropoffDate) {
                setCalendarMonth(new Date(dropoffDate.getFullYear(), dropoffDate.getMonth(), 1));
              } else if (pickupDate) {
                setCalendarMonth(new Date(pickupDate.getFullYear(), pickupDate.getMonth(), 1));
              }
            }}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'dropoff-desktop'}
          >
            <p className={styles.cardLabelDesktop}>Drop-off Date</p>
            <img
              src="/icons/Calendar.svg"
              alt=""
              className={styles.cardIconDesktop}
              width={36}
              height={90}
            />
            <p
              className={`${styles.cardValueDesktop} ${
                !dropoffDate ? styles.cardValuePlaceholderDesktop : ''
              }`}
            >
              {formatDisplayDate(dropoffDate)}
            </p>

            {errors.dropoff && <span className={styles.validationTooltip}>{errors.dropoff}</span>}

            {/* Custom Calendar Popup */}
            {activePopup === 'dropoff-desktop' && (
              <div
                className={styles.calendarPopup}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Drop-off date calendar"
              >
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarMonthTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
                <div className={styles.calendarWeekdays}>
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className={styles.calendarGrid}>{renderCalendarDays('dropoff')}</div>
              </div>
            )}
          </div>

          {/* 4. Submit Button (Node 160:239) */}
          <button
            type="submit"
            className={styles.submitBtnDesktop}
            id="submit-button-desktop"
            aria-label="Submit Rental Search"
          >
            <span className={styles.submitTextDesktop}>Submit</span>
            <img
              src="/icons/Right Arrow.svg"
              alt=""
              className={styles.submitArrowDesktop}
              width={26}
              height={90}
            />
          </button>
        </form>
      </div>

      {/* ========================================================
          MOBILE RENTAL SEARCH LAYOUT (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <form
          ref={mobileContainerRef}
          className={styles.rentalSearchMobile}
          id="rental-search-layout-mobile"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* 1. Location Box Mobile (Node 123:126) */}
          <div
            className={styles.searchCardMobile}
            id="search-card-location-mobile"
            onClick={() => setActivePopup(activePopup === 'location-mobile' ? null : 'location-mobile')}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={activePopup === 'location-mobile'}
          >
            <p className={styles.cardLabelMobile}>Location</p>
            <img
              src="/icons/Location.svg"
              alt=""
              className={styles.cardIconMobile}
              width={15.2}
              height={38}
            />
            <p className={styles.cardValueMobile}>{location}</p>
            <img
              src="/icons/Drop Down Arrow.svg"
              alt=""
              className={`${styles.cardChevronMobile} ${
                activePopup === 'location-mobile' ? styles.cardChevronOpen : ''
              }`}
              width={15}
              height={45}
            />

            {/* Custom Location Dropdown Mobile */}
            {activePopup === 'location-mobile' && (
              <div className={styles.locationDropdown} role="listbox">
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc}
                    className={`${styles.locationOption} ${styles.locationOptionMobile} ${
                      loc === location ? styles.locationOptionSelected : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocationSelect(loc);
                    }}
                    role="option"
                    aria-selected={loc === location}
                  >
                    <span>{loc}</span>
                    {loc === location && <span>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Pick-up Date Box Mobile (Node 123:132) */}
          <div
            className={`${styles.searchCardMobile} ${errors.pickup ? styles.cardInvalid : ''}`}
            id="search-card-pickup-mobile"
            onClick={() => {
              setActivePopup(activePopup === 'pickup-mobile' ? null : 'pickup-mobile');
              if (pickupDate) {
                setCalendarMonth(new Date(pickupDate.getFullYear(), pickupDate.getMonth(), 1));
              }
            }}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'pickup-mobile'}
          >
            <p className={styles.cardLabelMobile}>Pick-up Date</p>
            <img
              src="/icons/Calendar.svg"
              alt=""
              className={styles.cardIconMobile}
              width={15.2}
              height={38}
            />
            <p
              className={`${styles.cardValueMobile} ${
                !pickupDate ? styles.cardValuePlaceholderMobile : ''
              }`}
            >
              {formatDisplayDate(pickupDate)}
            </p>

            {/* Custom Calendar Popup Mobile */}
            {activePopup === 'pickup-mobile' && (
              <div
                className={`${styles.calendarPopup} ${styles.calendarPopupMobile}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Pick-up date calendar"
              >
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarMonthTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
                <div className={styles.calendarWeekdays}>
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className={styles.calendarGrid}>{renderCalendarDays('pickup')}</div>
              </div>
            )}
          </div>

          {/* 3. Drop-off Date Box Mobile (Node 123:137) */}
          <div
            className={`${styles.searchCardMobile} ${errors.dropoff ? styles.cardInvalid : ''}`}
            id="search-card-dropoff-mobile"
            onClick={() => {
              setActivePopup(activePopup === 'dropoff-mobile' ? null : 'dropoff-mobile');
              if (dropoffDate) {
                setCalendarMonth(new Date(dropoffDate.getFullYear(), dropoffDate.getMonth(), 1));
              } else if (pickupDate) {
                setCalendarMonth(new Date(pickupDate.getFullYear(), pickupDate.getMonth(), 1));
              }
            }}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'dropoff-mobile'}
          >
            <p className={styles.cardLabelMobile}>Drop-off Date</p>
            <img
              src="/icons/Calendar.svg"
              alt=""
              className={styles.cardIconMobile}
              width={15.2}
              height={38}
            />
            <p
              className={`${styles.cardValueMobile} ${
                !dropoffDate ? styles.cardValuePlaceholderMobile : ''
              }`}
            >
              {formatDisplayDate(dropoffDate)}
            </p>

            {/* Custom Calendar Popup Mobile */}
            {activePopup === 'dropoff-mobile' && (
              <div
                className={`${styles.calendarPopup} ${styles.calendarPopupMobile}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Drop-off date calendar"
              >
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarMonthTitle}>
                    {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className={styles.calendarNavBtn}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>
                <div className={styles.calendarWeekdays}>
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className={styles.calendarGrid}>{renderCalendarDays('dropoff')}</div>
              </div>
            )}
          </div>

          {/* 4. Submit Button Mobile (Node 123:142) */}
          <button
            type="submit"
            className={styles.submitBtnMobile}
            id="submit-button-mobile"
            aria-label="Submit Rental Search"
          >
            <span className={styles.submitTextMobile}>Submit</span>
            <img
              src="/icons/Right Arrow.svg"
              alt=""
              className={styles.submitArrowMobile}
              width={15}
              height={52}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
