import { Checkbox } from '@/components/Checkbox/Checkbox';
import {
  POKEMON_IMAGE_EXTENSION,
  POKEMON_IMAGE_QUALITY,
} from '@/config/apiConfig';
import { type CardSliderProps } from '@/types';
import { Button } from './Button';

export function CardSlider({
  isOpen,
  cardDetails,
  isLoadingImage,
  onClose,
  onImageLoad,
}: CardSliderProps) {
  if (!cardDetails) return null;
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        data-testid="backdrop"
        className={`bg-opacity-50 fixed top-0 left-0 z-1 h-full w-full transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        } `}
        onClick={handleBackdropClick}
      />

      <div
        className={`fixed top-0 right-0 z-90 flex min-h-screen w-96 transform flex-col items-center justify-center rounded-4xl bg-inherit backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Button className="fixed top-0 right-0" onClick={onClose}>
          close
        </Button>

        <div className="h-full p-4">
          {cardDetails?.image && (
            <div className="mb-4">
              <img
                src={`${cardDetails.image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
                alt={cardDetails.name}
                className={`w-full rounded-lg transition-all duration-300 ${
                  isLoadingImage ? 'scale-95 blur-sm' : 'scale-100 blur-none'
                }`}
                loading="lazy"
                onLoad={onImageLoad}
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
        <Checkbox item={cardDetails} />
      </div>
    </>
  );
}
