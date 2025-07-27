import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import { type PokemonCardDetails } from '@/types';
import { Button } from './Button';

interface CardSliderProps {
  isOpen: boolean;
  cardDetails: PokemonCardDetails | null;
  className?: string;
  onClose: () => void;
}

export function CardSlider({
  isOpen,
  cardDetails,
  className,
  onClose,
}: CardSliderProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        data-testid="backdrop"
        className={`fixed top-0 left-0 w-full h-full z-1 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } `}
        onClick={handleBackdropClick}
      />

      <div
        className={`fixed right-0 top-0 min-h-screen flex flex-col items-center justify-center w-96 bg-[#F0CE5F] transform transition-transform duration-300 ease-in-out z-90 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Button className="fixed top-0 right-0" onClick={onClose}>
          close
        </Button>

        <div className="p-4 h-full">
          {cardDetails?.image && (
            <div className="mb-4">
              <img
                src={`${cardDetails.image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
                alt={cardDetails.name}
                className={`w-full rounded-lg ${className}`}
                loading="lazy"
              />
            </div>
          )}

          {cardDetails && isOpen && (
            <div className="space-y-2 mt-10">
              <div className="flex justify-between">
                <span className="font-semibold">hp </span>
                <span>{cardDetails.hp}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">stage </span>
                <span>{cardDetails.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">rarity </span>
                <span>{cardDetails.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">category </span>
                <span>{cardDetails.category}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
