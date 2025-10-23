// This will be your home page - equivalent to ItemListContainer
import { Suspense } from 'react';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import Carousel from '../components/carousel/carousel';

export default function Home() {
  return (
    <main>
      <Carousel />
      <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
        <ItemListContainer />
      </Suspense>
    </main>
  );
}
