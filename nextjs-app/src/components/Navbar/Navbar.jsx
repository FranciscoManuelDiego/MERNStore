"use client";
import { useState, useContext  } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path as needed
import { Link } from 'next/navigation'; // Use Link from next/navigation for client-side navigation
import CartWidget from '../CartWidget';
import LoginLogo from './LoginLogo';

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const {user} = useContext(AuthContext);

    return (
        <nav className="bg-white to-yellow-600 shadow-lg border-b-4 border-yellow-400">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-black">
                        <span className="text-3xl">🧉</span>
                        <span className="text-2xl font-bold tracking-wide">Matecitos</span>
                    </Link>
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 relative">
                            {/* Category Links */}
                            <button onClick={() => setShowCategories(!showCategories)}
                            className='text-black px-4 py-2 font-medium'>Categorias 
                            <svg className="w-6 h-6 text-black inline-block ml-1" 
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                            fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" 
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                            </svg>
                            </button>
                            {showCategories && (
                                <div className='absolute left-0 top-full flex flex-col bg-white shadow-lg rounded-lg p-4 space-y-2'>
                                <Link 
                                    to="/categories/mates" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                >
                                    Mates
                                </Link>
                                <Link 
                                    to="/categories/termos" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                >
                                    Termos
                                </Link>
                                </div>
                            )}
                        {/* Login and Register Links */}
                        {user ? (
                            <>
                                <LoginLogo />
                                <Link 
                                    to="/cart" 
                                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <CartWidget/>
                                    <span>Carrito</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Ingresá
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Registrarse
                                </Link>
                                <Link 
                                    to="/cart" 
                                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <CartWidget/>
                                    <span>Carrito</span>
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="black" onClick={() => setShowMenu(!showMenu)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Dropdown Menu */}
                {showMenu && (
                    <div className="flex flex-col md:hidden mt-4 space-y-2">
                            <Link 
                                    to="/categories/mates" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                >
                                    Mates
                            </Link>
                            <Link 
                                    to="/categories/termos" 
                                    className="text-black hover:bg-yellow-400 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                                >
                                    Termos
                            </Link>
                        {user ? (
                            <>
                                <LoginLogo />
                                <Link 
                                    to="/cart" 
                                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <CartWidget/>
                                    <span>Carrito</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Ingresá
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="text-black px-4 py-2 font-medium"
                                >
                                    Registrarse
                                </Link>
                        <Link 
                            to="/cart" 
                            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => setShowMenu(false)}
                        >
                            <CartWidget/>
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

