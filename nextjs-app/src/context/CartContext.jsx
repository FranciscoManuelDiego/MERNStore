"use client";
import { useContext, useState, createContext, useEffect } from "react"
import  axios from "axios";
export const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext)
// Esto lo que hace es enviar mi contexto para poder ser utilizado en alguno de mis componentes
const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
         const gettingItem = JSON.parse(localStorage.getItem("cart"));
         return gettingItem ? gettingItem : [];
    });

    
    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const getCart = async (credentials) => {
        try {
            const response = await axios.get("http://localhost:3000/api/cart", {
                withCredentials: true,
            });
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    const addItem = async (product, quantity) => {
        try {
            // API version
            const response = await axios.post("http://localhost:3000/api/cart", {
                item: product.id,
                quantity: quantity
            }, {
                withCredentials: true
            });
            setCart(response.data);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            
            // Fallback to local version if API fails
            const newProduct = {
                id: product.id,
                name: product.marca,
                img: product.img,
                category: product.category,
                price: product.precio,
                quantity: quantity,
            };

            // Check if product already exists in cart
            const existingProduct = cart.find(item => item.id === product.id);
            
            if (existingProduct) {
                // Update quantity if product exists
                setCart(cart.map(item => 
                    item.id === product.id 
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                ));
            } else {
                // Add new product if it doesn't exist
                setCart([...cart, newProduct]);
            }
        }
    };
        


    const cleanCart = () => setCart([]);

    const removeProduct = (id) => setCart(cart.filter(product => product.id !== id))

return <CartContext.Provider value={{
    cart, 
    getCart,
    addItem, 
    cleanCart, 
    removeProduct}}>
        {children}
    </CartContext.Provider>
// Esta prop children lo que hace es enviar la app como un children para que se conozca el contexto y su info. en la App
}

export default CartProvider