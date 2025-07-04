import styles from './GradientBackground.module.scss';
import { GradientBackgroundProps } from '../types/types';

export const GradientBackground = ({
  children,
  className = '',
  intensity = 'medium',
}: GradientBackgroundProps) => {
  const classes = [styles.container, styles[intensity], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};
