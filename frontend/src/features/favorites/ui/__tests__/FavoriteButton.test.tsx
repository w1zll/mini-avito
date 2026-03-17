import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteButton } from '../FavoriteButton';
import { useSelector } from 'react-redux';
import { useToggleFavorite } from '../../model/useToggleFavorite';
import { toast } from 'sonner';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('../../model/useToggleFavorite');
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }));

const mockAd = {
  id: '1',
  title: 'Диван',
  description: 'Мягкий',
  price: 5000,
  favorite: false,
};

describe('FavoriteButton', () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    (useToggleFavorite as jest.Mock).mockReturnValue({ mutate: mutateMock });
    jest.clearAllMocks();
  });

  it('показывает 🤍 если не в избранном', () => {
    jest.mocked(useSelector).mockReturnValue({ id: 'user1' });
    render(<FavoriteButton ad={mockAd} />);
    expect(screen.getByRole('button')).toHaveTextContent('🤍');
  });

  it('показывает ❤️ если в избранном', () => {
    jest.mocked(useSelector).mockReturnValue({ id: 'user1' });
    render(<FavoriteButton ad={{ ...mockAd, favorite: true }} />);
    expect(screen.getByRole('button')).toHaveTextContent('❤️');
  });

  it('вызывает mutate если пользователь авторизован', () => {
    jest.mocked(useSelector).mockReturnValue({ id: 'user1' });
    render(<FavoriteButton ad={mockAd} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mutateMock).toHaveBeenCalledWith({ adId: '1', isFavorite: false });
  });

  it('показывает toast если пользователь не авторизован', () => {
    jest.mocked(useSelector).mockReturnValue(null);
    render(<FavoriteButton ad={mockAd} />);

    fireEvent.click(screen.getByRole('button'));

    expect(toast.error).toHaveBeenCalledWith(
      'Авторизуйтесь, чтобы добавить в избранное.',
    );
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
