import { api } from '@/shared/api/client';

export const setFavorite = async (id: string) => {
  const res = await api.post('/ads/favorites', { id });
  return res.data;
};
