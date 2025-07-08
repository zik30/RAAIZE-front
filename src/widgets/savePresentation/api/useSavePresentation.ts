import { $authApi } from '@src/shared/lib/requester/requester';
import { useMutation } from '@tanstack/react-query';

export const useSavePresentationMutation = () => {
  return useMutation({
    mutationFn: async ({
      title,
      html,
      boardId,
    }: {
      title: string;
      html: string;
      boardId: number;
    }) => {
      const { data } = await $authApi.post('/presentations/', {
        title,
        board_id: boardId,
        content: {
          additionalProp1: {
            html,
          },
        },
      });
      return data;
    },
  });
};
