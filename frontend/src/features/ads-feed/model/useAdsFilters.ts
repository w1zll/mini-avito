import { useDebounce } from '@/shared/hooks/useDebounce';
import { useState } from 'react';

export const useAdsFilters = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const reset = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
  };

  return {
    search,
    minPrice,
    maxPrice,
    setSearch,
    setMinPrice,
    setMaxPrice,
    debouncedSearch,
    debouncedMinPrice: debouncedMinPrice
      ? Number(debouncedMinPrice)
      : undefined,
    debouncedMaxPrice: debouncedMaxPrice
      ? Number(debouncedMaxPrice)
      : undefined,
    reset,
  };
};
