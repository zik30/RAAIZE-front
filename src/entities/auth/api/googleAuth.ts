import { useAuth } from '@src/shared/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toaster } from '@src/shared/lib/toaster/toaster';

interface GoogleAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface ErrorResponse {
  message: string;
}

type RedirectFn = () => void;

// Функция для инициации Google OAuth
export const initiateGoogleAuth = () => {
  try {
    // Редиректим пользователя на backend endpoint для Google OAuth
    window.location.href =
      'https://saydeck.onrender.com/api/v1/auth/google-login';
  } catch (error) {
    console.error('Error initiating Google auth:', error);
    // Показываем уведомление пользователю
    toaster(
      'error',
      'Google authentication is temporarily unavailable. Please use email/password login.',
    );
  }
};

// Функция для обработки callback от Google
export const handleGoogleCallback = async (token: string) => {
  try {
    const response = await fetch(
      'https://saydeck.onrender.com/api/v1/auth/google-callback',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to authenticate with Google');
    }

    const data: GoogleAuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Google callback error:', error);
    throw error;
  }
};

// Hook для Google авторизации
export const useGoogleAuthMutation = (redirect: RedirectFn) => {
  const { login } = useAuth();

  return useMutation<GoogleAuthResponse, AxiosError<ErrorResponse>, string>({
    mutationKey: ['googleAuth'],
    mutationFn: async (token: string) => {
      return await handleGoogleCallback(token);
    },
    onSuccess: (response) => {
      login({ data: response });
      toaster('success', 'Google sign in successful!');
      redirect();
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ?? 'Google authentication failed';
      toaster('error', errorMessage);
    },
  });
};
