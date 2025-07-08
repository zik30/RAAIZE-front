import { FC, useEffect, useRef } from 'react';
import styles from './PresentationCanvas.module.scss';
import { usePresentationStore } from '@src/shared/store/presentationStore';

export const PresentationCanvas: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shadowRoot = useRef<ShadowRoot | null>(null);

  const { presentation, currentSlideIndex, setCurrentSlideIndex, isLoading } = usePresentationStore();

  useEffect(() => {
    if (containerRef.current && !shadowRoot.current) {
      shadowRoot.current = containerRef.current.attachShadow({ mode: 'open' });
    }
  }, []);

  useEffect(() => {
    const root = shadowRoot.current;
    if (!root) return;

    if (!presentation || !presentation.slides.length) {
      root.innerHTML = '<p style="padding: 20px; color: #888">Нет презентации</p>';
      return;
    }

    root.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.width = '960px';
    wrapper.style.height = '540px';
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.style.background = '#fff';
    wrapper.style.borderRadius = '12px';
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.padding = '20px';
    wrapper.style.boxShadow = '0 0 15px rgba(0,0,0,0.1)';
    wrapper.style.transformOrigin = 'top left';

    const slide = presentation.slides[currentSlideIndex];
    const slideEl = document.createElement('div');
    slideEl.style.width = '100%';
    slideEl.style.height = '100%';
    slideEl.style.boxSizing = 'border-box';

    const titleEl = document.createElement('div');
    titleEl.innerHTML = slide.title;
    titleEl.contentEditable = 'true';
    titleEl.style.fontSize = '28px';
    titleEl.style.fontWeight = 'bold';
    titleEl.style.marginBottom = '15px';

    const contentEl = document.createElement('div');
    contentEl.innerHTML = slide.content;
    contentEl.contentEditable = 'true';
    contentEl.style.fontSize = '20px';

    slideEl.appendChild(titleEl);
    slideEl.appendChild(contentEl);

    if (slide.image?.url) {
      const img = document.createElement('img');
      img.src = slide.image.url;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '250px';
      img.style.marginTop = '20px';
      img.style.borderRadius = '8px';
      slideEl.appendChild(img);
    }

    wrapper.appendChild(slideEl);
    root.appendChild(wrapper);

    const nav = document.createElement('div');
    nav.style.display = 'flex';
    nav.style.justifyContent = 'center';
    nav.style.gap = '8px';
    nav.style.marginTop = '20px';

    for (let i = 0; i < presentation.slides.length; i++) {
      const btn = document.createElement('button');
      btn.textContent = `${i + 1}`;
      btn.style.padding = '8px 12px';
      btn.style.borderRadius = '6px';
      btn.style.background = i === currentSlideIndex ? '#4F46E5' : '#E5E7EB';
      btn.style.color = i === currentSlideIndex ? '#fff' : '#111827';
      btn.onclick = () => setCurrentSlideIndex(i);
      nav.appendChild(btn);
    }

    root.appendChild(nav);

    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const scaleX = containerWidth / 1000; 
      const scaleY = containerHeight / 600;
      const maxClientScale = Math.min(scaleX, scaleY, 1);

      const backendScale = slide.scale ?? 1; 

      const finalScale = Math.min(maxClientScale, backendScale);

      wrapper.style.transform = `scale(${finalScale})`;
    }
  }, [presentation, currentSlideIndex]);

  return (
    <div
      className={styles.canvasWrapper}
      ref={containerRef}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: 22, color: '#4F46E5', fontWeight: 600 }}>
            ⏳ Генерируется презентация...
          </div>
        </div>
      )}
    </div>
  );
};
