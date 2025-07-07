import { $authApi } from '@src/shared/lib/requester/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePresentationsQuery = () => {
  return useQuery({
    queryKey: ['presentations'],
    queryFn: async () => {
      const { data } = await $authApi.get(`/presentations/`);
      return data;
    },
  });
};

export const useCreatePresentationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      html,
      board_id,
    }: {
      title: string;
      html: string;
      board_id: number;
    }) => {
      const { data } = await $authApi.post('/presentations/', {
        title,
        content: {
          additionalProp1: { html },
        },
        board_id,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
    },
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
