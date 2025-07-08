import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './PreviewCard.module.scss';
import { CustomButton, Typography } from '@src/shared/ui';
import { IPreviewCardProps } from '../types/types';
import { usePreviewQuery } from '../api/usePreviewQuery';
import { usePresentationStore } from '@src/shared/store/presentationStore';
import { useGeneratePresentation } from '@src/widgets/presentationCanvas/api/useGeneratePresentation';
import { useNavigate } from 'react-router-dom';

export const PreviewCard: FC<IPreviewCardProps> = ({
  title,
  date,
  id,
  setIsOpen,
}) => {
  const { data } = usePreviewQuery(id);
  const { setPresentation, setIsLoading } = usePresentationStore();

  const { mutateAsync: generatePresentation } = useGeneratePresentation();
  const navigate = useNavigate();

  const handleRemix = async () => {
    if (!data) return;

    try {
      setIsLoading(true);

      const generated = await generatePresentation({
        topic: title,
        slides_count: 5,
        audience: 'general',
        style: 'modern', 
        language: 'ru',
        include_images: true,
        image_style: 'professional',
        auto_enhance: true,
      });

      const parsedPresentation = typeof generated === 'string' ? JSON.parse(generated) : generated;
      setIsOpen(null); 
      navigate('/edit');
      setPresentation(parsedPresentation);

      setIsOpen(null);
    } catch (error) {
      console.error('Ошибка генерации презентации:', error);
      alert('Ошибка при генерации презентации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={'hover'}
      initial="rest"
      animate="rest"
      className={styles.template}
      key={id}
    >
      <div className={styles.iframeWrapper}>
        <motion.iframe
          srcDoc={data?.html}
          width="100%"
          height="100%"
          title="Inline HTML"
          variants={{
            rest: { filter: 'brightness(1.0)' },
            hover: { filter: 'brightness(0.6)' },
          }}
          transition={{ duration: 0.3 }}
          className={styles.html}
        />
        <motion.div
          className={styles.buttons}
          variants={{
            rest: { opacity: 0, scale: 0.8, pointerEvents: 'none' },
            hover: { opacity: 1, scale: 1, pointerEvents: 'auto' },
          }}
          transition={{ duration: 0.3 }}
        >
          <CustomButton classnames={styles.button} color="primary" onclick={handleRemix}>
            Remix
          </CustomButton>
          <CustomButton
            onclick={() => setIsOpen(id)}
            classnames={styles.button}
            color="secondary"
          >
            Preview
          </CustomButton>
        </motion.div>
      </div>
      <div className={styles.text}>
        <Typography color="white" align="center" variant="bodyText">
          {title}
        </Typography>
        <Typography color="white" align="center" variant="smallText">
          Created at {date}
        </Typography>
      </div>
    </motion.div>
  );
};
