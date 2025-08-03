import { POKEMON_CSV_HEADERS } from '@/config/apiConfig';
import type { Card } from '@/types';
import { create } from 'zustand';

type SelectedfItemsStore = {
  selectedItems: Card[];
  addItem: (item: Card) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  downloadItems: () => void;
};

export const useSelectedItemsStore = create<SelectedfItemsStore>()((set) => ({
  selectedItems: [],
  addItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.some((i) => i.id === item.id)
        ? state.selectedItems
        : [...state.selectedItems, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    })),
  clearItems: () => set({ selectedItems: [] }),
  downloadItems: () =>
    set((state) => {
      const items = state.selectedItems;
      if (items.length === 0) return state;

      const csvContent = createCSVContent(items);
      downloadCSV(csvContent, `${items.length}_items.csv`);

      return state;
    }),
}));

const createCSVContent = (items: Card[]) => {
  const headers = POKEMON_CSV_HEADERS;
  const rows = items.map((item) => [item.id, item.name].join(','));
  return [headers, ...rows].join('\n');
};

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};
