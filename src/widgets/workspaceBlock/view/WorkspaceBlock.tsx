import { FC, useState } from 'react';
import styles from './WorkspaceBlock.module.scss';
import {
  Container,
  CustomButton,
  CustomInput,
  Dropdown,
  Typography,
} from '@src/shared/ui';
import { IWorkspaceProps, Presentation } from '../types/types';
import { useAuth } from '@src/shared/hooks/useAuth';
import { Card } from './card/view/Card';
import {
  usePostPresentationMutation,
  usePresentationsQuery,
} from '../api/usePresentationsQuery';
import { PresentationModal } from '@src/features/presentationModal';
import { Link } from 'react-router-dom';

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

export const WorkspaceBlock: FC<IWorkspaceProps> = ({ viewButton = true }) => {
  const { username } = useAuth();

  const [selectedType, setSelectedType] = useState('latest');
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState<number | null>(null);

  // const { mutate: createPresentation } = useCreatePresentationMutation();
  // const handleCreate = (title: string, board_id: number, html: string) => {
  //   createPresentation({ title, html, board_id });
  // };

  const { mutate: postPresentation } = usePostPresentationMutation();
  const handlePost = (id: number) => {
    postPresentation(id);
  };

  const { data: presentations = [] }: { data?: Presentation[] } =
    usePresentationsQuery();
  console.log(presentations);
  const selectedPreview = presentations?.find((p) => p.id === preview);

  const filteredPresentations = presentations
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (selectedType === 'latests') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    })
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
          {username}&apos;s MirrorAi&apos;s workspace
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
          {viewButton && (
            <Link to={'/workspace'}>
              <CustomButton color="tertiary">View All</CustomButton>
            </Link>
          )}
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
        {viewButton && (
          <Link to={'/workspace'} className={styles.button}>
            <CustomButton color="primary">Show more</CustomButton>
          </Link>
        )}
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
