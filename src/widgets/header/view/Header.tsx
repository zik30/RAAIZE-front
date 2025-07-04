import { paths } from '@src/shared/constants/constants';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@src/shared/hooks/useAuth';
import { CustomButton, Typography } from '@src/shared/ui';
import styles from './Header.module.scss';
import logo from '@src/shared/assets/images/logo.png';

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
    <header>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo} alt="Logotype" />
        </div>
        <div className={styles.leftSide}>
          {isAuth && username ? (
            <span>{username}&apos;s SayDeck</span>
          ) : (
            <>
              <Typography variant="bodyText">
                <Link to={paths.loginPage}>Login</Link>
                {' | '}
                <Link to={paths.registerPage}>Register</Link>
              </Typography>
            </>
          )}
          {isAuth && (
            <CustomButton color="primary" onclick={logout}>
              Logout
            </CustomButton>
          )}
        </div>
      </div>
    </header>
  );
};
