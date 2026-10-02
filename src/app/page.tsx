import React from 'react';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import HeroCar from '@/components/HeroCar';
import HeroTypography from '@/components/HeroTypography';
import RentalSearchLayout from '@/components/RentalSearchLayout';
import FooterFeatures from '@/components/FooterFeatures';

export default function Home() {
  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#08090B',
      }}
      id="autovyne-root"
    >
      {/* 1. BACKGROUND (Base #08090B + 5 Figma Gradients + background_gradients image treatment) */}
      <Background />

      {/* 2. STAGE 2: HOME HERO CAR & INDEPENDENT WHEELS ANIMATION */}
      <HeroCar />

      {/* 3. STAGES 3 & 4: HOME HERO TYPOGRAPHY, CTA, FOLLOW THE JOURNEY & SOCIAL ICONS */}
      <HeroTypography />

      {/* 4. STAGE 5: RENTAL SEARCH LAYOUT (Location, Pick-up, Drop-off, Submit) */}
      <RentalSearchLayout />

      {/* 5. STAGE 6: FOOTER FEATURES (Premium Fleet, Secure Booking, 24/7 Support, Multiple Locations) */}
      <FooterFeatures />

      {/* 6. NAVIGATION BAR (Desktop & Mobile per Figma specifications) */}
      <Navbar />
    </main>
  );
}
