import { useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.surname || !form.email || !form.password) {
      setIsRequired(true);
      return;
    } // After the fields are validated, you can proceed with form submission logic
    //Here you send the data to the backend
        fetch("http://localhost:3000/api/auth/register", {
        method:"POST",
        headers: { "Content-Type": "application/json" }, //Sending the data in a JSON format
        body: JSON.stringify(form) //Sending the state form to the db
        })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok){
            alert(data.message || "Error al registrar usuario");
            throw new Error(data.message || "Error al registrar usuario");
          }else {
            alert("Usuario registrado exitosamente");
            formRef.current.reset();
            setForm({
              firstName: "",
              surname: "",
              email: "",
              password: ""
            });
            navigate("/"); // Redirect to home page after successful registration
          }
        })
        .catch(error => {console.error("Error:", error)
        });
  };

  return (
    <div className="flex justify-center items-center ">
      <form ref={formRef} className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Completa los datos para crear tu cuenta.</h2>

        <label className="block mb-2 ml-2 text-black font-medium">Nombre</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Escribe tu nombre"
          className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
        />
        {isRequired && !form.firstName && (
          <span className="block text-red-500 text-xs mt-1">* Nombre Requerido</span>
        )}

        <label className="block mt-2 ml-2 text-black font-medium">Apellido</label>
        <input
          type="text"
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder="Escribe tu apellido"
          className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black 
           rounded-lg font-medium"
        />
        {isRequired && !form.surname && (
          <span className="block text-red-500 text-xs mt-1">* Apellido requerido</span>
        )}

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
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}