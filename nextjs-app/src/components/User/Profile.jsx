"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { styles } from '../../styles/styleClasses';
import { useAuth } from '../../hooks/useAuth';
import { profileUpdateSchemas, createEmailUpdateSchema } from '../../utils/validationSchemas';

export default function Profile() {
    const { user, profile, isLoadingProfile, refreshProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Debug: Check if styles are imported correctly
    //console.log('Styles object:', styles);
    //console.log('inputProfile class:', styles.inputProfile);

    useEffect(() => {
        if (profile) {
            setAddressForm({ address: profile.address || '' });
            setPhoneForm({ phone: profile.phone || '' });
        }
    }, [profile]);

    // Form states (keeping only address and phone for now)
    const [addressForm, setAddressForm] = useState({ address: profile?.address || '' });
    const [phoneForm, setPhoneForm] = useState({ phone: profile?.phonenumber || '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if(!user) {
        return <div className="container mx-auto px-6 py-4">Por favor, inicie sesión para ver su perfil.</div>
    }

    const handleAddressUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        try {
            const response = await fetch("http://localhost:3000/api/auth/profile/address", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ address: addressForm.address })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ type: 'success', text: data.message || 'Dirección actualizada correctamente' });
                await refreshProfile();
            } else {
                setMessage({ type: 'error', text: data.error || 'Error al actualizar la dirección' });
            }
        } catch (error) {
            console.error("Address update error:", error);
            setMessage({ 
                type: 'error', 
                text: 'Error al actualizar dirección'
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
            const response = await fetch("/api/auth/profile/phone", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ phone: phoneForm.phone })

            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ type: 'success', text: data.message || 'Teléfono actualizado correctamente' });
                await refreshProfile();
            } else {
                setMessage({ type: 'error', text: data.error || 'Error al actualizar teléfono' });
            }
        } catch (error) {
            console.error("Phone update error:", error);
            setMessage({ 
                type: 'error', 
                text: 'Error de conexión'
            });
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <section className="flex justify-center items-center ">
            <div className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[400px]">
            <h1 className={`${styles.formH1}`}>Mi Perfil</h1>
            {/* Tabs */}
                <div className="flex flex-wrap mb-6 border-b gap-2">
                    <button 
                        className={`${styles.subtitleProfile} py-2 px-2 sm:px-4 text-sm sm:text-base ${activeTab === 'profile' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Perfil
                    </button>
                    <button 
                        className={`${styles.subtitleProfile} py-2 px-2 sm:px-4 text-sm sm:text-base ${activeTab === 'address' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('address')}
                    >
                        Dirección
                    </button>
                    <button 
                        className={`${styles.subtitleProfile} py-2 px-2 sm:px-4 text-sm sm:text-base ${activeTab === 'password' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        Contraseña
                    </button>
                    <button 
                        className={`${styles.subtitleProfile} py-2 px-2 sm:px-4 text-sm sm:text-base ${activeTab === 'email' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
                        onClick={() => setActiveTab('email')}
                    >
                        Email
                    </button>
                    <button 
                        className={`${styles.subtitleProfile} py-2 px-2 sm:px-4 text-sm sm:text-base ${activeTab === 'phone' ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
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
                            <h2 className={styles.profileTexting}>{profile.firstName} {profile.surname}</h2>
                            <p className={styles.profileTexting}>Email: {profile.email}</p>
                            <p className={styles.profileTexting}>Dirección: {profile.address || 'No registrada'}</p>
                            <p className={styles.profileTexting}>Teléfono: {profile.phonenumber || 'No registrado'}</p>
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
                                placeholder="Ingresa tu dirección completa"
                                className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.btnProfile}`}
                        >
                            {isSubmitting ? 'Actualizando...' : 'Actualizar Dirección'}
                        </button>
                    </form>
                )}
                {/* Password Form */}
                {activeTab === 'password' && (
                    <Formik
                        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={profileUpdateSchemas.password}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setMessage({ type: '', text: '' });
                            try {
                                const response = await axios.put(
                                    "http://localhost:3000/api/auth/profile/password",
                                    {
                                        currentPassword: values.currentPassword,
                                        newPassword: values.newPassword
                                    },
                                    { withCredentials: true }
                                );
                                
                                if (response.status === 200) {
                                    setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
                                    resetForm();
                                } else {
                                    setMessage({ type: 'error', text: response.data.message || 'Error al actualizar contraseña' });
                                }
                            } catch (error) {
                                setMessage({ type: 'error', text: 'Error al actualizar contraseña' });
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                                    <Field
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Ingresa tu contraseña actual"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <ErrorMessage name="currentPassword" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                    <Field
                                        type="password"
                                        name="newPassword"
                                        placeholder="Ingresa tu nueva contraseña (mínimo 4 caracteres)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <ErrorMessage name="newPassword" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirma tu nueva contraseña"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <ErrorMessage name="confirmPassword" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={styles.btnProfile}
                                >
                                    {isSubmitting ? 'Actualizando...' : 'Cambiar Contraseña'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
                {/* Email Form */}
                {activeTab === 'email' && (
                    <Formik
                        initialValues={{ email: profile?.email || '' }}
                        validationSchema={createEmailUpdateSchema(profile?.email)}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            setMessage({ type: '', text: '' });
                            try {
                                const response = await axios.put(
                                    "http://localhost:3000/api/auth/profile/email",
                                    { email: values.email },
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
                                if (error.response?.data?.message?.includes('email')) {
                                    setFieldError('email', 'Este email ya está registrado');
                                } else {
                                    setMessage({ 
                                        type: 'error', 
                                        text: error.response?.data?.message || 'Error de conexión'
                                    });
                                }
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Email</label>
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="ejemplo@email.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <ErrorMessage name="email" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${styles.btnProfile}`}
                                >
                                    {isSubmitting ? 'Actualizando...' : 'Cambiar Email'}
                                </button>
                            </Form>
                        )}
                    </Formik>
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
                                placeholder="+54 11 1234-5678"
                                className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-700 text-black focus:ring-2 focus:ring-yellow-500"}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.btnProfile}`}
                        >
                            {isSubmitting ? 'Actualizando...' : 'Cambiar Teléfono'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );


}