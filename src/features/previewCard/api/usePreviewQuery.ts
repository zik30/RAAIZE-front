import { BASE_URL } from '@src/shared/constants/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IHtml } from '../types/types';

export const usePreviewQuery = (id: string) => {
  return useQuery<IHtml>({
    queryKey: ['template', id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/templates/${id}?_=${Date.now()}`,
      );
      return data;
    },
  });
};
