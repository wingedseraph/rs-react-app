import { POKEMON_BASE_API_URL } from '@/config/apiConfig';
import type { SinglePokemonResponse } from '@/types';

export async function getPokemonCardDetails(
  id: string
): Promise<SinglePokemonResponse> {
  let data = null;
  try {
    const response = await fetch(`${POKEMON_BASE_API_URL}cards/${id}/`);

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
