import { Card as CardComponent } from '@/components/Card';
import type { Card, CardListProps } from '@/types';
import { Spinner } from './Spinner';

export function CardList({ data, loading, onCardClick }: CardListProps) {
  if (loading) return <Spinner />;

  if (!data || !Array.isArray(data)) {
    return <p className="mt-10">{String(data)}</p>;
  }
  if (data.length === 0) {
    return <p className="mt-10">No data found</p>;
  }

  return (
    <div className="p-4 flex flex-row flex-wrap gap-4 justify-center">
      {data.map((card: Card) => (
        <CardComponent
          key={card.id}
          {...card}
          onCardClick={onCardClick || (() => {})}
          className={`${loading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
        />
      ))}
    </div>
  );
}
