import { Checkbox } from '@/components/Checkbox/Checkbox';
import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import { type Card } from '@/types';

type CardProps = Card & {
  onCardClick: (cardId: string) => void;
  className?: string;
};

export function Card({
  id,
  image,
  name,
  localId,
  onCardClick,
  className,
}: CardProps) {
  const handleCardClick = () => {
    onCardClick(id);
  };

  const card = {
    id,
    name,
    image: image || '',
    localId,
  };
  return (
    <div
      onClick={handleCardClick}
      className={`relative z-2 mt-10 flex cursor-pointer flex-col transition-all ${className}`}
    >
      {image && (
        <img
          className="max-h-[350px] max-w-3xs transition-all hover:scale-105"
          src={`${image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
          alt={name}
          loading="lazy"
        />
      )}
      <div className="mt-4 transition-all">
        <p className="p-4 text-base">{name}</p>
        <Checkbox item={card} />
      </div>
    </div>
  );
}
