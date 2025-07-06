import { FC, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from './PresentationCanvas.module.scss';

type Slide = {
  id: number;
  elements: Array<{
    id: string;
    type: 'text';
    x: number;
    y: number;
    content: string; 
  }>;
};

export const PresentationCanvas: FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [selectedSlide, setSelectedSlide] = useState(0);

  
  const parseHtmlToSlides = (htmlString: string): Slide[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const slideDivs = doc.querySelectorAll('.slide');
    const slides: Slide[] = [];

    slideDivs.forEach((slideNode, index) => {
      const elements = Array.from(slideNode.children).map((el, idx) => ({
        id: `s${index + 1}-el${idx + 1}`,
        type: 'text' as const,
        x: 50 + idx * 20,
        y: 50 + idx * 30,
        content: el.outerHTML,
      }));

      slides.push({ id: index + 1, elements });
    });

    return slides;
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (typeof customEvent.detail === 'string') {
        const parsedSlides = parseHtmlToSlides(customEvent.detail);
        setSlides(parsedSlides);
        setSelectedSlide(0);
      }
    };

    window.addEventListener('presentation-generated', handler);
    return () => window.removeEventListener('presentation-generated', handler);
  }, []);

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      elements: [],
    };
    setSlides((prev) => [...prev, newSlide]);
    setSelectedSlide(slides.length);
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
                width: 250,
                height: 80,
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
                style={{ width: '100%', height: '100%' }}
                dangerouslySetInnerHTML={{ __html: el.content }}
              />
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
        <button className={styles.addSlideBtn} onClick={addSlide}>
          +
        </button>
      </div>
    </div>
  );
};
