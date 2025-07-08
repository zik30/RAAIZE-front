export type SlideElement = {
  id: string;
  type: 'text' | 'image';
  x: number;
  y: number;
  content: string;
};

export type Slide = {
  id: number;
  elements: SlideElement[];
};
