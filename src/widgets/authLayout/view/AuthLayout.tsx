import { ReactNode, useEffect, useState } from 'react';
import styles from './AuthLayout.module.scss';
import { Typography } from '@src/shared/ui';
import { ArrowUp } from 'lucide-react';
import { typeMessages } from '@src/shared/constants/constants';
import { GradientBackground } from '@src/features/gradientBackground';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentMessage = typeMessages[messageIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setMessageIndex((prev) => (prev + 1) % typeMessages.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, messageIndex]);

  return (
    <div className={styles.authLayout}>
      <div className={styles.form}>{children}</div>
      <div className={styles.banner}>
        <GradientBackground
          className={styles.background}
          animated
          intensity="medium"
        >
          <div className={styles.animatedInput}>
            <Typography variant="bodyText" color="black">
              {displayedText}&nbsp;
              <span className={styles.cursor}>|</span>
            </Typography>
            <div className={styles.button}>
              <ArrowUp color="white" />
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  );
};
