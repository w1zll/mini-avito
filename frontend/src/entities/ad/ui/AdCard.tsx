import Link from 'next/link';
import { Ad } from '../model/types';

interface Props {
  ad: Ad;
  onPrefetch: (id: string) => void;
  favoriteSlot: React.ReactNode;
  style?: React.CSSProperties;
}

export const AdCard = ({ ad, onPrefetch, favoriteSlot, style }: Props) => {
  return (
    <Link
      href={`/ads/${ad.id}`}
      key={ad.id}
      onMouseEnter={() => onPrefetch(ad.id)}
      className="absolute left-0 w-full px-1"
      style={style}
    >
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-white">{ad.title}</h3>
          <p className="text-xs text-zinc-400 line-clamp-1">{ad.description}</p>
          <p className="mt-1 text-sm font-medium text-white">
            {ad.price.toLocaleString()} ₽
          </p>
        </div>
        {favoriteSlot}
      </div>
    </Link>
  );
};
