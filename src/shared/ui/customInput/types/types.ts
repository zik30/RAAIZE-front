export type InputProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'long';
  fullWidth: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  rounded?: boolean;
  type: 'text' | 'checkbox' | 'range' | 'password' | 'email';
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
