"use client";
//import getProducts from "../Products/Products";
import { useEffect, useState } from 'react';
import ItemList from "../ItemList/ItemList";
import { useParams } from "next/navigation";

const ItemListContainer = () => {
    // Fetch data and products from back
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/products")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then(data => {
                console.log('Products fetched:', data); // Debug log
                setProducts(data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredProducts = category
        ? products.filter(product => {
            // Handle both 'category' and 'categoria' field names
            const productCategory = product.category || product.categoria;
            console.log('Filtering:', { 
                productCategory, 
                urlCategory: category, 
                match: productCategory?.toLowerCase() === category.toLowerCase() 
            }); // Debug log
            return productCategory?.toLowerCase() === category.toLowerCase();
        })
        : products;

    console.log('Final filtered products:', filteredProducts); // Debug log

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-lg">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (filteredProducts.length === 0 && category) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">
                    No se encontraron productos en la categoría "{category}"
                </div>
            </div>
        );
    }

    return (
        <>
            <ItemList product={filteredProducts} />
        </>
    );
};

export default ItemListContainer;