import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import type { CardProps } from '@/types';
import { Component } from 'react';

const POKEMON_IMAGE_QUALITY = 'high';
const POKEMON_IMAGE_EXTENSION = 'webp';
export class Card extends Component<CardProps> {
  state = {
    pre: null,
  };
  render() {
    const { card } = this.props;

    return (
      <div
        onClick={async () => {
          const some = await getPokemonCardDetails(card.id);
          this.setState({ pre: some.hp });
        }}
        className="transition-all mt-10 flex flex-col"
      >
        <pre> {JSON.stringify(this.state.pre)} HP </pre>

        {card.image && (
          <img
            className="transition-all hover:scale-105 max-w-3xs max-h-[350px]"
            src={`${card.image}/${POKEMON_IMAGE_QUALITY}.${POKEMON_IMAGE_EXTENSION}`}
            loading="lazy"
          />
        )}
        <div className="transition-all mt-4">
          <p className="p-4 text-base">{card.name}</p>
        </div>
      </div>
    );
  }
}
