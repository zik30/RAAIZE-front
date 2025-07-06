import { BASE_URL, tokens } from '@src/shared/constants/constants';
import { useAuth } from '@src/shared/hooks/useAuth';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

const createApi = (): AxiosInstance =>
  axios.create({ baseURL: BASE_URL + '/api/v1/' });

const $mainApi: AxiosInstance = createApi();
const $authApi: AxiosInstance = createApi();

$mainApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(tokens.access);
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$authApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(tokens.access);
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const ogRequest = error.config as CustomAxiosRequestConfig;
    const { logout } = useAuth.getState();

    if (error.response?.status === 401 && ogRequest && !ogRequest._isRetry) {
      ogRequest._isRetry = true;

      const refresh_token = localStorage.getItem(tokens.refresh);
      if (!refresh_token) {
        logout();
        return Promise.reject(error);
      }

      try {
        const response = await $authApi.post<RefreshTokenResponse>(
          'auth/refresh',
          { refresh_token },
        );

        localStorage.setItem(tokens.access, response.data.access_token);
        localStorage.setItem(tokens.refresh, response.data.refresh_token);

        ogRequest.headers = ogRequest.headers || {};
        ogRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

        return $authApi.request(ogRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export { $authApi, $mainApi };
