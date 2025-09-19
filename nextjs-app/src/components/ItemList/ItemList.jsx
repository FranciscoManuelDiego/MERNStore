import Item from "../Item/Item";

const ItemList = ({product}) => {
    return (
        <section className="flex justify-center items-center py-4 mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full xl:max-w-6xl md:max-w-4xl">
                {product.map(p => (
                    <Item key={p._id} SingleProduct={p}/>
                ))}
            </ul> 
        </section>
    );
}

export default ItemList