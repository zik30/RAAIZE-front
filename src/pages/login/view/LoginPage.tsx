import { LoginForm } from '@src/features/login';
import { AuthLayout } from '@src/widgets/authLayout';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
