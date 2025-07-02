import axios from 'axios';
import { create } from 'zustand';
import { BASE_URL, tokens, user } from '../constants/constants';

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface AuthState {
  isAuth: boolean;
  isLoggingOut: boolean;
  setAuth: (isAuth: boolean) => void;
  register: (mutate: (data: RegisterData) => void, data: RegisterData) => void;
  login: (response: { data: LoginResponse }) => void;
  logout: () => void;
  checkAuth: (refreshToken: string) => Promise<LoginResponse>;
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuth: !!localStorage.getItem(tokens.access),
  isLoggingOut: false,

  setAuth: (isAuth: boolean) => {
    set({ isAuth });
    if (!isAuth) {
      localStorage.removeItem(tokens.access);
      localStorage.removeItem(tokens.refresh);
    }
  },

  register: (mutate: (data: RegisterData) => void, data: RegisterData) => {
    mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  },

  login: (response: { data: LoginResponse }) => {
    const { access_token, refresh_token } = response.data;
    localStorage.setItem(tokens.access, access_token);
    localStorage.setItem(tokens.refresh, refresh_token);
    set({ isAuth: true });
  },

  logout: () => {
    const state = get();
    if (state.isLoggingOut) return;

    set({ isLoggingOut: true });
    localStorage.removeItem(tokens.access);
    localStorage.removeItem(tokens.refresh);
    sessionStorage.removeItem(user.email);
    set({ isAuth: false });

    setTimeout(() => set({ isLoggingOut: false }), 1000);
  },

  checkAuth: async (refreshToken: string): Promise<LoginResponse> => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/api/v1/auth/refresh`,
        {
          refresh_token: refreshToken,
        },
      );

      localStorage.setItem(tokens.access, data.access_token);
      set({ isAuth: true });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));
