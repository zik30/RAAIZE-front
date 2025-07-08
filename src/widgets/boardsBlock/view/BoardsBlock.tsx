import { FC, useState } from 'react';
import styles from './BoardsBlock.module.scss';
import { Plus } from 'lucide-react';
import { Container, Typography } from '@src/shared/ui';
import { useNavigate } from 'react-router-dom';
import { paths } from '@src/shared/constants/constants';
import { useBoardsQuery, useCreateBoardMutation } from '../api/useBoardsQuery';
import { BoardModal } from '@src/features/boardModal/view/BoardModal';
import { Board } from '../types/types';
import classNames from 'classnames';

const getRandomColor = () => {
  const colors = ['#7552E0', '#D90960', '#05C1F5', '#FFA1E7', '#F03CC3'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const BoardsBlock: FC = () => {
  const { data: boards = [] }: { data?: Board[] } = useBoardsQuery();
  console.log(boards);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { mutate: createBoard } = useCreateBoardMutation();

  const handleCreate = (title: string, description: string) => {
    const isDuplicate = boards.some((board) => board.name === title);
    if (isDuplicate) {
      alert('A board with this title already exists.');
      return;
    }
    createBoard({ name: title, description: description });
  };

  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <Container className={styles.wrapper}>
        <Typography weight="bold" color="white" variant="h2">
          Ainazik&apos;s MirrorAi&apos;s boards
        </Typography>
        <div className={styles.boards}>
          <div
            className={classNames(styles.board, styles.default)}
            onClick={() => navigate(paths.boardPage(0))}
          >
            <div className={styles.bg}>
              <Typography className={styles.text} color="white" variant="h3">
                All Presentations
              </Typography>
            </div>
            <Typography color="grey" variant="extraSmall">
              See all presentation
            </Typography>
          </div>
          <div
            className={classNames(styles.board, styles.default)}
            onClick={() => setIsOpen(true)}
          >
            <div className={styles.bg}>
              <Plus color="white" size="26" className={styles.icon} />
              <Typography
                className={styles.text}
                color="white"
                variant="bodyText"
              >
                Create new board
              </Typography>
            </div>
            <Typography color="grey" variant="extraSmall">
              Do you want more boards?
            </Typography>
          </div>
          {boards.map((board) => (
            <div
              className={styles.board}
              key={board.id}
              onClick={() => navigate(paths.boardPage(board.id))}
            >
              <div
                className={styles.bg}
                style={{ backgroundColor: getRandomColor() }}
              >
                <Typography className={styles.text} color="white" variant="h4">
                  {board.name}
                </Typography>
              </div>
              <Typography
                className={styles.description}
                color="white"
                variant="smallText"
              >
                {board.description}
              </Typography>
              <Typography color="grey" variant="extraSmall">
                Last edited {formatDate(board.updated_at)}
              </Typography>
            </div>
          ))}
        </div>
        {isOpen && (
          <BoardModal
            create={(title, description) => handleCreate(title, description)}
            setIsOpen={setIsOpen}
          />
        )}
      </Container>
    </section>
  );
};
