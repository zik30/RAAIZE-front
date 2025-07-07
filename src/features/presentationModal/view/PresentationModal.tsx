import { Modal } from '@src/features/modal';
import { FC } from 'react';
import styles from './PresentationModal.module.scss';
import { CustomButton, Typography } from '@src/shared/ui';

interface IPresentationModalProps {
  name: string;
  html: string;
  date: string;
  setIsOpen: (id: null) => null | void;
  form?: boolean;
}

export const PresentationModal: FC<IPresentationModalProps> = ({
  name,
  html,
  date,
  setIsOpen,
}) => {
  return (
    <Modal onClose={() => setIsOpen(null)}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Typography color="white" weight="bold" variant="h4">
            {name} - created {date}
          </Typography>
          <CustomButton>Edit</CustomButton>
        </div>
        <div className={styles.presentation}>
          <iframe
            srcDoc={html}
            width="100%"
            height="100%"
            title="Inline HTML"
          />
        </div>
      </div>
    </Modal>
  );
};
