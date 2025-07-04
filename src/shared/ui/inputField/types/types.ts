/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputFieldProps = {
  type?: 'text' | 'checkbox' | 'range' | 'password' | 'email';
  size?: 'small' | 'medium' | 'long';
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
