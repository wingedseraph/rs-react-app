import type { CardProps } from '@/types';
import { Component } from 'react';

export class Card extends Component<CardProps> {
  render() {
    const { card } = this.props;

    return (
      <div>
        {card.images && card.images.small && (
          <img src={card.images.small} alt={card.name} loading="lazy" />
        )}
        <div>
          <p>{card.name}</p>
        </div>
      </div>
    );
  }
}
