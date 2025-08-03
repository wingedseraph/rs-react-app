import { POKEMON_CSV_HEADERS } from '@/config/apiConfig';
import type { Card } from '@/types';

export const createCSVContent = (items: Card[]) => {
  const headers = POKEMON_CSV_HEADERS;
  const rows = items.map((item) => [item.id, item.name].join(','));
  return [headers, ...rows].join('\n');
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};
