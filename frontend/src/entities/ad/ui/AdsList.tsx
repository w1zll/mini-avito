'use client';

import { useRef, useState } from 'react';
import { useInfiniteAds } from '../api/useInfiniteAds';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { toggleFavorite } from '@/features/favorites/favoritesSlice';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { useToggleFavorite } from '@/features/favorites/model/useToggleFavorite';

export const AdsList = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.ids);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAds({
      search,
      limit: 10,
    });

  const ads = data?.pages.flatMap((page) => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: ads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  const handleScroll = () => {
    if (!parentRef.current || !hasNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 200 && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const queryClient = useQueryClient();
  const handlePrefetch = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['ad', id],
      queryFn: () => api.get(`/ads/${id}`).then((res) => res.data),
    });
  };

  const toggleFavoriteQuery = useToggleFavorite();

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '5px',
          border: '1px solid #ccc',
        }}
      />
      <div
        ref={parentRef}
        onScroll={handleScroll}
        style={{ height: '80vh', overflow: 'auto' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const ad = ads[virtualRow.index];
            if (!ad) return null;
            // console.log(ad.favorite);
            return (
              <Link
                href={`/ads/${ad.id}`}
                onMouseEnter={() => handlePrefetch(ad.id)}
                key={ad.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  borderBottom: '1px solid #ccc',
                  padding: '10px',
                }}
              >
                <div>
                  <b>{ad.id}</b>
                  <h3>{ad.title}</h3>
                  <p>${ad.price}</p>
                  <p>{ad.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    // e.stopPropagation();
                    e.preventDefault();
                    toggleFavoriteQuery.mutate({
                      adId: ad.id,
                      isFavorite: ad.favorite,
                    });
                    // dispatch(toggleFavorite(ad.id));
                  }}
                >
                  {ad?.favorite ? '❤️' : '🤍'}
                </button>
              </Link>
            );
          })}
        </div>
        {isFetchingNextPage && (
          <div style={{ color: 'red', textAlign: 'center' }}>Loading...</div>
        )}
      </div>
    </div>
  );
};
