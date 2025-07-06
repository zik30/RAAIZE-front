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
};

export const typeMessages = [
  'Just type your topic — SayDeck does the rest.',
  'SayDeck designs your presentation with AI.',
  'No more templates — SayDeck creates unique decks.',
  'SayDeck makes your slides look like magic.',
];
