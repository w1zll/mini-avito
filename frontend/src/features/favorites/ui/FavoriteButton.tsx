import { Ad } from '@/entities/ad/model/types';
import { RootState } from '@/shared/store/store';
import { useSelector } from 'react-redux';
import { useToggleFavorite } from '../model/useToggleFavorite';
import { toast } from 'sonner';

interface Props {
  ad: Ad;
}

export const FavoriteButton = ({ ad }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const toggleFavorite = useToggleFavorite();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (user) {
          toggleFavorite.mutate({
            adId: ad.id,
            isFavorite: ad.favorite,
          });
        } else {
          //TODO: сохранять в localStorage, а при логине отправлять на бэк
          toast.error('Авторизуйтесь, чтобы добавить в избранное.');
        }
      }}
      className="cursor-pointer text-xl transition hover:scale-125"
    >
      {ad?.favorite ? '❤️' : '🤍'}
    </button>
  );
};
