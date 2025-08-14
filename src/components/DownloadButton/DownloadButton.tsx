import { useEffect, useRef, useState } from 'react';

import { useSelectedItemsStore } from '@/store/itemsStore';
import { createCSVContent } from '@/utils/fileDownloadUtils';

export const DownloadButton = () => {
  const [downloadURL, setDownloadURL] = useState('');
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (selectedItems.length === 0) {
      return null;
    }

    const csvContent = createCSVContent(selectedItems);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    setDownloadURL(url);
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
      download={`${selectedItems.length}_items.csv`}
      href={downloadURL}
      onClick={handleDownload}
      ref={downloadRef}
    >
      download
    </a>
  );
};
