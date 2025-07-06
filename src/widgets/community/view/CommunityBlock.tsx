import { Container, CustomButton, Dropdown, Typography } from '@src/shared/ui';
import { FC, useState } from 'react';
import styles from './CommunityBlock.module.scss';
import { ICommunityProps } from '../types/types';
import { Link } from 'react-router-dom';
import image from '@src/shared/assets/images/templateImg.png';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { TemplateModal } from '@src/features/templateModal';

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
    label: 'Technology',
    value: 'technology',
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

export const CommunityBlock: FC<ICommunityProps> = ({ viewButton = true }) => {
  const [selectedType, setSelectedType] = useState('Popular');
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const selectedTemplate = dataTest.find((template) => template.id === isOpen);

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
          {viewButton && <CustomButton color="tertiary">View all</CustomButton>}
        </div>
        <div className={styles.templates}>
          {dataTest.slice(0, 16).map((template) => (
            <motion.div
              whileHover={'hover'}
              initial="rest"
              animate="rest"
              className={styles.template}
              key={template.id}
            >
              <div className={styles.templateImg}>
                <motion.img
                  src={template.url}
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
                  <CustomButton classnames={styles.button} color="primary">
                    Remix
                  </CustomButton>
                  <CustomButton
                    onclick={() => setIsOpen(template.id)}
                    classnames={styles.button}
                    color="secondary"
                  >
                    Preview
                  </CustomButton>
                </motion.div>
              </div>
              <div className={styles.text}>
                <Typography color="white" align="center" variant="bodyText">
                  {template.title}
                </Typography>
                <Typography color="white" align="center" variant="smallText">
                  {template.subtitle}
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
        {selectedTemplate && (
          <TemplateModal
            name={selectedTemplate.title}
            presentation={selectedTemplate.subtitle}
            setIsOpen={setIsOpen}
          />
        )}
      </Container>
    </section>
  );
};
