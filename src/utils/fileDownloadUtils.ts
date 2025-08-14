import type { Card } from '@/app/types';

import { POKEMON_CSV_HEADERS } from '@/config/apiConfig';

export const createCSVContent = (items: Card[]) => {
  const headers = POKEMON_CSV_HEADERS;
  const rows = items.map((item) => [item.id, item.name].join(','));

  return [headers, ...rows].join('\n');
};
