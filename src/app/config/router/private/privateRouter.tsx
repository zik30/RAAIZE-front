import { AuthGuard } from '@src/app/config/guards/AuthGuard';
import { WorkspacePage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';

export const privateRouter = [
  {
    path: paths.workspacePage,
    element: (
      <AuthGuard>
        <WorkspacePage />,
      </AuthGuard>
    ),
  },
];
