import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import { type Card } from '@/types';

type CardProps = Card & {
  onCardClick: (cardId: string) => void;
  className?: string;
};

export function Card({ id, image, name, onCardClick, className }: CardProps) {
  const handleCardClick = () => {
    onCardClick(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`transition-all mt-10 flex flex-col cursor-pointer relative z-2 ${className}`}
    >
      {image && (
        <img
          className="transition-all hover:scale-105 max-w-3xs max-h-[350px]"
          src={`${image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
          alt={name}
          loading="lazy"
        />
      )}
      <div className="transition-all mt-4">
        <p className="p-4 text-base">{name}</p>
      </div>
    </div>
  );
}
