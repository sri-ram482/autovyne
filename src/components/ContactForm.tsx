'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ContactForm.module.css';

const ENQUIRY_OPTIONS = [
  'General Enquiry',
  'Vehicle Reservation',
  'Fleet Partnership',
  'Chauffeur & VIP Service',
  'Corporate Rentals',
];

export default function ContactForm() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  });
  const [isDropdownOpenDesktop, setIsDropdownOpenDesktop] = useState(false);
  const [isDropdownOpenMobile, setIsDropdownOpenMobile] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Desktop Refs for Animation
  const headingDesktopRef = useRef<HTMLHeadingElement>(null);
  const subtextDesktopRef = useRef<HTMLParagraphElement>(null);
  const nameDesktopRef = useRef<HTMLDivElement>(null);
  const emailDesktopRef = useRef<HTMLDivElement>(null);
  const phoneDesktopRef = useRef<HTMLDivElement>(null);
  const enquiryDesktopRef = useRef<HTMLDivElement>(null);
  const messageDesktopRef = useRef<HTMLDivElement>(null);
  const buttonDesktopRef = useRef<HTMLButtonElement>(null);
  const securityDesktopRef = useRef<HTMLDivElement>(null);

  // Mobile Refs for Animation
  const headingMobileRef = useRef<HTMLHeadingElement>(null);
  const subtextMobileRef = useRef<HTMLParagraphElement>(null);
  const nameMobileRef = useRef<HTMLDivElement>(null);
  const emailMobileRef = useRef<HTMLDivElement>(null);
  const phoneMobileRef = useRef<HTMLDivElement>(null);
  const enquiryMobileRef = useRef<HTMLDivElement>(null);
  const messageMobileRef = useRef<HTMLDivElement>(null);
  const buttonMobileRef = useRef<HTMLButtonElement>(null);
  const securityMobileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#contact-form-enquiry-desktop') && !target.closest('#contact-form-enquiry-mobile')) {
        setIsDropdownOpenDesktop(false);
        setIsDropdownOpenMobile(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP ANIMATION TIMELINE (>= 1024px, Figma 1440x900)
    // ========================================================
    mm.add('(min-width: 1024px)', () => {
      // Set initial states
      gsap.set(
        [
          headingDesktopRef.current,
          subtextDesktopRef.current,
          nameDesktopRef.current,
          emailDesktopRef.current,
          phoneDesktopRef.current,
          enquiryDesktopRef.current,
          messageDesktopRef.current,
          buttonDesktopRef.current,
          securityDesktopRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.4 });

      // 1. Heading (fade in + slide down)
      tl.fromTo(
        headingDesktopRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.0
      );

      // 2. Subtext (fade in + slide down)
      tl.fromTo(
        subtextDesktopRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.1
      );

      // 3. Your Name (fade in + slide up)
      tl.fromTo(
        nameDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.2
      );

      // 4. Email Address (fade in + slide up)
      tl.fromTo(
        emailDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.28
      );

      // 5. Phone Number (fade in + slide up)
      tl.fromTo(
        phoneDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.36
      );

      // 6. Enquiry Type (fade in + slide up)
      tl.fromTo(
        enquiryDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.44
      );

      // 7. Your Message (fade in + slide up)
      tl.fromTo(
        messageDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.52
      );

      // 8. Send Message Button (fade in + slide up)
      tl.fromTo(
        buttonDesktopRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.6
      );

      // 9. Security Row (fade in + slide from side)
      tl.fromTo(
        securityDesktopRef.current,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        0.68
      );
    });

    // ========================================================
    // MOBILE & TABLET ANIMATION TIMELINE (< 1024px)
    // ========================================================
    mm.add('(max-width: 1023px)', () => {
      gsap.set(
        [
          headingMobileRef.current,
          subtextMobileRef.current,
          nameMobileRef.current,
          emailMobileRef.current,
          phoneMobileRef.current,
          enquiryMobileRef.current,
          messageMobileRef.current,
          buttonMobileRef.current,
          securityMobileRef.current,
        ],
        { opacity: 0 }
      );

      const tl = gsap.timeline({ delay: 0.35 });

      // 1. Heading
      tl.fromTo(
        headingMobileRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.0
      );

      // 2. Subtext
      tl.fromTo(
        subtextMobileRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.08
      );

      // 3. Your Name
      tl.fromTo(
        nameMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.16
      );

      // 4. Email Address
      tl.fromTo(
        emailMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.22
      );

      // 5. Phone Number
      tl.fromTo(
        phoneMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.28
      );

      // 6. Enquiry Type
      tl.fromTo(
        enquiryMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.34
      );

      // 7. Your Message
      tl.fromTo(
        messageMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.4
      );

      // 8. Send Message Button
      tl.fromTo(
        buttonMobileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.46
      );

      // 9. Security Row
      tl.fromTo(
        securityMobileRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.52
      );
    });

    return () => mm.revert();
  }, []);

  // Form input changes: remove error as soon as user types
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field] && value.trim()) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Form submission: if any field is empty, give red stroke to that field and do not send
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.enquiryType.trim()) newErrors.enquiryType = true;
    if (!formData.message.trim()) newErrors.message = true;

    setErrors(newErrors);

    // If any input field is empty, do not allow sending message
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // All fields filled completely -> send message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        enquiryType: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <section
      className={styles.contactFormSection}
      id="autovyne-contact-form-section"
      aria-label="Contact Form"
    >
      {/* ========================================================
          DESKTOP IMPLEMENTATION (>= 768px, Figma 1440x900)
          ======================================================== */}
      <div className={styles.desktopWrapper}>
        <form
          className={styles.formContainerDesktop}
          id="contact-form-desktop"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* A. Form Heading */}
          <h2
            ref={headingDesktopRef}
            className={styles.headingDesktop}
            id="contact-form-heading-desktop"
          >
            Send Us a Message
          </h2>

          {/* B. Form Subtext */}
          <p
            ref={subtextDesktopRef}
            className={styles.subtextDesktop}
            id="contact-form-subtext-desktop"
          >
            Fill in the details and we will get back you shortly.
          </p>

          {/* 2x2 Input Grid */}
          <div className={styles.gridDesktop}>
            {/* C. Your Name Input */}
            <div
              ref={nameDesktopRef}
              className={`${styles.fieldDesktop} ${errors.name ? styles.fieldError : ''}`}
              id="contact-form-name-field-desktop"
            >
              <img
                src="/icons/Person.svg"
                alt=""
                className={styles.fieldIconDesktop}
                width={20}
                height={20}
                aria-hidden="true"
              />
              <input
                type="text"
                id="contact-name-input-desktop"
                name="name"
                className={styles.inputDesktop}
                placeholder="Your Name *"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                autoComplete="name"
                aria-label="Your Name"
                required
              />
            </div>

            {/* D. Email Address Input */}
            <div
              ref={emailDesktopRef}
              className={`${styles.fieldDesktop} ${errors.email ? styles.fieldError : ''}`}
              id="contact-form-email-field-desktop"
            >
              <img
                src="/icons/Email.svg"
                alt=""
                className={`${styles.fieldIconDesktop} ${styles.emailIconDesktop}`}
                width={20}
                height={20}
                aria-hidden="true"
              />
              <input
                type="email"
                id="contact-email-input-desktop"
                name="email"
                className={`${styles.inputDesktop} ${styles.emailInputDesktop}`}
                placeholder="Email Address *"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                autoComplete="email"
                aria-label="Email Address"
                required
              />
            </div>

            {/* E. Phone Number Input */}
            <div
              ref={phoneDesktopRef}
              className={`${styles.fieldDesktop} ${errors.phone ? styles.fieldError : ''}`}
              id="contact-form-phone-field-desktop"
            >
              <img
                src="/icons/Phone.svg"
                alt=""
                className={styles.fieldIconDesktop}
                width={20}
                height={20}
                aria-hidden="true"
              />
              <input
                type="tel"
                id="contact-phone-input-desktop"
                name="phone"
                className={styles.inputDesktop}
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                autoComplete="tel"
                aria-label="Phone Number"
                required
              />
            </div>

            {/* F. Enquiry Type Dropdown */}
            <div
              ref={enquiryDesktopRef}
              className={`${styles.fieldDesktop} ${styles.dropdownDesktop} ${
                isDropdownOpenDesktop ? styles.dropdownOpen : ''
              } ${errors.enquiryType ? styles.fieldError : ''}`}
              id="contact-form-enquiry-desktop"
              onClick={() => setIsDropdownOpenDesktop(!isDropdownOpenDesktop)}
              role="button"
              tabIndex={0}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpenDesktop}
              aria-label="Enquiry Type"
            >
              <div className={styles.dropdownTriggerDesktop}>
                <span
                  className={`${styles.dropdownValueDesktop} ${
                    formData.enquiryType ? styles.dropdownValueSelected : ''
                  }`}
                  id="contact-enquiry-selected-desktop"
                >
                  {formData.enquiryType || 'Enquiry Type'}
                </span>
                <img
                  src="/icons/Drop Down Arrow.svg"
                  alt=""
                  className={`${styles.dropdownChevronDesktop} ${
                    isDropdownOpenDesktop ? styles.dropdownChevronOpen : ''
                  }`}
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </div>

              {isDropdownOpenDesktop && (
                <ul
                  className={styles.dropdownMenuDesktop}
                  role="listbox"
                  id="contact-enquiry-options-desktop"
                >
                  {ENQUIRY_OPTIONS.map(option => (
                    <li
                      key={option}
                      className={`${styles.dropdownItemDesktop} ${
                        formData.enquiryType === option ? styles.dropdownItemSelected : ''
                      }`}
                      role="option"
                      aria-selected={formData.enquiryType === option}
                      onClick={e => {
                        e.stopPropagation();
                        handleInputChange('enquiryType', option);
                        setIsDropdownOpenDesktop(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* G. Your Message Textarea */}
          <div
            ref={messageDesktopRef}
            className={`${styles.textareaFieldDesktop} ${
              errors.message ? styles.fieldError : ''
            }`}
            id="contact-form-message-field-desktop"
          >
            <img
              src="/icons/Chat Bubble.svg"
              alt=""
              className={styles.textareaIconDesktop}
              width={20}
              height={20}
              aria-hidden="true"
            />
            <textarea
              id="contact-message-input-desktop"
              name="message"
              className={styles.textareaDesktop}
              placeholder="Your Message *"
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              aria-label="Your Message"
              rows={3}
              required
            />
          </div>

          {/* Bottom Row: Send Message Button + Security Info */}
          <div className={styles.actionsRowDesktop}>
            {/* H. Send Message Button */}
            <button
              ref={buttonDesktopRef}
              type="submit"
              className={`${styles.buttonDesktop} ${
                isSubmitted ? styles.buttonSubmitted : ''
              }`}
              id="contact-submit-button-desktop"
              aria-label={isSubmitted ? 'Message Sent' : 'Send Message'}
            >
              <span className={styles.buttonTextDesktop}>
                {isSubmitted ? 'Message Sent' : 'Send Message'}
              </span>
              {!isSubmitted && (
                <img
                  src="/icons/Right Arrow.svg"
                  alt=""
                  className={styles.buttonArrowDesktop}
                  width={24}
                  height={14}
                  aria-hidden="true"
                />
              )}
            </button>

            {/* I. Security Information Row */}
            <div
              ref={securityDesktopRef}
              className={styles.securityRowDesktop}
              id="contact-security-row-desktop"
            >
              <img
                src="/icons/Security Shield.svg"
                alt="Security Shield"
                className={styles.securityIconDesktop}
                width={24}
                height={24}
              />
              <span className={styles.securityTextDesktop}>
                Your information is safe with us.
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* ========================================================
          MOBILE IMPLEMENTATION (< 768px, Figma 390x844)
          ======================================================== */}
      <div className={styles.mobileWrapper}>
        <form
          className={styles.formContainerMobile}
          id="contact-form-mobile"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* A. Form Heading */}
          <h2
            ref={headingMobileRef}
            className={styles.headingMobile}
            id="contact-form-heading-mobile"
          >
            Send Us a Message
          </h2>

          {/* B. Form Subtext */}
          <p
            ref={subtextMobileRef}
            className={styles.subtextMobile}
            id="contact-form-subtext-mobile"
          >
            Fill in the details and we will get back you shortly.
          </p>

          {/* 2x2 Input Grid Mobile */}
          <div className={styles.gridMobile}>
            {/* C. Your Name Input */}
            <div
              ref={nameMobileRef}
              className={`${styles.fieldMobile} ${errors.name ? styles.fieldError : ''}`}
              id="contact-form-name-field-mobile"
            >
              <img
                src="/icons/Person.svg"
                alt=""
                className={styles.fieldIconMobile}
                width={14}
                height={14}
                aria-hidden="true"
              />
              <input
                type="text"
                id="contact-name-input-mobile"
                name="name"
                className={styles.inputMobile}
                placeholder="Your Name *"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                autoComplete="name"
                aria-label="Your Name"
                required
              />
            </div>

            {/* D. Email Address Input */}
            <div
              ref={emailMobileRef}
              className={`${styles.fieldMobile} ${errors.email ? styles.fieldError : ''}`}
              id="contact-form-email-field-mobile"
            >
              <img
                src="/icons/Email.svg"
                alt=""
                className={`${styles.fieldIconMobile} ${styles.emailIconMobile}`}
                width={14}
                height={14}
                aria-hidden="true"
              />
              <input
                type="email"
                id="contact-email-input-mobile"
                name="email"
                className={`${styles.inputMobile} ${styles.emailInputMobile}`}
                placeholder="Email Address *"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                autoComplete="email"
                aria-label="Email Address"
                required
              />
            </div>

            {/* E. Phone Number Input */}
            <div
              ref={phoneMobileRef}
              className={`${styles.fieldMobile} ${errors.phone ? styles.fieldError : ''}`}
              id="contact-form-phone-field-mobile"
            >
              <img
                src="/icons/Phone.svg"
                alt=""
                className={styles.fieldIconMobile}
                width={14}
                height={14}
                aria-hidden="true"
              />
              <input
                type="tel"
                id="contact-phone-input-mobile"
                name="phone"
                className={styles.inputMobile}
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                autoComplete="tel"
                aria-label="Phone Number"
                required
              />
            </div>

            {/* F. Enquiry Type Dropdown Mobile */}
            <div
              ref={enquiryMobileRef}
              className={`${styles.fieldMobile} ${styles.dropdownMobile} ${
                isDropdownOpenMobile ? styles.dropdownOpen : ''
              } ${errors.enquiryType ? styles.fieldError : ''}`}
              id="contact-form-enquiry-mobile"
              onClick={() => setIsDropdownOpenMobile(!isDropdownOpenMobile)}
              role="button"
              tabIndex={0}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpenMobile}
              aria-label="Enquiry Type"
            >
              <div className={styles.dropdownTriggerMobile}>
                <span
                  className={`${styles.dropdownValueMobile} ${
                    formData.enquiryType ? styles.dropdownValueSelected : ''
                  }`}
                  id="contact-enquiry-selected-mobile"
                >
                  {formData.enquiryType || 'Enquiry Type'}
                </span>
                <img
                  src="/icons/Drop Down Arrow.svg"
                  alt=""
                  className={`${styles.dropdownChevronMobile} ${
                    isDropdownOpenMobile ? styles.dropdownChevronOpen : ''
                  }`}
                  width={14}
                  height={14}
                  aria-hidden="true"
                />
              </div>

              {isDropdownOpenMobile && (
                <ul
                  className={styles.dropdownMenuMobile}
                  role="listbox"
                  id="contact-enquiry-options-mobile"
                >
                  {ENQUIRY_OPTIONS.map(option => (
                    <li
                      key={option}
                      className={`${styles.dropdownItemMobile} ${
                        formData.enquiryType === option ? styles.dropdownItemSelected : ''
                      }`}
                      role="option"
                      aria-selected={formData.enquiryType === option}
                      onClick={e => {
                        e.stopPropagation();
                        handleInputChange('enquiryType', option);
                        setIsDropdownOpenMobile(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* G. Your Message Textarea Mobile */}
          <div
            ref={messageMobileRef}
            className={`${styles.textareaFieldMobile} ${
              errors.message ? styles.fieldError : ''
            }`}
            id="contact-form-message-field-mobile"
          >
            <img
              src="/icons/Chat Bubble.svg"
              alt=""
              className={styles.textareaIconMobile}
              width={14}
              height={14}
              aria-hidden="true"
            />
            <textarea
              id="contact-message-input-mobile"
              name="message"
              className={styles.textareaMobile}
              placeholder="Your Message *"
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              aria-label="Your Message"
              rows={2}
              required
            />
          </div>

          {/* Bottom Row Mobile */}
          <div className={styles.actionsRowMobile}>
            {/* H. Send Message Button */}
            <button
              ref={buttonMobileRef}
              type="submit"
              className={`${styles.buttonMobile} ${
                isSubmitted ? styles.buttonSubmittedMobile : ''
              }`}
              id="contact-submit-button-mobile"
              aria-label={isSubmitted ? 'Message Sent' : 'Send Message'}
            >
              <span className={styles.buttonTextMobile}>
                {isSubmitted ? 'Message Sent' : 'Send Message'}
              </span>
              {!isSubmitted && (
                <img
                  src="/icons/Right Arrow.svg"
                  alt=""
                  className={styles.buttonArrowMobile}
                  width={14}
                  height={9}
                  aria-hidden="true"
                />
              )}
            </button>

            {/* I. Security Information Row */}
            <div
              ref={securityMobileRef}
              className={styles.securityRowMobile}
              id="contact-security-row-mobile"
            >
              <img
                src="/icons/Security Shield.svg"
                alt="Security Shield"
                className={styles.securityIconMobile}
                width={15}
                height={15}
              />
              <span className={styles.securityTextMobile}>
                Your information is safe with us.
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
