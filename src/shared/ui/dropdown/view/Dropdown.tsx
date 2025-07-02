import styles from './Dropdown.module.scss';
import { useState, type FC } from 'react';
import classNames from 'classnames';
import type { DropdownProps } from '../types/types';

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
        {selected?.label || placeholder}
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
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
