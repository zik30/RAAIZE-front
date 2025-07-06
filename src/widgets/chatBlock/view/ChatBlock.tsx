import { FC, useState, FormEvent, ChangeEvent } from 'react';
import styles from './ChatBlock.module.scss';
import { InputAI } from '@src/shared/ui';
import { useGeneratePresentation } from '@src/widgets/presentationCanvas/api/useGeneratePresentation';
import { useMicQuery } from '../api/useChatBlockQuery';

type Message = { role: 'user' | 'ai'; text: string };

export const ChatBlock: FC = () => {
  const [recordingTime, setRecordingTime] = useState<number | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { mutateAsync: generatePresentation } = useGeneratePresentation();

  const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev: Message[]) => [...prev, { role: 'user', text: input }]);
    try {
      const data = await generatePresentation(input);
      interface SlideData {
        title?: string;
        content?: string;
      }

      interface ParsedData {
        slides?: SlideData[];
        [key: string]: unknown;
      }

      let parsedData: ParsedData = typeof data === 'object' && data !== null ? data as ParsedData : {};
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data) as ParsedData;
        } catch {
          parsedData = {};
        }
      }
      const slides = Array.isArray(parsedData.slides)
        ? parsedData.slides.map((s: SlideData, idx: number) => ({
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
//   const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
//     if (e) e.preventDefault();
//     if (!input.trim()) return;
//     setMessages((prev) => [...prev, { role: 'user', text: input }]);

//     try {
//       //  Фейковые HTML-данные
//       const fakeHtml = `
//    <!DOCTYPE html>
// <html lang="ru">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Искусственный интеллект: возможности и перспективы</title>
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//         }
        
//         body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             min-height: 100vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #333;
//         }
        
//         .presentation-container {
//             width: 90%;
//             max-width: 900px;
//             background: white;
//             border-radius: 20px;
//             box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
//             overflow: hidden;
//             position: relative;
//         }
        
//         .presentation-header {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             padding: 30px;
//             text-align: center;
//         }
        
//         .presentation-title {
//             font-size: 2.5rem;
//             font-weight: 700;
//             margin-bottom: 10px;
//             text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//         }
        
//         .slide {
//             display: none;
//             padding: 40px;
//             min-height: 500px;
//             animation: fadeIn 0.5s ease-in-out;
//         }
        
//         .slide.active {
//             display: block;
//         }
        
//         .slide-content h1 {
//             color: #667eea;
//             font-size: 2.2rem;
//             margin-bottom: 20px;
//             border-bottom: 3px solid #667eea;
//             padding-bottom: 10px;
//         }
        
//         .slide-content h2 {
//             color: #764ba2;
//             font-size: 1.8rem;
//             margin-bottom: 15px;
//             margin-top: 25px;
//         }
        
//         .slide-content h3 {
//             color: #667eea;
//             font-size: 1.4rem;
//             margin-bottom: 12px;
//             margin-top: 20px;
//         }
        
//         .slide-content p {
//             font-size: 1.1rem;
//             line-height: 1.7;
//             margin-bottom: 15px;
//             color: #555;
//         }
        
//         .slide-content strong {
//             color: #667eea;
//             font-weight: 600;
//         }
        
//         .slide-content em {
//             color: #764ba2;
//             font-style: italic;
//         }
        
//         .slide-content ul {
//             margin: 20px 0;
//             padding-left: 0;
//         }
        
//         .slide-content li {
//             list-style: none;
//             margin: 12px 0;
//             padding: 12px 20px;
//             background: linear-gradient(135deg, #f8f9ff 0%, #e8edff 100%);
//             border-left: 4px solid #667eea;
//             border-radius: 8px;
//             font-size: 1.05rem;
//             position: relative;
//         }
        
//         .slide-content li:before {
//             content: "→";
//             color: #667eea;
//             font-weight: bold;
//             margin-right: 10px;
//         }
        
//         .slide-title {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             text-align: center;
//             padding: 60px 40px;
//         }
        
//         .slide-conclusion {
//             background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//             color: white;
//             padding: 40px;
//         }
        
//         .slide-conclusion h1,
//         .slide-conclusion h2,
//         .slide-conclusion h3 {
//             color: white;
//         }
        
//         .navigation {
//             position: absolute;
//             bottom: 20px;
//             left: 50%;
//             transform: translateX(-50%);
//             display: flex;
//             gap: 10px;
//         }
        
//         .nav-btn {
//             background: #667eea;
//             color: white;
//             border: none;
//             padding: 12px 24px;
//             border-radius: 25px;
        
//             cursor: pointer;
//             font-size: 14px;
//             font-weight: 500;
//             transition: all 0.3s ease;
//             box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
//         }
        
//         .nav-btn:hover {
//             background: #5a67d8;
//             transform: translateY(-2px);
//             box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
//         }
        
//         .nav-btn:disabled {
//             background: #ccc;
//             cursor: not-allowed;
//             transform: none;
//             box-shadow: none;
//         }
        
//         .slide-counter {
//             position: absolute;
//             top: 20px;
//             right: 20px;
//             background: rgba(102, 126, 234, 0.1);
//             padding: 8px 15px;
//             border-radius: 20px;
//             font-size: 14px;
//             color: #667eea;
//             font-weight: 500;
//         }
        
//         @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
        
//         @media (max-width: 768px) {
//             .presentation-container { width: 95%; }
//             .slide { padding: 20px; }
//             .presentation-title { font-size: 2rem; }
//             .slide-content h1 { font-size: 1.8rem; }
//         }
//     </style>
// </head>
// <body>
//     <div class="presentation-container">
//         <div class="presentation-header">
//             <h1 class="presentation-title">Искусственный интеллект: возможности и перспективы</h1>
//             <div class="slide-counter">
//                 <span id="current-slide">1</span> / <span id="total-slides">5</span>
//             </div>
//         </div>
        
//         <div class="slides-container">
            
//         <div class="slide slide-title active" data-slide="0">
//             <div class="slide-content">
//                 <h1>Введение в искусственный интеллект</h1>
//                 <p>Искусственный интеллект (ИИ) — это <strong>технология,</strong> которая позволяет машинам и компьютерам выполнять задачи, требующие человеческого разума.</p><p>ИИ активно развивается и находит применение в различных сферах: от медицины и финансов до транспорта и образования.</p>
//             </div>
//         </div>
        
//         <div class="slide slide-content" data-slide="1">
//             <div class="slide-content">
//                 <h2>Применение искусственного интеллекта</h2>
//                 <ul><li><strong>Медицина:</strong> диагностика и лечение заболеваний</li><li><strong>Транспорт:</strong> автономные автомобили и системы управления трафиком</li><li><strong>Финансы:</strong> анализ данных и прогнозирование</li></ul><p>ИИ также используется в <em>образовании,</em> для персонализации обучения и улучшения результатов.</p>
//             </div>
//         </div>
        
//         <div class="slide slide-content" data-slide="2">
//             <div class="slide-content">
//                 <h3>Преимущества и вызовы ИИ</h3>
//                 <p><strong>Преимущества:</strong> повышение эффективности, точности и скорости выполнения задач.</p><p><em>Вызовы:</em> этика, безопасность и потенциальная безработица.</p><div>Необходимо найти баланс между преимуществами и вызовами для успешного развития ИИ.</div>
//             </div>
//         </div>
        
//         <div class="slide slide-content" data-slide="3">
//             <div class="slide-content">
//                 <h2>Будущее искусственного интеллекта</h2>
//                 <p>ИИ будет продолжать развиваться и улучшаться, открывая новые возможности и решая сложные задачи.</p><span>Важно инвестировать в исследования и разработки, чтобы обеспечить безопасное и этичное развитие ИИ.</span><br><span>Будущее ИИ зависит от нашего коллективного разума и действий.</span>
//             </div>
//         </div>
        
//         <div class="slide slide-conclusion" data-slide="4">
//             <div class="slide-content">
//                 <h1>Заключение</h1>
        
//                 <p>Искусственный интеллект — это <strong>мощная технология,</strong> которая изменит мир.</p><p>Необходимо <em>ответственно подходить</em> к развитию и применению ИИ, чтобы обеспечить его пользу для человечества.</p>
//             </div>
//         </div>
        
//         </div>
        
//         <div class="navigation">
//             <button class="nav-btn" id="prev-btn" onclick="previousSlide()">← Предыдущий</button>
//             <button class="nav-btn" id="next-btn" onclick="nextSlide()">Следующий →</button>
//         </div>
//     </div>
    
//     <script>
//         let currentSlide = 0;
//         const totalSlides = 5;
        
//         function showSlide(n) {
//             const slides = document.querySelectorAll('.slide');
            
//             if (n >= totalSlides) currentSlide = 0;
//             if (n < 0) currentSlide = totalSlides - 1;
            
//             slides.forEach(slide => slide.classList.remove('active'));
//             slides[currentSlide].classList.add('active');
            
//             document.getElementById('current-slide').textContent = currentSlide + 1;
            
//             // Обновляем состояние кнопок
//             document.getElementById('prev-btn').disabled = currentSlide === 0;
//             document.getElementById('next-btn').disabled = currentSlide === totalSlides - 1;
//         }
        
//         function nextSlide() {
//             if (currentSlide < totalSlides - 1) {
//                 currentSlide++;
//                 showSlide(currentSlide);
//             }
//         }
        
//         function previousSlide() {
//             if (currentSlide > 0) {
//                 currentSlide--;
//                 showSlide(currentSlide);
//             }
//         }
        
//         // Инициализация
//         showSlide(0);
        
//         // Навигация с клавиатуры
//         document.addEventListener('keydown', function(e) {
//             if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
//             if (e.key === 'ArrowLeft') previousSlide();
//         });
//     </script>
// </body>
// </html>

//    `;

//       window.dispatchEvent(
//         new CustomEvent('presentation-generated', { detail: fakeHtml }),
//       );

//       setMessages((prev) => [
//         ...prev,
//         { role: 'ai', text: 'Фейковая презентация сгенерирована!' },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: 'ai', text: 'Ошибка генерации презентации' },
//       ]);
//     }

//     setInput('');
//   };

  const { mutateAsync: recognizeAudio } = useMicQuery();

  const handleMicGroq = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });

        try {
          setIsLoadingAudio(true);
          const result = await recognizeAudio(audioBlob);
          setInput(result.text);
        } catch  {
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
    } catch  {
      alert('Не удалось получить доступ к микрофону');
    }
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

          <InputAI
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            fullWidth={true}
            onMic={handleMicGroq}
          >
            {isRecording && (
              <p className={styles.recordingText}>
                ... {recordingTime !== null ? `(${recordingTime})` : ''}
              </p>
            )}
            {isLoadingAudio && (
              <p className={styles.loadingText}>⏳ Обработка аудио...</p>
            )}
          </InputAI>
        </form>
      </div>
      <div className={styles.chat}></div>
    </div>
  );
};
