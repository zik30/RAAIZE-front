export interface IPreviewCardProps {
  title: string;
  id: string;
  date: string;
  setIsOpen: (id: string) => void;
}

export interface IHtml {
  templateId: string;
  html: string;
  title: string;
}
