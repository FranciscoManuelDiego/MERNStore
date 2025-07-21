import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useState ,useEffect } from 'react';

const Cart = () => {
    const [precioTotal, setPrecioTotal] = useState(0)
    const {cart, LimpiarItems, removerProducto} = useContext(CartContext)
    const [order, setOrder] = useState({})
    const [show, setShow] = useState(true);
    const [formValue , setFormValue] = useState({
        name: '',
        mail: '',
    })
    
        useEffect(() =>{
            setOrder({
            comprador: {
                name: 'x',
                email: 'x',
            },
            items: cart.map((product) => { 
                const {nombre, precio, id} = product
                return {nombre, precio, id}
            }),
            precio: cart.reduce((previo, actual) => {
                return previo + actual.precio * actual.cantidad }, 0)
            });
        }, [cart])


    const handleInput = (event) => {
        setFormValue({
            ...formValue , 
            [event.target.name] : event.target.value,
            [event.target.mail] : event.target.value,
        }) 
    }
    // Aqui obtengo la informacion de mi campo de datos

    useEffect(() => {
        setPrecioTotal(cart?.reduce((previo, actual) => {
            return previo + actual.precio * actual.cantidad
        }, 0))
    }, [cart])

        if(cart.length === 0 ) {
            if (show) {
                return (
                    <div className="alert alert-danger" role="alert">
                        <div> <h1>No hay productos en tu carrito! 😬</h1></div>
                        <p>
                            Agrega productos y seran aqui mostrados!
                        </p>
                        <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                    </div>
                    )
            }
            return <button className='ButtonAlert btn btn-secondary' onClick={() => setShow(true)}>Mostrar Alerta</button>;
        }
 

        const crearOrden = (event) => {


            const ordenActual = {
                ...order,
                comprador: formValue,
            }
            
            .then((response) =>{
                alert("Orden creada!" + response.id)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        const alertaCompra = () => {
            alert("Compraste tus productos! 😁")
        }
return (
    <>
    {cart.map((producto) => (
    <div className='cart' key={producto.id}>
        <div className="card-body">
            <button className='CloseButton' onClick={() => removerProducto(producto.id)}>×</button>
            <h5 className="card-title">{producto.nombre}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Producto: {producto.categoria}</h6>
            <img alt={producto.nombre} src={producto.img}></img>
            <div className="card-text">
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: {producto.cantidad * producto.precio}</p>
            </div>
        </div>
    </div>
    ))}
        <div className='CartText'> 
            <form>
                <div className="mb-3">
                    <label htmlFor="formBasicPassword">Nombre</label>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="Escribe tu Nombre" 
                        value={formValue.name} 
                        onChange={handleInput}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formBasicEmail">Email</label>
                    <input 
                        name="mail" 
                        type="email" 
                        placeholder="Escribe tu Mail" 
                        value={formValue.mail} 
                        onChange={handleInput}
                        className="form-control"
                    />
                </div>
            </form>
            <p>Precio Total: {precioTotal}</p>
            <button className='CartButtons btn btn-primary' onClick={LimpiarItems}>Remover Productos</button>
            <button className='CartButtons btn btn-primary' onClick={() => {LimpiarItems(); alertaCompra(); crearOrden(); }}>Finalizar Compra</button>
        </div>
    </>
);
}

export default Cart