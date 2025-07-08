import { Container, CustomButton, Dropdown, Typography } from '@src/shared/ui';
import { FC, useState } from 'react';
import styles from './CommunityBlock.module.scss';
import { ICommunityProps } from '../types/types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TemplateModal } from '@src/features/templateModal';
import { useTemplatesQuery } from '../api/useTemplatesQuery';
import { PreviewCard } from '@src/features/previewCard/view/PreviewCard';

const typeOptions = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Oldest',
    value: 'oldest',
  },
];

const categories = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Built in',
    value: 'builtin',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Bussiness',
    value: 'bussiness',
  },
  {
    label: 'Ecology',
    value: 'ecology',
  },
  {
    label: 'Technology',
    value: 'technology',
  },
];

export const CommunityBlock: FC<ICommunityProps> = ({ viewButton = true }) => {
  const [selectedType, setSelectedType] = useState('latest');
  const [isOpen, setIsOpen] = useState<null | string>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data } = useTemplatesQuery();

  const selectedTemplate = data?.find((t) => t.templateId === isOpen);

  const sortedData = [...(data ?? [])].sort((a, b) => {
    if (selectedType === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (selectedType === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <Container
        className={classNames(styles.wrapper, !viewButton && styles.page)}
      >
        <Typography color="white" variant="h3">
          From the Community
        </Typography>
        <div className={styles.pannel}>
          <Dropdown
            value={selectedType}
            onChange={(e) => setSelectedType(e)}
            options={typeOptions}
            placeholder={selectedType}
          ></Dropdown>
          <div className={styles.categories}>
            {categories.map((category, i) => (
              <Link key={i} to={'/'}>
                <CustomButton color="secondary">
                  <Typography variant="smallText">{category.label}</Typography>
                </CustomButton>
              </Link>
            ))}
          </div>
          {viewButton && (
            <Link to={'/community'}>
              <CustomButton color="tertiary">View all</CustomButton>
            </Link>
          )}
        </div>
        <div className={styles.templates}>
          {sortedData?.map((template) => (
            <PreviewCard
              title={template.title}
              key={template.templateId}
              date={formatDate(template.createdAt)}
              id={template.templateId}
              setIsOpen={(id) => setIsOpen(id)}
            />
          ))}
        </div>
        {viewButton && (
          <Link to={'/community'}>
            <div className={styles.button}>
              <CustomButton color="primary">Show more</CustomButton>
            </div>
          </Link>
        )}
        {selectedTemplate && (
          <TemplateModal
            name={selectedTemplate.title}
            id={selectedTemplate.templateId}
            date={formatDate(selectedTemplate.createdAt)}
            setIsOpen={setIsOpen}
          />
        )}
      </Container>
    </section>
  );
};
