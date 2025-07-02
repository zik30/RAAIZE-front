import styles from './CustomInput.module.scss';
import { type InputProps } from '../types/types';
import { type FC } from 'react';
import classNames from 'classnames';

export const CustomInput: FC<InputProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  error = false,
  icon,
  rounded = false,
  type = 'text',
  className = '',
  ...props
}) => {
  const inputClasses = classNames(
    styles.input,
    variant && styles[variant],
    size && styles[size],
    fullWidth && styles.fullWidth,
    error && styles.error,
    rounded && styles.rounded,
    className,
  );

  return (
    <div className={styles.inputWrapper}>
      {icon && <div className={styles.inputIcon}>{icon}</div>}
      <input type={type} className={inputClasses} {...props} />
    </div>
  );
};
