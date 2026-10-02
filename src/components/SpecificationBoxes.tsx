'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { VehicleSpecification } from '@/data/vehicleSpecs';
import styles from './SpecificationBoxes.module.css';

interface SpecificationBoxesProps {
  spec: VehicleSpecification;
}

export default function SpecificationBoxes({ spec }: SpecificationBoxesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedRatio, setAnimatedRatio] = useState<number>(0);

  // Reference maximum range for progress computation (e.g. 500 miles reference)
  const targetRatio = Math.min(Math.max(spec.range / 500, 0), 1);

  // Desktop Arc geometry: radius = 38, circumference = 2 * PI * 38 = 238.76
  const desktopR = 38;
  const desktopC = 2 * Math.PI * desktopR; // ~238.76
  const desktopArcLength = desktopC * 0.75; // 270 degrees = ~179.07
  const desktopDashOffset = desktopArcLength * (1 - animatedRatio);

  // Animate range progress smoothly on mount and vehicle change
  useEffect(() => {
    const obj = { val: animatedRatio };
    const tween = gsap.to(obj, {
      val: targetRatio,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.25,
      onUpdate: () => {
        setAnimatedRatio(obj.val);
      },
    });

    return () => {
      tween.kill();
    };
  }, [spec.range, targetRatio]);

  // Coordinated Entrance Animation with subtle stagger
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Left Cluster Boxes (slide subtly from left)
      const leftBoxes = containerRef.current?.querySelectorAll('[data-box-side="left"]');
      if (leftBoxes && leftBoxes.length > 0) {
        gsap.fromTo(
          leftBoxes,
          { opacity: 0, x: -16, y: 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }

      // 2. Right Cluster Boxes (slide subtly from right)
      const rightBoxes = containerRef.current?.querySelectorAll('[data-box-side="right"]');
      if (rightBoxes && rightBoxes.length > 0) {
        gsap.fromTo(
          rightBoxes,
          { opacity: 0, x: 16, y: 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.28,
          }
        );
      }

      // 3. Box 9 Dividers - reveal cleanly
      const dividers = containerRef.current?.querySelectorAll('[data-box-divider="true"]');
      if (dividers && dividers.length > 0) {
        gsap.fromTo(
          dividers,
          { opacity: 0, scaleY: 0 },
          {
            opacity: 0.8,
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [spec.id]);

  return (
    <div ref={containerRef} className={styles.boxesContainer} id="autovyne-specs-boxes">
      {/* ========================================================
          DESKTOP SPECIFICATION BOXES (>= 768px, 1440x900 canvas)
          ======================================================== */}
      <div className={styles.desktopBoxesLayer} aria-hidden="false">
        {/* BOX 1: RANGE / FUEL */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxRangeDesktop}`}
          id="spec-box-range-desktop"
          data-box-side="left"
        >
          <div className={styles.rangeTitleDesktop}>Range / Fuel</div>
          <div className={styles.rangeCircleContainerDesktop}>
            <svg
              className={styles.rangeSvgDesktop}
              viewBox="0 0 103 98"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dark Outer Track Circle (#171717) - Full Complete Circle */}
              <circle
                cx="51.5"
                cy="49"
                r={desktopR}
                className={styles.rangeTrack}
              />
              {/* Orange Inner Progress Arc (#FFAE00) */}
              <circle
                cx="51.5"
                cy="49"
                r={desktopR}
                className={styles.rangeProgress}
                strokeDasharray={`${desktopArcLength} ${desktopC}`}
                strokeDashoffset={desktopDashOffset}
                transform="rotate(135 51.5 49)"
              />
            </svg>
            <div className={styles.rangeCenterContentDesktop}>
              <img
                src="/icons/Gas Station.svg"
                alt=""
                className={styles.gasIconCenterDesktop}
                width={16}
                height={16}
              />
              <div className={styles.rangeMilesColDesktop}>
                <span className={styles.rangeMilesNumberDesktop}>{spec.range}</span>
                <span className={styles.rangeMilesUnitDesktop}>Miles</span>
              </div>
              <div className={styles.rangeMpgDesktop}>{spec.mpg} MPG</div>
            </div>
          </div>
        </div>

        {/* BOX 2: CAR STORY */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxStoryDesktop}`}
          id="spec-box-story-desktop"
          data-box-side="left"
        >
          <p className={styles.storyTextDesktop}>{spec.story}</p>
        </div>

        {/* BOX 3: MAX SPEED */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxSpeedDesktop}`}
          id="spec-box-speed-desktop"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Speedometer_yellow.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Max{'\n'}Speed</div>
          </div>
          <div className={styles.speedValueColDesktop}>
            <span className={styles.speedNumberDesktop}>{spec.maxSpeed}</span>
            <span className={styles.speedUnitDesktop}>HP</span>
          </div>
        </div>

        {/* BOX 4: TRANSMISSION */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxTransmissionDesktop}`}
          id="spec-box-transmission-desktop"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Gears.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Transmission</div>
          </div>
          <div className={styles.transmissionValueDesktop}>{spec.transmission}</div>
        </div>

        {/* BOX 5: MILEAGE */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxMileageDesktop}`}
          id="spec-box-mileage-desktop"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Road.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Mileage</div>
          </div>
          <div className={styles.mileageValueColDesktop}>
            <span className={styles.mileageNumberDesktop}>{spec.mileage}</span>
            <span className={styles.mileageUnitDesktop}>Miles</span>
          </div>
        </div>

        {/* BOX 6: EXTERIOR COLOR */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxColorDesktop}`}
          id="spec-box-color-desktop"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Fill Color.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Exterior Color</div>
          </div>
          <div className={styles.colorValueDesktop}>{spec.exteriorColor}</div>
        </div>

        {/* BOX 7: CONDITION */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxConditionDesktop}`}
          id="spec-box-condition-desktop"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Guarantee.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Condition</div>
          </div>
          <div className={styles.conditionValueDesktop}>{spec.condition}</div>
        </div>

        {/* BOX 8: DRIVE TRAIN */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxDriveTrainDesktop}`}
          id="spec-box-drivetrain-desktop"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowDesktop}>
            <img
              src="/icons/Gearbox.svg"
              alt=""
              className={styles.boxIconDesktop}
              width={30}
              height={30}
            />
            <div className={styles.labelDesktop}>Drive{'\n'}Train</div>
          </div>
          <div className={styles.driveTrainValueDesktop}>{spec.driveTrain}</div>
        </div>

        {/* BOX 9: ENGINE + FUEL */}
        <div
          className={`${styles.glassBoxDesktop} ${styles.boxEngineFuelDesktop}`}
          id="spec-box-enginefuel-desktop"
          data-box-side="right"
        >
          {/* Left Section: Engine */}
          <div className={styles.engineSectionDesktop}>
            <div className={styles.boxHeaderRowDesktop}>
              <img
                src="/icons/Engine.svg"
                alt=""
                className={styles.boxIconDesktop}
                width={30}
                height={30}
              />
              <div className={styles.labelDesktop}>Engine</div>
            </div>
            <div className={styles.engineValueDesktop}>
              <span className={styles.engineNumericDesktop}>
                {spec.engine.numeric}
              </span>
              <span className={styles.engineSuffixDesktop}>
                {spec.engine.suffix}
              </span>
            </div>
          </div>

          {/* Vertical Divider Line (#979897) */}
          <div
            className={styles.dividerDesktop}
            data-box-divider="true"
            aria-hidden="true"
          />

          {/* Right Section: Fuel */}
          <div className={styles.fuelSectionDesktop}>
            <div className={styles.boxHeaderRowDesktop}>
              <img
                src="/icons/Gas Station_yellow.svg"
                alt=""
                className={styles.boxIconDesktop}
                width={30}
                height={30}
              />
              <div className={styles.labelDesktop}>Fuel</div>
            </div>
            <div className={styles.fuelValueDesktop}>{spec.fuel}</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE SPECIFICATION BOXES (< 768px, 390x844 canvas)
          (Range/Fuel box removed per user requirement)
          ======================================================== */}
      <div className={styles.mobileBoxesLayer} aria-hidden="true">
        {/* BOX 2: CAR STORY (Figma 219:307) */}
        <div
          className={styles.boxStoryMobile}
          id="spec-box-story-mobile"
          data-box-side="left"
        >
          <p className={styles.storyTextMobile}>{spec.storyMobile}</p>
        </div>

        {/* BOX 3: MAX SPEED */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxSpeedMobile}`}
          id="spec-box-speed-mobile"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Speedometer_yellow.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Max{'\n'}Speed</div>
          </div>
          <div className={styles.speedValueColMobile}>
            <span className={styles.speedNumberMobile}>{spec.maxSpeed}</span>
            <span className={styles.speedUnitMobile}>HP</span>
          </div>
        </div>

        {/* BOX 4: TRANSMISSION */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxTransmissionMobile}`}
          id="spec-box-transmission-mobile"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Gears.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Transmission</div>
          </div>
          <div className={styles.transmissionValueMobile}>{spec.transmission}</div>
        </div>

        {/* BOX 5: MILEAGE */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxMileageMobile}`}
          id="spec-box-mileage-mobile"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Road.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Mileage</div>
          </div>
          <div className={styles.mileageValueColMobile}>
            <span className={styles.mileageNumberMobile}>{spec.mileage}</span>
            <span className={styles.mileageUnitMobile}>Miles</span>
          </div>
        </div>

        {/* BOX 6: EXTERIOR COLOR */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxColorMobile}`}
          id="spec-box-color-mobile"
          data-box-side="right"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Fill Color.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Exterior Color</div>
          </div>
          <div className={styles.colorValueMobile}>{spec.exteriorColor}</div>
        </div>

        {/* BOX 7: CONDITION */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxConditionMobile}`}
          id="spec-box-condition-mobile"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Guarantee.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Condition</div>
          </div>
          <div className={styles.conditionValueMobile}>{spec.condition}</div>
        </div>

        {/* BOX 8: DRIVE TRAIN */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxDriveTrainMobile}`}
          id="spec-box-drivetrain-mobile"
          data-box-side="left"
        >
          <div className={styles.boxHeaderRowMobile}>
            <img
              src="/icons/Gearbox.svg"
              alt=""
              className={styles.boxIconMobile}
              width={15}
              height={15}
            />
            <div className={styles.labelMobile}>Drive{'\n'}Train</div>
          </div>
          <div className={styles.driveTrainValueMobile}>{spec.driveTrain}</div>
        </div>

        {/* BOX 9: ENGINE + FUEL */}
        <div
          className={`${styles.glassBoxMobile} ${styles.boxEngineFuelMobile}`}
          id="spec-box-enginefuel-mobile"
          data-box-side="right"
        >
          {/* Top Section: Engine */}
          <div className={styles.engineSectionMobile}>
            <div className={styles.boxHeaderRowMobile}>
              <img
                src="/icons/Engine.svg"
                alt=""
                className={styles.boxIconMobile}
                width={15}
                height={15}
              />
              <div className={styles.labelMobile}>Engine</div>
            </div>
            <div style={{ marginTop: '4px', width: '100%', textAlign: 'center' }}>
              <div className={styles.engineNumericMobile}>
                {spec.engine.numeric}
              </div>
              <div className={styles.engineSuffixMobile}>
                {spec.engine.suffix}
              </div>
            </div>
          </div>

          {/* Horizontal Divider Line (#979897) */}
          <div
            className={styles.dividerMobile}
            data-box-divider="true"
            aria-hidden="true"
          />

          {/* Bottom Section: Fuel */}
          <div className={styles.fuelSectionMobile}>
            <div className={styles.boxHeaderRowMobile}>
              <img
                src="/icons/Gas Station_yellow.svg"
                alt=""
                className={styles.boxIconMobile}
                width={15}
                height={15}
              />
              <div className={styles.labelMobile}>Fuel</div>
            </div>
            <div className={styles.fuelValueMobile}>{spec.fuel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
