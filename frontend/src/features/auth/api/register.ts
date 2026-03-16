import { api } from '@/shared/api/client';

export const register = async (email: string, password: string) => {
  const res = await api.post('/auth/register', { email, password });

  return res.data;
};
