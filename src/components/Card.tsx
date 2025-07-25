import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { type Card, type PokemonCardDetails } from '@/types';
import { useState } from 'react';

const POKEMON_IMAGE_QUALITY = 'high';
const POKEMON_IMAGE_EXTENSION = 'webp';
export function Card(card: Card) {
  const [pokemonCardDetails, setPokemonCardDetails] =
    useState<PokemonCardDetails | null>(null);

  return (
    <div
      onClick={async () => {
        const some = await getPokemonCardDetails(card.id);
        setPokemonCardDetails(some);
      }}
      className="transition-all mt-10 flex flex-col"
    >
      <pre> {JSON.stringify(pokemonCardDetails?.hp)} HP </pre>

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
