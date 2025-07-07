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
      console.log(id);

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
      const { data } = await $authApi.get(`/boards/${id}`);
      return data;
    },
    enabled: !!id,
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
