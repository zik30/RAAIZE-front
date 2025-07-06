import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paths } from '@src/shared/constants/constants';
import { toaster } from '@src/shared/lib/toaster/toaster';
import { useGoogleAuthMutation } from '@src/entities/auth';

interface GoogleAuthParams {
  code?: string;
  error?: string;
  error_description?: string;
  state?: string;
}

export const useGoogleTokenHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccessRedirect = useCallback(() => {
    navigate(paths.homePage, { replace: true });
  }, [navigate]);

  const {
    mutate: handleGoogleAuth,
    isPending,
    error,
  } = useGoogleAuthMutation(handleSuccessRedirect);

  const googleAuthParams = useMemo((): GoogleAuthParams => {
    const searchParams = new URLSearchParams(location.search);
    return {
      code: searchParams.get('code') || undefined,
      error: searchParams.get('error') || undefined,
      error_description: searchParams.get('error_description') || undefined,
      state: searchParams.get('state') || undefined,
    };
  }, [location.search]);

  const cleanupUrl = useCallback(() => {
    const cleanPath = location.pathname;
    window.history.replaceState({}, document.title, cleanPath);
  }, [location.pathname]);

  const handleOAuthError = useCallback(
    (error: string, description?: string) => {
      console.error('Google OAuth error:', { error, description });

      const errorMessages: Record<string, string> = {
        access_denied: 'Google authorization was cancelled',
        invalid_request: 'Invalid authorization request',
        unauthorized_client: 'Application is not authorized',
        unsupported_response_type: 'Unsupported response type',
        invalid_scope: 'Invalid authorization scope',
        server_error: 'Google authorization server error',
        temporarily_unavailable:
          'Google authorization service is temporarily unavailable',
      };

      const userMessage =
        errorMessages[error] || description || 'Google authorization failed';
      toaster('error', userMessage);

      navigate(paths.loginPage, { replace: true });
    },
    [navigate],
  );

  const processGoogleCallback = useCallback(() => {
    const { code, error, error_description } = googleAuthParams;

    console.log('Processing Google callback with params:', {
      code: code ? 'present' : 'missing',
      error,
      error_description,
      location: location.pathname + location.search,
    });

    if (error) {
      handleOAuthError(error, error_description);
      cleanupUrl();
      return;
    }

    if (code) {
      console.log(
        'Processing Google OAuth authorization code:',
        code.substring(0, 20) + '...',
      );
      handleGoogleAuth(code);
      cleanupUrl();
      return;
    }

    if (
      location.search &&
      (location.search.includes('google') || location.search.includes('oauth'))
    ) {
      console.warn(
        'Unexpected Google OAuth callback parameters:',
        googleAuthParams,
      );
      toaster('warning', 'Invalid Google authorization response');
      cleanupUrl();
      navigate(paths.loginPage, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    googleAuthParams,
    handleGoogleAuth,
    handleOAuthError,
    cleanupUrl,
    location.search,
    navigate,
  ]);

  useEffect(() => {
    const isGoogleCallback =
      location.pathname.includes('/api/v1/auth/google-callback') ||
      googleAuthParams.code ||
      googleAuthParams.error;

    console.log('useGoogleTokenHandler useEffect:', {
      pathname: location.pathname,
      search: location.search,
      isGoogleCallback,
      hasCode: !!googleAuthParams.code,
      hasError: !!googleAuthParams.error,
    });

    if (isGoogleCallback) {
      processGoogleCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location.pathname,
    processGoogleCallback,
    googleAuthParams.code,
    googleAuthParams.error,
  ]);

  return {
    isPending,
    hasError: !!error,
    isProcessing: isPending,
    authParams: googleAuthParams,
  };
};
