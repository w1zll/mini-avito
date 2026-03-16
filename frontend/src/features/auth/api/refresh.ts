import { api } from '@/shared/api/client';

export const refreshToken = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};
