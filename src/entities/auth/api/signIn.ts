import { useAuth } from '@src/shared/hooks/useAuth';
import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface SignInPayload {
  email: string;
  username: string;
  password: string;
}

interface SignInResponse {
  email: string;
  username: string;
  id: number;
  role: string;
  credits: number;
  created_at: string;
  is_email_verified: boolean;
  preferences_id: number;
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
        'users/signin/',
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      login(response);
      redirect();
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message ?? 'unknown';
      // eslint-disable-next-line no-console
      console.error('SignIn Error:', errorMessage);
    },
  });
};
