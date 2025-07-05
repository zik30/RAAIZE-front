import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleTokenHandler } from '@src/shared/hooks/useGoogleTokenHandler';
import { paths } from '@src/shared/constants/constants';
import { Typography } from '@src/shared/ui';
import styles from './GoogleCallback.module.scss';

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const { isPending, hasError, isProcessing, authParams } =
    useGoogleTokenHandler();

  useEffect(() => {
    const hasOAuthParams = authParams.code || authParams.error;

    if (!hasOAuthParams && !isPending && !isProcessing) {
      console.log(
        'GoogleCallback: No OAuth parameters found, redirecting to login',
      );
      navigate(paths.loginPage, { replace: true });
    }
  }, [authParams, isPending, isProcessing, navigate]);

  if (isPending || isProcessing) {
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

  if (hasError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <Typography variant="h3" color="white">
            Authentication failed
          </Typography>
          <Typography variant="bodyText" color="white">
            Unable to complete Google authentication. Please try again.
          </Typography>
          <button
            onClick={() => navigate(paths.loginPage, { replace: true })}
            className={styles.retryButton}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <Typography variant="h3" color="white">
          Processing...
        </Typography>
      </div>
    </div>
  );
};
