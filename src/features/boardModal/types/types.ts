export interface IBoardModalProps {
  setIsOpen: (open: boolean) => void;
  create: (title: string, description: string) => void;
}
