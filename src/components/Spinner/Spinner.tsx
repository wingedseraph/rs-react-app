import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Spinner() {
  const [showNotFoundText, setNotFoundText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotFoundText(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="grid min-h-[140px] w-full place-items-center rounded-lg p-6"
      role="status"
    >
      {!showNotFoundText ? (
        <Image
          priority={false}
          alt="spinner pokemon ball"
          className="h-12 w-12 animate-spin"
          src="/newLogo.svg"
          height={48}
          width={48}
        />
      ) : (
        <p className="font-medium">not found</p>
      )}
    </div>
  );
}
