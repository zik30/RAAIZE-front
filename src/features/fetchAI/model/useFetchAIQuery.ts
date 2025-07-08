import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = 'sk_f292d5c01116477aae801623c6c07d9c2ef6cfa1af3a4f64afc8907a0d0248c3';

export const useExplainPresentation = () => {
  return useMutation<string, Error, any>({
    mutationFn: async (presentationData) => {
      const response = await axios.post(
        'https://api.asi1.ai/v1/chat/completions',
        {
          model: 'asi1-mini',
          messages: [
            {
              role: 'system',
              content:
                'Ты помощник, который объясняет презентации. Для каждого слайда напиши отдельный абзац. Используй заголовки (например, "Слайд 1") и списки или выделения для важных моментов. Отвечай на русском и форматируй в markdown.',
            },
            {
              role: 'user',
              content: `Вот JSON презентации:\n${JSON.stringify(
                presentationData,
              )}\nПожалуйста, объясни её человеку подробно.`,
            },
          ],
          temperature: 0.6,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const reply = response.data?.choices?.[0]?.message?.content;

      if (!reply) {
        throw new Error('Ответ от Fetch.ai пустой');
      }

      return reply.trim();
    },
  });
};
