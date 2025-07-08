import { $mainApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';

interface GeneratePresentationPayload {
  topic: string;
  slides_count: number;
  audience: string;
  style: string;
  language: string;
  include_images: boolean;
  image_style: string;
  auto_enhance: boolean;
}

export const useGeneratePresentation = () => {
  return useMutation<any, Error, GeneratePresentationPayload>({
    mutationFn: async (payload) => {
      const { data } = await $mainApi.post('/enhanced/generate', payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });

      return data;
    },
  });
};


interface UpdatePresentationPayload {
  presentation_id: string;
  updates: Partial<{
    topic: string;
    slides_count: number;
    audience: string;
    style: string;
    language: string;
    include_images: boolean;
    image_style: string;
    auto_enhance: boolean;
  }>;
}

export const useUpdatePresentation = () => {
  return useMutation({
    mutationFn: async ({ presentation_id, updates }: UpdatePresentationPayload) => {
      const { data } = await $mainApi.put(
        `/enhanced/presentation/${presentation_id}`,
        updates,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    },
  });
};
