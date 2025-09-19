import { styles } from "../../styles/styleClasses"
import Link from "next/link";


const Item = ({ SingleProduct }) => {
    return (
        <li className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 m-2">
            <h3 className="text-lg font-bold text-black mb-2 text-center">{SingleProduct.name}</h3>
            <img 
                src={SingleProduct.imageUrl} 
                alt={SingleProduct.name} 
                className="w-32 h-32 object-contain mb-2 rounded"
            />
            <p className="text-gray-700 font-semibold">Precio: <span className="text-gray-800">{SingleProduct.price} AR$</span></p>
            <p className="text-gray-600">Stock: {SingleProduct.stock}</p>
            <p className="text-gray-500 text-sm mb-3 text-center">{SingleProduct.description}</p>
            <Link href={`/products/${SingleProduct._id}`}>
                <button className={`${styles.btnPrimary}`}>Ver Más</button>
            </Link>
        </li>
    );
}

export default Item; 