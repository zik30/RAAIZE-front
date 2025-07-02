import { Controller } from 'react-hook-form';
import { InputFieldProps } from '../types/types';
import { CustomInput } from '../../customInput/view/CustomInput';
import styles from './InputField.module.scss';
import { Typography } from '../../typography/view/Typography';
import classNames from 'classnames';

export const InputField = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  error,
  className = '',
}: InputFieldProps) => {
  return (
    <div className={classNames(styles.inputFieldWrapper, className)}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          <Typography variant="smallText" color="black">
            {label}
          </Typography>
        </label>
      )}

      <div className={styles.inputContainer}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <CustomInput
              {...field}
              id={name}
              type={(type as 'text' | 'checkbox' | 'range') || 'text'}
              fullWidth={true}
              error={!!error}
              placeholder={placeholder}
              className={styles.input}
            />
          )}
        />
      </div>

      {error && (
        <Typography
          variant="smallText"
          color="error"
          className={styles.errorMessage}
        >
          {error}
        </Typography>
      )}
    </div>
  );
};
