import { FC, useState } from 'react';
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
  onMic,
  children
}) => {
  const [activeBtn, setActiveBtn] = useState<'mic' | 'send' | null>(null)
   const handleButtonClick = (type: 'mic' | 'send', action: () => void) => {
    if (activeBtn === type) {
      setActiveBtn(null);
    } else {
      setActiveBtn(type);
      action();
    }
  };
  return (
    <div className={classNames(styles.inputWrapper, fullWidth && styles.fullWidth)}>
      <textarea
        className={classNames(styles.textarea, fullWidth && styles.fullWidth)}
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        disabled={inputDisabled}
      ></textarea>
      <div className={styles.buttons}>
        <button
          className={classNames(styles.rounded,
              activeBtn === 'mic' && styles.active
          )}
          type="button"
          disabled={buttonDisabled}
          aria-label="Record audio"
          onClick={() => {
            handleButtonClick('mic', onMic ?? (() => {}));
            }}
        >
          {children}
          <AudioLines width={20} />
        </button>
        <button
          className={classNames(styles.rounded,
            activeBtn === 'send' && styles.active
          )}
          type="submit"
          disabled={buttonDisabled}
          aria-label="Send message"
          onClick={() => {
            handleButtonClick('send', onSubmit ?? (() => {}));

          }}
        >
          <CornerRightUp width={20} />
        </button>
      </div>
    </div>
  );
};
