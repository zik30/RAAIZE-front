export interface ICommunityProps {
  viewButton?: boolean;
}

export interface ITemplate {
  name: string;
  description: string;
  content: object;
  id: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
