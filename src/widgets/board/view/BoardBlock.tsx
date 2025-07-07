import { FC, useState } from 'react';
import styles from './BoardBlock.module.scss';
import { Container, CustomInput, Dropdown, Typography } from '@src/shared/ui';
import { useAuth } from '@src/shared/hooks/useAuth';
import { Card } from './card/view/Card';
import {
  useBoardInfoQuery,
  useBoardQuery,
  usePostPresentationMutation,
} from '../api/useBoardQuery';
import { PresentationModal } from '@src/features/presentationModal';
import { useParams } from 'react-router-dom';

const typeOptions = [
  {
    label: 'Latests',
    value: 'latests',
  },
  {
    label: 'Oldest',
    value: 'oldest',
  },
];

export const BoardBlock: FC = () => {
  const { username } = useAuth();

  const [selectedType, setSelectedType] = useState('latest');
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState<number | null>(null);

  const { mutate: postPresentation } = usePostPresentationMutation();
  const handlePost = (id: number) => {
    postPresentation(id);
  };

  const { id } = useParams<{ id: string }>();
  const { data } = useBoardQuery(id || '');
  const { data: boardInfo } = useBoardInfoQuery(id || '');
  console.log(boardInfo);

  console.log(data);

  const selectedPreview = data?.find((p) => p.id === preview);

  const filteredPresentations = data
    ?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 16);

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
        <Typography variant="h3" color="white">
          {username}&apos;s {boardInfo?.name} board
        </Typography>
        <br />
        <Typography variant="bodyText" color="white">
          {boardInfo?.description}
        </Typography>
        <div className={styles.nav}>
          <div className={styles.left}>
            <CustomInput
              variant="primary"
              fullWidth={false}
              type="text"
              placeholder="search the presentation"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e)}
              options={typeOptions}
              placeholder={selectedType}
            ></Dropdown>
          </div>
        </div>
        <div className={styles.presentations}>
          {filteredPresentations?.map((presentation) => (
            <Card
              title={presentation.title}
              key={presentation.id}
              date={formatDate(presentation.created_at)}
              html={presentation.content.additionalProp1.html}
              id={presentation.id}
              setPost={(id) => handlePost(id)}
              setPreview={(id) => setPreview(id)}
            />
          ))}
        </div>
        {preview && (
          <PresentationModal
            name={selectedPreview!.title}
            html={selectedPreview!.content.additionalProp1.html}
            date={formatDate(selectedPreview!.created_at)}
            setIsOpen={(id) => setPreview(id)}
          />
        )}
      </Container>
    </section>
  );
};
