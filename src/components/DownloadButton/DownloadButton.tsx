import { Button } from '@/components/Button';
import { useSelectedItemsStore } from '@/store/itemsStore';

export const DownloadButton = () => {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const downloadItems = useSelectedItemsStore((state) => state.downloadItems);

  const handleDownload = () => {
    if (selectedItems.length === 0) {
      return null;
    }
    downloadItems();
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={selectedItems.length === 0}
      className="cursor-pointer rounded p-4"
    >
      download
    </Button>
  );
};
