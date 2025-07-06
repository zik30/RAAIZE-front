import { navigation, paths } from '@src/shared/constants/constants';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@src/shared/hooks/useAuth';
import { Container, CustomButton, Typography } from '@src/shared/ui';
import styles from './Header.module.scss';
import logo from '@src/shared/assets/images/logo.png';
import classNames from 'classnames';

export const Header = () => {
  const { isAuth, username, setUsername, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuth && !username) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isAuth, username, setUsername]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.innerWrapper}>
            <div className={styles.logo}>
              <Link to={paths.homePage || '/'} aria-label="Go to homepage">
                <img src={logo} alt="Company Logo" />
              </Link>
            </div>

            <nav className={styles.navigation} role="navigation">
              <ul>
                {navigation.map((elem) => (
                  <li key={elem.id}>
                    <Link
                      to={elem.path}
                      className={classNames(styles.navLink, {
                        [styles.active]: location.pathname === elem.path,
                        [styles.soonLink]: elem.isSoon,
                      })}
                    >
                      <div className={styles.navLinkContent}>
                        <Typography variant="smallText" color="white">
                          {elem.key}
                        </Typography>
                        {elem.isSoon && (
                          <span className={styles.soonBadge}>Soon</span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.userActions}>
            {isAuth ? (
              <div className={styles.userInfo}>
                <div className={styles.usernameContainer}>
                  {username ? (
                    <Typography
                      color="white"
                      variant="bodyText"
                      className={styles.username}
                    >
                      {username}
                    </Typography>
                  ) : (
                    <div className={styles.usernameSkeleton} />
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  {username ? (
                    <CustomButton color="secondary" onclick={logout}>
                      <Typography color="black" variant="bodyText">
                        Logout
                      </Typography>
                    </CustomButton>
                  ) : (
                    <div className={styles.buttonSkeleton} />
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to={paths.loginPage}>
                  <CustomButton color="tertiary">
                    <Typography variant="bodyText">Log in</Typography>
                  </CustomButton>
                </Link>
                <Link to={paths.registerPage}>
                  <CustomButton color="secondary">
                    <Typography color="black" variant="bodyText">
                      Sign Up
                    </Typography>
                  </CustomButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
