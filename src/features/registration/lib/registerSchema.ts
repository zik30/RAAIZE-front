import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  first_name: yup.string().required('Enter your name'),
  email: yup.string().email('Invalid email').required('Enter your email'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Enter your password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});
