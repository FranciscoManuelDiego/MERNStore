"use client";
import { useCartCalculations } from "../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
    const { itemCount } = useCartCalculations();

    return (
    <div className="flex items-center space-x-2">
        <FaShoppingCart />
        <span>{itemCount}</span>
    </div> 
    );
}

export default CartWidget