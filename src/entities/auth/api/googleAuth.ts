import { useAuth } from '@src/shared/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toaster } from '@src/shared/lib/toaster/toaster';
import { BASE_URL } from '@src/shared/constants/constants';
import { $mainApi } from '@src/shared/lib/requester/requester';

const ENDPOINTS = {
  GOOGLE_LOGIN: 'auth/google-login',
  GOOGLE_CALLBACK: 'auth/google-callback',
} as const;

interface GoogleAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface ErrorResponse {
  message: string;
  detail?: string;
}

type RedirectFn = () => void;

const getCurrentRedirectUrl = (): string => {
  const currentOrigin = window.location.origin;
  return `${currentOrigin}/api/v1/auth/google/callback`;
};

const createGoogleAuthUrl = (redirectUrl: string): string => {
  const encodedRedirectUrl = encodeURIComponent(redirectUrl);
  return `${BASE_URL}/api/v1/${ENDPOINTS.GOOGLE_LOGIN}?redirect_uri=${encodedRedirectUrl}`;
};

export const initiateGoogleAuth = (): void => {
  try {
    const redirectUrl = getCurrentRedirectUrl();
    const authUrl = createGoogleAuthUrl(redirectUrl);

    console.log('Initiating Google auth with redirect URL:', redirectUrl);
    window.location.href = authUrl;
  } catch (error) {
    console.error('Error initiating Google auth:', error);
    toaster(
      'error',
      'Google authentication is temporarily unavailable. Please use email/password login.',
    );
  }
};

export const handleGoogleCallback = async (
  code: string,
): Promise<GoogleAuthResponse> => {
  if (!code?.trim()) {
    throw new Error('Authorization code is required');
  }

  try {
    console.log(
      'Processing Google OAuth callback with code:',
      code.substring(0, 20) + '...',
    );
    console.log('BASE_URL:', BASE_URL);
    console.log(
      'Sending GET request to:',
      `${BASE_URL}/api/v1/${ENDPOINTS.GOOGLE_CALLBACK}?code=${code.substring(
        0,
        20,
      )}...`,
    );

    const response = await $mainApi.get<GoogleAuthResponse>(
      `${ENDPOINTS.GOOGLE_CALLBACK}?code=${encodeURIComponent(code.trim())}`,
    );

    console.log('Google authentication successful');

    if (!response.data.access_token || !response.data.refresh_token) {
      throw new Error('Invalid authentication response: missing tokens');
    }

    return response.data;
  } catch (error) {
    console.error('Google callback processing failed:', error);

    if (error instanceof AxiosError) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        'Failed to authenticate with Google';
      throw new Error(errorMessage);
    }

    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const useGoogleAuthMutation = (redirect: RedirectFn) => {
  const { login } = useAuth();

  return useMutation<GoogleAuthResponse, AxiosError<ErrorResponse>, string>({
    mutationKey: ['googleAuth'],
    mutationFn: handleGoogleCallback,
    onSuccess: (response) => {
      try {
        login({ data: response });
        toaster('success', 'Google sign in successful!');
        redirect();
      } catch (error) {
        console.error('Error during login process:', error);
        toaster('error', 'Login process failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google authentication mutation failed:', error);

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        'Google authentication failed';

      toaster('error', errorMessage);
    },
  });
};
