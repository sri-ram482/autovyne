import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import CartContent from '@/components/CartContent';

export const metadata: Metadata = {
  title: 'Your Cart — AUTOVYNE | Luxury Car Rentals',
  description: 'Review your selection and complete your luxury car rental booking with AUTOVYNE.',
};

export default function CartPage() {
  return (
    <main
      className="page-root-container"
      id="autovyne-cart-root"
    >
      {/* 1. Global Background (Exact approved base #08090B + 5 gradients) */}
      <Background />

      {/* 2. Route-Aware Navigation Bar (Cart indicator & navigation) */}
      <Navbar />

      {/* 3. Conditional Cart Content (Empty State Glass Box vs Non-Empty Cart Text) */}
      <CartContent />
    </main>
  );
}
