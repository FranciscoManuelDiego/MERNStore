"use client";
import { createContext, useState, useEffect } from 'react';
import { safeLocalStorage } from '../utils/localStorage';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize cart from localStorage on client-side only
    useEffect(() => {
        const savedCart = safeLocalStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(Array.isArray(parsedCart) ? parsedCart : []);
            } catch (error) {
                console.error('Error parsing saved cart:', error);
                safeLocalStorage.removeItem("cart");
                setCart([]);
            }
        }
        setIsInitialized(true);
    }, []);
    
    // Save to localStorage whenever cart changes (only after initialization)
    useEffect(() => {
        if (isInitialized) {
            safeLocalStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const getCart = async () => {
        // For localStorage-based cart, just return current cart
        return cart;
    }

    const addItem = async (product, quantity) => {
        try {
           // console.log('CartContext addItem called with:');
           // console.log('Product:', product);
           // console.log('Quantity:', quantity);
           // console.log('Current cart:', cart);

            // Local cart management (no need for API calls)
            const newProduct = {
                id: product.id || product._id,
                name: product.marca || product.name,
                img: product.img || product.imageUrl,
                category: product.category,
                price: product.precio || product.price,
                quantity: quantity,
            };

            console.log('New product object:', newProduct);

            // Check if product already exists in cart using the same ID logic
            const existingProduct = cart.find(item => item.id === newProduct.id);
            console.log('Existing product found:', existingProduct);
            
            if (existingProduct) {
                console.log('Updating existing product quantity');
                // Update quantity if product exists
                setCart(cart.map(item => 
                    item.id === newProduct.id 
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                ));
            } else {
                console.log('Adding new product to cart');
                // Add new product if it doesn't exist
                setCart([...cart, newProduct]);
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
        


    const cleanCart = () => setCart([]);

    const removeProduct = (id) => setCart(cart.filter(product => product.id !== id))

return (
<CartContext.Provider value={{
    cart, 
    getCart,
    addItem, 
    cleanCart, 
    removeProduct}}>
        {children}
    </CartContext.Provider>
// Esta prop children lo que hace es enviar la app como un children para que se conozca el contexto y su info. en la App
);
}

export default CartProvider