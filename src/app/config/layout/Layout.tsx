import { Footer } from '@src/widgets/footer';
import { Header } from '@src/widgets/header';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@src/shared/hooks/useAuth';

export const Layout = () => {
  const { isAuth, user, fetchUserData } = useAuth();

  useEffect(() => {
    if (isAuth && !user) fetchUserData();
  }, [isAuth, user, fetchUserData]);

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
