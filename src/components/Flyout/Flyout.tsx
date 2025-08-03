import { Button } from '@/components/Button';
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
      className="mt-10 flex flex-col items-center gap-4 rounded-4xl border-2 border-black p-4"
    >
      <p className="font-black">selected:</p>
      {selectedItems?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      <div className="flex items-center justify-center gap-5">
        <Button onClick={clearItems}>clear all items</Button>

        <DownloadButton />
      </div>
    </form>
  );
};
