"use client";
import { useAuth } from '../hooks/useAuth';
import AuthLoading from './AuthLoading';

export default function AuthWrapper({ children }) {
    const { isInitialized } = useAuth();
    
    if (!isInitialized) {
        return <AuthLoading />;
    }
    
    return children;
}
