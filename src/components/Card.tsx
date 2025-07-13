import { Component } from 'react';
import type { CardProps } from '../types/types';

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
