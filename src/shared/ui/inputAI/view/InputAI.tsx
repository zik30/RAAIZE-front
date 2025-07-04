import { FC } from 'react';
import styles from './InputAI.module.scss';
import { AudioLines, CornerRightUp } from 'lucide-react';
import { IInputAI } from '../types/types';
import classNames from 'classnames';

export const InputAI: FC<IInputAI> = ({
  value,
  onChange,
  buttonDisabled = false,
  inputDisabled = false,
  fullWidth = false,
  onSubmit,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <textarea
        className={classNames(styles.textarea, fullWidth && styles.fullWidth)}
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        disabled={inputDisabled}
      ></textarea>
      <div className={styles.buttons}>
        <button
          className={styles.rounded}
          type="button"
          disabled={buttonDisabled}
          aria-label="Record audio"
        >
          <AudioLines width={20} />
        </button>
        <button
          className={styles.rounded}
          type="submit"
          disabled={buttonDisabled}
          aria-label="Send message"
          onClick={onSubmit}
        >
          <CornerRightUp width={20} />
        </button>
      </div>
    </div>
  );
};
