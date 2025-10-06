"use client";
import { useState, useRef, useTransition } from "react";
import { MdErrorOutline } from "react-icons/md";
import { styles } from "../../styles/styleClasses";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const { loginUser, isLoading, error: loginError } = useLogin();
  const [isPending, startTransition] = useTransition();
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "El email no es válido";
    }
    
    if (!form.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    // Clear submit error
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //console.log('Form submission started');
    
    // Clear previous errors
    setSubmitError("");
    
    // Validate form first
    if (!validateForm()) {
      //console.log('Validation failed, stopping submission');
      return;
    }

    //console.log('Validation passed, attempting login');

    startTransition(async () => {
      try {
        const success = await loginUser({
          email: form.email,
          password: form.password
        });
        
        if (success) {
          // Reset form on success - loginUser already handles redirect
          formRef.current?.reset();
          setForm({ email: "", password: "" });
          //console.log('Login successful');
        } else {
          // loginUser returned false, check for error
          //console.log('Login failed');
          setSubmitError(loginError || "Error al iniciar sesión. Verifica tus credenciales.");
        }
        
      } catch (error) {
        console.error('Login error caught:', error);
        setSubmitError(error.message || "Error al iniciar sesión. Verifica tus credenciales.");
      }
    });
  };

  return (
    <div className="flex justify-center items-center">
      <form ref={formRef} className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]" onSubmit={handleSubmit}>
        <h2 className={`${styles.formH1} mt-4`}>Ingresa tu e-mail para iniciar sesión</h2>

        {/* Global form error */}
        {(submitError || loginError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 block ">
            <MdErrorOutline className="inline mr-2 mx-auto font-extrabold" />
            {submitError || loginError}
          </div>
        )}

        <div className="mb-4">
          <label className="block mt-2 ml-2 text-black font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Escribe tu e-mail"
            className={`border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium ${
              errors.email ? 'border-red-500' : 'border-gray-500'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <span className="block text-red-500 text-xs mt-1">{errors.email}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mt-2 ml-2 text-black font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Escribe tu contraseña"
            className={`border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium ${
              errors.password ? 'border-red-500' : 'border-gray-500'
            }`}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <span className="block text-red-500 text-xs mt-1">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || isLoading}
          className={`${styles.btnPrimary} mt-5 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {(isPending || isLoading) ? 'Iniciando sesión...' : 'Continuar'}
        </button>
        
        <p className="text-center mt-4 text-gray-600">
          ¿No tienes cuenta? 
          <a href="/register" className="text-yellow-500 hover:text-yellow-400 ml-1">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}