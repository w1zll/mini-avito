import { render, screen, fireEvent } from '@testing-library/react';
import { AdsFilters } from '../AdsFilters';

const defaultProps = {
  search: '',
  onSearchChange: jest.fn(),
  minPrice: '',
  onMinPriceChange: jest.fn(),
  maxPrice: '',
  onMaxPriceChange: jest.fn(),
  onReset: jest.fn(),
};

describe('AdsFilters', () => {
  it('рендерит все поля и кнопку', () => {
    render(<AdsFilters {...defaultProps} />);

    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Цена от')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Цена до')).toBeInTheDocument();
    expect(screen.getByText('Сбросить')).toBeInTheDocument();
  });

  it('вызывает onSearchChange при вводе', () => {
    const onSearchChange = jest.fn();
    render(<AdsFilters {...defaultProps} onSearchChange={onSearchChange} />);

    fireEvent.change(screen.getByPlaceholderText('Поиск'), {
      target: { value: 'велосипед' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('велосипед');
  });

  it('вызывает onMinPriceChange при вводе', () => {
    const onMinPriceChange = jest.fn();
    render(
      <AdsFilters {...defaultProps} onMinPriceChange={onMinPriceChange} />,
    );

    fireEvent.change(screen.getByPlaceholderText('Цена от'), {
      target: { value: '100' },
    });

    expect(onMinPriceChange).toHaveBeenCalledWith('100');
  });

  it('вызывает onReset при клике на кнопку', () => {
    const onReset = jest.fn();
    render(<AdsFilters {...defaultProps} onReset={onReset} />);

    fireEvent.click(screen.getByText('Сбросить'));

    expect(onReset).toHaveBeenCalled();
  });

  it('отображает переданные значения в полях', () => {
    render(
      <AdsFilters
        {...defaultProps}
        search="диван"
        minPrice="500"
        maxPrice="2000"
      />,
    );

    expect(screen.getByPlaceholderText('Поиск')).toHaveValue('диван');
    expect(screen.getByPlaceholderText('Цена от')).toHaveValue(500);
    expect(screen.getByPlaceholderText('Цена до')).toHaveValue(2000);
  });
});
