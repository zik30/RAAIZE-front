export interface IWorkspaceProps {
  viewButton: boolean;
}

export interface postPresentations {
  title: string;
  html: string;
  board_id: string;
}

export interface Presentation {
  id: number;
  title: string;
  user_id: number;
  board_id: number;
  content: {
    [key: string]: {
      [html: string]: string;
    };
  };
  created_at: string;
  updated_at: string;
}
