// Custom hooks for authentication
"use client"; // This directive ensures client-side execution

import { useState, useEffect, useContext } from 'react';
import api from '../app/lib//api';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

// Hook for authentication logic
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Hook for login functionality
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const loginUser = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(credentials);
      router.push('/');
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};

// Hook for logout functionality
export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true });
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state
      logout();
      router.push('/');
    }
  };

  return { logoutUser };
};

// Hook for protected routes
export const useRequireAuth = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return user;
};
