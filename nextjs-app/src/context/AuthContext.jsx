"use client";
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user")
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [profile, setProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }else{
            localStorage.removeItem("user");
        }
    }, [user]);

     const login = async (credentials) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
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

            }
        } catch (error) {
            console.error('Error during logout:', error);
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
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
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
        }}>
            {children}
        </AuthContext.Provider>
    );
};
