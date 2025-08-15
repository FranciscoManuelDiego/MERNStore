// Categories page - uses ItemListContainer with category filter
import ItemListContainer from '../../../components/ItemListContainer/ItemListContainer';

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
      
      {/* Use your actual ItemListContainer component */}
      <ItemListContainer />
    </div>
  );
}
