import styles from './Dropdown.module.scss';
import { useState, type FC } from 'react';
import classNames from 'classnames';
import type { DropdownProps } from '../types/types';
import { Typography } from '../../typography/view/Typography';

export const Dropdown: FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);
  return (
    <div className={classNames(styles.dropdown, className)}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Typography color="white" variant="smallText">
          {selected?.label || placeholder}
        </Typography>
        <span className={styles.arrow} />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              className={classNames(styles.item, {
                [styles.active]: opt.value === value,
              })}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              <Typography color="grey" variant="smallText">
                {opt.label}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
