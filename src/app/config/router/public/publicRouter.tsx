import { HomePage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';

export const publicRouter = [
  {
    path: paths.homePage,
    element: <HomePage />,
  },
  {
    path: paths.editPage,
    element: <div>edit</div>,
  },
];
