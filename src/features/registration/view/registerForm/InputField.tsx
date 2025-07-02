import { Controller } from 'react-hook-form';

interface InputFieldProps {
  control: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

const InputField = ({
  control,
  name,
  label,
  type,
  placeholder,
  error,
  className,
}: InputFieldProps) => (
  <>
    <div className={className}>
      {label && <label>{label}</label>}
      {'|'}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input {...field} type={type} placeholder={placeholder} />
        )}
      />
    </div>
    {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
  </>
);

export default InputField;
