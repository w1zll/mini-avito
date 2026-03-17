import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

describe('useInfiniteScroll', () => {
  const triggerScroll = () => {
    window.dispatchEvent(new Event('scroll'));
  };

  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      value: 100,
    });
  });

  it('вызывает fetchNextPage при скролле вниз', () => {
    const fetchNextPage = jest.fn();

    renderHook(() => useInfiniteScroll(fetchNextPage, true, false));
    triggerScroll();

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('не вызывает fetchNextPage если hasNextPage === false', () => {
    const fetchNextPage = jest.fn();

    renderHook(() => useInfiniteScroll(fetchNextPage, false, false));
    triggerScroll();

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it('не вызывает fetchNextPage если isFetchingNextPage === true', () => {
    const fetchNextPage = jest.fn();
    renderHook(() => useInfiniteScroll(fetchNextPage, true, true));
    triggerScroll();

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it('снимает обработчик скролла при анмаунте', () => {
    const fetchNextPage = jest.fn();
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useInfiniteScroll(fetchNextPage, true, false),
    );
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});
