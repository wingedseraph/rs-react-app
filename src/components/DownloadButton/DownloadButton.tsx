import { useSelectedItemsStore } from '@/store/itemsStore';
import { createCSVContent } from '@/utils/fileDownloadUtils';
import { useEffect, useRef, useState } from 'react';

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
      ref={downloadRef}
      href={downloadURL}
      onClick={handleDownload}
      className="p-4"
      download={`${selectedItems.length}_items.csv`}
    >
      download
    </a>
  );
};
