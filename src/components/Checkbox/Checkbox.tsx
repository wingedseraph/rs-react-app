import { useSelectedItemsStore } from '@/store/itemsStore';
import type { PokemonCardDetails } from '@/types';

export const Checkbox = ({ item }: { item: PokemonCardDetails }) => {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const addItem = useSelectedItemsStore((state) => state.addItem);
  const removeItem = useSelectedItemsStore((state) => state.removeItem);

  const isSelected = selectedItems.some((i) => i.id === item.id);

  const handleChange = () => {
    if (isSelected) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return (
    <div className="flex items-center gap-5 bg-yellow-100 p-4">
      <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium">
        Select
      </label>
      <input
        checked={isSelected}
        onChange={handleChange}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="h-4 w-4 rounded-sm"
      />
    </div>
  );
};
