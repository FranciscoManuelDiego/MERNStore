import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function LoginLogo() {
    const { user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100"
                    >
                        Mi Perfil
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    ); 
}

