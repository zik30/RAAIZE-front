import { CustomButton, Typography } from '@src/shared/ui';
import { FC } from 'react';
import styles from './TemplateModal.module.scss';
import { ITemplateModalProps } from '../types/types';
import { Modal } from '@src/features/modal';

export const TemplateModal: FC<ITemplateModalProps> = ({
  name,
  presentation,
  setIsOpen,
}) => {
  return (
    <Modal onClose={() => setIsOpen(null)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Typography color="white" weight="bold" variant="h4">
            {name}
          </Typography>
          <CustomButton>Remix</CustomButton>
        </div>
        <div className={styles.presentation}>{presentation}</div>
      </div>
    </Modal>
  );
};
