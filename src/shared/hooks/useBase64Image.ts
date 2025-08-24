import { useEffect, useState } from 'react';

import { convertToBase64 } from '@/shared/utils/convertToBase64';

export const useBase64Image = (file: File | null) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setImageSrc('');
      setError(null);

      return;
    }

    const loadImage = async () => {
      setError(null);

      try {
        const base64 = await convertToBase64(file);

        setImageSrc(base64);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'base64 converting');
      }
    };

    void loadImage();
  }, [file]);

  return { imageSrc, error };
};
