'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AdsParams, getAds } from './getAds';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';

export const useInfiniteAds = (filters: AdsParams) => {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  return useInfiniteQuery({
    queryKey: ['ads', filters],
    queryFn: ({ pageParam = 1 }) => getAds({ ...filters, page: pageParam }),
    enabled: !authLoading,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage;
      const maxPage = Math.ceil(total / limit);
      return page < maxPage ? page + 1 : undefined;
    },
  });
};
