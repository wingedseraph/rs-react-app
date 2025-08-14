import type { Card } from '@/types';

import { POKEMON_BASE_API_URL, POKEMON_PAGE_SIZE } from '@/config/apiConfig';

export async function getPokemonByQuery(
  query: string,
  POKEMON_CURRENT_PAGE: number
): Promise<{ data: Card[]; hasMorePages: boolean }> {
  const defaultResponse: { data: Card[]; hasMorePages: boolean } = {
    data: [],
    hasMorePages: false,
  };

  try {
    const response = await fetch(
      `${POKEMON_BASE_API_URL}cards?name=*${query}*&image=*&pagination:page=${POKEMON_CURRENT_PAGE}&pagination:itemsPerPage=${POKEMON_PAGE_SIZE}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: Card[] = await response.json();
    const hasMorePages =
      Array.isArray(data) && data.length === POKEMON_PAGE_SIZE;
    return { data, hasMorePages };
  } catch (error) {
    console.error('fetchPokemon:', error);
    return defaultResponse;
  }
}
