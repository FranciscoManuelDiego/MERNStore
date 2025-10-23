import { styles } from "../../styles/styleClasses"
import Link from "next/link";


const Item = ({ SingleProduct }) => {
    return (
        <li className="flex flex-col bg-white rounded-lg shadow-md p-4 m-2 space-y-2">
            <h3 className={styles.productTitle}>{SingleProduct.name}</h3>
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden">
            <img 
                src={SingleProduct.imageUrl} 
                alt={SingleProduct.name} 
                className={styles.productCardImage}
            />
            </div>
            <p className={styles.productDetailPrice}>Precio: <span className="text-gray-800">{SingleProduct.price} AR$</span></p>
            <p className={styles.productDetailDescription} >{SingleProduct.description}</p>
            <Link href={`/products/${SingleProduct._id}`}>
                <button className={`${styles.btnPrimary}`}>Ver Más</button>
            </Link>
        </li>
    );
}

export default Item; 