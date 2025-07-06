import { PricingPlan } from '@src/widgets/pricing/types/types';

export const BASE_URL = import.meta.env.VITE_API_URL;
export const user = { email: 'user_email' };
export const tokens = { access: 'access_token', refresh: 'refresh_token' };

export const paths = {
  homePage: '/',
  loginPage: '/login',
  registerPage: '/register',
  workspacePage: '/workspace',
  communityPage: '/community',
  editPage: '/edit',
  googleCallbackApi: '/api/v1/auth/google-callback',
  pricing: '/pricing',
};

export const typeMessages = [
  'Just type your topic — SayDeck does the rest.',
  'SayDeck designs your presentation with AI.',
  'No more templates — SayDeck creates unique decks.',
  'SayDeck makes your slides look like magic.',
];

export const pricingPlans: PricingPlan[] = [
  {
    title: 'Free',
    price: '$0',
    period: '/month',
    description: 'For getting started',
    credit: '10 daily credits',
    features: [
      'Limited number of slides',
      '10 daily credits',
      'Only basic templates',
      'No team collaboration',
      'Watermark present',
    ],
    buttonText: '',
    isPopular: false,
  },
  {
    title: 'Pro',
    price: '$25',
    period: '/month',
    description: 'For professional presentation generation',
    credit: '250 credits / month',
    features: [
      'Up to 250 credits per month',
      'Unlimited number of slides',
      'Access to premium templates',
      'Team collaboration',
      'No watermark',
      'Customization (fonts, logos)',
    ],
    buttonText: 'Upgrade',
    isPopular: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations',
    features: [
      'Unlimited credits',
      'Access to teams and role management',
      'SSO and enterprise-level security',
      'Integrations (Slack, Notion, etc.)',
      'Priority support',
      'Option to opt-out of model training',
    ],
    buttonText: 'Contact Us',
    isPopular: false,
  },
];
