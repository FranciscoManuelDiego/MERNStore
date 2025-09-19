"use client"
import { useState, useContext} from 'react';
import ItemCount from "../Counter/ItemCount";
import { useCart } from '../../hooks/useCart';
import {styles} from "../../styles/styleClasses"
import { AuthContext } from '../../context/AuthContext';
import {useRouter} from 'next/navigation';

const ItemDetail = ({products}) => {

    const { user } = useContext(AuthContext);
    const { addItem } = useCart();
    const router = useRouter();
    const [irCarrito, setIrCarrito] = useState(false);


    const onAdd = (cantidad) => {
        //console.log('onAdd called with:', cantidad);
        //console.log('Product being added:', products);
        //console.log('Product ID:', products?.id);
        //console.log('Product _id:', products?._id);

        if (!user) {
            router.push('/login');
            return;
        }
        addItem(products, cantidad);
    }

    // Debug: Check if onAdd is properly defined
    //console.log('ItemDetail onAdd function:', onAdd);
    //console.log('ItemDetail onAdd type:', typeof onAdd);


    return (
        <div className={`${styles.productDetailContainer} flex lg:flex-row flex-col lg:items-center 
        lg:justify-center gap-4 xl:w-[1000px] md:w-[800px] sm:w-[400px] w-[300px] mx-auto my-8`}>
            <img
                src={products.imageUrl}
                alt={products.name}
                className="xl:w-128 xl:h-128 md:w-64 md:h-64 sm:w-32 sm:h-32 object-contain mb-2 rounded"
            />
            <div>
                <div className='justify-center items-center sm:flex-col sm:justify-start sm:items-start sm:text-left text-center'>
                <span className={styles.productDetailTitle}>{products.name}</span>
                    <p className={styles.productDetailPrice}>Precio: {products.price} AR$</p>
                    <p className={styles.productDetailDescription}>Stock disponible: {products.stock} unidades</p>
                </div>
                {!irCarrito ? (
                    <ItemCount
                        stock={products.stock}
                        inicio={1}
                        addToCart={onAdd}
                    />
                ) : (
                    <div>
                        <p>Producto agregado al carrito!</p>
                        <button onClick={() => {setIrCarrito(false); router.push('/cart')}}>Agregar más</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemDetail