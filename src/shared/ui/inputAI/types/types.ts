import { ReactNode } from "react";

export interface IInputAI {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  buttonDisabled?: boolean;
  inputDisabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onSubmit?: () => void;
  onMic?: () => void;
  children?: ReactNode;
}
