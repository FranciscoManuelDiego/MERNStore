import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
// import { useCartContext } from "../context/CartProvider";
import { useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
const CartWidget = () => {
    const {cart} = useContext(CartContext)
    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(cart?.reduce((previo, actual) => {
            return previo + actual.cantidad
        }, 0))
    }, [cart])

    return (
    <>
    <FontAwesomeIcon className="Cart" icon={faCartShopping}/> <span>{total+ " "}</span>
    </> 
    );
}

export default CartWidget