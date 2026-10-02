import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUTOVYNE — Drive A Higher Standard | Luxury Car Rentals',
  description: 'Iconic cars, Unforgettable journeys. Experience New York with unmatched style, freedom and performance. From the city\'s dazzling skyline to its legendary streets.',
  keywords: ['luxury car rental', 'AUTOVYNE', 'premium car hire', 'supercar rental New York', 'exotic car rental'],
  authors: [{ name: 'AUTOVYNE' }],
  openGraph: {
    title: 'AUTOVYNE — Drive A Higher Standard',
    description: 'Iconic cars, Unforgettable journeys. Experience New York with unmatched style, freedom and performance.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/Shopping Cart.svg" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
