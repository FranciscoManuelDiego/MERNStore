"use client";
import { useState } from 'react';
import Link from 'next/link'; // Use Link from next/link for Next.js navigation
import LoginLogo from './LoginLogo';
import SearchBar from "../SearchBar/SearchBar"
import { styles } from '../../styles/styleClasses';
import { useAuth } from '../../hooks/useAuth';
import CartWidget from '../CartWidget';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const { user } = useAuth();

    return (
        <nav className="bg-white to-yellow-600 shadow-lg border-b-4 border-yellow-400 ">
            <div className={styles.navContainer}>
                <div className={`${styles.navHeader}`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 text-black ml-4">
                        <span className="text-3xl">🧉</span>
                        <span className="text-2xl font-bold tracking-wide">Matecitos</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-2 gap-4 relative">
                        {/*Search Bar component */}
                        <SearchBar />
                         {/* Category Links */}
                        <div 
                        className="hidden md:flex items-center gap-6 relative"
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}>
                            <button className={styles.btnNav}>Categorias
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showCategories && (
                                <div className={styles.dropdownMenu}>
                                <Link 
                                    href="/categories/mates" 
                                    className={styles.btnCategory}
                                >
                                    Mates
                                </Link>
                                <Link 
                                    href="/categories/termos" 
                                    className={styles.btnCategory}
                                >
                                    Termos
                                </Link>
                                </div>
                            )}
                        </div>
                        {/* Login and Register Links */}
                        <div className="hidden md:flex items-center space-x-4">
                        {user  ? (
                            <div className='flex items-center space-x-4'>
                                <div className='relative'>
                                    <LoginLogo />
                                </div>
                                <Link 
                                    href="/Cart" 
                                    className={styles.btnPrimary}
                                >
                                    <CartWidget />
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <Link 
                                    href="/login" 
                                    className={styles.btnNav}
                                >
                                    Ingresá
                                </Link>
                                <Link 
                                    href="/register" 
                                    className={styles.btnNav}
                                >
                                    Registrarse
                                </Link>
                                <Link 
                                    href="/Cart" 
                                    className={styles.btnPrimary}
                                >
                                    <CartWidget />
                                </Link>
                            </div>
                        )}
                        </div>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-black" onClick={() => setShowMenu(!showMenu)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Dropdown Menu */}
                {showMenu && (
                    <div className="flex flex-col md:hidden mt-4 space-y-2">
                            <SearchBar />
                            <Link 
                                    href="/categories/mates" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Mates
                            </Link>
                            <Link 
                                    href="/categories/termos" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Termos
                            </Link>
                        {user ? (
                            <>
                                <LoginLogo />
                                <Link 
                                    href="/Cart" 
                                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <CartWidget />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    href="/login" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Ingresá
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Registrarse
                                </Link>
                        <Link 
                            href="/Cart" 
                            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => setShowMenu(false)}
                        >
                            <span>Carrito</span>
                        </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

