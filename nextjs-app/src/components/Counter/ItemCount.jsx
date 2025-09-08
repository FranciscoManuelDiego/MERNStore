"use client"
import { useState } from "react";
import { styles } from "../../styles/styleClasses";

const ItemCount = ({ stock, inicio, addToCart }) => {
    const [cantidad, setCantidad] = useState(inicio); // Initial quantity state from props

    // Debug: Check if addToCart is actually a function
    //console.log('ItemCount props:', { stock, inicio, addToCart });
    //console.log('addToCart type:', typeof addToCart);
    //console.log('addToCart value:', addToCart);

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    const agregarAlCarrito = () => {
        console.log('agregarAlCarrito called, addToCart is:', typeof addToCart);
        if (typeof addToCart === 'function') {
            addToCart(cantidad);
        } else {
            console.error('addToCart is not a function:', addToCart);
        }
    };

    return (
        <div className="flex flex-col sm:items-start items-center">
            <div className="space-x-4 my-4">
                <button
                    onClick={decrementar}
                    className={`${styles.itemCountButton}`}
                    disabled={cantidad <= 1}
                >
                -
                </button>
            <span className="text-black font-semibold">{cantidad}</span>
            <button 
                onClick={incrementar}
                className={styles.itemCountButton}
                disabled={cantidad >= stock}
            >
                +
            </button>

            </div>
                <button 
                    onClick={agregarAlCarrito}
                    className="bg-yellow-500 w-[200px] hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded mt-4"
                >
                    Agregar al carrito
                </button>
        </div>
    );
};

export default ItemCount;
