// Item detail page - equivalent to your ItemDetailContainer
// The [_id] makes this a dynamic route that captures the product ID

interface ItemPageProps {
  params: {
    _id: string;
  };
}

export default function ItemPage({ params }: ItemPageProps) {
  const { _id } = params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Detalle del Producto</h1>
      
      {/* Placeholder for ItemDetailContainer component */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-center text-gray-600">
            Aquí irá tu componente ItemDetailContainer
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Product ID: <strong>{_id}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Migra tu componente ItemDetailContainer aquí
          </p>
        </div>
      </div>
    </div>
  );
}
