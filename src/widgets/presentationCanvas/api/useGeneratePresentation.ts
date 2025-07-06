import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';

export const useGeneratePresentation = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (prompt: string) => {
      const { data } = await $mainApi.post<string>(
        'generate/',
        { text: prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    },
  });
};
