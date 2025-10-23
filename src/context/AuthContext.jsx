"use client";
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize user from localStorage on client-side only
    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/validate', {
                    method: 'GET',
                    credentials: 'include',
                });
                return response.ok;
            } catch (error) {
                console.error('Error validating session:', error);
                return false;
            }
        };

        const fetchProfileData = async () => {
            setIsLoadingProfile(true);
            try {
                const response = await fetch('http://localhost:3000/api/auth/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                    return true;
                } else {
                    setProfile(null);
                    return false;
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setProfile(null);
                return false;
            } finally {
                setIsLoadingProfile(false);
            }
        };

        const initializeAuth = async () => {
            if (typeof window !== 'undefined') {
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    try {
                        const parsedUser = JSON.parse(savedUser);
                        
                        // Validate the session with the server
                        const isValid = await validateSession();
                        if (isValid) {
                            setUser(parsedUser);
                            // Fetch fresh profile data
                            await fetchProfileData();
                        } else {
                            // Clear invalid session
                            localStorage.removeItem("user");
                            setUser(null);
                        }
                    } catch (error) {
                        console.error('Error parsing saved user:', error);
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                }
            }
            setIsInitialized(true);
        };
        
        initializeAuth();
    }, []);

    const [profile, setProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && isInitialized) {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        }
    }, [user, isInitialized]);

     const login = async (credentials) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.user) {
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };
    
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setUser(null);
                setProfile(null);
                // Clear localStorage on logout
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("user");
                }
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const fetchProfileData = async () => {
        setIsLoadingProfile(true);
        try {
            const response = await fetch('/api/auth/profile', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                return true;
            } else {
                setProfile(null);
                return false;
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
            return false;
        } finally {
            setIsLoadingProfile(false);
        }
    };

    useEffect(() => {
        if(user){
            fetchProfileData();
        } else {
            setProfile(null);
        }
    }, [user]);


    return (
        <AuthContext.Provider value={{ 
            user,
            login,
            logout,
            profile,
            isLoadingProfile,
            refreshProfile: fetchProfileData,
            isInitialized, // Add this so components know when auth is ready
        }}>
            {children}
        </AuthContext.Provider>
    );
};
