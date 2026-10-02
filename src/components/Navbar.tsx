'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'our-fleet', label: 'Our Fleet', href: '/fleet' },
  { id: 'experiences', label: 'Experiences', href: '/experiences' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartVehicleIds, setIsCheckoutSuccess } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);
  const desktopBadgeRef = useRef<HTMLSpanElement>(null);
  const mobileBadgeRef = useRef<HTMLSpanElement>(null);
  const prevCountRef = useRef<number>(cartVehicleIds.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const count = cartVehicleIds.length;
    if (mounted && count > 0 && prevCountRef.current !== count) {
      if (desktopBadgeRef.current) {
        gsap.fromTo(
          desktopBadgeRef.current,
          { scale: 0.8, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      if (mobileBadgeRef.current) {
        gsap.fromTo(
          mobileBadgeRef.current,
          { scale: 0.8, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
    }
    prevCountRef.current = count;
  }, [cartVehicleIds.length, mounted]);

  const cartCount = cartVehicleIds.length;

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* ========================================================
          DESKTOP NAVIGATION (>= 768px, designed for 1440x900)
          ======================================================== */}
      <header className={styles.navDesktop} id="autovyne-desktop-header">
        <div className={styles.desktopInner}>
          {/* LEFT: AUTOVYNE Logo */}
          <Link
            href="/"
            className={styles.logoLink}
            id="autovyne-logo-desktop"
            aria-label="AUTOVYNE Homepage"
          >
            <img
              src="/icons/logo.svg"
              alt="AUTOVYNE Car Rentals"
              className={styles.logoDesktop}
              width={201}
              height={67}
            />
          </Link>

          {/* CENTER: Navigation Links (Aligned in Center horizontally & vertically) */}
          <nav
            className={styles.navDesktopLinksContainer}
            id="autovyne-desktop-nav"
            aria-label="Main Navigation"
          >
            <ul className={styles.navLinksDesktop}>
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <li key={item.id} className={styles.navItem}>
                    <Link
                      href={item.href}
                      id={`nav-link-${item.id}`}
                      className={`${styles.navLink} ${
                        isActive ? styles.navLinkActive : ''
                      }`}
                    >
                      {/* Text wrapper so underline is the EXACT length of the text */}
                      <span className={styles.navTextContainer}>
                        <span className={styles.navLabel}>{item.label}</span>
                        {isActive ? (
                          <span className={styles.activeUnderline} />
                        ) : (
                          <span className={styles.hoverUnderline} />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT: Glass-morphism Cart Button (Cart icon placed in center vertically) */}
          <Link
            href="/cart"
            onClick={() => {
              if (pathname === '/cart') {
                setIsCheckoutSuccess(false);
              }
            }}
            id="cart-button-desktop"
            className={styles.cartButton}
            aria-label="Shopping Cart"
          >
            <span className={styles.cartText}>Cart</span>
            <div className={styles.cartIconDesktopWrapper}>
              <img
                src="/icons/Shopping Cart.svg"
                alt=""
                className={styles.cartIconDesktopSvg}
                width={26}
                height={90}
              />
            </div>
            {mounted && cartCount > 0 && (
              <span
                ref={desktopBadgeRef}
                className={styles.cartBadgeDesktop}
                id="cart-badge-desktop"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ========================================================
          MOBILE NAVIGATION (< 768px, designed for 390x844)
          ======================================================== */}
      <header className={styles.navMobile} id="autovyne-mobile-header">
        <div className={styles.mobileHeader}>
          {/* Logo on Left */}
          <Link
            href="/"
            className={styles.logoLink}
            id="autovyne-logo-mobile"
            aria-label="AUTOVYNE Homepage"
          >
            <img
              src="/icons/logo.svg"
              alt="AUTOVYNE Car Rentals"
              className={styles.logoMobile}
              width={130}
              height={43.33}
            />
          </Link>

          {/* Cart Icon on Right (Vertically centered) */}
          <Link
            href="/cart"
            onClick={() => {
              if (pathname === '/cart') {
                setIsCheckoutSuccess(false);
              }
            }}
            id="cart-button-mobile"
            className={styles.cartMobileBtn}
            aria-label="Shopping Cart"
          >
            <div className={styles.cartIconMobileWrapper}>
              <img
                src="/icons/Shopping Cart.svg"
                alt=""
                className={styles.cartIconMobileSvg}
                width={20}
                height={69}
              />
            </div>
            {mounted && cartCount > 0 && (
              <span
                ref={mobileBadgeRef}
                className={styles.cartBadgeMobile}
                id="cart-badge-mobile"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Center-aligned Mobile Navigation Menu (directly below Cart) */}
        <nav id="autovyne-mobile-nav" aria-label="Mobile Navigation">
          <ul className={styles.mobileMenu}>
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item.href);
              return (
                <li key={item.id} className={styles.mobileMenuItem}>
                  <Link
                    href={item.href}
                    id={`mobile-nav-link-${item.id}`}
                    className={`${styles.mobileNavLink} ${
                      isActive ? styles.mobileNavLinkActive : ''
                    }`}
                  >
                    {/* Text wrapper so underline is the EXACT length of the text */}
                    <span className={styles.mobileTextContainer}>
                      <span className={styles.mobileNavLabel}>
                        {item.label}
                      </span>
                      {isActive && (
                        <span className={styles.mobileActiveUnderline} />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
