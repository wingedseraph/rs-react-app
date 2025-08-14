import { create } from 'zustand';

import type { Card } from '@/app/types';

interface SelectedItemsStore {
  addItem: (item: Card) => void;
  clearItems: () => void;
  removeItem: (id: string) => void;
  selectedItems: Card[];
}

export const useSelectedItemsStore = create<SelectedItemsStore>()((set) => ({
  addItem: (item) => {
    set((state) => ({
      selectedItems: state.selectedItems.some((i) => i.id === item.id)
        ? state.selectedItems
        : [...state.selectedItems, item],
    }));
  },
  clearItems: () => {
    set({ selectedItems: [] });
  },
  removeItem: (id) => {
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    }));
  },
  selectedItems: [],
}));
