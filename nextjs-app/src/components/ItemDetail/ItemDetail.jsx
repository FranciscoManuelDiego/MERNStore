
import { useState } from 'react';
import ItemCount from "../Counter/ItemCount";
import { useCart } from '../../hooks/useCart';
import {styles} from "../../styles/styleClasses"

const ItemDetail = ({products}) => {
    const [irCarrito, setIrCarrito] = useState(false);
    const { addProduct } = useCart();

    const onAdd = (cantidad) => {
        setIrCarrito(true);
        addProduct(products, cantidad);
    }

    return (
        <div className={styles.productDetailContainer}>
            <div className={styles.flexBetween}>
                <span className={styles.productDetailTitle}>{products.categoria}</span>
                <img src={products.imageUrl} alt="Producto"/>
                <div>
                    <p className={styles.productDetailPrice}>Precio: {products.precio} AR$</p>
                    <p className={styles.productDetailDescription}>Stock: {products.stock}</p>
                </div>
                {!irCarrito ? (
                    <ItemCount stock={products.stock} inicio={1} addToCart={onAdd} />
                ) : (
                    <div>
                        <p>Producto agregado al carrito!</p>
                        <button onClick={() => setIrCarrito(false)}>Agregar más</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemDetail