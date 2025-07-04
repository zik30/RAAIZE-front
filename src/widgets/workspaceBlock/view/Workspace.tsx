import { Container, CustomButton, Dropdown, Typography } from '@src/shared/ui';
import { FC, useState } from 'react';
import styles from './Workspace.module.scss';
import { IWorkspaceProps } from '../types/types';
import { Link } from 'react-router-dom';

const typeOptions = [
  {
    label: 'Popular',
    value: 'popular',
  },
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
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Bissiness',
    value: 'bussiness',
  },
  {
    label: 'Ecology',
    value: 'ecology',
  },
  {
    label: 'Technolody',
    value: 'technology',
  },
];

export const Workspace: FC<IWorkspaceProps> = ({ viewButton = false }) => {
  const [selectedType, setSelectedType] = useState('Popular');

  return (
    <section>
      <Container className={styles.wrapper}>
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
          {viewButton && <CustomButton color="tertiary">View all</CustomButton>}
        </div>
      </Container>
    </section>
  );
};
