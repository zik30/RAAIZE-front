import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { paths } from '@src/shared/constants/constants';
import { useAuth } from '@src/shared/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to={paths.homePage} replace />;
};
