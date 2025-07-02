import { user } from '@src/shared/constants/constants';
import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { toaster } from '@src/shared/lib/toaster/toaster';

interface SignUpData {
  email: string;
  username: string;
  password: string;
}

interface SignUpResponse {
  message: string;
}

export const useSignUpMutation = (
  redirect: () => void,
): UseMutationResult<AxiosResponse<SignUpResponse>, AxiosError, SignUpData> => {
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (
      data: SignUpData,
    ): Promise<AxiosResponse<SignUpResponse>> =>
      await $mainApi.post('auth/register', data),
    onSuccess: (response: AxiosResponse<SignUpResponse>) => {
      const requestData = JSON.parse(response.config.data) as SignUpData;

      sessionStorage.setItem(user.email, requestData.email);

      redirect();
    },
    onError: (error: AxiosError) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (error.response?.data as any)?.message;
      const errorMessage =
        data?.email?.[0] ||
        data?.username?.[0] ||
        data?.password?.[0] ||
        'Registration failed';

      toaster('error', errorMessage);
    },
  });
};
