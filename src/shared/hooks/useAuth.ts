import axios from 'axios';
import { create } from 'zustand';
import { BASE_URL, tokens, user } from '../constants/constants';
import { $authApi } from '../lib/requester/requester';

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

interface MeResponse {
  email: string;
  username: string;
  id: number;
  role: string;
  credits: number;
  created_at: string;
  is_email_verified: boolean;
  preferences_id: number;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface UserData {
  id: number;
  email: string;
  username: string;
  role: string;
  credits: number;
  is_email_verified: boolean;
  created_at: string;
  preferences_id: null | number;
}

interface AuthState {
  isAuth: boolean;
  isLoggingOut: boolean;
  isLoadingUser: boolean;
  user: UserData | null;
  username: string | null;

  setAuth: (isAuth: boolean) => void;
  register: (mutate: (data: RegisterData) => void, data: RegisterData) => void;
  login: (response: { data: LoginResponse }) => void;
  logout: () => void;
  checkAuth: (refreshToken: string) => Promise<LoginResponse>;
  setUsername: (username: string) => void;
  fetchUserData: () => Promise<void>;
  setUser: (user: UserData) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuth: !!localStorage.getItem(tokens.access),
  isLoggingOut: false,
  isLoadingUser: false,
  user: null,
  username: null,

  setUsername: (username: string) => set({ username }),

  setUser: (user: UserData) => set({ user, username: user.username }),

  setAuth: (isAuth: boolean) => {
    set({ isAuth });
    if (!isAuth) {
      localStorage.removeItem(tokens.access);
      localStorage.removeItem(tokens.refresh);
      set({ user: null, username: null });
    }
  },

  register: (mutate: (data: RegisterData) => void, data: RegisterData) => {
    mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  },

  login: async (response: { data: LoginResponse }) => {
    const { access_token, refresh_token } = response.data;
    localStorage.setItem(tokens.access, access_token);
    localStorage.setItem(tokens.refresh, refresh_token);
    set({ isAuth: true });

    try {
      await get().fetchUserData();
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  },

  logout: () => {
    const state = get();
    if (state.isLoggingOut) return;

    set({ isLoggingOut: true });
    localStorage.removeItem(tokens.access);
    localStorage.removeItem(tokens.refresh);
    sessionStorage.removeItem(user.email);
    set({ isAuth: false, user: null, username: null });

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

      try {
        await get().fetchUserData();
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  fetchUserData: async () => {
    try {
      set({ isLoadingUser: true });
      const response = await $authApi.get<MeResponse>('/auth/me');
      const userData = response.data;
      set({ user: userData, username: userData.username });
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    } finally {
      set({ isLoadingUser: false });
    }
  },
}));
