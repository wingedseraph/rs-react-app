import {
  POKEMON_BASE_API_URL,
  POKEMON_CURRENT_PAGE,
  POKEMON_PAGE_SIZE,
} from '@/config/apiConfig';
import type { PokemonResponse } from '@/types';

export async function getPokemonByQuery(
  query: string
): Promise<PokemonResponse> {
  let data = null;
  try {
    const response = await fetch(
      `${POKEMON_BASE_API_URL}cards?name=*${query}*&image=*&pagination:page=${POKEMON_CURRENT_PAGE}&pagination:itemsPerPage=${POKEMON_PAGE_SIZE}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error('fetchPokemon:', error);
    data = error;
  }
  return data;
}
