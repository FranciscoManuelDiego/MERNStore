// Main hooks index - export all custom hooks from here
"use client";

// Authentication hooks
export {
  useAuth,
  useLogin,
  useLogout,
  useRequireAuth
} from './useAuth';

// Cart hooks  
export {
  useCart,
  useCartCalculations,
  useCheckout,
  useCartActions
} from './useCart';

// Product hooks
export {
  useProducts,
  useFilteredProducts,
  useProduct,
  useCategories
} from './useProducts';
