import { $authApi } from '@src/shared/lib/requester/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Presentation } from '../types/types';

export const useBoardQuery = (id: number | string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const { data }: { data: Presentation[] } = await $authApi.get(
        '/presentations/',
      );
      const numericId = Number(id);

      if (numericId === 0) {
        return data;
      }

      const board = data.filter(
        (presentation) => presentation.board_id === Number(id),
      );
      if (!board) {
        throw new Error('Board not found');
      }
      return board;
    },
    enabled: !!id,
  });
};

export const useBoardInfoQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['boardInfo', id],
    queryFn: async () => {
      const numericId = Number(id);
      if (numericId === 0) {
        return {
          name: 'profile',
          description: 'All beautifull presentations you have created!',
        };
      }
      const { data } = await $authApi.get(`/boards/${numericId}`);
      console.log(data);

      return data;
    },
    enabled: id !== undefined && id !== null && id !== '',
  });
};

export const usePostPresentationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await $authApi.post(`/templates/${id}/save`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};
