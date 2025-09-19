// Categories page - uses ItemListContainer with category filter

import ItemListContainer from '../../../components/ItemListContainer/ItemListContainer';


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (

    <>
    <ItemListContainer category={category} />
    </>
    
  );
}
