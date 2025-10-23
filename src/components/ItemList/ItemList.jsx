import Item from "../Item/Item";

const ItemList = ({product}) => {
    return (
        <section className="flex justify-center py-4 mx-auto px-2 xl:w-[1200px] sm:px-4">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 w-full max-w-7xl">
                {product.map(p => (
                    <Item key={p._id} SingleProduct={p}/>
                ))}
            </ul> 
        </section>
    );
}

export default ItemList