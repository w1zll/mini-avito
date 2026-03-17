'use client';

import { useInfiniteAds } from '../api/useInfiniteAds';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAdsFilters } from '@/features/ads-feed/model/useAdsFilters';
import { useAdPrefetch } from '@/features/ads-feed/model/useAdPrefetch';
import { useInfiniteScroll } from '@/features/ads-feed/model/useInfiniteScroll';
import { AdsFilters } from '@/features/ads-feed/ui/AdsFilters';
import { AdCard } from './AdCard';
import { FavoriteButton } from '@/features/favorites/ui/FavoriteButton';

export const AdsList = () => {
  const filters = useAdsFilters();
  const prefetch = useAdPrefetch();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAds({
      search: filters.debouncedSearch,
      minPrice: filters.debouncedMinPrice,
      maxPrice: filters.debouncedMaxPrice,
      limit: 10,
    });

  const ads = data?.pages.flatMap((page) => page.items) ?? [];

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  const rowVirtualizer = useVirtualizer({
    count: ads.length,
    getScrollElement: () => document.documentElement,
    estimateSize: () => 120,
    overscan: 5,
  });

  return (
    <div className="mx-auto max-w-4xl px-4">
      <AdsFilters
        search={filters.search}
        onSearchChange={filters.setSearch}
        minPrice={filters.minPrice}
        onMinPriceChange={filters.setMinPrice}
        maxPrice={filters.maxPrice}
        onMaxPriceChange={filters.setMaxPrice}
        onReset={filters.reset}
      />

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
            <AdCard
              key={ad.id}
              ad={ad}
              onPrefetch={prefetch}
              favoriteSlot={<FavoriteButton ad={ad} />}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            />
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
