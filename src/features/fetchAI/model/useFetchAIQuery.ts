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
                'You are an assistant that explains presentations. For each slide, write a separate paragraph. Use headings (e.g., "Slide 1") and lists or highlights for important points. Reply in English and format in markdown.',
            },
            {
              role: 'user',
              content: `Here is the presentation JSON:\n${JSON.stringify(
                presentationData,
              )}\nPlease explain it in detail to a human.`,
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
        throw new Error('No response from Fetch.ai');
      }

      return reply.trim();
    },
  });
};
