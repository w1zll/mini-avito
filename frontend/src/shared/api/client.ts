import axios from 'axios';
import { store } from '../store/store';
import {
  logout,
  loginSuccess,
  setAccessToken,
} from '@/features/auth/authSlice';

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          'http://localhost:4000/auth/refresh',
          {},
          { withCredentials: true },
        );
        store.dispatch(setAccessToken(data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        store.dispatch(logout());
      }
    }
    return Promise.reject(err);
  },
);
