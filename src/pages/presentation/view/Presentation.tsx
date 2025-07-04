import { ChatBlock } from '@src/widgets/chatBlock/view/ChatBlock';
import { PresentationCanvas } from '@src/widgets/presentationCanvas';
import { FC } from 'react';
import styles from './Presentation.module.scss'

export const Presentation: FC = () => {
  return (
    <div className={styles.section}>
      <div className={styles.chat}>
        <ChatBlock />
      </div>
      <div className={styles.present} >
        <PresentationCanvas />
      </div>
    </div>
  );
};

