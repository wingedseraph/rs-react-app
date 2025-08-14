import type { Card } from '@/types';

import { useSelectedItemsStore } from '@/store/itemsStore';

export const Checkbox = ({
  className = '',
  item,
}: {
  className?: string;
  item: Card;
}) => {
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
    <div className={`flex flex-col items-center gap-5 p-4 ${className}`}>
      <label className="text-sm font-medium" htmlFor="checked-checkbox">
        select
      </label>
      <input
        checked={isSelected}
        className="accent-white-theme dark:accent-black-theme h-8 w-8 rounded-sm"
        id="checked-checkbox"
        onChange={handleChange}
        type="checkbox"
        value=""
      />
    </div>
  );
};
