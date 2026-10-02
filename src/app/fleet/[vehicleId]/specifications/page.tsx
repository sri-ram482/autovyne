'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import { FLEET_VEHICLES, FLEET_TEXT_DATA } from '@/components/FleetCarSlider';
import { VEHICLE_SPECIFICATIONS } from '@/data/vehicleSpecs';
import SpecificationBoxes from '@/components/SpecificationBoxes';
import SpecificationRating from '@/components/SpecificationRating';
import SpecificationDescriptionAmenities from '@/components/SpecificationDescriptionAmenities';
import styles from './Specifications.module.css';

export default function VehicleSpecificationsPage() {
  const params = useParams();
  const rawId = (params?.vehicleId as string) || 'vehicle-1';

  // 1. Resolve active vehicle configuration
  const vehicle =
    FLEET_VEHICLES.find(
      (v) =>
        `vehicle-${v.id}` === rawId.toLowerCase() ||
        `${v.id}` === rawId ||
        v.model.toLowerCase().replace(/\s+/g, '-') === rawId.toLowerCase() ||
        v.name.toLowerCase() === rawId.toLowerCase()
    ) || FLEET_VEHICLES[0];

  // 2. Resolve matching typography configuration
  const textData =
    FLEET_TEXT_DATA.find((t) => t.id === vehicle.id) || FLEET_TEXT_DATA[0];

  // 3. Resolve vehicle specifications dataset
  const spec = VEHICLE_SPECIFICATIONS[vehicle.id] || VEHICLE_SPECIFICATIONS[1];

  // 4. Resolve exact supplied vehicle video source
  const videoSrc = `/videos/${vehicle.name}_video.webm`;

  // Refs for video and animated elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLAnchorElement>(null);
  const brandDesktopRef = useRef<HTMLDivElement>(null);
  const modelDesktopRef = useRef<HTMLDivElement>(null);
  const brandMobileRef = useRef<HTMLDivElement>(null);
  const modelMobileRef = useRef<HTMLDivElement>(null);

  const [hasEnded, setHasEnded] = useState<boolean>(false);

  // 4. Reliable Final-Frame Freeze Handlers
  const handleVideoEnded = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      if (v.duration) {
        v.currentTime = v.duration;
      }
    }
    setHasEnded(true);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    // Safety lock: if within 50ms of the end, pause and lock to duration
    if (v.duration && v.currentTime >= v.duration - 0.05 && !v.paused) {
      v.pause();
      v.currentTime = v.duration;
      setHasEnded(true);
    }
  }, []);

  // 5. Autoplay trigger and reset on vehicle change
  useEffect(() => {
    setHasEnded(false);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy fallback: ensure muted and retry
          console.warn('Autoplay fallback to muted:', err);
          v.muted = true;
          v.play().catch((e) => console.error('Play retry error:', e));
        });
      }
    }
  }, [vehicle.id]);

  // 6. Coordinated Entrance Sequence with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step A: Video container subtle reveal with slight scale (0.97 -> 1)
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out', delay: 0.1 }
        );
      }

      // Step B: Back to Fleet button enters
      if (backBtnRef.current) {
        gsap.fromTo(
          backBtnRef.current,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
        );
      }

      // Step C: Brand name appears (fade in + subtle slide down)
      const brandElements = [brandDesktopRef.current, brandMobileRef.current].filter(Boolean);
      if (brandElements.length > 0) {
        gsap.fromTo(
          brandElements,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 }
        );
      }

      // Step D: Model name appears (fade in + subtle slide up)
      const modelElements = [modelDesktopRef.current, modelMobileRef.current].filter(Boolean);
      if (modelElements.length > 0) {
        gsap.fromTo(
          modelElements,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
        );
      }
    });

    return () => ctx.revert();
  }, [vehicle.id]);

  return (
    <main
      className={styles.specificationsRoot}
      id="autovyne-specs-root"
      data-vehicle-id={vehicle.id}
      data-vehicle-model={vehicle.model}
      data-video-ended={hasEnded}
    >
      {/* 1. Global Background (Exact approved 5 gradients) */}
      <Background />

      {/* 2. Route-Aware Navigation Bar */}
      <Navbar />

      {/* 3. Specifications Stage Container */}
      <div className={styles.stageContainer}>
        <div className={styles.stageInner}>
          {/* Back to Fleet Navigation Button (Figma Frame 24 / Frame 29) */}
          <Link
            href={`/fleet?vehicle=${vehicle.id}`}
            className={styles.backButton}
            id="specs-back-to-fleet-btn"
            ref={backBtnRef}
            aria-label="Back to Fleet"
          >
            <img
              src="/icons/Left Arrow.svg"
              alt=""
              className={styles.backArrow}
              width={30}
              height={30}
            />
            <span className={styles.backText}>Back to Fleet</span>
          </Link>

          {/* Typography Layer: Brand & Model positioned BEHIND video (z-index: 2) */}
          <div className={styles.typographyLayer} aria-hidden="false">
            {/* Desktop Typography (>= 768px) */}
            <div className={styles.desktopTypography}>
              {/* Model Name (#5F605F, Poppins ExtraBold 800) */}
              <div
                ref={modelDesktopRef}
                className={styles.modelText}
                id="specs-model-desktop"
                data-text="model"
                style={{
                  left: `${textData.desktop.model.left}px`,
                  top: `${textData.desktop.model.top}px`,
                  width: `${textData.desktop.model.width}px`,
                  height: `${textData.desktop.model.height}px`,
                  fontSize: `${textData.desktop.model.fontSize}px`,
                  lineHeight: `${textData.desktop.model.lineHeight}px`,
                }}
              >
                {textData.modelText}
              </div>

              {/* Brand Name (#CACACA, Poppins ExtraBold 800) */}
              <div
                ref={brandDesktopRef}
                className={styles.brandText}
                id="specs-brand-desktop"
                data-text="brand"
                style={{
                  left: `${textData.desktop.brand.left}px`,
                  top: `${textData.desktop.brand.top}px`,
                  width: `${textData.desktop.brand.width}px`,
                  height: `${textData.desktop.brand.height}px`,
                  fontSize: `${textData.desktop.brand.fontSize}px`,
                  lineHeight: `${textData.desktop.brand.lineHeight}px`,
                }}
              >
                {textData.brandText}
              </div>
            </div>

            {/* Mobile Typography (< 768px) */}
            <div className={styles.mobileTypography}>
              {/* Model Name (#5F605F, Poppins ExtraBold 800) */}
              <div
                ref={modelMobileRef}
                className={styles.modelText}
                id="specs-model-mobile"
                data-text="model"
                style={{
                  left: `${textData.mobile.model.left}px`,
                  top: `${textData.mobile.model.top}px`,
                  width: `${textData.mobile.model.width}px`,
                  height: `${textData.mobile.model.height}px`,
                  fontSize: `${textData.mobile.model.fontSize}px`,
                  lineHeight: `${textData.mobile.model.lineHeight}px`,
                }}
              >
                {textData.modelText}
              </div>

              {/* Brand Name (#CACACA, Poppins ExtraBold 800) */}
              <div
                ref={brandMobileRef}
                className={styles.brandText}
                id="specs-brand-mobile"
                data-text="brand"
                style={{
                  left: `${textData.mobile.brand.left}px`,
                  top: `${textData.mobile.brand.top}px`,
                  width: `${textData.mobile.brand.width}px`,
                  height: `${textData.mobile.brand.height}px`,
                  fontSize: `${textData.mobile.brand.fontSize}px`,
                  lineHeight: `${textData.mobile.brand.lineHeight}px`,
                }}
              >
                {textData.brandText}
              </div>
            </div>
          </div>

          {/* Vehicle Video Container: Positioned OVER typography (z-index: 5) */}
          <div
            ref={videoContainerRef}
            className={styles.videoContainer}
            id="specs-video-container"
          >
            <video
              ref={videoRef}
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
              className={styles.videoElement}
              id="specs-vehicle-video"
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>

          {/* 9 Specification Boxes (Stage 14) */}
          <SpecificationBoxes spec={spec} />

          {/* Rating Layout (Stage 15) */}
          <SpecificationRating ratingData={spec.ratingData} />

          {/* Car Description & 5 Amenities (Stage 15) */}
          <SpecificationDescriptionAmenities
            descriptionWords={spec.descriptionWords}
            amenities={spec.amenities}
          />
        </div>
      </div>
    </main>
  );
}
