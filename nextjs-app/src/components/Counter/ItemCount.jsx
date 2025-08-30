"use client"
import { useState } from "react";

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
        <div className="flex items-center space-x-4 my-4">
            <button 
                onClick={decrementar}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                disabled={cantidad <= 1}
            >
                -
            </button>
            <span className="text-xl font-semibold">{cantidad}</span>
            <button 
                onClick={incrementar}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                disabled={cantidad >= stock}
            >
                +
            </button>
            <button 
                onClick={agregarAlCarrito}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded ml-4"
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;
