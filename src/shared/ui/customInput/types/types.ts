import { type InputHTMLAttributes, type ReactNode } from 'react';

export type InputProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'long';
  fullWidth: boolean;
  error?: boolean;
  icon?: ReactNode;
  rounded?: boolean;
  type: 'text' | 'checkbox' | 'range';
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
