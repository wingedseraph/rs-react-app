import type { Card } from '@/app/types';

import { Card as CardComponent } from '@/components/Card/Card';
import { Spinner } from '@/components/Spinner/Spinner';

interface CardListProps {
  className?: string;
  data: Card[] | null;
  loading: boolean;
  onCardClick?: (cardId: string) => void;
}

export function CardList({
  className = '',
  data,
  loading,
  onCardClick,
}: CardListProps) {
  if (loading) return <Spinner />;

  if (!data || !Array.isArray(data)) {
    return <p className="mt-10">{String(data)}</p>;
  }
  if (data.length === 0) {
    return <p className="mt-10">no pokémon&apos;s found</p>;
  }

  return (
    <div
      className={`flex flex-row flex-wrap justify-center gap-4 p-4 ${className}`}
    >
      {data.map((card: Card) => (
        <CardComponent
          key={card.id}
          {...card}
          className={
            loading
              ? 'pointer-events-none cursor-not-allowed'
              : 'cursor-pointer'
          }
          onCardClick={onCardClick || (() => {})}
        />
      ))}
    </div>
  );
}
