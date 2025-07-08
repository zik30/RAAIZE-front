import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import styles from './ChatBlock.module.scss';
import { InputAI } from '@src/shared/ui';
import { useGeneratePresentation, useUpdatePresentation } from '@src/widgets/presentationCanvas/api/useGeneratePresentation';
import { AudioGroq } from '@src/features/audioGroq';
import { useExplainPresentation } from '@src/features/fetchAI/model/useFetchAIQuery';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePresentationStore } from '@src/shared/store/presentationStore';
import { Loader } from 'lucide-react';

type Message = { role: 'user' | 'ai'; text: string };

export const ChatBlock: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: generatePresentation } = useGeneratePresentation();
  const { mutateAsync: explainPresentation } = useExplainPresentation();
  const { mutateAsync: updatePresentation } = useUpdatePresentation();

  const { handleMic, isRecording, recordingTime, isLoadingAudio } = AudioGroq((text) => setInput(text));

  const presentationId = usePresentationStore((s) => s.presentation?.presentation_id || null);
  const setIsLoading = usePresentationStore((s) => s.setIsLoading);
  const setPresentation = usePresentationStore((s) => s.setPresentation);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();

    if (userMsg.includes('измени стиль') && presentationId) {
      await updatePresentation({ presentation_id: presentationId, updates: { style: 'funny' } });
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input },
        { role: 'ai', text: '✅ Стиль обновлён на "Весёлый"' },
      ]);
      setInput('');
      return;
    }

    if (userMsg.includes('измени язык') && presentationId) {
      await updatePresentation({ presentation_id: presentationId, updates: { language: 'en' } });
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input },
        { role: 'ai', text: '✅ Язык обновлён на "Английский"' },
      ]);
      setInput('');
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: input },
      { role: 'ai', text: '⏳ Генерация презентации, подождите...' },
    ]);
    setIsLoading(true);

    try {
      const data = await generatePresentation({
        topic: input,
        slides_count: 5,
        audience: 'general',
        style: 'professional',
        language: 'ru',
        include_images: true,
        image_style: 'professional',
        auto_enhance: true,
      });

      const parsed = typeof data === 'string' ? JSON.parse(data) : data;

      setPresentation(parsed);

      const explanation = await explainPresentation(parsed);
      const slidesComments = explanation
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((block) => ({ role: 'ai' as const, text: block }));

      setMessages((prev) => [
        ...prev.filter((m) => m.text !== '⏳ Генерация презентации, подождите...'),
        ...slidesComments,
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev.filter((m) => m.text !== '⏳ Генерация презентации, подождите...'),
        { role: 'ai', text: '❌ Ошибка генерации презентации' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatBlock}>
        <div className={styles.messagesWrapper}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.message} ${msg.role === 'ai' ? styles.ai : styles.user}`}>
              <div className={styles.bubble}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className={styles.form}>
          <InputAI
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            fullWidth
            onMic={handleMic}
            buttonDisabled={false}
            inputDisabled={false}
          >
            {isRecording && <p className={styles.recordingText}> {recordingTime}</p>}
            {isLoadingAudio && <p className={styles.loadingText}><Loader/></p>}
          </InputAI>
        </form>
      </div>
    </div>
  );
};
