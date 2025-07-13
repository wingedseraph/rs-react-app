import { Component } from 'react';
import type { Card, CardListProps } from '../types/types';
import { Card as CardComponent } from './Card';
import Spinner from './Spinner';

export class CardList extends Component<CardListProps> {
  render() {
    if (this.props.loading) return <Spinner />;

    if (!this.props.data || this.props.data.length === 0)
      return <p>No data found</p>;

    return (
      <div className="p-4 flex flex-row flex-wrap gap-4 justify-center">
        {this.props.data.map((card: Card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    );
  }
}
