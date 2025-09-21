import * as Yup from 'yup';

// Shared email validation schema
export const emailValidationSchema = Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|info|biz|name|mobi|pro|travel|museum|aero|coop|jobs|tel|asia|cat|post|xxx|tk|ml|ga|cf|co\.uk|co\.jp|co\.kr|com\.ar|com\.au|com\.br|com\.mx|com\.pe|com\.ve)$/i,
    'Formato de email inválido (ejemplo: usuario@dominio.com)'
  )
  .required('E-mail es requerido');

// Email validation with existence check for registration
export const emailWithExistenceCheck = emailValidationSchema.test(
  'email-exists', 
  'Este email ya está registrado', 
  async (value) => {
    if (!value) return true;
    try {
      const response = await fetch(`http://localhost:3000/api/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value })
      });
      const data = await response.json();
      return !data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return true;
    }
  }
);

// Email validation for profile updates (checks if email belongs to current user)
export const createEmailUpdateValidation = (currentUserEmail) => 
  emailValidationSchema.test(
    'email-update-check',
    'Este email ya está registrado por otro usuario',
    async (value) => {
      if (!value || value === currentUserEmail) return true; // Allow current email or empty
      try {
        const response = await fetch(`http://localhost:3000/api/auth/check-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value })
        });
        const data = await response.json();
        return !data.exists;
      } catch (error) {
        console.error("Error checking email:", error);
        return true;
      }
    }
  );

// Shared validation schemas
export const validationSchemas = {
  firstName: Yup.string().required('Nombre es requerido'),
  surname: Yup.string().required('Apellido es requerido'),
  address: Yup.string().required('Dirección es requerida'),
  phonenumber: Yup.string().required('Teléfono es requerido')
  .matches(/^(\+\d{1,3}\s?)?\d{8,15}$/, 'Número de teléfono inválido')
  .min(8, 'Mínimo 8 dígitos')
  .max(15, 'Máximo 15 dígitos'), 
  phone: Yup.string().required('Teléfono es requerido')
  .matches(/^(\+\d{1,3}\s?)?\d{8,15}$/, 'Número de teléfono inválido')
  .min(8, 'Mínimo 8 dígitos')
  .max(15, 'Máximo 15 dígitos'), 
  password: Yup.string().min(4, 'La contraseña debe tener al menos 4 caracteres').required('Contraseña es requerida'),
  newPassword: Yup.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres').required('Nueva contraseña es requerida'),
  currentPassword: Yup.string().required('Contraseña actual es requerida'),
  confirmPassword: Yup.string()
    .required('Confirmar contraseña es requerido')
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden'),
};

// Complete registration schema
export const registrationSchema = Yup.object({
  firstName: validationSchemas.firstName,
  surname: validationSchemas.surname,
  email: emailWithExistenceCheck,
  address: validationSchemas.address,
  phonenumber: validationSchemas.phonenumber, 
  password: validationSchemas.password
});

// Profile update schemas
export const profileUpdateSchemas = {
  address: Yup.object({
    address: validationSchemas.address
  }),
  password: Yup.object({
    currentPassword: validationSchemas.currentPassword,
    newPassword: validationSchemas.newPassword,
    confirmPassword: validationSchemas.confirmPassword
  }),
  phone: Yup.object({
    phone: validationSchemas.phone
  })
};

// Email update schema (dynamic based on current user email)
export const createEmailUpdateSchema = (currentUserEmail) => Yup.object({
  email: createEmailUpdateValidation(currentUserEmail)
});