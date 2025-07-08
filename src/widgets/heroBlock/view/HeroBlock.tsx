import { Container, InputAI, Typography } from '@src/shared/ui';
import { FC, useState } from 'react';
import styles from './HeroBlock.module.scss';
import { useNavigate } from 'react-router-dom';

export const HeroBlock: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const nav = useNavigate();

  const handleSubmit = () => {
    nav('/edit', {
      state: { topic: inputValue }, 
    });
  };

  return (
    <section className={styles.wrapper}>
      <Container>
        <Typography align="center" color="white" variant="h1">
          Build Presentations with MirrorAi
        </Typography>
        <Typography align="center" color="white" variant="smallText">
          MirrorAi is a free and open-source tool for creating presentations
          with Markdown.
        </Typography>
        <InputAI
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          buttonDisabled={inputValue.length == 0}
          onSubmit={handleSubmit}
        />
      </Container>
    </section>
  );
};
