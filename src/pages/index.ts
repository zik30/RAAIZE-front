import { lazy } from 'react';

export const HomePage = lazy(() =>
  import('./home/view/HomePage').then((module) => ({
    default: module.HomePage,
  })),
);

export const LoginPage = lazy(() =>
  import('./login/view/LoginPage').then((module) => ({
    default: module.LoginPage,
  })),
);

export const RegisterPage = lazy(() =>
  import('./register/view/RegisterPage').then((module) => ({
    default: module.RegisterPage,
  })),
);

export const WorkplacePage = lazy(() =>
  import('./workplace/view/WorkplacePage').then((module) => ({
    default: module.WorkplacePage,
  })),
);

export const GoogleAuthPage = lazy(() =>
  import('./googleAuth/view/GoogleAuthPage').then((module) => ({
    default: module.GoogleAuthPage,
  })),
);
