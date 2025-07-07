import { useQuery } from '@tanstack/react-query';
import { IHtml } from '../types/types';
import { $mainApi } from '@src/shared/lib/requester/requester';

export const usePreviewQuery = (id: string) => {
  return useQuery<IHtml>({
    queryKey: ['template', id],
    queryFn: async () => {
      const { data } = await $mainApi.get(`/api/v1/templates/${id}`);
      return data;
    },
  });
};
