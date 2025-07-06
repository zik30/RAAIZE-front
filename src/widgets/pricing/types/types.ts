export interface PricingPlan {
  title: string;
  price: string;
  period: string;
  description: string;
  credit?: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}
