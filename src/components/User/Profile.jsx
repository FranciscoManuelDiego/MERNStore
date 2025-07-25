import {AuthContext} from '../../context/AuthContext';
import axios  from 'axios';
import { useContext, useState, useEffect } from 'react';

export default function Profile() {
    const { user, profile, isLoadingProfile, refreshProfile } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (profile) {
            setAddressForm({ address: profile.address || '' });
            setEmailForm({ email: profile.email || '' });
            setPhoneForm({ phone: profile.phone || '' });
        }
    }, [profile]);

    // Form states
    const [addressForm, setAddressForm] = useState({ address: profile?.address || '' });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [emailForm, setEmailForm] = useState({ email: profile?.email || '' });
    const [phoneForm, setPhoneForm] = useState({ phone: profile?.phone || '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if(!user) {
        return <div className="container mx-auto px-6 py-4">Por favor, inicie sesión para ver su perfil.</div>
    }
    const handleAddressUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        // Log what we're sending
        console.log("Attempting to update address with:", addressForm);
        
        try {
            const response = await axios.put(
                "http://localhost:3000/api/auth/profile/address",
                { address: addressForm.address },
                { withCredentials: true }
            );
            
            // Log the response
            console.log("Address update response:", response);
            
            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Dirección actualizada correctamente' });
                console.log("Refreshing profile...");
                await refreshProfile();
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Error al actualizar dirección' });
            }
        } catch (error) {
            console.error("Address update error:", error.response || error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Error al actualizar dirección'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
        const response = await axios.put(
            "http://localhost:3000/api/auth/profile/password",
            {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            },
            { withCredentials: true }
        );
        
        if (response.status === 200) {
            setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setMessage({ type: 'error', text: response.data.message || 'Error al actualizar contraseña' });
        }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while updating password.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
    try {
        const response = await axios.put(
            "http://localhost:3000/api/auth/profile/email",
            { email: emailForm.email },
            { withCredentials: true }
        );
        
        if (response.status === 200) {
            setMessage({ type: 'success', text: 'Email actualizado correctamente' });
            refreshProfile();
        } else {
            setMessage({ type: 'error', text: response.data.message || 'Error al actualizar email' });
        }
    } catch (error) {
        console.error("Email update error:", error);
        setMessage({ 
            type: 'error', 
            text: error.response?.data?.message || 'Error de conexión'
        });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneChange = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        try {
            const response = await axios.put(
                "http://localhost:3000/api/auth/profile/phone",
                { phone: phoneForm.phone },
                { withCredentials: true }
            );
            
            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Teléfono actualizado correctamente' });
                refreshProfile();
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Error al actualizar teléfono' });
            }
        } catch (error) {
            console.error("Phone update error:", error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Error de conexión'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="flex justify-center items-center ">
            <div className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]">
            <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
            {/* Tabs */}
                <div className="flex mb-6 border-b">
                    <button 
                        className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Perfil
                    </button>
                    <button 
                        className={`py-2 px-4 ${activeTab === 'address' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('address')}
                    >
                        Dirección
                    </button>
                    <button 
                        className={`py-2 px-4 ${activeTab === 'password' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        Contraseña
                    </button>
                    <button 
                        className={`py-2 px-4 ${activeTab === 'email' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('email')}
                    >
                        Email
                    </button>
                    <button 
                        className={`py-2 px-4 ${activeTab === 'phone' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('phone')}
                    >
                        Teléfono
                    </button>
                </div>
                {/* Status Message */}
                {message.text && (
                    <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
                {/* Profile Info */}
                {activeTab === 'profile' && (
                    isLoadingProfile ? (
                       <p>Cargando...</p>
                    ) : profile ? (
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-2">{profile.firstName} {profile.surname}</h2>
                            <p className="mb-2">Email: {profile.email}</p>
                            <p className="mb-2">Dirección: {profile.address || 'No registrada'}</p>
                            <p className="mb-2">Teléfono: {profile.phone || 'No registrado'}</p>
                        </div>
                    ) :  <p>Cargando...</p>
                )}
                {/* Address Form */}
                {activeTab === 'address' && (
                    <form onSubmit={handleAddressUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                            <input
                                type="text"
                                value={addressForm.address}
                                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Actualizar Dirección'}
                        </button>
                    </form>
                )}
                {/* Password Form */}
                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                            <input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                                minLength="6"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                                minLength="6"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Cambiar Contraseña'}
                        </button>
                    </form>
                )}
                {/* Email Form */}
                {activeTab === 'email' && (
                    <form onSubmit={handleEmailChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Email</label>
                            <input
                                type="email"
                                value={emailForm.email}
                                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Cambiar Email'}
                        </button>
                        
                    </form>
                )}
                {/* Phone Number Form */}
                {activeTab === 'phone' && (
                    <form onSubmit={handlePhoneChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Teléfono</label>
                            <input
                                type="text"
                                value={phoneForm.phone}
                                onChange={(e) => setPhoneForm({ ...phoneForm, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Cambiar Teléfono'}
                        </button>
                        
                    </form>
                )}
            </div>
        </section>
    );


}