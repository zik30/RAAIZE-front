import { create } from 'zustand';

type Slide = {
  title: string;
  content: string;
  image?: {
    url: string;
    alt?: string;
  };
  layout: string;
};

type PresentationData = {
  presentation_id: string; 
  title: string;
  slides: Slide[];
  total_slides: number;
  generation_time: number;
  images_found: number;
  html_preview?: string | null;
};

interface PresentationState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  presentation: PresentationData | null;
  setPresentation: (data: PresentationData | null) => void;

  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  presentation: null,
  setPresentation: (data) => set({ presentation: data, currentSlideIndex: 0 }),

  currentSlideIndex: 0,
  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
}));
