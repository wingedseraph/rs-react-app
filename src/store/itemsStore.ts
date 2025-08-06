import type { Card } from '@/types';
import { create } from 'zustand';

type SelectedItemsStore = {
  selectedItems: Card[];
  addItem: (item: Card) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
};

export const useSelectedItemsStore = create<SelectedItemsStore>()((set) => ({
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
}));
