import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';

export interface BackendSlide {
  title: string;
  content: string;
}

export interface BackendResponse {
  slides: BackendSlide[];
}

export const useGeneratePresentation = () => {
  return useMutation<BackendResponse, Error, string>({
    mutationFn: async (prompt: string) => {
      const { data } = await $mainApi.post<BackendResponse>(
        '/api/v1/generate/text',
        { text: prompt },
      );
      return data;
    },
  });
};
