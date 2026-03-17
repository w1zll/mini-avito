'use client';

import { useEffect, useState } from 'react';
import { useInfiniteAds } from '../api/useInfiniteAds';
import { useVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { useToggleFavorite } from '@/features/favorites/model/useToggleFavorite';
import Button from '@/shared/ui/Button';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { toast } from 'sonner';

export const AdsList = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAds({
      search: debouncedSearch,
      minPrice: debouncedMinPrice ? Number(debouncedMinPrice) : undefined,
      maxPrice: debouncedMaxPrice ? Number(debouncedMaxPrice) : undefined,
      limit: 10,
    });

  const ads = data?.pages.flatMap((page) => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: ads.length,
    getScrollElement: () => document.documentElement,
    estimateSize: () => 120,
    overscan: 5,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const queryClient = useQueryClient();

  const handlePrefetch = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['ad', id],
      queryFn: () => api.get(`/ads/${id}`).then((res) => res.data),
    });
  };

  const toggleFavoriteQuery = useToggleFavorite();

  const handleReset = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
        <input
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
        />
        <input
          type="number"
          placeholder="Цена от"
          value={minPrice}
          min={0}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
        />
        <input
          type="number"
          placeholder="Цена до"
          value={maxPrice}
          min={0}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
        />
        <Button onClick={handleReset}>Сбросить</Button>
      </div>

      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const ad = ads[virtualRow.index];
          if (!ad) return null;

          return (
            <Link
              href={`/ads/${ad.id}`}
              key={ad.id}
              onMouseEnter={() => handlePrefetch(ad.id)}
              className="absolute left-0 w-full px-1"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-zinc-800">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {ad.description}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {ad.price.toLocaleString()} ₽
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!!user) {
                      toggleFavoriteQuery.mutate({
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
              </div>
            </Link>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div className="mt-4 text-center text-sm text-zinc-400">
          Загрузка...
        </div>
      )}
    </div>
  );
};
