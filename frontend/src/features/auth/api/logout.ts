import { api } from '@/shared/api/client';

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('accessToken');
};
