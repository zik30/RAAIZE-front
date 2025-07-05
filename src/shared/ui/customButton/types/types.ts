export interface CustomButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  classnames?: string;
  onclick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
