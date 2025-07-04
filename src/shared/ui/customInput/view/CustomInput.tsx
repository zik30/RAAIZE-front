import styles from './CustomInput.module.scss';
import { type InputProps } from '../types/types';
import { type FC, useState } from 'react';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const inputClasses = classNames(
    styles.input,
    variant && styles[variant],
    size && styles[size],
    fullWidth && styles.fullWidth,
    error && styles.error,
    rounded && styles.rounded,
    className,
  );

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.inputWrapper}>
      {icon && <div className={styles.inputIcon}>{icon}</div>}
      <input type={inputType} className={inputClasses} {...props} />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eyeToggle}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
