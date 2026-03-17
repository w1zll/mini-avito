import Button from '@/shared/ui/Button';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  onReset: () => void;
}

export const AdsFilters = ({
  search,
  onSearchChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onReset,
}: Props) => (
  <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
    <input
      type="text"
      placeholder="Поиск"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
    />
    <input
      type="number"
      placeholder="Цена от"
      value={minPrice}
      min={0}
      onChange={(e) => onMinPriceChange(e.target.value)}
      className="w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
    />
    <input
      type="number"
      placeholder="Цена до"
      value={maxPrice}
      min={0}
      onChange={(e) => onMaxPriceChange(e.target.value)}
      className="w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:border-white"
    />
    <Button onClick={onReset}>Сбросить</Button>
  </div>
);
