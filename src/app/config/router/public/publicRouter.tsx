import { FaqPage, HomePage, PricingPage } from '@src/pages';
import { paths } from '@src/shared/constants/constants';

export const publicRouter = [
  {
    path: paths.homePage,
    element: <HomePage />,
  },
  {
    path: paths.pricing,
    element: <PricingPage />,
  },
  {
    path: paths.faq,
    element: <FaqPage />,
  },
];
