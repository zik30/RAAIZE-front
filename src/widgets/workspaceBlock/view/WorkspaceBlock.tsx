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
import image from '@src/shared/assets/images/templateImg.png';
import { motion } from 'framer-motion';
import { useAuth } from '@src/shared/hooks/useAuth';

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

const dataTest = [
  {
    id: 1,
    title: 'pulse-robot-template',
    subtitle: '10682 Remixes',
    category: 'technology',
    url: image,
  },
  {
    id: 2,
    title: 'eco-learning-kit',
    subtitle: '8423 Remixes',
    category: 'education',
    url: image,
  },
  {
    id: 3,
    title: 'startup-dashboard',
    subtitle: '5671 Remixes',
    category: 'bussiness',
    url: image,
  },
  {
    id: 4,
    title: 'green-energy-template',
    subtitle: '3222 Remixes',
    category: 'ecology',
    url: image,
  },
  {
    id: 5,
    title: 'ai-lab-toolkit',
    subtitle: '9204 Remixes',
    category: 'technology',
    url: image,
  },
  {
    id: 6,
    title: 'business-growth-plan',
    subtitle: '11230 Remixes',
    category: 'bussiness',
    url: image,
  },
  {
    id: 7,
    title: 'climate-change-board',
    subtitle: '6430 Remixes',
    category: 'ecology',
    url: image,
  },
  {
    id: 8,
    title: 'virtual-classroom',
    subtitle: '7850 Remixes',
    category: 'education',
    url: image,
  },
  {
    id: 9,
    title: 'tech-startup-guide',
    subtitle: '4981 Remixes',
    category: 'technology',
    url: image,
  },
  {
    id: 10,
    title: 'financial-modeler',
    subtitle: '7023 Remixes',
    category: 'bussiness',
    url: image,
  },
  {
    id: 11,
    title: 'recycle-tracker',
    subtitle: '3591 Remixes',
    category: 'ecology',
    url: image,
  },
  {
    id: 12,
    title: 'learning-analytics',
    subtitle: '8501 Remixes',
    category: 'education',
    url: image,
  },
  {
    id: 13,
    title: 'iot-controller',
    subtitle: '6642 Remixes',
    category: 'technology',
    url: image,
  },
  {
    id: 14,
    title: 'market-analysis-pro',
    subtitle: '7809 Remixes',
    category: 'bussiness',
    url: image,
  },
  {
    id: 15,
    title: 'clean-water-tracker',
    subtitle: '4587 Remixes',
    category: 'ecology',
    url: image,
  },
  {
    id: 16,
    title: 'edu-content-builder',
    subtitle: '5890 Remixes',
    category: 'education',
    url: image,
  },
  {
    id: 17,
    title: 'robotics-starter-kit',
    subtitle: '9102 Remixes',
    category: 'technology',
    url: image,
  },
  {
    id: 18,
    title: 'startup-pitch-deck',
    subtitle: '7764 Remixes',
    category: 'bussiness',
    url: image,
  },
  {
    id: 19,
    title: 'greenhouse-monitor',
    subtitle: '3379 Remixes',
    category: 'ecology',
    url: image,
  },
  {
    id: 20,
    title: 'edu-curriculum-planner',
    subtitle: '8023 Remixes',
    category: 'education',
    url: image,
  },
];

export const WorkspaceBlock: FC<IWorkspaceProps> = ({ viewButton = true }) => {
  const { username } = useAuth();

  const [selectedType, setSelectedType] = useState('latest');
  const [search, setSearch] = useState('');

  const filteredData = dataTest
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 16);

  return (
    <section>
      <Container className={styles.wrapper}>
        <Typography variant="h3" color="white">
          {username}&apos;s SayDeck&apos;s workspace
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
          {viewButton && <CustomButton color="tertiary">View All</CustomButton>}
        </div>
        <div className={styles.presentations}>
          {filteredData.slice(0, 16).map((presentation) => (
            <motion.div
              whileHover={'hover'}
              initial="rest"
              animate="rest"
              key={presentation.id}
              className={styles.presentation}
            >
              <div className={styles.image}>
                <motion.img
                  src={presentation.url}
                  alt=""
                  variants={{
                    rest: { filter: 'brightness(1.0)' },
                    hover: { filter: 'brightness(0.6)' },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className={styles.buttons}
                  variants={{
                    rest: { opacity: 0, scale: 0.8, pointerEvents: 'none' },
                    hover: { opacity: 1, scale: 1, pointerEvents: 'auto' },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <CustomButton classnames={styles.button}>Post</CustomButton>
                  <CustomButton classnames={styles.button}>Edit</CustomButton>
                </motion.div>
              </div>
              <div className={styles.text}>
                <Typography color="white" variant="bodyText">
                  {presentation.title}
                </Typography>
                <Typography color="white" variant="smallText">
                  Edited 23 hours ago
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>
        {viewButton && (
          <div className={styles.button}>
            <CustomButton color="primary">Show more</CustomButton>
          </div>
        )}
      </Container>
    </section>
  );
};
