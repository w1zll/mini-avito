import { useQuery } from '@tanstack/react-query';
import { AdsParams, getAds } from './getAds';

export const useAds = (params: AdsParams) =>
  useQuery({
    queryKey: ['ads', params],
    queryFn: () => getAds(params),
  });
