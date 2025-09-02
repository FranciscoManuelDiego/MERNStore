"use client"
import { useState } from "react";
import { styles } from "nextjsproject/styles/styleClasses";

const ItemCount = ({ stock, inicio, addToCart }) => {
    const [cantidad, setCantidad] = useState(inicio);

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
        addToCart(cantidad);
    };

    return (
        <div className="flex flex-col">
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
