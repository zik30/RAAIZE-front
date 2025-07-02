import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Enter your username'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Enter your password'),
});
