import type { CardProps } from '@/types';
import { Component } from 'react';

const POKEMON_IMAGE_QUALITY = 'low';
const POKEMON_IMAGE_EXTENSION = 'webp';
export class Card extends Component<CardProps> {
  render() {
    const { card } = this.props;

    return (
      <div className="transition-all mt-10 flex flex-col">
        {card.image && (
          <img
            className="transition-all hover:scale-105"
            src={`${card.image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
            loading="lazy"
          />
        )}
        <div className="transition-all mt-4">
          <p>{card.name}</p>
        </div>
      </div>
    );
  }
}
