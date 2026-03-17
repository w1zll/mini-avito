import { api } from '@/shared/api/client';
import { useQueryClient } from '@tanstack/react-query';

export const useAdPrefetch = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['ad', id],
      queryFn: () => api.get(`/ads/${id}`).then((res) => res.data),
    });
  };
};
