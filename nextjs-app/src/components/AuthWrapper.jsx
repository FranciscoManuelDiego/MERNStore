"use client";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthLoading from './AuthLoading';

export default function AuthWrapper({ children }) {
    const { isInitialized } = useContext(AuthContext);
    
    if (!isInitialized) {
        return <AuthLoading />;
    }
    
    return children;
}
