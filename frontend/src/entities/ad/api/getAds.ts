import { api } from '@/shared/api/client';

export type AdsParams = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export const getAds = async (params: AdsParams) => {
  const { data } = await api.get('/ads', { params });
  return data;
};
