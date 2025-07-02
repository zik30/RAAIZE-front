import { AuthGuard } from '@src/app/config/guards/AuthGuard';
import { PresentationPage } from '@src/pages';
import { routes } from '@src/shared/constants/constants';

export const privateRouter = [
  {
    path: routes.allPresentations,
    element: (
      <AuthGuard>
        <PresentationPage />,
      </AuthGuard>
    ),
  },
];
