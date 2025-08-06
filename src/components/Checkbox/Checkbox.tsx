import { useSelectedItemsStore } from '@/store/itemsStore';
import type { Card } from '@/types';

export const Checkbox = ({
  item,
  className,
}: {
  item: Card;
  className?: string;
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
      <label htmlFor="checked-checkbox" className="text-sm font-medium">
        select
      </label>
      <input
        checked={isSelected}
        onChange={handleChange}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="accent-white-theme dark:accent-black-theme h-8 w-8 rounded-sm"
      />
    </div>
  );
};
