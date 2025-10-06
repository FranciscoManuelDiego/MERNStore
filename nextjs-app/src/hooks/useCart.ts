// Custom hooks for cart functionality
"use client";

import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../app/lib/api';
// Hook for cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// Hook for cart calculations
export const useCartCalculations = () => {
  const { cart } = useCart();
  const [totals, setTotals] = useState({
    itemCount: 0,
    totalPrice: 0,
    totalItems: 0
  });

  useEffect(() => {
    const itemCount = cart.length;
    const totalItems = cart.reduce((total: number, item: { quantity: number }) => total + (item.quantity || 0), 0);
    const totalPrice = cart.reduce((total: number, item: { price: number; quantity: number }) => total + ((item.price || 0) * (item.quantity || 0)), 0);

    setTotals({
      itemCount,
      totalPrice,
      totalItems
    });
  }, [cart]);

  return totals;
};

// Hook for checkout process
export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, cleanCart } = useCart();

  const createOrder = async () => {
    if (cart.length === 0) return false;

    setIsProcessing(true);
    setError(null);
    
    try {
      const orderData = {
        items: cart.map((item: any) => ({
          productId: item._id || item.productId,
          name: item.id,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
          price: item.price
        })),
        total: cart.reduce((total: number, item: { price: number; quantity: number }) => total + (item.price * item.quantity), 0),
        address: cart.user.address // <-- Add this line if not present
      };
      
      const response = await api.post(
        '/api/orders', 
        orderData,
        { withCredentials: true }
      );
      
      if (response.status === 201) {
        cleanCart();
        setOrderComplete(true);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar la orden');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCheckout = () => {
    setOrderComplete(false);
    setError(null);
  };

  return { 
    createOrder, 
    isProcessing, 
    orderComplete, 
    error,
    resetCheckout 
  };
};

// Hook for cart item management
export const useCartActions = () => {
  const { addItem, removeProduct, cleanCart } = useCart();

  const addToCart = (product: any, quantity: number = 1) => {
    addItem(product, quantity);
  };

  const removeFromCart = (productId: string) => {
    removeProduct(productId);
  };

  const clearCart = () => {
    cleanCart();
  };

  return {
    addToCart,
    removeFromCart,
    clearCart
  };
};
