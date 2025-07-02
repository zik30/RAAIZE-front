import { LoginPage, RegisterPage } from '@src/pages';
import { routes } from '@src/shared/constants/constants';

export const authRouter = [
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.register,
    element: <RegisterPage />,
  },
];
