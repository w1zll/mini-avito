import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '../api/toggleFavorite';

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
      if (isFavorite) {
        return removeFavorite(adId);
      }
      return addFavorite(adId);
    },
    onMutate: async ({ adId }) => {
      await queryClient.cancelQueries({ queryKey: ['ads'] });

      const prev = queryClient.getQueryData(['ads']);

      queryClient.setQueryData(['ads'], (old: any) => {
        if (!old) return old;

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
      return { prev };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['ads'], context?.prev);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};
