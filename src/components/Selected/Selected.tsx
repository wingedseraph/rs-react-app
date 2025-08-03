import { useSelectedItemsStore } from '@/store/itemsStore';

export const Selected = () => {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  if (!selectedItems) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-blend-hue">
      selectedItems _id_
      {selectedItems?.map((item) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </div>
  );
};
