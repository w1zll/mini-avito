import { act, renderHook } from '@testing-library/react';
import { useAdsFilters } from '../useAdsFilters';

describe('useAdsFilters', () => {
  it('начальные значения пустые', () => {
    const { result } = renderHook(() => useAdsFilters());

    expect(result.current.search).toBe('');
    expect(result.current.minPrice).toBe('');
    expect(result.current.maxPrice).toBe('');
  });

  it('обновление search', () => {
    const { result } = renderHook(() => useAdsFilters());
    act(() => result.current.setSearch('iphone'));
    expect(result.current.search).toBe('iphone');
  });

  it('обновление minPrice и maxPrice', () => {
    const { result } = renderHook(() => useAdsFilters());

    act(() => {
      result.current.setMinPrice('20000');
      result.current.setMaxPrice('50000');
    });

    expect(result.current.minPrice).toBe('20000');
    expect(result.current.maxPrice).toBe('50000');
  });

  it('reset очищает все поля', () => {
    const { result } = renderHook(() => useAdsFilters());

    act(() => {
      result.current.setSearch('велосипед');
      result.current.setMinPrice('100');
      result.current.setMaxPrice('500');
    });

    act(() => result.current.reset());

    expect(result.current.search).toBe('');
    expect(result.current.minPrice).toBe('');
    expect(result.current.maxPrice).toBe('');
  });

  it('debouncedMinPrice возвращает number или undefined', () => {
    const { result } = renderHook(() => useAdsFilters());

    expect(result.current.debouncedMinPrice).toBeUndefined();

    act(() => result.current.setMinPrice('200'));

    expect(result.current.debouncedMinPrice).toBeUndefined();
  });
});
