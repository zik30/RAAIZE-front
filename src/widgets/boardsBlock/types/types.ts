export interface Board {
  id: number;
  description: string;
  name: string;
  user_id: number;
  board_id: number;
  content: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
}
