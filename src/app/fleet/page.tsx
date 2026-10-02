'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import FleetCarSlider from '@/components/FleetCarSlider';

export default function FleetPage() {
  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#08090B',
      }}
      id="autovyne-fleet-root"
    >
      {/* 1. Global Background (Base #08090B + 5 Figma Gradients + background_gradients image treatment) */}
      <Background />

      {/* 2. Route-Aware Navigation Bar (Our Fleet active) */}
      <Navbar />

      {/* 3. Stage 9: Fleet Car Slider + Left/Right Chevron Buttons + Independent Wheels Animation */}
      <FleetCarSlider />
    </main>
  );
}
