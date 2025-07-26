import {
  POKEMON_BASE_API_URL,
  POKEMON_CURRENT_PAGE,
  POKEMON_PAGE_SIZE,
} from '@/config/apiConfig';
import type { Card } from '@/types';

export async function getPokemonByQuery(query: string): Promise<Card[]> {
  const data: Card[] = [];

  try {
    const response = await fetch(
      `${POKEMON_BASE_API_URL}cards?name=*${query}*&image=*&pagination:page=${POKEMON_CURRENT_PAGE}&pagination:itemsPerPage=${POKEMON_PAGE_SIZE}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchPokemon:', error);
    return data;
  }
}
