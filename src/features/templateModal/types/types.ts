export interface ITemplateModalProps {
  name: string | null;
  date: string | null;
  id: string | null;
  setIsOpen: (id: string | null) => void | null;
}

export interface IHtml {
  templateId: string;
  html: string;
  title: string;
}
