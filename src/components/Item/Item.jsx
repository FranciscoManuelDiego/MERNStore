


const Item = ({ SingleProduct }) => {
    return (
        <li className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 m-2">
            <h3 className="text-lg font-bold text-black mb-2">{SingleProduct.name}</h3>
            <img 
                src={SingleProduct.imageUrl} 
                alt={SingleProduct.name} 
                className="w-32 h-32 object-contain mb-2 rounded"
            />
            <p className="text-gray-700 font-semibold">Precio: <span className="text-green-700">{SingleProduct.price} AR$</span></p>
            <p className="text-gray-600">Stock: {SingleProduct.stock}</p>
            <p className="text-gray-500 text-sm mb-3 text-center">{SingleProduct.description}</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Ver Más</button>
        </li>
    );
}

export default Item; 