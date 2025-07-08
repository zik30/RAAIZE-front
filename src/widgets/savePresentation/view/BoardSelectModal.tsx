import { FC } from 'react';
import styles from './BoardSelectModal.module.scss';
import { useBoardsQuery } from '@src/widgets/boardsBlock/api/useBoardsQuery';

interface Props {
  onSelect: (boardId: number) => void;
  onClose: () => void;
}

export const BoardSelectModal: FC<Props> = ({ onSelect, onClose }) => {
  const { data: boards, isLoading } = useBoardsQuery();

  if (isLoading) return <div className={styles.modal}>Загрузка...</div>;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Выберите борд</h3>
        <ul>
          {boards.map((board: any) => (
            <li key={board.id}>
              <button onClick={() => onSelect(board.id)}>{board.name}</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={styles.close}>Закрыть</button>
      </div>
    </div>
  );
};
