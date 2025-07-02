import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../lib/registerSchema';

export const useRegisterForm = () =>
  useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
