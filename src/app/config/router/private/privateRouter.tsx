import { AuthGuard } from '@src/app/config/guards/AuthGuard';
import { WorkplacePage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';

export const privateRouter = [
  {
    path: paths.workspacePage,
    element: (
      <AuthGuard>
        <WorkplacePage />,
      </AuthGuard>
    ),
  },
];
