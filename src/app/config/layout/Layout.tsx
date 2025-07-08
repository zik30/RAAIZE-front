import { Footer } from '@src/widgets/footer';
import { Header } from '@src/widgets/header';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@src/shared/hooks/useAuth';
import { paths } from '@src/shared/constants/constants';
import { useGoogleTokenHandler } from '@src/shared/hooks/useGoogleTokenHandler';
import { Loader } from '@src/shared/ui';

export const Layout = () => {
  const { isAuth, user, fetchUserData } = useAuth();
  const location = useLocation();

  useGoogleTokenHandler();

  useEffect(() => {
    if (isAuth && !user) {
      fetchUserData();
    }
  }, [isAuth, user, fetchUserData]);

  const hideLayoutPages = [
    paths.loginPage,
    paths.registerPage,
    paths.googleCallbackApi,
    paths.editPage,
  ];

  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {!shouldHideLayout && <Footer />}
    </>
  );
};
