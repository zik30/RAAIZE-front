import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleTokenHandler } from '@src/shared/hooks/useGoogleTokenHandler';
import { paths } from '@src/shared/constants/constants';
import { CustomButton, Typography } from '@src/shared/ui';
import styles from './GoogleCallback.module.scss';

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const { isPending, hasError, isProcessing, authParams } =
    useGoogleTokenHandler();

  console.log('GoogleCallback component rendered:', {
    isPending,
    hasError,
    isProcessing,
    authParams: {
      hasCode: !!authParams.code,
      hasError: !!authParams.error,
    },
  });

  useEffect(() => {
    const hasOAuthParams = authParams.code || authParams.error;

    console.log('GoogleCallback useEffect:', {
      hasOAuthParams,
      isPending,
      isProcessing,
    });

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
          <CustomButton
            color="secondary"
            onclick={() => navigate(paths.loginPage, { replace: true })}
            classnames={styles.retryButton}
          >
            Back to Login
          </CustomButton>
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
