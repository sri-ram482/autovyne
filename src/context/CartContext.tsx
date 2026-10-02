'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface CartContextType {
  cartVehicleIds: number[];
  addToCart: (vehicleId: number) => void;
  removeFromCart: (vehicleId: number) => void;
  toggleCart: (vehicleId: number) => void;
  isInCart: (vehicleId: number) => boolean;
  clearCart: () => void;
  isCheckoutSuccess: boolean;
  setIsCheckoutSuccess: (success: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cartVehicleIds, setCartVehicleIds] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);

  // Reset transient checkoutSuccess whenever the user leaves the /cart route
  useEffect(() => {
    if (pathname !== '/cart') {
      setIsCheckoutSuccess(false);
    }
  }, [pathname]);

  const resetBookingData = () => {
    try {
      const defaultBooking = {
        location: 'New York',
        pickupDate: '',
        dropoffDate: '',
        timestamp: Date.now(),
      };
      sessionStorage.setItem('autovyne_booking_data', JSON.stringify(defaultBooking));
      sessionStorage.setItem('autovyne_rental_search', JSON.stringify(defaultBooking));
      localStorage.removeItem('autovyne_booking_data');
      localStorage.removeItem('autovyne_rental_search');
    } catch {
      // ignore
    }
  };

  // Initialize from sessionStorage so cart state persists across navigation
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('autovyne_fleet_cart');
      if (stored) {
        setCartVehicleIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  const saveCart = (ids: number[]) => {
    setCartVehicleIds(ids);
    try {
      sessionStorage.setItem('autovyne_fleet_cart', JSON.stringify(ids));
    } catch {
      // ignore
    }
  };

  const clearCart = () => {
    saveCart([]);
    resetBookingData();
  };

  const addToCart = (vehicleId: number) => {
    setIsCheckoutSuccess(false);
    if (!cartVehicleIds.includes(vehicleId)) {
      saveCart([...cartVehicleIds, vehicleId]);
    }
  };

  const removeFromCart = (vehicleId: number) => {
    const nextIds = cartVehicleIds.filter((id) => id !== vehicleId);
    saveCart(nextIds);
    if (nextIds.length === 0) {
      resetBookingData();
      setIsCheckoutSuccess(false);
    }
  };

  const toggleCart = (vehicleId: number) => {
    if (cartVehicleIds.includes(vehicleId)) {
      removeFromCart(vehicleId);
    } else {
      addToCart(vehicleId);
    }
  };

  const isInCart = (vehicleId: number) => {
    return cartVehicleIds.includes(vehicleId);
  };

  return (
    <CartContext.Provider
      value={{
        cartVehicleIds,
        addToCart,
        removeFromCart,
        toggleCart,
        isInCart,
        clearCart,
        isCheckoutSuccess,
        setIsCheckoutSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
