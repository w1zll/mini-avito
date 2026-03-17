import { useQuery, useQueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { useAdPrefetch } from '../useAdPrefetch';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('@/shared/api/client', () => ({
  api: {
    get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Текст' } }),
  },
}));

describe('useAdPrefetch', () => {
  it('вызывает prefetchQuery с правильным queryKey', () => {
    const prefetchQuery = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValue({ prefetchQuery });

    const { result } = renderHook(() => useAdPrefetch());
    result.current('1');

    expect(prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ['ad', '1'] }),
    );
  });
});
