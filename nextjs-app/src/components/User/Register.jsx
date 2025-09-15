"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from "next/navigation";
import { styles } from '../../styles/styleClasses';
import { registrationSchema } from '../../utils/validationSchemas';

export default function Register() {
  const router = useRouter();

  // Function to handle form submission client side
  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error && data.error.includes("email")) {
          setFieldError("email", "Este email ya está registrado");
        } else {
          alert(data.error || "Error al registrar usuario");
        }
      } else {
        alert("Usuario registrado exitosamente");
        resetForm();
        router.push("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{
          firstName: '',
          surname: '',
          email: '',
          address: '',
          phonenumber: '',
          password: ''
        }}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md m-5 xl:w-[600px] md:w-[500px]">
            <h2 className={styles.formH1}>Completa los datos para crear tu cuenta.</h2>

            <label className="block mb-2 ml-2 text-black font-medium">Nombre</label>
            <Field
              type="text"
              name="firstName"
              placeholder="Escribe tu nombre"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
            />
            <ErrorMessage name="firstName" component="span" className="block text-red-500 text-xs mt-1" />

            <label className="block mt-2 ml-2 text-black font-medium">Apellido</label>
            <Field
              type="text"
              name="surname"
              placeholder="Escribe tu apellido"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black 
               rounded-lg font-medium"
            />
            <ErrorMessage name="surname" component="span" className="block text-red-500 text-xs mt-1" />

            <label className="block mt-2 ml-2 text-black font-medium">E-mail</label>
            <Field
              type="email"
              name="email"
              placeholder="Escribe tu e-mail"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
            />
            <ErrorMessage name="email" component="span" className="block text-red-500 text-xs mt-1" />

            <label className="block mt-2 ml-2 text-black font-medium">Direccion</label>
            <Field
              type="text"
              name="address"
              placeholder="Escribe tu dirección"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
            />
            <ErrorMessage name="address" component="span" className="block text-red-500 text-xs mt-1" />

            <label className="block mt-2 ml-2 text-black font-medium">Telefono</label>
            <Field
              type="text"
              name="phonenumber"
              placeholder="Escribe tu teléfono"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
            />
            <ErrorMessage name="phonenumber" component="span" className="block text-red-500 text-xs mt-1" />

            <label className="block mt-2 ml-2 text-black font-medium">Contraseña</label>
            <Field
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              className="border-gray-500 border-2 xl:w-[450px] py-4 px-6 placeholder:text-secondary text-black rounded-lg font-medium"
            />
            <ErrorMessage name="password" component="span" className="block text-red-500 text-xs mt-1" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 block py-2 px-5 mt-4 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear Cuenta'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}