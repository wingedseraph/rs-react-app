import { Button } from '@/components/Button/Button';
import { DownloadButton } from '@/components/DownloadButton/DownloadButton';
import { useSelectedItemsStore } from '@/store/itemsStore';
import type { FormEvent } from 'react';

export const Flyout = () => {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearItems = useSelectedItemsStore((state) => state.clearItems);
  if (selectedItems.length === 0) return null;

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      className="flex flex-col items-center gap-4 rounded-4xl border-2 border-black p-4 md:fixed md:top-4 md:left-4"
    >
      <p className="font-black">selected {selectedItems.length} pokémon</p>
      {selectedItems?.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4">
          <p title="name of pokémon">{item.name}</p>
          <p title="id of pokémon">{item.id}</p>
        </div>
      ))}

      <div className="flex items-center justify-center gap-5">
        <Button onClick={clearItems}>unselect all</Button>
        <DownloadButton />
      </div>
    </form>
  );
};
