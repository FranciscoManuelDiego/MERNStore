"use client";

import { useParams } from 'next/navigation';
import { useSingleProduct } from '../../../hooks/useProducts';
import ItemDetail from '../../../components/ItemDetail/ItemDetail';
import Link from 'next/link';
import { styles } from '../../../styles/styleClasses';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { product, isLoading, error } = useSingleProduct(productId);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Cargando producto...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.pageContainer}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-4">{error || 'El producto que buscas no existe.'}</p>
          <Link href="/" className={styles.btnPrimary}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <ItemDetail products={product} />
      <div className="mt-6 text-center">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Volver a productos
        </Link>
      </div>
    </div>
  );
}
