import { useState, useRef} from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: ""
  });

  const [isRequired, setIsRequired] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setIsRequired(true);
      return;
    } 
    try {
        await login({
          email: form.email,
          password: form.password
        });
        alert("Usuario logueado exitosamente");
        formRef.current.reset();
        setForm({
          email: "",
          password: ""
        });
        navigate("/"); // Redirect to home page after successful login
    } catch (error) {
        console.error('Login failed:', error.message);
        alert(error.message || "Error al ingresar usuario");
    }
};

  return (
    <div className="flex justify-center items-center ">
      <form ref={formRef} className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6"> Ingresa tu e-mail para iniciar sesión</h2>

        <label className="block mt-2 ml-2 text-black font-medium">E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Escribe tu e-mail"
          className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
          required={isRequired}
        />
        {isRequired && !form.email && (
          <span className="block text-red-500 text-xs mt-1">* E-mail requerido</span>
        )}

        <label className="block mt-2 ml-2 text-black font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Escribe tu contraseña"
          className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
          required={isRequired}
        />
        {isRequired && !form.password && (
          <span className="block text-red-500 text-xs mt-1">* Contraseña requerida</span>
        )}

        <button
          type="submit"
          className="bg-yellow-400 block py-2 px-5 mt-4 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl hover:bg-yellow-300 transition-colors duration-200"
        >
          Continuar
        </button>
        <p className="text-center mt-4 text-gray-600">¿No tienes cuenta? <a href="/register" className="text-yellow-500 hover:text-yellow-400">Regístrate aquí</a></p>
      </form>
    </div>
  );
}