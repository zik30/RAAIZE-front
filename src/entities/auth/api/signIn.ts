import { useAuth } from '@src/shared/hooks/useAuth';
import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toaster } from '@src/shared/lib/toaster/toaster';
import qs from 'qs';

interface SignInPayload {
  username: string;
  password: string;
}

interface SignInResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface ErrorResponse {
  message: string;
}

type RedirectFn = () => void;

export const useSignInMutation = (redirect: RedirectFn) => {
  const { login } = useAuth();

  return useMutation<SignInResponse, AxiosError<ErrorResponse>, SignInPayload>({
    mutationKey: ['signIn'],
    mutationFn: async (data) => {
      const response = await $mainApi.post<SignInResponse>(
        'auth/login',
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    },
    onSuccess: (response) => {
      login({ data: response });
      toaster('success', 'Sign in successful!');
      redirect();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message ?? 'unknown';
      toaster('error', `Sign in failed: ${errorMessage}`);
    },
  });
};
