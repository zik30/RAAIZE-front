import { LoginPage, RegisterPage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';
import { GuestGuard } from '@src/app/config/guards/GuestGuard';
import { GoogleCallback } from '@src/features/googleAuth';

export const authRouter = [
  {
    path: paths.loginPage,
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: paths.registerPage,
    element: (
      <GuestGuard>
        <RegisterPage />
      </GuestGuard>
    ),
  },
  {
    path: paths.googleCallback,
    element: <GoogleCallback />,
  },
];
