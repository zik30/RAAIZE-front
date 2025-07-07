export interface ITemplateModalProps {
  name: string;
  date: string;
  id: string;
  setIsOpen: (id: string | null) => void;
}

export interface IHtml {
  templateId: string;
  html: string;
  title: string;
}
