import { useQuery } from '@tanstack/react-query';
import { ITemplates } from '../types/types';
import { $mainApi } from '@src/shared/lib/requester/requester';

export const useTemplatesQuery = () => {
  return useQuery<ITemplates[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await $mainApi.get(`/templates/`);
      return data;
    },
  });
};

export const usePopularTemplatesQuery = () => {
  return useQuery<ITemplates[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await $mainApi.get(`templates/popular/`);
      return data;
    },
  });
};

export const useTemplateQuery = (templateId: string) => {
  return useQuery<string>({
    queryKey: ['template', templateId],
    queryFn: async () => {
      const { data } = await $mainApi.get(`/templates/${templateId}`);
      return data;
    },
  });
};
