// Custom hooks for products functionality
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Types
interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  img: string;
  descripcion?: string;
}

// Hook for fetching products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Hook for filtered products (used in categories)
export const useFilteredProducts = () => {
  const { category } = useParams();
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category && products.length > 0) {
      const filtered = products.filter(
        product => product.categoria.toLowerCase() === (category as string).toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return { 
    products: filteredProducts, 
    loading, 
    error, 
    category: category as string | undefined 
  };
};

// Hook for single product
export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return "No product found.";

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

// Hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { products } = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.categoria))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  return categories;
};
