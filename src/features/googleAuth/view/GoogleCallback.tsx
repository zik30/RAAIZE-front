import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleAuthMutation } from '@src/entities/auth/api/googleAuth';
import { paths } from '@src/shared/constants/constants';
import { Typography } from '@src/shared/ui';
import styles from './GoogleCallback.module.scss';

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    mutate: handleGoogleAuth,
    isPending,
    error,
  } = useGoogleAuthMutation(() => {
    navigate(paths.homePage);
  });

  useEffect(() => {
    // Проверяем наличие ошибки OAuth в URL
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      console.error('OAuth error:', error, errorDescription);
      // Показываем пользователю понятное сообщение об ошибке
      let errorMessage = 'Google authentication failed';

      if (error === 'invalid_client') {
        errorMessage =
          'Google authentication is not configured yet. Please use email/password login.';
      } else if (errorDescription) {
        errorMessage = errorDescription;
      }

      // Перенаправляем на страницу входа с сообщением об ошибке
      navigate(paths.loginPage, {
        state: {
          error: errorMessage,
          showGoogleError: true,
        },
      });
      return;
    }

    // Получаем токен из URL параметров
    const token = searchParams.get('token');

    if (token) {
      // Обрабатываем токен через Google callback
      handleGoogleAuth(token);
    } else {
      // Если токена нет, перенаправляем на страницу входа
      console.error('No token found in URL parameters');
      navigate(paths.loginPage);
    }
  }, [searchParams, handleGoogleAuth, navigate]);

  if (isPending) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Typography variant="h3" color="white">
            Authenticating with Google...
          </Typography>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <Typography variant="h3" color="white">
            Authentication failed
          </Typography>
          <Typography variant="bodyText" color="white">
            {error.message || 'An error occurred during Google authentication'}
          </Typography>
          <button
            onClick={() => navigate(paths.loginPage)}
            className={styles.retryButton}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};
