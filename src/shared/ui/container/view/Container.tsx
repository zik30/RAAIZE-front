import styles from './Container.module.scss';
import classNames from 'classnames';
import type { FC } from 'react';
import type { IContainerProps } from '../types/types';

export const Container: FC<IContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};
