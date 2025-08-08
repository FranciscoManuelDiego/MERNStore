// Categories page - equivalent to your ItemListContainer with category filter
// The [category] makes this a dynamic route that captures the category parameter

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Categoría: {decodeURIComponent(category)}
      </h1>
      
      {/* Placeholder for filtered ItemListContainer component */}
      <div className="text-center">
        <p className="text-gray-600">
          Aquí irá tu componente ItemListContainer filtrado por categoría
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Categoría actual: <strong>{decodeURIComponent(category)}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Migra tu lógica de filtrado de categorías aquí
        </p>
      </div>
    </div>
  );
}
