import React from 'react';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import ExperiencesCar from '@/components/ExperiencesCar';
import ExperiencesTypographySocial from '@/components/ExperiencesTypographySocial';
import ExperiencesStatCards from '@/components/ExperiencesStatCards';
import ExperiencesReviewSlider from '@/components/ExperiencesReviewSlider';
import ExperiencesMobileFooterFeatures from '@/components/ExperiencesMobileFooterFeatures';

export default function ExperiencesPage() {
  return (
    <main
      className="page-root-container"
      id="autovyne-experiences-root"
    >
      {/* 1. Global Background (Exact approved base #08090B + 5 gradients) */}
      <Background />

      {/* 2. Route-Aware Navigation Bar (Experiences active) */}
      <Navbar />

      {/* 3. Experiences Typography & Social Media (Stage Only) */}
      <ExperiencesTypographySocial />

      {/* 4. Experiences Page Car & Wheels Animation (Stage Only) */}
      <ExperiencesCar />

      {/* 5. 3 Glass-Morphism Statistic Cards (Current Stage Only) */}
      <ExperiencesStatCards />

      {/* 6. Ratings Layout & Review Slider (Current Stage Only) */}
      <ExperiencesReviewSlider />

      {/* 7. Mobile Footer Features (Mobile Stage Only) */}
      <ExperiencesMobileFooterFeatures />
    </main>
  );
}
