
import Contador from "../Contador/ItemCount";
import { useState } from 'react';

import { useCartContext } from '../../context/CartContext';

const ItemDetail = ({products}) => {
    const [irCarrito , setIrCarrito] =useState(false)

    const {agregarItem} = useCartContext();

    const onAdd = (cantidad) => {
        // console.log(cantidad)
        setIrCarrito(true)
        agregarItem(products, cantidad)
    }

        return (
            // <div className='ItemRow'>
            <div  className="Item">
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <div>
            <span>{products.marca}</span>
            <div>
                <img src={products.img} alt="Producto"/>
                <p>Precio: {products.precio} AR$</p>
                <p>Stock: {products.stock}</p>
            </div>
            {
                        irCarrito 
                        ? <href to="/cart">Ir al carrito</href>
                        :<Contador inicio={0} stock={products.stock} onAdd={onAdd} />
            }
            </div>
        </div>
            // </div>
        );
}

export default ItemDetail