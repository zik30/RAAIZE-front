import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('Enter your username'),
  email: yup.string().email('Invalid email').required('Enter your email'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Enter your password'),
});
