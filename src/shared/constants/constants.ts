export const BASE_URL = import.meta.env.VITE_API_URL;
export const user = { email: 'user_email' };
export const tokens = { access: 'access_token', refresh: 'refresh_token' };

export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  allPresentations: '/presentations',
};
