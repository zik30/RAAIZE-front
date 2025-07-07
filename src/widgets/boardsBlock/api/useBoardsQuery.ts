import { $authApi } from '@src/shared/lib/requester/requester';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useBoardsQuery = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const { data } = await $authApi.get('/boards/');
      return data;
    },
  });
};

export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => {
      const { data } = await $authApi.post('/boards/', {
        name,
        description,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
};

export const useDeleteBoardMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await $authApi.delete(`/boards/${id}`);
    },
  });
};
