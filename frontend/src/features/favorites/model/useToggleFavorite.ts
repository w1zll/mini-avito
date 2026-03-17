import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '../api/toggleFavorite';
import { toast } from 'sonner';

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      adId,
      isFavorite,
    }: {
      adId: string;
      isFavorite: boolean;
    }) => {
      if (isFavorite) return removeFavorite(adId);
      return addFavorite(adId);
    },

    onMutate: async ({ adId }) => {
      await queryClient.cancelQueries({ queryKey: ['ads'] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ['ads'],
      });

      queryClient.setQueriesData({ queryKey: ['ads'] }, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            items: page.items.map((ad: any) =>
              ad.id === adId ? { ...ad, favorite: !ad.favorite } : ad,
            ),
          })),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as string[], data);
      });

      toast.error('Не удалось обновить избранное. Попробуйте ещё раз.');
    },
  });
};
