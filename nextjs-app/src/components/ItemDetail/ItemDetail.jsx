"use client"
import { useState, useContext, useEffect } from 'react';
import ItemCount from "../Counter/ItemCount";
import { useCart } from '../../hooks/useCart';
import {styles} from "../../styles/styleClasses"
import { AuthContext } from '../../context/AuthContext';
import ReactImageMagnify from 'react-image-magnify';
import {useRouter} from 'next/navigation';

const ItemDetail = ({products}) => {

    const { user } = useContext(AuthContext);
    const { addProduct } = useCart();
    const router = useRouter();
    const [irCarrito, setIrCarrito] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const onAdd = (cantidad) => {
        if (!user) {
            router.push('/login');
            return;
        }
        addProduct(products, cantidad);
    }


    return (
        <div className={`${styles.productDetailContainer} grid grid-cols-1 lg:grid-cols-2 gap-8`}>
            <div className='w-full flex justify-center items-center overflow-visible'>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: "Producto",
                        src: products.imageUrl,
                        width: isMobile ? 300 : 400,
                        height: isMobile ? 400 : 300
                    },
                    largeImage: {
                        src: products.imageUrl,
                        width: 1200,
                        height: 1600
                    },
                    enlargedImagePosition: isMobile ? 'over' : 'beside',
                    enlargedImageContainerDimensions: isMobile ? 
                        { width: '100%', height: '100%' } : 
                        { width: '150%', height: '100%' },
                    isHintEnabled: true,
                    shouldHideHintAfterFirstActivation: false,
                    hoverDelayInMs: 250,
                    fadeDurationInMs: 300,
                    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                    style: { zIndex: 1000 }
                }} />
            </div>
            <div>
                <div className='justify-center items-center'>
                <span className={styles.productDetailTitle}>{products.name}</span>
                    <p className={styles.productDetailPrice}>Precio: {products.price} AR$</p>
                    <p className={styles.productDetailDescription}>Stock disponible: {products.stock} unidades</p>
                </div>
                {!irCarrito ? (
                    <ItemCount stock={products.stock} inicio={1} addToCart={onAdd} />
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