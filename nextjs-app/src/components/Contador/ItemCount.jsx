import {  useState } from "react"
// import getProducts from "../Products/Products";

const Contador = ({inicio , stock, onAdd}) => {
    const [contador, setContador] = useState(inicio);

    const Sumar = () => {
        setContador( contador +1);
    }

    const Restar = () => {
        setContador( contador -1);
    }

    return(
        <>
            <div>
                <button variant="primary" disabled={contador <= 1} onClick={Restar}>-</button>
                <span>{'  ' +contador+'  '}</span>
                <button variant="primary" disabled={contador >= stock} onClick={Sumar}>+</button>
            </div>
            <button className="ButtonCarrito" variant="primary" disabled={contador <= 0 } onClick={() => onAdd(contador)}>Agregar al carrito</button>
        </>
    );
}

export default Contador;