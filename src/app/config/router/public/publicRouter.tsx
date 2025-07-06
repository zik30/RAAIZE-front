import { HomePage } from '@src/pages';
import { CommunityPage } from '@src/pages/community';
import { paths } from '@src/shared/constants/constants';

export const publicRouter = [
  {
    path: paths.homePage,
    element: <HomePage />,
  },
  {
    path: paths.communityPage,
    element: <CommunityPage />,
  },
];
