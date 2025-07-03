import { paths } from '@src/shared/constants/constants';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@src/shared/hooks/useAuth';
import { CustomButton } from '@src/shared/ui';

export const Header = () => {
  const { isAuth, username, setUsername, logout } = useAuth();

  useEffect(() => {
    if (isAuth && !username) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isAuth, username, setUsername]);

  return (
    <div>
      {isAuth && username ? (
        <span>Welcome, {username}!</span>
      ) : (
        <>
          <Link to={paths.loginPage}>Login</Link>
          {' | '}
          <Link to={paths.registerPage}>Register</Link>
        </>
      )}
      {isAuth && (
        <CustomButton color="primary" onclick={logout}>
          Logout
        </CustomButton>
      )}
    </div>
  );
};
