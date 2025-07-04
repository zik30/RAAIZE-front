import { FC, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from './PresentationCanvas.module.scss';
import type { Slide } from '../types/types';
import { CustomButton } from '@src/shared/ui';

export const PresentationCanvas: FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      elements: [
        {
          id: 't1',
          type: 'text',
          x: 50,
          y: 50,
          content: 'Заголовок презентации',
        },
      ],
    },
  ]);

  const [selectedSlide, setSelectedSlide] = useState(0);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && Array.isArray(e.detail.slides)) {
        setSlides(e.detail.slides);
        setSelectedSlide(0);
      }
    };
    window.addEventListener('presentation-generated', handler);
    return () => window.removeEventListener('presentation-generated', handler);
  }, []);

  const addSlide = () => {
    setSlides((prev) => [...prev, { id: Date.now(), elements: [] }]);
    setSelectedSlide(slides.length);
  };

  const handleSaveText = (elIdx: number) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[selectedSlide].elements[elIdx].content = editingText;
      return newSlides;
    });
    setEditingElementId(null);
    setEditingText('');
  };

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.canvas}>
        <div className={styles.slideArea}>
          {slides[selectedSlide]?.elements.map((el, elIdx) => (
            <Rnd
              key={el.id}
              default={{
                x: el.x,
                y: el.y,
                width: 220,
                height: 60,
              }}
              bounds="parent"
              onDragStop={(_, d) => {
                setSlides((prev) => {
                  const newSlides = [...prev];
                  newSlides[selectedSlide].elements[elIdx].x = d.x;
                  newSlides[selectedSlide].elements[elIdx].y = d.y;
                  return newSlides;
                });
              }}
              onResizeStop={(_, __, ref, ___, pos) => {
                setSlides((prev) => {
                  const newSlides = [...prev];
                  newSlides[selectedSlide].elements[elIdx].x = pos.x;
                  newSlides[selectedSlide].elements[elIdx].y = pos.y;
                  return newSlides;
                });
              }}
              style={{ zIndex: 2 }}
            >
              <div
                className={styles.slideElement}
                style={{ width: '100%', height: '100%', padding: 6 }}
                onDoubleClick={() => {
                  setEditingElementId(el.id);
                  setEditingText(el.content);
                }}
              >
                {editingElementId === el.id ? (
                  <textarea
                    value={editingText}
                    autoFocus
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveText(elIdx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSaveText(elIdx);
                      }
                    }}
                    className={styles.editInput}
                    style={{
                      width: '100%',
                      height: '100%',
                      font: 'inherit',
                      resize: 'none',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                ) : (
                  el.content
                )}
              </div>
            </Rnd>
          ))}
        </div>
      </div>

      <div className={styles.slideList}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={
              styles.slideThumb +
              (selectedSlide === idx ? ' ' + styles.selected : '')
            }
            onClick={() => setSelectedSlide(idx)}
          >
            Слайд {idx + 1}
          </div>
        ))}
        <CustomButton classnames={styles.addSlideBtn} onclick={addSlide}>
          +
        </CustomButton>
      </div>
    </div>
  );
};
