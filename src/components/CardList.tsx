import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { Card as CardComponent } from '@/components/Card';
import { CardSlider } from '@/components/CardSlider';
import type { Card, CardListProps, PokemonCardDetails } from '@/types';
import { useRef, useState } from 'react';
import { Spinner } from './Spinner';

export function CardList({ data, loading }: CardListProps) {
  const [selectedCardDetails, setSelectedCardDetails] =
    useState<PokemonCardDetails | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const prevCardId = useRef<string | null>(null);

  const handleCardClick = async (cardId: string) => {
    if (prevCardId.current === cardId) {
      setIsSliderOpen(true);
      return;
    }
    setLocalLoading(true);
    const details = await getPokemonCardDetails(cardId);
    setSelectedCardDetails(details);
    setIsSliderOpen(true);
    prevCardId.current = cardId;
    setTimeout(() => setLocalLoading(false), 300);
  };

  const handleSliderClose = () => {
    setIsSliderOpen(false);
  };

  if (loading) return <Spinner />;

  if (!data || !Array.isArray(data)) {
    return <p className="mt-10">{String(data)}</p>;
  }
  if (data.length === 0) {
    return <p className="mt-10">No data found</p>;
  }

  return (
    <>
      <div className="p-4 flex flex-row flex-wrap gap-4 justify-center">
        {data.map((card: Card) => (
          <CardComponent
            key={card.id}
            {...card}
            onCardClick={handleCardClick}
            className={`${localLoading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
          />
        ))}
      </div>

      <CardSlider
        isOpen={isSliderOpen}
        onClose={handleSliderClose}
        cardDetails={selectedCardDetails}
        className={`${localLoading ? 'blur-lg' : ''}`}
      />
    </>
  );
}
