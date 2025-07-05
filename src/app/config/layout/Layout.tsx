import { Footer } from '@src/widgets/footer';
import { Header } from '@src/widgets/header';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@src/shared/hooks/useAuth';
import { paths } from '@src/shared/constants/constants';
import { useGoogleTokenHandler } from '@src/shared/hooks/useGoogleTokenHandler';

export const Layout = () => {
  const { isAuth, user, fetchUserData } = useAuth();
  const location = useLocation();

  // Обработка Google токена при загрузке приложения
  useGoogleTokenHandler();

  useEffect(() => {
    if (isAuth && !user) fetchUserData();
  }, [isAuth, user, fetchUserData]);

  const hideLayout = [
    paths.loginPage,
    paths.registerPage,
    paths.googleCallback,
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};
