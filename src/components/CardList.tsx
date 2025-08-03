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
    <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
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
