"use client"
import { useContext, useState, useEffect } from 'react';
import {styles} from '../../styles/styleClasses';
import { CartContext } from '../../context/CartContext';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Cart = () => {
    const [precioTotal, setPrecioTotal] = useState(0);
    const { cart, removeProduct, cleanCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Calculate total price whenever cart changes
    useEffect(() => {
        setPrecioTotal(
            cart.reduce((previo, actual) => {
                return previo + actual.precio * actual.cantidad;
            }, 0)
        );
    }, [cart]);

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
            const orderData = {
                items: cart.map(item => ({
                    product: item.id,
                    quantity: item.cantidad,
                    price: item.precio
                })),
                total: precioTotal
            };
            
            const response = await axios.post(
                'http://localhost:3000/api/orders', 
                orderData,
                { withCredentials: true }
            );
            
            if (response.status === 201) {
                cleanCart();
                setOrderComplete(true);
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
                <p className="mb-4">Tu pedido ha sido procesado correctamente.</p>
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
                <p className="mb-4">Agrega productos y serán aquí mostrados!</p>
                <Link href="/" className={styles.btnPrimary}>
                    Ver Productos
                </Link>
            </div>
        );
    }

    // Show cart with items
    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.cartH1}>Tu Carrito de Compras</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                {/* Cart header */}
                <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-600">
                    <div className="col-span-6">Producto</div>
                    <div className="col-span-2 text-center">Precio</div>
                    <div className="col-span-2 text-center">Cantidad</div>
                    <div className="col-span-2 text-center">Total</div>
                </div>
                
                {/* Cart items */}
                {cart.map((producto) => (
                    <div key={producto.id} className="grid grid-cols-12 p-4 items-center border-b">
                        <div className="col-span-6 flex items-center">
                            <img 
                                src={producto.img} 
                                alt={producto.nombre} 
                                className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">{producto.nombre}</h3>
                                <p className="text-sm text-gray-600">{producto.categoria}</p>
                            </div>
                        </div>
                        <div className="col-span-2 text-center">${producto.precio}</div>
                        <div className="col-span-2 text-center">{producto.cantidad}</div>
                        <div className="col-span-1 text-center">${producto.cantidad * producto.precio}</div>
                        <div className="col-span-1 text-center">
                            <button 
                                onClick={() => handleRemoveProduct(producto.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Cart summary */}
            <div className="bg-white rounded-lg shadow-md p-6 md:w-1/2 ml-auto">
                <div className="flex justify-between mb-4">
                    <span className="font-semibold">Subtotal:</span>
                    <span>${precioTotal}</span>
                </div>
                <div className="flex justify-between mb-4 text-xl font-bold">
                    <span>Total:</span>
                    <span>${precioTotal}</span>
                </div>
                
                <div className="flex flex-col gap-3 mt-6">
                    <button 
                        onClick={handleClearCart}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Vaciar Carrito
                    </button>
                    
                    {user ? (
                        <button 
                            onClick={createOrder}
                            disabled={isProcessing}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                        >
                            {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
                        </button>
                    ) : (
                        <Link 
                            href="/login" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-center py-2 px-4 rounded-md transition duration-300"
                        >
                            Iniciar Sesión para Comprar
                        </Link>
                    )}
                    
                    <Link 
                        href="/products" 
                        className="text-yellow-500 hover:text-yellow-700 text-center"
                    >
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;