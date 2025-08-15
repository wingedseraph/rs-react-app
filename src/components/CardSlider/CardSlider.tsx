import { type PokemonCardDetails } from '@/app/types';
import { Button } from '@/components/Button/Button';
import { Spinner } from '@/components/Spinner/Spinner';
import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import Image from 'next/image';

interface CardSliderProps {
  cardDetails: null | PokemonCardDetails;
  className?: string;
  isLoadingData?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function CardSlider({
  cardDetails,
  isLoadingData,
  isOpen,
  onClose,
}: CardSliderProps) {
  return (
    <>
      <div
        className={`bg-opacity-50 fixed top-0 left-0 z-1 h-full w-full transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        } `}
        data-testid="backdrop"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-90 flex min-h-screen w-96 transform flex-col items-center justify-center rounded-4xl bg-inherit backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Button className="fixed top-0 right-0" onClick={onClose}>
          close
        </Button>

        {isLoadingData ? (
          <Spinner />
        ) : (
          <div className="h-full p-4">
            {cardDetails?.image && (
              <div className="mb-4">
                <Image
                  alt={cardDetails.name}
                  className="w-full rounded-lg transition-all duration-300"
                  loading="lazy"
                  src={`${cardDetails.image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
                />
              </div>
            )}

            {cardDetails && isOpen && (
              <div className="mt-10 space-y-2">
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
        )}
      </div>
    </>
  );
}
