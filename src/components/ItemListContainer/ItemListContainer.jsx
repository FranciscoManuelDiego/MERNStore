
//import getProducts from "../Products/Products";
import { useEffect, useState } from 'react';
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
const ItemListContainer = () => {

    // Fetch data and products from back

    const {category} = useParams();
    const [products, setProducts]= useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    const filteredProducts= category
    ? products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : products;
    
    return (
        <>
            <ItemList  product={filteredProducts}/>
        </>
    );
};

export default ItemListContainer;