import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IMic } from '../types/types';

const API_KEY = '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';

export const useAudioGroqQuery = () => {
  return useMutation<IMic, Error, Blob>({
    mutationFn: async (audioBlob) => {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      formData.append('model', 'whisper-large-v3');

      const { data } = await axios.post<IMic>(
        'https://api.groq.com/openai/v1/audio/transcriptions?language=ru',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      return data;
    },
  });
};
