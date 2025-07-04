import { ReactNode } from 'react';

export interface GradientBackgroundProps {
  children?: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}
