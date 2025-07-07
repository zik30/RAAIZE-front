import { Modal } from '@src/features/modal';
import { CustomButton, CustomInput, Typography } from '@src/shared/ui';
import styles from './BoardModal.module.scss';
import { ChangeEvent, FC, useState } from 'react';
import { IBoardModalProps } from '../types/types';

export const BoardModal: FC<IBoardModalProps> = ({ setIsOpen, create }) => {
  const [data, setData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal onClose={() => setIsOpen(false)}>
      <div className={styles.wrapper}>
        <Typography color="white" weight="semiBold" variant="h3">
          Create a new board
        </Typography>
        <div className={styles.inputWrapper}>
          <label htmlFor="">
            <Typography variant="smallText" color="grey">
              Type the title of the board
            </Typography>
            <CustomInput
              name="title"
              value={data.title}
              placeholder="Title..."
              fullWidth
              type="text"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <Typography color="grey" variant="smallText">
            What is its the purpose?
          </Typography>
          <CustomInput
            name="description"
            value={data.description}
            placeholder="Description..."
            fullWidth
            type="text"
            onChange={handleChange}
          />
        </div>
        <CustomButton
          size="large"
          onclick={() => {
            create(data.title, data.description);
            setIsOpen(false);
          }}
          disabled={!data.description || !data.title}
          classnames={styles.button}
        >
          Create
        </CustomButton>
      </div>
    </Modal>
  );
};
