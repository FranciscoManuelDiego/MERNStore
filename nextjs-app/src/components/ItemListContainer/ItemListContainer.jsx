"use client";
import { useEffect, useState } from 'react';
import ItemList from "../ItemList/ItemList";
import { useParams, useRouter, useSearchParams  } from "next/navigation";

const ItemListContainer = () => {
    const { category } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    });

    const currentPage = parseInt(searchParams.get('page') || '1');
    const activeCategory = category || searchParams.get('category');
    
    // ADD THESE DEBUG LOGS
   //console.log('=== ITEMLISTCONTAINER DEBUG ===');
   //console.log('URL pathname:', window.location.pathname);
   //console.log('URL search:', window.location.search);
   //onsole.log('useParams category:', category);
   // console.log('searchParams category:', searchParams.get('category'));
   // console.log('activeCategory:', activeCategory);
   // console.log('currentPage:', currentPage);
   // console.log('products state:', products);
   // console.log('loading state:', loading);
   // console.log('error state:', error);
   // console.log('================================');

    useEffect(() => {
        console.log('🔄 useEffect triggered with:', { activeCategory, currentPage });
        setLoading(true);
        
        const apiUrl = new URL('/api/products', window.location.origin);
        apiUrl.searchParams.set('page', currentPage.toString());
        apiUrl.searchParams.set('limit', '6');
        
        if (activeCategory && activeCategory !== 'all') {
            apiUrl.searchParams.set('category', activeCategory);
        }

        //console.log('📡 API URL:', apiUrl.toString());

        fetch(apiUrl.toString())
            .then(res => {
                //console.log('📥 Response status:', res.status);
                //console.log('📥 Response ok:', res.ok);
                
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: Failed to fetch products`);
                }
                return res.json();
            })
            .then(data => {
                //console.log('📦 Raw API response:', data);
                //console.log('📦 Products array:', data.products);
                //console.log('📦 Products length:', data.products?.length);
                //console.log('📦 Total count:', data.totalCount);
                //console.log('📦 Total pages:', data.totalPages);

                setProducts(data.products || []);
                setPagination({
                    currentPage: data.page || currentPage,
                    totalPages: data.totalPages || 1,
                    totalCount: data.totalCount || 0
                });
                setError(null);
            })
            .catch(err => {
                console.error('❌ Fetch error:', err);
                setError(err.message);
                setProducts([]);
            })
            .finally(() => {
                console.log('✅ Setting loading to false');
                setLoading(false);
            });
    }, [activeCategory, currentPage]);

    //console.log('🎨 Rendering with:', {
       // loading,
       // error,
       // productsCount: products.length,
       // filteredProductsCount: products.length
    //});

    // Since API already filters, use products directly
    const filteredProducts = products;

        const goToPage = (page) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        if (activeCategory) {
            newSearchParams.set('category', activeCategory);
        }
        const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    };


    if (loading) {
        console.log('🔄 Rendering loading state');
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-lg">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        console.log('❌ Rendering error state:', error);
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (products.length === 0) {
        console.log('📭 Rendering empty state');
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">
                    {activeCategory 
                        ? `No se encontraron productos en la categoría "${activeCategory}"` 
                        : "No hay productos disponibles."
                    }
                </div>
            </div>
        );
    }

    //console.log('✅ Rendering products list with', products.length, 'items');
    return (
        <>
            {/* Show current category */}
        {activeCategory && (
            <div className="mt-4 mb-4 p-4 bg-blue-50 rounded-lg mx-auto text-center w-[300px]">
                <span className="text-xl font-semibold text-gray-700 whitespace-nowrap ">
                    Categoría actual: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </span>
            </div>
        )}
                    
            <ItemList product={filteredProducts} />
           {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
            <section className="flex justify-center max-w-7xl mx-auto px-4">
                <div className="w-full max-w-md sm:max-w-2xl">
                    {/* Mobile-first pagination */}
                    <div className="flex flex-col items-center mt-8 mb-8 space-y-4">
                        
                        {/* Page info */}
                        <div className="text-center">
                            <div className="text-sm sm:text-base font-semibold text-gray-700">
                                Página {pagination.currentPage} de {pagination.totalPages}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                                {pagination.totalCount} productos total
                            </div>
                        </div>
                        
                        {/* Buttons container */}
                        <div className="flex items-center justify-center w-full">
                            
                            {/* Mobile layout (< 640px) */}
                            <div className="flex sm:hidden items-center space-x-2 w-full justify-between">
                                <button 
                                    onClick={() => goToPage(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage <= 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    ←
                                </button>
                                
                                <span className="text-sm font-medium">
                                    {pagination.currentPage} / {pagination.totalPages}
                                </span>
                                
                                <button 
                                    onClick={() => goToPage(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage >= pagination.totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    →
                                </button>
                            </div>
                            
                            {/* Desktop layout (>= 640px) */}
                            <div className="hidden sm:flex items-center space-x-2">
                                {pagination.currentPage > 1 && (
                                    <button 
                                        onClick={() => goToPage(pagination.currentPage - 1)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        ← Anterior
                                    </button>
                                )}
                                
                                <div className="flex space-x-1">
                                    {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => {
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
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Siguiente →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}
        </>
    );
};

export default ItemListContainer;