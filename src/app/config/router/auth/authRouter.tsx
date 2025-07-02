import { LoginPage, RegisterPage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';

export const authRouter = [
  {
    path: paths.loginPage,
    element: <LoginPage />,
  },
  {
    path: paths.registerPage,
    element: <RegisterPage />,
  },
];
