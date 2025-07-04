import React, { FC, useState, useRef, FormEvent } from 'react';
import styles from './ChatBlock.module.scss'
import { useGeneratePresentation } from '@src/widgets/presentationCanvas/api/useGeneratePresentation';
import { CustomButton, CustomInput } from '@src/shared/ui';

type Message = { role: 'user' | 'ai'; text: string };

export const ChatBlock: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { mutateAsync: generatePresentation } = useGeneratePresentation();

  
  const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev: Message[]) => [...prev, { role: 'user', text: input }]);
    try {
      const data = await generatePresentation(input);
      const slides = Array.isArray(data.slides)
        ? data.slides.map((s: { title?: string; content?: string }, idx: number) => ({
            id: idx + 1,
            elements: [
              {
                id: `t${idx + 1}`,
                type: 'text',
                x: 50,
                y: 50,
                content: (s.title ? s.title + '\n' : '') + (s.content || ''),
              },
            ],
          }))
        : [];
      setMessages((prev: Message[]) => [
        ...prev,
        { role: 'ai', text: 'Презентация сгенерирована!' },
      ]);
      window.dispatchEvent(
        new CustomEvent('presentation-generated', { detail: { slides } }),
      );
    } catch {
      setMessages((prev: Message[]) => [
        ...prev,
        { role: 'ai', text: 'Ошибка генерации презентации' },
      ]);
    }
    setInput('');
  };


  const handleMic = () => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('Speech recognition not supported');
      return;
    }
    setIsRecording(true);
    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatBlock}>
        <form onSubmit={handleSend} className={styles.form}>
          <div className={styles.messages}>
            {messages.map((msg: Message, idx: number) => (
              <div
                key={idx}
                className={
                  styles.message + (msg.role === 'ai' ? ' ' + styles.ai : '')
                }
              >
                <span className={styles.bubble}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className={styles.inputRow}>
            <CustomInput
              type="text"
              value={input}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Введите промт..."
            />
            <CustomButton
              onclick={handleMic}
              disabled={isRecording}
              classnames={styles.micBtn}
            >
              {isRecording ? '...' : '🎤'}
            </CustomButton>
            <CustomButton classnames={styles.sendBtn} type="submit">
              ➤
            </CustomButton>
          </div>
        </form>
      </div>
      <div className={styles.chat}>
        {/* Здесь можно добавить дополнительные элементы, например, подсказки или FAQ */}
      </div>
    </div>
  );
};
