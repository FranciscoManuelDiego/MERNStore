"use client"
import axios from 'axios';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { styles } from '../../styles/styleClasses';
import { useArgentinaLocations } from '../../hooks/useArgentinaLocations';
import { useAuth } from '../../hooks/useAuth';
import { profileUpdateSchemas, createEmailUpdateSchema } from '../../utils/validationSchemas';

export default function Profile() {
    const { user, profile, isLoadingProfile, refreshProfile } = useAuth();
    const { provinces, cities, loading, error, fetchCitiesByProvince } = useArgentinaLocations();
    const [activeTab, setActiveTab] = useState('profile');
    const [message, setMessage] = useState({ type: '', text: '' });

    if(!user) {
        return <div className="container mx-auto px-6 py-4">Por favor, inicie sesión para ver su perfil.</div>
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
                            <p className={styles.profileTexting}>Dirección: {' '}
                            {(profile.province && profile.city && profile.streetAddress) ? 
                            `${profile.province}, ${profile.city}, ${profile.streetAddress}` : 'No registrada'}</p>
                            <p className={styles.profileTexting}>Teléfono: {profile.phonenumber || 'No registrado'}</p>
                        </div>
                    ) :  <p>Cargando...</p>
                )}
                {/* Address Form */}
                {activeTab === 'address' && (
                    <Formik
                        initialValues={{ 
                            streetAddress: profile?.streetAddress || '',
                            province: profile?.province || '',
                            city: profile?.city || ''
                        }}
                        validationSchema={profileUpdateSchemas.address}
                        onSubmit={async (values, { setSubmitting }) => {
                            setMessage({ type: '', text: '' });
                            try {
                                const response = await axios.put(
                                    "/api/auth/profile/address",
                                    { address: values.address },
                                    { withCredentials: true }
                                );
                                
                                if (response.status === 200) {
                                    setMessage({ type: 'success', text: 'Dirección actualizada correctamente' });
                                    await refreshProfile();
                                } else {
                                    setMessage({ type: 'error', text: response.data.message || 'Error al actualizar dirección' });
                                }
                            } catch (error) {
                                console.error("Address update error:", error);
                                setMessage({ 
                                    type: 'error', 
                                    text: error.response?.data?.message || 'Error al actualizar dirección'
                                });
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                    <Field
                                        type="text"
                                        name="streetAddress"
                                        placeholder="Ingresa tu dirección completa"
                                        className={`${styles.inputProfile} text-black`}
                                    />
                                    <ErrorMessage name="streetAddress" component="span" className="block text-red-500 text-xs mt-1" />

                                    {/* Province Dropdown */}
                                    <label className="block mt-2 ml-2 text-black font-medium">Provincia</label>
                                    <Field name="province"
                                    className={`${styles.inputProfile} text-black`} 
                                    as="select">
                                    {({ field, form }) => (
                                        <select
                                        {...field}
                                        className={`${styles.fieldRegister}`}
                                        onChange={(e) => {
                                            const selectedProvinceName = e.target.value;
                                            
                                            // Update Formik state
                                            form.setFieldValue('province', selectedProvinceName);
                                            form.setFieldValue('city', ''); // Clear city when province changes
                                            
                                            // Fetch cities for selected province
                                            const selectedProvince = provinces.find(prov => prov.name === selectedProvinceName);
                                            if (selectedProvince) {
                                            fetchCitiesByProvince(selectedProvince.id);
                                            }
                                        }}
                                        >
                                        <option value="">Selecciona una provincia</option>
                                        {provinces.map(province => (
                                            <option key={province.id} value={province.name}>
                                            {province.name}
                                            </option>
                                        ))}
                                        </select>
                                    )}
                                    </Field>

                                    {/* City Dropdown */}
                                    <label className="block mt-2 ml-2 text-black font-medium" >Ciudad</label>
                                    <Field as="select" 
                                    name="city"
                                    className={`${styles.fieldRegister}`}
                                    >
                                    <option value="">Selecciona una ciudad</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.name}>
                                        {city.name}
                                        </option>
                                    ))}
                                    </Field>

                                    {loading && <p>Cargando provincias...</p>}
                                    {error && <p className="text-red-500">Error: {error}</p>}

                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={styles.btnProfile}
                                >
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Dirección'}
                                </button>
                            </Form>
                        )}
                    </Formik>
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
                                        className={`${styles.inputProfile} text-black`}
                                    />
                                    <ErrorMessage name="currentPassword" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                    <Field
                                        type="password"
                                        name="newPassword"
                                        placeholder="Ingresa tu nueva contraseña (mínimo 4 caracteres)"
                                        className={`${styles.inputProfile} text-black`}
                                    />
                                    <ErrorMessage name="newPassword" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirma tu nueva contraseña"
                                        className={`${styles.inputProfile} text-black`}
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
                                        className={`${styles.inputProfile} text-black`}
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
                    <Formik
                        initialValues={{ phone: profile?.phonenumber || '' }}
                        validationSchema={profileUpdateSchemas.phone}
                        onSubmit={async (values, { setSubmitting }) => {
                            setMessage({ type: '', text: '' });
                            try {
                                const response = await axios.put(
                                    "/api/auth/profile/phone",
                                    { phone: values.phone },
                                    { withCredentials: true }
                                );
                                
                                if (response.status === 200) {
                                    setMessage({ type: 'success', text: 'Teléfono actualizado correctamente' });
                                    await refreshProfile();
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
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Teléfono</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="+54 11 1234-5678"
                                        className={`${styles.inputProfile} text-black`}
                                    />
                                    <ErrorMessage name="phone" component="span" className="block text-red-500 text-xs mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={styles.btnProfile}
                                >
                                    {isSubmitting ? 'Actualizando...' : 'Cambiar Teléfono'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </section>
    );


}