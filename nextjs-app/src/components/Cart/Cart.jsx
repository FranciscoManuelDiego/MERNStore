"use client"
import { useState } from 'react';
import { styles } from '../../styles/styleClasses';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useCart, useCartCalculations } from '../../hooks/useCart';

const Cart = () => {
    const { user, profile } = useAuth();
    const { cart, removeProduct, cleanCart } = useCart();
    const { totalPrice, totalItems} = useCartCalculations();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Function to handle removing a product
    const handleRemoveProduct = (productId) => {
        removeProduct(productId);
    };

    // Function to clear the cart
    const handleClearCart = () => {
        cleanCart();
    };

    // Function to create an order
    const createOrder = async () => {
        if (cart.length === 0) return;

        setIsProcessing(true);
        
        try {
            console.log('Cart item example:', cart[0]); // Debug to see actual fields
            console.log('All cart item fields:', Object.keys(cart[0])); // Show all available fields
            console.log('Profile data:', profile); // Debug profile data
            console.log('Address fields check:', {
                province: profile?.province,
                city: profile?.city, 
                streetAddress: profile?.streetAddress
            });

            // Check if user has address info - if not, prompt them
            if (!profile?.province || !profile?.city || !profile?.streetAddress) {
                alert('Por favor completa tu información de dirección en tu perfil antes de realizar el pedido.');
                return; // Don't create order without address
            }

            const orderData = {
                items: cart.map(item => ({
                    productId: item.id,           // Use item.id for productId
                    name: item.name,              // Use item.name for name
                    quantity: item.quantity,
                    imageUrl: item.img,           // Use item.img for imageUrl
                    price: item.price             // Add the missing price field
                })),
                total: totalPrice,
                province: profile.province,       // Remove optional chaining since we checked above
                city: profile.city,               // Remove optional chaining since we checked above
                streetAddress: profile.streetAddress // Remove optional chaining since we checked above
            };
            
            console.log('Final order data being sent:', orderData); // Debug what's actually sent
            
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
                credentials: 'include'
            });
            
            if (response.status === 201) {
                cleanCart();
                setOrderComplete(true);
                console.log('Order created successfully:', response);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Hubo un error al procesar tu orden. Por favor intenta nuevamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Show order complete message
    if (orderComplete) {
        return (
            <div className={styles.cartContainer}>
                <h1 className="text-2xl font-bold text-green-600 mb-4">¡Pedido Completado!</h1>
                <p className={`${styles.cartH1} mt-4 `}>Tu pedido ha sido procesado correctamente, chequea tu correo o tu whatsapp para más detalles.</p>
                <Link href="/" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Seguir Comprando
                </Link>
            </div>
        );
    }

    if(user === null ){
        return (
            <div className={styles.cartContainer}>
                <h1 className={styles.cartH1}>Por favor, inicia sesión para ver tu carrito</h1>
                <Link href="/login" className={styles.btnPrimary}>
                    Iniciar Sesión
                </Link>
            </div>
        );
    }

    // Show empty cart message
    if (cart.length === 0) {
        return (
            <div className={styles.cartContainer}>
                <h1 className={styles.cartH1}>No hay productos en tu carrito 😬</h1>
                <p className={`${styles.cartH1} mt-4 `}>Agrega productos y serán aquí mostrados!</p>
                <Link href="/" className={styles.btnPrimary}>
                    Ver Productos
                </Link>
            </div>
        );
    }

    // Show cart with items
    return (
        <section className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 p-4">
            {/* Left side - Cart items */}
            <div className="flex-1 bg-white rounded-lg shadow-md">
                <h1 className={`${styles.cartH1} p-4`}>Tu Carrito de Compras</h1>
                
                {/* Cart header - Desktop only */}
                <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-600">
                    <div className="col-span-6">Producto</div>
                    <div className="col-span-2 text-center">Precio</div>
                    <div className="col-span-2 text-center">Cantidad</div>
                    <div className="col-span-1 text-center">Total</div>
                    <div className="col-span-1 text-center">Eliminar</div>
                </div>
            
                {/* Cart items */}
                {cart.map((producto) => (
                    <div key={producto.id} className={`grid grid-cols-12 p-4 items-center border-b ${styles.textCart} gap-2`}>
                        <div className="col-span-11 md:col-span-6 flex items-center">
                            <img 
                                src={producto.img} 
                                alt={producto.name} 
                                className="w-32 h-32 object-contain rounded mr-4"
                            />
                            <div>
                                <h3 className="xl:text-lg font-semibold md:text-md">{producto.name}</h3>
                                <p className="text-sm text-gray-600">Categoría: {producto.category}</p>
                                <div className="text-sm md:hidden">Precio: ${producto.price || 0}</div>
                                <div className="text-sm md:hidden">Cantidad: {producto.quantity || 0}</div>
                                <div className="text-sm font-semibold md:hidden">Total: ${(producto.quantity || 0) * (producto.price || 0)}</div>
                            </div>
                        </div>
                        
                        {/* Desktop layout - additional columns for price, quantity, total */}
                        <div className="hidden md:block md:col-span-2 text-center">${producto.price || 0}</div>
                        <div className="hidden md:block md:col-span-2 text-center">{producto.quantity || 0}</div>
                        <div className="hidden md:block md:col-span-1 text-center">${(producto.quantity || 0) * (producto.price || 0)}</div>
                        
                        {/* Delete button */}
                        <div className="col-span-1 text-center">
                            <button 
                                onClick={() => handleRemoveProduct(producto.id)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Right side - Cart summary */}
            <div className="xl:w-96 bg-white rounded-lg shadow-md p-6 md:w-48">
                <h2 className="text-xl font-bold mb-4 text-black">Resumen de la compra</h2>
                <div className={`space-y-2 mb-4 ${styles.textCart}`}>
                    <div className="flex justify-between">
                        <span>Cantidad de productos:</span>
                        <span className="font-semibold">{totalItems}</span>
                    </div>
                    <div className={`flex justify-between text-xl font-bold border-t pt-2 `}>
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-6">
                    <button 
                        onClick={handleClearCart}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
                    >
                        Vaciar Carrito
                    </button>
                    
                    {user ? (
                        <button 
                            onClick={createOrder}
                            disabled={isProcessing}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 cursor-pointer"
                        >
                            {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
                        </button>
                    ) : (
                        <Link 
                            href="/login" 
                            className={`bg-${styles.primary} hover:bg-${styles.seconday} text-white font-semibold text-center py-2 px-4 rounded-md transition duration-300 block cursor-pointer`}
                        >
                            Iniciar Sesión para Comprar
                        </Link>
                    )}
                    
                    <Link 
                        href="/" 
                        className="text-yellow-500 hover:text-yellow-700 text-center cursor-pointer"
                    >
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Cart;