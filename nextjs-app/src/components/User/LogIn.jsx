"use client";
import { useState, useRef} from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { styles } from "../../styles/styleClasses";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const { loginUser } = useLogin();
  const router = useRouter();

  const [form, setForm] = useState({
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
        console.log('Attempting login with:', form.email); // Debug log
        await loginUser({
          email: form.email,
          password: form.password
        });
        alert("Usuario logueado exitosamente");
        formRef.current.reset();
        setForm({
          email: "",
          password: ""
        });
        router.push("/"); // Redirect to home page after successful login
    } catch (error) {
        console.error('Login failed:', error);
        alert(error.message || "Error al ingresar usuario");
    }
};

  return (
    <div className="flex justify-center items-center ">
      <form ref={formRef} className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]" onSubmit={handleSubmit}>
        <h2 className={`${styles.formH1} mt-4`}>Ingresa tu e-mail para iniciar sesión</h2>

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
          className={`${styles.btnPrimary} mt-5`}
        >
          Continuar
        </button>
        <p className="text-center mt-4 text-gray-600">¿No tienes cuenta? <a href="/register" className="text-yellow-500 hover:text-yellow-400">Regístrate aquí</a></p>
      </form>
    </div>
  );
}