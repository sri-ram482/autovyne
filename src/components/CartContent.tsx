'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import CartTypography from '@/components/CartTypography';
import EmptyCartCard from '@/components/EmptyCartCard';
import CheckoutSuccessCard from '@/components/CheckoutSuccessCard';
import CartItemsLayout from '@/components/CartItemsLayout';

export default function CartContent() {
  const { cartVehicleIds, isCheckoutSuccess } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // 1. If checkout just completed successfully, show approved success state
  if (isCheckoutSuccess) {
    return <CheckoutSuccessCard />;
  }

  // 2. If cart is empty, show approved empty cart state
  if (cartVehicleIds.length === 0) {
    return <EmptyCartCard />;
  }

  // 3. Otherwise show cart typography & items
  return (
    <>
      <CartTypography />
      <CartItemsLayout />
    </>
  );
}
