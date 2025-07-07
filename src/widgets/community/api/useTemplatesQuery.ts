import { useQuery } from '@tanstack/react-query';
import { ITemplates } from '../types/types';
import axios from 'axios';
import { BASE_URL } from '@src/shared/constants/constants';

export const useTemplatesQuery = () => {
  return useQuery<ITemplates[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/templates/?_=${Date.now()}`,
      );
      return data;
    },
  });
};

export const usePopularTemplatesQuery = () => {
  return useQuery<ITemplates[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}templates/popular/?_=${Date.now()}`,
      );
      return data;
    },
  });
};

export const useTemplateQuery = (templateId: string) => {
  return useQuery<string>({
    queryKey: ['template', templateId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/templates/${templateId}?_=${Date.now()}`,
      );
      return data;
    },
  });
};
