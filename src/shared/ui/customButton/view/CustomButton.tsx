import { type FC } from 'react';
import type { CustomButtonProps } from '../types/types';
import styles from './CustomButton.module.scss';
import classNames from 'classnames';

export const CustomButton: FC<CustomButtonProps> = ({
  size = 'medium',
  color = 'primary',
  children,
  classnames,
  onclick,
  disabled = false,
  type = 'button',
}) => {
  const buttonClass = classNames(
    classnames,
    styles.button,
    styles[size],
    styles[color],
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onclick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
