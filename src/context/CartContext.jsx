import { useContext, useState, createContext } from "react"
export const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext)
// Esto lo que hace es enviar mi contexto para poder ser utilizado en alguno de mis componentes
const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const agregarItem = (item, cantidad ) => {
        const nuevoProducto = {
            id: item.id,
            nombre : item.marca,
            img: item.img,
            categoria: item.categoria,
            precio : item.precio,
            cantidad: cantidad,
        }
        setCart([...cart , nuevoProducto]);
    }



    const LimpiarItems = () => setCart([]);

    const removerProducto = (id) => setCart(cart.filter(producto => producto.id !== id))
    // console.log(removerProducto)

return <CartContext.Provider value={{cart, agregarItem, LimpiarItems, removerProducto}}>{children}</CartContext.Provider>
// Esta prop children lo que hace es enviar la app como un children para que se conozca el contexto y su info. en la App
}

export default CartProvider