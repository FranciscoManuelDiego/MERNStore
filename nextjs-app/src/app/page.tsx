// This will be your home page - equivalent to ItemListContainer
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import Carousel from '../components/carousel/carousel';

export default function Home() {
  return (
    <main>
      <Carousel />
      <ItemListContainer />
    </main>
  );
}
