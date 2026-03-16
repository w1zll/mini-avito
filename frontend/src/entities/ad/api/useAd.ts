import { api } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const useAd = (id: string) =>
  useQuery({
    queryKey: ['ad', id],
    queryFn: async () => {
      const res = await api.get(`/ads/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
