import { FC, useEffect, useRef, useState } from 'react';
import styles from './PresentationCanvas.module.scss';
import interact from 'interactjs';

export const PresentationCanvas: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (containerRef.current && !shadowRoot) {
      const shadow = containerRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(shadow);
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (typeof customEvent.detail === 'string' && shadowRoot) {
        const doc = new DOMParser().parseFromString(customEvent.detail, 'text/html');

        shadowRoot.innerHTML = '';

        const styleEl = doc.querySelector('style');
        if (styleEl) {
          const style = document.createElement('style');
          style.textContent = styleEl.textContent || '';
          shadowRoot.appendChild(style);
        }

        const slidesWrapper = document.createElement('div');
        slidesWrapper.className = 'slides-container';

        const slides = Array.from(doc.querySelectorAll('.slide'));
        slides.forEach((slide, idx) => {
          const cloned = slide.cloneNode(true) as HTMLElement;
          cloned.classList.add('slide');
          if (idx === 0) cloned.classList.add('active');

          cloned.querySelectorAll('*').forEach((el) => {
            const elem = el as HTMLElement;

            elem.ondblclick = () => {
              elem.setAttribute('contenteditable', 'true');
              elem.focus();
            };
            elem.onblur = () => {
              elem.removeAttribute('contenteditable');
            };

            if (elem.tagName.match(/^(P|H1|H2|H3|DIV|SPAN)$/)) {
              elem.classList.add('draggable-resizable');
              elem.style.position = 'relative';
              elem.style.display = 'inline-block';
              elem.style.userSelect = 'none';
              elem.style.minWidth = '20px';
              elem.style.minHeight = '20px';
              elem.style.padding = '2px 4px';
              elem.style.border = '1px dashed transparent';
              elem.style.cursor = 'move';

              elem.addEventListener('focus', () => {
                elem.style.userSelect = 'text';
                elem.style.border = '1px solid #4F46E5';
                elem.style.cursor = 'text';
              });
              elem.addEventListener('blur', () => {
                elem.style.userSelect = 'none';
                elem.style.border = '1px dashed transparent';
                elem.style.cursor = 'move';
              });
            }
          });

          slidesWrapper.appendChild(cloned);
        });

        shadowRoot.appendChild(slidesWrapper);

        const navWrapper = document.createElement('div');
        navWrapper.style.display = 'flex';
        navWrapper.style.justifyContent = 'center';
        navWrapper.style.marginTop = '20px';
        navWrapper.style.gap = '10px';

        let currentSlide = 0;

        const updateSlides = () => {
          const all = shadowRoot.querySelectorAll('.slide');
          all.forEach((el, idx) => {
            el.classList.toggle('active', idx === currentSlide);
          });
        };

        const renderSlideButtons = () => {
          navWrapper.innerHTML = '';

          slides.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.textContent = `${idx + 1}`;
            btn.style.padding = '10px 16px';
            btn.style.borderRadius = '12px';
            btn.style.border = 'none';
            btn.style.backgroundColor = idx === currentSlide ? '#4F46E5' : '#E5E7EB';
            btn.style.color = idx === currentSlide ? '#fff' : '#111827';
            btn.style.fontWeight = 'bold';
            btn.style.cursor = 'pointer';

            btn.onclick = () => {
              currentSlide = idx;
              updateSlides();
              renderSlideButtons();
            };

            navWrapper.appendChild(btn);
          });

          const plusBtn = document.createElement('button');
          plusBtn.textContent = '+';
          plusBtn.style.padding = '10px 16px';
          plusBtn.style.borderRadius = '12px';
          plusBtn.style.border = 'none';
          plusBtn.style.backgroundColor = '#D1D5DB';
          plusBtn.style.color = '#111827';
          plusBtn.style.cursor = 'pointer';

          plusBtn.onclick = () => alert('Добавление слайда пока не реализовано');

          navWrapper.appendChild(plusBtn);
        };

        renderSlideButtons();
        shadowRoot.appendChild(navWrapper);
        updateSlides();

        setTimeout(() => {
          if (!shadowRoot) return;
          const draggableElems = shadowRoot.querySelectorAll('.draggable-resizable');
          draggableElems.forEach(elem => {
            interact(elem).draggable({
              listeners: {
                move(event) {
                  const target = event.target as HTMLElement;
                  const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
                  const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;
                  target.style.transform = `translate(${x}px, ${y}px)`;
                  target.setAttribute('data-x', x.toString());
                  target.setAttribute('data-y', y.toString());
                }
              }
            }).resizable({
              edges: { left: true, right: true, bottom: true, top: true },
              modifiers: [
                interact.modifiers.restrictSize({
                  min: { width: 50, height: 20 },
                }),
              ],
            }).on('resizemove', (event) => {
              const target = event.target as HTMLElement;
              const { width, height } = event.rect;
              target.style.width = `${width}px`;
              target.style.height = `${height}px`;
              const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.deltaRect.left;
              const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.deltaRect.top;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
            });
          });
        }, 100);
      }
    };

    window.addEventListener('presentation-generated', handler);
    return () => window.removeEventListener('presentation-generated', handler);
  }, [shadowRoot]);

  return <div className={styles.canvasWrapper} ref={containerRef} />;
};