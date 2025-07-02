import { HomePage } from '@src/pages';
import { routes } from '@src/shared/constants/constants';

export const publicRouter = [
  {
    path: routes.home,
    element: <HomePage />,
  },
];
