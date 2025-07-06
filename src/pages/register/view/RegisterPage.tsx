import { RegisterForm } from '@src/features/registration';
import { AuthLayout } from '@src/widgets/authLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
