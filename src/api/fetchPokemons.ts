import type { PokemonResponse } from '@/types';

const POKEMON_BASE_API_URL = 'https://api.tcgdex.net/v2/en/';
const POKEMON_PAGE_SIZE = 10;
const POKEMON_CURRENT_PAGE = 1;
export async function fetchPokemon(query: string): Promise<PokemonResponse> {
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
