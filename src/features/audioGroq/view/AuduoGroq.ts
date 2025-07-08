import { useState } from 'react';
import { useAudioGroqQuery } from '../model/useAuduoGroqQuery';

export const AudioGroq = (onResult: (text: string) => void) => {
  const [recordingTime, setRecordingTime] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const { mutateAsync: recognizeAudio } = useAudioGroqQuery();

  const handleMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        try {
          setIsLoadingAudio(true);
          const result = await recognizeAudio(audioBlob);
          onResult(result.text); 
        } catch {
          alert('Ошибка при распознавании речи');
        } finally {
          setIsLoadingAudio(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      setRecordingTime(5);

      const countdown = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev && prev > 1) return prev - 1;
          clearInterval(countdown);
          return null;
        });
      }, 1000);

      setTimeout(() => {
        recorder.stop();
        setIsRecording(false);
        setRecordingTime(null);
      }, 5000);
    } catch {
      alert('Не удалось получить доступ к микрофону');
    }
  };

  return {
    handleMic,
    isRecording,
    recordingTime,
    isLoadingAudio,
  };
};
