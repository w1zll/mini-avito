import { api } from '@/shared/api/client';

export const createAd = async (data: {
  title: string;
  price: number;
  description: string;
}) => {
  const res = await api.post('/ads', data);
  return res.data;
};
