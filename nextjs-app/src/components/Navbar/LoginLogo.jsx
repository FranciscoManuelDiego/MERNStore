"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styles } from '../../styles/styleClasses';
import { useAuth } from '../../hooks/useAuth';

export default function LoginLogo() {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    return (
        <div className="relative">
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-black px-4 py-2 font-medium"
            >
                <span>Hola, {user.firstName}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                        href="/profile" 
                        className={`${styles.btnLoginNav} hover:bg-yellow-400 rounded-lg transition-all duration-300 font-medium`}
                    >
                        👤 Mi Perfil
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            setShowDropdown(false);
                            router.push("/");
                        }}
                        className={`${styles.btnLoginNav} w-full hover:bg-red-400 rounded-lg transition-all duration-300 font-medium cursor-pointer`}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    ); 
}

