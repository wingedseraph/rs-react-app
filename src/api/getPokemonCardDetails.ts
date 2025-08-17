import type { PokemonCardDetails } from '@/app/types';

import { POKEMON_BASE_API_URL } from '@/config/apiConfig';

export async function getPokemonCardDetails(
  id: string
): Promise<PokemonCardDetails> {
  let data = null;

  try {
    const response = await fetch(`${POKEMON_BASE_API_URL}cards/${id}/`);

    if (!response.ok) {
      throw new Error(String(response.status));
    }

    data = (await response.json()) as PokemonCardDetails;
  } catch (error) {
    console.error('fetchPokemon:', error);
    data = error;
  }

  return data as PokemonCardDetails;
}
