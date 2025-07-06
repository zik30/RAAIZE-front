import { FC, useState } from 'react';
import styles from './WorkspaceBlock.module.scss';
import {
  Container,
  CustomButton,
  CustomInput,
  Dropdown,
  Typography,
} from '@src/shared/ui';
import { IWorkspaceProps } from '../types/types';

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
  const [selectedType, setSelectedType] = useState('latest');
  return (
    <section>
      <Container className={styles.wrapper}>
        <Typography variant="h3" color="white">
          Ainazik&apos;s SayDeck&apos;s workspace
        </Typography>
        <div className={styles.nav}>
          <div className={styles.left}>
            <CustomInput
              variant="primary"
              fullWidth={false}
              type="text"
              placeholder="search the name"
            />
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e)}
              options={typeOptions}
              placeholder={selectedType}
            ></Dropdown>
          </div>
          {viewButton && <CustomButton color="tertiary">View All</CustomButton>}
        </div>
      </Container>
    </section>
  );
};
