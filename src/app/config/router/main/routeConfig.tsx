import { Layout } from '@src/app/config/layout/Layout';
import { routes } from '@src/shared/constants/constants';
import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from '../auth/authRouter';
import { privateRouter } from '../private/privateRouter';
import { publicRouter } from '../public/publicRouter';

export const router = () =>
  createBrowserRouter([
    {
      path: routes.home,
      element: <Layout />,
      children: [...publicRouter, ...privateRouter, ...authRouter],
    },
  ]);
