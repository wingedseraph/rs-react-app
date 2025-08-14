import { useState } from 'react';

import { type Card } from '@/app/types';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import Image from 'next/image';

type CardProps = Card & {
  className?: string;
  onCardClick: (cardId: string) => void;
};

export function Card({
  className = '',
  id,
  image,
  localId,
  name,
  onCardClick,
}: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleCardClick = () => {
    onCardClick(id);
  };

  const card = {
    id,
    image: image || '',
    localId,
    name,
  };

  return (
    <div>
      <div
        className={`relative z-2 mt-10 flex min-h-[340px] min-w-[245px] cursor-pointer flex-col transition-all ${className}`}
        onClick={handleCardClick}
      >
        <Image
          alt={name}
          className={`h-full max-h-[350px] w-full max-w-3xs object-cover transition-all hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => {
            setIsLoaded(true);
          }}
          src={`${image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
        />
      </div>
      <div className="mt-4 transition-all">
        <p className="p-4 text-base">{name}</p>
        <Checkbox item={card} />
      </div>
    </div>
  );
}
