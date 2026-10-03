import React from 'react';
import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import ContactCar from '@/components/ContactCar';
import ContactTypographySocial from '@/components/ContactTypographySocial';
import ContactCards from '@/components/ContactCards';
import ContactForm from '@/components/ContactForm';
import ContactLocation from '@/components/ContactLocation';

export default function ContactPage() {
  return (
    <main
      className="page-root-container"
      id="autovyne-contact-root"
    >
      {/* 1. Global Background (Exact approved base #08090B + 5 gradients) */}
      <Background />

      {/* 2. Route-Aware Navigation Bar (Contact active) */}
      <Navbar />

      {/* 3. Contact Typography & Social Media (Stage Only) */}
      <ContactTypographySocial />

      {/* 4. 4 Glass-Morphism Contact Cards & 2 Decorative Lines (Behind Car) */}
      <ContactCards />

      {/* 5. Contact Page Car & Wheels Animation */}
      <ContactCar />

      {/* 6. Contact Form (Stage Only) */}
      <ContactForm />

      {/* 7. Our Location & Get Directions (Stage Only) */}
      <ContactLocation />
    </main>
  );
}
