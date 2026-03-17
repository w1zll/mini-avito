import { fireEvent, render, screen } from '@testing-library/react';
import { AdCard } from '../AdCard';
import '@testing-library/jest-dom';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, onMouseEnter }: any) => (
    <a href={href} onMouseEnter={onMouseEnter}>
      {children}
    </a>
  ),
}));

const mockAd = {
  id: '1',
  title: 'Текст',
  description: 'Описание',
  price: 1000,
  favorite: false,
};

describe('AdCard', () => {
  it('рендерит title, desacription, price', () => {
    render(
      <AdCard
        ad={mockAd}
        onPrefetch={jest.fn()}
        favoriteSlot={<button>❤</button>}
      />,
    );

    expect(screen.getByText('Текст')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('1 000 ₽')).toBeInTheDocument();
  });

  it('ссылка ведет на /ads/:id', () => {
    render(<AdCard ad={mockAd} onPrefetch={jest.fn()} favoriteSlot={null} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/ads/1');
  });
  it('вызывает onPrefetch при hover', () => {
    const onPrefetch = jest.fn();

    render(<AdCard ad={mockAd} onPrefetch={onPrefetch} favoriteSlot={null} />);

    fireEvent.mouseEnter(screen.getByRole('link'));

    expect(onPrefetch).toHaveBeenCalledWith('1');
  });

  it('рендерит favoriteSlot', () => {
    render(
      <AdCard
        ad={mockAd}
        onPrefetch={jest.fn()}
        favoriteSlot={<button data-testid="fav-btn">❤️</button>}
      />,
    );

    expect(screen.getByTestId('fav-btn')).toBeInTheDocument();
  });
});
