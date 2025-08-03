import { POKEMON_CSV_HEADERS } from '@/config/apiConfig';
import type { Card } from '@/types';

export const createCSVContent = (items: Card[]) => {
  const headers = POKEMON_CSV_HEADERS;
  const rows = items.map((item) => [item.id, item.name].join(','));
  return [headers, ...rows].join('\n');
};
