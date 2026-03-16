import { api } from '@/shared/api/client';

export const addFavorite = (adId: string) => api.post(`/favorites/${adId}`);

export const removeFavorite = (adId: string) =>
  api.delete(`/favorites/${adId}`);
