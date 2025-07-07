import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './PreviewCard.module.scss';
import { CustomButton, Typography } from '@src/shared/ui';
import { IPreviewCardProps } from '../types/types';
import { usePreviewQuery } from '../api/usePreviewQuery';

export const PreviewCard: FC<IPreviewCardProps> = ({
  title,
  date,
  id,
  setIsOpen,
}) => {
  const { data } = usePreviewQuery(id);

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
          <CustomButton classnames={styles.button} color="primary">
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
