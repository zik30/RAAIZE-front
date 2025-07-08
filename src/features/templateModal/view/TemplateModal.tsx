import { CustomButton, Typography } from '@src/shared/ui';
import { FC } from 'react';
import styles from './TemplateModal.module.scss';
import { ITemplateModalProps } from '../types/types';
import { Modal } from '@src/features/modal';
import { usePreviewQuery } from '../api/usePreviewQuery';

export const TemplateModal: FC<ITemplateModalProps> = ({
  name,
  id,
  date,
  setIsOpen,
}) => {
  const { data } = usePreviewQuery(id);
  return (
    <Modal onClose={() => setIsOpen(null)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Typography color="white" weight="bold" variant="h4">
            {name} - created {date}
          </Typography>
          <CustomButton>Remix</CustomButton>
        </div>
        <div className={styles.presentation}>
          <iframe
            srcDoc={data?.html}
            width="100%"
            height="100%"
            title="Inline HTML"
          />
        </div>
      </div>
    </Modal>
  );
};
