// Categories page - uses ItemListContainer with category filter

import { Suspense } from 'react';
import ItemListContainer from '../../../components/ItemListContainer/ItemListContainer';

export default function CategoryPage() {
  // The ItemListContainer component gets the category from useParams() 
  // so we don't need to pass it as a prop
  
  return (
    <>
      <Suspense fallback={<div className="p-8 text-center">Loading category products...</div>}>
        <ItemListContainer />
      </Suspense>
    </>
  );
}
