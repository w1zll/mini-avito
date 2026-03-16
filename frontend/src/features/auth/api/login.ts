import { api } from '@/shared/api/client';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('accessToken', res.data.accessToken);
  console.log(res.data);
  return res.data;
};
