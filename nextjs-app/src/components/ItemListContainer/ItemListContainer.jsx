"use client";
import { useEffect, useState } from 'react';
import ItemList from "../ItemList/ItemList";
import { useParams, useRouter, useSearchParams  } from "next/navigation";

const ItemListContainer = () => {
    // Fetch data and products from back
    const { category } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    });

    // Get current page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        setLoading(true);

        // Build the API URL with pagination parameters
        const apiUrl = new URL('/api/products', window.location.origin);
        apiUrl.searchParams.set('page', currentPage.toString());
        apiUrl.searchParams.set('limit', '6'); // Use your API's default
        
        if (category) {
            apiUrl.searchParams.set('category', category);
        }

        console.log('Fetching from:', apiUrl.toString()); // Debug

        fetch(apiUrl.toString())
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then(data => {
                console.log('Raw API response:', data); // Debug log
                console.log('Type of data:', typeof data); // Debug log
                console.log('Is array?', Array.isArray(data)); // Debug log
                setProducts(data.products || []); // Adjust based on actual API response structure
                setPagination({
                    currentPage: data.page,
                    totalPages: data.totalPages,
                    totalCount: data.totalCount
                });
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [category, currentPage]); // Re-fetch when category or page changes


    //The route API is filtering by category, no need for client side filtering.
    const filteredProducts = products; // No additional filtering needed

    //console.log('Final filtered products:', filteredProducts); // Debug log

        const goToPage = (page) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    };


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
           {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <div className="text-gray-600 text-sm">
                        Página {pagination.currentPage} de {pagination.totalPages} 
                        ({pagination.totalCount} productos total)
                    </div>
                    
                    <div className="flex space-x-2">
                        {pagination.currentPage > 1 && (
                            <button 
                                onClick={() => goToPage(pagination.currentPage - 1)}
                                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                ← Anterior
                            </button>
                        )}
                        
                        {/* Page numbers */}
                        <div className="flex space-x-1">
                            {[...Array(pagination.totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => goToPage(pageNum)}
                                        className={`px-3 py-2 rounded transition-colors ${
                                            pageNum === pagination.currentPage
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {pagination.currentPage < pagination.totalPages && (
                            <button 
                                onClick={() => goToPage(pagination.currentPage + 1)}
                                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Siguiente →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemListContainer;