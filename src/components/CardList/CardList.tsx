import { Card as CardComponent } from '@/components/Card/Card';
import { Spinner } from '@/components/Spinner/Spinner';
import type { Card } from '@/types';

type CardListProps = {
  loading: boolean;
  data: Card[] | null;
  className?: string;
  onCardClick?: (cardId: string) => void;
};

export function CardList({
  data,
  loading,
  className = '',
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
          onCardClick={onCardClick || (() => {})}
          className={`${loading ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
        />
      ))}
    </div>
  );
}
