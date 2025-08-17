import { useEffect, useRef, useState } from 'react';

import { generateCSVAction } from '@/app/actions/actions';
import { useSelectedItemsStore } from '@/store/itemsStore';

export const DownloadButton = () => {
  const [downloadURL, setDownloadURL] = useState('');
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearItems = useSelectedItemsStore((state) => state.clearItems);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async () => {
    if (selectedItems.length === 0) {
      return null;
    }

    const data = await generateCSVAction(selectedItems);

    if (data.success && data.csvContent) {
      const blob = new Blob([data.csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      setDownloadURL(url);
      clearItems();

      return 0;
    }
  };

  useEffect(() => {
    if (downloadURL && downloadRef.current) {
      downloadRef.current.click();
      URL.revokeObjectURL(downloadURL);
      setDownloadURL('');
    }
  }, [downloadURL]);

  return (
    <a
      className="p-4"
      download={`${String(selectedItems.length)}_items.csv`}
      href={downloadURL}
      onClick={void handleDownload}
      ref={downloadRef}
    >
      download
    </a>
  );
};
